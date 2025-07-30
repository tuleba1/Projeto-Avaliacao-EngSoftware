-- Adicionar política para professores visualizarem resumo de performance dos estudantes
CREATE POLICY "Teachers can view all student performance summaries" 
ON public.performance_summary 
FOR SELECT 
USING (get_current_user_role() = 'teacher');