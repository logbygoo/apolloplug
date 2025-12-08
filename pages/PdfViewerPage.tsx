
import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { DOCUMENTS_DATA } from '../configs/documentsConfig';
import { COMPANY_DETAILS } from '../configs/companyDetails';
import { ApolloPlugLogo } from '../constants';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';

const PdfViewerPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const documentData = DOCUMENTS_DATA.find(doc => doc.slug === slug);
  const contentRef = useRef<HTMLDivElement>(null);
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(true);

  useEffect(() => {
    if (!documentData || !slug) return;

    const cacheKey = `pdf_cache_${slug}`;
    
    // 1. Check Session Storage for cached PDF
    const cachedPdf = sessionStorage.getItem(cacheKey);
    if (cachedPdf) {
        setPdfUrl(cachedPdf);
        setIsGenerating(false);
        return;
    }

    // 2. If no cache, generate PDF
    if (!contentRef.current) return;

    const generatePdf = async () => {
      try {
        const element = contentRef.current;
        if (!element) return;

        // Create PDF with A4 format (pt units)
        const doc = new jsPDF('p', 'pt', 'a4');
        
        // Options for html2canvas to ensure clean capture
        const options = {
          html2canvas: {
            scale: 2, // Higher scale for better quality
            logging: false,
            useCORS: true,
            windowWidth: 794 // A4 width in px at 96dpi approx
          },
          callback: (doc: jsPDF) => {
            // Use datauristring for storage compatibility (bloburl expires)
            const dataUri = doc.output('datauristring');
            
            try {
                sessionStorage.setItem(cacheKey, dataUri);
            } catch (e) {
                console.warn("Failed to cache PDF in sessionStorage (quota exceeded?)", e);
            }
            
            setPdfUrl(dataUri);
            setIsGenerating(false);
          },
          x: 0,
          y: 0,
          width: 595.28, // A4 width in pt
          windowWidth: 794,
          autoPaging: 'text' as const
        };

        await doc.html(element, options);
      } catch (error) {
        console.error("Error generating PDF:", error);
        setIsGenerating(false);
      }
    };

    // Small timeout to ensure fonts and styles are loaded before capturing
    const timeout = setTimeout(generatePdf, 500);
    return () => clearTimeout(timeout);
  }, [documentData, slug]);

  if (!documentData) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <p className="text-muted-foreground">Dokument nie został znaleziony.</p>
      </div>
    );
  }

  return (
    <div className="w-full h-screen bg-secondary flex items-center justify-center overflow-hidden">
      {isGenerating && !pdfUrl && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-white z-50">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary mb-4"></div>
          <p className="text-muted-foreground font-medium">Wczytywanie podglądu PDF...</p>
        </div>
      )}

      {pdfUrl ? (
        <iframe 
            src={pdfUrl} 
            className="w-full h-full border-none" 
            title={documentData.title}
        />
      ) : (
        /* Hidden rendering container for PDF generation */
        <div className="fixed top-0 left-0 w-[794px] invisible z-[-1]" style={{ pointerEvents: 'none' }}>
            <div ref={contentRef} className="bg-white w-[794px] min-h-[1123px] p-[60px] text-black box-border relative">
                {/* Document Header */}
                <div className="border-b-2 border-black pb-6 mb-8 flex justify-between items-start">
                    <div>
                        <div className="scale-75 origin-top-left text-black">
                            <ApolloPlugLogo />
                        </div>
                    </div>
                    <div className="text-right text-[10px] text-gray-500 font-sans leading-tight">
                        <p className="font-bold text-black text-xs mb-1">{COMPANY_DETAILS.name}</p>
                        <p>{COMPANY_DETAILS.address}</p>
                        <p>NIP: {COMPANY_DETAILS.nip} | KRS: {COMPANY_DETAILS.krs}</p>
                        <p>Kapitał zakładowy: {COMPANY_DETAILS.capital}</p>
                        <p className="mt-1 font-medium">{COMPANY_DETAILS.website}</p>
                        <p>{COMPANY_DETAILS.email} | {COMPANY_DETAILS.phone}</p>
                    </div>
                </div>

                {/* Content */}
                <article className="prose prose-sm max-w-none font-serif text-justify prose-headings:font-sans prose-headings:font-bold prose-h1:text-2xl prose-h1:text-center prose-h1:mb-8 prose-h2:text-lg prose-h2:mt-6 prose-h2:mb-2 prose-p:my-3 prose-li:my-1 text-black">
                    {documentData.content}
                </article>

                {/* Footer */}
                <div className="absolute bottom-[60px] left-[60px] right-[60px] pt-4 border-t border-gray-200 text-center text-[10px] text-gray-400 font-sans">
                    Dokument wygenerowany elektronicznie ze strony {COMPANY_DETAILS.website} w dniu {new Date().toLocaleDateString('pl-PL')}
                </div>
            </div>
        </div>
      )}
    </div>
  );
};

export default PdfViewerPage;
