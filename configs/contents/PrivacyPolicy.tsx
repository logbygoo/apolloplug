
import React from 'react';
import { COMPANY_DETAILS } from '../companyDetails';

export const PrivacyPolicyContent = (
  <div style={{ padding: '40px', fontFamily: 'Arial, sans-serif' }}>
    <h1 className="text-2xl font-bold mb-4">Polityka Prywatności</h1>
    
    <h2 className="text-xl font-bold mt-6 mb-2">1. Kto jest administratorem danych?</h2>
    <p>Administratorem Twoich danych osobowych jest {COMPANY_DETAILS.name}, {COMPANY_DETAILS.address}, NIP: {COMPANY_DETAILS.nip}.</p>

    <h2 className="text-xl font-bold mt-6 mb-2">2. Jakie dane przetwarzamy?</h2>
    <p>Przetwarzamy dane, które podajesz nam podczas:</p>
    <ul className="list-disc pl-5 my-2">
      <li>Rezerwacji pojazdu (imię, nazwisko, PESEL, nr prawa jazdy, adres),</li>
      <li>Kontaktu przez formularz (email, nr telefonu),</li>
      <li>Korzystania ze strony (pliki cookies, adres IP).</li>
    </ul>

    <h2 className="text-xl font-bold mt-6 mb-2">3. Cel przetwarzania</h2>
    <p>Twoje dane są przetwarzane w celu realizacji umowy najmu, obsługi zapytań, marketingu bezpośredniego (za Twoją zgodą) oraz w celach analitycznych.</p>

    <h2 className="text-xl font-bold mt-6 mb-2">4. Twoje prawa</h2>
    <p>Masz prawo do wglądu w swoje dane, ich sprostowania, usunięcia ("prawo do bycia zapomnianym") oraz ograniczenia przetwarzania.</p>
  </div>
);
