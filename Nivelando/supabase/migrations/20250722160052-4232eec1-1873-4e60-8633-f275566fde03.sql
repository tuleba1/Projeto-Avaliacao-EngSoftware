-- Fix the questionnaire creation by removing the sample data that caused the foreign key error
-- The tables are already created, we just need to add sample data properly later

-- Create a sample questionnaire without the created_by field for now
-- We'll populate it properly when users are created