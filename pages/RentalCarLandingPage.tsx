
import React, { useState, useEffect, useCallback, useMemo } from 'react';
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
    
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isHovered, setIsHovered] = useState(false);

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

    // Priority: use landingPageImages if available (better for hero slider), fallback to standard imageUrl
    const galleryImages = useMemo(() => {
        const images = carRental.landingPageImages && carRental.landingPageImages.length > 0 
            ? carRental.landingPageImages 
            : carRental.imageUrl;
            
        // Add duplicate if only 1 image to allow slider to function properly
        if (images.length < 2) {
            return [...images, images[0]];
        }
        return images;
    }, [carRental]);

    // --- Slider Logic (Same as HomePage) ---
    useEffect(() => {
        // Preload images
        galleryImages.forEach(src => {
            const img = new Image();
            img.src = src;
        });
    }, [galleryImages]);

    const goToNext = useCallback(() => {
        setCurrentIndex(prevIndex => (prevIndex === galleryImages.length - 1 ? 0 : prevIndex + 1));
    }, [galleryImages.length]);

    const goToPrevious = () => {
        setCurrentIndex(prevIndex => (prevIndex === 0 ? galleryImages.length - 1 : prevIndex - 1));
    };

    const goToSlide = (index: number) => {
        setCurrentIndex(index);
    };

    useEffect(() => {
        if (isHovered) return;
        const slideInterval = setInterval(goToNext, 10000);
        return () => clearInterval(slideInterval);
    }, [currentIndex, isHovered, goToNext]);


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
            
            {/* HERO SLIDER (Matching HomePage Style) */}
            <section 
                className="relative h-[600px] w-full text-white"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                {/* Progress Bar */}
                <div className="absolute top-0 left-0 w-full h-1 bg-black/20 z-10">
                    <div 
                        key={currentIndex}
                        className="h-full bg-white"
                        style={{
                            animation: 'progressBarFill 10s linear forwards',
                            animationPlayState: isHovered ? 'paused' : 'running'
                        }}
                    />
                </div>

                {/* Background Images */}
                <div className="absolute inset-0 w-full h-full">
                    {galleryImages.map((img, index) => (
                        <div
                            key={index}
                            className={`absolute inset-0 w-full h-full bg-cover bg-center transition-opacity duration-1000 ease-in-out ${
                                currentIndex === index ? 'opacity-100' : 'opacity-0'
                            }`}
                            style={{ backgroundImage: `url(${img})` }}
                            role="img"
                            aria-label={`Zdjęcie ${carFleet.name} ${index + 1}`}
                        />
                    ))}
                </div>

                {/* Overlay */}
                <div className="absolute inset-0 bg-black/40" />

                {/* Content */}
                <div className="relative container mx-auto h-full flex flex-col justify-center items-center text-center px-4">
                    <div className="animate-fade-in-up">
                        <span className="inline-block px-3 py-1 mb-6 text-sm font-semibold tracking-wider uppercase bg-white/20 backdrop-blur-sm rounded-sm border border-white/30">
                            Dostępny od ręki
                        </span>
                        <h1 className="text-4xl md:text-6xl font-semibold text-shadow-md mb-4">
                            Wynajem {carFleet.name}
                        </h1>
                        <p className="mt-2 text-xl md:text-2xl text-shadow text-white/90 max-w-2xl mx-auto">
                            Poczuj przyszłość motoryzacji w Warszawie
                        </p>
                    </div>

                    <div className="flex flex-col items-center gap-6 mt-10 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
                        <div className="flex flex-col sm:flex-row gap-4">
                            <Link to={`/wypozyczalnia?model=${carId}`}>
                                <Button size="lg" variant="primary" className="w-64 text-lg h-14">
                                    Cena od {minPrice} zł / doba
                                </Button>
                            </Link>
                            <Link to="/flota">
                                <Button 
                                    size="lg" 
                                    variant="secondary" 
                                    className="w-64 text-lg h-14 bg-white/20 !text-white border border-white/50 hover:bg-white/30"
                                >
                                    Zobacz pełną ofertę
                                </Button>
                            </Link>
                        </div>
                        
                        {/* Slide Indicators */}
                        <div className="flex gap-2 mt-4">
                            {galleryImages.map((_, index) => (
                                <button
                                    key={index}
                                    onClick={() => goToSlide(index)}
                                    className={`h-1.5 w-6 rounded-full transition-colors ${
                                        currentIndex === index ? 'bg-white' : 'bg-white/20 hover:bg-white/40'
                                    }`}
                                    aria-label={`Przejdź do slajdu ${index + 1}`}
                                />
                            ))}
                        </div>
                    </div>
                </div>

                {/* Navigation Arrows */}
                <button onClick={goToPrevious} className="absolute top-1/2 left-4 -translate-y-1/2 p-2 rounded-md bg-black/10 hover:bg-black/20 text-white z-10 transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
                </button>
                <button onClick={goToNext} className="absolute top-1/2 right-4 -translate-y-1/2 p-2 rounded-md bg-black/10 hover:bg-black/20 text-white z-10 transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
                </button>
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
