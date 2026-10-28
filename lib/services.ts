/* The four services, each with its own page (app/leistungen/[slug]/page.tsx). This file holds their
   photos and icons; the words are in lib/i18n (`services`), and `servicesIn` puts the two together. */
import type { IconName } from '@/components/icons';
import type { Copy } from '@/lib/i18n';

export type ServiceSlug = 'waermedaemmung' | 'kaeltedaemmung' | 'brandschutz' | 'schallschutz';

interface ServicePhotos {
  slug: ServiceSlug;
  icon: IconName;
  hero: string;
  heroFocus?: string;
  card: string;
  /** One photo per scope item, in the order of the texts */
  scope: { image: string; focus?: string }[];
}

type ServiceText = Copy['services'][ServiceSlug];

export type Service = Omit<ServicePhotos, 'scope'> & Omit<ServiceText, 'scope'> & {
  scope: (ServiceText['scope'][number] & ServicePhotos['scope'][number])[];
};

const IMG = '/img';
const P = '/img/projekte';

const PHOTOS: ServicePhotos[] = [
  {
    slug: 'waermedaemmung',
    icon: 'heat',
    hero: `${IMG}/waerme-wolle-mantel.jpg`,
    heroFocus: '40% 50%',
    card: `${IMG}/waerme-rohr.jpg`,
    scope: [{ image: `${IMG}/armaturen.jpg` }, { image: `${IMG}/behaelter-kolonne.jpg` }, { image: `${P}/p13.jpg` }, { image: `${IMG}/detail-endkappe.jpg` }],
  },
  {
    slug: 'kaeltedaemmung',
    icon: 'cold',
    hero: `${IMG}/kaelte-rohre.jpg`,
    card: `${IMG}/kaelte-anlage.jpg`,
    scope: [{ image: `${IMG}/kaelte-rohre.jpg` }, { image: `${P}/p11.jpg`, focus: '50% 60%' }, { image: `${IMG}/kaelte-anlage.jpg` }, { image: `${IMG}/behaelter.jpg` }],
  },
  {
    slug: 'brandschutz',
    icon: 'fire',
    hero: `${IMG}/lueftung-halle.jpg`,
    card: `${P}/p18.jpg`,
    scope: [{ image: `${P}/p08.jpg` }, { image: `${P}/p21.jpg` }, { image: `${P}/p14.jpg` }, { image: `${IMG}/lueftung-halle.jpg` }],
  },
  {
    slug: 'schallschutz',
    icon: 'sound',
    hero: `${IMG}/lueftung-kanaele.jpg`,
    card: `${IMG}/rohrbruecke.jpg`,
    scope: [{ image: `${IMG}/rohrbruecke.jpg` }, { image: `${IMG}/lueftung-kanaele.jpg` }, { image: `${P}/p28.jpg` }],
  },
];

export const SERVICE_SLUGS = PHOTOS.map(({ slug }) => slug);

export const isServiceSlug = (value: string): value is ServiceSlug => SERVICE_SLUGS.includes(value as ServiceSlug);

/** The services with their words in the given language. */
export const servicesIn = (copy: Copy): Service[] => PHOTOS.map((photos) => {
  const text = copy.services[photos.slug];
  return { ...photos, ...text, scope: text.scope.map((item, i) => ({ ...item, ...photos.scope[i] })) };
});

export const serviceHref = (slug: ServiceSlug) => `/leistungen/${slug}`;
