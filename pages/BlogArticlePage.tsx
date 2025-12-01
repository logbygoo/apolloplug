
import React, { useEffect, useState } from 'react';
import { useParams, Navigate, Link } from 'react-router-dom';
import { PageHeader } from '../components/ui';
import Seo from '../components/Seo';
import { SEO_CONFIG } from '../configs/seoConfig';
import { ARTICLES } from '../configs/blogConfig';
import type { SeoData, BlogPost } from '../types';

const BlogArticlePage: React.FC = () => {
    const { articleSlug } = useParams<{ articleSlug: string }>();
    const [article, setArticle] = useState<BlogPost | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        const fetchArticle = async () => {
            if (!articleSlug) return;
            setLoading(true);
            try {
                const controller = new AbortController();
                const timeoutId = setTimeout(() => controller.abort(), 5000);

                // Use relative path to hit functions/api/articles.ts
                const response = await fetch(`/api/articles?project_id=1&status=Published&slug=${articleSlug}`, {
                    signal: controller.signal
                });
                clearTimeout(timeoutId);
                
                if (!response.ok) {
                    throw new Error('Failed to fetch article');
                }
                
                const data = await response.json();
                
                // The API might return an array with one item or the item itself depending on implementation
                // Our SQL function returns an array of results
                let foundArticle = null;
                if (Array.isArray(data)) {
                    foundArticle = data[0];
                } else if (data.results && Array.isArray(data.results)) {
                    foundArticle = data.results[0];
                } else {
                    foundArticle = data;
                }

                if (foundArticle) {
                    setArticle(foundArticle);
                } else {
                    // Try local fallback if API returns but article not found
                    const localArticle = ARTICLES.find(a => a.slug === articleSlug);
                    if (localArticle) {
                        setArticle(localArticle);
                    } else {
                        setError(true);
                    }
                }
            } catch (err) {
                console.warn("API unavailable or failed, checking local data", err);
                const localArticle = ARTICLES.find(a => a.slug === articleSlug);
                if (localArticle) {
                    setArticle(localArticle);
                } else {
                    setError(true);
                }
            } finally {
                setLoading(false);
            }
        };

        fetchArticle();
    }, [articleSlug]);

    if (loading) {
        return (
            <div className="bg-background min-h-screen pt-20">
                <div className="container mx-auto px-4 text-center">
                    <p className="text-muted-foreground">Ładowanie artykułu...</p>
                </div>
            </div>
        );
    }

    if (error || !article) {
        return <Navigate to="/blog" replace />;
    }
    
    const breadcrumbs = [
        { name: 'Blog', path: '/blog' },
        { name: article.name },
    ];

    const getExcerpt = (htmlContent: string) => {
        const tempDiv = document.createElement("div");
        tempDiv.innerHTML = htmlContent;
        const text = tempDiv.textContent || tempDiv.innerText || "";
        return text.length > 160 ? text.substring(0, 160) + "..." : text;
    };

    const mainImageUrl = article.thumbnailUrl || `https://article.ffgroup.pl/1/${article.slug}-mini.jpg`;
    const ogImageUrl = article.thumbnailUrl || `https://article.ffgroup.pl/1/${article.slug}.jpg`; 

    const seoData: SeoData = {
      title: article.name,
      description: getExcerpt(article.content),
      ogTitle: article.name,
      ogDescription: getExcerpt(article.content),
      ogImage: ogImageUrl,
      ogType: 'article',
    };

    return (
        <div className="bg-background">
            <Seo {...seoData} />
            <PageHeader 
                title={article.name} 
                breadcrumbs={breadcrumbs} 
            />
             <div className="container mx-auto max-w-3xl px-4 md:px-6 pb-16 md:pb-24">
                <div className="mb-8 text-muted-foreground flex justify-between items-center">
                    <span>Opublikowano: {new Date(article.date_published).toLocaleDateString('pl-PL', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                    <Link to="/blog" className="text-primary hover:underline text-sm">← Wróć do listy</Link>
                </div>
                
                <div className="mb-10 rounded-xl overflow-hidden shadow-sm">
                    <img 
                        src={mainImageUrl} 
                        alt={article.name}
                        className="w-full h-auto object-cover max-h-[500px]"
                        onError={(e) => {
                            (e.target as HTMLImageElement).src = ogImageUrl;
                        }}
                    />
                </div>

                <article 
                    className="prose prose-zinc max-w-none lg:prose-lg"
                    dangerouslySetInnerHTML={{ __html: article.content }}
                />
            </div>
        </div>
    );
};

export default BlogArticlePage;
