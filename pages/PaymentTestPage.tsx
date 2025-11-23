import React, { useState, useCallback } from 'react';
import { Button, Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle, Input, Label, PageHeader } from '../components/ui';
import Seo from '../components/Seo';
import { createVivaPaymentOrder } from '../api/vivaApi';
import { CreditCardIcon } from '../components/HeroIcons';
import { VIVA_SMART_CHECKOUT_CLIENT_ID, VIVA_SMART_CHECKOUT_URL } from '../configs/vivaConfig';

const LoadingSpinner: React.FC = () => (
    <div className="flex justify-center items-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-foreground"></div>
    </div>
);

const Checkbox: React.FC<{ id: string; label: string; checked: boolean; onChange: (checked: boolean) => void; }> = ({ id, label, checked, onChange }) => (
    <label htmlFor={id} className="flex items-center space-x-2 cursor-pointer">
        <input
            id={id}
            type="checkbox"
            checked={checked}
            onChange={(e) => onChange(e.target.checked)}
            className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
        />
        <span className="text-sm font-medium text-gray-700">{label}</span>
    </label>
);

const PaymentTestPage: React.FC = () => {
    const [orderCode, setOrderCode] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [paymentStatus, setPaymentStatus] = useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isPreAuth, setIsPreAuth] = useState(false);
    const [createRecurring, setCreateRecurring] = useState(false);

    const handleGenerateCode = useCallback(async () => {
        setLoading(true);
        setError(null);
        setOrderCode(null);
        setPaymentStatus(null);
        try {
            const response = await createVivaPaymentOrder({
                amount: 100, // 1.00 PLN
                isPreAuth,
                createRecurring
            });
            
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

    const handlePaymentSubmit = async (method: string) => {
        setIsSubmitting(true);
        setPaymentStatus(`Przetwarzanie płatności (${method})...`);
        // W prawdziwej aplikacji, tutaj nastąpiłaby integracja z JS SDK Viva do obsługi płatności
        await new Promise(resolve => setTimeout(resolve, 2000));
        setIsSubmitting(false);
        setPaymentStatus(`Sukces! Płatność (${method}) na kwotę 1,00 PLN została zainicjowana. Order Code: ${orderCode}`);
    };

    const smartCheckoutUrl = orderCode ? `${VIVA_SMART_CHECKOUT_URL}?ref=${orderCode}&clientid=${VIVA_SMART_CHECKOUT_CLIENT_ID}` : '#';
    
    const breadcrumbs = [{ name: 'Payment Test' }];

    return (
        <div className="bg-background">
            <Seo
                title="Test Płatności Viva.com"
                description="Strona testowa do demonstracji możliwości API płatności Viva.com."
            />
            <PageHeader
                title="Test Płatności Viva.com (LIVE)"
                subtitle="Demonstracja różnych metod i przepływów płatności dostępnych w API Viva.com."
                breadcrumbs={breadcrumbs}
            />

            <div className="container mx-auto max-w-4xl px-4 md:px-6 pb-16 md:pb-24">
                {error && (
                     <Card className="mb-8 bg-red-50 border-red-300">
                        <CardHeader>
                            <CardTitle className="text-red-800">Wystąpił Błąd</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-red-700">{error}</p>
                            <Button onClick={handleGenerateCode} variant="destructive" className="mt-4">Spróbuj ponownie</Button>
                        </CardContent>
                    </Card>
                )}

                {paymentStatus && (
                    <Card className="mb-8 bg-green-50 border-green-300">
                        <CardHeader>
                            <CardTitle className="text-green-800">Status Płatności</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-green-700">{paymentStatus}</p>
                        </CardContent>
                    </Card>
                )}
                
                <div className="space-y-8">
                    <Card>
                        <CardHeader>
                            <CardTitle>Krok 1: Utworzenie zlecenia płatności</CardTitle>
                            <CardDescription>Wyślij żądanie do swojego backendu (funkcji Cloudflare), aby bezpiecznie uzyskać kod zlecenia od Viva.com.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex space-x-6">
                                <Checkbox id="isPreAuth" label="Pre-autoryzacja" checked={isPreAuth} onChange={setIsPreAuth} />
                                <Checkbox id="createRecurring" label="Płatność cykliczna (token)" checked={createRecurring} onChange={setCreateRecurring} />
                            </div>
                            {loading ? (
                                <LoadingSpinner />
                            ) : orderCode ? (
                                <div className="p-4 bg-secondary rounded-md text-center">
                                    <p className="text-sm text-muted-foreground">Otrzymano Order Code:</p>
                                    <p className="font-mono text-lg font-semibold break-all">{orderCode}</p>
                                </div>
                            ) : (
                                 <p className="text-sm text-muted-foreground">Wybierz opcje i kliknij przycisk, aby rozpocząć proces.</p>
                            )}
                        </CardContent>
                        <CardFooter>
                            <Button onClick={handleGenerateCode} disabled={loading}>
                                {loading ? 'Tworzenie zlecenia...' : 'Utwórz zlecenie płatności (1,00 PLN)'}
                            </Button>
                        </CardFooter>
                    </Card>
                    
                    <Card className={!orderCode ? 'opacity-50 pointer-events-none' : ''}>
                        <CardHeader>
                            <CardTitle>Viva.com Smart Checkout</CardTitle>
                            <CardDescription>Najprostsza integracja. Przekierowuje użytkownika na stronę płatności Viva.com, gdzie dostępne są wszystkie metody.</CardDescription>
                        </CardHeader>
                        <CardFooter>
                            <a href={smartCheckoutUrl} target="_blank" rel="noopener noreferrer" className="w-full" onClick={(e) => { if(!orderCode) e.preventDefault()}} aria-disabled={!orderCode}>
                                <Button disabled={isSubmitting || !orderCode} className="w-full">
                                    Przejdź do Smart Checkout
                                </Button>
                            </a>
                        </CardFooter>
                    </Card>

                    <Card className={!orderCode ? 'opacity-50 pointer-events-none' : ''}>
                         <CardHeader>
                            <CardTitle>Płatność kartą (Integracja natywna)</CardTitle>
                            <CardDescription>Formularz karty płatniczej osadzony bezpośrednio na Twojej stronie. Wymaga integracji z Viva Card Component (JS SDK).</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div>
                                <Label htmlFor="cardNumber">Numer karty</Label>
                                <div className="relative">
                                    <Input id="cardNumber" placeholder="0000 0000 0000 0000" disabled={isSubmitting || !orderCode} />
                                    <CreditCardIcon className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <Label htmlFor="cardExpiry">Data ważności (MM/RR)</Label>
                                    <Input id="cardExpiry" placeholder="MM/RR" disabled={isSubmitting || !orderCode} />
                                </div>
                                <div>
                                    <Label htmlFor="cardCVC">Kod CVC</Label>
                                    <Input id="cardCVC" placeholder="123" disabled={isSubmitting || !orderCode} />
                                </div>
                            </div>
                        </CardContent>
                        <CardFooter>
                            <Button onClick={() => handlePaymentSubmit('Karta')} disabled={isSubmitting || !orderCode} className="w-full">
                                {isSubmitting ? 'Przetwarzanie...' : 'Zapłać kartą'}
                            </Button>
                        </CardFooter>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default PaymentTestPage;
