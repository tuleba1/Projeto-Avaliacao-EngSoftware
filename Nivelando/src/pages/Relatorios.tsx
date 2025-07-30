import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';

const Relatorios = () => {
  const { user } = useAuth();

  return (
    <div className="flex-1 p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">Relatórios</h1>
        <p className="text-muted-foreground">Visualize seus relatórios de desempenho</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Relatórios de Desempenho</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Os relatórios serão gerados automaticamente conforme você completa os questionários.
            Volte aqui após responder algumas atividades para ver seus resultados detalhados.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default Relatorios;