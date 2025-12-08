
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
        
        await doc.html(element, {
          callback: (doc: jsPDF) => {
            const dataUri = doc.output('datauristring');
            // sessionStorage.setItem(cacheKey, dataUri); // CACHE DISABLED
            setPdfUrl(dataUri);
            setIsGenerating(false);
          },
          // A4 Width in mm. Setting this forces jsPDF to scale the HTML to fit this width.
          width: 210, 
          // The virtual window width in pixels. 794px corresponds to 210mm at 96 DPI.
          // This tells html2canvas to render the layout as if it were on an A4-sized screen.
          windowWidth: 794,
          x: 0,
          y: 0,
          html2canvas: {
            useCORS: true,
            logging: false,
            scale: 1, // Reset scale to 1, let jsPDF handle the fitting via 'width' parameter
          }
        });

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

  // Inject ref directly into the content element if it's a valid React element
  // This avoids adding an extra wrapper div that might mess up styles
  const contentWithRef = React.isValidElement(documentData.content) 
    ? React.cloneElement(documentData.content as React.ReactElement<any>, { ref: contentRef })
    : <div ref={contentRef}>{documentData.content}</div>;

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
           Position fixed off-screen ensures it is rendered in the DOM for html2canvas to see,
           but hidden from the user. We DO NOT use extra wrapper divs here to avoid style conflicts.
        */
        <div style={{ position: 'fixed', left: '-10000px', top: 0 }}>
            {contentWithRef}
        </div>
      )}
    </div>
  );
};

export default PdfViewerPage;
