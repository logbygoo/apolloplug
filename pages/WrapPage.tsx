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

async function downloadImage(url: string, fileName: string): Promise<void> {
  try {
    const res = await fetch(url, { mode: 'cors' });
    if (!res.ok) throw new Error('fetch failed');
    const blob = await res.blob();
    const objectUrl = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = objectUrl;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(objectUrl);
  } catch {
    const a = document.createElement('a');
    a.href = url;
    a.target = '_blank';
    a.rel = 'noopener noreferrer';
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    a.remove();
  }
}

const WrapPage: React.FC = () => {
  const breadcrumbs = [{ name: 'Galeria wrap' }];
  const [downloadingId, setDownloadingId] = useState<string | null>(null);

  const onDownload = useCallback(
    async (item: (typeof WRAP_GALLERY_ITEMS)[number]) => {
      if (downloadingId) return;
      setDownloadingId(item.id);
      try {
        await downloadImage(item.src, item.fileName);
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
              <div
                className="overflow-hidden rounded-xl border-2 border-border bg-secondary p-2 shadow-sm"
                style={{ minHeight: '1px' }}
              >
                <img
                  src={item.src}
                  alt={item.label}
                  className="mx-auto h-auto w-full object-contain"
                  loading="lazy"
                  decoding="async"
                />
              </div>
              <p className="mt-2 line-clamp-2 text-center text-sm font-medium text-foreground">
                {item.label}
              </p>
              <div className="mt-2 flex justify-center">
                <button
                  type="button"
                  onClick={() => onDownload(item)}
                  disabled={downloadingId === item.id}
                  className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-border bg-background text-foreground transition-colors hover:bg-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:opacity-50"
                  aria-label={`Pobierz: ${item.fileName}`}
                >
                  <ArrowDownTrayIcon className="h-6 w-6" />
                </button>
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
