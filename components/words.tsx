/* A headline split into words that rise out of a mask when it comes into view, after the reference's
   split-text headings: put `data-reveal="words"` on the heading ("Reveal" in globals.css). Words
   between asterisks (*mit Präzision,*) are set in grey. Assistive technology may read separate word
   boxes as separate pieces, so it gets the sentence once, whole. */
import { Fragment, type CSSProperties } from 'react';
import { cx } from '@/lib/ui';

/** The words of a text, each with whether it falls between asterisks. */
function parse(text: string) {
  const words: { word: string; muted: boolean }[] = [];
  let inMark = false;
  for (const token of text.split(' ')) {
    const opens = token.startsWith('*');
    if (opens) inMark = true;
    words.push({ word: token.replace(/\*/g, ''), muted: inMark });
    if (token.slice(opens ? 1 : 0).includes('*')) inMark = false;
  }
  return words;
}

export function Words({ children }: { children: string }) {
  const words = parse(children);
  return (
    <>
      <span className="sr-only">{children.replace(/\*/g, '')}</span>
      <span aria-hidden="true">
        {words.map(({ word, muted }, i) => (
          <Fragment key={i}>
            {i > 0 && ' '}
            <span className={cx('mw', muted && 'is-muted')}><span className="mw__in" style={{ '--w': i } as CSSProperties}>{word}</span></span>
          </Fragment>
        ))}
      </span>
    </>
  );
}
