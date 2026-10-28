# IsoPro Energies: current website audit and content inventory

Source: https://www.isopro-energies.de, crawled 26 Oct 2026. Built on Wix ("powered by Levyberger Media"). The sitemap lists 24 URLs, about half of them leftover template pages.

Raw files are in [`../_source/`](../_source/):
- `pages/`: saved HTML of every URL
- `images/projects/`: 30 project photos, original resolution
- `images/logos/`: IsoPro logo (wide, wide transparent at 6400 px, square)
- `images/partners/`: 5 material-brand logos

---

## 1. What the company actually is

**IsoPro Energies GmbH: Dämmtechnik & Brandschutz.** IsoPro is a B2B **industrial insulation and fire-protection contractor** based in Mannheim. It covers thermal insulation, cold insulation, fire protection and acoustic insulation on pipes, tanks, vessels and ventilation/AC systems, for industrial plants, commercial buildings, hospitals and airports.

Site tagline: **"Ihr Partner für Isolierarbeiten und Brandschutz"**

> Their URL slugs are misleading: `/kuechen` holds Wärmeisolierung, `/badezimmer` holds Kälteisolierung, `/innenraeume` holds Brandschutz and `/contact-8` holds Bewerbung. The site was built from a renovation template ("MB Renovierungen") and the slugs were never renamed. IsoPro does **not** do bathrooms or kitchens.

---

## 2. Company facts (NAP and legal), conflicts flagged

| Field | Value found | Where | Status |
|---|---|---|---|
| Legal name | IsoPro Energies GmbH | everywhere | ✅ |
| Managing director | Hakan Özbas ("Vertreten durch") | Impressum | ✅ |
| Address | **Hafenbahnstraße 15, 68305 Mannheim** | footer, Impressum | ⚠️ conflicts with ↓ |
| | Hafenstraße 15, 68159 Mannheim | contact block (Start, Kontakt) | ⚠️ ask client; Impressum is probably right |
| Phone | **Büro (06234) 812 98 45** | header/footer/contact on every page | ⚠️ conflicts with ↓ |
| | 0621 16774461 | Impressum | ⚠️ ask which is the main line. 06234 is not a Mannheim area code (Mannheim is 0621) |
| Email | info@isopro-energies.de | everywhere | ✅ (the Impressum email line is blank) |
| Handelsregister | "747116", Registergericht Mannheim | Impressum | ⚠️ "HRB" prefix missing, confirm |
| Steuer-Nr. | 38184/51204 | Impressum | ✅ |
| Liability insurance | Gothaer Versicherung AG, Gothaer Allee 1, 50969 Köln. Coverage: **Europa** | Impressum | ✅ usable as a trust signal |
| Service area | "Deutschland, Schweiz, Österreich" | Start | ⚠️ conflicts with ↓ |
| | "Bundesweit auf Anfrage" | Kontakt | ⚠️ pick one (DACH looks intended) |
| Social | Facebook / Twitter / YouTube icons | footer | ❌ they link to **Wix's own** accounts, not IsoPro's |
| Agency credit | Levyberger Media ("Konzept, Grafikdesign und Umsetzung") | footer, Impressum | n/a |
| Copyright | © 2024 | footer | outdated |

---

## 3. Services: the core content for the new site

Start page H2: *"Energieeffizient, Energie sparen und erneuerbare Energien"*. Footer service links: Dämmtechnik · Brandschutz · Kältetechnik.

### 3.1 Wärmeschutz / Wärmeisolierung (currently `/kuechen`)
**Teaser (Start):** "Unsere hochwertige Isolierung gewährleistet eine energieeffiziente Umgebung und maximiert Ihre Einsparungen."

**Page text:**
> Die Reduzierung des Energieverbrauchs und der CO2-Emissionen ist von entscheidender Bedeutung für den Schutz unserer Umwelt. Dabei geht es nicht nur darum, die Natur zu bewahren, sondern auch um eine nachhaltige Wirtschaftlichkeit für verschiedenste Sektoren wie Industrieanlagen, Gewerbegebiete und Wohnkomplexe. Dies betrifft insbesondere komplexe Großstrukturen wie energieintensive Flughäfen, Industrieanlagen, Verwaltungszentralen und Krankenhäuser.
> Unsere Tätigkeiten umfassen die Planung, den Bau und die Montage von Wärmeisolierungen.

**Sub-areas (image cards):** Lüftungs-/Klimaanlagen · Rohr- und Armaturenisolierung · Behälterisolierung · Tanks
**Sectors named:** Industrieanlagen, Gewerbegebiete, Wohnkomplexe, Flughäfen, Verwaltungszentralen, Krankenhäuser
**Scope:** Planung, Bau, Montage. Bottom heading: "Erneuerbare Energien"

### 3.2 Kälteschutz / Kälteisolierung (currently `/badezimmer`)
**Teaser:** "Gewährleisten Sie mit einer effektiven Kälteisolierung, dass die Kälte dort verbleibt, wo sie hingehört."

**Page text** (the H2 is misspelled "Kältesisolierung"):
> Heutige Klima- und Kältetechnik-Anlagen müssen den strengen gesetzlichen Vorschriften entsprechen und zugleich wirtschaftlich und umweltfreundlich sein. Unsere Herangehensweise basiert auf durchdachten und strukturierten Gesamtlösungen, die individuelle Anlagen langfristig und effektiv schützen. Ein effizienter Kälteschutz ist dabei unerlässlich.
> Unsere Lösungen für die Zukunft bieten langfristige Einsparungen bei Energie- und Betriebskosten.

**Sub-areas:** Behälterisolierung · Lüftungs-/Klimaanlagen · Rohrleitungen · Tanks (the "Tanks" image is a stock brewery photo)

### 3.3 Brandschutz (currently `/innenraeume`)
**Teaser:** "Durch unsere maßgeschneiderten Brandschutz Konzept können Sie sicher sein, dass Ihr Unternehmen optimal gegen potenzielle Brandschäden geschützt ist,"

**Page text:**
> Der Brandschutz steht bei uns im Isolierhandwerk an erster Stelle. In Bauprojekten ist er von entscheidender Bedeutung, da er Leben retten kann. Wir bieten effektive Komplettlösungen an und setzen dabei auf umweltfreundliche Materialien. Mit unserem Fachwissen wählen wir geeignete Brandschutzmaterialien aus und garantieren einen fachgerechten Einbau gemäß den neuesten Erkenntnissen der Brandforschung.
> Eine effektive Schadensbegrenzung im Falle eines Brandes erfordert in sämtlichen Gebäuden eine vorausschauende bauliche Brandvorsorge.

**Sectors (stock image cards):** Krankenhaus · Produktionshallen · Einrichtungen · Flughäfen

### 3.4 Schallschutz (teaser only, no page)
> Haben Sie laute Anlagen oder planen, Lärm zu erzeugen? Schützen Sie jetzt Anwohner und Mitarbeiter mit Schallschutzisolierung.

### 3.5 Implied by project photos but not named anywhere
Aluminium/steel sheet cladding (Blechummantelung), Armaflex/elastomer insulation on heating and TGA distribution (Haustechnik), insulation of rooftop ventilation ducts, and fire-stop penetration seals with ID labels (Brandschutzabschottungen). **Ask the client for a full service list.** These are exactly what B2B buyers search for.

---

## 4. Project references

The `/projekte` page shows a photo grid headed "Unsere Arbeit", with a "Voranschlag anfordern" CTA. Six project category pages exist (`/projects-7…7-5`), but **nothing links to them**, and **none has text**: no client, location, year, scope or materials.

| Category | Current URL | Photos in `_source/images/projects/` |
|---|---|---|
| Wärmeisolierung | `/projects-7` | 17, 25, 27 |
| Kälteisolierung | `/projects-7-1` | *(empty page)* |
| Lüftungsanlage | `/projects-7-2` | 05, 10, 16, 30 |
| Brandschutz | `/projects-7-3` | 07, 08, 14, 18, 21 |
| Haustechnik | `/projects-7-4` | 01, 03, 09, 26, 29 |
| Armaflex | `/projects-7-5` | 02, 19, 24 |
| Projekte overview grid | `/projekte` | 03, 06, 11, 13, 23, 24, 28 |
| Used on service pages | various | 01, 10, 15 ("Lüftungsanlage"), 20, 22 ("Rohrisolierung") |
| Likely stock, check rights | Info / Bewerbung | 04 (b/w industrial skyline), 12 ("Industrial Pipelines_edited") |

**Photo quality:** about 27 genuine site photos, mostly phone shots (900×1600 portrait), a few 1024×473 crops. They are authentic and useful for the references grid and hotspots, but too weak for a full-bleed hero. **Recommend a half-day photo or video shoot**, or use the few large shots (04, 12, 22) only if they turn out to be their own.

Every image on the service pages and the Start "Was wir machen" cards is **Wix stock** (Fabrikpipelines, Baustelle, Stahlrohrwerke, Krankenhaus, Flughafen, Brauerei).

---

## 5. Materials and system brands (logo strip on Start, unlabeled)
Isover (Saint-Gobain) · Foamglas (Owens Corning) · Alujet · Geralit ISO-Systeme · Armacell (Armaflex)

→ On the new site: "Wir verarbeiten Systeme von …". **Confirm** whether any are formal partnerships or certified-installer relationships, and that logo use is allowed.

---

## 6. About (`/info`)
H1: **"Pionier in der Isolierungsbranche"**
> In einer sich ständig weiterentwickelnden Industrielandschaft steht ein Unternehmen heraus: Ihr Partner für Dämmtechnik und Brandschutz. Mit präziser Handwerkskunst und innovativen Lösungen schaffen sie ein sicheres Umfeld in jeder Umgebung. Von der effizienten Wärmedämmung bis hin zum zuverlässigen Brandschutz sind sie die ersten, die gerufen werden, wenn Sicherheit höchste Priorität hat. Ihre Expertise und ihr Engagement machen sie zum unverzichtbaren Partner für Bauherren und Unternehmen auf der ganzen Welt.

→ Written in the third person ("sie"), with no facts (year, team, certifications) and an unsupported "auf der ganzen Welt". **Rewrite it with real numbers.**

---

## 7. Careers (`/contact-8`, nav label "Bewerbung")
H2 "Karriere: Arbeitsmöglichkeiten" / "Wir bieten"
> Bei IsoPro Energies sind wir ständig auf der Suche nach engagierten Menschen, die unsere Leidenschaft für Energieeffizienz teilen. Egal, ob Sie bereits über umfangreiche Erfahrung verfügen oder gerade Ihre Karriere starten möchten – bei uns finden Sie spannende Aufgaben und Entwicklungsmöglichkeiten.

- **Wir suchen:** Fachkräfte (erfahrene Monteure, Ingenieure und Techniker) · Berufseinsteiger · **Nachunternehmer** (subcontractor partners)
- **Ihre Aufgaben:** Wärmeisolierung (Dämmmaßnahmen) · Kälteisolierung · Brandschutz
- **Ihr Profil:** Motivation · Teamfähigkeit · Zuverlässigkeit · Fachkenntnisse
- **Application form fields:** Vorname, Nachname, E-Mail, Telefon, Position, Startdatum, LinkedIn/Xing link, Adresse, Tätigkeit → "Bewerben"

---

## 8. Contact and conversion
- **Section headline:** "Ihr nächstes Projekt planen". Subline: "Kontaktieren Sie uns, um eine kostenlose Beratung zu vereinbaren."
- **Form fields:** Vorname, Nachname, E-Mail, Telefon, Adresse, Betreff, Nachricht → "Absenden"
- **CTAs:** "Voranschlag anfordern" (→ /kontakt), plus a Wix chat bubble
- **Missing:** no file or photo upload, no service picker, no project type or location field, no response-time promise, no click-to-call in the header

---

## 9. Brand
- **Logo:** two concentric rings of dots (outer ring mint, inner ring slate-teal) plus the wordmark "IsoPro Energies GmbH" in a geometric sans (Futura/Josefin-like), with the tagline "Dämmtechnik & Brandschutz" letter-spaced underneath.
- **Sampled logo colours:** black `#000000` · mint `#BBDFD3` · slate-teal `#86A9AB`
- Mint and slate-teal both **fail contrast** as text or button colours on white. The new palette needs a darker teal for CTAs and links (for example around `#2E5E61`), with mint kept for surfaces and the dot motif.
- The dot ring is the one distinctive brand asset. It's a natural seed for the site's motion (loader, scroll progress, section dividers).

---

## 10. Leftovers, errors and legal issues to clean up

**Template junk, don't migrate:**
- `/angebot`: Küchen, Badezimmer, Innenräume, Anbauten, Außenräume, Wintergärten with the placeholder "Beschreibe dein Bild hier…"
- `/anbauten`, `/aussenraeume`, `/wintergaerten`: title "MB Renovierungen", body "Ich bin ein Textabschnitt…"
- `/photo-albums`: Wix demo albums ("Sarah & Tom", "Family Portraits", "Championships")
- `/book-online`: empty booking page
- Residential CTA on the B2B service pages: **"Dem Zuhause Ihrer Träume einen Schritt näher."**

**Errors:**
- Page titles "Isopro1" and "Isopor-Energies". Typo "Kältesisolierung". Alt-text typos ("Isopro Enegies", "Isopro Engreres").
- The footer link "Dämmtechnik" points to the Start page, not to the Wärme page.
- The six project pages are orphaned (not linked anywhere).

**Legal (have it checked; this isn't legal advice):**
- The Impressum cites **§ 5 TMG**, which was replaced by **§ 5 DDG** on 14 May 2024.
- The Impressum email line is empty.
- The Datenschutz page is Wix's generic policy (it mentions a "Mobile-App"). It needs a proper DSGVO policy for the new stack: Framer hosting, form provider, fonts, maps, analytics.

**SEO and redirects:** set up 301s from every old slug to the new one (`/kuechen` → `/leistungen/waermedaemmung`, and so on).
**Name collision:** **"ISOPRO®" is a registered product line of PohlCon GmbH** (insulation and fire-protection elements), so plain "isopro" searches land there. The new site has to rank on "IsoPro Energies" plus service and region terms (Industrieisolierung Mannheim, Rohrisolierung, Kälteisolierung, Brandschutzabschottung Rhein-Neckar …).
A quick web search found **no Google reviews or directory listings**, so ask for their Google Business profile.

---

## 11. Questions for the client before design
1. The correct **address** and **main phone**. Is there a mobile or WhatsApp number for site managers?
2. Founding year, team size, Meister or engineer qualifications, **certifications** (for example SCC/SCP, fire-protection approvals, manufacturer trainings).
3. **5–8 reference projects**, each with industry, city, year, scope, materials and quantities (m² or Laufmeter), plus permission to name clients.
4. The full **service list** (Blechummantelung, Abschottungen, Kanalisolierung, Tankisolierung, Schallschutzkapselung, Wartung/Instandhaltung?)
5. **Partner status** with Isover, Foamglas, Armacell, Geralit and Alujet.
6. **Languages:** DE only, or DE + EN (they claim CH/AT coverage)?
7. Current **open positions**, and whether they're actively recruiting Nachunternehmer.
8. Real **social accounts** and **Google Business profile**.
9. A photo or video shoot: possible, and when?
