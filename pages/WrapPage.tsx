import React, { useCallback, useState } from 'react';
import Seo from '../components/Seo';
import { PageHeader } from '../components/ui';
import { SEO_CONFIG } from '../configs/seoConfig';
import {
  WRAP_GALLERY_ITEMS,
  WRAP_INSTALL_TIKTOK_VIDEO_ID,
} from '../configs/wrapGalleryConfig';
import { tiktokEmbedSrc } from '../configs/tiktokLandingEmbeds';
import { ArrowDownTrayIcon } from '../icons';

function wrapDownloadRequestUrl(fileName: string): string {
  return `/api/wrap-download?file=${encodeURIComponent(fileName)}`;
}

/**
 * Pobieranie przez `/api/wrap-download` (ten sam host → brak CORS) z nagłówkiem
 * `Content-Disposition: attachment` po stronie serwera (CF Pages + dev: proxy w vite.config).
 */
async function downloadImageFile(fileName: string): Promise<void> {
  const res = await fetch(wrapDownloadRequestUrl(fileName), { credentials: 'same-origin' });
  if (!res.ok) {
    throw new Error('Pobieranie nie powiodło się');
  }
  const blob = await res.blob();
  const objectUrl = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = objectUrl;
  a.download = fileName;
  a.rel = 'noopener';
  document.body.appendChild(a);
  a.click();
  a.remove();
  window.setTimeout(() => URL.revokeObjectURL(objectUrl), 2000);
}

const WrapPage: React.FC = () => {
  const breadcrumbs = [{ name: 'Galeria wrap' }];
  const [downloadingId, setDownloadingId] = useState<string | null>(null);

  const onDownload = useCallback(
    async (item: (typeof WRAP_GALLERY_ITEMS)[number]) => {
      if (downloadingId) return;
      setDownloadingId(item.id);
      try {
        await downloadImageFile(item.fileName);
      } finally {
        setDownloadingId(null);
      }
    },
    [downloadingId],
  );

  return (
    <div className="bg-background">
      <Seo {...SEO_CONFIG['/wrap']} />
      <PageHeader title="Wrap Galeria Tesla" breadcrumbs={breadcrumbs} />

      <div className="container mx-auto max-w-6xl px-4 pb-6 md:px-6">
        <ul className="m-0 grid list-none grid-cols-1 gap-8 p-0 sm:grid-cols-2 lg:grid-cols-3">
          {WRAP_GALLERY_ITEMS.map((item) => (
            <li key={item.id} className="flex flex-col">
              <div className="overflow-hidden rounded-xl border-2 border-border shadow-sm">
                <div className="flex flex-col bg-zinc-300/95 p-3 dark:bg-zinc-900/95">
                  <img
                    src={item.src}
                    alt={`${item.label} — ${item.compatibleModel}`}
                    className="mx-auto h-auto w-full rounded-md object-contain"
                    loading="lazy"
                    decoding="async"
                  />
                  <p className="m-0 mt-3 line-clamp-2 text-center text-sm font-medium leading-snug text-foreground">
                    {item.label}
                  </p>
                  <div className="mt-3 flex flex-wrap items-center justify-center gap-3">
                    <span className="inline-flex min-h-10 min-w-0 max-w-full items-center rounded-full border border-black/10 bg-white/70 px-3 text-xs font-semibold text-foreground dark:border-white/15 dark:bg-white/10">
                      {item.compatibleModel}
                    </span>
                    <button
                      type="button"
                      onClick={() => onDownload(item)}
                      disabled={downloadingId === item.id}
                      className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-black/10 bg-white/90 text-foreground transition-colors hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:opacity-50 dark:border-white/15 dark:bg-white/10 dark:hover:bg-white/20"
                      aria-label={`Pobierz ${item.fileName} — ${item.compatibleModel}`}
                    >
                      <ArrowDownTrayIcon className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <div className="container mx-auto max-w-2xl px-4 pb-16 md:px-6">
        <h2 className="m-0 text-2xl font-bold tracking-tight text-foreground">
          Jak zainstalować?
        </h2>
        <ol className="mt-4 list-decimal space-y-2 pl-6 text-base leading-relaxed text-foreground">
          <li>pobierz</li>
          <li>wgraj na pendrive Tesli</li>
          <li>
            wybierz w aplikacji <span className="font-medium">Lakiernia</span> w swoim samochodzie
          </li>
        </ol>

        <div className="mt-8">
          <p className="m-0 mb-3 text-sm text-muted-foreground">Film instruktażowy (TikTok)</p>
          <div className="mx-auto w-full max-w-[min(100%,360px)]">
            <div className="relative aspect-[9/16] w-full overflow-hidden rounded-xl bg-black shadow-lg">
              <iframe
                title="Instrukcja instalacji wrapu w Tesli"
                src={tiktokEmbedSrc(WRAP_INSTALL_TIKTOK_VIDEO_ID)}
                className="absolute left-0 top-0 h-full w-full border-0"
                allow="autoplay; encrypted-media; picture-in-picture; web-share; clipboard-write"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WrapPage;
