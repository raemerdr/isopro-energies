/* IsoPro's Google reviews (Google Business profile, read on 27 Oct 2026). Seven reviews: six with five
   stars and text, one with one star and no text. Quoted word for word, never edited or translated;
   surnames are shortened to an initial. Update from the profile when it changes, never by hand. */

export const GOOGLE_REVIEWS = {
  rating: 4.4,
  count: 7,
  url: 'https://maps.google.com/?cid=5622177241630884666',
} as const;

export interface Review { name: string; stars: number; text: string }

export const REVIEWS: Review[] = [
  { name: 'Carsten H.', stars: 5, text: 'Die Isolierarbeiten an den Rohren unserer Wärmepumpe wurden nach unkomplizierter Terminvereinbarung zuverlässig und sehr gut durchgeführt. Ein uns bekannter Energieberater war von der höchst professionnellen Ausführung der Arbeiten sehr angetan.' },
  { name: 'selcuk k.', stars: 5, text: '⭐⭐⭐⭐⭐ Hervorragende Arbeit und professionelle Abwicklung\n\nWir haben die Firma IsoPro  für die Isolierung unseres Hauses beauftragt und sind rundum zufrieden! Von der ersten Beratung bis zur Fertigstellung war alles top organisiert. Das Team war pünktlich, freundlich und hat sehr sauber gearbeitet. Die verwendeten Materialien sind von hoher Qualität, und wir merken bereits jetzt eine deutliche Verbesserung beim Raumklima und den Heizkosten.\n\nBesonders beeindruckt hat uns die Fachkompetenz der Mitarbeiter, die uns genau erklärt haben, welche Lösungen für unser Gebäude am besten geeignet sind. Die Arbeiten wurden termingerecht und zu einem fairen Preis abgeschlossen.\n\nWir können die Firma IsoPro uneingeschränkt weiterempfehlen und würden jederzeit wieder mit ihnen zusammenarbeiten!' },
  { name: 'Cihat', stars: 5, text: 'Habe mein Technikraum isolieren lassen einfach top Qualität. Sehr zufrieden.' },
  { name: 'Yavuz A.', stars: 5, text: 'Bin sehr zufrieden mit der Arbeit, gerne wieder' },
  { name: 'Esra K.', stars: 5, text: 'Engagierte und zuverlässige Arbeit' },
  { name: 'E. K.', stars: 5, text: 'Sehr professioneller Betrieb!' },
];
