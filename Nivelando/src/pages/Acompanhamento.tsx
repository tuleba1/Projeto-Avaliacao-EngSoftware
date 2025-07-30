import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Skeleton } from '@/components/ui/skeleton';
import { AlertCircle, BookOpen, Clock, User } from 'lucide-react';
import { useStudentsData } from '@/hooks/useStudentsData';

const Acompanhamento = () => {
  const { students, loading, error } = useStudentsData();

  if (loading) {
    return (
      <div className="flex-1 p-6 space-y-6">
        <div className="space-y-2">
          <Skeleton className="h-8 w-64" />
          <Skeleton className="h-4 w-96" />
        </div>
        
        <div className="grid gap-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} className="h-24 w-full" />
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex-1 p-6">
        <div className="mb-6">
          <h1 className="text-3xl font-bold mb-2">Acompanhamento de Estudantes</h1>
          <div className="flex items-center space-x-2 text-destructive">
            <AlertCircle className="h-4 w-4" />
            <p>{error}</p>
          </div>
        </div>
      </div>
    );
  }

  const getActivityStatus = (lastActivity: string | null, totalResponses: number) => {
    if (totalResponses === 0) {
      return { status: 'Inativo', variant: 'destructive' as const };
    }
    
    if (!lastActivity) {
      return { status: 'Sem atividade', variant: 'secondary' as const };
    }

    const activityDate = new Date(lastActivity.split('/').reverse().join('-'));
    const daysSinceActivity = Math.floor((Date.now() - activityDate.getTime()) / (1000 * 60 * 60 * 24));
    
    if (daysSinceActivity <= 7) {
      return { status: 'Ativo', variant: 'default' as const };
    } else if (daysSinceActivity <= 30) {
      return { status: 'Moderado', variant: 'secondary' as const };
    } else {
      return { status: 'Inativo', variant: 'destructive' as const };
    }
  };

  const totalStudents = students.length;
  const activeStudents = students.filter(s => getActivityStatus(s.lastActivity, s.totalResponses).status === 'Ativo').length;
  const totalResponses = students.reduce((acc, student) => acc + student.totalResponses, 0);
  const averageResponses = totalStudents > 0 ? Math.round(totalResponses / totalStudents) : 0;

  return (
    <div className="flex-1 p-6 space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold">Acompanhamento de Estudantes</h1>
        <p className="text-muted-foreground">
          Monitore o progresso e atividade dos seus estudantes
        </p>
      </div>

      {/* Estatísticas Gerais */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <User className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total de Estudantes</p>
                <p className="text-2xl font-bold">{totalStudents}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <User className="h-4 w-4 text-chart-1" />
              <div>
                <p className="text-sm font-medium text-muted-foreground">Estudantes Ativos</p>
                <p className="text-2xl font-bold text-chart-1">{activeStudents}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <BookOpen className="h-4 w-4 text-chart-2" />
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total de Respostas</p>
                <p className="text-2xl font-bold text-chart-2">{totalResponses}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <BookOpen className="h-4 w-4 text-chart-3" />
              <div>
                <p className="text-sm font-medium text-muted-foreground">Média de Respostas</p>
                <p className="text-2xl font-bold text-chart-3">{averageResponses}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Lista de Estudantes */}
      <Card>
        <CardHeader>
          <CardTitle>Lista de Estudantes</CardTitle>
        </CardHeader>
        <CardContent>
          {students.length === 0 ? (
            <div className="text-center py-8">
              <User className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">Nenhum estudante cadastrado ainda</p>
            </div>
          ) : (
            <div className="space-y-4">
              {students.map((student) => {
                const activityInfo = getActivityStatus(student.lastActivity, student.totalResponses);
                
                return (
                  <div
                    key={student.id}
                    className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex items-center space-x-4">
                      <Avatar>
                        <AvatarFallback>
                          {student.fullName.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      
                      <div className="space-y-1">
                        <h3 className="font-medium">{student.fullName}</h3>
                        <p className="text-sm text-muted-foreground">{student.email}</p>
                      </div>
                    </div>

                     <div className="flex items-center space-x-4">
                       <div className="text-center">
                         <p className="text-sm font-medium">{student.totalResponses}</p>
                         <p className="text-xs text-muted-foreground">Questionários</p>
                       </div>

                       <div className="text-center">
                         <p className="text-sm font-medium">{student.averageScore}%</p>
                         <p className="text-xs text-muted-foreground">Média</p>
                       </div>

                       {student.lastActivity && (
                         <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                           <Clock className="h-4 w-4" />
                           <span>{student.lastActivity}</span>
                         </div>
                       )}

                       <Badge variant={activityInfo.variant}>
                         {activityInfo.status}
                       </Badge>
                     </div>
                  </div>
                );
              })}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Acompanhamento;