import type { Article } from '../types';

export const ARTICLES: Article[] = [
  {
    slug: 'jak-dbac-o-baterie',
    title: 'Jak dbać o baterię w samochodzie elektrycznym?',
    publishDate: '2024-07-28',
    thumbnailUrl: 'https://img.apolloplug.com/img/blog-battery-care.jpg',
    excerpt: 'Kluczowe aspekty, takie jak optymalne poziomy ładowania, wpływ temperatury i najlepsze praktyki dotyczące szybkiego ładowania.',
    content: `
      <p>Baterie w samochodach elektrycznych to serce pojazdu, a ich właściwa pielęgnacja jest kluczowa dla zachowania zasięgu i długowieczności. Oto kilka praktycznych wskazówek, jak dbać o baterię w swoim EV.</p>
      <h2>1. Unikaj skrajnych stanów naładowania</h2>
      <p>Baterie litowo-jonowe, stosowane w pojazdach elektrycznych, najlepiej czują się w zakresie od 20% do 80% naładowania. Regularne ładowanie do 100% lub rozładowywanie do 0% może przyspieszyć degradację ogniw. Większość nowoczesnych samochodów pozwala na ustawienie limitu ładowania do 80% lub 90%, co warto wykorzystać w codziennej eksploatacji. Pełne ładowanie rezerwuj tylko na długie trasy.</p>
      <h2>2. Ogranicz częste korzystanie z szybkich ładowarek (DC)</h2>
      <p>Szybkie ładowarki prądu stałego (DC) są niezwykle wygodne w podróży, ale generują dużo ciepła, co jest jednym z głównych wrogów baterii. Wysoka temperatura przyspiesza procesy chemiczne prowadzące do zużycia ogniw. W miarę możliwości, na co dzień korzystaj z wolniejszego ładowania prądem zmiennym (AC), np. z domowego wallboxa. Szybkie ładowanie zostaw na sytuacje, gdy jest to absolutnie konieczne.</p>
      <h2>3. Zwracaj uwagę na temperaturę otoczenia</h2>
      <p>Ekstremalne temperatury, zarówno wysokie, jak i niskie, negatywnie wpływają na kondycję i wydajność baterii. Latem staraj się parkować w cieniu lub w garażu, aby uniknąć przegrzewania. Zimą, jeśli to możliwe, również trzymaj auto w garażu, ponieważ niskie temperatury zmniejszają dostępny zasięg i mogą spowolnić ładowanie. Systemy zarządzania temperaturą baterii (BMS) w nowoczesnych EV pomagają, ale unikanie skrajnych warunków zawsze jest dobrym pomysłem.</p>
      <h2>4. Unikaj agresywnej jazdy</h2>
      <p>Gwałtowne przyspieszanie i hamowanie powoduje szybkie rozładowywanie i ładowanie (przez rekuperację) baterii dużymi prądami, co również generuje nadmierne ciepło. Płynna, przewidywalna jazda nie tylko zwiększa zasięg, ale także przyczynia się do dłuższego życia baterii.</p>
      <p>Stosując się do tych prostych zasad, możesz znacznie wydłużyć żywotność baterii w swoim samochodzie elektrycznym i cieszyć się jego pełnymi możliwościami przez wiele lat.</p>
    `,
  },
  {
    slug: 'planowanie-dlugiej-trasy-ev',
    title: 'Jak zaplanować długą trasę samochodem elektrycznym?',
    publishDate: '2024-07-25',
    thumbnailUrl: 'https://img.apolloplug.com/img/blog-road-trip.jpg',
    excerpt: 'Praktyczne porady dotyczące planowania postojów na ładowanie, korzystania z aplikacji i optymalizacji zasięgu w podróży.',
    content: `
      <p>Podróżowanie samochodem elektrycznym na długich dystansach jest dziś łatwiejsze niż kiedykolwiek, ale wymaga odrobiny planowania. Oto jak się do tego przygotować.</p>
      <h2>1. Używaj dedykowanych aplikacji</h2>
      <p>Aplikacje takie jak A Better Routeplanner (ABRP), PlugShare czy system nawigacji wbudowany w Twój samochód są niezbędne. Pozwalają one nie tylko znaleźć stacje ładowania na trasie, ale także uwzględniają takie czynniki jak topografia terenu, temperatura czy styl jazdy, aby precyzyjnie oszacować zużycie energii i zaplanować postoje.</p>
      <h2>2. Nie celuj w 100% naładowania w trasie</h2>
      <p>Podczas długiej podróży ładowanie baterii powyżej 80% na szybkich ładowarkach DC staje się znacznie wolniejsze. Zamiast czekać na pełne naładowanie, często bardziej efektywne jest zrobienie dwóch krótszych postojów i ładowanie do 60-80%. Pozwoli to szybciej wrócić na trasę.</p>
      <h2>3. Miej plan B</h2>
      <p>Zawsze warto mieć w zanadrzu alternatywną stację ładowania. Czasem wybrana przez nas ładowarka może być zajęta lub niesprawna. Aplikacje takie jak PlugShare pokazują w czasie rzeczywistym status wielu stacji, co jest niezwykle pomocne.</p>
    `,
  },
];
