/* Shared pieces of the structured data (schema.org) the pages give search engines: the business as the
   author and publisher of everything on the site, and breadcrumb trails. The business itself is
   described in full in app/layout.tsx. */
import { SITE } from '@/lib/site';

export const absolute = (path: string) => `${SITE.url}${path}`;

/** The business, referred to by its @id from other pages' data */
export const BUSINESS_ID = absolute('/#business');

export const ORGANIZATION = { '@type': 'Organization', '@id': BUSINESS_ID, name: SITE.legalName, url: SITE.url, logo: absolute('/brand/logo.png') };

/** A breadcrumb trail, from the start page down to the current page */
export const breadcrumbs = (trail: { name: string; path: string }[]) => ({
  '@type': 'BreadcrumbList',
  itemListElement: trail.map(({ name, path }, i) => ({ '@type': 'ListItem', position: i + 1, name, item: absolute(path) })),
});

/** Questions and answers as schema.org FAQPage */
export const faqPage = (items: { q: string; a: string }[]) => ({
  '@type': 'FAQPage',
  mainEntity: items.map(({ q, a }) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })),
});
