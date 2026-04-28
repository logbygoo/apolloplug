import { ADDITIONAL_OPTIONS } from '../configs/rentConfig';
import type { Car } from '../types';
import type { RentalPeriodState, RentalV2SummaryResult } from '../utils/rentalV2Summary';

/** Parametry niestandardowe GA4 (snake_case); liczby jako number dla metryk / wartości. */
export type ReservationAnalyticsParams = Record<string, string | number>;

type BuildArgs = {
  car: Car;
  carBrand: string;
  selectedBrandId: string;
  rentalPeriod: RentalPeriodState;
  additionalOptions: Record<(typeof ADDITIONAL_OPTIONS)[number]['id'], boolean>;
  summary: RentalV2SummaryResult;
  /** np. `/rezerwacja/tesla-x/zamowienie` */
  page_path?: string;
};

/**
 * Wspólny kontekst rezerwacji dla eventów reservation_* (GA4 przyjmuje dowolne parametry przy evencie „z kodem”).
 */
export function buildReservationAnalyticsParams(opts: BuildArgs): ReservationAnalyticsParams {
  const { car, carBrand, selectedBrandId, rentalPeriod, additionalOptions, summary, page_path } = opts;

  const optionIds = ADDITIONAL_OPTIONS.filter((o) => additionalOptions[o.id]).map((o) => o.id);

  const params: ReservationAnalyticsParams = {
    car_id: car.id,
    car_name: car.name,
    car_brand: carBrand,
    brand_id: selectedBrandId,
    rental_days: summary.rentalDays,
    price_per_day: summary.tierPricePerDay,
    km_limit_per_day: summary.tierKmLimitPerDay,
    rental_subtotal: summary.rentalPrice,
    options_total: summary.optionsPrice,
    total_price: summary.totalPrice,
    deposit: summary.deposit,
    total_with_deposit: summary.totalWithDeposit,
    pickup_fee: summary.pickupFee,
    return_fee: summary.returnFee,
    total_km_limit: summary.totalKmLimit,
    cost_per_km_over_limit: summary.costPerKmOverLimit,
    pickup_date: rentalPeriod.pickupDate,
    pickup_time: rentalPeriod.pickupTime,
    return_date: rentalPeriod.returnDate,
    return_time: rentalPeriod.returnTime,
    pickup_location: rentalPeriod.pickupLocation,
    return_location: rentalPeriod.returnLocation,
    currency: 'PLN',
    selected_option_ids: optionIds.join(','),
    selected_options_count: optionIds.length,
  };

  if (page_path) params.page_path = page_path;

  return params;
}
