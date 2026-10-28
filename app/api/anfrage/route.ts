/* Receives the inquiry form and emails it to IsoPro through Resend, photos and plans attached.
   Nothing is written to a database. Needs RESEND_API_KEY, INQUIRY_TO and INQUIRY_FROM (.env.example). */
import { Resend } from 'resend';
import {
  EMAIL_PATTERN, FILE_LIMITS, NEEDS, OBJECTS, TIMEFRAMES, isAllowedFile, isNeed, isObject, isPhone, isTimeframe, labelOf,
} from '@/lib/inquiry';
import { SITE } from '@/lib/site';

export const runtime = 'nodejs';

const CALL_US = `Bitte rufen Sie uns an: ${SITE.phone}.`;

const escapeHtml = (value: string) => value.replace(/[&<>"']/g, (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[char]!);
const fail = (status: number, error: string, fields?: Record<string, string>) => Response.json({ ok: false, error, fields }, { status });

export async function POST(request: Request) {
  let form: FormData;
  try {
    form = await request.formData();
  } catch {
    return fail(400, 'Die Anfrage konnte nicht gelesen werden. Bitte versuchen Sie es erneut.');
  }
  const read = (key: string, max: number) => {
    const value = form.get(key);
    return typeof value === 'string' ? value.trim().slice(0, max) : '';
  };

  // Bots fill the hidden field: answer as if it worked and send nothing
  if (read('website', 200)) return Response.json({ ok: true });

  const need = read('need', 40);
  const objects = form.getAll('objects').filter(isObject);
  const timeframe = read('timeframe', 20);
  const location = read('location', 160);
  const scope = read('scope', 300);
  const description = read('description', 4000);
  const company = read('company', 160);
  const name = read('name', 120);
  const phone = read('phone', 40);
  const email = read('email', 160);

  const fields: Record<string, string> = {};
  if (!isNeed(need)) fields.need = 'Bitte wählen Sie eine Leistung.';
  if (!objects.length) fields.objects = 'Bitte wählen Sie mindestens einen Bereich.';
  if (timeframe && !isTimeframe(timeframe)) fields.form = 'Bitte prüfen Sie den Zeitraum.';
  if (name.length < 2) fields.name = 'Bitte geben Sie Ihren Namen an.';
  if (phone && !isPhone(phone)) fields.phone = 'Bitte prüfen Sie die Telefonnummer.';
  if (email && !EMAIL_PATTERN.test(email)) fields.email = 'Bitte prüfen Sie die E-Mail-Adresse.';
  if (!phone && !email) fields.contact = 'Bitte geben Sie eine Telefonnummer oder eine E-Mail-Adresse an.';
  if (read('consent', 5) !== 'yes') fields.consent = 'Bitte stimmen Sie der Datenschutzerklärung zu.';

  const files = form.getAll('files').filter((entry): entry is File => entry instanceof File && entry.size > 0);
  if (files.length > FILE_LIMITS.maxCount) fields.files = `Sie können bis zu ${FILE_LIMITS.maxCount} Dateien anhängen.`;
  else if (files.some((file) => !isAllowedFile(file.type))) fields.files = 'Bitte nur Fotos oder PDF-Dateien anhängen.';
  else if (files.reduce((sum, file) => sum + file.size, 0) > FILE_LIMITS.maxTotalBytes) fields.files = 'Die Dateien sind zusammen zu groß.';

  if (Object.keys(fields).length || !isNeed(need)) return fail(422, 'Bitte prüfen Sie Ihre Angaben.', fields);

  const rows: [string, string][] = [
    ['Leistung', labelOf(NEEDS, need)],
    ['Bereiche', objects.map((key) => labelOf(OBJECTS, key)).join(', ')],
    ['Ort der Anlage', location || '–'],
    ['Umfang', scope || '–'],
    ['Zeitraum', timeframe ? labelOf(TIMEFRAMES, timeframe) : '–'],
    ['Beschreibung', description || '–'],
    ['Firma', company || '–'],
    ['Name', name],
    ['Telefon', phone || '–'],
    ['E-Mail', email || '–'],
    ['Anhänge', files.length ? `${files.length} im Anhang` : 'keine'],
  ];

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    // Local development without a key: show what would have been sent, so the form can still be tried out
    if (process.env.NODE_ENV !== 'production') {
      console.info('[anfrage] RESEND_API_KEY fehlt, nichts versendet:', Object.fromEntries(rows), files.map((file) => `${file.name} (${Math.round(file.size / 1024)} kB)`));
      return Response.json({ ok: true, preview: true });
    }
    console.error('[anfrage] RESEND_API_KEY fehlt: Anfrage konnte nicht versendet werden');
    return fail(503, `Der Versand ist gerade nicht möglich. ${CALL_US}`);
  }

  const { error } = await new Resend(apiKey).emails.send({
    from: process.env.INQUIRY_FROM ?? `${SITE.name} Website <anfrage@isopro-energies.de>`,
    to: process.env.INQUIRY_TO ?? SITE.email,
    replyTo: email || undefined,
    subject: `Anfrage: ${labelOf(NEEDS, need)} – ${company || name}`,
    text: rows.map(([label, value]) => `${label}: ${value}`).join('\n'),
    html: `<table cellpadding="8" style="border-collapse:collapse;font:15px/1.5 Arial,sans-serif;color:#172124">${rows
      .map(([label, value]) => `<tr><th align="left" valign="top" style="border-bottom:1px solid #dcdcd5;white-space:nowrap">${label}</th><td style="border-bottom:1px solid #dcdcd5;white-space:pre-wrap">${escapeHtml(value)}</td></tr>`)
      .join('')}</table>`,
    attachments: await Promise.all(files.map(async (file, i) => ({
      filename: file.name.replace(/[^\w.\- ]+/g, '_').slice(-80) || `anhang-${i + 1}`,
      content: Buffer.from(await file.arrayBuffer()),
    }))),
  });

  if (error) {
    console.error('[anfrage] Resend:', error);
    return fail(502, `Die Anfrage konnte nicht gesendet werden. ${CALL_US}`);
  }
  return Response.json({ ok: true });
}
