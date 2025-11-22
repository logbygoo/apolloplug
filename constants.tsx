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
        <path d="M16 7V3h-2v4h-4V3H8v4h-.01C6.89 7 6 7.89 6 9v3.01c0 1.66 1.34 3 3 3h1v3H8v4h8v-4h-2v-3h1c1.66 0 3-1.34 3-3V9c0 -1.11-.89-2-2-2h-2z"/>
    </svg>
);

export const CreditCardIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="5" width="20" height="14" rx="2" />
        <line x1="2" y1="10" x2="22" y2="10" />
    </svg>
);

export const CheckIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="3"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M20 6 9 17l-5-5" />
  </svg>
);

export const InfoIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <line x1="12" y1="16" x2="12" y2="12" />
    <line x1="12" y1="8" x2="12.01" y2="8" />
  </svg>
);

export const FileTextIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
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
    <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
    <polyline points="14 2 14 8 20 8" />
    <line x1="16" y1="13" x2="8" y2="13" />
    <line x1="16" y1="17" x2="8" y2="17" />
    <line x1="10" y1="9" x2="8" y2="9" />
  </svg>
);

export const PaintBrushIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
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
    <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
  </svg>
);

export const ArmchairIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
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
    <path d="M19 9V6a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v3" />
    <path d="M3 11v5a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2Z" />
    <path d="M5 16v2" />
    <path d="M19 16v2" />
  </svg>
);

export const HomeIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
    <polyline points="9 22 9 12 15 12 15 22" />
  </svg>
);

export const PlayIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="5 3 19 12 5 21 5 3" />
  </svg>
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


export const BankTransferIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 10h18" />
      <path d="M3 6h18" />
      <path d="M3 14h18" />
      <path d="M3 18h18" />
    </svg>
);

export const CashIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="6" width="20" height="12" rx="2" />
        <circle cx="12" cy="12" r="2" />
        <path d="M6 12h.01" />
        <path d="M18 12h.01" />
    </svg>
);
