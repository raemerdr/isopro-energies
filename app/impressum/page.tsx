import type { Metadata } from 'next';
import { SITE } from '@/lib/site';

export const metadata: Metadata = { title: 'Impressum', alternates: { canonical: '/impressum' }, robots: { index: false } };

/* From the client's old Impressum, corrected: § 5 DDG instead of the repealed § 5 TMG, the email line
   filled in, and the EU online dispute platform left out (it closed in July 2025).
   Still to confirm: the HRB number (OPEN in lib/site.ts). Have it checked before launch. */
export default function ImprintPage() {
  return (
    <main id="main" className="plain-page">
      <article className="legal wrap" lang="de">
        <h1 className="h1">Impressum</h1>
        <p className="legal__draft">Entwurf: Angaben aus dem bisherigen Impressum, vor dem Livegang zu prüfen.</p>

        <h2>Angaben gemäß § 5 DDG</h2>
        <p>
          {SITE.legalName}<br />
          {SITE.street}<br />{SITE.zip} {SITE.city}
        </p>
        <p>Vertreten durch: {SITE.director} (Geschäftsführer)</p>
        <p>
          Registergericht: {SITE.court}<br />
          Registernummer: {SITE.register}
        </p>

        <h2>Kontakt</h2>
        <p>
          Telefon: <a href={SITE.phoneHref}>{SITE.phone}</a><br />
          E-Mail: <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
        </p>

        <h2>Steuernummer</h2>
        <p>{SITE.taxNo}</p>

        <h2>Angaben zur Betriebshaftpflichtversicherung</h2>
        <p>
          <strong>Name und Sitz des Versicherers:</strong><br />
          {SITE.insurer.name}<br />
          {SITE.insurer.street}<br />
          {SITE.insurer.town}
        </p>
        <p><strong>Geltungsraum der Versicherung:</strong><br />{SITE.insurer.scope}</p>

        <h2>Verbraucherstreitbeilegung</h2>
        <p>Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.</p>
      </article>
    </main>
  );
}
