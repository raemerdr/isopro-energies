# IsoPro Energies: website

The new site for IsoPro Energies GmbH (Dämmtechnik & Brandschutz, Mannheim). Built like the Treu Haustechnik site: Next.js 16, German only, no cookies or analytics (the dev language switch below sets one in `next dev` only). Structure, design and motion follow the reference design the user chose, the Webflow template Movera, with IsoPro's font (Lexend) and colours: see [research/movera-reference.md](research/movera-reference.md). (The earlier reference, Haul, is recorded in research/haul-reference.md.) Research and the plan behind it are in [research/](research/README.md).

```bash
npm install
npm run dev        # http://localhost:4340
```

`npm run images` rebuilds the web copies in `public/` from the originals in `_source/` (Python with Pillow). The inquiry form emails through Resend: copy `.env.example` to `.env.local` and fill in the key. Without a key, `next dev` prints the inquiry to the server log instead.

In `next dev` a floating **DEV · DE | EN** pill (bottom right) switches the preview between German and English. It is a development aid: production builds ignore it and stay static and German. The legal pages, the open-fact notes and the inquiry email stay German in both.

## Pages
| Route | What |
|---|---|
| `/` | Full-screen photo hero with the Google rating · "Über uns" with rolling numbers · services as stacking cards · the process on dark (cards rise into line while scrolling) · Warum IsoPro · Google reviews · two ways of working together · references · inquiry form · FAQ |
| `/leistungen` | Photo hero · the four services as stacking cards · FAQ |
| `/leistungen/[slug]` | Wärmedämmung, Kältedämmung, Brandschutz, Schallschutz: back link, headline and large photo, one text column, other services; photos in `lib/services.ts`, text in `lib/i18n` |
| `/referenzen` | The client's own site photos as image cards, with a filter and a large view |
| `/ueber-uns`, `/karriere` | Photo heroes; who we are, the steps of a job as a timeline, open positions (applications by email) |
| `/kontakt` | Contact details, the four-step inquiry form (a service page links here with `?leistung=…` and the form starts on it), FAQ |
| `/impressum`, `/datenschutz` | Drafts, to be checked before launch |

The start page shows IsoPro's Google rating and reviews, quoted word for word (`lib/reviews.ts`, read from the profile on 27 Oct 2026: update them from the profile when they change). Every full page load starts with a short loading screen: the logo's dot ring spinning (`components/loader.tsx`). Every old Wix address (`/kuechen`, `/badezimmer`, `/projects-7…`) redirects to its new page (`next.config.ts`).

## Where things live
- `lib/site.ts`: company facts, and `OPEN`, the list of facts still to confirm
- `lib/i18n/de.ts`: all page copy in German, the source; `lib/i18n/en.ts`: the English for the dev switch (same shape, TypeScript checks it)
- `lib/services.ts`: the four services' photos and icons
- `lib/content.ts`: the other photos, icons and logos
- `lib/references.ts`: the reference photos
- `lib/inquiry.ts`: the form's choices and limits, shared by form and API route
- `lib/reviews.ts`: the Google rating and reviews
- `components/sections.tsx`: the shared sections (heroes, impact, stacking services, process, FAQ, closing bar) · `components/reviews.tsx`: the reviews slider · `components/motion.tsx`: scroll reveals · `components/scroll-fx.tsx`: the stacking and rising cards · `components/cta.tsx`: buttons with the rolling label · `components/loader.tsx` · `components/brand.tsx`: the logo's dot ring as SVG
- `_source/images/stock/SOURCES.md`: the Magnific stock photos and where each one is used

## Open with the client
In `next dev`, everything below is outlined in dashed amber on the page, with the question on hover (`<Todo>`, `components/todo.tsx`). Production shows the text as it is.

1. **Address**: Hafenbahnstraße 15, 68305 (Impressum and Google profile) or Hafenstraße 15, 68159 (old contact block)?
2. **Main phone**: 06234 812 98 45 (every page) or 0621 16774461 (Impressum and Google profile)? Is there a mobile number for site managers?
3. **Handelsregister**: confirm "HRB 747116".
4. **Area**: DE · AT · CH, or "bundesweit"?
5. **Company facts**: founding year, team size, qualifications, certifications (SCC etc.). A placeholder shows in dev only.
6. **References**: 5–8 projects with sector, place, year and quantities, and permission to name clients. Add them as `facts` to the references (`lib/references.ts`).
7. **Material brands**: partner status and permission to show the Isover, Armacell, Foamglas, Alujet and Geralit logos.
8. **Photo shoot**: the hero and several sections use stock photos for now. The client's own photos carry the references and the fire-protection pages.
9. **Response time** for inquiries, so the site can promise one, and **office hours** for the footer.
10. **Testimonials**: the mint band shows IsoPro's own commitments for now. Real client quotes, with permission, should replace them.
11. **Legal**: have the Impressum and Datenschutz checked, and add the hosting provider.
