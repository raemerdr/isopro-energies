/* The pages' photos, icons and logos. Their words are in lib/i18n (German in de.ts); lists here run in
   the same order as the texts they illustrate. */
import type { DuoName, IconName, StepName } from '@/components/icons';

const IMG = '/img';
const P = '/img/projekte';

export const PHOTOS = {
  hero: `${IMG}/hero-ingenieur.jpg`,
  /** The part of the hero photo to keep in view when it is cropped (CSS object-position), wide and
      narrow; on narrow screens the headline sits low (globals.css), under the face */
  heroFocus: '67% 12%',
  heroFocusNarrow: '64% 12%',
  /** The three tall photos of "Über uns", left to right (the middle one sits higher) */
  impact: [{ src: `${P}/p06.jpg`, focus: '50% 40%' }, { src: `${P}/p17.jpg`, focus: '50% 40%' }, { src: `${P}/p11.jpg`, focus: '50% 60%' }],
  why: `${IMG}/aufmass.jpg`,
  together: `${IMG}/anlage-luftbild.jpg`,
  /** Behind the closing call at the end of the start page and the inner pages: the clad tanks under a
      stormy sky */
  cta: `${IMG}/tank.jpg`,
  ctaFocus: '50% 42%',
  servicesHero: `${IMG}/waerme-wolle-mantel.jpg`,
  /** A faint texture in the mint rating card beside the Google reviews (blended to the mint) */
  reviewsBg: `${IMG}/hero-rohre.jpg`,
  aboutHero: `${IMG}/hero-cladding.jpg`,
  aboutMission: [`${P}/p29.jpg`, `${P}/p05.jpg`],
  aboutTimeline: `${IMG}/lueftung-halle.jpg`,
  careerHero: `${IMG}/karriere.jpg`,
  careerWhy: `${P}/p06.jpg`,
};

/** The faces beside the Google rating in the hero: stock models (Magnific), not IsoPro's reviewers */
export const AVATARS = ['/img/avatars/avatar-1.jpg', '/img/avatars/avatar-2.jpg', '/img/avatars/avatar-3.jpg', '/img/avatars/avatar-4.jpg'];

/** "Über uns": Weniger Energieverlust, Brandschutz inklusive, Lückenlos dokumentiert */
export const IMPACT_ICONS: DuoName[] = ['heat', 'fire', 'file'];

/** The process steps: Anfrage, Begehung & Aufmaß, Angebot, Montage, Abnahme & Doku */
export const PROCESS_ICONS: StepName[] = ['inquiry', 'visit', 'quote', 'install', 'handover'];

/** "Warum IsoPro": Saubere Details, Lückenlos dokumentiert, Ein Ansprechpartner, Rücksicht auf den Betrieb */
export const WHY_ICONS: IconName[] = ['layers', 'file', 'users', 'clock'];

/** The three references on the start page */
export const HOME_PICKS = ['p13', 'p18', 'p11'];

export const PARTNERS = [
  { name: 'Isover (Saint-Gobain)', logo: '/brand/partners/isover-saint-gobain.png', width: 382, height: 119 },
  { name: 'Armacell', logo: '/brand/partners/armacell.png', width: 382, height: 90 },
  { name: 'Foamglas', logo: '/brand/partners/foamglas.png', width: 383, height: 78 },
  { name: 'Alujet', logo: '/brand/partners/alujet.png', width: 382, height: 168 },
  { name: 'Geralit ISO-Systeme', logo: '/brand/partners/geralit-iso-systeme.png', width: 382, height: 140 },
];
