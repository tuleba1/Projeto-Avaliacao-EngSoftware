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

const QuestionarioBiologia = () => {
  const navigate = useNavigate();

  const questions: Question[] = [
  // Tópico 1: Genética (Leis de Mendel, DNA e RNA, Engenharia Genética)
  {
    id: 1,
    question: "Qual das seguintes alternativas descreve corretamente a Primeira Lei de Mendel?",
    options: ["Os genes se segregam independentemente durante a formação dos gametas.", "Cada caráter é determinado por um par de fatores que se separam na formação dos gametas.", "A herança de um caráter não interfere na herança de outro.", "Os alelos de um gene sempre se expressam de forma dominante."],
    correctAnswer: 1,
  },
  {
    id: 2,
    question: "Em um cruzamento entre dois indivíduos heterozigotos (Aa x Aa), qual a proporção genotípica esperada na prole?",
    options: ["1:2:1 (AA:Aa:aa)", "3:1 (Dominante:Recessivo)", "9:3:3:1", "1:1 (Aa:aa)"],
    correctAnswer: 0,
  },
  {
    id: 3,
    question: "O que é um alelo?",
    options: ["Uma sequência de DNA que não codifica proteína.", "Uma forma alternativa de um gene.", "Um cromossomo sexual.", "Uma molécula de RNA mensageiro."],
    correctAnswer: 1,
  },
  {
    id: 4,
    question: "Qual o nome do cruzamento entre um indivíduo de genótipo desconhecido e um homozigoto recessivo, utilizado para determinar o genótipo do primeiro?",
    options: ["Cruzamento monohíbrido", "Cruzamento diíbrido", "Cruzamento teste", "Cruzamento recíproco"],
    correctAnswer: 2,
  },
  {
    id: 5,
    question: "A hemofilia é um exemplo de herança ligada ao sexo. Em qual cromossomo o gene responsável pela hemofilia está localizado?",
    options: ["Cromossomo Y", "Cromossomo X", "Cromossomo 21", "Cromossomo 1"],
    correctAnswer: 1,
  },
  {
    id: 6,
    question: "Qual a probabilidade de um casal, onde a mulher é portadora de hemofilia (XHXh) e o homem é normal (XHY), ter um filho hemofílico?",
    options: ["0%", "25%", "50%", "75%"],
    correctAnswer: 1,
  },
  {
    id: 7,
    question: "O que é um genótipo?",
    options: ["As características físicas observáveis de um organismo.", "O conjunto de genes de um organismo.", "A expressão de um gene dominante.", "O ambiente em que um organismo vive."],
    correctAnswer: 1,
  },
  {
    id: 8,
    question: "E um fenótipo?",
    options: ["A constituição genética de um indivíduo.", "As características observáveis de um organismo, resultantes da interação entre genótipo e ambiente.", "Apenas as características determinadas por genes recessivos.", "O número de cromossomos de uma espécie."],
    correctAnswer: 1,
  },
  {
    id: 9,
    question: "Qual a principal função do DNA?",
    options: ["Transportar oxigênio no sangue.", "Armazenar e transmitir informações genéticas.", "Produzir energia para a célula.", "Formar a estrutura das proteínas."],
    correctAnswer: 1,
  },
  {
    id: 10,
    question: "O que é um cariótipo?",
    options: ["O conjunto de proteínas de uma célula.", "O conjunto de cromossomos de uma célula, organizados em pares.", "O processo de divisão celular.", "A sequência de bases nitrogenadas em um gene."],
    correctAnswer: 1,
  },
  {
    id: 11,
    question: "A engenharia genética permite a alteração do material genético de um organismo. Qual técnica é frequentemente utilizada para cortar e colar DNA?",
    options: ["Clonagem", "PCR (Reação em Cadeia da Polimerase)", "Tecnologia do DNA recombinante", "Fermentação"],
    correctAnswer: 2,
  },
  {
    id: 12,
    question: "Qual o processo de produção de uma molécula de RNA a partir de uma fita de DNA?",
    options: ["Replicação", "Tradução", "Transcrição", "Mutação"],
    correctAnswer: 2,
  },

  // Tópico 2: Ecologia (Fluxo de Energia, Ciclos Biogeoquímicos, Impactos Ambientais)
  {
    id: 13,
    question: "Qual das seguintes relações ecológicas é um exemplo de mutualismo?",
    options: ["Leão e zebra", "Líquen (alga e fungo)", "Tênia e ser humano", "Plantas e ervas daninhas"],
    correctAnswer: 1,
  },
  {
    id: 14,
    question: "No ciclo do carbono, qual processo remove o CO2 da atmosfera?",
    options: ["Respiração", "Combustão", "Fotossíntese", "Decomposição"],
    correctAnswer: 2,
  },
  {
    id: 15,
    question: "O que é um nicho ecológico?",
    options: ["O local físico onde uma espécie vive.", "O papel que uma espécie desempenha em seu ecossistema.", "O conjunto de todas as espécies em uma área.", "A quantidade de biomassa em um ecossistema."],
    correctAnswer: 1,
  },
  {
    id: 16,
    question: "Qual o principal gás responsável pelo efeito estufa?",
    options: ["Oxigênio (O2)", "Nitrogênio (N2)", "Dióxido de carbono (CO2)", "Hidrogênio (H2)"],
    correctAnswer: 2,
  },
  {
    id: 17,
    question: "Qual o nível trófico dos produtores em uma cadeia alimentar?",
    options: ["Consumidores primários", "Consumidores secundários", "Base da cadeia alimentar", "Decompositores"],
    correctAnswer: 2,
  },
  {
    id: 18,
    question: "No ciclo da água, qual processo transforma a água líquida em vapor d'água?",
    options: ["Precipitação", "Condensação", "Evaporação", "Infiltração"],
    correctAnswer: 2,
  },
  {
    id: 19,
    question: "Qual o papel dos decompositores em um ecossistema?",
    options: ["Produzir seu próprio alimento.", "Consumir outros organismos vivos.", "Reciclar a matéria orgânica e nutrientes.", "Realizar a fotossíntese."],
    correctAnswer: 2,
  },
  {
    id: 20,
    question: "A competição intraespecífica ocorre entre indivíduos de qual tipo?",
    options: ["Espécies diferentes.", "Mesma espécie.", "Produtores e consumidores.", "Predadores e presas."],
    correctAnswer: 1,
  },
  {
    id: 21,
    question: "O que é biomagnificação (ou bioacumulação)?",
    options: ["Aumento da biodiversidade.", "Acúmulo de substâncias tóxicas em concentrações crescentes ao longo da cadeia alimentar.", "Diminuição da população de uma espécie.", "Formação de novas espécies."],
    correctAnswer: 1,
  },
  {
    id: 22,
    question: "Qual o processo de transformação do nitrogênio atmosférico (N2) em amônia (NH3) realizado por bactérias?",
    options: ["Desnitrificação", "Nitrificação", "Fixação de nitrogênio", "Amonificação"],
    correctAnswer: 2,
  },
  {
    id: 23,
    question: "A poluição por esgoto doméstico em rios pode levar a um processo conhecido como:",
    options: ["Desertificação", "Eutrofização", "Acidificação", "Salinização"],
    correctAnswer: 1,
  },
  {
    id: 24,
    question: "Qual a principal consequência da destruição da camada de ozônio?",
    options: ["Aumento do efeito estufa.", "Diminuição da temperatura global.", "Aumento da incidência de radiação ultravioleta na Terra.", "Redução da biodiversidade marinha."],
    correctAnswer: 2,
  },

  // Tópico 3: Fisiologia Humana (Sistemas do Corpo Humano)
  {
    id: 25,
    question: "Qual órgão do sistema digestório é responsável pela maior parte da absorção de nutrientes?",
    options: ["Estômago", "Esôfago", "Intestino delgado", "Intestino grosso"],
    correctAnswer: 2,
  },
  {
    id: 26,
    question: "No sistema respiratório, onde ocorrem as trocas gasosas (hematose)?",
    options: ["Traqueia", "Brônquios", "Alvéolos pulmonares", "Faringe"],
    correctAnswer: 2,
  },
  {
    id: 27,
    question: "Qual o vaso sanguíneo que transporta sangue rico em oxigênio do coração para o corpo?",
    options: ["Veia cava", "Artéria pulmonar", "Artéria aorta", "Veia pulmonar"],
    correctAnswer: 2,
  },
  {
    id: 28,
    question: "A bile, produzida pelo fígado, tem como principal função no sistema digestório:",
    options: ["Digerir carboidratos.", "Emulsificar gorduras.", "Absorver água.", "Produzir enzimas digestivas."],
    correctAnswer: 1,
  },
  {
    id: 29,
    question: "Qual a função principal do diafragma no processo respiratório?",
    options: ["Filtrar o ar.", "Aquecer o ar.", "Promover a inspiração e expiração.", "Proteger os pulmões."],
    correctAnswer: 2,
  },
  {
    id: 30,
    question: "As hemácias (glóbulos vermelhos) são responsáveis pelo transporte de qual substância no sangue?",
    options: ["Nutrientes", "Oxigênio", "Hormônios", "Anticorpos"],
    correctAnswer: 1,
  },
  {
    id: 31,
    question: "Qual a ordem correta do caminho do alimento no sistema digestório?",
    options: ["Estômago, esôfago, boca, intestino delgado, intestino grosso.", "Boca, faringe, esôfago, estômago, intestino delgado, intestino grosso.", "Boca, estômago, esôfago, intestino delgado, intestino grosso.", "Faringe, boca, esôfago, estômago, intestino grosso, intestino delgado."],
    correctAnswer: 1,
  },
  {
    id: 32,
    question: "O que é a epiglote e qual sua função?",
    options: ["Uma cartilagem na traqueia que impede a entrada de alimentos nos pulmões.", "Um músculo que auxilia na deglutição.", "Uma glândula que produz saliva.", "Uma parte do intestino grosso que absorve água."],
    correctAnswer: 0,
  },
  {
    id: 33,
    question: "Qual a principal função dos rins no corpo humano?",
    options: ["Produzir hormônios.", "Filtrar o sangue e produzir urina.", "Armazenar glicogênio.", "Sintetizar vitaminas."],
    correctAnswer: 1,
  },
  {
    id: 34,
    question: "O sistema circulatório é dividido em pequena e grande circulação. Qual a função da pequena circulação?",
    options: ["Levar sangue oxigenado para todo o corpo.", "Levar sangue rico em CO2 do coração para os pulmões e trazer sangue rico em O2 de volta ao coração.", "Absorver nutrientes no intestino.", "Filtrar o sangue nos rins."],
    correctAnswer: 1,
  },
  {
    id: 35,
    question: "Qual o papel do pâncreas no sistema digestório?",
    options: ["Armazenar a bile.", "Produzir suco pancreático com enzimas digestivas e hormônios como insulina.", "Absorver gorduras.", "Produzir ácido clorídrico."],
    correctAnswer: 1,
  },
  {
    id: 36,
    question: "Qual componente do sangue é responsável pela coagulação?",
    options: ["Hemácias", "Leucócitos", "Plaquetas", "Plasma"],
    correctAnswer: 2,
  },

  // Tópico 4: Evolução (Teorias Evolutivas, Evidências, Especiação)
  {
    id: 37,
    question: "Qual teoria evolutiva propõe que as características adquiridas durante a vida de um organismo podem ser transmitidas aos seus descendentes?",
    options: ["Darwinismo", "Neodarwinismo", "Lamarckismo", "Fixismo"],
    correctAnswer: 2,
  },
  {
    id: 38,
    question: "Charles Darwin é o principal proponente de qual teoria evolutiva?",
    options: ["Lei do Uso e Desuso", "Seleção Natural", "Geração Espontânea", "Catastrofismo"],
    correctAnswer: 1,
  },
  {
    id: 39,
    question: "O que são órgãos homólogos?",
    options: ["Órgãos com funções diferentes, mas mesma origem embrionária.", "Órgãos com funções iguais, mas origens embrionárias diferentes.", "Órgãos que não possuem função aparente.", "Órgãos que desapareceram ao longo da evolução."],
    correctAnswer: 0,
  },
  {
    id: 40,
    question: "A presença de estruturas vestigiais em alguns organismos é uma evidência de qual processo?",
    options: ["Fixismo", "Geração espontânea", "Evolução", "Criacionismo"],
    correctAnswer: 2,
  },
  {
    id: 41,
    question: "Qual o conceito central do Neodarwinismo?",
    options: ["Apenas a seleção natural explica a evolução.", "A herança de caracteres adquiridos é o motor da evolução.", "A evolução é resultado da seleção natural atuando sobre a variabilidade genética (mutações e recombinação).", "As espécies são imutáveis ao longo do tempo."],
    correctAnswer: 2,
  },
  {
    id: 42,
    question: "O que são fósseis e qual sua importância para o estudo da evolução?",
    options: ["Restos de organismos vivos que indicam a ausência de evolução.", "Evidências de vida passada, que mostram a mudança das espécies ao longo do tempo.", "Rochas que não contêm informações biológicas.", "Organismos atuais que não sofreram modificações."],
    correctAnswer: 1,
  },
  {
    id: 43,
    question: "O que é especiação?",
    options: ["A extinção de uma espécie.", "O surgimento de novas espécies a partir de uma preexistente.", "A migração de uma espécie para um novo habitat.", "A adaptação de uma espécie ao ambiente."],
    correctAnswer: 1,
  },
  {
    id: 44,
    question: "Qual o papel das mutações na evolução?",
    options: ["São sempre prejudiciais e levam à extinção.", "São a principal fonte de variabilidade genética, sobre a qual a seleção natural atua.", "Não têm impacto na evolução das espécies.", "Apenas ocorrem em organismos geneticamente modificados."],
    correctAnswer: 1,
  },
  {
    id: 45,
    question: "A resistência de bactérias a antibióticos é um exemplo de qual processo evolutivo?",
    options: ["Lamarckismo", "Fixismo", "Seleção natural", "Geração espontânea"],
    correctAnswer: 2,
  },
  {
    id: 46,
    question: "O que são órgãos análogos?",
    options: ["Órgãos com a mesma origem embrionária e mesma função.", "Órgãos com origens embrionárias diferentes, mas mesma função.", "Órgãos que não possuem função.", "Órgãos que se atrofiaram ao longo da evolução."],
    correctAnswer: 1,
  },
  {
    id: 47,
    question: "A irradiação adaptativa é um processo em que:",
    options: ["Espécies diferentes se tornam mais semelhantes.", "Uma espécie ancestral dá origem a várias espécies adaptadas a diferentes nichos.", "Organismos perdem suas adaptações ao longo do tempo.", "A evolução ocorre de forma muito lenta e gradual."],
    correctAnswer: 1,
  },
  {
    id: 48,
    question: "Qual a principal diferença entre a teoria de Lamarck e a de Darwin?",
    options: ["Lamarck acreditava na seleção natural, Darwin não.", "Lamarck defendia a herança de caracteres adquiridos, Darwin a seleção natural da variabilidade pré-existente.", "Ambos acreditavam na geração espontânea.", "Darwin não considerava o ambiente na evolução."],
    correctAnswer: 1,
  },

  // Tópico 5: Reino Animal (Classificação, Características dos Filos)
  {
    id: 49,
    question: "Qual filo do Reino Animal é caracterizado por possuir corpo com poros e ser sésseis na fase adulta, como as esponjas?",
    options: ["Cnidaria", "Porifera", "Platyhelminthes", "Mollusca"],
    correctAnswer: 1,
  },
  {
    id: 50,
    question: "Os cnidários (como águas-vivas e corais) são conhecidos por possuírem células urticantes. Qual o nome dessas células?",
    options: ["Amebócitos", "Coanócitos", "Cnidócitos", "Nematócitos"],
    correctAnswer: 2,
  },
  {
    id: 51,
    question: "Qual filo inclui vermes achatados, como a planária e a tênia?",
    options: ["Nematoda", "Annelida", "Platyhelminthes", "Arthropoda"],
    correctAnswer: 2,
  },
  {
    id: 52,
    question: "Qual o maior filo do Reino Animal em número de espécies, incluindo insetos, aracnídeos e crustáceos?",
    options: ["Mollusca", "Chordata", "Echinodermata", "Arthropoda"],
    correctAnswer: 3,
  },
  {
    id: 53,
    question: "Os moluscos (como caracóis, ostras e polvos) geralmente possuem um corpo mole e, em muitos casos, uma concha. Qual estrutura é responsável pela formação da concha?",
    options: ["Pé muscular", "Manto", "Rádula", "Sifão"],
    correctAnswer: 1,
  },
  {
    id: 54,
    question: "Qual filo é caracterizado por animais com simetria radial na fase adulta e endoesqueleto calcário, como estrelas-do-mar e ouriços-do-mar?",
    options: ["Cnidaria", "Annelida", "Echinodermata", "Nematoda"],
    correctAnswer: 2,
  },
  {
    id: 55,
    question: "Os peixes, anfíbios, répteis, aves e mamíferos pertencem a qual filo?",
    options: ["Arthropoda", "Mollusca", "Chordata", "Echinodermata"],
    correctAnswer: 2,
  },
  {
    id: 56,
    question: "Qual característica é exclusiva dos mamíferos?",
    options: ["Respiração pulmonar", "Presença de pelos e glândulas mamárias", "Homeotermia", "Sistema circulatório fechado"],
    correctAnswer: 1,
  },
  {
    id: 57,
    question: "As aves são caracterizadas por possuírem penas, bico e serem:",
    options: ["Pecilotérmicas", "Ovovivíparas", "Homeotérmicas", "Vivíparas"],
    correctAnswer: 2,
  },
  {
    id: 58,
    question: "Qual o filo dos vermes cilíndricos, como a lombriga (Ascaris lumbricoides)?",
    options: ["Platyhelminthes", "Annelida", "Nematoda", "Cnidaria"],
    correctAnswer: 2,
  },
  {
    id: 59,
    question: "Os anfíbios (como sapos e rãs) apresentam qual tipo de respiração na fase adulta?",
    options: ["Branquial", "Cutânea e pulmonar", "Traqueal", "Apenas pulmonar"],
    correctAnswer: 1,
  },
  {
    id: 60,
    question: "Qual a principal característica que diferencia os répteis dos anfíbios em relação à reprodução?",
    options: ["Répteis são vivíparos.", "Répteis dependem da água para a reprodução.", "Répteis possuem ovo com casca e anexos embrionários, não dependendo da água para reprodução.", "Anfíbios não se reproduzem sexualmente."],
    correctAnswer: 2,
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
  } = usePaginatedQuestionnaire(questions, 'BIO');

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
          <h1 className="text-3xl font-bold mb-2">Questionário de Biologia</h1>
          <p className="text-muted-foreground">Avaliação de Biologia</p>
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

export default QuestionarioBiologia;
