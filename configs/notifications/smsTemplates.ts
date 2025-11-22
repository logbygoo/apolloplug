import type { FormData } from '../../pages/RentalPage';

interface Summary {
  rentalDays: number;
  totalPrice: number;
}

export const getReservationAdminSms = (formData: FormData, summary: Summary): string => {
    const pickupDateFormatted = new Date(formData.pickupDate).toLocaleDateString('pl-PL', { day: '2-digit', month: '2-digit', year: 'numeric' });
    return `${formData.model.name} - ${summary.rentalDays} doby od ${pickupDateFormatted} ${formData.pickupTime} - ${summary.totalPrice} zł - ${formData.fullName}`;
};

export const getReservationCustomerSms = (formData: FormData): string => {
    return `Potwierdzamy otrzymanie rezerwacji. Szczegóły przesłane mailowo na ${formData.email} Dokończ rezerwację finalizując płatność.`;
};
