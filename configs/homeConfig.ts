import type { HeroCar } from '../types';

export const SEO_TITLE_BRAND = 'Apollo Idea';

export function buildSeoTitle(baseTitle: string): string {
  return `${baseTitle} • ${SEO_TITLE_BRAND}`;
}

export const HERO_CARS: HeroCar[] = [
  {
    id: '1',
    name: 'Wypożyczalnia Aut Elektrycznych',
    imageUrl: 'https://img.apolloidea.com/img/hero/01.jpg',
    subtitle: 'Sprawdź ofertę warszawskiej wypożyczalni aut elektrycznych i rezerwuj na doby lub dłużej.',
    secondaryBtnText: 'Zarezerwuj auto',
    secondaryBtnLink: '/wypozyczalnia',
    theme: 'dark',
  },
  /*/{
    id: '2',
    name: 'A co gdyby',
    imageUrl: 'https://img.apolloidea.com/cybertruck/tesla-cybertruck-01.jpg',
    subtitle: 'Ładować się poniżej 0,9 PLN/kWh?',
    secondaryBtnText: 'Projekt Napędzany Słońcem',
    secondaryBtnLink: '/ev-projekt',
    theme: 'dark',
  },/*/
  {
    id: '1',
    name: '1 Doba GRATIS naszą Teslą',
    imageUrl: 'https://img.apolloidea.com/img/hero/01.jpg',
    subtitle: 'Zamów swoją Teslę z naszego linku i odbierz 1 dobę wynajmu gratis od Apollo.',
    primaryBtnText: 'Zamów przejazd',
    primaryBtnLink: '/transfery',
    secondaryBtnText: 'Zobacz flotę',
    secondaryBtnLink: '/flota',
    theme: 'dark',
  },
  {
    id: '2',
    name: 'Wypożyczaj',
    imageUrl: 'https://img.apolloidea.com/tesla-y/tesla-y-02.jpg',
    subtitle: 'Wynajem od 390 zł/dzień',
    primaryBtnText: 'Wynajmij teraz',
    primaryBtnLink: '/wypozyczalnia',
    secondaryBtnText: 'Zobacz flotę',
    secondaryBtnLink: '/flota',
    theme: 'dark',
  },
  {
    id: '3',
    name: 'Podróżuj wygodnie',
    imageUrl: 'https://img.apolloidea.com/tesla-y/tesla-y-01.jpg',
    subtitle: 'Z profesjonalnym kierowcą',
    primaryBtnText: 'Zamów przejazd',
    primaryBtnLink: '/transfery',
    secondaryBtnText: 'Zobacz flotę',
    secondaryBtnLink: '/flota',
    theme: 'dark',
  }
];