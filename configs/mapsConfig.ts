/**
 * Konfiguracja API Google Maps.
 * 
 * Aby uzyskać klucz API:
 * 1. Wejdź na Google Cloud Console: https://console.cloud.google.com/
 * 2. Utwórz nowy projekt lub wybierz istniejący.
 * 3. Włącz interfejsy API: "Maps JavaScript API", "Places API", "Directions API", "Geocoding API".
 * 4. Skonfiguruj płatności dla projektu (wymagane, ale Google oferuje duży darmowy limit).
 * 5. Wygeneruj klucz API w sekcji "Dane logowania".
 * 6. Wklej wygenerowany klucz poniżej zamiast 'TUTAJ_WSTAW_SWOJ_KLUCZ_API'.
 * 
 * WAŻNE: Zabezpiecz swój klucz API, ograniczając go do domeny, na której będzie działać aplikacja.
 */
// FIX: Explicitly type MAPS_API_KEY as a string to allow comparison with a placeholder string without TypeScript errors.
export const MAPS_API_KEY: string = 'TUTAJ_WSTAW_SWOJ_KLUCZ_API';