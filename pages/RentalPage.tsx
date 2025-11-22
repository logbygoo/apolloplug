import React, { useState, useMemo, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Button, Input, Label, PageHeader } from '../components/ui';
import { RENTAL_CARS, RENTAL_LOCATIONS, ADDITIONAL_OPTIONS } from '../configs/rentConfig';
import { BRANDS, CreditCardIcon, ChevronDownIcon, CheckIcon, InfoIcon, FileTextIcon, PayUIcon, RevolutPayIcon, BankTransferIcon, CashIcon } from '../constants';
import type { Car } from '../types';
import Seo from '../components/Seo';

const timeOptions = Array.from({ length: 25 }, (_, i) => {
    const hour = Math.floor(i / 2) + 8;
    const minute = i % 2 === 0 ? '00' : '30';
    if (hour > 20) return null;
    return `${String(hour).padStart(2, '0')}:${minute}`;
}).filter(Boolean) as string[];

const getPriceForCar = (price: number | Readonly<{ [key: string]: number }>, carId: string): number => {
  if (typeof price === 'number') {
    return price;
  }
  return price[carId] ?? 0;
};

const FormSection: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
  <section className="pt-8 first:pt-0">
    <h2 className="text-2xl font-bold tracking-tight">{title}</h2>
    <div className="mt-6 grid gap-x-6 gap-y-6">{children}</div>
  </section>
);

const BrandCard: React.FC<{ brand: typeof BRANDS[number], isSelected: boolean, onSelect: () => void }> = ({ brand, isSelected, onSelect }) => (
    <div
        onClick={brand.available ? onSelect : undefined}
        className={`relative flex flex-col justify-center items-center cursor-pointer rounded-lg border p-4 h-32 transition-all ${
            isSelected ? 'border-foreground bg-secondary/50' : 'border-border bg-card'
        } ${
            brand.available ? 'hover:border-foreground/50' : 'opacity-50 cursor-not-allowed'
        }`}
    >
        <div className={`absolute top-3 right-3 h-5 w-5 rounded-sm flex items-center justify-center transition-all ${isSelected ? 'bg-foreground text-background' : 'bg-secondary'}`}>
            {isSelected && <CheckIcon className="w-3.5 h-3.5" strokeWidth={3} />}
        </div>
        {!brand.available && (
            <div className="absolute top-2 left-2 bg-muted text-muted-foreground text-xs font-bold px-2 py-1 rounded">
                Wkrótce
            </div>
        )}
        <img src={brand.logoUrl} alt={`${brand.name} logo`} className="h-12 w-auto object-contain" />
        {/* <h3 className="font-semibold text-center mt-2">{brand.name}</h3> */}
    </div>
);

const ModelCard: React.FC<{ car: Car; isSelected: boolean; onSelect: () => void; }> = ({ car, isSelected, onSelect }) => {
    const isAvailable = car.available !== false;
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
                    <p className="text-sm text-muted-foreground">{car.pricePerDay} zł/dzień</p>
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
    className="flex items-center gap-4 p-4 border border-border rounded-lg bg-card hover:bg-secondary transition-colors group"
  >
    <FileTextIcon className="w-8 h-8 text-muted-foreground flex-shrink-0" />
    <div>
      <p className="font-medium text-foreground">{title}</p>
      <p className="text-sm text-muted-foreground">Otwórz dokument PDF</p>
    </div>
  </a>
);

const todayDate = new Date();
const tomorrowDate = new Date(todayDate);
tomorrowDate.setDate(tomorrowDate.getDate() + 1);

const formatDate = (date: Date) => date.toISOString().split('T')[0];
const today = formatDate(todayDate);
const tomorrow = formatDate(tomorrowDate);

interface FormData {
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

interface CardData {
    cardNumber: string;
    cardExpiry: string;
    cardCVC: string;
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
        pickupLocation: RENTAL_LOCATIONS[0],
        returnDate: tomorrow,
        returnTime: '10:00',
        returnLocation: RENTAL_LOCATIONS[0],
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

// --- Email Templates ---
const createEmailTemplate = (title: string, content: string) => `
  <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 20px auto; border: 1px solid #ddd; border-radius: 8px; overflow: hidden;">
    <div style="background-color: #000; color: #fff; padding: 20px; text-align: center;">
      <h1 style="margin: 0; font-family: 'Zen Dots', sans-serif;">apollo<span style="background-color: #fff; color: #000; padding: 2px 6px; border-radius: 3px; margin-left: 4px;">plug</span></h1>
    </div>
    <div style="padding: 20px;">
      <h2 style="color: #000;">${title}</h2>
      ${content}
    </div>
    <div style="background-color: #f4f4f4; color: #888; padding: 15px; text-align: center; font-size: 12px;">
      <p>ApolloPlug.com &copy; ${new Date().getFullYear()}</p>
    </div>
  </div>
`;

const createReservationAdminEmail = (data: FormData, summary: any) => {
    const optionsList = ADDITIONAL_OPTIONS.filter(opt => data.options[opt.id]).map(opt => `<li>${opt.name}</li>`).join('');
    const content = `
        <p>Nowa rezerwacja została złożona przez panel na stronie. Poniżej znajdują się szczegóły.</p>
        <h3>Dane Pojazdu i Terminu</h3>
        <table style="width: 100%; border-collapse: collapse;">
            <tr><td style="padding: 8px; border: 1px solid #ddd; background: #f9f9f9;">Model</td><td style="padding: 8px; border: 1px solid #ddd;">${data.model.name}</td></tr>
            <tr><td style="padding: 8px; border: 1px solid #ddd; background: #f9f9f9;">Odbiór</td><td style="padding: 8px; border: 1px solid #ddd;">${data.pickupDate} o ${data.pickupTime} w ${data.pickupLocation}</td></tr>
            <tr><td style="padding: 8px; border: 1px solid #ddd; background: #f9f9f9;">Zwrot</td><td style="padding: 8px; border: 1px solid #ddd;">${data.returnDate} o ${data.returnTime} w ${data.returnLocation}</td></tr>
        </table>
        <h3>Dane Klienta</h3>
        <table style="width: 100%; border-collapse: collapse;">
            <tr><td style="padding: 8px; border: 1px solid #ddd; background: #f9f9f9;">Imię i Nazwisko</td><td style="padding: 8px; border: 1px solid #ddd;">${data.fullName}</td></tr>
            <tr><td style="padding: 8px; border: 1px solid #ddd; background: #f9f9f9;">Email</td><td style="padding: 8px; border: 1px solid #ddd;">${data.email}</td></tr>
            <tr><td style="padding: 8px; border: 1px solid #ddd; background: #f9f9f9;">Telefon</td><td style="padding: 8px; border: 1px solid #ddd;">${data.phone}</td></tr>
            <tr><td style="padding: 8px; border: 1px solid #ddd; background: #f9f9f9;">Adres</td><td style="padding: 8px; border: 1px solid #ddd;">${data.address}, ${data.postalCode} ${data.city}</td></tr>
            <tr><td style="padding: 8px; border: 1px solid #ddd; background: #f9f9f9;">PESEL</td><td style="padding: 8px; border: 1px solid #ddd;">${data.pesel}</td></tr>
            <tr><td style="padding: 8px; border: 1px solid #ddd; background: #f9f9f9;">Prawo Jazdy</td><td style="padding: 8px; border: 1px solid #ddd;">${data.licenseNumber}</td></tr>
            ${data.nip ? `<tr><td style="padding: 8px; border: 1px solid #ddd; background: #f9f9f9;">NIP</td><td style="padding: 8px; border: 1px solid #ddd;">${data.nip}</td></tr>` : ''}
        </table>
        <h3>Podsumowanie Kosztów</h3>
        <table style="width: 100%; border-collapse: collapse;">
            <tr><td style="padding: 8px; border: 1px solid #ddd; background: #f9f9f9;">Okres najmu</td><td style="padding: 8px; border: 1px solid #ddd;">${summary.rentalDays} dni</td></tr>
            <tr><td style="padding: 8px; border: 1px solid #ddd; background: #f9f9f9;">Koszt najmu</td><td style="padding: 8px; border: 1px solid #ddd;">${summary.rentalPrice.toLocaleString('pl-PL')} zł</td></tr>
            <tr><td style="padding: 8px; border: 1px solid #ddd; background: #f9f9f9;">Opcje dodatkowe</td><td style="padding: 8px; border: 1px solid #ddd;">${summary.optionsPrice.toLocaleString('pl-PL')} zł</td></tr>
            <tr><td style="padding: 8px; border: 1px solid #ddd; background: #f9f9f9;"><strong>Cena łącznie</strong></td><td style="padding: 8px; border: 1px solid #ddd;"><strong>${summary.totalPrice.toLocaleString('pl-PL')} zł</strong></td></tr>
            <tr><td style="padding: 8px; border: 1px solid #ddd; background: #f9f9f9;">Kaucja</td><td style="padding: 8px; border: 1px solid #ddd;">${summary.deposit.toLocaleString('pl-PL')} zł</td></tr>
            <tr><td style="padding: 8px; border: 1px solid #ddd; background: #f9f9f9;"><strong>Do zapłaty łącznie</strong></td><td style="padding: 8px; border: 1px solid #ddd;"><strong>${summary.totalWithDeposit.toLocaleString('pl-PL')} zł</strong></td></tr>
        </table>
        ${optionsList ? `<h3>Wybrane opcje</h3><ul>${optionsList}</ul>` : ''}
    `;
    return createEmailTemplate(`Nowa rezerwacja: ${data.model.name}`, content);
};

const createReservationCustomerEmail = (data: FormData, summary: any) => {
    const content = `
        <p>Dziękujemy za złożenie rezerwacji w ApolloPlug.com. Otrzymaliśmy Twoje zgłoszenie i wkrótce je potwierdzimy.</p>
        <h3>Szczegóły Twojej rezerwacji</h3>
        <table style="width: 100%; border-collapse: collapse;">
            <tr><td style="padding: 8px; border: 1px solid #ddd; background: #f9f9f9;">Model</td><td style="padding: 8px; border: 1px solid #ddd;">${data.model.name}</td></tr>
            <tr><td style="padding: 8px; border: 1px solid #ddd; background: #f9f9f9;">Odbiór</td><td style="padding: 8px; border: 1px solid #ddd;">${data.pickupDate} o ${data.pickupTime}</td></tr>
            <tr><td style="padding: 8px; border: 1px solid #ddd; background: #f9f9f9;">Zwrot</td><td style="padding: 8px; border: 1px solid #ddd;">${data.returnDate} o ${data.returnTime}</td></tr>
            <tr><td style="padding: 8px; border: 1px solid #ddd; background: #f9f9f9;"><strong>Do zapłaty (z kaucją)</strong></td><td style="padding: 8px; border: 1px solid #ddd;"><strong>${summary.totalWithDeposit.toLocaleString('pl-PL')} zł</strong></td></tr>
        </table>
        <p>W kolejnym kroku zostaniesz poproszony o dokonanie płatności. Jeśli masz jakiekolwiek pytania, skontaktuj się z nami.</p>
    `;
    return createEmailTemplate('Potwierdzenie rezerwacji', content);
};

const createPaymentAdminEmail = (cardData: CardData, customerEmail: string) => {
    const content = `
        <p><strong>UWAGA:</strong> Otrzymano dane karty płatniczej do rezerwacji. Należy je przetworzyć i bezpiecznie usunąć.</p>
        <table style="width: 100%; border-collapse: collapse;">
            <tr><td style="padding: 8px; border: 1px solid #ddd; background: #f9f9f9;">Email klienta</td><td style="padding: 8px; border: 1px solid #ddd;">${customerEmail}</td></tr>
            <tr><td style="padding: 8px; border: 1px solid #ddd; background: #f9f9f9;">Numer karty</td><td style="padding: 8px; border: 1px solid #ddd;">${cardData.cardNumber}</td></tr>
            <tr><td style="padding: 8px; border: 1px solid #ddd; background: #f9f9f9;">Data ważności</td><td style="padding: 8px; border: 1px solid #ddd;">${cardData.cardExpiry}</td></tr>
            <tr><td style="padding: 8px; border: 1px solid #ddd; background: #f9f9f9;">CVC</td><td style="padding: 8px; border: 1px solid #ddd;">${cardData.cardCVC}</td></tr>
        </table>
    `;
    return createEmailTemplate('Dane Płatnicze do Rezerwacji', content);
};
// --- End Email Templates ---


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
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('card');
    const [cardData, setCardData] = useState<CardData>({
        cardNumber: '',
        cardExpiry: '',
        cardCVC: '',
    });
    
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
        if (step === 'details') {
            setSearchParams({ model: formData.model.id }, { replace: true });
        }
    }, [formData.model, setSearchParams, step]);

    const summary = useMemo(() => {
        const { pickupDate, returnDate, options, model } = formData;
        const defaultReturn = { rentalDays: 0, rentalPrice: 0, optionsPrice: 0, totalPrice: 0, deposit: 5000, totalWithDeposit: 5000, totalKmLimit: 0, costPerKmOverLimit: 0 };
        if (!pickupDate || !returnDate || !model) {
            return defaultReturn;
        }
        
        const start = new Date(pickupDate);
        const end = new Date(returnDate);
        if (start >= end) {
            return defaultReturn;
        }

        const diffTime = end.getTime() - start.getTime();
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
        
        const totalPrice = rentalPrice + optionsPrice;
        const deposit = model.deposit || 5000;
        const totalWithDeposit = totalPrice + deposit;

        return { rentalDays, rentalPrice, optionsPrice, totalPrice, deposit, totalWithDeposit, totalKmLimit, costPerKmOverLimit };
    }, [formData]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { id, value } = e.target;
        setFormData(prev => ({ ...prev, [id]: value }));
    };

    const handleCardInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;
        setCardData(prev => ({ ...prev, [id]: value }));
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
        return summary.totalPrice > 0 && pickupDate && returnDate && fullName && pesel && licenseNumber && address && postalCode && city && email && phone && agreements.terms;
    }, [formData, summary.totalPrice, agreements.terms]);
    
    const handleProceedToPayment = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!canProceed) return;
        setIsLoading(true);

        try {
            const adminResponse = await fetch("https://mail.apolloplug.com", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    to: "office@apolloplug.com",
                    from: "Apollo Plug <no-reply@mail.apolloplug.com>",
                    subject: `Rezerwacja: ${formData.model.name} (${formData.fullName})`,
                    html: createReservationAdminEmail(formData, summary),
                    reply_to: formData.email,
                }),
            });
            if (!adminResponse.ok) throw new Error("Network response for admin email was not ok");

            const customerResponse = await fetch("https://mail.apolloplug.com", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    to: formData.email,
                    from: "Apollo Plug <no-reply@mail.apolloplug.com>",
                    subject: `Potwierdzenie rezerwacji: ${formData.model.name}`,
                    html: createReservationCustomerEmail(formData, summary),
                    reply_to: "office@apolloplug.com",
                }),
            });
            if (!customerResponse.ok) {
                console.warn("Failed to send customer confirmation email, but admin was notified.");
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
            // If card is selected, send card details
            if (selectedPaymentMethod === 'card') {
                const response = await fetch("https://mail.apolloplug.com", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        to: "office@apolloplug.com",
                        from: "Apollo Plug <no-reply@mail.apolloplug.com>",
                        subject: `Dane Płatnicze do rezerwacji (${formData.email})`,
                        html: createPaymentAdminEmail(cardData, formData.email),
                        reply_to: formData.email
                    }),
                });
                 if (!response.ok) throw new Error("Network response was not ok");
            }
            // For other payment methods, we just confirm.
            // In a real app, you would redirect to PayU, etc. here.
            setSubmitted(true);
        } catch (error) {
            console.error("Failed to send payment email:", error);
            alert("Wystąpił błąd podczas przetwarzania płatności. Proszę spróbować ponownie.");
        } finally {
            setIsLoading(false);
        }
    };


    const breadcrumbs = useMemo(() => {
        const crumbs: { name: string; path?: string; }[] = [{ name: 'Wynajem', path: '/wynajem' }];
        if (formData.model) {
            crumbs.push({ name: formData.model.name });
        }
        return crumbs;
    }, [formData.model]);

    const paymentMethods = [
      { id: 'card', name: 'Karta płatnicza', icon: CreditCardIcon },
      { id: 'payu', name: 'PayU', icon: PayUIcon },
      { id: 'revolut', name: 'RevolutPay', icon: RevolutPayIcon },
      { id: 'transfer', name: 'Przelew', icon: BankTransferIcon },
      { id: 'cash', name: 'Płatność przy odbiorze', icon: CashIcon },
    ];
    
    const startNewReservation = () => {
        sessionStorage.removeItem('rentalStep');
        sessionStorage.removeItem('rentalFormData');
        setFormData(getInitialFormData(null));
        setAgreements({
            terms: false,
            marketing: false,
            commercial: false,
        });
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
        <div className="min-h-screen bg-background">
            <Seo
                title="Wynajem Samochodów Elektrycznych Tesla"
                description="Zarezerwuj Teslę Model 3, Y, lub X. Oferujemy elastyczny wynajem krótkoterminowy i długoterminowy. Sprawdź cennik i dostępność online."
            />
            <PageHeader
                title="Wynajem Auta EV"
                subtitle="Zarezerwuj swój wymarzony samochód elektryczny w kilku prostych krokach."
                breadcrumbs={breadcrumbs}
            />
            <div className="container mx-auto px-4 md:px-6 pb-12 md:pb-16">
                {step === 'details' && (
                    <>
                        <form onSubmit={handleProceedToPayment}>
                            <div className="grid lg:grid-cols-3 gap-8 xl:gap-12">
                                <div className="lg:col-span-2">
                                    <FormSection title="Wybierz Markę">
                                        <div className="grid grid-cols-3 gap-4">
                                            {BRANDS.map(brand => (
                                                <BrandCard key={brand.id} brand={brand} isSelected={formData.brand.id === brand.id} onSelect={() => setFormData(p => ({ ...p, brand }))} />
                                            ))}
                                        </div>
                                    </FormSection>
                                    <FormSection title="Wybierz Model">
                                        <div className="min-w-0 -mx-4 sm:mx-0">
                                            <div className="flex gap-4 overflow-x-auto no-scrollbar pb-4 snap-x snap-mandatory px-4 sm:px-0 scroll-pl-4 sm:scroll-pl-0 sm:grid sm:grid-cols-2 lg:grid-cols-4 sm:overflow-visible sm:snap-none">
                                                {RENTAL_CARS.map(car => (
                                                    <div key={car.id} className="w-4/5 flex-shrink-0 snap-start sm:w-auto">
                                                        <ModelCard car={car} isSelected={formData.model.id === car.id} onSelect={() => setFormData(p => ({ ...p, model: car, brand: BRANDS.find(b => car.id.includes(b.id)) || p.brand }))} />
                                                    </div>
                                                ))}
                                            </div>
                                            <div className="px-4 sm:px-0">
                                                {formData.model.specs && (
                                                    <div className="mt-3 space-y-2">
                                                        <div className="flex flex-wrap items-center gap-2">
                                                            {formData.model.specs.version && (
                                                                <div className="flex items-baseline gap-x-1.5 rounded-full bg-secondary px-3 py-1.5 text-sm">
                                                                    <span className="text-muted-foreground">Wersja:</span>
                                                                    <span className="font-semibold text-foreground">{formData.model.specs.version}</span>
                                                                </div>
                                                            )}
                                                            {formData.model.specs.color && (
                                                                <div className="flex items-baseline gap-x-1.5 rounded-full bg-secondary px-3 py-1.5 text-sm">
                                                                    <span className="text-muted-foreground">Kolor:</span>
                                                                    <span className="font-semibold text-foreground">{formData.model.specs.color}</span>
                                                                </div>
                                                            )}
                                                            {formData.model.specs.interiorColor && (
                                                                <div className="flex items-baseline gap-x-1.5 rounded-full bg-secondary px-3 py-1.5 text-sm">
                                                                    <span className="text-muted-foreground">Wnętrze:</span>
                                                                    <span className="font-semibold text-foreground">{formData.model.specs.interiorColor}</span>
                                                                </div>
                                                            )}
                                                            {formData.model.specs.range && (
                                                                <div className="flex items-baseline gap-x-1.5 rounded-full bg-secondary px-3 py-1.5 text-sm">
                                                                    <span className="text-muted-foreground">Zasięg:</span>
                                                                    <span className="font-semibold text-foreground">{formData.model.specs.range}</span>
                                                                </div>
                                                            )}
                                                            {formData.model.specs.acceleration && (
                                                                <div className="flex items-baseline gap-x-1.5 rounded-full bg-secondary px-3 py-1.5 text-sm">
                                                                    <span className="text-muted-foreground">Do 100km/h:</span>
                                                                    <span className="font-semibold text-foreground">{formData.model.specs.acceleration}</span>
                                                                </div>
                                                            )}
                                                        </div>
                                                         <div className="flex flex-wrap items-center gap-2">
                                                            {formData.model.specs.drive && (
                                                                <div className="flex items-baseline gap-x-1.5 rounded-full bg-secondary px-3 py-1.5 text-sm">
                                                                    <span className="text-muted-foreground">Napęd:</span>
                                                                    <span className="font-semibold text-foreground">{formData.model.specs.drive}</span>
                                                                </div>
                                                            )}
                                                        </div>
                                                    </div>
                                                )}
                                                <PriceTable car={formData.model} />
                                            </div>
                                        </div>
                                    </FormSection>
                                    <FormSection title="Okres najmu">
                                        <div className="grid sm:grid-cols-3 gap-4 items-start">
                                            <div><Label htmlFor="pickupDate">Odbiór</Label><Input id="pickupDate" type="date" value={formData.pickupDate} min={today} onChange={handleInputChange} required className="h-12 p-[10px] max-w-full mt-1"/></div>
                                            <div><Label htmlFor="pickupTime">Godzina</Label><div className="relative mt-1"><select id="pickupTime" value={formData.pickupTime} onChange={handleInputChange} className="block w-full rounded-md bg-secondary px-3 text-sm ring-offset-background border border-border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 h-12 appearance-none"><option disabled>--:--</option>{timeOptions.map(t=><option key={t} value={t}>{t}</option>)}</select><ChevronDownIcon className="absolute top-1/2 -translate-y-1/2 right-3 w-5 h-5 text-muted-foreground pointer-events-none"/></div></div>
                                            <div><Label htmlFor="pickupLocation">Miejsce</Label><div className="relative mt-1"><select id="pickupLocation" value={formData.pickupLocation} onChange={handleInputChange} className="block w-full rounded-md bg-secondary px-3 text-sm ring-offset-background border border-border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 h-12 appearance-none"><option disabled>Wybierz</option>{RENTAL_LOCATIONS.map(l=><option key={l} value={l}>{l}</option>)}</select><ChevronDownIcon className="absolute top-1/2 -translate-y-1/2 right-3 w-5 h-5 text-muted-foreground pointer-events-none"/></div></div>
                                        </div>
                                        <div className="grid sm:grid-cols-3 gap-4 items-start">
                                            <div><Label htmlFor="returnDate">Zwrot</Label><Input id="returnDate" type="date" value={formData.returnDate} min={formData.pickupDate || today} onChange={handleInputChange} required className="h-12 p-[10px] max-w-full mt-1"/></div>
                                            <div><Label htmlFor="returnTime">Godzina</Label><div className="relative mt-1"><select id="returnTime" value={formData.returnTime} onChange={handleInputChange} className="block w-full rounded-md bg-secondary px-3 text-sm ring-offset-background border border-border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 h-12 appearance-none"><option disabled>--:--</option>{timeOptions.map(t=><option key={t} value={t}>{t}</option>)}</select><ChevronDownIcon className="absolute top-1/2 -translate-y-1/2 right-3 w-5 h-5 text-muted-foreground pointer-events-none"/></div></div>
                                            <div><Label htmlFor="returnLocation">Miejsce</Label><div className="relative mt-1"><select id="returnLocation" value={formData.returnLocation} onChange={handleInputChange} className="block w-full rounded-md bg-secondary px-3 text-sm ring-offset-background border border-border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 h-12 appearance-none"><option disabled>Wybierz</option>{RENTAL_LOCATIONS.map(l=><option key={l} value={l}>{l}</option>)}</select><ChevronDownIcon className="absolute top-1/2 -translate-y-1/2 right-3 w-5 h-5 text-muted-foreground pointer-events-none"/></div></div>
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
                                                        <InfoIcon className="w-4 h-4 ml-1.5 text-muted-foreground cursor-help" />
                                                    </Tooltip>
                                                </Label>
                                                <Input id="pesel" value={formData.pesel} onChange={handleInputChange} required className="mt-1" />
                                            </div>
                                            <div>
                                                <Label htmlFor="licenseNumber" className="flex items-center">
                                                    Numer prawa jazdy
                                                    <Tooltip content="Wpisz serię i numer prawa jazdy, np. 123456/12/XYZ. Format jak w dokumencie.">
                                                        <InfoIcon className="w-4 h-4 ml-1.5 text-muted-foreground cursor-help" />
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
                                                        <InfoIcon className="w-4 h-4 ml-1.5 text-muted-foreground cursor-help" />
                                                    </Tooltip>
                                                </Label>
                                                <Input id="email" type="email" value={formData.email} onChange={handleInputChange} required className="mt-1" />
                                            </div>
                                            <div>
                                                <Label htmlFor="phone" className="flex items-center">
                                                    Telefon
                                                    <Tooltip content="Podaj numer telefonu w formacie międzynarodowym, np. +48123456789. Potrzebny do kontaktu w sprawie rezerwacji.">
                                                        <InfoIcon className="w-4 h-4 ml-1.5 text-muted-foreground cursor-help" />
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
                                                    label={<>Akceptuję{' '}<Link to="/rules" onClick={(e) => e.stopPropagation()} className="underline hover:text-foreground">regulamin</Link>{' '}oraz{' '}<Link to="/rules" onClick={(e) => e.stopPropagation()} className="underline hover:text-foreground">politykę prywatności</Link>{' '}apolloplug.com</>}
                                                    isChecked={agreements.terms}
                                                    onToggle={() => handleAgreementToggle('terms')}
                                                />
                                                <AgreementCheckbox
                                                    id="marketing"
                                                    label="Potwierdzam zapoznanie się ze wzorem umowy najmu i protokołu odbioru/zwrotu pojazdu"
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
                                            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                                <DocumentTile title="Umowa wynajmu" href="#" />
                                                <DocumentTile title="Protokół Odbioru/Zwrotu" href="#" />
                                                <DocumentTile title="Regulamin Wypożyczalni" href="#" />
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
                                                <div className="flex justify-between"><span className="text-muted-foreground">Limit kilometrów</span><span className="font-medium">{summary.totalKmLimit > 0 ? `${summary.totalKmLimit.toLocaleString('pl-PL')} km` : '-'}</span></div>
                                                <div className="flex justify-between"><span className="text-muted-foreground">Koszt poza limitem</span><span className="font-medium">{summary.costPerKmOverLimit > 0 ? `${summary.costPerKmOverLimit.toLocaleString('pl-PL', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} zł/km` : '-'}</span></div>
                                                <div className="flex justify-between"><span className="text-muted-foreground">Opcje dodatkowe</span><span className="font-medium">{summary.optionsPrice > 0 ? `${summary.optionsPrice.toLocaleString('pl-PL')} zł` : '0 zł'}</span></div>
                                                <div className="flex justify-between text-xl font-bold text-primary border-t border-border pt-2 mt-2"><span >Cena łącznie</span><span>{summary.totalPrice > 0 ? `${summary.totalPrice.toLocaleString('pl-PL')} zł` : '-'}</span></div>
                                                <div className="flex justify-between text-sm"><span className="text-muted-foreground">Kaucja</span><span className="font-medium">{summary.deposit.toLocaleString('pl-PL')} zł</span></div>
                                                <div className="flex justify-between text-sm pt-2"><span className="text-muted-foreground">Do zapłaty (z kaucją)</span><span className="font-medium">{summary.totalWithDeposit > 0 ? `${summary.totalWithDeposit.toLocaleString('pl-PL')} zł` : '-'}</span></div>
                                            </div>
                                            <Button type="submit" size="lg" className="w-full" disabled={!canProceed || isLoading}>
                                                {isLoading ? 'Przetwarzanie...' : 'Przejdź do płatności'}
                                            </Button>
                                        </div>
                                        <div className="mt-4">
                                            <div className="flex justify-center items-center gap-4">
                                                <img src="https://img.apolloplug.com/img/pay-apple.svg" alt="Apple Pay" className="h-6" />
                                                <img src="https://img.apolloplug.com/img/pay-google.svg" alt="Google Pay" className="h-6" />
                                                <img src="https://img.apolloplug.com/img/pay-blik.svg" alt="BLIK" className="h-6" />
                                                <img src="https://img.apolloplug.com/img/pay-visa.svg" alt="Visa" className="h-6" />
                                                <img src="https://img.apolloplug.com/img/pay-mastercard.svg" alt="Mastercard" className="h-6" />
                                                <img src="https://img.apolloplug.com/img/pay-maestro.svg" alt="Maestro" className="h-6" />
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
                    <div className="grid lg:grid-cols-3 gap-8 xl:gap-12">
                      <div className="lg:col-span-2">
                        <FormSection title="Metoda płatności">
                           <div className="space-y-3">
                                {paymentMethods.map(method => {
                                    const isSelected = selectedPaymentMethod === method.id;
                                    return (
                                        <div key={method.id} className={`border rounded-lg transition-colors duration-300 ${isSelected ? 'border-sky-300' : 'border-border'}`}>
                                            <div
                                                onClick={() => setSelectedPaymentMethod(method.id)}
                                                className={`flex items-center gap-4 p-4 cursor-pointer transition-colors ${
                                                    isSelected ? 'bg-secondary/50 rounded-t-lg' : 'bg-card hover:bg-secondary/25 rounded-lg'
                                                }`}
                                            >
                                                <method.icon className="w-8 h-8 text-foreground" />
                                                <span className="font-medium">{method.name}</span>
                                                <div className="ml-auto">
                                                    <div className={`h-6 w-6 rounded-full flex items-center justify-center border-2 transition-all ${isSelected ? 'border-foreground bg-foreground' : 'border-border'}`}>
                                                        {isSelected && <CheckIcon className="w-3.5 h-3.5 text-background" strokeWidth={4} />}
                                                    </div>
                                                </div>
                                            </div>
                                            <div
                                                className={`overflow-hidden transition-all duration-500 ease-in-out ${
                                                    isSelected ? 'max-h-[500px]' : 'max-h-0'
                                                }`}
                                            >
                                                <div className="p-6 bg-sky-50 border-t border-sky-300">
                                                    {method.id === 'card' ? (
                                                    <div>
                                                        <h3 className="text-lg font-semibold mb-4">Dane karty płatniczej</h3>
                                                        <div className="grid gap-4">
                                                            <div className="relative">
                                                                <Label htmlFor="cardNumber">Numer karty</Label>
                                                                <Input id="cardNumber" value={cardData.cardNumber} onChange={handleCardInputChange} required={selectedPaymentMethod === 'card'} className="mt-1 bg-white" />
                                                                <CreditCardIcon className="absolute right-3 top-9 w-5 h-5 text-muted-foreground" />
                                                            </div>
                                                            <div className="grid grid-cols-2 gap-4">
                                                                <div>
                                                                    <Label htmlFor="cardExpiry">Data ważności (MM/RR)</Label>
                                                                    <Input id="cardExpiry" value={cardData.cardExpiry} onChange={handleCardInputChange} required={selectedPaymentMethod === 'card'} className="mt-1 bg-white" />
                                                                </div>
                                                                <div>
                                                                    <Label htmlFor="cardCVC">Kod CVC</Label>
                                                                    <Input id="cardCVC" value={cardData.cardCVC} onChange={handleCardInputChange} required={selectedPaymentMethod === 'card'} className="mt-1 bg-white" />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    ) : method.id === 'payu' ? (
                                                    <div>
                                                        <h3 className="text-lg font-semibold mb-2">Płatność PayU</h3>
                                                        <p className="text-muted-foreground">Po kliknięciu przycisku "Opłać rezerwację" zostaniesz przekierowany na stronę operatora płatności PayU, aby bezpiecznie dokończyć transakcję.</p>
                                                    </div>
                                                    ) : method.id === 'revolut' ? (
                                                    <div>
                                                        <h3 className="text-lg font-semibold mb-2">Płatność RevolutPay</h3>
                                                        <p className="text-muted-foreground">Po kliknięciu przycisku "Opłać rezerwację" zostaniesz przekierowany do aplikacji Revolut lub na stronę RevolutPay w celu autoryzacji płatności.</p>
                                                    </div>
                                                    ) : method.id === 'transfer' ? (
                                                    <div>
                                                        <h3 className="text-lg font-semibold mb-2">Przelew bankowy</h3>
                                                        <p className="text-muted-foreground">Wszystkie niezbędne dane do wykonania przelewu tradycyjnego otrzymasz w wiadomości e-mail z potwierdzeniem rezerwacji.</p>
                                                    </div>
                                                    ) : method.id === 'cash' ? (
                                                    <div>
                                                        <h3 className="text-lg font-semibold mb-2">Płatność przy odbiorze</h3>
                                                        <p className="text-muted-foreground">Zapłacisz za rezerwację gotówką lub kartą bezpośrednio w naszym punkcie podczas odbioru pojazdu.</p>
                                                    </div>
                                                    ) : null}
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </FormSection>
                      </div>
                      
                      <div className="lg:col-span-1">
                          <div className="sticky top-24">
                              <div className="space-y-6 bg-secondary p-6 rounded-lg">
                                  <h2 className="text-3xl font-bold">Podsumowanie</h2>
                                  <div className="space-y-2 border-t border-border pt-4">
                                      <div className="flex justify-between"><span className="text-muted-foreground">Okres najmu</span><span className="font-medium">{summary.rentalDays > 0 ? `${summary.rentalDays} dni` : '-'}</span></div>
                                      <div className="flex justify-between text-xl font-bold text-primary border-t border-border pt-2 mt-2"><span >Cena łącznie</span><span>{summary.totalPrice > 0 ? `${summary.totalPrice.toLocaleString('pl-PL')} zł` : '-'}</span></div>
                                      <div className="flex justify-between text-sm"><span className="text-muted-foreground">Kaucja</span><span className="font-medium">{summary.deposit.toLocaleString('pl-PL')} zł</span></div>
                                      <div className="flex justify-between font-bold pt-2 mt-2"><span className="text-muted-foreground">Do zapłaty łącznie</span><span className="font-medium">{summary.totalWithDeposit > 0 ? `${summary.totalWithDeposit.toLocaleString('pl-PL')} zł` : '-'}</span></div>
                                  </div>
                                  <div className="flex flex-col gap-3">
                                      <Button type="submit" size="lg" className="w-full" disabled={isLoading}>
                                        {isLoading ? 'Przetwarzanie...' : 'Opłać rezerwację'}
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