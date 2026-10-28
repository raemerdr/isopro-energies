/* A reference as an image card, after the reference design's blog cards: the photo, the category and
   what the photo shows on one line, the title under it. Confirmed project facts (Branche, Ort, Umfang)
   take the second place on the line once the client sends them. */
import Image from 'next/image';
import type { Reference } from '@/lib/references';

export function ReferenceCard({ reference, sizes }: { reference: Reference; sizes: string }) {
  const { image, focus, tag, title, specs, facts = [] } = reference;
  const detail = (facts[0] ?? specs[0])?.[1];
  return (
    <article className="rcard">
      <span className="rcard__img"><Image src={image} alt={title} fill sizes={sizes} style={focus ? { objectPosition: focus } : undefined} /></span>
      <p className="rcard__meta"><span>{tag}</span>{detail && <span>{detail}</span>}</p>
      <h3 className="rcard__title">{title}</h3>
    </article>
  );
}
