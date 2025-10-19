import React from 'react';
import { Button, Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from '../components/ui';
import { INVESTMENT_PROJECTS } from '../constants';

const ProgressBar: React.FC<{ value: number }> = ({ value }) => (
  <div className="w-full bg-secondary rounded-full h-2">
    <div className="bg-primary h-2 rounded-full" style={{ width: `${value}%` }}></div>
  </div>
);

const InvestPage: React.FC = () => {
  return (
    <div className="container mx-auto max-w-6xl px-4 md:px-6 py-24 md:py-32">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl">Zainwestuj w elektromobilność</h1>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
          Dołącz do grona inwestorów i czerp zyski z rosnącego rynku pojazdów elektrycznych. Finansuj zakup aut do naszej floty i zarabiaj na ich wynajmie.
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {INVESTMENT_PROJECTS.map((project) => (
          <div key={project.id} className="border border-border/50 rounded-lg flex flex-col bg-secondary/20">
            <div>
              <img src={project.imageUrl} alt={project.carName} className="rounded-t-lg aspect-video object-cover w-full" />
            </div>
            <div className="p-6 flex flex-col flex-grow">
              <h3 className="text-xl font-semibold">{project.carName}</h3>
              <p className="text-sm text-muted-foreground">Projekt finansowania pojazdu</p>
              
              <div className="mt-4 mb-4 flex-grow">
                <div className="flex justify-between items-end mb-1">
                  <span className="text-sm font-medium text-primary">
                    {project.amountRaised.toLocaleString('pl-PL')} zł
                  </span>
                  <span className="text-sm text-muted-foreground">
                    Cel: {project.goal.toLocaleString('pl-PL')} zł
                  </span>
                </div>
                <ProgressBar value={(project.amountRaised / project.goal) * 100} />
                 <div className="flex justify-between text-sm text-muted-foreground mt-2">
                  <span>{((project.amountRaised / project.goal) * 100).toFixed(1)}% zebrano</span>
                  <span>{project.investorCount} inwestorów</span>
                </div>
              </div>
              
              <Button variant="secondary" className="w-full uppercase tracking-wider font-medium">Zainwestuj teraz</Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default InvestPage;
