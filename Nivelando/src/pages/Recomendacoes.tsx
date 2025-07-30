import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { useAuth } from '@/contexts/AuthContext';
import { useRecommendations } from '@/hooks/useRecommendations';
import { formatDistanceToNow } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { Eye, BookOpen } from 'lucide-react';

const Recomendacoes = () => {
  const { user } = useAuth();
  const { recommendations, loading, markAsRead } = useRecommendations();

  const handleMarkAsRead = async (recommendationId: string) => {
    await markAsRead(recommendationId);
  };

  return (
    <div className="flex-1 p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">Recomendações</h1>
        <p className="text-muted-foreground">
          {user?.role === 'student' 
            ? 'Recomendações personalizadas de estudo dos seus professores'
            : 'Recomendações enviadas para seus alunos'
          }
        </p>
      </div>

      {loading ? (
        <div className="space-y-4">
          {[...Array(3)].map((_, i) => (
            <Card key={i}>
              <CardHeader>
                <Skeleton className="h-5 w-48" />
                <Skeleton className="h-4 w-32" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-3/4" />
              </CardContent>
            </Card>
          ))}
        </div>
      ) : recommendations.length > 0 ? (
        <div className="space-y-4">
          {recommendations.map((recommendation) => (
            <Card key={recommendation.id} className={recommendation.is_read ? 'opacity-75' : ''}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <BookOpen className="h-5 w-5" />
                      {recommendation.title}
                      {!recommendation.is_read && user?.role === 'student' && (
                        <Badge variant="destructive" className="text-xs">Nova</Badge>
                      )}
                    </CardTitle>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <span>
                        {formatDistanceToNow(new Date(recommendation.created_at), {
                          addSuffix: true,
                          locale: ptBR
                        })}
                      </span>
                      {recommendation.subjects ? (
                        <>
                          <span>•</span>
                          <span>{recommendation.subjects.name}</span>
                        </>
                      ) : (
                        <>
                          <span>•</span>
                          <span>Recomendação Geral</span>
                        </>
                      )}
                    </div>
                  </div>
                  {!recommendation.is_read && user?.role === 'student' && (
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleMarkAsRead(recommendation.id)}
                    >
                      <Eye className="h-4 w-4 mr-1" />
                      Marcar como lida
                    </Button>
                  )}
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground whitespace-pre-wrap">
                  {recommendation.message}
                </p>
                {recommendation.read_at && (
                  <p className="text-xs text-muted-foreground mt-2">
                    Lida {formatDistanceToNow(new Date(recommendation.read_at), {
                      addSuffix: true,
                      locale: ptBR
                    })}
                  </p>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card>
          <CardContent className="p-6 text-center">
            <BookOpen className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
            <p className="text-muted-foreground">
              {user?.role === 'student' 
                ? 'Você ainda não recebeu nenhuma recomendação dos seus professores.'
                : 'Você ainda não enviou nenhuma recomendação para seus alunos.'
              }
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default Recomendacoes;