/**
 * Treść landingu oferty wynajmu — `/wypozyczalnia`.
 */

export const FLEET_OFFER_LANDING = {
  heroH1: 'Wypożyczalnia aut elektrycznych',
  heroLead:
    'Wynajem tesli w Warszawie na dzień, weekend, tydzień lub miesiąc. Wybierasz model, termin i rezerwujesz online, a my przygotowujemy auto do odbioru z jasnymi zasadami najmu.',
} as const;

export const FLEET_OFFER_BENEFIT_BOXES = [
  {
    title: 'Wynajem Tesli bez kaucji?',
    body:
      'Tak, to możliwe, wystarczy wybrać taką opcję przy rezerwacji i posiadać pozytywną historię wynajmu.',
  },
  {
    title: 'Dostawa Tesli w całej Polsce?',
    body:
      'Tak, dostarczymy Twoje auto pod dowolny adres. Dalsze odległości są wyceniane indywidualnie.',
  },
  {
    title: 'Dostęp przez aplikację?',
    body:
      'Tak, kierowca wydający Ci auto udostępni je również w aplikacji mobilnej Tesla.',
  },
] as const;

/** Opis pod SEO (kolumna lewa) */
export const FLEET_OFFER_SEO_LONG_HTML = `
<h2 class="text-2xl font-bold text-foreground">Wypożyczalnia samochodów elektrycznych Warszawa</h2>
<p>
  Jeśli interesuje Cię <strong>wynajem tesla warszawa</strong>, na tej stronie porównasz dostępne modele i od razu przejdziesz do rezerwacji.
  Jako <strong>wypożyczalnia EV</strong> udostępniamy auta na różne okresy, od opcji <strong>tesla na 1 dzień</strong> i <strong>tesla na weekend</strong>,
  po <strong>wynajem tesli na tydzień</strong> oraz dłuższy najem.
</p>
<p>
  Proces jest prosty. Wybierasz samochód, ustawiasz datę odbioru i zwrotu, a potem potwierdzasz rezerwację online.
  Dzięki temu szybciej sprawdzisz, który model będzie najlepszy na miasto, trasę albo test przed zakupem.
</p>
<h3 class="text-xl font-bold text-foreground mt-8">Jak działa wynajem tesli bez kierowcy</h3>
<p>
  <strong>Wynajem tesli bez kierowcy</strong> oznacza, że prowadzisz auto samodzielnie na podstawie ważnego prawa jazdy.
  Przy wydaniu pokazujemy najważniejsze funkcje auta i ładowania, więc nawet pierwsza jazda Teslą jest spokojna i przewidywalna.
</p>
<h3 class="text-xl font-bold text-foreground mt-8">Na jaki okres możesz wynająć Teslę</h3>
<ul class="list-none pl-0 space-y-2 mt-4">
  <li class="flex items-start gap-2">
    <span class="mt-0.5 inline-block h-5 w-5 shrink-0 rounded-full bg-green-500/20 text-center text-sm leading-5 text-green-600">✓</span>
    <span><strong>Tesla na doby Warszawa</strong>, gdy potrzebujesz auta na krótki wyjazd lub spotkanie.</span>
  </li>
  <li class="flex items-start gap-2">
    <span class="mt-0.5 inline-block h-5 w-5 shrink-0 rounded-full bg-green-500/20 text-center text-sm leading-5 text-green-600">✓</span>
    <span><strong>Tesla na kilka dni</strong> lub <strong>tesla na tydzień</strong>, gdy chcesz spokojnie sprawdzić auto w różnych warunkach.</span>
  </li>
  <li class="flex items-start gap-2">
    <span class="mt-0.5 inline-block h-5 w-5 shrink-0 rounded-full bg-green-500/20 text-center text-sm leading-5 text-green-600">✓</span>
    <span><strong>Tesla na miesiąc</strong>, jeśli szukasz dłuższego najmu bez zakupu własnego auta.</span>
  </li>
</ul>
<h3 class="text-xl font-bold text-foreground mt-8">Jak wybrać model do swojego planu</h3>
<p>
  Jeśli zależy Ci na zwinności i niższym zużyciu energii w mieście, najczęściej wybierany jest Model 3.
  Gdy potrzebujesz więcej miejsca dla pasażerów i bagażu, lepszym wyborem będzie Model Y albo Model X.
</p>
<p>
  Przy każdym aucie możesz od razu sprawdzić szczegóły i przejść do rezerwacji. Dzięki temu szybciej porównasz modele
  i wybierzesz wersję, która naprawdę pasuje do Twojej trasy, liczby pasażerów i czasu najmu.
</p>
`.trim();
