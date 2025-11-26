import React, { useState } from 'react';
import { PageHeader } from '../components/ui';
import Seo from '../components/Seo';

const docs = [
  { title: 'Regulamin apolloplug', url: '/docs/regulamin-apolloplug.pdf' },
  { title: 'Polityka prywatności', url: '/docs/polityka-prywatnosci.pdf' },
  { title: 'Regulamin wypożyczalni', url: '/docs/regulamin-wypozyczalni.pdf' },
  { title: 'Regulamin przewozów', url: '/docs/regulamin-przewozow.pdf' },
  { title: 'Przykładowe dokumenty', url: '/docs/wzor-umowy.pdf' },
];

const DocumentationPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState(0);
  const activeDoc = docs[activeTab];

  const breadcrumbs = [{ name: 'Dokumentacja' }];

  return (
    <div className="bg-background text-foreground">
      <Seo
        title="Dokumentacja"
        description="Zapoznaj się z regulaminami, polityką prywatności i innymi ważnymi dokumentami dotyczącymi usług ApolloPlug."
      />
      <PageHeader
        title="Dokumentacja"
        subtitle="Wszystkie niezbędne dokumenty w jednym miejscu."
        breadcrumbs={breadcrumbs}
      />
      <div className="container mx-auto max-w-6xl px-4 md:px-6 pb-16 md:pb-24">
        <div className="flex flex-col lg:flex-row gap-8">
          <aside className="lg:w-1/4">
            <nav className="flex flex-row lg:flex-col overflow-x-auto lg:overflow-visible no-scrollbar -mx-4 px-4 lg:mx-0 lg:px-0">
              {docs.map((doc, index) => (
                <button
                  key={index}
                  onClick={() => setActiveTab(index)}
                  className={`text-left w-full lg:w-auto flex-shrink-0 p-3 lg:px-4 lg:py-3 rounded-md text-sm font-medium transition-colors ${
                    activeTab === index
                      ? 'bg-secondary text-foreground'
                      : 'text-muted-foreground hover:bg-secondary/50 hover:text-foreground'
                  }`}
                >
                  {doc.title}
                </button>
              ))}
            </nav>
          </aside>
          <main className="lg:w-3/4">
            <div className="border border-border rounded-lg overflow-hidden h-[80vh] bg-secondary">
              <iframe
                key={activeDoc.url} // Change key to force re-render
                src={activeDoc.url}
                title={activeDoc.title}
                className="w-full h-full"
                frameBorder="0"
              />
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default DocumentationPage;