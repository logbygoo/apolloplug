import React, { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import Seo from '../components/Seo';
import { Input, Label, PageHeader } from '../components/ui';
import { CheckIcon, InformationCircleIcon } from '../icons';
import { ADDITIONAL_OPTIONS, RENTAL_CARS, RENTAL_PERIOD_FIELD_CELL } from '../configs/rentConfig';
import { LOCATIONS } from '../configs/locationsConfig';
import { RENTAL_V2_RESERVATION_DRIVER_KEY, RENTAL_V2_SESSION_KEY } from '../configs/rentalV2Session';
import { formatRentalTimeOptionLabel } from '../configs/workConfig';
import {
  buildV2OptionLines,
  computeRentalV2Summary,
  formatPolishRentalDays,
  type RentalPeriodState,
} from '../utils/rentalV2Summary';
import type { Car } from '../types';

type RentalV2SessionStored = {
  selectedId: string;
  selectedBrandId: string;
  rentalPeriod: RentalPeriodState;
  additionalOptions: Record<(typeof ADDITIONAL_OPTIONS)[number]['id'], boolean>;
};

type ReservationType = 'private' | 'company';

type DriverFormState = {
  reservationType: ReservationType;
  nip: string;
  fullName: string;
  pesel: string;
  idDocumentNumber: string;
  licenseNumber: string;
  licenseBlanketNumber: string;
  address: string;
  postalCode: string;
  city: string;
  email: string;
  phone: string;
};

type AgreementsState = {
  terms: boolean;
  marketing: boolean;
  commercial: boolean;
};

const emptyAgreements = (): AgreementsState => ({
  terms: false,
  marketing: false,
  commercial: false,
});

const emptyDriver = (): DriverFormState => ({
  reservationType: 'private',
  nip: '',
  fullName: '',
  pesel: '',
  idDocumentNumber: '',
  licenseNumber: '',
  licenseBlanketNumber: '',
  address: '',
  postalCode: '',
  city: '',
  email: '',
  phone: '',
});

/** Desktop: hover; urządzenia bez precyzyjnego hover: tap przełącza; pozycja `fixed` + clamp do krawędzi okna. */
const Tooltip: React.FC<{ content: React.ReactNode; children: React.ReactNode }> = ({ content, children }) => {
  const triggerRef = useRef<HTMLDivElement>(null);
  const bubbleRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const [coords, setCoords] = useState<{ left: number; top: number } | null>(null);

  const isHoverUI = () =>
    typeof window !== 'undefined' && window.matchMedia('(hover: hover) and (pointer: fine)').matches;

  const updatePosition = useCallback(() => {
    const wrap = triggerRef.current;
    const bubble = bubbleRef.current;
    if (!wrap || !bubble) return;
    const margin = 10;
    const maxW = Math.min(240, window.innerWidth - 2 * margin);
    bubble.style.width = `${maxW}px`;
    bubble.style.boxSizing = 'border-box';
    const rect = wrap.getBoundingClientRect();
    const tw = bubble.offsetWidth;
    const th = bubble.offsetHeight;
    let left = rect.left + rect.width / 2 - tw / 2;
    left = Math.max(margin, Math.min(left, window.innerWidth - tw - margin));
    let top = rect.top - th - 8;
    if (top < margin) {
      top = rect.bottom + 8;
    }
    if (top + th > window.innerHeight - margin) {
      top = Math.max(margin, window.innerHeight - th - margin);
    }
    setCoords({ left, top });
  }, []);

  useLayoutEffect(() => {
    if (!open) {
      setCoords(null);
      return;
    }
    updatePosition();
    const ro = new ResizeObserver(() => updatePosition());
    if (bubbleRef.current) ro.observe(bubbleRef.current);
    window.addEventListener('resize', updatePosition);
    window.addEventListener('scroll', updatePosition, true);
    return () => {
      ro.disconnect();
      window.removeEventListener('resize', updatePosition);
      window.removeEventListener('scroll', updatePosition, true);
    };
  }, [open, updatePosition, content]);

  useEffect(() => {
    if (!open || isHoverUI()) return;
    const close = (ev: MouseEvent) => {
      if (triggerRef.current?.contains(ev.target as Node)) return;
      setOpen(false);
    };
    const t = window.setTimeout(() => document.addEventListener('click', close), 0);
    return () => {
      clearTimeout(t);
      document.removeEventListener('click', close);
    };
  }, [open]);

  return (
    <div
      ref={triggerRef}
      className="relative flex shrink-0 items-center"
      aria-expanded={open}
      onMouseEnter={() => {
        if (isHoverUI()) setOpen(true);
      }}
      onMouseLeave={() => {
        if (isHoverUI()) setOpen(false);
      }}
      onClick={(e) => {
        if (!isHoverUI()) {
          e.preventDefault();
          e.stopPropagation();
          setOpen((o) => !o);
        }
      }}
      onFocusCapture={(e) => {
        const t = e.target as HTMLElement;
        if (
          triggerRef.current?.contains(t) &&
          typeof t.matches === 'function' &&
          t.matches(':focus-visible')
        ) {
          setOpen(true);
        }
      }}
      onBlurCapture={(e) => {
        if (!triggerRef.current?.contains(e.relatedTarget as Node)) setOpen(false);
      }}
    >
      {React.isValidElement(children)
        ? React.cloneElement(children as React.ReactElement<{ onKeyDown?: (ev: React.KeyboardEvent) => void }>, {
            onKeyDown: (ev: React.KeyboardEvent) => {
              if (ev.key === 'Enter' || ev.key === ' ') {
                ev.preventDefault();
                setOpen((o) => !o);
              }
              const prev = (children as React.ReactElement<{ onKeyDown?: typeof ev }>).props.onKeyDown;
              prev?.(ev);
            },
          })
        : children}
      {open && (
        <div
          ref={bubbleRef}
          role="tooltip"
          className="pointer-events-none fixed z-[100] box-border rounded-md bg-foreground p-2 text-left text-xs leading-snug text-background shadow-lg transition-opacity"
          style={
            coords
              ? { left: coords.left, top: coords.top, opacity: 1 }
              : { left: -9999, top: 0, visibility: 'hidden' as const, opacity: 0 }
          }
        >
          {content}
        </div>
      )}
    </div>
  );
};

const AgreementCheckbox: React.FC<{
  id: string;
  label: React.ReactNode;
  isChecked: boolean;
  onToggle: () => void;
  highlightError?: boolean;
}> = ({ id, label, isChecked, onToggle, highlightError }) => (
  <div
    className={`rounded-md transition-colors ${
      highlightError ? 'bg-destructive/10 p-2 ring-2 ring-destructive' : ''
    }`}
  >
    <div className="flex items-start">
      <label htmlFor={id} className="flex min-w-0 cursor-pointer items-start group">
        <input id={id} type="checkbox" checked={isChecked} onChange={onToggle} className="absolute h-0 w-0 opacity-0" />
        <div
          className={`relative mt-0.5 mr-3 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-sm transition-all ${
            isChecked ? 'bg-foreground' : 'bg-secondary'
          }`}
        >
          {isChecked && <CheckIcon className="h-3.5 w-3.5 text-background" strokeWidth={3} />}
        </div>
        <span className="min-w-0 flex-1 break-words text-sm text-muted-foreground transition-colors group-hover:text-foreground">
          {label}
        </span>
      </label>
    </div>
  </div>
);

function formatPlDate(iso: string): string {
  const p = iso.split('-');
  if (p.length !== 3) return iso;
  const [y, m, d] = p;
  return `${d}.${m}.${y}`;
}

function loadSessionForCar(carId: string): RentalV2SessionStored | null {
  try {
    const raw = sessionStorage.getItem(RENTAL_V2_SESSION_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Partial<RentalV2SessionStored>;
    if (!parsed?.selectedId || parsed.selectedId !== carId || !parsed.rentalPeriod) return null;
    if (!RENTAL_CARS.some((c) => c.id === parsed.selectedId)) return null;
    return parsed as RentalV2SessionStored;
  } catch {
    return null;
  }
}

function loadReservationForm(carId: string): { driver: DriverFormState; agreements: AgreementsState } {
  try {
    const raw = sessionStorage.getItem(RENTAL_V2_RESERVATION_DRIVER_KEY);
    if (!raw) return { driver: emptyDriver(), agreements: emptyAgreements() };
    const parsed = JSON.parse(raw) as Record<string, unknown>;
    if (parsed.forCarId !== carId) return { driver: emptyDriver(), agreements: emptyAgreements() };
    const b = emptyDriver();
    const ag = parsed.agreements as Partial<AgreementsState> | undefined;
    return {
      driver: {
        ...b,
        reservationType: parsed.reservationType === 'company' ? 'company' : 'private',
        nip: String(parsed.nip ?? ''),
        fullName: String(parsed.fullName ?? ''),
        pesel: String(parsed.pesel ?? ''),
        idDocumentNumber: String(parsed.idDocumentNumber ?? ''),
        licenseNumber: String(parsed.licenseNumber ?? ''),
        licenseBlanketNumber: String(parsed.licenseBlanketNumber ?? ''),
        address: String(parsed.address ?? ''),
        postalCode: String(parsed.postalCode ?? ''),
        city: String(parsed.city ?? ''),
        email: String(parsed.email ?? ''),
        phone: String(parsed.phone ?? ''),
      },
      agreements: {
        terms: Boolean(ag?.terms),
        marketing: Boolean(ag?.marketing),
        commercial: Boolean(ag?.commercial),
      },
    };
  } catch {
    return { driver: emptyDriver(), agreements: emptyAgreements() };
  }
}

const RENTAL_V2_SHELL_STYLES = `
  .rental-v2 {
    --container-width: 100%;
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

/** Jak data/godzina na v1 (breakpoint 350px), kolumny równe 50/50. */
const RESERVATION_PAIR_GRID =
  'grid w-full min-w-0 max-w-full grid-cols-1 gap-4 min-[350px]:grid-cols-2 min-[350px]:items-end';

const RentalReservationPage: React.FC = () => {
  const { carId } = useParams<{ carId: string }>();
  const [ready, setReady] = useState(false);

  /** Na tej stronie wyłączamy pinch-zoom / auto-zoom przy focusie w polach (iOS). Przy opuszczeniu trasy przywracamy viewport. */
  useEffect(() => {
    const meta = document.querySelector('meta[name="viewport"]');
    if (!meta) return;
    const previous = meta.getAttribute('content') ?? '';
    meta.setAttribute(
      'content',
      'width=device-width, initial-scale=1, maximum-scale=1, minimum-scale=1, user-scalable=no, viewport-fit=cover'
    );
    return () => {
      meta.setAttribute('content', previous);
    };
  }, []);
  const [session, setSession] = useState<RentalV2SessionStored | null>(null);
  const [driver, setDriver] = useState<DriverFormState>(() => emptyDriver());
  const [agreements, setAgreements] = useState<AgreementsState>(() => emptyAgreements());
  const [agreementAttempted, setAgreementAttempted] = useState(false);
  const agreementsRef = useRef<HTMLDivElement>(null);

  const car = carId ? RENTAL_CARS.find((c) => c.id === carId) : undefined;

  useEffect(() => {
    if (!carId) {
      setSession(null);
      setReady(true);
      return;
    }
    const s = loadSessionForCar(carId);
    setSession(s);
    const loaded = loadReservationForm(carId);
    setDriver(loaded.driver);
    setAgreements(loaded.agreements);
    setReady(true);
  }, [carId]);

  useEffect(() => {
    if (!carId || !ready) return;
    try {
      sessionStorage.setItem(
        RENTAL_V2_RESERVATION_DRIVER_KEY,
        JSON.stringify({ ...driver, forCarId: carId, agreements })
      );
    } catch {
      /* ignore */
    }
  }, [driver, agreements, carId, ready]);

  const selected: Car = car ?? RENTAL_CARS[0];
  const rentalPeriod = session?.rentalPeriod;
  const additionalOptions = session?.additionalOptions;

  const summary = useMemo(() => {
    if (!rentalPeriod || !additionalOptions) {
      return computeRentalV2Summary(
        {
          pickupDate: '',
          pickupTime: '',
          pickupLocation: '',
          returnDate: '',
          returnTime: '',
          returnLocation: '',
        },
        selected,
        Object.fromEntries(ADDITIONAL_OPTIONS.map((o) => [o.id, false])) as Record<
          (typeof ADDITIONAL_OPTIONS)[number]['id'],
          boolean
        >
      );
    }
    return computeRentalV2Summary(rentalPeriod, selected, additionalOptions);
  }, [rentalPeriod, additionalOptions, selected]);

  const v2OptionLines = useMemo(() => {
    if (!additionalOptions) return [];
    return buildV2OptionLines(selected, additionalOptions);
  }, [additionalOptions, selected]);

  /** Ten sam obraz co karty „Wybierz model” (pierwsze zdjęcie z konfiguracji modelu). */
  const modelCardImage = selected.imageUrl[0];

  const pickupLoc = rentalPeriod ? LOCATIONS.find((l) => l.title === rentalPeriod.pickupLocation) : undefined;
  const returnLoc = rentalPeriod ? LOCATIONS.find((l) => l.title === rentalPeriod.returnLocation) : undefined;

  const pickupLine =
    rentalPeriod &&
    `Odbiór: ${formatPlDate(rentalPeriod.pickupDate)} · ${formatRentalTimeOptionLabel(rentalPeriod.pickupTime)} · ${
      pickupLoc?.address ?? rentalPeriod.pickupLocation
    }`;

  const returnLine =
    rentalPeriod &&
    `Zwrot: ${formatPlDate(rentalPeriod.returnDate)} · ${formatRentalTimeOptionLabel(rentalPeriod.returnTime)} · ${
      returnLoc?.address ?? rentalPeriod.returnLocation
    }`;

  const handleDriverChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setDriver((prev) => ({ ...prev, [id]: value }));
  };

  const handleAgreementToggle = (key: keyof AgreementsState) => {
    setAgreements((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (driver.reservationType === 'company' && !driver.nip.trim()) {
      return;
    }
    if (!agreements.terms || !agreements.marketing) {
      setAgreementAttempted(true);
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          agreementsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
      });
      return;
    }
    /* Płatność — do podłączenia */
  };

  if (!ready) {
    return null;
  }

  if (!carId || !car || !session || !rentalPeriod || !additionalOptions) {
    return <Navigate to="/wypozyczalnia-v2" replace />;
  }

  const breadcrumbs = [
    { name: 'Wypożyczalnia', path: '/wypozyczalnia' },
    { name: 'Rezerwacja' },
  ];

  return (
    <>
      <Seo title={`Rezerwacja — ${selected.name}`} description="Dane kierowcy i podsumowanie rezerwacji." />
      <style>{RENTAL_V2_SHELL_STYLES}</style>
      <div className="rental-v2 min-h-screen w-full min-w-0 max-w-full overflow-x-hidden bg-background pb-16 text-foreground">
        <div className="mb-8 w-full border-b border-border bg-secondary">
          <div className="rental-v2-page-header">
            <PageHeader title="Rezerwacja" breadcrumbs={breadcrumbs} />
          </div>
        </div>

        <div className="container mx-auto min-w-0 max-w-full px-4 pb-6 md:px-6">
          <div className="grid min-w-0 max-w-full grid-cols-1 gap-8 overflow-x-hidden lg:grid-cols-3 lg:gap-12">
            <div className="min-w-0 max-w-full lg:col-span-2">
              <form id="rental-driver-form" onSubmit={handleSubmit} className="min-w-0 max-w-full space-y-6">
                <div className="flex w-full rounded-lg border border-border bg-secondary p-1.5">
                  <button
                    type="button"
                    onClick={() => setDriver((d) => ({ ...d, reservationType: 'private' }))}
                    className={`flex-1 rounded-md px-3 py-2.5 text-sm font-medium transition-colors sm:text-base ${
                      driver.reservationType === 'private'
                        ? 'bg-foreground text-background'
                        : 'text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    Wynajem Prywatny
                  </button>
                  <span className="flex shrink-0 items-center px-1 text-muted-foreground" aria-hidden>
                    |
                  </span>
                  <button
                    type="button"
                    onClick={() => setDriver((d) => ({ ...d, reservationType: 'company' }))}
                    className={`flex-1 rounded-md px-3 py-2.5 text-sm font-medium transition-colors sm:text-base ${
                      driver.reservationType === 'company'
                        ? 'bg-foreground text-background'
                        : 'text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    Wynajem Firmowy
                  </button>
                </div>

                <div className="space-y-4">
                  {driver.reservationType === 'company' ? (
                    <div className={RESERVATION_PAIR_GRID}>
                      <div className={RENTAL_PERIOD_FIELD_CELL}>
                        <Label htmlFor="fullName">Imię i nazwisko</Label>
                        <Input
                          id="fullName"
                          value={driver.fullName}
                          onChange={handleDriverChange}
                          required
                          className="mt-1"
                        />
                      </div>
                      <div className={RENTAL_PERIOD_FIELD_CELL}>
                        <Label htmlFor="nip">NIP</Label>
                        <Input id="nip" value={driver.nip} onChange={handleDriverChange} required className="mt-1" />
                      </div>
                    </div>
                  ) : (
                    <div className={RENTAL_PERIOD_FIELD_CELL}>
                      <Label htmlFor="fullName">Imię i nazwisko</Label>
                      <Input id="fullName" value={driver.fullName} onChange={handleDriverChange} required className="mt-1" />
                    </div>
                  )}

                  <div className={RESERVATION_PAIR_GRID}>
                    <div className={RENTAL_PERIOD_FIELD_CELL}>
                      <Label htmlFor="pesel">PESEL</Label>
                      <Input id="pesel" value={driver.pesel} onChange={handleDriverChange} required className="mt-1" />
                    </div>
                    <div className={RENTAL_PERIOD_FIELD_CELL}>
                      <Label htmlFor="idDocumentNumber">Nr dowodu</Label>
                      <Input
                        id="idDocumentNumber"
                        value={driver.idDocumentNumber}
                        onChange={handleDriverChange}
                        required
                        className="mt-1"
                      />
                    </div>
                  </div>

                  <div className={RESERVATION_PAIR_GRID}>
                    <div className={RENTAL_PERIOD_FIELD_CELL}>
                      <Label htmlFor="licenseNumber">Numer prawa jazdy</Label>
                      <Input
                        id="licenseNumber"
                        value={driver.licenseNumber}
                        onChange={handleDriverChange}
                        required
                        className="mt-1"
                      />
                    </div>
                    <div className={RENTAL_PERIOD_FIELD_CELL}>
                      <div className="flex items-center gap-1.5">
                        <Label htmlFor="licenseBlanketNumber" className="mb-0">
                          Nr. blankietu prawa jazdy
                        </Label>
                        <Tooltip content="Numer blankietu prawa jazdy spod kodu kreskowego na odwrocie dokumentu">
                          <span
                            className="inline-flex shrink-0 text-muted-foreground"
                            tabIndex={0}
                            aria-label="Numer blankietu prawa jazdy spod kodu kreskowego na odwrocie dokumentu"
                          >
                            <InformationCircleIcon className="h-4 w-4" />
                          </span>
                        </Tooltip>
                      </div>
                      <Input
                        id="licenseBlanketNumber"
                        value={driver.licenseBlanketNumber}
                        onChange={handleDriverChange}
                        required
                        className="mt-1"
                      />
                    </div>
                  </div>

                  <div className={RENTAL_PERIOD_FIELD_CELL}>
                    <Label htmlFor="address">Adres zamieszkania</Label>
                    <Input id="address" value={driver.address} onChange={handleDriverChange} required className="mt-1" />
                  </div>

                  <div className={RESERVATION_PAIR_GRID}>
                    <div className={RENTAL_PERIOD_FIELD_CELL}>
                      <Label htmlFor="postalCode">Kod pocztowy</Label>
                      <Input id="postalCode" value={driver.postalCode} onChange={handleDriverChange} required className="mt-1" />
                    </div>
                    <div className={RENTAL_PERIOD_FIELD_CELL}>
                      <Label htmlFor="city">Miejscowość</Label>
                      <Input id="city" value={driver.city} onChange={handleDriverChange} required className="mt-1" />
                    </div>
                  </div>

                  <div className={RESERVATION_PAIR_GRID}>
                    <div className={RENTAL_PERIOD_FIELD_CELL}>
                      <Label htmlFor="email">E-mail</Label>
                      <Input id="email" type="email" value={driver.email} onChange={handleDriverChange} required className="mt-1" />
                    </div>
                    <div className={RENTAL_PERIOD_FIELD_CELL}>
                      <Label htmlFor="phone">Telefon</Label>
                      <Input id="phone" type="tel" value={driver.phone} onChange={handleDriverChange} required className="mt-1" />
                    </div>
                  </div>
                </div>

                <div ref={agreementsRef} className="scroll-mt-28 space-y-4 border-t border-border pt-6">
                  <AgreementCheckbox
                    id="res-terms"
                    highlightError={agreementAttempted && !agreements.terms}
                    label={
                      <>
                        Akceptuję{' '}
                        <Link
                          to="/dokumentacja"
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="underline hover:text-foreground"
                        >
                          regulamin
                        </Link>{' '}
                        oraz{' '}
                        <Link
                          to="/dokumentacja"
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="underline hover:text-foreground"
                        >
                          politykę prywatności
                        </Link>{' '}
                        apolloidea.com <span className="text-destructive">*</span>
                      </>
                    }
                    isChecked={agreements.terms}
                    onToggle={() => handleAgreementToggle('terms')}
                  />
                  <AgreementCheckbox
                    id="res-marketing"
                    highlightError={agreementAttempted && !agreements.marketing}
                    label={
                      <>
                        Potwierdzam zapoznanie się ze wzorem umowy najmu i protokołu odbioru/zwrotu pojazdu{' '}
                        <span className="text-destructive">*</span>
                      </>
                    }
                    isChecked={agreements.marketing}
                    onToggle={() => handleAgreementToggle('marketing')}
                  />
                  <AgreementCheckbox
                    id="res-commercial"
                    label="Wyrażam zgodę na otrzymywanie informacji handlowych drogą elektroniczną i SMS."
                    isChecked={agreements.commercial}
                    onToggle={() => handleAgreementToggle('commercial')}
                  />
                </div>
              </form>
            </div>

            <aside className="min-w-0 max-w-full scroll-mt-[4.5rem] lg:col-span-1">
              <div className="lg:sticky lg:top-24">
                <div className="min-w-0 max-w-full overflow-hidden rounded-lg bg-secondary p-6">
                  <p className="mb-3 text-center">
                    <Link to="/wypozyczalnia-v2" className="text-sm font-medium text-foreground underline underline-offset-4 hover:text-muted-foreground">
                      Zmodyfikuj rezerwację
                    </Link>
                  </p>
                  <div className="mb-4 flex min-w-0 items-center gap-3">
                    <div className="w-[30%] max-w-[140px] shrink-0">
                      <img src={modelCardImage} alt="" className="h-auto w-full object-contain" />
                    </div>
                    <h2 className="min-w-0 flex-1 text-xl font-bold leading-tight sm:text-2xl">{selected.name}</h2>
                  </div>

                  <div className="mt-4 space-y-2 border-t border-border pt-4 text-sm">
                    <p className="whitespace-normal break-words font-medium leading-snug">{pickupLine}</p>
                    <p className="whitespace-normal break-words font-medium leading-snug">{returnLine}</p>
                  </div>

                  <h3 className="mt-6 text-xl font-bold">Podsumowanie</h3>
                  <div className="my-4 border-t border-border" />

                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between gap-3">
                      <span className="text-muted-foreground">Okres wynajmu</span>
                      <span className="shrink-0 text-right font-medium">{formatPolishRentalDays(summary.rentalDays)}</span>
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

                  <button
                    type="submit"
                    form="rental-driver-form"
                    className="mt-6 flex h-14 w-full items-center justify-center rounded-md bg-foreground text-lg font-semibold text-background transition-colors hover:bg-foreground/90"
                  >
                    Zarezerwuj i Opłać
                  </button>
                </div>
                <div className="mt-4 min-w-0 max-w-full">
                  <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
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
    </>
  );
};

export default RentalReservationPage;
