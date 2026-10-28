'use client';
/* The references page's grid: filter chips by category, and each card opens its photo large in a dialog,
   with what it shows listed under it. The filter keeps the order. The page hands over the references
   and the category names in its language. */
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { useCopy } from '@/components/i18n';
import { Icon } from '@/components/icons';
import { ReferenceCard } from '@/components/reference-card';
import { fill } from '@/lib/i18n';
import type { RefCategory, Reference } from '@/lib/references';
import { cx, idx } from '@/lib/ui';

export function ReferenceGrid({ references, categories }: { references: Reference[]; categories: { key: RefCategory; label: string }[] }) {
  const { grid } = useCopy();
  const [filter, setFilter] = useState<RefCategory | null>(null);
  const [shown, setShown] = useState<Reference | null>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  const items = filter ? references.filter(({ category }) => category === filter) : references;

  useEffect(() => {
    const el = dialog.current;
    if (!el) return;
    if (shown && !el.open) el.showModal();
    if (!shown && el.open) el.close();
  }, [shown]);

  const count = (key: RefCategory | null) => (key ? references.filter(({ category }) => category === key).length : references.length);

  return (
    <>
      <div className="filters" role="group" aria-label={grid.filter} data-reveal>
        {[{ key: null, label: grid.all }, ...categories].map(({ key, label }) => (
          <button key={label} type="button" className={cx('filter')} aria-pressed={filter === key} onClick={() => setFilter(key)}>
            {label}<small>{count(key)}</small>
          </button>
        ))}
      </div>

      <ul className="ref-grid" aria-live="polite">
        {items.map((reference, i) => (
          <li key={reference.id} className="ref-grid__item" data-reveal style={idx((i % 3) * 2)}>
            <ReferenceCard reference={reference} sizes="(max-width: 767px) 100vw, (max-width: 1100px) 50vw, 400px" />
            {/* covers the whole card: the click opens the photo */}
            <button type="button" className="ref-open" onClick={() => setShown(reference)} aria-label={fill(grid.open, { title: reference.title })} />
          </li>
        ))}
      </ul>

      <dialog ref={dialog} className="lightbox" onClose={() => setShown(null)} onClick={(event) => { if (event.target === dialog.current) setShown(null); }} aria-label={shown?.title}>
        {shown && (
          <figure>
            <div className="lightbox__img"><Image src={shown.image} alt={shown.title} fill sizes="90vw" quality={85} /></div>
            <figcaption>
              <span className="ref__tag">{shown.tag}</span>
              <b>{shown.title}</b>
              <span className="lightbox__specs">{[...(shown.facts ?? []), ...shown.specs].map(([label, value]) => `${label}: ${value}`).join(' · ')}</span>
            </figcaption>
          </figure>
        )}
        <button type="button" className="lightbox__close" onClick={() => setShown(null)} aria-label={grid.close}><Icon name="close" /></button>
      </dialog>
    </>
  );
}
