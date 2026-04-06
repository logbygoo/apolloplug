import React, { useState, useMemo, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Button, Input, Label, PageHeader } from '../components/ui';
import { RENTAL_CARS, ADDITIONAL_OPTIONS } from '../configs/rentConfig';
import { LOCATIONS, Location } from '../configs/locationsConfig';
import { BRANDS } from '../constants';
import { ChevronDownIcon, CheckIcon, InformationCircleIcon, DocumentTextIcon, CalendarDaysIcon } from '../icons';
import type { Car } from '../types';
import Seo from '../components/Seo';
import { createReservationAdminEmailPayload, createReservationCustomerEmailPayload, createPaymentConfirmationAdminEmailPayload } from '../configs/notifications/emailTemplates';
import { createReservationAdminSmsPayload, createReservationCustomerSmsPayload } from '../configs/notifications/smsTemplates';
import { mailApiUrl, smsApiUrl } from '../configs/notifications/apiEndpoints';
import { SEO_CONFIG } from '../configs/seoConfig';

// Declare gtag for TypeScript
declare global {
  interface Window {
    gtag?: (command: string, action: string, params?: { [key: string]: any }) => void;
  }
}

const timeOptions = Array.from({ length: 25 }, (_, i) => {
    const hour = Math.floor(i / 2) + 8;
    const minute = i % 2 === 0 ? '00' : '30';
    if (hour > 20) return null;
    return `${String(hour).padStart(2, '0')}:${minute}`;
}).filter(Boolean) as string[];

const RENTAL_LOCATIONS_DATA: Location[] = LOCATIONS;

/** Ogranicza szerokość <select> do kolumny siatki — długie teksty opcji nie rozpychają strony w poziomie. */
const rentalPeriodSelectClassName =
  'block h-12 w-full min-w-0 max-w-full appearance-none rounded-md border border-border bg-secondary px-3 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2';

const getPriceForCar = (price: number | Readonly<{ [key: string]: number }>, carId: string): number => {
  if (typeof price === 'number') {
    return price;
  }
  return price[carId] ?? 0;
};

const FormSection: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
  <section className="pt-8 first:pt-0">
    <h2 className="text-2xl font-bold tracking-tight">{title}</h2>
    <div className="mt-6 flex flex-col gap-6">{children}</div>
  </section>
);

const BrandCard: React.FC<{ brand: typeof BRANDS[number], isSelected: boolean, onSelect: () => void }> = ({ brand, isSelected, onSelect }) => (
    <div
        onClick={brand.available ? onSelect : undefined}
        className={`relative flex h-16 min-w-[200px] flex-col items-center justify-center cursor-pointer rounded-lg border p-2 transition-all ${
            isSelected ? 'border-foreground bg-secondary/50' : 'border-border bg-card'
        } ${
            brand.available ? 'hover:border-foreground/50' : 'opacity-50 cursor-not-allowed'
        }`}
    >
        <div className={`absolute top-1.5 right-1.5 h-4 w-4 rounded-sm flex items-center justify-center transition-all ${isSelected ? 'bg-foreground text-background' : 'bg-secondary'}`}>
            {isSelected && <CheckIcon className="w-3 h-3" strokeWidth={3} />}
        </div>
        {!brand.available && (
            <div className="absolute top-1 left-1 bg-muted text-muted-foreground text-[10px] font-bold px-1.5 py-0.5 rounded">
                Wkrótce
            </div>
        )}
        <img src={brand.logoUrl} alt={`${brand.name} logo`} className="h-8 w-auto max-h-8 object-contain" />
        {/* <h3 className="font-semibold text-center mt-2">{brand.name}</h3> */}
    </div>
);

const ModelCard: React.FC<{ car: Car; isSelected: boolean; onSelect: () => void; }> = ({ car, isSelected, onSelect }) => {
    const isAvailable = car.available !== false;
    
    // Calculate the minimum price from the price tiers
    const minPrice = useMemo(() => {
        if (car.priceTiers && car.priceTiers.length > 0) {
            return Math.min(...car.priceTiers.map(tier => tier.pricePerDay));
        }
        return car.pricePerDay;
    }, [car]);

    return (
        <div
            onClick={isAvailable ? onSelect : undefined}
            className={`relative cursor-pointer rounded-lg border p-4 transition-all flex flex-col h-full ${
                isSelected ? 'border-foreground bg-secondary/50' : 'border-border bg-card'
            } ${
                isAvailable ? 'hover:border-foreground/50' : 'opacity-50 cursor-not-allowed'
            }`}
        >
            <div className={`absolute top-3 right-3 h-5 w-5 rounded-sm flex items-center justify-center transition-all ${isSelected ? 'bg-foreground text-background' : 'bg-secondary'}`}>
                {isSelected && <CheckIcon className="w-3.5 h-3.5" strokeWidth={3} />}
            </div>
            {!isAvailable && (
                <div className="absolute top-2 left-2 bg-muted text-muted-foreground text-xs font-bold px-2 py-1 rounded">
                    Wkrótce
                </div>
            )}
            <img src={car.imageUrl[0]} alt={car.name} className="w-full h-32 object-contain mb-4" />
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

const PriceTable: React.FC<{ car: Car }> = ({ car }) => {
    if (!car.priceTiers || car.priceTiers.length === 0) {
        return null;
    }

    return (
        <div className="mt-6">
            <h3 className="text-lg font-semibold mb-2">Cennik dla {car.name}</h3>
            <div className="overflow-hidden border border-border rounded-lg">
                <table className="min-w-full">
                    <tbody className="bg-background divide-y divide-border">
                        {car.priceTiers.map((tier, index) => (
                            <tr key={index} className="odd:bg-white even:bg-secondary/50">
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-foreground">{tier.days}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-right text-foreground">
                                    <div>{tier.pricePerDay} zł</div>
                                    <div className="text-xs text-muted-foreground">{tier.kmLimitPerDay} km/dzień</div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

const CheckboxOption: React.FC<{ car: Car; option: typeof ADDITIONAL_OPTIONS[number], isChecked: boolean, onToggle: () => void }> = ({ car, option, isChecked, onToggle }) => {
    const price = getPriceForCar(option.price, car.id);
    const isFree = price === 0;

    return (
        <label htmlFor={option.id} className={`flex items-center justify-between p-4 border rounded-lg transition-all ${isChecked ? 'border-foreground bg-secondary/50' : 'border-border bg-card'} ${isFree ? 'cursor-default' : 'cursor-pointer'}`}>
            <input id={option.id} type="checkbox" checked={isChecked} onChange={onToggle} className="absolute w-0 h-0 opacity-0" disabled={isFree}/>
            <div className="flex items-center gap-4">
                 <div className={`h-5 w-5 rounded-sm flex items-center justify-center transition-all flex-shrink-0 ${isChecked ? 'bg-foreground text-background' : 'bg-secondary'}`}>
                    {isChecked && <CheckIcon className="w-3.5 h-3.5" strokeWidth={3} />}
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

const AgreementCheckbox: React.FC<{
  id: string;
  label: React.ReactNode;
  isChecked: boolean;
  onToggle: () => void;
}> = ({ id, label, isChecked, onToggle }) => (
    <div className="flex items-start">
        <label htmlFor={id} className="flex items-start cursor-pointer group">
            <input id={id} type="checkbox" checked={isChecked} onChange={onToggle} className="absolute w-0 h-0 opacity-0" />
            <div className={`relative mt-0.5 mr-3 h-5 w-5 rounded-sm flex-shrink-0 flex items-center justify-center transition-all ${isChecked ? 'bg-foreground' : 'bg-secondary'}`}>
                {isChecked && <CheckIcon className="w-3.5 h-3.5 text-background" strokeWidth={3} />}
            </div>
            <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">{label}</span>
        </label>
    </div>
);

const DocumentTile: React.FC<{ title: string; href: string }> = ({ title, href }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="flex min-h-[4.5rem] items-center gap-4 rounded-lg border border-border bg-card p-4 transition-colors hover:bg-secondary group"
  >
    <DocumentTextIcon className="h-8 w-8 flex-shrink-0 text-muted-foreground" />
    <div className="min-w-0">
      <p className="font-medium text-foreground">{title}</p>
      <p className="text-sm text-muted-foreground">Otwórz dokument PDF</p>
    </div>
  </a>
);

const RENTAL_FORM_PDF_TILES = [
  { title: 'Umowa wynajmu', href: '/pdf/wzor-umowy.pdf' },
  { title: 'Protokół Odbioru/Zwrotu', href: '/pdf/protokol-wydania-zwrotu.pdf' },
  { title: 'Regulamin Wypożyczalni', href: '/pdf/regulamin-wypozyczalni.pdf' },
] as const;

/**
 * End-to-End Slider jak w przykładzie: zewnątrz pełna szerokość viewportu (sekcja „full width”),
 * w środku .e2e-slider (100% = viewport) + .e2e-track (inline-flex, max-content, padding z index.html).
 */
const rentalE2eSliderStyle = { '--slider-gap': '1rem' } as React.CSSProperties;

const RentalEdgeScroller: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className }) => (
  <div
    className={`relative w-[100vw] max-w-[100vw] shrink-0 ml-[calc(50%-50vw)] lg:hidden ${className ?? ''}`}
  >
    <div className="e2e-slider touch-pan-x" style={rentalE2eSliderStyle}>
      <div className="e2e-track">{children}</div>
    </div>
  </div>
);

const todayDate = new Date();
const tomorrowDate = new Date(todayDate);
tomorrowDate.setDate(tomorrowDate.getDate() + 1);

const formatDate = (date: Date) => date.toISOString().split('T')[0];
const today = formatDate(todayDate);
const tomorrow = formatDate(tomorrowDate);

export interface FormData {
    brand: typeof BRANDS[number];
    model: Car;
    pickupDate: string;
    pickupTime: string;
    pickupLocation: string;
    returnDate: string;
    returnTime: string;
    returnLocation: string;
    fullName: string;
    nip: string;
    pesel: string;
    licenseNumber: string;
    address: string;
    postalCode: string;
    city: string;
    email: string;
    phone: string;
    options: Record<typeof ADDITIONAL_OPTIONS[number]['id'], boolean>;
}

const Tooltip: React.FC<{ content: React.ReactNode; children: React.ReactNode }> = ({ content, children }) => {
  return (
    <div className="relative flex items-center group">
      {children}
      <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 w-max max-w-[240px] p-2 bg-foreground text-background text-xs text-center rounded-md shadow-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
        {content}
      </div>
    </div>
  );
};

const getInitialFormData = (modelIdFromUrl: string | null): FormData => {
    const firstAvailableCar = RENTAL_CARS.find(c => c.id === modelIdFromUrl && c.available) || RENTAL_CARS.find(c => c.available) || RENTAL_CARS[0];
    return {
        brand: BRANDS.find(b => firstAvailableCar.id.includes(b.id)) || BRANDS[0],
        model: firstAvailableCar,
        pickupDate: today,
        pickupTime: '10:00',
        pickupLocation: RENTAL_LOCATIONS_DATA[0]?.title || '',
        returnDate: tomorrow,
        returnTime: '10:00',
        returnLocation: RENTAL_LOCATIONS_DATA[0]?.title || '',
        fullName: '',
        nip: '',
        pesel: '',
        licenseNumber: '',
        address: '',
        postalCode: '',
        city: '',
        email: '',
        phone: '',
        options: Object.fromEntries(ADDITIONAL_OPTIONS.map(o => [o.id, getPriceForCar(o.price, firstAvailableCar.id) === 0])) as Record<typeof ADDITIONAL_OPTIONS[number]['id'], boolean>
    };
};

const RentalPage: React.FC = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const modelIdFromUrl = searchParams.get('model');
    
    const [formData, setFormData] = useState<FormData>(() => {
        const savedData = sessionStorage.getItem('rentalFormData');
        if (savedData) {
            try {
                return JSON.parse(savedData);
            } catch (e) {
                console.error("Failed to parse form data from session storage", e);
                return getInitialFormData(modelIdFromUrl);
            }
        }
        return getInitialFormData(modelIdFromUrl);
    });

    const [step, setStep] = useState<'details' | 'payment'>(() => {
        const savedStep = sessionStorage.getItem('rentalStep');
        const savedData = sessionStorage.getItem('rentalFormData');
        if (savedStep === 'payment' && savedData) {
            return 'payment';
        }
        return 'details';
    });
    
    const [submitted, setSubmitted] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [selectedPaymentMethod] = useState('payu');
    const [reservationNumber, setReservationNumber] = useState(() => sessionStorage.getItem('rentalReservationNumber') || '');
    
    const [agreements, setAgreements] = useState({
        terms: false,
        marketing: false,
        commercial: false,
    });
    
    useEffect(() => {
        sessionStorage.setItem('rentalStep', step);
    }, [step]);

    useEffect(() => {
        sessionStorage.setItem('rentalFormData', JSON.stringify(formData));
    }, [formData]);

    useEffect(() => {
        if (reservationNumber) {
            sessionStorage.setItem('rentalReservationNumber', reservationNumber);
        }
    }, [reservationNumber]);

    useEffect(() => {
        if (step === 'details') {
            setSearchParams({ model: formData.model.id }, { replace: true });
        }
    }, [formData.model, setSearchParams, step]);

    const summary = useMemo(() => {
        const { pickupDate, returnDate, pickupTime, returnTime, options, model, pickupLocation, returnLocation } = formData;
        const defaultReturn = { rentalDays: 0, rentalPrice: 0, optionsPrice: 0, totalPrice: 0, deposit: 5000, totalWithDeposit: 5000, totalKmLimit: 0, costPerKmOverLimit: 0, pickupFee: 0, returnFee: 0 };

        if (!pickupDate || !returnDate || !pickupTime || !returnTime || !model) {
            return defaultReturn;
        }

        const start = new Date(`${pickupDate}T${pickupTime}`);
        const end = new Date(`${returnDate}T${returnTime}`);

        if (start >= end) {
            return defaultReturn;
        }

        const diffTime = end.getTime() - start.getTime();
        // A rental day is a full 24-hour period. Any fraction of a day counts as a full day.
        const rentalDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) || 1;

        const tier = model.priceTiers?.find(t => {
            const range = t.days.match(/\d+/g);
            if (!range) return false;
            
            const min = parseInt(range[0]);
            let max;

            if (range.length > 1) {
                max = parseInt(range[1]);
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
        ADDITIONAL_OPTIONS.forEach(opt => {
            if (options[opt.id]) {
                const price = getPriceForCar(opt.price, model.id);
                optionsPrice += opt.type === 'per_day' ? price * rentalDays : price;
            }
        });
        
        const pickupLoc = RENTAL_LOCATIONS_DATA.find(loc => loc.title === pickupLocation);
        const pickupFee = pickupLoc?.price || 0;

        const returnLoc = RENTAL_LOCATIONS_DATA.find(loc => loc.title === returnLocation);
        const returnFee = returnLoc?.price || 0;

        const totalPrice = rentalPrice + optionsPrice + pickupFee + returnFee;
        const deposit = model.deposit || 5000;
        const totalWithDeposit = totalPrice + deposit;

        return { rentalDays, rentalPrice, optionsPrice, totalPrice, deposit, totalWithDeposit, totalKmLimit, costPerKmOverLimit, pickupFee, returnFee };
    }, [formData]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { id, value } = e.target;
        setFormData(prev => ({ ...prev, [id]: value }));
    };

    const handleOptionToggle = (optionId: typeof ADDITIONAL_OPTIONS[number]['id']) => {
        setFormData(prev => ({
            ...prev,
            options: { ...prev.options, [optionId]: !prev.options[optionId] }
        }));
    };
    
    const handleAgreementToggle = (key: keyof typeof agreements) => {
        setAgreements(prev => ({ ...prev, [key]: !prev[key] }));
    };

    useEffect(() => { window.scrollTo(0, 0); }, [step, submitted]);

    const canProceed = useMemo(() => {
        const { pickupDate, returnDate, fullName, pesel, licenseNumber, address, postalCode, city, email, phone } = formData;
        return summary.totalPrice > 0 && pickupDate && returnDate && fullName && pesel && licenseNumber && address && postalCode && city && email && phone && agreements.terms && agreements.marketing;
    }, [formData, summary.totalPrice, agreements.terms, agreements.marketing]);
    
    const handleProceedToPayment = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!canProceed) return;
        setIsLoading(true);

        try {
            const adminEmailPayload = createReservationAdminEmailPayload(formData, summary, agreements);
            const adminResponse = await fetch(mailApiUrl(), {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(adminEmailPayload),
            });
            if (!adminResponse.ok) throw new Error("Network response for admin email was not ok");
            
            const customerEmailPayload = createReservationCustomerEmailPayload(formData, summary);
            const customerResponse = await fetch(mailApiUrl(), {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(customerEmailPayload),
            });
            if (!customerResponse.ok) {
                console.warn("Failed to send customer confirmation email, but admin was notified.");
            }
            
            // Send SMS notifications (fire and forget)
            const adminSmsPayload = createReservationAdminSmsPayload(formData, summary);
            fetch(smsApiUrl(), {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(adminSmsPayload),
            }).catch(err => console.warn("Failed to send admin SMS", err));

            const customerSmsPayload = createReservationCustomerSmsPayload(formData);
            fetch(smsApiUrl(), {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(customerSmsPayload),
            }).catch(err => console.warn("Failed to send customer SMS", err));

            // Fire Google Ads conversion event
            if (typeof window.gtag === 'function') {
                window.gtag('event', 'conversion', {
                    'send_to': 'AW-17760954062/WQuYCP6q7McbEM7NipVC',
                    'value': 1.0,
                    'currency': 'PLN'
                });
            }

            if (!reservationNumber) {
                const generatedReservationNumber = `AP-${Date.now()}`;
                setReservationNumber(generatedReservationNumber);
            }

            setStep('payment');
        } catch (error) {
            console.error("Failed to send reservation email:", error);
            alert("Wystąpił błąd podczas wysyłania rezerwacji. Proszę spróbować ponownie.");
        } finally {
            setIsLoading(false);
        }
    };
    
    const handleFinalSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            // In a real application, this is where you would integrate with a payment gateway.
            // For this demo, we simulate a successful payment and send a confirmation email to the admin.
            await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate async payment processing

            const paymentMethodName = paymentMethods.find(p => p.id === selectedPaymentMethod)?.name || 'Nieznana';
            const paymentConfirmationPayload = createPaymentConfirmationAdminEmailPayload(formData, summary, paymentMethodName);
            
            const response = await fetch(mailApiUrl(), {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(paymentConfirmationPayload),
            });

            if (!response.ok) {
                // Log the error but proceed to show success to the user, as the "payment" was successful.
                // The admin might need to manually check this reservation.
                console.warn("Failed to send payment confirmation email to admin.");
            }

            setSubmitted(true);
        } catch (error) {
            console.error("An error occurred during the final submission step:", error);
            // Even if the email fails, we should probably let the user think it's fine.
            // The reservation email was already sent.
            setSubmitted(true);
        } finally {
            setIsLoading(false);
        }
    };


    const breadcrumbs = useMemo(() => {
        const crumbs: { name: string; path?: string; }[] = [{ name: 'Wypożyczalnia', path: '/wypozyczalnia' }];
        if (formData.model) {
            crumbs.push({ name: formData.model.name });
        }
        return crumbs;
    }, [formData.model]);

    const paymentMethods = [{ id: 'payu', name: 'PayU' }];

    const paymentAmount = summary.totalPrice > 0 ? summary.totalPrice.toFixed(2) : '0.00';
    const paymentName = reservationNumber || `AP-${Date.now()}`;
    const payuPaymentUrl = `https://rent.ffgroup.pl/pay/?name=${encodeURIComponent(paymentName)}&amount=${encodeURIComponent(paymentAmount)}`;
    
    const startNewReservation = () => {
        sessionStorage.removeItem('rentalStep');
        sessionStorage.removeItem('rentalFormData');
        sessionStorage.removeItem('rentalReservationNumber');
        setFormData(getInitialFormData(null));
        setAgreements({
            terms: false,
            marketing: false,
            commercial: false,
        });
        setReservationNumber('');
        setSubmitted(false);
        setStep('details');
    };

    if (submitted) {
        return (
          <div className="container mx-auto max-w-2xl px-4 md:px-6 py-32 text-center flex flex-col items-center justify-center min-h-[calc(100vh-112px)]">
            <h1 className="text-4xl font-bold tracking-tight">Dziękujemy za rezerwację!</h1>
            <p className="mt-4 text-lg text-muted-foreground">
              Potwierdzenie rezerwacji dla {formData.model.name} zostało wysłane na adres {formData.email}.
            </p>
            <Button onClick={startNewReservation} className="mt-8" variant="primary">
              Zarezerwuj kolejny pojazd
            </Button>
          </div>
        );
    }

    return (
        <div className="min-h-screen min-w-0 bg-background">
            <Seo {...SEO_CONFIG['/wypozyczalnia']} />
            <div className="mb-10 w-full bg-secondary">
                <PageHeader
                    title="Wypożyczalnia EV"
                    subtitle="Wypożycz Auto Elektryczne wypełniając poniższy formularz"
                    breadcrumbs={breadcrumbs}
                />
            </div>
            <div className="container mx-auto min-w-0 px-4 md:px-6 pb-16 md:pb-16">
                {step === 'details' && (
                    <>
                        <form onSubmit={handleProceedToPayment}>
                            <div className="grid min-w-0 gap-8 lg:grid-cols-3 xl:gap-12">
                                <div className="min-w-0 lg:col-span-2">
                                    <FormSection title="Wybierz Markę">
                                        <RentalEdgeScroller>
                                            {BRANDS.map((brand) => (
                                                <div key={brand.id} className="min-w-[200px] shrink-0 w-[min(48vw,280px)]">
                                                    <BrandCard
                                                        brand={brand}
                                                        isSelected={formData.brand.id === brand.id}
                                                        onSelect={() => setFormData((p) => ({ ...p, brand }))}
                                                    />
                                                </div>
                                            ))}
                                        </RentalEdgeScroller>
                                        <div className="hidden gap-4 lg:grid lg:grid-cols-3">
                                            {BRANDS.map((brand) => (
                                                <BrandCard
                                                    key={brand.id}
                                                    brand={brand}
                                                    isSelected={formData.brand.id === brand.id}
                                                    onSelect={() => setFormData((p) => ({ ...p, brand }))}
                                                />
                                            ))}
                                        </div>
                                    </FormSection>
                                    <FormSection title="Wybierz Model">
                                        <div className="flex flex-col gap-4">
                                            <RentalEdgeScroller>
                                                {RENTAL_CARS.map((car) => (
                                                    <div key={car.id} className="w-[min(88vw,20rem)] shrink-0 sm:w-80">
                                                        <ModelCard
                                                            car={car}
                                                            isSelected={formData.model.id === car.id}
                                                            onSelect={() =>
                                                                setFormData((p) => ({
                                                                    ...p,
                                                                    model: car,
                                                                    brand: BRANDS.find((b) => car.id.includes(b.id)) || p.brand,
                                                                }))
                                                            }
                                                        />
                                                    </div>
                                                ))}
                                            </RentalEdgeScroller>
                                            <div className="hidden gap-4 lg:grid lg:grid-cols-2 xl:grid-cols-4">
                                                {RENTAL_CARS.map((car) => (
                                                    <ModelCard
                                                        key={car.id}
                                                        car={car}
                                                        isSelected={formData.model.id === car.id}
                                                        onSelect={() =>
                                                            setFormData((p) => ({
                                                                ...p,
                                                                model: car,
                                                                brand: BRANDS.find((b) => car.id.includes(b.id)) || p.brand,
                                                            }))
                                                        }
                                                    />
                                                ))}
                                            </div>
                                            <div className="min-w-0">
                                                {formData.model.specs &&
                                                    (() => {
                                                        const s = formData.model.specs;
                                                        const items: { key: string; label: string; value: string }[] = [];
                                                        if (s.version) items.push({ key: 'v', label: 'Wersja:', value: s.version });
                                                        if (s.color) items.push({ key: 'c', label: 'Kolor:', value: s.color });
                                                        if (s.interiorColor) items.push({ key: 'i', label: 'Wnętrze:', value: s.interiorColor });
                                                        if (s.range) items.push({ key: 'r', label: 'Zasięg:', value: s.range });
                                                        if (s.acceleration) items.push({ key: 'a', label: 'Do 100 km/h:', value: s.acceleration });
                                                        if (s.drive) items.push({ key: 'd', label: 'Napęd:', value: s.drive });
                                                        if (items.length === 0) return null;
                                                        return (
                                                            <div className="flex flex-col gap-2">
                                                                <RentalEdgeScroller>
                                                                    {items.map((item) => (
                                                                        <div key={item.key} className="shrink-0">
                                                                            <div className="flex items-baseline gap-x-1.5 whitespace-nowrap rounded-full bg-secondary px-3 py-1.5 text-sm">
                                                                                <span className="text-muted-foreground">{item.label}</span>
                                                                                <span className="font-semibold text-foreground">{item.value}</span>
                                                                            </div>
                                                                        </div>
                                                                    ))}
                                                                </RentalEdgeScroller>
                                                                <div className="hidden flex-wrap items-center gap-2 lg:flex">
                                                                    {items.map((item) => (
                                                                        <div
                                                                            key={item.key}
                                                                            className="flex items-baseline gap-x-1.5 rounded-full bg-secondary px-3 py-1.5 text-sm"
                                                                        >
                                                                            <span className="text-muted-foreground">{item.label}</span>
                                                                            <span className="font-semibold text-foreground">{item.value}</span>
                                                                        </div>
                                                                    ))}
                                                                </div>
                                                            </div>
                                                        );
                                                    })()}
                                                <PriceTable car={formData.model} />
                                            </div>
                                        </div>
                                    </FormSection>
                                    <FormSection title="Okres najmu">
                                        <div className="grid min-w-0 grid-cols-1 gap-4 sm:grid-cols-3">
                                            <div className="min-w-0">
                                                <Label htmlFor="pickupDate">Odbiór</Label>
                                                <div className="relative mt-1 min-w-0">
                                                    <Input
                                                        id="pickupDate"
                                                        type="date"
                                                        value={formData.pickupDate}
                                                        min={today}
                                                        onChange={handleInputChange}
                                                        required
                                                        className="h-auto min-w-0 pr-10"
                                                        style={{ padding: '11px' }}
                                                    />
                                                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                                                        <CalendarDaysIcon className="h-5 w-5 text-muted-foreground" />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="min-w-0">
                                                <Label htmlFor="pickupTime">Godzina</Label>
                                                <div className="relative mt-1 min-w-0">
                                                    <select
                                                        id="pickupTime"
                                                        value={formData.pickupTime}
                                                        onChange={handleInputChange}
                                                        className={rentalPeriodSelectClassName}
                                                    >
                                                        <option disabled>--:--</option>
                                                        {timeOptions.map((t) => (
                                                            <option key={t} value={t}>
                                                                {t}
                                                            </option>
                                                        ))}
                                                    </select>
                                                    <ChevronDownIcon className="pointer-events-none absolute top-1/2 right-3 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                                                </div>
                                            </div>
                                            <div className="min-w-0">
                                                <Label htmlFor="pickupLocation">Miejsce</Label>
                                                <div className="relative mt-1 min-w-0">
                                                    <select
                                                        id="pickupLocation"
                                                        value={formData.pickupLocation}
                                                        onChange={handleInputChange}
                                                        className={rentalPeriodSelectClassName}
                                                    >
                                                        <option disabled value="">
                                                            Wybierz
                                                        </option>
                                                        {RENTAL_LOCATIONS_DATA.map((loc) => (
                                                            <option key={loc.title} value={loc.title}>
                                                                {`${!loc.price ? '(W CENIE) ' : ''}${loc.title} (${loc.address})`}
                                                            </option>
                                                        ))}
                                                    </select>
                                                    <ChevronDownIcon className="pointer-events-none absolute top-1/2 right-3 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="grid min-w-0 grid-cols-1 gap-4 sm:grid-cols-3">
                                            <div className="min-w-0">
                                                <Label htmlFor="returnDate">Zwrot</Label>
                                                <div className="relative mt-1 min-w-0">
                                                    <Input
                                                        id="returnDate"
                                                        type="date"
                                                        value={formData.returnDate}
                                                        min={formData.pickupDate || today}
                                                        onChange={handleInputChange}
                                                        required
                                                        className="h-auto min-w-0 pr-10"
                                                        style={{ padding: '11px' }}
                                                    />
                                                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                                                        <CalendarDaysIcon className="h-5 w-5 text-muted-foreground" />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="min-w-0">
                                                <Label htmlFor="returnTime">Godzina</Label>
                                                <div className="relative mt-1 min-w-0">
                                                    <select
                                                        id="returnTime"
                                                        value={formData.returnTime}
                                                        onChange={handleInputChange}
                                                        className={rentalPeriodSelectClassName}
                                                    >
                                                        <option disabled>--:--</option>
                                                        {timeOptions.map((t) => (
                                                            <option key={t} value={t}>
                                                                {t}
                                                            </option>
                                                        ))}
                                                    </select>
                                                    <ChevronDownIcon className="pointer-events-none absolute top-1/2 right-3 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                                                </div>
                                            </div>
                                            <div className="min-w-0">
                                                <Label htmlFor="returnLocation">Miejsce</Label>
                                                <div className="relative mt-1 min-w-0">
                                                    <select
                                                        id="returnLocation"
                                                        value={formData.returnLocation}
                                                        onChange={handleInputChange}
                                                        className={rentalPeriodSelectClassName}
                                                    >
                                                        <option disabled value="">
                                                            Wybierz
                                                        </option>
                                                        {RENTAL_LOCATIONS_DATA.map((loc) => (
                                                            <option key={loc.title} value={loc.title}>
                                                                {`${!loc.price ? '(W CENIE) ' : ''}${loc.title} (${loc.address})`}
                                                            </option>
                                                        ))}
                                                    </select>
                                                    <ChevronDownIcon className="pointer-events-none absolute top-1/2 right-3 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                                                </div>
                                            </div>
                                        </div>
                                    </FormSection>
                                    <FormSection title="Dane kierowcy">
                                        <div className="grid sm:grid-cols-2 gap-6">
                                            <div><Label htmlFor="fullName" className="flex items-center">Imię i Nazwisko</Label><Input id="fullName" value={formData.fullName} onChange={handleInputChange} required className="mt-1" /></div>
                                            <div><Label htmlFor="nip" className="flex items-center">NIP do faktury (opcjonalnie)</Label><Input id="nip" value={formData.nip} onChange={handleInputChange} className="mt-1" /></div>
                                            <div>
                                                <Label htmlFor="pesel" className="flex items-center">
                                                    PESEL
                                                    <Tooltip content="Wymagany do umowy najmu. Podaj 11-cyfrowy numer identyfikacyjny.">
                                                        <InformationCircleIcon className="w-4 h-4 ml-1.5 text-muted-foreground cursor-help" />
                                                    </Tooltip>
                                                </Label>
                                                <Input id="pesel" value={formData.pesel} onChange={handleInputChange} required className="mt-1" />
                                            </div>
                                            <div>
                                                <Label htmlFor="licenseNumber" className="flex items-center">
                                                    Numer prawa jazdy
                                                    <Tooltip content="Wpisz serię i numer prawa jazdy, np. 123456/12/XYZ. Format jak w dokumencie.">
                                                        <InformationCircleIcon className="w-4 h-4 ml-1.5 text-muted-foreground cursor-help" />
                                                    </Tooltip>
                                                </Label>
                                                <Input id="licenseNumber" value={formData.licenseNumber} onChange={handleInputChange} required className="mt-1" />
                                            </div>
                                            <div className="sm:col-span-2"><Label htmlFor="address" className="flex items-center">Adres zamieszkania</Label><Input id="address" value={formData.address} onChange={handleInputChange} required className="mt-1" /></div>
                                            <div><Label htmlFor="postalCode" className="flex items-center">Kod pocztowy</Label><Input id="postalCode" value={formData.postalCode} onChange={handleInputChange} required className="mt-1" /></div>
                                            <div><Label htmlFor="city" className="flex items-center">Miejscowość</Label><Input id="city" value={formData.city} onChange={handleInputChange} required className="mt-1" /></div>
                                            <div>
                                                <Label htmlFor="email" className="flex items-center">
                                                    E-mail
                                                    <Tooltip content="Podaj prawidłowy adres e-mail, np. jan.kowalski@email.com. Wyślemy na niego potwierdzenie rezerwacji.">
                                                        <InformationCircleIcon className="w-4 h-4 ml-1.5 text-muted-foreground cursor-help" />
                                                    </Tooltip>
                                                </Label>
                                                <Input id="email" type="email" value={formData.email} onChange={handleInputChange} required className="mt-1" />
                                            </div>
                                            <div>
                                                <Label htmlFor="phone" className="flex items-center">
                                                    Telefon
                                                    <Tooltip content="Podaj numer telefonu w formacie międzynarodowym, np. +48123456789. Potrzebny do kontaktu w sprawie rezerwacji.">
                                                        <InformationCircleIcon className="w-4 h-4 ml-1.5 text-muted-foreground cursor-help" />
                                                    </Tooltip>
                                                </Label>
                                                <Input id="phone" type="tel" value={formData.phone} onChange={handleInputChange} required className="mt-1" />
                                            </div>
                                        </div>
                                    </FormSection>
                                    <FormSection title="Opcje dodatkowe">
                                        <div className="space-y-3">
                                            {ADDITIONAL_OPTIONS.map(opt => <CheckboxOption key={opt.id} option={opt} car={formData.model} isChecked={formData.options[opt.id]} onToggle={() => handleOptionToggle(opt.id)} />)}
                                        </div>
                                    </FormSection>
                                    <FormSection title="Regulamin i szkic umowy">
                                        <div>
                                            <div className="space-y-4">
                                                <AgreementCheckbox
                                                    id="terms"
                                                    label={<>Akceptuję{' '}<Link to="/dokumentacja" onClick={(e) => e.stopPropagation()} className="underline hover:text-foreground">regulamin</Link>{' '}oraz{' '}<Link to="/dokumentacja" onClick={(e) => e.stopPropagation()} className="underline hover:text-foreground">politykę prywatności</Link>{' '}apolloidea.com <span className="text-destructive">*</span></>}
                                                    isChecked={agreements.terms}
                                                    onToggle={() => handleAgreementToggle('terms')}
                                                />
                                                <AgreementCheckbox
                                                    id="marketing"
                                                    label={<>Potwierdzam zapoznanie się ze wzorem umowy najmu i protokołu odbioru/zwrotu pojazdu <span className="text-destructive">*</span></>}
                                                    isChecked={agreements.marketing}
                                                    onToggle={() => handleAgreementToggle('marketing')}
                                                />
                                                <AgreementCheckbox
                                                    id="commercial"
                                                    label="Wyrażam zgodę na otrzymywanie informacji handlowych drogą elektroniczną i SMS."
                                                    isChecked={agreements.commercial}
                                                    onToggle={() => handleAgreementToggle('commercial')}
                                                />
                                            </div>
                                            <div className="mt-6">
                                                <RentalEdgeScroller>
                                                    {RENTAL_FORM_PDF_TILES.map((doc) => (
                                                        <div
                                                            key={doc.href}
                                                            className="w-[min(88vw,22rem)] shrink-0 sm:w-96"
                                                        >
                                                            <DocumentTile title={doc.title} href={doc.href} />
                                                        </div>
                                                    ))}
                                                </RentalEdgeScroller>
                                                <div className="hidden gap-4 lg:grid lg:grid-cols-3">
                                                    {RENTAL_FORM_PDF_TILES.map((doc) => (
                                                        <DocumentTile key={doc.href} title={doc.title} href={doc.href} />
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    </FormSection>
                                </div>

                                <div className="lg:col-span-1">
                                    <div className="sticky top-24">
                                        <div className="space-y-6 bg-secondary p-6 rounded-lg">
                                            <h2 className="text-3xl font-bold">Podsumowanie</h2>
                                            <div className="space-y-2 border-t border-border pt-4">
                                                <div className="flex justify-between"><span className="text-muted-foreground">Okres najmu</span><span className="font-medium">{summary.rentalDays > 0 ? `${summary.rentalDays} dni` : '-'}</span></div>
                                                <div className="flex justify-between"><span className="text-muted-foreground">Cena najmu</span><span className="font-medium">{summary.rentalPrice > 0 ? `${summary.rentalPrice.toLocaleString('pl-PL')} zł` : '-'}</span></div>
                                                {summary.pickupFee > 0 && (
                                                    <div className="flex justify-between"><span className="text-muted-foreground">Podstawienie auta</span><span className="font-medium">{`${summary.pickupFee.toLocaleString('pl-PL')} zł`}</span></div>
                                                )}
                                                {summary.returnFee > 0 && (
                                                    <div className="flex justify-between"><span className="text-muted-foreground">Odbiór auta</span><span className="font-medium">{`${summary.returnFee.toLocaleString('pl-PL')} zł`}</span></div>
                                                )}
                                                <div className="flex justify-between"><span className="text-muted-foreground">Limit kilometrów</span><span className="font-medium">{summary.totalKmLimit > 0 ? `${summary.totalKmLimit.toLocaleString('pl-PL')} km` : '-'}</span></div>
                                                <div className="flex justify-between"><span className="text-muted-foreground">Koszt poza limitem</span><span className="font-medium">{summary.costPerKmOverLimit > 0 ? `${summary.costPerKmOverLimit.toLocaleString('pl-PL', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} zł/km` : '-'}</span></div>
                                                <div className="flex justify-between"><span className="text-muted-foreground">Opcje dodatkowe</span><span className="font-medium">{summary.optionsPrice > 0 ? `${summary.optionsPrice.toLocaleString('pl-PL')} zł` : '0 zł'}</span></div>
                                                <div className="flex justify-between text-xl font-bold text-primary border-t border-border pt-2 mt-2"><span >Cena łącznie</span><span>{summary.totalPrice > 0 ? `${summary.totalPrice.toLocaleString('pl-PL')} zł` : '-'}</span></div>
                                                <div className="flex justify-between text-sm"><span className="text-muted-foreground">Kaucja</span><span className="font-medium">{summary.deposit.toLocaleString('pl-PL')} zł</span></div>
                                                <div className="flex justify-between text-sm pt-2"><span className="text-muted-foreground">Do zapłaty (za wynajem)</span><span className="font-medium">{summary.totalPrice > 0 ? `${summary.totalPrice.toLocaleString('pl-PL')} zł` : '-'}</span></div>
                                            </div>
                                            <Button type="submit" size="lg" className="w-full" disabled={!canProceed || isLoading}>
                                                {isLoading ? 'Przetwarzanie...' : 'Przejdź do płatności'}
                                            </Button>
                                        </div>
                                        <div className="mt-4">
                                            <div className="flex justify-center items-center gap-4">
                                                <img src="https://img.apolloidea.com/img/pay-apple.svg" alt="Apple Pay" className="h-6" />
                                                <img src="https://img.apolloidea.com/img/pay-google.svg" alt="Google Pay" className="h-6" />
                                                <img src="https://img.apolloidea.com/img/pay-blik.svg" alt="BLIK" className="h-6" />
                                                <img src="https://img.apolloidea.com/img/pay-visa.svg" alt="Visa" className="h-6" />
                                                <img src="https://img.apolloidea.com/img/pay-mastercard.svg" alt="Mastercard" className="h-6" />
                                                <img src="https://img.apolloidea.com/img/pay-maestro.svg" alt="Maestro" className="h-6" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </>
                )}
                {step === 'payment' && (
                  <form onSubmit={handleFinalSubmit}>
                    <div className="grid min-w-0 gap-8 lg:grid-cols-3 xl:gap-12">
                      <div className="min-w-0 lg:col-span-2">
                        <FormSection title="Metoda płatności">
                           <div className="space-y-3">
                                {paymentMethods.map(method => (
                                    <div key={method.id} className="border rounded-lg border-sky-300">
                                        <div className="flex items-center p-4 bg-secondary/50 rounded-t-lg">
                                            <span className="font-medium">{method.name}</span>
                                        </div>
                                        <div className="p-6 bg-sky-50 border-t border-sky-300">
                                            <h3 className="text-lg font-semibold mb-2">Płatność PayU</h3>
                                            <p className="text-muted-foreground">Po kliknięciu przycisku "Opłać rezerwację" zostaniesz przekierowany na stronę operatora płatności PayU, aby bezpiecznie dokończyć transakcję.</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </FormSection>
                      </div>
                      
                      <div className="lg:col-span-1">
                          <div className="sticky top-24">
                              <div className="space-y-6 bg-secondary p-6 rounded-lg">
                                  <h2 className="text-3xl font-bold">Podsumowanie</h2>
                                  <div className="space-y-2 border-t border-border pt-4">
                                      <div className="flex justify-between"><span className="text-muted-foreground">Okres najmu</span><span className="font-medium">{summary.rentalDays > 0 ? `${summary.rentalDays} dni` : '-'}</span></div>
                                      {summary.pickupFee > 0 && (
                                          <div className="flex justify-between text-sm"><span className="text-muted-foreground">Podstawienie auta</span><span className="font-medium">{`${summary.pickupFee.toLocaleString('pl-PL')} zł`}</span></div>
                                      )}
                                      {summary.returnFee > 0 && (
                                          <div className="flex justify-between text-sm"><span className="text-muted-foreground">Odbiór auta</span><span className="font-medium">{`${summary.returnFee.toLocaleString('pl-PL')} zł`}</span></div>
                                      )}
                                      <div className="flex justify-between text-xl font-bold text-primary border-t border-border pt-2 mt-2"><span >Cena łącznie</span><span>{summary.totalPrice > 0 ? `${summary.totalPrice.toLocaleString('pl-PL')} zł` : '-'}</span></div>
                                      <div className="flex justify-between text-sm"><span className="text-muted-foreground">Kaucja (płatna przy odbiorze)</span><span className="font-medium">{summary.deposit.toLocaleString('pl-PL')} zł</span></div>
                                      <div className="flex justify-between font-bold pt-2 mt-2"><span className="text-muted-foreground">Do zapłaty (za wynajem)</span><span className="font-medium">{summary.totalPrice > 0 ? `${summary.totalPrice.toLocaleString('pl-PL')} zł` : '-'}</span></div>
                                  </div>
                                  <div className="flex flex-col gap-3">
                                      <Button
                                        type="button"
                                        size="lg"
                                        className="w-full"
                                        disabled={isLoading || summary.totalPrice <= 0}
                                        onClick={() => {
                                          window.location.href = payuPaymentUrl;
                                        }}
                                      >
                                        Opłać rezerwację
                                      </Button>
                                      <Button onClick={() => setStep('details')} variant="secondary" className="w-full" type="button" disabled={isLoading}>Wypełnij formularz rezerwacyjny ponownie</Button>
                                  </div>
                              </div>
                          </div>
                      </div>

                    </div>
                  </form>
                )}
            </div>
        </div>
    );
};

export default RentalPage;