import React, { useState } from 'react';
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
    
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    if (!carFleet || !carRental) {
        return <Navigate to="/wypozyczalnia" replace />;
    }

    // Merge image lists and add placeholders if needed to make the slider work better visually
    const galleryImages = [
        ...carRental.imageUrl,
        // Add more specific/contextual images if available in real config, 
        // using duplicates here just to demonstrate slider functionality if only 1 img exists
        ...(carRental.imageUrl.length < 2 ? [carRental.imageUrl[0], carRental.imageUrl[0]] : []) 
    ];

    const nextImage = () => {
        setCurrentImageIndex((prev) => (prev + 1) % galleryImages.length);
    };

    const prevImage = () => {
        setCurrentImageIndex((prev) => (prev - 1 + galleryImages.length) % galleryImages.length);
    };

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
            
            {/* HERO SECTION WITH SLIDER */}
            <section className="relative h-[60vh] md:h-[75vh] w-full overflow-hidden bg-zinc-900">
                 <div 
                    className="absolute inset-0 w-full h-full transition-transform duration-700 ease-in-out"
                    style={{ backgroundImage: `url(${galleryImages[currentImageIndex]})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
                >
                     <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
                </div>

                {galleryImages.length > 1 && (
                    <>
                        <button onClick={prevImage} className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/30 hover:bg-black/50 text-white backdrop-blur-sm transition-all border border-white/10 z-10">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" /></svg>
                        </button>
                        <button onClick={nextImage} className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/30 hover:bg-black/50 text-white backdrop-blur-sm transition-all border border-white/10 z-10">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" /></svg>
                        </button>
                        <div className="absolute bottom-24 left-1/2 -translate-x-1/2 flex gap-2">
                            {galleryImages.map((_, idx) => (
                                <button 
                                    key={idx} 
                                    onClick={() => setCurrentImageIndex(idx)}
                                    className={`w-2.5 h-2.5 rounded-full transition-all ${idx === currentImageIndex ? 'bg-white w-8' : 'bg-white/50 hover:bg-white/80'}`} 
                                />
                            ))}
                        </div>
                    </>
                )}

                <div className="absolute bottom-0 left-0 w-full p-6 md:p-12 pb-16">
                    <div className="container mx-auto">
                        <div className="max-w-3xl animate-fade-in-up">
                            <span className="inline-block px-3 py-1 mb-4 text-xs font-bold tracking-wider text-white uppercase bg-blue-600 rounded-sm">
                                Dostępny od ręki
                            </span>
                            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 leading-tight shadow-black drop-shadow-lg">
                                Wynajem {carFleet.name}
                                <span className="block text-xl md:text-3xl font-medium text-gray-300 mt-2">Poczuj przyszłość motoryzacji w Warszawie</span>
                            </h1>
                            <div className="flex flex-col sm:flex-row gap-4 mt-8">
                                <Link to={`/wypozyczalnia?model=${carId}`}>
                                    <Button size="lg" className="w-full sm:w-auto text-lg px-8 py-6 shadow-lg shadow-blue-900/20">
                                        Wypożycz teraz od {carRental.pricePerDay} zł
                                    </Button>
                                </Link>
                                <Link to="/flota">
                                    <Button variant="secondary" size="lg" className="w-full sm:w-auto bg-white/10 text-white hover:bg-white/20 border-white/10 backdrop-blur-md">
                                        Zobacz pełną ofertę
                                    </Button>
                                </Link>
                            </div>
                        </div>
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
                            <p className="text-3xl font-bold tracking-tighter text-blue-600">{carRental.pricePerDay} zł</p>
                            <p className="text-xs text-muted-foreground uppercase tracking-widest mt-1">Cena za dobę</p>
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
                                    <span className="text-muted-foreground">Cena za dobę</span>
                                    <span className="font-bold">{carRental.pricePerDay} zł</span>
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