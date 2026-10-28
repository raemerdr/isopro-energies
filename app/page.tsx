/* The start page, in the reference design's order (Movera, research/movera-reference.md): the photo hero,
   "Über uns" with numbers, the stacking services, the process on dark, why IsoPro, the Google reviews,
   the two ways of working together (the reference's pricing), references, the inquiry form, the blog,
   the FAQ and the closing call. */
import type { Metadata } from 'next';
import Image from 'next/image';
import type { CSSProperties } from 'react';
import { Button, Link } from '@/components/cta';
import { GoogleG, Icon, Stars } from '@/components/icons';
import { POST_CARD_SIZES, PostCard } from '@/components/post-card';
import { ReferenceCard } from '@/components/reference-card';
import { Reviews } from '@/components/reviews';
import { Audiences, ContactSection, CtaBar, FaqSection, Impact, Process, SectionHead, ServicePanels, WhyChoose } from '@/components/sections';
import { POSTS, categoryOf } from '@/lib/blog';
import { AVATARS, HOME_PICKS, PHOTOS } from '@/lib/content';
import { fill } from '@/lib/i18n';
import { getCopy, getLang } from '@/lib/i18n/server';
import { referencesIn } from '@/lib/references';
import { GOOGLE_REVIEWS, REVIEWS } from '@/lib/reviews';
import { idx } from '@/lib/ui';

// The start page's title and description are the site's defaults (app/layout.tsx)
export const metadata: Metadata = { alternates: { canonical: '/' } };

export default async function HomePage() {
  const [copy, lang] = await Promise.all([getCopy(), getLang()]);
  const { hero, services, reviews, references, contact, blog } = copy.home;
  const refs = referencesIn(copy);
  const picks = HOME_PICKS.map((id) => refs.find((reference) => reference.id === id)!);
  const rating = GOOGLE_REVIEWS.rating.toLocaleString(lang);

  return (
    <main id="main">
      <section className="hero">
        <div className="hero__media" data-reveal="zoom" style={{ '--focus': PHOTOS.heroFocus, '--focus-narrow': PHOTOS.heroFocusNarrow } as CSSProperties}>
          <Image src={PHOTOS.hero} alt="" fill priority sizes="100vw" />
        </div>
        <div className="hero__inner wrap">
          <div className="hero__top">
            <h1 className="h1" data-reveal="down">{hero.title}</h1>
            <div data-reveal="down" style={idx(3)}><Button href="/leistungen" variant="mint">{hero.button}</Button></div>
          </div>
          <div className="hero__bottom" data-reveal style={idx(4)}>
            <div className="hero__about">
              {/* After the reference's "500+ verified reviews": the Google rating, linking to the reviews. The faces
                  are stock models, so the line names the rating only, not them */}
              <a className="hero__trust" href={GOOGLE_REVIEWS.url} target="_blank" rel="noopener">
                <ul aria-hidden="true">{AVATARS.map((src) => <li key={src}><Image src={src} alt="" width={80} height={80} sizes="40px" /></li>)}</ul>
                <span className="hero__score">
                  <span><GoogleG /><b>{rating}</b><Stars value={GOOGLE_REVIEWS.rating} label={fill(hero.reviews.stars, { rating })} /></span>
                  <small>{fill(hero.reviews.count, { count: GOOGLE_REVIEWS.count })}</small>
                </span>
              </a>
              <p className="hero__lead">{hero.lead}</p>
            </div>
            <a className="hero__scroll" href="#ueber-uns">{hero.scroll}<Icon name="chevrons" /></a>
          </div>
        </div>
      </section>

      <Impact id="ueber-uns" />

      <section className="section section--top-0" id="leistungen">
        <div className="wrap">
          <SectionHead tag={services.subtitle} title={services.title} aside={<Button href="/leistungen" variant="light">{services.button}</Button>} />
          <ServicePanels />
        </div>
      </section>

      <Process />

      <WhyChoose />

      <section className="section">
        <div className="wrap">
          <SectionHead tag={reviews.subtitle} title={reviews.title} aside={<p className="text-lg">{reviews.text}</p>} />
          <Reviews reviews={REVIEWS} rating={rating} labels={{ stars: hero.reviews.stars, count: reviews.count, source: reviews.source, button: reviews.button }} />
        </div>
      </section>

      <Audiences />

      <section className="section">
        <div className="wrap">
          <SectionHead tag={references.subtitle} title={references.title} aside={<Button href="/referenzen" variant="light">{references.button}</Button>} />
          <ul className="cards3 cards3--stagger">
            {picks.map((reference, i) => (
              <li key={reference.id} data-reveal style={idx(i * 2)}>
                <Link href="/referenzen" className="rcard-link">
                  <ReferenceCard reference={reference} sizes="(max-width: 767px) 100vw, 420px" />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <ContactSection tag={contact.subtitle} title={contact.title} />

      <section className="section section--top-0">
        <div className="wrap">
          <SectionHead tag={blog.subtitle} title={blog.title} aside={<Button href="/blog" variant="light">{blog.button}</Button>} />
          {/* The four newest, two to a row */}
          <ul className="posts">
            {POSTS.slice(0, 4).map((post, i) => (
              <li key={post.slug} data-reveal style={idx((i % 2) * 2)}><PostCard post={post} category={categoryOf(post, copy)} labels={copy.blog} sizes={POST_CARD_SIZES} /></li>
            ))}
          </ul>
        </div>
      </section>

      <FaqSection />

      <CtaBar />
    </main>
  );
}
