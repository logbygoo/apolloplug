
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

  // A4 dimensions at 96 DPI (approx)
  // A4 is 210mm x 297mm. 
  // 1 inch = 25.4mm. 96px/inch.
  // Width: 794px. Height: 1123px.
  const PAGE_HEIGHT_PX = 1122; 

  const autoPaginate = (container: HTMLElement) => {
    // Elements to check for page breaks. We prioritize specific block elements.
    // 'tr' covers table rows. 'p', 'h1-h6', 'li' cover text. 'div' is too generic usually, but might be needed for some layouts.
    const selector = 'p, h1, h2, h3, h4, h5, h6, li, tr, .avoid-break'; 
    const elements = Array.from(container.querySelectorAll(selector)) as HTMLElement[];
    
    // Sort elements by their vertical position to process them in order
    // This is crucial because moving an element affects the position of all subsequent elements
    elements.sort((a, b) => {
        const rectA = a.getBoundingClientRect();
        const rectB = b.getBoundingClientRect();
        return rectA.top - rectB.top;
    });

    let currentBreakLine = PAGE_HEIGHT_PX;
    const containerTop = container.getBoundingClientRect().top;

    for (const el of elements) {
        // Force a reflow/re-measure because previous iterations might have moved this element
        const rect = el.getBoundingClientRect();
        const elTop = rect.top - containerTop;
        const elBottom = rect.bottom - containerTop;
        const elHeight = rect.height;

        // If the element is completely before the break line, skip it
        if (elBottom <= currentBreakLine) continue;

        // If the element starts *after* the current break line, we need to find the next break line
        while (elTop >= currentBreakLine) {
            currentBreakLine += PAGE_HEIGHT_PX;
        }

        // Now check if the element *crosses* the current break line
        // Condition: Starts before the line, ends after the line
        if (elTop < currentBreakLine && elBottom > currentBreakLine) {
            
            // Corner case: If the element itself is taller than a page, we can't really avoid cutting it 
            // without complex splitting logic. We just let it be or push it to start at the top of the next page to minimize damage.
            if (elHeight > PAGE_HEIGHT_PX) {
                // If it's already at the top of a page (approx), don't move it
                if (elTop % PAGE_HEIGHT_PX < 50) {
                     continue; 
                }
            }

            // Calculate how much we need to push it down to start on the next page
            const pushAmount = currentBreakLine - elTop;
            
            // Apply spacing
            if (el.tagName === 'TR') {
                // For table rows, we can't use margin. We add padding to cells.
                const cells = Array.from(el.children) as HTMLElement[];
                cells.forEach(cell => {
                    const currentPadding = parseFloat(window.getComputedStyle(cell).paddingTop) || 0;
                    cell.style.paddingTop = `${currentPadding + pushAmount}px`;
                });
            } else {
                // For block elements, margin-top works well
                const currentMargin = parseFloat(window.getComputedStyle(el).marginTop) || 0;
                el.style.marginTop = `${currentMargin + pushAmount}px`;
            }

            // We effectively moved content down. The break line logic still holds for the "page grid",
            // but we've now ensured this specific element starts *after* the break line.
            // We don't update currentBreakLine here; the loop will catch up or the 'while' loop above handles it for next elements.
        }
    }
  };

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

        // Run smart pagination to insert spacers
        autoPaginate(element);

        // 1. Capture the HTML as a high-res canvas using html2canvas
        // scale: 2 ensures the text remains crisp in the PDF (Retina quality)
        const canvas = await html2canvas(element, {
          scale: 2, // 2 is usually enough, 3 can be heavy
          useCORS: true,
          logging: false,
          windowWidth: 794, // Ensure we capture at A4 width context
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
