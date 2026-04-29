import React, { Suspense, lazy, useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, NavLink, Navigate, useLocation, useParams } from 'react-router-dom';
import CookieBanner from './components/CookieBanner';
import ExitIntentModal from './components/ExitIntentModal';
import { ApolloPlugLogo } from './constants';
import { Bars3Icon, XMarkIcon, PhoneIcon, FlagIcon, EnvelopeIcon, ChevronDownIcon } from './icons';
import { CONFIG } from './config';
import ScrollToTop from './components/ScrollToTop';
import { SITE_DOMAIN } from './configs/site';

const HomePage = lazy(() => import('./pages/HomePage'));
const TransfersPage = lazy(() => import('./pages/TransfersPage'));
const RentalV2Page = lazy(() => import('./pages/RentalV2Page'));
const RentalWypozyczalniaLandingPage = lazy(() => import('./pages/RentalWypozyczalniaLandingPage'));
const RentalReservationPage = lazy(() => import('./pages/RentalReservationPage'));
const FinancingPage = lazy(() => import('./pages/FinancingPage'));
const FleetPage = lazy(() => import('./pages/FleetPage'));
const ContactPage = lazy(() => import('./pages/ContactPage'));
const BlogPage = lazy(() => import('./pages/BlogPage'));
const BlogArticlePage = lazy(() => import('./pages/BlogArticlePage'));
const PurchasePage = lazy(() => import('./pages/PurchasePage'));
const InsurancePage = lazy(() => import('./pages/InsurancePage'));
const DocumentationPage = lazy(() => import('./pages/DocumentationPage'));
const RentalCarLandingPage = lazy(() => import('./pages/RentalCarLandingPage'));
const SocialBioLinksPage = lazy(() => import('./pages/SocialBioLinksPage'));
const WrapPage = lazy(() => import('./pages/WrapPage'));
const PdfViewerPage = lazy(() => import('./pages/PdfViewerPage'));
const DashPage = lazy(() => import('./pages/DashPage'));
const UnderConstructionPage = lazy(() => import('./pages/UnderConstructionPage'));

const RouteLoadingScreen: React.FC = () => (
  <div className="flex min-h-[40vh] items-center justify-center">
    <div className="h-8 w-8 animate-spin rounded-full border-2 border-border border-t-foreground" />
  </div>
);

/** Paralela do `/wypozycz/:carId` — wybór modelu tylko na `/rezerwacja/...` */
function RedirectWypozyczalniaToRezerwacja() {
  const { carId } = useParams<{ carId: string }>();
  return <Navigate to={`/rezerwacja/${carId}`} replace />;
}

const NAV_CORE = [
  { path: '/flota', name: 'Pojazdy' },
  { path: '/wypozyczalnia', name: 'Wypożyczalnia' },
  { path: '/transfery', name: 'Auto z kierowcą' },
] as const;

const OFERTA_LINKS = [
  { path: '/zakup', name: 'Zakup' },
  { path: '/ubezpieczenia', name: 'Ubezpieczenia' },
  { path: '/finansowanie', name: 'Finansowanie' },
] as const;

function isOfertaPath(pathname: string): boolean {
  return OFERTA_LINKS.some(
    ({ path }) => pathname === path || pathname.startsWith(`${path}/`)
  );
}

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [mobileOfertaOpen, setMobileOfertaOpen] = useState(false);
  const location = useLocation();
  const isOfertaActive = isOfertaPath(location.pathname);

  useEffect(() => {
    if (!isOpen) setMobileOfertaOpen(false);
  }, [isOpen]);

  const activeLinkClass = "font-semibold text-foreground";
  const inactiveLinkClass = "text-foreground/70 transition-colors hover:text-foreground";

  return (
    <>
      <header className="fixed top-0 z-50 w-full bg-background/80 backdrop-blur-sm">
        <div className="container mx-auto flex h-14 max-w-screen-2xl items-center px-4 md:px-6">
          <a href="/" className="mr-6 flex h-14 shrink-0 items-center">
            <ApolloPlugLogo />
          </a>
          
          <nav className="hidden min-h-0 flex-1 items-center justify-center gap-6 text-sm font-medium lg:flex">
            {NAV_CORE.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) =>
                  `inline-flex h-14 items-center ${isActive ? activeLinkClass : inactiveLinkClass}`
                }
              >
                {link.name}
              </NavLink>
            ))}
            <div className="group relative flex h-14 items-center">
              <button
                type="button"
                className={`inline-flex h-full items-center gap-0.5 ${isOfertaActive ? activeLinkClass : inactiveLinkClass}`}
                aria-haspopup="menu"
                aria-label="Oferta Apollo, otwórz menu"
              >
                Oferta
                <ChevronDownIcon className="h-4 w-4 opacity-70" aria-hidden />
              </button>
              <div className="absolute left-0 top-full z-50 pt-1 opacity-0 transition-all duration-200 invisible group-hover:visible group-hover:opacity-100">
                <div className="min-w-[12.5rem] overflow-hidden rounded-md border border-border bg-card shadow-lg">
                  <div className="border-b border-border px-4 py-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Oferta Apollo
                  </div>
                  {OFERTA_LINKS.map((link) => (
                    <NavLink
                      key={link.path}
                      to={link.path}
                      role="menuitem"
                      className={({ isActive }) =>
                        `block px-4 py-2 text-sm transition-colors ${
                          isActive
                            ? 'bg-secondary font-semibold text-foreground'
                            : 'text-foreground hover:bg-secondary'
                        }`
                      }
                    >
                      {link.name}
                    </NavLink>
                  ))}
                </div>
              </div>
            </div>
          </nav>

          <div className="ml-auto flex shrink-0 items-center gap-1.5 sm:gap-2 lg:gap-4">
            <a
              href="tel:500308400"
              className="flex shrink-0 p-1.5 text-foreground/70 transition-colors hover:text-foreground"
              aria-label="Zadzwoń"
            >
              <PhoneIcon className="h-6 w-6" />
            </a>
            <div className="relative group flex h-14 shrink-0 items-center">
              <button type="button" className="flex items-center p-1.5 focus:outline-none" aria-label="Język">
                <FlagIcon className="h-6 w-6 text-foreground/70 transition-colors group-hover:text-foreground" />
              </button>
              <div className="absolute right-0 top-12 z-50 w-40 origin-top-right transform rounded-md border border-border bg-card opacity-0 shadow-lg transition-all duration-200 invisible group-hover:visible group-hover:opacity-100">
                <div className="px-4 py-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Wybierz język
                </div>
                <div className="h-px bg-border" />
                <a
                  href="#"
                  className="block px-4 py-2 text-sm text-foreground transition-colors hover:bg-secondary"
                >
                  Polski
                </a>
              </div>
            </div>
            <NavLink
              to="/kontakt"
              className="flex shrink-0 p-1.5 text-foreground/70 transition-colors hover:text-foreground"
              aria-label="Kontakt"
            >
              <EnvelopeIcon className="h-6 w-6" />
            </NavLink>
            <button
              type="button"
              className="shrink-0 p-2 lg:hidden"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Otwórz menu"
            >
              <Bars3Icon className="h-6 w-6" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <div
        className={`fixed top-0 right-0 h-full w-64 bg-background z-50 shadow-lg transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        } lg:hidden`}
      >
        <div className="flex justify-end p-4">
          <button onClick={() => setIsOpen(false)} aria-label="Close menu">
            <XMarkIcon className="h-6 w-6" />
          </button>
        </div>
        <nav className="flex flex-col items-stretch gap-1 p-4">
          {NAV_CORE.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              onClick={() => setIsOpen(false)}
              className={({ isActive }) =>
                `text-base w-full p-2 rounded-md ${isActive ? 'font-semibold bg-secondary' : 'hover:bg-secondary'}`
              }
            >
              {link.name}
            </NavLink>
          ))}
          <div className="w-full">
            <button
              type="button"
              onClick={() => setMobileOfertaOpen((o) => !o)}
              className={`flex w-full items-center justify-between rounded-md p-2 text-left text-base ${
                isOfertaActive ? 'font-semibold bg-secondary' : 'hover:bg-secondary'
              }`}
              aria-expanded={mobileOfertaOpen}
              aria-controls="mobile-oferta-submenu"
            >
              <span>Oferta</span>
              <ChevronDownIcon
                className={`h-5 w-5 shrink-0 transition-transform ${mobileOfertaOpen ? 'rotate-180' : ''}`}
                aria-hidden
              />
            </button>
            <div
              id="mobile-oferta-submenu"
              className={`mt-1 space-y-0.5 border-l-2 border-border pl-3 ml-2 ${mobileOfertaOpen ? '' : 'hidden'}`}
            >
              {OFERTA_LINKS.map((link) => (
                <NavLink
                  key={link.path}
                  to={link.path}
                  onClick={() => {
                    setIsOpen(false);
                    setMobileOfertaOpen(false);
                  }}
                  className={({ isActive }) =>
                    `block rounded-md py-2.5 pl-3 pr-2 text-base ${
                      isActive ? 'font-semibold bg-secondary' : 'hover:bg-secondary/80'
                    }`
                  }
                >
                  {link.name}
                </NavLink>
              ))}
            </div>
          </div>
          <NavLink
            to="/kontakt"
            onClick={() => setIsOpen(false)}
            className={({ isActive }) =>
              `text-base w-full p-2 rounded-md ${isActive ? 'font-semibold bg-secondary' : 'hover:bg-secondary'}`
            }
          >
            Kontakt
          </NavLink>
        </nav>
      </div>
       {isOpen && <div className="fixed inset-0 bg-black/30 z-40 lg:hidden" onClick={() => setIsOpen(false)} />}
    </>
  );
};

const Footer: React.FC = () => {
    const footerLinks = [
        { path: '/dokumentacja', name: 'Polityka prywatności' },
        { path: '/dokumentacja', name: 'Regulamin' },
        { path: '/kontakt', name: 'Kontakt' },
    ];
  return (
    <footer className="bg-background">
      <div className="container mx-auto max-w-screen-2xl px-4 md:px-6 py-8 text-center">
        
        {/* Payment Icons */}
        <div className="mt-[100px] mb-8 flex flex-wrap justify-center items-center gap-4 opacity-70 grayscale hover:grayscale-0 transition-all duration-300">
            <img src="https://img.apolloidea.com/img/pay-apple.svg" alt="Apple Pay" className="h-6" />
            <img src="https://img.apolloidea.com/img/pay-google.svg" alt="Google Pay" className="h-6" />
            <img src="https://img.apolloidea.com/img/pay-blik.svg" alt="BLIK" className="h-6" />
            <img src="https://img.apolloidea.com/img/pay-visa.svg" alt="Visa" className="h-6" />
            <img src="https://img.apolloidea.com/img/pay-mastercard.svg" alt="Mastercard" className="h-6" />
            <img src="https://img.apolloidea.com/img/pay-maestro.svg" alt="Maestro" className="h-6" />
        </div>

        <div className="flex flex-wrap justify-center items-center gap-x-6 gap-y-2 mb-4">
          {footerLinks.map(link => (
            <NavLink key={link.name} to={link.path} className="text-xs text-muted-foreground hover:text-foreground">
              {link.name}
            </NavLink>
          ))}
        </div>
        <p className="text-xs text-muted-foreground">
          {SITE_DOMAIN} © {new Date().getFullYear()} all rights reserved
          <span className="mx-1.5">·</span>
          Made & Powered by{' '}
          <a
            href="https://rploy.com"
            title="Made and Powered by Rploy"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground underline underline-offset-2 hover:text-foreground"
          >
            rploy.com
          </a>
        </p>
      </div>
    </footer>
  );
};

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return sessionStorage.getItem('isEvTechAuthenticated') === 'true';
  });

  const handleAuthentication = () => {
    sessionStorage.setItem('isEvTechAuthenticated', 'true');
    setIsAuthenticated(true);
  };

  if (CONFIG.siteStatus === 'OFF' && !isAuthenticated) {
    return (
      <Suspense fallback={<RouteLoadingScreen />}>
        <UnderConstructionPage onAuthenticated={handleAuthentication} />
      </Suspense>
    );
  }

  return (
    <BrowserRouter>
      <ScrollToTop />
      <div className="flex min-h-screen flex-col bg-background text-foreground font-sans">
        <Suspense fallback={<RouteLoadingScreen />}>
          <Routes>
            {/* PDF Viewer route is completely separate to allow clean printing */}
            <Route path="/pdf/:slug.pdf" element={<PdfViewerPage />} />
            {/* Pulpit Tesla / centrum — bez layoutu głównej strony */}
            <Route path="/dash" element={<DashPage />} />
            
            {/* Main App Layout for everything else */}
            <Route path="*" element={
              <>
                  <Header />
                  <main className="min-w-0 flex-grow overflow-x-visible pt-14">
                    <Routes>
                      <Route path="/" element={<HomePage />} />
                      <Route path="/transfery" element={<TransfersPage />} />
                      <Route path="/wypozyczalnia/:carId" element={<RedirectWypozyczalniaToRezerwacja />} />
                      <Route path="/wypozyczalnia" element={<RentalWypozyczalniaLandingPage />} />
                      <Route path="/wypozyczalnia-v2" element={<Navigate to="/wypozyczalnia" replace />} />
                      <Route path="/rezerwacja/:carId/zamowienie" element={<RentalReservationPage />} />
                      <Route path="/rezerwacja/:carId" element={<RentalV2Page />} />
                      <Route path="/rezerwacja" element={<RentalV2Page />} />
                      <Route path="/finansowanie" element={<FinancingPage />} />
                      <Route path="/flota" element={<FleetPage />} />
                      <Route path="/flota/:carId" element={<Navigate to="/flota" replace />} />
                      <Route path="/wypozycz/:carId" element={<RentalCarLandingPage />} />
                      <Route path="/ig" element={<SocialBioLinksPage source="ig" />} />
                      <Route path="/fb" element={<SocialBioLinksPage source="fb" />} />
                      <Route path="/yt" element={<SocialBioLinksPage source="yt" />} />
                      <Route path="/tt" element={<SocialBioLinksPage source="tt" />} />
                      <Route path="/kontakt" element={<ContactPage />} />
                      <Route path="/blog" element={<BlogPage />} />
                      <Route path="/zakup" element={<PurchasePage />} />
                      <Route path="/ubezpieczenia" element={<InsurancePage />} />
                      <Route path="/dokumentacja" element={<DocumentationPage />} />
                      <Route path="/wrap" element={<WrapPage />} />
                      
                      {/* Catch-all route for blog articles at root level */}
                      <Route path="/:articleSlug" element={<BlogArticlePage />} />
                    </Routes>
                  </main>
                  <Footer />
                  <CookieBanner />
                  <ExitIntentModal />
              </>
            } />
          </Routes>
        </Suspense>
      </div>
    </BrowserRouter>
  );
};

export default App;
