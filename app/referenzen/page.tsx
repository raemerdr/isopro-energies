import type { Metadata } from 'next';
import { ReferenceGrid } from '@/components/reference-grid';
import { CtaBar, PlainHero } from '@/components/sections';
import { getCopy } from '@/lib/i18n/server';
import { REF_CATEGORIES, referencesIn } from '@/lib/references';

export async function generateMetadata(): Promise<Metadata> {
  const { referencesPage } = await getCopy();
  return { ...referencesPage.meta, alternates: { canonical: '/referenzen' } };
}

export default async function ReferencesPage() {
  const copy = await getCopy();
  const { banner } = copy.referencesPage;
  const categories = REF_CATEGORIES.map((key) => ({ key, label: copy.refCategories[key] }));
  return (
    <main id="main">
      <PlainHero tag={banner.subtitle} title={banner.title} text={banner.text} />
      <section className="section section--top-0">
        <div className="wrap">
          <ReferenceGrid references={referencesIn(copy)} categories={categories} />
        </div>
      </section>
      <CtaBar />
    </main>
  );
}
