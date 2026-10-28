# IsoPro: interactive animation ideas

Rule of thumb: **one signature interaction that explains the trade, two or three supporting ones, and fade/slide reveals everywhere else.** Each item notes how it would be built in Framer. Every one needs a `prefers-reduced-motion` fallback: a static state with no movement.

Effort: 🟢 native Framer (effects, variants, scroll transforms) · 🟡 small code component · 🔴 custom build

---

## ⭐ Signature: "Schicht für Schicht", the layered pipe cross-section
A clean SVG cross-section of a pipe. As the section scrolls into view, the layers build outward one at a time, each with a thin leader line and label:

`Stahlrohr → Dämmstoff (Mineralwolle / Armaflex) → Dampfbremse → Blechmantel`

Below it sit four tabs: **Wärme · Kälte · Brand · Schall**. Each tab swaps the layer stack and its materials: Kälte adds the vapour barrier and elastomer, Brand shows a fire-stop collar through a wall, Schall shows an acoustic mat. The same graphic heads each service page, each with its own build.

- **Why it fits:** a buyer instantly sees *what IsoPro does*, it reuses real material names (Armaflex, Foamglas…), and it's still restrained: one object that moves with purpose.
- **Build:** 🟢/🟡. Stacked SVG layers driven by Framer scroll-transform (scale/opacity per layer), with tabs as variants. Brand tie-in: the outer ring can be drawn as the logo's dot ring.

## Supporting interactions (pick 2–3)

| # | Idea | What it does | Where | Effort |
|---|---|---|---|---|
| 1 | **Thermal before/after slider** | Drag a handle across a pipe or tank. The left side is a thermal-camera look (orange/red heat loss, "ohne Dämmung"), the right side is cool blue ("mit IsoPro"). It works with real before/after photos too. | Wärme & Kälte pages, Start | 🟡 (a marketplace comparison component exists) |
| 2 | **Hotspots on real site photos** | Small pulsing dots on a project photo. Hover or tap shows a label: "Brandschutzmanschette", "Kennzeichnungsschild", "Blechummantelung", "Armaflex-Schale". Their phone photos become proof of expertise. | Brandschutz page, references | 🟢 |
| 3 | **Dot-ring brand motion** | The logo's dot ring becomes (a) a page loader that fills dot by dot, (b) a scroll-progress ring around the "nach oben" button, and (c) an icon that slowly turns on CTA hover. | Global | 🟢 |
| 4 | **Service list with image swap** | A big typographic list (Wärmedämmung / Kältedämmung / Brandschutz / Schallschutz / Blechummantelung). Hovering a row slides in the matching photo and a one-line description. On mobile it becomes an accordion. | Start "Leistungen" | 🟢 |
| 5 | **Heat-loss quick calculator** | Inputs: pipe diameter, length, medium temperature. Output: estimated heat loss per year without vs with insulation, in kWh and €, with the gap visualised as a bar that "fills" with insulation. It ends with "Angebot anfordern" and the values prefilled. A lead magnet. | Wärme page, Start teaser | 🟡/🔴 (needs a sanity-checked formula; label it "Schätzung") |
| 6 | **DACH project map** | A minimal map of DE/AT/CH. Project pins drop in on scroll, and hovering one shows the project card. It backs up the "Deutschland, Schweiz, Österreich" claim. | Referenzen, Start | 🟡 (SVG map + CMS) |
| 7 | **Temperature-range counter** | A large number that counts from, say, **−50 °C** to **+600 °C** with a gradient bar from blue to orange. It shows the operating range they insulate (confirm the real numbers with the client). | Start trust section | 🟢 |
| 8 | **"Cladded" process line** | The process steps (Anfrage → Begehung & Aufmaß → Angebot → Montage → Abnahme & Doku) are connected by a line drawn as a pipe. As you scroll, the pipe gets wrapped in cladding up to the current step. | Ablauf section | 🟢/🟡 |
| 9 | **Filterable references** | Tag chips (Wärme / Kälte / Brand / Schall / Branche) re-flow the project grid with Framer layout animation. | Referenzen | 🟢 |
| 10 | **Sticky mobile action bar** | Bottom bar with "Anrufen" and "Anfrage", hidden while scrolling down and shown when scrolling up. Practical, not decorative. | Global (mobile) | 🟢 |
| 11 | **Step-by-step project qualifier** *(after Caeli Energie)* | The inquiry form as 4 short steps: Leistung (Wärme/Kälte/Brand/Schall) → Objekt (Rohrleitung/Tank/Kanal/Abschottung) → Umfang & Termin → Kontakt + photo upload. A progress bar made of the logo dots. It gives IsoPro qualified B2B leads. | Kontakt, Start | 🟢/🟡 |
| 12 | **Spec-sheet reference cards** *(after INTECH)* | Project cards built from bracketed data instead of client names: [Branche] [Leistung] [Umfang: 1.200 m Rohrleitung] [Standort]. Hovering one flips the photo to a second shot. | Referenzen | 🟢 |
| 13 | **Temperature-coded tint** *(after Huston)* | Hovering a service card shifts the photo's duotone: warm for Wärme, cold blue for Kälte, ember for Brand, neutral for Schall. Tiny effort, and it ties colour to meaning. | Start services grid | 🟢 |
| 14 | **Photo → technical drawing wipe** *(after Huston / Terminal)* | A real cladding photo wipes into a line drawing with dimension labels (medium temperature, insulation thickness, cladding). Same idea as the signature but photo-based. Use one or the other, not both. | Service hero | 🟡 |

## Recommended mix
1. **Signature:** layered pipe cross-section (hero support on Start, plus one per service page)
2. **Hotspots** on real photos (Brandschutz and references): turns weak phone photos into proof
3. **Step-by-step qualifier** as the inquiry form, with a dot-ring progress bar
4. **Dot-ring** scroll progress plus **temperature-coded tint** on service cards: cheap brand glue
5. *(Phase 2)* heat-loss calculator once the client confirms numbers. It's the strongest lead-gen piece but needs correct maths.

Everything else uses one reveal style: 12–16 px rise plus fade, 400–500 ms, ease-out, staggered 60 ms. No parallax hero, no scroll-jacking, no cursor followers. They fight the "direct" brief and annoy B2B buyers on site-office laptops.
