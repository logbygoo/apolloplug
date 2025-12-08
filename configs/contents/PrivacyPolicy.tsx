import React from 'react';
import { COMPANY_DETAILS } from '../companyDetails';

export const PrivacyPolicyContent = (
  <div className="privacy-content">

    <style>{`
      .privacy-content {
        padding: 20px;
        font-family: Arial, Helvetica, sans-serif;
        font-size: 12px;
        color: #000;
        line-height: 1.45;
        box-sizing: border-box;
      }

      .privacy-content h1 {
        text-align: center;
        font-size: 22px;
        margin-bottom: 10px;
        font-weight: 700;
        text-transform: uppercase;
      }

      .privacy-content h2 {
        font-size: 16px;
        margin-top: 20px;
        margin-bottom: 6px;
        font-weight: 700;
      }

      .privacy-content h3 {
        font-size: 14px;
        margin-top: 14px;
        margin-bottom: 4px;
        font-weight: 700;
      }

      .privacy-content p {
        margin: 6px 0;
      }

      .privacy-content ol {
        margin: 6px 0 6px 20px;
        padding: 0;
      }

      .privacy-content li {
        margin-bottom: 4px;
      }
    `}</style>

    <h1>Polityka Prywatności</h1>

    <p>Niniejsza Polityka Prywatności określa zasady przetwarzania danych osobowych użytkowników serwisu <strong>{COMPANY_DETAILS.website}</strong>, prowadzonego przez <strong>{COMPANY_DETAILS.name}</strong>, z siedzibą przy <strong>{COMPANY_DETAILS.address}</strong>, wpisaną do KRS pod numerem <strong>{COMPANY_DETAILS.krs}</strong>, NIP <strong>{COMPANY_DETAILS.nip}</strong>, REGON <strong>{COMPANY_DETAILS.regon}</strong>.</p>

    <h2>1. Postanowienia ogólne</h2>
    <ol>
      <li><strong>1.1</strong> Administratorem danych osobowych jest <strong>{COMPANY_DETAILS.name}</strong>, dalej nazywana Administratorem.</li>
      <li><strong>1.2</strong> Kontakt z Administratorem jest możliwy pod adresem e-mail: <strong>{COMPANY_DETAILS.email}</strong> lub telefonicznie pod numerem <strong>{COMPANY_DETAILS.phone}</strong>.</li>
      <li><strong>1.3</strong> Dane osobowe są przetwarzane zgodnie z RODO oraz innymi obowiązującymi przepisami o ochronie danych osobowych.</li>
      <li><strong>1.4</strong> Korzystając z serwisu użytkownik akceptuje zasady opisane w niniejszej polityce.</li>
    </ol>

    <h2>2. Zakres przetwarzanych danych</h2>
    <ol>
      <li><strong>2.1</strong> Administrator może przetwarzać następujące dane:
        <ol>
          <li><strong>2.1.1</strong> dane identyfikacyjne (imię, nazwisko),</li>
          <li><strong>2.1.2</strong> dane kontaktowe (adres e-mail, numer telefonu),</li>
          <li><strong>2.1.3</strong> dane dotyczące aktywności w serwisie,</li>
          <li><strong>2.1.4</strong> dane techniczne, takie jak adres IP, rodzaj urządzenia, pliki cookies.</li>
        </ol>
      </li>
      <li><strong>2.2</strong> Dane są przekazywane dobrowolnie, ale ich brak może ograniczyć korzystanie z niektórych funkcjonalności serwisu.</li>
    </ol>

    <h2>3. Cele przetwarzania danych</h2>
    <ol>
      <li><strong>3.1</strong> Dane osobowe przetwarzane są w celu:
        <ol>
          <li><strong>3.1.1</strong> zapewnienia prawidłowego funkcjonowania serwisu,</li>
          <li><strong>3.1.2</strong> obsługi zapytań kierowanych do Administratora,</li>
          <li><strong>3.1.3</strong> marketingu usług Administratora,</li>
          <li><strong>3.1.4</strong> analityki oraz statystyk dotyczących korzystania z serwisu.</li>
        </ol>
      </li>
      <li><strong>3.2</strong> Przetwarzanie danych opiera się na prawnie uzasadnionym interesie Administratora lub zgodzie użytkownika.</li>
    </ol>

    <h2>4. Podstawy prawne przetwarzania</h2>
    <ol>
      <li><strong>4.1</strong> Artykuł 6 ust. 1 lit. a RODO – dobrowolna zgoda użytkownika.</li>
      <li><strong>4.2</strong> Artykuł 6 ust. 1 lit. b RODO – wykonanie umowy lub działania zmierzające do jej zawarcia.</li>
      <li><strong>4.3</strong> Artykuł 6 ust. 1 lit. f RODO – prawnie uzasadniony interes Administratora, m.in. marketing, analiza ruchu i poprawa usług.</li>
    </ol>

    <h2>5. Udostępnianie danych</h2>
    <ol>
      <li><strong>5.1</strong> Dane mogą być przekazywane:
        <ol>
          <li><strong>5.1.1</strong> podmiotom świadczącym usługi hostingowe i techniczne,</li>
          <li><strong>5.1.2</strong> firmom zapewniającym obsługę płatności,</li>
          <li><strong>5.1.3</strong> podmiotom wspierającym Administratora w analizie statystycznej.</li>
        </ol>
      </li>
      <li><strong>5.2</strong> Dane nie są sprzedawane osobom trzecim.</li>
      <li><strong>5.3</strong> Administrator nie przekazuje danych poza Europejski Obszar Gospodarczy, chyba że wynika to z usług zewnętrznych narzędzi (np. Google), o czym użytkownik jest informowany.</li>
    </ol>

    <h2>6. Okres przechowywania danych</h2>
    <ol>
      <li><strong>6.1</strong> Dane przetwarzane na podstawie zgody – do czasu jej wycofania.</li>
      <li><strong>6.2</strong> Dane przetwarzane w celach analitycznych – do 24 miesięcy.</li>
      <li><strong>6.3</strong> Dane związane z rozliczeniami – zgodnie z obowiązującymi przepisami podatkowymi.</li>
    </ol>

    <h2>7. Prawa użytkownika</h2>
    <ol>
      <li><strong>7.1</strong> Użytkownik ma prawo do:
        <ol>
          <li><strong>7.1.1</strong> dostępu do swoich danych,</li>
          <li><strong>7.1.2</strong> sprostowania danych,</li>
          <li><strong>7.1.3</strong> usunięcia danych („prawo do bycia zapomnianym”),</li>
          <li><strong>7.1.4</strong> ograniczenia przetwarzania,</li>
          <li><strong>7.1.5</strong> przenoszenia danych,</li>
          <li><strong>7.1.6</strong> wniesienia sprzeciwu wobec przetwarzania,</li>
          <li><strong>7.1.7</strong> wycofania zgody w dowolnym momencie.</li>
        </ol>
      </li>
      <li><strong>7.2</strong> Realizacja praw możliwa jest poprzez kontakt pod adresem <strong>{COMPANY_DETAILS.email}</strong>.</li>
    </ol>

    <h2>8. Pliki cookies</h2>
    <ol>
      <li><strong>8.1</strong> Serwis korzysta z plików cookies w celach poprawy działania strony i analityki.</li>
      <li><strong>8.2</strong> Użytkownik może zmienić ustawienia cookies w przeglądarce.</li>
      <li><strong>8.3</strong> Ograniczenie obsługi cookies może wpłynąć na funkcjonowanie serwisu.</li>
    </ol>

    <h2>9. Środki bezpieczeństwa</h2>
    <ol>
      <li><strong>9.1</strong> Administrator stosuje środki techniczne i organizacyjne zapewniające ochronę danych.</li>
      <li><strong>9.2</strong> Dane są zabezpieczone przed dostępem osób nieuprawnionych, szyfrowane i chronione zgodnie ze standardami branżowymi.</li>
    </ol>

    <h2>10. Zmiany polityki prywatności</h2>
    <ol>
      <li><strong>10.1</strong> Administrator zastrzega sobie prawo do zmian niniejszej polityki.</li>
      <li><strong>10.2</strong> Zmiany wchodzą w życie z chwilą publikacji na stronie <strong>{COMPANY_DETAILS.website}</strong>.</li>
    </ol>

    <h2>11. Kontakt</h2>
    <p>W sprawach dotyczących danych osobowych prosimy o kontakt: <strong>{COMPANY_DETAILS.email}</strong>.</p>

  </div>
);