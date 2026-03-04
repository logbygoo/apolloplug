import React from 'react';

export const RentalRulesContent = (
  <div className="rental-rules">
    <style>{`
      /* ====== RENTAL RULES (ONLY) ====== */
      @page {
        size: A4;
        margin: 17mm 7mm 7mm 7mm;
      }

      .rental-rules, .rental-rules * {
        box-sizing: border-box;
      }

      .rental-rules {
        margin: 0;
        padding: 0;
        background: #ffffff;
        color: #000;
        font-family: Arial, Helvetica, sans-serif;
        font-size: 12px;
        line-height: 1.5;
        width: 100%;
      }

      .rental-rules .doc {
        width: 100%;
      }

      .rental-rules .doc__header {
        margin-bottom: 6px;
      }

      .rental-rules .doc__title {
        font-size: 18px;
        text-align: left;
        letter-spacing: 0.2px;
        margin: 0;
      }

      .rental-rules .section {
        margin-top: 12px;
      }

      .rental-rules .section__title {
        font-size: 13px;
        margin: 0 0 6px 0;
        padding: 6px 8px;
        border: 1px solid #000;
        background: #f2f2f2;
      }

      .rental-rules .card {
        border: 1px solid #000;
        padding: 8px;
      }

      .rental-rules .note {
        margin: 8px 0 0 0;
        font-size: 11px;
      }

      .rental-rules .legal {
        margin: 6px 0 0 18px;
        padding: 0;
      }

      .rental-rules .legal li {
        margin: 0 0 6px 0;
      }

      .rental-rules img,
      .rental-rules svg,
      .rental-rules canvas,
      .rental-rules video {
        max-width: 100%;
      }

      /* Unikaj łamania nagłówków/boxów na stronach */
      .rental-rules .section,
      .rental-rules .card,
      .rental-rules .doc__header {
        break-inside: avoid;
        page-break-inside: avoid;
      }

      /* Tabela opłat */
      .rental-rules .fees-table {
        width: 100%;
        border-collapse: collapse;
      }

      .rental-rules .fees-table td {
        border: 1px solid #000;
        padding: 6px;
        vertical-align: top;
      }

      .rental-rules .fees-table td:first-child {
        width: 70%;
      }
    `}</style>

    <main className="doc">
      <header className="doc__header">
        <div className="doc__title-wrap">
          <h1 className="doc__title">REGULAMIN WYPOŻYCZALNI POJAZDÓW APOLLOPLUG</h1>
        </div>
      </header>

      <section className="section">
        <h2 className="section__title">1. Postanowienia ogólne</h2>
        <ol className="legal">
          <li>Niniejszy Regulamin określa zasady świadczenia usług najmu pojazdów (dalej: „Usługa” lub „Najem”) przez <strong>forfinance sp. z o.o.</strong> z siedzibą w Warszawie (00-844), ul. Grzybowska 87, NIP 527-283-91-27, REGON 369507931, KRS 0000719398, e-mail: office@apolloplug.com, tel.: +48 500 308 400 (dalej: „Wynajmujący”).</li>
          <li>Regulamin jest dostępny na stronie internetowej <strong>apolloplug.com</strong> i może być utrwalony przez Najemcę w dowolny sposób (np. pobranie, wydruk).</li>
          <li>Regulamin stanowi integralną część umowy najmu pojazdu zawieranej pomiędzy Wynajmującym a Najemcą (dalej: „Umowa”). W razie rozbieżności pierwszeństwo mają postanowienia Umowy.</li>
          <li>Najem może być zawierany zarówno z konsumentami, jak i przedsiębiorcami (w tym osobami fizycznymi prowadzącymi działalność gospodarczą).</li>
          <li>Do Umowy i Regulaminu stosuje się prawo polskie. Postanowienia Regulaminu nie wyłączają ani nie ograniczają praw konsumenta wynikających z bezwzględnie obowiązujących przepisów prawa.</li>
        </ol>
      </section>

      <section className="section">
        <h2 className="section__title">2. Definicje</h2>
        <ol className="legal">
          <li><strong>Najemca</strong> – osoba fizyczna, osoba prawna lub jednostka organizacyjna, która składa Rezerwację i zawiera Umowę.</li>
          <li><strong>Konsument</strong> – Najemca będący osobą fizyczną dokonującą czynności prawnej niezwiązanej bezpośrednio z jej działalnością gospodarczą lub zawodową.</li>
          <li><strong>Przedsiębiorca</strong> – Najemca zawierający Umowę w związku z działalnością gospodarczą lub zawodową.</li>
          <li><strong>Pojazd</strong> – samochód osobowy (w szczególności elektryczny, ewentualnie hybrydowy) udostępniany Najemcy na podstawie Umowy.</li>
          <li><strong>Protokół</strong> – protokół zdawczo-odbiorczy, stanowiący wraz z Umową podstawę rozliczeń, w tym stanu Pojazdu, przebiegu i poziomu energii/paliwa.</li>
          <li><strong>Kaucja</strong> – zabezpieczenie roszczeń Wynajmującego ustanawiane w formie preautoryzacji na karcie płatniczej Najemcy.</li>
          <li><strong>Udział własny</strong> – maksymalna kwota odpowiedzialności Najemcy za pojedyncze zdarzenie szkodowe w zakresie objętym ubezpieczeniem AC/kradzież, określona w Umowie albo w Cenniku dla danego Pojazdu.</li>
          <li><strong>Opcja redukcji udziału własnego</strong> – odpłatna usługa obniżająca udział własny (np. z 10 000 zł do 3 000 zł) zgodnie z ofertą przedstawioną w procesie Rezerwacji.</li>
          <li><strong>Opłaty dodatkowe</strong> – opłaty i kary umowne należne zgodnie z Regulaminem, Umową i tabelą opłat w pkt 18.</li>
          <li><strong>Rezerwacja</strong> – zgłoszenie Najemcy złożone za pośrednictwem formularza na stronie apolloplug.com (lub innym kanałem wskazanym przez Wynajmującego) w celu zawarcia Umowy.</li>
        </ol>
      </section>

      <section className="section">
        <h2 className="section__title">3. Zawarcie Umowy, weryfikacja i akceptacja Rezerwacji</h2>
        <ol className="legal">
          <li>Złożenie Rezerwacji stanowi ofertę zawarcia Umowy. Do zawarcia Umowy dochodzi dopiero po potwierdzeniu dostępności Pojazdu i akceptacji Rezerwacji przez Wynajmującego.</li>
          <li>Wynajmujący może odmówić akceptacji Rezerwacji, w szczególności z powodu braku dostępności Pojazdu, negatywnej oceny ryzyka, braku możliwości weryfikacji danych, braku skutecznej płatności lub Kaucji.</li>
          <li>Najemca zobowiązuje się podać dane prawdziwe, aktualne i kompletne. Wynajmujący może żądać okazania dokumentów potwierdzających dane (dowód, paszport, prawo jazdy, dane firmy, pełnomocnictwo).</li>
          <li>Najemcą i/lub kierowcą Pojazdu może być wyłącznie osoba pełnoletnia posiadająca ważne prawo jazdy co najmniej 12 miesięcy, o ile Umowa nie stanowi inaczej.</li>
          <li>W przypadku, gdy Najemca wskazuje dodatkowego kierowcę, Najemca zapewnia, że kierowca spełnia warunki Regulaminu, a Najemca ponosi odpowiedzialność za działania i zaniechania kierowcy jak za własne.</li>
        </ol>
      </section>

      <section className="section">
        <h2 className="section__title">4. Płatności, Kaucja, dane karty i obciążenia po Najmie (MOTO)</h2>
        <ol className="legal">
          <li>Płatności za Najem realizowane są wyłącznie bezgotówkowo (karta płatnicza, płatności elektroniczne). Wynajmujący nie przyjmuje płatności gotówką.</li>
          <li>Obciążenie karty (płatność za Najem) następuje po akceptacji Rezerwacji przez pracownika Wynajmującego. W przypadku nieudanego obciążenia Wynajmujący kontaktuje się z Najemcą w celu ponowienia płatności; brak skutecznej płatności w ciągu <strong>3 godzin</strong> od złożenia Rezerwacji może skutkować jej anulowaniem.</li>
          <li>Kaucja ustanawiana jest w formie preautoryzacji na karcie Najemcy. Wysokość Kaucji zależy od Pojazdu, okresu najmu i oceny ryzyka. W uzasadnionych przypadkach Wynajmujący może udzielić zgody na Najem bez Kaucji (np. klient powracający).</li>
          <li>Najemca wyraża zgodę na przechowywanie danych karty płatniczej przez dostawcę płatności na czas trwania Najmu oraz przez okres po Najmie niezbędny do rozliczenia należności ujawnionych po zwrocie Pojazdu (w szczególności mandaty, opłaty drogowe/parkingowe, ładowania, szkody).</li>
          <li>Najemca wyraża zgodę na obciążenie karty metodą <strong>MOTO</strong> (mail/telefon) bez odrębnej zgody w chwili obciążenia, o ile należność wynika z Umowy/Regulaminu/Protokołu, w tym po zakończeniu Najmu.</li>
          <li>Wynajmujący rozlicza Kaucję niezwłocznie po zakończeniu Najmu, z zastrzeżeniem możliwości utrzymania blokady do czasu ustalenia/rozliczenia roszczeń (np. szkody ujawnione po zwrocie, mandaty). Czas zwolnienia preautoryzacji zależy od banku Najemcy.</li>
          <li>Wynajmujący jest uprawniony do potrącenia swoich wymagalnych roszczeń z Kaucji, a w przypadku braku Kaucji lub jej niewystarczalności – do obciążenia karty Najemcy lub dochodzenia należności w inny sposób.</li>
        </ol>
      </section>

      <section className="section">
        <h2 className="section__title">5. Wydanie Pojazdu i Protokół</h2>
        <ol className="legal">
          <li>Wydanie Pojazdu następuje po spełnieniu warunków Umowy, w szczególności po skutecznej płatności i ustanowieniu Kaucji (o ile wymagana).</li>
          <li>Stan Pojazdu, jego wyposażenie, przebieg, poziom energii/paliwa oraz ewentualne uszkodzenia wskazuje Protokół. Podpisanie Protokołu oznacza potwierdzenie zgodności danych.</li>
          <li>Najemca zobowiązuje się sprawdzić Pojazd przy wydaniu i zgłosić zastrzeżenia przed rozpoczęciem jazdy. Brak zastrzeżeń oznacza przyjęcie Pojazdu w stanie opisanym w Protokole.</li>
        </ol>
      </section>

      <section className="section">
        <h2 className="section__title">6. Okres Najmu, przedłużenie, nieodebranie Pojazdu</h2>
        <ol className="legal">
          <li>Okres Najmu liczony jest zgodnie z Umową i naliczany co najmniej za pełne doby lub inne jednostki rozliczeniowe wskazane w Umowie.</li>
          <li>Przedłużenie Najmu wymaga uprzedniej zgody Wynajmującego oraz skutecznej płatności. Brak zgody oznacza obowiązek zwrotu w terminie.</li>
          <li>
            W przypadku anulowania Rezerwacji przez Najemcę:
            <ol className="legal">
              <li>jeżeli Rezerwacja dotyczy okresu Najmu od 1 do 3 dni – Najemca zobowiązany jest do zapłaty <strong>całości kwoty Najmu</strong> przewidzianej dla tej Rezerwacji,</li>
              <li>jeżeli Rezerwacja dotyczy okresu Najmu dłuższego niż 3 dni – Najemca zobowiązany jest do zapłaty równowartości <strong>3 dni Najmu</strong> (według stawki z Rezerwacji),</li>
              <li>kaucja (preautoryzacja) podlega zwolnieniu w całości, o ile nie powstały inne należności po stronie Najemcy,</li>
              <li>jeżeli Najem był opłacony z góry za okres dłuższy niż 3 dni – Wynajmujący zwraca Najemcy część opłaty przekraczającą równowartość 3 dni Najmu, z zastrzeżeniem potrąceń należności wynikających z Umowy/Regulaminu.</li>
            </ol>
          </li>
        </ol>
      </section>

      <section className="section">
        <h2 className="section__title">7. Zwrot Pojazdu i opóźnienie w zwrocie</h2>
        <ol className="legal">
          <li>Zwrot Pojazdu następuje w miejscu i czasie wskazanym w Umowie. Za zwrot uznaje się przekazanie Pojazdu i kluczyków oraz podpisanie Protokołu zwrotu (o ile wymagany).</li>
          <li>W przypadku opóźnienia w zwrocie Najemca zobowiązany jest do zapłaty stawki dobowej czynszu Najmu za każdy rozpoczęty dzień opóźnienia oraz kary umownej w wysokości <strong>1 500 zł</strong>.</li>
          <li>
            Niezależnie od kary umownej Wynajmujący może dochodzić od Najemcy odszkodowania uzupełniającego, jeżeli szkoda Wynajmującego spowodowana opóźnieniem w zwrocie (w tym w szczególności: utracone korzyści, koszty operacyjne, koszty reorganizacji floty, anulowane rezerwacje, koszty podstawienia/odbioru) przewyższa wysokość kary umownej.
          </li>
          <li>
            Jeżeli brak zwrotu Pojazdu trwa <strong>24 godziny</strong> od upływu terminu zwrotu albo system Wynajmującego wykryje zdarzenie mogące świadczyć o przywłaszczeniu lub próbie przywłaszczenia (w szczególności: brak płatności przy kontynuacji użytkowania, brak kontaktu z Najemcą, próba ukrycia lokalizacji, próba nieautoryzowanego wyjazdu za granicę, ingerencja w zabezpieczenia), Wynajmujący może <strong>automatycznie</strong> uruchomić procedury bezpieczeństwa, w tym przekazać zgłoszenie do odpowiednich służb oraz podmiotów współpracujących w zakresie ochrony mienia, a także podjąć czynności zmierzające do odzyskania Pojazdu.
          </li>
        </ol>
      </section>

      <section className="section">
        <h2 className="section__title">8. Obowiązki Najemcy w trakcie Najmu</h2>
        <ol className="legal">
          <li>Najemca zobowiązuje się użytkować Pojazd zgodnie z jego przeznaczeniem, zasadami należytej staranności oraz przepisami prawa.</li>
          <li>Najemca nie jest uprawniony do dokonywania napraw, przeróbek, montażu urządzeń lub zmian w Pojazdzie bez zgody Wynajmującego.</li>
          <li>Najemca zobowiązuje się dbać o Pojazd, w tym w szczególności unikać działań mogących spowodować uszkodzenia mechaniczne, nadmierne zużycie, uszkodzenie baterii lub układu napędowego.</li>
        </ol>
      </section>

      <section className="section">
        <h2 className="section__title">9. Zakazy</h2>
        <ol className="legal">
          <li>Zakazuje się w szczególności: palenia tytoniu i używania e-papierosów w Pojazdach, udziału w wyścigach/rajdach, holowania innych pojazdów, przewozu zwierząt wewnątrz kabiny bez zgody, przekraczania dopuszczalnej ładowności, prowadzenia pod wpływem alkoholu/narkotyków, udostępniania Pojazdu osobom nieuprawnionym.</li>
          <li>
            Obowiązuje <strong>całkowity zakaz palenia</strong> tytoniu, używania e-papierosów oraz podgrzewaczy tytoniu wewnątrz Pojazdu. Naruszenie zakazu stanowi istotne naruszenie Umowy i skutkuje naliczeniem kary umownej zgodnie z tabelą opłat (pkt 18), w szczególności z uwagi na koszty odświeżania/ozonowania, prania tapicerki, suszenia oraz czasowego wyłączenia Pojazdu z Najmu.
          </li>
          <li>Zakazuje się ingerencji w systemy bezpieczeństwa, obejścia ograniczeń oraz manipulacji przy urządzeniach GPS/telemetrii.</li>
        </ol>
      </section>

      <section className="section">
        <h2 className="section__title">10. Wyjazdy zagraniczne</h2>
        <ol className="legal">
          <li>Wyjazd poza terytorium Polski wymaga uprzedniego poinformowania i zgody Wynajmującego. Wyjazd możliwy jest co do zasady na terytorium UE.</li>
          <li>Za zgodny z Regulaminem wyjazd na terytorium UE naliczana jest dopłata <strong>+30%</strong> do ceny dobowej Najmu.</li>
          <li>Próba lub dokonanie wyjazdu bez wymaganej zgody stanowi istotne naruszenie Umowy i może skutkować naliczeniem Opłat dodatkowych, natychmiastowym odbiorem Pojazdu, a także zastosowaniem mechanizmów zabezpieczających (pkt 14).</li>
        </ol>
      </section>

      <section className="section">
        <h2 className="section__title">11. Pojazdy elektryczne i ładowanie (w tym Tesla Supercharger)</h2>
        <ol className="legal">
          <li>Najemca zobowiązany jest do prawidłowego ładowania Pojazdu zgodnie z instrukcjami producenta oraz zasadami bezpieczeństwa.</li>
          <li>Koszty ładowania w sieci Tesla Supercharger są rozliczane na podstawie raportu systemowego Tesla i obciążają kartę Najemcy jako koszt rzeczywisty.</li>
          <li>Najemca ponosi odpowiedzialność za doprowadzenie do rozładowania Pojazdu uniemożliwiającego dalszą jazdę, w tym koszty dojazdu serwisu, transportu lub holowania.</li>
        </ol>
      </section>

      <section className="section">
        <h2 className="section__title">12. Awaria Pojazdu i zakaz samowolnych napraw</h2>
        <ol className="legal">
          <li>W razie awarii Najemca zobowiązany jest niezwłocznie skontaktować się z Wynajmującym i stosować do instrukcji. Jeżeli dalsza jazda mogłaby pogłębić uszkodzenia – Najemca ma obowiązek przerwać jazdę.</li>
          <li>Najemca nie może zlecać napraw na koszt Wynajmującego bez uprzedniej zgody Wynajmującego, chyba że stan nagły wymaga natychmiastowego działania w celu uniknięcia powstania znacznej szkody.</li>
          <li>
            Najemca przyjmuje do wiadomości, że Pojazdy mogą być wyposażone w systemy wykrywające ingerencję w elementy i układy Pojazdu (w tym w szczególności: komorę napędową, baterię, układ elektryczny, złącza, elementy zabezpieczeń oraz wybrane podzespoły). Każdorazowa próba samodzielnej naprawy, demontażu, rozkręcania lub uzyskania dostępu do elementów w sposób nieautoryzowany może skutkować automatycznym powiadomieniem Wynajmującego oraz naliczeniem kosztów diagnostyki i przywrócenia stanu zgodnego z Umową, niezależnie od odpowiedzialności odszkodowawczej Najemcy.
          </li>
        </ol>
      </section>

      <section className="section">
        <h2 className="section__title">13. Szkoda, kolizja, wypadek, kradzież – procedura postępowania</h2>
        <ol className="legal">
          <li>W razie szkody/kolizji/wypadku/kradzieży lub próby kradzieży Najemca ma obowiązek niezwłocznie powiadomić Wynajmującego, zabezpieczyć miejsce zdarzenia oraz wezwać Policję w przypadkach wymaganych prawem lub gdy jest to niezbędne do likwidacji szkody.</li>
          <li>Najemca zobowiązany jest sporządzić oświadczenie sprawcy (jeżeli dotyczy) i wykonać dokumentację zdjęciową.</li>
          <li>Naruszenie obowiązków może skutkować odpowiedzialnością Najemcy w zakresie, w jakim naruszenie doprowadziło do zwiększenia szkody lub odmowy wypłaty odszkodowania.</li>
        </ol>
      </section>

      <section className="section">
        <h2 className="section__title">14. Monitoring GPS, telemetria i blokada zapłonu</h2>
        <ol className="legal">
          <li>Pojazdy mogą być wyposażone w systemy monitorowania (GPS/telemetria) w celu ochrony mienia, bezpieczeństwa oraz wykonania Umowy.</li>
          <li>Najemca akceptuje możliwość zdalnej blokady zapłonu/ograniczenia korzystania z Pojazdu w przypadkach istotnego naruszenia Umowy, w szczególności braku płatności, próby wyjazdu za granicę bez zgody albo uzasadnionego podejrzenia przywłaszczenia.</li>
          <li>Wynajmujący stosuje środki zabezpieczające w sposób proporcjonalny i z zachowaniem bezpieczeństwa.</li>
        </ol>
      </section>

      <section className="section">
        <h2 className="section__title">15. Ubezpieczenie, udział własny, redukcja udziału własnego</h2>
        <ol className="legal">
          <li>Pojazdy posiadają obowiązkowe ubezpieczenie OC, a co do zasady także ubezpieczenie AC oraz ubezpieczenie od kradzieży. Zakres zależy od Pojazdu i polisy.</li>
          <li>Najemca odpowiada za szkody do wysokości udziału własnego wskazanego w Umowie/Cenniku.</li>
          <li>W przypadku szkody częściowej Najemca odpowiada do wysokości rzeczywistej szkody, jednak nie więcej niż udział własny – o ile szkoda podlega rozliczeniu w ramach ubezpieczenia i nie zachodzą wyłączenia.</li>
          <li>Opcja redukcji udziału własnego (np. do 3 000 zł) działa wyłącznie na warunkach oferty i nie ma zastosowania w przypadkach rażących naruszeń (alkohol/narkotyki, brak uprawnień, ucieczka z miejsca zdarzenia, osoba nieuprawniona, umyślne działanie).</li>
        </ol>
      </section>

      <section className="section">
        <h2 className="section__title">16. Utracone korzyści, utrata wartości handlowej, koszty operacyjne</h2>
        <ol className="legal">
          <li>Oprócz kosztów naprawy/likwidacji szkody Najemca może zostać obciążony utraconymi korzyściami (czas wyłączenia Pojazdu z floty), utratą wartości handlowej Pojazdu po szkodzie oraz kosztami operacyjnymi, o ile są uzasadnione i możliwe do wykazania.</li>
          <li>W przypadku utraty gwarancji z winy Najemcy, Najemca odpowiada w wysokości rzeczywistej szkody wynikającej z utraty gwarancji.</li>
        </ol>
      </section>

      <section className="section">
        <h2 className="section__title">17. Rozwiązanie Umowy i odbiór Pojazdu</h2>
        <ol className="legal">
          <li>W przypadku zaległości płatniczych Wynajmujący może wezwać Najemcę do zapłaty w dodatkowym terminie, a po bezskutecznym upływie terminu rozwiązać Umowę ze skutkiem natychmiastowym.</li>
          <li>Jeżeli zachodzi uzasadniona obawa przywłaszczenia, ukrycia Pojazdu lub próby wyjazdu bez zgody – Wynajmujący może podjąć natychmiastowe działania w celu odzyskania Pojazdu, bez potrzeby uprzedniego wzywania.</li>
          <li>Koszty odbioru/transportu Pojazdu ponosi Najemca, jeżeli powstały na skutek naruszenia Umowy.</li>
        </ol>
      </section>

      <section className="section">
        <h2 className="section__title">18. Opłaty dodatkowe – tabela</h2>
        <div className="card">
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <tbody>
              <tr><td style={{ border: '1px solid #000', padding: '6px', width: '70%' }}>Opóźniony zwrot</td><td style={{ border: '1px solid #000', padding: '6px' }}>stawka dobowa + 1 500 zł</td></tr>
              <tr><td style={{ border: '1px solid #000', padding: '6px' }}>Brak paliwa/energii</td><td style={{ border: '1px solid #000', padding: '6px' }}>koszt rzeczywisty + 99 zł</td></tr>
              <tr><td style={{ border: '1px solid #000', padding: '6px' }}>Tesla Supercharger</td><td style={{ border: '1px solid #000', padding: '6px' }}>kwota z rozliczenia Tesla</td></tr>
              <tr><td style={{ border: '1px solid #000', padding: '6px' }}>Utrata lub zniszczenie kluczyka</td><td style={{ border: '1px solid #000', padding: '6px' }}>2 990 zł</td></tr>
              <tr><td style={{ border: '1px solid #000', padding: '6px' }}>Brak dowodu/polisy/tablic/naklejki</td><td style={{ border: '1px solid #000', padding: '6px' }}>320 zł</td></tr>
              <tr><td style={{ border: '1px solid #000', padding: '6px' }}>Brak dokumentów technicznych</td><td style={{ border: '1px solid #000', padding: '6px' }}>500 zł</td></tr>
              <tr><td style={{ border: '1px solid #000', padding: '6px' }}>Palenie tytoniu / e-papierosów / podgrzewaczy tytoniu w Pojazdzie</td><td style={{ border: '1px solid #000', padding: '6px' }}>6 000 zł</td></tr>
              <tr><td style={{ border: '1px solid #000', padding: '6px' }}>Zwierzęta bez zgody</td><td style={{ border: '1px solid #000', padding: '6px' }}>100 zł</td></tr>
              <tr><td style={{ border: '1px solid #000', padding: '6px' }}>Holowanie innych pojazdów</td><td style={{ border: '1px solid #000', padding: '6px' }}>1 000 zł</td></tr>
              <tr><td style={{ border: '1px solid #000', padding: '6px' }}>Osoba nieuprawniona</td><td style={{ border: '1px solid #000', padding: '6px' }}>1 000 zł</td></tr>
              <tr><td style={{ border: '1px solid #000', padding: '6px' }}>Przeróbki bez zgody</td><td style={{ border: '1px solid #000', padding: '6px' }}>500 zł + koszty</td></tr>
              <tr><td style={{ border: '1px solid #000', padding: '6px' }}>Wyjazd za granicę bez zgody</td><td style={{ border: '1px solid #000', padding: '6px' }}>1 500 zł + koszty + 250 zł/dobę</td></tr>
              <tr><td style={{ border: '1px solid #000', padding: '6px' }}>Zapytanie organu (mandat/fotoradar)</td><td style={{ border: '1px solid #000', padding: '6px' }}>150 zł</td></tr>
              <tr><td style={{ border: '1px solid #000', padding: '6px' }}>Zwrot poza godzinami pracy</td><td style={{ border: '1px solid #000', padding: '6px' }}>80 zł</td></tr>
              <tr><td style={{ border: '1px solid #000', padding: '6px' }}>Podstawienie/odbiór poza standardem</td><td style={{ border: '1px solid #000', padding: '6px' }}>5 zł/km</td></tr>
              <tr><td style={{ border: '1px solid #000', padding: '6px' }}>Dodatkowy km ponad limit</td><td style={{ border: '1px solid #000', padding: '6px' }}>{'{{rental_km_overage_fee}}'}</td></tr>
            </tbody>
          </table>
          <p className="note" style={{ marginTop: '10px' }}>
            Opłaty nie wyłączają możliwości dochodzenia odszkodowania na zasadach ogólnych, jeżeli szkoda przewyższa wysokość opłaty/kary.
          </p>
        </div>
      </section>

      <section className="section">
        <h2 className="section__title">19. Postanowienia szczególne: Konsument i Przedsiębiorca</h2>
        <ol className="legal">
          <li>Wobec Konsumenta stosuje się przepisy chroniące konsumentów; postanowienia Regulaminu interpretuje się w zgodzie z nimi.</li>
          <li>W sporach z Konsumentem właściwy jest sąd zgodny z przepisami. W sporach z Przedsiębiorcą – sąd właściwy dla siedziby Wynajmującego.</li>
        </ol>
      </section>

      <section className="section">
        <h2 className="section__title">20. Dane osobowe</h2>
        <ol className="legal">
          <li>Administratorem danych jest forfinance sp. z o.o. Szczegóły przetwarzania danych, w tym GPS, opisuje Polityka Prywatności dostępna na apolloplug.com.</li>
        </ol>
      </section>

      <section className="section">
        <h2 className="section__title">21. Postanowienia końcowe</h2>
        <ol className="legal">
          <li>Regulamin obowiązuje od dnia 1.10.2025.</li>
          <li>Kontakt: apolloplug.com/kontakt.</li>
        </ol>
      </section>
    </main>
  </div>
);