/* An article as a photo card (blog page, start page, under an article), after the user's reference of
   28 Oct 2026: the photo fills the card, the service it belongs to and the reading time run across its
   top, the title and a white "Weiterlesen" pill across its foot, each on a shade. The whole card is the
   link. Lists of them: `.posts` (two to a row; with an odd count the first runs the full width). */
import Image from 'next/image';
import { Link } from '@/components/cta';
import { minutesFor, postHref, type Post } from '@/lib/blog';
import { fill } from '@/lib/i18n';

export function PostCard({ post, category, labels, sizes }: {
  post: Post; category: string; labels: { readTime: string; read: string }; sizes: string;
}) {
  const { slug, image, focus, title } = post;
  return (
    <Link href={postHref(slug)} className="post">
      <span className="post__img"><Image src={image} alt="" fill sizes={sizes} style={focus ? { objectPosition: focus } : undefined} /></span>
      <span className="post__top"><span>{category}</span><span>{fill(labels.readTime, { n: minutesFor(post) })}</span></span>
      <span className="post__bottom">
        <h3 className="post__title">{title}</h3>
        <span className="post__more" aria-hidden="true">{labels.read}</span>
      </span>
    </Link>
  );
}

/** The `sizes` for a card two to a row (one on phones; the first of an odd count runs the full width) */
export const POST_CARD_SIZES = '(max-width: 767px) 100vw, 660px';
