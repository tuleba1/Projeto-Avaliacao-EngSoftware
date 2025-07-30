import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useTeacherDashboard } from '@/hooks/useTeacherDashboard';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Monitor, BookOpen, BarChart3, Users } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { formatDistanceToNow } from 'date-fns';
import { ptBR } from 'date-fns/locale';

const Dashboard = () => {
  const { user } = useAuth();
  const { stats, recentActivities, loading, error } = useTeacherDashboard();

  return (
    <div className="flex-1 p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
        <p className="text-muted-foreground">
          {user?.role === 'student' 
            ? 'Acompanhe seu progresso e acesse suas atividades' 
            : 'Visão geral dos seus alunos e atividades'
          }
        </p>
      </div>

      {user?.role === 'student' ? (
        <>
          {/* Student Dashboard */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Apresentamos o Nivelando</h2>
            <p className="text-muted-foreground mb-6">
              O Nivelando é um sistema educacional inovador, criado especialmente para 
              atender às necessidades dos alunos do Ensino Médio, utilizando na melhoria 
              da aprendizagem escolar de forma precisa e organizada.
            </p>
          </div>

          <div className="mb-8">
            <h3 className="text-lg font-semibold mb-4">Com foco em ensino personalizado, o sistema permite:</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <div className="flex items-center space-x-2">
                    <div className="p-2 bg-blue-100 rounded-lg">
                      <Monitor className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">Gerenciamento de múltiplas Turmas e níveis escolares.</CardTitle>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    O Nivelando foi desenvolvido com a realidade das escolas em mente, 
                    permitindo o cadastro de múltiplas turmas se suas áreas de ensino: jardim 1º ano - jardim 1º ano - tarde.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <div className="flex items-center space-x-2">
                    <div className="p-2 bg-blue-100 rounded-lg">
                      <BarChart3 className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">Geração de relatórios claros e objetivos.</CardTitle>
                      <CardDescription>Acessível para professores e gestores escolares.</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Após a aplicação dos testes, os dados, 
                    o Nivelando gera relatórios automáticos, com 
                    indicações visuais e textos explicativos.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <div className="flex items-center space-x-2">
                    <div className="p-2 bg-teal-100 rounded-lg">
                      <BookOpen className="h-6 w-6 text-teal-600" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">Aplicação de testes diagnósticos para identificar pontos fracos por matéria.</CardTitle>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    A base do Nivelando é a avaliação precisa e pedagógica. O sistema 
                    permite aplicar testes diagnósticos por disciplina.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <div className="flex items-center space-x-2">
                    <div className="p-2 bg-teal-100 rounded-lg">
                      <Users className="h-6 w-6 text-teal-600" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">Recomendações de estudo personalizadas para que cada aluno Foque exatamente no que precisa melhorar.</CardTitle>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Com base nos resultados dos testes, o Nivelando gera 
                    recomendações de estudo personalizadas, de forma 
                    automática e prática.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </>
      ) : (
        <>
          {/* Teacher Dashboard */}
          {loading ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(3)].map((_, i) => (
                  <Card key={i}>
                    <CardHeader>
                      <Skeleton className="h-5 w-32" />
                      <Skeleton className="h-4 w-24" />
                    </CardHeader>
                    <CardContent>
                      <Skeleton className="h-8 w-16 mb-2" />
                      <Skeleton className="h-4 w-40" />
                    </CardContent>
                  </Card>
                ))}
              </div>
              <div className="mt-8">
                <Card>
                  <CardHeader>
                    <Skeleton className="h-6 w-40" />
                    <Skeleton className="h-4 w-32" />
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {[...Array(3)].map((_, i) => (
                        <div key={i} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                          <div>
                            <Skeleton className="h-4 w-64 mb-2" />
                            <Skeleton className="h-3 w-20" />
                          </div>
                          <Skeleton className="h-4 w-12" />
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </>
          ) : error ? (
            <Card>
              <CardContent className="p-6 text-center">
                <p className="text-destructive">{error}</p>
              </CardContent>
            </Card>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Total de Alunos</CardTitle>
                    <CardDescription>Alunos cadastrados no sistema</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold">{stats.totalStudents}</div>
                    <p className="text-sm text-muted-foreground">Estudantes únicos cadastrados</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Questionários Respondidos</CardTitle>
                    <CardDescription>Total de respostas</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold">{stats.totalQuestionnaires}</div>
                    <p className="text-sm text-muted-foreground">Questionários completados</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Aproveitamento Médio</CardTitle>
                    <CardDescription>Geral dos alunos</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold">{stats.averagePerformance}%</div>
                    <p className="text-sm text-muted-foreground">Performance média geral</p>
                  </CardContent>
                </Card>
              </div>

              <div className="mt-8">
                <Card>
                  <CardHeader>
                    <CardTitle>Atividades Recentes</CardTitle>
                    <CardDescription>Últimas atividades dos alunos</CardDescription>
                  </CardHeader>
                  <CardContent>
                     <div className="space-y-4">
                       {recentActivities.length > 0 ? (
                         recentActivities.map((activity) => (
                           <div key={activity.id} className="flex items-center justify-between p-4 bg-muted/50 rounded-lg border hover:bg-muted transition-colors">
                             <div className="flex items-center space-x-3">
                               <div className="flex-shrink-0">
                                 <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                                   <BookOpen className="h-5 w-5 text-primary" />
                                 </div>
                               </div>
                               <div>
                                 <p className="font-medium">{activity.studentName}</p>
                                 <p className="text-sm text-muted-foreground">
                                   completou questionário de <span className="font-medium">{activity.subjectName}</span>
                                 </p>
                                 <p className="text-xs text-muted-foreground">
                                   {formatDistanceToNow(new Date(activity.completedAt), { 
                                     addSuffix: true, 
                                     locale: ptBR 
                                   })}
                                 </p>
                               </div>
                             </div>
                             <div className="flex items-center space-x-2">
                               <div className={`text-right`}>
                                 <div className={`text-lg font-bold ${
                                   activity.percentage >= 80 ? 'text-green-600' : 
                                   activity.percentage >= 60 ? 'text-yellow-600' : 'text-red-600'
                                 }`}>
                                   {Math.round(activity.percentage)}%
                                 </div>
                                 <div className="text-xs text-muted-foreground">
                                   {activity.percentage >= 80 ? 'Excelente' : 
                                    activity.percentage >= 60 ? 'Bom' : 'Precisa melhorar'}
                                 </div>
                               </div>
                             </div>
                           </div>
                         ))
                       ) : (
                         <div className="text-center py-8">
                           <BookOpen className="h-12 w-12 mx-auto mb-3 text-muted-foreground/50" />
                           <p className="text-muted-foreground">Nenhuma atividade recente encontrada</p>
                           <p className="text-sm text-muted-foreground">As atividades dos estudantes aparecerão aqui</p>
                         </div>
                       )}
                     </div>
                  </CardContent>
                </Card>
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default Dashboard;