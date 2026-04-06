import React, { useEffect, useMemo, useRef, useState } from 'react';
import Seo from '../components/Seo';
import { PageHeader } from '../components/ui';
import { RENTAL_CARS } from '../configs/rentConfig';
import { CheckIcon } from '../icons';
import type { Car } from '../types';

/**
 * Slider end-to-end z responsywnym --container-width (jak w dostarczonym HTML).
 * Wszystko pod .rental-v2 — bez kolizji z globalnym .e2e-track w index.html.
 */
const RENTAL_V2_E2E_STYLES = `
  .rental-v2 {
    --container-width: 100%;
    --slider-gap: 1rem;
    --e2e-edge-fuzz: 15px;
  }
  @media (min-width: 640px) {
    .rental-v2 { --container-width: 40rem; }
  }
  @media (min-width: 768px) {
    .rental-v2 { --container-width: 48rem; }
  }
  @media (min-width: 1024px) {
    .rental-v2 { --container-width: 64rem; }
  }
  @media (min-width: 1280px) {
    .rental-v2 { --container-width: 80rem; }
  }
  @media (min-width: 1536px) {
    .rental-v2 { --container-width: 96rem; }
  }

  .rental-v2 .e2e-v2-hint {
    max-width: min(100% - 2rem, var(--container-width));
    margin: 0 auto;
    padding: 1rem;
    font-size: 0.875rem;
    color: hsl(0 0% 45%);
  }
  .rental-v2 .e2e-v2-debug {
    position: sticky;
    top: 3.5rem;
    z-index: 10;
    border-bottom: 1px solid hsl(0 0% 90%);
    background: hsl(0 0% 96%);
    padding: 0.5rem 1rem;
    font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
    font-size: 11px;
    color: hsl(0 0% 45%);
  }

  .rental-v2 .e2e-slider {
    width: 100%;
    position: relative;
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
    overscroll-behavior-x: contain;
    scrollbar-width: none;
    -ms-overflow-style: none;
  }
  .rental-v2 .e2e-slider::-webkit-scrollbar {
    height: 0;
    display: none;
  }
  .rental-v2 .e2e-track {
    display: inline-flex;
    width: max-content;
    gap: var(--slider-gap, 20px);
    padding-top: 24px;
    padding-bottom: 24px;
    /* px-4: wewnętrzny gutter jak treść w .container poniżej md */
    padding-left: max(1rem, calc((100% - var(--container-width)) / 2 + var(--e2e-edge-fuzz)));
    padding-right: max(1rem, calc((100% - var(--container-width)) / 2 + var(--e2e-edge-fuzz)));
  }
  /* Od md: treść ma md:px-6 (1.5rem); przy --container-width: 48rem fuzz 15px dawał start toru ~9px
     na lewo od nagłówka / podsumowania — ten sam gutter co .container */
  @media (min-width: 768px) {
    .rental-v2 .e2e-track {
      padding-left: max(1.5rem, calc((100% - var(--container-width)) / 2 + 1.5rem));
      padding-right: max(1.5rem, calc((100% - var(--container-width)) / 2 + 1.5rem));
    }
  }

  /* Poniżej md: --container-width to 100% (<640px) albo 40rem (640–767px) — mniejszy szary box + h1 */
  @media (max-width: 767px) {
    .rental-v2 .rental-v2-page-header > div {
      padding-top: 1.75rem;
      padding-bottom: 1.75rem;
    }
    .rental-v2 .rental-v2-page-header h1 {
      font-size: 1.875rem;
      line-height: 2.25rem;
    }
  }
`;

const sliderGapStyle = { '--slider-gap': '1.25rem' } as React.CSSProperties;

/**
 * Wychodzi z szerokości kolumny / .container — pełna szerokość viewportu.
 * Bez resetu md: (w przeciwieństwie do RentalEdgeScroller na /wypozyczalnia), żeby
 * .e2e-track miał poprawne 100% przy calc paddingu i nic nie obcinało z overflow rodziców.
 */
const RentalV2EdgeScroller: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="relative shrink-0 overflow-x-visible w-[100vw] max-w-[100vw] ml-[calc(50%-50vw)]">
    {children}
  </div>
);

const V2ModelCard: React.FC<{
  car: Car;
  isSelected: boolean;
  onSelect: () => void;
  layout?: 'slider' | 'grid';
}> = ({ car, isSelected, onSelect, layout = 'slider' }) => {
  const isAvailable = car.available !== false;
  const minPrice = useMemo(() => {
    if (car.priceTiers && car.priceTiers.length > 0) {
      return Math.min(...car.priceTiers.map((t) => t.pricePerDay));
    }
    return car.pricePerDay;
  }, [car]);

  const widthClass =
    layout === 'grid'
      ? 'min-h-[12rem] w-full min-w-0'
      : 'min-h-[12rem] w-[min(88vw,20rem)] shrink-0 sm:w-80';

  return (
    <div
      onClick={isAvailable ? onSelect : undefined}
      className={`relative flex h-full cursor-pointer flex-col rounded-lg border p-4 transition-all ${widthClass} ${
        isSelected ? 'border-foreground bg-secondary/50' : 'border-border bg-card'
      } ${isAvailable ? 'hover:border-foreground/50' : 'cursor-not-allowed opacity-50'}`}
    >
      <div
        className={`absolute right-3 top-3 flex h-5 w-5 items-center justify-center rounded-sm transition-all ${
          isSelected ? 'bg-foreground text-background' : 'bg-secondary'
        }`}
      >
        {isSelected && <CheckIcon className="h-3.5 w-3.5" strokeWidth={3} />}
      </div>
      {!isAvailable && (
        <div className="absolute left-2 top-2 rounded bg-muted px-2 py-1 text-xs font-bold text-muted-foreground">
          Wkrótce
        </div>
      )}
      <img src={car.imageUrl[0]} alt={car.name} className="mb-4 h-32 w-full object-contain" />
      <div className="mt-auto text-center">
        <h3 className="font-semibold">{car.name}</h3>
        {isAvailable ? (
          <p className="text-sm text-muted-foreground">od {minPrice} zł/dzień</p>
        ) : (
          <p className="text-sm text-muted-foreground">&nbsp;</p>
        )}
      </div>
    </div>
  );
};

const RentalV2Page: React.FC = () => {
  const [selectedId, setSelectedId] = useState<string>(RENTAL_CARS[0]?.id ?? '');
  const rentalRootRef = useRef<HTMLDivElement>(null);
  const [debugLine, setDebugLine] = useState('');

  useEffect(() => {
    const setMeta = (name: string, content: string) => {
      let el = document.querySelector(`meta[name="${name}"]`);
      if (!el) {
        el = document.createElement('meta');
        el.setAttribute('name', name);
        document.head.appendChild(el);
      }
      el.setAttribute('content', content);
    };
    setMeta('robots', 'noindex, nofollow');
    return () => {
      const el = document.querySelector('meta[name="robots"]');
      if (el?.getAttribute('content') === 'noindex, nofollow') {
        el.remove();
      }
    };
  }, []);

  useEffect(() => {
    const tick = () => {
      const root = rentalRootRef.current;
      if (!root) return;
      const cw = getComputedStyle(root).getPropertyValue('--container-width').trim();
      setDebugLine(`viewport: ${window.innerWidth}px  |  --container-width: ${cw}`);
    };
    tick();
    window.addEventListener('resize', tick);
    return () => window.removeEventListener('resize', tick);
  }, []);

  const selected = RENTAL_CARS.find((c) => c.id === selectedId) ?? RENTAL_CARS[0];

  const breadcrumbs = useMemo(() => {
    const crumbs: { name: string; path?: string }[] = [{ name: 'Wypożyczalnia', path: '/wypozyczalnia' }];
    if (selected) {
      crumbs.push({ name: selected.name });
    }
    return crumbs;
  }, [selected]);

  return (
    <>
      <Seo title="Wypożyczalnia v2 (test)" description="Strona testowa — bez indeksowania." />
      <style>{RENTAL_V2_E2E_STYLES}</style>
      <div ref={rentalRootRef} className="rental-v2 min-h-screen bg-background pb-16 text-foreground">
        <div className="e2e-v2-debug">{debugLine}</div>

        <div className="mb-8 w-full border-b border-border bg-secondary">
          <div className="rental-v2-page-header">
            <PageHeader
              title="Wypożyczalnia EV"
              subtitle="Wypożycz Auto Elektryczne wypełniając poniższy formularz"
              breadcrumbs={breadcrumbs}
            />
          </div>
        </div>

        <div className="container mx-auto min-w-0 px-4 pb-6 md:px-6">
          <div className="grid min-w-0 grid-cols-1 gap-8 overflow-x-visible lg:grid-cols-3 lg:gap-12">
            <div className="min-w-0 overflow-x-visible lg:col-span-2">
              <h2 className="text-2xl font-bold tracking-tight">Wybierz model</h2>

              {/* Statyczna siatka — gdy sidebar jest obok (≥ lg) */}
              <div className="mt-6 hidden gap-4 lg:grid lg:grid-cols-2 xl:grid-cols-4">
                {RENTAL_CARS.map((car) => (
                  <V2ModelCard
                    key={car.id}
                    car={car}
                    layout="grid"
                    isSelected={selectedId === car.id}
                    onSelect={() => setSelectedId(car.id)}
                  />
                ))}
              </div>

              {/* Slider — tylko &lt; lg; tor na pełną szerokość okna (nie wąska kolumna .container) */}
              <div className="mt-6 lg:hidden">
                <RentalV2EdgeScroller>
                  <p className="e2e-v2-hint mb-0">
                    Przewiń poziomo. Lewy/prawy padding toru liczy się od{' '}
                    <code className="text-foreground">--container-width</code> (zmienia się przy sm/md/lg/xl/2xl).
                  </p>
                  <section className="e2e-slider touch-pan-x" style={sliderGapStyle}>
                    <div className="e2e-track">
                      {RENTAL_CARS.map((car) => (
                        <V2ModelCard
                          key={car.id}
                          car={car}
                          layout="slider"
                          isSelected={selectedId === car.id}
                          onSelect={() => setSelectedId(car.id)}
                        />
                      ))}
                    </div>
                  </section>
                </RentalV2EdgeScroller>
              </div>
            </div>

            <aside className="min-w-0 lg:col-span-1">
              <div className="rounded-lg border border-border bg-secondary p-6 lg:sticky lg:top-24">
                <h2 className="text-2xl font-bold">Podsumowanie</h2>
                <p className="mt-4 text-sm text-muted-foreground">
                  Wybrany pojazd: <span className="font-medium text-foreground">{selected?.name ?? '—'}</span>
                </p>
                <p className="mt-6 text-sm text-muted-foreground">
                  Tutaj trafi pełny formularz rezerwacji (w budowie).
                </p>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </>
  );
};

export default RentalV2Page;
