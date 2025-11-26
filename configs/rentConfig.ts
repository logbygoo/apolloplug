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
    costPerKmOverLimit: 3,
    priceTiers: [
        { days: '1 dzień', pricePerDay: 790, kmLimitPerDay: 250 },
        { days: '2-3 dni', pricePerDay: 640, kmLimitPerDay: 200 },
        { days: '4-7 dni', pricePerDay: 560, kmLimitPerDay: 150 },
        { days: '8-30 dni', pricePerDay: 460, kmLimitPerDay: 110 },
        { days: '31+ dni', pricePerDay: 390, kmLimitPerDay: 90 },
    ],
    specs: {
      version: 'Longrange',
      range: '660 km',
      seating: '5 osób',
      acceleration: '4.4s',
      color: 'Biel',
      interiorColor: 'Biel',
      drive: '4x4',
    },
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
    costPerKmOverLimit: 3.5,
    priceTiers: [
        { days: '1 dzień', pricePerDay: 890, kmLimitPerDay: 250 },
        { days: '2-3 dni', pricePerDay: 740, kmLimitPerDay: 220 },
        { days: '4-7 dni', pricePerDay: 660, kmLimitPerDay: 200 },
        { days: '8-30 dni', pricePerDay: 490, kmLimitPerDay: 180 },
        { days: '31+ dni', pricePerDay: 430, kmLimitPerDay: 150 },
    ],
    specs: {
      version: 'Longrange',
      range: '600 km',
      seating: '5 osób',
      acceleration: '4.8s',
      color: 'Biel',
      interiorColor: 'Biel',
      drive: '4x4',
    },
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
    costPerKmOverLimit: 4,
    priceTiers: [
        { days: '1-3 dni', pricePerDay: 450, kmLimitPerDay: 200 },
        { days: '4-7 dni', pricePerDay: 420, kmLimitPerDay: 180 },
        { days: '8-14 dni', pricePerDay: 400, kmLimitPerDay: 160 },
        { days: '15+ dni', pricePerDay: 380, kmLimitPerDay: 150 },
    ],
    specs: {
      version: 'Longrange',
      range: '576 km',
      seating: '7 osób',
      acceleration: '2.6s',
      color: 'Pearl White',
      interiorColor: 'Białe',
      drive: '4x4',
    },
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
    costPerKmOverLimit: 5,
    priceTiers: [
        { days: '1-3 dni', pricePerDay: 600, kmLimitPerDay: 200 },
        { days: '4-7 dni', pricePerDay: 550, kmLimitPerDay: 180 },
        { days: '8-14 dni', pricePerDay: 520, kmLimitPerDay: 160 },
        { days: '15+ dni', pricePerDay: 500, kmLimitPerDay: 150 },
    ],
    specs: {
      version: 'Longrange',
      range: '547 km',
      seating: '6 osób',
      acceleration: '2.7s',
      color: 'Stal nierdzewna',
      interiorColor: 'Czarne',
      drive: '4x4',
    },
  }
];

export const ADDITIONAL_OPTIONS = [
    { id: 'insurance', name: 'Ubezpieczenie OC AC NNW', price: 0, type: 'one_time', description: 'Zabezpiecza kierowcę przed kosztami szkód spowodowanymi przez innych uczestników ruchu.' },
    { id: 'tires', name: 'Ubezpieczenie opon', price: { 'tesla-3-highland': 9, 'tesla-y-jupiter': 12, 'tesla-x': 15, 'tesla-cybertruck': 19 }, type: 'per_day', description: 'Pokrycie kosztów uszkodzenia opon.' },
    { id: 'deductible', name: 'Zmniejszony udział własny w szkodzie', price: { 'tesla-3-highland': 99, 'tesla-y-jupiter': 129, 'tesla-x': 149, 'tesla-cybertruck': 199 }, type: 'per_day', description: 'Obniżenie odpowiedzialności finansowej.' },
    { id: 'childSeat', name: 'Fotelik dziecięcy', price: 99, type: 'one_time', description: 'Bezpieczeństwo dla najmłodszych pasażerów.' },
    { id: 'delivery', name: 'Dostawa pod dom', price: 190, type: 'one_time', description: 'Wygodna dostawa pojazdu pod wskazany adres.' },
    { id: 'emptyBattery', name: 'Możliwość zwrotu pustej baterii', price: { 'tesla-3-highland': 290, 'tesla-y-jupiter': 320, 'tesla-x': 350, 'tesla-cybertruck': 390 }, type: 'one_time', description: 'Zwróć auto bez konieczności ładowania.' },
] as const;