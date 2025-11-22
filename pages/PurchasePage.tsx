import React from 'react';
import { PageHeader } from '../components/ui';
import Seo from '../components/Seo';

const PurchasePage: React.FC = () => {
  const breadcrumbs = [{ name: 'Zakup' }];
  return (
    <div className="bg-background text-foreground">
      <Seo
        title="Zakup Samochodu Elektrycznego"
        description="Skonfiguruj i zamów swojego wymarzonego elektryka. Oferujemy nowe i używane modele Tesli z gwarancją."
      />
      <PageHeader
        title="Zakup Pojazdu"
        subtitle="Strona w budowie. Wkrótce znajdziesz tutaj informacje o możliwości zakupu pojazdów."
        breadcrumbs={breadcrumbs}
      />
      <div className="container mx-auto max-w-4xl px-4 md:px-6 py-16 text-center">
        <p className="text-muted-foreground">Pracujemy nad tą sekcją. Zapraszamy wkrótce!</p>
      </div>
    </div>
  );
};

export default PurchasePage;
