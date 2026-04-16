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
    'Tesla Model 3 Highland to więcej niż auto — to komputer na kołach oferujący prawdziwie elektryczne emocje. Idealny na weekendowy wypad, ważne spotkanie biznesowe lub próbę przed zakupem. Oferujemy krótkoterminowy wynajem Tesli w Warszawie na dni, tygodnie, weekendy, święta albo miesiące, z elastycznymi pakietami dopasowanymi do Twoich potrzeb.',
  features: [
    {
      icon: 'bolt',
      title: 'Zasięg i ładowanie',
      desc:
        'Najnowszy Model 3 Highland w wersji Long Range osiąga realny zasięg do 629 km (WLTP) [oai_citation:6‡teslaoracle.com](https://www.teslaoracle.com/2023/09/01/tesla-launches-model-3-highland-refresh-in-china-and-europe-with-improved-range-charging-new-wheels-and-rear-screen-as-standard/#:~:text=Tesla%20is%20offering%202%20variants,the%20Model%203%20Highland%20yet). W 15 minut doładujesz około 280 km [oai_citation:7‡teslaoracle.com](https://www.teslaoracle.com/2023/09/01/tesla-launches-model-3-highland-refresh-in-china-and-europe-with-improved-range-charging-new-wheels-and-rear-screen-as-standard/#:~:text=The%20other%20more%20interesting%20spec,in%20just%2015%20minutes), a sieć Supercharger w Polsce i Europie pozwala szybko uzupełnić energię w trasie.',
    },
    {
      icon: 'sparkles',
      title: 'Komfort Highland',
      desc:
        'Standardowo wentylowane fotele chłodzą w upalne dni, a akustyczne szyby i dodatkowe wygłuszenie sprawiają, że kabina jest nawet 20 % cichsza [oai_citation:8‡motortrend.com](https://www.motortrend.com/reviews/2024-tesla-model-3-highland-interior-review#:~:text=Ventilated%20Seats%20and%20Premium%20Material). Lepsze materiały, oświetlenie ambient i 8‑calowy ekran dla pasażerów z tyłu tworzą relaksującą atmosferę [oai_citation:9‡motortrend.com](https://www.motortrend.com/reviews/2024-tesla-model-3-highland-interior-review#:~:text=Ventilated%20Seats%20and%20Premium%20Material).',
    },
    {
      icon: 'shieldCheck',
      title: 'Bezpieczeństwo',
      desc:
        'Model 3 zdobył pięć gwiazdek w testach Euro NCAP i NHTSA [oai_citation:10‡recharged.com](https://recharged.com/articles/tesla-model-3-safety-rating-crash-test#:~:text=The%20Tesla%20Model%203%20has,new%20or%20used%20in%202026). Zaawansowane systemy wspomagające kierowcę, w tym Autopilot, aktywne hamowanie awaryjne oraz asystent utrzymania pasa, pomagają unikać kolizji i dbają o bezpieczeństwo pasażerów.',
    },
    {
      icon: 'key',
      title: 'Dostęp przez aplikację',
      desc:
        'Telefon zastępuje kluczyk — możesz zablokować i odblokować auto, ustawić klimatyzację przed jazdą, sprawdzić zasięg i włączyć tryb Dog Mode. Aplikacja Tesla pozwala też monitorować ładowanie i zapewnia zdalne wsparcie [oai_citation:11‡tesla.com](https://www.tesla.com/model3#:~:text=,phone%20with%20the%20Tesla%20app).',
    },
  ],
  longDescriptionHtml: `
<h2 class="text-2xl font-bold text-foreground">Wypożyczalnia Tesla 3 Highland w Warszawie — przyszłość w zasięgu ręki</h2>
<p>
  Jeśli interesuje Cię <strong>tesla na wynajem w Warszawie</strong>, trafiłeś we właściwe miejsce.
  Nasz <strong>Tesla Model 3 Highland</strong> to odświeżona wersja bestsellera, która zachwyca cichszą kabiną,
  lepszym zawieszeniem i materiałami premium. <strong>Wypożyczalnia samochodów elektrycznych</strong> powinna oferować więcej
  niż standardowy samochód – u nas dostajesz komputer na kołach o zasięgu godnym dalekich tras. Wynajem samochodu
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
  szyby sprawiają, że w środku jest nawet 20 % ciszej, niż w poprzedniej generacji<strong> [oai_citation:12‡motortrend.com](https://www.motortrend.com/reviews/2024-tesla-model-3-highland-interior-review#:~:text=Ventilated%20Seats%20and%20Premium%20Material)</strong>.
  Lepsze materiały, ambientowe oświetlenie i nowy 8‑calowy ekran dla pasażerów z tyłu dodają elegancji i wygody<strong> [oai_citation:13‡motortrend.com](https://www.motortrend.com/reviews/2024-tesla-model-3-highland-interior-review#:~:text=Ventilated%20Seats%20and%20Premium%20Material)</strong>.
  Model 3 Long Range ma zasięg do 629 km (WLTP)<strong> [oai_citation:14‡teslaoracle.com](https://www.teslaoracle.com/2023/09/01/tesla-launches-model-3-highland-refresh-in-china-and-europe-with-improved-range-charging-new-wheels-and-rear-screen-as-standard/#:~:text=Tesla%20is%20offering%202%20variants,the%20Model%203%20Highland%20yet)</strong>, a w 15 minut uzupełnisz energię na około 280 km<strong> [oai_citation:15‡teslaoracle.com](https://www.teslaoracle.com/2023/09/01/tesla-launches-model-3-highland-refresh-in-china-and-europe-with-improved-range-charging-new-wheels-and-rear-screen-as-standard/#:~:text=The%20other%20more%20interesting%20spec,in%20just%2015%20minutes)</strong> – idealne na spontaniczne wypady.
</p>
<p>
  Bezpieczeństwo to kolejny powód, dla którego <strong>wynajem tesli 3</strong> cieszy się tak dużą popularnością. Auto zdobyło pięć
  gwiazdek w testach Euro NCAP i NHTSA<strong> [oai_citation:16‡recharged.com](https://recharged.com/articles/tesla-model-3-safety-rating-crash-test#:~:text=The%20Tesla%20Model%203%20has,new%20or%20used%20in%202026)</strong>, a systemy wspomagające kierowcę pomagają uniknąć kolizji.
  Autopilot, aktywne hamowanie awaryjne oraz system utrzymania pasa czynią podróż pewną i relaksującą.
</p>
<h3 class="text-xl font-bold text-foreground mt-6">Dlaczego warto wybrać naszą ofertę?</h3>
<ul class="list-none pl-0 space-y-2 mt-4">
  <li class="flex items-start gap-2">
    <span class="mt-0.5 inline-block h-5 w-5 shrink-0 rounded-full bg-green-500/20 text-center text-sm leading-5 text-green-600">✓</span>
    <span><strong>Tesla wynajem Warszawa</strong> — odbiór w centrum miasta lub na Lotnisku Chopina.</span>
  </li>
  <li class="flex items-start gap-2">
    <span class="mt-0.5 inline-block h-5 w-5 shrink-0 rounded-full bg-green-500/20 text-center text-sm leading-5 text-green-600">✓</span>
    <span><strong>Tesla na doby</strong> — idealna na śluby, eventy, weekendy czy wakacje.</span>
  </li>
  <li class="flex items-start gap-2">
    <span class="mt-0.5 inline-block h-5 w-5 shrink-0 rounded-full bg-green-500/20 text-center text-sm leading-5 text-green-600">✓</span>
    <span><strong>Wypożyczalnia EV</strong> z pełnym wsparciem, szkoleniem i odpowiedziami na pytania.</span>
  </li>
  <li class="flex items-start gap-2">
    <span class="mt-0.5 inline-block h-5 w-5 shrink-0 rounded-full bg-green-500/20 text-center text-sm leading-5 text-green-600">✓</span>
    <span>Możliwość opcji <strong>tesla w abonamencie</strong> dla firm — wygodna forma dłuższego wynajmu.</span>
  </li>
</ul>
<p class="mt-6">
  Skontaktuj się z nami, aby zarezerwować <strong>teslę do wynajęcia</strong> w stolicy.
  Możesz odebrać samochód w centrum Warszawy lub na Lotnisku Chopina, a my zadbamy o to, by auto było naładowane,
  czyste i gotowe do drogi. Nasza <strong>wypożyczalnia tesla 3</strong> gwarantuje pełne wsparcie, instruktaż i aplikację,
  która zamieni Twój telefon w kluczyk i pilot do sterowania klimatem<strong> [oai_citation:17‡tesla.com](https://www.tesla.com/model3#:~:text=,phone%20with%20the%20Tesla%20app)</strong>. Przekonaj się,
  jak proste może być wynajęcie samochodu elektrycznego w Warszawie.
</p>
  `.trim(),
};

const TESLA_Y_JUNIPER: RentalLandingPageContent = {
  heroSubtitle: DEFAULT_HERO_SUBTITLE,
  whyLead:
    'SUV elektryczny z ogromnym bagażnikiem, panoramicznym szkłem i kulturą jazdy Tesli — na rodzinny wyjazd, ' +
    'przeprowadzkę sprzętu lub reprezentacyjną trasę. Model Y po liftingu Juniper łączy przestrzeń z nowoczesnym designem.',
  features: [
    {
      icon: 'bolt',
      title: 'Zasięg i Supercharger',
      desc: 'Długi zasięg na trasie i szybkie doładowania w sieci Tesla — mniej postojów, więcej kilometrów.',
    },
    {
      icon: 'sparkles',
      title: 'Przestrzeń i wnętrze Juniper',
      desc: 'Kabina po odświeżeniu: lepsze materiały, cichsza jazda i większy komfort dla całej rodziny.',
    },
    {
      icon: 'shieldCheck',
      title: 'Bezpieczeństwo i Autopilot',
      desc: 'Konstrukcja z myślą o ochronie pasażerów oraz zaawansowane systemy wspomagania kierowcy.',
    },
    {
      icon: 'key',
      title: 'Aplikacja i bagażnik',
      desc: 'Pilotuj auto z telefonu; tylna kanapa i bagażnik łatwo adaptujesz pod rowery, narty czy walizki.',
    },
  ],
  longDescriptionHtml: `
<h2 class="text-2xl font-bold text-foreground">Wynajem Tesla Model Y Juniper — SUV elektryczny pod Twój plan</h2>
<p>
  Szukasz <strong>tesli na wynajem</strong> z dużą przestrzenią? <strong>Tesla Model Y</strong> w wersji po liftingu
  <strong>Juniper</strong> to propozycja dla osób, które chcą łączyć codzienne auto z rodzinnymi wyjazdami i wygodnym bagażem.
  W naszej <strong>wypożyczalni samochodów Tesla</strong> w Warszawie przygotowujemy auto tak, byś od pierwszej chwili mógł skupić się na jeździe.
</p>
<p>
  <strong>Wypożyczenie modelu Y</strong> sprawdza się przy weekendowych trasach, transporcie większego sprzętu oraz wyjazdach służbowych,
  gdy liczy się komfort pasażerów i spokój w kabinie. To także świetny sposób na <strong>test przed zakupem</strong> —
  poznasz zasięg w realnych warunkach, ładowanie i codzienną obsługę auta.
</p>
<h3 class="text-xl font-bold text-foreground mt-6">Co zyskujesz wybierając Model Y?</h3>
<ul class="list-none pl-0 space-y-2 mt-4">
  <li class="flex items-start gap-2">
    <span class="mt-0.5 inline-block h-5 w-5 shrink-0 rounded-full bg-green-500/20 text-center text-sm leading-5 text-green-600">✓</span>
    <span><strong>Duży bagażnik i tylna kanapa</strong> — elastyczna przestrzeń na bagaż i pasażerów.</span>
  </li>
  <li class="flex items-start gap-2">
    <span class="mt-0.5 inline-block h-5 w-5 shrink-0 rounded-full bg-green-500/20 text-center text-sm leading-5 text-green-600">✓</span>
    <span><strong>Tesla na doby</strong> — krótki wynajem na wyjazd lub dłuższy okres testowy.</span>
  </li>
  <li class="flex items-start gap-2">
    <span class="mt-0.5 inline-block h-5 w-5 shrink-0 rounded-full bg-green-500/20 text-center text-sm leading-5 text-green-600">✓</span>
    <span><strong>Wypożyczalnia EV</strong> z jasnymi zasadami i wsparciem przy pierwszym kontakcie z autem.</span>
  </li>
  <li class="flex items-start gap-2">
    <span class="mt-0.5 inline-block h-5 w-5 shrink-0 rounded-full bg-green-500/20 text-center text-sm leading-5 text-green-600">✓</span>
    <span><strong>Tesla wynajem Warszawa</strong> — dogodne terminy i przygotowanie auta do drogi.</span>
  </li>
</ul>
<p class="mt-6">
  Zarezerwuj termin i przekonaj się, jak <strong>wynajem tesli Model Y</strong> sprawdza się w praktyce —
  cisza, moment obrotowy od startu i sieć Supercharger, gdy planujesz dłuższą trasę.
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
