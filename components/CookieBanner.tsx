import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from './ui';

const COOKIE_STORAGE_KEY = 'apolloidea_cookie_consent';

type ConsentValue = 'all' | 'necessary';

const CookieBanner: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(COOKIE_STORAGE_KEY);
      if (!stored) {
        setIsVisible(true);
        return;
      }
      const parsed: ConsentValue | null = stored === 'all' || stored === 'necessary' ? stored : null;
      if (!parsed) {
        setIsVisible(true);
      }
    } catch {
      setIsVisible(true);
    }
  }, []);

  const handleConsent = (value: ConsentValue) => {
    try {
      window.localStorage.setItem(COOKIE_STORAGE_KEY, value);
    } catch {
      // ignore storage errors
    }
    setIsVisible(false);
  };

  if (!isVisible) {
    return null;
  }

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 flex justify-center px-4 pb-4 sm:pb-6 pointer-events-none">
      <div className="pointer-events-auto max-w-3xl w-full rounded-2xl bg-background/95 border border-border shadow-xl shadow-black/20 backdrop-blur-sm p-4 sm:p-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-6">
          <div className="flex-1">
            <h2 className="text-base sm:text-lg font-semibold text-foreground">
              Pomóż nam zadbać o Twoje najlepsze wrażenia
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Używamy plików cookies i podobnych technologii, aby serwis działał prawidłowo, mierzyć ruch na stronie
              oraz personalizować treści. Część plików cookies jest niezbędna do działania serwisu i nie można ich
              wyłączyć. Pozostałe możesz zaakceptować lub ograniczyć do minimum. Więcej informacji znajdziesz w{' '}
              <Link
                to="/dokumentacja?doc=polityka-prywatnosci"
                className="underline underline-offset-2 hover:text-foreground"
              >
                Polityce prywatności i cookies
              </Link>
              .
            </p>
          </div>
          <div className="flex flex-col gap-2 sm:w-56">
            <Button
              variant="secondary"
              className="w-full bg-secondary text-foreground hover:bg-secondary/80"
              onClick={() => handleConsent('necessary')}
            >
              Tylko niezbędne
            </Button>
            <Button
              variant="primary"
              className="w-full"
              onClick={() => handleConsent('all')}
            >
              Zaakceptuj i zamknij
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CookieBanner;

