-- Create user profiles table
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL UNIQUE,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  role TEXT NOT NULL CHECK (role IN ('student', 'teacher')),
  enrollment TEXT,
  grade TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create subjects table
CREATE TABLE public.subjects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  code TEXT NOT NULL UNIQUE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create questionnaires table
CREATE TABLE public.questionnaires (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  subject_id UUID REFERENCES public.subjects(id) ON DELETE CASCADE NOT NULL,
  created_by UUID REFERENCES public.profiles(user_id) ON DELETE CASCADE NOT NULL,
  questions JSONB NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create questionnaire responses table
CREATE TABLE public.questionnaire_responses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  questionnaire_id UUID REFERENCES public.questionnaires(id) ON DELETE CASCADE NOT NULL,
  user_id UUID REFERENCES public.profiles(user_id) ON DELETE CASCADE NOT NULL,
  answers JSONB NOT NULL,
  score DECIMAL(5,2),
  completed_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(questionnaire_id, user_id)
);

-- Create student performance table
CREATE TABLE public.student_performance (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.profiles(user_id) ON DELETE CASCADE NOT NULL,
  subject_id UUID REFERENCES public.subjects(id) ON DELETE CASCADE NOT NULL,
  score DECIMAL(5,2) NOT NULL,
  month INTEGER NOT NULL CHECK (month >= 1 AND month <= 12),
  year INTEGER NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(user_id, subject_id, month, year)
);

-- Enable RLS on all tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.subjects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.questionnaires ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.questionnaire_responses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.student_performance ENABLE ROW LEVEL SECURITY;

-- Create policies for profiles
CREATE POLICY "Users can view all profiles" 
ON public.profiles FOR SELECT 
USING (true);

CREATE POLICY "Users can update their own profile" 
ON public.profiles FOR UPDATE 
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own profile" 
ON public.profiles FOR INSERT 
WITH CHECK (auth.uid() = user_id);


CREATE POLICY "Anyone can view subjects" 
ON public.subjects FOR SELECT 
USING (true);

CREATE POLICY "Teachers can manage subjects" 
ON public.subjects FOR ALL 
USING (
  EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE user_id = auth.uid() AND role = 'teacher'
  )
);


CREATE POLICY "Anyone can view questionnaires" 
ON public.questionnaires FOR SELECT 
USING (true);

CREATE POLICY "Teachers can manage questionnaires" 
ON public.questionnaires FOR ALL 
USING (
  EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE user_id = auth.uid() AND role = 'teacher'
  )
);

-- Create policies for questionnaire responses
CREATE POLICY "Users can view their own responses" 
ON public.questionnaire_responses FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Teachers can view all responses" 
ON public.questionnaire_responses FOR SELECT 
USING (
  EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE user_id = auth.uid() AND role = 'teacher'
  )
);

CREATE POLICY "Students can create responses" 
ON public.questionnaire_responses FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Students can update their responses" 
ON public.questionnaire_responses FOR UPDATE 
USING (auth.uid() = user_id);

-- Create policies for student performance
CREATE POLICY "Students can view their own performance" 
ON public.student_performance FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Teachers can view all performance" 
ON public.student_performance FOR SELECT 
USING (
  EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE user_id = auth.uid() AND role = 'teacher'
  )
);

CREATE POLICY "Teachers can manage performance" 
ON public.student_performance FOR ALL 
USING (
  EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE user_id = auth.uid() AND role = 'teacher'
  )
);

-- Create function to handle new user registration
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (user_id, name, email, role)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'name', NEW.email),
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'role', 'student')
  );
  RETURN NEW;
END;
$$;

-- Create trigger for new user registration
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for timestamp updates
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_questionnaires_updated_at
  BEFORE UPDATE ON public.questionnaires
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Insert sample subjects
INSERT INTO public.subjects (name, code) VALUES
('Matemática', 'MAT'),
('Física', 'FIS'),
('História', 'HIS'),
('Inglês', 'ING'),
('Artes Visuais', 'ART'),
('Biologia', 'BIO'),
('Educação Física', 'EDF');

-- Insert sample questionnaire for Mathematics
INSERT INTO public.questionnaires (title, subject_id, created_by, questions) 
SELECT 
  'Questionário de Matemática - Nível Básico',
  s.id,
  '00000000-0000-0000-0000-000000000000',
  '[
    {
      "id": 1,
      "question": "Qual é o resultado de 2 + 2?",
      "options": ["3", "4", "5", "6"],
      "correct": 1
    },
    {
      "id": 2,
      "question": "Qual é o resultado de 5 × 3?",
      "options": ["12", "15", "18", "20"],
      "correct": 1
    },
    {
      "id": 3,
      "question": "Qual é a raiz quadrada de 16?",
      "options": ["2", "4", "6", "8"],
      "correct": 1
    }
  ]'::jsonb
FROM public.subjects s WHERE s.code = 'MAT';