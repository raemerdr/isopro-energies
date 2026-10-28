import type { Metadata, Viewport } from 'next';
import { Lexend } from 'next/font/google';
import { DevBar } from '@/components/dev-bar';
import { I18nProvider } from '@/components/i18n';
import { JsonLd } from '@/components/json-ld';
import { Loader } from '@/components/loader';
import { Motion } from '@/components/motion';
import { ScrollFx } from '@/components/scroll-fx';
import { SiteFooter } from '@/components/site-footer';
import { SiteHeader } from '@/components/site-header';
import { SmoothScroll } from '@/components/smooth-scroll';
import { PHOTOS } from '@/lib/content';
import { getCopy, getLang } from '@/lib/i18n/server';
import { GOOGLE_REVIEWS } from '@/lib/reviews';
import { BUSINESS_ID, absolute } from '@/lib/seo';
import { serviceHref, servicesIn } from '@/lib/services';
import { SITE } from '@/lib/site';
import './globals.css';

// Self-hosted by next/font: no request goes to Google. Lexend throughout, as in the reference design.
const lexend = Lexend({ subsets: ['latin'], weight: ['300', '400', '500'], variable: '--font-lexend' });

export async function generateMetadata(): Promise<Metadata> {
  const { meta } = await getCopy();
  return {
    metadataBase: new URL(SITE.url),
    title: { default: meta.title, template: `%s | ${SITE.name}` },
    description: meta.description,
    openGraph: { type: 'website', locale: meta.locale, siteName: SITE.legalName, images: [PHOTOS.hero] },
    twitter: { card: 'summary_large_image' },
  };
}

export const viewport: Viewport = { themeColor: '#ffffff' };

// Runs before first paint: enables the loading screen and the hidden-until-revealed states, and drops
// them again if the app never reports `is-ready` (script error, very slow network).
const BOOT_SCRIPT = "document.documentElement.classList.add('js');setTimeout(function(){var h=document.documentElement;if(!h.classList.contains('is-ready'))h.classList.remove('js')},5000)";

export default async function RootLayout({ children }: LayoutProps<'/'>) {
  const lang = await getLang();
  const copy = await getCopy();
  const services = servicesIn(copy);

  // What search engines learn about the business and the site (schema.org). Other pages refer to the
  // business by its @id (lib/seo.ts): as the author of the blog, the provider of the services.
  const business = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'LocalBusiness',
        '@id': BUSINESS_ID,
        name: SITE.legalName,
        description: copy.meta.description,
        url: SITE.url,
        logo: absolute('/brand/logo.png'),
        image: absolute(PHOTOS.hero),
        telephone: SITE.phoneHref.replace('tel:', ''),
        email: SITE.email,
        address: { '@type': 'PostalAddress', streetAddress: SITE.street, postalCode: SITE.zip, addressLocality: SITE.city, addressCountry: 'DE' },
        hasMap: GOOGLE_REVIEWS.url,
        sameAs: [GOOGLE_REVIEWS.url],
        areaServed: [{ '@type': 'Country', name: 'DE' }, { '@type': 'Country', name: 'AT' }, { '@type': 'Country', name: 'CH' }],
        knowsAbout: services.map(({ name }) => name),
        hasOfferCatalog: {
          '@type': 'OfferCatalog',
          name: copy.client.nav.services,
          itemListElement: services.map(({ slug, name, summary }) => ({
            '@type': 'Offer',
            itemOffered: { '@type': 'Service', name, description: summary, url: absolute(serviceHref(slug)) },
          })),
        },
      },
      { '@type': 'WebSite', '@id': absolute('/#website'), url: SITE.url, name: SITE.legalName, inLanguage: 'de-DE', publisher: { '@id': BUSINESS_ID } },
    ],
  };

  return (
    <html lang={lang} className={lexend.variable} data-scroll-behavior="smooth" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: BOOT_SCRIPT }} />
        <JsonLd data={business} />
      </head>
      <body>
        <I18nProvider lang={lang} copy={copy.client}>
          <Loader />
          <a className="skip-link" href="#main">{copy.skip}</a>
          <SiteHeader services={services.map(({ slug, name, summary, card }) => ({ href: serviceHref(slug), name, summary, image: card }))} />
          {children}
          <SiteFooter />
          <Motion />
          <ScrollFx />
          <SmoothScroll />
          {process.env.NODE_ENV === 'development' && <DevBar />}
        </I18nProvider>
      </body>
    </html>
  );
}
