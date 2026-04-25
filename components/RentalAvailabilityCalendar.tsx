import React, { useCallback, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { getBlockedRentalDateKeysForCar } from '../configs/rentCalendarConfig';
import { isPlRedCalendarDay, localYmdKey } from '../utils/polishPublicHolidays';
import { ChevronLeftIcon, ChevronRightIcon } from '../icons';

const WEEKDAYS = ['Pn', 'Wt', 'Śr', 'Cz', 'Pt', 'So', 'Nd'] as const;

function startOfDay(d: Date): Date {
  return new Date(d.getFullYear(), d.getMonth(), d.getDate(), 0, 0, 0, 0);
}

const capitalize = (s: string) => s.charAt(0).toLocaleUpperCase('pl-PL') + s.slice(1);

export type RentalAvailabilityCalendarProps = {
  carId: string;
  className?: string;
};

export const RentalAvailabilityCalendar: React.FC<RentalAvailabilityCalendarProps> = ({
  carId,
  className = '',
}) => {
  const [viewMonth, setViewMonth] = useState(() => {
    const t = new Date();
    return new Date(t.getFullYear(), t.getMonth(), 1, 0, 0, 0, 0);
  });

  const blocked = useMemo(() => getBlockedRentalDateKeysForCar(carId), [carId]);

  const { title, cells } = useMemo(() => {
    const y = viewMonth.getFullYear();
    const m = viewMonth.getMonth();
    const first = new Date(y, m, 1, 12, 0, 0, 0);
    const firstDow = (first.getDay() + 6) % 7; // Mon=0 … Sun=6
    const daysInMonth = new Date(y, m + 1, 0).getDate();
    // Wystarcza tyle wierszy, ile naprawdę potrzeba (4–6), zamiast zawsze 6 × 7 = 42 pustych komórek.
    const totalCells = Math.ceil((firstDow + daysInMonth) / 7) * 7;
    const c: { day: number; inMonth: boolean; date: Date }[] = [];
    for (let i = 0; i < totalCells; i++) {
      const n = i - firstDow + 1;
      if (n < 1 || n > daysInMonth) {
        c.push({ day: n, inMonth: false, date: new Date(y, m, n, 12, 0, 0, 0) });
      } else {
        c.push({ day: n, inMonth: true, date: new Date(y, m, n, 12, 0, 0, 0) });
      }
    }
    const long = new Date(y, m, 1).toLocaleString('pl-PL', { month: 'long' });
    return { title: `${capitalize(long)} ${y}`, cells: c };
  }, [viewMonth]);

  const now = new Date();
  const isViewingCurrentMonth =
    viewMonth.getFullYear() === now.getFullYear() && viewMonth.getMonth() === now.getMonth();
  const todayStart = startOfDay(now);

  const goPrev = useCallback(() => {
    setViewMonth((v) => new Date(v.getFullYear(), v.getMonth() - 1, 1, 0, 0, 0, 0));
  }, []);
  const goNext = useCallback(() => {
    setViewMonth((v) => new Date(v.getFullYear(), v.getMonth() + 1, 1, 0, 0, 0, 0));
  }, []);

  return (
    <div className={['not-prose w-full', className].filter(Boolean).join(' ')}>
      <h4 className="m-0 text-base font-semibold leading-snug text-foreground md:text-lg">
        Sprawdź dostępność
      </h4>

      <div className="mt-3 flex min-w-0 items-center justify-between gap-2">
        <button
          type="button"
          onClick={goPrev}
          disabled={isViewingCurrentMonth}
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md border border-border bg-background text-foreground transition-colors enabled:hover:bg-secondary disabled:cursor-not-allowed disabled:opacity-30"
          aria-label="Poprzedni miesiąc"
        >
          <ChevronLeftIcon className="h-5 w-5" />
        </button>
        <h3 className="m-0 min-w-0 flex-1 text-center text-base font-semibold text-foreground">
          {title}
        </h3>
        <button
          type="button"
          onClick={goNext}
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md border border-border bg-background text-foreground transition-colors hover:bg-secondary"
          aria-label="Następny miesiąc"
        >
          <ChevronRightIcon className="h-5 w-5" />
        </button>
      </div>

      <div className="mt-2 grid grid-cols-7 gap-0.5 text-center text-xs">
        {WEEKDAYS.map((d, i) => (
          <div
            key={d}
            className={[
              'py-1.5 font-medium',
              i === 6 ? 'text-red-600 dark:text-red-400' : 'text-muted-foreground',
            ].join(' ')}
            aria-hidden
          >
            {d}
          </div>
        ))}

        {cells.map((cell, idx) => {
          if (!cell.inMonth) {
            return <div key={`e-${idx}`} className="aspect-square min-h-[2rem] p-0.5" aria-hidden />;
          }
          const key = localYmdKey(cell.date);
          const isBeforeToday = startOfDay(cell.date).getTime() < todayStart.getTime();
          const isBlock = blocked.has(key);
          const gray = isBeforeToday || isBlock;
          const red = !gray && isPlRedCalendarDay(cell.date);

          return (
            <div
              key={key}
              className={[
                'flex aspect-square min-h-[2rem] min-w-0 items-center justify-center rounded p-0.5 text-sm tabular-nums',
                gray ? 'bg-muted/70 text-muted-foreground' : 'bg-white text-foreground dark:bg-background',
                !gray && red ? 'font-medium text-red-600 dark:text-red-400' : '',
              ].join(' ')}
            >
              {cell.day}
            </div>
          );
        })}
      </div>

      <div className="mt-4 space-y-2 text-sm text-muted-foreground">
        <div className="flex w-full min-w-0 flex-nowrap items-center gap-2">
          <span
            className="inline-block h-5 w-5 shrink-0 rounded border border-border bg-muted/70"
            aria-hidden
          />
          <span className="min-w-0 leading-tight">Termin niedostępny</span>
        </div>
        <div className="flex w-full min-w-0 flex-nowrap items-center gap-2">
          <span
            className="inline-block h-5 w-5 shrink-0 rounded border border-border bg-white dark:bg-background"
            aria-hidden
          />
          <span className="min-w-0 leading-tight">Termin dostępny</span>
        </div>
        <p className="m-0 pt-2 leading-relaxed text-muted-foreground">
          Jeśli interesujący Cię termin nie jest dostępny, skontaktuj się z nami, abyśmy mogli to
          potwierdzić i wspólnie znaleźć rozwiązanie. Daj znać poprzez zakładkę{' '}
          <Link
            to="/kontakt"
            className="font-medium text-foreground underline underline-offset-2 hover:no-underline"
          >
            /kontakt
          </Link>
          .
        </p>
      </div>
    </div>
  );
};
