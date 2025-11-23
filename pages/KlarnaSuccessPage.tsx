import React from 'react';
import { PageHeader, Button } from '../components/ui';
import { Link, useLocation } from 'react-router-dom';
import Seo from '../components/Seo';

const KlarnaSuccessPage: React.FC = () => {
    const location = useLocation();
    const token = location.state?.token;

    const breadcrumbs = [{ name: 'Klarna', path: '/klarna' }, { name: 'Sukces' }];
    return (
        <div className="bg-background">
            <Seo
                title="Płatność zakończona sukcesem"
                description="Twoja płatność Klarna została pomyślnie przetworzona."
            />
            <PageHeader
                title="Płatność zakończona pomyślnie"
                subtitle="Dziękujemy za dokonanie płatności."
                breadcrumbs={breadcrumbs}
            />
            <div className="container mx-auto max-w-2xl text-center px-4 md:px-6 pb-16 md:pb-24">
                <p className="text-lg text-muted-foreground mb-6">
                    Twoja transakcja została autoryzowana. W prawdziwej aplikacji, w tym momencie serwer sfinalizowałby zamówienie.
                </p>
                {token && (
                    <div className="bg-secondary p-4 rounded-lg text-left mb-8">
                        <p className="font-semibold">Token autoryzacyjny (do wysłania na serwer):</p>
                        <code className="block break-all bg-muted p-2 rounded mt-2 text-sm">{token}</code>
                    </div>
                )}
                <Link to="/">
                    <Button>Wróć na stronę główną</Button>
                </Link>
            </div>
        </div>
    );
};

export default KlarnaSuccessPage;
