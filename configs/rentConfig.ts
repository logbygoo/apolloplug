import type { Car } from '../types';

export const RENTAL_CARS: Car[] = [
  {
    id: 'tesla-3-highland',
    name: 'Model 3 Highland',
    imageUrl: [
      'https://img.apolloplug.com/img/tesla-3-low-600x400.jpg',
    ],
    pricePerDay: 790,
    available: true,
    deposit: 3000,
    priceTiers: [
        { days: '1 dzień', pricePerDay: 790 },
        { days: '2-3 dni', pricePerDay: 640 },
        { days: '4-7 dni', pricePerDay: 560 },
        { days: '8-30 dni', pricePerDay: 440 },
        { days: '31+ dni', pricePerDay: 390 },
    ],
  },
  {
    id: 'tesla-y-jupiter',
    name: 'Model Y Jupiter',
    imageUrl: [
      'https://img.apolloplug.com/img/tesla-y-low-600x400.jpg',
    ],
    pricePerDay: 890,
    available: true,
    deposit: 3000,
    priceTiers: [
        { days: '1 dzień', pricePerDay: 890 },
        { days: '2-3 dni', pricePerDay: 740 },
        { days: '4-7 dni', pricePerDay: 660 },
        { days: '8-30 dni', pricePerDay: 490 },
        { days: '31+ dni', pricePerDay: 430 },
    ],
  },
  {
    id: 'tesla-x',
    name: 'Model X',
    imageUrl: [
      'https://img.apolloplug.com/img/tesla-x-low-600x400.jpg',
    ],
    pricePerDay: 450,
    available: false,
    deposit: 6000,
    priceTiers: [
        { days: '1-3 dni', pricePerDay: 450 },
        { days: '4-7 dni', pricePerDay: 420 },
        { days: '8-14 dni', pricePerDay: 400 },
        { days: '15+ dni', pricePerDay: 380 },
    ],
  },
  {
    id: 'tesla-cybertruck',
    name: 'Cybertruck',
    imageUrl: [
      'https://img.apolloplug.com/img/tesla-cybertruck-low-600x400.jpg',
    ],
    pricePerDay: 600,
    available: false,
    deposit: 8000,
    priceTiers: [
        { days: '1-3 dni', pricePerDay: 600 },
        { days: '4-7 dni', pricePerDay: 550 },
        { days: '8-14 dni', pricePerDay: 520 },
        { days: '15+ dni', pricePerDay: 500 },
    ],
  }
];

export const RENTAL_LOCATIONS = [
  "Warszawa, Lotnisko Chopina (WAW)",
  "Warszawa, Centrum",
];

export const ADDITIONAL_OPTIONS = [
    { id: 'insurance', name: 'Ubezpieczenie OC AC NNW', price: 0, type: 'one_time', description: 'Zabezpiecza kierowcę przed kosztami szkód spowodowanymi przez innych uczestników ruchu.' },
    { id: 'tires', name: 'Ubezpieczenie opon', price: { 'tesla-3-highland': 9, 'tesla-y-jupiter': 12, 'tesla-x': 15, 'tesla-cybertruck': 19 }, type: 'per_day', description: 'Pokrycie kosztów uszkodzenia opon.' },
    { id: 'deductible', name: 'Zmniejszony udział własny w szkodzie', price: { 'tesla-3-highland': 99, 'tesla-y-jupiter': 129, 'tesla-x': 149, 'tesla-cybertruck': 199 }, type: 'per_day', description: 'Obniżenie odpowiedzialności finansowej.' },
    { id: 'childSeat', name: 'Fotelik dziecięcy', price: 99, type: 'one_time', description: 'Bezpieczeństwo dla najmłodszych pasażerów.' },
    { id: 'delivery', name: 'Dostawa pod dom', price: 190, type: 'one_time', description: 'Wygodna dostawa pojazdu pod wskazany adres.' },
    { id: 'emptyBattery', name: 'Możliwość zwrotu pustej baterii', price: { 'tesla-3-highland': 290, 'tesla-y-jupiter': 320, 'tesla-x': 350, 'tesla-cybertruck': 390 }, type: 'one_time', description: 'Zwróć auto bez konieczności ładowania.' },
] as const;