import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { getShuffledLandingGallery, landingImageThumbSrc } from '../configs/landingPageImages';
import { RENTAL_LANDING_FAQ } from '../configs/rentalLandingFaq';
import { useParams, Navigate, Link, NavLink } from 'react-router-dom';
import { CAR_FLEET } from '../configs/fleetConfig';
import { RENTAL_CARS } from '../configs/rentConfig';
import { getRentalLandingPageContent } from '../configs/rentalLandingPageContent';
import { TIKTOK_LANDING_TILES, tiktokEmbedSrc } from '../configs/tiktokLandingEmbeds';
import { Card, CardContent } from '../components/ui';
import Seo from '../components/Seo';
import { SEO_CONFIG } from '../configs/seoConfig';
import {
  BoltIcon,
  SparklesIcon,
  ShieldCheckIcon,
  KeyIcon,
  ArrowRightIcon,
  HomeIcon,
  XMarkIcon,
} from '../icons';
import { ChevronDownIcon } from '../components/HeroIcons';
import type { RentalLandingFeatureIconKey, SeoData } from '../types';

const RENTAL_LANDING_ICONS: Record<
  RentalLandingFeatureIconKey,
  React.ComponentType<React.SVGProps<SVGSVGElement>>
> = {
  bolt: BoltIcon,
  sparkles: SparklesIcon,
  shieldCheck: ShieldCheckIcon,
  key: KeyIcon,
};

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
  /* Jeden rząd: wszystkie slajdy jak najwyższy box; stała wysokość 300px */
  .rental-car-landing .e2e-slide {
    min-height: 300px;
    max-height: 300px;
    align-self: stretch;
  }
  .rental-car-landing .e2e-slide--photo {
    position: relative;
    width: 100%;
    max-width: 500px;
  }
  /* Mobile: box ze zdjęciem max 80vw — wysokość wiersza nadal z .e2e-slide (300px), obraz object-cover dopasowuje kadrowanie */
  @media (max-width: 767px) {
    .rental-car-landing .e2e-slide--photo {
      width: 80vw;
      max-width: 80vw;
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

const TikTokViewIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    className="h-3.5 w-3.5 shrink-0 opacity-90"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    aria-hidden
    {...props}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M2.25 12s3.5-6.75 9.75-6.75S21.75 12 21.75 12s-3.5 6.75-9.75 6.75S2.25 12 2.25 12Z"
    />
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
  </svg>
);

/** Safari/WebKit: sama zmiana content na meta theme-color często nie odświeża paska adresu — klon wymusza ponowne odczytanie. */
function applyThemeColorMeta(content: string) {
    let el = document.querySelector('meta[name="theme-color"]') as HTMLMetaElement | null;
    if (!el) {
        el = document.createElement('meta');
        el.setAttribute('name', 'theme-color');
        document.head.appendChild(el);
    }
    el.setAttribute('content', content);
    const parent = el.parentNode;
    if (parent) {
        const clone = el.cloneNode(true) as HTMLMetaElement;
        parent.replaceChild(clone, el);
    }
}

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

    const kmLimitLabel = useMemo(() => {
        const tiers = carRental.priceTiers;
        if (!tiers?.length) return '—';
        const mins = tiers.map((t) => t.kmLimitPerDay);
        const lo = Math.min(...mins);
        const hi = Math.max(...mins);
        if (lo === hi) return `${lo} km / dobę`;
        return `${lo}–${hi} km / dobę`;
    }, [carRental.priceTiers]);

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
    const [tiktokModalVideoId, setTiktokModalVideoId] = useState<string | null>(null);
    const [mobileRentSheetOpen, setMobileRentSheetOpen] = useState(true);
    const themeColorOnEnterRef = useRef<string | null>(null);
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

    useEffect(() => {
        if (tiktokModalVideoId === null) return;
        const prev = document.body.style.overflow;
        document.body.style.overflow = 'hidden';
        const onKey = (e: KeyboardEvent) => {
            if (e.key === 'Escape') setTiktokModalVideoId(null);
        };
        window.addEventListener('keydown', onKey);
        return () => {
            document.body.style.overflow = prev;
            window.removeEventListener('keydown', onKey);
        };
    }, [tiktokModalVideoId]);

    useEffect(() => {
        const m = document.querySelector('meta[name="theme-color"]');
        themeColorOnEnterRef.current = m?.getAttribute('content') ?? null;
        return () => {
            const meta = document.querySelector('meta[name="theme-color"]');
            const v = themeColorOnEnterRef.current;
            if (meta && v !== null) meta.setAttribute('content', v);
        };
    }, []);

    /** Po zamknięciu pływaka (mobile): theme-color → transparent; WebKit często ignoruje jedną zmianę — drugie ustawienie po 350ms (koniec animacji slide). */
    useEffect(() => {
        if (typeof window === 'undefined') return;
        if (!window.matchMedia('(max-width: 767px)').matches) return;
        if (mobileRentSheetOpen) return;

        applyThemeColorMeta('transparent');
        const t = window.setTimeout(() => applyThemeColorMeta('transparent'), 350);
        return () => clearTimeout(t);
    }, [mobileRentSheetOpen]);

    const seoData: SeoData = {
      ...SEO_CONFIG['/wypozycz/:carId'],
      title: SEO_CONFIG['/wypozycz/:carId'].title.replace('{carName}', carFleet.name),
      description: SEO_CONFIG['/wypozycz/:carId'].description.replace('{carName}', carFleet.name),
      ogTitle: (SEO_CONFIG['/wypozycz/:carId'].ogTitle || '').replace('{carName}', carFleet.name),
      ogDescription: (SEO_CONFIG['/wypozycz/:carId'].ogDescription || '').replace('{carName}', carFleet.name),
      ogImage: galleryItems[0]?.src,
    };

    /** PNG z `rentConfig.imageUrl` (ikona auta w pływającym CTA na mobile) */
    const carRentIconSrc = carRental.imageUrl[0] ?? carFleet.imageUrl[0] ?? galleryItems[0]?.src;

    const landingContent = useMemo(
        () =>
            getRentalLandingPageContent(
                carId,
                carFleet.name,
                carFleet.specs?.range ?? carRental.specs?.range ?? '—',
            ),
        [carId, carFleet.name, carFleet.specs?.range, carRental.specs?.range],
    );

    return (
        <div
            className={`rental-car-landing bg-background${mobileRentSheetOpen ? ' max-md:pb-[7.5rem]' : ''}`}
        >
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
                                            {landingContent.heroSubtitle}
                                        </p>
                                        <div className="mt-5 flex flex-wrap items-center justify-start gap-x-4 gap-y-2">
                                            <Link
                                                to={`/wypozyczalnia?model=${carId}`}
                                                className="inline-flex h-12 shrink-0 items-center justify-center rounded-md bg-foreground px-8 text-base font-semibold text-background transition-colors hover:bg-foreground/90"
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
                                    className="e2e-slide e2e-slide--photo group relative flex h-full min-h-0 shrink-0 snap-center cursor-zoom-in flex-col overflow-hidden rounded-[30px] border-0 bg-transparent p-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                                    aria-label={`Powiększ: ${item.alt}`}
                                >
                                    <span className="relative min-h-0 w-full flex-1 basis-0">
                                        <img
                                            src={landingImageThumbSrc(item.src)}
                                            alt={item.alt}
                                            className="pointer-events-none absolute inset-0 z-0 h-full w-full min-h-0 object-cover"
                                            loading={index < 2 ? 'eager' : 'lazy'}
                                            decoding="async"
                                        />
                                    </span>
                                    <span
                                        className="pointer-events-none absolute inset-0 z-[1] flex items-center justify-center rounded-[30px] bg-black/0 transition-colors group-hover:bg-black/25"
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
            <section className="border-b border-border">
                <div className="container mx-auto px-4 md:px-6 py-8">
                    <div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
                        <div className="rounded-lg border border-border bg-background px-4 py-4 text-left">
                            <p className="text-sm font-medium text-foreground">0-100 km/h</p>
                            <p className="mt-2 text-3xl font-bold tracking-tighter text-foreground">
                                {carRental.specs?.acceleration ?? '—'}
                            </p>
                        </div>
                        <div className="rounded-lg border border-border bg-background px-4 py-4 text-left">
                            <p className="text-sm font-medium text-foreground">Zasięg</p>
                            <p className="mt-2 text-3xl font-bold tracking-tighter text-foreground">
                                {carRental.specs?.range ?? '—'}
                            </p>
                        </div>
                        <div className="rounded-lg border border-border bg-background px-4 py-4 text-left">
                            <p className="text-sm font-medium text-foreground">Miejsca</p>
                            <p className="mt-2 text-3xl font-bold tracking-tighter text-foreground">
                                {carRental.specs?.seating ?? '—'}
                            </p>
                        </div>
                        <div className="rounded-lg border border-border bg-background px-4 py-4 text-left">
                            <p className="text-sm font-medium text-foreground">Cena od / doba</p>
                            <p className="mt-2 text-3xl font-bold tracking-tighter text-foreground">
                                {minPrice.toLocaleString('pl-PL')} zł
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* WHY THIS CAR + TikTok (2 kolumny na lg) */}
            <section className="py-16 md:py-24 bg-secondary/30">
                <div className="container mx-auto px-4 md:px-6">
                    <div className="text-center max-w-2xl mx-auto mb-12 md:mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">{landingContent.whyHeading}</h2>
                        <p className="text-muted-foreground text-lg">{landingContent.whyLead}</p>
                    </div>

                    {TIKTOK_LANDING_TILES.length > 0 ? (
                        <div className="flex flex-col gap-10 lg:flex-row lg:items-stretch lg:gap-10 xl:gap-12">
                            <div className="grid min-w-0 flex-1 grid-cols-2 gap-4 md:gap-6">
                                {landingContent.features.map((feature, idx) => {
                                    const FeatureIcon = RENTAL_LANDING_ICONS[feature.icon];
                                    return (
                                        <Card
                                            key={idx}
                                            className="border-none shadow-md transition-all duration-300 hover:shadow-xl"
                                        >
                                            <CardContent className="pt-6">
                                                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
                                                    <FeatureIcon className="h-6 w-6" aria-hidden />
                                                </div>
                                                <h3 className="mb-2 text-base font-bold md:text-lg">{feature.title}</h3>
                                                <p className="text-sm text-muted-foreground">{feature.desc}</p>
                                            </CardContent>
                                        </Card>
                                    );
                                })}
                            </div>
                            <aside className="mx-auto w-full max-w-sm shrink-0 lg:mx-0 lg:w-72">
                                <h3 className="mb-4 text-center text-lg font-bold lg:text-left">
                                    Zobacz nasze social media
                                </h3>
                                <ul className="mx-auto flex max-w-[280px] flex-col gap-3 lg:mx-0">
                                    {TIKTOK_LANDING_TILES.map((tile) => (
                                        <li key={tile.videoId}>
                                            <button
                                                type="button"
                                                onClick={() => setTiktokModalVideoId(tile.videoId)}
                                                className="group relative aspect-[9/16] w-full max-h-[min(70vh,420px)] min-h-[200px] overflow-hidden rounded-2xl border border-border/60 bg-muted text-left shadow-md transition-all hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                                            >
                                                <img
                                                    src={tile.thumbSrc}
                                                    alt={tile.alt ?? 'Miniatura filmu TikTok'}
                                                    className="absolute inset-0 h-full w-full object-cover transition-transform group-hover:scale-[1.02]"
                                                    loading="lazy"
                                                    decoding="async"
                                                />
                                                <span className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-black/10" />
                                                <span className="absolute left-1/2 top-1/2 flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-foreground shadow-lg transition-transform group-hover:scale-105">
                                                    <svg
                                                        className="ml-0.5 h-7 w-7"
                                                        viewBox="0 0 24 24"
                                                        fill="currentColor"
                                                        aria-hidden
                                                    >
                                                        <path d="M8 5.14v13.72L19 12 8 5.14z" />
                                                    </svg>
                                                </span>
                                                <span className="absolute bottom-0 left-0 right-0 flex items-center gap-1.5 px-3 py-2.5 text-xs font-medium text-white">
                                                    <TikTokViewIcon />
                                                    {tile.viewCountLabel}
                                                </span>
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                            </aside>
                        </div>
                    ) : (
                        <div className="grid grid-cols-2 gap-4 md:gap-6">
                            {landingContent.features.map((feature, idx) => {
                                const FeatureIcon = RENTAL_LANDING_ICONS[feature.icon];
                                return (
                                    <Card
                                        key={idx}
                                        className="border-none shadow-md transition-all duration-300 hover:shadow-xl"
                                    >
                                        <CardContent className="pt-6">
                                            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
                                                <FeatureIcon className="h-6 w-6" aria-hidden />
                                            </div>
                                            <h3 className="mb-2 text-lg font-bold">{feature.title}</h3>
                                            <p className="text-sm text-muted-foreground">{feature.desc}</p>
                                        </CardContent>
                                    </Card>
                                );
                            })}
                        </div>
                    )}
                </div>
            </section>

            {/* SEO CONTENT SECTION */}
            <section className="py-16 bg-background">
                <div className="container mx-auto px-4 md:px-6">
                    <div className="grid lg:grid-cols-3 lg:gap-12">
                        <div className="lg:col-span-2">
                            <div
                                className="prose prose-zinc max-w-none"
                                dangerouslySetInnerHTML={{ __html: landingContent.longDescriptionHtml }}
                            />
                        </div>

                        {/* STICKY SIDEBAR — jak karta podsumowania na /rezerwacja */}
                        <div className="lg:col-span-1 mt-10 lg:mt-0">
                            <div className="lg:sticky lg:top-24">
                                <div className="rounded-lg bg-secondary p-6">
                                    <p className="text-sm text-muted-foreground">Cena za dobę</p>
                                    <p className="mt-1 flex flex-wrap items-baseline gap-x-1.5 gap-y-0 text-4xl font-bold tracking-tight text-foreground tabular-nums">
                                        <span className="text-sm font-medium text-muted-foreground">od</span>
                                        <span>{minPrice.toLocaleString('pl-PL')}</span>
                                        <span className="text-2xl font-semibold">zł</span>
                                    </p>
                                    <dl className="mt-6 space-y-2.5 text-sm">
                                        <div className="flex justify-between gap-4">
                                            <dt className="text-muted-foreground shrink-0">Kaucja:</dt>
                                            <dd className="text-right font-medium text-foreground tabular-nums">
                                                {carRental.deposit != null
                                                    ? `${carRental.deposit.toLocaleString('pl-PL')} zł`
                                                    : '—'}
                                            </dd>
                                        </div>
                                        <div className="flex justify-between gap-4">
                                            <dt className="text-muted-foreground shrink-0">Limit kilometrów:</dt>
                                            <dd className="text-right font-medium text-foreground">{kmLimitLabel}</dd>
                                        </div>
                                        <div className="flex justify-between gap-4">
                                            <dt className="text-muted-foreground shrink-0">Koszt poza limitem:</dt>
                                            <dd className="text-right font-medium text-foreground tabular-nums">
                                                {carRental.costPerKmOverLimit.toLocaleString('pl-PL')} zł / km
                                            </dd>
                                        </div>
                                    </dl>
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

                    {/* FAQ — osobny blok pod opisem SEO, szerokość 2 kolumn siatki (wyrównanie z treścią nad sidebarem) */}
                    <div className="mt-14 border-t border-border pt-12 lg:grid lg:grid-cols-3 lg:gap-12">
                        <div className="lg:col-span-2 not-prose">
                            <h2 className="text-2xl font-bold text-foreground">Najczęściej zadawane pytania</h2>
                            <p className="mt-2 text-muted-foreground">
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
                </div>
            </section>

            {/* TikTok: modal (iframe `embed/v2` — ten sam player co oficjalne osadzanie) */}
            {tiktokModalVideoId && (
                <div
                    className="fixed inset-0 z-[60] flex items-center justify-center bg-black/75 p-4"
                    onClick={() => setTiktokModalVideoId(null)}
                    role="dialog"
                    aria-modal="true"
                    aria-label="Film TikTok"
                >
                    <div
                        className="relative w-full max-w-lg rounded-2xl bg-background p-1 shadow-2xl"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button
                            type="button"
                            className="absolute -right-1 -top-1 z-10 flex h-10 w-10 items-center justify-center rounded-full border border-border bg-background text-foreground shadow-md transition-colors hover:bg-secondary md:-right-2 md:-top-2"
                            onClick={() => setTiktokModalVideoId(null)}
                            aria-label="Zamknij"
                        >
                            <XMarkIcon className="h-5 w-5" />
                        </button>
                        <iframe
                            title="TikTok"
                            src={tiktokEmbedSrc(tiktokModalVideoId)}
                            className="h-[min(80vh,720px)] w-full rounded-[14px] border-0"
                            allow="encrypted-media; fullscreen; picture-in-picture; autoplay"
                            allowFullScreen
                        />
                    </div>
                </div>
            )}

            {/* Mobile: pływający pasek CTA (tylko karta ma bg-white; zamknięcie = slide w dół + theme-color) */}
            <div
                className={`fixed inset-x-0 bottom-0 z-40 transition-transform duration-300 ease-out motion-reduce:transition-none motion-reduce:duration-0 md:hidden ${
                    mobileRentSheetOpen ? 'translate-y-0' : 'translate-y-full pointer-events-none'
                }`}
                style={{ paddingBottom: 'env(safe-area-inset-bottom, 0px)' }}
                aria-hidden={!mobileRentSheetOpen}
            >
                    <div className="rounded-t-3xl border border-border/60 border-b-0 bg-white px-4 pb-3 shadow-[0_-8px_30px_rgba(0,0,0,0.08)]">
                        <div className="flex items-center gap-3">
                            {carRentIconSrc ? (
                                <img
                                    src={carRentIconSrc}
                                    alt=""
                                    className="h-[50px] w-auto shrink-0 object-contain"
                                    height={50}
                                    loading="lazy"
                                    decoding="async"
                                />
                            ) : (
                                <span className="h-[50px] w-[50px] shrink-0" aria-hidden />
                            )}
                            <p className="min-w-0 flex-1 text-sm font-medium leading-snug text-foreground">
                                Wybierz termin wynajmu
                            </p>
                            <button
                                type="button"
                                onClick={() => setMobileRentSheetOpen(false)}
                                className="-mr-1 -mt-1 shrink-0 rounded-md p-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                                aria-label="Zamknij"
                            >
                                <XMarkIcon className="h-5 w-5" />
                            </button>
                        </div>
                        <Link
                            to={`/wypozyczalnia?model=${carId}`}
                            className="flex h-9 w-full items-center justify-center rounded-full bg-foreground text-sm font-semibold text-background transition-colors hover:bg-foreground/90"
                        >
                            Zarezerwuj
                        </Link>
                    </div>
            </div>
        </div>
    );
};

export default RentalCarLandingPage;
