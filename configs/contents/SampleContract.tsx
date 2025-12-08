
import React from 'react';
import { COMPANY_DETAILS } from '../companyDetails';

export const SampleContractContent = (
  <>
    <style>{`
        .protocol-container {
            font-family: Arial, Helvetica, sans-serif;
            font-size: 11px;
            color: #000;
            line-height: 1.3;
            padding: 20px;
        }

        .protocol-container h1 {
            text-align: center;
            font-size: 18px;
            margin-bottom: 15px;
            text-transform: uppercase;
            font-weight: bold;
        }

        .protocol-container table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 15px;
        }

        .protocol-container th, .protocol-container td {
            border: 1px solid #555;
            padding: 4px 6px;
            vertical-align: top;
        }

        .protocol-container .no-border {
            border: none;
        }

        .protocol-container .section-title {
            background: #e0e0e0;
            font-weight: bold;
            text-align: center;
            text-transform: uppercase;
        }

        .protocol-container .subheader {
            background: #f5f5f5;
            font-weight: bold;
        }

        .protocol-container .small {
            font-size: 9px;
        }

        .protocol-container .car-scheme {
            height: 110px;
            text-align: center;
            font-size: 9px;
            padding-top: 5px;
        }

        .protocol-container .fuel-box {
            text-align: center;
            font-size: 10px;
            height: 45px;
            vertical-align: middle;
        }

        .protocol-container .notes-box {
            height: 60px;
        }

        .protocol-container .sign-box {
            height: 50px;
        }

        .protocol-container .footer {
            margin-top: 15px;
            font-size: 9px;
            border-top: 1px solid #ccc;
            padding-top: 5px;
        }

        .protocol-container .right {
            text-align: right;
        }
    `}</style>

    <div className="protocol-container">
        <h1>PROTOKÓŁ ZDAWCZO-ODBIORCZY</h1>

        {/* Dane stron */}
        <table>
            <tbody>
                <tr>
                    <th className="section-title" style={{ width: '50%' }}>Wynajmujący</th>
                    <th className="section-title" style={{ width: '50%' }}>Najemca</th>
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
                        Marka / model: Tesla Model 3 Highland<br />
                        Rodzaj paliwa: Elektryczny<br />
                        Pojemność / moc: - / 490 KM<br />
                        Nr rejestracyjny: WX 12345<br />
                        Nr VIN: 5YJ3E7EB0KF123456
                    </td>
                </tr>
            </tbody>
        </table>

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
                        Data: ....................<br />
                        Godzina: ....................
                    </td>
                </tr>
                <tr>
                    <th>Stan naładowania</th>
                    <th>Przebieg</th>
                    <th>Uwagi dodatkowe</th>
                </tr>
                <tr>
                    <td className="fuel-box">
                        Poziom baterii: ...... %
                    </td>
                    <td className="fuel-box">
                        .................... km
                    </td>
                    <td className="notes-box">
                        ................................................<br />
                        ................................................
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
                        Data: ....................<br />
                        Godzina: ....................
                    </td>
                </tr>
                <tr>
                    <th>Stan naładowania</th>
                    <th>Przebieg</th>
                    <th>Uwagi dodatkowe</th>
                </tr>
                <tr>
                    <td className="fuel-box">
                        Poziom baterii: ...... %
                    </td>
                    <td className="fuel-box">
                        .................... km
                    </td>
                    <td className="notes-box">
                         ................................................<br />
                         ................................................
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
  </>
);
