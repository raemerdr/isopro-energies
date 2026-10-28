/* The inquiry form's choices and rules, shared by the form (components/inquiry-form.tsx) and the
   route that emails it (app/api/anfrage/route.ts). Four steps: Leistung → Objekt → Umfang → Kontakt. */
import type { ServiceSlug } from '@/lib/services';

const IMG = '/img';

/** `label` is what IsoPro reads in the email, always German; the form shows the words from lib/i18n.
    `image` fills the choice's tile. */
export const NEEDS = [
  { key: 'waerme', label: 'Wärmedämmung', image: `${IMG}/waerme-rohr.jpg` },
  { key: 'kaelte', label: 'Kältedämmung', image: `${IMG}/kaelte-anlage.jpg` },
  { key: 'brand', label: 'Brandschutz', image: '/img/projekte/p18.jpg' },
  { key: 'schall', label: 'Schallschutz', image: `${IMG}/rohrbruecke.jpg` },
  { key: 'sonstiges', label: 'Anderes', image: `${IMG}/detail-endkappe.jpg` },
] as const;

export const OBJECTS = [
  { key: 'rohr', label: 'Rohrleitungen & Armaturen' },
  { key: 'behaelter', label: 'Behälter & Tanks' },
  { key: 'kanal', label: 'Lüftungs- & Klimakanäle' },
  { key: 'verteiler', label: 'Verteiler & Technikzentrale' },
  { key: 'durchfuehrung', label: 'Wand- & Deckendurchführungen' },
  { key: 'sonstiges', label: 'Anderes' },
] as const;

export const TIMEFRAMES = [
  { key: 'bald', label: 'So bald wie möglich' },
  { key: 'quartal', label: 'In den nächsten 3 Monaten' },
  { key: 'spaeter', label: 'Später' },
  { key: 'offen', label: 'Noch offen' },
] as const;

export type NeedKey = (typeof NEEDS)[number]['key'];
export type ObjectKey = (typeof OBJECTS)[number]['key'];
export type TimeframeKey = (typeof TIMEFRAMES)[number]['key'];

export const isNeed = (value: unknown): value is NeedKey => NEEDS.some(({ key }) => key === value);
export const isObject = (value: unknown): value is ObjectKey => OBJECTS.some(({ key }) => key === value);
export const isTimeframe = (value: unknown): value is TimeframeKey => TIMEFRAMES.some(({ key }) => key === value);

export const labelOf = <T extends { key: string; label: string }>(list: readonly T[], key: string) => list.find((item) => item.key === key)?.label ?? key;

/** The form step a service page starts on, with its need already chosen. */
export const NEED_FOR_SERVICE: Record<ServiceSlug, NeedKey> = {
  waermedaemmung: 'waerme',
  kaeltedaemmung: 'kaelte',
  brandschutz: 'brand',
  schallschutz: 'schall',
};

/* Photos and plans are optional. The form shrinks photos in the browser before sending, so the whole
   request stays under the 4.5 MB body limit of serverless hosts. PDFs go as they are. */
export const FILE_LIMITS = {
  maxCount: 6,
  maxEdge: 1600,          // px, longest side of a photo after shrinking
  maxTotalBytes: 3.8 * 1024 * 1024,
} as const;

export const isAllowedFile = (type: string) => type.startsWith('image/') || type === 'application/pdf';

export const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
/** A phone number: digits with the usual separators, at least 6 digits. */
export const isPhone = (value: string) => /^[+\d][\d\s()/.-]*$/.test(value) && value.replace(/\D/g, '').length >= 6;
