
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

        // Initialize jsPDF with millimeters and A4 format
        const doc = new jsPDF('p', 'mm', 'a4');
        
        const options = {
          callback: (doc: jsPDF) => {
            const dataUri = doc.output('datauristring');
            // sessionStorage.setItem(cacheKey, dataUri); // CACHE DISABLED
            setPdfUrl(dataUri);
            setIsGenerating(false);
          },
          // Map the 794px width content to 210mm PDF width
          width: 210,
          // Vital: Force html2canvas to render at 794px width (standard A4 @ 96DPI)
          windowWidth: 794,
          autoPaging: 'text' as const,
          x: 0,
          y: 0,
          html2canvas: {
            scale: 2, // 2x scale for sharper text
            useCORS: true,
            logging: false,
            windowWidth: 794, // Ensure canvas thinks window is 794px wide
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
           Positioned absolutely far off-screen to avoid visual glitches but kept in DOM for rendering.
           The inner width is explicitly 794px to match A4 pixel width at 96 DPI.
        */
        <div style={{ position: 'absolute', left: '-10000px', top: 0 }}>
            <div ref={contentRef} style={{ width: '794px', margin: 0, padding: 0, backgroundColor: 'white' }}>
                {documentData.content}
            </div>
        </div>
      )}
    </div>
  );
};

export default PdfViewerPage;
