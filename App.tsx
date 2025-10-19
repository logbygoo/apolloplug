import React from 'react';
import { HashRouter, Routes, Route, NavLink } from 'react-router-dom';
import HomePage from './pages/HomePage';
import TransfersPage from './pages/TransfersPage';
import RentalPage from './pages/RentalPage';
import InvestPage from './pages/InvestPage';
import FleetPage from './pages/FleetPage';
import ContactPage from './pages/ContactPage';
import { EVLogo, MenuIcon, XIcon } from './constants';

const navLinks = [
  { path: '/', name: 'Główna' },
  { path: '/transfery', name: 'Transfery' },
  { path: '/wynajem', name: 'Wynajem' },
  { path: '/inwestuj', name: 'Inwestuj' },
  { path: '/flota', name: 'Flota' },
  { path: '/kontakt', name: 'Kontakt' },
];

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [isScrolled, setIsScrolled] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  const linkClass = "font-medium transition-colors hover:text-primary/80 py-2 px-3 rounded-md";
  const activeLinkClass = "bg-black/5";

  return (
    <>
      <header className={`fixed top-0 z-50 w-full transition-colors duration-500 ${isScrolled ? 'bg-background/80 backdrop-blur-sm' : 'bg-transparent'}`}>
        <div className="container mx-auto flex h-14 max-w-screen-2xl items-center justify-between px-4 md:px-6">
          <NavLink to="/" className="flex items-center space-x-2">
            <EVLogo className="h-6 w-6" />
            <span className="font-bold">EV Tech</span>
          </NavLink>
          <nav className="hidden md:flex absolute left-1/2 -translate-x-1/2 gap-2 text-sm">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) => `${linkClass} ${isActive ? activeLinkClass : ''}`}
              >
                {link.name}
              </NavLink>
            ))}
          </nav>
          <button
            className="md:hidden p-2"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            <MenuIcon className="h-6 w-6" />
          </button>
        </div>
      </header>
      
      {/* Mobile Menu Overlay */}
      <div className={`md:hidden fixed inset-0 z-40 bg-background transition-transform duration-300 ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="flex justify-end p-4 h-14">
           <button onClick={() => setIsOpen(false)} aria-label="Close menu">
             <XIcon className="h-6 w-6" />
           </button>
        </div>
        <nav className="flex flex-col items-start gap-2 p-8">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className={({ isActive }) => `w-full text-left text-lg p-3 rounded-md transition-colors ${isActive ? activeLinkClass : ''}`}
              >
                {link.name}
              </NavLink>
            ))}
          </nav>
      </div>
    </>
  );
};

const Footer: React.FC = () => {
  return (
    <footer className="bg-background text-muted-foreground">
      <div className="container mx-auto max-w-screen-2xl px-4 md:px-6 py-6">
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4 text-xs">
            {navLinks.map(link => (
              <NavLink key={link.path} to={link.path} className="hover:text-foreground">
                {link.name}
              </NavLink>
            ))}
        </div>
        <div className="mt-4 text-center text-xs text-muted-foreground/60">
          <p>&copy; {new Date().getFullYear()} EV Tech. Wszelkie prawa zastrzeżone.</p>
        </div>
      </div>
    </footer>
  );
};

const App: React.FC = () => {
  return (
    <HashRouter>
      <div className="min-h-screen bg-background text-foreground">
        <Header />
        <main>
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