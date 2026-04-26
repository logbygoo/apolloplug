import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { getShuffledLandingGallery, landingImageThumbSrc } from '../configs/landingPageImages';
import {
    RENTAL_LANDING_FAQ,
    RENTAL_LANDING_FAQ_CATEGORIES,
    type RentalLandingFaqCategory,
} from '../configs/rentalLandingFaq';
import { useParams, Navigate, Link, NavLink } from 'react-router-dom';
import { CAR_FLEET } from '../configs/fleetConfig';
import { RENTAL_CARS } from '../configs/rentConfig';
import { getRentalLandingPageContent } from '../configs/rentalLandingPageContent';
import { TIKTOK_LANDING_TILES } from '../configs/tiktokLandingEmbeds';
import { RentalAvailabilityCalendar } from '../components/RentalAvailabilityCalendar';
import RentalPriceTable from '../components/RentalPriceTable';
import { LandingTiktokSocialBlock } from '../components/LandingTiktokSocialBlock';
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
  ChevronDownIcon,
} from '../icons';
import type { RentalLandingFeatureIconKey, SeoData } from '../types';
import { RENTAL_CAR_LANDING_E2E_STYLES, RENTAL_GALLERY_E2E_SLIDER_GAP } from '../configs/rentalGalleryE2eStyles';
import { RentalGalleryEdgeScroller } from '../components/RentalGalleryEdgeScroller';
import { useRentalE2ePointerSlider } from '../hooks/useRentalE2ePointerSlider';

const RENTAL_LANDING_ICONS: Record<
  RentalLandingFeatureIconKey,
  React.ComponentType<React.SVGProps<SVGSVGElement>>
> = {
  bolt: BoltIcon,
  sparkles: SparklesIcon,
  shieldCheck: ShieldCheckIcon,
  key: KeyIcon,
};

const MagnifyingGlassIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
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

    /** Trzy losowe inne auta z `RENTAL_CARS` (także `visible: false`), poza bieżącym `carId`. */
    const otherElectricPicks = useMemo(() => {
        const pool = RENTAL_CARS.filter((c) => c.id !== carId);
        const a = [...pool];
        for (let i = a.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [a[i], a[j]] = [a[j]!, a[i]!];
        }
        return a.slice(0, 3);
    }, [carId]);

    const keyMetricsBlockRef = useRef<HTMLDivElement>(null);
    const { e2eSliderDrag, onPointerDownCapture, onPointerMove, onPointerUp } = useRentalE2ePointerSlider();

    const onGalleryPhotoClick = useCallback(
        (index: number) => (e: React.MouseEvent) => {
            if (e2eSliderDrag.current.blockClick) {
                e.preventDefault();
                e.stopPropagation();
                e2eSliderDrag.current.blockClick = false;
                return;
            }
            setLightboxIndex(index);
        },
        [],
    );

    const kmLimitLabel = useMemo(() => {
        const tiers = carRental.priceTiers;
        if (!tiers?.length) return '-';
        const mins = tiers.map((t) => t.kmLimitPerDay);
        const lo = Math.min(...mins);
        const hi = Math.max(...mins);
        if (lo === hi) return `${lo} km/db`;
        return `${lo}–${hi} km/db`;
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
    const [selectedFaqCategory, setSelectedFaqCategory] = useState<RentalLandingFaqCategory>(
        RENTAL_LANDING_FAQ_CATEGORIES[0],
    );
    const [isFaqCategoryAnimating, setIsFaqCategoryAnimating] = useState(false);
    const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
    const [mobileRentSheetOpen, setMobileRentSheetOpen] = useState(true);
    const faqCategorySwitchTimeoutRef = useRef<number | null>(null);
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

    const filteredFaqItems = useMemo(
        () => RENTAL_LANDING_FAQ.filter((item) => item.categories.includes(selectedFaqCategory)),
        [selectedFaqCategory],
    );

    const handleFaqCategoryChange = useCallback(
        (category: RentalLandingFaqCategory) => {
            if (category === selectedFaqCategory || isFaqCategoryAnimating) return;

            if (faqCategorySwitchTimeoutRef.current != null) {
                window.clearTimeout(faqCategorySwitchTimeoutRef.current);
            }

            setIsFaqCategoryAnimating(true);
            faqCategorySwitchTimeoutRef.current = window.setTimeout(() => {
                setSelectedFaqCategory(category);
                setOpenFaqIndex(0);
                setIsFaqCategoryAnimating(false);
                faqCategorySwitchTimeoutRef.current = null;
            }, 140);
        },
        [selectedFaqCategory, isFaqCategoryAnimating],
    );

    useEffect(
        () => () => {
            if (faqCategorySwitchTimeoutRef.current != null) {
                window.clearTimeout(faqCategorySwitchTimeoutRef.current);
            }
        },
        [],
    );

    useEffect(() => {
        if (lightboxIndex === null) return;
        const prev = document.body.style.overflow;
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = prev;
        };
    }, [lightboxIndex]);

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
            <style>{RENTAL_CAR_LANDING_E2E_STYLES}</style>
            <Seo {...seoData} />

            {/* Galeria E2E: pierwszy slajd = szary box z okruszkami + h1 (jak header), potem zdjęcia; reszta paska biała */}
            <section className="w-full bg-white">
                <RentalGalleryEdgeScroller>
                    <section
                        className="e2e-slider scroll-smooth cursor-grab select-none pt-4"
                        style={RENTAL_GALLERY_E2E_SLIDER_GAP}
                        onPointerDownCapture={onPointerDownCapture}
                        onPointerMove={onPointerMove}
                        onPointerUp={onPointerUp}
                        onPointerCancel={onPointerUp}
                    >
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
                                                to={`/rezerwacja/${carId}`}
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
                                    onClick={onGalleryPhotoClick(index)}
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
                </RentalGalleryEdgeScroller>
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

            {/* KEY METRICS + TikTok: lewo 2×2 kafle (przyspieszenie, zasięg, miejsca, cena), prawo social */}
            <section className="border-b border-border">
                <div className="container mx-auto px-4 md:px-6 py-8">
                    {TIKTOK_LANDING_TILES.length > 0 ? (
                        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:items-start lg:gap-6">
                            <div ref={keyMetricsBlockRef} className="min-w-0 w-full">
                                <div className="grid grid-cols-2 gap-3 md:gap-4">
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
                            <LandingTiktokSocialBlock alignWithRef={keyMetricsBlockRef} />
                        </div>
                    ) : (
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
                    )}
                </div>
            </section>

            {/* WHY THIS CAR */}
            <section className="py-16 md:py-24 bg-secondary/30">
                <div className="container mx-auto px-4 md:px-6">
                    <div className="text-center max-w-2xl mx-auto mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">{landingContent.whyHeading}</h2>
                        <p className="text-muted-foreground text-lg">{landingContent.whyLead}</p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {landingContent.features.map((feature, idx) => {
                            const FeatureIcon = RENTAL_LANDING_ICONS[feature.icon];
                            return (
                                <Card key={idx} className="border-none shadow-md hover:shadow-xl transition-all duration-300">
                                    <CardContent className="pt-6">
                                        <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4 text-primary">
                                            <FeatureIcon className="w-6 h-6" aria-hidden />
                                        </div>
                                        <h3 className="font-bold text-lg mb-2">{feature.title}</h3>
                                        <p className="text-sm text-muted-foreground">{feature.desc}</p>
                                    </CardContent>
                                </Card>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* SEO CONTENT SECTION */}
            <section className="py-16 bg-background">
                <div className="container mx-auto px-4 md:px-6">
                    <div className="grid lg:grid-cols-3 lg:gap-12">
                        <div className="lg:col-span-2">
                            <div
                                className="prose prose-zinc max-w-none [&_h2]:mt-0"
                                dangerouslySetInnerHTML={{ __html: landingContent.longDescriptionHtml }}
                            />
                            {carRental.priceTiers && carRental.priceTiers.length > 0 && (
                                <div className="not-prose mt-10">
                                    <h2 className="m-0 text-2xl font-bold text-foreground">
                                        Cennik Wypożyczenia {carFleet.name}
                                    </h2>
                                    <RentalPriceTable car={carRental} className="mt-4" showHeading={false} />
                                </div>
                            )}
                        </div>

                        {/* Prawa kolumna: karta ceny + kalendarz (bez sticky — kalendarz nie wjeżdża pod kartę) */}
                        <div className="lg:col-span-1 mt-10 lg:mt-0">
                            <div className="rounded-lg bg-secondary p-6">
                                    <div className="flex w-full min-w-0 flex-nowrap items-end justify-between gap-3">
                                        <p className="m-0 shrink-0 -translate-y-[6px] text-sm leading-none text-muted-foreground">
                                            Cena za dobę
                                        </p>
                                        <p className="m-0 min-w-0 text-right text-4xl font-bold leading-none tracking-tight text-foreground tabular-nums whitespace-nowrap">
                                            <span className="text-2xl font-semibold">od</span>{' '}
                                            {minPrice.toLocaleString('pl-PL')}{' '}
                                            <span className="text-2xl font-semibold">zł</span>
                                        </p>
                                    </div>
                                    <dl className="mt-4 space-y-2.5 text-sm">
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
                                                {carRental.costPerKmOverLimit.toLocaleString('pl-PL')} zł/km
                                            </dd>
                                        </div>
                                    </dl>
                                    <Link
                                        to={`/rezerwacja/${carId}`}
                                        className="mt-6 flex h-14 w-full items-center justify-center gap-2 rounded-md bg-foreground text-lg font-semibold text-background transition-colors hover:bg-foreground/90"
                                    >
                                        Zarezerwuj
                                        <ArrowRightIcon className="h-5 w-5 shrink-0" aria-hidden />
                                    </Link>
                            </div>
                            <RentalAvailabilityCalendar
                                className="mt-8 max-w-sm lg:ml-auto"
                                carId={carId}
                            />
                        </div>
                    </div>

                    {/* FAQ — osobny blok pod opisem SEO, szerokość 2 kolumn siatki (wyrównanie z treścią nad sidebarem) */}
                    <div className="mt-14 border-t border-border pt-12 lg:grid lg:grid-cols-3 lg:gap-12">
                        <div className="lg:col-span-2 not-prose">
                            <h2 className="text-2xl font-bold text-foreground">Najczęściej zadawane pytania</h2>
                            <p className="mt-2 text-muted-foreground">
                                Najważniejsze pytania i odpowiedzi na temat wypożyczenia aut elektrycznych
                            </p>
                            <div
                                className={`mt-8 space-y-2 transition-all duration-200 ${
                                    isFaqCategoryAnimating ? 'translate-y-1 opacity-60' : 'translate-y-0 opacity-100'
                                }`}
                            >
                                {filteredFaqItems.map((item, index) => {
                                    const isOpen = openFaqIndex === index;
                                    return (
                                        <div
                                            key={`${selectedFaqCategory}-${item.question}`}
                                            className="overflow-hidden rounded-lg border border-border bg-card"
                                        >
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
                                {filteredFaqItems.length === 0 && (
                                    <div className="rounded-lg border border-border bg-card px-4 py-4 text-sm text-muted-foreground">
                                        Brak pytań w tej kategorii.
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className="mt-8 lg:col-span-1 lg:mt-0">
                            <div className="lg:sticky lg:top-24">
                                <div className="rounded-lg border border-border bg-card p-4">
                                    <p className="text-sm font-semibold text-foreground">Kategorie FAQ</p>
                                    <div className="mt-3 space-y-2">
                                        {RENTAL_LANDING_FAQ_CATEGORIES.map((category) => {
                                            const isActive = selectedFaqCategory === category;
                                            return (
                                                <button
                                                    key={category}
                                                    type="button"
                                                    onClick={() => handleFaqCategoryChange(category)}
                                                    className={`w-full rounded-md border px-3 py-2 text-left text-sm transition-colors ${
                                                        isActive
                                                            ? 'border-foreground bg-foreground text-background'
                                                            : 'border-border bg-background text-foreground hover:bg-secondary/70'
                                                    }`}
                                                    aria-pressed={isActive}
                                                >
                                                    {category}
                                                </button>
                                            );
                                        })}
                                    </div>
                                    <p className="mt-4 text-sm text-muted-foreground">
                                        Masz więcej pytań? Przejdź na{' '}
                                        <Link to="/kontakt" className="font-medium text-foreground underline underline-offset-2">
                                            /kontakt
                                        </Link>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {otherElectricPicks.length > 0 && (
                        <div className="mt-14 not-prose border-t border-border pt-12">
                            <h2 className="text-2xl font-bold text-foreground">Inne auta elektryczne</h2>
                            <p className="mt-2 text-muted-foreground">
                                Sprawdź nasze inne elektryczne auta na wynajem
                            </p>
                            <ul className="mt-8 grid list-none grid-cols-1 gap-4 p-0 sm:grid-cols-2 lg:grid-cols-3">
                                {otherElectricPicks.map((c) => {
                                    const fleetMeta = CAR_FLEET.find((f) => f.id === c.id);
                                    const title = fleetMeta?.name ?? c.name;
                                    const fromPrice =
                                        c.priceTiers && c.priceTiers.length > 0
                                            ? Math.min(...c.priceTiers.map((t) => t.pricePerDay))
                                            : c.pricePerDay;
                                    return (
                                        <li key={c.id} className="min-w-0">
                                            <Link
                                                to={`/wypozycz/${c.id}`}
                                                className="group flex h-full min-h-0 flex-col overflow-hidden rounded-lg border border-border bg-white transition-colors hover:border-foreground/25 dark:bg-card"
                                            >
                                                <div className="box-border aspect-[5/3] w-full overflow-hidden bg-muted/40 p-3 sm:p-4">
                                                    <img
                                                        src={c.imageUrl[0]}
                                                        alt={title}
                                                        className="h-full w-full min-h-0 min-w-0 object-contain object-center transition-transform group-hover:scale-[1.02]"
                                                        loading="lazy"
                                                        decoding="async"
                                                    />
                                                </div>
                                                <div className="flex min-h-0 flex-1 flex-col p-4">
                                                    <h3 className="text-base font-semibold leading-snug text-foreground">
                                                        {title}
                                                    </h3>
                                                    <p className="mt-2 text-sm text-muted-foreground">
                                                        Cena od{' '}
                                                        <span className="font-semibold tabular-nums text-foreground">
                                                            {fromPrice.toLocaleString('pl-PL')}
                                                        </span>
                                                        <span className="text-foreground/90"> zł / doba</span>
                                                    </p>
                                                </div>
                                            </Link>
                                        </li>
                                    );
                                })}
                            </ul>
                        </div>
                    )}
                </div>
            </section>

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
                                Rozpocznij proces wypożyczenia
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
                            to={`/rezerwacja/${carId}`}
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
