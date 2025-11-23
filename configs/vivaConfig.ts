// Konfiguracja API Viva.com

const isLocalDev = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1' || !window.location.hostname;

// Klient ID dla Smart Checkout (publiczny)
export const VIVA_SMART_CHECKOUT_CLIENT_ID = 'u1871qke3ewed649fuzlwn6yjtw1fw577auxv9hayttr1.apps.vivapayments.com';

// URL do Smart Checkout - przełącza się automatycznie między DEMO a PRODUKCJĄ
export const VIVA_SMART_CHECKOUT_URL = isLocalDev 
    ? 'https://demo.vivapayments.com/web/checkout'
    : 'https://www.vivapayments.com/web/checkout';

// Dane logowania do API (backend) - NIGDY nie powinny być publicznie dostępne w kodzie frontendowym.
// Ich wartości zostaną skonfigurowane jako zmienne środowiskowe w panelu Cloudflare.
export const VIVA_MERCHANT_ID = 'YOUR_VIVA_MERCHANT_ID';
export const VIVA_API_KEY = 'YOUR_VIVA_API_KEY';