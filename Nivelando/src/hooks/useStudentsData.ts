import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

export interface StudentData {
  id: string;
  email: string;
  fullName: string;
  totalResponses: number;
  averageScore: number;
  lastActivity: string | null;
  subjects: {
    [subjectId: string]: {
      name: string;
      responses: number;
      averageScore: number;
    };
  };
}

export const useStudentsData = () => {
  const [students, setStudents] = useState<StudentData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStudentsData = async () => {
      try {
        setLoading(true);
        setError(null);

        // Buscar todos os perfis de estudantes
        const { data: profiles, error: profilesError } = await supabase
          .from('profiles')
          .select('*')
          .eq('role', 'student')
          .order('full_name');

        if (profilesError) throw profilesError;

        // Buscar todas as respostas dos estudantes
        const { data: responses, error: responsesError } = await supabase
          .from('questionnaire_responses')
          .select(`
            user_id,
            percentage,
            completed_at,
            questionnaires!inner(
              subject_id,
              subjects!inner(
                id,
                name
              )
            )
          `)
          .order('completed_at', { ascending: false });

        if (responsesError) throw responsesError;

        // Processar dados dos estudantes
        const studentsWithStats: StudentData[] = profiles?.map(profile => {
          const studentResponses = responses?.filter(r => r.user_id === profile.id) || [];
          
          // Agrupar por matéria
          const subjectsMap = new Map<string, {
            name: string;
            scores: number[];
            totalResponses: number;
          }>();

          studentResponses.forEach(response => {
            const subject = response.questionnaires?.subjects;
            if (subject) {
              if (!subjectsMap.has(subject.id)) {
                subjectsMap.set(subject.id, {
                  name: subject.name,
                  scores: [],
                  totalResponses: 0
                });
              }
              const subjectData = subjectsMap.get(subject.id)!;
              subjectData.scores.push(response.percentage);
              subjectData.totalResponses += 1;
            }
          });

          // Calcular estatísticas por matéria
          const subjects: StudentData['subjects'] = {};
          subjectsMap.forEach((data, subjectId) => {
            subjects[subjectId] = {
              name: data.name,
              responses: data.totalResponses,
              averageScore: Math.round(data.scores.reduce((acc, score) => acc + score, 0) / data.scores.length)
            };
          });

          // Calcular estatísticas gerais
          const totalResponses = studentResponses.length;
          const averageScore = totalResponses > 0 
            ? Math.round(studentResponses.reduce((acc, r) => acc + r.percentage, 0) / totalResponses)
            : 0;
          
          const lastActivity = studentResponses.length > 0 
            ? studentResponses[0].completed_at 
            : null;

          return {
            id: profile.id,
            email: profile.email || 'Sem email',
            fullName: profile.full_name || 'Nome não informado',
            totalResponses,
            averageScore,
            lastActivity: lastActivity 
              ? new Date(lastActivity).toLocaleDateString('pt-BR')
              : null,
            subjects
          };
        }) || [];

        setStudents(studentsWithStats);

      } catch (err) {
        console.error('Erro ao buscar dados dos estudantes:', err);
        setError('Erro ao carregar dados dos estudantes');
      } finally {
        setLoading(false);
      }
    };

    fetchStudentsData();
  }, []);

  return {
    students,
    loading,
    error
  };
};