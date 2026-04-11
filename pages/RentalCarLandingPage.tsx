import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { getShuffledLandingGallery, landingImageThumbSrc } from '../configs/landingPageImages';
import { RENTAL_LANDING_FAQ } from '../configs/rentalLandingFaq';
import { useParams, Navigate, Link, NavLink } from 'react-router-dom';
import { CAR_FLEET } from '../configs/fleetConfig';
import { RENTAL_CARS } from '../configs/rentConfig';
import { Card, CardContent } from '../components/ui';
import Seo from '../components/Seo';
import { SEO_CONFIG } from '../configs/seoConfig';
import {
  BoltIcon,
  SparklesIcon,
  ShieldCheckIcon,
  KeyIcon,
  ArrowRightIcon,
  CheckIcon,
  HomeIcon,
} from '../icons';
import { ChevronDownIcon } from '../components/HeroIcons';
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
    align-items: stretch;
    width: max-content;
    gap: var(--slider-gap, 20px);
    padding-top: 0;
    padding-bottom: 0;
    padding-left: max(1rem, calc((100% - var(--container-width)) / 2 + var(--e2e-edge-fuzz)));
    padding-right: max(1rem, calc((100% - var(--container-width)) / 2 + var(--e2e-edge-fuzz)));
  }
  /* Jeden rząd: wszystkie slajdy jak najwyższy box; min-h żeby przy niskim oknie coś było widać; max-h żeby sekcja nie dominowała */
  .rental-car-landing .e2e-slide {
    min-height: 220px;
    max-height: min(40vh, 360px);
    align-self: stretch;
  }
  .rental-car-landing .e2e-slide--photo {
    width: 100%;
    max-width: 500px;
  }
  @media (max-width: 767px) {
    .rental-car-landing .e2e-slide--photo {
      max-width: 70vw;
    }
  }
  @media (min-width: 768px) {
    .rental-car-landing .e2e-track {
      padding-left: max(1.5rem, calc((100% - var(--container-width)) / 2 + 1.5rem));
      padding-right: max(1.5rem, calc((100% - var(--container-width)) / 2 + 1.5rem));
    }
  }

  @media (max-width: 767px) {
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

    /** Galeria: miniatury `-min.jpg` w sliderze, pełne `src` w lightbox; kolejność losowa przy każdym zestawieniu. */
    const galleryItems = useMemo(() => getShuffledLandingGallery(carRental), [carRental.id]);

    useEffect(() => {
        galleryItems.forEach((item) => {
            const img = new Image();
            img.src = item.src;
        });
    }, [galleryItems]);

    const [openFaqIndex, setOpenFaqIndex] = useState<number>(0);
    const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
    const galleryCount = galleryItems.length;
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
      ogImage: galleryItems[0]?.src,
    };

    const features = [
        { icon: BoltIcon, title: "Zasięg i Ładowanie", desc: `Realny zasięg do ${carFleet.specs?.range}. Dostęp do sieci Supercharger.` },
        { icon: SparklesIcon, title: "Komfort Highland", desc: "Wentylowane fotele, cichsza kabina i ekran dla pasażerów z tyłu." },
        { icon: ShieldCheckIcon, title: "Bezpieczeństwo", desc: "Najwyższa ocena bezpieczeństwa Euro NCAP. Pełen pakiet Autopilot." },
        { icon: KeyIcon, title: "Dostęp przez aplikację", desc: "Steruj klimatem, zamkiem i statusem ładowania z telefonu." },
    ];

    return (
        <div className="rental-car-landing bg-background">
            <style>{CAR_LANDING_E2E_STYLES}</style>
            <Seo {...seoData} />

            {/* Galeria E2E: pierwszy slajd = szary box z okruszkami + h1 (jak header), potem zdjęcia; reszta paska biała */}
            <section className="w-full bg-white">
                <RentalLandingEdgeScroller>
                    <section className="e2e-slider scroll-smooth pt-4" style={sliderGapStyle}>
                        <div className="e2e-track">
                            <div
                                className="e2e-slide pointer-events-none w-max max-w-[70vw] shrink-0 snap-center flex flex-col justify-center overflow-x-hidden overflow-y-auto md:max-w-[min(92vw,920px)]"
                                aria-label="Nagłówek strony"
                            >
                                <div className="rental-v2-page-header flex min-h-0 flex-1 flex-col justify-center pr-5 md:pr-8">
                                    <div className="pointer-events-auto min-w-0">
                                        <nav aria-label="breadcrumb" className="mb-3 overflow-hidden">
                                            <ol className="flex items-center gap-2 text-sm">
                                                <li className="shrink-0">
                                                    <NavLink
                                                        to="/"
                                                        className="text-muted-foreground hover:text-foreground"
                                                        aria-label="Strona główna"
                                                    >
                                                        <HomeIcon className="h-5 w-5" />
                                                    </NavLink>
                                                </li>
                                                <li className="flex shrink-0 items-center gap-2">
                                                    <span className="text-muted-foreground/50">/</span>
                                                    <NavLink
                                                        to="/wypozyczalnia"
                                                        className="whitespace-nowrap text-muted-foreground hover:text-foreground"
                                                    >
                                                        Wypożyczalnia
                                                    </NavLink>
                                                </li>
                                                <li className="flex min-w-0 items-center gap-2">
                                                    <span className="text-muted-foreground/50">/</span>
                                                    <span className="truncate font-medium text-foreground">{carFleet.name}</span>
                                                </li>
                                            </ol>
                                        </nav>
                                        <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
                                            Wynajem {carFleet.name}
                                        </h1>
                                        <p className="mt-3 max-w-3xl text-base text-muted-foreground md:mt-4 md:text-lg">
                                            Wypożyczalnia aut elektrycznych Warszawa • Tesla
                                        </p>
                                        <div className="mt-5 flex flex-wrap items-center justify-start gap-x-4 gap-y-2">
                                            <Link
                                                to={`/wypozyczalnia?model=${carId}`}
                                                className="inline-flex h-12 w-full max-w-[280px] shrink-0 items-center justify-center rounded-md bg-foreground px-8 text-base font-semibold text-background transition-colors hover:bg-foreground/90 sm:w-auto"
                                            >
                                                Zarezerwuj pojazd
                                            </Link>
                                            <p className="m-0 text-left text-sm text-muted-foreground">
                                                już od{' '}
                                                <strong className="font-semibold text-foreground">
                                                    {minPrice.toLocaleString('pl-PL')} zł
                                                </strong>
                                                /dzień
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {galleryItems.map((item, index) => (
                                <button
                                    key={item.src}
                                    type="button"
                                    onClick={() => setLightboxIndex(index)}
                                    className="e2e-slide e2e-slide--photo group relative flex h-full min-h-0 shrink-0 snap-center cursor-zoom-in overflow-hidden rounded-[30px] border-0 bg-transparent p-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                                    aria-label={`Powiększ: ${item.alt}`}
                                >
                                    <img
                                        src={landingImageThumbSrc(item.src)}
                                        alt={item.alt}
                                        className="pointer-events-none block min-h-0 h-full w-full object-cover"
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

            {/* Lightbox: tło lub zdjęcie zamyka; strzałki / klawisze zmieniają slajd */}
            {lightboxIndex !== null && galleryItems[lightboxIndex] && (
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
                                src={galleryItems[lightboxIndex].src}
                                alt={galleryItems[lightboxIndex].alt}
                                className="max-h-[85vh] max-w-full rounded-2xl object-contain"
                            />
                        </button>
                    </div>
                </div>
            )}

            {/* KEY METRICS — te same dane co na /wypozyczalnia (RENTAL_CARS / carRental.specs) */}
            <section className="bg-background border-b border-border">
                <div className="container mx-auto px-4 md:px-6 py-8">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 divide-x divide-border/50">
                        <div className="text-center px-2">
                            <p className="text-3xl font-bold tracking-tighter">{carRental.specs?.acceleration ?? '—'}</p>
                            <p className="text-xs text-muted-foreground uppercase tracking-widest mt-1">0-100 km/h</p>
                        </div>
                        <div className="text-center px-2">
                            <p className="text-3xl font-bold tracking-tighter">{carRental.specs?.range ?? '—'}</p>
                            <p className="text-xs text-muted-foreground uppercase tracking-widest mt-1">Zasięg</p>
                        </div>
                        <div className="text-center px-2">
                            <p className="text-3xl font-bold tracking-tighter">{carRental.specs?.seating ?? '—'}</p>
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

                        <div className="not-prose mx-auto mt-14 max-w-3xl border-t border-border pt-12">
                            <h2 className="text-center text-2xl font-bold text-foreground">Najczęściej zadawane pytania</h2>
                            <p className="mt-2 text-center text-muted-foreground">
                                Krótkie odpowiedzi o autach elektrycznych i wynajmie — wspólne dla naszych modeli.
                            </p>
                            <div className="mt-8 space-y-2">
                                {RENTAL_LANDING_FAQ.map((item, index) => {
                                    const isOpen = openFaqIndex === index;
                                    return (
                                        <div key={item.question} className="overflow-hidden rounded-lg border border-border bg-card">
                                            <button
                                                type="button"
                                                className="flex w-full items-center justify-between gap-4 px-4 py-3 text-left text-base font-medium text-foreground transition-colors hover:bg-secondary/50"
                                                aria-expanded={isOpen}
                                                onClick={() => setOpenFaqIndex(isOpen ? -1 : index)}
                                            >
                                                <span>{item.question}</span>
                                                <ChevronDownIcon
                                                    className={`h-5 w-5 shrink-0 text-muted-foreground transition-transform ${isOpen ? 'rotate-180' : ''}`}
                                                    aria-hidden
                                                />
                                            </button>
                                            {isOpen && (
                                                <div className="border-t border-border px-4 py-3 text-sm leading-relaxed text-muted-foreground">
                                                    {item.answer}
                                                </div>
                                            )}
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>

                    {/* STICKY SIDEBAR — jak karta podsumowania na /rezerwacja */}
                    <div className="lg:col-span-1">
                        <div className="lg:sticky lg:top-24">
                            <div className="rounded-lg bg-secondary p-6">
                                <div className="flex justify-between gap-3 text-sm">
                                    <span className="text-muted-foreground">Cena od</span>
                                    <span className="shrink-0 text-right font-medium">
                                        {minPrice.toLocaleString('pl-PL')} zł / doba
                                    </span>
                                </div>
                                <Link
                                    to={`/wypozyczalnia?model=${carId}`}
                                    className="mt-6 flex h-14 w-full items-center justify-center gap-2 rounded-md bg-foreground text-lg font-semibold text-background transition-colors hover:bg-foreground/90"
                                >
                                    Wybierz termin
                                    <ArrowRightIcon className="h-5 w-5 shrink-0" aria-hidden />
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default RentalCarLandingPage;
