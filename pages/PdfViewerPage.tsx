
import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { DOCUMENTS_DATA } from '../configs/documentsConfig';
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

        // 1. Capture the HTML as a high-res canvas using html2canvas
        // scale: 2 ensures the text remains crisp in the PDF (Retina quality)
        const canvas = await html2canvas(element, {
          scale: 1.25,
          useCORS: true,
          logging: false,
        });

        // 2. Initialize jsPDF
        const imgData = canvas.toDataURL('image/jpeg', 0.95);
        const doc = new jsPDF('p', 'mm', 'a4');
        
        const imgWidth = 210; // A4 width in mm
        const pageHeight = 297; // A4 height in mm
        
        // Calculate the height of the image on the PDF based on the aspect ratio
        const imgHeight = (canvas.height * imgWidth) / canvas.width;
        
        let heightLeft = imgHeight;
        let position = 0;

        // 3. Add image to PDF (handle multi-page if content is long)
        doc.addImage(imgData, 'JPEG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;

        while (heightLeft > 0) {
          position = heightLeft - imgHeight; // Move the image up
          doc.addPage();
          doc.addImage(imgData, 'JPEG', 0, position, imgWidth, imgHeight);
          heightLeft -= pageHeight;
        }

        const dataUri = doc.output('datauristring');
        // sessionStorage.setItem(cacheKey, dataUri); // CACHE DISABLED
        setPdfUrl(dataUri);
        setIsGenerating(false);

      } catch (error) {
        console.error("Error generating PDF:", error);
        setIsGenerating(false);
      }
    };

    // Delay to ensure fonts and DOM are fully ready
    const timeout = setTimeout(generatePdf, 800);
    return () => clearTimeout(timeout);
  }, [documentData, slug]);

  if (!documentData) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <p className="text-muted-foreground">Dokument nie został znaleziony.</p>
      </div>
    );
  }

  // Inject ref directly into the content element
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
           Left: -10000px keeps it out of view but renders it in DOM.
           Width: 794px forces exact A4 pixel width (96 DPI).
        */
        <div style={{ position: 'absolute', left: '-10000px', top: 0, width: '794px' }}>
            {contentWithRef}
        </div>
      )}
    </div>
  );
};

export default PdfViewerPage;
