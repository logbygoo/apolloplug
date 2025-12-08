
import React from 'react';
import { COMPANY_DETAILS } from '../companyDetails';

export const SampleContractContent = (
  <div className="pdf-content">
    <style>{`
        .pdf-content {
            font-family: Arial, Helvetica, sans-serif;
            font-size: 11px;
            margin: 20px;
            padding: 20px; /* Added padding to wrapper to simulate body margin on A4 */
        }

        .pdf-content h1 {
            text-align: center;
            font-size: 18px;
            margin-bottom: 10px;
            text-transform: uppercase;
        }

        .pdf-content table {
            width: 100%;
            border-collapse: collapse;
        }

        .pdf-content th, .pdf-content td {
            border: 1px solid #555;
            padding: 4px 6px;
            vertical-align: top;
        }

        .pdf-content .no-border {
            border: none;
        }

        .pdf-content .section-title {
            background: #e0e0e0;
            font-weight: bold;
            text-align: center;
            text-transform: uppercase;
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
        }

        .pdf-content .fuel-box {
            text-align: center;
            font-size: 10px;
            height: 45px;
        }

        .pdf-content .notes-box {
            height: 60px;
        }

        .pdf-content .sign-box {
            height: 40px;
        }

        .pdf-content .footer {
            margin-top: 15px;
            font-size: 9px;
        }

        .pdf-content .right {
            text-align: right;
        }
    `}</style>

    <h1>PROTOKÓŁ ZDAWCZO-ODBIORCZY</h1>

    {/* Dane stron */}
    <table>
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

    <br />

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

    <br />

    {/* Wydanie pojazdu */}
    <table>
        <tbody>
        <tr>
            <th className="section-title" colSpan={4}>WYDANIE POJAZDU</th>
        </tr>
        <tr>
            <th>Stan pojazdu</th>
            <th colSpan={3}>Data i godzina wydania</th>
        </tr>
        <tr>
            <td rowSpan={3} style={{ width: '35%' }}>
                <div className="car-scheme">
                    Schemat pojazdu (rysunek poglądowy)<br /><br />
                    LEGENDA:<br />
                    R - rysa<br />
                    O - odprysk<br />
                    W - wgniecenie<br />
                    P - pęknięcie<br />
                    B - brak uszkodzeń
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
                Poziom paliwa: 3/4 zbiornika
            </td>
            <td className="fuel-box">
                25 350 km
            </td>
            <td className="notes-box">
                Brak widocznych uszkodzeń nadwozia.<br />
                Wnętrze czyste, komplet dokumentów i kluczyków.
            </td>
        </tr>
        <tr>
            <td colSpan={2} className="small">
                Wynajmujący (potwierdzam zgodność z powyższym opisem samochodu oraz danymi wydania)
            </td>
            <td colSpan={2} className="small">
                Najemca (zgadzam się z powyższymi szczegółami wydania oraz opisem samochodu)
            </td>
        </tr>
        <tr>
            <td className="sign-box"></td>
            <td className="sign-box"></td>
            <td className="sign-box"></td>
            <td className="sign-box"></td>
        </tr>
        </tbody>
    </table>

    <br />

    {/* Zwrot pojazdu */}
    <table>
        <tbody>
        <tr>
            <th className="section-title" colSpan={4}>ZWROT POJAZDU</th>
        </tr>
        <tr>
            <th>Stan pojazdu</th>
            <th colSpan={3}>Data i godzina zwrotu</th>
        </tr>
        <tr>
            <td rowSpan={3} style={{ width: '35%' }}>
                <div className="car-scheme">
                    Schemat pojazdu (rysunek poglądowy)<br /><br />
                    LEGENDA:<br />
                    R - rysa<br />
                    O - odprysk<br />
                    W - wgniecenie<br />
                    P - pęknięcie<br />
                    B - brak uszkodzeń
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
                Poziom paliwa: 1/2 zbiornika
            </td>
            <td className="fuel-box">
                27 980 km
            </td>
            <td className="notes-box">
                Niewielka rysa na tylnym zderzaku lewa strona.<br />
                Wnętrze wymaga podstawowego sprzątania.
            </td>
        </tr>
        <tr>
            <td colSpan={2} className="small">
                Wynajmujący (zgadzam się z powyższymi szczegółami zwrotu oraz opisem samochodu)
            </td>
            <td colSpan={2} className="small">
                Najemca (zgadzam się z powyższymi szczegółami zwrotu oraz opisem samochodu)
            </td>
        </tr>
        <tr>
            <td className="sign-box"></td>
            <td className="sign-box"></td>
            <td className="sign-box"></td>
            <td className="sign-box"></td>
        </tr>
        </tbody>
    </table>

    {/* Stopka */}
    <div className="footer">
        <table>
            <tbody>
            <tr>
                <td className="no-border small">
                    {COMPANY_DETAILS.website} &nbsp;&nbsp; {COMPANY_DETAILS.email} &nbsp;&nbsp; {COMPANY_DETAILS.phone}
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
