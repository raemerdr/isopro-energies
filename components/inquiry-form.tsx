'use client';
/* The inquiry form as a short qualifier in four steps: what it is about (Leistung), which parts of the
   plant (Objekt), size, place and timing with optional photos or plans (Umfang), and how to reach the
   sender (Kontakt). Nothing is stored: app/api/anfrage/route.ts emails it to IsoPro.
   A service page starts it with its own service already chosen (`preselect`). */
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import { useEffect, useRef, useState, type ChangeEvent, type FormEvent, type InputHTMLAttributes, type ReactNode } from 'react';
import { ButtonContent } from '@/components/cta';
import { useCopy } from '@/components/i18n';
import { Icon } from '@/components/icons';
import { fill } from '@/lib/i18n';
import {
  EMAIL_PATTERN, FILE_LIMITS, NEEDS, OBJECTS, TIMEFRAMES, isAllowedFile, isNeed, isPhone,
  type NeedKey, type ObjectKey, type TimeframeKey,
} from '@/lib/inquiry';
import { SITE } from '@/lib/site';
import { cx } from '@/lib/ui';

const FIELDS = { company: '', name: '', phone: '', email: '' };
type Field = keyof typeof FIELDS;
type ErrorKey = Field | 'need' | 'objects' | 'contact' | 'consent' | 'files' | 'form';
type Errors = Partial<Record<ErrorKey, string>>;

interface Attachment { id: string; file: File; url: string | null }

/** A photo as JPEG no larger than FILE_LIMITS.maxEdge; PDFs and anything the browser cannot decode stay as they are. */
async function shrink(file: File): Promise<File> {
  if (!file.type.startsWith('image/')) return file;
  try {
    const bitmap = await createImageBitmap(file);
    const scale = Math.min(1, FILE_LIMITS.maxEdge / Math.max(bitmap.width, bitmap.height));
    const canvas = document.createElement('canvas');
    canvas.width = Math.round(bitmap.width * scale);
    canvas.height = Math.round(bitmap.height * scale);
    canvas.getContext('2d')!.drawImage(bitmap, 0, 0, canvas.width, canvas.height);
    bitmap.close();
    const blob = await new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, 'image/jpeg', 0.8));
    return blob ? new File([blob], `${file.name.replace(/\.[^.]+$/, '')}.jpg`, { type: 'image/jpeg' }) : file;
  } catch {
    return file;
  }
}

export function InquiryForm({ preselect }: { preselect?: NeedKey }) {
  const t = useCopy().form;
  const ERRORS = {
    ...t.errors,
    tooMany: fill(t.errors.tooMany, { max: FILE_LIMITS.maxCount }),
    failed: fill(t.errors.failed, { phone: SITE.phone }),
  };
  const [step, setStep] = useState(0);
  const [need, setNeed] = useState<NeedKey | ''>(preselect ?? '');
  const [objects, setObjects] = useState<ObjectKey[]>([]);
  const [location, setLocation] = useState('');
  const [scope, setScope] = useState('');
  const [timeframe, setTimeframe] = useState<TimeframeKey | ''>('');
  const [description, setDescription] = useState('');
  const [files, setFiles] = useState<Attachment[]>([]);
  const [fields, setFields] = useState(FIELDS);
  const [consent, setConsent] = useState(false);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<'idle' | 'busy' | 'sending' | 'done'>('idle');
  const [preview, setPreview] = useState(false);
  const root = useRef<HTMLDivElement>(null);
  const heading = useRef<HTMLHeadingElement>(null);
  const moved = useRef(false);

  // Moving between steps puts the keyboard and screen readers at the new step's heading,
  // and brings the top of the form back into view if the last step left it above the header
  useEffect(() => {
    if (!moved.current || status === 'busy' || status === 'sending') return;
    heading.current?.focus({ preventScroll: true });
    const form = root.current;
    if (form && form.getBoundingClientRect().top < 90) form.scrollIntoView({ block: 'start' });
  }, [step, status]);

  // Release the preview images when the form goes away
  const live = useRef<Attachment[]>([]);
  useEffect(() => { live.current = files; }, [files]);
  useEffect(() => {
    const shown = live;
    return () => shown.current.forEach(({ url }) => url && URL.revokeObjectURL(url));
  }, []);

  const go = (next: number) => { moved.current = true; setErrors({}); setStep(next); };
  const set = (field: Field) => (event: ChangeEvent<HTMLInputElement>) => {
    setFields((prev) => ({ ...prev, [field]: event.target.value }));
    // Typing a phone number or an email address also settles the "one of the two" message
    const reachable = field === 'phone' || field === 'email';
    if (errors[field] || (reachable && errors.contact)) setErrors((prev) => ({ ...prev, [field]: undefined, ...(reachable && { contact: undefined }) }));
  };
  const toggleObject = (key: ObjectKey) => {
    setObjects((prev) => (prev.includes(key) ? prev.filter((item) => item !== key) : [...prev, key]));
    setErrors((prev) => ({ ...prev, objects: undefined }));
  };

  async function addFiles(event: ChangeEvent<HTMLInputElement>) {
    const picked = Array.from(event.target.files ?? []);
    event.target.value = '';
    if (!picked.length) return;
    setStatus('busy');
    const room = FILE_LIMITS.maxCount - files.length;
    let total = files.reduce((sum, { file }) => sum + file.size, 0);
    const added: Attachment[] = [];
    let problem = picked.length > room ? ERRORS.tooMany : '';
    for (const original of picked.slice(0, room)) {
      if (!isAllowedFile(original.type)) { problem = ERRORS.wrongType; continue; }
      const file = await shrink(original);
      if (total + file.size > FILE_LIMITS.maxTotalBytes) { problem = ERRORS.tooLarge; break; }
      total += file.size;
      added.push({ id: crypto.randomUUID(), file, url: file.type.startsWith('image/') ? URL.createObjectURL(file) : null });
    }
    setFiles((prev) => [...prev, ...added]);
    setErrors((prev) => ({ ...prev, files: problem || undefined }));
    setStatus('idle');
  }

  function removeFile(id: string) {
    setFiles((prev) => prev.filter((item) => {
      if (item.id === id && item.url) URL.revokeObjectURL(item.url);
      return item.id !== id;
    }));
    setErrors((prev) => ({ ...prev, files: undefined }));
  }

  function validateContact(): Errors {
    const found: Errors = {};
    const phone = fields.phone.trim();
    const email = fields.email.trim();
    if (fields.name.trim().length < 2) found.name = ERRORS.name;
    if (phone && !isPhone(phone)) found.phone = ERRORS.phone;
    if (email && !EMAIL_PATTERN.test(email)) found.email = ERRORS.email;
    if (!phone && !email) found.contact = ERRORS.contact;
    if (!consent) found.consent = ERRORS.consent;
    return found;
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (step === 0) return need ? go(1) : setErrors({ need: ERRORS.need });
    if (step === 1) return objects.length ? go(2) : setErrors({ objects: ERRORS.objects });
    if (step === 2) return go(3);

    const found = validateContact();
    if (Object.keys(found).length) return setErrors(found);

    setStatus('sending');
    setErrors({});
    const body = new FormData(event.currentTarget);   // carries the hidden spam trap
    body.set('need', need);
    objects.forEach((key) => body.append('objects', key));
    body.set('location', location);
    body.set('scope', scope);
    body.set('timeframe', timeframe);
    body.set('description', description);
    for (const [key, value] of Object.entries(fields)) body.set(key, value);
    body.set('consent', 'yes');
    body.delete('files');
    files.forEach(({ file }) => body.append('files', file));

    try {
      const response = await fetch('/api/anfrage', { method: 'POST', body });
      const result = await response.json().catch(() => null) as { ok?: boolean; fields?: Errors; preview?: boolean } | null;
      if (!response.ok || !result?.ok) {
        setErrors({ ...(result?.fields ?? {}), form: ERRORS.failed });
        return setStatus('idle');
      }
      setPreview(!!result.preview);
      moved.current = true;
      setStatus('done');
    } catch {
      setErrors({ form: ERRORS.offline });
      setStatus('idle');
    }
  }

  function reset() {
    files.forEach(({ url }) => url && URL.revokeObjectURL(url));
    setFiles([]);
    setNeed(preselect ?? '');
    setObjects([]);
    setLocation('');
    setScope('');
    setTimeframe('');
    setDescription('');
    setFields(FIELDS);
    setConsent(false);
    setStatus('idle');
    go(0);
  }

  if (status === 'done') {
    const email = fields.email.trim();
    const phone = fields.phone.trim();
    const how = email && phone ? t.done.byBoth : email ? t.done.byEmail : t.done.byPhone;
    return (
      <div ref={root} className="iform" role="status">
        <div className="iform__body iform__body--done">
          <span className="iform__done-icon"><Icon name="check" /></span>
          <h3 ref={heading} tabIndex={-1}>{fill(t.done.title, { name: fields.name.trim().split(/\s+/)[0] })}</h3>
          <p>{fill(t.done.text, { how })}</p>
          <p className="iform__hint">{t.done.urgent} <a href={SITE.phoneHref}>{SITE.phone}</a>.</p>
          {preview && <p className="iform__preview">{t.done.preview}</p>}
          <button className="btn btn--dark" type="button" onClick={reset}><ButtonContent>{t.done.again}</ButtonContent></button>
        </div>
      </div>
    );
  }

  const sending = status === 'sending';
  const optional = <small> {t.optional}</small>;

  return (
    <div ref={root} className="iform">
      <form className="iform__body" onSubmit={submit} noValidate>
        <ol className="iform__steps" aria-label={t.progressLabel}>
          {t.steps.map((label, i) => (
            <li key={label} className={cx(i === step && 'is-current', i < step && 'is-done')} aria-current={i === step ? 'step' : undefined}>
              <span className="iform__dot">{i < step ? <Icon name="check" /> : i + 1}</span>
              <span>{label}</span>
            </li>
          ))}
        </ol>

        {/* Spam trap: people never see or fill this field */}
        <div className="iform__trap" aria-hidden="true">
          <label>Website<input type="text" name="website" tabIndex={-1} autoComplete="off" /></label>
        </div>

        {step === 0 && (
          <fieldset className="iform__panel">
            <legend><h3 ref={heading} tabIndex={-1}>{t.needTitle} <span className="req">*</span></h3></legend>
            <div className="needs" role="radiogroup" aria-required="true">
              {NEEDS.map(({ key, image }) => (
                <label key={key} className={cx('need', `n-${key}`, need === key && 'is-on')}>
                  <input type="radio" name="need" value={key} checked={need === key} onChange={() => { setNeed(key); setErrors({}); }} />
                  <span className="need__img"><Image src={image} alt="" fill sizes="(max-width: 620px) 50vw, 280px" /></span>
                  <span className="need__text"><b>{t.needs[key].label}</b><small>{t.needs[key].hint}</small></span>
                  <span className="need__check" aria-hidden="true"><Icon name="check" /></span>
                </label>
              ))}
            </div>
            {errors.need && <p className="iform__error" role="alert">{errors.need}</p>}
          </fieldset>
        )}

        {step === 1 && (
          <fieldset className="iform__panel">
            <legend><h3 ref={heading} tabIndex={-1}>{t.objectsTitle} <span className="req">*</span></h3></legend>
            <p className="iform__hint">{t.objectsHint}</p>
            <div className="choices">
              {OBJECTS.map(({ key }) => (
                <label key={key} className={cx('choice', objects.includes(key) && 'is-on')}>
                  <input type="checkbox" name="objects" value={key} checked={objects.includes(key)} onChange={() => toggleObject(key)} />
                  <span className="choice__box" aria-hidden="true"><Icon name="check" /></span>
                  <span>{t.objects[key]}</span>
                </label>
              ))}
            </div>
            {errors.objects && <p className="iform__error" role="alert">{errors.objects}</p>}
          </fieldset>
        )}

        {step === 2 && (
          <div className="iform__panel">
            <h3 ref={heading} tabIndex={-1}>{t.scopeTitle}</h3>
            <div className="iform__grid">
              <TextField label={<>{t.location}{optional}</>} name="location" autoComplete="address-level2" placeholder={t.locationPlaceholder} value={location} onChange={(event) => setLocation(event.target.value)} />
              <TextField label={<>{t.scope}{optional}</>} name="scope" placeholder={t.scopePlaceholder} value={scope} onChange={(event) => setScope(event.target.value)} />
            </div>

            <fieldset className="timeframes">
              <legend>{t.timeframe}{optional}</legend>
              <div className="pills">
                {TIMEFRAMES.map(({ key }) => (
                  <label key={key} className={cx('pill', timeframe === key && 'is-on')}>
                    <input type="radio" name="timeframe" value={key} checked={timeframe === key} onChange={() => setTimeframe(key)} />
                    {t.timeframes[key]}
                  </label>
                ))}
              </div>
            </fieldset>

            <label className="field">
              <span>{t.description}{optional}</span>
              <textarea name="description" rows={4} maxLength={4000} value={description} onChange={(event) => setDescription(event.target.value)}
                placeholder={t.descriptionPlaceholder} />
            </label>

            <div className="files">
              <p className="files__label">{t.files} <small>{fill(t.filesNote, { max: FILE_LIMITS.maxCount })}</small></p>
              <ul className="files__list">
                {files.map(({ id, url, file }) => (
                  <li key={id}>
                    {url
                      // A local preview of the visitor's own file: nothing for next/image to optimise
                      // eslint-disable-next-line @next/next/no-img-element
                      ? <img src={url} alt={file.name} />
                      : <span className="files__pdf"><Icon name="file" /><small>{file.name}</small></span>}
                    <button type="button" aria-label={fill(t.remove, { name: file.name })} onClick={() => removeFile(id)}><Icon name="close" /></button>
                  </li>
                ))}
                {files.length < FILE_LIMITS.maxCount && (
                  <li>
                    <label className={cx('files__add', status === 'busy' && 'is-busy')}>
                      <input type="file" accept="image/*,application/pdf" multiple onChange={addFiles} disabled={status === 'busy'} />
                      <Icon name={status === 'busy' ? 'clock' : 'paperclip'} />
                      <span>{status === 'busy' ? t.preparing : t.attach}</span>
                    </label>
                  </li>
                )}
              </ul>
              {errors.files && <p className="iform__error" role="alert">{errors.files}</p>}
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="iform__panel">
            <h3 ref={heading} tabIndex={-1}>{t.contactTitle}</h3>
            <div className="iform__grid">
              <TextField label={<>{t.company}{optional}</>} name="company" autoComplete="organization" value={fields.company} onChange={set('company')} wide />
              <TextField label={<>{t.name}<span className="req"> *</span></>} required name="name" autoComplete="name" value={fields.name} onChange={set('name')} error={errors.name} wide />
              <TextField label={t.phone} name="phone" type="tel" autoComplete="tel" inputMode="tel" value={fields.phone} onChange={set('phone')} error={errors.phone} />
              <TextField label={t.email} name="email" type="email" autoComplete="email" inputMode="email" value={fields.email} onChange={set('email')} error={errors.email} />
              {errors.contact
                ? <p className="iform__error iform__wide" role="alert">{errors.contact}</p>
                : <p className="iform__hint iform__wide">{t.either}</p>}
            </div>

            <label className={cx('consent', errors.consent && 'has-error')}>
              <input type="checkbox" name="consent" checked={consent} onChange={(event) => { setConsent(event.target.checked); setErrors((prev) => ({ ...prev, consent: undefined })); }} aria-invalid={!!errors.consent} />
              <span className="choice__box" aria-hidden="true"><Icon name="check" /></span>
              <span>{t.consent.before}<a href="/datenschutz" target="_blank">{t.consent.link}</a>{t.consent.after} <span className="req">*</span></span>
            </label>
            {errors.consent && <p className="iform__error" role="alert">{errors.consent}</p>}
            {errors.form && <p className="iform__error iform__error--box" role="alert">{errors.form}</p>}
          </div>
        )}

        <div className="iform__nav">
          {step > 0 && <button className="back-link" type="button" onClick={() => go(step - 1)} disabled={sending}><Icon name="left" /><span>{t.back}</span></button>}
          <button className="btn btn--mint" type="submit" disabled={sending || status === 'busy'}>
            <ButtonContent icon={step < 3 ? 'arrow' : 'send'}>{step < 3 ? t.next : sending ? t.sending : t.send}</ButtonContent>
          </button>
        </div>
      </form>
    </div>
  );
}

/** The form on the contact page: a service page links there with `?leistung=…`, and the form starts on it. */
export function InquiryFormFromQuery() {
  const need = useSearchParams().get('leistung');
  return <InquiryForm preselect={isNeed(need) ? need : undefined} />;
}

function TextField({ label, error, wide, ...input }: {
  label: ReactNode; error?: string; wide?: boolean;
} & InputHTMLAttributes<HTMLInputElement>) {
  return (
    <label className={cx('field', wide && 'iform__wide', error && 'has-error')}>
      <span>{label}</span>
      <input type="text" aria-invalid={!!error} {...input} />
      {error && <span className="field__error" role="alert">{error}</span>}
    </label>
  );
}
