import React from 'react';
import { Link } from 'react-router-dom';
import { PageHeader, Button } from '../components/ui';
import Seo from '../components/Seo';
import { DocumentTextIcon, KeyIcon, BanknotesIcon, ShieldCheckIcon, SparklesIcon, HomeIcon } from '../icons';
import { SEO_CONFIG } from '../configs/seoConfig';

const features = [
  {
    icon: DocumentTextIcon,
    title: 'Cały proces w jednym miejscu',
    description: 'Zapomnij o skomplikowanych formularzach i dziesiątkach telefonów. Poprowadzimy Cię przez cały proces zamówienia, od wyboru idealnej konfiguracji, przez złożenie zamówienia u producenta, aż po finalizację formalności. Monitorujemy każdy etap, informując Cię na bieżąco.',
  },
  {
    icon: KeyIcon,
    title: 'Auto zastępcze na czas oczekiwania',
    description: 'Oczekiwanie na nowe auto nie musi oznaczać przerwy w mobilności. Na preferencyjnych warunkach udostępnimy Ci jeden z naszych pojazdów elektrycznych, abyś mógł komfortowo jeździć, aż do dnia odbioru Twojego wymarzonego samochodu.',
  },
  {
    icon: BanknotesIcon,
    title: 'Optymalne finansowanie',
    description: 'Leasing, kredyt, a może wynajem długoterminowy? Przeanalizujemy Twoje potrzeby i pomożemy wybrać najkorzystniejszą formę finansowania. Dzięki współpracy z wiodącymi instytucjami, zapewniamy konkurencyjne warunki i minimum formalności.',
  },
  {
    icon: ShieldCheckIcon,
    title: 'Dedykowane ubezpieczenie',
    description: 'Samochód elektryczny zasługuje na najlepszą ochronę. Znajdziemy dla Ciebie polisę OC/AC/NNW idealnie dopasowaną do specyfiki EV, gwarantującą szeroki zakres ochrony i spokój na każdej trasie.',
    ctaText: 'Sprawdź oferty ubezpieczeń',
    ctaLink: '/ubezpieczenia',
  },
  {
    icon: SparklesIcon,
    title: 'Bezstresowy odbiór',
    description: 'Dzień odbioru to wyjątkowa chwila. Możemy towarzyszyć Ci w salonie, aby profesjonalnie zweryfikować stan techniczny pojazdu, lub zająć się wszystkim za Ciebie i dopilnować formalności.',
  },
  {
    icon: HomeIcon,
    title: 'Dostawa pod sam dom',
    description: 'Na Twoje życzenie, po załatwieniu wszystkich formalności, dostarczymy gotowe do drogi, lśniące auto prosto pod Twój dom. Skup się na przyjemności z pierwszej jazdy, a logistykę zostaw nam.',
  },
];


const PurchasePage: React.FC = () => {
  const breadcrumbs = [{ name: 'Zakup' }];
  return (
    <div className="bg-background text-foreground">
      <Seo {...SEO_CONFIG['/zakup']} />
      <PageHeader
        title="Zamów z nami swoje EV"
        subtitle="Zajmiemy się wszystkim za Ciebie – od konfiguracji, przez finansowanie, aż po dostawę pod same drzwi. Skup się na przyjemności z jazdy, resztę zostaw nam."
        breadcrumbs={breadcrumbs}
      />
      
      <div className="container mx-auto max-w-5xl px-4 md:px-6 pb-16 md:pb-24">
        {/* Features Section */}
        <section className="py-12">
            <div className="space-y-24">
              {features.map((feature, index) => {
                const isEven = index % 2 === 0;
                return (
                  <div key={index} className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                    <div className={`flex justify-center items-center ${!isEven ? 'md:order-last' : ''}`}>
                      <feature.icon className="w-40 h-40 text-primary/10" strokeWidth={1} />
                    </div>
                    <div className="text-center md:text-left">
                      <h3 className="text-2xl font-bold mb-4">{feature.title}</h3>
                      <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
                      {feature.ctaLink && feature.ctaText && (
                        <div className="mt-6">
                          <Link to={feature.ctaLink}>
                            <Button variant="secondary">{feature.ctaText}</Button>
                          </Link>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
        </section>

        {/* CTA Section */}
        <section className="mt-16 text-center bg-secondary py-16 px-8 rounded-lg">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Gotowy na Elektryczną Rewolucję?</h2>
          <p className="mt-4 max-w-2xl mx-auto text-muted-foreground">
            Porozmawiajmy o Twoim nowym samochodzie. Jesteśmy tu, aby odpowiedzieć na wszystkie Twoje pytania i pomóc Ci rozpocząć niezwykłą przygodę z elektromobilnością.
          </p>
          <div className="mt-8">
            <Link to="/kontakt">
              <Button size="lg">Skontaktuj się z nami</Button>
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
};

export default PurchasePage;