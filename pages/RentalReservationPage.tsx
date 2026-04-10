import React, { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom';
import Seo from '../components/Seo';
import { Button, Input, Label, PageHeader } from '../components/ui';
import { CheckIcon, InformationCircleIcon } from '../icons';
import { ADDITIONAL_OPTIONS, RENTAL_CARS, RENTAL_PERIOD_FIELD_CELL } from '../configs/rentConfig';
import { buildReservationFormDataFromV2 } from '../configs/rentalReservationFormData';
import {
  createReservationAdminEmailPayload,
  createReservationCustomerEmailPayload,
  createPaymentConfirmationAdminEmailPayload,
} from '../configs/notifications/emailTemplates';
import { createReservationAdminSmsPayload, createReservationCustomerSmsPayload } from '../configs/notifications/smsTemplates';
import { mailApiUrl, smsApiUrl } from '../configs/notifications/apiEndpoints';
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

const reservationNumberStorageKey = (id: string) => `rentalV2ReservationNumber_${id}`;

declare global {
  interface Window {
    gtag?: (command: string, action: string, params?: Record<string, unknown>) => void;
  }
}

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

/** Jedna linia etykiety; nadmiar jako … (wymaga min-w-0 na komórce siatki). */
const FORM_LABEL_CLASS = 'block min-w-0 truncate';

/** Etykieta + ikona „i” z tooltipem (etykieta obcina się w jednej linii). */
const ReservationLabelHint: React.FC<{
  htmlFor: string;
  children: React.ReactNode;
  tooltip: React.ReactNode;
  ariaLabel: string;
}> = ({ htmlFor, children, tooltip, ariaLabel }) => (
  <div className="flex min-w-0 items-center gap-1.5">
    <Label htmlFor={htmlFor} className="mb-0 min-w-0 flex-1 truncate">
      {children}
    </Label>
    <Tooltip content={tooltip}>
      <span className="inline-flex shrink-0 text-muted-foreground" tabIndex={0} aria-label={ariaLabel}>
        <InformationCircleIcon className="h-4 w-4" />
      </span>
    </Tooltip>
  </div>
);

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

/** Jak pola daty/czasu na wypożyczalni — minmax(0,…) + bez max-w-full na siatce (nie psuje .container). */
const RESERVATION_PAIR_GRID =
  'grid w-full min-w-0 grid-cols-1 gap-4 min-[350px]:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] min-[350px]:items-end';

const RentalReservationPage: React.FC = () => {
  const navigate = useNavigate();
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
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  /** Dane kierowcy → płatność (jak krok 2 na starej wypożyczalni) → podziękowanie. */
  const [flowStep, setFlowStep] = useState<'driver' | 'payment' | 'done'>('driver');
  const [reservationNumber, setReservationNumber] = useState('');
  const [isPaymentFinalizing, setIsPaymentFinalizing] = useState(false);
  const agreementsRef = useRef<HTMLDivElement>(null);
  /** Ostatni payload rezerwacji — do maila potwierdzenia płatności. */
  const lastReservationPayloadRef = useRef<ReturnType<typeof buildReservationFormDataFromV2> | null>(null);

  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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

  useEffect(() => {
    if (!carId) return;
    try {
      const saved = sessionStorage.getItem(reservationNumberStorageKey(carId));
      if (saved) setReservationNumber(saved);
    } catch {
      /* ignore */
    }
  }, [carId]);

  useEffect(() => {
    if (!carId || !reservationNumber) return;
    try {
      sessionStorage.setItem(reservationNumberStorageKey(carId), reservationNumber);
    } catch {
      /* ignore */
    }
  }, [carId, reservationNumber]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [flowStep]);

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);
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
    if (!session || !rentalPeriod || !additionalOptions || summary.totalPrice <= 0 || summary.rentalDays <= 0) {
      setSubmitError('Brak poprawnego podsumowania rezerwacji. Wróć do wypożyczalni i uzupełnij okres najmu.');
      return;
    }

    const formPayload = buildReservationFormDataFromV2(
      selected,
      session.selectedBrandId,
      rentalPeriod,
      driver,
      additionalOptions
    );

    setIsSubmitting(true);
    try {
      const adminEmailPayload = createReservationAdminEmailPayload(formPayload, summary, agreements);
      const adminResponse = await fetch(mailApiUrl(), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(adminEmailPayload),
      });
      if (!adminResponse.ok) throw new Error('Nie udało się wysłać powiadomienia do biura.');

      const customerEmailPayload = createReservationCustomerEmailPayload(formPayload, summary);
      const customerResponse = await fetch(mailApiUrl(), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(customerEmailPayload),
      });
      if (!customerResponse.ok) {
        console.warn('Nie udało się wysłać e-maila do klienta; administrator został powiadomiony.');
      }

      const adminSmsPayload = createReservationAdminSmsPayload(formPayload, summary);
      fetch(smsApiUrl(), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(adminSmsPayload),
      }).catch((err) => console.warn('SMS do admina:', err));

      const customerSmsPayload = createReservationCustomerSmsPayload(formPayload);
      fetch(smsApiUrl(), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(customerSmsPayload),
      }).catch((err) => console.warn('SMS do klienta:', err));

      if (typeof window.gtag === 'function') {
        window.gtag('event', 'conversion', {
          send_to: 'AW-17760954062/WQuYCP6q7McbEM7NipVC',
          value: 1.0,
          currency: 'PLN',
        });
      }

      lastReservationPayloadRef.current = formPayload;
      const num = reservationNumber.trim() || `AP-${Date.now()}`;
      setReservationNumber(num);
      setFlowStep('payment');
      window.scrollTo(0, 0);
    } catch (err) {
      console.error(err);
      setSubmitError(
        err instanceof Error ? err.message : 'Wystąpił błąd podczas wysyłania rezerwacji. Spróbuj ponownie.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const paymentMethods = [{ id: 'payu', name: 'PayU' as const }];
  const selectedPaymentMethod = 'payu';
  const paymentAmount = summary.totalPrice > 0 ? summary.totalPrice.toFixed(2) : '0.00';
  const paymentName = reservationNumber || `AP-${Date.now()}`;
  const payuPaymentUrl = `https://rent.ffgroup.pl/pay/?name=${encodeURIComponent(paymentName)}&amount=${encodeURIComponent(paymentAmount)}`;

  const handleFinalSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!session || !rentalPeriod || !additionalOptions) return;
    const payload =
      lastReservationPayloadRef.current ??
      buildReservationFormDataFromV2(selected, session.selectedBrandId, rentalPeriod, driver, additionalOptions);
    setIsPaymentFinalizing(true);
    try {
      await new Promise((r) => setTimeout(r, 1500));
      const paymentMethodName = paymentMethods.find((p) => p.id === selectedPaymentMethod)?.name || 'Nieznana';
      const paymentConfirmationPayload = createPaymentConfirmationAdminEmailPayload(payload, summary, paymentMethodName);
      const response = await fetch(mailApiUrl(), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(paymentConfirmationPayload),
      });
      if (!response.ok) {
        console.warn('Nie udało się wysłać e-maila potwierdzającego płatność do administratora.');
      }
      setFlowStep('done');
    } catch (err) {
      console.error(err);
      setFlowStep('done');
    } finally {
      setIsPaymentFinalizing(false);
    }
  };

  if (!ready) {
    return null;
  }

  if (!carId || !car || !session || !rentalPeriod || !additionalOptions) {
    return <Navigate to="/wypozyczalnia" replace />;
  }

  const breadcrumbs = [
    { name: 'Wypożyczalnia', path: '/wypozyczalnia' },
    { name: flowStep === 'payment' ? 'Płatność' : 'Rezerwacja' },
  ];

  if (flowStep === 'done') {
    return (
      <>
        <Seo title={`Rezerwacja zakończona — ${selected.name}`} description="Potwierdzenie rezerwacji w Apollo Idea." />
        <div className="container mx-auto flex min-h-[calc(100vh-8rem)] max-w-2xl flex-col items-center justify-center px-4 py-24 text-center">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Dziękujemy za rezerwację</h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Potwierdzenie dla {selected.name} zostało wysłane na adres {driver.email.trim()}.
          </p>
          <Button type="button" className="mt-10" size="lg" onClick={() => navigate('/wypozyczalnia')}>
            Zarezerwuj kolejny pojazd
          </Button>
        </div>
      </>
    );
  }

  return (
    <>
      <Seo title={`Rezerwacja — ${selected.name}`} description="Dane kierowcy i podsumowanie rezerwacji." />
      <style>{RENTAL_V2_SHELL_STYLES}</style>
      <div className="rental-v2 min-h-screen overflow-x-hidden bg-background pb-16 text-foreground">
        <div className="mb-8 w-full border-b border-border bg-secondary">
          <div className="rental-v2-page-header">
            <PageHeader
              title={flowStep === 'payment' ? 'Płatność' : 'Rezerwacja'}
              subtitle={flowStep === 'payment' ? 'Dokonaj płatności za wynajem — bezpiecznie przez operatora PayU' : undefined}
              breadcrumbs={breadcrumbs}
            />
          </div>
        </div>

        <div className="container mx-auto min-w-0 px-4 pb-6 md:px-6">
          {flowStep === 'payment' ? (
            <form onSubmit={handleFinalSubmit}>
              <div className="grid min-w-0 grid-cols-1 gap-8 overflow-x-visible lg:grid-cols-3 lg:gap-12">
                <div className="min-w-0 overflow-x-visible lg:col-span-2">
                  <section className="pt-0">
                    <h2 className="text-2xl font-bold tracking-tight">Metoda płatności</h2>
                    <div className="mt-6 space-y-3">
                      {paymentMethods.map((method) => (
                        <div key={method.id} className="rounded-lg border border-sky-300">
                          <div className="flex items-center rounded-t-lg bg-secondary/50 p-4">
                            <span className="font-medium">{method.name}</span>
                          </div>
                          <div className="border-t border-sky-300 bg-sky-50 p-6">
                            <h3 className="mb-2 text-lg font-semibold">Płatność PayU</h3>
                            <p className="text-muted-foreground">
                              Po kliknięciu przycisku &quot;Opłać rezerwację&quot; zostaniesz przekierowany na stronę operatora
                              płatności PayU, aby bezpiecznie dokończyć transakcję.
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </section>
                </div>

                <aside className="min-w-0 scroll-mt-[4.5rem] lg:col-span-1">
                  <div className="lg:sticky lg:top-24">
                    <div className="space-y-6 rounded-lg bg-secondary p-6">
                      <h2 className="text-3xl font-bold">Podsumowanie</h2>
                      <div className="space-y-2 border-t border-border pt-4">
                        <div className="flex justify-between gap-3">
                          <span className="text-muted-foreground">Okres najmu</span>
                          <span className="font-medium">
                            {summary.rentalDays > 0 ? `${summary.rentalDays} dni` : '—'}
                          </span>
                        </div>
                        {summary.pickupFee > 0 && (
                          <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">Podstawienie auta</span>
                            <span className="font-medium">{`${summary.pickupFee.toLocaleString('pl-PL')} zł`}</span>
                          </div>
                        )}
                        {summary.returnFee > 0 && (
                          <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">Odbiór auta</span>
                            <span className="font-medium">{`${summary.returnFee.toLocaleString('pl-PL')} zł`}</span>
                          </div>
                        )}
                        <div className="mt-2 flex justify-between border-t border-border pt-2 text-xl font-bold text-primary">
                          <span>Cena łącznie</span>
                          <span>{summary.totalPrice > 0 ? `${summary.totalPrice.toLocaleString('pl-PL')} zł` : '—'}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Kaucja (płatna przy odbiorze)</span>
                          <span className="font-medium">{summary.deposit.toLocaleString('pl-PL')} zł</span>
                        </div>
                        <div className="flex justify-between pt-2 font-bold">
                          <span className="text-muted-foreground">Do zapłaty (za wynajem)</span>
                          <span className="font-medium">
                            {summary.totalPrice > 0 ? `${summary.totalPrice.toLocaleString('pl-PL')} zł` : '—'}
                          </span>
                        </div>
                      </div>
                      <div className="flex flex-col gap-3">
                        <Button
                          type="button"
                          size="lg"
                          className="w-full"
                          disabled={isPaymentFinalizing || summary.totalPrice <= 0}
                          onClick={() => {
                            window.location.href = payuPaymentUrl;
                          }}
                        >
                          Opłać rezerwację
                        </Button>
                        <Button
                          type="submit"
                          variant="secondary"
                          className="w-full"
                          disabled={isPaymentFinalizing || summary.totalPrice <= 0}
                        >
                          {isPaymentFinalizing ? 'Przetwarzanie…' : 'Potwierdź płatność (zakończ rezerwację)'}
                        </Button>
                        <Button
                          type="button"
                          variant="secondary"
                          className="w-full"
                          disabled={isPaymentFinalizing}
                          onClick={() => setFlowStep('driver')}
                        >
                          Wróć do danych kierowcy
                        </Button>
                      </div>
                    </div>
                  </div>
                </aside>
              </div>
            </form>
          ) : (
          <div className="grid min-w-0 grid-cols-1 gap-8 overflow-x-visible lg:grid-cols-3 lg:gap-12">
            <div className="min-w-0 overflow-x-visible lg:col-span-2">
              <form id="rental-driver-form" onSubmit={handleSubmit} className="space-y-6">
                {submitError && (
                  <div className="rounded-md border border-destructive/40 bg-destructive/10 px-4 py-3 text-sm text-destructive">
                    {submitError}
                  </div>
                )}
                <fieldset disabled={isSubmitting} className="min-w-0 space-y-6 border-0 p-0">
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
                        <Label htmlFor="fullName" className={FORM_LABEL_CLASS}>
                          Imię i nazwisko
                        </Label>
                        <Input
                          id="fullName"
                          value={driver.fullName}
                          onChange={handleDriverChange}
                          required
                          className="mt-1"
                        />
                      </div>
                      <div className={RENTAL_PERIOD_FIELD_CELL}>
                        <Label htmlFor="nip" className={FORM_LABEL_CLASS}>
                          NIP
                        </Label>
                        <Input id="nip" value={driver.nip} onChange={handleDriverChange} required className="mt-1" />
                      </div>
                    </div>
                  ) : (
                    <div className={RENTAL_PERIOD_FIELD_CELL}>
                      <Label htmlFor="fullName" className={FORM_LABEL_CLASS}>
                        Imię i nazwisko
                      </Label>
                      <Input id="fullName" value={driver.fullName} onChange={handleDriverChange} required className="mt-1" />
                    </div>
                  )}

                  <div className={RESERVATION_PAIR_GRID}>
                    <div className={RENTAL_PERIOD_FIELD_CELL}>
                      <ReservationLabelHint
                        htmlFor="pesel"
                        tooltip="11-cyfrowy numer PESEL (bez spacji i znaków)"
                        ariaLabel="11-cyfrowy numer PESEL (bez spacji i znaków)"
                      >
                        PESEL
                      </ReservationLabelHint>
                      <Input id="pesel" value={driver.pesel} onChange={handleDriverChange} required className="mt-1" />
                    </div>
                    <div className={RENTAL_PERIOD_FIELD_CELL}>
                      <ReservationLabelHint
                        htmlFor="idDocumentNumber"
                        tooltip="Seria i numer dokumentu np. ZZC108201 lub ZE3012539"
                        ariaLabel="Seria i numer dokumentu np. ZZC108201 lub ZE3012539"
                      >
                        Nr. dowodu lub paszportu
                      </ReservationLabelHint>
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
                      <ReservationLabelHint
                        htmlFor="licenseNumber"
                        tooltip="Pozycja 5 na przodzie dokumentu np. SP006/16/8"
                        ariaLabel="Pozycja 5 na przodzie dokumentu np. SP006/16/8"
                      >
                        Numer prawa jazdy
                      </ReservationLabelHint>
                      <Input
                        id="licenseNumber"
                        value={driver.licenseNumber}
                        onChange={handleDriverChange}
                        required
                        className="mt-1"
                      />
                    </div>
                    <div className={RENTAL_PERIOD_FIELD_CELL}>
                      <ReservationLabelHint
                        htmlFor="licenseBlanketNumber"
                        tooltip="Numer blankietu prawa jazdy spod kodu kreskowego na odwrocie dokumentu np. SP006168"
                        ariaLabel="Numer blankietu prawa jazdy spod kodu kreskowego na odwrocie dokumentu np. SP006168"
                      >
                        Nr. blankietu prawa jazdy
                      </ReservationLabelHint>
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
                    <ReservationLabelHint
                      htmlFor="address"
                      tooltip="Pełny adres zamieszkania z ulicą, numerem budynku i numerem mieszkania"
                      ariaLabel="Pełny adres zamieszkania z ulicą, numerem budynku i numerem mieszkania"
                    >
                      Adres zamieszkania
                    </ReservationLabelHint>
                    <Input id="address" value={driver.address} onChange={handleDriverChange} required className="mt-1" />
                  </div>

                  <div className={RESERVATION_PAIR_GRID}>
                    <div className={RENTAL_PERIOD_FIELD_CELL}>
                      <Label htmlFor="postalCode" className={FORM_LABEL_CLASS}>
                        Kod pocztowy
                      </Label>
                      <Input id="postalCode" value={driver.postalCode} onChange={handleDriverChange} required className="mt-1" />
                    </div>
                    <div className={RENTAL_PERIOD_FIELD_CELL}>
                      <Label htmlFor="city" className={FORM_LABEL_CLASS}>
                        Miejscowość
                      </Label>
                      <Input id="city" value={driver.city} onChange={handleDriverChange} required className="mt-1" />
                    </div>
                  </div>

                  <div className={RESERVATION_PAIR_GRID}>
                    <div className={RENTAL_PERIOD_FIELD_CELL}>
                      <Label htmlFor="email" className={FORM_LABEL_CLASS}>
                        E-mail
                      </Label>
                      <Input id="email" type="email" value={driver.email} onChange={handleDriverChange} required className="mt-1" />
                    </div>
                    <div className={RENTAL_PERIOD_FIELD_CELL}>
                      <Label htmlFor="phone" className={FORM_LABEL_CLASS}>
                        Telefon
                      </Label>
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
                </fieldset>
              </form>
            </div>

            <aside className="min-w-0 scroll-mt-[4.5rem] lg:col-span-1">
              <div className="lg:sticky lg:top-24">
                <div className="rounded-lg bg-secondary p-6">
                  <p className="mb-3 text-center">
                    <Link to="/wypozyczalnia" className="text-sm font-medium text-foreground underline underline-offset-4 hover:text-muted-foreground">
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
                    disabled={isSubmitting}
                    className="mt-6 flex h-14 w-full items-center justify-center rounded-md bg-foreground text-lg font-semibold text-background transition-colors hover:bg-foreground/90 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {isSubmitting ? 'Wysyłanie…' : 'Przejdź do płatności'}
                  </button>
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
          )}
        </div>
      </div>
    </>
  );
};

export default RentalReservationPage;
