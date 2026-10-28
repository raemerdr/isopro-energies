'use client';
/* The header, after the reference design: a white pill floating over the page, logo left, the pages in
   the middle (the current one on grey), the contact button right. It drops in from above once the
   loading screen has gone. "Leistungen" opens a panel under the pill with the four services (on hover,
   or by click and keyboard). Below 992 px the pill keeps the logo and a round menu button, and the
   pages, with the services under "Leistungen", open in a card under it. */
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Fragment, useEffect, useRef, useState, type CSSProperties } from 'react';
import { Logo } from '@/components/brand';
import { Button, Link } from '@/components/cta';
import { useCopy } from '@/components/i18n';
import { Icon } from '@/components/icons';
import { fill } from '@/lib/i18n';
import { SITE } from '@/lib/site';
import { cx } from '@/lib/ui';

/** A service as the header shows it (the words come from the server copy, see app/layout.tsx) */
export interface NavService { href: string; name: string; summary: string; image: string }

const SERVICES_HREF = '/leistungen';

export function SiteHeader({ services }: { services: NavService[] }) {
  const { nav } = useCopy();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  // The services panel: `drop` is open by click or keyboard; `resting` keeps hover from reopening it
  // right after a link in it was chosen, until the pointer leaves
  const [drop, setDrop] = useState(false);
  const [resting, setResting] = useState(false);
  const dropRef = useRef<HTMLDivElement>(null);

  // The open menu locks the page behind it and closes on Escape or when the layout turns wide
  useEffect(() => {
    document.documentElement.classList.toggle('is-locked', open);
    if (!open) return;
    const close = () => setOpen(false);
    const onKey = (event: KeyboardEvent) => { if (event.key === 'Escape') close(); };
    const wide = matchMedia('(min-width: 992px)');
    addEventListener('keydown', onKey);
    wide.addEventListener('change', close);
    return () => {
      removeEventListener('keydown', onKey);
      wide.removeEventListener('change', close);
      document.documentElement.classList.remove('is-locked');
    };
  }, [open]);

  // The services panel closes on Escape (focus goes back to its button) and on a click elsewhere
  useEffect(() => {
    if (!drop) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return;
      setDrop(false);
      dropRef.current?.querySelector('button')?.focus();
    };
    const onDown = (event: PointerEvent) => { if (!dropRef.current?.contains(event.target as Node)) setDrop(false); };
    addEventListener('keydown', onKey);
    addEventListener('pointerdown', onDown);
    return () => {
      removeEventListener('keydown', onKey);
      removeEventListener('pointerdown', onDown);
    };
  }, [drop]);

  const close = () => setOpen(false);
  const chosen = () => { setDrop(false); setResting(true); };
  const current = (href: string) => (pathname === href || (href !== '/' && pathname.startsWith(`${href}/`)) ? 'page' : undefined);
  const pages = [
    { href: '/', label: nav.start },
    { href: '/leistungen', label: nav.services },
    { href: '/referenzen', label: nav.references },
    { href: '/blog', label: nav.blog },
    { href: '/ueber-uns', label: nav.about },
    { href: '/karriere', label: nav.career },
  ];

  return (
    <header className={cx('nav', open && 'is-open')}>
      <div className="nav__pill">
        <Link href="/" className="nav__logo" aria-label={fill(nav.home, { name: SITE.legalName })} onClick={close}>
          <Logo priority />
        </Link>
        <nav className="nav__links" aria-label={nav.main}>
          {pages.map(({ href, label }) => href === SERVICES_HREF ? (
            <div
              key={href} ref={dropRef} className={cx('navdrop', drop && 'is-open', resting && 'is-resting')}
              onPointerLeave={(event) => { if (event.pointerType === 'mouse') { setDrop(false); setResting(false); } }}
              onBlur={(event) => { if (!event.currentTarget.contains(event.relatedTarget)) setDrop(false); }}
            >
              <button type="button" className="nav__link navdrop__btn" aria-expanded={drop} aria-controls="services-menu" aria-current={current(href)} onClick={() => setDrop(!drop)}>
                {label}<Icon name="chevron" />
              </button>
              <div className="navdrop__panel" id="services-menu">
                <ul>
                  {services.map((service, i) => (
                    <li key={service.href} style={{ '--i': i } as CSSProperties}>
                      <Link href={service.href} className="navdrop__item" aria-current={current(service.href)} onClick={chosen}>
                        <span className="navdrop__img"><Image src={service.image} alt="" fill sizes="200px" /></span>
                        <b>{service.name}</b>
                        <small>{service.summary}</small>
                      </Link>
                    </li>
                  ))}
                </ul>
                <Link href={href} className="navdrop__all" onClick={chosen}>{nav.allServices}<Icon name="arrow" /></Link>
              </div>
            </div>
          ) : (
            <Link key={href} href={href} className="nav__link" aria-current={current(href)}>{label}</Link>
          ))}
        </nav>
        <Button href="/kontakt" className="nav__cta">{nav.contact}</Button>
        <button className="nav__burger" type="button" aria-expanded={open} aria-controls="mobile-menu" aria-label={open ? nav.close : nav.open} onClick={() => setOpen(!open)}>
          <span /><span />
        </button>
      </div>

      <div className="nav__panel" id="mobile-menu" hidden={!open}>
        <nav aria-label={nav.mobile} onClick={close}>
          {pages.map(({ href, label }) => (
            <Fragment key={href}>
              <Link href={href} aria-current={current(href)}>{label}</Link>
              {href === SERVICES_HREF && (
                <ul className="nav__sub">
                  {services.map(({ href: serviceHref, name }) => <li key={serviceHref}><Link href={serviceHref} aria-current={current(serviceHref)}>{name}</Link></li>)}
                </ul>
              )}
            </Fragment>
          ))}
          <Button href="/kontakt" block>{nav.contact}</Button>
        </nav>
      </div>
    </header>
  );
}
