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

const QuestionarioQuimica = () => {
  const navigate = useNavigate();

  const questions: Question[] = [
  // Tópico 1: Reações Químicas e Estequiometria
  {
    id: 1,
    question: "Qual o tipo de reação química representada por $A + B \\rightarrow AB$?",
    options: ["Decomposição (Análise)", "Síntese (Adição ou Combinação)", "Simples Troca (Deslocamento)", "Dupla Troca (Permutação)"],
    correctAnswer: 1,
  },
  {
    id: 2,
    question: "Balanceie a equação química: $Fe_2O_3 + CO \\rightarrow Fe + CO_2$. Quais são os coeficientes estequiométricos corretos?",
    options: ["$1 Fe_2O_3 + 1 CO \\rightarrow 2 Fe + 1 CO_2$", "$1 Fe_2O_3 + 3 CO \\rightarrow 2 Fe + 3 CO_2$", "$2 Fe_2O_3 + 3 CO \\rightarrow 4 Fe + 3 CO_2$", "$1 Fe_2O_3 + 2 CO \\rightarrow 2 Fe + 2 CO_2$"],
    correctAnswer: 1,
  },
  {
    id: 3,
    question: "Segundo a Lei de Lavoisier (Lei da Conservação da Massa), em uma reação química, a massa total dos reagentes é igual à massa total dos produtos. O que isso significa?",
    options: ["A massa é criada ou destruída durante a reação.", "A massa dos reagentes é sempre maior que a massa dos produtos.", "A massa total do sistema fechado permanece constante.", "A massa dos reagentes é sempre menor que a massa dos produtos."],
    correctAnswer: 2,
  },
  {
    id: 4,
    question: "Dada a reação balanceada $2H_2 + O_2 \\rightarrow 2H_2O$. Se $4 \\text{ mol}$ de $H_2$ reagem completamente, quantos mols de $H_2O$ serão produzidos?",
    options: ["$2 \\text{ mol}$", "$4 \\text{ mol}$", "$1 \\text{ mol}$", "$8 \\text{ mol}$"],
    correctAnswer: 1,
  },
  {
    id: 5,
    question: "Qual o reagente limitante na reação $2H_2 + O_2 \\rightarrow 2H_2O$ se você tem $6 \\text{ mol}$ de $H_2$ e $2 \\text{ mol}$ de $O_2$?",
    options: ["$H_2$", "$O_2$", "$H_2O$", "Não há reagente limitante, ambos são consumidos totalmente."],
    correctAnswer: 1,
  },
  {
    id: 6,
    question: "Qual o número de oxidação do enxofre ($S$) no composto $H_2SO_4$?",
    options: ["$+2$", "$+4$", "$+6$", "$+8$"],
    correctAnswer: 2,
  },
  {
    id: 7,
    question: "Uma reação exotérmica é aquela que:",
    options: ["Absorve calor do ambiente.", "Libera calor para o ambiente.", "Não há troca de calor.", "Produz apenas luz."],
    correctAnswer: 1,
  },
  {
    id: 8,
    question: "Qual a equação que representa uma reação de dupla troca (permutação)?",
    options: ["$A + BC \\rightarrow AC + B$", "$AB \\rightarrow A + B$", "$AB + CD \\rightarrow AD + CB$", "$A + B \\rightarrow AB$"],
    correctAnswer: 2,
  },
  {
    id: 9,
    question: "Se $12 \\text{ g}$ de carbono ($C$) reagem completamente com $32 \\text{ g}$ de oxigênio ($O_2$) para formar $44 \\text{ g}$ de dióxido de carbono ($CO_2$), qual a Lei das Proporções Definidas de Proust para essa reação?",
    options: ["A massa total dos reagentes é igual à massa total dos produtos.", "A soma das massas é sempre constante.", "A proporção em massa dos reagentes e produtos é sempre constante para uma dada substância.", "Elementos diferentes formam compostos diferentes."],
    correctAnswer: 2,
  },
  {
    id: 10,
    question: "Qual o tipo de reação em que um elemento desloca outro em um composto?",
    options: ["Síntese", "Análise", "Simples Troca", "Dupla Troca"],
    correctAnswer: 2,
  },
  {
    id: 11,
    question: "Qual o número de mols de $NaCl$ em $117 \\text{ g}$ de $NaCl$? (Dados: $Na = 23 \\text{ g/mol}$, $Cl = 35.5 \\text{ g/mol}$)",
    options: ["$0.5 \\text{ mol}$", "$1.0 \\text{ mol}$", "$2.0 \\text{ mol}$", "$58.5 \\text{ mol}$"],
    correctAnswer: 1,
  },
  {
    id: 12,
    question: "Uma reação em que um único reagente se decompõe em dois ou mais produtos é chamada de:",
    options: ["Combustão", "Síntese", "Dupla Troca", "Análise (ou Decomposição)"],
    correctAnswer: 3,
  },

  // Tópico 2: Funções Orgânicas (Hidrocarbonetos, Oxigenadas, Nitrogenadas)
  {
    id: 13,
    question: "Qual das seguintes fórmulas representa um alcano?",
    options: ["$C_2H_4$", "$C_3H_6$", "$C_4H_{10}$", "$C_6H_6$"],
    correctAnswer: 2,
  },
  {
    id: 14,
    question: "O grupo funcional $-OH$ ligado a um carbono saturado caracteriza qual função orgânica?",
    options: ["Fenol", "Éter", "Álcool", "Aldeído"],
    correctAnswer: 2,
  },
  {
    id: 15,
    question: "Qual o nome IUPAC do composto $CH_3CH_2COCH_3$?",
    options: ["Butanal", "Butanona", "Ácido Butanoico", "Éter Etil Metílico"],
    correctAnswer: 1,
  },
  {
    id: 16,
    question: "O que são isômeros?",
    options: ["Substâncias com a mesma fórmula estrutural, mas diferentes fórmulas moleculares.", "Substâncias com a mesma fórmula molecular, mas diferentes fórmulas estruturais ou arranjos espaciais.", "Substâncias que reagem entre si para formar um novo composto.", "Substâncias que possuem a mesma função orgânica e a mesma fórmula molecular."],
    correctAnswer: 1,
  },
  {
    id: 17,
    question: "Qual a função orgânica que possui o grupo funcional carboxila ($-COOH$)?",
    options: ["Éster", "Aldeído", "Ácido Carboxílico", "Cetona"],
    correctAnswer: 2,
  },
  {
    id: 18,
    question: "Qual a fórmula geral dos alcinos?",
    options: ["$C_nH_{2n}$", "$C_nH_{2n+2}$", "$C_nH_{2n-2}$", "$C_nH_{2n-4}$"],
    correctAnswer: 2,
  },
  {
    id: 19,
    question: "A função éter é caracterizada pela presença de qual grupo funcional?",
    options: ["$-CHO$", "$-OH$", "$-COO-$", "$-O-$ entre dois radicais orgânicos"],
    correctAnswer: 3,
  },
  {
    id: 20,
    question: "Qual o nome IUPAC do composto $CH_3CH_2OH$?",
    options: ["Metanol", "Etanol", "Propanol", "Butanol"],
    correctAnswer: 1,
  },
  {
    id: 21,
    question: "A função amina é caracterizada pela presença de qual átomo em seu grupo funcional?",
    options: ["Oxigênio", "Nitrogênio", "Enxofre", "Fósforo"],
    correctAnswer: 1,
  },
  {
    id: 22,
    question: "Qual o nome do hidrocarboneto aromático mais simples, com fórmula $C_6H_6$?",
    options: ["Ciclohexano", "Benzeno", "Tolueno", "Naftaleno"],
    correctAnswer: 1,
  },
  {
    id: 23,
    question: "Os aldeídos e as cetonas são funções orgânicas que possuem o grupo funcional:",
    options: ["Hidroxila", "Éter", "Carbonila", "Carboxila"],
    correctAnswer: 2,
  },
  {
    id: 24,
    question: "Qual o tipo de isomeria que ocorre quando compostos têm a mesma fórmula molecular, mas diferentes grupos funcionais?",
    options: ["Isomeria de cadeia", "Isomeria de posição", "Isomeria de função", "Isomeria de tautomeria"],
    correctAnswer: 2,
  },

  // Tópico 3: Soluções (Concentração, Diluição)
  {
    id: 25,
    question: "O que é uma solução química?",
    options: ["Uma mistura heterogênea de duas ou mais substâncias.", "Uma substância pura composta por um único tipo de átomo.", "Uma mistura homogênea de duas ou mais substâncias, onde o soluto está disperso no solvente.", "Um composto químico formado por ligações iônicas."],
    correctAnswer: 2,
  },
  {
    id: 26,
    question: "Qual a concentração em $g/L$ de uma solução que contém $20 \\text{ g}$ de $NaCl$ dissolvidos em $500 \\text{ mL}$ de água?",
    options: ["$10 \\text{ g/L}$", "$20 \\text{ g/L}$", "$40 \\text{ g/L}$", "$50 \\text{ g/L}$"],
    correctAnswer: 2,
  },
  {
    id: 27,
    question: "Se você tem uma solução de $2 \\text{ M}$ de $HCl$ e dilui $100 \\text{ mL}$ dessa solução para um volume final de $500 \\text{ mL}$, qual a nova concentração da solução diluída?",
    options: ["$0.2 \\text{ M}$", "$0.4 \\text{ M}$", "$1.0 \\text{ M}$", "$10.0 \\text{ M}$"],
    correctAnswer: 1,
  },
  {
    id: 28,
    question: "O que acontece com a solubilidade da maioria dos sólidos em líquidos quando a temperatura aumenta?",
    options: ["Diminui", "Aumenta", "Permanece inalterada", "Depende da pressão."],
    correctAnswer: 1,
  },
  {
    id: 29,
    question: "Qual o termo usado para descrever uma solução que contém a quantidade máxima de soluto que pode ser dissolvida em uma dada quantidade de solvente a uma determinada temperatura?",
    options: ["Solução insaturada", "Solução supersaturada", "Solução saturada", "Solução diluída"],
    correctAnswer: 2,
  },
  {
    id: 30,
    question: "Qual a molaridade de uma solução que contém $117 \\text{ g}$ de $NaCl$ em $1 \\text{ L}$ de solução? (Dados: $Na = 23 \\text{ g/mol}$, $Cl = 35.5 \\text{ g/mol}$)",
    options: ["$1.0 \\text{ M}$", "$2.0 \\text{ M}$", "$0.5 \\text{ M}$", "$0.2 \\text{ M}$"],
    correctAnswer: 1,
  },
  {
    id: 31,
    question: "Ao adicionar mais solvente a uma solução concentrada, ocorre o processo de:",
    options: ["Cristalização", "Saturação", "Diluição", "Precipitação"],
    correctAnswer: 2,
  },
  {
    id: 32,
    question: "Uma solução com menos soluto do que o máximo que poderia ser dissolvido a uma dada temperatura é chamada de:",
    options: ["Saturada", "Supersaturada", "Insaturada", "Concentrada"],
    correctAnswer: 2,
  },
  {
    id: 33,
    question: "A Lei de Henry relaciona a solubilidade de gases em líquidos com qual fator?",
    options: ["Temperatura", "Pressão", "Volume do solvente", "Natureza do soluto"],
    correctAnswer: 1,
  },
  {
    id: 34,
    question: "Qual o percentual em massa ($%m/m$) de uma solução que contém $15 \\text{ g}$ de $NaCl$ dissolvidos em $85 \\text{ g}$ de água?",
    options: ["$10\\%$", "$15\\%$", "$20\\%$", "$85\\%$"],
    correctAnswer: 1,
  },
  {
    id: 35,
    question: "A densidade de uma solução é a relação entre:",
    options: ["Massa do soluto e volume do solvente.", "Massa do solvente e volume da solução.", "Massa da solução e volume da solução.", "Massa da solução e massa do solvente."],
    correctAnswer: 2,
  },
  {
    id: 36,
    question: "Qual a unidade de concentração que expressa o número de mols de soluto por litro de solução?",
    options: ["$g/L$", "$%m/m$", "Molaridade ($M$)", "ppm"],
    correctAnswer: 2,
  },

  // Tópico 4: Termoquímica (Entalpia, Lei de Hess)
  {
    id: 37,
    question: "Em uma reação química, a variação de entalpia ($\\Delta H$) é a diferença entre a entalpia dos produtos e a entalpia dos reagentes. Qual o sinal de $\\Delta H$ em uma reação exotérmica?",
    options: ["Positivo", "Negativo", "Zero", "Pode ser positivo ou negativo."],
    correctAnswer: 1,
  },
  {
    id: 38,
    question: "Uma reação endotérmica é aquela que:",
    options: ["Libera calor para o ambiente.", "Absorve calor do ambiente.", "Não há troca de calor.", "Aumenta a temperatura do ambiente."],
    correctAnswer: 1,
  },
  {
    id: 39,
    question: "A Lei de Hess afirma que a variação de entalpia de uma reação depende:",
    options: ["Apenas da temperatura inicial.", "Apenas da pressão final.", "Apenas dos estados inicial e final, independentemente do caminho reacional.", "Do número de etapas da reação."],
    correctAnswer: 2,
  },
  {
    id: 40,
    question: "Qual o calor liberado na queima completa de $1 \\text{ mol}$ de metano ($CH_4$) se a entalpia de combustão é $-890 \\text{ kJ/mol}$?",
    options: ["$890 \\text{ kJ}$", "$-890 \\text{ kJ}$", "$445 \\text{ kJ}$", "$-445 \\text{ kJ}$"],
    correctAnswer: 0,
  },
  {
    id: 41,
    question: "Qual o nome dado à energia mínima necessária para iniciar uma reação química?",
    options: ["Energia de ligação", "Entalpia de formação", "Energia de ativação", "Entropia"],
    correctAnswer: 2,
  },
  {
    id: 42,
    question: "A entalpia padrão de formação de uma substância simples em sua forma mais estável (ex: $O_2(g)$, $C(grafite)$) é igual a:",
    options: ["$1 \\text{ kJ/mol}$", "$-1 \\text{ kJ/mol}$", "$0 \\text{ kJ/mol}$", "Depende da temperatura."],
    correctAnswer: 2,
  },
  {
    id: 43,
    question: "Se a formação de ligações químicas libera energia, e a quebra de ligações químicas absorve energia, qual o sinal da entalpia em uma reação onde a energia total das ligações formadas é maior que a das ligações quebradas?",
    options: ["Positivo (endotérmica)", "Negativo (exotérmica)", "Zero", "Indefinido"],
    correctAnswer: 1,
  },
  {
    id: 44,
    question: "Qual o processo que libera calor para o ambiente?",
    options: ["Fusão do gelo.", "Evaporação da água.", "Combustão da gasolina.", "Fotossíntese."],
    correctAnswer: 2,
  },
  {
    id: 45,
    question: "A entalpia de ligação é a energia envolvida na quebra de $1 \\text{ mol}$ de ligações em que estado físico?",
    options: ["Líquido", "Sólido", "Gasoso", "Aquoso"],
    correctAnswer: 2,
  },
  {
    id: 46,
    question: "Em um gráfico de entalpia vs. caminho da reação, uma reação endotérmica apresenta:",
    options: ["Entalpia dos produtos menor que a dos reagentes.", "Entalpia dos produtos maior que a dos reagentes.", "Entalpia dos produtos igual à dos reagentes.", "Nenhuma variação de entalpia."],
    correctAnswer: 1,
  },
  {
    id: 47,
    question: "A Lei de Hess é uma aplicação de qual princípio da física?",
    options: ["Lei da Conservação da Massa.", "Lei da Conservação da Energia.", "Lei da Ação e Reação.", "Lei da Gravitação Universal."],
    correctAnswer: 1,
  },
  {
    id: 48,
    question: "Qual a entalpia de formação de $H_2O(l)$ se a entalpia de formação de $H_2O(g)$ é $-241.8 \\text{ kJ/mol}$ e a entalpia de vaporização da água é $+44 \\text{ kJ/mol}$?",
    options: ["$-285.8 \\text{ kJ/mol}$", "$-197.8 \\text{ kJ/mol}$", "$+285.8 \\text{ kJ/mol}$", "$+197.8 \\text{ kJ/mol}$"],
    correctAnswer: 0,
  },

  // Tópico 5: Eletroquímica (Pilhas, Eletrólise)
  {
    id: 49,
    question: "Em uma pilha eletroquímica (galvânica), qual polo sofre oxidação (perda de elétrons)?",
    options: ["Cátodo", "Ânodo", "Eletrólito", "Ponte salina"],
    correctAnswer: 1,
  },
  {
    id: 50,
    question: "Em uma pilha de Daniell, qual metal atua como cátodo?",
    options: ["Zinco ($Zn$)", "Cobre ($Cu$)", "Ferro ($Fe$)", "Alumínio ($Al$)"],
    correctAnswer: 1,
  },
  {
    id: 51,
    question: "O processo de eletrólise é um processo ______ que requer energia elétrica para ocorrer.",
    options: ["Espontâneo", "Não espontâneo", "Exotérmico", "Endotérmico"],
    correctAnswer: 1,
  },
  {
    id: 52,
    question: "Qual o nome do processo de revestimento de uma peça metálica com outra por eletrólise?",
    options: ["Corrosão", "Galvanoplastia", "Oxidação", "Redução"],
    correctAnswer: 1,
  },
  {
    id: 53,
    question: "Na eletrólise de uma solução aquosa de $NaCl$, qual produto é formado no cátodo?",
    options: ["$Cl_2$", "$Na$", "$H_2$", "$O_2$"],
    correctAnswer: 2,
  },
  {
    id: 54,
    question: "O que é o potencial padrão de redução ($E^0_{red}$)?",
    options: ["A energia liberada em uma reação de oxidação.", "A medida da tendência de uma espécie em sofrer redução em condições padrão.", "A capacidade de uma espécie em doar elétrons.", "O trabalho realizado em uma reação eletroquímica."],
    correctAnswer: 1,
  },
  {
    id: 55,
    question: "Em uma pilha, os elétrons fluem do polo de menor potencial de redução (ânodo) para o polo de maior potencial de redução (cátodo). Esse fluxo de elétrons gera:",
    options: ["Corrente contínua", "Resistência elétrica", "Tensão elétrica (DDP)", "Calor"],
    correctAnswer: 2,
  },
  {
    id: 56,
    question: "A corrosão de metais é um processo eletroquímico em que o metal sofre:",
    options: ["Redução", "Oxidação", "Neutralização", "Eletrólise"],
    correctAnswer: 1,
  },
  {
    id: 57,
    question: "Qual o papel da ponte salina em uma pilha?",
    options: ["Gerar elétrons.", "Conduzir íons para manter a neutralidade elétrica das soluções.", "Armazenar energia.", "Separar os eletrodos."],
    correctAnswer: 1,
  },
  {
    id: 58,
    question: "A reação $Cu^{2+}(aq) + 2e^- \\rightarrow Cu(s)$ é um exemplo de:",
    options: ["Oxidação", "Redução", "Neutralização", "Combustão"],
    correctAnswer: 1,
  },
  {
    id: 59,
    question: "Qual a diferença fundamental entre uma pilha (célula galvânica) e uma célula eletrolítica?",
    options: ["Pilha usa corrente elétrica e eletrólise gera corrente.", "Pilha converte energia química em elétrica e eletrólise converte elétrica em química.", "Ambas geram corrente elétrica.", "Ambas consomem corrente elétrica."],
    correctAnswer: 1,
  },
  {
    id: 60,
    question: "O que é um indicador ácido-base?",
    options: ["Substância que acelera reações entre ácidos e bases.", "Substância que muda de cor conforme o pH do meio.", "Instrumento para medir a concentração de soluções.", "Substância que neutraliza ácidos e bases simultaneamente."],
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
  } = usePaginatedQuestionnaire(questions, 'QUI');

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
          <h1 className="text-3xl font-bold mb-2">Questionário de Química</h1>
          <p className="text-muted-foreground">Avaliação de Química</p>
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

export default QuestionarioQuimica;
