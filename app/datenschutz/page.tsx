import type { Metadata } from 'next';
import { SITE } from '@/lib/site';

export const metadata: Metadata = { title: 'Datenschutzerklärung', alternates: { canonical: '/datenschutz' }, robots: { index: false } };

/* DRAFT. This describes what the new site actually does: the inquiry form goes out by email through
   Resend, fonts are self-hosted, there is no map embed, no cookies and no analytics; the cookie notice keeps the visitor's choice in localStorage (section 6). The old Wix policy
   (it even mentions a "Mobile-App") no longer fits. Before launch: name the hosting provider and have
   the text generated or checked (eRecht24 or a lawyer). */
export default function PrivacyPage() {
  return (
    <main id="main" className="plain-page">
      <article className="legal wrap" lang="de">
        <h1 className="h1">Datenschutzerklärung</h1>
        <p className="legal__draft">Entwurf: Diese Fassung beschreibt die neue Website und wird vor dem Livegang rechtlich geprüft und um den Hosting-Anbieter ergänzt.</p>

        <h2>1. Verantwortliche Stelle</h2>
        <p>
          {SITE.legalName}<br />
          vertreten durch {SITE.director}<br />
          {SITE.street}<br />{SITE.zip} {SITE.city}
        </p>
        <p>
          Telefon: <a href={SITE.phoneHref}>{SITE.phone}</a><br />
          E-Mail: <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
        </p>

        <h2>2. Hosting und Server-Logfiles</h2>
        <p>Beim Aufruf dieser Website verarbeitet der Hosting-Anbieter technisch notwendige Daten (zum Beispiel IP-Adresse, Datum und Uhrzeit des Abrufs, aufgerufene Seite, Browsertyp), um die Website auszuliefern und ihren sicheren Betrieb zu gewährleisten. Rechtsgrundlage ist Art. 6 Abs. 1 lit. f DSGVO.</p>

        <h2>3. Anfrageformular</h2>
        <p>Wenn Sie uns über das Anfrageformular schreiben, verarbeiten wir Ihre Angaben (Leistung und Bereiche, optional Ort, Umfang, Zeitraum, Beschreibung und angehängte Fotos oder Pläne, dazu Name, optional Firma, Telefonnummer und/oder E-Mail-Adresse), um Ihre Anfrage zu bearbeiten und Ihnen ein Angebot zu erstellen. Rechtsgrundlage ist Art. 6 Abs. 1 lit. b DSGVO, soweit Ihre Anfrage auf einen Vertrag gerichtet ist, im Übrigen Ihre Einwilligung nach Art. 6 Abs. 1 lit. a DSGVO.</p>
        <p>Die Angaben werden nicht in einer Datenbank der Website gespeichert, sondern per E-Mail an uns übermittelt. Für den Versand nutzen wir den Dienst Resend (Resend, Inc., USA) als Auftragsverarbeiter. Die Daten verbleiben bei uns, bis Sie uns zur Löschung auffordern, Ihre Einwilligung widerrufen oder der Zweck der Speicherung entfällt; gesetzliche Aufbewahrungsfristen bleiben unberührt.</p>

        <h2>4. Kontakt per E-Mail oder Telefon</h2>
        <p>Wenn Sie uns per E-Mail oder Telefon kontaktieren, auch mit einer Bewerbung, verarbeiten wir Ihre Angaben zur Bearbeitung Ihres Anliegens (Art. 6 Abs. 1 lit. b bzw. lit. f DSGVO, bei Bewerbungen § 26 BDSG).</p>

        <h2>5. Links zu Google Maps</h2>
        <p>Diese Website bindet keine Karten ein. Der Link „Route planen“ bzw. unsere Adresse öffnet Google Maps in einem neuen Fenster; erst dann gelten die Datenschutzbestimmungen von Google (Google Ireland Limited).</p>

        <h2>6. Schriftarten, Cookies und Analyse</h2>
        <p>Die verwendeten Schriftarten sind lokal eingebunden; eine Verbindung zu Servern von Google findet dabei nicht statt. Diese Website setzt keine Cookies und verwendet keine Analyse- oder Tracking-Tools.</p>
        <p>Ihre Auswahl im Cookie-Hinweis („Nur notwendige“ oder „Alle akzeptieren“) speichern wir mit dem Zeitpunkt der Auswahl im lokalen Speicher Ihres Browsers (localStorage), damit der Hinweis nicht bei jedem Besuch erneut erscheint. Diese Speicherung ist technisch erforderlich (§ 25 Abs. 2 Nr. 2 TDDDG); die Angaben verlassen Ihr Gerät nicht. Ihre Auswahl können Sie jederzeit über „Cookie-Einstellungen“ in der Fußzeile ändern.</p>

        <h2>7. Ihre Rechte</h2>
        <p>Sie haben das Recht auf Auskunft über Ihre bei uns gespeicherten Daten, auf Berichtigung, Löschung, Einschränkung der Verarbeitung und Datenübertragbarkeit sowie das Recht, einer Verarbeitung zu widersprechen und eine erteilte Einwilligung jederzeit mit Wirkung für die Zukunft zu widerrufen. Außerdem steht Ihnen ein Beschwerderecht bei einer Datenschutz-Aufsichtsbehörde zu.</p>
        <p>Wenden Sie sich dazu an die oben genannte verantwortliche Stelle.</p>
      </article>
    </main>
  );
}
