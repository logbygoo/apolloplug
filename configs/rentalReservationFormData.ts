import { BRANDS } from '../constants';
import type { Car } from '../types';
import { ADDITIONAL_OPTIONS } from './rentConfig';
import type { RentalPeriodState } from '../utils/rentalV2Summary';

export type BrandEntry = (typeof BRANDS)[number];

/** Wspólny kształt danych do maili/SMS rezerwacji (dawniej `FormData` z RentalPage). */
export interface ReservationFormData {
  brand: BrandEntry;
  model: Car;
  pickupDate: string;
  pickupTime: string;
  pickupLocation: string;
  returnDate: string;
  returnTime: string;
  returnLocation: string;
  fullName: string;
  nip: string;
  pesel: string;
  licenseNumber: string;
  address: string;
  postalCode: string;
  city: string;
  email: string;
  phone: string;
  options: Record<(typeof ADDITIONAL_OPTIONS)[number]['id'], boolean>;
  /** v2 */
  idDocumentNumber?: string;
  licenseBlanketNumber?: string;
  reservationType?: 'private' | 'company';
}

export type DriverFieldsForReservation = {
  reservationType: 'private' | 'company';
  nip: string;
  fullName: string;
  pesel: string;
  idDocumentNumber: string;
  licenseNumber: string;
  licenseBlanketNumber: string;
  address: string;
  postalCode: string;
  city: string;
  email: string;
  phone: string;
};

export function buildReservationFormDataFromV2(
  car: Car,
  selectedBrandId: string,
  rentalPeriod: RentalPeriodState,
  driver: DriverFieldsForReservation,
  additionalOptions: Record<(typeof ADDITIONAL_OPTIONS)[number]['id'], boolean>
): ReservationFormData {
  const brand =
    BRANDS.find((b) => b.id === selectedBrandId) ||
    BRANDS.find((b) => car.id.includes(b.id)) ||
    BRANDS[0];
  return {
    brand,
    model: car,
    pickupDate: rentalPeriod.pickupDate,
    pickupTime: rentalPeriod.pickupTime,
    pickupLocation: rentalPeriod.pickupLocation,
    returnDate: rentalPeriod.returnDate,
    returnTime: rentalPeriod.returnTime,
    returnLocation: rentalPeriod.returnLocation,
    fullName: driver.fullName.trim(),
    nip: driver.nip.trim(),
    pesel: driver.pesel.trim(),
    licenseNumber: driver.licenseNumber.trim(),
    address: driver.address.trim(),
    postalCode: driver.postalCode.trim(),
    city: driver.city.trim(),
    email: driver.email.trim(),
    phone: driver.phone.trim(),
    options: additionalOptions,
    idDocumentNumber: driver.idDocumentNumber.trim(),
    licenseBlanketNumber: driver.licenseBlanketNumber.trim(),
    reservationType: driver.reservationType,
  };
}
