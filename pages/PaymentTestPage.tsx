import React, { useState, useEffect } from 'react';
import { Button, Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle, Input, Label, PageHeader } from '../components/ui';
import Seo from '../components/Seo';
import { createVivaPaymentOrder } from '../api/vivaApi';
import { CheckIcon, CreditCardIcon } from '../components/HeroIcons';

const LoadingSpinner: React.FC = () => (
    <div className="flex justify-center items-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-foreground"></div>
    </div>
);

const PaymentTestPage: React.FC = () => {
    const [orderCode, setOrderCode] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);
    const [paymentStatus, setPaymentStatus] = useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isPreAuth, setIsPreAuth] = useState(false);
    const [createRecurring, setCreateRecurring] = useState(false);

    useEffect(() => {
        const fetchOrderCode = async () => {
            setLoading(true);
            try {
                const response = await createVivaPaymentOrder(100, isPreAuth, createRecurring); // 100 groszy = 1 PLN
                setOrderCode(response.orderCode);
            } catch (error) {
                console.error("Failed to create payment order:", error);
                setPaymentStatus("Błąd: Nie udało się utworzyć zlecenia płatności.");
            } finally {
                setLoading(false);
            }
        };
        fetchOrderCode();
    }, [isPreAuth, createRecurring]);

    const handlePaymentSubmit = async (method: string) => {
        setIsSubmitting(true);
        setPaymentStatus(`Przetwarzanie płatności (${method})...`);
        await new Promise(resolve => setTimeout(resolve, 2000)); // Simulate API call
        setIsSubmitting(false);
        setPaymentStatus(`Sukces! Płatność (${method}) na kwotę 1,00 PLN została przetworzona pomyślnie. Order Code: ${orderCode}`);
    };

    const VIVA_SMART_CHECKOUT_CLIENT_ID = 'u1871qke3ewed649fuzlwn6yjtw1fw577auxv9hayttr1.apps.vivapayments.com';
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
                {loading ? (
                    <LoadingSpinner />
                ) : (
                    <div className="space-y-8">
                        {/* Status Box */}
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

                        {/* Advanced Flows */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Zaawansowane Scenariusze</CardTitle>
                                <CardDescription>Zaznacz, aby utworzyć zlecenie płatności z odpowiednimi flagami.</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <label className="flex items-center gap-3 cursor-pointer">
                                    <input type="checkbox" checked={isPreAuth} onChange={e => setIsPreAuth(e.target.checked)} className="h-4 w-4" />
                                    <span>Preautoryzacja (autoryzuj teraz, obciąż później)</span>
                                </label>
                                <label className="flex items-center gap-3 cursor-pointer">
                                    <input type="checkbox" checked={createRecurring} onChange={e => setCreateRecurring(e.target.checked)} className="h-4 w-4" />
                                    <span>Płatność cykliczna (zapisz metodę płatności dla subskrypcji)</span>
                                </label>
                            </CardContent>
                        </Card>
                        
                        {/* Smart Checkout */}
                        <Card>
                            <CardHeader>
                                <CardTitle>1. Viva.com Smart Checkout</CardTitle>
                                <CardDescription>Najprostsza integracja. Przekierowuje użytkownika na stronę płatności Viva.com, gdzie dostępne są wszystkie metody (w tym Klarna).</CardDescription>
                            </CardHeader>
                            <CardFooter>
                                {/* FIX: The 'as' prop is not supported by the Button component. 
                                    Replaced with a standard anchor tag wrapping the Button, and added logic to disable the link functionally when needed. */}
                                <a href={smartCheckoutUrl} target="_blank" rel="noopener noreferrer" className="w-full" onClick={(e) => { if(isSubmitting || !orderCode) e.preventDefault()}} aria-disabled={isSubmitting || !orderCode}>
                                    <Button disabled={isSubmitting || !orderCode} className="w-full">
                                        Przejdź do Smart Checkout (1,00 PLN)
                                    </Button>
                                </a>
                            </CardFooter>
                        </Card>

                        {/* Native Card Payment */}
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
                        
                        {/* Digital Wallets */}
                        <Card>
                            <CardHeader>
                                <CardTitle>3. Portfele Cyfrowe</CardTitle>
                                <CardDescription>Przyciski Apple Pay i Google Pay renderowane na stronie. Wymagają odpowiedniej konfiguracji i integracji z JS SDK Viva.com.</CardDescription>
                            </CardHeader>
                            <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <Button variant="primary" className="h-12 bg-black text-white hover:bg-gray-800" onClick={() => handlePaymentSubmit('Apple Pay')} disabled={isSubmitting || !orderCode}>
                                    <span className="font-semibold"></span> Pay
                                </Button>
                                <Button variant="secondary" className="h-12 bg-white text-black border-black hover:bg-gray-200" onClick={() => handlePaymentSubmit('Google Pay')} disabled={isSubmitting || !orderCode}>
                                    <img src="https://img.apolloplug.com/img/pay-google.svg" alt="Google Pay" className="h-6" />
                                </Button>
                            </CardContent>
                        </Card>
                        
                        {/* Local Methods */}
                        <Card>
                            <CardHeader>
                                <CardTitle>4. Lokalne Metody Płatności (BLIK)</CardTitle>
                                <CardDescription>Integracja z BLIK bezpośrednio na stronie.</CardDescription>
                            </CardHeader>
                            <CardContent>
                                 <div>
                                    <Label htmlFor="blikCode">Kod BLIK</Label>
                                    <Input id="blikCode" placeholder="000 000" maxLength={6} disabled={isSubmitting} className="tracking-[.5em] text-center font-semibold" />
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