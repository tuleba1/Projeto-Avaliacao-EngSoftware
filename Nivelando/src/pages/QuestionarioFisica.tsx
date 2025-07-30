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

const QuestionarioFisica = () => {
  const navigate = useNavigate();

  const questions: Question[] = [
  // Tópico 1: Termologia (Calor, Temperatura, Dilatação, Gases)
  {
    id: 1,
    question: "Qual a principal diferença entre calor e temperatura?",
    options: [
      "Calor é a energia interna de um corpo, e temperatura é a energia em trânsito.",
      "Calor é a energia térmica em trânsito devido a uma diferença de temperatura, e temperatura é a medida do grau de agitação das moléculas.",
      "Calor é medido em graus Celsius, e temperatura em Joules.",
      "Calor e temperatura são sinônimos e representam a mesma grandeza física.",
    ],
    correctAnswer: 1,
  },
  {
    id: 2,
    question: "Um corpo de massa $2 \\text{ kg}$ e calor específico $400 \\text{ J/(kg \\cdot \\degree C)}$ é aquecido de $20 \\degree C$ para $30 \\degree C$. Qual a quantidade de calor absorvida pelo corpo?",
    options: ["$800 \\text{ J}$", "$4000 \\text{ J}$", "$8000 \\text{ J}$", "$16000 \\text{ J}$"],
    correctAnswer: 2,
  },
  {
    id: 3,
    question: "O que é calor latente?",
    options: [
      "A energia térmica que causa a variação de temperatura de um corpo.",
      "A energia térmica absorvida ou liberada durante uma mudança de estado físico, sem alteração de temperatura.",
      "A capacidade de um corpo armazenar calor.",
      "A energia total das moléculas de um sistema.",
    ],
    correctAnswer: 1,
  },
  {
    id: 4,
    question: "A Primeira Lei da Termodinâmica é uma aplicação do princípio da:",
    options: [
      "Conservação da quantidade de movimento.",
      "Conservação da energia.",
      "Conservação da massa.",
      "Aumento da entropia.",
    ],
    correctAnswer: 1,
  },
  {
    id: 5,
    question: "Qual o coeficiente de dilatação linear de um material se uma barra de $1 \\text{ m}$ aumenta $2 \\text{ mm}$ ao ter sua temperatura elevada em $50 \\degree C$?",
    options: [
      "$4 \\times 10^{-5} \\text{ \\degree C}^{-1}$",
      "$2 \\times 10^{-5} \\text{ \\degree C}^{-1}$",
      "$4 \\times 10^{-6} \\text{ \\degree C}^{-1}$",
      "$2 \\times 10^{-6} \\text{ \\degree C}^{-1}$",
    ],
    correctAnswer: 0,
  },
  {
    id: 6,
    question: "Qual a escala termométrica que não admite valores negativos, sendo conhecida como escala absoluta?",
    options: ["Celsius", "Fahrenheit", "Kelvin", "Réaumur"],
    correctAnswer: 2,
  },
  {
    id: 7,
    question: "A transmissão de calor por convecção ocorre predominantemente em:",
    options: ["Sólidos", "Líquidos e gases", "Vácuo", "Metais"],
    correctAnswer: 1,
  },
  {
    id: 8,
    question: "O que é um gás ideal?",
    options: [
      "Um gás que se liquefaz facilmente.",
      "Um modelo teórico de gás cujas partículas não interagem entre si e possuem volume desprezível.",
      "Um gás que não pode ser comprimido.",
      "Um gás que existe apenas em altas temperaturas.",
    ],
    correctAnswer: 1,
  },
  {
    id: 9,
    question: "Se a temperatura de um gás em um recipiente fechado e de volume constante aumenta, o que acontece com a pressão do gás?",
    options: ["Diminui", "Aumenta", "Permanece constante", "Torna-se zero"],
    correctAnswer: 1,
  },
  {
    id: 10,
    question: "A dilatação anômala da água ocorre quando ela é resfriada de $4 \\degree C$ para $0 \\degree C$. O que acontece com seu volume nesse intervalo?",
    options: ["Diminui", "Aumenta", "Permanece constante", "Primeiro diminui, depois aumenta"],
    correctAnswer: 1,
  },
  {
    id: 11,
    question: "Qual o processo de transmissão de calor que não necessita de um meio material?",
    options: ["Condução", "Convecção", "Irradiação", "Vaporização"],
    correctAnswer: 2,
  },
  {
    id: 12,
    question: "O ponto triplo da água é a condição de temperatura e pressão em que a água coexiste nos três estados físicos. Em qual escala ele é $273.16 \\text{ K}$?",
    options: ["Celsius", "Fahrenheit", "Kelvin", "Todas as escalas"],
    correctAnswer: 2,
  },

  // Tópico 2: Óptica (Reflexão, Refração, Lentes, Espelhos)
  {
    id: 13,
    question: "Qual fenômeno óptico é responsável pela formação da imagem em um espelho plano?",
    options: ["Refração", "Difração", "Reflexão", "Dispersão"],
    correctAnswer: 2,
  },
  {
    id: 14,
    question: "Em um espelho côncavo, se um objeto é colocado no centro de curvatura ($C$), a imagem formada será:",
    options: ["Real, invertida e menor.", "Virtual, direita e maior.", "Real, invertida e igual.", "Virtual, direita e menor."],
    correctAnswer: 2,
  },
  {
    id: 15,
    question: "Qual fenômeno óptico ocorre quando a luz passa de um meio para outro, mudando sua velocidade e direção?",
    options: ["Reflexão", "Absorção", "Refração", "Polarização"],
    correctAnswer: 2,
  },
  {
    id: 16,
    question: "A miopia é um defeito de visão em que a imagem se forma antes da retina. Qual tipo de lente é usado para corrigi-la?",
    options: ["Lente convergente", "Lente divergente", "Lente cilíndrica", "Lente plana"],
    correctAnswer: 1,
  },
  {
    id: 17,
    question: "O que é o índice de refração de um meio?",
    options: [
      "A velocidade da luz no vácuo.",
      "A capacidade de um meio refletir a luz.",
      "A razão entre a velocidade da luz no vácuo e a velocidade da luz nesse meio.",
      "A quantidade de luz que um meio absorve.",
    ],
    correctAnswer: 2,
  },
  {
    id: 18,
    question: "Em um espelho convexo, as imagens formadas são sempre:",
    options: ["Reais, invertidas e menores.", "Virtuais, direitas e maiores.", "Virtuais, direitas e menores.", "Reais, invertidas e maiores."],
    correctAnswer: 2,
  },
  {
    id: 19,
    question: "A dispersão da luz, que pode ser observada em um prisma, é o fenômeno em que a luz branca se decompõe em:",
    options: ["Duas cores.", "Sete cores (espectro visível).", "Apenas a cor vermelha.", "Apenas a cor azul."],
    correctAnswer: 1,
  },
  {
    id: 20,
    question: "Qual o tipo de lente usada para corrigir a hipermetropia (dificuldade para ver de perto)?",
    options: ["Lente divergente", "Lente convergente", "Lente cilíndrica", "Lente bifocal"],
    correctAnswer: 1,
  },
  {
    id: 21,
    question: "A Lei de Snell-Descartes descreve o comportamento da luz no fenômeno de:",
    options: ["Reflexão", "Difração", "Refração", "Interferência"],
    correctAnswer: 2,
  },
  {
    id: 22,
    question: "Qual o nome do fenômeno óptico responsável pela observação de um arco-íris?",
    options: ["Reflexão total", "Refração e dispersão da luz solar em gotas de água.", "Difração da luz.", "Interferência de ondas de luz."],
    correctAnswer: 1,
  },
  {
    id: 23,
    question: "Em qual tipo de espelho a imagem conjugada é sempre virtual, direita e do mesmo tamanho do objeto?",
    options: ["Espelho côncavo", "Espelho convexo", "Espelho plano", "Espelho parabólico"],
    correctAnswer: 2,
  },
  {
    id: 24,
    question: "O que é 'foco' em um espelho ou lente?",
    options: [
      "O ponto onde o objeto é colocado.",
      "O ponto por onde a luz passa sem desviar.",
      "O ponto onde os raios de luz paralelos ao eixo principal se encontram (ou seus prolongamentos).",
      "O centro do espelho ou lente.",
    ],
    correctAnswer: 2,
  },

  // Tópico 3: Ondas (Tipos de Ondas, Fenômenos Ondulatórios, Som)
  {
    id: 25,
    question: "Qual a diferença principal entre ondas transversais e longitudinais?",
    options: [
      "Ondas transversais se propagam no vácuo, longitudinais não.",
      "Ondas transversais têm oscilação paralela à direção de propagação; longitudinais, oscilação perpendicular.",
      "Ondas transversais têm oscilação perpendicular à direção de propagação; longitudinais, oscilação paralela.",
      "Ondas transversais são sonoras, longitudinais são luminosas.",
    ],
    correctAnswer: 2,
  },
  {
    id: 26,
    question: "A velocidade de uma onda ($v$) pode ser calculada a partir de seu comprimento de onda ($\\lambda$) e sua frequência ($f$) pela fórmula:",
    options: ["$v = \\lambda / f$", "$v = f \\cdot \\lambda$", "$v = f + \\lambda$", "$v = f - \\lambda$"],
    correctAnswer: 1,
  },
  {
    id: 27,
    question: "Qual fenômeno ondulatório ocorre quando uma onda contorna um obstáculo ou se espalha ao passar por uma fenda?",
    options: ["Reflexão", "Refração", "Difração", "Interferência"],
    correctAnswer: 2,
  },
  {
    id: 28,
    question: "O som é uma onda de que tipo?",
    options: [
      "Eletromagnética e transversal.",
      "Mecânica e longitudinal.",
      "Eletromagnética e longitudinal.",
      "Mecânica e transversal.",
    ],
    correctAnswer: 1,
  },
  {
    id: 29,
    question: "A altura (ou tom) de um som está relacionada a qual característica da onda sonora?",
    options: ["Amplitude", "Velocidade", "Frequência", "Comprimento de onda"],
    correctAnswer: 2,
  },
  {
    id: 30,
    question: "O que é 'ressonância' em ondas?",
    options: [
      "A onda é refletida por um obstáculo.",
      "A onda muda de meio de propagação.",
      "Um sistema oscila com máxima amplitude quando a frequência da força externa é igual à sua frequência natural.",
      "Duas ondas se encontram e se anulam.",
    ],
    correctAnswer: 2,
  },
  {
    id: 31,
    question: "Qual fenômeno explica por que o céu é azul?",
    options: ["Reflexão total.", "Dispersão da luz em prismas.", "Espalhamento (Rayleigh) da luz azul pela atmosfera.", "Interferência construtiva."],
    correctAnswer: 2,
  },
  {
    id: 32,
    question: "O efeito Doppler é o fenômeno que descreve a alteração da frequência percebida de uma onda devido:",
    options: [
      "À mudança de meio de propagação.",
      "Ao movimento relativo entre a fonte da onda e o observador.",
      "À interferência de duas ondas.",
      "À absorção da onda pelo meio.",
    ],
    correctAnswer: 1,
  },
  {
    id: 33,
    question: "A intensidade (ou volume) de um som está relacionada a qual característica da onda sonora?",
    options: ["Frequência", "Comprimento de onda", "Amplitude", "Velocidade"],
    correctAnswer: 2,
  },
  {
    id: 34,
    question: "Qual o tipo de onda que não necessita de um meio material para se propagar (ex: luz, ondas de rádio)?",
    options: ["Onda mecânica", "Onda sonora", "Onda eletromagnética", "Onda de choque"],
    correctAnswer: 2,
  },
  {
    id: 35,
    question: "O eco é um exemplo de qual fenômeno ondulatório?",
    options: ["Refração", "Difração", "Reflexão", "Interferência"],
    correctAnswer: 2,
  },
  {
    id: 36,
    question: "A característica que permite distinguir dois sons de mesma altura e intensidade, emitidos por fontes diferentes, é o(a):",
    options: ["Amplitude", "Frequência", "Timbre", "Velocidade"],
    correctAnswer: 2,
  },

  // Tópico 4: Eletrostática (Cargas, Campo Elétrico, Potencial)
  {
    id: 37,
    question: "O que acontece com duas cargas elétricas de mesmo sinal quando colocadas próximas uma da outra?",
    options: ["Elas se atraem.", "Elas se repelem.", "Elas se anulam.", "Elas permanecem inalteradas."],
    correctAnswer: 1,
  },
  {
    id: 38,
    question: "A unidade de medida da carga elétrica no Sistema Internacional (SI) é o:",
    options: ["Volt (V)", "Ampere (A)", "Ohm (\\Omega)", "Coulomb (C)"],
    correctAnswer: 3,
  },
  {
    id: 39,
    question: "A Lei de Coulomb descreve a força de interação entre duas cargas elétricas e afirma que essa força é diretamente proporcional ao produto das cargas e inversamente proporcional ao quadrado da distância entre elas. Essa lei é para cargas:",
    options: ["Apenas positivas.", "Apenas negativas.", "Em repouso.", "Em movimento."],
    correctAnswer: 2,
  },
  {
    id: 40,
    question: "Qual o nome da região do espaço onde uma carga elétrica exerce influência sobre outras cargas?",
    options: ["Campo gravitacional", "Campo magnético", "Campo elétrico", "Campo de força"],
    correctAnswer: 2,
  },
  {
    id: 41,
    question: "O que é 'potencial elétrico' em um ponto do espaço?",
    options: [
      "A energia cinética de uma carga nesse ponto.",
      "O trabalho realizado para mover uma carga de um ponto ao infinito.",
      "A energia potencial elétrica por unidade de carga colocada nesse ponto.",
      "A força elétrica em uma carga de prova.",
    ],
    correctAnswer: 2,
  },
  {
    id: 42,
    question: "Qual o processo de eletrização que ocorre quando um corpo neutro é eletrizado por contato com um corpo já eletrizado, adquirindo carga de mesmo sinal?",
    options: ["Atrito", "Indução", "Contato", "Aterramento"],
    correctAnswer: 2,
  },
  {
    id: 43,
    question: "As linhas de força de um campo elétrico sempre apontam para onde?",
    options: [
      "Do negativo para o positivo.",
      "Do positivo para o negativo.",
      "Para o infinito.",
      "Para o centro da carga.",
    ],
    correctAnswer: 1,
  },
  {
    id: 44,
    question: "O que é um condutor elétrico?",
    options: [
      "Um material que não permite a passagem de corrente elétrica.",
      "Um material que permite a passagem de corrente elétrica com facilidade.",
      "Um material que se eletriza apenas por atrito.",
      "Um material isolante térmico.",
    ],
    correctAnswer: 1,
  },
  {
    id: 45,
    question: "Qual a unidade de medida do campo elétrico no SI?",
    options: ["Newton (N)", "Joule (J)", "Volt por metro (V/m) ou Newton por Coulomb (N/C)", "Watt (W)"],
    correctAnswer: 2,
  },
  {
    id: 46,
    question: "Quando um corpo neutro é eletrizado por indução, ele adquire carga de sinal ______ à do corpo indutor.",
    options: ["Igual", "Oposto", "Nulo", "Variável"],
    correctAnswer: 1,
  },
  {
    id: 47,
    question: "O que é um corpo 'aterrado' em eletrostática?",
    options: [
      "Um corpo que acumula muita carga elétrica.",
      "Um corpo conectado à Terra para descarregar ou receber elétrons e permanecer neutro.",
      "Um corpo isolado eletricamente.",
      "Um corpo que não pode ser eletrizado.",
    ],
    correctAnswer: 1,
  },
  {
    id: 48,
    question: "Qual a relação entre campo elétrico e potencial elétrico?",
    options: [
      "São grandezas independentes.",
      "O campo elétrico é o gradiente negativo do potencial elétrico.",
      "O potencial elétrico é o produto do campo elétrico pela distância.",
      "O campo elétrico é o inverso do potencial elétrico.",
    ],
    correctAnswer: 1,
  },

  // Tópico 5: Eletrodinâmica (Corrente, Resistência, Leis de Ohm, Circuitos)
  {
    id: 49,
    question: "Qual a unidade de medida da corrente elétrica no Sistema Internacional (SI)?",
    options: ["Volt (V)", "Ohm (\\Omega)", "Ampere (A)", "Watt (W)"],
    correctAnswer: 2,
  },
  {
    id: 50,
    question: "Um resistor de $10 \\Omega$ é percorrido por uma corrente de $2 \\text{ A}$. Qual a diferença de potencial (tensão) aplicada a esse resistor?",
    options: ["$5 \\text{ V}$", "$12 \\text{ V}$", "$20 \\text{ V}$", "$0.2 \\text{ V}$"],
    correctAnswer: 2,
  },
  {
    id: 51,
    question: "Em um circuito elétrico em série, o que acontece com a corrente elétrica total se mais resistores forem adicionados?",
    options: ["Aumenta", "Diminui", "Permanece a mesma", "Torna-se zero"],
    correctAnswer: 1,
  },
  {
    id: 52,
    question: "Qual o fenômeno físico responsável pela produção de luz em uma lâmpada incandescente?",
    options: ["Efeito fotoelétrico", "Efeito Joule", "Indução eletromagnética", "Ressonância magnética"],
    correctAnswer: 1,
  },
  {
    id: 53,
    question: "Três resistores de $6 \\Omega$ cada um são associados em paralelo. Qual a resistência equivalente dessa associação?",
    options: ["$18 \\Omega$", "$6 \\Omega$", "$2 \\Omega$", "$3 \\Omega$"],
    correctAnswer: 2,
  },
  {
    id: 54,
    question: "Qual a potência elétrica de um aparelho que consome $120 \\text{ V}$ de tensão e é percorrido por uma corrente de $0.5 \\text{ A}$?",
    options: ["$60 \\text{ W}$", "$240 \\text{ W}$", "$120.5 \\text{ W}$", "$0.4 \\text{ W}$"],
    correctAnswer: 0,
  },
  {
    id: 55,
    question: "A Segunda Lei de Ohm afirma que a resistência de um condutor depende de seu material (resistividade), seu comprimento e sua:",
    options: ["Corrente elétrica", "Tensão aplicada", "Área da seção transversal", "Temperatura ambiente"],
    correctAnswer: 2,
  },
  {
    id: 56,
    question: "Em um circuito em paralelo, o que acontece com a tensão elétrica em cada resistor?",
    options: ["É a mesma em todos os resistores.", "É proporcional à resistência de cada resistor.", "Diminui à medida que mais resistores são adicionados.", "É inversamente proporcional à corrente em cada resistor."],
    correctAnswer: 0,
  },
  {
    id: 57,
    question: "Qual o nome da medida da oposição que um material oferece à passagem da corrente elétrica?",
    options: ["Condutância", "Potência", "Resistência", "Tensão"],
    correctAnswer: 2,
  },
  {
    id: 58,
    question: "Um fusível é um dispositivo de segurança em circuitos elétricos que tem a função de:",
    options: ["Aumentar a corrente elétrica.", "Diminuir a tensão.", "Proteger o circuito contra sobrecargas, interrompendo a corrente quando esta excede um valor seguro.", "Aumentar a resistência total do circuito."],
    correctAnswer: 2,
  },
  {
    id: 59,
    question: "Qual a relação entre potência ($P$), tensão ($U$) e resistência ($R$) na Lei de Joule?",
    options: ["$P = U \\cdot R$", "$P = U / R$", "$P = R \\cdot I^2$", "$P = U^2 / I$"],
    correctAnswer: 2,
  },
  {
    id: 60,
    question: "A 'curto-circuito' ocorre quando:",
    options: [
      "A corrente elétrica flui por um caminho de alta resistência.",
      "A corrente elétrica flui por um caminho de resistência muito baixa, resultando em grande aumento da corrente.",
      "O circuito é aberto intencionalmente.",
      "A tensão no circuito é muito baixa.",
    ],
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
  } = usePaginatedQuestionnaire(questions, 'FIS');

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
          <h1 className="text-3xl font-bold mb-2">Questionário de Física</h1>
          <p className="text-muted-foreground">Avaliação de Física</p>
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

export default QuestionarioFisica;