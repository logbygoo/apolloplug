import type { ReservationFormData } from '../rentalReservationFormData';
import type { TransferFormData } from '../../pages/TransfersPage';
import { ADDITIONAL_OPTIONS } from '../rentConfig';
import { LOCATIONS } from '../locationsConfig';
import { SITE_LOGO_URL } from '../site';

/** Pełny adres punktu odbioru/zwrotu (tytuł z formularza → adres z konfiguracji). */
const formatRentalLocationLine = (title: string): string => {
  const loc = LOCATIONS.find((l) => l.title === title);
  return loc ? `${loc.title} — ${loc.address}` : title;
};

// Define a common type for the email payload
interface EmailPayload {
  to: string;
  from: string;
  subject: string;
  html: string;
  reply_to?: string;
}

// ============================================================================
// === BAZOWE SZABLONY I FUNKCJE POMOCNICZE
// ============================================================================

/**
 * ----------------------------------------------------------------------------
 * Główny szablon "Finansowy"
 * ----------------------------------------------------------------------------
 * Opcjonalnie: duża kwota + podpis pod nią; treść szczegółów poniżej (bez przycisków CTA).
 */
const createFinancialLayout = (opts: {
  pageTitle: string;
  content: string;
  /** Duża kwota pod logo — brak = sekcja ukryta */
  heroAmount?: string;
  /** Tekst pod kwotą */
  heroSubtitle?: string;
}) => {
  const { pageTitle, content, heroAmount, heroSubtitle } = opts;
  const heroBlock =
    heroAmount != null && heroAmount !== ''
      ? `<tr>
                                    <td align="center">
                                        <h1 style="font-size: 32px; font-weight: 700; margin: 0 0 16px 0; color: #111827;">${heroAmount}</h1>
                                        ${
                                          heroSubtitle
                                            ? `<p style="font-size: 18px; color: #4b5563; margin: 0 0 24px 0;">${heroSubtitle}</p>`
                                            : ''
                                        }
                                    </td>
                                </tr>`
      : '';

  return `<!DOCTYPE html>
<html lang="pl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;700&family=Zen+Dots&display=swap" rel="stylesheet">
    <title>${pageTitle}</title>
</head>
<body style="margin: 0; padding: 0; width: 100% !important; -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; background-color: #f0f2f5; font-family: 'Inter', Arial, sans-serif; color: #1c1e21;">
    <table width="100%" border="0" cellPadding="0" cellSpacing="0" style="background-color: #f0f2f5;">
        <tr>
            <td align="center" style="padding: 20px 0;">
                <table width="600" border="0" cellPadding="0" cellSpacing="0" style="max-width: 600px; background-color: #ffffff; border-radius: 12px; box-shadow: 0 4px 12px rgba(0,0,0,0.08);">
                    <!-- Header with Logo -->
                    <tr>
                        <td align="center" style="padding: 24px; border-bottom: 1px solid #e5e7eb;">
                            <img src="${SITE_LOGO_URL}" alt="Apollo Idea" width="160" style="max-width:160px;height:auto;display:block;margin:0 auto;" />
                        </td>
                    </tr>
                    <!-- Main Content -->
                    <tr>
                        <td style="padding: 32px 24px;">
                            <table width="100%" border="0" cellPadding="0" cellSpacing="0">
                                ${heroBlock}
                                <tr>
                                    <td>
                                        ${content}
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                    <!-- Footer -->
                    <tr>
                        <td align="center" style="padding: 24px; border-top: 1px solid #e5e7eb; font-size: 12px; color: #6b7280;">
                            <p style="margin: 0 0 8px 0;">Masz pytania? Skontaktuj się z nami pod adresem <a href="mailto:office@apolloidea.com" style="color: #111827; text-decoration: none;">office@apolloidea.com</a></p>
                            <p style="margin: 0;">apolloidea.com &copy; ${new Date().getFullYear()}</p>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>
</html>
`;
};

/**
 * ----------------------------------------------------------------------------
 * Szablon prosty
 * ----------------------------------------------------------------------------
 * Używany do prostych powiadomień, np. z formularza kontaktowego.
 * @param title - Tytuł widoczny w treści emaila.
 * @param content - Główna treść HTML.
 * @returns Pełny kod HTML emaila.
 */
const createSimpleLayout = (title: string, content: string) => `
  <div style="font-family: 'Inter', Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 20px auto; border: 1px solid #ddd; border-radius: 8px; overflow: hidden;">
    <div style="background-color: #f4f4f4; padding: 20px; text-align: center; border-bottom: 1px solid #e5e7eb;">
      <img src="${SITE_LOGO_URL}" alt="Apollo Idea" width="160" style="max-width:160px;height:auto;display:block;margin:0 auto;" />
    </div>
    <div style="padding: 20px;">
      <h2 style="color: #000;">${title}</h2>
      ${content}
    </div>
    <div style="background-color: #f4f4f4; color: #888; padding: 15px; text-align: center; font-size: 12px;">
      <p>apolloidea.com &copy; ${new Date().getFullYear()}</p>
    </div>
  </div>
`;

// Funkcja pomocnicza do formatowania daty
const formatDate = (dateString: string) => new Date(dateString).toLocaleDateString('pl-PL', { day: 'numeric', month: 'long', year: 'numeric' });

// Funkcja pomocnicza do generowania tabeli ze szczegółami
const generateDetailsTable = (rows: [string, string][]) => {
    return `
    <table width="100%" cellPadding="0" cellSpacing="0" style="border: 1px solid #e5e7eb; border-radius: 8px; overflow: hidden;">
        ${rows.map(([key, value], index) => `
            <tr style="${index % 2 === 0 ? 'background-color: #f9fafb;' : 'background-color: #ffffff;'}">
                <td style="padding: 12px 16px; font-size: 14px; color: #4b5563; border-bottom: ${index === rows.length - 1 ? 'none' : '1px solid #e5e7eb'};">${key}</td>
                <td style="padding: 12px 16px; font-size: 14px; color: #111827; font-weight: 500; text-align: right; border-bottom: ${index === rows.length - 1 ? 'none' : '1px solid #e5e7eb'};">${value}</td>
            </tr>
        `).join('')}
    </table>`;
};

// ============================================================================
// === POWIADOMIENIA Z WYNAJMU (RENTAL)
// ============================================================================

/**
 * WYNAJEM (Admin): Nowa rezerwacja
 * Wysyłane do administratora po złożeniu przez klienta rezerwacji wynajmu.
 */
export const createReservationAdminEmailPayload = (
    data: ReservationFormData,
    summary: any,
    agreements: { terms: boolean; marketing: boolean; commercial: boolean }
): EmailPayload => {
    // --- Budowanie treści (body) ---
    const detailsRows: [string, string][] = [
        ['Model pojazdu', data.model.name],
        [
            'Odbiór',
            `${formatDate(data.pickupDate)} o ${data.pickupTime} — ${formatRentalLocationLine(data.pickupLocation)}`,
        ],
        [
            'Zwrot',
            `${formatDate(data.returnDate)} o ${data.returnTime} — ${formatRentalLocationLine(data.returnLocation)}`,
        ],
        ['Imię i nazwisko', data.fullName],
        ['Email', `<a href="mailto:${data.email}" style="color: #111827; text-decoration: none;">${data.email}</a>`],
        ['Telefon', data.phone],
        ['Adres', `${data.address}, ${data.postalCode} ${data.city}`],
    ];

    if (data.reservationType) {
        detailsRows.push(['Typ najmu', data.reservationType === 'company' ? 'Firmowy' : 'Prywatny']);
    }
    if (data.nip) {
        detailsRows.push(['NIP', data.nip]);
    }

    detailsRows.push(['PESEL', data.pesel]);
    if (data.idDocumentNumber) {
        detailsRows.push(['Nr dowodu / paszport', data.idDocumentNumber]);
    }
    detailsRows.push(['Prawo jazdy', data.licenseNumber]);
    if (data.licenseBlanketNumber) {
        detailsRows.push(['Nr blankietu prawa jazdy', data.licenseBlanketNumber]);
    }

    const detailsContent = generateDetailsTable(detailsRows);

    const paymentContent = generateDetailsTable([
        ['Okres najmu', `${summary.rentalDays} dni`],
        ['Koszt najmu', `${summary.rentalPrice.toLocaleString('pl-PL')} zł`],
        ['Opcje dodatkowe', `${summary.optionsPrice.toLocaleString('pl-PL')} zł`],
        ['<strong>Suma</strong>', `<strong>${summary.totalPrice.toLocaleString('pl-PL')} zł</strong>`],
        ['Kaucja', `${summary.deposit.toLocaleString('pl-PL')} zł`],
        ['<strong>Do zapłaty łącznie</strong>', `<strong>${summary.totalWithDeposit.toLocaleString('pl-PL')} zł</strong>`],
    ]);

    const optionsList = ADDITIONAL_OPTIONS.filter(opt => data.options[opt.id]).map(opt => `<li>${opt.name}</li>`).join('');

    const agreementsContent = generateDetailsTable([
        ['Regulamin i polityka prywatności', agreements.terms ? '&#9989; Tak' : '&#10060; Nie'],
        ['Zapoznanie ze wzorem umowy', agreements.marketing ? '&#9989; Tak' : '&#10060; Nie'],
        ['Zgody handlowe (email/SMS)', agreements.commercial ? '&#9989; Tak' : '&#10060; Nie'],
    ]);

    const fullContent = `
        <h3 style="font-size: 16px; font-weight: 600; margin: 0 0 12px 0; color: #111827;">Szczegóły rezerwacji</h3>
        ${detailsContent}
        <h3 style="font-size: 16px; font-weight: 600; margin: 24px 0 12px 0; color: #111827;">Podsumowanie kosztów</h3>
        ${paymentContent}
        ${optionsList ? `<h3 style="font-size: 16px; font-weight: 600; margin: 24px 0 12px 0; color: #111827;">Wybrane opcje</h3><ul style="padding-left: 20px; margin:0; color: #4b5563;">${optionsList}</ul>` : ''}
        <h3 style="font-size: 16px; font-weight: 600; margin: 24px 0 12px 0; color: #111827;">Zgody</h3>
        ${agreementsContent}
    `;

    const html = createFinancialLayout({
        pageTitle: `Nowa rezerwacja — ${data.model.name}`,
        heroAmount: `${summary.totalPrice.toLocaleString('pl-PL')} zł`,
        heroSubtitle: `Nowa rezerwacja na ${data.model.name}`,
        content: fullContent,
    });

    // --- Konfiguracja i zwrot payloadu ---
    return {
        to: "office@apolloidea.com",
        from: "apolloidea.com <office@apolloidea.com>",
        subject: `WYNAJEM: ${data.model.name} (${data.fullName})`,
        html,
        reply_to: data.email,
    };
};

/**
 * WYNAJEM (Klient): Potwierdzenie otrzymania rezerwacji
 * Wysyłane do klienta po pomyślnym złożeniu rezerwacji (przed płatnością).
 */
export const createReservationCustomerEmailPayload = (data: ReservationFormData, summary: any): EmailPayload => {
    // --- Budowanie treści (body) ---
    const content = generateDetailsTable([
        ['Model pojazdu', data.model.name],
        ['Termin odbioru', `${formatDate(data.pickupDate)} o ${data.pickupTime}`],
        ['Miejsce odbioru', formatRentalLocationLine(data.pickupLocation)],
        ['Termin zwrotu', `${formatDate(data.returnDate)} o ${data.returnTime}`],
        ['Miejsce zwrotu', formatRentalLocationLine(data.returnLocation)],
        ['Do zapłaty (z kaucją)', `<strong>${summary.totalWithDeposit.toLocaleString('pl-PL')} zł</strong>`],
    ]);

    const fullContent = `
      <h2 style="font-size: 20px; font-weight: 700; margin: 0 0 12px 0; color: #111827;">Potwierdzenie rezerwacji</h2>
      <p style="font-size: 16px; color: #4b5563; margin: 0 0 24px 0;">Dziękujemy za złożenie rezerwacji w apolloidea.com. Otrzymaliśmy Twoje zgłoszenie i wkrótce je potwierdzimy.</p>
      ${content}
      <p style="font-size: 14px; color: #4b5563; margin: 24px 0 0 0;">W kolejnym kroku zostaniesz poproszony o dokonanie płatności. Jeśli masz jakiekolwiek pytania, skontaktuj się z nami.</p>
    `;

    const html = createFinancialLayout({
        pageTitle: `Potwierdzenie rezerwacji: ${data.model.name}`,
        content: fullContent,
    });

    // --- Konfiguracja i zwrot payloadu ---
    return {
        to: data.email,
        from: "apolloidea.com <office@apolloidea.com>",
        subject: `Podsumowanie rezerwacji: ${data.model.name}`,
        html,
        reply_to: "office@apolloidea.com",
    };
};

/**
 * WYNAJEM (Admin): Potwierdzenie płatności
 * Wysyłane do administratora po "pomyślnej" płatności klienta.
 * NIE ZAWIERA WRAŻLIWYCH DANYCH.
 */
export const createPaymentConfirmationAdminEmailPayload = (
    data: ReservationFormData,
    summary: any,
    paymentMethod: string
): EmailPayload => {
    const content = generateDetailsTable([
        ['Klient', data.fullName],
        ['Email', `<a href="mailto:${data.email}" style="color: #111827; text-decoration: none;">${data.email}</a>`],
        ['Model pojazdu', data.model.name],
        ['Okres najmu', `${summary.rentalDays} dni`],
        ['Metoda płatności', paymentMethod],
        ['Kwota (z kaucją)', `<strong>${summary.totalWithDeposit.toLocaleString('pl-PL')} zł</strong>`],
    ]);

    const fullContent = `
        <p style="font-size: 16px; color: #4b5563; margin: 0 0 24px 0; text-align: center;">Płatność za poniższą rezerwację została pomyślnie przetworzona.</p>
        ${content}
    `;

    const html = createFinancialLayout({
        pageTitle: `Płatność zakończona pomyślnie`,
        heroAmount: `${summary.totalWithDeposit.toLocaleString('pl-PL')} zł`,
        heroSubtitle: 'Płatność zakończona pomyślnie',
        content: fullContent,
    });

    return {
        to: "office@apolloidea.com",
        from: "apolloidea.com <office@apolloidea.com>",
        subject: `PŁATNOŚĆ: ${data.model.name} (${data.fullName})`,
        html,
        reply_to: data.email,
    };
};


// ============================================================================
// === POWIADOMIENIA Z TRANSFERÓW (TRANSFERS)
// ============================================================================

/**
 * TRANSFER (Admin): Nowe zamówienie
 * Wysyłane do administratora po zamówieniu transferu przez klienta.
 */
export const createTransferAdminEmailPayload = (data: TransferFormData, summary: any): EmailPayload => {
    // --- Budowanie treści (body) ---
    const detailsRows: [string, string][] = [
        ['Klient', data.customerName],
        ['Email', `<a href="mailto:${data.customerEmail}" style="color: #111827; text-decoration: none;">${data.customerEmail}</a>`],
        ['Telefon', data.customerPhone],
        ['Pojazd', data.selectedCar?.name || 'N/A'],
        ['Typ przejazdu', data.transferType === 'hourly' ? `Kierowca na godziny (${data.selectedPackage?.label})` : 'Standardowy'],
        ['Termin', `${formatDate(data.pickupDate)} o ${data.pickupTime}`],
        ['Adres odbioru', data.pickupAddress?.formatted_address || 'N/A'],
    ];

    if (data.transferType !== 'hourly') {
        detailsRows.push(['Adres docelowy', data.destinationAddress?.formatted_address || 'N/A']);
    }

    if (data.driverMessage) {
        detailsRows.push(['Wiadomość od klienta', data.driverMessage]);
    }

    const fullContent = `
        <h3 style="font-size: 16px; font-weight: 600; margin: 0 0 12px 0; color: #111827;">Szczegóły zamówienia</h3>
        ${generateDetailsTable(detailsRows)}
    `;

    const html = createFinancialLayout({
        pageTitle: `Nowe zamówienie transferu`,
        heroAmount: summary.price,
        heroSubtitle: 'Nowe zamówienie transferu',
        content: fullContent,
    });
    
    // --- Konfiguracja i zwrot payloadu ---
    return {
        to: "office@apolloidea.com",
        from: "apolloidea.com <office@apolloidea.com>",
        subject: `TRANSFER: ${data.selectedCar?.name} (${data.customerName})`,
        html,
        reply_to: data.customerEmail,
    };
};

/**
 * TRANSFER (Klient): Potwierdzenie zamówienia
 * Wysyłane do klienta po pomyślnym zamówieniu transferu.
 */
export const createTransferCustomerEmailPayload = (data: TransferFormData, summary: any): EmailPayload => {
    // --- Budowanie treści (body) ---
    const detailsRows: [string, string][] = [
        ['Pojazd', data.selectedCar?.name || 'N/A'],
        ['Kierowca', 'Przydzielony'],
        ['Termin', `${formatDate(data.pickupDate)} o ${data.pickupTime}`],
        ['Adres odbioru', data.pickupAddress?.formatted_address || 'N/A'],
    ];

    if (data.transferType === 'hourly') {
        detailsRows.push(['Pakiet', `Kierowca na godziny (${data.selectedPackage?.label})`]);
    } else {
        detailsRows.push(['Adres docelowy', data.destinationAddress?.formatted_address || 'N/A']);
    }

    const fullContent = `
      <p style="font-size: 16px; color: #4b5563; margin: 0 0 24px 0; text-align: center;">Dziękujemy za zamówienie transferu. Otrzymaliśmy Twoje zgłoszenie i wkrótce potwierdzimy szczegóły.</p>
      ${generateDetailsTable(detailsRows)}
    `;

    const html = createFinancialLayout({
        pageTitle: `Potwierdzenie zamówienia transferu`,
        heroAmount: summary.price,
        heroSubtitle: 'Potwierdzenie zamówienia',
        content: fullContent,
    });

    // --- Konfiguracja i zwrot payloadu ---
    return {
        to: data.customerEmail,
        from: "apolloidea.com <office@apolloidea.com>",
        subject: `Podsumowanie zamówienia transferu: ${data.selectedCar?.name}`,
        html,
        reply_to: "office@apolloidea.com",
    };
};

// ============================================================================
// === POWIADOMIENIA Z FORMULARZA KONTAKTOWEGO (CONTACT)
// ============================================================================

/**
 * KONTAKT (Admin): Nowe zapytanie
 * Wysyłane do administratora po wypełnieniu formularza kontaktowego.
 */
export const createContactAdminEmailPayload = (name: string, email: string, message: string): EmailPayload => {
    // --- Budowanie treści (body) ---
    const content = `
        <p><b>Od:</b> ${name} (<a href="mailto:${email}">${email}</a>)</p>
        <p><b>Wiadomość:</b></p>
        <div style="background-color: #f4f4f4; border-radius: 4px; padding: 15px; border-left: 3px solid #ccc;">
          <p style="margin:0;">${message.replace(/\n/g, "<br>")}</p>
        </div>
    `;
    const html = createSimpleLayout(`Nowe zapytanie od: ${name}`, content);
    
    // --- Konfiguracja i zwrot payloadu ---
    return {
        to: "office@apolloidea.com",
        from: "Apollo Plug <office@apolloidea.com>",
        subject: `Nowe zapytanie ze strony: ${name}`,
        html,
        reply_to: email,
    };
};

/**
 * KONTAKT (Klient): Potwierdzenie otrzymania wiadomości
 * Wysyłane do klienta jako automatyczna odpowiedź po wysłaniu formularza.
 */
export const createContactCustomerEmailPayload = (name: string, email: string, message: string): EmailPayload => {
    // --- Budowanie treści (body) ---
    const content = `
        <p>Otrzymaliśmy Twoją wiadomość i skontaktujemy się z Tobą jak najszybciej.</p>
        <p><b>Twoja wiadomość:</b></p>
        <div style="background-color: #f4f4f4; border-radius: 4px; padding: 15px; border-left: 3px solid #ccc;">
          <p style="margin:0;">${message.replace(/\n/g, "<br>")}</p>
        </div>
    `;
    const html = createSimpleLayout(`Cześć ${name}, dziękujemy za kontakt!`, content);
    
    // --- Konfiguracja i zwrot payloadu ---
    return {
        to: email,
        from: "Apollo Plug <office@apolloidea.com>",
        subject: "Potwierdzenie otrzymania wiadomości | apolloidea.com",
        html,
        reply_to: "office@apolloidea.com",
    };
};

// ============================================================================
// === WYJŚCIE ZE STRONY (EXIT-INTENT)
// ============================================================================

export const createExitIntentFeedbackEmailPayload = (data: {
  reasons: string[];
  message: string;
  contactEmail: string;
  contactPhone: string;
  path: string;
}): EmailPayload => {
  const reasonsText = data.reasons.length ? data.reasons.join(', ') : 'Brak zaznaczonych powodów';

  const content = `
    <p><b>Adres strony:</b> ${data.path}</p>
    <p><b>Powody odejścia:</b> ${reasonsText}</p>
    <p><b>Opis / komentarz użytkownika:</b></p>
    <div style="background-color: #f4f4f4; border-radius: 4px; padding: 15px; border-left: 3px solid #ccc; margin-bottom: 16px;">
      <p style="margin:0;">${(data.message || '').trim().replace(/\n/g, "<br>") || '—'}</p>
    </div>
    <p><b>Dane kontaktowe (opcjonalne):</b></p>
    <ul>
      <li><b>E-mail:</b> ${data.contactEmail || '—'}</li>
      <li><b>Telefon:</b> ${data.contactPhone || '—'}</li>
    </ul>
  `;

  const html = createSimpleLayout('Użytkownik chciał opuścić stronę', content);

  return {
    to: "office@apolloidea.com",
    from: "Apollo Plug <office@apolloidea.com>",
    subject: "Exit-intent: użytkownik wychodzi ze strony",
    html,
    reply_to: data.contactEmail || "office@apolloidea.com",
  };
};