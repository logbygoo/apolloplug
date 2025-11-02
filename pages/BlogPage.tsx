import React from 'react';
import { PageHeader } from '../components/ui';
import { Link } from 'react-router-dom';

const BlogPage: React.FC = () => {
    const breadcrumbs = [{ name: 'Blog' }];
    return (
        <div className="bg-background">
            <PageHeader title="Blog" subtitle="Nowości, porady i artykuły ze świata elektromobilności." breadcrumbs={breadcrumbs} />
            <div className="container mx-auto max-w-4xl px-4 md:px-6 py-16 text-center">
                <p className="text-muted-foreground">Brak artykułów do wyświetlenia. Zajrzyj ponownie wkrótce!</p>
                <div className="mt-8">
                    <h3 className="text-lg font-semibold mb-2">Przykładowy artykuł:</h3>
                    <Link to="/blog/jak-dbac-o-baterie" className="text-primary hover:underline">
                        Jak dbać o baterię w samochodzie elektrycznym?
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default BlogPage;
