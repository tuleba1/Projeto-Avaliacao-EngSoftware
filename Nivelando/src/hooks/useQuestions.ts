import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

export interface Question {
  id?: string;
  questionText: string;
  optionA: string;
  optionB: string;
  optionC: string;
  optionD: string;
  correctOption: 'A' | 'B' | 'C' | 'D';
}

export const useQuestions = (questionnaireId?: string) => {
  const { user } = useAuth();
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Buscar questões de um questionário específico
  const fetchQuestions = async (id: string) => {
    if (!id) return;

    try {
      setLoading(true);
      setError(null);

      const { data, error: questionsError } = await supabase
        .from('questions')
        .select('*')
        .eq('questionnaire_id', id)
        .order('created_at');

      if (questionsError) throw questionsError;

      const formattedQuestions: Question[] = data?.map(q => ({
        id: q.id,
        questionText: q.question_text,
        optionA: q.option_a,
        optionB: q.option_b,
        optionC: q.option_c,
        optionD: q.option_d,
        correctOption: q.correct_option as 'A' | 'B' | 'C' | 'D'
      })) || [];

      setQuestions(formattedQuestions);

    } catch (err) {
      console.error('Erro ao buscar questões:', err);
      setError('Erro ao carregar questões');
    } finally {
      setLoading(false);
    }
  };

  // Adicionar nova questão
  const addQuestion = async (questionnaireId: string, question: Question) => {
    if (!user) {
      setError('Usuário não autenticado');
      return false;
    }

    try {
      setError(null);

      const { error: insertError } = await supabase
        .from('questions')
        .insert({
          questionnaire_id: questionnaireId,
          question_text: question.questionText,
          option_a: question.optionA,
          option_b: question.optionB,
          option_c: question.optionC,
          option_d: question.optionD,
          correct_option: question.correctOption,
          created_by: user.id
        });

      if (insertError) throw insertError;

      // Recarregar questões
      await fetchQuestions(questionnaireId);
      
      return true;

    } catch (err) {
      console.error('Erro ao adicionar questão:', err);
      setError('Erro ao adicionar questão');
      return false;
    }
  };

  // Carregar questões quando o questionnaireId mudar
  useEffect(() => {
    if (questionnaireId) {
      fetchQuestions(questionnaireId);
    }
  }, [questionnaireId]);

  return {
    questions,
    loading,
    error,
    fetchQuestions,
    addQuestion
  };
};