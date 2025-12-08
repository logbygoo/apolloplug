
import React from 'react';

export interface DocumentContent {
  title: string;
  slug: string; // Used for URL params and PDF route
  content: React.ReactNode;
}

export const DOCUMENTS_DATA: DocumentContent[] = [
  {
    title: 'Regulamin apolloplug',
    slug: 'regulamin-apolloplug',
    content: (
      <>
        <h1>Regulamin Serwisu ApolloPlug.com</h1>
        <p><strong>Data wejścia w życie: 01.03.2025</strong></p>
        
        <h2>§1. Postanowienia ogólne</h2>
        <p>1. Niniejszy regulamin określa zasady korzystania z serwisu internetowego dostępnego pod adresem apolloplug.com.</p>
        <p>2. Właścicielem serwisu jest firma forfinance sp. z o.o. z siedzibą w Warszawie.</p>
        <p>3. Serwis umożliwia rezerwację samochodów elektrycznych, zamawianie transferów oraz zapoznanie się z ofertą handlową.</p>

        <h2>§2. Rezerwacje</h2>
        <p>1. Użytkownik może dokonać rezerwacji pojazdu poprzez formularz dostępny na stronie.</p>
        <p>2. Rezerwacja staje się wiążąca po potwierdzeniu jej przez Administratora drogą mailową.</p>

        <h2>§3. Płatności</h2>
        <p>1. Ceny podane w serwisie są cenami brutto (zawierają podatek VAT), chyba że wskazano inaczej.</p>
        <p>2. Dostępne metody płatności obejmują: karty płatnicze, przelewy tradycyjne oraz systemy szybkich płatności.</p>

        <h2>§4. Ochrona danych osobowych</h2>
        <p>1. Administratorem danych osobowych jest Usługodawca.</p>
        <p>2. Szczegóły dotyczące przetwarzania danych znajdują się w Polityce Prywatności.</p>
        
        <h2>§5. Postanowienia końcowe</h2>
        <p>1. W sprawach nieuregulowanych niniejszym regulaminem mają zastosowanie przepisy Kodeksu Cywilnego.</p>
      </>
    )
  },
  {
    title: 'Polityka prywatności',
    slug: 'polityka-prywatnosci',
    content: (
      <>
        <h1>Polityka Prywatności</h1>
        
        <h2>1. Kto jest administratorem danych?</h2>
        <p>Administratorem Twoich danych osobowych jest forfinance sp. z o.o., ul. Grzybowska 87, 00-844 Warszawa.</p>

        <h2>2. Jakie dane przetwarzamy?</h2>
        <p>Przetwarzamy dane, które podajesz nam podczas:</p>
        <ul>
          <li>Rezerwacji pojazdu (imię, nazwisko, PESEL, nr prawa jazdy, adres),</li>
          <li>Kontaktu przez formularz (email, nr telefonu),</li>
          <li>Korzystania ze strony (pliki cookies, adres IP).</li>
        </ul>

        <h2>3. Cel przetwarzania</h2>
        <p>Twoje dane są przetwarzane w celu realizacji umowy najmu, obsługi zapytań, marketingu bezpośredniego (za Twoją zgodą) oraz w celach analitycznych.</p>

        <h2>4. Twoje prawa</h2>
        <p>Masz prawo do wglądu w swoje dane, ich sprostowania, usunięcia ("prawo do bycia zapomnianym") oraz ograniczenia przetwarzania.</p>
      </>
    )
  },
  {
    title: 'Regulamin wypożyczalni',
    slug: 'regulamin-wypozyczalni',
    content: (
      <>
        <h1>Regulamin Wypożyczalni Samochodów Elektrycznych</h1>
        
        <h2>I. Warunki Najmu</h2>
        <p>1. Najemcą może być osoba, która ukończyła 21 lat i posiada ważne prawo jazdy od co najmniej 2 lat.</p>
        <p>2. Przed wydaniem pojazdu Najemca zobowiązany jest do wpłacenia kaucji zwrotnej w wysokości określonej w cenniku.</p>

        <h2>II. Użytkowanie Pojazdu</h2>
        <p>1. Pojazdem może kierować wyłącznie Najemca lub osoba wskazana w umowie jako drugi kierowca.</p>
        <p>2. W pojazdach obowiązuje całkowity zakaz palenia tytoniu.</p>
        <p>3. Pojazdy są monitorowane systemem GPS.</p>

        <h2>III. Ładowanie i Zwrot</h2>
        <p>1. Samochód wydawany jest z poziomem naładowania baterii minimum 80%.</p>
        <p>2. Najemca nie ma obowiązku zwrotu naładowanego samochodu, chyba że wybrano opcję bez obsługi "pustej baterii" (wtedy min. 10% przy zwrocie).</p>
        <p>3. Koszty ładowania na stacjach publicznych innych niż Supercharger (jeśli nie zawarto w pakiecie) pokrywa Najemca.</p>
      </>
    )
  },
  {
    title: 'Regulamin przewozów',
    slug: 'regulamin-przewozow',
    content: (
      <>
        <h1>Regulamin Przewozów (Transfery VIP)</h1>
        
        <h2>§1. Definicje</h2>
        <p>Usługa Transferu – przewóz osób samochodem osobowym z kierowcą na trasie określonej przez Zamawiającego.</p>

        <h2>§2. Zamawianie Usługi</h2>
        <p>1. Zamówienie usługi następuje poprzez formularz na stronie internetowej.</p>
        <p>2. Cena usługi jest gwarantowana i znana przed rozpoczęciem kursu (z wyłączeniem pakietów godzinowych, gdzie rozliczenie następuje wg czasu).</p>

        <h2>§3. Realizacja Usługi</h2>
        <p>1. Kierowca oczekuje na Pasażera w umówionym miejscu o umówionej godzinie.</p>
        <p>2. W przypadku odbioru z lotniska, kierowca monitoruje status lotu i oczekuje w hali przylotów z tabliczką imienną.</p>
        <p>3. W samochodzie obowiązuje wysoka kultura osobista oraz zakaz spożywania alkoholu.</p>
        
        <h2>§4. Rezygnacja</h2>
        <p>Bezpłatna anulacja zlecenia jest możliwa do 24h przed planowanym terminem realizacji.</p>
      </>
    )
  },
  {
    title: 'Przykładowe dokumenty',
    slug: 'wzor-umowy',
    content: (
      <>
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
            <h1>UMOWA NAJMU POJAZDU (WZÓR)</h1>
            <p>Nr: 2025/DEV/001</p>
        </div>

        <p>Zawarta w dniu .................... w Warszawie pomiędzy:</p>
        
        <p><strong>Wynajmującym:</strong><br/>
        forfinance sp. z o.o., ul. Grzybowska 87, Warszawa, NIP: 527-283-91-27</p>
        
        <p>a</p>

        <p><strong>Najemcą:</strong><br/>
        ...........................................................................<br/>
        (Imię i nazwisko / Nazwa firmy)<br/>
        PESEL / NIP: ...........................................................
        </p>

        <h3>§1. Przedmiot umowy</h3>
        <p>1. Wynajmujący oddaje w najem, a Najemca bierze w używanie samochód marki Tesla Model ......, nr rej. ....................</p>
        
        <h3>§2. Czas trwania umowy</h3>
        <p>1. Umowa zostaje zawarta na okres od dnia .................... godz. ...... do dnia .................... godz. ......</p>

        <h3>§3. Oświadczenia</h3>
        <p>1. Najemca oświadcza, że zapoznał się ze stanem technicznym pojazdu i nie wnosi do niego zastrzeżeń.</p>
        <p>2. Najemca zobowiązuje się użytkować pojazd zgodnie z jego przeznaczeniem.</p>
        
        <br/><br/><br/>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '50px' }}>
            <div style={{ borderTop: '1px solid black', width: '40%', paddingTop: '10px', textAlign: 'center' }}>Podpis Wynajmującego</div>
            <div style={{ borderTop: '1px solid black', width: '40%', paddingTop: '10px', textAlign: 'center' }}>Podpis Najemcy</div>
        </div>
      </>
    )
  }
];
