import React, { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
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
import {
  TIKTOK_LANDING_TILES,
  TIKTOK_PLAYER_ORIGIN,
  postTiktokPlayerCommand,
  tiktokEmbedSrc,
} from '../configs/tiktokLandingEmbeds';
import { Card, CardContent } from '../components/ui';
import Seo from '../components/Seo';
import { SEO_CONFIG } from '../configs/seoConfig';
import { SOCIAL_MEDIA_LINKS } from '../configs/socialLinks';
import {
  BoltIcon,
  SparklesIcon,
  ShieldCheckIcon,
  KeyIcon,
  ArrowRightIcon,
  HomeIcon,
  XMarkIcon,
  TikTokIcon,
  InstagramIcon,
  FacebookIcon,
  YoutubeIcon,
  ChevronDownIcon,
} from '../icons';
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

const SOCIAL_HEADER_ICONS: Record<
  (typeof SOCIAL_MEDIA_LINKS)[number]['id'],
  React.FC<React.SVGProps<SVGSVGElement>>
> = {
  tiktok: TikTokIcon,
  instagram: InstagramIcon,
  facebook: FacebookIcon,
  youtube: YoutubeIcon,
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

  /* Cienie inset na przewijaku przyciemniały boki vs. tło pod nagłówkiem; zostawiam jednolite tło rodzica. */
  .rental-car-landing .tiktok-social-hscroll {
    width: 100%;
    max-width: 100%;
    height: 100%;
    min-height: 0;
    flex: 1 1 0;
    overflow-x: auto;
    overflow-y: hidden;
    -webkit-overflow-scrolling: touch;
    overscroll-behavior-x: contain;
    scrollbar-width: none;
    -ms-overflow-style: none;
    touch-action: pan-x pan-y;
    scroll-behavior: auto;
  }
  .rental-car-landing .tiktok-social-hscroll::-webkit-scrollbar {
    height: 0;
    display: none;
  }
  .rental-car-landing .tiktok-social-track {
    display: flex;
    align-items: stretch;
    align-self: stretch;
    gap: 0.75rem;
    width: max-content;
    min-height: 0;
    height: 100%;
    padding-left: 5px;
    padding-right: 5px;
  }
  .rental-car-landing .tiktok-social-slide {
    flex: 0 0 auto;
    display: flex;
    align-items: stretch;
    height: 100%;
    width: auto;
    aspect-ratio: 9 / 16;
    max-height: 100%;
    min-height: 0;
    min-width: 0;
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

const TikTokViewIcon: React.FC<React.SVGProps<SVGSVGElement>> = ({ className, ...props }) => (
  <svg
    className={['h-3.5 w-3.5 shrink-0 text-current opacity-90', className].filter(Boolean).join(' ')}
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

    const keyMetricsBlockRef = useRef<HTMLDivElement>(null);
    const [keyMetricsBlockHeight, setKeyMetricsBlockHeight] = useState<number | null>(null);

    const syncKeyMetricsBlockHeight = useCallback(() => {
        const el = keyMetricsBlockRef.current;
        if (!el) return;
        setKeyMetricsBlockHeight(Math.round(el.getBoundingClientRect().height));
    }, []);

    const tiktokDrag = useRef<{
        down: boolean;
        pointerId: number;
        startX: number;
        startScroll: number;
        blockClick: boolean;
        /** Z kafelka: przewijanie na `window` (bez `setPointerCapture` na sliderze, żeby `click` na button działał). */
        mode: 'window' | 'capture';
    }>({
        down: false,
        pointerId: -1,
        startX: 0,
        startScroll: 0,
        blockClick: false,
        mode: 'capture',
    });

    const onTiktokSliderPointerDown = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
        if (e.pointerType === 'touch') return;
        if (e.button !== 0) return;
        const el = e.currentTarget;
        const start = {
            down: true,
            pointerId: e.pointerId,
            startX: e.clientX,
            startScroll: el.scrollLeft,
            blockClick: false,
        };
        const fromButton = (e.target as HTMLElement | null)?.closest('button');

        if (fromButton) {
            /** `setPointerCapture` na sliderze gdy wskaźnik startuje na `button` — psuje późne `click` → modal. */
            tiktokDrag.current = { ...start, mode: 'window' };
            el.style.cursor = 'grabbing';
            const onWinMove = (ev: PointerEvent) => {
                const t = tiktokDrag.current;
                if (!t.down || ev.pointerId !== t.pointerId) return;
                const dx = ev.clientX - t.startX;
                if (Math.abs(dx) > 4) t.blockClick = true;
                el.scrollLeft = t.startScroll - dx;
            };
            const onWinEnd = (ev: PointerEvent) => {
                if (ev.pointerId !== start.pointerId) return;
                window.removeEventListener('pointermove', onWinMove, true);
                window.removeEventListener('pointerup', onWinEnd, true);
                window.removeEventListener('pointercancel', onWinEnd, true);
                tiktokDrag.current.down = false;
                tiktokDrag.current.mode = 'capture';
                el.style.cursor = '';
            };
            window.addEventListener('pointermove', onWinMove, true);
            window.addEventListener('pointerup', onWinEnd, true);
            window.addEventListener('pointercancel', onWinEnd, true);
            return;
        }

        tiktokDrag.current = { ...start, mode: 'capture' };
        el.setPointerCapture(e.pointerId);
        el.style.cursor = 'grabbing';
    }, []);

    const onTiktokSliderPointerMove = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
        const s = tiktokDrag.current;
        if (!s.down || e.pointerId !== s.pointerId || s.mode === 'window') return;
        const el = e.currentTarget;
        const dx = e.clientX - s.startX;
        if (Math.abs(dx) > 4) s.blockClick = true;
        el.scrollLeft = s.startScroll - dx;
    }, []);

    const onTiktokSliderPointerUp = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
        const s = tiktokDrag.current;
        if (!s.down || e.pointerId !== s.pointerId || s.mode === 'window') return;
        s.down = false;
        const el = e.currentTarget;
        el.style.cursor = '';
        try {
            el.releasePointerCapture(e.pointerId);
        } catch {
            /* no-op */
        }
    }, []);

    const onTiktokTileClick = useCallback(
        (videoId: string) => (e: React.MouseEvent) => {
            if (tiktokDrag.current.blockClick) {
                e.preventDefault();
                e.stopPropagation();
                tiktokDrag.current.blockClick = false;
                return;
            }
            setTiktokModalVideoId(videoId);
        },
        [],
    );

    const e2eSliderDrag = useRef<{
        down: boolean;
        pointerId: number;
        startX: number;
        startScroll: number;
        blockClick: boolean;
        mode: 'window' | 'capture';
    }>({
        down: false,
        pointerId: -1,
        startX: 0,
        startScroll: 0,
        blockClick: false,
        mode: 'capture',
    });

    const onE2eSliderPointerDown = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
        if (e.pointerType === 'touch') return;
        if (e.button !== 0) return;
        const el = e.currentTarget;
        const start = {
            down: true,
            pointerId: e.pointerId,
            startX: e.clientX,
            startScroll: el.scrollLeft,
            blockClick: false,
        };
        const fromInteractive = (e.target as HTMLElement | null)?.closest('button, a');

        if (fromInteractive) {
            e2eSliderDrag.current = { ...start, mode: 'window' };
            el.style.cursor = 'grabbing';
            const onWinMove = (ev: PointerEvent) => {
                const t = e2eSliderDrag.current;
                if (!t.down || ev.pointerId !== t.pointerId) return;
                const dx = ev.clientX - t.startX;
                if (Math.abs(dx) > 4) t.blockClick = true;
                el.scrollLeft = t.startScroll - dx;
            };
            const onWinEnd = (ev: PointerEvent) => {
                if (ev.pointerId !== start.pointerId) return;
                window.removeEventListener('pointermove', onWinMove, true);
                window.removeEventListener('pointerup', onWinEnd, true);
                window.removeEventListener('pointercancel', onWinEnd, true);
                e2eSliderDrag.current.down = false;
                e2eSliderDrag.current.mode = 'capture';
                el.style.cursor = '';
            };
            window.addEventListener('pointermove', onWinMove, true);
            window.addEventListener('pointerup', onWinEnd, true);
            window.addEventListener('pointercancel', onWinEnd, true);
            return;
        }

        e2eSliderDrag.current = { ...start, mode: 'capture' };
        el.setPointerCapture(e.pointerId);
        el.style.cursor = 'grabbing';
    }, []);

    const onE2eSliderPointerMove = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
        const s = e2eSliderDrag.current;
        if (!s.down || e.pointerId !== s.pointerId || s.mode === 'window') return;
        const el = e.currentTarget;
        const dx = e.clientX - s.startX;
        if (Math.abs(dx) > 4) s.blockClick = true;
        el.scrollLeft = s.startScroll - dx;
    }, []);

    const onE2eSliderPointerUp = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
        const s = e2eSliderDrag.current;
        if (!s.down || e.pointerId !== s.pointerId || s.mode === 'window') return;
        s.down = false;
        const el = e.currentTarget;
        el.style.cursor = '';
        try {
            el.releasePointerCapture(e.pointerId);
        } catch {
            /* no-op */
        }
    }, []);

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
    const [selectedFaqCategory, setSelectedFaqCategory] = useState<RentalLandingFaqCategory>(
        RENTAL_LANDING_FAQ_CATEGORIES[0],
    );
    const [isFaqCategoryAnimating, setIsFaqCategoryAnimating] = useState(false);
    const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
    const [tiktokModalVideoId, setTiktokModalVideoId] = useState<string | null>(null);
    const [mobileRentSheetOpen, setMobileRentSheetOpen] = useState(true);
    const faqCategorySwitchTimeoutRef = useRef<number | null>(null);
    const tiktokIframeRef = useRef<HTMLIFrameElement | null>(null);
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

    /** Odciszenie: autoplay w iframe często startuje wyciszony; dokumentacja: postMessage `unMute` po `onPlayerReady`. */
    useEffect(() => {
        if (tiktokModalVideoId === null) return;
        const unmute = () => postTiktokPlayerCommand(tiktokIframeRef.current, 'unMute');
        const onMessage = (ev: MessageEvent) => {
            if (ev.origin !== TIKTOK_PLAYER_ORIGIN) return;
            const d = ev.data as { type?: string } | null;
            if (d && typeof d === 'object' && d.type === 'onPlayerReady') {
                unmute();
            }
        };
        window.addEventListener('message', onMessage);
        const t0 = window.setTimeout(unmute, 400);
        const t1 = window.setTimeout(unmute, 1000);
        const t2 = window.setTimeout(unmute, 2200);
        return () => {
            window.removeEventListener('message', onMessage);
            clearTimeout(t0);
            clearTimeout(t1);
            clearTimeout(t2);
        };
    }, [tiktokModalVideoId]);

    useLayoutEffect(() => {
        if (TIKTOK_LANDING_TILES.length === 0) return;
        const el = keyMetricsBlockRef.current;
        if (!el) return;
        const ro = new ResizeObserver(() => {
            syncKeyMetricsBlockHeight();
        });
        ro.observe(el);
        syncKeyMetricsBlockHeight();
        window.addEventListener('resize', syncKeyMetricsBlockHeight);
        return () => {
            ro.disconnect();
            window.removeEventListener('resize', syncKeyMetricsBlockHeight);
        };
    }, [carRental, minPrice, syncKeyMetricsBlockHeight]);

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
                    <section
                        className="e2e-slider scroll-smooth cursor-grab select-none pt-4"
                        style={sliderGapStyle}
                        onPointerDownCapture={onE2eSliderPointerDown}
                        onPointerMove={onE2eSliderPointerMove}
                        onPointerUp={onE2eSliderPointerUp}
                        onPointerCancel={onE2eSliderPointerUp}
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
                            <aside
                                className="flex min-h-0 w-full min-w-0 flex-col"
                                style={keyMetricsBlockHeight != null ? { height: keyMetricsBlockHeight } : undefined}
                                aria-label="Filmy z TikToka"
                            >
                                <div className="flex min-h-0 w-full min-w-0 flex-1 flex-col overflow-hidden rounded-lg bg-muted/50">
                                    <div className="flex min-w-0 shrink-0 items-center justify-between gap-2 px-2 pt-2 pb-1.5">
                                        <p className="min-w-0 pr-1 text-sm font-bold leading-tight text-foreground">
                                            Ostatnio w naszych social mediach
                                        </p>
                                        <div className="flex shrink-0 items-center" aria-label="TikTok">
                                            {SOCIAL_MEDIA_LINKS.filter((l) => l.id === 'tiktok').map(({ id, href, label }) => {
                                                const Icon = SOCIAL_HEADER_ICONS[id];
                                                return (
                                                    <a
                                                        key={id}
                                                        href={href}
                                                        target="_blank"
                                                        rel="nofollow noopener noreferrer"
                                                        className="flex items-center gap-1.5 rounded-sm text-foreground/80 transition-colors hover:text-foreground"
                                                    >
                                                        <Icon className="h-4 w-4 shrink-0" aria-hidden />
                                                        <span className="text-sm font-medium">{label}</span>
                                                    </a>
                                                );
                                            })}
                                        </div>
                                    </div>
                                    <div
                                        className="tiktok-social-hscroll min-h-0 w-full cursor-grab select-none py-[5px]"
                                        onPointerDownCapture={onTiktokSliderPointerDown}
                                        onPointerMove={onTiktokSliderPointerMove}
                                        onPointerUp={onTiktokSliderPointerUp}
                                        onPointerCancel={onTiktokSliderPointerUp}
                                    >
                                    <div className="tiktok-social-track">
                                        {TIKTOK_LANDING_TILES.map((tile) => (
                                            <div key={tile.videoId} className="tiktok-social-slide">
                                                <button
                                                    type="button"
                                                    onClick={onTiktokTileClick(tile.videoId)}
                                                    className="group relative h-full min-h-0 w-full overflow-hidden rounded-lg border border-border/60 bg-background text-left shadow-md transition-all hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                                                >
                                                    <img
                                                        src={tile.thumbSrc}
                                                        alt={tile.alt ?? 'Miniatura filmu TikTok'}
                                                        className="absolute inset-0 h-full w-full object-cover transition-transform group-hover:scale-[1.02]"
                                                        loading="lazy"
                                                        decoding="async"
                                                    />
                                                        <span className="absolute right-1.5 top-1.5 z-[2] text-white drop-shadow">
                                                            <TikTokIcon className="h-3.5 w-3.5" aria-hidden />
                                                        </span>
                                                    <span className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-black/10" />
                                                    <span className="absolute left-1/2 top-1/2 z-[1] flex h-9 w-9 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-foreground shadow-md transition-transform group-hover:scale-105">
                                                        <svg
                                                            className="ml-0.5 h-4 w-4"
                                                            viewBox="0 0 24 24"
                                                            fill="currentColor"
                                                            aria-hidden
                                                        >
                                                            <path d="M8 5.14v13.72L19 12 8 5.14z" />
                                                        </svg>
                                                    </span>
                                                    <span className="absolute bottom-0 left-0 right-0 z-[1] flex min-w-0 items-center gap-1.5 px-2 py-1.5 text-[0.7rem] font-medium text-white sm:px-3 sm:py-2 sm:text-xs">
                                                        <TikTokViewIcon />
                                                        <span className="line-clamp-1 min-w-0">{tile.viewCountLabel}</span>
                                                    </span>
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                </div>
                            </aside>
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
                </div>
            </section>

            {/* TikTok: modal — `player/v1` + autoplay; iframe tylko po otwarciu (bez embed.js w index) */}
            {tiktokModalVideoId && (
                <div
                    className="fixed inset-0 z-[60] flex items-center justify-center overflow-y-auto bg-black/75 p-4"
                    onClick={() => setTiktokModalVideoId(null)}
                    role="dialog"
                    aria-modal="true"
                    aria-label="Film TikTok"
                >
                    <div
                        className="relative my-auto w-full max-w-[min(100%,325px)] shrink-0 rounded-lg bg-background p-2 shadow-2xl"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button
                            type="button"
                            className="absolute right-2 top-2 z-20 flex h-9 w-9 items-center justify-center rounded-full border border-border bg-background text-foreground shadow-md transition-colors hover:bg-secondary"
                            onClick={() => setTiktokModalVideoId(null)}
                            aria-label="Zamknij"
                        >
                            <XMarkIcon className="h-5 w-5" />
                        </button>
                        <div className="relative aspect-[9/16] w-full overflow-hidden rounded-lg bg-black">
                            <iframe
                                ref={tiktokIframeRef}
                                key={tiktokModalVideoId}
                                title="TikTok"
                                src={tiktokEmbedSrc(tiktokModalVideoId)}
                                className="absolute left-0 top-0 h-full w-full border-0"
                                allow="autoplay; encrypted-media; picture-in-picture; web-share; clipboard-write"
                                loading="eager"
                                onLoad={() => {
                                    postTiktokPlayerCommand(tiktokIframeRef.current, 'unMute');
                                }}
                            />
                        </div>
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
