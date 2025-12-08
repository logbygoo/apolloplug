
import React from 'react';
import { useParams } from 'react-router-dom';
import { DOCUMENTS_DATA } from '../configs/documentsConfig';
import { ApolloPlugLogo } from '../constants';

const PdfViewerPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const documentData = DOCUMENTS_DATA.find(doc => doc.slug === slug);

  if (!documentData) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <p className="text-muted-foreground">Dokument nie został znaleziony.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#525659] p-0 md:p-8 flex justify-center overflow-auto">
      {/* Paper Container (A4-ish proportions) */}
      <div className="bg-white w-full max-w-[210mm] min-h-[297mm] p-[20mm] shadow-2xl mx-auto box-border text-black">
        
        {/* Document Header */}
        <div className="border-b-2 border-black pb-6 mb-8 flex justify-between items-end">
            <div>
                 <div className="scale-75 origin-bottom-left text-black">
                     <ApolloPlugLogo />
                 </div>
            </div>
            <div className="text-right text-xs text-gray-500">
                <p>apolloplug.com</p>
                <p>forfinance sp. z o.o.</p>
                <p>Warszawa, Grzybowska 87</p>
            </div>
        </div>

        {/* Content */}
        <article className="prose prose-sm max-w-none font-serif text-justify prose-headings:font-sans prose-headings:font-bold prose-h1:text-2xl prose-h1:text-center prose-h1:mb-8 prose-h2:text-lg prose-h2:mt-6 prose-h2:mb-2 prose-p:my-3 prose-li:my-1">
            {documentData.content}
        </article>

        {/* Footer */}
        <div className="mt-20 pt-4 border-t border-gray-200 text-center text-[10px] text-gray-400 font-sans">
            Dokument wygenerowany elektronicznie ze strony apolloplug.com w dniu {new Date().toLocaleDateString('pl-PL')}
        </div>
      </div>
    </div>
  );
};

export default PdfViewerPage;
