/* A service page, after the reference design's service detail: a back link and the centred headline with
   a large photo, the text as one narrow column, then the other services and the closing bar. */
import type { Metadata } from 'next';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { Button } from '@/components/cta';
import { Faq } from '@/components/faq';
import { JsonLd } from '@/components/json-ld';
import { CtaBar, OtherServices, PlainHero } from '@/components/sections';
import { getCopy } from '@/lib/i18n/server';
import { NEED_FOR_SERVICE } from '@/lib/inquiry';
import { ORGANIZATION, absolute, breadcrumbs, faqPage } from '@/lib/seo';
import { SERVICE_SLUGS, isServiceSlug, serviceHref, servicesIn } from '@/lib/services';
import { idx } from '@/lib/ui';

// Only the four service pages exist; anything else is a 404
export const dynamicParams = false;

export function generateStaticParams() {
  return SERVICE_SLUGS.map((slug) => ({ slug }));
}

async function load(props: PageProps<'/leistungen/[slug]'>) {
  const { slug } = await props.params;
  if (!isServiceSlug(slug)) notFound();
  const copy = await getCopy();
  const services = servicesIn(copy);
  const index = services.findIndex((service) => service.slug === slug);
  return { service: services[index], t: copy.servicePage, nav: copy.client.nav };
}

export async function generateMetadata(props: PageProps<'/leistungen/[slug]'>): Promise<Metadata> {
  const { slug, hero, meta } = (await load(props)).service;
  return { title: meta.title, description: meta.description, alternates: { canonical: serviceHref(slug) }, openGraph: { type: 'website', url: serviceHref(slug), title: meta.title, description: meta.description, images: [hero] } };
}

export default async function ServicePage(props: PageProps<'/leistungen/[slug]'>) {
  const { service, t, nav } = await load(props);
  const inquiry = `/kontakt?leistung=${NEED_FOR_SERVICE[service.slug]}#anfrage`;
  // For search engines: the service, offered by the business, with the breadcrumb trail and its questions
  const data = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Service',
        '@id': absolute(`${serviceHref(service.slug)}#service`),
        name: service.name,
        serviceType: service.name,
        description: service.meta.description,
        url: absolute(serviceHref(service.slug)),
        image: absolute(service.hero),
        provider: ORGANIZATION,
        areaServed: [{ '@type': 'Country', name: 'DE' }, { '@type': 'Country', name: 'AT' }, { '@type': 'Country', name: 'CH' }],
      },
      breadcrumbs([{ name: nav.start, path: '/' }, { name: nav.services, path: '/leistungen' }, { name: service.name, path: serviceHref(service.slug) }]),
      faqPage(service.faq),
    ],
  };

  return (
    <main id="main">
      <JsonLd data={data} />
      <PlainHero
        back={{ href: '/leistungen', label: t.back }}
        title={service.name}
        text={service.summary}
        image={service.hero}
        focus={service.heroFocus}
      />

      <section className="section">
        <div className="wrap">
          <article className="article">
            <h2 data-reveal>{service.headline}</h2>
            <p data-reveal>{service.lead}</p>

            <ul className="article__gallery">
              {service.scope.map(({ title, image, focus }, i) => (
                <li key={title} className="reveal-img" data-reveal="img" style={idx(i)}>
                  <Image src={image} alt={title} fill sizes="(max-width: 767px) 50vw, 380px" style={focus ? { objectPosition: focus } : undefined} />
                </li>
              ))}
            </ul>

            <h2 data-reveal>{service.scopeTitle}</h2>
            {service.scope.map(({ title, text }) => (
              <div key={title} data-reveal>
                <h3>{title}</h3>
                <p>{text}</p>
              </div>
            ))}

            <h2 data-reveal>{t.benefits}</h2>
            <ul className="article__list" data-reveal>
              {service.benefits.map(({ title, text }) => <li key={title}><b>{title}.</b> {text}</li>)}
            </ul>

            <h2 data-reveal>{t.faq}</h2>
            <Faq items={service.faq} />

            <div className="article__cta" data-reveal>
              <p>{t.ctaText}</p>
              <Button href={inquiry}>{t.ctaButton}</Button>
            </div>
          </article>
        </div>
      </section>

      <OtherServices current={service.slug} />
      <CtaBar />
    </main>
  );
}
