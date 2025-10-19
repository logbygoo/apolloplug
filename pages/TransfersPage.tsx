import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui';

const TransfersPage: React.FC = () => {
  return (
    <div>
      <section 
        className="h-[70vh] w-full bg-cover bg-center flex items-center justify-center text-center px-4"
        style={{ backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url(https://picsum.photos/seed/vip-transfer/1920/1080)`}}
      >
        <div>
          <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
            Profesjonalne Transfery VIP
          </h1>
          <p className="mt-4 max-w-3xl text-lg text-foreground/80 md:text-xl">
            Doświadcz najwyższego standardu podróży. Nasi szoferzy, za kierownicą luksusowych, cichych aut elektrycznych, zapewnią Ci komfort, bezpieczeństwo i punktualność.
          </p>
        </div>
      </section>

      <section className="container mx-auto max-w-5xl px-4 md:px-6 py-16 md:py-24">
        <div className="grid gap-12 md:grid-cols-3 text-center">
          <div>
            <h3 className="text-xl font-semibold mb-2">Dyskrecja i Profesjonalizm</h3>
            <p className="text-muted-foreground">
              Nasi kierowcy to certyfikowani profesjonaliści, którzy dbają o Twoją prywatność i komfort na każdym etapie podróży.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-2">Luksusowa Flota</h3>
            <p className="text-muted-foreground">
              Oferujemy wyłącznie najnowsze modele Tesli, gwarantujące cichą, płynną i ekologiczną podróż.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-2">Pełna Elastyczność</h3>
            <p className="text-muted-foreground">
              Transfery lotniskowe, spotkania biznesowe, czy specjalne okazje - dostosujemy usługę do Twoich indywidualnych potrzeb.
            </p>
          </div>
        </div>

        <div className="mt-24 text-center">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Gotowy na podróż w nowym stylu?</h2>
          <p className="mt-4 max-w-xl mx-auto text-muted-foreground">
            Skontaktuj się z nami, aby zarezerwować swój transfer lub dowiedzieć się więcej o naszej ofercie.
          </p>
          <div className="mt-6">
            <Link to="/kontakt">
              <Button size="lg" className="uppercase tracking-wider font-medium">Skontaktuj się</Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default TransfersPage;
