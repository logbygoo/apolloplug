import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import Seo from '../components/Seo';
import { Button, Input, Label, PageHeader } from '../components/ui';
import {
  ADDITIONAL_OPTIONS,
  RENTAL_CARS,
  RENTAL_PERIOD_DATE_INPUT_CLASSNAME,
  RENTAL_PERIOD_DATETIME_GRID,
  RENTAL_PERIOD_FIELD_CELL,
  RENTAL_PERIOD_FIELD_STYLES,
  RENTAL_PERIOD_GROUP_BOX,
  RENTAL_PERIOD_LOCATION_ROW,
  RENTAL_PERIOD_SELECT_CLASSNAME,
  RENTAL_TIME_OPTIONS,
} from '../configs/rentConfig';
import { LOCATIONS, formatLocationSelectLabel } from '../configs/locationsConfig';
import { formatRentalTimeOptionLabel } from '../configs/workConfig';
import { BRANDS } from '../constants';
import { CalendarDaysIcon, CheckIcon, ChevronDownIcon, DocumentTextIcon } from '../icons';
import type { Car } from '../types';

type RentalBrand = (typeof BRANDS)[number];

const RENTAL_LOCATIONS_DATA = LOCATIONS;

const todayDate = new Date();
const formatDate = (date: Date) => date.toISOString().split('T')[0];
const today = formatDate(todayDate);

const getPriceForCar = (price: number | Readonly<{ [key: string]: number }>, carId: string): number => {
  if (typeof price === 'number') {
    return price;
  }
  return price[carId] ?? 0;
};

type AdditionalOptionsState = Record<(typeof ADDITIONAL_OPTIONS)[number]['id'], boolean>;

const getDefaultOptionsForCar = (carId: string): AdditionalOptionsState =>
  Object.fromEntries(
    ADDITIONAL_OPTIONS.map((o) => [o.id, getPriceForCar(o.price, carId) === 0])
  ) as AdditionalOptionsState;

/** Podsumowanie v2: „1 dzień”, „2 dni”, „5 dni” itd. */
function formatPolishRentalDays(n: number): string {
  if (n <= 0) return '—';
  if (n === 1) return '1 dzień';
  return `${n} dni`;
}

/** `YYYY-MM-DD` → `dd.mm` (pływający CTA). */
function formatDdMmFromIso(iso: string): string {
  if (!iso) return '';
  const p = iso.split('-');
  if (p.length !== 3) return iso;
  const [, m, d] = p;
  return `${d}.${m}`;
}

type RentalPeriodState = {
  pickupDate: string;
  pickupTime: string;
  pickupLocation: string;
  returnDate: string;
  returnTime: string;
  returnLocation: string;
};

const RENTAL_V2_SESSION_KEY = 'rentalV2FormState';

type RentalV2Session = {
  selectedId: string;
  selectedBrandId: string;
  rentalPeriod: RentalPeriodState;
  additionalOptions: AdditionalOptionsState;
};

function addDays(date: Date, days: number): Date {
  const d = new Date(date.getTime());
  d.setDate(d.getDate() + days);
  return d;
}

/** +1 h od teraz, w górę do najbliższego slotu 30 min (jak w `RENTAL_TIME_OPTIONS`). */
function computeDefaultTimeOneHourAhead(): string {
  const d = new Date();
  d.setTime(d.getTime() + 60 * 60 * 1000);
  let totalMin = d.getHours() * 60 + d.getMinutes();
  let slotMin = Math.ceil(totalMin / 30) * 30;
  if (slotMin > 23 * 60 + 30) slotMin = 23 * 60 + 30;
  const h = Math.floor(slotMin / 60);
  const m = slotMin % 60;
  return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`;
}

function snapTimeToRentalSlot(s: string): string {
  if (RENTAL_TIME_OPTIONS.includes(s)) return s;
  const parts = s.split(':').map(Number);
  const h = parts[0] ?? 0;
  const min = parts[1] ?? 0;
  let total = h * 60 + min;
  total = Math.round(total / 30) * 30;
  total = Math.min(Math.max(total, 0), 23 * 60 + 30);
  const hh = String(Math.floor(total / 60)).padStart(2, '0');
  const mm = String(total % 60).padStart(2, '0');
  return `${hh}:${mm}`;
}

function isValidLocationTitle(title: string): boolean {
  return LOCATIONS.some((l) => l.title === title);
}

function mergeAdditionalOptionsFromStored(
  stored: Partial<Record<string, boolean>> | undefined,
  carId: string
): AdditionalOptionsState {
  const base = getDefaultOptionsForCar(carId);
  if (!stored) return base;
  for (const o of ADDITIONAL_OPTIONS) {
    if (typeof stored[o.id] === 'boolean') {
      base[o.id] = stored[o.id];
    }
  }
  return base;
}

function loadRentalV2Session(): RentalV2Session | null {
  try {
    const raw = sessionStorage.getItem(RENTAL_V2_SESSION_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Partial<RentalV2Session>;
    if (!parsed?.selectedId || !parsed.rentalPeriod) return null;
    if (!RENTAL_CARS.some((c) => c.id === parsed.selectedId)) return null;
    return parsed as RentalV2Session;
  } catch {
    return null;
  }
}

function buildFirstVisitState(): RentalV2Session {
  const carId = RENTAL_CARS[0]?.id ?? '';
  const brandId = BRANDS.find((b) => carId.includes(b.id))?.id ?? BRANDS[0]?.id ?? '';
  const now = new Date();
  const pickupDate = formatDate(now);
  const returnDate = formatDate(addDays(now, 3));
  const t = computeDefaultTimeOneHourAhead();
  return {
    selectedId: carId,
    selectedBrandId: brandId,
    rentalPeriod: {
      pickupDate,
      pickupTime: t,
      pickupLocation: LOCATIONS[0]?.title ?? '',
      returnDate,
      returnTime: t,
      returnLocation: LOCATIONS[0]?.title ?? '',
    },
    additionalOptions: getDefaultOptionsForCar(carId),
  };
}

function hydrateFromSession(stored: RentalV2Session): RentalV2Session {
  const carId = RENTAL_CARS.some((c) => c.id === stored.selectedId)
    ? stored.selectedId
    : (RENTAL_CARS[0]?.id ?? '');
  let brandId = stored.selectedBrandId;
  if (!BRANDS.some((b) => b.id === brandId)) {
    brandId = BRANDS.find((b) => carId.includes(b.id))?.id ?? BRANDS[0]?.id ?? '';
  }
  const rp = { ...stored.rentalPeriod };
  if (!isValidLocationTitle(rp.pickupLocation)) rp.pickupLocation = LOCATIONS[0]?.title ?? '';
  if (!isValidLocationTitle(rp.returnLocation)) rp.returnLocation = LOCATIONS[0]?.title ?? '';
  if (rp.returnDate < rp.pickupDate) rp.returnDate = rp.pickupDate;
  rp.pickupTime = snapTimeToRentalSlot(rp.pickupTime);
  rp.returnTime = snapTimeToRentalSlot(rp.returnTime);
  return {
    selectedId: carId,
    selectedBrandId: brandId,
    rentalPeriod: rp,
    additionalOptions: mergeAdditionalOptionsFromStored(stored.additionalOptions, carId),
  };
}

let rentalV2InitialCache: RentalV2Session | null = null;

function getInitialRentalV2State(): RentalV2Session {
  if (rentalV2InitialCache) return rentalV2InitialCache;
  if (typeof window === 'undefined') {
    rentalV2InitialCache = buildFirstVisitState();
    return rentalV2InitialCache;
  }
  const stored = loadRentalV2Session();
  rentalV2InitialCache = stored ? hydrateFromSession(stored) : buildFirstVisitState();
  return rentalV2InitialCache;
}

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
    /* touch-pan-x (same as samo pan-x) blokuje przewijanie strony góra/dół; pan-x + pan-y odblokowuje */
    touch-action: pan-x pan-y;
  }
  .rental-v2 .e2e-slider::-webkit-scrollbar {
    height: 0;
    display: none;
  }
  .rental-v2 .e2e-track {
    display: inline-flex;
    width: max-content;
    gap: var(--slider-gap, 20px);
    /* Odstęp od h2 daje wrapper (mt-3), nie padding toru — bez podwajania */
    padding-top: 0;
    padding-bottom: 0;
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

/** Slider w tym samym stosie co siatka — odstęp od h2 tylko z rodzica (mt-3). */
const RentalV2E2ESlider: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="lg:hidden">
    <RentalV2EdgeScroller>
      <section className="e2e-slider" style={sliderGapStyle}>
        <div className="e2e-track">{children}</div>
      </section>
    </RentalV2EdgeScroller>
  </div>
);

const V2BrandCard: React.FC<{
  brand: RentalBrand;
  isSelected: boolean;
  onSelect: () => void;
  layout?: 'slider' | 'grid';
}> = ({ brand, isSelected, onSelect, layout = 'slider' }) => {
  const widthClass =
    layout === 'grid'
      ? 'h-16 min-h-[4rem] w-full min-w-0'
      : 'h-16 min-h-[4rem] min-w-[200px] w-[min(48vw,280px)] shrink-0';

  return (
    <div
      onClick={brand.available ? onSelect : undefined}
      className={`relative flex flex-col items-center justify-center rounded-lg border p-2 transition-all ${widthClass} ${
        isSelected ? 'border-foreground bg-secondary/50' : 'border-border bg-card'
      } ${brand.available ? 'cursor-pointer hover:border-foreground/50' : 'cursor-not-allowed opacity-50'}`}
    >
      <div
        className={`absolute right-1.5 top-1.5 flex h-4 w-4 items-center justify-center rounded-sm transition-all ${
          isSelected ? 'bg-foreground text-background' : 'bg-secondary'
        }`}
      >
        {isSelected && <CheckIcon className="h-3 w-3" strokeWidth={3} />}
      </div>
      {!brand.available && (
        <div className="absolute left-1 top-1 rounded bg-muted px-1.5 py-0.5 text-[10px] font-bold text-muted-foreground">
          Wkrótce
        </div>
      )}
      <img src={brand.logoUrl} alt={`${brand.name} logo`} className="h-8 max-h-8 w-auto object-contain" />
    </div>
  );
};

/** Slugi jak w `DOCUMENTS_DATA` — podgląd PDF na stronie Dokumentacja. */
const RENTAL_V2_SZKIC_UMOWY_DOCS = [
  { title: 'Umowa wynajmu', docSlug: 'wzor-umowy' },
  { title: 'Protokół Odbioru/Zwrotu', docSlug: 'protokol-wydania-zwrotu' },
  { title: 'Regulamin Wypożyczalni', docSlug: 'regulamin-wypozyczalni' },
] as const;

/** Te same szerokości slajdu co `V2ModelCard`; wysokość z treści (bez min-h jak przy kartach modeli). */
const V2LegalDocTile: React.FC<{ title: string; docSlug: string; layout?: 'slider' | 'grid' }> = ({
  title,
  docSlug,
  layout = 'slider',
}) => {
  const widthClass =
    layout === 'grid'
      ? 'w-full min-w-0'
      : 'w-[min(88vw,20rem)] shrink-0 sm:w-80';

  return (
    <Link
      to={`/dokumentacja?doc=${encodeURIComponent(docSlug)}`}
      className={`group flex items-center gap-4 rounded-lg border border-border bg-card p-4 transition-colors hover:bg-secondary ${widthClass}`}
    >
      <DocumentTextIcon className="h-8 w-8 shrink-0 text-muted-foreground" />
      <div className="min-w-0">
        <p className="font-medium text-foreground">{title}</p>
        <p className="text-sm text-muted-foreground">Otwórz w dokumentacji</p>
      </div>
    </Link>
  );
};

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

const CheckboxOption: React.FC<{
  car: Car;
  option: (typeof ADDITIONAL_OPTIONS)[number];
  isChecked: boolean;
  onToggle: () => void;
}> = ({ car, option, isChecked, onToggle }) => {
  const price = getPriceForCar(option.price, car.id);
  const isFree = price === 0;

  return (
    <label
      htmlFor={`v2-${option.id}`}
      className={`flex items-center justify-between rounded-lg border p-4 transition-all ${
        isChecked ? 'border-foreground bg-secondary/50' : 'border-border bg-card'
      } ${isFree ? 'cursor-default' : 'cursor-pointer'}`}
    >
      <input
        id={`v2-${option.id}`}
        type="checkbox"
        checked={isChecked}
        onChange={onToggle}
        className="absolute h-0 w-0 opacity-0"
        disabled={isFree}
      />
      <div className="flex items-center gap-4">
        <div
          className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-sm transition-all ${
            isChecked ? 'bg-foreground text-background' : 'bg-secondary'
          }`}
        >
          {isChecked && <CheckIcon className="h-3.5 w-3.5" strokeWidth={3} />}
        </div>
        <div>
          <p className="font-medium">{option.name}</p>
          <p className="text-sm text-muted-foreground">{option.description}</p>
        </div>
      </div>
      <div className="text-right">
        <span className="text-sm font-semibold">
          {isFree ? 'Wliczone w cenę' : `${price} zł ${option.type === 'per_day' ? '/ dzień' : ''}`}
        </span>
      </div>
    </label>
  );
};

const RentalV2Page: React.FC = () => {
  const [selectedId, setSelectedId] = useState<string>(() => getInitialRentalV2State().selectedId);
  const [selectedBrandId, setSelectedBrandId] = useState<string>(() => getInitialRentalV2State().selectedBrandId);
  const [rentalPeriod, setRentalPeriod] = useState<RentalPeriodState>(() => getInitialRentalV2State().rentalPeriod);
  const [additionalOptions, setAdditionalOptions] = useState<AdditionalOptionsState>(
    () => getInitialRentalV2State().additionalOptions
  );
  const rentalRootRef = useRef<HTMLDivElement>(null);
  const summaryAsideRef = useRef<HTMLElement>(null);
  const [summaryInView, setSummaryInView] = useState(false);
  const [debugLine, setDebugLine] = useState('');

  useEffect(() => {
    const payload: RentalV2Session = {
      selectedId,
      selectedBrandId,
      rentalPeriod,
      additionalOptions,
    };
    try {
      sessionStorage.setItem(RENTAL_V2_SESSION_KEY, JSON.stringify(payload));
    } catch {
      /* ignore quota / private mode */
    }
  }, [selectedId, selectedBrandId, rentalPeriod, additionalOptions]);

  const handleRentalPeriodChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { id, value } = e.target;
    setRentalPeriod((prev) => {
      const next = { ...prev, [id]: value } as RentalPeriodState;
      if (id === 'pickupDate' && next.returnDate < value) {
        next.returnDate = value;
      }
      return next;
    });
  };

  const handleSelectCar = (carId: string) => {
    setSelectedId(carId);
    const b = BRANDS.find((br) => carId.includes(br.id));
    if (b) setSelectedBrandId(b.id);
  };

  const handleOptionToggle = (optionId: (typeof ADDITIONAL_OPTIONS)[number]['id']) => {
    setAdditionalOptions((prev) => ({ ...prev, [optionId]: !prev[optionId] }));
  };

  const handleSelectBrand = (brandId: string) => {
    setSelectedBrandId(brandId);
    const car =
      RENTAL_CARS.find((c) => c.id.includes(brandId) && c.available !== false) ??
      RENTAL_CARS.find((c) => c.id.includes(brandId));
    if (car) setSelectedId(car.id);
  };

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

  useEffect(() => {
    const el = summaryAsideRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        setSummaryInView(entry.isIntersecting);
      },
      { root: null, threshold: 0.06, rootMargin: '0px 0px -32px 0px' }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const selected = RENTAL_CARS.find((c) => c.id === selectedId) ?? RENTAL_CARS[0];

  /** Ta sama logika co `summary` w `RentalPage` (krok „szczegóły”). */
  const summary = useMemo(() => {
    const {
      pickupDate,
      returnDate,
      pickupTime,
      returnTime,
      pickupLocation,
      returnLocation,
    } = rentalPeriod;
    const model = selected;
    const options = additionalOptions;

    const defaultReturn = {
      rentalDays: 0,
      rentalPrice: 0,
      optionsPrice: 0,
      totalPrice: 0,
      deposit: 5000,
      totalWithDeposit: 5000,
      totalKmLimit: 0,
      costPerKmOverLimit: 0,
      pickupFee: 0,
      returnFee: 0,
      tierPricePerDay: 0,
      tierKmLimitPerDay: 0,
    };

    if (!pickupDate || !returnDate || !pickupTime || !returnTime || !model) {
      return defaultReturn;
    }

    const start = new Date(`${pickupDate}T${pickupTime}`);
    const end = new Date(`${returnDate}T${returnTime}`);

    if (start >= end) {
      return defaultReturn;
    }

    const diffTime = end.getTime() - start.getTime();
    const rentalDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) || 1;

    const tier =
      model.priceTiers?.find((t) => {
        const range = t.days.match(/\d+/g);
        if (!range) return false;

        const min = parseInt(range[0], 10);
        let max: number;

        if (range.length > 1) {
          max = parseInt(range[1], 10);
        } else if (t.days.includes('+') || t.days.includes('-')) {
          max = Infinity;
        } else {
          max = min;
        }

        return rentalDays >= min && rentalDays <= max;
      }) || { pricePerDay: model.pricePerDay, kmLimitPerDay: 250 };

    const rentalPrice = rentalDays * tier.pricePerDay;
    const totalKmLimit = rentalDays * tier.kmLimitPerDay;
    const costPerKmOverLimit = model.costPerKmOverLimit || 0;

    let optionsPrice = 0;
    ADDITIONAL_OPTIONS.forEach((opt) => {
      if (options[opt.id]) {
        const price = getPriceForCar(opt.price, model.id);
        optionsPrice += opt.type === 'per_day' ? price * rentalDays : price;
      }
    });

    const pickupLoc = RENTAL_LOCATIONS_DATA.find((loc) => loc.title === pickupLocation);
    const pickupFee = pickupLoc?.price || 0;

    const returnLoc = RENTAL_LOCATIONS_DATA.find((loc) => loc.title === returnLocation);
    const returnFee = returnLoc?.price || 0;

    const totalPrice = rentalPrice + optionsPrice + pickupFee + returnFee;
    const deposit = model.deposit || 5000;
    const totalWithDeposit = totalPrice + deposit;

    return {
      rentalDays,
      rentalPrice,
      optionsPrice,
      totalPrice,
      deposit,
      totalWithDeposit,
      totalKmLimit,
      costPerKmOverLimit,
      pickupFee,
      returnFee,
      tierPricePerDay: tier.pricePerDay,
      tierKmLimitPerDay: tier.kmLimitPerDay,
    };
  }, [rentalPeriod, additionalOptions, selected]);

  /** Wiersze opcji w podsumowaniu v2 — tylko zaznaczone; pełna nazwa + stawka w nawiasie. */
  const v2OptionLines = useMemo(() => {
    const model = selected;
    return ADDITIONAL_OPTIONS.filter((opt) => additionalOptions[opt.id]).map((opt) => {
      const unit = getPriceForCar(opt.price, model.id);
      const detail =
        opt.type === 'per_day'
          ? `${unit.toLocaleString('pl-PL')} zł/db`
          : `${unit.toLocaleString('pl-PL')} zł`;
      return { id: opt.id, fullName: opt.name, detail };
    });
  }, [additionalOptions, selected]);

  const floatingCtaSubline = useMemo(() => {
    if (summary.rentalDays <= 0) return '—';
    return `${formatDdMmFromIso(rentalPeriod.pickupDate)}–${formatDdMmFromIso(rentalPeriod.returnDate)} — ${formatPolishRentalDays(summary.rentalDays)} — ${summary.tierPricePerDay.toLocaleString('pl-PL')} zł/db`;
  }, [summary.rentalDays, summary.tierPricePerDay, rentalPeriod.pickupDate, rentalPeriod.returnDate]);

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
      <style>{RENTAL_PERIOD_FIELD_STYLES}</style>
      <style>{RENTAL_V2_E2E_STYLES}</style>
      <div
        ref={rentalRootRef}
        className="rental-v2 min-h-screen bg-background pb-28 text-foreground lg:pb-16"
      >
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
              <section>
                <h2 className="text-2xl font-bold tracking-tight">Wybierz Markę</h2>
                <div className="mt-3">
                  <div className="hidden gap-4 lg:grid lg:grid-cols-3">
                    {BRANDS.map((brand) => (
                      <V2BrandCard
                        key={brand.id}
                        brand={brand}
                        layout="grid"
                        isSelected={selectedBrandId === brand.id}
                        onSelect={() => handleSelectBrand(brand.id)}
                      />
                    ))}
                  </div>
                  <RentalV2E2ESlider>
                    {BRANDS.map((brand) => (
                      <V2BrandCard
                        key={brand.id}
                        brand={brand}
                        layout="slider"
                        isSelected={selectedBrandId === brand.id}
                        onSelect={() => handleSelectBrand(brand.id)}
                      />
                    ))}
                  </RentalV2E2ESlider>
                </div>
              </section>

              <section className="mt-8">
                <h2 className="text-2xl font-bold tracking-tight">Wybierz Model</h2>
                <div className="mt-3">
                  <div className="hidden gap-4 lg:grid lg:grid-cols-2 xl:grid-cols-4">
                    {RENTAL_CARS.map((car) => (
                      <V2ModelCard
                        key={car.id}
                        car={car}
                        layout="grid"
                        isSelected={selectedId === car.id}
                        onSelect={() => handleSelectCar(car.id)}
                      />
                    ))}
                  </div>
                  <RentalV2E2ESlider>
                    {RENTAL_CARS.map((car) => (
                      <V2ModelCard
                        key={car.id}
                        car={car}
                        layout="slider"
                        isSelected={selectedId === car.id}
                        onSelect={() => handleSelectCar(car.id)}
                      />
                    ))}
                  </RentalV2E2ESlider>
                </div>
              </section>

              <section className="mt-8 min-w-0 max-w-full overflow-x-hidden">
                <h2 className="text-2xl font-bold tracking-tight">Okres najmu</h2>
                <div className="mt-3 flex min-w-0 max-w-full flex-col gap-8">
                  <div className={`rental-period ${RENTAL_PERIOD_GROUP_BOX} space-y-4`}>
                    <div className={RENTAL_PERIOD_DATETIME_GRID}>
                      <div className={RENTAL_PERIOD_FIELD_CELL}>
                        <Label htmlFor="pickupDate">Data odbioru</Label>
                        <div className="relative mt-1 min-w-0 overflow-hidden rounded-md">
                          <Input
                            id="pickupDate"
                            type="date"
                            value={rentalPeriod.pickupDate}
                            min={today}
                            onChange={handleRentalPeriodChange}
                            required
                            className={RENTAL_PERIOD_DATE_INPUT_CLASSNAME}
                          />
                          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                            <CalendarDaysIcon className="h-5 w-5 shrink-0 text-muted-foreground" />
                          </div>
                        </div>
                      </div>
                      <div className={RENTAL_PERIOD_FIELD_CELL}>
                        <Label htmlFor="pickupTime">Godzina odbioru</Label>
                        <div className="relative mt-1 min-w-0 overflow-hidden rounded-md">
                          <select
                            id="pickupTime"
                            value={rentalPeriod.pickupTime}
                            onChange={handleRentalPeriodChange}
                            className={RENTAL_PERIOD_SELECT_CLASSNAME}
                          >
                            <option disabled>--:--</option>
                            {RENTAL_TIME_OPTIONS.map((t) => (
                              <option key={t} value={t}>
                                {formatRentalTimeOptionLabel(t)}
                              </option>
                            ))}
                          </select>
                          <ChevronDownIcon className="pointer-events-none absolute top-1/2 right-3 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                        </div>
                      </div>
                    </div>
                    <div className={RENTAL_PERIOD_LOCATION_ROW}>
                      <Label htmlFor="pickupLocation">Miejsce odbioru</Label>
                      <div className="relative mt-1 min-w-0 overflow-hidden rounded-md">
                        <select
                          id="pickupLocation"
                          value={rentalPeriod.pickupLocation}
                          onChange={handleRentalPeriodChange}
                          className={RENTAL_PERIOD_SELECT_CLASSNAME}
                        >
                          <option disabled value="">
                            Wybierz
                          </option>
                          {RENTAL_LOCATIONS_DATA.map((loc) => (
                            <option key={loc.title} value={loc.title}>
                              {formatLocationSelectLabel(loc)}
                            </option>
                          ))}
                        </select>
                        <ChevronDownIcon className="pointer-events-none absolute top-1/2 right-3 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                      </div>
                    </div>
                  </div>

                  <div className={`rental-period ${RENTAL_PERIOD_GROUP_BOX} space-y-4`}>
                    <div className={RENTAL_PERIOD_DATETIME_GRID}>
                      <div className={RENTAL_PERIOD_FIELD_CELL}>
                        <Label htmlFor="returnDate">Data zwrotu</Label>
                        <div className="relative mt-1 min-w-0 overflow-hidden rounded-md">
                          <Input
                            id="returnDate"
                            type="date"
                            value={rentalPeriod.returnDate}
                            min={rentalPeriod.pickupDate || today}
                            onChange={handleRentalPeriodChange}
                            required
                            className={RENTAL_PERIOD_DATE_INPUT_CLASSNAME}
                          />
                          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                            <CalendarDaysIcon className="h-5 w-5 shrink-0 text-muted-foreground" />
                          </div>
                        </div>
                      </div>
                      <div className={RENTAL_PERIOD_FIELD_CELL}>
                        <Label htmlFor="returnTime">Godzina zwrotu</Label>
                        <div className="relative mt-1 min-w-0 overflow-hidden rounded-md">
                          <select
                            id="returnTime"
                            value={rentalPeriod.returnTime}
                            onChange={handleRentalPeriodChange}
                            className={RENTAL_PERIOD_SELECT_CLASSNAME}
                          >
                            <option disabled>--:--</option>
                            {RENTAL_TIME_OPTIONS.map((t) => (
                              <option key={t} value={t}>
                                {formatRentalTimeOptionLabel(t)}
                              </option>
                            ))}
                          </select>
                          <ChevronDownIcon className="pointer-events-none absolute top-1/2 right-3 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                        </div>
                      </div>
                    </div>
                    <div className={RENTAL_PERIOD_LOCATION_ROW}>
                      <Label htmlFor="returnLocation">Miejsce zwrotu</Label>
                      <div className="relative mt-1 min-w-0 overflow-hidden rounded-md">
                        <select
                          id="returnLocation"
                          value={rentalPeriod.returnLocation}
                          onChange={handleRentalPeriodChange}
                          className={RENTAL_PERIOD_SELECT_CLASSNAME}
                        >
                          <option disabled value="">
                            Wybierz
                          </option>
                          {RENTAL_LOCATIONS_DATA.map((loc) => (
                            <option key={loc.title} value={loc.title}>
                              {formatLocationSelectLabel(loc)}
                            </option>
                          ))}
                        </select>
                        <ChevronDownIcon className="pointer-events-none absolute top-1/2 right-3 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              <section className="mt-8 min-w-0 max-w-full overflow-x-hidden">
                <h2 className="text-2xl font-bold tracking-tight">Opcje dodatkowe</h2>
                <div className="mt-3 space-y-3">
                  {ADDITIONAL_OPTIONS.map((opt) => (
                    <CheckboxOption
                      key={opt.id}
                      option={opt}
                      car={selected}
                      isChecked={additionalOptions[opt.id]}
                      onToggle={() => handleOptionToggle(opt.id)}
                    />
                  ))}
                </div>
              </section>

              <section className="mt-8">
                <h2 className="text-2xl font-bold tracking-tight">Szkic umowy</h2>
                <div className="mt-3">
                  <div className="hidden gap-4 lg:grid lg:grid-cols-2 xl:grid-cols-4">
                    {RENTAL_V2_SZKIC_UMOWY_DOCS.map((doc) => (
                      <V2LegalDocTile
                        key={doc.docSlug}
                        title={doc.title}
                        docSlug={doc.docSlug}
                        layout="grid"
                      />
                    ))}
                  </div>
                  <RentalV2E2ESlider>
                    {RENTAL_V2_SZKIC_UMOWY_DOCS.map((doc) => (
                      <V2LegalDocTile
                        key={doc.docSlug}
                        title={doc.title}
                        docSlug={doc.docSlug}
                        layout="slider"
                      />
                    ))}
                  </RentalV2E2ESlider>
                </div>
              </section>
            </div>

            <aside ref={summaryAsideRef} className="min-w-0 lg:col-span-1">
              <div className="lg:sticky lg:top-24">
                <div className="rounded-lg bg-secondary p-6">
                  <h2 className="text-3xl font-bold">Podsumowanie</h2>

                  <div className="my-4 border-t border-border" />

                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between gap-3">
                      <span className="text-muted-foreground">Okres wynajmu</span>
                      <span className="shrink-0 text-right font-medium">
                        {formatPolishRentalDays(summary.rentalDays)}
                      </span>
                    </div>
                    <div className="flex justify-between gap-3">
                      <span className="min-w-0 text-muted-foreground">
                        Cena wynajmu
                        {summary.rentalDays > 0
                          ? ` (${summary.tierPricePerDay.toLocaleString('pl-PL')} zł/db)`
                          : ''}
                      </span>
                      <span className="shrink-0 text-right font-medium">
                        {summary.rentalPrice > 0 ? `${summary.rentalPrice.toLocaleString('pl-PL')} zł` : '—'}
                      </span>
                    </div>
                    {summary.pickupFee > 0 && (
                      <div className="flex justify-between gap-3">
                        <span className="text-muted-foreground">Podstawienie auta</span>
                        <span className="shrink-0 text-right font-medium">
                          {`${summary.pickupFee.toLocaleString('pl-PL')} zł`}
                        </span>
                      </div>
                    )}
                    {summary.returnFee > 0 && (
                      <div className="flex justify-between gap-3">
                        <span className="text-muted-foreground">Odbiór auta</span>
                        <span className="shrink-0 text-right font-medium">
                          {`${summary.returnFee.toLocaleString('pl-PL')} zł`}
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="my-4 border-t border-border" />

                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between gap-3">
                      <span className="min-w-0 text-muted-foreground">
                        Limit kilometrów
                        {summary.rentalDays > 0
                          ? ` (${summary.tierKmLimitPerDay.toLocaleString('pl-PL')} km/db)`
                          : ''}
                      </span>
                      <span className="shrink-0 text-right font-medium">
                        {summary.totalKmLimit > 0 ? `${summary.totalKmLimit.toLocaleString('pl-PL')} km` : '—'}
                      </span>
                    </div>
                    <div className="flex justify-between gap-3">
                      <span className="text-muted-foreground">Koszt poza limitem</span>
                      <span className="shrink-0 text-right font-medium">
                        {summary.costPerKmOverLimit > 0
                          ? `${summary.costPerKmOverLimit.toLocaleString('pl-PL', {
                              minimumFractionDigits: 2,
                              maximumFractionDigits: 2,
                            })} zł/km`
                          : '—'}
                      </span>
                    </div>
                  </div>

                  <div className="my-4 border-t border-border" />

                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between gap-3">
                      <span className="text-muted-foreground">Opcje dodatkowe</span>
                      <span className="shrink-0 text-right font-medium">
                        {summary.optionsPrice > 0 ? `${summary.optionsPrice.toLocaleString('pl-PL')} zł` : '0 zł'}
                      </span>
                    </div>
                    {v2OptionLines.length > 0 && (
                      <ul className="list-none space-y-1.5 pl-0">
                        {v2OptionLines.map((line) => (
                          <li
                            key={line.id}
                            className="flex min-w-0 max-w-full items-baseline gap-1 pl-2 text-sm text-muted-foreground"
                            title={line.fullName}
                          >
                            <span className="shrink-0">- </span>
                            <span className="min-w-0 flex-1 truncate">{line.fullName}</span>
                            <span className="shrink-0">({line.detail})</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>

                  <div className="mt-6 flex justify-between border-t border-border pt-2 text-xl font-bold text-primary">
                    <span>Do zapłaty dziś</span>
                    <span>
                      {summary.totalPrice > 0 ? `${summary.totalPrice.toLocaleString('pl-PL')} zł` : '—'}
                    </span>
                  </div>
                  <div className="mt-2 flex justify-between text-sm">
                    <span className="text-muted-foreground">Kaucja (płatna w dniu odbioru)</span>
                    <span className="font-medium">{summary.deposit.toLocaleString('pl-PL')} zł</span>
                  </div>

                  <Button
                    type="button"
                    size="lg"
                    className="mt-6 h-14 w-full !bg-foreground text-lg font-semibold !text-background hover:!bg-foreground/90"
                  >
                    Zarezerwuj pojazd
                  </Button>
                </div>
                <div className="mt-4">
                  <div className="flex items-center justify-center gap-4">
                    <img src="https://img.apolloidea.com/img/pay-apple.svg" alt="Apple Pay" className="h-6" />
                    <img src="https://img.apolloidea.com/img/pay-google.svg" alt="Google Pay" className="h-6" />
                    <img src="https://img.apolloidea.com/img/pay-blik.svg" alt="BLIK" className="h-6" />
                    <img src="https://img.apolloidea.com/img/pay-visa.svg" alt="Visa" className="h-6" />
                    <img src="https://img.apolloidea.com/img/pay-mastercard.svg" alt="Mastercard" className="h-6" />
                    <img src="https://img.apolloidea.com/img/pay-maestro.svg" alt="Maestro" className="h-6" />
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </div>

      {/* Pływający CTA: tylko viewport < lg; pełna szerokość, bg do safe-area (pasek home / przeglądarka); ukryty gdy widać podsumowanie */}
      <div
        className={`fixed inset-x-0 bottom-0 z-50 w-full max-w-[100vw] bg-foreground lg:hidden ${summaryInView ? 'hidden' : ''}`}
        aria-hidden={summaryInView}
      >
        <div className="box-border w-full px-4 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-3">
          <button
            type="button"
            onClick={() => {
              summaryAsideRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }}
            className="w-full bg-transparent px-0 py-3 text-left text-background transition-opacity hover:opacity-90 active:opacity-80"
          >
            <div className="flex items-baseline justify-between gap-3 text-sm font-semibold leading-tight">
              <span>Zarezerwuj pojazd</span>
              <span className="shrink-0 tabular-nums">
                {summary.totalPrice > 0 ? `${summary.totalPrice.toLocaleString('pl-PL')} zł` : '—'}
              </span>
            </div>
            <div className="mt-1.5 text-xs font-normal leading-snug text-background/85">{floatingCtaSubline}</div>
          </button>
        </div>
      </div>
    </>
  );
};

export default RentalV2Page;
