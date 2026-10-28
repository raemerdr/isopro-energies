/* Careers, in the reference design's language: the photo hero, why IsoPro beside a photo, the open
   positions as white rows (applications by email), what the job involves in three white cards. */
import type { Metadata } from 'next';
import Image from 'next/image';
import { Icon } from '@/components/icons';
import { CtaBar, PhotoHero, SectionHead } from '@/components/sections';
import { PHOTOS } from '@/lib/content';
import { getCopy } from '@/lib/i18n/server';
import { SITE } from '@/lib/site';
import { idx, pad } from '@/lib/ui';

export async function generateMetadata(): Promise<Metadata> {
  const { career } = await getCopy();
  return { ...career.meta, alternates: { canonical: '/karriere' } };
}

const mailto = (subject: string) => `mailto:${SITE.email}?subject=${encodeURIComponent(subject)}`;

export default async function CareerPage() {
  const { banner, why, rolesTitle, rolesHeading, roles, lists, subject } = (await getCopy()).career;
  return (
    <main id="main">
      <PhotoHero tag={banner.subtitle} title={banner.title} text={banner.text} button={banner.button} href={mailto(subject)} image={PHOTOS.careerHero} focus="50% 30%" />

      <section className="section">
        <div className="wrap">
          <div className="split">
            <div className="split__text">
              <SectionHead tag={why.subtitle} title={why.title} />
              <p className="text-lg" data-reveal>{why.text}</p>
            </div>
            <div className="split__img" data-reveal style={idx(2)}><Image src={PHOTOS.careerWhy} alt="" fill sizes="(max-width: 991px) 100vw, 600px" style={{ objectPosition: '50% 40%' }} /></div>
          </div>
        </div>
      </section>

      <section className="section section--top-0">
        <div className="wrap">
          <SectionHead tag={rolesTitle} title={rolesHeading} />
          <ul className="jobs">
            {Object.entries(roles).map(([id, { title, text }], i) => (
              <li key={id} id={id} data-reveal style={idx(i)}>
                <a className="job" href={mailto(`${subject}: ${title}`)}>
                  <small>{pad(i + 1)}</small>
                  <span className="job__text"><b>{title}</b><span>{text}</span></span>
                  <span className="round-btn round-btn--dark"><Icon name="arrow" /></span>
                </a>
              </li>
            ))}
          </ul>
          <div className="lists3">
            {lists.map(({ title, items }, i) => (
              <div key={title} className="list-card" data-reveal style={idx(i * 2)}>
                <h3 className="h4">{title}</h3>
                <ul className="ticks">{items.map((item) => <li key={item}><Icon name="checkCircle" />{item}</li>)}</ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CtaBar />
    </main>
  );
}
