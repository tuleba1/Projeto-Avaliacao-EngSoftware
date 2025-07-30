-- Create table for teacher recommendations to students
CREATE TABLE public.recommendations (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  teacher_id UUID NOT NULL,
  student_id UUID NOT NULL,
  subject_id UUID REFERENCES public.subjects(id),
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  read_at TIMESTAMP WITH TIME ZONE,
  is_read BOOLEAN NOT NULL DEFAULT false
);

-- Enable Row Level Security
ALTER TABLE public.recommendations ENABLE ROW LEVEL SECURITY;

-- Teachers can create recommendations for any student
CREATE POLICY "Teachers can create recommendations" 
ON public.recommendations 
FOR INSERT 
WITH CHECK (auth.uid() = teacher_id);

-- Teachers can view recommendations they created
CREATE POLICY "Teachers can view their recommendations" 
ON public.recommendations 
FOR SELECT 
USING (auth.uid() = teacher_id);

-- Students can view recommendations sent to them
CREATE POLICY "Students can view their recommendations" 
ON public.recommendations 
FOR SELECT 
USING (auth.uid() = student_id);

-- Students can update read status of their recommendations
CREATE POLICY "Students can update read status" 
ON public.recommendations 
FOR UPDATE 
USING (auth.uid() = student_id)
WITH CHECK (auth.uid() = student_id);

-- Create indexes for better performance
CREATE INDEX idx_recommendations_student_id ON public.recommendations(student_id);
CREATE INDEX idx_recommendations_teacher_id ON public.recommendations(teacher_id);
CREATE INDEX idx_recommendations_created_at ON public.recommendations(created_at);

-- Create function to automatically update read_at when is_read is set to true
CREATE OR REPLACE FUNCTION public.update_recommendation_read_at()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.is_read = true AND OLD.is_read = false THEN
    NEW.read_at = now();
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for automatic read_at update
CREATE TRIGGER update_recommendation_read_at_trigger
BEFORE UPDATE ON public.recommendations
FOR EACH ROW
EXECUTE FUNCTION public.update_recommendation_read_at();