
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
        
        // A4 width at 96 DPI is approximately 794px
        // In points (1/72 inch), A4 is 595.28 pt
        const a4WidthPx = 794;
        const a4WidthPt = 595.28;

        const options = {
          html2canvas: {
            scale: 2, // Higher scale for better quality
            logging: false,
            useCORS: true,
            windowWidth: a4WidthPx,
            width: a4WidthPx
          },
          callback: (doc: jsPDF) => {
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
        /* 
           Hidden rendering container. 
           We fix the width to 794px (approx A4 @ 96 DPI) to match the html2canvas windowWidth.
        */
        <div className="fixed top-0 left-0 w-[794px] h-0 overflow-hidden invisible z-[-1]">
            <div ref={contentRef} className="bg-white w-[794px] min-h-[1123px] text-black box-border relative">
                {documentData.content}
            </div>
        </div>
      )}
    </div>
  );
};

export default PdfViewerPage;
