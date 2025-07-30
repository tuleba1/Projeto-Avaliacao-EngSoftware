-- Drop trigger first, then function
DROP TRIGGER IF EXISTS update_recommendation_read_at_trigger ON public.recommendations;
DROP FUNCTION IF EXISTS public.update_recommendation_read_at();
DROP FUNCTION IF EXISTS public.update_performance_summary();

-- Recreate update_recommendation_read_at function with proper security
CREATE OR REPLACE FUNCTION public.update_recommendation_read_at()
RETURNS TRIGGER 
LANGUAGE plpgsql 
SECURITY DEFINER 
SET search_path = ''
AS $$
BEGIN
  IF NEW.is_read = true AND OLD.is_read = false THEN
    NEW.read_at = now();
  END IF;
  RETURN NEW;
END;
$$;

-- Recreate the trigger
CREATE TRIGGER update_recommendation_read_at_trigger
BEFORE UPDATE ON public.recommendations
FOR EACH ROW
EXECUTE FUNCTION public.update_recommendation_read_at();

-- Recreate update_performance_summary function with proper security
CREATE OR REPLACE FUNCTION public.update_performance_summary()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
BEGIN
  INSERT INTO public.performance_summary (
    user_id, 
    subject_id, 
    year, 
    month, 
    total_responses, 
    average_percentage, 
    best_score, 
    total_questions_answered
  )
  SELECT 
    NEW.user_id,
    q.subject_id,
    NEW.year,
    NEW.month,
    COUNT(*) as total_responses,
    ROUND(AVG(qr.percentage), 2) as average_percentage,
    ROUND(MAX(qr.percentage), 2) as best_score,
    SUM(qr.total_questions) as total_questions_answered
  FROM public.questionnaire_responses qr
  JOIN public.questionnaires q ON qr.questionnaire_id = q.id
  WHERE qr.user_id = NEW.user_id 
    AND q.subject_id = (SELECT subject_id FROM public.questionnaires WHERE id = NEW.questionnaire_id)
    AND qr.year = NEW.year 
    AND qr.month = NEW.month
  GROUP BY q.subject_id
  ON CONFLICT (user_id, subject_id, year, month) 
  DO UPDATE SET
    total_responses = EXCLUDED.total_responses,
    average_percentage = EXCLUDED.average_percentage,
    best_score = EXCLUDED.best_score,
    total_questions_answered = EXCLUDED.total_questions_answered,
    updated_at = now();
    
  RETURN NEW;
END;
$$;