import React from 'react';
import { Link } from 'react-router-dom';
import { Button, PageHeader } from '../components/ui';
import Seo from '../components/Seo';

const TransfersPage: React.FC = () => {
  const breadcrumbs = [{ name: 'Transfery' }];
  return (
    <div className="bg-background text-foreground">
      <Seo
        title="Transfery VIP Tesla"
        description="Zamów profesjonalny i dyskretny transfer VIP naszą luksusową flotą Tesli. Idealne na lotnisko, spotkania biznesowe i specjalne okazje."
      />
      <PageHeader
        title="Profesjonalne Transfery VIP"
        subtitle="Doświadcz najwyższego standardu podróży z EV Tech."
        breadcrumbs={breadcrumbs}
      />
      <div className="container mx-auto max-w-6xl px-4 md:px-6 pb-16 md:pb-24">
        <div className="grid gap-12 md:grid-cols-3 text-center">
          <div>
            <h3 className="text-2xl font-semibold mb-2">Dyskrecja i Profesjonalizm</h3>
            <p className="text-muted-foreground">
              Nasi kierowcy to certyfikowani profesjonaliści, którzy dbają o Twoją prywatność i komfort na każdym etapie podróży.
            </p>
          </div>
          <div>
            <h3 className="text-2xl font-semibold mb-2">Luksusowa Flota</h3>
            <p className="text-muted-foreground">
              Oferujemy wyłącznie najnowsze modele Tesli, gwarantujące cichą, płynną i ekologiczną podróż.
            </p>
          </div>
          <div>
            <h3 className="text-2xl font-semibold mb-2">Pełna Elastyczność</h3>
            <p className="text-muted-foreground">
              Dostosowujemy się do Twoich potrzeb, oferując transfery o każdej porze dnia i nocy.
            </p>
          </div>
        </div>
        <div className="mt-16 text-center">
            <h2 className="text-3xl font-bold tracking-tight">Gotowy na podróż w stylu?</h2>
            <p className="mt-4 max-w-2xl mx-auto text-muted-foreground">
                Skontaktuj się z nami, aby omówić szczegóły i zarezerwować swój przejazd. Gwarantujemy satysfakcję i niezapomniane wrażenia.
            </p>
            <div className="mt-8">
                <Link to="/kontakt">
                    <Button size="lg">Skontaktuj się z nami</Button>
                </Link>
            </div>
        </div>
      </div>
    </div>
  );
};

export default TransfersPage;