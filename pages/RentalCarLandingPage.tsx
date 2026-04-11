import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useParams, Navigate, Link } from 'react-router-dom';
import { CAR_FLEET } from '../configs/fleetConfig';
import { RENTAL_CARS } from '../configs/rentConfig';
import { Button, Card, CardContent, PageHeader } from '../components/ui';
import Seo from '../components/Seo';
import { SEO_CONFIG } from '../configs/seoConfig';
import {
  BoltIcon,
  SparklesIcon,
  ShieldCheckIcon,
  KeyIcon,
  ArrowRightIcon,
  CheckIcon,
} from '../icons';
import { MapPinIcon } from '../components/HeroIcons';
import type { SeoData } from '../types';

/** Te same reguły co `.rental-v2` na /wypozyczalnia — scrollbar ukryty, tor z gutterem jak `.container`. */
const CAR_LANDING_E2E_STYLES = `
  .rental-car-landing {
    --container-width: 100%;
    --slider-gap: 1.25rem;
    --e2e-edge-fuzz: 15px;
  }
  @media (min-width: 640px) {
    .rental-car-landing { --container-width: 40rem; }
  }
  @media (min-width: 768px) {
    .rental-car-landing { --container-width: 48rem; }
  }
  @media (min-width: 1024px) {
    .rental-car-landing { --container-width: 64rem; }
  }
  @media (min-width: 1280px) {
    .rental-car-landing { --container-width: 80rem; }
  }
  @media (min-width: 1536px) {
    .rental-car-landing { --container-width: 96rem; }
  }

  .rental-car-landing .e2e-slider {
    width: 100%;
    position: relative;
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
    overscroll-behavior-x: contain;
    scrollbar-width: none;
    -ms-overflow-style: none;
    touch-action: pan-x pan-y;
  }
  .rental-car-landing .e2e-slider::-webkit-scrollbar {
    height: 0;
    display: none;
  }
  .rental-car-landing .e2e-track {
    display: inline-flex;
    width: max-content;
    gap: var(--slider-gap, 20px);
    padding-top: 0;
    padding-bottom: 0;
    padding-left: max(1rem, calc((100% - var(--container-width)) / 2 + var(--e2e-edge-fuzz)));
    padding-right: max(1rem, calc((100% - var(--container-width)) / 2 + var(--e2e-edge-fuzz)));
  }
  @media (min-width: 768px) {
    .rental-car-landing .e2e-track {
      padding-left: max(1.5rem, calc((100% - var(--container-width)) / 2 + 1.5rem));
      padding-right: max(1.5rem, calc((100% - var(--container-width)) / 2 + 1.5rem));
    }
  }

  @media (max-width: 767px) {
    .rental-car-landing .rental-v2-page-header > div {
      padding-top: 1.75rem;
      padding-bottom: 1.75rem;
    }
    .rental-car-landing .rental-v2-page-header h1 {
      font-size: 1.875rem;
      line-height: 2.25rem;
    }
  }
`;

const sliderGapStyle = { '--slider-gap': '1.25rem' } as React.CSSProperties;

const RentalLandingEdgeScroller: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="relative ml-[calc(50%-50vw)] w-[100vw] max-w-[100vw] shrink-0 overflow-x-visible">
    {children}
  </div>
);

const MagnifyingGlassIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
  </svg>
);

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

    const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
    const galleryCount = galleryImages.length;
    const lightboxTouchStartX = useRef<number | null>(null);
    const lightboxIgnoreClickRef = useRef(false);

    const closeLightbox = useCallback(() => setLightboxIndex(null), []);
    const goNextLightbox = useCallback(() => {
        setLightboxIndex((i) => (i === null ? null : (i + 1) % galleryCount));
    }, [galleryCount]);
    const goPrevLightbox = useCallback(() => {
        setLightboxIndex((i) => (i === null ? null : (i - 1 + galleryCount) % galleryCount));
    }, [galleryCount]);

    useEffect(() => {
        if (lightboxIndex === null) return;
        const onKey = (e: KeyboardEvent) => {
            if (e.key === 'Escape') closeLightbox();
            if (e.key === 'ArrowRight') goNextLightbox();
            if (e.key === 'ArrowLeft') goPrevLightbox();
        };
        window.addEventListener('keydown', onKey);
        return () => window.removeEventListener('keydown', onKey);
    }, [lightboxIndex, closeLightbox, goNextLightbox, goPrevLightbox]);

    useEffect(() => {
        if (lightboxIndex === null) return;
        const prev = document.body.style.overflow;
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = prev;
        };
    }, [lightboxIndex]);

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
        <div className="rental-car-landing bg-background">
            <style>{CAR_LANDING_E2E_STYLES}</style>
            <Seo {...seoData} />

            {/* Galeria E2E (scrollbar ukryty jak na /wypozyczalnia) */}
            <section className="w-full bg-background">
                <RentalLandingEdgeScroller>
                    <section className="e2e-slider scroll-smooth pt-4" style={sliderGapStyle}>
                        <div className="e2e-track items-stretch">
                            {galleryImages.map((src, index) => (
                                <button
                                    key={`${src}-${index}`}
                                    type="button"
                                    onClick={() => setLightboxIndex(index)}
                                    className="group relative shrink-0 snap-center cursor-zoom-in rounded-[30px] border-0 bg-transparent p-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                                    aria-label={`Powiększ zdjęcie ${index + 1} z ${galleryCount}`}
                                >
                                    <img
                                        src={src}
                                        alt={`${carFleet.name}, zdjęcie ${index + 1}`}
                                        className="block h-[220px] w-auto max-w-[min(92vw,920px)] rounded-[30px] object-contain sm:h-[280px] md:h-[340px]"
                                        loading={index < 2 ? 'eager' : 'lazy'}
                                        decoding="async"
                                    />
                                    <span
                                        className="pointer-events-none absolute inset-0 flex items-center justify-center rounded-[30px] bg-black/0 transition-colors group-hover:bg-black/25"
                                        aria-hidden
                                    >
                                        <MagnifyingGlassIcon className="h-10 w-10 text-white opacity-0 drop-shadow-md transition-opacity group-hover:opacity-100" />
                                    </span>
                                </button>
                            ))}
                        </div>
                    </section>
                </RentalLandingEdgeScroller>
            </section>

            {/* Jak nagłówek na /wypozyczalnia — wersja jasna (bg-background zamiast bg-secondary) */}
            <div className="mb-8 w-full border-b border-border bg-background">
                <div className="rental-v2-page-header">
                    <PageHeader
                        title={`Wynajem ${carFleet.name}`}
                        subtitle="Poczuj przyszłość motoryzacji w Warszawie"
                        breadcrumbs={[
                            { name: 'Wypożyczalnia', path: '/wypozyczalnia' },
                            { name: carFleet.name },
                        ]}
                    />
                </div>
                <div className="container mx-auto flex flex-col items-center justify-center gap-4 px-4 pb-14 pt-6 md:px-6">
                    <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
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
            </div>

            {/* Lightbox: tło lub zdjęcie zamyka; strzałki / klawisze zmieniają slajd */}
            {lightboxIndex !== null && galleryImages[lightboxIndex] && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center p-4"
                    role="dialog"
                    aria-modal="true"
                    aria-label="Powiększone zdjęcie"
                >
                    <button
                        type="button"
                        className="absolute inset-0 bg-black/85"
                        aria-label="Zamknij"
                        onClick={closeLightbox}
                    />
                    <button
                        type="button"
                        className="absolute left-2 top-1/2 z-[2] -translate-y-1/2 rounded-full bg-white/15 p-2.5 text-white transition-colors hover:bg-white/25 md:left-4"
                        aria-label="Poprzednie zdjęcie"
                        onClick={(e) => {
                            e.stopPropagation();
                            goPrevLightbox();
                        }}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
                            <path d="m15 18-6-6 6-6" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </button>
                    <button
                        type="button"
                        className="absolute right-2 top-1/2 z-[2] -translate-y-1/2 rounded-full bg-white/15 p-2.5 text-white transition-colors hover:bg-white/25 md:right-4"
                        aria-label="Następne zdjęcie"
                        onClick={(e) => {
                            e.stopPropagation();
                            goNextLightbox();
                        }}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
                            <path d="m9 18 6-6-6-6" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </button>
                    <div className="relative z-[1] flex max-h-[min(90vh,900px)] max-w-[min(96vw,1200px)] items-center justify-center">
                        <button
                            type="button"
                            className="max-h-[85vh] max-w-full touch-pan-y border-0 bg-transparent p-0"
                            onClick={() => {
                                if (lightboxIgnoreClickRef.current) return;
                                closeLightbox();
                            }}
                            onTouchStart={(e) => {
                                lightboxTouchStartX.current = e.touches[0].clientX;
                            }}
                            onTouchEnd={(e) => {
                                if (lightboxTouchStartX.current === null) return;
                                const dx = e.changedTouches[0].clientX - lightboxTouchStartX.current;
                                lightboxTouchStartX.current = null;
                                if (Math.abs(dx) > 45) {
                                    lightboxIgnoreClickRef.current = true;
                                    window.setTimeout(() => {
                                        lightboxIgnoreClickRef.current = false;
                                    }, 350);
                                    if (dx > 0) goPrevLightbox();
                                    else goNextLightbox();
                                }
                            }}
                            aria-label="Zamknij podgląd"
                        >
                            <img
                                src={galleryImages[lightboxIndex]}
                                alt={`${carFleet.name} — zdjęcie ${lightboxIndex + 1}`}
                                className="max-h-[85vh] max-w-full rounded-2xl object-contain"
                            />
                        </button>
                    </div>
                </div>
            )}

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
