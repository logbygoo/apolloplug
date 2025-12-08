
import React from 'react';
import { TermsOfServiceContent } from './contents/TermsOfService';
import { PrivacyPolicyContent } from './contents/PrivacyPolicy';
import { RentalRulesContent } from './contents/RentalRules';
import { TransportRulesContent } from './contents/TransportRules';
import { SampleContractContent } from './contents/SampleContract';
import { COMPANY_DETAILS } from './companyDetails';

export { COMPANY_DETAILS };

export interface DocumentContent {
  title: string;
  slug: string; // Used for URL params and PDF route
  content: React.ReactNode;
}

export const DOCUMENTS_DATA: DocumentContent[] = [
  {
    title: 'Regulamin apolloplug',
    slug: 'regulamin-apolloplug',
    content: TermsOfServiceContent
  },
  {
    title: 'Polityka prywatności',
    slug: 'polityka-prywatnosci',
    content: PrivacyPolicyContent
  },
  {
    title: 'Regulamin wypożyczalni',
    slug: 'regulamin-wypozyczalni',
    content: RentalRulesContent
  },
  {
    title: 'Regulamin przewozów',
    slug: 'regulamin-przewozow',
    content: TransportRulesContent
  },
  {
    title: 'Protokół wydania/zwrotu',
    slug: 'protokol-wydania-zwrotu',
    content: SampleContractContent
  },
  {
    title: 'Przykładowe dokumenty',
    slug: 'wzor-umowy',
    content: SampleContractContent
  }
];
