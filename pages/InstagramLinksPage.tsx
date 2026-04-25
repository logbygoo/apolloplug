import React from 'react';
import { Link } from 'react-router-dom';
import Seo from '../components/Seo';
import { SEO_CONFIG } from '../configs/seoConfig';
import { LandingTiktokSocialBlock } from '../components/LandingTiktokSocialBlock';

const btnBase =
  'flex w-full items-center justify-center rounded-xl px-5 py-4 text-center text-base font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2';

const InstagramLinksPage: React.FC = () => (
  <>
    <Seo {...SEO_CONFIG['/ig']} />
    <div className="container mx-auto max-w-lg px-4 pb-16 pt-6 md:px-6 md:pt-10">
      <nav className="flex flex-col gap-3" aria-label="Apollo — linki z Instagrama">
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
          href="https://www.tesla.com"
          target="_blank"
          rel="noopener noreferrer"
          className={`${btnBase} border-2 border-[#E31937] bg-white text-foreground hover:bg-[#E31937]/5`}
        >
          Zamów Teslę na tesla.com
        </a>
      </nav>
      <div className="mt-10">
        <LandingTiktokSocialBlock />
      </div>
    </div>
  </>
);

export default InstagramLinksPage;
