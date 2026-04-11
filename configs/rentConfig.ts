
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
        'https://img.apolloidea.com/tesla-3/1.jpg',
        'https://img.apolloidea.com/tesla-3/2.jpg',
        'https://img.apolloidea.com/tesla-3/3.jpg',
        'https://img.apolloidea.com/tesla-3/4.jpg',
        'https://img.apolloidea.com/tesla-3/5.jpg',
        'https://img.apolloidea.com/tesla-3/6.jpg',
        'https://img.apolloidea.com/tesla-3/7.jpg',
        'https://img.apolloidea.com/tesla-3/8.jpg',
        'https://img.apolloidea.com/tesla-3/9.jpg',
        'https://img.apolloidea.com/tesla-3/10.jpg',
        'https://img.apolloidea.com/tesla-3/11.jpg',
        'https://img.apolloidea.com/tesla-3/12.jpg',
        'https://img.apolloidea.com/tesla-3/13.jpg',
        'https://img.apolloidea.com/tesla-3/14.jpg',
        'https://img.apolloidea.com/tesla-3/15.jpg',
        'https://img.apolloidea.com/tesla-3/16.jpg',
        'https://img.apolloidea.com/tesla-3/17.jpg',
        'https://img.apolloidea.com/tesla-3/18.jpg',
        'https://img.apolloidea.com/tesla-3/19.jpg',
        'https://img.apolloidea.com/tesla-3/20.jpg',
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
    { id: 'deductible', name: 'Zmniejszony udział własny w szkodzie', price: { 'tesla-3-highland': 99, 'tesla-y-juniper': 129, 'tesla-x': 149, 'tesla-cybertruck': 199 }, type: 'per_day', description: 'Udział w szkodzie zmniejszony do wysokości kaucji.' },
    { id: 'tires', name: 'Ubezpieczenie opon', price: { 'tesla-3-highland': 9, 'tesla-y-juniper': 12, 'tesla-x': 15, 'tesla-cybertruck': 19 }, type: 'per_day', description: 'Pokrycie kosztów uszkodzenia opon.' },
    { id: 'childSeat', name: 'Fotelik dziecięcy', price: 99, type: 'one_time', description: 'Bezpieczeństwo dla najmłodszych pasażerów.' },
    { id: 'delivery', name: 'Dostawa pod dom', price: 190, type: 'one_time', description: 'Dostawa pojazdu pod wskazany adres na terenie Warszawy.' },
    { id: 'emptyBattery', name: 'Możliwość zwrotu pustej baterii', price: { 'tesla-3-highland': 290, 'tesla-y-juniper': 320, 'tesla-x': 350, 'tesla-cybertruck': 390 }, type: 'one_time', description: 'Zwróć auto bez konieczności ładowania.' },
    { id: 'wash', name: 'Pakiet myjnia', price: { 'tesla-3-highland': 99, 'tesla-y-juniper': 99, 'tesla-x': 119, 'tesla-cybertruck': 190 }, type: 'one_time', description: 'Moliwość zwrotu brudnego auta.' },
] as const;

/** Dostępne sloty godzin (cała doba, co 30 min). Godziny pracy biura i dopłata poza nimi: `workConfig.ts`. */
export const RENTAL_TIME_OPTIONS: string[] = Array.from({ length: 48 }, (_, i) => {
  const h = Math.floor(i / 2);
  const m = i % 2 === 0 ? '00' : '30';
  return `${String(h).padStart(2, '0')}:${m}`;
});

/** Wspólna klasa dla `<select>` okresu najmu (wąska kolumna, bez poziomego rozpychania strony). */
export const RENTAL_PERIOD_SELECT_CLASSNAME =
  'block h-12 min-h-[48px] w-full min-w-0 max-w-full appearance-none rounded-md border border-border bg-secondary px-3 py-0 text-left text-sm leading-none ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2';

/** Ta sama wysokość co `<select>`; `text-left` + style poniżej pod iOS/Safari. */
export const RENTAL_PERIOD_DATE_INPUT_CLASSNAME =
  '!flex !items-center box-border h-12 min-h-[48px] w-full min-w-0 max-w-full appearance-none rounded-md border border-border bg-secondary px-3 py-0 pr-10 text-left text-sm leading-normal ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2';

/** Grupa: data + godzina + miejsce (odbiór lub zwrot). */
export const RENTAL_PERIOD_GROUP_BOX = 'border-l-4 border-foreground pl-[10px] min-w-0 max-w-full';

/** Scope dla wyrównania daty do lewej i w pionie na telefonach (WebKit). */
export const RENTAL_PERIOD_FIELD_STYLES = `
  .rental-period input[type="date"] {
    text-align: left !important;
    display: flex !important;
    align-items: center;
    line-height: 1.25rem;
  }
  .rental-period input[type="date"]::-webkit-date-and-time-value {
    text-align: left;
  }
  .rental-period input[type="date"]::-webkit-datetime-edit,
  .rental-period input[type="date"]::-webkit-datetime-edit-fields-wrapper {
    text-align: left;
  }
  .rental-period input[type="date"]::-webkit-datetime-edit-fields-wrapper {
    display: flex;
    align-items: center;
    height: 100%;
    min-height: 100%;
    padding: 0;
    margin: 0;
    box-sizing: border-box;
  }
  .rental-period input[type="date"]::-webkit-datetime-edit {
    padding: 0;
    margin: 0;
    flex: 1 1 auto;
    min-width: 0;
  }
`;

/**
 * Okres najmu: tylko data + godzina obok (65/35 od 350px); miejsce w osobnym wierszu pod spodem.
 * Grid z minmax(0,…) zapobiega poziomemu rozpychaniu strony.
 */
export const RENTAL_PERIOD_DATETIME_GRID =
  'grid w-full min-w-0 max-w-full grid-cols-1 gap-4 min-[350px]:grid-cols-[minmax(0,65fr)_minmax(0,35fr)] min-[350px]:items-end';
export const RENTAL_PERIOD_FIELD_CELL = 'min-w-0 max-w-full';
export const RENTAL_PERIOD_LOCATION_ROW = 'min-w-0 w-full max-w-full';
