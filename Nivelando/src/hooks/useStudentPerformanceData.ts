import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

export interface SubjectPerformanceData {
  id: string;
  name: string;
  code: string;
  averageScore: number;
  totalResponses: number;
  totalStudents: number;
  color: string;
}

export const useStudentPerformanceData = () => {
  const [performanceData, setPerformanceData] = useState<SubjectPerformanceData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const getColorForPerformance = (percentage: number): string => {
    if (percentage >= 80) return 'hsl(var(--chart-1))'; // Verde
    if (percentage >= 60) return 'hsl(var(--chart-2))'; // Amarelo
    return 'hsl(var(--destructive))'; // Vermelho
  };

  useEffect(() => {
    const fetchStudentPerformanceData = async () => {
      try {
        setLoading(true);
        setError(null);

        // Buscar todas as matérias
        const { data: subjects, error: subjectsError } = await supabase
          .from('subjects')
          .select('*')
          .order('name');

        if (subjectsError) throw subjectsError;

        // Buscar todos os estudantes cadastrados
        const { data: allStudents, error: studentsError } = await supabase
          .from('profiles')
          .select('id')
          .eq('role', 'student');

        if (studentsError) throw studentsError;

        const totalStudents = allStudents?.length || 0;

        // Buscar dados de performance agregados por matéria
        const { data: responses, error: responsesError } = await supabase
          .from('questionnaire_responses')
          .select(`
            user_id,
            percentage,
            questionnaires!inner(
              subject_id,
              subjects!inner(
                id,
                name,
                code
              )
            )
          `);

        if (responsesError) throw responsesError;

        // Agrupar dados por matéria
        const subjectMap = new Map<string, {
          id: string;
          name: string;
          code: string;
          totalScore: number;
          totalResponses: number;
          uniqueStudents: Set<string>;
        }>();

        responses?.forEach(response => {
          const subject = response.questionnaires?.subjects;
          if (subject) {
            const subjectId = subject.id;
            
            if (!subjectMap.has(subjectId)) {
              subjectMap.set(subjectId, {
                id: subject.id,
                name: subject.name,
                code: subject.code,
                totalScore: 0,
                totalResponses: 0,
                uniqueStudents: new Set()
              });
            }

            const subjectData = subjectMap.get(subjectId)!;
            subjectData.totalScore += response.percentage;
            subjectData.totalResponses += 1;
            subjectData.uniqueStudents.add(response.user_id);
          }
        });

        // Converter para formato final baseado apenas nas respostas efetivas
        const performanceArray: SubjectPerformanceData[] = Array.from(subjectMap.values()).map(subject => {
          // Calcular média baseada apenas nas respostas dos estudantes que responderam
          const studentsWhoResponded = subject.uniqueStudents.size;
          
          // Média baseada apenas nas respostas efetivas (não considera alunos que não responderam)
          const averageScore = subject.totalResponses > 0 ? Math.round(subject.totalScore / subject.totalResponses) : 0;
          
          return {
            id: subject.id,
            name: subject.name,
            code: subject.code,
            averageScore,
            totalResponses: subject.totalResponses,
            totalStudents,
            color: getColorForPerformance(averageScore)
          };
        });

        // Incluir matérias sem respostas
        subjects?.forEach(subject => {
          if (!subjectMap.has(subject.id)) {
            performanceArray.push({
              id: subject.id,
              name: subject.name,
              code: subject.code,
              averageScore: 0,
              totalResponses: 0,
              totalStudents,
              color: getColorForPerformance(0)
            });
          }
        });

        // Ordenar por nome
        performanceArray.sort((a, b) => a.name.localeCompare(b.name));

        setPerformanceData(performanceArray);

      } catch (err) {
        console.error('Erro ao buscar dados de performance dos estudantes:', err);
        setError('Erro ao carregar dados de performance');
      } finally {
        setLoading(false);
      }
    };

    fetchStudentPerformanceData();
  }, []);

  return {
    performanceData,
    loading,
    error
  };
};