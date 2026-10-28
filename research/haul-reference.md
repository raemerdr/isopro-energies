# Reference design: Haul (haul-128.webflow.io)

On 27 Oct 2026 the user chose the Webflow template **Haul** (by 128.digital) as the design reference: the same structure, copy tone, motion and font, with IsoPro's own colours. These notes were taken from the live site, including its Webflow interaction data.

## Type
- **Lexend** (Google Fonts) throughout, weights 300 / 400 / 500
- H1 50/55 px, 500, letter-spacing −1.5 px · H2 40/48 px, 500, −1.2 px
- Small subtitle above each headline: 18 px, 400 ("About us", "Our Solutions")
- Paragraphs 16–18 px, weight 300, grey · big numbers 50 px, 400, accent colour
- Buttons 18 px, 300, in a pill (radius 100 px, padding 20 × 30 px)

## Look
White pages, grey cards (#f6f6f6), 10 px radius, one accent colour (yellow) for numbers, arrows and the testimonial band, black for buttons and dark panels. Container 1240 px.
**For IsoPro:** black → dark teal `#10292b`, yellow → mint `#bbdfd3`, grey cards → paper `#f3f2ee`.

## Start page, in order
| Haul | IsoPro |
|---|---|
| Hero: H1, one line, black button; "Trusted by 120+ partners" with avatars | H1 "Energie bleibt, wo sie hingehört", button; "Systeme führender Hersteller" with round brand logos |
| Wide black-and-white hero image | An inspector in a hard hat at clad pipework, in colour (stock; the user asked for a person and for colour) |
| Black "About us" panel overlapping the image: H2, white button, two big yellow numbers, video thumbnail | Dark teal panel: H2, button, "4 Gewerke" and "3 Länder", photo of a crew member on a roof (client's own) |
| "Why choose Haul": 3 icon features, centred | "Warum IsoPro": Saubere Details · Lückenlos dokumentiert · Ein Ansprechpartner |
| Wide photo with a white card: H3, line, "Ready to move…?", full-width button | Same, "Bereit, Ihr Projekt zu starten?" |
| "Our Solutions": subtitle left, H2 right; rows of photo + grey card with logo mark and arrow box | The four services as rows, dot ring as the mark |
| Yellow testimonial slider with arrows, then an endless photo strip | Mint band with **IsoPro's own commitments** (no client testimonials exist yet: marked in `OPEN.testimonials`), same strip |
| Full-width photo "Our partners…", "Become a partner", logo row | "Gute Partner machen große Projekte möglich", "Partner werden" → Nachunternehmer, material brands |
| Black "Latest news" with two image cards | Dark "Referenzen" with two reference cards |
| Full-width aerial photo CTA "Let's get in touch." | Aerial refinery, "Lassen Sie uns sprechen." |
| Footer: logo, link columns, newsletter, big email, phone, hours | Same without the newsletter; office hours still to be confirmed |

## Inner pages
- **Photo banner** (About, Services, Careers): full-width photo, title, line and accent button at lower left
- **White banner** (service detail, Contact, FAQ): centred subtitle, title, line; a large rounded photo below on service pages
- **Service detail:** one text column (H2, paragraphs, H3s, list), then "Other services" cards and the CTA

## Motion (Webflow interactions → `components/motion.tsx`, globals.css)
| Haul | Setting | IsoPro |
|---|---|---|
| slideInBottom (115×) | opacity 0 → 1 and y 100 px → 0, 1000 ms ease-out-quart | `data-reveal` |
| fadeIn | opacity 0 → 1, 1000 ms | `data-reveal="fade"` |
| Img Card Reveal | a cover's width 100 % → 0 (1400 ms ease-out), image scale 1.3 → 1 (800 ms) | `data-reveal="img"` + `.reveal-img` |
| Slide 200/400/600/800 ms | staggered hero items | `--i` steps of 100 ms |
| Button With Icon Hover | arrow out to the right, second arrow in from the left, label moves 2 rem, 500 ms (0.25, 0.46, 0.45, 0.94) | `.btn` |
| Item Image Scale Hover | scale 1.1, 500 ms ease-in-out | service rows, cards, references |
| Image Loop | strip moves 2590 px in 32 s, linear | `.strip__track`, 64 s per set |
| Slide Change | quotes fade, 500 ms | `components/statements.tsx` |
| Accordion | height, icon rotates −45° | FAQ |
| Nav Menu Open | burger lines rotate ±40° | `.nav__burger` |

Not in Haul, added at the user's request: a **loading screen** where the logo's dot ring spins until the page has loaded (`components/loader.tsx`).
