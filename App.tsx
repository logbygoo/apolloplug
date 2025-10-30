import React, { useState } from 'react';
import { HashRouter, Routes, Route, NavLink, useLocation } from 'react-router-dom';
import HomePage from './pages/HomePage';
import TransfersPage from './pages/TransfersPage';
import RentalPage from './pages/RentalPage';
import InvestPage from './pages/InvestPage';
import FleetPage from './pages/FleetPage';
import ContactPage from './pages/ContactPage';
import { ApolloPlugLogo, MenuIcon, XIcon, HeadphoneIcon, FlagIcon, EnvelopeIcon } from './constants';
import { CONFIG } from './config';
import UnderConstructionPage from './pages/UnderConstructionPage';

const mainNavLinks = [
  { path: '/flota', name: 'Pojazdy' },
  { path: '/wynajem', name: 'Wynajem' },
  { path: '/transfery', name: 'Transfery' },
  { path: '/inwestuj', name: 'Inwestuj' },
];

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const activeLinkClass = "font-semibold text-foreground";
  const inactiveLinkClass = "text-foreground/70 transition-colors hover:text-foreground";

  return (
    <>
      <header className="fixed top-0 z-50 w-full bg-background/80 backdrop-blur-sm">
        <div className="container mx-auto flex h-14 max-w-screen-2xl items-center px-4 md:px-6">
          <NavLink to="/" className="flex items-center mr-6">
            <ApolloPlugLogo />
          </NavLink>
          
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
             <a href="#" aria-label="Support"><HeadphoneIcon className="h-6 w-6 text-foreground/70 hover:text-foreground" /></a>
             <a href="#" aria-label="Language"><FlagIcon className="h-6 w-6 text-foreground/70 hover:text-foreground" /></a>
             <NavLink to="/kontakt" aria-label="Contact"><EnvelopeIcon className="h-6 w-6 text-foreground/70 hover:text-foreground" /></NavLink>
          </div>

          <button
            className="lg:hidden ml-auto p-2"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            <MenuIcon className="h-6 w-6" />
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
            <XIcon className="h-6 w-6" />
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
        { path: '/', name: `EV Tech © ${new Date().getFullYear()}` },
        { path: '#', name: 'Prywatność i przepisy prawne' },
        { path: '/kontakt', name: 'Kontakt' },
        { path: '#', name: 'Nowości' },
        { path: '#', name: 'Lokalizacje' },
    ];
  return (
    <footer className="bg-background">
      <div className="container mx-auto max-w-screen-2xl px-4 md:px-6 py-8">
        <div className="flex flex-wrap justify-center items-center gap-x-6 gap-y-2">
          {footerLinks.map(link => (
            <NavLink key={link.name} to={link.path} className="text-xs text-muted-foreground hover:text-foreground">
              {link.name}
            </NavLink>
          ))}
        </div>
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
    <HashRouter>
      <div className="flex min-h-screen flex-col bg-background text-foreground font-sans">
        <Header />
        <main className="flex-grow pt-14">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/transfery" element={<TransfersPage />} />
            <Route path="/wynajem" element={<RentalPage />} />
            <Route path="/inwestuj" element={<InvestPage />} />
            <Route path="/flota" element={<FleetPage />} />
            <Route path="/kontakt" element={<ContactPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </HashRouter>
  );
};

export default App;