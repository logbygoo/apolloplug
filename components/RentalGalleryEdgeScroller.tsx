import React from 'react';

/** Wychodzi z kolumny — pełna szerokość viewportu, jak galeria w head landingu wynajmu. */
export const RentalGalleryEdgeScroller: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="relative ml-[calc(50%-50vw)] w-[100vw] max-w-[100vw] shrink-0 overflow-x-visible">
    {children}
  </div>
);
