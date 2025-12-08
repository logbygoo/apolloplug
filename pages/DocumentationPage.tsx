
import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { PageHeader } from '../components/ui';
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
          <aside className="lg:w-1/4">
            <nav className="flex flex-row lg:flex-col overflow-x-auto lg:overflow-visible no-scrollbar -mx-4 px-4 lg:mx-0 lg:px-0 gap-1">
              {DOCUMENTS_DATA.map((doc, index) => (
                <button
                  key={doc.slug}
                  onClick={() => handleTabChange(index)}
                  className={`text-left w-full lg:w-auto flex-shrink-0 p-3 lg:px-4 lg:py-3 rounded-md text-sm font-medium transition-colors ${
                    activeTab === index
                      ? 'bg-secondary text-foreground'
                      : 'text-muted-foreground hover:bg-secondary/50 hover:text-foreground'
                  }`}
                >
                  {doc.title}
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
            <div className="mt-4 flex justify-end">
                 <a href={pdfUrl} target="_blank" rel="noopener noreferrer" className="text-sm text-primary hover:underline flex items-center gap-1">
                    Otwórz w nowym oknie
                 </a>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default DocumentationPage;
