'use client';
/* Smooth scrolling (Lenis), as on the reference sites: the mouse wheel eases the page along instead of
   stepping it. The page still scrolls natively underneath, so sticky parts, the scroll effects
   (components/scroll-fx.tsx) and the reveals keep working; touch keeps the device's own scrolling. Links
   to a place on the same page glide there too, stopping below the header. Off for visitors who ask for
   reduced motion, and paused while the phone menu locks the page (`is-locked`, components/site-header.tsx). */
import Lenis from 'lenis';
import { useEffect } from 'react';
import { prefersReducedMotion } from '@/lib/ui';

/** Matches `scroll-padding-top` on html (globals.css), which places the browser's own anchor jumps */
const HEADER_SPACE = 100;

export function SmoothScroll() {
  useEffect(() => {
    if (prefersReducedMotion()) return;
    const lenis = new Lenis({ autoRaf: true, anchors: { offset: -HEADER_SPACE } });
    const html = document.documentElement;
    const sync = () => (html.classList.contains('is-locked') ? lenis.stop() : lenis.start());
    const watch = new MutationObserver(sync);
    watch.observe(html, { attributes: true, attributeFilter: ['class'] });
    return () => {
      watch.disconnect();
      lenis.destroy();
    };
  }, []);

  return null;
}
