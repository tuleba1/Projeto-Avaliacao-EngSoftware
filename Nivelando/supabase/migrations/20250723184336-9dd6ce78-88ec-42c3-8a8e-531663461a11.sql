-- Create subjects table
CREATE TABLE public.subjects (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  code TEXT NOT NULL UNIQUE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create questionnaires table
CREATE TABLE public.questionnaires (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  subject_id UUID NOT NULL REFERENCES public.subjects(id),
  name TEXT NOT NULL,
  total_questions INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create questionnaire responses table
CREATE TABLE public.questionnaire_responses (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  questionnaire_id UUID NOT NULL REFERENCES public.questionnaires(id),
  score INTEGER NOT NULL CHECK (score >= 0),
  total_questions INTEGER NOT NULL CHECK (total_questions > 0),
  percentage DECIMAL(5,2) NOT NULL GENERATED ALWAYS AS (
    CASE 
      WHEN total_questions > 0 THEN ROUND((score::decimal / total_questions::decimal) * 100, 2)
      ELSE 0
    END
  ) STORED,
  completed_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  year INTEGER NOT NULL DEFAULT EXTRACT(YEAR FROM now()),
  month INTEGER NOT NULL DEFAULT EXTRACT(MONTH FROM now())
);

-- Create performance summary table for monthly tracking
CREATE TABLE public.performance_summary (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  subject_id UUID NOT NULL REFERENCES public.subjects(id),
  year INTEGER NOT NULL,
  month INTEGER NOT NULL,
  total_responses INTEGER NOT NULL DEFAULT 0,
  average_percentage DECIMAL(5,2) NOT NULL DEFAULT 0,
  best_score DECIMAL(5,2) NOT NULL DEFAULT 0,
  total_questions_answered INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(user_id, subject_id, year, month)
);

-- Enable RLS on all tables
ALTER TABLE public.subjects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.questionnaires ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.questionnaire_responses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.performance_summary ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for subjects (public read)
CREATE POLICY "Anyone can view subjects" ON public.subjects FOR SELECT USING (true);

-- Create RLS policies for questionnaires (public read)
CREATE POLICY "Anyone can view questionnaires" ON public.questionnaires FOR SELECT USING (true);

-- Create RLS policies for questionnaire_responses
CREATE POLICY "Users can view their own responses" ON public.questionnaire_responses 
FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own responses" ON public.questionnaire_responses 
FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Create RLS policies for performance_summary
CREATE POLICY "Users can view their own performance" ON public.performance_summary 
FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own performance" ON public.performance_summary 
FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own performance" ON public.performance_summary 
FOR UPDATE USING (auth.uid() = user_id);

-- Insert sample subjects based on common Brazilian curriculum
INSERT INTO public.subjects (name, code) VALUES 
('Matemática', 'MAT'),
('Português', 'POR'),
('História', 'HIS'),
('Geografia', 'GEO'),
('Ciências', 'CIE'),
('Física', 'FIS'),
('Química', 'QUI'),
('Biologia', 'BIO'),
('Inglês', 'ING'),
('Educação Física', 'EDF');

-- Insert sample questionnaires
INSERT INTO public.questionnaires (subject_id, name, total_questions) 
SELECT s.id, s.name || ' - Questionário Básico', 10
FROM public.subjects s;

-- Create function to update performance summary
CREATE OR REPLACE FUNCTION update_performance_summary()
RETURNS TRIGGER AS $$
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
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger to automatically update performance summary
CREATE TRIGGER update_performance_summary_trigger
  AFTER INSERT ON public.questionnaire_responses
  FOR EACH ROW
  EXECUTE FUNCTION update_performance_summary();