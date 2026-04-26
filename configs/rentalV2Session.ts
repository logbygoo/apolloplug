/** Klucz stanu formularza wypożyczalni (marka, model, daty, godziny, adresy, opcje) — localStorage + sessionStorage. */
export const RENTAL_V2_SESSION_KEY = 'rentalV2FormState';

/** Dane kierowcy — krok 2 pod `/rezerwacja/:carId/zamowienie`. */
export const RENTAL_V2_RESERVATION_DRIVER_KEY = 'rentalV2ReservationDriver';

/**
 * Odczyt zapisanego JSON stanu wypożyczalni: najpierw localStorage (powrót na /rezerwacja),
 * potem sessionStorage. Jeśli jest tylko w session, jednorazowo kopiuje do local (migracja).
 */
export function getPersistedRentalV2SessionJson(): string | null {
  if (typeof window === 'undefined') return null;
  try {
    const fromLocal = localStorage.getItem(RENTAL_V2_SESSION_KEY);
    if (fromLocal) return fromLocal;
    const fromSession = sessionStorage.getItem(RENTAL_V2_SESSION_KEY);
    if (fromSession) {
      try {
        localStorage.setItem(RENTAL_V2_SESSION_KEY, fromSession);
      } catch {
        /* quota / tryb prywatny */
      }
      return fromSession;
    }
    return null;
  } catch {
    return null;
  }
}

/** Zapisuje ten sam stan do localStorage i sessionStorage (rezerwacja i ta sama karta). */
export function persistRentalV2Session(json: string): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(RENTAL_V2_SESSION_KEY, json);
  } catch {
    /* ignore */
  }
  try {
    sessionStorage.setItem(RENTAL_V2_SESSION_KEY, json);
  } catch {
    /* ignore */
  }
}
