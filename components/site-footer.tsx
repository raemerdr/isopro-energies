/* The footer, after the reference design: dark, with the logo, a short line and a contact pill on the
   left (where the reference has its newsletter field) and three link columns on the right whose labels
   roll letter by letter on hover. */
import { Logo } from '@/components/brand';
import { CookieSettingsLink } from '@/components/cookie-banner';
import { Button, Link, Roll } from '@/components/cta';
import { fill } from '@/lib/i18n';
import { getCopy } from '@/lib/i18n/server';
import { serviceHref, servicesIn } from '@/lib/services';
import { CREDIT, SITE } from '@/lib/site';

export async function SiteFooter() {
  const copy = await getCopy();
  const { footer, client: { nav } } = copy;
  const columns = [
    { title: footer.company, links: [['/', nav.start], ['/ueber-uns', nav.about], ['/referenzen', nav.references], ['/blog', nav.blog], ['/karriere', nav.career]] },
    { title: footer.services, links: [...servicesIn(copy).map(({ slug, name }) => [serviceHref(slug), name]), ['/leistungen', nav.allServices]] },
    { title: footer.info, links: [['/kontakt', nav.contact], ['/kontakt#faq', footer.faq], ['/karriere#nachunternehmer', footer.subcontractors], ['/impressum', footer.imprint], ['/datenschutz', footer.privacy]] },
  ];

  return (
    <footer className="footer">
      <div className="wrap">
        <div className="footer__top">
          <div className="footer__brand">
            <Link href="/" className="footer__logo" aria-label={fill(nav.home, { name: SITE.legalName })}><Logo light /></Link>
            <p className="footer__lead">{footer.lead}</p>
            <div className="footer__pill">
              <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
              <Button href="/kontakt" variant="mint">{footer.write}</Button>
            </div>
            <p className="footer__small">
              <a href={SITE.phoneHref}>{SITE.phone}</a>
              <span> · </span>
              {SITE.street}, {SITE.zip} {SITE.city}
            </p>
          </div>

          <div className="footer__cols">
            {columns.map(({ title, links }) => (
              <div key={title}>
                <h2 className="footer__title">{title}</h2>
                <ul>
                  {links.map(([href, label]) => <li key={href}><Link href={href} className="footer__link"><Roll by="chars">{label}</Roll></Link></li>)}
                  {/* The last column also opens the cookie notice again */}
                  {title === footer.info && <li><CookieSettingsLink className="footer__link"><Roll by="chars">{footer.cookies}</Roll></CookieSettingsLink></li>}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="footer__bottom">
          <p>{fill(footer.rights, { year: new Date().getFullYear(), name: SITE.legalName })}</p>
          <p lang="en">{CREDIT.label} <a href={CREDIT.url} target="_blank" rel="noopener noreferrer">{CREDIT.name}</a></p>
        </div>
      </div>
    </footer>
  );
}
