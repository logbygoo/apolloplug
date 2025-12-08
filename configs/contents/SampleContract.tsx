
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

      .pdf-content h1 {
        text-align: center;
        font-size: 20px;
        margin-bottom: 20px;
        text-transform: uppercase;
        font-weight: 700;
      }

      .pdf-content table {
        width: 100%;
        border-collapse: collapse;
        table-layout: fixed;
        margin-bottom: 20px;
      }

      .pdf-content th, 
      .pdf-content td {
        border: 1px solid #000;
        padding: 5px 8px;
        vertical-align: middle;
        word-wrap: break-word;
        font-size: 12px;
      }

      .pdf-content .section-title {
        background: #e0e0e0;
        font-weight: 700;
        text-align: center;
        text-transform: uppercase;
        font-size: 13px;
      }

      .pdf-content .car-scheme {
        height: 130px;
        text-align: center;
        font-size: 10px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        border: 1px dashed #ccc;
        margin: 4px;
      }

      .pdf-content .fuel-box {
        text-align: center;
        height: 40px;
        vertical-align: middle;
      }

      .pdf-content .notes-box {
        height: 70px;
      }

      .pdf-content .sign-box {
        height: 50px;
      }

      .pdf-content .footer {
        margin-top: 20px;
        font-size: 10px;
        width: 100%;
        border-top: 1px solid #000;
        padding-top: 10px;
      }

      .pdf-content .no-border {
        border: none !important;
      }
      
      .pdf-content .right {
        text-align: right;
      }

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
                <strong>{COMPANY_DETAILS.name}</strong><br />
                {COMPANY_DETAILS.address}<br />
                NIP: {COMPANY_DETAILS.nip} | KRS: {COMPANY_DETAILS.krs}<br />
                REGON: {COMPANY_DETAILS.regon}
            </td>
            <td>
                <strong>Imię i nazwisko:</strong> Jan Kowalski<br />
                <strong>Adres:</strong> ul. Testowa 5 m. 12, 01-234 Warszawa<br />
                <strong>PESEL:</strong> 80010112345<br />
                <strong>Telefon:</strong> +48 600 000 000<br />
                <strong>Dokument tożsamości:</strong> DO ABC123456
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
                Marka / model: <strong>Tesla Model 3</strong> &nbsp;|&nbsp;
                Nr rej.: <strong>WX 12345</strong> &nbsp;|&nbsp;
                VIN: <strong>5YJ3E7EB0MF123456</strong>
            </td>
        </tr>
        </tbody>
    </table>

    {/* Wydanie pojazdu */}
    <table>
        <colgroup>
            <col style={{ width: '30%' }} />
            <col style={{ width: '23%' }} />
            <col style={{ width: '23%' }} />
            <col style={{ width: '24%' }} />
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
                    [SCHEMAT POJAZDU]<br/>
                    (Brak uszkodzeń)
                </div>
            </td>
            <td colSpan={3}>
                Data: <strong>10.12.2025</strong><br />
                Godzina: <strong>09:30</strong><br/>
                Miejsce: <strong>Warszawa</strong>
            </td>
        </tr>
        <tr>
            <th>Bateria / Zasięg</th>
            <th>Przebieg</th>
            <th>Uwagi / Wyposażenie</th>
        </tr>
        <tr>
            <td className="fuel-box">
                85% / 420 km
            </td>
            <td className="fuel-box">
                25 350 km
            </td>
            <td className="notes-box">
                Kabel Typ 2: TAK<br/>
                Ładowarka mobilna: TAK<br/>
                Trójkąt/Gaśnica: TAK
            </td>
        </tr>
        <tr>
            <td colSpan={2} className="section-title" style={{textAlign: 'left', fontSize: '10px'}}>
                Wynajmujący (podpis)
            </td>
            <td colSpan={2} className="section-title" style={{textAlign: 'left', fontSize: '10px'}}>
                Najemca (podpis)
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
            <col style={{ width: '30%' }} />
            <col style={{ width: '23%' }} />
            <col style={{ width: '23%' }} />
            <col style={{ width: '24%' }} />
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
                    [SCHEMAT POJAZDU]<br/>
                    (Zaznacz uszkodzenia)
                </div>
            </td>
            <td colSpan={3}>
                Data: ...........................<br />
                Godzina: ........................<br/>
                Miejsce: ........................
            </td>
        </tr>
        <tr>
            <th>Bateria / Zasięg</th>
            <th>Przebieg</th>
            <th>Uwagi / Braki</th>
        </tr>
        <tr>
            <td className="fuel-box">
                ....... %
            </td>
            <td className="fuel-box">
                ................ km
            </td>
            <td className="notes-box">
                
            </td>
        </tr>
        <tr>
            <td colSpan={2} className="section-title" style={{textAlign: 'left', fontSize: '10px'}}>
                Wynajmujący (podpis)
            </td>
            <td colSpan={2} className="section-title" style={{textAlign: 'left', fontSize: '10px'}}>
                Najemca (podpis)
            </td>
        </tr>
        <tr>
            <td colSpan={2} className="sign-box"></td>
            <td colSpan={2} className="sign-box"></td>
        </tr>
        </tbody>
    </table>

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
