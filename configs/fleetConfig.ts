import type { Car } from '../types';

export const CAR_FLEET: Car[] = [
  {
    id: 'tesla-3-highland',
    name: 'Tesla Model 3',
    description: 'Najnowsza odsłona bestsellera. Cichsza kabina, lepsze zawieszenie i jeszcze większy zasięg. Idealny sedan do miasta i w trasę.',
    imageUrl: [
      'https://digitalassets.tesla.com/tesla-contents/image/upload/f_auto,q_auto/Model-3-Main-Hero-Desktop-LHD.jpg',
    ],
    pricePerDay: 790,
    costPerKmOverLimit: 3,
    specs: {
      range: '629 km',
      seating: '5 osób',
      acceleration: '4.4s do 100 km/h',
    },
  },
  {
    id: 'tesla-y-juniper',
    name: 'Tesla Model Y',
    description: 'Najpopularniejszy elektryczny SUV na świecie w nowej wersji Juniper. Przestronne wnętrze, ogromny bagażnik i wszechstronność.',
    imageUrl: [
      'https://digitalassets.tesla.com/tesla-contents/image/upload/h_1800,w_2880,c_fit,f_auto,q_auto:best/Homepage-Model-Y-Hero-Desktop',
    ],
    pricePerDay: 890,
    costPerKmOverLimit: 3.5,
    specs: {
      range: '600 km',
      seating: '5 osób',
      acceleration: '4.8s do 100 km/h',
    },
  },
  {
    id: 'tesla-x',
    name: 'Tesla Model X',
    description: 'Bezkompromisowy luksus. Drzwi Falcon Wing, panoramiczna szyba i osiągi samochodu sportowego w nadwoziu dużego SUV-a.',
    imageUrl: [
      'https://digitalassets.tesla.com/tesla-contents/image/upload/h_1800,w_2880,c_fit,f_auto,q_auto:best/Model-X-Main-Hero-Desktop-LHD',
    ],
    pricePerDay: 1490,
    costPerKmOverLimit: 5,
    specs: {
      range: '576 km',
      seating: '6/7 osób',
      acceleration: '2.6s do 100 km/h',
    },
  },
  {
    id: 'tesla-s',
    name: 'Tesla Model S',
    description: 'Ikona elektromobilności w wersji Plaid. Niesamowite przyspieszenie, wolant zamiast kierownicy i komfort limuzyny.',
    imageUrl: [
      'https://digitalassets.tesla.com/tesla-contents/image/upload/h_1800,w_2880,c_fit,f_auto,q_auto:best/Model-S-Main-Hero-Desktop-LHD',
    ],
    pricePerDay: 1290,
    costPerKmOverLimit: 4,
    specs: {
      range: '634 km',
      seating: '5 osób',
      acceleration: '2.1s do 100 km/h',
    },
  },
  {
    id: 'tesla-cybertruck',
    name: 'Tesla Cybertruck',
    description: 'Pojazd nie z tej ziemi. Kuloodporna stal, futurystyczny design i możliwości terenowe, które zawstydzają konkurencję.',
    imageUrl: [
      'https://img.apolloplug.com/img/tesla-cybertruck-low-600x400.jpg',
    ],
    pricePerDay: 2990,
    costPerKmOverLimit: 10,
    specs: {
      range: '547 km',
      seating: '5 osób',
      acceleration: '2.7s do 100 km/h',
    },
  },
];