import React from 'react';
import { PageHeader } from '../components/ui';
import Seo from '../components/Seo';

const InsurancePage: React.FC = () => {
  const breadcrumbs = [{ name: 'Ubezpieczenia' }];
  return (
    <div className="bg-background text-foreground">
      <Seo
        title="Ubezpieczenia dla Samochodów Elektrycznych"
        description="Znajdź najlepsze ubezpieczenie OC/AC dla Twojego samochodu elektrycznego. Specjalne pakiety dla Tesli."
      />
      <PageHeader
        title="Ubezpieczenia"
        subtitle="Strona w budowie. Wkrótce znajdziesz tutaj dedykowane oferty ubezpieczeniowe dla pojazdów elektrycznych."
        breadcrumbs={breadcrumbs}
      />
       <div className="container mx-auto max-w-4xl px-4 md:px-6 py-16 text-center">
        <p className="text-muted-foreground">Pracujemy nad tą sekcją. Zapraszamy wkrótce!</p>
      </div>
    </div>
  );
};

export default InsurancePage;
