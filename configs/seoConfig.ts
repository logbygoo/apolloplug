import type { SeoData } from '../types';

export const SEO_CONFIG: Record<string, SeoData> = {
  '/': {
    title: 'Apollo Idea • wypożyczalnia aut elektrycznych Warszawa',
    description:
      'Wynajem Tesli w Warszawie, Finansowanie, Ubezpieczenia, Zakup • oferta aut elektrycznych na doby i dłuższy okres, transfery oraz wsparcie przy zakupie EV.',
    ogTitle: 'Apollo Idea • wynajem Tesli Warszawa',
    ogDescription:
      'Wypożyczalnia samochodów elektrycznych Warszawa, Finansowanie, Ubezpieczenia, Zakup • rezerwacja online, jasne zasady najmu i flota modeli Tesla.',
    ogImage: 'https://img.apolloidea.com/cybertruck/tesla-cybertruck-01.jpg',
    ogType: 'website',
  },
  '/flota': {
    title: 'Flota Tesla • auta elektryczne na wynajem Warszawa',
    description:
      'Sprawdź dostępne modele Tesla, porównaj zasięg i parametry, a potem wybierz auto elektryczne na wynajem w Warszawie.',
    ogImage: 'https://digitalassets.tesla.com/tesla-contents/image/upload/h_1800,w_2880,c_fit,f_auto,q_auto:best/Homepage-Model-Y-Hero-Desktop',
  },
  '/flota/:carId': {
    title: '{carName} • dane techniczne i wynajem Warszawa',
    description:
      'Sprawdź specyfikację, zasięg i cennik modelu {carName}. Zarezerwuj Teslę online w Warszawie na dzień, weekend lub dłuższy okres.',
  },
  '/wypozycz/:carId': {
    title: 'Wynajem {carName} Warszawa • wypożyczalnia Tesla',
    description:
      'Wynajem {carName} bez kierowcy w Warszawie. Sprawdź cenę za dobę, dostępność i zarezerwuj Teslę online na krótki lub dłuższy okres.',
    ogTitle: 'Wynajem {carName} Warszawa • Tesla na doby',
    ogDescription:
      'Zarezerwuj {carName} online i odbierz auto gotowe do drogi. Przejrzyste warunki najmu i wsparcie przy pierwszym kontakcie z Teslą.',
  },
  '/wypozyczalnia': {
    title: 'Wypożyczalnia Tesla Warszawa • wynajem aut elektrycznych',
    description:
      'Wypożyczalnia aut elektrycznych Warszawa, wynajem Tesli na dzień, weekend, tydzień lub miesiąc. Sprawdź modele i zarezerwuj online.',
    ogImage: 'https://img.apolloidea.com/img/tesla-3-low-600x400.jpg',
  },
  '/rezerwacja': {
    title: 'Rezerwacja Tesli • wynajem auta elektrycznego',
    description:
      'Wybierz model Tesla, ustaw terminy i potwierdź dane. Szybka rezerwacja online dla wynajmu auta elektrycznego w Warszawie.',
  },
  '/transfery': {
    title: 'Transfery VIP Warszawa • auto z kierowcą',
    description: 'Zamów auto z kierowcą w Warszawie na transfer lotniskowy, spotkanie biznesowe lub przejazd prywatny.',
    ogImage: 'https://img.apolloidea.com/tesla-y/tesla-y-01.jpg',
  },
  '/zakup': {
    title: 'Zakup EV z Apollo Idea • wsparcie od A do Z',
    description:
      'Pomagamy w zakupie auta elektrycznego, od konfiguracji i finansowania po ubezpieczenie i odbiór samochodu.',
    ogImage: 'https://img.apolloidea.com/og/default.jpg',
  },
  '/ubezpieczenia': {
    title: 'Ubezpieczenia aut elektrycznych • OC i AC',
    description:
      'Porównaj ubezpieczenie OC i AC dla samochodu elektrycznego i wybierz zakres ochrony dopasowany do sposobu użytkowania auta.',
    ogImage: 'https://img.apolloidea.com/og/default.jpg',
  },
  '/finansowanie': {
    title: 'Finansowanie EV • leasing, najem i kredyt',
    description:
      'Sprawdź finansowanie samochodów elektrycznych, leasing, najem długoterminowy i kredyt. Wybierz rozwiązanie dopasowane do budżetu.',
    ogImage: 'https://img.apolloidea.com/og/default.jpg',
  },
  '/kontakt': {
    title: 'Kontakt • Apollo Idea Warszawa',
    description:
      'Skontaktuj się z nami w sprawie wynajmu Tesli, transferów VIP i usług EV. Odpowiadamy telefonicznie, mailowo i przez formularz.',
    ogImage: 'https://img.apolloidea.com/og/default.jpg',
  },
  '/blog': {
    title: 'Blog elektromobilności • porady i aktualności EV',
    description:
      'Przeczytaj artykuły o samochodach elektrycznych, ładowaniu, wynajmie Tesli i praktycznym użytkowaniu EV na co dzień.',
    ogImage: 'https://img.apolloidea.com/blog/wypozyczalnia-aut-elektrycznych-miniatura.jpg',
  },
  '/blog/:articleSlug': {
    title: '{articleTitle}',
    description: '{articleExcerpt}',
    ogType: 'article',
  },
  '/wrap': {
    title: 'Galeria wrap Tesla • wzory do Lakierni',
    description:
      'Pobierz gotowe wzory wrap i naklejek do Lakierni w Tesli. Zobacz galerię i sprawdź, jak zainstalować pliki w samochodzie.',
    ogType: 'website',
    ogImage: 'https://img.apolloidea.com/img/wrap/wrap-cf-black-apolloidea.png',
  },
  '/dokumentacja': {
    title: 'Dokumentacja • regulaminy i polityki',
    description:
      'Sprawdź regulaminy, politykę prywatności i dokumenty dotyczące usług Apollo Idea, wynajmu oraz przetwarzania danych.',
    ogImage: 'https://img.apolloidea.com/og/default.jpg',
  },
  '/ig': {
    title: 'Apollo Idea • linki Instagram',
    description:
      'Szybkie linki do oferty Apollo Idea, wypożyczalni aut elektrycznych i rezerwacji Tesli w Warszawie.',
    ogType: 'website',
    ogImage: 'https://img.apolloidea.com/og/default.jpg',
  },
  '/fb': {
    title: 'Apollo Idea • linki Facebook',
    description:
      'Szybkie linki z Facebooka do oferty Apollo Idea, wypożyczalni EV, rezerwacji Tesli i kontaktu.',
    ogType: 'website',
    ogImage: 'https://img.apolloidea.com/og/default.jpg',
  },
  '/yt': {
    title: 'Apollo Idea • linki YouTube',
    description:
      'Szybkie linki z YouTube do oferty Apollo Idea, wypożyczalni EV, rezerwacji Tesli i kontaktu.',
    ogType: 'website',
    ogImage: 'https://img.apolloidea.com/og/default.jpg',
  },
  '/tt': {
    title: 'Apollo Idea • linki TikTok',
    description:
      'Szybkie linki z TikToka do oferty Apollo Idea, wypożyczalni EV, rezerwacji Tesli i kontaktu.',
    ogType: 'website',
    ogImage: 'https://img.apolloidea.com/og/default.jpg',
  },
};