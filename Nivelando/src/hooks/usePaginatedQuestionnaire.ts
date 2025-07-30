import React, { useState } from 'react';
import { useQuestionnaire, Question } from '@/hooks/useQuestionnaire';
import { toast } from 'sonner';

const QUESTIONS_PER_PAGE = 5;

export const usePaginatedQuestionnaire = (questions: Question[], subjectCode: string) => {
  const { submitQuestionnaireResponse, submitting } = useQuestionnaire();
  const [currentPage, setCurrentPage] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [selectedAnswer, setSelectedAnswer] = useState<string>('');
  const [completedPages, setCompletedPages] = useState<Set<number>>(new Set());
  const [randomizedQuestions, setRandomizedQuestions] = useState<Question[]>([]);

  // Initialize randomized questions only once
  React.useEffect(() => {
    if (randomizedQuestions.length === 0) {
      const shuffled = [...questions].sort(() => Math.random() - 0.5);
      setRandomizedQuestions(shuffled);
    }
  }, [questions, randomizedQuestions.length]);

  const totalPages = Math.ceil(randomizedQuestions.length / QUESTIONS_PER_PAGE);
  const currentPageQuestions = randomizedQuestions.slice(
    currentPage * QUESTIONS_PER_PAGE,
    (currentPage + 1) * QUESTIONS_PER_PAGE
  );
  const currentQuestionIndex = (currentPage * QUESTIONS_PER_PAGE) + 
    (currentPageQuestions.findIndex(q => answers[q.id] === undefined) !== -1 
      ? currentPageQuestions.findIndex(q => answers[q.id] === undefined) 
      : 0);
  const currentQuestionInPage = currentQuestionIndex % QUESTIONS_PER_PAGE;
  const currentQuestion = currentPageQuestions[currentQuestionInPage];

  const progress = ((currentPage + 1) / totalPages) * 100;

  const handleAnswerSelect = (value: string) => {
    setSelectedAnswer(value);
  };

  const handleNext = async () => {
    if (!selectedAnswer && answers[currentQuestion.id] === undefined) {
      toast.error('Por favor, escolha uma alternativa antes de continuar.');
      return;
    }

    const answerIndex = selectedAnswer ? parseInt(selectedAnswer) : answers[currentQuestion.id];
    setAnswers(prev => ({
      ...prev,
      [currentQuestion.id]: answerIndex
    }));

    // Check if all questions in current page are answered
    const allPageQuestionsAnswered = currentPageQuestions.every(q => 
      answers[q.id] !== undefined || q.id === currentQuestion.id
    );

    if (allPageQuestionsAnswered) {
      setCompletedPages(prev => new Set([...prev, currentPage]));
      
      if (currentPage < totalPages - 1) {
        // Move to next page
        setCurrentPage(prev => prev + 1);
        setSelectedAnswer('');
        toast.success(`Página ${currentPage + 1} de ${totalPages} concluída!`);
      } else {
        // Calculate final score and submit
        let correctAnswers = 0;
        const finalAnswers = { ...answers, [currentQuestion.id]: answerIndex };
        
        randomizedQuestions.forEach(question => {
          if (finalAnswers[question.id] === question.correctAnswer) {
            correctAnswers++;
          }
        });

        const success = await submitQuestionnaireResponse(subjectCode, correctAnswers, randomizedQuestions.length);
        
        if (success) {
          return { finished: true, score: correctAnswers, total: randomizedQuestions.length };
        }
      }
    } else {
      // Move to next question in same page
      const nextQuestionInPage = currentPageQuestions.findIndex(q => 
        answers[q.id] === undefined && q.id !== currentQuestion.id
      );
      
      if (nextQuestionInPage !== -1) {
        setSelectedAnswer('');
      }
    }

    return { finished: false };
  };

  const handleFinishEarly = async () => {
    // Calculate score based on answered questions only
    let correctAnswers = 0;
    const answeredQuestions = Object.keys(answers).length;
    
    if (answeredQuestions === 0) {
      toast.error('Responda pelo menos uma pergunta antes de finalizar.');
      return { finished: false };
    }

    // Add current answer if exists
    const finalAnswers = selectedAnswer ? { ...answers, [currentQuestion.id]: parseInt(selectedAnswer) } : answers;
    
    randomizedQuestions.forEach(question => {
      if (finalAnswers[question.id] !== undefined && finalAnswers[question.id] === question.correctAnswer) {
        correctAnswers++;
      }
    });

    const totalAnswered = Object.keys(finalAnswers).length;
    const success = await submitQuestionnaireResponse(subjectCode, correctAnswers, totalAnswered);
    
    if (success) {
      return { finished: true, score: correctAnswers, total: totalAnswered };
    }
    
    return { finished: false };
  };

  const handlePrevious = () => {
    if (currentPage > 0) {
      setCurrentPage(prev => prev - 1);
      setSelectedAnswer('');
    }
  };

  // Set selected answer if question was previously answered
  React.useEffect(() => {
    if (currentQuestion && answers[currentQuestion.id] !== undefined) {
      setSelectedAnswer(answers[currentQuestion.id].toString());
    } else {
      setSelectedAnswer('');
    }
  }, [currentQuestion, answers]);

  return {
    currentQuestion,
    selectedAnswer,
    currentPage: currentPage + 1,
    totalPages,
    progress,
    submitting,
    allPageQuestionsAnswered: currentPageQuestions.every(q => answers[q.id] !== undefined),
    answeredQuestions: Object.keys(answers).length + (selectedAnswer ? 1 : 0),
    handleAnswerSelect,
    handleNext,
    handlePrevious,
    handleFinishEarly,
    canGoBack: currentPage > 0
  };
};