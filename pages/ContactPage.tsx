import React, { useState } from 'react';
import { Button, Input, Label, PageHeader } from '../components/ui';
import { InfoIcon } from '../constants';
import Seo from '../components/Seo';
import { generateContactAdminEmail, generateContactCustomerEmail } from '../configs/notifications/emailTemplates';

const ContactPage: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      // 1. Send email to admin
      const adminHtml = generateContactAdminEmail(name, email, message);
      const adminResponse = await fetch("https://mail.apolloplug.com", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          to: "office@apolloplug.com",
          from: "Apollo Plug <office@apolloplug.com>",
          subject: `Nowe zapytanie ze strony: ${name}`,
          html: adminHtml,
          reply_to: email,
        }),
      });

      if (!adminResponse.ok) {
        throw new Error("Błąd podczas wysyłania wiadomości do administratora.");
      }

      // 2. Send confirmation email to customer
      const customerHtml = generateContactCustomerEmail(name, message);
      const customerResponse = await fetch("https://mail.apolloplug.com", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          to: email,
          from: "Apollo Plug <no-reply@mail.apolloplug.com>",
          subject: "Potwierdzenie otrzymania wiadomości | ApolloPlug.com",
          html: customerHtml,
          reply_to: "office@apolloplug.com",
        }),
      });
      
      if (!customerResponse.ok) {
        console.warn("Nie udało się wysłać e-maila z potwierdzeniem do klienta.");
      }

      setSubmitted(true);
    } catch (err) {
      setError("Nie udało się wysłać wiadomości. Spróbuj ponownie później.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };
  
  const Textarea = React.forwardRef<HTMLTextAreaElement, React.TextareaHTMLAttributes<HTMLTextAreaElement>>(
    ({ className, ...props }, ref) => {
        return (
            <textarea
                className={`block min-h-[140px] w-full rounded-md bg-secondary p-3 text-sm ring-offset-background border border-border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
                ref={ref}
                {...props}
            />
        )
    }
  )
  Textarea.displayName = "Textarea"

  const breadcrumbs = [{ name: 'Kontakt' }];

  return (
    <div className="bg-background">
      <Seo
        title="Kontakt"
        description="Skontaktuj się z nami w sprawie wynajmu Tesli, transferów VIP lub inwestycji. Jesteśmy dostępni telefonicznie, mailowo oraz w naszym biurze w Warszawie."
      />
      <PageHeader 
        title="Kontakt"
        subtitle="Masz pytania? Chcesz nawiązać współpracę? Jesteśmy do Twojej dyspozycji."
        breadcrumbs={breadcrumbs}
      />
      <div className="container mx-auto max-w-4xl px-4 md:px-6 pb-16 md:pb-24">
        <div className="grid md:grid-cols-2 gap-16 items-start">
          <div className="space-y-8">
            <div>
              <h3 className="text-lg font-semibold text-muted-foreground tracking-wider uppercase">Adres biura</h3>
              <p className="text-foreground mt-1">ul. Elektryczna 1<br/>00-001 Warszawa, Polska</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-muted-foreground tracking-wider uppercase">Email</h3>
              <p className="text-foreground mt-1">office@apolloplug.com</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-muted-foreground tracking-wider uppercase">Telefon</h3>
              <p className="text-foreground mt-1">+48 123 456 789</p>
            </div>
          </div>

          <div>
              {submitted ? (
                <div className="text-center p-8 h-full flex flex-col justify-center items-center border rounded-lg">
                  <h3 className="text-2xl font-semibold">Dziękujemy!</h3>
                  <p className="text-muted-foreground mt-2">Twoja wiadomość została wysłana.</p>
                  <Button onClick={() => setSubmitted(false)} variant="secondary" className="mt-6">Napisz kolejną</Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <Label htmlFor="name" className="flex items-center">
                      Imię i nazwisko
                    </Label>
                    <Input id="name" type="text" value={name} onChange={e => setName(e.target.value)} required className="mt-1" />
                  </div>
                   <div>
                    <Label htmlFor="email" className="flex items-center">
                      E-mail
                      <InfoIcon className="w-4 h-4 ml-1.5 text-muted-foreground" />
                    </Label>
                    <Input id="email" type="email" value={email} onChange={e => setEmail(e.target.value)} required className="mt-1" />
                  </div>
                  <div>
                     <Label htmlFor="message" className="flex items-center">
                      Wiadomość
                    </Label>
                    <Textarea id="message" value={message} onChange={e => setMessage(e.target.value)} required className="mt-1" />
                  </div>
                  {error && <p className="text-sm text-destructive">{error}</p>}
                  <Button type="submit" className="w-full" size="lg" disabled={isLoading}>
                    {isLoading ? 'Wysyłanie...' : 'Wyślij'}
                  </Button>
                </form>
              )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;