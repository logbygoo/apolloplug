import type { HeroCar } from '../types';

export const HERO_CARS: HeroCar[] = [
  {
    id: 'tesla-3',
    name: 'A co gdyby',
    imageUrl: 'https://digitalassets.tesla.com/tesla-contents/image/upload/h_1800,w_2880,c_fit,f_auto,q_auto:best/Model-3-Main-Hero-Desktop-LHD',
    subtitle: 'Ładować się poniżej 0,9 PLN/kWh?',
    primaryBtnText: 'Projekt Napędzany Słońcem',
    primaryBtnLink: '/wynajem',
    secondaryBtnText: 'Jazda Próbna',
    secondaryBtnLink: '/kontakt',
  },
  {
    id: 'tesla-y',
    name: 'Model Y',
    imageUrl: 'https://tesla-cdn.thron.com/delivery/public/image/tesla/8e2df1b9-a4bf-4eb9-beec-2cf5cc77fca0/bvlatuR/std/2880x2400/Desktop-ModelY?20230329',
    subtitle: 'Wynajem od 350 zł/dzień',
    primaryBtnText: 'Wynajmij teraz',
    primaryBtnLink: '/wynajem',
    secondaryBtnText: 'Zobacz flotę',
    secondaryBtnLink: '/flota',
  },
  {
    id: 'tesla-x',
    name: 'Model X',
    imageUrl: 'https://tesla-cdn.thron.com/delivery/public/image/tesla/ddc135ed-1638-4ba5-b52a-9584358824f7/bvlatuR/std/4096x2304/Model-X-Main-Hero-Desktop-LHD-Animation-Glob',
    subtitle: 'Najwyższy poziom luksusu i technologii',
    primaryBtnText: 'Wynajmij teraz',
    primaryBtnLink: '/wynajem',
    secondaryBtnText: 'Zobacz flotę',
    secondaryBtnLink: '/flota',
  }
];
