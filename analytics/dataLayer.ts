/**
 * Zdarzenia GA4 „z kodem” → `window.dataLayer` (GTM `GTM-P9BP4RMS`).
 * Nazewnictwo zgodnie z GA4 i dokumentacją key events:
 * https://support.google.com/analytics/answer/12844695
 *
 * W GA4 (Admin → Events) utworzone jako typ „z kodem”; tu tylko `push`.
 * Szczegóły kontekstu rezerwacji: `buildReservationAnalyticsParams` w `./reservationAnalytics`.
 */

import type { ReservationAnalyticsParams } from './reservationAnalytics';

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
  }
}

export type { ReservationAnalyticsParams };

export function pushToDataLayer(payload: Record<string, unknown>): void {
  if (typeof window === 'undefined') return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push(payload);
}

/** Wejście na formularz zamówienia `/rezerwacja/:carId/zamowienie` — przy każdym wczytaniu strony (zależność `[ready, carId]`). */
export function pushReservationStart(payload: ReservationAnalyticsParams): void {
  pushToDataLayer({ event: 'reservation_start', ...payload });
}

/** Pomyślne wysłanie formularza rezerwacji (przed przejściem do płatności). */
export function pushReservationSent(
  payload: ReservationAnalyticsParams & {
    reservation_number: string;
    /** GA4: wartość biznesowa konwersji (zwykle jak total_price) */
    value: number;
    currency: string;
  }
): void {
  pushToDataLayer({ event: 'reservation_sent', ...payload });
}

/**
 * Użytkownik przechodzi do operatora płatności (PayU). Potwierdzenie zapłaty w PayU — osobno (URL zwrotny / webhook).
 */
export function pushReservationPayed(
  payload: ReservationAnalyticsParams & {
    reservation_number: string;
    value: number;
    currency: string;
  }
): void {
  pushToDataLayer({ event: 'reservation_payed', ...payload });
}
