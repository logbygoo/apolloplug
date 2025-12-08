
import React from 'react';
import { COMPANY_DETAILS } from '../companyDetails';

export const SampleContractContent = (
  <div className="pdf-content">
    <style>{`
      .pdf-content {
        width: 794px; /* A4 width at 96 DPI */
        min-height: 1123px; /* A4 height at 96 DPI */
        padding: 40px; /* Margins */
        background: white;
        font-family: Arial, Helvetica, sans-serif;
        font-size: 11px;
        color: #000;
        line-height: 1.3;
        box-sizing: border-box;
        overflow: hidden; /* Safety clip */
      }

      .pdf-content h1 {
        text-align: center;
        font-size: 18px;
        margin-bottom: 15px;
        text-transform: uppercase;
        font-weight: bold;
      }

      .pdf-content table {
        width: 100%;
        border-collapse: collapse;
        table-layout: fixed; /* Crucial for preventing overflow */
        margin-bottom: 15px;
      }

      .pdf-content th, 
      .pdf-content td {
        border: 1px solid #555;
        padding: 5px;
        vertical-align: top;
        word-wrap: break-word; /* Ensure text breaks */
        overflow-wrap: break-word;
      }

      .pdf-content .no-border {
        border: none !important;
      }

      .pdf-content .section-title {
        background: #e0e0e0;
        font-weight: bold;
        text-align: center;
        text-transform: uppercase;
        padding: 6px;
      }

      .pdf-content .subheader {
        background: #f5f5f5;
        font-weight: bold;
      }

      .pdf-content .small {
        font-size: 9px;
      }

      .pdf-content .car-scheme {
        height: 110px;
        text-align: center;
        font-size: 9px;
        display: flex;
        flex-direction: column;
        justify-content: center;
      }

      .pdf-content .fuel-box {
        text-align: center;
        font-size: 10px;
        height: 45px;
        vertical-align: middle;
      }

      .pdf-content .notes-box {
        height: 60px;
      }

      .pdf-content .sign-box {
        height: 40px;
      }

      .pdf-content .footer {
        margin-top: 20px;
        font-size: 9px;
        width: 100%;
      }

      .pdf-content .right {
        text-align: right;
      }
      
      /* Reset standard styles that might interfere */
      .pdf-content p { margin: 0; }
    `}</style>

    <h1>PROTOKÓŁ ZDAWCZO-ODBIORCZY</h1>

    {/* Dane stron */}
    <table>
      <colgroup>
        <col style={{ width: '50%' }} />
        <col style={{ width: '50%' }} />
      </colgroup>
        <tbody>
        <tr>
            <th className="section-title">Wynajmujący</th>
            <th className="section-title">Najemca</th>
        </tr>
        <tr>
            <td>
                Firma: {COMPANY_DETAILS.name}<br />
                Adres: {COMPANY_DETAILS.address}<br />
                KRS: {COMPANY_DETAILS.krs}<br />
                NIP: {COMPANY_DETAILS.nip}<br />
                REGON: {COMPANY_DETAILS.regon}
            </td>
            <td>
                Imię i nazwisko: Jan Kowalski<br />
                Adres: ul. Testowa 5 m. 12, 01-234 Warszawa<br />
                NIP: 5556667788<br />
                PESEL: 80010112345<br />
                Telefon: +48 600 000 000<br />
                E-mail: jan.kowalski@example.com<br />
                Prawo jazdy nr: ABC123456
            </td>
        </tr>
        </tbody>
    </table>

    {/* Przedmiot najmu */}
    <table>
        <tbody>
        <tr>
            <th className="section-title">Przedmiot najmu</th>
        </tr>
        <tr>
            <td>
                Marka / model: Volvo S90<br />
                Rodzaj paliwa: Diesel<br />
                Pojemność / moc: 2.0 / 190 KM<br />
                Nr rejestracyjny: WX 12345<br />
                Nr VIN: YV1A2345678901234
            </td>
        </tr>
        </tbody>
    </table>

    {/* Wydanie pojazdu */}
    <table>
        <colgroup>
            <col style={{ width: '35%' }} />
            <col style={{ width: '21%' }} />
            <col style={{ width: '22%' }} />
            <col style={{ width: '22%' }} />
        </colgroup>
        <tbody>
        <tr>
            <th className="section-title" colSpan={4}>WYDANIE POJAZDU</th>
        </tr>
        <tr>
            <th>Stan pojazdu</th>
            <th colSpan={3}>Data i godzina wydania</th>
        </tr>
        <tr>
            <td rowSpan={3}>
                <div className="car-scheme">
                    <strong>Schemat pojazdu (rysunek)</strong><br/><br/>
                    LEGENDA:<br />
                    R-rysa, O-odprysk<br />
                    W-wgniecenie, P-pęknięcie<br />
                    B-brak uszkodzeń
                </div>
            </td>
            <td colSpan={3}>
                Data: 10.12.2025<br />
                Godzina: 09:30
            </td>
        </tr>
        <tr>
            <th>Stan paliwa</th>
            <th>Przebieg</th>
            <th>Uwagi dodatkowe</th>
        </tr>
        <tr>
            <td className="fuel-box">
                Poziom: 3/4
            </td>
            <td className="fuel-box">
                25 350 km
            </td>
            <td className="notes-box">
                Brak widocznych uszkodzeń nadwozia.<br />
                Wnętrze czyste, komplet dokumentów.
            </td>
        </tr>
        <tr>
            <td colSpan={2} className="small">
                Wynajmujący (potwierdzam zgodność)
            </td>
            <td colSpan={2} className="small">
                Najemca (zgadzam się z opisem)
            </td>
        </tr>
        <tr>
            <td colSpan={2} className="sign-box"></td>
            <td colSpan={2} className="sign-box"></td>
        </tr>
        </tbody>
    </table>

    {/* Zwrot pojazdu */}
    <table>
        <colgroup>
            <col style={{ width: '35%' }} />
            <col style={{ width: '21%' }} />
            <col style={{ width: '22%' }} />
            <col style={{ width: '22%' }} />
        </colgroup>
        <tbody>
        <tr>
            <th className="section-title" colSpan={4}>ZWROT POJAZDU</th>
        </tr>
        <tr>
            <th>Stan pojazdu</th>
            <th colSpan={3}>Data i godzina zwrotu</th>
        </tr>
        <tr>
            <td rowSpan={3}>
                <div className="car-scheme">
                    <strong>Schemat pojazdu (rysunek)</strong><br/><br/>
                    LEGENDA:<br />
                    R-rysa, O-odprysk<br />
                    W-wgniecenie, P-pęknięcie<br />
                    B-brak uszkodzeń
                </div>
            </td>
            <td colSpan={3}>
                Data: 15.12.2025<br />
                Godzina: 18:15
            </td>
        </tr>
        <tr>
            <th>Stan paliwa</th>
            <th>Przebieg</th>
            <th>Uwagi dodatkowe</th>
        </tr>
        <tr>
            <td className="fuel-box">
                Poziom: 1/2
            </td>
            <td className="fuel-box">
                27 980 km
            </td>
            <td className="notes-box">
                Niewielka rysa na tylnym zderzaku.<br />
                Wnętrze wymaga sprzątania.
            </td>
        </tr>
        <tr>
            <td colSpan={2} className="small">
                Wynajmujący (potwierdzam zgodność)
            </td>
            <td colSpan={2} className="small">
                Najemca (zgadzam się z opisem)
            </td>
        </tr>
        <tr>
            <td colSpan={2} className="sign-box"></td>
            <td colSpan={2} className="sign-box"></td>
        </tr>
        </tbody>
    </table>

    {/* Stopka */}
    <div className="footer">
        <table>
            <tbody>
            <tr>
                <td className="no-border small">
                    {COMPANY_DETAILS.website} &nbsp;|&nbsp; {COMPANY_DETAILS.email} &nbsp;|&nbsp; {COMPANY_DETAILS.phone}
                </td>
                <td className="no-border small right">
                    Strona 1 z 1
                </td>
            </tr>
            </tbody>
        </table>
    </div>

  </div>
);
