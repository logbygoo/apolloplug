import React from 'react';
import { Link } from 'react-router-dom';
import Seo from '../components/Seo';
import { SEO_CONFIG } from '../configs/seoConfig';
import { TESLA_REFERRAL_LINK } from '../configs/purchaseConfig';
import { SOCIAL_MEDIA_LINKS } from '../configs/socialLinks';
import { BIO_LINKS_CONTACT } from '../configs/bioLinksConfig';
import { LandingTiktokSocialBlock } from '../components/LandingTiktokSocialBlock';
import { EnvelopeIcon, FacebookIcon, InstagramIcon, PhoneIcon, TikTokIcon, YoutubeIcon } from '../icons';

const SOCIAL_ICONS: Record<
  (typeof SOCIAL_MEDIA_LINKS)[number]['id'],
  React.FC<React.SVGProps<SVGSVGElement>>
> = {
  tiktok: TikTokIcon,
  instagram: InstagramIcon,
  facebook: FacebookIcon,
  youtube: YoutubeIcon,
};

/** Obramowania w kolorach marek (białe tło, tekst w kolorze treści). */
const SOCIAL_BUTTON_CLASS: Record<(typeof SOCIAL_MEDIA_LINKS)[number]['id'], string> = {
  tiktok: 'border-2 border-black text-foreground hover:bg-black/5',
  instagram: 'border-2 border-[#E1306C] text-foreground hover:bg-[#E1306C]/5',
  facebook: 'border-2 border-[#1877F2] text-foreground hover:bg-[#1877F2]/5',
  youtube: 'border-2 border-[#FF0000] text-foreground hover:bg-red-500/5',
};

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
        <h1 className="m-0 text-center text-2xl font-bold tracking-tight text-foreground md:text-3xl">
          Drzewo linków
        </h1>
        <nav
          className="mt-6 flex flex-col gap-3"
          aria-label={NAV_ARIA[source]}
        >
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
          <h2 className="m-0 text-center text-xl font-semibold text-foreground">
            Skontaktuj się
          </h2>
          <div className="mt-5 flex flex-col items-center gap-4">
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
            <p className="m-0 max-w-sm text-center text-sm leading-relaxed text-muted-foreground">
              Inne formy kontaktu znajdziesz na{' '}
              <Link
                to="/kontakt"
                className="font-medium text-foreground underline underline-offset-2 transition-colors hover:text-primary"
              >
                /kontakt
              </Link>
            </p>
          </div>
        </div>

        <div className="mt-10">
          <LandingTiktokSocialBlock />
        </div>

        <section className="mt-10" aria-labelledby="social-bio-h2">
          <h2
            id="social-bio-h2"
            className="m-0 text-center text-xl font-semibold text-foreground"
          >
            Nasze social media
          </h2>
          <ul className="mt-4 flex list-none flex-col gap-3 p-0">
            {SOCIAL_MEDIA_LINKS.map(({ id, href, label }) => {
              const Icon = SOCIAL_ICONS[id];
              return (
                <li key={id}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={[
                      btnBase,
                      'gap-2 bg-background',
                      SOCIAL_BUTTON_CLASS[id],
                    ].join(' ')}
                  >
                    <Icon className="h-5 w-5 shrink-0" aria-hidden />
                    {label}
                  </a>
                </li>
              );
            })}
          </ul>
        </section>
      </div>
    </>
  );
};

export default SocialBioLinksPage;
