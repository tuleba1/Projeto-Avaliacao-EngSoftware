import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { Calendar } from '@/components/ui/calendar';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useDiagnosticData } from '@/hooks/useDiagnosticData';

const Diagnosticos = () => {
  const { user } = useAuth();
  const [selectedDate, setSelectedDate] = React.useState<Date | undefined>(new Date());
  const { chartData, tableData, loading, error } = useDiagnosticData();

  if (loading) {
    return (
      <div className="flex-1 p-6">
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">Carregando dados de diagnóstico...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex-1 p-6">
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <p className="text-destructive mb-2">Erro ao carregar dados</p>
            <p className="text-muted-foreground text-sm">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  const upcomingClasses = [
    { subject: 'FIS105 Física', date: 'HOJE' },
    { subject: 'BIO102 Biologia', date: '7 JUN TER' },
    { subject: 'EDF104 Educação Física', date: '8 JUN QUA' },
    { subject: 'ART101 Artes Visuais', date: '25 JUN QUI' },
  ];

  return (
    <div className="flex-1 p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">Diagnósticos</h1>
        <p className="text-muted-foreground">Análise detalhada do seu desempenho</p>
      </div>

      <div className="flex gap-6">
        <div className="flex-1">
          {/* Profile Section */}
          <div className="flex items-start space-x-6 mb-8">
            <div className="w-24 h-24 bg-gray-200 rounded-lg flex items-center justify-center">
              <div className="w-16 h-16 bg-gray-300 rounded-full flex items-center justify-center">
                <span className="text-gray-600 text-2xl">👤</span>
              </div>
            </div>
            
            <div className="flex-1">
              <h2 className="text-xl font-semibold mb-2">Perfil do Aluno(a)</h2>
              <div className="space-y-1 text-sm text-muted-foreground">
                <div>Nome completo do aluno: {user?.name}</div>
                <div>2º Ano do Ensino Médio</div>
              </div>
              
              <div className="mt-4">
                
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    
                  </div>
                  <div className="flex items-center space-x-2">
                    
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Performance Chart */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Evolução do Desempenho</CardTitle>
              <p className="text-sm text-muted-foreground">
                Últimos 6 meses • Notas abaixo de 60% destacadas em vermelho
              </p>
            </CardHeader>
            <CardContent>
              {chartData.length > 0 ? (
                <div className="h-64 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={chartData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis domain={[0, 100]} />
                      <Tooltip 
                        formatter={(value: number) => [`${value}%`, 'Desempenho']}
                        labelFormatter={(label) => `Mês: ${label}`}
                      />
                      <Line 
                        type="monotone" 
                        dataKey="percentage" 
                        stroke="hsl(var(--primary))" 
                        strokeWidth={3}
                        dot={(props: any) => {
                          const { cx, cy, payload } = props;
                          return (
                            <circle
                              cx={cx}
                              cy={cy}
                              r={6}
                              fill={payload.isLowPerformance ? "hsl(var(--destructive))" : "hsl(var(--primary))"}
                              stroke={payload.isLowPerformance ? "hsl(var(--destructive))" : "hsl(var(--primary))"}
                              strokeWidth={2}
                            />
                          );
                        }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              ) : (
                <div className="h-64 flex items-center justify-center">
                  <p className="text-muted-foreground">
                    Nenhum dado de desempenho disponível. Complete alguns questionários para ver sua evolução.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Diagnostic Table */}
          <Card>
            <CardContent className="p-0">
              <div className="overflow-hidden">
                <table className="w-full">
                  <thead className="bg-muted">
                    <tr>
                      <th className="text-left p-4 text-sm font-medium">Disciplina</th>
                      <th className="text-left p-4 text-sm font-medium">Nota (0 a 10)</th>
                      <th className="text-left p-4 text-sm font-medium">Diagnóstico</th>
                      <th className="text-left p-4 text-sm font-medium">Nível de Aprendizagem</th>
                      <th className="text-left p-4 text-sm font-medium">Recomendações de Estudo</th>
                    </tr>
                  </thead>
                  <tbody>
                    {tableData.map((item, index) => (
                      <tr key={index} className={index % 2 === 0 ? 'bg-background' : 'bg-muted/50'}>
                        <td className="p-4 text-sm font-medium">{item.subject}</td>
                        <td className="p-4 text-sm">
                          <span className={item.percentage < 60 && item.totalResponses > 0 ? 'text-destructive font-semibold' : ''}>
                            {item.score.toFixed(1)}
                          </span>
                        </td>
                        <td className="p-4">
                          <Badge 
                            variant={item.diagnosis === 'Baixo' ? 'destructive' : 
                                   item.diagnosis === 'Médio' ? 'secondary' : 
                                   item.diagnosis === 'Alto' ? 'default' : 'outline'}
                          >
                            {item.diagnosis}
                          </Badge>
                        </td>
                        <td className="p-4 text-sm">
                          {item.totalResponses > 0 ? 
                            `${item.percentage.toFixed(1)}% (${item.totalResponses} questionários)` : 
                            'Nenhum questionário respondido'
                          }
                        </td>
                        <td className="p-4 text-sm">{item.recommendation}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          <div className="mt-6 flex space-x-4">
            <Button variant="outline">Trocar Senha</Button>
            <Button variant="outline">Trocar E-mail</Button>
          </div>
        </div>

        <div className="w-80">
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="text-lg"></CardTitle>
            </CardHeader>
            <CardContent>
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={setSelectedDate}
                className="rounded-md border"
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Próximas Aulas</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {upcomingClasses.map((classItem, index) => (
                  <div key={index} className="flex flex-col space-y-1">
                    <div className="font-medium text-sm">{classItem.subject}</div>
                    <div className="text-xs text-muted-foreground">{classItem.date}</div>
                    {index < upcomingClasses.length - 1 && <hr className="my-2" />}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Diagnosticos;