import { useCallback, useRef } from 'react';

type DragState = {
  down: boolean;
  pointerId: number;
  startX: number;
  startScroll: number;
  blockClick: boolean;
  mode: 'window' | 'capture';
};

const initialDrag = (): DragState => ({
  down: false,
  pointerId: -1,
  startX: 0,
  startScroll: 0,
  blockClick: false,
  mode: 'capture',
});

/**
 * Oś X: przeciąganie jak galeria w head na landingu wynajmu; blokuje klik, gdy użyto drag.
 */
export function useRentalE2ePointerSlider() {
  const e2eSliderDrag = useRef<DragState>(initialDrag());

  const onPointerDownCapture = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType === 'touch') return;
    if (e.button !== 0) return;
    const el = e.currentTarget;
    const start = {
      down: true,
      pointerId: e.pointerId,
      startX: e.clientX,
      startScroll: el.scrollLeft,
      blockClick: false,
    };
    const fromInteractive = (e.target as HTMLElement | null)?.closest('button, a');

    if (fromInteractive) {
      e2eSliderDrag.current = { ...start, mode: 'window' };
      el.style.cursor = 'grabbing';
      const onWinMove = (ev: PointerEvent) => {
        const t = e2eSliderDrag.current;
        if (!t.down || ev.pointerId !== t.pointerId) return;
        const dx = ev.clientX - t.startX;
        if (Math.abs(dx) > 4) t.blockClick = true;
        el.scrollLeft = t.startScroll - dx;
      };
      const onWinEnd = (ev: PointerEvent) => {
        if (ev.pointerId !== start.pointerId) return;
        window.removeEventListener('pointermove', onWinMove, true);
        window.removeEventListener('pointerup', onWinEnd, true);
        window.removeEventListener('pointercancel', onWinEnd, true);
        e2eSliderDrag.current.down = false;
        e2eSliderDrag.current.mode = 'capture';
        el.style.cursor = '';
      };
      window.addEventListener('pointermove', onWinMove, true);
      window.addEventListener('pointerup', onWinEnd, true);
      window.addEventListener('pointercancel', onWinEnd, true);
      return;
    }

    e2eSliderDrag.current = { ...start, mode: 'capture' };
    el.setPointerCapture(e.pointerId);
    el.style.cursor = 'grabbing';
  }, []);

  const onPointerMove = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    const s = e2eSliderDrag.current;
    if (!s.down || e.pointerId !== s.pointerId || s.mode === 'window') return;
    const el = e.currentTarget;
    const dx = e.clientX - s.startX;
    if (Math.abs(dx) > 4) s.blockClick = true;
    el.scrollLeft = s.startScroll - dx;
  }, []);

  const onPointerUp = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    const s = e2eSliderDrag.current;
    if (!s.down || e.pointerId !== s.pointerId || s.mode === 'window') return;
    s.down = false;
    const el = e.currentTarget;
    el.style.cursor = '';
    try {
      el.releasePointerCapture(e.pointerId);
    } catch {
      /* no-op */
    }
  }, []);

  const onSliderLinkClick = useCallback((e: React.MouseEvent) => {
    if (e2eSliderDrag.current.blockClick) {
      e.preventDefault();
      e2eSliderDrag.current.blockClick = false;
    }
  }, []);

  return {
    e2eSliderDrag,
    onPointerDownCapture,
    onPointerMove,
    onPointerUp,
    onSliderLinkClick,
  };
}
