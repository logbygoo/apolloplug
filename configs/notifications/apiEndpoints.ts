/**
 * Cloudflare Pages Functions: `/api/mail`, `/api/sms`.
 * W produkcji (ta sama domena) używamy ścieżek względnych.
 * Lokalnie (Vite): ustaw `VITE_NOTIFICATION_API_BASE=https://twoja-domena.pages.dev` albo `wrangler pages dev`.
 */
const base =
  typeof import.meta !== 'undefined' && import.meta.env?.VITE_NOTIFICATION_API_BASE
    ? String(import.meta.env.VITE_NOTIFICATION_API_BASE).replace(/\/$/, '')
    : '';

export function mailApiUrl(): string {
  return base ? `${base}/api/mail` : '/api/mail';
}

export function smsApiUrl(): string {
  return base ? `${base}/api/sms` : '/api/sms';
}
