import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui';

const TransfersPage: React.FC = () => {
  return (
    <div className="bg-background text-foreground">
      <header
        className="h-[50vh] bg-cover bg-center flex items-center justify-center"
        style={{ backgroundImage: "url('https://digitalassets.tesla.com/tesla-contents/image/upload/f_auto,q_auto/Mega-Menu-Vehicles-Model-S.png')"}}
      >
        <div className="text-center text-white bg-black/40 p-8 rounded-lg">
          <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
            Profesjonalne Transfery VIP
          </h1>
          <p className="mt-4 max-w-3xl text-lg md:text-xl text-white/90">
            Doświadcz najwyższego standardu podróży z EV Tech.
          </p>
        </div>
      </header>

      <div className="container mx-auto max-w-6xl px-4 md:px-6 py-16 md:py-24">
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
              <Button size="lg" variant="primary">Skontaktuj się</Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransfersPage;