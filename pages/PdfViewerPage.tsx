
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

    // CACHE DISABLED TEMPORARILY
    /*
    const cacheKey = `pdf_cache_${slug}`;
    const cachedPdf = sessionStorage.getItem(cacheKey);
    if (cachedPdf) {
        setPdfUrl(cachedPdf);
        setIsGenerating(false);
        return;
    }
    */

    if (!contentRef.current) return;

    const generatePdf = async () => {
      try {
        const element = contentRef.current;
        if (!element) return;

        // A4 Dimensions:
        // Width in pt: 595.28
        // Width in px (96 DPI): 794
        
        const doc = new jsPDF('p', 'pt', 'a4');
        const pdfWidthPt = 595.28;
        const htmlWidthPx = 794;

        const options = {
          callback: (doc: jsPDF) => {
            const dataUri = doc.output('datauristring');
            // sessionStorage.setItem(cacheKey, dataUri); // CACHE DISABLED
            setPdfUrl(dataUri);
            setIsGenerating(false);
          },
          // This ensures the 794px HTML fits exactly into the 595.28pt PDF width
          width: pdfWidthPt, 
          windowWidth: htmlWidthPx,
          autoPaging: 'text' as const,
          x: 0,
          y: 0,
          html2canvas: {
            scale: 2, // Improves text sharpness
            useCORS: true,
            logging: false,
            // Explicitly set the canvas dimensions to match the source element
            width: htmlWidthPx,
            windowWidth: htmlWidthPx,
          }
        };

        await doc.html(element, options);
      } catch (error) {
        console.error("Error generating PDF:", error);
        setIsGenerating(false);
      }
    };

    // Small delay to ensure DOM render
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
    <div className="w-full h-screen bg-secondary flex items-center justify-center overflow-hidden relative">
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
           Off-screen container for generation.
           Crucial: using 'absolute' + 'left: -9999px' instead of 'hidden/invisible'
           ensures the layout engine renders it fully (including fonts/tables) before capture.
           Fixed width of 794px matches A4 @ 96 DPI.
        */
        <div style={{ position: 'absolute', left: '-9999px', top: 0, width: '794px' }}>
            <div ref={contentRef}>
                {documentData.content}
            </div>
        </div>
      )}
    </div>
  );
};

export default PdfViewerPage;
