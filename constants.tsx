import React from 'react';

export const APOLLO_IDEA_LOGO_SRC = 'https://img.apolloidea.com/img/apolloidea-logo.svg';

export const ApolloPlugLogo: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ className, ...rest }) => (
  <div className={['flex items-center', className].filter(Boolean).join(' ')} {...rest}>
    <img
      src={APOLLO_IDEA_LOGO_SRC}
      alt="Apollo Idea"
      width={140}
      className="h-auto w-[140px] max-w-[140px] shrink-0 object-contain object-left"
      decoding="async"
    />
  </div>
);

export const BRANDS = [
  { id: 'tesla', name: 'Tesla', logoUrl: 'https://img.apolloidea.com/img/logo-tesla-black.png', available: true },
  { id: 'mercedes', name: 'Porsche', logoUrl: 'https://img.apolloidea.com/img/logo-mercedes-black.png', available: false },
  { id: 'bud', name: 'BMW', logoUrl: 'https://img.apolloidea.com/img/logo-byd-black.png', available: false },
];