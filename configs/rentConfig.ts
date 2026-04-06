
import type { Car } from '../types';

export const RENTAL_CARS: Car[] = [
  {
    id: 'tesla-3-highland',
    name: 'Model 3 Highland',
    imageUrl: [
      'https://img.apolloidea.com/img/tesla-3-375x250.png',
    ],
    // Zdjęcia wyświetlane w Sliderze na stronie /wypozycz/tesla-3-highland
    landingPageImages: [
        'https://img.apolloidea.com/tesla-3/main-cards-tesla-3.jpg',
        'https://digitalassets.tesla.com/tesla-contents/image/upload/h_1800,w_2880,c_fit,f_auto,q_auto:best/Model-3-Performance-Hero-Desktop-LHD',
        'https://digitalassets.tesla.com/tesla-contents/image/upload/f_auto,q_auto:best/Model-3-Interior-Desktop-LHD'
    ],
    pricePerDay: 790,
    available: true,
    deposit: 3000,
    costPerKmOverLimit: 3,
    priceTiers: [
        { days: '1 dzień', pricePerDay: 790, kmLimitPerDay: 250 },
        { days: '2-3 dni', pricePerDay: 590, kmLimitPerDay: 200 },
        { days: '4-7 dni', pricePerDay: 490, kmLimitPerDay: 150 },
        { days: '8-30 dni', pricePerDay: 420, kmLimitPerDay: 110 },
        { days: '31+ dni', pricePerDay: 330, kmLimitPerDay: 90 },
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
    id: 'tesla-y-juniper',
    name: 'Model Y Juniper',
    imageUrl: [
      'https://img.apolloidea.com/img/tesla-y-375x250.png',
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
      'https://img.apolloidea.com/img/tesla-x-low-600x400.jpg',
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
      'https://img.apolloidea.com/img/tesla-cybertruck-low-600x400.jpg',
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
    { id: 'tires', name: 'Ubezpieczenie opon', price: { 'tesla-3-highland': 9, 'tesla-y-juniper': 12, 'tesla-x': 15, 'tesla-cybertruck': 19 }, type: 'per_day', description: 'Pokrycie kosztów uszkodzenia opon.' },
    { id: 'deductible', name: 'Zmniejszony udział własny w szkodzie', price: { 'tesla-3-highland': 99, 'tesla-y-juniper': 129, 'tesla-x': 149, 'tesla-cybertruck': 199 }, type: 'per_day', description: 'Obniżenie odpowiedzialności finansowej.' },
    { id: 'childSeat', name: 'Fotelik dziecięcy', price: 99, type: 'one_time', description: 'Bezpieczeństwo dla najmłodszych pasażerów.' },
    { id: 'delivery', name: 'Dostawa pod dom', price: 190, type: 'one_time', description: 'Wygodna dostawa pojazdu pod wskazany adres.' },
    { id: 'emptyBattery', name: 'Możliwość zwrotu pustej baterii', price: { 'tesla-3-highland': 290, 'tesla-y-juniper': 320, 'tesla-x': 350, 'tesla-cybertruck': 390 }, type: 'one_time', description: 'Zwróć auto bez konieczności ładowania.' },
] as const;

/** Dostępne sloty godzin (cała doba, co 30 min). Godziny pracy biura i dopłata poza nimi: `workConfig.ts`. */
export const RENTAL_TIME_OPTIONS: string[] = Array.from({ length: 48 }, (_, i) => {
  const h = Math.floor(i / 2);
  const m = i % 2 === 0 ? '00' : '30';
  return `${String(h).padStart(2, '0')}:${m}`;
});

/** Wspólna klasa dla `<select>` okresu najmu (wąska kolumna, bez poziomego rozpychania strony). */
export const RENTAL_PERIOD_SELECT_CLASSNAME =
  'block h-12 w-full min-w-0 max-w-full appearance-none rounded-md border border-border bg-secondary px-3 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2';

/**
 * Okres najmu: tylko data + godzina obok (65/35 od 350px); miejsce w osobnym wierszu pod spodem.
 * Grid z minmax(0,…) zapobiega poziomemu rozpychaniu strony.
 */
export const RENTAL_PERIOD_DATETIME_GRID =
  'grid w-full min-w-0 max-w-full grid-cols-1 gap-4 min-[350px]:grid-cols-[minmax(0,65fr)_minmax(0,35fr)] min-[350px]:items-end';
export const RENTAL_PERIOD_FIELD_CELL = 'min-w-0 max-w-full';
export const RENTAL_PERIOD_LOCATION_ROW = 'min-w-0 w-full max-w-full';
