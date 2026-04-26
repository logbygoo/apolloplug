import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { RENTAL_CARS } from '../configs/rentConfig';
import { CAR_FLEET } from '../configs/fleetConfig';
import {
  FLEET_OFFER_BENEFIT_BOXES,
  FLEET_OFFER_LANDING,
  FLEET_OFFER_SEO_LONG_HTML,
} from '../configs/wypozyczalniaLandingContent';
import { LandingTiktokSocialBlock } from '../components/LandingTiktokSocialBlock';
import { RentalGalleryEdgeScroller } from '../components/RentalGalleryEdgeScroller';
import { FleetAvailable1hPill } from '../components/FleetAvailable1hPill';
import { PageHeader } from '../components/ui';
import Seo from '../components/Seo';
import { SEO_CONFIG } from '../configs/seoConfig';
import { RENTAL_CAR_LANDING_E2E_STYLES, RENTAL_GALLERY_E2E_SLIDER_GAP } from '../configs/rentalGalleryE2eStyles';
import { useRentalE2ePointerSlider } from '../hooks/useRentalE2ePointerSlider';
import { ChevronDownIcon } from '../icons';
import {
  RENTAL_LANDING_FAQ,
  RENTAL_LANDING_FAQ_CATEGORIES,
  type RentalLandingFaqCategory,
} from '../configs/rentalLandingFaq';

function minDobaPrice(car: (typeof RENTAL_CARS)[number]): number {
  if (car.priceTiers && car.priceTiers.length > 0) {
    return Math.min(...car.priceTiers.map((t) => t.pricePerDay));
  }
  return car.pricePerDay;
}

const RentalWypozyczalniaLandingPage: React.FC = () => {
  const fleetMinPrice = useMemo(
    () => Math.min(...RENTAL_CARS.map((c) => minDobaPrice(c))),
    [],
  );

  const [openFaqIndex, setOpenFaqIndex] = useState(0);
  const [selectedFaqCategory, setSelectedFaqCategory] = useState<RentalLandingFaqCategory>(
    RENTAL_LANDING_FAQ_CATEGORIES[0],
  );
  const [isFaqCategoryAnimating, setIsFaqCategoryAnimating] = useState(false);
  const faqCategorySwitchTimeoutRef = useRef<number | null>(null);

  const filteredFaqItems = useMemo(
    () => RENTAL_LANDING_FAQ.filter((item) => item.categories.includes(selectedFaqCategory)),
    [selectedFaqCategory],
  );

  const handleFaqCategoryChange = useCallback(
    (category: RentalLandingFaqCategory) => {
      if (category === selectedFaqCategory || isFaqCategoryAnimating) return;
      if (faqCategorySwitchTimeoutRef.current != null) window.clearTimeout(faqCategorySwitchTimeoutRef.current);
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
      if (faqCategorySwitchTimeoutRef.current != null) window.clearTimeout(faqCategorySwitchTimeoutRef.current);
    },
    [],
  );

  const { onPointerDownCapture, onPointerMove, onPointerUp, onSliderLinkClick } = useRentalE2ePointerSlider();

  const carCards = useMemo(
    () =>
      RENTAL_CARS.map((c) => {
        const fleetMeta = CAR_FLEET.find((f) => f.id === c.id);
        const title = fleetMeta?.name ?? c.name;
        const fromPrice = minDobaPrice(c);
        const availableIn1h = fleetMeta?.availableIn1h === true;
        return { car: c, title, fromPrice, availableIn1h };
      }),
    [],
  );

  return (
    <div className="min-w-0 bg-background text-foreground">
      <Seo {...SEO_CONFIG['/wypozyczalnia']} />

      <PageHeader
        className="max-w-5xl"
        introMaxWidthClassName="max-w-none"
        title={FLEET_OFFER_LANDING.heroH1}
        subtitle={FLEET_OFFER_LANDING.heroLead}
        breadcrumbs={[{ name: 'Wypożyczalnia' }]}
        actions={
          <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-6 sm:gap-y-2">
            <Link
              to="/rezerwacja"
              className="inline-flex h-12 w-fit shrink-0 items-center justify-center rounded-md bg-foreground px-8 text-base font-semibold text-background transition-colors hover:bg-foreground/90"
            >
              Zarezerwuj pojazd
            </Link>
            <p className="m-0 text-sm text-muted-foreground">
              już od{' '}
              <strong className="font-semibold text-foreground">{fleetMinPrice.toLocaleString('pl-PL')} zł</strong>
              /dzień
            </p>
          </div>
        }
      />

      <section className="w-full py-8 md:py-10" aria-labelledby="fleet-offer-heading">
        <div className="container mx-auto max-w-5xl px-4 md:px-6">
          <h2 id="fleet-offer-heading" className="text-2xl font-bold text-foreground md:text-3xl">
            Auta w ofercie wypożyczenia
          </h2>
          <p className="mt-2 text-muted-foreground">
            Sprawdź nasze aktualnie dostępne modele aut elektrycznych w ofercie wynajmu krótkoterminowego oraz
            średnioterminowego. Do odbioru nawet w 1h.
          </p>
        </div>

        <div className="rental-car-landing rental-car-landing--align-max-5xl mt-6 w-full min-w-0">
          <style>{RENTAL_CAR_LANDING_E2E_STYLES}</style>
          <RentalGalleryEdgeScroller>
            <section
              className="e2e-slider scroll-smooth cursor-grab select-none"
              style={RENTAL_GALLERY_E2E_SLIDER_GAP}
              onPointerDownCapture={onPointerDownCapture}
              onPointerMove={onPointerMove}
              onPointerUp={onPointerUp}
              onPointerCancel={onPointerUp}
            >
              <div className="e2e-track">
                {carCards.map(({ car, title, fromPrice, availableIn1h }) => (
                  <div
                    key={car.id}
                    className="e2e-slide e2e-slide--fleet-offer group flex shrink-0 snap-center flex-col overflow-hidden rounded-lg border border-border bg-white transition-colors hover:border-foreground/25 dark:bg-card"
                  >
                    <div className="relative box-border aspect-[5/3] w-full min-h-0 overflow-hidden bg-muted/40 p-3 sm:p-4">
                      {availableIn1h && (
                        <div className="absolute left-3 top-3 z-10 sm:left-4 sm:top-4">
                          <FleetAvailable1hPill />
                        </div>
                      )}
                      <img
                        src={car.imageUrl[0]}
                        alt={title}
                        draggable={false}
                        onDragStart={(e) => e.preventDefault()}
                        className="h-full w-full min-h-0 min-w-0 object-contain object-center"
                        loading="lazy"
                        decoding="async"
                      />
                    </div>
                    <div className="flex min-h-0 flex-1 flex-col px-4 pb-4 pt-2">
                      <h3 className="text-base font-semibold leading-snug text-foreground">{title}</h3>
                      <p className="mt-2 text-sm text-muted-foreground">
                        Cena od{' '}
                        <span className="font-semibold tabular-nums text-foreground">
                          {fromPrice.toLocaleString('pl-PL')}
                        </span>{' '}
                        <span className="text-foreground/90">zł/doba</span>
                      </p>
                      <div className="mt-3 grid grid-cols-2 gap-2">
                        <Link
                          to={`/wypozycz/${car.id}`}
                          onClick={onSliderLinkClick}
                          className="inline-flex min-h-10 items-center justify-center rounded-md border border-foreground bg-white px-2 text-center text-sm font-semibold text-foreground transition-colors hover:bg-secondary/60"
                        >
                          Szczegóły
                        </Link>
                        <Link
                          to={`/rezerwacja/${car.id}`}
                          onClick={onSliderLinkClick}
                          className="inline-flex min-h-10 items-center justify-center rounded-md bg-foreground px-2 text-center text-sm font-semibold text-background transition-colors hover:bg-foreground/90"
                        >
                          Zarezerwuj
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </RentalGalleryEdgeScroller>
        </div>
      </section>

      <section className="border-b border-border">
        <div className="container mx-auto max-w-5xl px-4 py-8 md:px-6">
          <LandingTiktokSocialBlock className="landing-tiktok-social--standalone" />
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="container mx-auto max-w-5xl px-4 md:px-6">
          <div className="grid gap-10 lg:grid-cols-2 lg:gap-12">
            <div>
              <div
                className="prose prose-zinc max-w-none [&_h2]:mt-0"
                dangerouslySetInnerHTML={{ __html: FLEET_OFFER_SEO_LONG_HTML }}
              />
            </div>
            <div className="flex min-h-0 flex-col gap-4">
              {FLEET_OFFER_BENEFIT_BOXES.map((item) => (
                <div
                  key={item.title}
                  className="rounded-lg border border-border bg-card p-4 text-foreground"
                >
                  <h3 className="m-0 text-base font-semibold leading-snug">{item.title}</h3>
                  <p className="mb-0 mt-2 text-sm leading-relaxed text-muted-foreground">{item.body}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-border py-12 md:py-16">
        <div className="container mx-auto max-w-5xl px-4 md:px-6">
          <div className="lg:grid lg:grid-cols-3 lg:gap-12">
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
    </div>
  );
};

export default RentalWypozyczalniaLandingPage;
