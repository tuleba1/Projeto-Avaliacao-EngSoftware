import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

export interface SubjectPerformance {
  id: string;
  name: string;
  code: string;
  percentage: number;
  totalResponses: number;
  status: 'good' | 'poor' | 'none';
  color: string;
}

export const usePerformanceData = () => {
  const [subjectPerformance, setSubjectPerformance] = useState<SubjectPerformance[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();

  const getColorForPerformance = (percentage: number): string => {
    if (percentage >= 80) return 'hsl(var(--chart-1))'; // Verde
    if (percentage >= 60) return 'hsl(var(--chart-2))'; // Amarelo
    return 'hsl(var(--destructive))'; // Vermelho
  };

  const getStatusForPerformance = (percentage: number, hasResponses: boolean): 'good' | 'poor' | 'none' => {
    if (!hasResponses) return 'none';
    return percentage >= 60 ? 'good' : 'poor';
  };

  useEffect(() => {
    const fetchPerformanceData = async () => {
      if (!user) return;

      try {
        setLoading(true);

        // Buscar todas as matérias
        const { data: subjects, error: subjectsError } = await supabase
          .from('subjects')
          .select('*')
          .order('name');

        if (subjectsError) throw subjectsError;

        // Buscar dados de performance do mês atual para o usuário
        const currentYear = new Date().getFullYear();
        const currentMonth = new Date().getMonth() + 1;

        const { data: performanceData, error: performanceError } = await supabase
          .from('performance_summary')
          .select('*')
          .eq('user_id', user.id)
          .eq('year', currentYear)
          .eq('month', currentMonth);

        if (performanceError) throw performanceError;

        // Combinar dados das matérias com dados de performance
        const performanceMap = new Map(
          performanceData?.map(p => [p.subject_id, p]) || []
        );

        const combinedData: SubjectPerformance[] = subjects?.map(subject => {
          const performance = performanceMap.get(subject.id);
          const percentage = performance?.average_percentage || 0;
          const totalResponses = performance?.total_responses || 0;
          const hasResponses = totalResponses > 0;

          return {
            id: subject.id,
            name: subject.name,
            code: subject.code,
            percentage,
            totalResponses,
            status: getStatusForPerformance(percentage, hasResponses),
            color: getColorForPerformance(percentage)
          };
        }) || [];

        setSubjectPerformance(combinedData);
      } catch (err) {
        console.error('Error fetching performance data:', err);
        setError(err instanceof Error ? err.message : 'Erro ao carregar dados de desempenho');
      } finally {
        setLoading(false);
      }
    };

    fetchPerformanceData();
  }, [user]);

  return { subjectPerformance, loading, error };
};