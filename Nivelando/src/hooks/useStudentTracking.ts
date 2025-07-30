import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface StudentProgress {
  id: string;
  userId: string;
  email: string;
  subjectName: string;
  totalQuestions: number;
  correctAnswers: number;
  totalResponses: number;
  averagePerformance: number;
}

export const useStudentTracking = () => {
  const [students, setStudents] = useState<StudentProgress[]>([]);
  const [filteredStudents, setFilteredStudents] = useState<StudentProgress[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchStudentData();
  }, []);

  useEffect(() => {
    if (searchTerm) {
      const filtered = students.filter(student => 
        student.email.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredStudents(filtered);
    } else {
      setFilteredStudents(students);
    }
  }, [searchTerm, students]);

  const fetchStudentData = async () => {
    try {
      setLoading(true);
      setError(null);

      const { data: responseData, error: responseError } = await supabase
        .from('questionnaire_responses')
        .select(`
          user_id,
          score,
          total_questions,
          percentage,
          questionnaires!inner(
            subjects!inner(
              name
            )
          )
        `);

      if (responseError) throw responseError;

      // Buscar informações dos usuários únicos
      const userIds = [...new Set(responseData?.map(item => item.user_id) || [])];
      
      const studentsMap = new Map<string, StudentProgress>();

      // Agrupar dados por usuário e matéria
      responseData?.forEach(response => {
        const userId = response.user_id;
        const subjectName = response.questionnaires?.subjects?.name || 'Matéria Desconhecida';
        const key = `${userId}-${subjectName}`;

        if (!studentsMap.has(key)) {
          studentsMap.set(key, {
            id: key,
            userId,
            email: `usuario${userId.substring(0, 8)}@email.com`,
            subjectName,
            totalQuestions: 0,
            correctAnswers: 0,
            totalResponses: 0,
            averagePerformance: 0
          });
        }

        const student = studentsMap.get(key)!;
        student.totalQuestions += response.total_questions;
        student.correctAnswers += response.score;
        student.totalResponses += 1;
      });

      // Calcular médias
      const studentsArray = Array.from(studentsMap.values()).map(student => ({
        ...student,
        averagePerformance: student.totalResponses > 0 
          ? Math.round((student.correctAnswers / student.totalQuestions) * 100)
          : 0
      }));

      setStudents(studentsArray);
      setFilteredStudents(studentsArray);

    } catch (err) {
      console.error('Erro ao buscar dados dos estudantes:', err);
      setError('Erro ao carregar dados dos estudantes');
    } finally {
      setLoading(false);
    }
  };

  return {
    students: filteredStudents,
    searchTerm,
    setSearchTerm,
    loading,
    error,
    refetch: fetchStudentData
  };
};