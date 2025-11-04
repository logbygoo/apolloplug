import type { Car } from '../types';

export const CAR_FLEET: Car[] = [
  {
    id: 'tesla-3',
    name: 'Model 3',
    description: 'Dynamiczny i wydajny sedan elektryczny, idealny do jazdy po mieście i na dłuższe trasy.',
    imageUrl: [
      'https://tesla-cdn.thron.com/delivery/public/image/tesla/a269d7a2-1168-4a1a-95a6-9736b234e761/bvlatuR/std/4096x2304/Model-3-Main-Hero-Desktop-LHD-Animation-Glob',
      'https://digitalassets.tesla.com/tesla-contents/image/upload/h_1800,w_2880,c_fit,f_auto,q_auto:best/Model-3-Main-Hero-Desktop-LHD'
    ],
    pricePerDay: 300,
    // FIX: Added missing 'costPerKmOverLimit' property to conform to the 'Car' type.
    costPerKmOverLimit: 3,
    specs: {
      range: '629 km',
      seating: '5 osób',
      acceleration: '3.3s 0-100 km/h',
    },
  },
  {
    id: 'tesla-y',
    name: 'Model Y',
    description: 'Wszechstronny SUV z dużą przestrzenią bagażową, oferujący bezpieczeństwo i komfort dla całej rodziny.',
    imageUrl: [
      'https://digitalassets.tesla.com/tesla-contents/image/upload/h_1800,w_2880,c_fit,f_auto,q_auto:best/Homepage-Model-Y-Hero-Desktop',
      'https://tesla-cdn.thron.com/delivery/public/image/tesla/8e2df1b9-a4bf-4eb9-beec-2cf5cc77fca0/bvlatuR/std/2880x2400/Desktop-ModelY?20230329'
    ],
    pricePerDay: 350,
    // FIX: Added missing 'costPerKmOverLimit' property to conform to the 'Car' type.
    costPerKmOverLimit: 3.5,
    specs: {
      range: '533 km',
      seating: '5 osób',
      acceleration: '3.7s 0-100 km/h',
    },
  },
  {
    id: 'tesla-x',
    name: 'Model X',
    description: 'Luksusowy i futurystyczny SUV z drzwiami Falcon Wing, zapewniający najwyższy poziom osiągów i technologii.',
    imageUrl: [
      'https://digitalassets.tesla.com/tesla-contents/image/upload/h_1800,w_2880,c_fit,f_auto,q_auto:best/Model-X-Main-Hero-Desktop-LHD',
       'https://tesla-cdn.thron.com/delivery/public/image/tesla/ddc135ed-1638-4ba5-b52a-9584358824f7/bvlatuR/std/4096x2304/Model-X-Main-Hero-Desktop-LHD-Animation-Glob'
    ],
    pricePerDay: 450,
    // FIX: Added missing 'costPerKmOverLimit' property to conform to the 'Car' type.
    costPerKmOverLimit: 4,
    specs: {
      range: '576 km',
      seating: '7 osób',
      acceleration: '2.6s 0-100 km/h',
    },
  },
];