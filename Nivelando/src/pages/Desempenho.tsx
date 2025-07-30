import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { useAuth } from '@/contexts/AuthContext';
import { Calendar } from '@/components/ui/calendar';
import { Badge } from '@/components/ui/badge';
import { usePerformanceData } from '@/hooks/usePerformanceData';
import { usePerformanceChart } from '@/hooks/usePerformanceChart';
import { Skeleton } from '@/components/ui/skeleton';
import { AlertCircle } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

const Desempenho = () => {
  const { user } = useAuth();
  const [selectedDate, setSelectedDate] = React.useState<Date | undefined>(new Date());
  const { subjectPerformance, loading, error } = usePerformanceData();
  const { chartData, loading: chartLoading } = usePerformanceChart();

  const upcomingClasses = [
    { subject: 'FIS105 Física', date: 'HOJE' },
    { subject: 'BIO102 Biologia', date: '7 JUN TER' },
    { subject: 'EDF104 Educação Física', date: '8 JUN QUA' },
    { subject: 'ART101 Artes Visuais', date: '25 JUN QUI' },
  ];

  if (loading) {
    return (
      <div className="flex-1 p-6">
        <div className="mb-6">
          <h1 className="text-3xl font-bold mb-2">Desempenho</h1>
          <p className="text-muted-foreground">Acompanhe seu progresso acadêmico</p>
        </div>
        <div className="flex gap-6">
          <div className="flex-1">
            <div className="flex items-start space-x-6 mb-8">
              <Skeleton className="w-24 h-24 rounded-lg" />
              <div className="flex-1 space-y-2">
                <Skeleton className="h-6 w-1/2" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4" />
              </div>
            </div>
            <Card>
              <CardHeader>
                <Skeleton className="h-6 w-1/3" />
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {[...Array(4)].map((_, i) => (
                    <div key={i} className="space-y-2">
                      <Skeleton className="h-4 w-full" />
                      <Skeleton className="h-2 w-full" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
          <div className="w-80">
            <Skeleton className="h-96 w-full" />
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex-1 p-6">
        <div className="mb-6">
          <h1 className="text-3xl font-bold mb-2">Desempenho</h1>
          <p className="text-muted-foreground">Acompanhe seu progresso acadêmico</p>
        </div>
        <Card>
          <CardContent className="flex items-center justify-center p-6">
            <div className="text-center">
              <AlertCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">{error}</p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  const totalPerformance = subjectPerformance.length > 0 
    ? Math.round(subjectPerformance.reduce((acc, subject) => acc + subject.percentage, 0) / subjectPerformance.length)
    : 0;

  const totalResponses = subjectPerformance.reduce((acc, subject) => acc + subject.totalResponses, 0);

  return (
    <div className="flex-1 p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">Desempenho</h1>
        <p className="text-muted-foreground">Acompanhe seu progresso acadêmico</p>
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
                <div>Email: {user?.email}</div>
                <div>{totalResponses} questionários respondidos</div>
                <div>{new Date().toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' })}</div>
              </div>
              
              <div className="mt-4">
                <h3 className="font-medium mb-2">Rendimento geral:</h3>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <div className={`w-3 h-3 rounded ${totalPerformance >= 60 ? 'bg-green-500' : 'bg-red-500'}`}></div>
                    <span className="text-sm">{totalPerformance}% de aproveitamento</span>
                  </div>
                  <Progress value={totalPerformance} className="w-full mt-2" />
                </div>
              </div>
            </div>
          </div>

          {/* Performance by Subject */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Desempenho Por Disciplina</CardTitle>
              <p className="text-sm text-muted-foreground">
                Mês: {new Date().toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' })}
              </p>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {subjectPerformance.map((subject) => (
                  <div key={subject.id} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <div 
                          className="w-3 h-3 rounded-full" 
                          style={{ backgroundColor: subject.color }}
                        ></div>
                        <span className="font-medium">{subject.name}</span>
                        {subject.status === 'poor' && (
                          <Badge variant="destructive" className="text-xs">
                            Abaixo de 60%
                          </Badge>
                        )}
                        {subject.status === 'none' && (
                          <Badge variant="secondary" className="text-xs">
                            Não respondido
                          </Badge>
                        )}
                        {subject.totalResponses > 0 && (
                          <Badge variant="outline" className="text-xs">
                            {subject.totalResponses} questionário{subject.totalResponses > 1 ? 's' : ''}
                          </Badge>
                        )}
                      </div>
                      <span 
                        className={`text-sm font-medium ${
                          subject.status === 'poor' ? 'text-destructive' : ''
                        }`}
                      >
                        {subject.percentage.toFixed(0)}%
                      </span>
                    </div>
                    <Progress value={subject.percentage} className="h-2" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Performance Distribution Chart */}
          <Card>
            <CardHeader>
              <CardTitle>Distribuição de Desempenho</CardTitle>
              <p className="text-sm text-muted-foreground">
                Visualização gráfica do seu desempenho por disciplina
              </p>
            </CardHeader>
            <CardContent>
              {chartLoading ? (
                <Skeleton className="h-64 w-full" />
              ) : chartData.length > 0 ? (
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={chartData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ subject, performance }) => `${subject}: ${performance}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="performance"
                    >
                      {chartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.fill} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              ) : (
                <div className="h-64 flex items-center justify-center text-muted-foreground">
                  <p>Nenhum dado de desempenho disponível para gráfico</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="w-80">
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="text-lg">
                {new Date().toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' })}
              </CardTitle>
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

export default Desempenho;