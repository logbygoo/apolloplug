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
                className={`block min-h-[140px] w-full rounded-md bg-secondary px-3 text-sm ring-offset-background border-2 border-transparent focus-visible:outline-none focus-visible:border-primary disabled:cursor-not-allowed disabled:opacity-50 pt-4 ${className}`}
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
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="relative">
                    <Input id="name" type="text" value={name} onChange={e => setName(e.target.value)} required placeholder=" " className="peer" />
                    <Label htmlFor="name" className="absolute text-muted-foreground duration-300 transform -translate-y-3 scale-75 top-4 left-3 z-10 origin-[0] peer-focus:text-primary peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3">
                      Imię i nazwisko
                    </Label>
                  </div>
                  <div className="relative">
                    <Input id="email" type="email" value={email} onChange={e => setEmail(e.target.value)} required placeholder=" " className="peer" />
                    <Label htmlFor="email" className="absolute text-muted-foreground duration-300 transform -translate-y-3 scale-75 top-4 left-3 z-10 origin-[0] peer-focus:text-primary peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3">
                      Email
                    </Label>
                  </div>
                  <div className="relative">
                    <Textarea id="message" value={message} onChange={e => setMessage(e.target.value)} required placeholder=" " className="peer" />
                     <Label htmlFor="message" className="absolute text-muted-foreground duration-300 transform -translate-y-3 scale-75 top-4 left-3 z-10 origin-[0] peer-focus:text-primary peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3">
                      Wiadomość
                    </Label>
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