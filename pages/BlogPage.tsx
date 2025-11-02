import React from 'react';
import { PageHeader, Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '../components/ui';
import { Link } from 'react-router-dom';
import { ARTICLES } from '../configs/blogConfig';

const BlogPage: React.FC = () => {
    const breadcrumbs = [{ name: 'Blog' }];
    return (
        <div className="bg-background">
            <PageHeader title="Blog" subtitle="Nowości, porady i artykuły ze świata elektromobilności." breadcrumbs={breadcrumbs} />
            <div className="container mx-auto max-w-4xl px-4 md:px-6 pb-16 md:pb-24">
                {ARTICLES.length > 0 ? (
                    <div className="grid gap-8 md:grid-cols-1">
                        {ARTICLES.sort((a, b) => new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime()).map(article => (
                            <Link key={article.slug} to={`/blog/${article.slug}`} className="group block">
                                <Card className="flex flex-col md:flex-row overflow-hidden transition-shadow hover:shadow-lg">
                                    <div className="md:w-1/3">
                                        <img src={article.thumbnailUrl} alt={article.title} className="object-cover w-full h-48 md:h-full" />
                                    </div>
                                    <div className="md:w-2/3 flex flex-col">
                                        <CardHeader>
                                            <CardTitle className="group-hover:text-primary transition-colors">{article.title}</CardTitle>
                                            <CardDescription>{new Date(article.publishDate).toLocaleDateString('pl-PL', { year: 'numeric', month: 'long', day: 'numeric' })}</CardDescription>
                                        </CardHeader>
                                        <CardContent className="flex-grow">
                                            <p className="text-muted-foreground">{article.excerpt}</p>
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
