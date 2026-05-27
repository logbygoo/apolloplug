import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import Seo from '../components/Seo';
import { Input, Label, PageHeader } from '../components/ui';
import { SEO_CONFIG } from '../configs/seoConfig';
import { SparklesIcon, BoltIcon, CalendarDaysIcon, BanknotesIcon, CheckIcon } from '../icons';
import {
  createNewsletterAdminEmailPayload,
  createNewsletterVerificationEmailPayload,
} from '../configs/notifications/emailTemplates';
import { createNewsletterVerificationSmsPayload } from '../configs/notifications/smsTemplates';
import { mailApiUrl, smsApiUrl } from '../configs/notifications/apiEndpoints';
import {
  DISPOSABLE_EMAIL_DOMAINS,
  NEWSLETTER_REWARD_CODE,
  NEWSLETTER_VERIFICATION_CODE_LENGTH,
  NEWSLETTER_VERIFICATION_TTL_MS,
} from '../configs/newsletterConfig';

type PromotionItem = {
  title: string;
  description: string;
  Icon: React.ComponentType<{ className?: string }>;
};

const ACTIVE_PROMOTIONS: PromotionItem[] = [
  {
    title: 'Darmowa +1 doba',
    description: 'Oceń naszą wypożyczalnię i otrzymaj darmowe przedłużenie najmu o 1 dobę.',
    Icon: SparklesIcon,
  },
  {
    title: 'Kup Teslę z Apollo',
    description:
      'Skorzystaj z naszego linku polecającego Tesla i zamów swoje auto z rabatem, pakietem ładowania i darmowym wypożyczeniem w Apollo.',
    Icon: BoltIcon,
  },
  {
    title: 'Weekend z Apollo',
    description: 'Wynajmij auto w piątek na 2 doby, a trzecią otrzymaj gratis.',
    Icon: CalendarDaysIcon,
  },
  {
    title: 'Kod rabatowy -15%',
    description: 'Zapisz się do naszego klubu Apollo i otrzymaj kod rabatowy.',
    Icon: BanknotesIcon,
  },
];

const checkboxBaseClass =
  'relative mt-0.5 mr-3 h-5 w-5 rounded-sm flex-shrink-0 border border-background/30 bg-white/10';

const NEWSLETTER_SESSION_KEY = 'apolloNewsletterSignupV1';

type NewsletterPhase = 'form' | 'verify' | 'success';

type NewsletterSession = {
  fullName: string;
  phone: string;
  email: string;
  termsAccepted: boolean;
  marketingAccepted: boolean;
  emailVerificationCode: string;
  smsVerificationCode: string;
  createdAt: number;
  verified: boolean;
  verifiedAt?: number;
  adminNotified: boolean;
};

type FormErrors = Partial<Record<'fullName' | 'phone' | 'email' | 'termsAccepted' | 'marketingAccepted', string>>;

function normalizeEmail(email: string): string {
  return email.trim().toLowerCase();
}

function normalizePhone(phone: string): string {
  const trimmed = phone.trim();
  if (!trimmed) return '';
  const digits = trimmed.replace(/\D/g, '');
  return trimmed.startsWith('+') ? `+${digits}` : digits;
}

function isDisposableEmail(email: string): boolean {
  const domain = normalizeEmail(email).split('@')[1] ?? '';
  if (!domain) return false;
  return DISPOSABLE_EMAIL_DOMAINS.some((blocked) => domain === blocked || domain.endsWith(`.${blocked}`));
}

function generateVerificationCode(): string {
  const max = 10 ** NEWSLETTER_VERIFICATION_CODE_LENGTH;
  if (typeof window !== 'undefined' && window.crypto?.getRandomValues) {
    const arr = new Uint32Array(1);
    window.crypto.getRandomValues(arr);
    return String(arr[0] % max).padStart(NEWSLETTER_VERIFICATION_CODE_LENGTH, '0');
  }
  return String(Math.floor(Math.random() * max)).padStart(NEWSLETTER_VERIFICATION_CODE_LENGTH, '0');
}

function loadNewsletterSession(): NewsletterSession | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = window.sessionStorage.getItem(NEWSLETTER_SESSION_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as NewsletterSession;
  } catch {
    return null;
  }
}

function saveNewsletterSession(data: NewsletterSession): void {
  if (typeof window === 'undefined') return;
  window.sessionStorage.setItem(NEWSLETTER_SESSION_KEY, JSON.stringify(data));
}

const PromotionsPage: React.FC = () => {
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [marketingAccepted, setMarketingAccepted] = useState(false);
  const [phase, setPhase] = useState<NewsletterPhase>('form');
  const [emailVerificationInput, setEmailVerificationInput] = useState('');
  const [smsVerificationInput, setSmsVerificationInput] = useState('');
  const [formErrors, setFormErrors] = useState<FormErrors>({});
  const [statusError, setStatusError] = useState<string | null>(null);
  const [statusInfo, setStatusInfo] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);

  useEffect(() => {
    const existing = loadNewsletterSession();
    if (!existing) return;
    if ((!existing.emailVerificationCode || !existing.smsVerificationCode) && !existing.verified) {
      window.sessionStorage.removeItem(NEWSLETTER_SESSION_KEY);
      return;
    }
    const isExpired = Date.now() - existing.createdAt > NEWSLETTER_VERIFICATION_TTL_MS;
    if (isExpired && !existing.verified) {
      window.sessionStorage.removeItem(NEWSLETTER_SESSION_KEY);
      return;
    }
    setFullName(existing.fullName);
    setPhone(existing.phone);
    setEmail(existing.email);
    setTermsAccepted(existing.termsAccepted);
    setMarketingAccepted(existing.marketingAccepted);
    setPhase(existing.verified ? 'success' : 'verify');
  }, []);

  const promoCodeToShow = useMemo(() => NEWSLETTER_REWARD_CODE, []);

  const handleSendVerificationCode = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatusError(null);
    setStatusInfo(null);
    const nextErrors: FormErrors = {};
    const normalizedName = fullName.trim().replace(/\s+/g, ' ');
    const normalizedPhone = normalizePhone(phone);
    const normalizedEmail = normalizeEmail(email);

    if (normalizedName.length < 3) nextErrors.fullName = 'Podaj imię i nazwisko.';
    const phoneDigitsCount = normalizedPhone.replace(/\D/g, '').length;
    if (phoneDigitsCount < 9 || phoneDigitsCount > 15) {
      nextErrors.phone = 'Podaj poprawny numer telefonu.';
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedEmail)) {
      nextErrors.email = 'Podaj poprawny adres e-mail.';
    } else if (isDisposableEmail(normalizedEmail)) {
      nextErrors.email = 'Adres tymczasowy nie jest akceptowany.';
    }
    if (!termsAccepted) nextErrors.termsAccepted = 'Wymagana akceptacja regulaminu i polityki prywatności.';
    if (!marketingAccepted) nextErrors.marketingAccepted = 'Wymagana zgoda marketingowa.';

    setFormErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    const emailVerificationCode = generateVerificationCode();
    const smsVerificationCode = generateVerificationCode();
    setIsSubmitting(true);
    try {
      const emailPayload = createNewsletterVerificationEmailPayload(normalizedEmail, emailVerificationCode);
      const smsPayload = createNewsletterVerificationSmsPayload(normalizedPhone, smsVerificationCode);

      const [emailResponse, smsResponse] = await Promise.all([
        fetch(mailApiUrl(), {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(emailPayload),
        }),
        fetch(smsApiUrl(), {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(smsPayload),
        }),
      ]);

      if (!emailResponse.ok || !smsResponse.ok) {
        throw new Error('Nie udało się wysłać kodu. Spróbuj ponownie za chwilę.');
      }

      const sessionData: NewsletterSession = {
        fullName: normalizedName,
        phone: normalizedPhone,
        email: normalizedEmail,
        termsAccepted,
        marketingAccepted,
        emailVerificationCode,
        smsVerificationCode,
        createdAt: Date.now(),
        verified: false,
        adminNotified: false,
      };
      saveNewsletterSession(sessionData);
      setPhase('verify');
      setStatusInfo('Wysłaliśmy dwa kody: osobny na SMS i osobny na e-mail.');
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Nie udało się wysłać kodu.';
      setStatusError(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleVerifyCode = async () => {
    setStatusError(null);
    setStatusInfo(null);
    const sessionData = loadNewsletterSession();
    if (!sessionData) {
      setStatusError('Brak aktywnej sesji weryfikacji. Wyślij kod ponownie.');
      setPhase('form');
      return;
    }
    const isExpired = Date.now() - sessionData.createdAt > NEWSLETTER_VERIFICATION_TTL_MS;
    if (isExpired && !sessionData.verified) {
      window.sessionStorage.removeItem(NEWSLETTER_SESSION_KEY);
      setStatusError('Kod wygasł. Wyślij nowy kod weryfikacyjny.');
      setPhase('form');
      return;
    }
    const normalizedEmailCode = emailVerificationInput.trim();
    const normalizedSmsCode = smsVerificationInput.trim();
    if (!normalizedEmailCode || !normalizedSmsCode) {
      setStatusError('Wpisz oba kody weryfikacyjne.');
      return;
    }
    if (normalizedEmailCode !== sessionData.emailVerificationCode) {
      setStatusError('Nieprawidłowy kod e-mail.');
      return;
    }
    if (normalizedSmsCode !== sessionData.smsVerificationCode) {
      setStatusError('Nieprawidłowy kod SMS.');
      return;
    }

    setIsVerifying(true);
    try {
      const next: NewsletterSession = {
        ...sessionData,
        verified: true,
        verifiedAt: Date.now(),
      };

      if (!next.adminNotified) {
        const adminPayload = createNewsletterAdminEmailPayload({
          fullName: next.fullName,
          email: next.email,
          phone: next.phone,
          termsAccepted: next.termsAccepted,
          marketingAccepted: next.marketingAccepted,
        });
        const adminResponse = await fetch(mailApiUrl(), {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(adminPayload),
        });
        if (adminResponse.ok) {
          next.adminNotified = true;
        }
      }

      saveNewsletterSession(next);
      setPhase('success');
      setStatusInfo('Kod potwierdzony. Twój rabat jest gotowy.');
    } catch {
      setStatusError('Kod poprawny, ale nie udało się domknąć zapisu. Spróbuj ponownie.');
    } finally {
      setIsVerifying(false);
    }
  };

  return (
    <div className="min-w-0 bg-background text-foreground">
      <Seo {...SEO_CONFIG['/promocje']} />

      <section className="w-full bg-black text-white">
        <div className="container mx-auto max-w-5xl px-4 py-8 md:px-6 md:py-10">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/70">Apollo Klub</p>
          <h2 className="mt-3 text-2xl font-bold tracking-tight md:text-3xl">Zgarnij kod rabatowy -15%</h2>
          <p className="mt-3 max-w-3xl text-sm leading-relaxed text-white/80 md:text-base">
            Dołącz do listy marketingowej, potwierdź kod SMS/e-mail i odbierz rabat na wynajem.
          </p>

          {phase !== 'success' ? (
            <form className="mt-6" onSubmit={handleSendVerificationCode} noValidate>
              <div className="grid gap-4 md:grid-cols-3">
                <div>
                  <Label htmlFor="promoName" className="text-white">
                    Imię i nazwisko
                  </Label>
                  <Input
                    id="promoName"
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Np. Jan Kowalski"
                    className="mt-2 border-white/20 bg-white/10 text-white placeholder:text-white/50"
                  />
                  {formErrors.fullName && <p className="mt-1 text-xs text-red-300">{formErrors.fullName}</p>}
                </div>
                <div>
                  <Label htmlFor="promoPhone" className="text-white">
                    Telefon
                  </Label>
                  <Input
                    id="promoPhone"
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="Np. 500 000 000"
                    className="mt-2 border-white/20 bg-white/10 text-white placeholder:text-white/50"
                  />
                  {formErrors.phone && <p className="mt-1 text-xs text-red-300">{formErrors.phone}</p>}
                </div>
                <div>
                  <Label htmlFor="promoEmail" className="text-white">
                    E-mail
                  </Label>
                  <Input
                    id="promoEmail"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Np. kontakt@apolloidea.com"
                    className="mt-2 border-white/20 bg-white/10 text-white placeholder:text-white/50"
                  />
                  {formErrors.email && <p className="mt-1 text-xs text-red-300">{formErrors.email}</p>}
                </div>
              </div>

              <div className="mt-5 space-y-3">
                <label htmlFor="promoTerms" className="flex cursor-pointer items-start text-sm text-white/85">
                  <input
                    id="promoTerms"
                    type="checkbox"
                    checked={termsAccepted}
                    onChange={() => setTermsAccepted((prev) => !prev)}
                    className="absolute h-0 w-0 opacity-0"
                  />
                  <span className={checkboxBaseClass}>
                    <CheckIcon
                      className={`absolute inset-[2px] h-3 w-3 ${termsAccepted ? 'text-white' : 'text-transparent'}`}
                    />
                  </span>
                  <span>
                    Akceptuję{' '}
                    <Link to="/dokumentacja?doc=regulamin-apolloidea" className="underline underline-offset-2 hover:text-white">
                      regulamin
                    </Link>{' '}
                    i{' '}
                    <Link to="/dokumentacja?doc=polityka-prywatnosci" className="underline underline-offset-2 hover:text-white">
                      politykę prywatności
                    </Link>
                    .
                  </span>
                </label>
                {formErrors.termsAccepted && <p className="text-xs text-red-300">{formErrors.termsAccepted}</p>}
                <label htmlFor="promoMarketing" className="flex cursor-pointer items-start text-sm text-white/85">
                  <input
                    id="promoMarketing"
                    type="checkbox"
                    checked={marketingAccepted}
                    onChange={() => setMarketingAccepted((prev) => !prev)}
                    className="absolute h-0 w-0 opacity-0"
                  />
                  <span className={checkboxBaseClass}>
                    <CheckIcon
                      className={`absolute inset-[2px] h-3 w-3 ${marketingAccepted ? 'text-white' : 'text-transparent'}`}
                    />
                  </span>
                  <span>Wyrażam zgodę na kontakt marketingowy e-mail i telefoniczny.</span>
                </label>
                {formErrors.marketingAccepted && <p className="text-xs text-red-300">{formErrors.marketingAccepted}</p>}
              </div>

              <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="inline-flex h-11 items-center justify-center rounded-md bg-white px-6 text-sm font-semibold text-black transition-colors hover:bg-white/90 disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {isSubmitting ? 'Wysyłam kod...' : phase === 'verify' ? 'Wyślij kod ponownie' : 'Odbieram -15%'}
                </button>
                <span className="text-xs text-white/60">Wysyłamy 2 różne kody: osobno SMS i osobno e-mail.</span>
              </div>
            </form>
          ) : (
            <div className="mt-6 rounded-lg border border-green-400/40 bg-green-500/10 p-4">
              <p className="text-sm text-green-100">Weryfikacja zakończona powodzeniem.</p>
              <p className="mt-2 text-xl font-semibold text-white">
                Twój kod: <span className="tracking-wide">{promoCodeToShow}</span>
              </p>
              <p className="mt-2 text-xs text-white/70">Kod możesz teraz wpisać na stronie rezerwacji.</p>
            </div>
          )}

          {phase === 'verify' && (
            <div className="mt-5 grid max-w-2xl gap-4 md:grid-cols-2">
              <div>
                <Label htmlFor="promoVerifyEmailCode" className="text-white">
                  Kod z e-maila
                </Label>
                <Input
                  id="promoVerifyEmailCode"
                  type="text"
                  inputMode="numeric"
                  value={emailVerificationInput}
                  onChange={(e) =>
                    setEmailVerificationInput(
                      e.target.value.replace(/\D/g, '').slice(0, NEWSLETTER_VERIFICATION_CODE_LENGTH)
                    )
                  }
                  placeholder="Kod z e-mail"
                  className="mt-2 border-white/20 bg-white/10 text-white placeholder:text-white/50"
                />
              </div>
              <div>
                <Label htmlFor="promoVerifySmsCode" className="text-white">
                  Kod z SMS
                </Label>
                <Input
                  id="promoVerifySmsCode"
                  type="text"
                  inputMode="numeric"
                  value={smsVerificationInput}
                  onChange={(e) =>
                    setSmsVerificationInput(
                      e.target.value.replace(/\D/g, '').slice(0, NEWSLETTER_VERIFICATION_CODE_LENGTH)
                    )
                  }
                  placeholder="Kod z SMS"
                  className="mt-2 border-white/20 bg-white/10 text-white placeholder:text-white/50"
                />
              </div>
              <div className="md:col-span-2">
                <button
                  type="button"
                  onClick={handleVerifyCode}
                  disabled={isVerifying}
                  className="inline-flex h-11 items-center justify-center rounded-md border border-white/40 bg-white/10 px-4 text-sm font-semibold text-white transition-colors hover:bg-white/20 disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {isVerifying ? 'Sprawdzam...' : 'Potwierdź oba kody'}
                </button>
              </div>
            </div>
          )}

          {statusError && <p className="mt-3 text-sm text-red-300">{statusError}</p>}
          {statusInfo && <p className="mt-3 text-sm text-green-200">{statusInfo}</p>}
        </div>
      </section>

      <PageHeader
        className="max-w-5xl"
        introMaxWidthClassName="max-w-none"
        title="Promocje i Kody Rabatowe"
        subtitle="Aktualne akcje promocyjne Apollo oraz klubowe oferty specjalne dla osób zapisanych na listę marketingową."
        breadcrumbs={[{ name: 'Promocje' }]}
      />

      <section className="pb-8 md:pb-10">
        <div className="container mx-auto grid max-w-5xl gap-8 px-4 md:px-6">
          <div>
            <div className="grid gap-4 md:grid-cols-2">
              {ACTIVE_PROMOTIONS.map(({ title, description, Icon }) => (
                <article key={title} className="rounded-lg border border-border bg-card p-5">
                  <div className="inline-flex h-11 w-11 items-center justify-center rounded-md bg-secondary text-foreground">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="mt-4 text-lg font-semibold text-foreground">{title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{description}</p>
                  <button
                    type="button"
                    className="mt-4 inline-flex h-10 items-center justify-center rounded-md bg-foreground px-5 text-sm font-semibold text-background transition-colors hover:bg-foreground/90"
                  >
                    Skorzystaj
                  </button>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PromotionsPage;
