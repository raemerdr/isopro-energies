'use client';
/* The loading screen: the logo's dot ring, on its own, turning while the page loads. It is part of the
   server HTML, so it covers the page from the first paint; once everything has loaded (and at least
   `MIN_MS` after navigation started, so it never just flickers) it fades out and the page's own
   animations begin. It shows on full page loads only, not when moving between pages.
   Without JavaScript it never appears (`html:not(.js)` in globals.css), and the boot script in
   app/layout.tsx drops it after a few seconds if the app never starts. */
import { useEffect, useState } from 'react';
import { DotRing } from '@/components/brand';
import { cx } from '@/lib/ui';

export const LOADED_EVENT = 'isopro:loaded';
const MIN_MS = 900;
const FADE_MS = 600;

export const isLoaded = () => document.documentElement.classList.contains('is-loaded');

export function Loader() {
  const [stage, setStage] = useState<'on' | 'leaving' | 'off'>('on');

  useEffect(() => {
    const timers: number[] = [];
    const finish = () => {
      // performance.now() counts from the start of the navigation
      timers.push(window.setTimeout(() => {
        setStage('leaving');
        document.documentElement.classList.add('is-loaded');
        dispatchEvent(new Event(LOADED_EVENT));
        timers.push(window.setTimeout(() => setStage('off'), FADE_MS));
      }, Math.max(0, MIN_MS - performance.now())));
    };
    if (document.readyState === 'complete') finish();
    else addEventListener('load', finish, { once: true });
    return () => {
      removeEventListener('load', finish);
      timers.forEach(clearTimeout);
    };
  }, []);

  if (stage === 'off') return null;
  return (
    <div className={cx('loader', stage === 'leaving' && 'is-leaving')} aria-hidden="true">
      <DotRing className="loader__ring" />
    </div>
  );
}
