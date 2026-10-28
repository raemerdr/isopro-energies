/* An article, laid out like a service page: a back link, the centred headline with a large photo, then
   one narrow column with the category, date and reading time, a short summary, the table of contents,
   the text, questions and answers and a call to the inquiry form (on the article's service); below, the
   other articles and the closing call. Search engines get it as a BlogPosting with a breadcrumb trail and
   its questions as an FAQPage. */
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Fragment } from 'react';
import { Button } from '@/components/cta';
import { Faq } from '@/components/faq';
import { JsonLd } from '@/components/json-ld';
import { POST_CARD_SIZES, PostCard } from '@/components/post-card';
import { RichText } from '@/components/rich-text';
import { CtaBar, PlainHero, SectionHead } from '@/components/sections';
import { POSTS, POST_SLUGS, categoryOf, findPost, minutesFor, postHref, wordCount } from '@/lib/blog';
import { fill } from '@/lib/i18n';
import { getCopy, getLang } from '@/lib/i18n/server';
import { NEED_FOR_SERVICE } from '@/lib/inquiry';
import { ORGANIZATION, absolute, breadcrumbs, faqPage } from '@/lib/seo';
import { serviceHref } from '@/lib/services';
import { idx } from '@/lib/ui';

// Only the articles in lib/blog.ts exist; anything else is a 404
export const dynamicParams = false;

export function generateStaticParams() {
  return POST_SLUGS.map((slug) => ({ slug }));
}

async function load(props: PageProps<'/blog/[slug]'>) {
  const { slug } = await props.params;
  const post = findPost(slug);
  if (!post) notFound();
  const [copy, lang] = await Promise.all([getCopy(), getLang()]);
  return { post, copy, lang };
}

export async function generateMetadata(props: PageProps<'/blog/[slug]'>): Promise<Metadata> {
  const { post, copy } = await load(props);
  const url = postHref(post.slug);
  return {
    title: post.seoTitle,
    description: post.description,
    keywords: post.keywords,
    alternates: { canonical: url, types: { 'application/rss+xml': '/blog/feed.xml' } },
    openGraph: {
      type: 'article',
      url,
      title: post.title,
      description: post.description,
      images: [{ url: post.image, alt: post.imageAlt }],
      publishedTime: post.published,
      modifiedTime: post.updated,
      section: categoryOf(post, copy),
      tags: post.keywords,
    },
  };
}

export default async function PostPage(props: PageProps<'/blog/[slug]'>) {
  const { post, copy, lang } = await load(props);
  const t = copy.blog;
  const category = categoryOf(post, copy);
  const date = new Date(post.published).toLocaleDateString(lang === 'de' ? 'de-DE' : 'en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
  const inquiry = `/kontakt?leistung=${NEED_FOR_SERVICE[post.service]}#anfrage`;
  // The next articles in the list, starting after this one
  const at = POSTS.indexOf(post);
  const others = [...POSTS.slice(at + 1), ...POSTS.slice(0, at)].slice(0, 2);

  const url = absolute(postHref(post.slug));
  const data = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BlogPosting',
        '@id': `${url}#article`,
        mainEntityOfPage: url,
        headline: post.title,
        description: post.description,
        image: absolute(post.image),
        datePublished: post.published,
        dateModified: post.updated,
        inLanguage: 'de-DE',
        articleSection: category,
        keywords: post.keywords.join(', '),
        wordCount: wordCount(post),
        author: ORGANIZATION,
        publisher: ORGANIZATION,
        about: { '@type': 'Service', name: copy.services[post.service].name, url: absolute(serviceHref(post.service)) },
      },
      breadcrumbs([{ name: t.home, path: '/' }, { name: t.banner.subtitle, path: '/blog' }, { name: post.title, path: postHref(post.slug) }]),
      faqPage(post.faq),
    ],
  };

  return (
    <main id="main">
      <JsonLd data={data} />
      <PlainHero back={{ href: '/blog', label: t.back }} title={post.title} text={post.excerpt} image={post.image} alt={post.imageAlt} focus={post.focus} />

      <section className="section">
        <div className="wrap">
          <article className="article">
            <p className="article__meta" data-reveal>
              <span>{category}</span>
              <span><time dateTime={post.published}>{fill(t.published, { date })}</time></span>
              <span>{fill(t.readTime, { n: minutesFor(post) })}</span>
            </p>

            <aside className="article__summary" data-reveal>
              <h2>{t.summary}</h2>
              <ul className="article__list">{post.summary.map((point) => <li key={point}>{point}</li>)}</ul>
            </aside>

            <nav className="article__toc" aria-label={t.contents} data-reveal>
              <p>{t.contents}</p>
              <ol>{post.sections.map(({ id, heading }) => <li key={id}><a href={`#${id}`}>{heading}</a></li>)}</ol>
            </nav>

            {post.sections.map(({ id, heading, blocks }) => (
              <Fragment key={id}>
                <h2 id={id} data-reveal>{heading}</h2>
                {blocks.map((block, i) => (
                  typeof block === 'string' ? <p key={i} data-reveal><RichText>{block}</RichText></p>
                    : 'list' in block ? <ul key={i} className="article__list" data-reveal>{block.list.map((item) => <li key={item}><RichText>{item}</RichText></li>)}</ul>
                      : <h3 key={i} data-reveal>{block.h3}</h3>
                ))}
              </Fragment>
            ))}

            <h2 id="fragen" data-reveal>{t.faq}</h2>
            <Faq items={post.faq} />

            <div className="article__cta" data-reveal>
              <p>{t.ctaText}</p>
              <Button href={inquiry}>{t.ctaButton}</Button>
            </div>
          </article>
        </div>
      </section>

      <section className="section section--top-0">
        <div className="wrap">
          <SectionHead tag={t.banner.subtitle} title={t.more} aside={<Button href="/blog" variant="light">{t.back}</Button>} />
          <ul className="posts">
            {others.map((other, i) => (
              <li key={other.slug} data-reveal style={idx(i)}>
                <PostCard post={other} category={categoryOf(other, copy)} labels={t} sizes={POST_CARD_SIZES} />
              </li>
            ))}
          </ul>
        </div>
      </section>

      <CtaBar />
    </main>
  );
}
