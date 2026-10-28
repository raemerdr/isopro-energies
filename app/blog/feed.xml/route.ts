/* The blog as an RSS feed, for feed readers (linked from the blog's pages). Built once, at build time. */
import { POSTS, postHref } from '@/lib/blog';
import { de } from '@/lib/i18n/de';
import { absolute } from '@/lib/seo';
import { SITE } from '@/lib/site';

export const dynamic = 'force-static';

const escape = (text: string) => text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

export function GET() {
  const items = POSTS.map((post) => {
    const url = absolute(postHref(post.slug));
    return `<item><title>${escape(post.title)}</title><link>${url}</link><guid isPermaLink="true">${url}</guid><pubDate>${new Date(post.published).toUTCString()}</pubDate><description>${escape(post.description)}</description></item>`;
  }).join('');
  const xml = `<?xml version="1.0" encoding="UTF-8"?><rss version="2.0"><channel><title>${escape(`${de.blog.banner.title} | ${SITE.name}`)}</title><link>${absolute('/blog')}</link><description>${escape(de.blog.meta.description)}</description><language>de-DE</language>${items}</channel></rss>`;
  return new Response(xml, { headers: { 'Content-Type': 'application/rss+xml; charset=utf-8' } });
}
