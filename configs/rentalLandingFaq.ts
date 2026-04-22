/** Kategorie FAQ dla landingów `/wypozycz/:carId`. */
export const RENTAL_LANDING_FAQ_CATEGORIES = [
  'Rezerwacja',
  'Przed wynajmem',
  'W trakcie wynajmu',
  'Po wynajmie',
  'Kaucja',
  'Ubezpieczenie',
] as const;

export type RentalLandingFaqCategory = (typeof RENTAL_LANDING_FAQ_CATEGORIES)[number];

export type RentalLandingFaqItem = {
  question: string;
  answer: string;
  categories: RentalLandingFaqCategory[];
};

/** Wspólne FAQ dla landingów `/wypozycz/:carId` (ta sama treść na każdej stronie). */
export const RENTAL_LANDING_FAQ: RentalLandingFaqItem[] = [
  {
    question: 'Jak zarezerwować samochód?',
    answer:
      'Rezerwację zrobisz przez formularz na stronie. Możesz też napisać do nas mailowo lub przez komunikator, a pomożemy dobrać model i termin.',
    categories: ['Rezerwacja'],
  },
  {
    question: 'Jakie dokumenty wymagane są do wynajęcia samochodu?',
    answer:
      'Przy odbiorze potrzebujesz ważnego prawa jazdy, dokumentu tożsamości oraz karty płatniczej wystawionej na dane najemcy.',
    categories: ['Rezerwacja', 'Przed wynajmem'],
  },
  {
    question: 'Jakie karty platnicze akceptujemy?',
    answer:
      'Akceptujemy fizyczne karty płatnicze wystawione na imię i nazwisko najemcy. Karta kredytowa nie jest wymagana. Nie akceptujemy kart wirtualnych i portfeli internetowych.',
    categories: ['Rezerwacja', 'Przed wynajmem', 'Kaucja'],
  },
  {
    question: 'Jaki jest wymagany minimalny wiek Najemcy?',
    answer:
      'Standardowo wymagamy ukończonych 21 lat. W wybranych przypadkach możemy ustalić indywidualne warunki.',
    categories: ['Rezerwacja', 'Przed wynajmem'],
  },
  {
    question: 'Czy jest możliwość wynajmu z kierowcą?',
    answer:
      'Tak, taka usługa jest dostępna po indywidualnej wycenie. Warunki ustalamy po podaniu trasy, czasu i rodzaju zlecenia.',
    categories: ['Rezerwacja'],
  },
  {
    question: 'Czy podane ceny to kwoty brutto?',
    answer: 'Tak, ceny na stronie są cenami brutto.',
    categories: ['Rezerwacja'],
  },
  {
    question: 'Czy do cen podanych na stronie należy doliczyć podatek VAT?',
    answer: 'Nie, podatek VAT jest już wliczony w cenę.',
    categories: ['Rezerwacja'],
  },
  {
    question: 'W jakich godzinach można wynająć i zwrócić samochód?',
    answer:
      'Godzinę odbioru i zwrotu wybierasz podczas rezerwacji. Pracujemy elastycznie i dopasowujemy termin do dostępności auta.',
    categories: ['Rezerwacja', 'Przed wynajmem'],
  },
  {
    question: 'Czy odbiór/zwrot auta może odbyć się w niedzielę?',
    answer:
      'Tak. Odbiory i zwroty realizujemy 7 dni w tygodniu, również w niedziele i święta, po wcześniejszym ustaleniu terminu.',
    categories: ['Rezerwacja', 'Po wynajmie'],
  },
  {
    question: 'Czy możliwe jest podstawienie samochódu w wybrane przeze mnie miejsce?',
    answer:
      'Tak, możemy podstawić auto pod wskazany adres. Koszt zależy od modelu i lokalizacji, a finalna cena jest widoczna przy rezerwacji.',
    categories: ['Rezerwacja', 'Przed wynajmem'],
  },
  {
    question: 'Czy dostarczamy auta do innych miast?',
    answer:
      'Tak, realizujemy podstawienia poza Warszawę. Koszt liczymy zwykle za kilometr trasy, a przy dłuższych odcinkach wycena może być ustalana indywidualnie.',
    categories: ['Rezerwacja', 'Przed wynajmem'],
  },
  {
    question: 'Czy jest możliwy wynajem z OC sprawcy?',
    answer:
      'Nie rozliczamy najmu bezpośrednio z towarzystwem ubezpieczeniowym. Możesz wynająć auto komercyjnie i samodzielnie wystąpić o zwrot kosztów do ubezpieczyciela.',
    categories: ['Rezerwacja', 'Ubezpieczenie'],
  },
  {
    question: 'Czy samochodem może kierować inna osoba niż Najemca?',
    answer:
      'Tak, dodatkowego kierowcę dopisujemy do umowy. Każda osoba kierująca autem musi być wskazana przed rozpoczęciem najmu.',
    categories: ['Rezerwacja', 'Przed wynajmem'],
  },
  {
    question: 'Czy wypożyczonym samochodem mogę wyjechać poza granice Polski?',
    answer:
      'Tak, ale tylko po uzyskaniu naszej pisemnej zgody przed wyjazdem. Zgłoś kierunek podróży wcześniej, żebyśmy potwierdzili warunki i ubezpieczenie.',
    categories: ['Przed wynajmem', 'W trakcie wynajmu', 'Ubezpieczenie'],
  },
  {
    question: 'Czy auta są czyszczone przed wynajmem?',
    answer:
      'Tak. Każde auto jest przygotowane i czyszczone przed wydaniem kolejnemu klientowi.',
    categories: ['Przed wynajmem'],
  },
  {
    question: 'Czy auto dostaje naładowane do pełna?',
    answer:
      'Standardowo wydajemy auta z poziomem baterii około 80%. Przy zwrocie oczekujemy podobnego poziomu, chyba że w protokole ustalimy inaczej albo wybierzesz pakiet zwrotu z niższym poziomem baterii.',
    categories: ['Przed wynajmem', 'W trakcie wynajmu', 'Po wynajmie'],
  },
  {
    question: 'Czym jest kaucja i czy jest wymagana przy wynajmie samochodu?',
    answer:
      'Wynajem może być dostępny w wariancie z kaucją lub bez kaucji, zależnie od oferty i historii najmu. Kaucja zabezpiecza rozliczenia i nie jest tym samym co udział własny w szkodzie.',
    categories: ['Przed wynajmem', 'Kaucja'],
  },
  {
    question: 'W jakiej formie płacona jest kaucja?',
    answer:
      'Kaucja jest blokowana na karcie płatniczej w formie preautoryzacji. Nie przyjmujemy kaucji gotówką.',
    categories: ['Przed wynajmem', 'Kaucja'],
  },
  {
    question: 'Na czym polega udział własny i ile wynosi?',
    answer:
      'Udział własny to maksymalna kwota, do której odpowiadasz za szkodę zgodnie z umową. Wysokość zależy od modelu auta i pakietu ochrony. Limity nie obowiązują przy rażącym naruszeniu warunków najmu, na przykład przy jeździe pod wpływem.',
    categories: ['Przed wynajmem', 'Ubezpieczenie', 'Kaucja'],
  },
  {
    question: 'Czy jest możliwość całkowitego zniesienia udziału własnego?',
    answer:
      'Nie oferujemy pełnego zniesienia udziału własnego. Możesz jednak wybrać pakiet, który znacząco obniża odpowiedzialność oraz rozszerza ochronę dla wybranych zdarzeń, na przykład szyb i opon.',
    categories: ['Przed wynajmem', 'Ubezpieczenie'],
  },
  {
    question: 'Czy wypożyczenie bez kaucji jest równoznaczny z brakiem udziału własnego w szkodzie?',
    answer:
      'Nie. Brak kaucji nie oznacza braku udziału własnego. To dwa osobne elementy umowy, które działają niezależnie.',
    categories: ['Przed wynajmem', 'Kaucja', 'Ubezpieczenie'],
  },
  {
    question: 'Co obejmuje ubezpieczenie w cenie wynajmu?',
    answer:
      'Zakres podstawowy obejmuje pakiet zgodny z aktualną umową i regulaminem. Przed odbiorem auta pokazujemy, co dokładnie zawiera ochrona i jakie są dostępne opcje rozszerzenia.',
    categories: ['Przed wynajmem', 'Ubezpieczenie'],
  },
  {
    question: 'Gdzie i jak mogę się ładować?',
    answer:
      'Auto naładujesz na publicznych stacjach AC i DC, w tym w sieci Tesla Supercharger, oraz w domu ze zwykłego gniazdka, jeśli masz odpowiedni przewód. Przy odbiorze podpowiemy aplikacje i najwygodniejsze punkty ładowania na trasie.',
    categories: ['W trakcie wynajmu'],
  },
  {
    question: 'Jak zapłacić za ładowanie na Supercharger?',
    answer:
      'Opłaty za Supercharger rozliczamy automatycznie na podstawie karty podpiętej do Twojego najmu. Potwierdzenie rozliczenia otrzymasz elektronicznie.',
    categories: ['W trakcie wynajmu', 'Po wynajmie'],
  },
  {
    question: 'Kto ma dostęp do kamer w aucie?',
    answer:
      'Kamery zewnętrzne służą do funkcji bezpieczeństwa i rejestracji zdarzeń drogowych. Kamera wewnętrzna nie służy do podglądu kierowcy w trakcie jazdy. Dane są przetwarzane zgodnie z polityką prywatności i obowiązującymi przepisami.',
    categories: ['W trakcie wynajmu', 'Ubezpieczenie'],
  },
  {
    question: 'Postępowanie w przypadku awarii auta lub wypadku',
    answer:
      'Najpierw skontaktuj się z naszą infolinią, żeby otrzymać dalsze instrukcje. Zabezpiecz miejsce zdarzenia i osoby poszkodowane. Jeśli sytuacja tego wymaga, wezwij odpowiednie służby. Następnie przekaż nam dokumenty ze zdarzenia, które będą potrzebne do dalszego rozliczenia.',
    categories: ['W trakcie wynajmu', 'Ubezpieczenie'],
  },
  {
    question: 'Dostałem Mandat. Co teraz?',
    answer:
      'Po otrzymaniu zapytania od organu wskazujemy kierującego zgodnie z umową najmu z danego okresu. Zgodnie z cennikiem może zostać naliczona opłata administracyjna za obsługę sprawy.',
    categories: ['W trakcie wynajmu', 'Po wynajmie'],
  },
  {
    question: 'Czy mogę przedłużyć wynajem samochodu?',
    answer:
      'Tak, jeśli dany samochód jest dostępny na kolejne dni. Najlepiej zgłosić chęć przedłużenia jak najwcześniej, zanim pojawi się następna rezerwacja.',
    categories: ['W trakcie wynajmu'],
  },
  {
    question: 'Jaki jest limit kilometrów?',
    answer:
      'Każda umowa zawiera limit kilometrów przypisany do konkretnego modelu. Po przekroczeniu limitu naliczamy opłatę zgodnie z cennikiem.',
    categories: ['W trakcie wynajmu', 'Przed wynajmem'],
  },
  {
    question: 'Czy możliwy jest wynajem samochodów bez limitu kilometrów?',
    answer: 'Obecnie nie mamy wariantu bez limitu kilometrów.',
    categories: ['W trakcie wynajmu', 'Przed wynajmem'],
  },
  {
    question: 'Czy mogę wykorzystać samochód do jazdy po torze?',
    answer:
      'Nie. Samochodów nie wolno używać do jazdy torowej, testów ani wyścigów. Takie użycie narusza warunki umowy i wpływa na odpowiedzialność za szkody.',
    categories: ['W trakcie wynajmu', 'Ubezpieczenie'],
  },
  {
    question: 'Czy muszę zwrócić czyste auto?',
    answer:
      'Tak, auto powinno być zwrócone w stanie umożliwiającym ocenę techniczną i wizualną. Jeśli nie chcesz myć auta samodzielnie, możesz wybrać pakiet mycia.',
    categories: ['Po wynajmie'],
  },
  {
    question: 'Jak oceniany jest stan auta przy zwrocie?',
    answer:
      'Przy zwrocie sporządzamy protokół i dokumentację zdjęciową. Protokół wysyłamy na e-mail, a informacje o rozliczeniu kaucji wpisujemy w dokument zwrotu.',
    categories: ['Po wynajmie', 'Kaucja'],
  },
  {
    question: 'W jakim czasie otrzymam fakturę?',
    answer:
      'Fakturę wysyłamy elektronicznie najpóźniej do 15 dnia miesiąca następującego po miesiącu, w którym zakończył się najem.',
    categories: ['Po wynajmie'],
  },
  {
    question: 'W jakim czasie zostaje zwolniona kaucja?',
    answer:
      'Blokadę kaucji zwalniamy niezwłocznie po poprawnym zakończeniu najmu, zwykle w ciągu jednego dnia roboczego.',
    categories: ['Po wynajmie', 'Kaucja'],
  },
  {
    question: 'W jakich sytuacjach ponoszę finansową odpowiedzialność?',
    answer:
      'Odpowiedzialność finansowa może obejmować uszkodzenia auta powstałe z winy najemcy, naruszenie warunków umowy, niedozwolone użycie pojazdu lub brak możliwości ustalenia sprawcy. Szczegółowy katalog sytuacji znajdziesz w umowie i OWU.',
    categories: ['Ubezpieczenie', 'Kaucja', 'W trakcie wynajmu'],
  },
  {
    question: 'W jakich sytuacjach odpowiadam do kwoty wyższej niż wysokość udziału własnego?',
    answer:
      'Może to mieć miejsce przy ciężkim naruszeniu umowy, na przykład prowadzeniu pod wpływem alkoholu lub bez ważnych uprawnień. W takich przypadkach odpowiedzialność może obejmować pełny koszt szkody zgodnie z OWU.',
    categories: ['Ubezpieczenie', 'Kaucja'],
  },
  {
    question: 'Auto zostało uszkodzone nie z mojej winy',
    answer:
      'Jeśli szkoda nie powstała z Twojej winy, co do zasady nie ponosisz kosztu naprawy. Kluczowe jest szybkie zgłoszenie zdarzenia, przekazanie oświadczenia oraz dokumentów od policji, jeśli były wymagane.',
    categories: ['Ubezpieczenie', 'W trakcie wynajmu'],
  },
];
