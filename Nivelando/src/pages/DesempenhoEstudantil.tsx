import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';
import { useStudentPerformanceData } from '@/hooks/useStudentPerformanceData';
import { useStudentsList } from '@/hooks/useStudentsList';
import { Skeleton } from '@/components/ui/skeleton';
import { useAuth } from '@/contexts/AuthContext';
import { Users, BookOpen, Target, TrendingUp } from 'lucide-react';

const DesempenhoEstudantil = () => {
  const { performanceData, loading, error } = useStudentPerformanceData();
  const { students, loading: studentsLoading } = useStudentsList();
  const { user } = useAuth();

  if (loading) {
    return (
      <div className="flex-1 p-6">
        <div className="mb-6">
          <Skeleton className="h-8 w-96 mb-2" />
          <Skeleton className="h-4 w-64" />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Skeleton className="h-96" />
          <Skeleton className="h-96" />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex-1 p-6">
        <div className="mb-6">
          <h1 className="text-3xl font-bold mb-2">Desempenho Estudantil nas Disciplinas</h1>
          <p className="text-destructive">Erro ao carregar dados: {error}</p>
        </div>
      </div>
    );
  }

  // Filtrar apenas matérias com dados para o gráfico
  const subjectsWithData = performanceData.filter(subject => subject.totalResponses > 0);
  
  const pieData = subjectsWithData.map((subject, index) => ({
    name: subject.code,
    value: subject.averageScore,
    fill: subject.color,
    totalResponses: subject.totalResponses,
    totalStudents: subject.totalStudents
  }));

  const overallAverage = subjectsWithData.length > 0 
    ? Math.round(subjectsWithData.reduce((acc, subject) => acc + subject.averageScore, 0) / subjectsWithData.length)
    : 0;

  const getOverallStatus = (average: number) => {
    if (average >= 80) return 'Excelente';
    if (average >= 60) return 'Bom';
    if (average >= 40) return 'Regular';
    return 'Baixo';
  };

  // Estatísticas resumidas
  const totalResponses = performanceData.reduce((acc, subject) => acc + subject.totalResponses, 0);
  const totalStudents = Math.max(...performanceData.map(s => s.totalStudents), 0);
  const activeSubjects = subjectsWithData.length;
  const totalSubjects = performanceData.length;

  return (
    <div className="flex-1 p-6">
      {/* Header do Professor */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold mb-2">Desempenho Estudantil</h1>
            <p className="text-muted-foreground">
              Professor(a): <span className="font-medium">{user?.name}</span>
            </p>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-primary">{overallAverage}%</div>
            <div className="text-sm text-muted-foreground">Média Geral</div>
          </div>
        </div>

        {/* Cards de Estatísticas Resumidas */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <Users className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <div className="text-2xl font-bold">{totalStudents}</div>
                  <div className="text-sm text-muted-foreground">Estudantes</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-chart-2/10 rounded-lg">
                  <BookOpen className="h-5 w-5 text-chart-2" />
                </div>
                <div>
                  <div className="text-2xl font-bold">{activeSubjects}/{totalSubjects}</div>
                  <div className="text-sm text-muted-foreground">Disciplinas Ativas</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-chart-3/10 rounded-lg">
                  <Target className="h-5 w-5 text-chart-3" />
                </div>
                <div>
                  <div className="text-2xl font-bold">{totalResponses}</div>
                  <div className="text-sm text-muted-foreground">Questionários</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-chart-4/10 rounded-lg">
                  <TrendingUp className="h-5 w-5 text-chart-4" />
                </div>
                <div>
                  <div className="text-2xl font-bold">{getOverallStatus(overallAverage)}</div>
                  <div className="text-sm text-muted-foreground">Status Geral</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Progress Bars */}
        <Card>
          <CardHeader>
            <CardTitle>Desempenho por Disciplina</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {performanceData.map((subject) => (
                <div key={subject.id} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div 
                        className="w-3 h-3 rounded-full" 
                        style={{ backgroundColor: subject.color }}
                      ></div>
                      <span className="font-medium">{subject.name}</span>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-medium">{subject.averageScore}%</div>
                      <div className="text-xs text-muted-foreground">
                        {subject.totalResponses} respostas
                      </div>
                    </div>
                  </div>
                  <Progress value={subject.averageScore} className="h-3" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Pie Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Distribuição do Desempenho</CardTitle>
            <div className="text-right">
              <div className="text-2xl font-bold">{overallAverage}%</div>
              <div className="text-sm text-muted-foreground">
                Desempenho Geral: {getOverallStatus(overallAverage)}
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {pieData.length > 0 ? (
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={pieData}
                      cx="50%"
                      cy="50%"
                      innerRadius={40}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {pieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.fill} />
                      ))}
                    </Pie>
                    <Tooltip 
                      formatter={(value: number, name: string, props: any) => [
                        `${value}% (${props.payload.totalResponses} respostas)`,
                        name
                      ]}
                    />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            ) : (
              <div className="h-64 flex items-center justify-center text-muted-foreground">
                Nenhum dado de questionário disponível
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Estatísticas por Disciplina */}
      <Card className="mt-8">
        <CardHeader>
          <CardTitle>Estatísticas por Disciplina</CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {performanceData.map((subject) => (
              <div key={subject.id} className="space-y-2">
                <div className="flex items-center space-x-2">
                  <div 
                    className="w-4 h-4 rounded" 
                    style={{ backgroundColor: subject.color }}
                  ></div>
                  <span className="font-medium">{subject.name}</span>
                </div>
                <div className="text-sm text-muted-foreground space-y-1">
                  <div>Média: {subject.averageScore}%</div>
                  <div>Respostas: {subject.totalResponses}</div>
                  <div>Estudantes: {subject.totalStudents}</div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Lista de Estudantes Individuais */}
      <Card className="mt-8">
        <CardHeader>
          <CardTitle>Desempenho Individual dos Estudantes</CardTitle>
          <p className="text-sm text-muted-foreground">
            Acompanhe o progresso de cada estudante cadastrado na plataforma
          </p>
        </CardHeader>
        <CardContent>
          {studentsLoading ? (
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <Skeleton key={i} className="h-20 w-full" />
              ))}
            </div>
          ) : students.length > 0 ? (
            <div className="space-y-4">
              {students.map((student) => (
                <div key={student.id} className="border rounded-lg p-4 hover:bg-muted/50 transition-colors">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <h3 className="font-semibold">{student.name}</h3>
                      <p className="text-sm text-muted-foreground">{student.email}</p>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-primary">{student.averageScore}%</div>
                      <div className="text-sm text-muted-foreground">
                        {student.totalResponses} questionários
                      </div>
                    </div>
                  </div>

                  {/* Desempenho por matéria do estudante */}
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
                    {Object.entries(student.subjects).map(([subjectId, subjectData]) => (
                      <div key={subjectId} className="text-center p-2 bg-background rounded border">
                        <div className="text-sm font-medium truncate mb-1">{subjectData.name}</div>
                        <div className="text-lg font-bold">{subjectData.averageScore}%</div>
                        <div className="text-xs text-muted-foreground">
                          {subjectData.responses} resp.
                        </div>
                      </div>
                    ))}
                  </div>

                  {student.lastActivity && (
                    <div className="text-xs text-muted-foreground mt-3">
                      Última atividade: {new Date(student.lastActivity).toLocaleDateString('pt-BR', {
                        day: '2-digit',
                        month: '2-digit',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              <Users className="h-12 w-12 mx-auto mb-3 opacity-50" />
              <p>Nenhum estudante encontrado</p>
              <p className="text-sm">Os estudantes aparecerão aqui após responderem questionários</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default DesempenhoEstudantil;