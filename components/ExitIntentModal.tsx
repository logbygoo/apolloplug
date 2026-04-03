import React, { useEffect, useState } from 'react';
import { Button, Input, Label } from './ui';
import { createExitIntentFeedbackEmailPayload } from '../configs/notifications/emailTemplates';
import { mailApiUrl } from '../configs/notifications/apiEndpoints';

const STORAGE_KEY = 'apolloidea_exit_intent_shown';

const ExitIntentModal: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isEligible, setIsEligible] = useState(false);
  const [reasons, setReasons] = useState<string[]>([]);
  const [message, setMessage] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactPhone, setContactPhone] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [sent, setSent] = useState(false);

  // Włącz wyświetlanie dopiero po kilku sekundach obecności na stronie
  useEffect(() => {
    const timer = setTimeout(() => setIsEligible(true), 8000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!isEligible) return;

    const handler = (e: MouseEvent) => {
      const alreadyShown = sessionStorage.getItem(STORAGE_KEY);
      if (alreadyShown === 'true' || isOpen) return;

      const y = e.clientY;
      const from = e.relatedTarget as HTMLElement | null;

      // Safari/Firefox często nie wywołują document.mouseleave.
      // Warunek poniżej łapie klasyczne "wyjście górą" dla różnych przeglądarek.
      const isLeavingWindowTop =
        y <= 0 ||
        (from === null && e.type === 'mouseout' && y < 50);

      if (isLeavingWindowTop) {
        setIsOpen(true);
        sessionStorage.setItem(STORAGE_KEY, 'true');
      }
    };

    const visibilityHandler = () => {
      const alreadyShown = sessionStorage.getItem(STORAGE_KEY);
      if (alreadyShown === 'true' || isOpen) return;
      if (document.visibilityState === 'hidden') {
        setIsOpen(true);
        sessionStorage.setItem(STORAGE_KEY, 'true');
      }
    };

    document.addEventListener('mouseleave', handler);
    window.addEventListener('mouseout', handler);
    document.addEventListener('visibilitychange', visibilityHandler);

    return () => {
      document.removeEventListener('mouseleave', handler);
      window.removeEventListener('mouseout', handler);
      document.removeEventListener('visibilitychange', visibilityHandler);
    };
  }, [isOpen, isEligible]);

  const toggleReason = (value: string) => {
    setReasons(prev =>
      prev.includes(value) ? prev.filter(v => v !== value) : [...prev, value]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSending) return;
    setIsSending(true);
    try {
      const payload = createExitIntentFeedbackEmailPayload({
        reasons,
        message,
        contactEmail,
        contactPhone,
        path: window.location.pathname + window.location.search,
      });

      await fetch(mailApiUrl(), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      setSent(true);
      setTimeout(() => setIsOpen(false), 2000);
    } catch (err) {
      console.error('Failed to send exit-intent feedback', err);
      setIsOpen(false);
    } finally {
      setIsSending(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="bg-background text-foreground max-w-xl w-full mx-4 rounded-2xl shadow-2xl border border-border p-6 md:p-8 max-h-[80vh] overflow-y-auto">
        {sent ? (
          <div className="text-center space-y-3">
            <h2 className="text-2xl font-semibold">Dziękujemy za opinię!</h2>
            <p className="text-sm text-muted-foreground">
              Twoja odpowiedź pomaga nam poprawiać apolloidea.com.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <h2 className="text-2xl md:text-3xl font-bold tracking-tight">
                Dlaczego uciekasz?
              </h2>
              <p className="text-sm text-muted-foreground">
                Daj znać co możemy poprawić – zajmie Ci to kilkanaście sekund.
              </p>
            </div>

            <div className="space-y-3">
              <p className="text-sm font-medium">Co jest nie tak? (możesz zaznaczyć kilka)</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {[
                  'Za drogo',
                  'Nie znam was, nie ufam',
                  'Tylko się rozglądam',
                  'Nie wiem czemu',
                ].map(option => (
                  <button
                    key={option}
                    type="button"
                    onClick={() => toggleReason(option)}
                    className={`text-left text-sm rounded-full border px-3 py-2 transition-colors ${
                      reasons.includes(option)
                        ? 'bg-foreground text-background border-foreground'
                        : 'bg-secondary text-foreground border-border hover:border-foreground/50'
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="exit-message">Daj znać co możemy poprawić</Label>
              <textarea
                id="exit-message"
                className="block w-full rounded-md bg-secondary px-3 py-2 text-sm ring-offset-background border border-border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 min-h-[100px]"
                placeholder="Daj znać co możemy poprawić"
                value={message}
                onChange={e => setMessage(e.target.value)}
              />
            </div>

            <div className="space-y-3">
              <p className="text-xs text-muted-foreground uppercase font-semibold tracking-wide">
                Opcjonalnie
              </p>
              <p className="text-sm text-muted-foreground">
                Zostaw kontakt do siebie, abyśmy mogli zaproponować Ci coś, co Cię przekona.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <Label htmlFor="exit-phone">Telefon</Label>
                  <Input
                    id="exit-phone"
                    type="tel"
                    placeholder="Np. +48 500 000 000"
                    value={contactPhone}
                    onChange={e => setContactPhone(e.target.value)}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="exit-email">E-mail</Label>
                  <Input
                    id="exit-email"
                    type="email"
                    placeholder="Np. imie@twojmail.pl"
                    value={contactEmail}
                    onChange={e => setContactEmail(e.target.value)}
                    className="mt-1"
                  />
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 justify-between items-center">
              <Button
                type="submit"
                size="lg"
                className="w-full sm:w-auto"
                disabled={isSending}
              >
                {isSending ? 'Wysyłanie...' : 'Wyślij opinię'}
              </Button>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="text-xs text-muted-foreground hover:text-foreground underline underline-offset-4"
              >
                Zamknij bez wysyłania
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default ExitIntentModal;

