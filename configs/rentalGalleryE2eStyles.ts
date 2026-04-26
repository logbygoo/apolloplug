import type { CSSProperties } from 'react';

/**
 * Wspólne style paska E2E (galeria w head `/wypozycz/:id` i slider oferty na landingu wypożyczalni).
 * Namespace: `.rental-car-landing`.
 */
export const RENTAL_CAR_LANDING_E2E_STYLES = `
  .rental-car-landing {
    --container-width: 100%;
    --slider-gap: 1.25rem;
    --e2e-edge-fuzz: 15px;
  }
  @media (min-width: 640px) {
    .rental-car-landing { --container-width: 40rem; }
  }
  @media (min-width: 768px) {
    .rental-car-landing { --container-width: 48rem; }
  }
  @media (min-width: 1024px) {
    .rental-car-landing { --container-width: 64rem; }
  }
  @media (min-width: 1280px) {
    .rental-car-landing { --container-width: 80rem; }
  }
  @media (min-width: 1536px) {
    .rental-car-landing { --container-width: 96rem; }
  }

  .rental-car-landing .e2e-slider {
    width: 100%;
    position: relative;
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
    overscroll-behavior-x: contain;
    scrollbar-width: none;
    -ms-overflow-style: none;
    touch-action: pan-x pan-y;
  }
  .rental-car-landing .e2e-slider::-webkit-scrollbar {
    height: 0;
    display: none;
  }
  .rental-car-landing .e2e-track {
    display: inline-flex;
    align-items: stretch;
    width: max-content;
    gap: var(--slider-gap, 20px);
    padding-top: 0;
    padding-bottom: 0;
    padding-left: max(1rem, calc((100% - var(--container-width)) / 2 + var(--e2e-edge-fuzz)));
    padding-right: max(1rem, calc((100% - var(--container-width)) / 2 + var(--e2e-edge-fuzz)));
  }
  .rental-car-landing .e2e-slide {
    min-height: 300px;
    max-height: 300px;
    align-self: stretch;
  }
  .rental-car-landing .e2e-slide--photo {
    position: relative;
    width: 100%;
    max-width: 500px;
  }
  @media (max-width: 767px) {
    .rental-car-landing .e2e-slide--photo {
      width: 80vw;
      max-width: 80vw;
    }
  }
  @media (min-width: 768px) {
    .rental-car-landing .e2e-track {
      padding-left: max(1.5rem, calc((100% - var(--container-width)) / 2 + 1.5rem));
      padding-right: max(1.5rem, calc((100% - var(--container-width)) / 2 + 1.5rem));
    }
  }

  @media (max-width: 767px) {
    .rental-car-landing .rental-v2-page-header h1 {
      font-size: 1.875rem;
      line-height: 2.25rem;
    }
  }

  .rental-car-landing .e2e-slide--fleet-offer {
    min-height: 0;
    max-height: none;
    align-self: auto;
  }
  @media (max-width: 767px) {
    .rental-car-landing .e2e-slide--fleet-offer {
      width: 80vw;
      max-width: 80vw;
    }
  }
  @media (min-width: 768px) {
    .rental-car-landing .e2e-slide--fleet-offer {
      width: 400px;
      max-width: 400px;
    }
  }

  /* Wyrównanie toru do .container.max-w-5xl (64rem) — ten sam lewy brzeg co nagłówki w treści */
  .rental-car-landing.rental-car-landing--align-max-5xl {
    --container-width: 64rem;
  }
  .rental-car-landing .e2e-slider img {
    -webkit-user-drag: none;
    user-select: none;
    -webkit-user-select: none;
  }
`;

export const RENTAL_GALLERY_E2E_SLIDER_GAP: CSSProperties = { '--slider-gap': '1.25rem' };
