import type { SeoData } from '../types';

/**
 * Wpis = klucz logiczny (zwykle jak ścieżka) → treść do `<Seo />`.
 * Rezerwacja z `:carId`: placeholdery `{carName}` i `{carBrand}` (z `constants.BRANDS`, fallback marka Tesla).
 * Przekierowania bez własnej treści: `/wypozyczalnia/:carId` → `/rezerwacja/...`, `/flota/:carId` → `/flota`.
 * Artykuły bloga: `BlogArticlePage` nadpisuje `'/blog/:articleSlug'`.
 * Strona tylko techniczna / poza tym plikiem: `UnderConstructionPage` (gdy strona „OFF”).
 */
/** Marka w sufiksie `<title>` (np. `… • Apollo Idea`). */
export const SEO_TITLE_BRAND = 'Apollo Idea';

export function buildSeoTitle(baseTitle: string): string {
  return `${baseTitle} • ${SEO_TITLE_BRAND}`;
}

export const SEO_CONFIG: Record<string, SeoData> = {
  '/': {
    title: buildSeoTitle('Wypożyczalnia aut elektrycznych Warszawa'),
    description:
      'Wynajem Tesli w Warszawie, Finansowanie, Ubezpieczenia, Zakup • oferta aut elektrycznych na doby i dłuższy okres, transfery oraz wsparcie przy zakupie EV.',
    ogTitle: 'Apollo Idea • wynajem Tesli Warszawa',
    ogDescription:
      'Wypożyczalnia samochodów elektrycznych Warszawa, Finansowanie, Ubezpieczenia, Zakup • rezerwacja online, jasne zasady najmu i flota modeli Tesla.',
    ogImage: 'https://img.apolloidea.com/cybertruck/tesla-cybertruck-01.jpg',
    ogType: 'website',
  },
  '/flota': {
    title: buildSeoTitle('Flota aut elektrycznych'),
    description:
      'Sprawdź dostępne modele, porównaj zasięg i parametry, a potem wybierz auto elektryczne na wynajem w Warszawie.',
    ogImage: 'https://digitalassets.tesla.com/tesla-contents/image/upload/h_1800,w_2880,c_fit,f_auto,q_auto:best/Homepage-Model-Y-Hero-Desktop',
  },
  '/wypozycz/:carId': {
    title: buildSeoTitle('Wynajem {carName} Warszawa • Wypożyczalnia EV'),
    description:
      'Wynajem {carName} bez kierowcy w Warszawie. Sprawdź cenę za dobę, dostępność i zarezerwuj Teslę online na krótki lub dłuższy okres.',
    ogTitle: 'Wynajem {carName} Warszawa • Tesla na doby',
    ogDescription:
      'Zarezerwuj {carName} online i odbierz auto gotowe do drogi. Przejrzyste warunki najmu i wsparcie przy pierwszym kontakcie z Teslą.',
  },
  '/wypozyczalnia': {
    title: buildSeoTitle('Wypożyczalnia samochodów EV Warszawa • wynajem aut elektrycznych'),
    description:
      'Wypożyczalnia aut elektrycznych Warszawa, wynajem Tesli na dzień, weekend, tydzień lub miesiąc. Sprawdź modele i zarezerwuj online.',
    ogImage: 'https://img.apolloidea.com/img/tesla-3-low-600x400.jpg',
  },
  '/rezerwacja': {
    title: buildSeoTitle('Rezerwacja • wynajem auta elektrycznego'),
    description:
      'Wybierz model Tesla, ustaw terminy odbioru i zwrotu, opcje dodatkowe. Szybka rezerwacja online wynajmu auta elektrycznego w Warszawie.',
  },
  /** `/rezerwacja/:carId` — w `RentalV2Page` zastąp `{carName}` (np. Model 3 Highland) i `{carBrand}` (np. Tesla). */
  '/rezerwacja/:carId': {
    title: buildSeoTitle('Rezerwacja {carBrand} {carName} • Wynajem auta elektrycznego'),
    description:
      'Zarezerwuj {carBrand} {carName} wybierajac terminy, opcje dodatkowe i złóż rezerwację wynajmu w Warszawie. Jasne zasady i rezerwacja online.',
  },
  /** `/rezerwacja/:carId/zamowienie` — krok z formularzem kierowcy (flow `driver`). */
  '/rezerwacja/zamowienie': {
    title: buildSeoTitle('Rezerwacja {carBrand} {carName} • Formularz rezerwacji'),
    description:
      'Uzupełnij dane kierowcy, adres i kontakt, zaakceptuj zgody. Potwierdź rezerwację wynajmu {carName} ({carBrand}), następnie opłać rezerwację online.',
  },
  /** Ta sama ścieżka URL co zamówienie — krok płatności (flow `payment`). */
  '/rezerwacja/platnosc': {
    title: buildSeoTitle('Płatność za rezerwację • {carBrand} {carName}'),
    description:
      'Opłać rezerwację wynajmu {carBrand} {carName} bezpiecznie online. Po zaksięgowaniu płatności otrzymasz potwierdzenie rezerwacji {carName}.',
  },
  /** `/dash` — pulpit Tesli (poza głównym layoutem). */
  '/dash': {
    title: buildSeoTitle('Pulpit Apollo'),
    description: 'Wewnętrzny pulpit: telemetria w przeglądarce, mapa, czujniki i skrót do apolloidea.com.',
  },
  /** `/pdf/:slug.pdf` — drukowalny podgląd PDF (bez głównego menu). */
  '/pdf': {
    title: buildSeoTitle('Dokument PDF'),
    description: 'Podgląd dokumentu do wydruku lub zapisu.',
  },
  '/transfery': {
    title: buildSeoTitle('Auto z kierowcą • Warszawa'),
    description: 'Zamów auto z kierowcą w Warszawie na transfer lotniskowy, przewóz dokumentów lub na godziny.',
    ogImage: 'https://img.apolloidea.com/tesla-y/tesla-y-01.jpg',
  },
  '/zakup': {
    title: buildSeoTitle('Zakup auta EV • Wsparcie od A do Z'),
    description:
      'Pomagamy w zakupie auta elektrycznego, od konfiguracji i finansowania po ubezpieczenie i odbiór samochodu.',
    ogImage: 'https://img.apolloidea.com/og/default.jpg',
  },
  '/ubezpieczenia': {
    title: buildSeoTitle('Ubezpieczenia aut elektrycznych • OC i AC'),
    description:
      'Porównaj ubezpieczenie OC i AC dla samochodu elektrycznego i wybierz zakres ochrony dopasowany do sposobu użytkowania auta.',
    ogImage: 'https://img.apolloidea.com/og/default.jpg',
  },
  '/finansowanie': {
    title: buildSeoTitle('Finansowanie EV • leasing, najem i kredyt'),
    description:
      'Sprawdź finansowanie samochodów elektrycznych, leasing, najem długoterminowy i kredyt. Wybierz rozwiązanie dopasowane do budżetu.',
    ogImage: 'https://img.apolloidea.com/og/default.jpg',
  },
  '/kontakt': {
    title: buildSeoTitle('Kontakt'),
    description:
      'Skontaktuj się z nami w sprawie wynajmu Tesli, transferów VIP i usług EV. Odpowiadamy telefonicznie, mailowo i przez formularz.',
    ogImage: 'https://img.apolloidea.com/og/default.jpg',
  },
  '/blog': {
    title: buildSeoTitle('Blog elektromobilności • porady i aktualności EV'),
    description:
      'Przeczytaj artykuły o samochodach elektrycznych, ładowaniu, wynajmie Tesli i praktycznym użytkowaniu EV na co dzień.',
    ogImage: 'https://img.apolloidea.com/blog/wypozyczalnia-aut-elektrycznych-miniatura.jpg',
  },
  '/blog/:articleSlug': {
    title: buildSeoTitle('{articleTitle}'),
    description: '{articleExcerpt}',
    ogType: 'article',
  },
  '/wrap': {
    title: buildSeoTitle('Galeria wrap Tesla • wzory do Lakierni'),
    description:
      'Pobierz gotowe wzory wrap i naklejek do Lakierni w Tesli. Zobacz galerię i sprawdź, jak zainstalować pliki w samochodzie.',
    ogType: 'website',
    ogImage: 'https://img.apolloidea.com/img/wrap/wrap-cf-black-apolloidea.png',
  },
  '/dokumentacja': {
    title: buildSeoTitle('Dokumentacja • regulaminy i polityki'),
    description:
      'Sprawdź regulaminy, politykę prywatności i dokumenty dotyczące usług Apollo Idea, wynajmu oraz przetwarzania danych.',
    ogImage: 'https://img.apolloidea.com/og/default.jpg',
  },
  '/ig': {
    title: buildSeoTitle('Linki Instagram'),
    description:
      'Szybkie linki do oferty Apollo Idea, wypożyczalni aut elektrycznych i rezerwacji Tesli w Warszawie.',
    ogType: 'website',
    ogImage: 'https://img.apolloidea.com/og/default.jpg',
  },
  '/fb': {
    title: buildSeoTitle('Linki Facebook'),
    description:
      'Szybkie linki z Facebooka do oferty Apollo Idea, wypożyczalni EV, rezerwacji Tesli i kontaktu.',
    ogType: 'website',
    ogImage: 'https://img.apolloidea.com/og/default.jpg',
  },
  '/yt': {
    title: buildSeoTitle('Linki YouTube'),
    description:
      'Szybkie linki z YouTube do oferty Apollo Idea, wypożyczalni EV, rezerwacji Tesli i kontaktu.',
    ogType: 'website',
    ogImage: 'https://img.apolloidea.com/og/default.jpg',
  },
  '/tt': {
    title: buildSeoTitle('Linki TikTok'),
    description:
      'Szybkie linki z TikToka do oferty Apollo Idea, wypożyczalni EV, rezerwacji Tesli i kontaktu.',
    ogType: 'website',
    ogImage: 'https://img.apolloidea.com/og/default.jpg',
  },
};