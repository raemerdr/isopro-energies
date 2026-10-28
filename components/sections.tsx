/* The page sections shared between pages, after the reference design (Movera, research/movera-reference.md).
   Wording: lib/i18n; photos and icons: lib/content.ts and lib/services.ts. */
import Image from 'next/image';
import { Suspense, type ReactNode } from 'react';
import { DotRing } from '@/components/brand';
import { Button, Link } from '@/components/cta';
import { Faq, type FaqItem } from '@/components/faq';
import { DuoIcon, Icon, StepIcon } from '@/components/icons';
import { InquiryForm, InquiryFormFromQuery } from '@/components/inquiry-form';
import { Words } from '@/components/words';
import { IMPACT_ICONS, PARTNERS, PHOTOS, PROCESS_ICONS, WHY_ICONS } from '@/lib/content';
import { fill } from '@/lib/i18n';
import { getCopy } from '@/lib/i18n/server';
import { serviceHref, servicesIn, type Service } from '@/lib/services';
import { cx, idx, pad } from '@/lib/ui';

/** The small pill above a headline ("Über uns", "Unsere Leistungen"). `glass` sits on photos, `dark` on dark sections. */
export function Tag({ children, tone }: { children: ReactNode; tone?: 'dark' | 'glass' }) {
  return <p className={cx('tag', tone && `tag--${tone}`)} data-reveal>{children}</p>;
}

/** A section's opening: tag and headline (its words rise into place), with a button or a line of text on
    the right, or centred. */
export function SectionHead({ tag, title, aside, center, tone }: {
  tag: ReactNode; title: string; aside?: ReactNode; center?: boolean; tone?: 'dark';
}) {
  return (
    <div className={cx('shead', center && 'shead--center')}>
      <div className="shead__main">
        <Tag tone={tone}>{tag}</Tag>
        <h2 className="h2" data-reveal="words"><Words>{title}</Words></h2>
      </div>
      {aside && <div className="shead__aside" data-reveal style={idx(2)}>{aside}</div>}
    </div>
  );
}

/** An inner page's opening on a full-screen photo: tag, headline, a line and a button, centred. */
export function PhotoHero({ tag, title, text, button, href = '/kontakt#anfrage', image, focus }: {
  tag: string; title: string; text?: string; button?: string; href?: string; image: string; focus?: string;
}) {
  return (
    <section className="phero">
      <div className="phero__media" data-reveal="zoom">
        <Image src={image} alt="" fill priority sizes="100vw" style={focus ? { objectPosition: focus } : undefined} />
      </div>
      <div className="phero__content wrap">
        <p className="tag tag--glass" data-reveal="down">{tag}</p>
        <h1 className="h1" data-reveal="down" style={idx(3)}>{title}</h1>
        {text && <p className="lead" data-reveal="down" style={idx(5)}>{text}</p>}
        {button && <div data-reveal="down" style={idx(6)}><Button href={href} variant="mint">{button}</Button></div>}
      </div>
    </section>
  );
}

/** An inner page's opening on the page colour: tag or back link, headline and line, centred, with an
    optional large photo below (service pages). */
export function PlainHero({ tag, back, title, text, button, href, image, alt = '', focus }: {
  tag?: string; back?: { href: string; label: string }; title: string; text?: string; button?: string; href?: string;
  image?: string; alt?: string; focus?: string;
}) {
  return (
    <section className="pthero">
      <div className="wrap">
        <div className="pthero__text">
          {back
            ? <div data-reveal="down"><Link href={back.href} className="back-link"><Icon name="left" />{back.label}</Link></div>
            : tag && <p className="tag" data-reveal="down">{tag}</p>}
          <h1 className="h1" data-reveal="down" style={idx(2)}>{title}</h1>
          {text && <p className="lead" data-reveal="down" style={idx(4)}>{text}</p>}
          {button && href && <div data-reveal="down" style={idx(5)}><Button href={href}>{button}</Button></div>}
        </div>
        {image && (
          <div className="pthero__img" data-reveal style={idx(4)}>
            <Image src={image} alt={alt} fill priority sizes="(max-width: 1400px) 100vw, 1328px" style={focus ? { objectPosition: focus } : undefined} />
          </div>
        )}
      </div>
    </section>
  );
}

/** "Über uns": the logo's dot ring, a tag and one centred statement (its grey words marked in the copy),
    three tall photos with the middle one raised, the button under it, and three short points. */
export async function Impact({ id, more = true }: { id?: string; more?: boolean }) {
  const { home: { impact: t } } = await getCopy();
  return (
    <section className="section impact" id={id}>
      <div className="wrap">
        <div className="impact__head">
          <div data-reveal="fade"><DotRing className="impact__mark" /></div>
          <p className="tag tag--outline" data-reveal>{t.subtitle}</p>
          <h2 className="impact__statement" data-reveal="words"><Words>{t.statement}</Words></h2>
        </div>
        <div className="impact__photos">
          {PHOTOS.impact.map(({ src, focus }, i) => (
            <div key={src} className="impact__photo" data-reveal style={idx(i === 1 ? 0 : 2)}>
              <Image src={src} alt={t.imageAlts[i]} fill sizes="(max-width: 767px) 33vw, 380px" style={{ objectPosition: focus }} />
            </div>
          ))}
        </div>
        {more && <div className="impact__cta" data-reveal style={idx(3)}><Button href="/ueber-uns" variant="mint">{t.button}</Button></div>}
        <ul className="impact__points">
          {t.points.map((point, i) => (
            <li key={point} data-reveal style={idx(i * 2)}><DuoIcon name={IMPACT_ICONS[i]} />{point}</li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/** The services as cards that stack while the page scrolls: each one sticks below the header and the next
    slides over it (the covered card blurs: components/scroll-fx.tsx). */
export async function ServiceStack() {
  const copy = await getCopy();
  const services = servicesIn(copy);
  return (
    <ol className="stack" data-stack>
      {services.map(({ slug, name, summary, card }, i) => (
        <li key={slug} className="stack__card">
          <div className="stack__body">
            <div className="stack__top">
              <span>{pad(i + 1)}</span>
              <span className="stack__dots" aria-hidden="true">{services.map((service, j) => <i key={service.slug} className={cx(j <= i && 'is-on')} />)}</span>
            </div>
            <div className="stack__bottom">
              <h3 className="h3">{name}</h3>
              <p>{summary}</p>
              <Button href={serviceHref(slug)} variant="soft" label={fill(copy.servicePage.more, { name })}>{copy.home.services.details}</Button>
            </div>
          </div>
          <div className="stack__img"><Image src={card} alt="" fill sizes="(max-width: 991px) 100vw, 760px" /></div>
        </li>
      ))}
    </ol>
  );
}

/** The services on the start page as tall photo panels side by side (the user's reference of 28 Oct
    2026): each a link to its page, with a line in a speech bubble on the photo and the name and summary
    at its foot. With a mouse the panel under the pointer widens and opens its summary; below 992 px they
    form one row that scrolls sideways, summaries showing. The reveal sits on an inner box, so its
    `transition` does not replace the panel's own. */
export async function ServicePanels() {
  const copy = await getCopy();
  const { taglines } = copy.home.services;
  return (
    <ul className="panels">
      {servicesIn(copy).map(({ slug, name, summary, hero, heroFocus }, i) => (
        <li key={slug} className="panel" style={idx(i)}>
          <div className="panel__in" data-reveal>
            <Link href={serviceHref(slug)} className="panel__link">
              <span className="panel__img"><Image src={hero} alt="" fill sizes="(max-width: 991px) 80vw, 40vw" style={heroFocus ? { objectPosition: heroFocus } : undefined} /></span>
              <span className="panel__bubble" aria-hidden="true">{taglines[slug]}</span>
              <span className="panel__go" aria-hidden="true"><Icon name="out" /></span>
              <h3 className="panel__title">{name}</h3>
              <span className="panel__more"><span className="panel__text">{summary}</span></span>
            </Link>
          </div>
        </li>
      ))}
    </ul>
  );
}

/** The process, on the page colour: headline left, button right, and a card per step with its
    number, a large soft drawing and the text in an inner box (the user's reference of 27 Oct 2026). The
    cards rise into one line and sharpen while the section is pinned in view (`data-rise`: how far each
    card starts below the line, in rem; components/scroll-fx.tsx). */
export async function Process() {
  const { process, cta } = await getCopy();
  return (
    <section className="process" data-rise="2,10,18,26,34">
      <div className="process__pin">
        <div className="wrap">
          <SectionHead tag={process.subtitle} title={process.title} aside={<Button href="/kontakt#anfrage" variant="mint">{cta.button}</Button>} />
          <ol className="process__cards">
            {process.steps.map(({ title, text }, i) => (
              <li key={title} className="pcard" data-rise-item>
                <span className="pcard__step">{fill(process.step, { n: pad(i + 1) })}</span>
                <span className="pcard__icon"><StepIcon name={PROCESS_ICONS[i]} /></span>
                <div className="pcard__body">
                  <h3 className="h4">{title}</h3>
                  <p>{text}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

/** "Warum IsoPro" on dark, after the user's reference of 28 Oct 2026: a photo of a fitter on the left
    that fades into the dark, and on the right a tag, the headline, a line and the four points, each with
    a mint icon and title. The photo is mirrored, so the fitter faces the text. */
export async function WhyChoose() {
  const { home: { why } } = await getCopy();
  return (
    <section className="why">
      {/* The reveal sits on the outer box: revealing resets `transform`, which would undo the mirroring */}
      <div className="why__media" data-reveal="zoom">
        <div className="why__photo">
          <Image src={PHOTOS.why} alt={why.imageAlt} fill sizes="(max-width: 991px) 100vw, 62vw" style={{ objectPosition: '65% 35%' }} />
        </div>
      </div>
      <div className="wrap why__inner">
        <div className="why__content">
          <p className="tag tag--caps" data-reveal>{why.subtitle}</p>
          <h2 className="h2 why__title" data-reveal="words"><Words>{why.title}</Words></h2>
          <p className="why__lead" data-reveal style={idx(2)}>{why.text}</p>
          <ul className="why__list">
            {why.features.map(({ title, text }, i) => (
              <li key={title} data-reveal style={idx(i + 3)}>
                <h3 className="h4"><Icon name={WHY_ICONS[i]} />{title}</h3>
                <p>{text}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

/** The ways of working with IsoPro, where the reference has prices: the headline (grey words marked in
    the copy) over a list divided by dashed lines, beside a tall photo whose button sits in a notch on
    its lower edge. */
export async function Audiences() {
  const { home: { audiences: t } } = await getCopy();
  return (
    <section className="section">
      <div className="wrap together">
        <div className="together__text">
          <p className="tag tag--outline" data-reveal>{t.subtitle}</p>
          <h2 className="h2" data-reveal="words"><Words>{t.title}</Words></h2>
          <ul className="together__list">
            {t.items.map(({ title, text, link }, i) => (
              <li key={title} data-reveal style={idx(i * 2)}>
                <h3 className="together__title">{title}</h3>
                <p>{text}</p>
                {link && <Link href="/karriere#nachunternehmer" className="together__link">{link}<Icon name="arrow" /></Link>}
              </li>
            ))}
          </ul>
        </div>
        <div className="together__media" data-reveal style={idx(2)}>
          <div className="together__img"><Image src={PHOTOS.together} alt={t.imageAlt} fill sizes="(max-width: 991px) 100vw, 640px" /></div>
          <div className="together__cta"><Button href="/kontakt#anfrage" variant="mint" block>{t.button}</Button></div>
        </div>
      </div>
    </section>
  );
}

/** "So kommen Sie zu Ihrem Angebot": the inquiry form across the page in one column, on the page colour,
    with anything passed as `side` (the contact page's ways to reach IsoPro) above it. A service page links
    here with `?leistung=…`, and the form starts on it. */
export function ContactSection({ tag, title, side }: { tag: string; title: string; side?: ReactNode }) {
  return (
    <section className="section" id="anfrage">
      <div className="wrap">
        <SectionHead center tag={tag} title={title} />
        <div className="contact">
          {side}
          <div className="contact__form" data-reveal style={idx(2)}>
            <Suspense fallback={<InquiryForm />}><InquiryFormFromQuery /></Suspense>
          </div>
        </div>
      </div>
    </section>
  );
}

export async function FaqSection({ items }: { items?: FaqItem[] }) {
  const { faq } = await getCopy();
  return (
    <section className="section" id="faq">
      <div className="wrap">
        <SectionHead center tag={faq.subtitle} title={faq.title} />
        <Faq items={items ?? faq.items} />
      </div>
    </section>
  );
}

/** The other services as image cards, at the end of a service page. */
export async function OtherServices({ current }: { current: Service['slug'] }) {
  const copy = await getCopy();
  const { others: t } = copy.servicePage;
  const others = servicesIn(copy).filter(({ slug }) => slug !== current);
  return (
    <section className="section">
      <div className="wrap">
        <SectionHead tag={t.subtitle} title={t.title} aside={<Button href="/leistungen" variant="light">{t.button}</Button>} />
        <ul className="cards3">
          {others.map(({ slug, name, summary, card }, i) => (
            <li key={slug} data-reveal style={idx(i * 2)}>
              <Link href={serviceHref(slug)} className="rcard">
                <span className="rcard__img"><Image src={card} alt="" fill sizes="(max-width: 767px) 100vw, 420px" /></span>
                <b className="rcard__title">{name}</b>
                <span className="rcard__text">{summary}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/** The material and system brands, as white tiles. */
export function PartnerLogos({ title }: { title?: string }) {
  return (
    <div className="logos" data-reveal="fade">
      {title && <p className="logos__title">{title}</p>}
      <ul>
        {PARTNERS.map(({ name, logo, width, height }) => (
          <li key={name}><Image src={logo} alt={name} width={width} height={height} sizes="160px" /></li>
        ))}
      </ul>
    </div>
  );
}

/** The closing call of the inner pages, after the user's second reference: a full-width photo with the
    headline, a line and the button centred on it. */
export async function CtaBar() {
  const { cta } = await getCopy();
  return (
    <section className="cta">
      <div className="cta__media" data-reveal="zoom">
        <Image src={PHOTOS.cta} alt="" fill sizes="100vw" style={{ objectPosition: PHOTOS.ctaFocus }} />
      </div>
      <div className="cta__content wrap">
        <h2 className="h2" data-reveal="words"><Words>{cta.title}</Words></h2>
        <p className="lead" data-reveal style={idx(3)}>{cta.text}</p>
        <div data-reveal style={idx(4)}><Button href="/kontakt#anfrage" variant="mint">{cta.button}</Button></div>
      </div>
    </section>
  );
}
