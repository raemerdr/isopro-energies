import type { CSSProperties } from 'react';

export const cx = (...parts: (string | false | null | undefined)[]) => parts.filter(Boolean).join(' ') || undefined;

/** Position in a staggered group: sets `--i` for the reveal delay. */
export const idx = (i: number) => ({ '--i': i }) as CSSProperties;

export const prefersReducedMotion = () => matchMedia('(prefers-reduced-motion: reduce)').matches;

/** Two digits, as the section and step numbers are set: 1 → "01". */
export const pad = (n: number) => String(n).padStart(2, '0');
