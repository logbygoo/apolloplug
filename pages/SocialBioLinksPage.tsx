import React from 'react';
import { Link } from 'react-router-dom';
import Seo from '../components/Seo';
import { SEO_CONFIG } from '../configs/seoConfig';
import { TESLA_REFERRAL_LINK } from '../configs/purchaseConfig';
import { BIO_LINKS_CONTACT } from '../configs/bioLinksConfig';
import { LandingTiktokSocialBlock } from '../components/LandingTiktokSocialBlock';
import { EnvelopeIcon, PhoneIcon } from '../icons';

export type SocialBioLinksSource = 'ig' | 'fb' | 'yt' | 'tt';

const NAV_ARIA: Record<SocialBioLinksSource, string> = {
  ig: 'Apollo — linki z Instagrama',
  fb: 'Apollo — linki z Facebooka',
  yt: 'Apollo — linki z YouTube',
  tt: 'Apollo — linki z TikToka',
};

const btnBase =
  'flex w-full items-center justify-center rounded-xl px-5 py-4 text-center text-base font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2';

export type SocialBioLinksPageProps = {
  source: SocialBioLinksSource;
};

const SocialBioLinksPage: React.FC<SocialBioLinksPageProps> = ({ source }) => {
  const seoPath = `/${source}` as const;
  const seo = SEO_CONFIG[seoPath];

  return (
    <>
      <Seo {...seo} />
      <div className="container mx-auto max-w-lg px-4 pb-16 pt-6 md:px-6 md:pt-10">
        <nav className="flex flex-col gap-3" aria-label={NAV_ARIA[source]}>
          <Link
            to="/"
            className={`${btnBase} bg-black text-white hover:bg-black/90`}
          >
            Strona główna Apollo
          </Link>
          <Link
            to="/wypozyczalnia"
            className={`${btnBase} border-2 border-black bg-white text-foreground hover:bg-secondary/60`}
          >
            Wypożycz Auto EV
          </Link>
          <a
            href={TESLA_REFERRAL_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className={`${btnBase} border-2 border-[#E31937] bg-white text-foreground hover:bg-[#E31937]/5`}
          >
            Zamów Teslę na tesla.com
          </a>
        </nav>

        <div className="mt-8 border-t border-border pt-8">
          <p className="mb-4 text-center text-xs font-medium uppercase tracking-wide text-muted-foreground">
            Kontakt
          </p>
          <div className="flex flex-col items-center gap-4">
            <a
              href={BIO_LINKS_CONTACT.phoneTel}
              className="inline-flex items-center gap-2 text-lg font-semibold text-foreground transition-colors hover:text-primary"
            >
              <PhoneIcon className="h-5 w-5 shrink-0" aria-hidden />
              {BIO_LINKS_CONTACT.phoneDisplay}
            </a>
            <a
              href={`mailto:${BIO_LINKS_CONTACT.email}`}
              className="inline-flex items-center gap-2 text-base text-muted-foreground transition-colors hover:text-primary"
            >
              <EnvelopeIcon className="h-5 w-5 shrink-0" aria-hidden />
              {BIO_LINKS_CONTACT.email}
            </a>
            <Link
              to="/kontakt"
              className={`${btnBase} mt-1 max-w-sm border border-border bg-secondary/80 text-foreground hover:bg-secondary`}
            >
              Strona kontaktowa
            </Link>
          </div>
        </div>

        <div className="mt-10">
          <LandingTiktokSocialBlock />
        </div>
      </div>
    </>
  );
};

export default SocialBioLinksPage;
