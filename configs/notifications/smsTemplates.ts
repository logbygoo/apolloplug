import type { ReservationFormData } from '../rentalReservationFormData';
import type { TransferFormData } from '../../pages/TransfersPage';

interface Summary {
  rentalDays: number;
  totalPrice: number;
}

interface TransferSummary {
    rawPrice: number;
    distance: string; // For hourly, this will be the package label
}

interface SmsPayload {
  to: string;
  message: string;
  from: string;
}

const SMS_SENDER = 'Apollo';

// ============================================================================
// === POWIADOMIENIA SMS Z WYNAJMU (RENTAL)
// ============================================================================

/**
 * WYNAJEM (Admin): Powiadomienie o nowej rezerwacji.
 * Wysyłane do administratora, zawiera kluczowe dane rezerwacji.
 * @param formData - Dane z formularza rezerwacji.
 * @param summary - Podsumowanie kosztów i dni.
 * @returns Obiekt payloadu SMS.
 */
export const createReservationAdminSmsPayload = (formData: ReservationFormData, summary: Summary): SmsPayload => {
    const pickupDateFormatted = new Date(formData.pickupDate).toLocaleDateString('pl-PL', { day: '2-digit', month: '2-digit', year: 'numeric' });
    const message = `${formData.model.name} - ${summary.rentalDays} doby od ${pickupDateFormatted} ${formData.pickupTime} - ${summary.totalPrice} zł - ${formData.fullName}`;
    return {
        to: "720100600",
        message,
        from: SMS_SENDER
    };
};

/**
 * WYNAJEM (Klient): Potwierdzenie otrzymania rezerwacji.
 * Wysyłane do klienta po pomyślnym złożeniu rezerwacji.
 * @param formData - Dane z formularza rezerwacji.
 * @returns Obiekt payloadu SMS.
 */
export const createReservationCustomerSmsPayload = (formData: ReservationFormData): SmsPayload => {
    const message = `Potwierdzamy otrzymanie rezerwacji. Szczegóły przesłane mailowo na ${formData.email} Dokończ rezerwację finalizując płatność.`;
    return {
        to: formData.phone,
        message,
        from: SMS_SENDER
    };
};

// ============================================================================
// === POWIADOMIENIA SMS Z TRANSFERÓW (TRANSFERS)
// ============================================================================

/**
 * TRANSFER (Admin): Powiadomienie o nowym zamówieniu transferu.
 * Wysyłane do administratora z kluczowymi danymi zamówienia.
 * @param formData - Dane z formularza transferu.
 * @param summary - Podsumowanie transferu.
 * @returns Obiekt payloadu SMS.
 */
export const createTransferAdminSmsPayload = (formData: TransferFormData, summary: TransferSummary): SmsPayload => {
    const pickupDateFormatted = new Date(formData.pickupDate).toLocaleDateString('pl-PL', { day: '2-digit', month: '2-digit' });
    const serviceType = formData.transferType === 'hourly' ? `Godziny (${formData.selectedPackage?.label})` : 'Trasa';
    const message = `Transfer ${pickupDateFormatted} ${formData.pickupTime} - ${formData.selectedCar?.name} - ${serviceType} - ${summary.rawPrice} zł - ${formData.customerName}`;
    return {
        to: "720100600",
        message,
        from: SMS_SENDER
    };
};

/**
 * TRANSFER (Klient): Potwierdzenie otrzymania zamówienia.
 * Wysyłane do klienta po pomyślnym zamówieniu transferu.
 * @param formData - Dane z formularza transferu.
 * @returns Obiekt payloadu SMS.
 */
export const createTransferCustomerSmsPayload = (formData: TransferFormData): SmsPayload => {
    const message = `Dziekujemy za zamowienie transferu. Po akceptacji zlecenia przydzielimy kierowce. Dziekujemy 🚕 `;
    return {
        to: formData.customerPhone,
        message,
        from: SMS_SENDER
    };
};
