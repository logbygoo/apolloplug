
import React, { useEffect, useState } from 'react';
import { PageHeader, Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '../components/ui';
import { Link } from 'react-router-dom';
import Seo from '../components/Seo';
import { SEO_CONFIG } from '../configs/seoConfig';
import { ARTICLES } from '../configs/blogConfig';
import type { BlogPost } from '../types';

const BlogPage: React.FC = () => {
    const breadcrumbs = [{ name: 'Blog' }];
    const [articles, setArticles] = useState<BlogPost[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchArticles = async () => {
            try {
                // Fetching from Cloudflare Pages Function
                const controller = new AbortController();
                const timeoutId = setTimeout(() => controller.abort(), 5000);

                // Use relative path to hit functions/api/articles.ts
                const response = await fetch('/api/articles?project_id=1&status=published', {
                    signal: controller.signal
                });
                clearTimeout(timeoutId);

                if (!response.ok) {
                    throw new Error('Failed to fetch articles');
                }
                const data = await response.json();
                
                const articlesData = Array.isArray(data) ? data : (data.results || []);
                
                // Sort by date_published descending (already handled by SQL but good to be safe)
                const sortedArticles = articlesData.sort((a: BlogPost, b: BlogPost) => 
                    new Date(b.date_published).getTime() - new Date(a.date_published).getTime()
                );

                setArticles(sortedArticles);
            } catch (err) {
                console.warn("API unavailable, loading mock data:", err);
                setArticles(ARTICLES);
            } finally {
                setLoading(false);
            }
        };

        fetchArticles();
    }, []);

    const getExcerpt = (htmlContent: string) => {
        const tempDiv = document.createElement("div");
        tempDiv.innerHTML = htmlContent;
        const text = tempDiv.textContent || tempDiv.innerText || "";
        return text.length > 150 ? text.substring(0, 150) + "..." : text;
    };

    return (
        <div className="bg-background">
            <Seo {...SEO_CONFIG['/blog']} />
            <PageHeader title="Blog" subtitle="Nowości, porady i artykuły ze świata elektromobilności." breadcrumbs={breadcrumbs} />
            <div className="container mx-auto max-w-4xl px-4 md:px-6 pb-16 md:pb-24">
                {loading ? (
                    <div className="text-center py-16">
                        <p className="text-muted-foreground">Ładowanie artykułów...</p>
                    </div>
                ) : articles.length > 0 ? (
                    <div className="grid gap-8 md:grid-cols-1">
                        {articles.map(article => (
                            <Link key={article.id} to={`/${article.slug}`} className="group block">
                                <Card className="flex flex-col md:flex-row overflow-hidden transition-shadow hover:shadow-lg">
                                    <div className="md:w-1/3 relative overflow-hidden">
                                        <img 
                                            src={article.thumbnailUrl || `https://article.ffgroup.pl/1/${article.slug}-mini.jpg`} 
                                            alt={article.name} 
                                            className="object-cover w-full h-48 md:h-full transition-transform duration-300 group-hover:scale-105"
                                            onError={(e) => {
                                                (e.target as HTMLImageElement).src = 'https://img.apolloplug.com/og/default.jpg';
                                            }}
                                        />
                                    </div>
                                    <div className="md:w-2/3 flex flex-col">
                                        <CardHeader>
                                            <CardTitle className="group-hover:text-primary transition-colors">{article.name}</CardTitle>
                                            <CardDescription>{new Date(article.date_published).toLocaleDateString('pl-PL', { year: 'numeric', month: 'long', day: 'numeric' })}</CardDescription>
                                        </CardHeader>
                                        <CardContent className="flex-grow">
                                            <p className="text-muted-foreground">{getExcerpt(article.content)}</p>
                                        </CardContent>
                                        <CardFooter>
                                            <span className="text-sm font-semibold text-primary">Czytaj więcej →</span>
                                        </CardFooter>
                                    </div>
                                </Card>
                            </Link>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-16">
                        <p className="text-muted-foreground">Brak artykułów do wyświetlenia. Zajrzyj ponownie wkrótce!</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default BlogPage;
