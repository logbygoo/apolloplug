
import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { DOCUMENTS_DATA } from '../configs/documentsConfig';
import { jsPDF } from 'jspdf';

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
    // CACHE DISABLED FOR DEVELOPMENT
    /*
    const cachedPdf = sessionStorage.getItem(cacheKey);
    if (cachedPdf) {
        setPdfUrl(cachedPdf);
        setIsGenerating(false);
        return;
    }
    */

    // 2. If no cache, generate PDF
    if (!contentRef.current) return;

    const generatePdf = async () => {
      try {
        // CRITICAL CHANGE: Try to select the specific .pdf-content element.
        // If it exists, we generate the PDF from THAT element to respect its exact CSS.
        // Fallback to contentRef.current for other documents.
        const specificContent = contentRef.current?.querySelector('.pdf-content') as HTMLElement;
        const element = specificContent || contentRef.current;
        
        if (!element) return;

        // A4 format in points (pt)
        const a4WidthPt = 595.28;
        // HTML rendering width in pixels (794px is approx A4 @ 96DPI)
        const a4WidthPx = 794;

        const doc = new jsPDF('p', 'pt', 'a4');

        const options = {
          html2canvas: {
            scale: 2, // Higher scale for better text quality
            logging: false,
            useCORS: true,
            windowWidth: a4WidthPx,
            width: a4WidthPx,
            scrollY: 0,
            scrollX: 0
          },
          callback: (doc: jsPDF) => {
            const dataUri = doc.output('datauristring');
            
            // CACHE DISABLED FOR DEVELOPMENT
            /*
            try {
                sessionStorage.setItem(cacheKey, dataUri);
            } catch (e) {
                console.warn("Failed to cache PDF in sessionStorage (quota exceeded?)", e);
            }
            */
            
            setPdfUrl(dataUri);
            setIsGenerating(false);
          },
          x: 0,
          y: 0,
          // This tells jsPDF to scale the HTML content (794px) down to fit the PDF width (595.28pt)
          width: a4WidthPt, 
          windowWidth: a4WidthPx,
          autoPaging: 'text' as const
        };

        await doc.html(element, options);
      } catch (error) {
        console.error("Error generating PDF:", error);
        setIsGenerating(false);
      }
    };

    // Small timeout to ensure fonts/images are rendered
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
        /* 
           Hidden container. 
           We use a fixed width container matching the PDF generation width 
           to ensure text wrapping is calculated correctly before capture.
        */
        <div className="fixed top-0 left-0 w-[794px] h-0 overflow-hidden invisible z-[-1]">
            <div ref={contentRef} className="w-[794px]">
                {documentData.content}
            </div>
        </div>
      )}
    </div>
  );
};

export default PdfViewerPage;
