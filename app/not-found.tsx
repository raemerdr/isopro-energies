import { PlainHero } from '@/components/sections';
import { getCopy } from '@/lib/i18n/server';

export default async function NotFound() {
  const { notFound } = await getCopy();
  return (
    <main id="main">
      <PlainHero tag={notFound.subtitle} title={notFound.title} text={notFound.text} button={notFound.button} href="/" />
    </main>
  );
}
