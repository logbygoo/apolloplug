import React, { useState, useMemo } from 'react';
import { Button, Input } from '../components/ui';
import { CAR_FLEET } from '../constants';
import type { Car } from '../types';

const RentalPage: React.FC = () => {
  const [selectedCar, setSelectedCar] = useState<Car | null>(CAR_FLEET[0]);
  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const totalPrice = useMemo(() => {
    if (!selectedCar || !startDate || !endDate) return 0;
    const start = new Date(startDate);
    const end = new Date(endDate);
    if (start >= end) return 0;
    const diffTime = Math.abs(end.getTime() - start.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays * selectedCar.pricePerDay;
  }, [selectedCar, startDate, endDate]);
  
  const today = new Date().toISOString().split('T')[0];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (totalPrice > 0 && name && email && phone) {
      setSubmitted(true);
    } else {
      alert("Proszę wypełnić wszystkie pola i wybrać prawidłowy okres najmu.");
    }
  };

  if (submitted) {
    return (
      <div className="container mx-auto max-w-3xl px-4 md:px-6 py-32 text-center flex flex-col items-center justify-center min-h-screen">
        <h1 className="text-3xl font-bold tracking-tight">Dziękujemy za rezerwację!</h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Skontaktujemy się z Tobą wkrótce, aby potwierdzić szczegóły wynajmu.
        </p>
        <Button onClick={() => setSubmitted(false)} className="mt-6 uppercase tracking-wider font-medium">
          Złóż nową rezerwację
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto max-w-7xl px-4 md:px-6 py-24 md:py-32">
      <div className="grid lg:grid-cols-2 gap-16 items-start">
        {/* --- Left Column: Car Image --- */}
        <div className="lg:sticky top-24">
          {selectedCar && (
            <img src={selectedCar.imageUrl} alt={selectedCar.name} className="rounded-lg object-cover w-full aspect-[4/3] bg-secondary/40" />
          )}
        </div>

        {/* --- Right Column: Form --- */}
        <div className="flex flex-col">
          <h1 className="text-4xl font-bold tracking-tight">{selectedCar?.name}</h1>
          <p className="mt-2 text-xl text-muted-foreground">{selectedCar?.pricePerDay?.toLocaleString('pl-PL')} zł / dzień</p>
          <p className="mt-4 text-sm text-muted-foreground">{selectedCar?.description}</p>
          
          <div className="mt-8">
            <h3 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-3">Model</h3>
            <div className="grid grid-cols-3 gap-2">
              {CAR_FLEET.map((car) => (
                <button
                  key={car.id}
                  onClick={() => setSelectedCar(car)}
                  className={`rounded-md border p-3 text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background
                    ${selectedCar?.id === car.id 
                      ? 'border-primary bg-primary/10 text-primary' 
                      : 'border-border/50 hover:border-border'
                    }`}
                >
                  {car.name.replace('Tesla ', '')}
                </button>
              ))}
            </div>
          </div>
          
          <div className="mt-8">
            <h3 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-3">Okres najmu</h3>
            <div className="grid sm:grid-cols-2 gap-4">
              <Input aria-label="Data odbioru" type="date" value={startDate} min={today} onChange={(e) => setStartDate(e.target.value)} />
              <Input aria-label="Data zwrotu" type="date" value={endDate} min={startDate || today} onChange={(e) => setEndDate(e.target.value)} />
            </div>
          </div>
          
          <form onSubmit={handleSubmit} className="mt-8 flex flex-col flex-grow">
            <div className="space-y-4">
              <h3 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-3">Dane kontaktowe</h3>
              <Input id="name" type="text" placeholder="Imię i nazwisko" value={name} onChange={e => setName(e.target.value)} required />
              <Input id="email" type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required />
              <Input id="phone" type="tel" placeholder="Telefon" value={phone} onChange={e => setPhone(e.target.value)} required />
            </div>

            <div className="border-t border-border/50 pt-6 mt-8 space-y-6">
                <div className="flex justify-between items-center font-semibold text-lg">
                    <span>Szacowana cena wynajmu</span>
                    <span>{totalPrice.toLocaleString('pl-PL')} zł</span>
                </div>
                <Button type="submit" className="w-full uppercase tracking-wider font-medium" size="lg" disabled={totalPrice <= 0}>
                  Wyślij formularz rezerwacji
                </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RentalPage;