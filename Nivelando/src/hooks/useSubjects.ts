import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface Subject {
  id: string;
  name: string;
  code: string;
}

export const useSubjects = () => {
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSubjects();
  }, []);

  const fetchSubjects = async () => {
    try {
      setLoading(true);
      
      const { data, error } = await supabase
        .from('subjects')
        .select('*')
        .order('name');

      if (error) throw error;
      setSubjects(data || []);
    } catch (error) {
      console.error('Error fetching subjects:', error);
    } finally {
      setLoading(false);
    }
  };

  return {
    subjects,
    loading,
    refetch: fetchSubjects
  };
};