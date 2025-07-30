import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';

interface Recommendation {
  id: string;
  teacher_id: string;
  student_id: string;
  subject_id?: string;
  title: string;
  message: string;
  created_at: string;
  read_at?: string;
  is_read: boolean;
  subjects?: {
    name: string;
  };
}

interface Student {
  user_id: string;
  student_name: string;
}

export const useRecommendations = () => {
  const { user } = useAuth();
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (user) {
      fetchData();
    }
  }, [user]);

  const fetchData = async () => {
    try {
      setLoading(true);
      
      if (user?.role === 'teacher') {
        // Fetch recommendations sent by teacher
        const { data: recommendationsData, error: recError } = await supabase
          .from('recommendations')
          .select(`
            *,
            subjects (
              name
            )
          `)
          .eq('teacher_id', user.id)
          .order('created_at', { ascending: false });

        if (recError) throw recError;
        
        // Fetch all students who have answered questionnaires
        const { data: studentsData, error: studentsError } = await supabase
          .from('questionnaire_responses')
          .select('user_id')
          .limit(1000);

        if (studentsError) throw studentsError;

        const uniqueStudents = Array.from(new Set(studentsData?.map(item => item.user_id) || []))
          .map(userId => ({
            user_id: userId,
            student_name: `Estudante ${userId.substring(0, 8)}`
          }));

        setStudents(uniqueStudents);
        setRecommendations(recommendationsData || []);
      } else {
        // Fetch recommendations for student
        const { data: recommendationsData, error: recError } = await supabase
          .from('recommendations')
          .select(`
            *,
            subjects (
              name
            )
          `)
          .eq('student_id', user.id)
          .order('created_at', { ascending: false });

        if (recError) throw recError;
        setRecommendations(recommendationsData || []);
      }
    } catch (error) {
      console.error('Error fetching recommendations:', error);
      toast.error('Erro ao carregar recomendações');
    } finally {
      setLoading(false);
    }
  };

  const sendRecommendation = async (
    studentId: string,
    title: string,
    message: string,
    subjectId?: string
  ) => {
    try {
      setSubmitting(true);

      const { error } = await supabase
        .from('recommendations')
        .insert({
          teacher_id: user?.id,
          student_id: studentId,
          subject_id: subjectId || null,
          title,
          message
        });

      if (error) throw error;

      toast.success('Recomendação enviada com sucesso!');
      await fetchData(); // Refresh data
      return true;
    } catch (error) {
      console.error('Error sending recommendation:', error);
      toast.error('Erro ao enviar recomendação');
      return false;
    } finally {
      setSubmitting(false);
    }
  };

  const markAsRead = async (recommendationId: string) => {
    try {
      const { error } = await supabase
        .from('recommendations')
        .update({ is_read: true })
        .eq('id', recommendationId)
        .eq('student_id', user?.id);

      if (error) throw error;

      // Update local state
      setRecommendations(prev => 
        prev.map(rec => 
          rec.id === recommendationId 
            ? { ...rec, is_read: true, read_at: new Date().toISOString() }
            : rec
        )
      );
    } catch (error) {
      console.error('Error marking as read:', error);
      toast.error('Erro ao marcar como lida');
    }
  };

  return {
    recommendations,
    students,
    loading,
    submitting,
    sendRecommendation,
    markAsRead,
    refetch: fetchData
  };
};