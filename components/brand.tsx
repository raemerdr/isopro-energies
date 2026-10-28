/* The logo, and its symbol redrawn as SVG: two rings of dots, mint outside and slate-teal inside,
   open to the right. The dot positions are measured from the client's logo file (scripts/images.py),
   so the drawing matches it exactly; as SVG it can move (see `.ring` in globals.css). */
import Image from 'next/image';
import type { CSSProperties } from 'react';
import { cx } from '@/lib/ui';

// [x, y] in a 600 × 572 box, round the C from its upper end to its lower end (the order the dots appear in)
const OUTER: [number, number][] = [[507, 125], [405, 46], [277, 23], [154, 61], [62, 151], [23, 271], [47, 397], [126, 496], [245, 548], [375, 541], [487, 474]];
const INNER: [number, number][] = [[457, 168], [381, 111], [283, 88], [198, 121], [132, 188], [100, 272], [119, 367], [180, 443], [262, 476], [357, 471], [441, 426]];

/** The dot ring. `motion` lets the dots appear one after another when the ring comes into view. */
export function DotRing({ className, motion, style }: { className?: string; motion?: boolean; style?: CSSProperties }) {
  return (
    <svg className={cx('ring', motion && 'ring--motion', className)} viewBox="0 0 600 572" aria-hidden="true" focusable="false" style={style}>
      {/* --d: appearance delay; --n: place in the sweep round the C, both rings together (0–21), for the scroll gauge */}
      {OUTER.map(([x, y], i) => <circle key={`o${i}`} className="ring__outer" cx={x} cy={y} r={22} style={{ '--d': i, '--n': i * 2 } as CSSProperties} />)}
      {INNER.map(([x, y], i) => <circle key={`i${i}`} className="ring__inner" cx={x} cy={y} r={15.7} style={{ '--d': i + 3, '--n': i * 2 + 1 } as CSSProperties} />)}
    </svg>
  );
}

/** The full lockup (symbol, name and tagline). `light` has white lettering for dark backgrounds. */
export function Logo({ light, className, priority }: { light?: boolean; className?: string; priority?: boolean }) {
  // shown about 160–190 px wide: `sizes` keeps the browser from fetching the full 1400 px file
  return <Image className={className} src={light ? '/brand/logo-light.png' : '/brand/logo.png'} alt="" width={1400} height={447} sizes="200px" priority={priority} />;
}
