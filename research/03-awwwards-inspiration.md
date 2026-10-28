# Awwwards inspiration (industrial, MEP, energy, contractors)

Researched 26 Oct 2026. All Awwwards pages were verified to load. Awwwards has almost no insulation sites (the only one, Earthwool, is a 2017 Nominee and dated), so the references come from neighbouring trades: MEP/fire engineering, coatings, steel, energy and general contractors.

| # | Site | Field | Award | Built with | Borrow | Avoid |
|---|---|---|---|---|---|---|
| 1 | [Huston Engineering](https://www.awwwards.com/sites/huston-engineering) · [live](https://www.hustonengineering.com) | MEP and fire-protection engineering | HM, May 2023 | Webflow, GSAP, Lottie | **Closest domain match.** Plant-room pipework photo with a brand-colour duotone. Services numbered /01–/04, each with a short looping 3D clip revealed by a clip-path wipe. | Logo preloader |
| 2 | [INTECH](https://www.awwwards.com/sites/intech-technical-engineering) · [live](https://www.beintech.fr) | HVAC and fire-safety engineering | HM, Jul 2025 | Webflow | Keywords in the statement paragraph change colour as you scroll. **Spec-sheet reference cards** with [RÉFÉRENCE] [INFOS PRATIQUES] [LOCALISATION]. Scope chips. | n/a |
| 3 | [Q Industrial](https://www.awwwards.com/sites/q-industrial) · [live](https://www.q-industrial.com) | Industrial metal coatings | SOTD, Jun 2024 | Webflow, GSAP | Hero is one metal part that rotates as you scroll, done as **pre-rendered video, not WebGL**. Catalogue organised by industry and by surface. | Lenis smooth scroll feels laggy |
| 4 | [Terminal Industries](https://www.awwwards.com/sites/terminal-industries) · [live](https://terminal-industries.com) | Logistics yards | SOTD + SOTM, Sep 2025 | Vue | **Savings calculator** (6 inputs plus a slider) that leads into contact. Three entry cards by customer size. | WebGL point-cloud effect |
| 5 | [Caeli Energie](https://www.awwwards.com/sites/caeli-energie) · [live](https://www.caeli-energie.com) | Cooling / AC | SOTD, Sep 2025 | WordPress, GSAP | Stacked spec cards on scroll. **"Simuler mon projet"**: a step-by-step questionnaire that ends in a result. | Very long pinned sequence |
| 6 | [Ose Engineering](https://www.awwwards.com/sites/ose-engineering) · [live](https://www.ose-engineering.fr) | Industrial/energy simulation | HM, Mar 2026 | Webflow, GSAP | Monospace technical details: [VOIR +] buttons, page weight and load time shown. Expandable sector rows. Numbered approach 01–04. Stat counters. | Loader, all-dark look |
| 7 | [Rogers-O'Brien](https://www.awwwards.com/sites/rogers-obrien-construction) · [live](https://r-o.com) | General contractor | Nominee, Oct 2026 | WordPress | Hero of **real crew footage**. Hard-number stats strip (850+ staff, 57 years). Sector list. | Parallax adds little |
| 8 | [MHB Masters of Steel](https://www.awwwards.com/sites/mhb-dutch-masters-of-steel) · [live](https://mhb.eu) | Steel windows | Nominee, Oct 2020 | WordPress | Craft-heritage video hero. One headline and one CTA per section. **Request form for technical documents.** | Full-page snapping |
| 9 | [Virya Energy](https://www.awwwards.com/sites/virya-energy) · [live](https://virya-energy.com) | Renewables | HM, Aug 2025 | WordPress, GSAP, Lottie | Expertise cards with small animated line icons. Numbers block. | Playful illustrations |
| 10 | [Turion Space](https://www.awwwards.com/sites/turion-space) · [live](https://www.turionspace.com) | Space infrastructure | Nominee, Oct 2026 | **Framer** | Proof that Framer can do this style: 001/002 section indices, monospace captions, a "not to scale" schematic, counters. | Letter-split CTAs, which screen readers can't read |
| 11 | [EFLA Engineers](https://www.awwwards.com/sites/efla-engineers) · [live](https://www.efla-engineers.com) | Energy engineering | HM, Jan 2024 | n/a | Numbered hero slides with a **Pause** button. Client-logo marquee. People photography. | n/a |

**Start with:** Huston (structure and tone), INTECH (reference cards), Terminal and Caeli (calculator or qualifier), Turion (what Framer can do).

## Patterns seen across them, translated for IsoPro
1. **Scroll-built pipe cutaway** (Q Industrial, Caeli): steel → insulation → cladding, layers labelled. Use SVG or pre-rendered video, not WebGL.
2. **Photo → technical drawing wipe** (Huston, Terminal): a real site photo wipes into a line drawing with medium temperature, insulation thickness and cladding.
3. **Heat-loss / savings calculator** (Terminal, Caeli): kWh, € and CO₂ per year with and without insulation → inquiry.
4. **Project qualifier form** (Caeli): Leistung → Objekt (Rohr/Tank/Kanal/Abschottung) → Umfang → Zeitraum → Kontakt.
5. **Numbered service index with a short loop per service** (Huston, INTECH), plus scope chips.
6. **Spec-sheet reference cards** (INTECH): [Branche] [Leistung] [Umfang: 1.200 m Rohrleitung] [Standort]. This works even when the client can't be named, which is common in industry.
7. **Count-up stats strip** (R-O, Virya, Turion): years, metres insulated, plants served, DE·AT·CH.
8. **Entry points by audience** (Terminal): Anlagenbetreiber / Generalunternehmer / Planer.
9. **Temperature-coded duotone**: warm for Wärme, cold blue for Kälte, ember for Brand. Hovering a service shifts the photo's tint.
10. **Technical micro-details and a download area** (Ose, Turion, MHB): monospace indices, bracket buttons, datasheets and certificates to download.

**Avoid across the board:** smooth-scroll hijacking, preloaders, full-page snapping, letter-split text, live WebGL.
