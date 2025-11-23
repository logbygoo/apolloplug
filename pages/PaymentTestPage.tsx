import React, { useState, useEffect, useCallback } from 'react';
import { Button, Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle, Input, Label, PageHeader } from '../components/ui';
import Seo from '../components/Seo';
import { createVivaPaymentOrder } from '../api/vivaApi';
import { CreditCardIcon, InformationCircleIcon } from '../components/HeroIcons';
import { VIVA_SMART_CHECKOUT_CLIENT_ID } from '../configs/vivaConfig';

const LoadingSpinner: React.FC = () => (
    <div className="flex justify-center items-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-foreground"></div>
    </div>
);

const PaymentTestPage: React.FC = () => {
    const [orderCode, setOrderCode] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [paymentStatus, setPaymentStatus] = useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isPreAuth, setIsPreAuth] = useState(false);
    const [createRecurring, setCreateRecurring] = useState(false);

    const fetchOrderCode = useCallback(async () => {
        setLoading(true);
        setError(null);
        setOrderCode(null);
        try {
            const response = await createVivaPaymentOrder(100, isPreAuth, createRecurring); // 100 groszy = 1 PLN
            if (response.error) {
                throw new Error(response.error);
            }
            setOrderCode(response.orderCode);
        } catch (err) {
            console.error("Failed to create payment order:", err);
            const errorMessage = err instanceof Error ? err.message : "Nieznany błąd";
            setError(`Błąd: Nie udało się utworzyć zlecenia płatności. (${errorMessage})`);
        } finally {
            setLoading(false);
        }
    }, [isPreAuth, createRecurring]);

    useEffect(() => {
        fetchOrderCode();
    }, [fetchOrderCode]);

    const handlePaymentSubmit = async (method: string) => {
        setIsSubmitting(true);
        setPaymentStatus(`Przetwarzanie płatności (${method})...`);
        await new Promise(resolve => setTimeout(resolve, 2000)); // Simulate API call to complete payment
        setIsSubmitting(false);
        setPaymentStatus(`Sukces! Płatność (${method}) na kwotę 1,00 PLN została przetworzona pomyślnie. Order Code: ${orderCode}`);
    };

    const smartCheckoutUrl = `https://demo.vivapayments.com/web/checkout?ref=${orderCode}&clientid=${VIVA_SMART_CHECKOUT_CLIENT_ID}`;
    
    const breadcrumbs = [{ name: 'Payment Test' }];

    return (
        <div className="bg-background">
            <Seo
                title="Test Płatności Viva.com"
                description="Strona testowa do demonstracji możliwości API płatności Viva.com."
            />
            <PageHeader
                title="Test Płatności Viva.com"
                subtitle="Demonstracja różnych metod i przepływów płatności dostępnych w API Viva.com."
                breadcrumbs={breadcrumbs}
            />

            <div className="container mx-auto max-w-4xl px-4 md:px-6 pb-16 md:pb-24">
                 <Card className="mb-8 bg-yellow-50 border-yellow-300">
                    <CardHeader className="flex flex-row items-start gap-4">
                        <InformationCircleIcon className="w-8 h-8 text-yellow-600 mt-1" />
                        <div>
                            <CardTitle className="text-yellow-800">Ważna informacja o architekturze</CardTitle>
                            <CardDescription className="text-yellow-700">
                                API Viva.com do tworzenia płatności jest zabezpieczone i blokuje bezpośrednie zapytania z przeglądarki (błąd CORS). Jest to standardowa praktyka bezpieczeństwa. W prawdziwej aplikacji, wywołanie API musi odbywać się na Twoim serwerze (backend).
                                <br/><strong>Ta strona symuluje wywołanie backendu, generując testowy kod płatności, aby umożliwić pełne przetestowanie interfejsu użytkownika.</strong>
                            </CardDescription>
                        </div>
                    </CardHeader>
                </Card>

                {error && (
                     <Card className="mb-8 bg-red-50 border-red-300">
                        <CardHeader>
                            <CardTitle className="text-red-800">Wystąpił Błąd</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-red-700">{error}</p>
                            <Button onClick={fetchOrderCode} variant="destructive" className="mt-4">Spróbuj ponownie</Button>
                        </CardContent>
                    </Card>
                )}

                {loading ? (
                    <LoadingSpinner />
                ) : (
                    <div className="space-y-8">
                        {paymentStatus && (
                            <Card className="bg-green-50 border-green-300">
                                <CardHeader>
                                    <CardTitle className="text-green-800">Status Płatności</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-green-700">{paymentStatus}</p>
                                </CardContent>
                            </Card>
                        )}

                        <Card>
                            <CardHeader>
                                <CardTitle>Zaawansowane Scenariusze</CardTitle>
                                <CardDescription>Zaznacz, aby utworzyć nowe zlecenie płatności z odpowiednimi flagami.</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <label className="flex items-center gap-3 cursor-pointer">
                                    <input type="checkbox" checked={isPreAuth} onChange={e => setIsPreAuth(e.target.checked)} className="h-4 w-4 accent-foreground" />
                                    <span>Preautoryzacja (autoryzuj teraz, obciąż później)</span>
                                </label>
                                <label className="flex items-center gap-3 cursor-pointer">
                                    <input type="checkbox" checked={createRecurring} onChange={e => setCreateRecurring(e.target.checked)} className="h-4 w-4 accent-foreground" />
                                    <span>Płatność cykliczna (zapisz metodę płatności dla subskrypcji)</span>
                                </label>
                            </CardContent>
                        </Card>
                        
                        <Card>
                            <CardHeader>
                                <CardTitle>1. Viva.com Smart Checkout</CardTitle>
                                <CardDescription>Najprostsza integracja. Przekierowuje użytkownika na stronę płatności Viva.com, gdzie dostępne są wszystkie metody (w tym Klarna, BLIK, etc.).</CardDescription>
                            </CardHeader>
                            <CardFooter>
                                <a href={smartCheckoutUrl} target="_blank" rel="noopener noreferrer" className="w-full" onClick={(e) => { if(isSubmitting || !orderCode) e.preventDefault()}} aria-disabled={isSubmitting || !orderCode}>
                                    <Button disabled={isSubmitting || !orderCode} className="w-full">
                                        Przejdź do Smart Checkout (1,00 PLN)
                                    </Button>
                                </a>
                            </CardFooter>
                        </Card>

                        <Card>
                             <CardHeader>
                                <CardTitle>2. Płatność kartą (Integracja natywna)</CardTitle>
                                <CardDescription>Formularz karty płatniczej osadzony bezpośrednio na Twojej stronie. Wymaga integracji z Viva Card Component (JS SDK).</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div>
                                    <Label htmlFor="cardNumber">Numer karty</Label>
                                    <div className="relative">
                                        <Input id="cardNumber" placeholder="0000 0000 0000 0000" disabled={isSubmitting} />
                                        <CreditCardIcon className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <Label htmlFor="cardExpiry">Data ważności (MM/RR)</Label>
                                        <Input id="cardExpiry" placeholder="MM/RR" disabled={isSubmitting} />
                                    </div>
                                    <div>
                                        <Label htmlFor="cardCVC">Kod CVC</Label>
                                        <Input id="cardCVC" placeholder="123" disabled={isSubmitting} />
                                    </div>
                                </div>
                            </CardContent>
                            <CardFooter>
                                <Button onClick={() => handlePaymentSubmit('Karta')} disabled={isSubmitting || !orderCode} className="w-full">
                                    {isSubmitting ? 'Przetwarzanie...' : 'Zapłać kartą 1,00 PLN'}
                                </Button>
                            </CardFooter>
                        </Card>
                        
                        <Card>
                            <CardHeader>
                                <CardTitle>3. Portfele Cyfrowe</CardTitle>
                                <CardDescription>Przyciski Apple Pay i Google Pay renderowane na stronie. Wymagają odpowiedniej konfiguracji i integracji z JS SDK Viva.com.</CardDescription>
                            </CardHeader>
                            <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <Button variant="primary" className="h-12 bg-black text-white hover:bg-gray-800" onClick={() => handlePaymentSubmit('Apple Pay')} disabled={isSubmitting || !orderCode}>
                                    <span className="font-semibold text-2xl mr-1"></span> Pay
                                </Button>
                                <Button variant="secondary" className="h-12 bg-white text-black border border-input hover:bg-gray-200 flex items-center justify-center" onClick={() => handlePaymentSubmit('Google Pay')} disabled={isSubmitting || !orderCode}>
                                    <img src="https://img.apolloplug.com/img/pay-google.svg" alt="Google Pay" className="h-6" />
                                </Button>
                            </CardContent>
                        </Card>
                        
                        <Card>
                            <CardHeader>
                                <CardTitle>4. Lokalne Metody Płatności (BLIK)</CardTitle>
                                <CardDescription>Integracja z BLIK bezpośrednio na stronie. Dostępne również przez Smart Checkout.</CardDescription>
                            </CardHeader>
                            <CardContent>
                                 <div>
                                    <Label htmlFor="blikCode">Kod BLIK</Label>
                                    <Input id="blikCode" placeholder="000 000" maxLength={6} disabled={isSubmitting} className="tracking-[.5em] text-center font-semibold text-lg" />
                                </div>
                            </CardContent>
                            <CardFooter>
                                <Button onClick={() => handlePaymentSubmit('BLIK')} disabled={isSubmitting || !orderCode} className="w-full">
                                    {isSubmitting ? 'Przetwarzanie...' : 'Zapłać BLIKIEM 1,00 PLN'}
                                </Button>
                            </CardFooter>
                        </Card>

                    </div>
                )}
            </div>
        </div>
    );
};

export default PaymentTestPage;
