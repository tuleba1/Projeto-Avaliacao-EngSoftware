import { useState } from 'react';

export const useMockData = () => {
  const [subjects] = useState([
    { id: '1', name: 'Matemática', code: 'MAT' },
    { id: '2', name: 'Física', code: 'FIS' },
    { id: '3', name: 'História', code: 'HIS' },
    { id: '4', name: 'Inglês', code: 'ING' },
    { id: '5', name: 'Artes Visuais', code: 'ART' },
  ]);

  const [performance] = useState([
    { subject: 'Artes Visuais', score: 94.1, color: 'bg-purple-500' },
    { subject: 'Física', score: 80.0, color: 'bg-pink-500' },
    { subject: 'História', score: 86.0, color: 'bg-yellow-500' },
    { subject: 'Inglês', score: 98.0, color: 'bg-green-500' },
  ]);

  const [teacherStats] = useState({
    totalStudents: 45,
    totalQuestionnaires: 12,
    averagePerformance: 85.5,
  });

  const [studentActivities] = useState([
    { student: 'Ana Silva', activity: 'Completou questionário de Matemática', time: '2 horas atrás' },
    { student: 'João Santos', activity: 'Iniciou teste de Física', time: '3 horas atrás' },
    { student: 'Maria Costa', activity: 'Finalizou exercícios de História', time: '4 horas atrás' },
    { student: 'Pedro Lima', activity: 'Acessou material de Inglês', time: '5 horas atrás' },
  ]);

  return { subjects, performance, teacherStats, studentActivities };
};