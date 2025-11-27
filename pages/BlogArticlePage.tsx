import React from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { PageHeader } from '../components/ui';
import { ARTICLES } from '../configs/blogConfig';
import Seo from '../components/Seo';
import { SEO_CONFIG } from '../configs/seoConfig';
import type { SeoData } from '../types';

const BlogArticlePage: React.FC = () => {
    const { articleSlug } = useParams<{ articleSlug: string }>();
    const article = ARTICLES.find(a => a.slug === articleSlug);

    if (!article) {
        return <Navigate to="/blog" replace />;
    }
    
    const breadcrumbs = [
        { name: 'Blog', path: '/blog' },
        { name: article.title },
    ];

    const seoData: SeoData = {
      ...SEO_CONFIG['/blog/:articleSlug'],
      title: article.title,
      description: article.excerpt,
      ogTitle: article.title,
      ogDescription: article.excerpt,
      ogImage: article.thumbnailUrl,
    };

    return (
        <div className="bg-background">
            <Seo {...seoData} />
            <PageHeader 
                title={article.title} 
                breadcrumbs={breadcrumbs} 
            />
             <div className="container mx-auto max-w-3xl px-4 md:px-6 pb-16 md:pb-24">
                <div className="mb-8 text-muted-foreground">
                    Opublikowano: {new Date(article.publishDate).toLocaleDateString('pl-PL', { year: 'numeric', month: 'long', day: 'numeric' })}
                </div>
                <article 
                    className="prose"
                    dangerouslySetInnerHTML={{ __html: article.content }}
                />
            </div>
        </div>
    );
};

export default BlogArticlePage;