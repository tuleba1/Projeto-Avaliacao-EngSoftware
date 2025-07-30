import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';

export interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
}

export const useQuestionnaire = () => {
  const { user } = useAuth();
  const [submitting, setSubmitting] = useState(false);

  const submitQuestionnaireResponse = async (
    subjectCode: string,
    score: number,
    totalQuestions: number
  ) => {
    if (!user) {
      toast.error('Usuário não autenticado');
      return false;
    }

    try {
      setSubmitting(true);

      // Buscar o questionário da matéria
      const { data: questionnaires, error: questionnaireError } = await supabase
        .from('questionnaires')
        .select(`
          id,
          subjects!inner(code)
        `)
        .eq('subjects.code', subjectCode)
        .limit(1);

      if (questionnaireError) throw questionnaireError;

      if (!questionnaires || questionnaires.length === 0) {
        throw new Error(`Questionário não encontrado para a matéria: ${subjectCode}`);
      }

      const questionnaireId = questionnaires[0].id;

      // Inserir a resposta do questionário
      const { error: responseError } = await supabase
        .from('questionnaire_responses')
        .insert({
          user_id: user.id,
          questionnaire_id: questionnaireId,
          score,
          total_questions: totalQuestions
        });

      if (responseError) throw responseError;

      const percentage = Math.round((score / totalQuestions) * 100);
      
      toast.success(
        `Questionário concluído! Sua pontuação: ${score}/${totalQuestions} (${percentage}%)`,
        {
          duration: 4000,
        }
      );

      return true;
    } catch (error) {
      console.error('Error submitting questionnaire response:', error);
      toast.error(
        error instanceof Error 
          ? error.message 
          : 'Erro ao salvar resposta do questionário'
      );
      return false;
    } finally {
      setSubmitting(false);
    }
  };

  return {
    submitQuestionnaireResponse,
    submitting
  };
};