import React from 'react';
import type { Car } from './types';
import type { InvestmentProject } from './types';

export const CAR_FLEET: Car[] = [
  {
    id: 'tesla-3',
    name: 'Tesla Model 3',
    description: 'Dynamiczny i wydajny sedan elektryczny, idealny do jazdy po mieście i na dłuższe trasy.',
    imageUrl: 'https://picsum.photos/seed/tm3-dark/1920/1080',
    pricePerDay: 300,
    specs: {
      range: '576 km',
      seating: '5 osób',
      acceleration: '3.3s 0-100 km/h',
    },
  },
  {
    id: 'tesla-y',
    name: 'Tesla Model Y',
    description: 'Wszechstronny SUV z dużą przestrzenią bagażową, oferujący bezpieczeństwo i komfort dla całej rodziny.',
    imageUrl: 'https://picsum.photos/seed/tmy-dark/1920/1080',
    pricePerDay: 350,
    specs: {
      range: '533 km',
      seating: '5 osób',
      acceleration: '3.7s 0-100 km/h',
    },
  },
  {
    id: 'tesla-x',
    name: 'Tesla Model X',
    description: 'Luksusowy i futurystyczny SUV z drzwiami Falcon Wing, zapewniający najwyższy poziom osiągów i technologii.',
    imageUrl: 'https://picsum.photos/seed/tmx-dark/1920/1080',
    pricePerDay: 450,
    specs: {
      range: '560 km',
      seating: '7 osób',
      acceleration: '2.6s 0-100 km/h',
    },
  },
];

export const INVESTMENT_PROJECTS: InvestmentProject[] = [
  {
    id: 'proj-1',
    carName: 'Tesla Model 3 Long Range',
    imageUrl: 'https://picsum.photos/seed/invest-tesla-3/800/600',
    amountRaised: 185000,
    goal: 250000,
    investorCount: 42,
  },
  {
    id: 'proj-2',
    carName: 'Tesla Model X Plaid',
    imageUrl: 'https://picsum.photos/seed/invest-tesla-x/800/600',
    amountRaised: 450000,
    goal: 600000,
    investorCount: 78,
  },
  {
    id: 'proj-3',
    carName: 'Tesla Model Y Performance',
    imageUrl: 'https://picsum.photos/seed/invest-tesla-y/800/600',
    amountRaised: 110000,
    goal: 300000,
    investorCount: 25,
  },
];

export const EVLogo: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M12 2L2 7l10 5 10-5-10-5z" />
    <path d="M2 17l10 5 10-5" />
    <path d="M2 12l10 5 10-5" />
  </svg>
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

export const SunIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
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
    <circle cx="12" cy="12" r="4" />
    <path d="M12 2v2" />
    <path d="M12 20v2" />
    <path d="m4.93 4.93 1.41 1.41" />
    <path d="m17.66 17.66 1.41 1.41" />
    <path d="M2 12h2" />
    <path d="M20 12h2" />
    <path d="m6.34 17.66-1.41 1.41" />
    <path d="m19.07 4.93-1.41 1.41" />
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
