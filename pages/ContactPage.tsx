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
                className={`flex min-h-[120px] w-full rounded-md border border-input bg-secondary/40 px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
                ref={ref}
                {...props}
            />
        )
    }
  )
  Textarea.displayName = "Textarea"

  return (
    <div className="container mx-auto max-w-4xl px-4 md:px-6 py-24 md:py-32">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl">Kontakt</h1>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
          Masz pytania? Chcesz nawiązać współpracę? Jesteśmy do Twojej dyspozycji.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-12 items-start">
        <div className="space-y-8">
          <div>
            <h3 className="text-lg font-semibold">Adres biura</h3>
            <p className="text-muted-foreground">ul. Elektryczna 1<br/>00-001 Warszawa, Polska</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold">Email</h3>
            <p className="text-muted-foreground hover:text-primary transition-colors"><a href="mailto:kontakt@evtech.pl">kontakt@evtech.pl</a></p>
          </div>
          <div>
            <h3 className="text-lg font-semibold">Telefon</h3>
            <p className="text-muted-foreground hover:text-primary transition-colors"><a href="tel:+48123456789">+48 123 456 789</a></p>
          </div>
        </div>

        <div className="border border-border/50 rounded-lg p-6">
          <h3 className="text-xl font-semibold mb-1">Napisz do nas</h3>
          <p className="text-muted-foreground text-sm mb-6">Odpowiemy tak szybko, jak to możliwe.</p>
          
          {submitted ? (
            <div className="text-center py-8">
              <h3 className="text-xl font-semibold">Dziękujemy!</h3>
              <p className="text-muted-foreground mt-2">Twoja wiadomość została wysłana.</p>
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
              <Button type="submit" variant="secondary" className="w-full uppercase tracking-wider font-medium">Wyślij</Button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
