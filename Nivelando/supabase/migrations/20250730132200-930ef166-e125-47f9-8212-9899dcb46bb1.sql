-- Adicionar política para professores visualizarem respostas dos estudantes
CREATE POLICY "Teachers can view all student responses" 
ON public.questionnaire_responses 
FOR SELECT 
USING (get_current_user_role() = 'teacher');