/* Text with links written as [label](/path), as in the blog articles (lib/blog.ts). */
import { Fragment } from 'react';
import { Link } from '@/components/cta';

const LINK = /^\[([^\]]+)\]\(([^)]+)\)$/;

export function RichText({ children }: { children: string }) {
  return children.split(/(\[[^\]]+\]\([^)]+\))/g).map((part, i) => {
    const link = LINK.exec(part);
    return link ? <Link key={i} href={link[2]} className="text-link">{link[1]}</Link> : <Fragment key={i}>{part}</Fragment>;
  });
}
