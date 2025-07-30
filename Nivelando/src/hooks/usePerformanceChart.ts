import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

interface ChartData {
  subject: string;
  performance: number;
  responses: number;
  fill: string;
}

export const usePerformanceChart = () => {
  const { user } = useAuth();
  const [chartData, setChartData] = useState<ChartData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (user) {
      fetchChartData();
    }
  }, [user]);

  const fetchChartData = async () => {
    if (!user) return;

    try {
      setLoading(true);
      setError(null);

      const { data, error: chartError } = await supabase
        .from('performance_summary')
        .select(`
          average_percentage,
          total_responses,
          subjects!inner(
            name,
            code
          )
        `)
        .eq('user_id', user.id)
        .eq('year', new Date().getFullYear())
        .eq('month', new Date().getMonth() + 1);

      if (chartError) throw chartError;

      const colors = [
        '#8884d8', '#82ca9d', '#ffc658', '#ff7300', 
        '#8dd1e1', '#d084d0', '#ffb347', '#87ceeb'
      ];

      const formattedData: ChartData[] = data?.map((item, index) => ({
        subject: item.subjects?.code || 'Matéria',
        performance: Math.round(item.average_percentage),
        responses: item.total_responses,
        fill: colors[index % colors.length]
      })) || [];

      setChartData(formattedData);

    } catch (err) {
      console.error('Erro ao buscar dados do gráfico:', err);
      setError('Erro ao carregar dados do gráfico');
    } finally {
      setLoading(false);
    }
  };

  return {
    chartData,
    loading,
    error,
    refetch: fetchChartData
  };
};