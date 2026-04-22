import type { RentalLandingPageContent } from '../types';

const DEFAULT_HERO_SUBTITLE = 'Wypożyczalnia aut elektrycznych Warszawa • Tesla';

/** Fallback dla modeli bez dedykowanej treści — używa `{carName}` i `{range}` w tekstach. */
export const DEFAULT_RENTAL_LANDING_PAGE_CONTENT: RentalLandingPageContent = {
  heroSubtitle: DEFAULT_HERO_SUBTITLE,
  whyLead:
    'To nie jest zwykły samochód. To komputer na kołach, który definiuje na nowo pojęcie komfortu i osiągów. ' +
    'Idealny wybór na weekendowy wyjazd, test przed zakupem lub podróż biznesową.',
  features: [
    {
      icon: 'bolt',
      title: 'Zasięg i ładowanie',
      desc: 'Realny zasięg do {range}. Dostęp do sieci Supercharger i wygodne ładowanie w trasie.',
    },
    {
      icon: 'sparkles',
      title: 'Komfort i technologia',
      desc: 'Cicha kabina, duży ekran i intuicyjna obsługa — od pierwszych kilometrów poczujesz różnicę.',
    },
    {
      icon: 'shieldCheck',
      title: 'Bezpieczeństwo',
      desc: 'Wysokie oceny w testach zderzeniowych i zaawansowany pakiet wsparcia kierowcy.',
    },
    {
      icon: 'key',
      title: 'Aplikacja Tesla',
      desc: 'Steruj klimatem, zamkiem i statusem ładowania z telefonu — auto zawsze pod kontrolą.',
    },
  ],
  longDescriptionHtml: `
<h2 class="text-2xl font-bold text-foreground">Wynajem {carName} — elektryka w zasięgu ręki</h2>
<p>
  Jeśli interesuje Cię <strong>tesla na wynajem</strong> w Warszawie, trafiłeś we właściwe miejsce.
  <strong>{carName}</strong> łączy osiągi, ciszę w kabinie i przejrzyste koszty eksploatacji.
  Jako profesjonalna <strong>wypożyczalnia samochodów Tesla</strong>, oferujemy przejrzyste warunki i auta przygotowane do drogi.
</p>
<p>
  <strong>Wypożyczenie tesli</strong> to świetny sposób, aby sprawdzić, jak auto elektryczne sprawdza się na co dzień —
  czy to <strong>wynajem krótkoterminowy</strong> na weekend, czy dłuższy test przed zakupem.
</p>
<h3 class="text-xl font-bold text-foreground mt-6">Dlaczego warto wybrać naszą ofertę?</h3>
<ul class="list-none pl-0 space-y-2 mt-4">
  <li class="flex items-start gap-2">
    <span class="mt-0.5 inline-block h-5 w-5 shrink-0 rounded-full bg-green-500/20 text-center text-sm leading-5 text-green-600">✓</span>
    <span><strong>Tesla wynajem Warszawa</strong> — dogodny odbiór i elastyczne terminy.</span>
  </li>
  <li class="flex items-start gap-2">
    <span class="mt-0.5 inline-block h-5 w-5 shrink-0 rounded-full bg-green-500/20 text-center text-sm leading-5 text-green-600">✓</span>
    <span><strong>Tesla na doby</strong> — na wyjazdy, eventy i podróże służbowe.</span>
  </li>
  <li class="flex items-start gap-2">
    <span class="mt-0.5 inline-block h-5 w-5 shrink-0 rounded-full bg-green-500/20 text-center text-sm leading-5 text-green-600">✓</span>
    <span><strong>Wypożyczalnia EV</strong> z krótkim wdrożeniem i wsparciem po odbiorze auta.</span>
  </li>
  <li class="flex items-start gap-2">
    <span class="mt-0.5 inline-block h-5 w-5 shrink-0 rounded-full bg-green-500/20 text-center text-sm leading-5 text-green-600">✓</span>
    <span>Możliwość opcji <strong>tesla w abonamencie</strong> dla firm.</span>
  </li>
</ul>
<p class="mt-6">
  Zarezerwuj termin i przekonaj się, dlaczego <strong>wynajem tesli</strong> to doświadczenie, którego nie zapomnisz —
  naładowane auto, czysta kabina i pełna gotowość do drogi.
</p>
`.trim(),
};

const TESLA_3_HIGHLAND: RentalLandingPageContent = {
  heroSubtitle: DEFAULT_HERO_SUBTITLE,
  whyLead:
    'Tesla Model 3 Highland to więcej niż auto. To komputer na kołach oferujący prawdziwie elektryczne emocje. Idealny na weekendowy wypad, ważne spotkanie biznesowe lub próbę przed zakupem. Oferujemy krótkoterminowy wynajem Tesli w Warszawie na dni, tygodnie, weekendy, święta albo miesiące, z elastycznymi pakietami dopasowanymi do Twoich potrzeb.',
  features: [
    {
      icon: 'bolt',
      title: 'Zasięg i ładowanie',
      desc:
        'Najnowszy Model 3 Highland w wersji Long Range osiąga realny zasięg do 660 km (WLTP). W 15 minut doładujesz około 280 km, a sieć Supercharger w Polsce i Europie pozwala szybko uzupełnić energię w trasie.',
    },
    {
      icon: 'sparkles',
      title: 'Komfort Highland',
      desc:
        'Standardowo wentylowane fotele chłodzą w upalne dni, a akustyczne szyby i dodatkowe wygłuszenie sprawiają, że kabina jest nawet o 20% cichsza. Lepsze materiały, oświetlenie ambient i 8‑calowy ekran dla pasażerów z tyłu tworzą relaksującą atmosferę.',
    },
    {
      icon: 'shieldCheck',
      title: 'Bezpieczeństwo',
      desc:
        'Model 3 zdobył pięć gwiazdek w testach Euro NCAP i NHTSA. Zaawansowane systemy wspomagające kierowcę, w tym Autopilot, aktywne hamowanie awaryjne oraz asystent utrzymania pasa, pomagają unikać kolizji i dbają o bezpieczeństwo pasażerów.',
    },
    {
      icon: 'key',
      title: 'Dostęp przez aplikację',
      desc:
        'Telefon zastępuje kluczyk. Możesz zablokować i odblokować auto, ustawić klimatyzację przed jazdą, sprawdzić zasięg i włączyć tryb Dog Mode. Aplikacja Tesla pozwala też monitorować ładowanie i zapewnia zdalne wsparcie.',
    },
  ],
  longDescriptionHtml: `
<h2 class="text-2xl font-bold text-foreground">Wypożyczalnia Tesla 3 Highland w Warszawie: przyszłość w zasięgu ręki</h2>
<p>
  Jeśli interesuje Cię <strong>tesla na wynajem w Warszawie</strong>, trafiłeś we właściwe miejsce.
  Nasz <strong>Tesla Model 3 Highland</strong> to odświeżona wersja bestsellera, która zachwyca cichszą kabiną,
  lepszym zawieszeniem i materiałami premium. <strong>Wypożyczalnia samochodów elektrycznych</strong> powinna oferować więcej
  niż standardowy samochód. U nas dostajesz komputer na kołach o zasięgu godnym dalekich tras. Wynajem samochodu
  elektrycznego to nie tylko ekologia, to także komfort i styl.
</p>
<p>
  Krótkoterminowe <strong>wypożyczenie tesli model 3</strong> pozwala sprawdzić, jak auto elektryczne spisuje się na co dzień.
  Oferujemy <strong>tesla wynajem na doby</strong>, weekendy, tygodnie czy całe miesiące, dzięki czemu możesz dobrać okres do swoich
  planów. Niezależnie czy chcesz pojechać w góry, zaskoczyć gości podczas ślubu, czy poznać wrażenia z jazdy przed
  zakupem, <strong>wynajem tesli</strong> to elastyczna opcja bez zobowiązań.
</p>
<p>
  Nowa wersja Highland to nie tylko kosmetyka. Standardowo wentylowane fotele chłodzą w upalne dni, a akustyczne
  szyby sprawiają, że w środku jest nawet 20% ciszej niż w poprzedniej generacji.
  Lepsze materiały, ambientowe oświetlenie i nowy 8‑calowy ekran dla pasażerów z tyłu dodają elegancji i wygody.
  Model 3 Long Range ma zasięg do 660 km (WLTP), a w 15 minut uzupełnisz energię na około 280 km – idealne na spontaniczne wypady.
</p>
<p>
  Bezpieczeństwo to kolejny powód, dla którego <strong>wynajem tesli 3</strong> cieszy się tak dużą popularnością. Auto zdobyło pięć
  gwiazdek w testach Euro NCAP i NHTSA, a systemy wspomagające kierowcę pomagają uniknąć kolizji.
  Autopilot, aktywne hamowanie awaryjne oraz system utrzymania pasa czynią podróż pewną i relaksującą.
</p>
<h3 class="text-xl font-bold text-foreground mt-6">Dlaczego warto wybrać naszą ofertę?</h3>
<ul class="list-none pl-0 space-y-2 mt-4">
  <li class="flex items-start gap-2">
    <span class="mt-0.5 inline-block h-5 w-5 shrink-0 rounded-full bg-green-500/20 text-center text-sm leading-5 text-green-600">✓</span>
    <span><strong>Tesla wynajem Warszawa:</strong> odbiór w centrum miasta lub dowolnym punkcie.</span>
  </li>
  <li class="flex items-start gap-2">
    <span class="mt-0.5 inline-block h-5 w-5 shrink-0 rounded-full bg-green-500/20 text-center text-sm leading-5 text-green-600">✓</span>
    <span><strong>Tesla na doby:</strong> idealna na śluby, eventy, weekendy czy wakacje.</span>
  </li>
  <li class="flex items-start gap-2">
    <span class="mt-0.5 inline-block h-5 w-5 shrink-0 rounded-full bg-green-500/20 text-center text-sm leading-5 text-green-600">✓</span>
    <span><strong>Wypożyczalnia EV:</strong> pełne wsparcie, szkolenie i odpowiedzi na pytania.</span>
  </li>
  <li class="flex items-start gap-2">
    <span class="mt-0.5 inline-block h-5 w-5 shrink-0 rounded-full bg-green-500/20 text-center text-sm leading-5 text-green-600">✓</span>
    <span>Możliwość opcji <strong>tesla w abonamencie</strong> dla firm: wygodna forma dłuższego wynajmu.</span>
  </li>
</ul>
<p class="mt-6">
  Skontaktuj się z nami, lub od razu przejdź do wybory terminu rezerwacji i zabookuj swoją <strong>teslę do wynajęcia</strong> w stolicy.
  Możesz odebrać samochód w centrum Warszawy lub w dowolnym miejscu w całym mieście, a my zadbamy o to, by auto było naładowane,
  czyste i gotowe do drogi. Nasza <strong>wypożyczalnia tesla 3</strong> gwarantuje pełne wsparcie, instruktaż i aplikację,
  która zamieni Twój telefon w kluczyk i pilot do sterowania klimatem. Przekonaj się,
  jak proste może być wynajęcie samochodu elektrycznego w Warszawie.
</p>
`.trim(),
};

const TESLA_Y_JUNIPER: RentalLandingPageContent = {
  heroSubtitle: DEFAULT_HERO_SUBTITLE,
  whyLead:
    'Model Y po liftingu Juniper to elektryczny SUV z dużą kabiną i bagażnikiem, który udźwignie rodzinny wyjazd, transport sprzętu albo kilka dni testu przed zakupem. ' +
    'W środku jest ciszej niż we wcześniejszych wersjach, a układ deski rozdzielczej i ekranów jest bliższy temu, co znasz z odświeżonego Modelu 3.',
  features: [
    {
      icon: 'bolt',
      title: 'Zasięg w praktyce i Supercharger',
      desc:
        'Realny zasięg do około {range} zależy od wersji, felg i stylu jazdy. Na trasie pomaga sieć Supercharger i planowanie postojów w nawigacji, więc łatwiej trzymać tempo bez nerwowego szukania stacji.',
    },
    {
      icon: 'sparkles',
      title: 'Juniper w środku i na zewnątrz',
      desc:
        'Nowsza stylistyka z wyraźnymi pasami świateł, lepsza aerodynamika i cichsza kabina między innymi dzięki szybom akustycznym. W środku są przyjemniejsze materiały, ambientowe światło, większy centralny ekran i drugi ekran dla pasażerów z tyłu.',
    },
    {
      icon: 'shieldCheck',
      title: 'Bezpieczeństwo i wsparcie kierowcy',
      desc:
        'Model Y ma mocną kartę w testach zderzeniowych i zestaw systemów wspomagających, które pomagają na co dzień. Autopilot i asystenty to narzędzia wsparcia, a nie zamiennik uwagi na drodze.',
    },
    {
      icon: 'key',
      title: 'Aplikacja, frunk i bagażnik',
      desc:
        'Telefon zastępuje kluczyk: otworzysz auto, ustawisz klimat i sprawdzisz ładowanie zanim wyjedziesz. Tylna kanapa składa się płasko, a do bagażnika dochodzi jeszcze schowek pod maską.',
    },
  ],
  longDescriptionHtml: `
<h2 class="text-2xl font-bold text-foreground">Tesla Model Y Juniper na wynajem w Warszawie</h2>
<p class="text-muted-foreground">
  <strong>Tesla Model Y</strong> w wersji po liftingu <strong>Juniper</strong> to praktyczny <strong>wynajem tesli</strong> w formie SUV-a:
  dużo miejsca na ludzi i bagaż, szybkie ładowanie i obsługa bliska temu, co oferuje odświeżony Model 3. Jeśli szukasz
  <strong>auta elektrycznego na wynajem w Warszawie</strong> albo <strong>wypożyczalni EV</strong> z realnym wsparciem przy pierwszym kontakcie z Teslą, przy odbiorze przechodzimy po kolei ładowanie i aplikację, żeby pierwszy dzień z autem był spokojny.
</p>
<p>
  <strong>Wynajem tesli bez kierowcy</strong> oznacza u nas standardowe zasady: prowadzisz sam z ważnym prawem jazdy, a my przygotowujemy samochód do drogi.
  To dobra opcja na <strong>teslę na weekend</strong>, <strong>teslę na kilka dni</strong> albo <strong>wynajem tesli na tydzień</strong>, gdy chcesz sprawdzić codzienne ładowanie, bagażnik i komfort na dłuższym odcinku.
  Dla osób z zagranicy ta sama usługa to po prostu <strong>Tesla rental Warsaw</strong> i <strong>electric car rental Warsaw</strong> z jasnymi zasadami i odbiorem w mieście.
</p>
<h3 class="text-xl font-bold text-foreground mt-8">Co dokładnie zmienia Juniper w Modelu Y</h3>
<p>
  Juniper to większy lifting niż kosmetyka lamp. Nadwozie dopracowano pod aerodynamikę, dlatego przy wyższych prędkościach w kabinie jest ciszej, a auto zużywa mniej energii na trasie.
  Wnętrze ma lepsze materiały, ambientowe podświetlenie, czytelniejszy układ menu na dużym ekranie i dodatkowy ekran z tyłu dla pasażerów.
  Z zewnątrz od razu widać nową sygnaturę świateł z przodu i z tyłu, więc tę wersję łatwo odróżnić od wcześniejszej.
</p>
<p>
  Nadal dostajesz to, po co ludzie wybierają Model Y w <strong>wypożyczalni samochodów elektrycznych</strong>: wysoki bagażnik, możliwość złożenia kanapy do przewozu dłuższych rzeczy oraz drugi schowek pod maską.
  Na trasie liczy się też dostęp do <strong>Superchargera</strong> i przewidywalny koszt energii w porównaniu z autem spalinowym o podobnej przestrzeni.
</p>
<h3 class="text-xl font-bold text-foreground mt-8">Dla kogo jest ten wynajem</h3>
<ul class="list-none pl-0 space-y-3 mt-4">
  <li class="flex items-start gap-2">
    <span class="mt-0.5 inline-block h-5 w-5 shrink-0 rounded-full bg-green-500/20 text-center text-sm leading-5 text-green-600">✓</span>
    <span><strong>Rodzinny wyjazd i bagaż:</strong> dużo miejsca na fotelach i w bagażniku bez potrzeby zmiany klasy pojazdu.</span>
  </li>
  <li class="flex items-start gap-2">
    <span class="mt-0.5 inline-block h-5 w-5 shrink-0 rounded-full bg-green-500/20 text-center text-sm leading-5 text-green-600">✓</span>
    <span><strong>Tesla na doby w Warszawie:</strong> elastyczny okres, od krótkiego testu po dłuższy pobyt w mieście.</span>
  </li>
  <li class="flex items-start gap-2">
    <span class="mt-0.5 inline-block h-5 w-5 shrink-0 rounded-full bg-green-500/20 text-center text-sm leading-5 text-green-600">✓</span>
    <span><strong>Wynajem auta elektrycznego w Warszawie:</strong> spokojne wdrożenie, żeby pierwsze ładowanie i aplikacja były zrozumiałe od startu.</span>
  </li>
  <li class="flex items-start gap-2">
    <span class="mt-0.5 inline-block h-5 w-5 shrink-0 rounded-full bg-green-500/20 text-center text-sm leading-5 text-green-600">✓</span>
    <span><strong>Premium car rental Warsaw electric:</strong> jeden samochód na spotkanie, transfer między lotniskiem a hotelem albo reprezentacyjny przejazd bez spalin.</span>
  </li>
</ul>
<h3 class="text-xl font-bold text-foreground mt-8">Krótkie odpowiedzi na typowe pytania przed rezerwacją</h3>
<p>
  <strong>Czy to wynajem z kierowcą?</strong> Nie. To <strong>tesla bez kierowcy w Warszawie</strong> w rozumieniu klasycznej wypożyczalni: Ty prowadzisz, my oddajemy auto gotowe do jazdy.
</p>
<p>
  <strong>Ile trwa sensowny test?</strong> <strong>Tesla na 2 dni</strong> bywa minimum, żeby sprawdzić auto i w mieście, i na trasie. Jeśli chcesz ocenić koszt energii i komfort na dłużej, <strong>wynajem tesli na tydzień</strong> daje spokojniejszy obraz niż jeden wieczór.
</p>
<p>
  <strong>Na co zwrócić uwagę przy wyborze wypożyczalni?</strong> Porównując <strong>rent Tesla Warsaw</strong>, <strong>tesla wypożyczalnia</strong> albo <strong>wypożyczalnia tesli Warszawa</strong>, sprawdź przede wszystkim przejrzystość warunków i przygotowanie auta. To przekłada się na spokój przy odbiorze i pierwszym ładowaniu, a nie tylko na cenę za dobę.
</p>
<p class="mt-6">
  Zarezerwuj termin w naszej <strong>wypożyczalni Tesla</strong> i zobacz w praktyce, jak <strong>tesla wynajem Warszawa</strong> sprawdza się w codziennym ruchu, na trasie i podczas szybkiego postoju przy ładowarce.
</p>
`.trim(),
};

const TESLA_MODEL_X: RentalLandingPageContent = {
  heroSubtitle: DEFAULT_HERO_SUBTITLE,
  whyLead:
    'Flagowy SUV Tesli z charakterystycznymi drzwiami Falcon Wing, miejscami dla całej rodziny i osiągami aut sportowych. ' +
    'Na wyjazd z dziećmi, reprezentacyjny przejazd lub dłuższą trasę — z przestrzenią i widokiem przez panoramiczną szybę.',
  features: [
    {
      icon: 'bolt',
      title: 'Zasięg i sieć ładowania',
      desc: 'Zasięg do 576 km (WLTP) i szybkie sesje na Superchargerze — duży SUV bez kompromisu na trasie.',
    },
    {
      icon: 'sparkles',
      title: 'Falcon Wing i przestrzeń',
      desc: 'Drzwi tylne ułatwiają wsiadanie w ciasnym miejscu; konfiguracja nawet na 7 osób i bagaż na długie wyjazdy.',
    },
    {
      icon: 'shieldCheck',
      title: 'Bezpieczeństwo i Autopilot',
      desc: 'Solidna konstrukcja, testy zderzeniowe i bogaty pakiet asyst — spokój przy pełnym obciążeniu auta.',
    },
    {
      icon: 'key',
      title: 'Aplikacja Tesla',
      desc: 'Klimatyzacja przed jazdą, status ładowania i dostęp do auta — wszystko z poziomu smartfona.',
    },
  ],
  longDescriptionHtml: `
<h2 class="text-2xl font-bold text-foreground">Wynajem Tesla Model X — luksusowy SUV elektryczny</h2>
<p>
  <strong>Tesla Model X</strong> to propozycja dla osób, które chcą łączyć elektryczną płynność jazdy z przestrzenią
  i efektem „wow” przy otwieraniu drzwi. Jeśli szukasz <strong>tesli na wynajem</strong> w Warszawie z miejscami dla większej grupy
  lub dużym bagażem, Model X sprawdzi się na weekendy, eventy i dłuższe trasy.
</p>
<p>
  <strong>Wypożyczenie modelu X</strong> pozwala też realnie ocenić codzienne użytkowanie dużego SUV-a EV —
  zasięg, ładowanie i komfort podczas dłuższej jazdy. W naszej <strong>wypożyczalni samochodów Tesla</strong> dbamy o to,
  aby auto było przygotowane do drogi i zrozumiale w obsłudze od pierwszych minut.
</p>
<h3 class="text-xl font-bold text-foreground mt-6">Dla kogo jest Model X?</h3>
<ul class="list-none pl-0 space-y-2 mt-4">
  <li class="flex items-start gap-2">
    <span class="mt-0.5 inline-block h-5 w-5 shrink-0 rounded-full bg-green-500/20 text-center text-sm leading-5 text-green-600">✓</span>
    <span><strong>Rodzinne wyjazdy i bagaż</strong> — dużo miejsca na ludzi i rzeczy.</span>
  </li>
  <li class="flex items-start gap-2">
    <span class="mt-0.5 inline-block h-5 w-5 shrink-0 rounded-full bg-green-500/20 text-center text-sm leading-5 text-green-600">✓</span>
    <span><strong>Tesla na doby</strong> — elastyczny wynajem pod konkretny plan.</span>
  </li>
  <li class="flex items-start gap-2">
    <span class="mt-0.5 inline-block h-5 w-5 shrink-0 rounded-full bg-green-500/20 text-center text-sm leading-5 text-green-600">✓</span>
    <span><strong>Wypożyczalnia EV</strong> z jasnymi zasadami i wsparciem dla kierowcy.</span>
  </li>
  <li class="flex items-start gap-2">
    <span class="mt-0.5 inline-block h-5 w-5 shrink-0 rounded-full bg-green-500/20 text-center text-sm leading-5 text-green-600">✓</span>
    <span><strong>Tesla wynajem Warszawa</strong> — dogodne ustalenie terminu.</span>
  </li>
</ul>
<p class="mt-6">
  Zarezerwuj termin i poczuj, jak <strong>wynajem tesli Model X</strong> łączy przestrzeń, technologię i spokojną jazdę bez spalin.
</p>
`.trim(),
};

const TESLA_MODEL_S: RentalLandingPageContent = {
  heroSubtitle: DEFAULT_HERO_SUBTITLE,
  whyLead:
    'Flagowy sedan z legendarnym przyspieszeniem Plaid, długim zasięgiem i limuzynowym komfortem — na reprezentacyjny przejazd, ' +
    'długą trasę albo weekendowy test przed zakupem. Cicha kabina i moc od pierwszego dotknięcia pedału.',
  features: [
    {
      icon: 'bolt',
      title: 'Zasięg i osiągi Plaid',
      desc: 'Zasięg do 634 km (WLTP) i przyspieszenie na poziomie supersamochodu — bez hałasu silnika spalinowego.',
    },
    {
      icon: 'sparkles',
      title: 'Limuzyna i ekran',
      desc: 'Przestrzeń jak w klasie premium, duży ekran i sterowanie — nowoczesne wnętrze pod długie trasy.',
    },
    {
      icon: 'shieldCheck',
      title: 'Bezpieczeństwo',
      desc: 'Zaawansowane systemy wsparcia kierowcy i konstrukcja z myślą o ochronie pasażerów.',
    },
    {
      icon: 'key',
      title: 'Aplikacja Tesla',
      desc: 'Steruj klimatem, zamkami i ładowaniem z telefonu — auto pod kontrolą zanim wsiądziesz.',
    },
  ],
  longDescriptionHtml: `
<h2 class="text-2xl font-bold text-foreground">Wynajem Tesla Model S — flagowy sedan elektryczny</h2>
<p>
  <strong>Tesla Model S</strong> w wersji <strong>Plaid</strong> to jedna z najbardziej rozpoznawalnych limuzyn elektrycznych na świecie.
  Jeśli interesuje Cię <strong>tesla na wynajem</strong> z naciskiem na osiągi, komfort i długi zasięg, ten model pokazuje pełnię możliwości
  marki — od dynamicznej jazdy po spokojną autostradę.
</p>
<p>
  <strong>Wypożyczenie modelu S</strong> to także świetny sposób na <strong>test przed zakupem</strong>: poznasz zachowanie auta w mieście,
  podczas ładowania i na dłuższym odcinku. Jako <strong>wypożyczalnia samochodów Tesla</strong> w Warszawie oferujemy przejrzyste warunki
  i przygotowanie pojazdu do drogi.
</p>
<h3 class="text-xl font-bold text-foreground mt-6">Dlaczego warto wybrać Model S?</h3>
<ul class="list-none pl-0 space-y-2 mt-4">
  <li class="flex items-start gap-2">
    <span class="mt-0.5 inline-block h-5 w-5 shrink-0 rounded-full bg-green-500/20 text-center text-sm leading-5 text-green-600">✓</span>
    <span><strong>Flagowe osiągi i cisza w kabinie</strong> — inna jakość jazdy niż w autach spalinowych.</span>
  </li>
  <li class="flex items-start gap-2">
    <span class="mt-0.5 inline-block h-5 w-5 shrink-0 rounded-full bg-green-500/20 text-center text-sm leading-5 text-green-600">✓</span>
    <span><strong>Tesla na doby</strong> — od krótkiego weekendu po dłuższy okres testowy.</span>
  </li>
  <li class="flex items-start gap-2">
    <span class="mt-0.5 inline-block h-5 w-5 shrink-0 rounded-full bg-green-500/20 text-center text-sm leading-5 text-green-600">✓</span>
    <span><strong>Wypożyczalnia EV</strong> z pomocą przy pierwszej jeździe i ładowaniu.</span>
  </li>
  <li class="flex items-start gap-2">
    <span class="mt-0.5 inline-block h-5 w-5 shrink-0 rounded-full bg-green-500/20 text-center text-sm leading-5 text-green-600">✓</span>
    <span><strong>Tesla wynajem Warszawa</strong> — elastyczne terminy.</span>
  </li>
</ul>
<p class="mt-6">
  Sprawdź, jak <strong>wynajem tesli Model S</strong> sprawdza się w praktyce — moment obrotowy, zasięg i sieć Supercharger w jednym pakiecie.
</p>
`.trim(),
};

const TESLA_CYBERTRUCK: RentalLandingPageContent = {
  heroSubtitle: DEFAULT_HERO_SUBTITLE,
  whyLead:
    'Pikap elektryczny w nadwoziu ze stali nierdzewnej, z przestrzenną skrzynią ładunkową i futurystyczną sylwetką, której nie da się pomylić z niczym innym. ' +
    'Na wyjazd z dużym bagażem, plan filmowy albo po prostu — żeby zobaczyć, jak jeździ legenda.',
  features: [
    {
      icon: 'bolt',
      title: 'Zasięg i ładowanie',
      desc: 'Zasięg do 547 km (WLTP) i szybkie uzupełnianie energii w sieci Tesla — także przy cięższym obciążeniu.',
    },
    {
      icon: 'sparkles',
      title: 'Skrzynia i użyteczność',
      desc: 'Duży bagażnik zamykany, płaska podłoga ładunkowa — transport sprzętu, rowerów czy materiałów bez kompromisu.',
    },
    {
      icon: 'shieldCheck',
      title: 'Konstrukcja i bezpieczeństwo',
      desc: 'Szczególna karoseria i nowoczesne systemy wsparcia — auto zaprojektowane inaczej niż klasyczne pickupy.',
    },
    {
      icon: 'key',
      title: 'Aplikacja Tesla',
      desc: 'Pełna kontrola z aplikacji: klimat, zamek, status baterii — także przy przyczepie czy ładunku.',
    },
  ],
  longDescriptionHtml: `
<h2 class="text-2xl font-bold text-foreground">Wynajem Tesla Cybertruck — elektryczny pikap jak żaden inny</h2>
<p>
  <strong>Tesla Cybertruck</strong> to pojazd, który budzi emocje jeszcze zanim ruszy z miejsca. Jeśli szukasz
  <strong>tesli na wynajem</strong> z maksymalną użytecznością i charakterem — Cybertruck łączy elektryczny napęd,
  dużą skrzynię ładunkową i design, którego nie powstydziłaby się przyszłościowa flota.
</p>
<p>
  <strong>Wypożyczenie Cybertrucka</strong> sprawdza się przy wyjazdach z dużym bagażem, planach wymagających przestrzeni ładunkowej
  oraz jako wyjątkowa atrakcja na event. W naszej <strong>wypożyczalni samochodów Tesla</strong> pomagamy w obsłudze auta,
  żeby pierwsze kilometry były spokojne mimo nietypowych wymiarów nadwozia.
</p>
<h3 class="text-xl font-bold text-foreground mt-6">Co wyróżnia Cybertrucka?</h3>
<ul class="list-none pl-0 space-y-2 mt-4">
  <li class="flex items-start gap-2">
    <span class="mt-0.5 inline-block h-5 w-5 shrink-0 rounded-full bg-green-500/20 text-center text-sm leading-5 text-green-600">✓</span>
    <span><strong>Elektryczny pikap</strong> — moment obrotowy i brak spalin przy dużej masie.</span>
  </li>
  <li class="flex items-start gap-2">
    <span class="mt-0.5 inline-block h-5 w-5 shrink-0 rounded-full bg-green-500/20 text-center text-sm leading-5 text-green-600">✓</span>
    <span><strong>Tesla na doby</strong> — dopasuj okres do planu wyjazdu.</span>
  </li>
  <li class="flex items-start gap-2">
    <span class="mt-0.5 inline-block h-5 w-5 shrink-0 rounded-full bg-green-500/20 text-center text-sm leading-5 text-green-600">✓</span>
    <span><strong>Wypożyczalnia EV</strong> z przejrzystymi zasadami i wsparciem kierowcy.</span>
  </li>
  <li class="flex items-start gap-2">
    <span class="mt-0.5 inline-block h-5 w-5 shrink-0 rounded-full bg-green-500/20 text-center text-sm leading-5 text-green-600">✓</span>
    <span><strong>Tesla wynajem Warszawa</strong> — dogodne ustalenie terminu.</span>
  </li>
</ul>
<p class="mt-6">
  Zarezerwuj i przekonaj się na własne oczy, jak <strong>wynajem tesli Cybertruck</strong> zmienia perspektywę na elektryczne auta użytkowe.
</p>
`.trim(),
};

export const RENTAL_LANDING_PAGE_CONTENT: Record<string, RentalLandingPageContent> = {
  'tesla-3-highland': TESLA_3_HIGHLAND,
  'tesla-y-juniper': TESLA_Y_JUNIPER,
  'tesla-x': TESLA_MODEL_X,
  'tesla-s': TESLA_MODEL_S,
  'tesla-cybertruck': TESLA_CYBERTRUCK,
};

function applyLandingPlaceholders(text: string, carName: string, range: string): string {
  return text.replace(/\{carName\}/g, carName).replace(/\{range\}/g, range);
}

/**
 * Treść marketingowa landing `/wypozycz/:carId`.
 * Brak wpisu w mapie → `DEFAULT_RENTAL_LANDING_PAGE_CONTENT` z podstawieniem `{carName}` / `{range}`.
 */
export function getRentalLandingPageContent(
  carId: string,
  carFleetName: string,
  fleetRangeLabel: string,
): RentalLandingPageContent {
  const base = RENTAL_LANDING_PAGE_CONTENT[carId] ?? DEFAULT_RENTAL_LANDING_PAGE_CONTENT;
  const range = fleetRangeLabel || '—';

  return {
    ...base,
    heroSubtitle: base.heroSubtitle ?? DEFAULT_HERO_SUBTITLE,
    whyHeading: base.whyHeading ?? `Dlaczego ${carFleetName}?`,
    whyLead: applyLandingPlaceholders(base.whyLead, carFleetName, range),
    features: [
      {
        ...base.features[0],
        desc: applyLandingPlaceholders(base.features[0].desc, carFleetName, range),
      },
      {
        ...base.features[1],
        desc: applyLandingPlaceholders(base.features[1].desc, carFleetName, range),
      },
      {
        ...base.features[2],
        desc: applyLandingPlaceholders(base.features[2].desc, carFleetName, range),
      },
      {
        ...base.features[3],
        desc: applyLandingPlaceholders(base.features[3].desc, carFleetName, range),
      },
    ],
    longDescriptionHtml: applyLandingPlaceholders(base.longDescriptionHtml, carFleetName, range),
  };
}
