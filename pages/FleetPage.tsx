import React from 'react';
import { CAR_FLEET } from '../configs/fleetConfig';
import { Button, Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription, PageHeader } from '../components/ui';
import { Link } from 'react-router-dom';
import Seo from '../components/Seo';
import { SEO_CONFIG } from '../configs/seoConfig';

const FleetPage: React.FC = () => {
  const breadcrumbs = [{ name: 'Pojazdy' }];
  return (
    <div className="bg-background">
      <Seo {...SEO_CONFIG['/flota']} />
      <PageHeader 
        title="Nasza Flota"
        subtitle="Wybierz jeden z naszych w pełni elektrycznych pojazdów i poczuj przyszłość motoryzacji."
        breadcrumbs={breadcrumbs}
      />
      <div className="container mx-auto max-w-6xl px-4 md:px-6 pb-16 md:pb-24">
        <div className="grid gap-8 md:grid-cols-1 lg:grid-cols-1">
          {CAR_FLEET.map((car) => (
            <Card key={car.id} className="flex flex-col md:flex-row items-center overflow-hidden">
              <div className="md:w-1/2 w-full">
                <img src={car.imageUrl[0]} alt={car.name} className="object-cover w-full h-64 md:h-full" />
              </div>
              <div className="md:w-1/2 w-full">
                <CardHeader>
                  <CardTitle className="text-3xl">{car.name}</CardTitle>
                  <CardDescription>{car.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div>
                        <p className="text-2xl font-semibold">{car.specs?.range}</p>
                        <p className="text-xs text-muted-foreground">Zasięg (WLTP)</p>
                    </div>
                    <div>
                        <p className="text-2xl font-semibold">{car.specs?.seating}</p>
                        <p className="text-xs text-muted-foreground">Miejsca</p>
                    </div>
                    <div>
                        <p className="text-2xl font-semibold">{car.specs?.acceleration}</p>
                        <p className="text-xs text-muted-foreground">0-100 km/h</p>
                    </div>
                    <div>
                        <p className="text-2xl font-semibold">{car.pricePerDay} zł</p>
                        <p className="text-xs text-muted-foreground">Cena / dzień</p>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex gap-4">
                  <Link to={`/wypozyczalnia?model=${car.id}`} className="w-full">
                    <Button className="w-full" variant="primary">Wypożycz</Button>
                  </Link>
                  <Link to="/transfery" className="w-full">
                    <Button className="w-full" variant="secondary">Zamów TAXI</Button>
                  </Link>
                </CardFooter>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FleetPage;