# Reference design: Movera (movera-85e014-bb8d9c86d583ee40963c49f37.webflow.io)

On 27 Oct 2026 the user replaced the Haul reference with the Webflow template **Movera**: "redesign our website into this design; the font stays". These notes come from the live site: its computed styles, its stylesheet tokens and its interaction data (Webflow IX3 on GSAP with SplitText, plus IX2 for the scroll effects).

## Look
- Light grey page (#f4f4f5) with **white cards**, black for buttons, dark sections and the footer, one yellow accent (#ffe533) for the main call to action
- Big radii: cards 24 px, photos 20 px, small photos 16 px, inputs 8 px, every button and tag a pill (90 px)
- Container 83 rem (1328 px), side padding 5 %, sections 100 px top and bottom
- Small **section tag** above every headline: a white pill, 16 px text, 6 × 20 px padding
- Type: Roboto Serif headings at weight 400 (H1 96/101 px −3 %, H2 48/57 −2 %, H3 32/40, H4 24/30), Inter Display body 16/24 and 18/26

**For IsoPro:** Lexend stays for everything (user's choice), weight 400 for headings, 300 for text. Colours stay IsoPro's: black → dark teal `#10292b`, yellow → mint, page grey → paper `#f3f2ee`, dark cards → `#18393b`. The mint was the logo's pale `#bbdfd3` at first; on 27 Oct 2026 the user asked for a more modern accent, so buttons, stars and ticks now use a brighter `#6fe3bb` and only the logo keeps the pale one.

## Navigation
A floating white pill, centred, 16 px from the top, 1 px border, padding 4 px 4 px 4 px 24 px: wordmark left, links in the middle (6 × 16 px pills, the current page on grey), a black "Contact" button right. On phones: wordmark and a round black menu button. It drops in from above when the page has loaded. IsoPro addition (28 Oct 2026, the user's request): "Leistungen" opens a panel the pill's width under it with the four services (photo, name, one line) and "Alle Leistungen"; on hover, or by click and keyboard. In the phone menu the services sit under "Leistungen".

## Start page, in order
| Movera | IsoPro |
|---|---|
| Full-screen photo; H1 left on two lines, yellow button; at the bottom avatars + "500+ verified reviews", a paragraph, "Scroll down" | Inspector at clad pipework; "Energie bleibt, wo sie hingehört", mint button; Google rating (4,4 · 7 reviews) with reviewers' letter discs; lead; scroll hint |
| "Our impact": H2 + text + button left, a photo in the middle, three numbers right | Replaced on 27 Oct 2026 at the user's request by a centred statement (a second reference, sent as a screenshot): the logo's dot ring, an outlined tag, one sentence with grey accents, three tall photos with the middle one raised, the button under it, three short points |
| "Our services": sticky cards that stack while scrolling (number, progress dots, title, text, "View details"; photo right); covered cards blur | The four services, same mechanics on /leistungen. On the start page since 28 Oct 2026 (a fifth reference, a screenshot): four tall photo panels side by side, a speech-bubble line on each, name at the foot; with a mouse the panel under the pointer widens and opens its summary; on phones one sideways row |
| Black "Our process": four step cards that rise into line and sharpen as the section scrolls | The five steps from inquiry to handover. First on charcoal over a darkened photo; since 27 Oct 2026 light, on the page colour without the photo, like the third reference. Cards redrawn on 27 Oct 2026 after a third reference (a screenshot): headline left and button right, each card with "(Schritt 01)", a large soft-grey drawing that turns mint on hover, and the title and text in a bordered inner box; the inner boxes line up (subgrid); below 992 px one sideways-scrolling row |
| "Why choose us": four white cards with round icons + a tall photo | Saubere Details, Lückenlos dokumentiert, Ein Ansprechpartner, Rücksicht auf den Betrieb. Since 28 Oct 2026 after a fourth reference (a screenshot): a dark band, the fitter photo on the left (mirrored to face the text) fading into it, a white caps tag, large headline, a line, and the four points with mint icons and titles |
| "Customers say": portrait + quote card with arrows | **Real Google reviews** word for word (lib/reviews.ts); a mint rating card instead of a portrait |
| Black "Pricing": two plan cards with photo, feature list, button + "Need a custom plan?" bar | No prices: two ways to work with IsoPro (Betreiber; GU and TGA firms), each with what is included, + "Partner werden" bar for subcontractors |
| (inner pages) "Need a custom plan?" bar | Replaced on 27 Oct 2026 at the user's request by a second reference (a screenshot): a full-width dark photo, headline, line and accent button centred. IsoPro: the clad tanks under a stormy sky |
| "Blog": three image cards | Three references. Since 28 Oct 2026 also a real blog (/blog, lib/blog.ts, three draft articles, OPEN.blog) and a blog section before the FAQ: photo cards after a sixth reference (category and reading time on top, title and a white pill at the foot), the two newest on the start page; the start page now ends with the photo CTA too |
| "Get in touch": photo + white form card | Photo + the inquiry form |
| "FAQ": centred list of white rows | Same |
| Black footer: brand, text, newsletter pill, three link columns, © | Same; a contact pill instead of the newsletter |

## Inner pages
- **Photo hero** (About, Services; IsoPro also Karriere): full-screen photo, centred tag, H1 and button
- **Plain hero** (service detail, Contact; IsoPro also References, 404): centred tag or back link and H1 on grey; on service pages a large rounded photo below
- **Service detail**: one narrow column (46 rem) of H2, text, H3, lists and photos
- **About**: impact block, "Mission & Vision" (two text blocks with lists, two photos), a timeline next to a photo, team (IsoPro: no team facts yet, so the steps take the timeline and the team is left out)

## Motion (from the interaction data)
| Movera | Setting | IsoPro |
|---|---|---|
| Page load | nav y −100 % → 0 (0.6 s, from 0.4 s); hero heading opacity 0 → 1, y −50 % → 0 (0.7 s, 0.3 s apart); hero bottom y 80 % → 0; hero photo scale 1.2 → 1 (0.8 s) | after the loading screen: same values |
| Section H2s | split into words, each rising out of a mask (y 100 % → 0) | `data-reveal="words"` |
| Blocks and cards | Webflow "slide in bottom": opacity 0 → 1, y 100 px → 0 | `data-reveal` (unchanged) |
| Impact photo | scale 0 → 1, 1 s | `data-reveal="scale"` (kept for later use; the statement layout above slides its photos in) |
| Buttons | hover: the label rolls up word by word (0.25 s, 0.02 s apart), the arrow slides in from the left | `.btn` |
| Footer links | hover: the label rolls up letter by letter (0.3 s, 0.01 s apart) | `.roll` |
| Service cards | sticky at 15 % of the viewport; a covered card blurs to 5 px | `data-stack` (components/scroll-fx.tsx) |
| Process cards | start 2/12/24/36 rem low and blurred 5 px; in line and sharp at 60 % of the section's scroll | `data-rise` |
| Testimonial slider | the photo wipes in from below (0.4 s, ease 0.77, 0, 0.175, 1) | the quote slides and fades |
| FAQ | opens on hover (desktop), chevron turns 180° | opens on click (keyboard and touch work the same) |

The Haul notes (`haul-reference.md`) describe the previous design and are kept for the record.
