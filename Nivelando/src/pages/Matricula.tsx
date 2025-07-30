import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar } from '@/components/ui/calendar';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from '@/hooks/use-toast';

interface Subject {
  id: string;
  code: string;
  name: string;
  teacher: string;
  period: string;
  status: 'MATRICULADO' | 'DISPONÍVEL';
}

const Matricula = () => {
  const { user } = useAuth();
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  
  const [subjects] = useState<Subject[]>([
    { id: '1', code: 'ART101', name: 'Artes Visuais', teacher: 'CARLOS S.', period: '2º ANO', status: 'MATRICULADO' },
    { id: '2', code: 'BIO102', name: 'Biologia', teacher: 'LUCAS C.', period: '2º ANO', status: 'MATRICULADO' },
    { id: '3', code: 'CSN103', name: 'Ciências Naturais', teacher: 'AMANDA T.', period: '2º ANO', status: 'MATRICULADO' },
    { id: '4', code: 'EDF104', name: 'Educação Física', teacher: 'CLARA S.', period: '2º ANO', status: 'MATRICULADO' },
    { id: '5', code: 'FIS105', name: 'Física', teacher: 'MÁRCIO M.', period: '2º ANO', status: 'MATRICULADO' },
    { id: '6', code: 'HIS106', name: 'História', teacher: 'GUSTAVO S.', period: '2º ANO', status: 'MATRICULADO' },
    { id: '7', code: 'ING107', name: 'Inglês I', teacher: 'KELLY P.', period: '2º ANO', status: 'MATRICULADO' },
    { id: '8', code: 'LP0108', name: 'Língua Portuguesa', teacher: 'DIEGO R.', period: '2º ANO', status: 'MATRICULADO' },
  ]);

  const upcomingClasses = [
    { subject: 'FIS105 Física', date: 'HOJE' },
    { subject: 'BIO102 Biologia', date: '7 JUN TER' },
    { subject: 'EDF104 Educação Física', date: '8 JUN QUA' },
    { subject: 'ART101 Artes Visuais', date: '25 JUN QUI' },
  ];

  const handleEnroll = (subjectId: string) => {
    toast({
      title: "Matrícula realizada!",
      description: "Você foi matriculado na disciplina com sucesso.",
    });
  };

  return (
    <div className="flex-1 p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">Matrícula</h1>
        <div className="text-sm text-muted-foreground space-y-1">
          <div>Nome do Aluno: {user?.name}</div>
          <div>Série: {user?.grade}</div>
          <div>Turno: Diurno/Manhã</div>
          <div>Turma: 2º A</div>
        </div>
      </div>

      <div className="flex gap-6">
        <div className="flex-1">
          <div className="mb-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">Cadastro de Disciplinas</h2>
              <Button size="sm" variant="outline">
                Inserir
              </Button>
            </div>
            
            <div className="overflow-hidden border rounded-lg">
              <table className="w-full">
                <thead className="bg-muted">
                  <tr>
                    <th className="text-left p-3 text-sm font-medium">DISCIPLINAS</th>
                    <th className="text-left p-3 text-sm font-medium">CÓDIGO DA DISCIPLINA</th>
                    <th className="text-left p-3 text-sm font-medium">PERÍODO</th>
                    <th className="text-left p-3 text-sm font-medium">PROFESSOR (A)</th>
                    <th className="text-left p-3 text-sm font-medium">STATUS</th>
                  </tr>
                </thead>
                <tbody>
                  {subjects.map((subject, index) => (
                    <tr key={subject.id} className={index % 2 === 0 ? 'bg-background' : 'bg-muted/50'}>
                      <td className="p-3 text-sm">{subject.name}</td>
                      <td className="p-3 text-sm">{subject.code}</td>
                      <td className="p-3 text-sm">{subject.period}</td>
                      <td className="p-3 text-sm">{subject.teacher}</td>
                      <td className="p-3">
                        <Badge 
                          variant={subject.status === 'MATRICULADO' ? 'default' : 'secondary'}
                          className={subject.status === 'MATRICULADO' ? 'bg-green-100 text-green-800' : ''}
                        >
                          {subject.status}
                        </Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="w-80">
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="text-lg">Junho 2021</CardTitle>
            </CardHeader>
            <CardContent>
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={setSelectedDate}
                className="rounded-md border"
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Próximas Aulas</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {upcomingClasses.map((classItem, index) => (
                  <div key={index} className="flex flex-col space-y-1">
                    <div className="font-medium text-sm">{classItem.subject}</div>
                    <div className="text-xs text-muted-foreground">{classItem.date}</div>
                    {index < upcomingClasses.length - 1 && <hr className="my-2" />}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Matricula;