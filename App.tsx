
import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, NavLink, useLocation } from 'react-router-dom';
import HomePage from './pages/HomePage';
import TransfersPage from './pages/TransfersPage';
import RentalPage from './pages/RentalPage';
import FinancingPage from './pages/FinancingPage';
import FleetPage from './pages/FleetPage';
import CarDetailPage from './pages/CarDetailPage';
import ContactPage from './pages/ContactPage';
import BlogPage from './pages/BlogPage';
import BlogArticlePage from './pages/BlogArticlePage';
import PurchasePage from './pages/PurchasePage';
import InsurancePage from './pages/InsurancePage';
import DocumentationPage from './pages/DocumentationPage';
import RentalCarLandingPage from './pages/RentalCarLandingPage'; // Import new page
import PdfViewerPage from './pages/PdfViewerPage'; // Import new PDF viewer page
import { ApolloPlugLogo } from './constants';
import { Bars3Icon, XMarkIcon, PhoneIcon, FlagIcon, EnvelopeIcon } from './icons';
import { CONFIG } from './config';
import UnderConstructionPage from './pages/UnderConstructionPage';
import ScrollToTop from './components/ScrollToTop';

const mainNavLinks = [
  { path: '/flota', name: 'Pojazdy' },
  { path: '/wypozyczalnia', name: 'Wypożyczalnia' },
  { path: '/transfery', name: 'Transfery' },
  { path: '/zakup', name: 'Zakup' },
  { path: '/ubezpieczenia', name: 'Ubezpieczenia' },
  { path: '/finansowanie', name: 'Finansowanie' },
];

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const activeLinkClass = "font-semibold text-foreground";
  const inactiveLinkClass = "text-foreground/70 transition-colors hover:text-foreground";

  return (
    <>
      <header className="fixed top-0 z-50 w-full bg-background/80 backdrop-blur-sm">
        <div className="container mx-auto flex h-14 max-w-screen-2xl items-center px-4 md:px-6">
          <a href="/" className="flex items-center mr-6">
            <ApolloPlugLogo />
          </a>
          
          <nav className="hidden lg:flex flex-1 justify-center gap-6 text-sm font-medium">
            {mainNavLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) => (isActive ? activeLinkClass : inactiveLinkClass)}
              >
                {link.name}
              </NavLink>
            ))}
          </nav>

          <div className="hidden lg:flex items-center gap-4">
             <a href="tel:500308400" aria-label="Support"><PhoneIcon className="h-6 w-6 text-foreground/70 hover:text-foreground" /></a>
             
             {/* Language Dropdown */}
             <div className="relative group h-14 flex items-center">
                <button className="flex items-center focus:outline-none" aria-label="Language">
                   <FlagIcon className="h-6 w-6 text-foreground/70 group-hover:text-foreground transition-colors" />
                </button>
                <div className="absolute right-0 top-12 w-40 bg-card border border-border rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform origin-top-right">
                   <div className="px-4 py-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                      Wybierz język
                   </div>
                   <div className="h-px bg-border my-0"></div>
                   <a href="#" className="block px-4 py-2 text-sm text-foreground hover:bg-secondary transition-colors">
                      Polski
                   </a>
                </div>
             </div>

             <NavLink to="/kontakt" aria-label="Contact"><EnvelopeIcon className="h-6 w-6 text-foreground/70 hover:text-foreground" /></NavLink>
          </div>

          <button
            className="lg:hidden ml-auto p-2"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            <Bars3Icon className="h-6 w-6" />
          </button>
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
        <nav className="flex flex-col items-start gap-2 p-4">
          {[...mainNavLinks, { path: '/kontakt', name: 'Kontakt' }].map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              onClick={() => setIsOpen(false)}
              className={({ isActive }) => `text-base w-full p-2 rounded-md ${isActive ? "font-semibold bg-secondary" : "hover:bg-secondary"}`}
            >
              {link.name}
            </NavLink>
          ))}
        </nav>
      </div>
       {isOpen && <div className="fixed inset-0 bg-black/30 z-40 lg:hidden" onClick={() => setIsOpen(false)} />}
    </>
  );
};

const Footer: React.FC = () => {
    const footerLinks = [
        { path: '/dokumentacja?doc=protokol-wydania-zwrotu', name: 'Protokół wydania/zwrotu' },
        { path: '/dokumentacja', name: 'Polityka prywatności' },
        { path: '/dokumentacja', name: 'Regulamin' },
        { path: '/kontakt', name: 'Kontakt' },
    ];
  return (
    <footer className="bg-background">
      <div className="container mx-auto max-w-screen-2xl px-4 md:px-6 py-8 text-center">
        
        {/* Payment Icons */}
        <div className="mt-[100px] mb-8 flex flex-wrap justify-center items-center gap-4 opacity-70 grayscale hover:grayscale-0 transition-all duration-300">
            <img src="https://img.apolloplug.com/img/pay-apple.svg" alt="Apple Pay" className="h-6" />
            <img src="https://img.apolloplug.com/img/pay-google.svg" alt="Google Pay" className="h-6" />
            <img src="https://img.apolloplug.com/img/pay-blik.svg" alt="BLIK" className="h-6" />
            <img src="https://img.apolloplug.com/img/pay-visa.svg" alt="Visa" className="h-6" />
            <img src="https://img.apolloplug.com/img/pay-mastercard.svg" alt="Mastercard" className="h-6" />
            <img src="https://img.apolloplug.com/img/pay-maestro.svg" alt="Maestro" className="h-6" />
        </div>

        <div className="flex flex-wrap justify-center items-center gap-x-6 gap-y-2 mb-4">
          {footerLinks.map(link => (
            <NavLink key={link.name} to={link.path} className="text-xs text-muted-foreground hover:text-foreground">
              {link.name}
            </NavLink>
          ))}
        </div>
        <p className="text-xs text-muted-foreground">apolloplug.com © {new Date().getFullYear()} all rights reserved</p>
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
    return <UnderConstructionPage onAuthenticated={handleAuthentication} />;
  }

  return (
    <BrowserRouter>
      <ScrollToTop />
      <div className="flex min-h-screen flex-col bg-background text-foreground font-sans">
        <Routes>
           {/* PDF Viewer route is completely separate to allow clean printing */}
           <Route path="/pdf/:slug.pdf" element={<PdfViewerPage />} />
           
           {/* Main App Layout for everything else */}
           <Route path="*" element={
             <>
                <Header />
                <main className="flex-grow pt-14">
                  <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/transfery" element={<TransfersPage />} />
                    <Route path="/wypozyczalnia" element={<RentalPage />} />
                    <Route path="/finansowanie" element={<FinancingPage />} />
                    <Route path="/flota" element={<FleetPage />} />
                    <Route path="/flota/:carId" element={<CarDetailPage />} />
                    <Route path="/wypozycz/:carId" element={<RentalCarLandingPage />} />
                    <Route path="/kontakt" element={<ContactPage />} />
                    <Route path="/blog" element={<BlogPage />} />
                    <Route path="/zakup" element={<PurchasePage />} />
                    <Route path="/ubezpieczenia" element={<InsurancePage />} />
                    <Route path="/dokumentacja" element={<DocumentationPage />} />
                    
                    {/* Catch-all route for blog articles at root level */}
                    <Route path="/:articleSlug" element={<BlogArticlePage />} />
                  </Routes>
                </main>
                <Footer />
             </>
           } />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
