'use client';
/* The Google reviews, after the reference's testimonial slider: on the left, where the reference shows the
   customer's portrait, a mint card with the overall rating and the same stock faces as the hero (not the
   reviewers, so no names go with them); on the right one review at a time, changed with the arrows. The reviews are quoted word for word in German (lib/reviews.ts), in every language. */
import Image from 'next/image';
import { useState } from 'react';
import { Button } from '@/components/cta';
import { useCopy } from '@/components/i18n';
import { GoogleG, Icon, Stars } from '@/components/icons';
import { AVATARS, PHOTOS } from '@/lib/content';
import { fill } from '@/lib/i18n';
import { GOOGLE_REVIEWS, type Review } from '@/lib/reviews';

export function Reviews({ reviews, rating, labels }: {
  reviews: Review[];
  /** The rating as written in the page's language (4,4 or 4.4) */
  rating: string;
  labels: { stars: string; count: string; source: string; button: string };
}) {
  const t = useCopy().reviews;
  const [at, setAt] = useState(0);
  const go = (step: number) => setAt((prev) => (prev + step + reviews.length) % reviews.length);
  const { name, stars, text } = reviews[at];

  return (
    <div className="reviews">
      <div className="reviews__score" data-reveal>
        <span className="reviews__bg" aria-hidden="true"><Image src={PHOTOS.reviewsBg} alt="" fill sizes="(max-width: 767px) 100vw, 520px" /></span>
        <GoogleG className="reviews__g" />
        <b>{rating}</b>
        <Stars value={GOOGLE_REVIEWS.rating} label={fill(labels.stars, { rating })} />
        <p>{fill(labels.count, { count: GOOGLE_REVIEWS.count })}</p>
        <ul aria-hidden="true">{AVATARS.map((src) => <li key={src}><Image src={src} alt="" width={80} height={80} sizes="40px" /></li>)}</ul>
        <Button href={GOOGLE_REVIEWS.url} variant="dark">{labels.button}</Button>
      </div>

      <div className="reviews__card" data-reveal>
        <span className="reviews__mark" aria-hidden="true"><Icon name="quote" /></span>
        {/* the key restarts the slide-in animation on every change */}
        <figure key={at} className="review" aria-live="polite" aria-label={fill(t.position, { n: at + 1, total: reviews.length })}>
          <blockquote lang="de" className={text.length > 280 ? 'is-long' : undefined}>
            {text.split('\n\n').map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
          </blockquote>
          <figcaption>
            <b>{name}</b>
            <span><Stars value={stars} label={fill(labels.stars, { rating: stars })} />{labels.source}</span>
          </figcaption>
        </figure>
        <div className="reviews__nav">
          <span className="reviews__count" aria-hidden="true">{at + 1} / {reviews.length}</span>
          <button type="button" className="round-btn" aria-label={t.prev} onClick={() => go(-1)}><Icon name="left" /></button>
          <button type="button" className="round-btn" aria-label={t.next} onClick={() => go(1)}><Icon name="arrow" /></button>
        </div>
      </div>
    </div>
  );
}
