/* Work from the client's own site photos (_source/images/projects, web copies in public/img/projekte).
   What each photo shows is in lib/i18n (`references`); `referencesIn` puts photo and words together.
   The old site has no project data: no client, place, year or quantity. Once the client sends project
   details, add them as `facts` and they appear on the card (see OPEN.references in lib/site.ts). */
import type { Copy } from '@/lib/i18n';

export type RefCategory = 'waerme' | 'kaelte' | 'brand' | 'lueftung';

export const REF_CATEGORIES: RefCategory[] = ['waerme', 'kaelte', 'brand', 'lueftung'];

type ReferenceId = keyof Copy['references'];

interface ReferencePhoto {
  id: ReferenceId;
  image: string;
  /** Part of the photo to keep in view when it is cropped (CSS object-position) */
  focus?: string;
  category: RefCategory;
}

export interface Reference extends ReferencePhoto {
  title: string;
  /** Short specification lines: label and value, set as a spec sheet */
  specs: [string, string][];
  /** The category's name, shown above the title */
  tag: string;
  /** Confirmed project facts from the client (Branche, Ort, Jahr, Umfang); empty until then */
  facts?: [string, string][];
}

const P = '/img/projekte';

const PHOTOS: ReferencePhoto[] = [
  { id: 'p13', image: `${P}/p13.jpg`, category: 'waerme' },
  { id: 'p18', image: `${P}/p18.jpg`, category: 'brand' },
  { id: 'p11', image: `${P}/p11.jpg`, focus: '50% 65%', category: 'kaelte' },
  { id: 'p05', image: `${P}/p05.jpg`, category: 'lueftung' },
  { id: 'p17', image: `${P}/p17.jpg`, focus: '50% 40%', category: 'lueftung' },
  { id: 'p06', image: `${P}/p06.jpg`, focus: '50% 40%', category: 'waerme' },
  { id: 'p08', image: `${P}/p08.jpg`, category: 'brand' },
  { id: 'p02', image: `${P}/p02.jpg`, focus: '50% 45%', category: 'kaelte' },
  { id: 'p29', image: `${P}/p29.jpg`, category: 'waerme' },
  { id: 'p28', image: `${P}/p28.jpg`, category: 'lueftung' },
  { id: 'p21', image: `${P}/p21.jpg`, category: 'brand' },
  { id: 'p19', image: `${P}/p19.jpg`, category: 'kaelte' },
  { id: 'p09', image: `${P}/p09.jpg`, focus: '50% 40%', category: 'waerme' },
  { id: 'p16', image: `${P}/p16.jpg`, category: 'lueftung' },
  { id: 'p23', image: `${P}/p23.jpg`, category: 'brand' },
  { id: 'p24', image: `${P}/p24.jpg`, focus: '50% 35%', category: 'kaelte' },
  { id: 'p27', image: `${P}/p27.jpg`, category: 'lueftung' },
  { id: 'p20', image: `${P}/p20.jpg`, focus: '50% 70%', category: 'waerme' },
  { id: 'p14', image: `${P}/p14.jpg`, category: 'brand' },
  { id: 'p30', image: `${P}/p30.jpg`, category: 'lueftung' },
];

/** The references with their words in the given language. */
export const referencesIn = (copy: Copy): Reference[] =>
  PHOTOS.map((photo) => ({ ...photo, ...copy.references[photo.id], tag: copy.refCategories[photo.category] }));
