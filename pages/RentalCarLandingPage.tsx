
import React, { useEffect, useMemo } from 'react';
import { useParams, Navigate, Link } from 'react-router-dom';
import { CAR_FLEET } from '../configs/fleetConfig';
import { RENTAL_CARS } from '../configs/rentConfig';
import { Button, Card, CardContent } from '../components/ui';
import Seo from '../components/Seo';
import { SEO_CONFIG } from '../configs/seoConfig';
import { 
  BoltIcon, 
  SparklesIcon, 
  ShieldCheckIcon, 
  KeyIcon, 
  ArrowRightIcon,
  CheckIcon
} from '../icons';
import { MapPinIcon } from '../components/HeroIcons';
import type { SeoData } from '../types';

const RentalCarLandingPage: React.FC = () => {
    const { carId } = useParams<{ carId: string }>();
    const carFleet = CAR_FLEET.find(c => c.id === carId);
    const carRental = RENTAL_CARS.find(c => c.id === carId);
    
    if (!carFleet || !carRental) {
        return <Navigate to="/wypozyczalnia" replace />;
    }

    // Calculate minimum price dynamically
    const minPrice = useMemo(() => {
        if (carRental.priceTiers && carRental.priceTiers.length > 0) {
            return Math.min(...carRental.priceTiers.map(tier => tier.pricePerDay));
        }
        return carRental.pricePerDay;
    }, [carRental]);

    /** Galeria landing — bez duplikatów; szerokość każdej karty zależy od proporcji zdjęcia. */
    const galleryImages = useMemo(() => {
        return carRental.landingPageImages && carRental.landingPageImages.length > 0
            ? [...carRental.landingPageImages]
            : [...carRental.imageUrl];
    }, [carRental]);

    useEffect(() => {
        galleryImages.forEach((src) => {
            const img = new Image();
            img.src = src;
        });
    }, [galleryImages]);


    const seoData: SeoData = {
      ...SEO_CONFIG['/wypozycz/:carId'],
      title: SEO_CONFIG['/wypozycz/:carId'].title.replace('{carName}', carFleet.name),
      description: SEO_CONFIG['/wypozycz/:carId'].description.replace('{carName}', carFleet.name),
      ogTitle: (SEO_CONFIG['/wypozycz/:carId'].ogTitle || '').replace('{carName}', carFleet.name),
      ogDescription: (SEO_CONFIG['/wypozycz/:carId'].ogDescription || '').replace('{carName}', carFleet.name),
      ogImage: galleryImages[0],
    };

    const features = [
        { icon: BoltIcon, title: "Zasięg i Ładowanie", desc: `Realny zasięg do ${carFleet.specs?.range}. Dostęp do sieci Supercharger.` },
        { icon: SparklesIcon, title: "Komfort Highland", desc: "Wentylowane fotele, cichsza kabina i ekran dla pasażerów z tyłu." },
        { icon: ShieldCheckIcon, title: "Bezpieczeństwo", desc: "Najwyższa ocena bezpieczeństwa Euro NCAP. Pełen pakiet Autopilot." },
        { icon: KeyIcon, title: "Minimum Formalności", desc: "Prosty proces online. Odbierz auto bez zbędnych papierów." },
    ];

    return (
        <div className="bg-background">
            <Seo {...seoData} />
            
            {/* Galeria pozioma (scroll na całą szerokość) + nagłówek i CTA pod zdjęciami */}
            <section className="w-full bg-background">
                <div
                    className="w-full overflow-x-auto overflow-y-hidden [-webkit-overflow-scrolling:touch] scroll-smooth [scrollbar-width:thin]"
                    style={{ scrollbarGutter: 'stable' }}
                >
                    <div className="flex w-max snap-x snap-mandatory gap-4 px-3 py-8 sm:gap-6 sm:px-4 md:py-10 md:pl-6 md:pr-6">
                        {galleryImages.map((src, index) => (
                            <div
                                key={`${src}-${index}`}
                                className="snap-center flex-shrink-0 rounded-[30px] bg-white p-[10px] shadow-sm ring-1 ring-border/60"
                            >
                                <img
                                    src={src}
                                    alt={`${carFleet.name} — zdjęcie ${index + 1}`}
                                    className="block h-[220px] w-auto max-w-[min(92vw,920px)] object-contain sm:h-[280px] md:h-[340px] rounded-[20px]"
                                    loading={index < 2 ? 'eager' : 'lazy'}
                                    decoding="async"
                                />
                            </div>
                        ))}
                    </div>
                </div>

                <div className="container mx-auto px-4 pb-12 text-center md:pb-16">
                    <h1 className="text-4xl font-semibold text-foreground md:text-6xl">
                        Wynajem {carFleet.name}
                    </h1>
                    <p className="mx-auto mt-4 max-w-2xl text-xl text-muted-foreground md:text-2xl">
                        Poczuj przyszłość motoryzacji w Warszawie
                    </p>
                    <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
                        <Link to={`/wypozyczalnia?model=${carId}`}>
                            <Button size="lg" variant="primary" className="h-14 w-64 text-lg">
                                Cena od {minPrice} zł / doba
                            </Button>
                        </Link>
                        <Link to="/flota">
                            <Button size="lg" variant="secondary" className="h-14 w-64 text-lg">
                                Zobacz pełną ofertę
                            </Button>
                        </Link>
                    </div>
                </div>
            </section>

            {/* KEY METRICS */}
            <section className="bg-background border-b border-border">
                <div className="container mx-auto px-4 md:px-6 py-8">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 divide-x divide-border/50">
                        <div className="text-center px-2">
                            <p className="text-3xl font-bold tracking-tighter">{carFleet.specs?.acceleration}</p>
                            <p className="text-xs text-muted-foreground uppercase tracking-widest mt-1">0-100 km/h</p>
                        </div>
                         <div className="text-center px-2">
                            <p className="text-3xl font-bold tracking-tighter">{carFleet.specs?.range}</p>
                            <p className="text-xs text-muted-foreground uppercase tracking-widest mt-1">Zasięg WLTP</p>
                        </div>
                         <div className="text-center px-2">
                            <p className="text-3xl font-bold tracking-tighter">{carFleet.specs?.seating}</p>
                            <p className="text-xs text-muted-foreground uppercase tracking-widest mt-1">Miejsca</p>
                        </div>
                         <div className="text-center px-2">
                            <p className="text-3xl font-bold tracking-tighter text-blue-600">{minPrice} zł</p>
                            <p className="text-xs text-muted-foreground uppercase tracking-widest mt-1">Cena od / doba</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* WHY THIS CAR */}
            <section className="py-16 md:py-24 bg-secondary/30">
                <div className="container mx-auto px-4 md:px-6">
                    <div className="text-center max-w-2xl mx-auto mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">Dlaczego {carFleet.name}?</h2>
                        <p className="text-muted-foreground text-lg">
                            To nie jest zwykły samochód. To komputer na kołach, który definiuje na nowo pojęcie komfortu i osiągów.
                            Idealny wybór na weekendowy wyjazd, test przed zakupem lub podróż biznesową.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {features.map((feature, idx) => (
                            <Card key={idx} className="border-none shadow-md hover:shadow-xl transition-all duration-300">
                                <CardContent className="pt-6">
                                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4 text-primary">
                                        <feature.icon className="w-6 h-6" />
                                    </div>
                                    <h3 className="font-bold text-lg mb-2">{feature.title}</h3>
                                    <p className="text-sm text-muted-foreground">{feature.desc}</p>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            {/* SEO CONTENT SECTION */}
            <section className="py-16 bg-background">
                <div className="container mx-auto px-4 md:px-6 grid lg:grid-cols-3 gap-12">
                    <div className="lg:col-span-2 prose prose-zinc max-w-none">
                        <h2 className="text-2xl font-bold text-foreground">Wypożyczalnia Tesla 3 Highland – Przyszłość w zasięgu ręki</h2>
                        <p>
                            Jeśli interesuje Cię <strong>tesla na wynajem</strong> w Warszawie, trafiłeś w idealne miejsce. 
                            Nasz <strong>Tesla Model 3 Highland</strong> to najnowsza odsłona bestsellera, która zachwyca wyciszeniem, 
                            lepszym zawieszeniem i materiałami premium. Jako profesjonalna <strong>wypożyczalnia samochodów tesla</strong>, 
                            oferujemy przejrzyste warunki i auta dostępne od ręki.
                        </p>
                        <p>
                            <strong>Wypożyczenie tesli model 3</strong> to świetny sposób, aby sprawdzić, jak auto elektryczne sprawdza się na co dzień. 
                            Czy to <strong>wynajem krótkoterminowy</strong> na weekend, czy <strong>tesla na miesiąc</strong> w ramach testu przed zakupem 
                            – nasza oferta jest elastyczna. 
                        </p>
                        <h3 className="text-xl font-bold text-foreground mt-6">Dlaczego warto wybrać naszą ofertę?</h3>
                        <ul className="list-none pl-0 space-y-2 mt-4">
                            <li className="flex items-start gap-2">
                                <CheckIcon className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                                <span><strong>Tesla wynajem warszawa</strong> - odbiór w centrum lub na lotnisku.</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <CheckIcon className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                                <span><strong>Tesla na doby</strong> - idealne na śluby, eventy czy wycieczki.</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <CheckIcon className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                                <span><strong>Wypożyczalnia ev</strong> z pełnym wsparciem i instruktażem.</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <CheckIcon className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                                <span>Możliwość opcji <strong>tesla w abonamencie</strong> dla firm.</span>
                            </li>
                        </ul>
                        <p className="mt-6">
                            Nie czekaj. Sprawdź, dlaczego <strong>wynajem tesli 3</strong> to doświadczenie, którego nie zapomnisz. 
                            Nasza <strong>wypożyczalnia tesla 3</strong> gwarantuje naładowane auto, czystość i pełną gotowość do drogi.
                        </p>
                    </div>

                    {/* STICKY SIDEBAR CTA */}
                    <div className="lg:col-span-1">
                        <div className="sticky top-24 bg-card border border-border rounded-xl p-6 shadow-lg">
                            <h3 className="text-xl font-bold mb-4">Zarezerwuj termin</h3>
                            <div className="space-y-4 mb-6">
                                <div className="flex justify-between items-center py-2 border-b border-border">
                                    <span className="text-muted-foreground">Cena od</span>
                                    <span className="font-bold">{minPrice} zł / doba</span>
                                </div>
                                <div className="flex justify-between items-center py-2 border-b border-border">
                                    <span className="text-muted-foreground">Kaucja zwrotna</span>
                                    <span className="font-bold">{carRental.deposit?.toLocaleString()} zł</span>
                                </div>
                                <div className="flex justify-between items-center py-2 border-b border-border">
                                    <span className="text-muted-foreground">Limit km / dzień</span>
                                    <span className="font-bold">250 km</span>
                                </div>
                                <div className="flex items-center gap-2 text-sm text-green-600 bg-green-50 p-2 rounded">
                                    <MapPinIcon className="w-4 h-4" />
                                    <span>Odbiór w Warszawie (Włochy/Centrum)</span>
                                </div>
                            </div>
                            <Link to={`/wypozyczalnia?model=${carId}`} className="block w-full">
                                <Button size="lg" className="w-full font-bold text-lg">
                                    Wybierz termin <ArrowRightIcon className="ml-2 w-5 h-5" />
                                </Button>
                            </Link>
                            <p className="text-xs text-center text-muted-foreground mt-4">
                                Brak ukrytych opłat. Pełne ubezpieczenie w cenie.
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default RentalCarLandingPage;
