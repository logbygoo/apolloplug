
import React from 'react';

export const SampleContractContent = (
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
);
