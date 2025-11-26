import React from 'react';

export const ApolloPlugLogo: React.FC<React.HTMLAttributes<HTMLDivElement>> = (props) => (
    <div className="flex items-center text-xl tracking-tight" {...props}>
        <span className="font-zen-dots">apollo</span>
        <span className="bg-black text-white px-2 py-0.5 rounded-sm ml-1 font-zen-dots">plug</span>
    </div>
);

export const BRANDS = [
  { id: 'tesla', name: 'Tesla', logoUrl: 'https://img.apolloplug.com/img/logo-tesla-black.png', available: true },
  { id: 'mercedes', name: 'Porsche', logoUrl: 'https://img.apolloplug.com/img/logo-mercedes-black.png', available: false },
  { id: 'bud', name: 'BMW', logoUrl: 'https://img.apolloplug.com/img/logo-byd-black.png', available: false },
];