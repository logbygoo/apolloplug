
import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { PageHeader } from '../components/ui';
import { ArrowDownTrayIcon, ArrowTopRightOnSquareIcon } from '../icons';
import Seo from '../components/Seo';
import { SEO_CONFIG } from '../configs/seoConfig';
import { DOCUMENTS_DATA } from '../configs/documentsConfig';

const DocumentationPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const docSlug = searchParams.get('doc');
  
  // Determine initial active tab based on URL param or default to 0
  const initialIndex = DOCUMENTS_DATA.findIndex(doc => doc.slug === docSlug);
  const [activeTab, setActiveTab] = useState(initialIndex >= 0 ? initialIndex : 0);

  // Sync activeTab if URL changes externally (e.g. back button)
  useEffect(() => {
    const index = DOCUMENTS_DATA.findIndex(doc => doc.slug === docSlug);
    if (index >= 0) {
      setActiveTab(index);
    }
  }, [docSlug]);

  const handleTabChange = (index: number) => {
    setActiveTab(index);
    // Update URL parameter
    setSearchParams({ doc: DOCUMENTS_DATA[index].slug });
  };

  const activeDoc = DOCUMENTS_DATA[activeTab];
  // Generated PDF link for iframe
  const pdfUrl = `/pdf/${activeDoc.slug}.pdf`;

  const breadcrumbs = [{ name: 'Dokumentacja' }];

  return (
    <div className="bg-background text-foreground">
      <Seo {...SEO_CONFIG['/dokumentacja']} />
      <PageHeader
        title="Dokumentacja"
        subtitle="Wszystkie niezbędne dokumenty w jednym miejscu."
        breadcrumbs={breadcrumbs}
      />
      <div className="container mx-auto max-w-6xl px-4 md:px-6 pb-16 md:pb-24">
        <div className="flex flex-col lg:flex-row gap-8">
          <aside className="min-w-0 lg:w-1/4">
            <nav
              className="flex snap-x snap-mandatory flex-row flex-nowrap gap-2 overflow-x-auto overflow-y-visible scroll-smooth pb-1 [scrollbar-width:thin] lg:snap-none lg:flex-col lg:gap-1 lg:overflow-visible lg:pb-0 -mx-4 px-4 lg:mx-0 lg:px-0"
              style={{ WebkitOverflowScrolling: 'touch' }}
              aria-label="Typ dokumentu"
            >
              {DOCUMENTS_DATA.map((doc, index) => (
                <button
                  key={doc.slug}
                  type="button"
                  onClick={() => handleTabChange(index)}
                  className={[
                    'shrink-0 text-left text-sm font-medium transition-colors',
                    'rounded-full border border-border px-3.5 py-2 lg:w-full lg:rounded-md lg:border-0 lg:px-4 lg:py-3',
                    'snap-start',
                    activeTab === index
                      ? 'bg-secondary text-foreground'
                      : 'bg-background text-muted-foreground hover:bg-secondary/50 hover:text-foreground',
                  ].join(' ')}
                >
                  <span className="whitespace-nowrap">{doc.title}</span>
                </button>
              ))}
            </nav>
          </aside>
          <main className="lg:w-3/4">
            <div className="border border-border rounded-lg overflow-hidden h-[80vh] bg-secondary relative">
                {/* Loader / Placeholder behind iframe */}
                <div className="absolute inset-0 flex items-center justify-center text-muted-foreground z-0">
                    Ładowanie dokumentu...
                </div>
              <iframe
                key={pdfUrl} // Force re-render on url change
                src={pdfUrl}
                title={activeDoc.title}
                className="w-full h-full relative z-10 bg-white"
                frameBorder="0"
              />
            </div>
            <div className="mt-4 flex flex-wrap items-center justify-end gap-3">
              <a
                href={pdfUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline"
              >
                Otwórz w nowym oknie
                <ArrowTopRightOnSquareIcon className="h-4 w-4 shrink-0" aria-hidden />
              </a>
              <a
                href={pdfUrl}
                download={`${activeDoc.slug}.pdf`}
                className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline"
              >
                Pobierz dokument
                <ArrowDownTrayIcon className="h-4 w-4 shrink-0" />
              </a>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default DocumentationPage;
