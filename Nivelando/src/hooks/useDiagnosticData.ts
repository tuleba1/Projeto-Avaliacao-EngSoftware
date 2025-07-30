import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

export interface DiagnosticChartData {
  month: string;
  percentage: number;
  isLowPerformance: boolean;
}

export interface DiagnosticTableData {
  subject: string;
  code: string;
  score: number;
  percentage: number;
  diagnosis: 'Alto' | 'Médio' | 'Baixo' | 'Sem dados';
  totalResponses: number;
  recommendation: string;
}

export const useDiagnosticData = () => {
  const [chartData, setChartData] = useState<DiagnosticChartData[]>([]);
  const [tableData, setTableData] = useState<DiagnosticTableData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();

  const getDiagnosis = (percentage: number, hasResponses: boolean): 'Alto' | 'Médio' | 'Baixo' | 'Sem dados' => {
    if (!hasResponses) return 'Sem dados';
    if (percentage >= 80) return 'Alto';
    if (percentage >= 60) return 'Médio';
    return 'Baixo';
  };

  const getRecommendation = (diagnosis: string, subject: string): string => {
    if (diagnosis === 'Sem dados') return 'Complete questionários para receber recomendações.';
    if (diagnosis === 'Alto') return 'Excelente desempenho! Continue praticando exercícios avançados.';
    if (diagnosis === 'Médio') return 'Bom desempenho. Pratique exercícios de nível intermediário.';
    return `Baixo desempenho em ${subject}. Reforce o conteúdo básico e faça exercícios fundamentais.`;
  };

  useEffect(() => {
    const fetchDiagnosticData = async () => {
      if (!user) return;

      try {
        setLoading(true);

        // Buscar dados de performance dos últimos 6 meses
        const currentDate = new Date();
        const monthsData: DiagnosticChartData[] = [];
        
        for (let i = 5; i >= 0; i--) {
          const date = new Date(currentDate.getFullYear(), currentDate.getMonth() - i, 1);
          const year = date.getFullYear();
          const month = date.getMonth() + 1;
          
          const { data: performanceData } = await supabase
            .from('performance_summary')
            .select('average_percentage')
            .eq('user_id', user.id)
            .eq('year', year)
            .eq('month', month);

          const averagePercentage = performanceData && performanceData.length > 0 
            ? performanceData.reduce((sum, item) => sum + item.average_percentage, 0) / performanceData.length 
            : 0;

          monthsData.push({
            month: date.toLocaleDateString('pt-BR', { month: 'short', year: 'numeric' }),
            percentage: Math.round(averagePercentage),
            isLowPerformance: averagePercentage < 60
          });
        }

        setChartData(monthsData);

        // Buscar dados das matérias para a tabela
        const { data: subjects, error: subjectsError } = await supabase
          .from('subjects')
          .select('*')
          .order('name');

        if (subjectsError) throw subjectsError;

        // Buscar performance atual de cada matéria
        const currentYear = new Date().getFullYear();
        const currentMonth = new Date().getMonth() + 1;

        const { data: performanceData, error: performanceError } = await supabase
          .from('performance_summary')
          .select('*')
          .eq('user_id', user.id)
          .eq('year', currentYear)
          .eq('month', currentMonth);

        if (performanceError) throw performanceError;

        const performanceMap = new Map(
          performanceData?.map(p => [p.subject_id, p]) || []
        );

        const tableData: DiagnosticTableData[] = subjects?.map(subject => {
          const performance = performanceMap.get(subject.id);
          const percentage = performance?.average_percentage || 0;
          const totalResponses = performance?.total_responses || 0;
          const hasResponses = totalResponses > 0;
          const diagnosis = getDiagnosis(percentage, hasResponses);

          return {
            subject: subject.name,
            code: subject.code,
            score: hasResponses ? Math.round((percentage / 10)) : 0, // Convert percentage to 0-10 scale
            percentage,
            diagnosis,
            totalResponses,
            recommendation: getRecommendation(diagnosis, subject.name)
          };
        }) || [];

        setTableData(tableData);
      } catch (err) {
        console.error('Error fetching diagnostic data:', err);
        setError(err instanceof Error ? err.message : 'Erro ao carregar dados de diagnóstico');
      } finally {
        setLoading(false);
      }
    };

    fetchDiagnosticData();
  }, [user]);

  return { chartData, tableData, loading, error };
};