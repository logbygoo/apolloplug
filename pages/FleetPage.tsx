import React from 'react';
import { CAR_FLEET } from '../constants';

const FleetPage: React.FC = () => {
  return (
    <div className="pt-14">
      <div className="text-center my-12 md:my-16 px-4">
        <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl">Nasza Flota</h1>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
          Poznaj naszą starannie wyselekcjonowaną flotę pojazdów elektrycznych Tesla. Każdy model to gwarancja najwyższej jakości, osiągów i innowacji.
        </p>
      </div>

      <div className="space-y-4">
        {CAR_FLEET.map((car) => (
          <div key={car.id} className="min-h-screen grid md:grid-cols-2 items-center">
            <div className="h-64 md:h-screen">
              <img src={car.imageUrl} alt={car.name} className="object-cover w-full h-full" />
            </div>
            <div className="p-8 md:p-16">
              <h2 className="text-3xl font-bold">{car.name}</h2>
              <p className="mt-2 text-muted-foreground">{car.description}</p>
              <div className="mt-6 grid grid-cols-2 gap-x-4 gap-y-6 text-sm border-t border-border/50 pt-6">
                  <div>
                      <p className="font-semibold text-foreground/90">Zasięg (WLTP)</p>
                      <p className="text-muted-foreground">{car.specs.range}</p>
                  </div>
                  <div>
                      <p className="font-semibold text-foreground/90">Miejsca</p>
                      <p className="text-muted-foreground">{car.specs.seating}</p>
                  </div>
                  <div>
                      <p className="font-semibold text-foreground/90">0-100 km/h</p>
                      <p className="text-muted-foreground">{car.specs.acceleration}</p>
                  </div>
                   <div>
                      <p className="font-semibold text-foreground/90">Cena wynajmu</p>
                      <p className="text-muted-foreground">{car.pricePerDay} zł/dzień</p>
                  </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FleetPage;
