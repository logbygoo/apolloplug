import type { FormData } from '../pages/RentalPage';
import { ADDITIONAL_OPTIONS } from '../configs/rentConfig';

const createFinancialLayout = (title: string, mainAmount: string, content: string, buttonUrl: string = '#', buttonText: string = 'Zarządzaj rezerwacją') => `
<!DOCTYPE html>
<html lang="pl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;700&family=Zen+Dots&display=swap" rel="stylesheet">
    <title>${title}</title>
</head>
<body style="margin: 0; padding: 0; width: 100% !important; -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; background-color: #f0f2f5; font-family: 'Inter', Arial, sans-serif; color: #1c1e21;">
    <table width="100%" border="0" cellPadding="0" cellSpacing="0" style="background-color: #f0f2f5;">
        <tr>
            <td align="center" style="padding: 20px 0;">
                <table width="600" border="0" cellPadding="0" cellSpacing="0" style="max-width: 600px; background-color: #ffffff; border-radius: 12px; box-shadow: 0 4px 12px rgba(0,0,0,0.08);">
                    <!-- Header with Logo -->
                    <tr>
                        <td align="center" style="padding: 24px; border-bottom: 1px solid #e5e7eb;">
                            <div style="font-family: 'Zen Dots', sans-serif; font-size: 24px; letter-spacing: -1px;">
                                apollo<span style="background-color: #111827; color: #ffffff; padding: 2px 8px; border-radius: 4px; margin-left: 4px;">plug</span>
                            </div>
                        </td>
                    </tr>
                    <!-- Main Content -->
                    <tr>
                        <td style="padding: 32px 24px;">
                            <table width="100%" border="0" cellPadding="0" cellSpacing="0">
                                <!-- Main Message -->
                                <tr>
                                    <td align="center">
                                        <h1 style="font-size: 32px; font-weight: 700; margin: 0 0 16px 0; color: #111827;">${mainAmount}</h1>
                                        <p style="font-size: 18px; color: #4b5563; margin: 0 0 24px 0;">${title}</p>
                                    </td>
                                </tr>
                                <!-- Action Button -->
                                <tr>
                                    <td align="center" style="padding-bottom: 32px;">
                                        <a href="${buttonUrl}" target="_blank" style="display: inline-block; background-color: #111827; color: #ffffff; font-size: 16px; font-weight: 500; text-decoration: none; padding: 14px 28px; border-radius: 8px;">
                                            ${buttonText}
                                        </a>
                                    </td>
                                </tr>
                                <!-- Details Section -->
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
                            <p style="margin: 0 0 8px 0;">Masz pytania? Skontaktuj się z nami pod adresem <a href="mailto:office@apolloplug.com" style="color: #111827; text-decoration: none;">office@apolloplug.com</a></p>
                            <p style="margin: 0;">ApolloPlug.com &copy; ${new Date().getFullYear()}</p>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>
</html>
`;


const createSimpleLayout = (title: string, content: string) => `
  <div style="font-family: 'Inter', Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 20px auto; border: 1px solid #ddd; border-radius: 8px; overflow: hidden;">
    <div style="background-color: #000; color: #fff; padding: 20px; text-align: center; font-family: 'Zen Dots', sans-serif;">
      <h1 style="margin: 0;">apollo<span style="background-color: #fff; color: #000; padding: 2px 6px; border-radius: 3px; margin-left: 4px;">plug</span></h1>
    </div>
    <div style="padding: 20px;">
      <h2 style="color: #000;">${title}</h2>
      ${content}
    </div>
    <div style="background-color: #f4f4f4; color: #888; padding: 15px; text-align: center; font-size: 12px;">
      <p>ApolloPlug.com &copy; ${new Date().getFullYear()}</p>
    </div>
  </div>
`;

// FIX: Corrected typo from toLocaleDateDateString to toLocaleDateString.
const formatDate = (dateString: string) => new Date(dateString).toLocaleDateString('pl-PL', { day: 'numeric', month: 'long', year: 'numeric' });

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

export const generateReservationAdminEmail = (data: FormData, summary: any) => {
    const detailsContent = generateDetailsTable([
        ['Model pojazdu', data.model.name],
        ['Odbiór', `${formatDate(data.pickupDate)} o ${data.pickupTime} w ${data.pickupLocation}`],
        ['Zwrot', `${formatDate(data.returnDate)} o ${data.returnTime} w ${data.returnLocation}`],
        ['Imię i nazwisko', data.fullName],
        ['Email', `<a href="mailto:${data.email}" style="color: #111827; text-decoration: none;">${data.email}</a>`],
        ['Telefon', data.phone],
        ['Adres', `${data.address}, ${data.postalCode} ${data.city}`],
        ['PESEL', data.pesel],
        ['Prawo jazdy', data.licenseNumber],
        ...(data.nip ? [['NIP', data.nip]] : []),
    ]);

    const paymentContent = generateDetailsTable([
        ['Okres najmu', `${summary.rentalDays} dni`],
        ['Koszt najmu', `${summary.rentalPrice.toLocaleString('pl-PL')} zł`],
        ['Opcje dodatkowe', `${summary.optionsPrice.toLocaleString('pl-PL')} zł`],
        ['<strong>Suma</strong>', `<strong>${summary.totalPrice.toLocaleString('pl-PL')} zł</strong>`],
        ['Kaucja', `${summary.deposit.toLocaleString('pl-PL')} zł`],
        ['<strong>Do zapłaty łącznie</strong>', `<strong>${summary.totalWithDeposit.toLocaleString('pl-PL')} zł</strong>`],
    ]);

    const optionsList = ADDITIONAL_OPTIONS.filter(opt => data.options[opt.id]).map(opt => `<li>${opt.name}</li>`).join('');

    const fullContent = `
        <h3 style="font-size: 16px; font-weight: 600; margin: 0 0 12px 0; color: #111827;">Szczegóły rezerwacji</h3>
        ${detailsContent}
        <h3 style="font-size: 16px; font-weight: 600; margin: 24px 0 12px 0; color: #111827;">Podsumowanie kosztów</h3>
        ${paymentContent}
        ${optionsList ? `<h3 style="font-size: 16px; font-weight: 600; margin: 24px 0 12px 0; color: #111827;">Wybrane opcje</h3><ul style="padding-left: 20px; margin:0; color: #4b5563;">${optionsList}</ul>` : ''}
    `;

    return createFinancialLayout(
        `Nowa rezerwacja na ${data.model.name}`,
        `${summary.totalWithDeposit.toLocaleString('pl-PL')} zł`,
        fullContent
    );
};

export const generateReservationCustomerEmail = (data: FormData, summary: any) => {
    const content = generateDetailsTable([
        ['Model pojazdu', data.model.name],
        ['Termin odbioru', `${formatDate(data.pickupDate)} o ${data.pickupTime}`],
        ['Miejsce odbioru', data.pickupLocation],
        ['Termin zwrotu', `${formatDate(data.returnDate)} o ${data.returnTime}`],
        ['Miejsce zwrotu', data.returnLocation],
        ['Do zapłaty (z kaucją)', `<strong>${summary.totalWithDeposit.toLocaleString('pl-PL')} zł</strong>`],
    ]);

    const fullContent = `
      <p style="font-size: 16px; color: #4b5563; margin: 0 0 24px 0; text-align: center;">Dziękujemy za złożenie rezerwacji w ApolloPlug.com. Otrzymaliśmy Twoje zgłoszenie i wkrótce je potwierdzimy.</p>
      ${content}
      <p style="font-size: 14px; color: #4b5563; margin: 24px 0 0 0; text-align: center;">W kolejnym kroku zostaniesz poproszony o dokonanie płatności. Jeśli masz jakiekolwiek pytania, skontaktuj się z nami.</p>
    `;

    return createFinancialLayout(
        `Potwierdzenie rezerwacji ${data.model.name}`,
        `${summary.totalWithDeposit.toLocaleString('pl-PL')} zł`,
        fullContent
    );
};

export const generatePaymentAdminEmail = (cardData: { cardNumber: string; cardExpiry: string; cardCVC: string }, customerEmail: string) => {
    const content = `
      <div style="background-color: #fef2f2; border: 1px solid #fecaca; padding: 16px; border-radius: 8px; margin-bottom: 24px;">
          <h3 style="color: #b91c1c; margin: 0 0 8px 0; font-size: 16px;">UWAGA: Otrzymano wrażliwe dane płatnicze</h3>
          <p style="color: #b91c1c; margin: 0; font-size: 14px;">Należy je natychmiast bezpiecznie przetworzyć i trwale usunąć.</p>
      </div>
      ${generateDetailsTable([
        ['Email klienta', `<a href="mailto:${customerEmail}" style="color: #111827; text-decoration: none;">${customerEmail}</a>`],
        ['Numer karty', cardData.cardNumber],
        ['Data ważności (MM/RR)', cardData.cardExpiry],
        ['Kod CVC', cardData.cardCVC],
      ])}
    `;
    
    return createFinancialLayout(
        `Dane Płatnicze do rezerwacji`,
        'Otrzymano dane karty',
        content,
        '#',
        'Przejdź do panelu'
    );
};


export const generateContactAdminEmail = (name: string, email: string, message: string) => {
    const content = `
        <p><b>Od:</b> ${name} (<a href="mailto:${email}">${email}</a>)</p>
        <p><b>Wiadomość:</b></p>
        <div style="background-color: #f4f4f4; border-radius: 4px; padding: 15px; border-left: 3px solid #ccc;">
          <p style="margin:0;">${message.replace(/\n/g, "<br>")}</p>
        </div>
    `;
    return createSimpleLayout(`Nowe zapytanie od: ${name}`, content);
};

export const generateContactCustomerEmail = (name: string, message: string) => {
    const content = `
        <p>Otrzymaliśmy Twoją wiadomość i skontaktujemy się z Tobą jak najszybciej.</p>
        <p><b>Twoja wiadomość:</b></p>
        <div style="background-color: #f4f4f4; border-radius: 4px; padding: 15px; border-left: 3px solid #ccc;">
          <p style="margin:0;">${message.replace(/\n/g, "<br>")}</p>
        </div>
    `;
    return createSimpleLayout(`Cześć ${name}, dziękujemy za kontakt!`, content);
};