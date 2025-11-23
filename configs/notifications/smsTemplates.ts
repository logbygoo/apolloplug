import type { FormData } from '../../pages/RentalPage';
import type { TransferFormData } from '../../pages/TransfersPage';

interface Summary {
  rentalDays: number;
  totalPrice: number;
}

interface TransferSummary {
    rawPrice: number;
}

export const getReservationAdminSms = (formData: FormData, summary: Summary): string => {
    const pickupDateFormatted = new Date(formData.pickupDate).toLocaleDateString('pl-PL', { day: '2-digit', month: '2-digit', year: 'numeric' });
    return `${formData.model.name} - ${summary.rentalDays} doby od ${pickupDateFormatted} ${formData.pickupTime} - ${summary.totalPrice} zł - ${formData.fullName}`;
};

export const getReservationCustomerSms = (formData: FormData): string => {
    return `Potwierdzamy otrzymanie rezerwacji. Szczegóły przesłane mailowo na ${formData.email} Dokończ rezerwację finalizując płatność.`;
};

// --- NEW TRANSFER TEMPLATES ---

export const getTransferAdminSms = (formData: TransferFormData, summary: TransferSummary): string => {
    const pickupDateFormatted = new Date(formData.pickupDate).toLocaleDateString('pl-PL', { day: '2-digit', month: '2-digit' });
    const serviceType = formData.transferType === 'hourly' ? `Godziny (${formData.selectedPackage?.label})` : 'Trasa';
    return `Transfer ${pickupDateFormatted} ${formData.pickupTime} - ${formData.selectedCar?.name} - ${serviceType} - ${summary.rawPrice} zł - ${formData.customerName}`;
};

export const getTransferCustomerSms = (formData: TransferFormData): string => {
    return `Dziekujemy za zamowienie transferu. Szczegoly znajdziesz w mailu wyslanym na ${formData.customerEmail}. Pozdrawiamy, ApolloPlug.com`;
};
