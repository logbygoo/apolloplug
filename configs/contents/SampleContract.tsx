
import React from 'react';
import { COMPANY_DETAILS } from '../companyDetails';

export const SampleContractContent = (
  <div className="pdf-content">
    <style>{`
      .pdf-content {
        padding: 20px;
        background: white;
        font-size: 12px;
        font-family: Arial, sans-serif;
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
        padding: 0;
        vertical-align: top;
        font-size: 12px;
      }

      .pdf-content .cell-pad {
        padding: 6px 8px;
        width: 100%;
        height: 100%;
        line-height: 1.4;
      }

      .pdf-content .section-title {
        background: #e0e0e0;
        font-weight: 700;
        text-transform: uppercase;
        font-size: 13px;
        text-align: center;
        vertical-align: middle;
      }

      .pdf-content .sign-box {
        height: 80px;
        vertical-align: bottom;
        padding: 10px;
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
      
      .pdf-content .center {
        text-align: center;
      }

      .pdf-content p { margin: 0; margin-bottom: 5px; }
    `}</style>

    <h1>UMOWA NAJMU SAMOCHODU</h1>

    {/* Data i Miejsce */}
    <table>
      <tbody>
        <tr>
          <td>
            <div className="cell-pad">
              <strong>Data zawarcia:</strong> .....................................
            </div>
          </td>
          <td>
            <div className="cell-pad">
              <strong>Miejsce zawarcia:</strong> .....................................
            </div>
          </td>
        </tr>
      </tbody>
    </table>

    {/* Strony umowy */}
    <table>
      <colgroup>
        <col style={{ width: '50%' }} />
        <col style={{ width: '50%' }} />
      </colgroup>
      <tbody>
        <tr>
          <th className="section-title"><div className="cell-pad">Wynajmujący</div></th>
          <th className="section-title"><div className="cell-pad">Najemca</div></th>
        </tr>
        <tr>
          <td>
            <div className="cell-pad">
              <strong>{COMPANY_DETAILS.name}</strong><br/>
              {COMPANY_DETAILS.address}<br/>
              NIP: {COMPANY_DETAILS.nip}<br/>
              KRS: {COMPANY_DETAILS.krs}<br/>
              Tel: {COMPANY_DETAILS.phone}
            </div>
          </td>
          <td>
            <div className="cell-pad">
              <strong>Imię i nazwisko / Firma:</strong><br/>
              Jan Kowalski<br/>
              <strong>Adres:</strong><br/>
              ul. Testowa 1, 00-000 Warszawa<br/>
              <strong>PESEL / NIP:</strong> 00000000000<br/>
              <strong>Nr dokumentu:</strong> ABC 123456
            </div>
          </td>
        </tr>
      </tbody>
    </table>

    {/* Przedmiot umowy */}
    <table>
        <tbody>
            <tr>
                <th className="section-title" colSpan={2}><div className="cell-pad">§1 PRZEDMIOT NAJMU</div></th>
            </tr>
            <tr>
                <td colSpan={2}>
                    <div className="cell-pad">
                        1. Wynajmujący oddaje w najem Najemcy samochód marki <strong>Tesla Model 3</strong>, 
                        o numerze rejestracyjnym <strong>WX 12345</strong> i numerze VIN <strong>0000000000000000</strong>.<br/>
                        2. Najemca oświadcza, że zapoznał się ze stanem technicznym pojazdu i nie wnosi do niego zastrzeżeń (szczegóły w Protokole Zdawczo-Odbiorczym).
                    </div>
                </td>
            </tr>
        </tbody>
    </table>

    {/* Czas trwania i warunki */}
    <table>
        <tbody>
            <tr>
                <th className="section-title" colSpan={2}><div className="cell-pad">§2 WARUNKI NAJMU</div></th>
            </tr>
            <tr>
                <td>
                    <div className="cell-pad">
                        <strong>Okres najmu:</strong><br/>
                        Od: ..................................... Godz: ..........<br/>
                        Do: ..................................... Godz: ..........
                    </div>
                </td>
                <td>
                    <div className="cell-pad">
                        <strong>Koszty:</strong><br/>
                        Stawka dobowa: ................. PLN brutto<br/>
                        Kaucja zwrotna: ................. PLN<br/>
                        Limit kilometrów: ................. km / doba
                    </div>
                </td>
            </tr>
        </tbody>
    </table>

    {/* Oświadczenia */}
    <table>
        <tbody>
            <tr>
                <th className="section-title"><div className="cell-pad">§3 OŚWIADCZENIA I ZOBOWIĄZANIA</div></th>
            </tr>
            <tr>
                <td>
                    <div className="cell-pad">
                        1. Najemca zobowiązuje się używać pojazdu zgodnie z jego przeznaczeniem oraz warunkami określonymi w Regulaminie Wypożyczalni.<br/>
                        2. Najemca ponosi pełną odpowiedzialność za wszelkie szkody powstałe z jego winy oraz za wykroczenia drogowe popełnione w okresie najmu.<br/>
                        3. W samochodzie obowiązuje całkowity zakaz palenia tytoniu.<br/>
                        4. Zwrot pojazdu po terminie bez zgody Wynajmującego skutkuje naliczeniem kar umownych zgodnie z Cennikiem.<br/>
                        5. Wynajmujący oświadcza, że pojazd posiada ważne ubezpieczenie OC/AC/NNW.
                    </div>
                </td>
            </tr>
        </tbody>
    </table>

    {/* Podpisy */}
    <table>
        <colgroup>
            <col style={{ width: '50%' }} />
            <col style={{ width: '50%' }} />
        </colgroup>
        <tbody>
            <tr>
                <td className="sign-box center">
                    <br/><br/>
                    ................................................................<br/>
                    Podpis Wynajmującego
                </td>
                <td className="sign-box center">
                    <br/><br/>
                    ................................................................<br/>
                    Podpis Najemcy
                </td>
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
