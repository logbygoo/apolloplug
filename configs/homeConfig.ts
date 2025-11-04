import type { HeroCar } from '../types';

export const HERO_CARS: HeroCar[] = [
  {
    id: '1',
    name: 'A co gdyby',
    imageUrl: 'https://img.apolloplug.com/cybertruck/tesla-cybertruck-01.jpg',
    subtitle: 'Ładować się poniżej 0,9 PLN/kWh?',
    primaryBtnText: 'Projekt Napędzany Słońcem',
    primaryBtnLink: '/wynajem',
    secondaryBtnText: 'Jazda Próbna',
    secondaryBtnLink: '/kontakt',
    theme: 'dark',
  },
  {
    id: '2',
    name: 'Wypożyczaj',
    imageUrl: 'https://img.apolloplug.com/tesla-y/tesla-y-02.jpg',
    subtitle: 'Wynajem od 350 zł/dzień',
    primaryBtnText: 'Wynajmij teraz',
    primaryBtnLink: '/wynajem',
    secondaryBtnText: 'Zobacz flotę',
    secondaryBtnLink: '/flota',
    theme: 'light',
  },
  {
    id: '3',
    name: 'Podróżuj wygodnie',
    imageUrl: 'https://img.apolloplug.com/tesla-y/tesla-y-01.jpg',
    subtitle: 'Z profesjonalnym kierowcą',
    primaryBtnText: 'Zamów przejazd',
    primaryBtnLink: '/wynajem',
    secondaryBtnText: 'Zobacz flotę',
    secondaryBtnLink: '/flota',
    theme: 'light',
  }
];