import React from 'react';
import type { InvestmentProject } from './types';

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

export const BRANDS = [
  { id: 'tesla', name: 'Tesla', logoUrl: 'https://img.apolloplug.com/img/logo-tesla.svg', available: true },
  { id: 'porsche', name: 'Porsche', logoUrl: 'https://img.apolloplug.com/img/logo-porsche.svg', available: false },
  { id: 'bmw', name: 'BMW', logoUrl: 'https://img.apolloplug.com/img/logo-bmw.svg', available: false },
];

export const PayUIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg {...props} viewBox="0 0 60 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" className="w-auto h-6">
      <path d="M7.34 19.34V4.66H9.4V16.3C9.4 17.5 9.8 17.98 10.6 17.98C11.4 17.98 11.8 17.5 11.8 16.3V4.66H13.86V16.48C13.86 18.52 12.38 19.5 10.64 19.5C8.9 19.5 7.34 18.52 7.34 16.48V19.34Z" />
      <path d="M16.51 4.66H20.59L22.49 14.5L24.47 4.66H28.51L24.11 19.34H21.83L19.75 10.76L17.67 19.34H15.39L16.51 4.66Z" />
      <path d="M35.65 12C35.65 15.96 33.77 19.5 29.53 19.5C25.29 19.5 23.41 15.96 23.41 12C23.41 8.04 25.29 4.5 29.53 4.5C33.77 4.5 35.65 8.04 35.65 12ZM25.47 12C25.47 14.76 26.85 17.02 29.53 17.02C32.21 17.02 33.59 14.76 33.59 12C33.59 9.24 32.21 6.98 29.53 6.98C26.85 6.98 25.47 9.24 25.47 12Z" />
      <path d="M39.9 19.34V4.66H41.96V16.3C41.96 17.5 42.36 17.98 43.16 17.98C43.96 17.98 44.36 17.5 44.36 16.3V4.66H46.42V16.48C46.42 18.52 44.94 19.5 43.2 19.5C41.46 19.5 39.9 18.52 39.9 16.48V19.34Z" />
    </svg>
);


export const RevolutPayIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg {...props} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"  className="w-auto h-6">
        <path d="M4 4V20H7V14H9.5L12 20H15L11.5 13.05C13.5 12.55 14.5 10.8 14.5 8.9C14.5 6.4 12.5 4 10 4H4ZM7 7H9.8C10.9 7 11.5 7.9 11.5 8.9C11.5 9.9 10.9 11 9.8 11H7V7Z" />
    </svg>
);
