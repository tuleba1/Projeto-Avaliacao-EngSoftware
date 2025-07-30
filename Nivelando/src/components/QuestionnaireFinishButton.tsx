import React from 'react';
import { Button } from '@/components/ui/button';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';

interface QuestionnaireFinishButtonProps {
  onFinishEarly: () => Promise<any>;
  submitting: boolean;
  answeredQuestions: number;
  disabled?: boolean;
}

export const QuestionnaireFinishButton: React.FC<QuestionnaireFinishButtonProps> = ({
  onFinishEarly,
  submitting,
  answeredQuestions,
  disabled = false
}) => {
  const handleFinish = async () => {
    await onFinishEarly();
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button 
          variant="outline" 
          disabled={disabled || submitting || answeredQuestions === 0}
          className="ml-2"
        >
          Finalizar Agora
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Finalizar Questionário</AlertDialogTitle>
          <AlertDialogDescription>
            Você respondeu {answeredQuestions} pergunta{answeredQuestions !== 1 ? 's' : ''}. 
            Tem certeza que deseja finalizar o questionário agora? Isso contará como um questionário completo 
            e gerará dados para seu perfil baseado nas respostas que você já deu.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction onClick={handleFinish} disabled={submitting}>
            {submitting ? 'Finalizando...' : 'Sim, Finalizar'}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};