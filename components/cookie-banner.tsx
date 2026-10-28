'use client';
/* The cookie notice: a white card at the bottom left that rises in after the loading screen, until the
   visitor chooses. "Nur notwendige" and "Alle akzeptieren" are equally easy to reach, as German law asks.
   The footer's "Cookie-Einstellungen" opens it again (CONSENT_OPEN). The choice is kept in lib/consent.ts. */
import { useEffect, useState } from 'react';
import { DotRing } from '@/components/brand';
import { ButtonContent, Link } from '@/components/cta';
import { useCopy } from '@/components/i18n';
import { LOADED_EVENT, isLoaded } from '@/components/loader';
import { CONSENT_OPEN, readConsent, saveConsent, type ConsentChoice } from '@/lib/consent';
import { cx } from '@/lib/ui';

export function CookieBanner() {
  const t = useCopy().consent;
  const [open, setOpen] = useState(false);

  useEffect(() => {
    let timer = 0;
    // A moment after the loading screen, and only if there is no choice yet
    const arrive = () => { timer = window.setTimeout(() => { if (!readConsent()) setOpen(true); }, 700); };
    const reopen = () => setOpen(true);
    if (isLoaded()) arrive();
    else addEventListener(LOADED_EVENT, arrive, { once: true });
    addEventListener(CONSENT_OPEN, reopen);
    return () => {
      clearTimeout(timer);
      removeEventListener(LOADED_EVENT, arrive);
      removeEventListener(CONSENT_OPEN, reopen);
    };
  }, []);

  const choose = (choice: ConsentChoice) => {
    saveConsent(choice);
    setOpen(false);
  };

  return (
    <section className={cx('consent-banner', open && 'is-open')} aria-labelledby="consent-title" inert={!open}>
      <h2 id="consent-title" className="consent-banner__title"><DotRing />{t.title}</h2>
      <p>{t.text} <Link href="/datenschutz">{t.privacy}</Link></p>
      <div className="consent-banner__actions">
        <button type="button" className="btn btn--light" onClick={() => choose('necessary')}><ButtonContent>{t.necessary}</ButtonContent></button>
        <button type="button" className="btn btn--dark" onClick={() => choose('all')}><ButtonContent>{t.accept}</ButtonContent></button>
      </div>
    </section>
  );
}

/** "Cookie-Einstellungen" in the footer: opens the notice again */
export function CookieSettingsLink({ children, className }: { children: React.ReactNode; className?: string }) {
  return <button type="button" className={className} onClick={() => dispatchEvent(new Event(CONSENT_OPEN))}>{children}</button>;
}
