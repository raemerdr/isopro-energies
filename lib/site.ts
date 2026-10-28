/* Company facts, taken from the client's current site and Impressum (research/01-current-site-audit.md).
   What still has to be settled with the client is listed in OPEN, as a checklist for launch; the pages
   show nothing of it (the user asked for no markers on the pages, 28 Oct 2026). */

const ADDRESS_QUERY = encodeURIComponent('IsoPro Energies GmbH, Hafenbahnstraße 15, 68305 Mannheim');

export const SITE = {
  name: 'IsoPro Energies',
  legalName: 'IsoPro Energies GmbH',
  tagline: 'Dämmtechnik & Brandschutz',
  url: 'https://www.isopro-energies.de',
  director: 'Hakan Özbas',
  street: 'Hafenbahnstraße 15',
  zip: '68305',
  city: 'Mannheim',
  phone: '06234 812 98 45',
  phoneHref: 'tel:+4962348129845',
  email: 'info@isopro-energies.de',
  register: 'HRB 747116',
  court: 'Amtsgericht Mannheim',
  taxNo: '38184/51204',
  insurer: { name: 'Gothaer Versicherung AG', street: 'Gothaer Allee 1', town: '50969 Köln', scope: 'Europa' },
  mapsUrl: `https://www.google.com/maps/search/?api=1&query=${ADDRESS_QUERY}`,
} as const;

/** Facts to settle with the client before launch */
export const OPEN = {
  register: 'Handelsregister prüfen: das alte Impressum nennt nur „747116“, ohne HRB.',
  area: 'Einsatzgebiet prüfen: Start nennt DE · AT · CH, die Kontaktseite „bundesweit auf Anfrage“.',
  partners: 'Partnerstatus und Logo-Nutzung bei Isover, Armacell, Foamglas, Alujet und Geralit bestätigen lassen.',
  facts: 'Fehlen noch: Gründungsjahr, Teamgröße, Meister/Ingenieure, Zertifikate (z. B. SCC), Herstellerschulungen.',
  references: 'Fehlen noch: 5–8 Referenzen mit Branche, Ort, Jahr, Umfang (m², lfm) und Freigabe für Kundennamen.',
  stock: 'Stockfoto (Magnific). Durch eigene Fotos ersetzen, sobald ein Shooting stattgefunden hat.',
  response: 'Antwortzeit auf Anfragen mit dem Kunden festlegen, dann hier nennen.',
  blog: 'Die sechs Blogbeiträge (lib/blog.ts) sind von uns geschriebene Entwürfe mit allgemeinem Fachwissen. Vom Kunden fachlich prüfen und freigeben lassen (besonders die GEG-Werte im Beitrag zur Dämmdicke) und die Veröffentlichungsdaten zum Launch setzen.',
} as const;

/** Agency credit in the footer. */
export const CREDIT = {
  label: 'Site made by',
  name: 'nüll.',
  url: 'https://xn--nll-hoa.com/',
} as const;

/** The site-wide "Projekt anfragen" target: the inquiry form at the end of the current page. */
export const INQUIRY_ANCHOR = '#anfrage';
