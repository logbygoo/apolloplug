import React from 'react';
import type { Car } from '../types';

/** Cennik progów dziennych — ten sam układ co na /wypozyczalnia. */
const RentalPriceTable: React.FC<{ car: Car; className?: string; showHeading?: boolean }> = ({
  car,
  className = 'mt-6',
  showHeading = true,
}) => {
  if (!car.priceTiers || car.priceTiers.length === 0) {
    return null;
  }

  return (
    <div className={className}>
      {showHeading ? <h3 className="mb-2 text-lg font-semibold">Cennik dla {car.name}</h3> : null}
      <div className="overflow-hidden rounded-lg border border-border">
        <table className="min-w-full">
          <tbody className="divide-y divide-border bg-background">
            {car.priceTiers.map((tier, index) => (
              <tr key={index} className="odd:bg-white even:bg-secondary/50">
                <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-foreground">{tier.days}</td>
                <td className="whitespace-nowrap px-6 py-4 text-right text-sm text-foreground">
                  <div>{tier.pricePerDay} zł</div>
                  <div className="text-xs text-muted-foreground">{tier.kmLimitPerDay} km/dzień</div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RentalPriceTable;
