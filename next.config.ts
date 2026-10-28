import type { NextConfig } from 'next';

/* The old Wix site was built from a renovation template and kept its slugs (/kuechen held
   Wärmeisolierung, /badezimmer Kälteisolierung, …). Each old address points to its new page;
   leftover template pages go to the closest fit. */
const OLD_PAGES: [string, string][] = [
  ['/kuechen', '/leistungen/waermedaemmung'],
  ['/badezimmer', '/leistungen/kaeltedaemmung'],
  ['/innenraeume', '/leistungen/brandschutz'],
  ['/projekte', '/referenzen'],
  ['/projects-7', '/referenzen'],
  ['/projects-7-:n', '/referenzen'],
  ['/info', '/ueber-uns'],
  ['/contact-8', '/karriere'],
  ['/angebot', '/kontakt'],
  ['/book-online', '/kontakt'],
  ['/anbauten', '/'],
  ['/aussenraeume', '/'],
  ['/wintergaerten', '/'],
  ['/photo-albums', '/referenzen'],
  ['/cookies', '/datenschutz'],
];

const nextConfig: NextConfig = {
  images: { qualities: [75, 85] },
  async redirects() {
    return OLD_PAGES.map(([source, destination]) => ({ source, destination, permanent: true }));
  },
};

export default nextConfig;
