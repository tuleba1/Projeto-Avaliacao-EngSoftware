import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface TeacherStats {
  totalStudents: number;
  totalQuestionnaires: number;
  averagePerformance: number;
}

interface RecentActivity {
  id: string;
  studentName: string;
  subjectName: string;
  percentage: number;
  completedAt: string;
}

export const useTeacherDashboard = () => {
  const [stats, setStats] = useState<TeacherStats>({
    totalStudents: 0,
    totalQuestionnaires: 0,
    averagePerformance: 0
  });
  const [recentActivities, setRecentActivities] = useState<RecentActivity[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchTeacherData();
  }, []);

  const fetchTeacherData = async () => {
    try {
      setLoading(true);
      setError(null);

      // Buscar total de alunos únicos
      const { data: studentsData, error: studentsError } = await supabase
        .from('profiles')
        .select('id')
        .eq('role', 'student');

      if (studentsError) throw studentsError;

      const totalStudents = studentsData?.length || 0;

      // Buscar total de questionários respondidos
      const { data: questionnairesData, error: questionnairesError } = await supabase
        .from('questionnaire_responses')
        .select('id');

      if (questionnairesError) throw questionnairesError;

      const totalQuestionnaires = questionnairesData?.length || 0;

      // Buscar aproveitamento médio geral
      const { data: performanceData, error: performanceError } = await supabase
        .from('questionnaire_responses')
        .select('percentage');

      if (performanceError) throw performanceError;

      const averagePerformance = performanceData && performanceData.length > 0
        ? Math.round(performanceData.reduce((acc, item) => acc + item.percentage, 0) / performanceData.length)
        : 0;

      setStats({
        totalStudents,
        totalQuestionnaires,
        averagePerformance
      });

      // Buscar atividades recentes com nomes dos estudantes
      const { data: recentData, error: recentError } = await supabase
        .from('questionnaire_responses')
        .select(`
          id,
          user_id,
          percentage,
          completed_at,
          questionnaires!inner(
            name,
            subjects!inner(
              name
            )
          )
        `)
        .order('completed_at', { ascending: false })
        .limit(5);

      if (recentError) throw recentError;

      // Buscar os nomes dos estudantes
      const activities: RecentActivity[] = [];
      
      if (recentData) {
        for (const item of recentData) {
          const { data: profile } = await supabase
            .from('profiles')
            .select('full_name, email')
            .eq('id', item.user_id)
            .single();
          
          activities.push({
            id: item.id,
            studentName: profile?.full_name || profile?.email || `Usuário ${item.user_id.substring(0, 8)}`,
            subjectName: item.questionnaires?.subjects?.name || 'Matéria',
            percentage: item.percentage,
            completedAt: item.completed_at
          });
        }
      }

      setRecentActivities(activities);

    } catch (err) {
      console.error('Erro ao buscar dados do dashboard:', err);
      setError('Erro ao carregar dados do dashboard');
    } finally {
      setLoading(false);
    }
  };

  return {
    stats,
    recentActivities,
    loading,
    error,
    refetch: fetchTeacherData
  };
};