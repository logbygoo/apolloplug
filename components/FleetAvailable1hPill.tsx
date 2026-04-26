import React from 'react';

/**
 * Tylko landingu `/wypozyczalnia` (slider „Auta w ofercie”). Flota: `availableIn1h` w `configs/fleetConfig.ts`.
 */
export const FleetAvailable1hPill: React.FC<{ className?: string }> = ({ className = '' }) => (
  <span
    className={`inline-flex max-w-full flex-wrap items-center gap-x-1.5 gap-y-0.5 rounded-full border border-emerald-600/35 bg-emerald-500/12 px-2.5 py-1 text-xs font-medium text-emerald-800 dark:text-emerald-200 ${className}`}
  >
    <span className="inline-flex items-center gap-1 text-emerald-700 dark:text-emerald-300">
      <span
        className="h-2 w-2 shrink-0 rounded-full bg-emerald-500 shadow-[0_0_8px_2px_rgba(16,185,129,0.5)] motion-safe:animate-pulse"
        aria-hidden
      />
      <span className="font-semibold uppercase tracking-wide">Dostępne</span>
    </span>
    <span className="text-foreground/90">Do odbioru w 1h</span>
  </span>
);
