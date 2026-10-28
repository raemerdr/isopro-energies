'use client';
/* Scroll reveals, after the reference design: anything carrying `data-reveal` comes in once as it enters
   the viewport. The kind is the attribute's value (styles under "Reveal" in globals.css):
     (empty)  slides up from 100 px and fades in, 1 s, ease-out-quart  (the reference's "slideInBottom")
     fade     fades in only
     img      a cover wipes away while the photo settles from 130 % to 100 %
   `--d` delays an item in ms-steps of 100 (lib/ui.ts, delay). Nothing starts before the loading screen
   has gone (components/loader.tsx), so the first screen animates in view. Runs again after each navigation. */
import { usePathname } from 'next/navigation';
import { useEffect } from 'react';
import { LOADED_EVENT, isLoaded } from '@/components/loader';
import { prefersReducedMotion } from '@/lib/ui';

export function Motion() {
  const pathname = usePathname();

  useEffect(() => {
    document.documentElement.classList.add('is-ready');
    const pending = () => document.querySelectorAll('[data-reveal]:not(.is-in)');
    if (!('IntersectionObserver' in window) || prefersReducedMotion()) {
      pending().forEach((item) => item.classList.add('is-in'));
      return;
    }
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        entry.target.classList.add('is-in');
        observer.unobserve(entry.target);
      }
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
    const watch = () => pending().forEach((item) => observer.observe(item));
    // items rendered later (the reference filter) would stay hidden otherwise
    const added = new MutationObserver(watch);
    const start = () => {
      // Whatever is on the first screen comes in now, even right at its lower edge, where the margin
      // above and the hidden state's offset would otherwise hold it back until the page scrolls
      pending().forEach((item) => { if (item.getBoundingClientRect().top < innerHeight) item.classList.add('is-in'); });
      watch();
      added.observe(document.body, { childList: true, subtree: true });
    };
    if (isLoaded()) start();
    else addEventListener(LOADED_EVENT, start, { once: true });
    return () => {
      removeEventListener(LOADED_EVENT, start);
      observer.disconnect();
      added.disconnect();
    };
  }, [pathname]);

  return null;
}
