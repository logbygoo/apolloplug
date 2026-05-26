export const NEWSLETTER_REWARD_CODE = 'ILOVEAPOLLO';
export const NEWSLETTER_VERIFICATION_CODE_LENGTH = 6;
export const NEWSLETTER_VERIFICATION_TTL_MS = 15 * 60 * 1000;

/**
 * Popularne domeny maili tymczasowych (bez pełnej listy, ale z najczęstszymi providerami).
 * Można rozszerzać bez dotykania logiki formularza.
 */
export const DISPOSABLE_EMAIL_DOMAINS = [
  '10minutemail.com',
  '15minutemail.com',
  '20minutemail.com',
  'temp-mail.org',
  'tempmail.com',
  'tempmailo.com',
  'guerrillamail.com',
  'guerrillamailblock.com',
  'mailinator.com',
  'yopmail.com',
  'yopmail.net',
  'throwawaymail.com',
  'getnada.com',
  'maildrop.cc',
  'sharklasers.com',
  'dispostable.com',
  'fakeinbox.com',
  'trashmail.com',
  'mintemail.com',
  'moakt.com',
  'mytemp.email',
  'tmpmail.org',
] as const;
