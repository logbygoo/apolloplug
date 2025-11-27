import React from 'react';
import { Link } from 'react-router-dom';
import { PageHeader, Button } from '../components/ui';
import Seo from '../components/Seo';
import {
  BuildingLibraryIcon,
  BanknotesIcon,
  PhoneIcon,
  SparklesIcon,
  DocumentTextIcon,
  BoltIcon,
} from '../icons';
import { SEO_CONFIG } from '../configs/seoConfig';

const features = [
  {
    icon: BuildingLibraryIcon,
    title: 'Współpraca z wieloma towarzystwami',
    description: 'Nie jesteśmy związani z jedną firmą. Współpracujemy z wszystkimi wiodącymi ubezpieczycielami na rynku, co daje nam pełen przegląd dostępnych ofert i gwarantuje, że znajdziemy rozwiązanie idealnie dopasowane do Twojego auta i stylu jazdy.',
  },
  {
    icon: BanknotesIcon,
    title: 'Gwarancja najlepszej ceny',
    description: 'Dzięki skali naszej działalności i długotrwałym relacjom z ubezpieczycielami, mamy możliwość negocjowania stawek niedostępnych dla klientów indywidualnych. Znajdziemy dla Ciebie najtańsze ubezpieczenie na rynku, bez kompromisów w zakresie ochrony.',
  },
  {
    icon: PhoneIcon,
    title: 'Bezpośredni kontakt z ekspertami',
    description: 'Zapomnij o infoliniach i anonimowych konsultantach. Masz do dyspozycji dedykowanego eksperta, który zna specyfikę ubezpieczeń pojazdów elektrycznych i jest gotów odpowiedzieć na każde Twoje pytanie. Zapewniamy profesjonalne doradztwo na każdym etapie.',
  },
  {
    icon: DocumentTextIcon,
    title: 'Cały proces 100% online',
    description: 'Szanujemy Twój czas. Całą procedurę, od porównania ofert, przez wybór polisy, aż po finalizację płatności, zrealizujesz wygodnie przez internet. Bez zbędnych dokumentów i wizyt w oddziale.',
  },
  {
    icon: BoltIcon,
    title: 'Ochrona aktywna nawet tego samego dnia',
    description: 'Potrzebujesz ubezpieczenia na już? To nie problem. Jesteśmy w stanie przygotować ofertę, sfinalizować umowę i aktywować Twoją polisę OC/AC nawet w dniu, w którym się do nas zgłosisz. Błyskawiczna ochrona dla Twojego EV.',
  },
];


const InsurancePage: React.FC = () => {
  const breadcrumbs = [{ name: 'Ubezpieczenia' }];
  return (
    <div className="bg-background text-foreground">
      <Seo {...SEO_CONFIG['/ubezpieczenia']} />
      <PageHeader
        title="Ubezpieczenia dla Twojego EV"
        subtitle="Zapewnij swojemu autu elektrycznemu najlepszą ochronę, nie przepłacając. Znajdziemy dla Ciebie najkorzystniejszą ofertę OC/AC na rynku."
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
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Chcesz poznać swoją składkę?</h2>
          <p className="mt-4 max-w-2xl mx-auto text-muted-foreground">
            Skontaktuj się z nami, a my bezpłatnie przygotujemy dla Ciebie spersonalizowaną ofertę ubezpieczenia. Porównamy dziesiątki opcji i znajdziemy tę najlepszą.
          </p>
          <div className="mt-8">
            <Link to="/kontakt">
              <Button size="lg">Zapytaj o ofertę</Button>
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
};

export default InsurancePage;