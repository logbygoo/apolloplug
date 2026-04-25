import React, { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import {
  TIKTOK_LANDING_TILES,
  TIKTOK_PLAYER_ORIGIN,
  postTiktokPlayerCommand,
  tiktokEmbedSrc,
} from '../configs/tiktokLandingEmbeds';
import { SOCIAL_MEDIA_LINKS } from '../configs/socialLinks';
import { TikTokIcon, XMarkIcon } from '../icons';

const TikTokViewIcon: React.FC<React.SVGProps<SVGSVGElement>> = ({ className, ...props }) => (
  <svg
    className={['h-3.5 w-3.5 shrink-0 text-current opacity-90', className].filter(Boolean).join(' ')}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    aria-hidden
    {...props}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M2.25 12s3.5-6.75 9.75-6.75S21.75 12 21.75 12s-3.5 6.75-9.75 6.75S2.25 12 2.25 12Z"
    />
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
  </svg>
);

const LANDING_TIKTOK_STYLES = `
  .landing-tiktok-social .tiktok-social-hscroll {
    height: 100%;
    min-height: 0;
    flex: 1 1 0;
    overflow-x: auto;
    overflow-y: hidden;
    -webkit-overflow-scrolling: touch;
    overscroll-behavior-x: contain;
    scrollbar-width: none;
    -ms-overflow-style: none;
    touch-action: pan-x pan-y;
    scroll-behavior: auto;
  }
  .landing-tiktok-social .tiktok-social-hscroll::-webkit-scrollbar {
    height: 0;
    display: none;
  }
  .landing-tiktok-social .tiktok-social-track {
    display: flex;
    align-items: stretch;
    align-self: stretch;
    gap: 0.75rem;
    width: max-content;
    min-height: 0;
    height: 100%;
  }
  .landing-tiktok-social .tiktok-social-slide {
    flex: 0 0 auto;
    display: flex;
    align-items: stretch;
    height: 100%;
    width: auto;
    aspect-ratio: 9 / 16;
    max-height: 100%;
    min-height: 0;
    min-width: 0;
  }
  .landing-tiktok-social .tiktok-social-track .tiktok-social-slide:last-child {
    margin-right: 20px;
  }
  @media (max-width: 1023px) {
    .landing-tiktok-social .tiktok-social-hscroll {
      height: auto;
      flex: 0 0 auto;
    }
    .landing-tiktok-social .tiktok-social-track {
      height: auto;
      align-items: flex-start;
    }
    .landing-tiktok-social .tiktok-social-slide {
      width: clamp(150px, 34vw, 180px);
      height: auto;
      aspect-ratio: 9 / 16;
      max-height: none;
    }
  }

  /* Strony biolinków (/ig, …) — bez wyrównania do metryk: tylko wysokość miniatur, bez pustki pod paskiem. */
  .landing-tiktok-social--standalone .tiktok-social-hscroll {
    height: auto;
    min-height: 0;
    flex: 0 0 auto;
  }
  .landing-tiktok-social--standalone .tiktok-social-track {
    height: auto;
    align-items: flex-start;
    min-height: 0;
  }
  .landing-tiktok-social--standalone .tiktok-social-slide {
    width: clamp(150px, 32vw, 200px);
    height: auto;
    aspect-ratio: 9 / 16;
    max-height: 380px;
    min-width: 0;
  }
`;

export type LandingTiktokSocialBlockProps = {
  /**
   * Gdy np. w siatce obok kafli metryk: w `lg` wyrównaj wysokość panelu TikTok do tego bloku
   * (ResizeObserver).
   */
  alignWithRef?: React.RefObject<HTMLDivElement | null>;
  className?: string;
};

export const LandingTiktokSocialBlock: React.FC<LandingTiktokSocialBlockProps> = ({
  alignWithRef,
  className = '',
}) => {
  const [syncedBoxHeight, setSyncedBoxHeight] = useState<number | null>(null);
  const [tiktokModalVideoId, setTiktokModalVideoId] = useState<string | null>(null);
  const tiktokIframeRef = useRef<HTMLIFrameElement | null>(null);
  const tiktokDrag = useRef<{
    down: boolean;
    pointerId: number;
    startX: number;
    startScroll: number;
    blockClick: boolean;
    mode: 'window' | 'capture';
  }>({
    down: false,
    pointerId: -1,
    startX: 0,
    startScroll: 0,
    blockClick: false,
    mode: 'capture',
  });

  const syncHeight = useCallback(() => {
    const el = alignWithRef?.current;
    if (!el) return;
    setSyncedBoxHeight(Math.round(el.getBoundingClientRect().height));
  }, [alignWithRef]);

  useLayoutEffect(() => {
    if (!alignWithRef?.current) return;
    const ro = new ResizeObserver(() => {
      syncHeight();
    });
    ro.observe(alignWithRef.current);
    syncHeight();
    window.addEventListener('resize', syncHeight);
    return () => {
      ro.disconnect();
      window.removeEventListener('resize', syncHeight);
    };
  }, [alignWithRef, syncHeight]);

  const onTiktokSliderPointerDown = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
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
    const fromButton = (e.target as HTMLElement | null)?.closest('button');

    if (fromButton) {
      tiktokDrag.current = { ...start, mode: 'window' };
      el.style.cursor = 'grabbing';
      const onWinMove = (ev: PointerEvent) => {
        const t = tiktokDrag.current;
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
        tiktokDrag.current.down = false;
        tiktokDrag.current.mode = 'capture';
        el.style.cursor = '';
      };
      window.addEventListener('pointermove', onWinMove, true);
      window.addEventListener('pointerup', onWinEnd, true);
      window.addEventListener('pointercancel', onWinEnd, true);
      return;
    }

    tiktokDrag.current = { ...start, mode: 'capture' };
    el.setPointerCapture(e.pointerId);
    el.style.cursor = 'grabbing';
  }, []);

  const onTiktokSliderPointerMove = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    const s = tiktokDrag.current;
    if (!s.down || e.pointerId !== s.pointerId || s.mode === 'window') return;
    const el = e.currentTarget;
    const dx = e.clientX - s.startX;
    if (Math.abs(dx) > 4) s.blockClick = true;
    el.scrollLeft = s.startScroll - dx;
  }, []);

  const onTiktokSliderPointerUp = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    const s = tiktokDrag.current;
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

  const onTiktokTileClick = useCallback(
    (videoId: string) => (e: React.MouseEvent) => {
      if (tiktokDrag.current.blockClick) {
        e.preventDefault();
        e.stopPropagation();
        tiktokDrag.current.blockClick = false;
        return;
      }
      setTiktokModalVideoId(videoId);
    },
    [],
  );

  useEffect(() => {
    if (tiktokModalVideoId === null) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setTiktokModalVideoId(null);
    };
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener('keydown', onKey);
    };
  }, [tiktokModalVideoId]);

  useEffect(() => {
    if (tiktokModalVideoId === null) return;
    const unmute = () => postTiktokPlayerCommand(tiktokIframeRef.current, 'unMute');
    const onMessage = (ev: MessageEvent) => {
      if (ev.origin !== TIKTOK_PLAYER_ORIGIN) return;
      const d = ev.data as { type?: string } | null;
      if (d && typeof d === 'object' && d.type === 'onPlayerReady') {
        unmute();
      }
    };
    window.addEventListener('message', onMessage);
    const t0 = window.setTimeout(unmute, 400);
    const t1 = window.setTimeout(unmute, 1000);
    const t2 = window.setTimeout(unmute, 2200);
    return () => {
      window.removeEventListener('message', onMessage);
      clearTimeout(t0);
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [tiktokModalVideoId]);

  if (TIKTOK_LANDING_TILES.length === 0) {
    return null;
  }

  const standalone = !alignWithRef;

  const asideSyncStyle =
    alignWithRef && syncedBoxHeight != null
      ? ({ ['--tiktok-box-height' as string]: `${syncedBoxHeight}px` } as React.CSSProperties)
      : undefined;

  return (
    <div
      className={[
        'landing-tiktok-social w-full not-prose',
        standalone && 'landing-tiktok-social--standalone',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      <style>{LANDING_TIKTOK_STYLES}</style>
      <aside
        className={[
          'flex min-h-0 w-full min-w-0 flex-col',
          alignWithRef ? 'lg:h-[var(--tiktok-box-height)]' : 'h-auto',
        ]
          .filter(Boolean)
          .join(' ')}
        style={asideSyncStyle}
        aria-label="Filmy z TikToka"
      >
        <div
          className={[
            'flex w-full min-w-0 flex-col overflow-hidden rounded-lg bg-muted/50 px-5 pb-5 pt-2.5',
            standalone ? 'h-auto flex-none' : 'min-h-0 flex-1',
          ]
            .filter(Boolean)
            .join(' ')}
        >
          <div className="flex min-w-0 shrink-0 items-center justify-between gap-2 pb-2">
            <p className="min-w-0 pr-1 text-sm font-bold leading-tight text-foreground">
              Ostatnio w naszych social mediach
            </p>
            <div className="flex shrink-0 items-center" aria-label="TikTok">
              {SOCIAL_MEDIA_LINKS.filter((l) => l.id === 'tiktok').map(({ id, href, label }) => (
                <a
                  key={id}
                  href={href}
                  target="_blank"
                  rel="nofollow noopener noreferrer"
                  className="flex items-center gap-1.5 rounded-sm text-foreground/80 transition-colors hover:text-foreground"
                >
                  <TikTokIcon className="h-4 w-4 shrink-0" aria-hidden />
                  <span className="text-sm font-medium">{label}</span>
                </a>
              ))}
            </div>
          </div>
          <div
            className="tiktok-social-hscroll -mx-5 min-h-0 w-[calc(100%+40px)] cursor-grab select-none px-5 py-[5px]"
            onPointerDownCapture={onTiktokSliderPointerDown}
            onPointerMove={onTiktokSliderPointerMove}
            onPointerUp={onTiktokSliderPointerUp}
            onPointerCancel={onTiktokSliderPointerUp}
          >
            <div className="tiktok-social-track">
              {TIKTOK_LANDING_TILES.map((tile) => (
                <div key={tile.videoId} className="tiktok-social-slide">
                  <button
                    type="button"
                    onClick={onTiktokTileClick(tile.videoId)}
                    className="group relative h-full min-h-0 w-full overflow-hidden rounded-lg border border-border/60 bg-background text-left shadow-md transition-all hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  >
                    <img
                      src={tile.thumbSrc}
                      alt={tile.alt ?? 'Miniatura filmu TikTok'}
                      className="absolute inset-0 h-full w-full object-cover transition-transform group-hover:scale-[1.02]"
                      loading="lazy"
                      decoding="async"
                    />
                    <span className="absolute right-1.5 top-1.5 z-[2] text-white drop-shadow">
                      <TikTokIcon className="h-3.5 w-3.5" aria-hidden />
                    </span>
                    <span className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-black/10" />
                    <span className="absolute left-1/2 top-1/2 z-[1] flex h-9 w-9 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white/65 text-foreground shadow-md transition-transform group-hover:scale-105">
                      <svg
                        className="ml-0.5 h-4 w-4"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        aria-hidden
                      >
                        <path d="M8 5.14v13.72L19 12 8 5.14z" />
                      </svg>
                    </span>
                    <span className="absolute bottom-0 left-0 right-0 z-[1] flex min-w-0 items-center gap-1.5 px-2 py-1.5 text-[0.7rem] font-medium text-white sm:px-3 sm:py-2 sm:text-xs">
                      <TikTokViewIcon />
                      <span className="line-clamp-1 min-w-0">{tile.viewCountLabel}</span>
                    </span>
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </aside>

      {tiktokModalVideoId && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center overflow-y-auto bg-black/75 p-4"
          onClick={() => setTiktokModalVideoId(null)}
          role="dialog"
          aria-modal="true"
          aria-label="Film TikTok"
        >
          <div
            className="relative my-auto w-full max-w-[min(100%,325px)] shrink-0 rounded-lg bg-background p-2 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              className="absolute right-2 top-2 z-20 flex h-9 w-9 items-center justify-center rounded-full border border-border bg-background text-foreground shadow-md transition-colors hover:bg-secondary"
              onClick={() => setTiktokModalVideoId(null)}
              aria-label="Zamknij"
            >
              <XMarkIcon className="h-5 w-5" />
            </button>
            <div className="relative aspect-[9/16] w-full overflow-hidden rounded-lg bg-black">
              <iframe
                ref={tiktokIframeRef}
                key={tiktokModalVideoId}
                title="TikTok"
                src={tiktokEmbedSrc(tiktokModalVideoId)}
                className="absolute left-0 top-0 h-full w-full border-0"
                allow="autoplay; encrypted-media; picture-in-picture; web-share; clipboard-write"
                loading="eager"
                onLoad={() => {
                  postTiktokPlayerCommand(tiktokIframeRef.current, 'unMute');
                }}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
