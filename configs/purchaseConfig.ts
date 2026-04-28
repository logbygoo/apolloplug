/**
 * Strona /zakup – link polecający Tesla (program referral).
 * Zamówienie z tego linku uprawnia do vouchera u Apollo Idea (patrz belka na stronie).
 */
export const TESLA_REFERRAL_LINK = 'http://ts.la/rafa70624';

export const purchaseReferralBanner = {
  eyebrow: 'Program poleceń Tesla',
  headline: 'Zamów Teslę z naszego linku i odbierz voucher od Apollo Idea',
  description:
    'Podczas zamówienia auta użyj naszego linku polecającego. Otrzymasz korzyści programu Tesla oraz dodatkowy voucher na wynajem w Apollo Idea.',
  benefits: [
    {
      title: '1 doba wynajmu gratis',
      detail:
        'Po zakupie Tesli przez nasz link otrzymasz voucher na jedną dobę wynajmu wybranego auta z naszej floty. Szczegóły wykorzystania vouchera potwierdzimy po weryfikacji zamówienia.',
    },
    {
      title: 'Korzyści programu Tesla',
      detail:
        'Zachowujesz korzyści wynikające z aktualnego regulaminu programu poleceń Tesla. Voucher od Apollo Idea działa dodatkowo.',
    },
    {
      title: 'Pomoc na kolejnych etapach',
      detail:
        'Jeśli chcesz, pomożemy w konfiguracji auta, finansowaniu, ubezpieczeniu i przygotowaniu odbioru.',
    },
  ],
  ctaLabel: 'Przejdź do zamówienia Tesli',
  footnote:
    'Link otwiera stronę Tesla w nowej karcie. Zachowaj potwierdzenie zamówienia, będzie potrzebne przy realizacji vouchera.',
} as const;

/** Sekcja pod sliderem na stronie głównej (jak blok „Punkty w całym mieście” nad stopką). */
export const purchaseHomeReferralSection = {
  title: '1 doba naszą Teslą GRATIS',
  description: 'Wystarczy, że zamówisz swoją Teslę z naszego linku polecającego.',
  ctaTesla: 'Zamów na tesla.com',
  ctaReadMore: 'Czytaj więcej',
  perks: [
    {
      stat: '2000 km ładowania',
      subline: 'Prezent od Tesla',
    },
  ],
} as const;
