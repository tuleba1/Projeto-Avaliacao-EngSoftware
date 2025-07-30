import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calculator, Languages, BookOpen, Globe, Dna, Beaker, PenTool, Feather, Headphones, HelpCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface Subject {
  id: string;
  name: string;
  icon: React.ComponentType<any>;
  color: string;
  available: boolean;
}

const Questionario = () => {
  const navigate = useNavigate();
  
  const subjects: Subject[] = [
    { id: 'matematica', name: 'Matemática', icon: Calculator, color: 'bg-blue-500', available: true },
    { id: 'portugues', name: 'Português', icon: Languages, color: 'bg-blue-500', available: true },
    { id: 'historia', name: 'História', icon: BookOpen, color: 'bg-blue-500', available: true },
    { id: 'geografia', name: 'Geografia', icon: Globe, color: 'bg-blue-500', available: true },
    { id: 'biologia', name: 'Biologia', icon: Dna, color: 'bg-blue-500', available: true },
    { id: 'fisica', name: 'Física', icon: Beaker, color: 'bg-blue-500', available: true },
    { id: 'quimica', name: 'Química', icon: PenTool, color: 'bg-blue-500', available: true },
    { id: 'redacao', name: 'Redação', icon: Feather, color: 'bg-blue-500', available: true },
    { id: 'ingles', name: 'Inglês', icon: Headphones, color: 'bg-blue-500', available: true },
    { id: 'filosofia', name: 'Filosofia', icon: HelpCircle, color: 'bg-blue-500', available: true },
    { id: 'sociologia', name: 'Sociologia', icon: HelpCircle, color: 'bg-blue-500', available: true },
  ];

  const handleSubjectClick = (subjectId: string) => {
    navigate(`/questionario/${subjectId}`);
  };

  return (
    <div className="flex-1 p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">Selecione uma Matéria para o Questionário</h1>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {subjects.map((subject) => {
          const IconComponent = subject.icon;
          
          return (
            <Card 
              key={subject.id}
              className={`cursor-pointer transition-all hover:scale-105 hover:shadow-lg ${
                subject.available ? '' : 'opacity-50 cursor-not-allowed'
              }`}
              onClick={() => subject.available && handleSubjectClick(subject.id)}
            >
              <CardContent className="flex flex-col items-center justify-center p-6 min-h-[160px]">
                <div className={`${subject.color} text-white p-4 rounded-lg mb-4`}>
                  <IconComponent className="h-8 w-8" />
                </div>
                <h3 className="font-semibold text-center">{subject.name}</h3>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default Questionario;