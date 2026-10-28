/* About, after the reference design's about page: the photo hero, the impact block, "Mission & Vision"
   (two text blocks beside two photos), and the timeline beside a photo, here the five steps of a job.
   The reference's team section is left out: there are no team facts yet (OPEN.facts). */
import type { Metadata } from 'next';
import Image from 'next/image';
import { CtaBar, Impact, PartnerLogos, PhotoHero, SectionHead } from '@/components/sections';
import { PHOTOS } from '@/lib/content';
import { fill } from '@/lib/i18n';
import { getCopy } from '@/lib/i18n/server';
import { SITE } from '@/lib/site';
import { idx, pad } from '@/lib/ui';

export async function generateMetadata(): Promise<Metadata> {
  const { about } = await getCopy();
  return { ...about.meta, alternates: { canonical: '/ueber-uns' } };
}

export default async function AboutPage() {
  const copy = await getCopy();
  const { banner, mission, timeline, partners } = copy.about;
  return (
    <main id="main">
      <PhotoHero tag={banner.subtitle} title={banner.title} text={banner.text} button={banner.button} image={PHOTOS.aboutHero} focus="60% 30%" />

      <Impact more={false} />

      <section className="section section--top-0">
        <div className="wrap">
          <SectionHead tag={mission.subtitle} title={mission.title} aside={<p className="text-lg">{mission.text}</p>} />
          <div className="mission">
            <div className="mission__text">
              {mission.blocks.map(({ title, text, items }, i) => (
                <div key={title} data-reveal style={idx(i * 2)}>
                  <h3 className="h3">{title}</h3>
                  <p>{text}</p>
                  {items.length > 0 && <ul className="dots">{items.map((item) => <li key={item}>{item}</li>)}</ul>}
                </div>
              ))}
              <p className="sign" data-reveal>{fill(mission.director, { name: SITE.director })}</p>
            </div>
            <div className="mission__img mission__img--large" data-reveal style={idx(1)}>
              <Image src={PHOTOS.aboutMission[0]} alt={mission.imageAlts[0]} fill sizes="(max-width: 991px) 100vw, 420px" />
            </div>
            <div className="mission__img" data-reveal style={idx(3)}>
              <Image src={PHOTOS.aboutMission[1]} alt={mission.imageAlts[1]} fill sizes="(max-width: 991px) 100vw, 260px" />
            </div>
          </div>
        </div>
      </section>

      <section className="section section--top-0" id="ablauf">
        <div className="wrap">
          <SectionHead tag={timeline.subtitle} title={timeline.title} />
          <div className="timeline">
            <ol className="timeline__list">
              {copy.process.steps.map(({ title, text }, i) => (
                <li key={title} data-reveal>
                  <span className="timeline__label">{fill(timeline.label, { n: pad(i + 1) })}</span>
                  <h3 className="h4">{title}</h3>
                  <p>{text}</p>
                </li>
              ))}
            </ol>
            <div className="timeline__img" data-reveal>
              <Image src={PHOTOS.aboutTimeline} alt="" fill sizes="(max-width: 991px) 100vw, 600px" />
            </div>
          </div>
          <PartnerLogos title={partners} />
        </div>
      </section>

      <CtaBar />
    </main>
  );
}
