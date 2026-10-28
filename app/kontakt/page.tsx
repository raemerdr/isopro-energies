import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { Icon, type IconName } from '@/components/icons';
import { ContactSection, FaqSection, PlainHero } from '@/components/sections';
import { getCopy } from '@/lib/i18n/server';
import { SITE } from '@/lib/site';

export async function generateMetadata(): Promise<Metadata> {
  const { contact } = await getCopy();
  return { ...contact.meta, alternates: { canonical: '/kontakt' } };
}

export default async function ContactPage() {
  const { banner, form, ways: labels } = (await getCopy()).contact;
  const ways: { icon: IconName; label: string; value: ReactNode; href: string }[] = [
    { icon: 'phone', label: labels.phone, value: SITE.phone, href: SITE.phoneHref },
    { icon: 'mail', label: labels.email, value: SITE.email, href: `mailto:${SITE.email}` },
    { icon: 'pin', label: labels.office, value: `${SITE.street}, ${SITE.zip} ${SITE.city}`, href: SITE.mapsUrl },
  ];

  return (
    <main id="main">
      <PlainHero tag={banner.subtitle} title={banner.title} text={banner.text} />
      <ContactSection
        tag={form.subtitle}
        title={form.title}
        side={(
          <ul className="ways" data-reveal>
            {ways.map(({ icon, label, value, href }) => (
              <li key={label}>
                <span className="ways__icon"><Icon name={icon} /></span>
                <span><small>{label}</small><a href={href} {...(href.startsWith('http') && { target: '_blank', rel: 'noopener' })}>{value}</a></span>
              </li>
            ))}
          </ul>
        )}
      />
      <FaqSection />
    </main>
  );
}
