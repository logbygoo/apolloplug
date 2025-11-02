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
    <path d="M19 18H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2Z"/>
    <path d="M5 12h14"/>
  </svg>
);

export const RouteIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
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
    <circle cx="6" cy="19" r="3" />
    <path d="M9 19h8.5a3.5 3.5 0 0 0 0-7h-11a3.5 3.5 0 0 1 0-7H15" />
    <circle cx="18" cy="5" r="3" />
  </svg>
);

export const GaugeIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
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
    <path d="m12 14 4-4" />
    <path d="M3.34 19.79a10 10 0 1 1 17.32-17.32" />
  </svg>
);

export const HomeIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
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
    <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
    <polyline points="9 22 9 12 15 12 15 22" />
  </svg>
);

export const PlayIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
    <path d="M8 5v14l11-7z" />
  </svg>
);


export const BRANDS = [
  { id: 'tesla', name: 'Tesla', logoUrl: 'https://img.apolloplug.com/img/logo-tesla-black.png', available: true },
  { id: 'mercedes', name: 'Mercedes', logoUrl: 'https://img.apolloplug.com/img/logo-mercedes-black.png', available: false },
  { id: 'byd', name: 'BYD', logoUrl: 'https://img.apolloplug.com/img/logo-byd-black.png', available: false },
] as const;

// Payment Icons
export const ApplePayIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg {...props} viewBox="0 0 64 40" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Apple Pay">
    <path d="M42.33 21.28c-.02 3.6-2.06 5.51-4.14 5.51-2.23 0-3.32-1.2-5.06-1.2-1.76 0-3.03 1.18-5.08 1.18-2.08 0-4.3-1.89-4.3-5.63 0-3.9 2.76-6.26 5.3-6.26 1.76 0 2.91 1.15 4.5 1.15 1.57 0 3.05-1.3 5.03-1.3 1.12 0 3.01.7 4.75 2.14a13.9 13.9 0 0 1-1.75 3.41zM37.86 13.8c.95-1.15 1.55-2.73 1.39-4.3-1.6.08-3.32 1.03-4.32 2.16-1.03 1.03-1.78 2.65-1.57 4.14 1.76.08 3.5-1 4.5-2z" fill="currentColor"/>
  </svg>
);

export const GooglePayIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg {...props} viewBox="0 0 72 40" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Google Pay">
    <path d="M61.9,16.1h-3.3v3.2h3.3V16.1z" fill="#5f6368"/>
    <path d="M59.9,12c0-1.9,1.5-3.2,3.7-3.2c1.2,0,2,0.4,2.6,1l-1.2,1.1c-0.3-0.3-0.7-0.4-1.1-0.4c-0.8,0-1.4,0.6-1.4,1.5c0,0.9,0.6,1.5,1.4,1.5c0.4,0,0.8-0.1,1.1-0.4l1.2,1.1c-0.6,0.6-1.4,1-2.6,1C61.4,15.2,59.9,13.9,59.9,12z M67.4,13.7c0-0.6-0.1-1-0.1-1.3h-1.7v5h1.9v-1.8c0.2,0.2,0.7,0.5,1.2,0.5c0.4,0,0.9-0.1,1.2-0.4l-0.7-1.3c-0.1,0.1-0.3,0.2-0.6,0.2c-0.4,0-0.8-0.3-0.8-0.9V13.7z M55.2,19.2h1.9v-4.1h-1.9V19.2z M45,13.7c0-1.3-1.1-2.1-2.6-2.1c-0.6,0-1.3,0.2-1.7,0.6V9.5h-1.9v9.9h1.9v-1.2c0.4,0.3,0.9,0.6,1.4,0.6C43.7,19.4,45,18.2,45,16.7V13.7z M43.1,13.7c0,0.6-0.4,1-1,1s-1-0.4-1-1v-1.4c0-0.5,0.4-0.9,1-0.9s1,0.4,1,0.9V13.7z" fill="#5f6368"/>
    <path d="M34.7,19.2V9.5h-3.7v9.7H34.7z M33,10.6h1.9v-1.3H33V10.6z" fill="#5f6368"/>
    <path d="M22.8,14.6c0,2.2,1.8,3.9,3.9,3.9c1.9,0,3.1-0.9,3.1-2.2c0-1.9-2-2.1-3.5-2.5c-0.9-0.2-1.1-0.5-1.1-0.9c0-0.4,0.4-0.7,1-0.7c0.6,0,1,0.2,1.3,0.4l0.7-1.1c-0.5-0.3-1.1-0.5-1.9-0.5c-2,0-3.6,1.4-3.6,3.4V14.6z M26.6,15.9c0,0.6-0.5,0.9-1.2,0.9c-0.6,0-1-0.3-1-0.8v-0.6C25,15.5,25.8,15.7,26.6,15.9z" fill="#5f6368"/>
    <path d="M11.9,14.6c0,2.2,1.6,3.9,3.9,3.9c2.3,0,3.9-1.8,3.9-3.9s-1.6-3.9-3.9-3.9S11.9,12.4,11.9,14.6z M18.1,14.6c0,1.3-0.9,2.2-2.2,2.2s-2.2-0.9-2.2-2.2s0.9-2.2,2.2-2.2S18.1,13.3,18.1,14.6z" fill="#4285f4"/>
    <path d="M2,14.6c0,2.2,1.6,3.9,3.9,3.9c1.3,0,2.2-0.5,2.8-1.2l-1.2-1c-0.4,0.4-0.9,0.7-1.6,0.7c-1.3,0-2.2-0.9-2.2-2.2s0.9-2.2,2.2-2.2c0.7,0,1.2,0.3,1.6,0.7l1.2-1c-0.6-0.6-1.5-1.2-2.8-1.2C3.5,10.7,2,12.4,2,14.6z" fill="#fbbc04"/>
    <path d="M7.4,12.1v2.1c0,2.5,2,4.4,4.4,4.4s4.4-2,4.4-4.4v-5c0-1-0.8-1.6-1.8-1.6c-0.6,0-1.2,0.3-1.6,0.7l1.5,1.2c0.1-0.1,0.2-0.2,0.4-0.2c0.2,0,0.4,0.2,0.4,0.6v3.8c0,1.4-1.2,2.7-2.7,2.7s-2.7-1.2-2.7-2.7v-2.7h-1.7v2.1c0,0.8,0.7,1.4,1.6,1.4s1.6-0.6,1.6-1.4v-2h-1.5V12.1z" fill="#ea4335"/>
    <path d="M49.7,18.5V0.6h1.8v17.9H49.7z" fill="#34a853"/>
  </svg>
);

export const VisaIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg {...props} viewBox="0 0 64 40" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Visa">
    <path d="M38.34 26.83H43.9L49.3 9.6h-5.4s-.7 3.2-1.4 6.3c-.8 3.1-1.1 4.1-1.1 4.1s-.3-1-.9-3.9c-.6-3-1.6-6.5-1.6-6.5h-5.1l5.5 17.23zM25.74 9.6l-5.8 17.23h5.4l5.7-17.23h-5.3zM14.24 9.6h-4.3l-2.6 10.1-.4-2.2c-.3-1.9-2-6-3.7-7.9h-3.1l4.9 17.22h5.5l8.7-17.23h-5.5s-2.1 7.2-2.1 7.2l-.1-7.2z" fill="#00579e"/>
    <path d="M51.94 9.6L51.3 12c2.3.6 3.6 1.4 3.6 2.8 0 2.2-2.5 3-4.5 3.5-.8.2-1.2.3-1.2.5s.2.4 1.1.4c1.4 0 3-.4 3-.4l.5 2.5s-1.8.5-3.8.5c-2.8 0-4.8-1.3-4.8-3.8 0-1.6 1.3-2.7 3.3-3.3 1.1-.3 1.3-.5 1.3-.7s-.2-.5-1.2-.6c-.7 0-2.3.2-2.3.2l-.5-2.3s2.1-.4 4.1-.4c2.2 0 3.7.8 3.7 2.6z" fill="#00579e"/>
  </svg>
);

export const MastercardIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg {...props} viewBox="0 0 64 40" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Mastercard">
    <circle cx="24" cy="20" r="10.5" fill="#ea001b"/>
    <circle cx="40" cy="20" r="10.5" fill="#ff5f00"/>
    <path d="M32 25.25a10.5 10.5 0 0 1 0-10.5 10.5 10.5 0 0 0 0 10.5z" fill="#f79e1b"/>
  </svg>
);