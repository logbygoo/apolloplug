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

export const TeslaLogo: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 342 35" fill="currentColor">
        <path d="M333.2,12.5H318.1v10.5h15.1v3.2H314.8V9.3h18.4V12.5z M292.1,26.2h14.4v-3.2H292.1V26.2z M299.8,9.3v10.5h-7.7V9.3H299.8z M287.1,3.2h21.4v26.3h-3.3V29.4h-14.8v-3.2h14.8V3.2z M253.1,12.5h14.9v3.2h-14.9v7.3h15.9v3.2h-19.2V9.3h18.3v3.2h-15V12.5z M231.4,9.3h3.3v17.2h-3.3V9.3z M207,26.2h14.4v-3.2H207V26.2z M214.7,9.3v10.5h-7.7V9.3H214.7z M202,3.2h21.4v26.3h-3.3V29.4h-14.8v-3.2h14.8V3.2z M172.6,26.5c-6,0-10.9-4.8-10.9-10.8c0-6,4.9-10.8,10.9-10.8c6,0,10.9,4.8,10.9,10.8C183.5,21.7,178.6,26.5,172.6,26.5 M172.6,8.2c-4.4,0-8,3.6-8,8.1c0,4.5,3.6,8.1,8,8.1c4.4,0,8-3.6,8-8.1C180.6,11.8,177,8.2,172.6,8.2 M153.4,26.2h3.3V9.3h-3.3V26.2z M129,26.2h14.4v-3.2H129V26.2z M136.7,9.3v10.5h-7.7V9.3H136.7z M124,3.2h21.4v26.3h-3.3V29.4H127v-3.2h14.8V3.2z M95.4,26.2h14.4v-3.2H95.4V26.2z M103.1,9.3v10.5h-7.7V9.3H103.1z M90.4,3.2h21.4v26.3h-3.3V29.4H93.7v-3.2h14.8V3.2z M65.2,12.5H50.1v10.5h15.1v3.2H46.8V9.3h18.4V12.5z M23.4,26.2h14.4v-3.2H23.4V26.2z M31.1,9.3v10.5h-7.7V9.3H31.1z M18.4,3.2h21.4v26.3h-3.3V29.4H21.7v-3.2h14.8V3.2z M0,35h3.3V0H0V35z"/>
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

export const HelpCircleIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
        <line x1="12" y1="17" x2="12.01" y2="17" />
    </svg>
);

export const GlobeIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <line x1="2" y1="12" x2="22" y2="12" />
        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>
);

export const UserIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
        <circle cx="12" cy="7" r="4" />
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