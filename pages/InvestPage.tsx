import React from 'react';
import { Button, Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from '../components/ui';
import { INVESTMENT_PROJECTS } from '../constants';

const ProgressBar: React.FC<{ value: number }> = ({ value }) => (
  <div className="w-full bg-muted rounded-full h-2">
    <div className="bg-primary h-2 rounded-full" style={{ width: `${value}%` }}></div>
  </div>
);

const InvestPage: React.FC = () => {
  return (
    <div className="bg-background">
      <div className="container mx-auto max-w-6xl px-4 md:px-6 py-16 md:py-24">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">Zainwestuj w elektromobilność</h1>
          <p className="mt-4 max-w-3xl mx-auto text-lg text-muted-foreground">
            Dołącz do grona inwestorów i czerp zyski z rosnącego rynku pojazdów elektrycznych. Finansuj zakup aut do naszej floty i zarabiaj na ich wynajmie.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {INVESTMENT_PROJECTS.map((project) => (
            <Card key={project.id} className="flex flex-col hover:shadow-lg transition-shadow">
              <CardHeader>
                <img src={project.imageUrl} alt={project.carName} className="rounded-md object-contain w-full h-48" />
                <CardTitle className="mt-4">{project.carName}</CardTitle>
                <CardDescription>Projekt finansowania pojazdu</CardDescription>
              </CardHeader>
              <CardContent className="flex-grow">
                <div className="mb-4">
                  <div className="flex justify-between items-end mb-1">
                    <span className="text-sm font-medium text-foreground">
                      {project.amountRaised.toLocaleString('pl-PL')} zł
                    </span>
                    <span className="text-sm text-muted-foreground">
                      Cel: {project.goal.toLocaleString('pl-PL')} zł
                    </span>
                  </div>
                  <ProgressBar value={(project.amountRaised / project.goal) * 100} />
                </div>
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>{((project.amountRaised / project.goal) * 100).toFixed(1)}% zebrano</span>
                  <span>{project.investorCount} inwestorów</span>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full" variant="secondary">Zainwestuj teraz</Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default InvestPage;