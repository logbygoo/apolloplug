import React from 'react';
import type { Car } from './types';
import type { InvestmentProject } from './types';

export const CAR_FLEET: Car[] = [
  {
    id: 'tesla-3',
    name: 'Model 3',
    description: 'Dynamiczny i wydajny sedan elektryczny, idealny do jazdy po mieście i na dłuższe trasy.',
    imageUrl: [
      'https://tesla-cdn.thron.com/delivery/public/image/tesla/a269d7a2-1168-4a1a-95a6-9736b234e761/bvlatuR/std/4096x2304/Model-3-Main-Hero-Desktop-LHD-Animation-Glob',
      'https://digitalassets.tesla.com/tesla-contents/image/upload/h_1800,w_2880,c_fit,f_auto,q_auto:best/Model-3-Main-Hero-Desktop-LHD'
    ],
    pricePerDay: 300,
    specs: {
      range: '629 km',
      seating: '5 osób',
      acceleration: '3.3s 0-100 km/h',
    },
     details: {
      subtitle: 'Dostępne od 0,99% oprocentowania',
      primaryBtnText: 'Zamów teraz',
      primaryBtnLink: '/wynajem',
      secondaryBtnText: 'Jazda Próbna',
      secondaryBtnLink: '/kontakt',
    }
  },
  {
    id: 'tesla-y',
    name: 'Model Y',
    description: 'Wszechstronny SUV z dużą przestrzenią bagażową, oferujący bezpieczeństwo i komfort dla całej rodziny.',
    imageUrl: [
      'https://digitalassets.tesla.com/tesla-contents/image/upload/h_1800,w_2880,c_fit,f_auto,q_auto:best/Homepage-Model-Y-Hero-Desktop',
      'https://tesla-cdn.thron.com/delivery/public/image/tesla/8e2df1b9-a4bf-4eb9-beec-2cf5cc77fca0/bvlatuR/std/2880x2400/Desktop-ModelY?20230329'
    ],
    pricePerDay: 350,
    specs: {
      range: '533 km',
      seating: '5 osób',
      acceleration: '3.7s 0-100 km/h',
    },
    details: {
      subtitle: 'Wynajem od 350 zł/dzień',
      primaryBtnText: 'Wynajmij teraz',
      primaryBtnLink: '/wynajem',
      secondaryBtnText: 'Zobacz flotę',
      secondaryBtnLink: '/flota',
    }
  },
  {
    id: 'tesla-x',
    name: 'Model X',
    description: 'Luksusowy i futurystyczny SUV z drzwiami Falcon Wing, zapewniający najwyższy poziom osiągów i technologii.',
    imageUrl: [
      'https://digitalassets.tesla.com/tesla-contents/image/upload/h_1800,w_2880,c_fit,f_auto,q_auto:best/Model-X-Main-Hero-Desktop-LHD',
       'https://tesla-cdn.thron.com/delivery/public/image/tesla/ddc135ed-1638-4ba5-b52a-9584358824f7/bvlatuR/std/4096x2304/Model-X-Main-Hero-Desktop-LHD-Animation-Glob'
    ],
    pricePerDay: 450,
    specs: {
      range: '576 km',
      seating: '7 osób',
      acceleration: '2.6s 0-100 km/h',
    },
     details: {
      subtitle: 'Najwyższy poziom luksusu i technologii',
      primaryBtnText: 'Wynajmij teraz',
      primaryBtnLink: '/wynajem',
      secondaryBtnText: 'Zobacz flotę',
      secondaryBtnLink: '/flota',
    }
  },
];

export const RENTAL_CARS: Car[] = [
  {
    id: 'tesla-3-highland',
    name: 'Model 3 Highland',
    description: 'Udoskonalona wersja najpopularniejszego sedana elektrycznego.',
    imageUrl: [
      'https://digitalassets.tesla.com/tesla-contents/image/upload/f_auto,q_auto/compare-model-3-long-range-all-wheel-drive-pearl-white.png',
    ],
    pricePerDay: 320,
    specs: { range: '629 km', seating: '5', acceleration: '4.4s' },
    available: true,
  },
  {
    id: 'tesla-y-jupiter',
    name: 'Model Y Jupiter',
    description: 'Wszechstronny SUV, teraz w nowej odsłonie z ulepszonym zasięgiem.',
    imageUrl: [
      'https://digitalassets.tesla.com/tesla-contents/image/upload/f_auto,q_auto/compare-model-y-long-range-pearl-white.png',
    ],
    pricePerDay: 370,
    specs: { range: '533 km', seating: '5', acceleration: '5.0s' },
    available: true,
  },
  {
    id: 'tesla-x',
    name: 'Model X',
    description: 'Luksusowy i futurystyczny SUV z drzwiami Falcon Wing.',
    imageUrl: [
      'https://digitalassets.tesla.com/tesla-contents/image/upload/f_auto,q_auto/compare-model-x-plaid-stealth-grey.png',
    ],
    pricePerDay: 450,
    specs: { range: '576 km', seating: '7', acceleration: '2.6s' },
    available: false,
  },
  {
    id: 'tesla-cybertruck',
    name: 'Cybertruck',
    description: 'Bardziej wytrzymały, niż inne ciężarówki. Bardziej użyteczny.',
    imageUrl: [
      'https://digitalassets.tesla.com/tesla-contents/image/upload/f_auto,q_auto/compare-cybertruck-awd-white.png',
    ],
    pricePerDay: 600,
    specs: { range: '547 km', seating: '6', acceleration: '2.7s' },
    available: false,
  }
];

export const RENTAL_LOCATIONS = [
  "Warszawa, Lotnisko Chopina (WAW)",
  "Warszawa, Centrum",
  "Kraków, Lotnisko Balice (KRK)",
  "Gdańsk, Lotnisko im. Lecha Wałęsy (GDN)",
  "Wrocław, Lotnisko im. Mikołaja Kopernika (WRO)",
];

export const ADDITIONAL_OPTIONS = [
    { id: 'tires', name: 'Ubezpieczenie opon', price: 9, type: 'per_day' },
    { id: 'deductible', name: 'Zmniejszony udział własny w szkodzie', price: 99, type: 'per_day' },
    { id: 'childSeat', name: 'Fotelik dziecięcy', price: 99, type: 'one_time' },
    { id: 'delivery', name: 'Dostawa pod dom', price: 190, type: 'one_time' },
    { id: 'emptyBattery', name: 'Możliwość zwrotu pustej baterii', price: 290, type: 'one_time' },
] as const;


export const INVESTMENT_PROJECTS: InvestmentProject[] = [
  {
    id: 'proj-1',
    carName: 'Tesla Model 3 Long Range',
    imageUrl: 'https://digitalassets.tesla.com/tesla-contents/image/upload/f_auto,q_auto/compare-model-3-performance-pearl-white.png',
    amountRaised: 185000,
    goal: 250000,
    investorCount: 42,
  },
  {
    id: 'proj-2',
    carName: 'Tesla Model X Plaid',
    imageUrl: 'https://digitalassets.tesla.com/tesla-contents/image/upload/f_auto,q_auto/compare-model-x-plaid-stealth-grey.png',
    amountRaised: 450000,
    goal: 600000,
    investorCount: 78,
  },
  {
    id: 'proj-3',
    carName: 'Tesla Model Y Performance',
    imageUrl: 'https://digitalassets.tesla.com/tesla-contents/image/upload/f_auto,q_auto/compare-model-y-performance-deep-blue.png',
    amountRaised: 110000,
    goal: 300000,
    investorCount: 25,
  },
];

export const ApolloPlugLogo: React.FC<React.HTMLAttributes<HTMLDivElement>> = (props) => (
    <div className="flex items-center text-xl tracking-tight" {...props}>
        <span className="font-zen-dots">apollo</span>
        <span className="bg-black text-white px-2 py-0.5 rounded-sm ml-1 font-zen-dots">plug</span>
    </div>
);

export const MenuIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="4" x2="20" y1="12" y2="12" />
    <line x1="4" x2="20" y1="6" y2="6" />
    <line x1="4" x2="20" y1="18" y2="18" />
  </svg>
);

export const XIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M18 6 6 18" />
    <path d="m6 6 12 12" />
  </svg>
);

export const HeadphoneIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
    </svg>
);

export const FlagIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"/>
        <line x1="4" y1="22" x2="4" y2="15"/>
    </svg>
);

export const EnvelopeIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect width="20" height="16" x="2" y="4" rx="2"/>
        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
    </svg>
);


export const ChevronDownIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg 
        {...props}
        xmlns="http://www.w3.org/2000/svg" 
        width="24" 
        height="24" 
        viewBox="0 0 24 24" 
        fill="none" 
        stroke="currentColor" 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round"
    >
        <path d="m6 9 6 6 6-6" />
    </svg>
);

export const LightningIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
        <path d="M7 21q-.825 0-1.413-.588T5 19V9.525q0-.525.225-.975t.6-.7L14.3 2.3q.3-.275.688-.288T15.7 2.3q.4.275.6.7l-1.9 6h6.125q.55 0 .9.338t.35.862l-6.15 10.25q-.3.5-.825.75T13 21H7Z"/>
    </svg>
);

export const PlugIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
        <path d="M16 7V3h-2v4h-4V3H8v4h-.01C6.89 7 6 7.89 6 9v3.01c0 1.66 1.34 3 3 3h1v3H8v4h8v-4h-2v-3h1c1.66 0 3-1.34 3-3V9c0-1.11-.89-2-2-2h-2z"/>
    </svg>
);

export const CreditCardIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="5" width="20" height="14" rx="2" />
        <line x1="2" y1="10" x2="22" y2="10" />
    </svg>
);


// Brand Logos
export const TeslaLogo: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg {...props} viewBox="0 0 400 400" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M294.6,96.3h-189c-12,0-12,18,0,18H160v158.4c0,9,7.8,16.2,17.4,16.2s17.4-7.2,17.4-16.2V114.3h54.6c12,0,12-18,0-18Z"/>
  </svg>
);

export const MercedesLogo: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" xmlns="http://www.w3.org/2000/svg">
        <circle cx="12" cy="12" r="10" />
        <path d="M12 2V12M12 12L20.5 18M12 12L3.5 18" />
    </svg>
);

export const BYDLogo: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg {...props} viewBox="0 0 120 40" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <text x="5" y="32" fontFamily="Verdana, Geneva, sans-serif" fontSize="30" fontWeight="bold" letterSpacing="-1">
            BYD
        </text>
    </svg>
);


export const BRANDS = [
  { id: 'tesla', name: 'Tesla', LogoComponent: TeslaLogo, available: true },
  { id: 'mercedes', name: 'Mercedes', LogoComponent: MercedesLogo, available: false },
  { id: 'byd', name: 'BYD', LogoComponent: BYDLogo, available: false },
] as const;