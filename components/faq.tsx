/* Questions that open to their answers, after the reference's FAQ: white rows, the chevron turns over.
   Native <details>: works without script, and browsers that support it slide the answer open (see
   `.faq` in globals.css). The reference opens them on hover; here a click opens them, the same for mouse,
   keyboard and touch. */
import { Icon } from '@/components/icons';
import { idx } from '@/lib/ui';

export interface FaqItem { q: string; a: string }

export function Faq({ items, open = 0 }: { items: FaqItem[]; open?: number }) {
  return (
    <div className="faq">
      {items.map(({ q, a }, i) => (
        <details key={q} className="faq__item" open={i === open} data-reveal style={idx(Math.min(i, 4))}>
          <summary>
            <span className="faq__q">{q}</span>
            <span className="faq__toggle" aria-hidden="true"><Icon name="chevron" /></span>
          </summary>
          <div className="faq__a"><p>{a}</p></div>
        </details>
      ))}
    </div>
  );
}
