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
        margin-bottom: 20px;
        text-transform: uppercase;
        font-weight: 700;
      }

      .pdf-content table {
        width: 100%;
        border-collapse: collapse;
        border-spacing: 0;
        table-layout: fixed;
        margin-bottom: 20px;
      }

      .pdf-content th, 
      .pdf-content td {
        border: 1px solid #000;
        padding: 0;                /* padding bierzemy na wrapperze w środku */
        vertical-align: middle;
        font-size: 12px;
      }

      /* wrapper do wyrównywania treści w komórkach */
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

      .pdf-content .section-title {
        background: #e0e0e0;
        font-weight: 700;
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
        padding: 4px;
      }

      .pdf-content .fuel-box {
        text-align: center;
        height: 40px;
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
          <th className="section-title">
            <div className="cell-center">Wynajmujący</div>
          </th>
          <th className="section-title">
            <div className="cell-center">Najemca</div>
          </th>
        </tr>
        <tr>
          <td>
            <div className="cell-left">
              <div>
                <strong>{COMPANY_DETAILS.name}</strong>, {COMPANY_DETAILS.address}, NIP: {COMPANY_DETAILS.nip} | KRS: {COMPANY_DETAILS.krs}, REGON: {COMPANY_DETAILS.regon}
              </div>
            </div>
          </td>
          <td>
            <div className="cell-left">
              <div>
                <strong>Jan Kowalski</strong>, ul. Testowa 5 m. 12, 01-234 Warszawa, PESEL: 80010112345, Telefon: +48 600 000 000, Dokument tożsamości:</strong> DO ABC123456
              </div>
            </div>
          </td>
        </tr>
      </tbody>
    </table>

    {/* Przedmiot najmu */}
    <table>
      <tbody>
        <tr>
          <th className="section-title">
            <div className="cell-center">Przedmiot najmu</div>
          </th>
        </tr>
        <tr>
          <td>
            <div className="cell-left">
              Marka / model: <strong>Tesla Model 3</strong> &nbsp;|&nbsp;
              Nr rej.: <strong>WX 12345</strong> &nbsp;|&nbsp;
              VIN: <strong>0000000000000000</strong>
            </div>
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
          <th className="section-title" colSpan={4}>
            <div className="cell-center">WYDANIE POJAZDU</div>
          </th>
        </tr>
        <tr>
          <th>
            <div className="cell-center">Stan pojazdu</div>
          </th>
          <th colSpan={3}>
            <div className="cell-center">Data i godzina wydania</div>
          </th>
        </tr>
        <tr>
          <td rowSpan={3}>
            <div className="car-scheme">
              [SCHEMAT POJAZDU]<br/>
              (Brak uszkodzeń)
            </div>
          </td>
          <td colSpan={3}>
            <div className="cell-left">
              <div>
                Data: <strong>10.12.2025</strong><br />
                Godzina: <strong>09:30</strong><br/>
                Miejsce: <strong>Warszawa</strong>
              </div>
            </div>
          </td>
        </tr>
        <tr>
          <th>
            <div className="cell-center">Bateria / Zasięg</div>
          </th>
          <th>
            <div className="cell-center">Przebieg</div>
          </th>
          <th>
            <div className="cell-center">Uwagi / Wyposażenie</div>
          </th>
        </tr>
        <tr>
          <td>
            <div className="cell-center fuel-box">
              85% / 420 km
            </div>
          </td>
          <td>
            <div className="cell-center fuel-box">
              25 350 km
            </div>
          </td>
          <td>
            <div className="cell-left notes-box">
              Kabel Typ 2: TAK<br/>
              Ładowarka mobilna: TAK<br/>
              Trójkąt/Gaśnica: TAK
            </div>
          </td>
        </tr>
        <tr>
          <td colSpan={2} className="section-title">
            <div className="cell-left" style={{ fontSize: '10px' }}>
              Wynajmujący (podpis)
            </div>
          </td>
          <td colSpan={2} className="section-title">
            <div className="cell-left" style={{ fontSize: '10px' }}>
              Najemca (podpis)
            </div>
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
          <th className="section-title" colSpan={4}>
            <div className="cell-center">ZWROT POJAZDU</div>
          </th>
        </tr>
        <tr>
          <th>
            <div className="cell-center">Stan pojazdu</div>
          </th>
          <th colSpan={3}>
            <div className="cell-center">Data i godzina zwrotu</div>
          </th>
        </tr>
        <tr>
          <td rowSpan={3}>
            <div className="car-scheme">
              [SCHEMAT POJAZDU]<br/>
              (Zaznacz uszkodzenia)
            </div>
          </td>
          <td colSpan={3}>
            <div className="cell-left">
              <div>
                Data: ...........................<br />
                Godzina: ........................<br/>
                Miejsce: ........................
              </div>
            </div>
          </td>
        </tr>
        <tr>
          <th>
            <div className="cell-center">Bateria / Zasięg</div>
          </th>
          <th>
            <div className="cell-center">Przebieg</div>
          </th>
          <th>
            <div className="cell-center">Uwagi / Braki</div>
          </th>
        </tr>
        <tr>
          <td>
            <div className="cell-center fuel-box">
              ....... %
            </div>
          </td>
          <td>
            <div className="cell-center fuel-box">
              ................ km
            </div>
          </td>
          <td>
            <div className="cell-left notes-box">
              
            </div>
          </td>
        </tr>
        <tr>
          <td colSpan={2} className="section-title">
            <div className="cell-left" style={{ fontSize: '10px' }}>
              Wynajmujący (podpis)
            </div>
          </td>
          <td colSpan={2} className="section-title">
            <div className="cell-left" style={{ fontSize: '10px' }}>
              Najemca (podpis)
            </div>
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