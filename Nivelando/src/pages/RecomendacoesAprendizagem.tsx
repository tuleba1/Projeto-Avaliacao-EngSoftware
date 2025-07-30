import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { Send, MessageSquare, User, Clock, CheckCircle, Plus, BookOpen, AlertCircle } from 'lucide-react';
import { useSubjects } from '@/hooks/useSubjects';
import { useAuth } from '@/contexts/AuthContext';
import { useQuestions, Question } from '@/hooks/useQuestions';
import { supabase } from '@/integrations/supabase/client';

interface Student {
  id: string;
  full_name: string;
  email: string;
}

interface Recommendation {
  id: string;
  title: string;
  message: string;
  student_id: string;
  subject_id: string | null;
  created_at: string;
  is_read: boolean;
  read_at: string | null;
  student_name: string;
  subject_name: string | null;
}

const RecomendacoesAprendizagem = () => {
  const { toast } = useToast();
  const { user } = useAuth();
  const { subjects, loading: subjectsLoading } = useSubjects();
  
  // Estados para envio de recomendações
  const [students, setStudents] = useState<Student[]>([]);
  const [loadingStudents, setLoadingStudents] = useState(true);
  const [selectedStudent, setSelectedStudent] = useState<string>('');
  const [selectedSubject, setSelectedSubject] = useState<string>('');
  const [recommendationTitle, setRecommendationTitle] = useState('');
  const [recommendationMessage, setRecommendationMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Estados para visualizar recomendações enviadas
  const [sentRecommendations, setSentRecommendations] = useState<Recommendation[]>([]);
  const [loadingRecommendations, setLoadingRecommendations] = useState(true);
  
  // Estados para adicionar questões
  const [selectedSubjectForQuestion, setSelectedSubjectForQuestion] = useState<string>('');
  const [selectedQuestionnaire, setSelectedQuestionnaire] = useState<string>('');
  const [questionnaires, setQuestionnaires] = useState<any[]>([]);
  const [loadingQuestionnaires, setLoadingQuestionnaires] = useState(false);
  const { questions, loading: questionsLoading, error, addQuestion } = useQuestions(selectedQuestionnaire);

  const [newQuestion, setNewQuestion] = useState<Question>({
    questionText: '',
    optionA: '',
    optionB: '',
    optionC: '',
    optionD: '',
    correctOption: 'A'
  });

  const [isSubmittingQuestion, setIsSubmittingQuestion] = useState(false);

  // Buscar estudantes
  useEffect(() => {
    fetchStudents();
    fetchSentRecommendations();
  }, []);

  const fetchStudents = async () => {
    try {
      setLoadingStudents(true);
      const { data, error } = await supabase
        .from('profiles')
        .select('id, full_name, email')
        .eq('role', 'student')
        .order('full_name');
      
      if (error) throw error;
      setStudents(data || []);
    } catch (err) {
      console.error('Erro ao buscar estudantes:', err);
      toast({
        title: "Erro",
        description: "Falha ao carregar lista de estudantes",
        variant: "destructive"
      });
    } finally {
      setLoadingStudents(false);
    }
  };

  const fetchSentRecommendations = async () => {
    if (!user) return;
    
    try {
      setLoadingRecommendations(true);
      
      // Buscar recomendações básicas primeiro
      const { data: recommendations, error } = await supabase
        .from('recommendations')
        .select('*')
        .eq('teacher_id', user.id)
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      
      // Buscar nomes dos estudantes e matérias separadamente
      const formattedRecommendations: Recommendation[] = [];
      
      if (recommendations) {
        for (const rec of recommendations) {
          // Buscar nome do estudante
          const { data: student } = await supabase
            .from('profiles')
            .select('full_name')
            .eq('id', rec.student_id)
            .single();
          
          // Buscar nome da matéria se houver
          let subjectName = null;
          if (rec.subject_id) {
            const { data: subject } = await supabase
              .from('subjects')
              .select('name')
              .eq('id', rec.subject_id)
              .single();
            subjectName = subject?.name || null;
          }
          
          formattedRecommendations.push({
            id: rec.id,
            title: rec.title,
            message: rec.message,
            student_id: rec.student_id,
            subject_id: rec.subject_id,
            created_at: rec.created_at,
            is_read: rec.is_read,
            read_at: rec.read_at,
            student_name: student?.full_name || 'Estudante',
            subject_name: subjectName
          });
        }
      }
      
      setSentRecommendations(formattedRecommendations);
    } catch (err) {
      console.error('Erro ao buscar recomendações enviadas:', err);
      toast({
        title: "Erro",
        description: "Falha ao carregar recomendações enviadas",
        variant: "destructive"
      });
    } finally {
      setLoadingRecommendations(false);
    }
  };

  // Funções para adicionar questões
  const fetchQuestionnaires = async (subjectId: string) => {
    try {
      setLoadingQuestionnaires(true);
      const { data, error } = await supabase
        .from('questionnaires')
        .select('*')
        .eq('subject_id', subjectId);
      
      if (error) throw error;
      setQuestionnaires(data || []);
    } catch (err) {
      console.error('Erro ao buscar questionários:', err);
      toast({
        title: "Erro",
        description: "Falha ao carregar questionários",
        variant: "destructive"
      });
    } finally {
      setLoadingQuestionnaires(false);
    }
  };

  const handleSubjectChangeForQuestion = (subjectId: string) => {
    setSelectedSubjectForQuestion(subjectId);
    setSelectedQuestionnaire('');
    if (subjectId) {
      fetchQuestionnaires(subjectId);
    } else {
      setQuestionnaires([]);
    }
  };

  const handleQuestionnaireChange = (questionnaireId: string) => {
    setSelectedQuestionnaire(questionnaireId);
  };

  const resetQuestionForm = () => {
    setNewQuestion({
      questionText: '',
      optionA: '',
      optionB: '',
      optionC: '',
      optionD: '',
      correctOption: 'A'
    });
  };

  const handleSubmitQuestion = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedQuestionnaire) {
      toast({
        title: "Erro",
        description: "Selecione um questionário primeiro",
        variant: "destructive"
      });
      return;
    }

    if (!newQuestion.questionText.trim()) {
      toast({
        title: "Erro",
        description: "Digite o texto da pergunta",
        variant: "destructive"
      });
      return;
    }

    if (!newQuestion.optionA.trim() || !newQuestion.optionB.trim() || 
        !newQuestion.optionC.trim() || !newQuestion.optionD.trim()) {
      toast({
        title: "Erro",
        description: "Preencha todas as alternativas",
        variant: "destructive"
      });
      return;
    }

    setIsSubmittingQuestion(true);

    try {
      const success = await addQuestion(selectedQuestionnaire, newQuestion);
      
      if (success) {
        toast({
          title: "Sucesso!",
          description: "Questão adicionada ao questionário",
        });
        resetQuestionForm();
      }
    } catch (err) {
      toast({
        title: "Erro",
        description: "Falha ao adicionar questão",
        variant: "destructive"
      });
    } finally {
      setIsSubmittingQuestion(false);
    }
  };

  const resetRecommendationForm = () => {
    setSelectedStudent('');
    setSelectedSubject('');
    setRecommendationTitle('');
    setRecommendationMessage('');
  };

  const handleSendRecommendation = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      toast({
        title: "Erro",
        description: "Usuário não autenticado",
        variant: "destructive"
      });
      return;
    }

    if (!selectedStudent) {
      toast({
        title: "Erro",
        description: "Selecione um estudante",
        variant: "destructive"
      });
      return;
    }

    if (!recommendationTitle.trim()) {
      toast({
        title: "Erro",
        description: "Digite o título da recomendação",
        variant: "destructive"
      });
      return;
    }

    if (!recommendationMessage.trim()) {
      toast({
        title: "Erro",
        description: "Digite a mensagem da recomendação",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const { error } = await supabase
        .from('recommendations')
        .insert({
          student_id: selectedStudent,
          teacher_id: user.id,
          subject_id: selectedSubject === 'general' ? null : selectedSubject || null,
          title: recommendationTitle.trim(),
          message: recommendationMessage.trim()
        });

      if (error) throw error;

      toast({
        title: "Sucesso!",
        description: "Recomendação enviada para o estudante",
      });
      
      resetRecommendationForm();
      fetchSentRecommendations();
    } catch (err) {
      console.error('Erro ao enviar recomendação:', err);
      toast({
        title: "Erro",
        description: "Falha ao enviar recomendação",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (subjectsLoading || loadingStudents) {
    return (
      <div className="flex-1 p-6 space-y-6">
        <div className="space-y-2">
          <Skeleton className="h-8 w-96" />
          <Skeleton className="h-4 w-64" />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Skeleton className="h-96" />
          <Skeleton className="h-96" />
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 p-6 space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold">Recomendações de Aprendizagem</h1>
        <p className="text-muted-foreground">
          Envie recomendações personalizadas para seus estudantes
        </p>
      </div>

      <Tabs defaultValue="enviar" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="enviar">Enviar Recomendação</TabsTrigger>
          <TabsTrigger value="enviadas">Recomendações Enviadas</TabsTrigger>
          <TabsTrigger value="questoes">Adicionar Questões</TabsTrigger>
        </TabsList>
        
        {/* Aba para enviar recomendações */}
        <TabsContent value="enviar" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Send className="h-5 w-5" />
                <span>Enviar Nova Recomendação</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSendRecommendation} className="space-y-4">
                {/* Seleção de Estudante */}
                <div className="space-y-2">
                  <Label htmlFor="student">Estudante</Label>
                  <Select value={selectedStudent} onValueChange={setSelectedStudent}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione um estudante" />
                    </SelectTrigger>
                    <SelectContent>
                      {students.map((student) => (
                        <SelectItem key={student.id} value={student.id}>
                          <div className="flex flex-col">
                            <span>{student.full_name}</span>
                            <span className="text-xs text-muted-foreground">{student.email}</span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Seleção de Matéria (Opcional) */}
                <div className="space-y-2">
                  <Label htmlFor="subject">Matéria (Opcional)</Label>
                  <Select value={selectedSubject} onValueChange={setSelectedSubject}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione uma matéria (opcional)" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="general">Geral (sem matéria específica)</SelectItem>
                      {subjects.map((subject) => (
                        <SelectItem key={subject.id} value={subject.id}>
                          {subject.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Título da Recomendação */}
                <div className="space-y-2">
                  <Label htmlFor="title">Título da Recomendação</Label>
                  <Input
                    id="title"
                    placeholder="Ex: Sugestão de estudo para Matemática"
                    value={recommendationTitle}
                    onChange={(e) => setRecommendationTitle(e.target.value)}
                  />
                </div>

                {/* Mensagem da Recomendação */}
                <div className="space-y-2">
                  <Label htmlFor="message">Mensagem</Label>
                  <Textarea
                    id="message"
                    placeholder="Digite sua recomendação personalizada para o estudante..."
                    value={recommendationMessage}
                    onChange={(e) => setRecommendationMessage(e.target.value)}
                    rows={6}
                  />
                </div>

                <Button 
                  type="submit" 
                  className="w-full" 
                  disabled={isSubmitting || !selectedStudent}
                >
                  {isSubmitting ? 'Enviando...' : 'Enviar Recomendação'}
                </Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Aba para visualizar recomendações enviadas */}
        <TabsContent value="enviadas" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <MessageSquare className="h-5 w-5" />
                <span>Recomendações Enviadas</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              {loadingRecommendations ? (
                <div className="space-y-4">
                  {Array.from({ length: 3 }).map((_, i) => (
                    <Skeleton key={i} className="h-32" />
                  ))}
                </div>
              ) : sentRecommendations.length === 0 ? (
                <div className="text-center py-8">
                  <MessageSquare className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">
                    Você ainda não enviou nenhuma recomendação
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {sentRecommendations.map((recommendation) => (
                    <div key={recommendation.id} className="border rounded-lg p-4 space-y-3">
                      <div className="flex items-start justify-between">
                        <div className="space-y-1">
                          <h4 className="font-medium">{recommendation.title}</h4>
                          <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                            <div className="flex items-center space-x-1">
                              <User className="h-4 w-4" />
                              <span>{recommendation.student_name}</span>
                            </div>
                            {recommendation.subject_name && (
                              <Badge variant="outline" className="text-xs">
                                {recommendation.subject_name}
                              </Badge>
                            )}
                            <div className="flex items-center space-x-1">
                              <Clock className="h-4 w-4" />
                              <span>
                                {new Date(recommendation.created_at).toLocaleDateString('pt-BR', {
                                  day: '2-digit',
                                  month: '2-digit',
                                  year: 'numeric',
                                  hour: '2-digit',
                                  minute: '2-digit'
                                })}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          {recommendation.is_read ? (
                            <Badge variant="default" className="text-xs">
                              <CheckCircle className="h-3 w-3 mr-1" />
                              Lida
                            </Badge>
                          ) : (
                            <Badge variant="secondary" className="text-xs">
                              Não lida
                            </Badge>
                          )}
                        </div>
                      </div>
                      
                      <div className="text-sm bg-muted/50 rounded p-3">
                        {recommendation.message}
                      </div>
                      
                      {recommendation.is_read && recommendation.read_at && (
                        <div className="text-xs text-muted-foreground">
                          Lida em: {new Date(recommendation.read_at).toLocaleDateString('pt-BR', {
                            day: '2-digit',
                            month: '2-digit',
                            year: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Aba para adicionar questões */}
        <TabsContent value="questoes" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Formulário para adicionar questões */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Plus className="h-5 w-5" />
                  <span>Adicionar Nova Questão</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmitQuestion} className="space-y-4">
                  {/* Seleção de Matéria */}
                  <div className="space-y-2">
                    <Label htmlFor="subject">Matéria</Label>
                    <Select value={selectedSubjectForQuestion} onValueChange={handleSubjectChangeForQuestion}>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione uma matéria" />
                      </SelectTrigger>
                      <SelectContent>
                        {subjects.map((subject) => (
                          <SelectItem key={subject.id} value={subject.id}>
                            {subject.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Seleção de Questionário */}
                  <div className="space-y-2">
                    <Label htmlFor="questionnaire">Questionário</Label>
                    <Select 
                      value={selectedQuestionnaire} 
                      onValueChange={handleQuestionnaireChange}
                      disabled={!selectedSubjectForQuestion || loadingQuestionnaires}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder={
                          loadingQuestionnaires 
                            ? "Carregando questionários..." 
                            : !selectedSubjectForQuestion 
                              ? "Selecione uma matéria primeiro"
                              : "Selecione um questionário"
                        } />
                      </SelectTrigger>
                      <SelectContent>
                        {questionnaires.map((questionnaire) => (
                          <SelectItem key={questionnaire.id} value={questionnaire.id}>
                            {questionnaire.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Texto da Pergunta */}
                  <div className="space-y-2">
                    <Label htmlFor="question">Texto da Pergunta</Label>
                    <Textarea
                      id="question"
                      placeholder="Digite a pergunta aqui..."
                      value={newQuestion.questionText}
                      onChange={(e) => setNewQuestion(prev => ({ ...prev, questionText: e.target.value }))}
                      rows={3}
                    />
                  </div>

                  {/* Alternativas */}
                  <div className="space-y-3">
                    <Label>Alternativas</Label>
                    
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <Badge variant="outline" className="w-6 text-center">A</Badge>
                        <Input
                          placeholder="Alternativa A"
                          value={newQuestion.optionA}
                          onChange={(e) => setNewQuestion(prev => ({ ...prev, optionA: e.target.value }))}
                        />
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <Badge variant="outline" className="w-6 text-center">B</Badge>
                        <Input
                          placeholder="Alternativa B"
                          value={newQuestion.optionB}
                          onChange={(e) => setNewQuestion(prev => ({ ...prev, optionB: e.target.value }))}
                        />
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <Badge variant="outline" className="w-6 text-center">C</Badge>
                        <Input
                          placeholder="Alternativa C"
                          value={newQuestion.optionC}
                          onChange={(e) => setNewQuestion(prev => ({ ...prev, optionC: e.target.value }))}
                        />
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <Badge variant="outline" className="w-6 text-center">D</Badge>
                        <Input
                          placeholder="Alternativa D"
                          value={newQuestion.optionD}
                          onChange={(e) => setNewQuestion(prev => ({ ...prev, optionD: e.target.value }))}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Resposta Correta */}
                  <div className="space-y-2">
                    <Label htmlFor="correct">Alternativa Correta</Label>
                    <Select 
                      value={newQuestion.correctOption} 
                      onValueChange={(value: 'A' | 'B' | 'C' | 'D') => 
                        setNewQuestion(prev => ({ ...prev, correctOption: value }))
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="A">A</SelectItem>
                        <SelectItem value="B">B</SelectItem>
                        <SelectItem value="C">C</SelectItem>
                        <SelectItem value="D">D</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full" 
                    disabled={isSubmittingQuestion || !selectedQuestionnaire}
                  >
                    {isSubmittingQuestion ? 'Adicionando...' : 'Adicionar Questão'}
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Lista de questões existentes */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <BookOpen className="h-5 w-5" />
                  <span>Questões do Questionário</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {!selectedQuestionnaire ? (
                  <div className="text-center py-8">
                    <BookOpen className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground">
                      Selecione um questionário para ver as questões
                    </p>
                  </div>
                ) : questionsLoading ? (
                  <div className="space-y-4">
                    {Array.from({ length: 3 }).map((_, i) => (
                      <Skeleton key={i} className="h-24" />
                    ))}
                  </div>
                ) : error ? (
                  <div className="text-center py-8">
                    <AlertCircle className="h-12 w-12 text-destructive mx-auto mb-4" />
                    <p className="text-destructive">{error}</p>
                  </div>
                ) : questions.length === 0 ? (
                  <div className="text-center py-8">
                    <BookOpen className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground">
                      Nenhuma questão encontrada neste questionário
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {questions.map((question, index) => (
                      <div key={question.id || index} className="border rounded-lg p-4 space-y-3">
                        <div className="flex items-start justify-between">
                          <h4 className="font-medium leading-relaxed">{question.questionText}</h4>
                          <Badge variant="secondary" className="ml-2">
                            Questão {index + 1}
                          </Badge>
                        </div>
                        
                        <div className="grid grid-cols-1 gap-2 text-sm">
                          <div className="flex items-center space-x-2">
                            <Badge 
                              variant={question.correctOption === 'A' ? 'default' : 'outline'} 
                              className="w-6 text-center"
                            >
                              {question.correctOption === 'A' && <CheckCircle className="h-3 w-3" />}
                              A
                            </Badge>
                            <span>{question.optionA}</span>
                          </div>
                          
                          <div className="flex items-center space-x-2">
                            <Badge 
                              variant={question.correctOption === 'B' ? 'default' : 'outline'} 
                              className="w-6 text-center"
                            >
                              {question.correctOption === 'B' && <CheckCircle className="h-3 w-3" />}
                              B
                            </Badge>
                            <span>{question.optionB}</span>
                          </div>
                          
                          <div className="flex items-center space-x-2">
                            <Badge 
                              variant={question.correctOption === 'C' ? 'default' : 'outline'} 
                              className="w-6 text-center"
                            >
                              {question.correctOption === 'C' && <CheckCircle className="h-3 w-3" />}
                              C
                            </Badge>
                            <span>{question.optionC}</span>
                          </div>
                          
                          <div className="flex items-center space-x-2">
                            <Badge 
                              variant={question.correctOption === 'D' ? 'default' : 'outline'} 
                              className="w-6 text-center"
                            >
                              {question.correctOption === 'D' && <CheckCircle className="h-3 w-3" />}
                              D
                            </Badge>
                            <span>{question.optionD}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default RecomendacoesAprendizagem;