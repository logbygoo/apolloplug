import type { SeoData } from '../types';

export const SEO_CONFIG: Record<string, SeoData> = {
  '/': {
    title: 'Wynajem i transfery autami Tesla',
    description: 'Doświadcz przyszłości motoryzacji. Wynajmuj Tesle, korzystaj z transferów VIP i inwestuj w elektromobilność. ApolloPlug - Twoje centrum EV.',
    ogTitle: 'ApolloPlug - Przyszłość Motoryzacji Już Dziś',
    ogDescription: 'Wynajem, transfery i kompleksowe wsparcie w zakupie aut elektrycznych Tesla.',
    ogImage: 'https://img.apolloplug.com/cybertruck/tesla-cybertruck-01.jpg',
    ogType: 'website',
  },
  '/flota': {
    title: 'Flota Pojazdów Elektrycznych - Tesla',
    description: 'Poznaj naszą flotę w 100% elektrycznych samochodów Tesla. Zobacz dostępne modele, specyfikacje i ceny wynajmu.',
    ogImage: 'https://digitalassets.tesla.com/tesla-contents/image/upload/h_1800,w_2880,c_fit,f_auto,q_auto:best/Homepage-Model-Y-Hero-Desktop',
  },
  '/flota/:carId': {
    title: '{carName} - Dane techniczne i wynajem',
    description: 'Wynajmij Teslę {carName}. Sprawdź specyfikację, osiągi, zasięg i cennik. Zarezerwuj online w ApolloPlug.',
  },
  '/wynajem': {
    title: 'Wynajem Samochodów Elektrycznych Tesla',
    description: 'Zarezerwuj Teslę Model 3, Y, lub X. Oferujemy elastyczny wynajem krótkoterminowy i długoterminowy. Sprawdź cennik i dostępność online.',
    ogImage: 'https://img.apolloplug.com/img/tesla-3-low-600x400.jpg',
  },
  '/transfery': {
    title: 'Transfery VIP Tesla',
    description: 'Zamów profesjonalny i dyskretny transfer VIP naszą luksusową flotą Tesli. Idealne na lotnisko, spotkania biznesowe i specjalne okazje.',
    ogImage: 'https://img.apolloplug.com/tesla-y/tesla-y-01.jpg',
  },
  '/zakup': {
    title: 'Zamów z nami swoje EV',
    description: 'Kompleksowa pomoc w zakupie Twojego wymarzonego EV. Zajmujemy się całym procesem - od konfiguracji, przez finansowanie i ubezpieczenie, aż po odbiór.',
    ogImage: 'https://img.apolloplug.com/og/default.jpg',
  },
  '/ubezpieczenia': {
    title: 'Ubezpieczenia dla Samochodów Elektrycznych',
    description: 'Znajdź najlepsze i najtańsze ubezpieczenie OC/AC dla Twojego samochodu elektrycznego. Porównujemy oferty wielu firm, gwarantując najniższą cenę.',
    ogImage: 'https://img.apolloplug.com/og/default.jpg',
  },
  '/finansowanie': {
    title: 'Finansowanie Samochodów Elektrycznych',
    description: 'Elastyczne opcje finansowania Twojego nowego EV. Oferujemy leasing, wynajem długoterminowy i kredyt. Znajdź rozwiązanie idealne dla siebie.',
    ogImage: 'https://img.apolloplug.com/og/default.jpg',
  },
  '/kontakt': {
    title: 'Kontakt',
    description: 'Skontaktuj się z nami w sprawie wynajmu Tesli, transferów VIP lub inwestycji. Jesteśmy dostępni telefonicznie, mailowo oraz w naszym biurze w Warszawie.',
    ogImage: 'https://img.apolloplug.com/og/default.jpg',
  },
  '/blog': {
    title: 'Blog o Elektromobilności',
    description: 'Najnowsze wiadomości, porady i artykuły ze świata samochodów elektrycznych. Bądź na bieżąco z trendami dzięki blogowi ApolloPlug.',
    ogImage: 'https://img.apolloplug.com/blog/wypozyczalnia-aut-elektrycznych-miniatura.jpg',
  },
  '/blog/:articleSlug': {
    title: '{articleTitle}',
    description: '{articleExcerpt}',
    ogType: 'article',
  },
  '/dokumentacja': {
    title: 'Dokumentacja',
    description: 'Zapoznaj się z regulaminami, polityką prywatności i innymi ważnymi dokumentami dotyczącymi usług ApolloPlug.',
    ogImage: 'https://img.apolloplug.com/og/default.jpg',
  },
};
