import React, { useState, useEffect, useCallback } from 'react';
import { PageHeader, Button } from '../components/ui';
import Seo from '../components/Seo';
import { useNavigate } from 'react-router-dom';

// Klarna API credentials (provided by user)
// WARNING: Storing API credentials on the client-side is extremely insecure and should NEVER be done in a production environment.
// This is done here only to fulfill the request as a demonstration, as there is no backend provided.
// A proper implementation requires a backend server to securely handle API keys and session creation.
const KLARNA_UID = 'klarna_live_client_VFY3TFIjPy92Tkk5bClnUyhXUjYyNThMQXdJOVBZJDMsYTQwYjg1NWQtODIxNi00ODUxLTlhOWYtYzA3YWNmMDI1MGUzLDEsWm9HWWZibjFqMGNYdmVkVTFTbjJPcmhEMTQ2NG95cW8zL1ZueGRSek5lYz0';
// The user did not provide a password/secret. A placeholder is used.
// The payment flow WILL NOT WORK without the correct password.
const KLARNA_PASSWORD = 'ztkL61A2dO7S3v47W5U957oq9tC1oX';

// Klarna needs to be loaded from a script tag.
// We declare it here to satisfy TypeScript.
// FIX: Moved `declare` statement to the module scope to resolve the "Modifiers cannot appear here" error.
declare const Klarna: any;

const KlarnaPage: React.FC = () => {
    const [clientToken, setClientToken] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const navigate = useNavigate();

    const createKlarnaSession = useCallback(async () => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await fetch('https://api.klarna.com/payments/v1/sessions', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Basic ' + btoa(`${KLARNA_UID}:${KLARNA_PASSWORD}`)
                },
                body: JSON.stringify({
                    purchase_country: 'PL',
                    purchase_currency: 'PLN',
                    locale: 'pl-PL',
                    order_amount: 100, // 1 PLN
                    order_tax_amount: 0,
                    order_lines: [{
                        name: 'Testowa transakcja',
                        quantity: 1,
                        unit_price: 100,
                        total_amount: 100,
                        tax_rate: 0,
                        total_tax_amount: 0,
                    }],
                    merchant_urls: {
                        confirmation: `${window.location.origin}${window.location.pathname}#/klarna-success`
                    }
                })
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error_message || `Błąd serwera Klarna: ${response.status}`);
            }

            const data = await response.json();
            setClientToken(data.client_token);

        } catch (err: any) {
            console.error("Błąd tworzenia sesji Klarna:", err);
            setError(`Nie udało się zainicjować płatności Klarna. Powód: ${err.message}. Sprawdź, czy dane logowania API są poprawne i zastąp placeholder hasła w kodzie.`);
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        // Load Klarna script
        const scriptId = 'klarna-payments-sdk';
        if (document.getElementById(scriptId)) {
            if (typeof Klarna !== 'undefined') {
                 createKlarnaSession();
            }
            return;
        }

        const script = document.createElement('script');
        script.id = scriptId;
        script.src = 'https://x.klarnacdn.net/kp/lib/v1/api.js';
        script.async = true;
        script.onload = () => {
            createKlarnaSession();
        };
        document.body.appendChild(script);

        return () => {
            const scriptElement = document.getElementById(scriptId);
            if (scriptElement) {
                // Do not remove script on unmount as it might be needed again
                // and to avoid issues with multiple loads.
            }
        }
    }, [createKlarnaSession]);

    useEffect(() => {
        if (clientToken && typeof Klarna !== 'undefined') {
            Klarna.Payments.init({
                client_token: clientToken
            });
            Klarna.Payments.load({
                container: '#klarna-container'
            }, (res: any) => {
                console.log("Klarna widget loaded:", res);
            });
        }
    }, [clientToken]);
    
    const handlePayment = () => {
        if (typeof Klarna === 'undefined') {
            setError("Biblioteka Klarna nie jest załadowana.");
            return;
        }

        Klarna.Payments.authorize({}, (res: any) => {
            console.log("Authorization response:", res);
            if (res.approved) {
                // In a real application, this authorization_token should be sent to your server
                // to create an order with Klarna.
                console.log("Authorization Token:", res.authorization_token);
                navigate('/klarna-success', { state: { token: res.authorization_token } });
            } else {
                 if (res.error) {
                    setError(`Autoryzacja płatności nie powiodła się: ${res.error.message}`);
                } else {
                    setError("Autoryzacja płatności nie powiodła się.");
                }
            }
        });
    };

    const breadcrumbs = [{ name: 'Klarna' }];

    return (
        <div className="bg-background">
            <Seo
                title="Płatność Klarna"
                description="Dokonaj bezpiecznej płatności za pomocą Klarna."
            />
            <PageHeader
                title="Finalizacja płatności Klarna"
                subtitle="Wybierz preferowaną metodę płatności poniżej, aby sfinalizować transakcję."
                breadcrumbs={breadcrumbs}
            />
            <div className="container mx-auto max-w-xl px-4 md:px-6 pb-16 md:pb-24">
                {isLoading && <div className="text-center"><p>Ładowanie metod płatności...</p></div>}
                {error && <div className="text-center p-4 bg-destructive/10 text-destructive border border-destructive/20 rounded-md"><p>{error}</p></div>}
                
                <div id="klarna-container" className="min-h-[200px]"></div>

                {clientToken && !error && (
                    <div className="mt-8">
                        <div className="flex justify-between items-center bg-secondary p-4 rounded-lg">
                            <span className="font-medium">Do zapłaty:</span>
                            <span className="text-2xl font-bold">1,00 zł</span>
                        </div>
                        <Button onClick={handlePayment} size="lg" className="w-full mt-6">
                            Zapłać 1,00 zł
                        </Button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default KlarnaPage;
