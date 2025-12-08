
import React from 'react';
import { COMPANY_DETAILS } from '../companyDetails';

export const SampleContractContent = (
  <div className="pdf-content">
    <style>{`
      .pdf-content {
        padding: 20px;
        background: white;
        font-size: 12px;
        color: #000;
        box-sizing: border-box;
        overflow: hidden;
      }

      .pdf-content *,
      .pdf-content *::before,
      .pdf-content *::after {
        box-sizing: inherit;
      }

      .pdf-content h1 {
        text-align: center;
        font-size: 20px;
        margin-bottom: 4px;
        text-transform: uppercase;
        font-weight: 700;
      }

      .pdf-content .subtitle {
        text-align: center;
        font-size: 11px;
        margin-bottom: 16px;
      }

      .pdf-content table {
        width: 100%;
        border-collapse: collapse;
        border-spacing: 0;
        table-layout: fixed;
        margin-bottom: 16px;
      }

      .pdf-content th,
      .pdf-content td {
        border: 1px solid #000;
        padding: 0;
        vertical-align: middle;
        font-size: 12px;
      }

      .pdf-content .cell-center {
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 6px 8px;
        width: 100%;
        height: 100%;
        line-height: 1.3;
      }

      .pdf-content .cell-left {
        display: flex;
        align-items: center;
        justify-content: flex-start;
        padding: 6px 8px;
        width: 100%;
        height: 100%;
        line-height: 1.3;
      }

      .pdf-content .cell-multiline {
        display: block;
        padding: 6px 8px;
        line-height: 1.3;
      }

      .pdf-content .section-title {
        background: #e0e0e0;
        font-weight: 700;
        text-transform: uppercase;
        font-size: 13px;
      }

      .pdf-content .small {
        font-size: 10px;
      }

      .pdf-content .no-border {
        border: none !important;
      }

      .pdf-content .right {
        text-align: right;
      }

      .pdf-content .footer {
        margin-top: 16px;
        font-size: 10px;
        width: 100%;
        border-top: 1px solid #000;
        padding-top: 8px;
      }

      .pdf-content p {
        margin: 0;
      }

      .pdf-content ol {
        margin: 4px 0 4px 18px;
        padding: 0;
      }

      .pdf-content ol li {
        margin-bottom: 2px;
      }
    `}</style>

    <h1>UMOWA NAJMU POJAZDU</h1>
    <div className="subtitle">
      Umowa nr: <strong>UM/2025/0001</strong> z dnia <strong>10.12.2025</strong>
    </div>

    {/* Strony umowy */}
    <table>
      <colgroup>
        <col style={{ width: '50%' }} />
        <col style={{ width: '50%' }} />
      </colgroup>
      <tbody>
        <tr>
          <th className="section-title">
            <div className="cell-center">Wynajmujący</div>
          </th>
          <th className="section-title">
            <div className="cell-center">Najemca</div>
          </th>
        </tr>
        <tr>
          <td>
            <div className="cell-multiline">
              <strong>{COMPANY_DETAILS.name}</strong>, {COMPANY_DETAILS.address}, NIP: {COMPANY_DETAILS.nip} &nbsp;|&nbsp; KRS: {COMPANY_DETAILS.krs}, REGON: {COMPANY_DETAILS.regon}, Tel.: {COMPANY_DETAILS.phone}, E-mail: {COMPANY_DETAILS.email}
            </div>
          </td>
          <td>
            <div className="cell-multiline">
              Imię i nazwisko: <strong>Jan Kowalski</strong>, Adres zamieszkania: ul. Testowa 5 m. 12, 01-234 Warszawa, PESEL: 80010112345, Dokument tożsamości: DO ABC123456, Prawo jazdy: B/PL 1234567, Telefon: +48 600 000 000, E-mail: jan.kowalski@example.com
            </div>
          </td>
        </tr>
      </tbody>
    </table>

    {/* Przedmiot najmu */}
    <table>
      <tbody>
        <tr>
          <th className="section-title" colSpan={4}>
            <div className="cell-center">Przedmiot najmu</div>
          </th>
        </tr>
        <tr>
          <th>
            <div className="cell-center">Marka / model</div>
          </th>
          <th>
            <div className="cell-center">Nr rej.</div>
          </th>
          <th>
            <div className="cell-center">VIN</div>
          </th>
          <th>
            <div className="cell-center">Rodzaj paliwa</div>
          </th>
        </tr>
        <tr>
          <td>
            <div className="cell-center">
              Tesla Model 3
            </div>
          </td>
          <td>
            <div className="cell-center">
              WX 12345
            </div>
          </td>
          <td>
            <div className="cell-center">
              5YJ3E7EB0MF123456
            </div>
          </td>
          <td>
            <div className="cell-center">
              Energia elektryczna
            </div>
          </td>
        </tr>
        <tr>
          <th>
            <div className="cell-center">Kolor</div>
          </th>
          <th>
            <div className="cell-center">Aktualny przebieg</div>
          </th>
          <th>
            <div className="cell-center">Stan baterii / zasięg</div>
          </th>
          <th>
            <div className="cell-center">Uwagi o stanie</div>
          </th>
        </tr>
        <tr>
          <td>
            <div className="cell-center">
              Biały
            </div>
          </td>
          <td>
            <div className="cell-center">
              25&nbsp;350 km
            </div>
          </td>
          <td>
            <div className="cell-center">
              85% / ok. 420 km
            </div>
          </td>
          <td>
            <div className="cell-multiline small">
              Brak widocznych uszkodzeń nadwozia, wnętrze czyste, komplet kluczyków i dokumentów.
            </div>
          </td>
        </tr>
      </tbody>
    </table>

    {/* Okres najmu */}
    <table>
      <tbody>
        <tr>
          <th className="section-title" colSpan={4}>
            <div className="cell-center">Okres najmu</div>
          </th>
        </tr>
        <tr>
          <th>
            <div className="cell-center">Data i godzina wydania</div>
          </th>
          <th>
            <div className="cell-center">Data i godzina zwrotu</div>
          </th>
          <th>
            <div className="cell-center">Liczba dób</div>
          </th>
          <th>
            <div className="cell-center">Miejsce wydania / zwrotu</div>
          </th>
        </tr>
        <tr>
          <td>
            <div className="cell-center">
              10.12.2025 &nbsp;|&nbsp; 09:30
            </div>
          </td>
          <td>
            <div className="cell-center">
              13.12.2025 &nbsp;|&nbsp; 18:00
            </div>
          </td>
          <td>
            <div className="cell-center">
              3
            </div>
          </td>
          <td>
            <div className="cell-multiline small">
              Wydanie: Warszawa, ul. Przykładowa 10<br />
              Zwrot: Warszawa, ul. Przykładowa 10
            </div>
          </td>
        </tr>
        <tr>
          <th>
            <div className="cell-center">Dobowy limit km</div>
          </th>
          <th>
            <div className="cell-center">Całkowity limit km</div>
          </th>
          <th colSpan={2}>
            <div className="cell-center">Przekroczenie limitu km</div>
          </th>
        </tr>
        <tr>
          <td>
            <div className="cell-center">
              300 km / doba
            </div>
          </td>
          <td>
            <div className="cell-center">
              900 km
            </div>
          </td>
          <td colSpan={2}>
            <div className="cell-center">
              1,20 zł / km
            </div>
          </td>
        </tr>
      </tbody>
    </table>

    {/* Warunki finansowe */}
    <table>
      <tbody>
        <tr>
          <th className="section-title" colSpan={4}>
            <div className="cell-center">Warunki finansowe</div>
          </th>
        </tr>
        <tr>
          <th>
            <div className="cell-center">Cena dobowo</div>
          </th>
          <th>
            <div className="cell-center">Kaucja</div>
          </th>
          <th>
            <div className="cell-center">Udział własny</div>
          </th>
          <th>
            <div className="cell-center">Łączny koszt wynajmu</div>
          </th>
        </tr>
        <tr>
          <td>
            <div className="cell-center">
              250 zł / doba (brutto)
            </div>
          </td>
          <td>
            <div className="cell-center">
              2&nbsp;000 zł
            </div>
          </td>
          <td>
            <div className="cell-center">
              5&nbsp;000 zł
            </div>
          </td>
          <td>
            <div className="cell-center">
              750 zł
            </div>
          </td>
        </tr>
        <tr>
          <th colSpan={2}>
            <div className="cell-center">Wybrane opcje dodatkowe</div>
          </th>
          <th>
            <div className="cell-center">Koszt opcji dodatkowych</div>
          </th>
          <th>
            <div className="cell-center">Łączny koszt do zapłaty</div>
          </th>
        </tr>
        <tr>
          <td colSpan={2}>
            <div className="cell-multiline small">
              Ubezpieczenie OC/AC/NNW – w cenie<br />
              Możliwość zwrotu brudnego auta – 150 zł<br />
              Dodatkowy kierowca – 50 zł
            </div>
          </td>
          <td>
            <div className="cell-center">
              200 zł
            </div>
          </td>
          <td>
            <div className="cell-center">
              950 zł (brutto)
            </div>
          </td>
        </tr>
      </tbody>
    </table>

    {/* Oświadczenia i postanowienia */}
    <table>
      <tbody>
        <tr>
          <th className="section-title">
            <div className="cell-center">Oświadczenia i postanowienia</div>
          </th>
        </tr>
        <tr>
          <td>
            <div className="cell-multiline small">
              <ol>
                <li>Najemca oświadcza, że posiada ważne prawo jazdy kategorii uprawniającej do kierowania pojazdem stanowiącym przedmiot najmu.</li>
                <li>Najemca zobowiązuje się użytkować pojazd zgodnie z jego przeznaczeniem, z należytą starannością oraz przestrzegając przepisów ruchu drogowego.</li>
                <li>Najemca ponosi odpowiedzialność materialną za szkody powstałe z jego winy, zgodnie z regulaminem wypożyczalni oraz warunkami ubezpieczenia.</li>
                <li>Najemca upoważnia Wynajmującego do obciążenia jego karty płatniczej niezapłaconymi kosztami wynikającymi z niniejszej umowy, w szczególności opłatami za szkody, dopłaty za przekroczenie limitu kilometrów oraz braki w wyposażeniu.</li>
                <li>Integralną częścią umowy jest Regulamin Wypożyczalni, przekazany Najemcy w formie elektronicznej oraz dostępny na stronie internetowej Wynajmującego. Zawierając umowę Najemca potwierdza zapoznanie się z Regulaminem i jego akceptację.</li>
                <li>Wszelkie zmiany niniejszej umowy wymagają formy pisemnej pod rygorem nieważności.</li>
              </ol>
            </div>
          </td>
        </tr>
      </tbody>
    </table>

    {/* Podpisy */}
    {/* Podpisy */}
    <table>
      <colgroup>
        <col style={{ width: '50%' }} />
        <col style={{ width: '50%' }} />
      </colgroup>
      <tbody>
        <tr>
          <th className="section-title" colSpan={2}>
            <div className="cell-center">Podpisy stron</div>
          </th>
        </tr>

        <tr>
          <th>
            <div className="cell-left small">
              Wynajmujący: {COMPANY_DETAILS.name}, {COMPANY_DETAILS.address}
            </div>
          </th>
          <th>
            <div className="cell-left small">
              Najemca: Jan Kowalski, ul. Testowa 5 m. 12, 01-234 Warszawa
            </div>
          </th>
        </tr>

        <tr>
          <td className="sign-box"></td>
          <td className="sign-box"></td>
        </tr>
      </tbody>
    </table>

    {/* Stopka */}
    <div className="footer">
      <table style={{ border: 'none', margin: 0 }}>
        <tbody>
          <tr>
            <td className="no-border" style={{ padding: 0 }}>
              {COMPANY_DETAILS.website} &nbsp;|&nbsp; {COMPANY_DETAILS.email} &nbsp;|&nbsp; {COMPANY_DETAILS.phone}
            </td>
            <td className="no-border right" style={{ padding: 0 }}>
              Strona 1 z 1
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
);