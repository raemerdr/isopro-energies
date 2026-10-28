import type { Metadata } from 'next';
import { CtaBar, FaqSection, PhotoHero, SectionHead, ServiceStack } from '@/components/sections';
import { PHOTOS } from '@/lib/content';
import { getCopy } from '@/lib/i18n/server';

export async function generateMetadata(): Promise<Metadata> {
  const { servicesPage } = await getCopy();
  return { ...servicesPage.meta, alternates: { canonical: '/leistungen' } };
}

export default async function ServicesPage() {
  const { banner, intro } = (await getCopy()).servicesPage;
  return (
    <main id="main">
      <PhotoHero tag={banner.subtitle} title={banner.title} text={banner.text} button={banner.button} image={PHOTOS.servicesHero} />
      <section className="section">
        <div className="wrap">
          <SectionHead tag={intro.subtitle} title={intro.title} />
          <ServiceStack />
        </div>
      </section>
      <FaqSection />
      <CtaBar />
    </main>
  );
}
