
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

  // A4 dimensions at 96 DPI
  const PAGE_HEIGHT_PX = 1123; 
  const PAGE_MARGIN_PX = 40; // ~10mm top/bottom margin for subsequent pages

  const autoPaginate = (container: HTMLElement) => {
    // Elements to check for page breaks.
    const selector = 'p, h1, h2, h3, h4, h5, h6, li, tr, .avoid-break'; 
    const elements = Array.from(container.querySelectorAll(selector)) as HTMLElement[];
    
    // Sort by position to process in order
    elements.sort((a, b) => {
        const rectA = a.getBoundingClientRect();
        const rectB = b.getBoundingClientRect();
        return rectA.top - rectB.top;
    });

    const containerTop = container.getBoundingClientRect().top;

    for (const el of elements) {
        const rect = el.getBoundingClientRect();
        const elTop = rect.top - containerTop;
        const elHeight = rect.height;
        const elBottom = elTop + elHeight;

        // Determine which page this element starts on (0-indexed)
        const pageIndex = Math.floor(elTop / PAGE_HEIGHT_PX);
        
        // The line where the current page ends
        const breakLine = (pageIndex + 1) * PAGE_HEIGHT_PX;
        
        // The effective "safe area" limit before the footer/bottom margin starts
        const footerLimit = breakLine - PAGE_MARGIN_PX;

        // If element crosses the footer limit (enters bottom margin) OR crosses the break line completely
        // We need to push it to the next page.
        if (elBottom > footerLimit) {
             // Skip massive elements that are larger than a page (can't really split them easily here)
             if (elHeight > (PAGE_HEIGHT_PX - 2 * PAGE_MARGIN_PX)) continue;

             // Calculate where this element SHOULD start on the next page
             // It should start at (breakLine + PAGE_MARGIN_PX) to simulate a top margin on the new page
             const targetTop = breakLine + PAGE_MARGIN_PX;
             
             // If it's already past the break line, check if it respects the top margin
             if (elTop > breakLine) {
                 if (elTop < targetTop) {
                     // It's on the new page but too high up (no top margin). Push it down.
                     const push = targetTop - elTop;
                     applySpacing(el, push);
                 }
             } else {
                 // It's straddling the break or in the footer area. Push it to next page + margin.
                 const push = targetTop - elTop;
                 applySpacing(el, push);
             }
        }
    }
  };

  const applySpacing = (el: HTMLElement, px: number) => {
      if (el.tagName === 'TR') {
          // For table rows, margin doesn't work reliably. Add padding to all cells.
          const cells = Array.from(el.children) as HTMLElement[];
          cells.forEach(cell => {
              const currentPadding = parseFloat(window.getComputedStyle(cell).paddingTop) || 0;
              cell.style.paddingTop = `${currentPadding + px}px`;
          });
      } else {
          // For blocks, use margin-top
          const currentMargin = parseFloat(window.getComputedStyle(el).marginTop) || 0;
          el.style.marginTop = `${currentMargin + px}px`;
      }
  };

  useEffect(() => {
    if (!documentData || !slug) return;

    if (!contentRef.current) return;

    const generatePdf = async () => {
      try {
        const element = contentRef.current;
        if (!element) return;

        // Run smart pagination
        autoPaginate(element);

        // 1. Capture the HTML as a high-res canvas
        const canvas = await html2canvas(element, {
          scale: 2, 
          useCORS: true,
          logging: false,
          windowWidth: 794, // Force A4 width context
        });

        // 2. Initialize jsPDF
        const imgData = canvas.toDataURL('image/jpeg', 0.95);
        const doc = new jsPDF('p', 'mm', 'a4');
        
        const imgWidth = 210; // A4 width in mm
        const pageHeight = 297; // A4 height in mm
        
        const imgHeight = (canvas.height * imgWidth) / canvas.width;
        
        let heightLeft = imgHeight;
        let position = 0;

        // 3. Add image pages
        doc.addImage(imgData, 'JPEG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;

        while (heightLeft > 0) {
          position = heightLeft - imgHeight; // This shifts the image slice for the next page
          doc.addPage();
          doc.addImage(imgData, 'JPEG', 0, position, imgWidth, imgHeight);
          heightLeft -= pageHeight;
        }

        const dataUri = doc.output('datauristring');
        setPdfUrl(dataUri);
        setIsGenerating(false);

      } catch (error) {
        console.error("Error generating PDF:", error);
        setIsGenerating(false);
      }
    };

    const timeout = setTimeout(generatePdf, 800);
    return () => clearTimeout(timeout);
  }, [documentData, slug]);

  if (!documentData) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <p className="text-muted-foreground">Dokument nie został znalezion.</p>
      </div>
    );
  }

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
        /* Generation container: Left -10000px, fixed A4 pixel width */
        <div style={{ position: 'absolute', left: '-10000px', top: 0, width: '794px' }}>
            {contentWithRef}
        </div>
      )}
    </div>
  );
};

export default PdfViewerPage;
