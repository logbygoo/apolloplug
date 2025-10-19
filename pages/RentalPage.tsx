import React, { useState, useMemo, useEffect } from 'react';
import { Button, Input, Label } from '../components/ui';
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
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) || 1;
    return diffDays * selectedCar.pricePerDay;
  }, [selectedCar, startDate, endDate]);
  
  const today = new Date().toISOString().split('T')[0];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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
      <div className="container mx-auto max-w-3xl px-4 md:px-6 py-32 text-center flex flex-col items-center justify-center min-h-[calc(100vh-112px)]">
        <h1 className="text-4xl font-bold tracking-tight">Dziękujemy za rezerwację!</h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Skontaktujemy się z Tobą wkrótce, aby potwierdzić szczegóły wynajmu {selectedCar?.name}.
        </p>
        <Button onClick={() => setSubmitted(false)} className="mt-8" variant="primary">
          Złóż nową rezerwację
        </Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="sticky top-20 py-8">
              <img 
                src={selectedCar?.imageUrl[0]} 
                alt={selectedCar?.name} 
                className="rounded-lg object-cover w-full h-auto max-h-[80vh]"
              />
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="py-8">
              <h1 className="text-4xl font-bold tracking-tight">Wynajem</h1>
              <p className="mt-2 text-muted-foreground">Doświadcz przyszłości motoryzacji już dziś.</p>
              
              <div className="mt-8">
                <h2 className="text-lg font-semibold uppercase tracking-wider text-muted-foreground">Wybierz model</h2>
                <div className="mt-4 grid grid-cols-3 gap-2">
                  {CAR_FLEET.map((car) => (
                    <button
                      key={car.id}
                      onClick={() => setSelectedCar(car)}
                      className={`rounded-md p-2 text-center transition-all border-2 ${
                        selectedCar?.id === car.id ? 'border-primary' : 'border-zinc-300 hover:border-zinc-400'
                      }`}
                    >
                      <span className="block text-sm font-semibold">{car.name.replace('Tesla ', '')}</span>
                      <span className="block text-xs text-muted-foreground">{car.pricePerDay} zł/d</span>
                    </button>
                  ))}
                </div>
              </div>
              
              <div className="mt-8">
                <h2 className="text-lg font-semibold uppercase tracking-wider text-muted-foreground">Okres najmu</h2>
                 <div className="grid sm:grid-cols-2 gap-4 mt-4">
                  <div>
                    <Label htmlFor="start-date" className="text-xs">Data odbioru</Label>
                    <Input id="start-date" type="date" value={startDate} min={today} onChange={(e) => setStartDate(e.target.value)} />
                  </div>
                  <div>
                    <Label htmlFor="end-date" className="text-xs">Data zwrotu</Label>
                    <Input id="end-date" type="date" value={endDate} min={startDate || today} onChange={(e) => setEndDate(e.target.value)} />
                  </div>
                </div>
              </div>
              
              <div className="mt-8">
                 <h2 className="text-lg font-semibold uppercase tracking-wider text-muted-foreground">Dane kontaktowe</h2>
                 <form onSubmit={handleSubmit} className="mt-4 space-y-4">
                  <div>
                    <Label htmlFor="name" className="text-xs">Imię i nazwisko</Label>
                    <Input id="name" type="text" placeholder="Jan Kowalski" value={name} onChange={e => setName(e.target.value)} required />
                  </div>
                  <div>
                    <Label htmlFor="email" className="text-xs">Email</Label>
                    <Input id="email" type="email" placeholder="jan.kowalski@example.com" value={email} onChange={e => setEmail(e.target.value)} required />
                  </div>
                  <div>
                    <Label htmlFor="phone" className="text-xs">Telefon</Label>
                    <Input id="phone" type="tel" placeholder="123 456 789" value={phone} onChange={e => setPhone(e.target.value)} required />
                  </div>
                </form>
              </div>

              <div className="border-t border-border my-8" />
              
              <div className="space-y-2 text-sm">
                 <div className="flex justify-between">
                    <span className="text-muted-foreground">Model</span>
                    <span>{selectedCar?.name}</span>
                 </div>
                 <div className="flex justify-between">
                    <span className="text-muted-foreground">Koszt wynajmu</span>
                    <span>{totalPrice > 0 ? `${totalPrice} zł` : '...'}</span>
                 </div>
                 <div className="flex justify-between font-bold text-lg pt-2">
                    <span>Szacowana cena</span>
                    <span>{totalPrice > 0 ? `${totalPrice} zł` : '...'}</span>
                 </div>
              </div>

              <Button onClick={handleSubmit} type="submit" className="w-full mt-8" size="lg" disabled={totalPrice <= 0 || !name || !email || !phone}>
                Wyślij formularz rezerwacji
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RentalPage;