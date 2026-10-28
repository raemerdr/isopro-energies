'use client';
/* The reference design's two scroll-linked effects, driven by the scroll position rather than by time:
     [data-stack]  sticky cards: a card blurs (up to 5 px) as the next one slides over it
     [data-rise]   the process cards start lower the further right they sit (offsets in rem, listed in the
                   attribute), blurred 5 px, and settle into one sharp line by 60 % of the section's way
                   through the viewport (the reference's "scrolling in view" timeline)
   Nothing moves for visitors who ask for reduced motion, or below 992 px, where the cards simply stack. */
import { usePathname } from 'next/navigation';
import { useEffect } from 'react';
import { prefersReducedMotion } from '@/lib/ui';

const clamp = (value: number) => Math.min(Math.max(value, 0), 1);
const blur = (amount: number) => (amount > 0.01 ? `blur(${(amount * 5).toFixed(2)}px)` : '');

export function ScrollFx() {
  const pathname = usePathname();

  useEffect(() => {
    if (prefersReducedMotion()) return;
    const wide = matchMedia('(min-width: 992px)');
    let frame = 0;

    const update = () => {
      frame = 0;
      document.querySelectorAll<HTMLElement>('[data-stack]').forEach((list) => {
        const cards = Array.from(list.children) as HTMLElement[];
        cards.forEach((card, i) => {
          const next = cards[i + 1];
          if (!next || !wide.matches) { card.style.filter = ''; return; }
          const a = card.getBoundingClientRect();
          card.style.filter = blur(clamp((a.bottom - next.getBoundingClientRect().top) / a.height));
        });
      });
      document.querySelectorAll<HTMLElement>('[data-rise]').forEach((section) => {
        const offsets = (section.dataset.rise ?? '').split(',').map(Number);
        const box = section.getBoundingClientRect();
        const left = wide.matches ? 1 - clamp((innerHeight - box.top) / (innerHeight + box.height) / 0.6) : 0;
        section.querySelectorAll<HTMLElement>('[data-rise-item]').forEach((item, i) => {
          item.style.transform = left ? `translateY(${((offsets[i] ?? 0) * left).toFixed(3)}rem)` : '';
          item.style.filter = blur(left);
        });
      });
    };

    const schedule = () => { if (!frame) frame = requestAnimationFrame(update); };
    update();
    addEventListener('scroll', schedule, { passive: true });
    addEventListener('resize', schedule);
    wide.addEventListener('change', schedule);
    return () => {
      cancelAnimationFrame(frame);
      removeEventListener('scroll', schedule);
      removeEventListener('resize', schedule);
      wide.removeEventListener('change', schedule);
    };
  }, [pathname]);

  return null;
}
