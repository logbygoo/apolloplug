import React, { useState, useEffect } from 'react';
import { Button, Input, Label } from '../components/ui';
import { ApolloPlugLogo } from '../constants';
import { CONFIG } from '../config';

interface UnderConstructionPageProps {
  onAuthenticated: () => void;
}

const UnderConstructionPage: React.FC<UnderConstructionPageProps> = ({ onAuthenticated }) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    document.title = 'ApolloPlug.com | Wkrótce Otwarcie';
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === CONFIG.accessPassword) {
      setError('');
      onAuthenticated();
    } else {
      setError('Nieprawidłowe hasło. Spróbuj ponownie.');
      setPassword('');
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background text-foreground p-4">
      <div className="w-full max-w-md text-center">
        <ApolloPlugLogo className="justify-center mb-8 text-2xl" />
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Brak dostępu</h1>
        <p className="mt-4 text-muted-foreground">
          Pracujemy nad czymś wspaniałym. Wkrótce wrócimy! Wprowadź hasło, aby uzyskać dostęp.
        </p>
        <form onSubmit={handleSubmit} className="mt-8 space-y-4">
          <div className="relative">
            <Input
              id="password"
              type="password"
              placeholder=" "
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="text-center"
            />
             <Label htmlFor="password" className="absolute text-sm text-muted-foreground duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] left-1/2 -translate-x-1/2 peer-focus:left-1/2 peer-focus:-translate-x-1/2 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Hasło</Label>
          </div>
          {error && <p className="text-sm text-destructive">{error}</p>}
          <Button type="submit" className="w-full" size="lg">
            Wejdź
          </Button>
        </form>
      </div>
    </div>
  );
};

export default UnderConstructionPage;