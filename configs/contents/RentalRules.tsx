
import React from 'react';

export const RentalRulesContent = (
  <div style={{ padding: '40px', fontFamily: 'Arial, sans-serif' }}>
    <h1 className="text-2xl font-bold mb-4">Regulamin Wypożyczalni Samochodów Elektrycznych</h1>
    
    <h2 className="text-xl font-bold mt-6 mb-2">I. Warunki Najmu</h2>
    <p>1. Najemcą może być osoba, która ukończyła 21 lat i posiada ważne prawo jazdy od co najmniej 2 lat.</p>
    <p>2. Przed wydaniem pojazdu Najemca zobowiązany jest do wpłacenia kaucji zwrotnej w wysokości określonej w cenniku.</p>

    <h2 className="text-xl font-bold mt-6 mb-2">II. Użytkowanie Pojazdu</h2>
    <p>1. Pojazdem może kierować wyłącznie Najemca lub osoba wskazana w umowie jako drugi kierowca.</p>
    <p>2. W pojazdach obowiązuje całkowity zakaz palenia tytoniu.</p>
    <p>3. Pojazdy są monitorowane systemem GPS.</p>

    <h2 className="text-xl font-bold mt-6 mb-2">III. Ładowanie i Zwrot</h2>
    <p>1. Samochód wydawany jest z poziomem naładowania baterii minimum 80%.</p>
    <p>2. Najemca nie ma obowiązku zwrotu naładowanego samochodu, chyba że wybrano opcję bez obsługi "pustej baterii" (wtedy min. 10% przy zwrocie).</p>
    <p>3. Koszty ładowania na stacjach publicznych innych niż Supercharger (jeśli nie zawarto w pakiecie) pokrywa Najemca.</p>
  </div>
);
