/* The button kit, after the reference design (Movera): a pill with the label and an arrow. On hover the
   label rolls up word by word while a second copy rolls in from below, and the arrow slides in from the
   left (see "Buttons" in globals.css). `Roll` is the same roll on its own, letter by letter for the
   footer links. */
import NextLink from 'next/link';
import { Fragment, type CSSProperties, type ReactNode } from 'react';
import { Icon, type IconName } from '@/components/icons';
import { cx } from '@/lib/ui';

type Variant = 'dark' | 'mint' | 'light' | 'soft' | 'night';

/** Routes go through the router; anchors, phone numbers and outside addresses are plain links. */
export function Link({ href, ...props }: { href: string; className?: string; children: ReactNode; 'aria-label'?: string; 'aria-current'?: 'page'; tabIndex?: number; onClick?: () => void }) {
  if (href.startsWith('/') && !href.startsWith('/#')) return <NextLink href={href} {...props} />;
  const outside = /^https?:/.test(href);
  return <a href={href} {...(outside && { target: '_blank', rel: 'noopener' })} {...props} />;
}

/** Text that rolls up when its link or button is hovered: the visible copy moves out, a second copy moves
    in. Only plain text rolls; anything else is shown as it is. Both copies are split into words or
    letters, which assistive technology may read as separate pieces, so it gets the label once, whole. */
export function Roll({ children, by = 'words' }: { children: ReactNode; by?: 'words' | 'chars' }) {
  if (typeof children !== 'string') return <span className="roll">{children}</span>;
  const units = by === 'words' ? children.split(' ') : [...children];
  const row = () => (
    <span className="roll__row" aria-hidden="true">
      {units.map((unit, i) => (
        <Fragment key={i}>
          {by === 'words' && i > 0 && ' '}
          <span className="roll__unit" style={{ '--u': i } as CSSProperties}>{unit === ' ' ? '\u00a0' : unit}</span>
        </Fragment>
      ))}
    </span>
  );
  return <span className={cx('roll', by === 'chars' && 'roll--chars')}><span className="sr-only">{children}</span>{row()}{row()}</span>;
}

/** A button's inside: the rolling label and an arrow that slides in from the left. */
export function ButtonContent({ children, icon = 'arrow' }: { children: ReactNode; icon?: IconName }) {
  return (
    <>
      <Roll>{children}</Roll>
      <span className="btn__icon" aria-hidden="true"><span><Icon name={icon} /><Icon name={icon} /></span></span>
    </>
  );
}

/** `label` names the target when the visible text alone would not (several "Details ansehen" on one page). */
export function Button({ href, children, variant = 'dark', icon = 'arrow', block, className, label }: {
  href: string; children: ReactNode; variant?: Variant; icon?: IconName; block?: boolean; className?: string; label?: string;
}) {
  return (
    <Link href={href} className={cx('btn', `btn--${variant}`, block && 'btn--block', className)} aria-label={label}>
      <ButtonContent icon={icon}>{children}</ButtonContent>
    </Link>
  );
}
