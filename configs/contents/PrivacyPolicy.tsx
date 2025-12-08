import React from 'react';
import { COMPANY_DETAILS } from '../companyDetails';

export const PrivacyPolicyContent = (
  <div className="privacy-content">
    <style>{`
      .privacy-content {
        padding: 50px;
        font-family: Arial, Helvetica, sans-serif;
        font-size: 12px;
        line-height: 1.5;
        color: #000;
        background: #fff;
        box-sizing: border-box;
        word-break: break-word;
      }

      .privacy-content h1 {
        font-size: 20px;
        text-align: center;
        margin-bottom: 10px;
        font-weight: 700;
        text-transform: uppercase;
      }

      .privacy-content h2 {
        font-size: 16px;
        margin-top: 22px;
        margin-bottom: 8px;
        font-weight: 700;
      }

      .privacy-content h3 {
        font-size: 14px;
        margin-top: 18px;
        margin-bottom: 6px;
        font-weight: 700;
      }

      .privacy-content p {
        margin: 6px 0;
      }

      .privacy-content ol {
        margin: 6px 0 6px 16px;
        padding: 0;
      }

      .privacy-content ol li {
        margin: 4px 0;
      }
    `}</style>

    <h1>Polityka prywatności i klauzula informacyjna RODO</h1>

    <p>
      Niniejsza Polityka prywatności określa zasady przetwarzania danych osobowych użytkowników serwisu <strong>{COMPANY_DETAILS.website}</strong>, 
      prowadzonego przez <strong>{COMPANY_DETAILS.name}</strong> z siedzibą przy <strong>{COMPANY_DETAILS.address}</strong>, 
      wpisaną do KRS pod numerem <strong>{COMPANY_DETAILS.krs}</strong>, NIP: <strong>{COMPANY_DETAILS.nip}</strong>, REGON: <strong>{COMPANY_DETAILS.regon}</strong>.
    </p>

    <h2>1. Administrator danych osobowych</h2>

    <p>
      1.1. Administratorem danych osobowych jest <strong>{COMPANY_DETAILS.name}</strong>, z siedzibą przy 
      <strong> {COMPANY_DETAILS.address}</strong>, e-mail: <strong>{COMPANY_DETAILS.email}</strong>, tel.: <strong>{COMPANY_DETAILS.phone}</strong>.
    </p>

    <p>
      1.2. Administrator przetwarza dane zgodnie z rozporządzeniem Parlamentu Europejskiego i Rady (UE) 2016/679 (RODO).
    </p>

    <h2>2. Zakres przetwarzanych danych</h2>

    <p>2.1. W ramach korzystania z serwisu mogą być przetwarzane następujące dane:</p>

    <ol>
      <li>2.1.1. Dane identyfikacyjne: imię, nazwisko, nazwa firmy.</li>
      <li>2.1.2. Dane kontaktowe: adres e-mail, numer telefonu.</li>
      <li>2.1.3. Dane techniczne: adres IP, logi serwera, dane o urządzeniu i przeglądarce.</li>
      <li>2.1.4. Dane podawane dobrowolnie w formularzach, m.in. zapytania, rejestracje, korespondencja.</li>
      <li>2.1.5. Dane związane z realizacją umów oraz obsługą zgłoszeń.</li>
    </ol>

    <h2>3. Cele i podstawy prawne przetwarzania danych</h2>

    <p>3.1. Dane przetwarzane są w następujących celach:</p>

    <ol>
      <li>3.1.1. Realizacja usług świadczonych drogą elektroniczną (art. 6 ust. 1 lit. b RODO).</li>
      <li>3.1.2. Obsługa kontaktu i odpowiedzi na zapytania użytkowników (art. 6 ust. 1 lit. f RODO).</li>
      <li>3.1.3. Realizacja obowiązków prawnych ciążących na Administratorze (art. 6 ust. 1 lit. c RODO).</li>
      <li>3.1.4. Marketing własny Administratora, w tym wysyłka newslettera – na podstawie zgody (art. 6 ust. 1 lit. a RODO).</li>
      <li>3.1.5. Ustalenie, dochodzenie lub obrona roszczeń (art. 6 ust. 1 lit. f RODO).</li>
      <li>3.1.6. Analiza statystyczna korzystania z serwisu (art. 6 ust. 1 lit. f RODO).</li>
    </ol>

    <h2>4. Odbiorcy danych</h2>

    <p>4.1. Dane mogą być przekazywane:</p>

    <ol>
      <li>4.1.1. Dostawcom usług IT obsługujących serwis oraz infrastrukturę techniczną.</li>
      <li>4.1.2. Podmiotom świadczącym usługi księgowe, prawne i doradcze.</li>
      <li>4.1.3. Operatorom płatności i usługom finansowym (jeśli dotyczy).</li>
      <li>4.1.4. Podmiotom przetwarzającym dane na podstawie umów powierzenia RODO.</li>
      <li>4.1.5. Organom publicznym — wyłącznie, jeśli przepisy tego wymagają.</li>
    </ol>

    <h2>5. Okres przechowywania danych</h2>

    <p>5.1. Dane są przetwarzane przez okres niezbędny do realizacji celów, a następnie przez:</p>

    <ol>
      <li>5.1.1. Okres trwania współpracy lub obsługi zgłoszenia.</li>
      <li>5.1.2. Do 6 lat dla celów podatkowych i księgowych.</li>
      <li>5.1.3. Do 3 lat w przypadku roszczeń cywilnych.</li>
      <li>5.1.4. Do momentu cofnięcia zgody — jeśli przetwarzanie odbywa się na podstawie zgody.</li>
    </ol>

    <h2>6. Prawa osób, których dane dotyczą</h2>

    <p>6.1. Masz prawo do:</p>

    <ol>
      <li>6.1.1. Dostępu do swoich danych.</li>
      <li>6.1.2. Sprostowania danych.</li>
      <li>6.1.3. Usunięcia danych (prawo do bycia zapomnianym).</li>
      <li>6.1.4. Ograniczenia przetwarzania.</li>
      <li>6.1.5. Przenoszenia danych.</li>
      <li>6.1.6. Sprzeciwu wobec przetwarzania danych.</li>
      <li>6.1.7. Cofnięcia zgody w dowolnym momencie, bez wpływu na zgodność wcześniejszego przetwarzania.</li>
      <li>6.1.8. Złożenia skargi do Prezesa UODO.</li>
    </ol>

    <h2>7. Przekazywanie danych poza EOG</h2>

    <p>
      7.1. Dane nie są przekazywane poza Europejski Obszar Gospodarczy, chyba że wymaga tego korzystanie z usług dostawców 
      technologicznych (np. systemów mailingowych, hostingowych) zapewniających zgodność z RODO (m.in. standardowe klauzule umowne).
    </p>

    <h2>8. Zasady bezpieczeństwa danych</h2>

    <p>8.1. Administrator stosuje środki techniczne i organizacyjne zapewniające ochronę danych, w tym:</p>

    <ol>
      <li>8.1.1. Szyfrowanie połączeń (SSL/HTTPS).</li>
      <li>8.1.2. Systemy kontroli dostępu i uwierzytelniania.</li>
      <li>8.1.3. Regularne kopie zapasowe.</li>
      <li>8.1.4. Procedury zapobiegania wyciekom danych.</li>
      <li>8.1.5. Minimalizacja zakresu przetwarzania.</li>
    </ol>

    <h2>9. Pliki cookies</h2>

    <p>
      9.1. Serwis wykorzystuje pliki cookies w celu zapewnienia poprawnego działania strony, analizy statystycznej, 
      personalizacji treści oraz celów marketingowych.
    </p>

    <p>9.2. Rodzaje stosowanych cookies:</p>

    <ol>
      <li>9.2.1. Cookies techniczne – niezbędne do działania serwisu.</li>
      <li>9.2.2. Cookies analityczne – pomagają analizować statystyki odwiedzin.</li>
      <li>9.2.3. Cookies marketingowe – pozwalają na wyświetlanie reklam dopasowanych do użytkownika.</li>
    </ol>

    <p>9.3. Użytkownik może zmienić ustawienia cookies w przeglądarce.</p>

    <h2>10. Zautomatyzowane podejmowanie decyzji</h2>

    <p>
      10.1. Dane użytkowników nie są wykorzystywane do podejmowania decyzji w sposób zautomatyzowany ani do profilowania, 
      które wywoływałoby skutki prawne.
    </p>

    <h2>11. Klauzula informacyjna RODO</h2>

    <p>
      11.1. Administrator informuje, że podanie danych jest dobrowolne, ale w niektórych przypadkach może być niezbędne 
      do realizacji usług, obsługi zapytań lub wykonania umowy.
    </p>

    <p>
      11.2. Dane mogą być przetwarzane również na podstawie uzasadnionego interesu Administratora, m.in. w celu zabezpieczenia roszczeń, 
      zapewnienia bezpieczeństwa usług oraz prowadzenia marketingu własnego.
    </p>

    <p>
      11.3. Administrator nie sprzedaje, nie udostępnia i nie przekazuje danych osobowych podmiotom nieuprawnionym.
    </p>

    <h2>12. Zmiany Polityki prywatności</h2>

    <p>
      12.1. Administrator zastrzega sobie prawo do zmiany niniejszej Polityki prywatności. 
      Aktualna wersja będzie zawsze publikowana na stronie <strong>{COMPANY_DETAILS.website}</strong>.
    </p>

    <h2>13. Kontakt w sprawach danych osobowych</h2>

    <p>
      13.1. W sprawach dotyczących ochrony danych osobowych można kontaktować się pod adresem:
      <br />
      <strong>{COMPANY_DETAILS.email}</strong> lub telefonicznie <strong>{COMPANY_DETAILS.phone}</strong>.
    </p>
  </div>
);