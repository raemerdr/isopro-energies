/* The blog: the articles as photo cards under a plain opening, then the closing call. Search engines get
   the list as a schema.org Blog, and feed readers the RSS feed (app/blog/feed.xml). */
import type { Metadata } from 'next';
import { JsonLd } from '@/components/json-ld';
import { POST_CARD_SIZES, PostCard } from '@/components/post-card';
import { CtaBar, PlainHero } from '@/components/sections';
import { POSTS, categoryOf, postHref } from '@/lib/blog';
import { getCopy } from '@/lib/i18n/server';
import { ORGANIZATION, absolute, breadcrumbs } from '@/lib/seo';
import { idx } from '@/lib/ui';

export async function generateMetadata(): Promise<Metadata> {
  const { blog } = await getCopy();
  return {
    ...blog.meta,
    alternates: { canonical: '/blog', types: { 'application/rss+xml': '/blog/feed.xml' } },
    openGraph: { type: 'website', url: '/blog', title: blog.meta.title, description: blog.meta.description, images: [POSTS[0].image] },
  };
}

export default async function BlogPage() {
  const copy = await getCopy();
  const { banner, meta, home, readTime, read } = copy.blog;
  const data = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Blog',
        '@id': absolute('/blog#blog'),
        url: absolute('/blog'),
        name: banner.title,
        description: meta.description,
        inLanguage: 'de-DE',
        publisher: ORGANIZATION,
        blogPost: POSTS.map((post) => ({ '@type': 'BlogPosting', headline: post.title, url: absolute(postHref(post.slug)), datePublished: post.published, image: absolute(post.image) })),
      },
      breadcrumbs([{ name: home, path: '/' }, { name: banner.subtitle, path: '/blog' }]),
    ],
  };

  return (
    <main id="main">
      <JsonLd data={data} />
      <PlainHero tag={banner.subtitle} title={banner.title} text={banner.text} />
      <section className="section section--top-0">
        <div className="wrap">
          <ul className="posts">
            {POSTS.map((post, i) => (
              <li key={post.slug} data-reveal style={idx(i % 2)}>
                <PostCard post={post} category={categoryOf(post, copy)} labels={{ readTime, read }} sizes={POST_CARD_SIZES} />
              </li>
            ))}
          </ul>
        </div>
      </section>
      <CtaBar />
    </main>
  );
}
