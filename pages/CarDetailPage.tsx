import React from 'react';
import { useParams, Navigate, Link } from 'react-router-dom';
import { CAR_FLEET } from '../configs/fleetConfig';
import { PageHeader, Button } from '../components/ui';
import Seo from '../components/Seo';
import { SEO_CONFIG } from '../configs/seoConfig';
import type { SeoData } from '../types';

const CarDetailPage: React.FC = () => {
    const { carId } = useParams<{ carId: string }>();
    const car = CAR_FLEET.find(c => c.id === carId);

    if (!car) {
        return <Navigate to="/flota" replace />;
    }

    const breadcrumbs = [
        { name: 'Pojazdy', path: '/flota' },
        { name: car.name },
    ];
    
    const baseSeoData = SEO_CONFIG['/flota/:carId'];
    const seoData: SeoData = {
      ...baseSeoData,
      title: baseSeoData.title.replace('{carName}', car.name),
      description: baseSeoData.description.replace('{carName}', car.name),
      ogTitle: (baseSeoData.ogTitle || baseSeoData.title).replace('{carName}', car.name),
      ogDescription: (baseSeoData.ogDescription || baseSeoData.description).replace('{carName}', car.name),
      ogImage: car.imageUrl[0],
    };

    return (
        <div className="bg-background">
            <Seo {...seoData} />
            <PageHeader title={car.name} subtitle={car.description} breadcrumbs={breadcrumbs} />
            <div className="container mx-auto px-4 md:px-6 pb-16 md:pb-24">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                    <img src={car.imageUrl[0]} alt={car.name} className="rounded-lg object-cover w-full" />
                    <div>
                        <h2 className="text-2xl font-bold mb-6">Specyfikacja</h2>
                        <div className="grid grid-cols-2 gap-6">
                             <div>
                                <p className="text-3xl font-semibold">{car.specs?.range}</p>
                                <p className="text-sm text-muted-foreground">Zasięg (WLTP)</p>
                            </div>
                            <div>
                                <p className="text-3xl font-semibold">{car.specs?.seating}</p>
                                <p className="text-sm text-muted-foreground">Miejsca</p>
                            </div>
                            <div>
                                <p className="text-3xl font-semibold">{car.specs?.acceleration}</p>
                                <p className="text-sm text-muted-foreground">0-100 km/h</p>
                            </div>
                            <div>
                                <p className="text-3xl font-semibold">{car.pricePerDay} zł</p>
                                <p className="text-sm text-muted-foreground">Cena / dzień</p>
                            </div>
                        </div>
                         <div className="mt-10 flex flex-col sm:flex-row gap-4">
                            <Link to={`/wypozyczalnia?model=${car.id}`} className="w-full">
                                <Button className="w-full" variant="primary" size="lg">Wynajmij</Button>
                            </Link>
                            <Link to="/kontakt" className="w-full">
                                <Button className="w-full" variant="secondary" size="lg">Jazda próbna</Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CarDetailPage;