import React, { useState, useMemo, useEffect } from 'react';
import { Button, Input, Label } from '../components/ui';
import { RENTAL_CARS, RENTAL_LOCATIONS, ADDITIONAL_OPTIONS, BRANDS, CreditCardIcon, ChevronDownIcon, CheckIcon, ApplePayIcon, GooglePayIcon, VisaIcon, MastercardIcon } from '../constants';
import type { Car } from '../types';

const timeOptions = Array.from({ length: 25 }, (_, i) => {
    const hour = Math.floor(i / 2) + 8;
    const minute = i % 2 === 0 ? '00' : '30';
    if (hour > 20) return null;
    return `${String(hour).padStart(2, '0')}:${minute}`;
}).filter(Boolean) as string[];

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
        <brand.LogoComponent className="h-12 w-auto" />
        <h3 className="font-semibold text-center mt-2">{brand.name}</h3>
    </div>
);

const ModelCard: React.FC<{ car: Car; isSelected: boolean; onSelect: () => void; }> = ({ car, isSelected, onSelect }) => {
    const isAvailable = car.available !== false;
    return (
        <div
            onClick={isAvailable ? onSelect : undefined}
            className={`relative cursor-pointer rounded-lg border p-4 transition-all flex flex-col ${
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
                <p className="text-sm text-muted-foreground">{car.pricePerDay} zł/dzień</p>
            </div>
        </div>
    );
};

const CheckboxOption: React.FC<{ option: typeof ADDITIONAL_OPTIONS[number], isChecked: boolean, onToggle: () => void }> = ({ option, isChecked, onToggle }) => {
    const isFree = option.price === 0;
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
                    {isFree ? 'Wliczone w cenę' : `${option.price} zł ${option.type === 'per_day' ? '/ dzień' : ''}`}
                </span>
            </div>
        </label>
    );
};

const AgreementCheckbox: React.FC<{
  id: string;
  label: string;
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


const today = new Date().toISOString().split('T')[0];
const firstAvailableCar = RENTAL_CARS.find(c => c.available) || RENTAL_CARS[0];

const RentalPage: React.FC = () => {
    const [step, setStep] = useState<'details' | 'payment'>('details');
    const [submitted, setSubmitted] = useState(false);
    const [formData, setFormData] = useState({
        brand: BRANDS[0],
        model: firstAvailableCar,
        pickupDate: '',
        pickupTime: '10:00',
        pickupLocation: RENTAL_LOCATIONS[0],
        returnDate: '',
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
        options: Object.fromEntries(ADDITIONAL_OPTIONS.map(o => [o.id, o.price === 0]))
    });
    const [agreements, setAgreements] = useState({
        terms: false,
        marketing: false,
        commercial: false,
    });

    const summary = useMemo(() => {
        const { pickupDate, returnDate, options, model } = formData;
        if (!pickupDate || !returnDate || !model) {
            return { rentalDays: 0, rentalPrice: 0, optionsPrice: 0, totalPrice: 0, deposit: 5000, totalWithDeposit: 5000 };
        }
        
        const start = new Date(pickupDate);
        const end = new Date(returnDate);
        if (start >= end) {
            return { rentalDays: 0, rentalPrice: 0, optionsPrice: 0, totalPrice: 0, deposit: 5000, totalWithDeposit: 5000 };
        }

        const diffTime = end.getTime() - start.getTime();
        const rentalDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) || 1;
        const rentalPrice = rentalDays * model.pricePerDay;

        let optionsPrice = 0;
        ADDITIONAL_OPTIONS.forEach(opt => {
            if (options[opt.id]) {
                optionsPrice += opt.type === 'per_day' ? opt.price * rentalDays : opt.price;
            }
        });
        
        const totalPrice = rentalPrice + optionsPrice;
        const deposit = 5000;
        const totalWithDeposit = totalPrice + deposit;

        return { rentalDays, rentalPrice, optionsPrice, totalPrice, deposit, totalWithDeposit };
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
        return summary.totalPrice > 0 && pickupDate && returnDate && fullName && pesel && licenseNumber && address && postalCode && city && email && phone && agreements.terms;
    }, [formData, summary.totalPrice, agreements.terms]);

    if (submitted) {
        return (
          <div className="container mx-auto max-w-2xl px-4 md:px-6 py-32 text-center flex flex-col items-center justify-center min-h-[calc(100vh-112px)]">
            <h1 className="text-4xl font-bold tracking-tight">Dziękujemy za rezerwację!</h1>
            <p className="mt-4 text-lg text-muted-foreground">
              Potwierdzenie rezerwacji dla {formData.model.name} zostało wysłane na adres {formData.email}.
            </p>
            <Button onClick={() => { setSubmitted(false); setStep('details'); }} className="mt-8" variant="primary">
              Zarezerwuj kolejny pojazd
            </Button>
          </div>
        );
    }

    return (
        <div className="min-h-screen bg-background">
            <div className="container mx-auto px-4 md:px-6 py-16">
                {step === 'details' && (
                    <form onSubmit={(e) => { e.preventDefault(); if(canProceed) setStep('payment'); }}>
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
                                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                                        {RENTAL_CARS.map(car => (
                                            <ModelCard key={car.id} car={car} isSelected={formData.model.id === car.id} onSelect={() => setFormData(p => ({ ...p, model: car }))} />
                                        ))}
                                    </div>
                                </FormSection>
                                <FormSection title="Okres najmu">
                                    <div className="grid sm:grid-cols-3 gap-4 items-start">
                                        <div><Label htmlFor="pickupDate">Odbiór</Label><Input id="pickupDate" type="date" value={formData.pickupDate} min={today} onChange={handleInputChange} required className="h-12 pt-0 mt-1"/></div>
                                        <div><Label htmlFor="pickupTime">Godzina</Label><div className="relative mt-1"><select id="pickupTime" value={formData.pickupTime} onChange={handleInputChange} className="block w-full rounded-md bg-secondary px-3 text-sm ring-offset-background border-2 border-transparent focus-visible:outline-none focus-visible:border-primary h-12 appearance-none"><option disabled>--:--</option>{timeOptions.map(t=><option key={t} value={t}>{t}</option>)}</select><ChevronDownIcon className="absolute top-1/2 -translate-y-1/2 right-3 w-5 h-5 text-muted-foreground pointer-events-none"/></div></div>
                                        <div><Label htmlFor="pickupLocation">Miejsce</Label><div className="relative mt-1"><select id="pickupLocation" value={formData.pickupLocation} onChange={handleInputChange} className="block w-full rounded-md bg-secondary px-3 text-sm ring-offset-background border-2 border-transparent focus-visible:outline-none focus-visible:border-primary h-12 appearance-none"><option disabled>Wybierz</option>{RENTAL_LOCATIONS.map(l=><option key={l} value={l}>{l}</option>)}</select><ChevronDownIcon className="absolute top-1/2 -translate-y-1/2 right-3 w-5 h-5 text-muted-foreground pointer-events-none"/></div></div>
                                    </div>
                                    <div className="grid sm:grid-cols-3 gap-4 items-start">
                                        <div><Label htmlFor="returnDate">Zwrot</Label><Input id="returnDate" type="date" value={formData.returnDate} min={formData.pickupDate || today} onChange={handleInputChange} required className="h-12 pt-0 mt-1"/></div>
                                        <div><Label htmlFor="returnTime">Godzina</Label><div className="relative mt-1"><select id="returnTime" value={formData.returnTime} onChange={handleInputChange} className="block w-full rounded-md bg-secondary px-3 text-sm ring-offset-background border-2 border-transparent focus-visible:outline-none focus-visible:border-primary h-12 appearance-none"><option disabled>--:--</option>{timeOptions.map(t=><option key={t} value={t}>{t}</option>)}</select><ChevronDownIcon className="absolute top-1/2 -translate-y-1/2 right-3 w-5 h-5 text-muted-foreground pointer-events-none"/></div></div>
                                        <div><Label htmlFor="returnLocation">Miejsce</Label><div className="relative mt-1"><select id="returnLocation" value={formData.returnLocation} onChange={handleInputChange} className="block w-full rounded-md bg-secondary px-3 text-sm ring-offset-background border-2 border-transparent focus-visible:outline-none focus-visible:border-primary h-12 appearance-none"><option disabled>Wybierz</option>{RENTAL_LOCATIONS.map(l=><option key={l} value={l}>{l}</option>)}</select><ChevronDownIcon className="absolute top-1/2 -translate-y-1/2 right-3 w-5 h-5 text-muted-foreground pointer-events-none"/></div></div>
                                    </div>
                                </FormSection>
                                <FormSection title="Dane kierowcy">
                                    <div className="grid sm:grid-cols-2 gap-6">
                                        <div className="relative"><Input id="fullName" value={formData.fullName} onChange={handleInputChange} required placeholder=" " className="peer" /><Label htmlFor="fullName" className="absolute text-muted-foreground duration-300 transform -translate-y-3 scale-75 top-4 left-3 z-10 origin-[0] peer-focus:text-primary peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3">Imię i Nazwisko</Label></div>
                                        <div className="relative"><Input id="nip" value={formData.nip} onChange={handleInputChange} placeholder=" " className="peer" /><Label htmlFor="nip" className="absolute text-muted-foreground duration-300 transform -translate-y-3 scale-75 top-4 left-3 z-10 origin-[0] peer-focus:text-primary peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3">NIP do faktury (opcjonalnie)</Label></div>
                                        <div className="relative"><Input id="pesel" value={formData.pesel} onChange={handleInputChange} required placeholder=" " className="peer" /><Label htmlFor="pesel" className="absolute text-muted-foreground duration-300 transform -translate-y-3 scale-75 top-4 left-3 z-10 origin-[0] peer-focus:text-primary peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3">PESEL</Label></div>
                                        <div className="relative"><Input id="licenseNumber" value={formData.licenseNumber} onChange={handleInputChange} required placeholder=" " className="peer" /><Label htmlFor="licenseNumber" className="absolute text-muted-foreground duration-300 transform -translate-y-3 scale-75 top-4 left-3 z-10 origin-[0] peer-focus:text-primary peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3">Numer prawa jazdy</Label></div>
                                        <div className="relative sm:col-span-2"><Input id="address" value={formData.address} onChange={handleInputChange} required placeholder=" " className="peer" /><Label htmlFor="address" className="absolute text-muted-foreground duration-300 transform -translate-y-3 scale-75 top-4 left-3 z-10 origin-[0] peer-focus:text-primary peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3">Adres zamieszkania</Label></div>
                                        <div className="relative"><Input id="postalCode" value={formData.postalCode} onChange={handleInputChange} required placeholder=" " className="peer" /><Label htmlFor="postalCode" className="absolute text-muted-foreground duration-300 transform -translate-y-3 scale-75 top-4 left-3 z-10 origin-[0] peer-focus:text-primary peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3">Kod pocztowy</Label></div>
                                        <div className="relative"><Input id="city" value={formData.city} onChange={handleInputChange} required placeholder=" " className="peer" /><Label htmlFor="city" className="absolute text-muted-foreground duration-300 transform -translate-y-3 scale-75 top-4 left-3 z-10 origin-[0] peer-focus:text-primary peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3">Miejscowość</Label></div>
                                        <div className="relative"><Input id="email" type="email" value={formData.email} onChange={handleInputChange} required placeholder=" " className="peer" /><Label htmlFor="email" className="absolute text-muted-foreground duration-300 transform -translate-y-3 scale-75 top-4 left-3 z-10 origin-[0] peer-focus:text-primary peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3">Email</Label></div>
                                        <div className="relative"><Input id="phone" type="tel" value={formData.phone} onChange={handleInputChange} required placeholder=" " className="peer" /><Label htmlFor="phone" className="absolute text-muted-foreground duration-300 transform -translate-y-3 scale-75 top-4 left-3 z-10 origin-[0] peer-focus:text-primary peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3">Telefon</Label></div>
                                    </div>
                                </FormSection>
                                <FormSection title="Opcje dodatkowe">
                                    <div className="space-y-3">
                                        {ADDITIONAL_OPTIONS.map(opt => <CheckboxOption key={opt.id} option={opt} isChecked={formData.options[opt.id]} onToggle={() => handleOptionToggle(opt.id)} />)}
                                    </div>
                                </FormSection>
                                <FormSection title="Regulamin i szkic umowy">
                                    <div className="space-y-4">
                                        <AgreementCheckbox
                                            id="terms"
                                            label="Akceptuję regulamin oraz politykę prywatności apolloplug.com"
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
                                </FormSection>
                            </div>

                            <div className="lg:col-span-1">
                                <div className="sticky top-24">
                                    <div className="space-y-6 bg-secondary p-6 rounded-lg">
                                        <h2 className="text-3xl font-bold">Podsumowanie</h2>
                                        <div className="space-y-2 border-t border-border pt-4">
                                            <div className="flex justify-between"><span className="text-muted-foreground">Okres najmu</span><span className="font-medium">{summary.rentalDays > 0 ? `${summary.rentalDays} dni` : '-'}</span></div>
                                            <div className="flex justify-between"><span className="text-muted-foreground">Cena najmu</span><span className="font-medium">{summary.rentalPrice > 0 ? `${summary.rentalPrice.toLocaleString('pl-PL')} zł` : '-'}</span></div>
                                            <div className="flex justify-between"><span className="text-muted-foreground">Opcje dodatkowe</span><span className="font-medium">{summary.optionsPrice > 0 ? `${summary.optionsPrice.toLocaleString('pl-PL')} zł` : '0 zł'}</span></div>
                                            <div className="flex justify-between text-lg font-semibold border-t border-border pt-2 mt-2"><span >Cena łącznie</span><span>{summary.totalPrice > 0 ? `${summary.totalPrice.toLocaleString('pl-PL')} zł` : '-'}</span></div>
                                            <div className="flex justify-between text-sm"><span className="text-muted-foreground">Kaucja</span><span className="font-medium">{summary.deposit.toLocaleString('pl-PL')} zł</span></div>
                                            <div className="flex justify-between text-xl font-bold text-primary pt-2"><span >Do zapłaty (z kaucją)</span><span>{summary.totalWithDeposit > 0 ? `${summary.totalWithDeposit.toLocaleString('pl-PL')} zł` : '-'}</span></div>
                                        </div>
                                        <Button type="submit" size="lg" className="w-full" disabled={!canProceed}>Przejdź do płatności</Button>
                                    </div>
                                    <div className="mt-4">
                                        <div className="flex justify-center items-center gap-4 text-muted-foreground">
                                            <ApplePayIcon className="h-6" />
                                            <GooglePayIcon className="h-6" />
                                            <VisaIcon className="h-6" />
                                            <MastercardIcon className="h-6" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                )}
                {step === 'payment' && (
                    <div className="max-w-md mx-auto">
                        <div className="bg-secondary p-8 rounded-lg shadow-sm">
                            <div className="text-center">
                                <h1 className="text-3xl font-bold">Płatność</h1>
                                <p className="text-muted-foreground mt-2">Sfinalizuj rezerwację, wprowadzając dane karty.</p>
                            </div>
                            <form onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }} className="mt-8 space-y-6">
                                <div className="relative"><Input id="cardName" placeholder=" " required className="peer"/><Label htmlFor="cardName" className="absolute text-muted-foreground duration-300 transform -translate-y-3 scale-75 top-4 left-3 z-10 origin-[0] peer-focus:text-primary peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3">Imię i nazwisko na karcie</Label></div>
                                <div className="relative">
                                    <Input id="cardNumber" placeholder=" " required className="peer"/>
                                    <Label htmlFor="cardNumber" className="absolute text-muted-foreground duration-300 transform -translate-y-3 scale-75 top-4 left-3 z-10 origin-[0] peer-focus:text-primary peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3">Numer karty</Label>
                                    <CreditCardIcon className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground"/>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="relative"><Input id="cardExpiry" placeholder=" " required className="peer"/><Label htmlFor="cardExpiry" className="absolute text-muted-foreground duration-300 transform -translate-y-3 scale-75 top-4 left-3 z-10 origin-[0] peer-focus:text-primary peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3">Data ważności (MM/RR)</Label></div>
                                    <div className="relative"><Input id="cardCVC" placeholder=" " required className="peer"/><Label htmlFor="cardCVC" className="absolute text-muted-foreground duration-300 transform -translate-y-3 scale-75 top-4 left-3 z-10 origin-[0] peer-focus:text-primary peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3">Kod CVC</Label></div>
                                </div>
                                <div className="!mt-8 border-t border-border pt-6 space-y-2">
                                    <div className="flex justify-between text-sm"><p>Transakcja #1 (Najem)</p><p className="font-medium">{summary.totalPrice.toLocaleString('pl-PL')} zł</p></div>
                                    <div className="flex justify-between text-sm"><p>Transakcja #2 (Kaucja)</p><p className="font-medium">{summary.deposit.toLocaleString('pl-PL')} zł</p></div>
                                    <div className="flex justify-between font-bold text-lg pt-2"><p>Łącznie dziś</p><p>{summary.totalWithDeposit.toLocaleString('pl-PL')} zł</p></div>
                                </div>
                                <div className="!mt-8 flex flex-col sm:flex-row-reverse gap-3">
                                    <Button type="submit" size="lg" className="w-full">Zapłać i rezerwuj</Button>
                                    <Button onClick={() => setStep('details')} variant="secondary" className="w-full">Wróć</Button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default RentalPage;