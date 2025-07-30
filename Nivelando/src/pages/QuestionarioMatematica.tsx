import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { useNavigate } from 'react-router-dom';
import { usePaginatedQuestionnaire } from '@/hooks/usePaginatedQuestionnaire';
import { QuestionnaireFinishButton } from '@/components/QuestionnaireFinishButton';

interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
}

const QuestionarioMatematica = () => {
  const navigate = useNavigate();

  const questions: Question[] = [
  // Tópico 1: Funções (Função Afim, Quadrática, Exponencial, Logarítmica)
  {
    id: 1,
    question: "Dada a função $f(x) = 3x - 5, qual o valor de f(2)?",
    options: ["1", "5", "-1", "6"],
    correctAnswer: 0,
  },
  {
    id: 2,
    question: "Qual das seguintes funções é uma função quadrática?",
    options: ["f(x) = 2x + 3", "f(x) = x^3 - 4x^2 + 1", "f(x) = -x^2 + 5x - 2", "f(x) = \\sqrt{x} + 7"],
    correctAnswer: 2,
  },
  {
    id: 3,
    question: "O ponto onde o gráfico de uma função afim $f(x) = ax + b$ cruza o eixo $y$ é dado por:",
    options: ["$(b, 0)$", "$(0, a)$", "$(0, b)$", "$(a, b)$"],
    correctAnswer: 2,
  },
  {
    id: 4,
    question: "Qual o domínio da função $f(x) = \\frac{1}{x - 3}$?",
    options: ["$x \\ne 1$", "$x \\ne 3$", "$x > 3$", "Todos os números reais."],
    correctAnswer: 1,
  },
  {
    id: 5,
    question: "Se $f(x) = x^2$ e $g(x) = x + 1$, qual é a função composta $g(f(x))$?",
    options: ["$x^2 + 1$", "$(x + 1)^2$", "$x^2 + x + 1$", "$2x + 1$"],
    correctAnswer: 0,
  },
  {
    id: 6,
    question: "A função exponencial é caracterizada por ter a variável no:",
    options: ["Expoente", "Base", "Coeficiente angular", "Termo constante"],
    correctAnswer: 0,
  },
  {
    id: 7,
    question: "Qual a base de um logaritmo natural?",
    options: ["$10$", "$e$ (número de Euler)", "$2$", "$0$"],
    correctAnswer: 1,
  },
  {
    id: 8,
    question: "Qual o valor de $log_2 8$?",
    options: ["2", "3", "4", "8"],
    correctAnswer: 1,
  },
  {
    id: 9,
    question: "Em uma função quadrática $f(x) = ax^2 + bx + c$, se $a < 0$, a concavidade da parábola é:",
    options: ["Para cima", "Para baixo", "Para a direita", "Para a esquerda"],
    correctAnswer: 1,
  },
  {
    id: 10,
    question: "O conjunto imagem de uma função $f(x) = x^2$ é:",
    options: ["Todos os números reais.", "Apenas números positivos.", "Apenas números negativos.", "Todos os números reais não negativos (ou seja, $y \\ge 0$)."],
    correctAnswer: 3,
  },
  {
    id: 11,
    question: "A taxa de variação de uma função afim $f(x) = ax + b$ é dada por:",
    options: ["$a$", "$b$", "$x$", "$y$"],
    correctAnswer: 0,
  },
  {
    id: 12,
    question: "Qual o valor de $log_5 1$?",
    options: ["0", "1", "5", "Indefinido"],
    correctAnswer: 0,
  },

  // Tópico 2: Geometria Analítica (Ponto, Reta, Circunferência)
  {
    id: 13,
    question: "Qual a distância entre os pontos $A(1, 2)$ e $B(4, 6)$ no plano cartesiano?",
    options: ["$3$", "$4$", "$5$", "$7$"],
    correctAnswer: 2,
  },
  {
    id: 14,
    question: "O ponto médio do segmento de reta que liga os pontos $P(-2, 5)$ e $Q(8, 1)$ é:",
    options: ["$(3, 3)$", "$(6, 6)$", "$(4, 2)$", "$(-10, 4)$"],
    correctAnswer: 0,
  },
  {
    id: 15,
    question: "Qual a equação reduzida da reta que passa pelo ponto $(0, 4)$ e tem coeficiente angular $m = 2$?",
    options: ["$y = 4x + 2$", "$y = 2x - 4$", "$y = 2x + 4$", "$y = x + 2$"],
    correctAnswer: 2,
  },
  {
    id: 16,
    question: "Duas retas são perpendiculares se o produto de seus coeficientes angulares é igual a:",
    options: ["$1$", "$0$", "$-1$", "Qualquer valor diferente de 0."],
    correctAnswer: 2,
  },
  {
    id: 17,
    question: "A equação geral da reta $2x - y + 3 = 0$ tem coeficiente angular igual a:",
    options: ["$-1$", "$2$", "$3$", "$-2$"],
    correctAnswer: 1,
  },
  {
    id: 18,
    question: "Qual o raio da circunferência cuja equação é $(x - 1)^2 + (y + 2)^2 = 9$?",
    options: ["$1$", "$2$", "$3$", "$9$"],
    correctAnswer: 2,
  },
  {
    id: 19,
    question: "O centro da circunferência cuja equação é $(x + 3)^2 + (y - 4)^2 = 25$ é:",
    options: ["$(3, -4)$", "$(-3, 4)$", "$(3, 4)$", "$(-3, -4)$"],
    correctAnswer: 1,
  },
  {
    id: 20,
    question: "Qual a equação da reta que passa pelo ponto $(0, 0)$ e $(2, 4)$?",
    options: ["$y = x$", "$y = 2x$", "$y = 4x$", "$y = x + 2$"],
    correctAnswer: 1,
  },
  {
    id: 21,
    question: "A equação geral de uma reta horizontal que passa por $(3, 5)$ é:",
    options: ["$x = 3$", "$y = 5$", "$y = x + 2$", "$x + y = 8$"],
    correctAnswer: 1,
  },
  {
    id: 22,
    question: "Qual a inclinação (coeficiente angular) da reta que passa pelos pontos $(1, 3)$ e $(3, 7)$?",
    options: ["$1$", "$2$", "$3$", "$4$"],
    correctAnswer: 1,
  },
  {
    id: 23,
    question: "A equação da reta tangente a uma circunferência em um ponto $(x_0, y_0)$ é sempre ______ ao raio que liga o centro da circunferência a este ponto.",
    options: ["Paralela", "Coincidente", "Perpendicular", "Inversamente proporcional"],
    correctAnswer: 2,
  },
  {
    id: 24,
    question: "Qual a posição relativa entre a reta $y = 2x + 1$ e a reta $y = 2x - 5$?",
    options: ["Concorrentes", "Perpendiculares", "Paralelas distintas", "Coincidentes"],
    correctAnswer: 2,
  },

  // Tópico 3: Trigonometria (Ciclo Trigonométrico, Funções Trigonométricas, Relações)
  {
    id: 25,
    question: "O valor de $sen(30\\degree)$ é:",
    options: ["$1$", "$\\frac{\\sqrt{3}}{2}$", "$\\frac{1}{2}$", "$\\frac{\\sqrt{2}}{2}$"],
    correctAnswer: 2,
  },
  {
    id: 26,
    question: "Qual o quadrante em que o ângulo de $210\\degree$ se localiza no círculo trigonométrico?",
    options: ["Primeiro quadrante", "Segundo quadrante", "Terceiro quadrante", "Quarto quadrante"],
    correctAnswer: 2,
  },
  {
    id: 27,
    question: "Se $cos(x) = \\frac{1}{2}$ e $x$ está no $1^o$ quadrante, qual o valor de $sen(x)$?",
    options: ["$\\frac{1}{2}$", "$\\frac{\\sqrt{3}}{2}$", "$-\\frac{1}{2}$", "$-\\frac{\\sqrt{3}}{2}$"],
    correctAnswer: 1,
  },
  {
    id: 28,
    question: "O período da função $f(x) = sen(2x)$ é:",
    options: ["$\\pi$", "$2\\pi$", "$\\pi/2$", "$4\\pi$"],
    correctAnswer: 0,
  },
  {
    id: 29,
    question: "Qual o valor de $tg(45\\degree)$?",
    options: ["$0$", "$\\frac{\\sqrt{3}}{3}$", "$1$", "$\\sqrt{3}$"],
    correctAnswer: 2,
  },
  {
    id: 30,
    question: "A altura máxima de uma função $f(x) = 3sen(x) + 2$ é:",
    options: ["$3$", "$5$", "$2$", "$-1$"],
    correctAnswer: 1,
  },
  {
    id: 31,
    question: "Qual o sinal do cosseno no $3^o$ quadrante?",
    options: ["Positivo", "Negativo", "Pode ser positivo ou negativo", "Zero"],
    correctAnswer: 1,
  },
  {
    id: 32,
    question: "Se $sen(x) = \\frac{1}{2}$ e $x$ está no $2^o$ quadrante, qual o valor de $x$?",
    options: ["$30\\degree$", "$150\\degree$", "$210\\degree$", "$330\\degree$"],
    correctAnswer: 1,
  },
  {
    id: 33,
    question: "O que significa dizer que uma função trigonométrica é periódica?",
    options: ["Seu gráfico é uma reta.", "Seus valores se repetem em intervalos regulares.", "Ela possui um número finito de valores.", "Ela não possui domínio real."],
    correctAnswer: 1,
  },
  {
    id: 34,
    question: "Qual o valor principal de $cos(270\\degree)$?",
    options: ["$1$", "$-1$", "$0$", "Indefinido"],
    correctAnswer: 2,
  },
  {
    id: 35,
    question: "A lei dos senos é usada para resolver triângulos ______.",
    options: ["Retângulos apenas", "Equiláteros", "Quaisquer triângulos (não necessariamente retângulos).", "Isósceles apenas"],
    correctAnswer: 2,
  },
  {
    id: 36,
    question: "O valor de $cos(\\pi)$ radianos é:",
    options: ["$1$", "$-1$", "$0$", "Indefinido"],
    correctAnswer: 1,
  },

  // Tópico 4: Matrizes e Determinantes
  {
    id: 37,
    question: "Uma matriz identidade de ordem $3 \\times 3$ é aquela que possui:",
    options: ["Todos os elementos iguais a zero.", "Elementos da diagonal principal iguais a $1$ e os demais iguais a $0$.", "Todos os elementos iguais a $1$.", "Elementos da diagonal secundária iguais a $1$ e os demais iguais a $0$."],
    correctAnswer: 1,
  },
  {
    id: 38,
    question: "Dadas as matrizes $A = \\begin{pmatrix} 2 & 1 \\\\ 3 & 0 \\end{pmatrix}$ e $B = \\begin{pmatrix} 1 & 0 \\\\ -1 & 4 \\end{pmatrix}$, qual é a matriz $A + B$?",
    options: ["$\\begin{pmatrix} 3 & 1 \\\\ 2 & 4 \\end{pmatrix}$", "$\\begin{pmatrix} 1 & 1 \\\\ 4 & -4 \\end{pmatrix}$", "$\\begin{pmatrix} 2 & 0 \\\\ -3 & 0 \\end{pmatrix}$", "$\\begin{pmatrix} 2 & 1 \\\\ -3 & 0 \\end{pmatrix}$"],
    correctAnswer: 0,
  },
  {
    id: 39,
    question: "O determinante de uma matriz $2 \\times 2$, $A = \\begin{pmatrix} a & b \\\\ c & d \\end{pmatrix}$, é dado por:",
    options: ["$ad + bc$", "$ab - cd$", "$ad - bc$", "$ac - bd$"],
    correctAnswer: 2,
  },
  {
    id: 40,
    question: "Dada a matriz $A = \\begin{pmatrix} 3 & 2 \\\\ 1 & 4 \\end{pmatrix}$, qual é o seu determinante?",
    options: ["$10$", "$14$", "$5$", "$0$"],
    correctAnswer: 0,
  },
  {
    id: 41,
    question: "Para que a multiplicação de duas matrizes $A_{m \\times n}$ e $B_{p \\times q}$ seja possível, qual condição deve ser satisfeita?",
    options: ["$m = q$", "$n = p$", "$m = p$", "$n = q$"],
    correctAnswer: 1,
  },
  {
    id: 42,
    question: "Se uma matriz $A$ tem ordem $2 \\times 3$ e uma matriz $B$ tem ordem $3 \\times 4$, qual a ordem da matriz produto $AB$?",
    options: ["$2 \\times 4$", "$3 \\times 3$", "$4 \\times 2$", "A multiplicação não é possível."],
    correctAnswer: 0,
  },
  {
    id: 43,
    question: "Uma matriz transposta $A^T$ de uma matriz $A$ é obtida:",
    options: ["Multiplicando todos os seus elementos por $-1$.", "Trocando suas linhas por colunas e suas colunas por linhas.", "Somando seus elementos.", "Invertendo a ordem de seus elementos."],
    correctAnswer: 1,
  },
  {
    id: 44,
    question: "Qual o determinante de uma matriz com duas linhas ou duas colunas iguais?",
    options: ["$1$", "$-1$", "$0$", "Indefinido"],
    correctAnswer: 2,
  },
  {
    id: 45,
    question: "Uma matriz quadrada que possui todos os elementos fora da diagonal principal iguais a zero é chamada de:",
    options: ["Matriz nula", "Matriz identidade", "Matriz diagonal", "Matriz triangular"],
    correctAnswer: 2,
  },
  {
    id: 46,
    question: "Qual o valor do determinante da matriz $A = \\begin{pmatrix} 1 & 2 \\\\ 0 & 3 \\end{pmatrix}$?",
    options: ["$0$", "$1$", "$3$", "$6$"],
    correctAnswer: 2,
  },
  {
    id: 47,
    question: "A transposta da matriz $A = \\begin{pmatrix} 1 & 2 & 3 \\\\ 4 & 5 & 6 \\end{pmatrix}$ é:",
    options: ["$\\begin{pmatrix} 1 & 4 \\\\ 2 & 5 \\\\ 3 & 6 \\end{pmatrix}$", "$\\begin{pmatrix} 1 & 2 \\\\ 3 & 4 \\\\ 5 & 6 \\end{pmatrix}$", "$\\begin{pmatrix} 6 & 5 & 4 \\\\ 3 & 2 & 1 \\end{pmatrix}$", "$\\begin{pmatrix} 4 & 5 & 6 \\\\ 1 & 2 & 3 \\end{pmatrix}$"],
    correctAnswer: 0,
  },
  {
    id: 48,
    question: "Uma matriz é inversível se e somente se seu determinante é:",
    options: ["Igual a $1$.", "Igual a $0$.", "Diferente de $0$.", "Um número negativo."],
    correctAnswer: 2,
  },

  // Tópico 5: Probabilidade e Estatística
  {
    id: 49,
    question: "Ao lançar um dado comum (de 6 faces), qual a probabilidade de obter um número par?",
    options: ["$\\frac{1}{6}$", "$\\frac{1}{3}$", "$\\frac{1}{2}$", "$\\frac{2}{3}$"],
    correctAnswer: 2,
  },
  {
    id: 50,
    question: "Em uma pesquisa com 100 pessoas, 60 gostam de futebol e 40 gostam de basquete. Se 20 pessoas gostam de ambos, quantas não gostam de nenhum dos dois esportes?",
    options: ["0", "10", "20", "30"],
    correctAnswer: 2,
  },
  {
    id: 51,
    question: "A média aritmética das notas 5, 7, 8, 10 é:",
    options: ["6", "7", "7.5", "8"],
    correctAnswer: 2,
  },
  {
    id: 52,
    question: "Para o conjunto de dados 2, 5, 2, 8, 5, 2, 10, qual a moda?",
    options: ["$5$", "$2$", "$8$", "$10$"],
    correctAnswer: 1,
  },
  {
    id: 53,
    question: "A mediana do conjunto de dados ordenado $12, 15, 18, 20, 22$ é:",
    options: ["$12$", "$18$", "$20$", "$22$"],
    correctAnswer: 1,
  },
  {
    id: 54,
    question: "Em uma urna há $3$ bolas azuis e $7$ bolas vermelhas. Se uma bola for retirada ao acaso, qual a probabilidade de ela ser azul?",
    options: ["$\\frac{3}{7}$", "$\\frac{7}{10}$", "$\\frac{3}{10}$", "$1$"],
    correctAnswer: 2,
  },
  {
    id: 55,
    question: "O que é o espaço amostral de um experimento aleatório?",
    options: ["Apenas o resultado desejado do experimento.", "O conjunto de todos os resultados possíveis do experimento.", "O número de vezes que um evento ocorre.", "A probabilidade de um evento."],
    correctAnswer: 1,
  },
  {
    id: 56,
    question: "Para o conjunto de dados $10, 15, 20, 25$, a mediana é:",
    options: ["$15$", "$17.5$", "$20$", "$25$"],
    correctAnswer: 1,
  },
  {
    id: 57,
    question: "Qual o gráfico mais adequado para mostrar a evolução de um fenômeno ao longo do tempo (ex: crescimento populacional)?",
    options: ["Gráfico de barras", "Gráfico de setores (pizza)", "Gráfico de linhas", "Histograma"],
    correctAnswer: 2,
  },
  {
    id: 58,
    question: "O desvio padrão é uma medida de:",
    options: ["Tendência central", "Dispersão (ou variabilidade)", "Frequência", "Assimetria"],
    correctAnswer: 1,
  },
  {
    id: 59,
    question: "Um evento impossível tem probabilidade igual a:",
    options: ["$1$", "$0.5$", "$0$", "Indefinido"],
    correctAnswer: 2,
  },
  {
    id: 60,
    question: "Em uma pesquisa, a classe modal é aquela que possui:",
    options: ["O menor valor.", "A maior frequência.", "O valor central.", "A média dos valores."],
    correctAnswer: 1,
  },
  ];

  const {
    currentQuestion,
    selectedAnswer,
    currentPage,
    totalPages,
    progress,
    submitting,
    allPageQuestionsAnswered,
    answeredQuestions,
    handleAnswerSelect,
    handleNext: handleNextQuestion,
    handlePrevious,
    handleFinishEarly,
    canGoBack
  } = usePaginatedQuestionnaire(questions, 'MAT');

  const handleNext = async () => {
    const result = await handleNextQuestion();
    if (result?.finished) {
      navigate('/desempenho');
    }
  };

  const handleFinish = async () => {
    const result = await handleFinishEarly();
    if (result?.finished) {
      navigate('/desempenho');
    }
  };

  return (
    <div className="flex-1 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <h1 className="text-3xl font-bold mb-2">Questionário de Matemática</h1>
          <p className="text-muted-foreground">Avaliação de Matemática</p>
        </div>

        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-muted-foreground">
              Página {currentPage} de {totalPages}
            </span>
            <span className="text-sm text-muted-foreground">
              {progress.toFixed(0)}%
            </span>
          </div>
          <Progress value={progress} className="w-full" />
        </div>

        {currentQuestion && (
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="text-xl">
                {currentQuestion.question}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <RadioGroup value={selectedAnswer} onValueChange={handleAnswerSelect}>
                {currentQuestion.options.map((option, index) => (
                  <div key={index} className="flex items-center space-x-2 p-3 rounded-lg hover:bg-muted transition-colors">
                    <RadioGroupItem value={index.toString()} id={`option-${index}`} />
                    <Label 
                      htmlFor={`option-${index}`} 
                      className="flex-1 cursor-pointer text-base"
                    >
                      {option}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </CardContent>
          </Card>
        )}

        <div className="flex justify-between">
          <Button 
            variant="outline" 
            onClick={handlePrevious}
            disabled={!canGoBack}
          >
            Página Anterior
          </Button>
          
          <div className="flex items-center gap-2">
            <QuestionnaireFinishButton
              onFinishEarly={handleFinish}
              submitting={submitting}
              answeredQuestions={answeredQuestions}
              disabled={submitting}
            />
            <Button onClick={handleNext} disabled={submitting}>
              {submitting 
                ? 'Salvando...' 
                : allPageQuestionsAnswered && currentPage === totalPages
                  ? 'Finalizar' 
                  : 'Próxima'
              }
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuestionarioMatematica;