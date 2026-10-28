import type { MetadataRoute } from 'next';
import { POSTS, postHref } from '@/lib/blog';
import { SERVICE_SLUGS, serviceHref } from '@/lib/services';
import { SITE } from '@/lib/site';

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ['', '/leistungen', ...SERVICE_SLUGS.map(serviceHref), '/referenzen', '/blog', '/ueber-uns', '/karriere', '/kontakt'];
  return [
    ...pages.map((path) => ({ url: `${SITE.url}${path}`, changeFrequency: 'monthly' as const, priority: path ? 0.8 : 1 })),
    // The articles, with the date each last changed
    ...POSTS.map((post) => ({ url: `${SITE.url}${postHref(post.slug)}`, lastModified: post.updated, changeFrequency: 'yearly' as const, priority: 0.6 })),
  ];
}
