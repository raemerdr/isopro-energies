/* The visitor's choice in the cookie notice (components/cookie-banner.tsx), kept in the browser's local
   storage. The site uses no optional services yet: anything optional added later (analytics, a map
   embed) must check `allowsOptional()` first and load only when it is true. */

export type ConsentChoice = 'all' | 'necessary';

const KEY = 'isopro-consent';

/** Fired to open the notice again (the footer's "Cookie-Einstellungen") */
export const CONSENT_OPEN = 'isopro:consent-open';

export function readConsent(): { choice: ConsentChoice; at: string } | null {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function saveConsent(choice: ConsentChoice) {
  try {
    localStorage.setItem(KEY, JSON.stringify({ choice, at: new Date().toISOString() }));
  } catch {
    // Storage blocked (private mode): the notice simply asks again next time
  }
}

export const allowsOptional = () => readConsent()?.choice === 'all';
