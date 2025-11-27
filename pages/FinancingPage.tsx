import React from 'react';
import { Link } from 'react-router-dom';
import { PageHeader, Button } from '../components/ui';
import Seo from '../components/Seo';
import {
  DocumentTextIcon,
  CalendarDaysIcon,
  BanknotesIcon,
  SparklesIcon,
} from '../icons';
import { SEO_CONFIG } from '../configs/seoConfig';

const features = [
  {
    icon: DocumentTextIcon,
    title: 'Leasing Operacyjny i Finansowy',
    description: 'Najpopularniejsza forma finansowania dla firm. Dzięki współpracy z wieloma leasingodawcami, znajdziemy dla Ciebie elastyczne warunki z niskim wkładem własnym, dopasowane idealnie do Twojego biznesu. Korzystaj z auta i optymalizuj koszty.',
  },
  {
    icon: CalendarDaysIcon,
    title: 'Wynajem Długoterminowy',
    description: 'Idealne rozwiązanie, jeśli cenisz wygodę i przewidywalność kosztów. Znajdziemy ofertę wynajmu, w której jedna stała opłata pokrywa wszystko: finansowanie, ubezpieczenie, serwis i opony. Ty po prostu jeździsz.',
  },
  {
    icon: BanknotesIcon,
    title: 'Kredyt Samochodowy',
    description: 'Chcesz stać się właścicielem pojazdu od samego początku? Pomożemy Ci uzyskać atrakcyjny kredyt na zakup EV. Współpracujemy z bankami, aby zapewnić najlepsze oprocentowanie i uproszczone procedury.',
  },
   {
    icon: SparklesIcon,
    title: 'Pożyczka Leasingowa',
    description: 'Alternatywa dla kredytu bankowego, łącząca zalety leasingu i pożyczki. Stajesz się właścicielem pojazdu od razu, a my pomagamy uzyskać finansowanie na prostych zasadach, bez skomplikowanych procedur bankowych.',
  },
];


const FinancingPage: React.FC = () => {
  const breadcrumbs = [{ name: 'Finansowanie' }];
  return (
    <div className="bg-background text-foreground">
      <Seo {...SEO_CONFIG['/finansowanie']} />
      <PageHeader
        title="Finansowanie Twojego EV"
        subtitle="Współpracujemy z wiodącymi instytucjami finansowymi, aby znaleźć dla Ciebie najlepsze rozwiązanie. Porównamy dziesiątki ofert leasingu, wynajmu i kredytu, oszczędzając Twój czas i pieniądze."
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
                    </div>
                  </div>
                );
              })}
            </div>
        </section>

        {/* CTA Section */}
        <section className="mt-16 text-center bg-secondary py-16 px-8 rounded-lg">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Gotowy na własne EV?</h2>
          <p className="mt-4 max-w-2xl mx-auto text-muted-foreground">
            Skontaktuj się z naszym doradcą, który przygotuje spersonalizowaną kalkulację i pomoże wybrać najlepszą opcję finansowania.
          </p>
          <div className="mt-8">
            <Link to="/kontakt">
              <Button size="lg">Zapytaj o finansowanie</Button>
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
};

export default FinancingPage;