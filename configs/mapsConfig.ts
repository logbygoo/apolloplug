/**
 * Konfiguracja API Google Maps.
 * 
 * Klucz API Google Maps jest teraz zarządzany jako zmienna środowiskowa (np. w Cloudflare Secrets).
 * Upewnij się, że zmienna `process.env.MAPS_API_KEY` jest dostępna w Twoim środowisku wdrożeniowym.
 * Nie przechowuj klucza API bezpośrednio w kodzie.
 * 
 * Aby uzyskać klucz API:
 * 1. Wejdź na Google Cloud Console: https://console.cloud.google.com/
 * 2. Utwórz nowy projekt lub wybierz istniejący.
 * 3. Włącz interfejsy API: "Maps JavaScript API", "Places API", "Directions API", "Geocoding API".
 * 4. Skonfiguruj płatności dla projektu (wymagane, ale Google oferuje duży darmowy limit).
 * 5. Wygeneruj klucz API w sekcji "Dane logowania".
 * 6. Dodaj klucz jako zmienną środowiskową o nazwie MAPS_API_KEY w swoim środowisku hostingowym.
 * 
 * WAŻNE: Zabezpiecz swój klucz API, ograniczając go do domeny, na której będzie działać aplikacja.
 */
export const MAPS_API_KEY = process.env.MAPS_API_KEY || '';