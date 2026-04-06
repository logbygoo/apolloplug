import React, { useEffect } from 'react';
import Seo from '../components/Seo';

/** Strona testowa — nie linkowana, noindex. Izolowany CSS (prefiks .rental-v2), żeby nie kolidować z globalnym .e2e-slider. */
const RENTAL_V2_STYLES = `
  .rental-v2 {
    --container-width: 80rem;
    --slider-gap: 1.25rem;
    box-sizing: border-box;
  }
  .rental-v2 *,
  .rental-v2 *::before,
  .rental-v2 *::after {
    box-sizing: border-box;
  }
  .rental-v2 .e2e-slider {
    width: 100%;
    position: relative;
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
    overscroll-behavior-x: contain;
    scrollbar-width: none;
    -ms-overflow-style: none;
  }
  .rental-v2 .e2e-slider::-webkit-scrollbar {
    height: 0;
    display: none;
  }
  .rental-v2 .e2e-track {
    display: inline-flex;
    width: max-content;
    gap: var(--slider-gap, 20px);
    padding-top: 24px;
    padding-bottom: 24px;
    padding-left: max(1rem, calc((100% - var(--container-width)) / 2 + 15px));
    padding-right: max(1rem, calc((100% - var(--container-width)) / 2 + 15px));
  }
  .rental-v2 .slide {
    flex-shrink: 0;
    width: min(280px, 75vw);
    min-height: 180px;
    padding: 1.25rem;
    border-radius: 1rem;
    background: #252525;
    border: 1px solid #333;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-weight: 600;
  }
  .rental-v2 .slide span {
    font-size: 0.875rem;
    font-weight: 400;
    color: #888;
    margin-top: 0.5rem;
  }
  .rental-v2 .hint {
    max-width: var(--container-width);
    margin: 0 auto;
    padding: 1rem 1rem 0;
    font-size: 0.875rem;
    color: #888;
  }
`;

const sliderGapStyle = { '--slider-gap': '1.25rem' } as React.CSSProperties;

const RentalV2Page: React.FC = () => {
  useEffect(() => {
    const setMeta = (name: string, content: string) => {
      let el = document.querySelector(`meta[name="${name}"]`);
      if (!el) {
        el = document.createElement('meta');
        el.setAttribute('name', name);
        document.head.appendChild(el);
      }
      el.setAttribute('content', content);
    };
    setMeta('robots', 'noindex, nofollow');
    return () => {
      const el = document.querySelector('meta[name="robots"]');
      if (el?.getAttribute('content') === 'noindex, nofollow') {
        el.remove();
      }
    };
  }, []);

  return (
    <>
      <Seo title="Wypożyczalnia v2 (test)" description="Strona testowa — bez indeksowania." />
      <style>{RENTAL_V2_STYLES}</style>
      <div className="rental-v2 min-h-screen bg-[#171717] font-sans text-[#e3e3e3]">
        <p className="hint">
          Przewiń poziomo (mysz, touchpad lub palcem na telefonie). Pierwsza i ostatnia karta wyrównują się do
          szerokości <code className="text-[#ccc]">--container-width</code>.
        </p>

        <section className="e2e-slider" style={sliderGapStyle}>
          <div className="e2e-track">
            <div className="slide">
              Slajd 1
              <span>shrink-0 + stała szerokość</span>
            </div>
            <div className="slide">
              Slajd 2
              <span>kolejna karta</span>
            </div>
            <div className="slide">
              Slajd 3
              <span>…</span>
            </div>
            <div className="slide">
              Slajd 4
              <span>…</span>
            </div>
            <div className="slide">
              Slajd 5
              <span>ostatnia</span>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default RentalV2Page;
