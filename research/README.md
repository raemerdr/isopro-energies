# IsoPro Energies: redesign research

| File | What's in it |
|---|---|
| [01-current-site-audit.md](01-current-site-audit.md) | Every page of isopro-energies.de: company facts, verbatim service copy, projects, careers, brand colours, errors, legal issues, questions for the client |
| [02-framer-templates.md](02-framer-templates.md) | 8 verified Framer templates, ranked. **Pick: NORDEN Automation** |
| [03-awwwards-inspiration.md](03-awwwards-inspiration.md) | 11 verified Awwwards references from industrial, MEP, energy and contractor sites, plus 10 reusable patterns |
| [04-interaction-ideas.md](04-interaction-ideas.md) | 14 interaction ideas with Framer effort ratings. **Signature: layered pipe cross-section** |
| [`../_source/`](../_source/) | Their logos (incl. a 6400 px transparent version), 5 material-brand logos, 30 project photos, saved HTML of every page |

## The one-paragraph version
IsoPro is a **B2B industrial insulation and fire-protection contractor** in Mannheim: Wärme-, Kälte-, Brand- and Schallschutz on pipes, tanks, ducts and plants, serving DACH. It is **not** a renovation company. The current Wix site was built from a renovation template, and its slugs (`/kuechen`, `/badezimmer`) and some copy ("Dem Zuhause Ihrer Träume…") still show it. The real content is thin: four service texts, six project categories with photos but no descriptions, a careers page and an about page with no facts. Phone and address conflict between pages. The new site, like Treu, should lead with **services, proof and a fast inquiry path**, with one signature interaction that explains the trade.

## Proposed sitemap (DE first; EN optional)
```
/                         Start
/leistungen/waermedaemmung     (301 from /kuechen)
/leistungen/kaeltedaemmung     (301 from /badezimmer)
/leistungen/brandschutz        (301 from /innenraeume)
/leistungen/schallschutz       (new)
/branchen                 Industrie · Gewerbe & Logistik · Krankenhäuser · Flughäfen · TGA   (optional, phase 2)
/referenzen               CMS     (301 from /projekte and /projects-7…7-5)
/ueber-uns                        (301 from /info)
/karriere                         (301 from /contact-8)
/kontakt                          Step-by-step inquiry
/impressum · /datenschutz
```
Delete: `/angebot`, `/anbauten`, `/aussenraeume`, `/wintergaerten`, `/photo-albums`, `/book-online`.

## Start page, top to bottom (the Treu pattern adapted)
1. **Hero:** "Industrieisolierung & Brandschutz aus Mannheim" + one-line lead (Wärme · Kälte · Brand · Schall, DACH-weit) + **Projekt anfragen** / **Anrufen**. The four service cards are visible in the first viewport.
2. **Trust strip:** DE · AT · CH · Betriebshaftpflicht Europa (Gothaer) · materials from Isover, Armacell, Foamglas · *[years / certifications once confirmed]*
3. **Leistungen:** 4 cards with temperature-coded hover → service pages
4. **Signature:** "Schicht für Schicht" pipe cross-section with Wärme/Kälte/Brand/Schall tabs
5. **Wo wir arbeiten:** plant types and sectors (pipes, tanks, ducts, fire-stops / industry, hospitals, airports)
6. **Ablauf:** Anfrage → Begehung & Aufmaß → Angebot → Montage → Abnahme & Dokumentation
7. **Referenzen:** spec-sheet cards from the CMS, with hotspots on one featured photo
8. **Materials and systems** logo row
9. **Karriere teaser:** Monteure · Berufseinsteiger · Nachunternehmer
10. **FAQ**
11. **Inquiry:** 4-step qualifier with photo upload, plus map / contact details

## Brand direction
Keep the dot-ring logo and its mint/teal colours. Add a **dark teal** for CTAs (the logo colours fail contrast), graphite text and an off-white background. Use a single warm accent for "heat" moments only. The dot ring drives the motion system: progress, loaders, form steps.

## Blocking questions for the client
Correct address and phone · founding year, team size, certifications · 5–8 references with scope and numbers · full service list · partner status with material brands · DE only or DE+EN · photo shoot. The full list is in §11 of the audit.
