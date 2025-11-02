import React from 'react';
import { useParams } from 'react-router-dom';
import { PageHeader } from '../components/ui';

const BlogArticlePage: React.FC = () => {
    const { articleSlug } = useParams<{ articleSlug: string }>();
    const articleName = "Jak dbać o baterię w samochodzie elektrycznym?";
    
    const breadcrumbs = [
        { name: 'Blog', path: '/blog' },
        { name: articleName },
    ];
    return (
        <div className="bg-background">
            <PageHeader title={articleName} breadcrumbs={breadcrumbs} />
             <div className="container mx-auto max-w-3xl px-4 md:px-6 pb-16 md:pb-24">
                <article className="prose lg:prose-xl">
                    <p>Treść artykułu na temat dbania o baterię w samochodzie elektrycznym pojawi się tutaj wkrótce. Omówimy kluczowe aspekty, takie jak optymalne poziomy ładowania, wpływ temperatury na żywotność baterii oraz najlepsze praktyki dotyczące szybkiego ładowania.</p>
                </article>
            </div>
        </div>
    );
};

export default BlogArticlePage;
