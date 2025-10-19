import React, { useState } from 'react';
import { Button, Input, Label } from '../components/ui';

const ContactPage: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };
  
  const Textarea = React.forwardRef<HTMLTextAreaElement, React.TextareaHTMLAttributes<HTMLTextAreaElement>>(
    ({ className, ...props }, ref) => {
        return (
            <textarea
                className={`flex min-h-[120px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
                ref={ref}
                {...props}
            />
        )
    }
  )
  Textarea.displayName = "Textarea"

  return (
    <div className="bg-background">
      <div className="container mx-auto max-w-4xl px-4 md:px-6 py-16 md:py-24">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl">Kontakt</h1>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
            Masz pytania? Chcesz nawiązać współpracę? Jesteśmy do Twojej dyspozycji.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-16 items-start">
          <div className="space-y-8">
            <div>
              <h3 className="text-lg font-semibold text-muted-foreground tracking-wider uppercase">Adres biura</h3>
              <p className="text-foreground mt-1">ul. Elektryczna 1<br/>00-001 Warszawa, Polska</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-muted-foreground tracking-wider uppercase">Email</h3>
              <p className="text-foreground mt-1">kontakt@evtech.pl</p>
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
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <Label htmlFor="name">Imię i nazwisko</Label>
                    <Input id="name" type="text" value={name} onChange={e => setName(e.target.value)} required />
                  </div>
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" value={email} onChange={e => setEmail(e.target.value)} required />
                  </div>
                  <div>
                    <Label htmlFor="message">Wiadomość</Label>
                    <Textarea id="message" value={message} onChange={e => setMessage(e.target.value)} required />
                  </div>
                  <Button type="submit" className="w-full" size="lg">Wyślij</Button>
                </form>
              )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;