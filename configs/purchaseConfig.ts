/**
 * Strona /zakup – link polecający Tesla (program referral).
 * Zamówienie z tego linku uprawnia do vouchera u Apollo Idea (patrz belka na stronie).
 */
export const TESLA_REFERRAL_LINK = 'http://ts.la/rafa70624';

export const purchaseReferralBanner = {
  eyebrow: 'Program poleceń Tesla',
  headline: 'Zamów Teslę z naszego linku — zyskaj więcej',
  description:
    'Skorzystaj z oficjalnego linku polecającego poniżej przy składaniu zamówienia u Tesli. Dzięki temu łączysz korzyści programu Tesla z bonusem od nas — idealnym startem przed odbiorem własnego auta.',
  benefits: [
    {
      title: '1 doba wynajmu u nas — gratis',
      detail:
        'Po złożeniu zamówienia Tesli przez nasz link otrzymasz voucher na jedną dobę wynajmu wybranego auta z naszej floty (na zasadach potwierdzonych przy odbiorze vouchera).',
    },
    {
      title: 'Korzyści programu Tesla',
      detail: 'Nadal przysługują Ci nagrody przewidziane aktualnym regulaminem programu poleceń Tesla.',
    },
    {
      title: 'Spójna obsługa z /zakup',
      detail: 'Chętnie poprowadzimy Cię dalej: konfiguracja, finansowanie, ubezpieczenie i odbiór — tak jak na reszcie tej strony.',
    },
  ],
  ctaLabel: 'Przejdź do zamówienia Tesli',
  footnote: 'Link otwiera stronę Tesla w nowej karcie. Zachowaj potwierdzenie zamówienia — pomoże przy realizacji vouchera.',
} as const;

/** Sekcja pod sliderem na stronie głównej (jak blok „Punkty w całym mieście” nad stopką). */
export const purchaseHomeReferralSection = {
  title: '1 doba naszą Teslą GRATIS',
  description: 'Wystarczy, że zamówisz swoją Teslę z naszego linku polecającego.',
  ctaTesla: 'Zamów na tesla.com',
  ctaReadMore: 'Czytaj więcej',
  perks: [
    {
      stat: '1000 km ładowania',
      subline: 'Prezent od Tesla',
    },
  ],
} as const;
