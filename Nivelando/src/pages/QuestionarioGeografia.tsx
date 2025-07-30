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

const QuestionarioGeografia = () => {
  const navigate = useNavigate();

  const questions: Question[] = [
  // Tópico 1: Globalização e Nova Ordem Mundial
  {
    id: 1,
    question: "A globalização, em sua fase atual, é impulsionada principalmente pelo avanço de qual setor?",
    options: ["Agricultura tradicional", "Tecnologias de informação e comunicação", "Indústria de base", "Mineração de carvão"],
    correctAnswer: 1,
  },
  {
    id: 2,
    question: "Qual característica define a 'Nova Ordem Mundial' que se estabeleceu após o fim da Guerra Fria?",
    options: ["Bipolaridade ideológica entre EUA e URSS.", "Unipolaridade militar dos EUA e multipolaridade econômica.", "Fragmentação total do poder global.", "Domínio exclusivo da Europa no cenário mundial."],
    correctAnswer: 1,
  },
  {
    id: 3,
    question: "Os 'fluxos imateriais' da globalização referem-se a:",
    options: ["Movimento de mercadorias entre países.", "Deslocamento de pessoas (migrações).", "Transferência de informações, capitais e dados.", "Transporte de matérias-primas."],
    correctAnswer: 2,
  },
  {
    id: 4,
    question: "O que significa 'desterritorialização' no contexto da globalização?",
    options: ["Aumento do controle estatal sobre o território.", "Perda da importância das fronteiras físicas e das referências locais.", "Fortalecimento das identidades nacionais.", "Apenas o crescimento das cidades."],
    correctAnswer: 1,
  },
  {
    id: 5,
    question: "Qual o papel das empresas transnacionais (multinacionais) na economia globalizada?",
    options: ["Restringir o comércio internacional.", "Atuar em apenas um país, controlando o mercado local.", "Produzir e vender em escala mundial, influenciando as economias de diversos países.", "Focar apenas em importação de produtos."],
    correctAnswer: 2,
  },
  {
    id: 6,
    question: "O conceito de 'Aldeia Global' se refere a:",
    options: ["A criação de pequenas comunidades isoladas.", "A interconexão mundial proporcionada pelas tecnologias, que faz com que o mundo pareça menor e mais próximo.", "O crescimento das áreas rurais.", "A volta do regionalismo extremo."],
    correctAnswer: 1,
  },
  {
    id: 7,
    question: "A 'guerra fiscal' entre países ou regiões é uma consequência da globalização que se manifesta pela:",
    options: ["Colaboração para aumentar impostos.", "Disputa por investimentos através da redução de impostos e incentivos fiscais.", "Criação de barreiras comerciais.", "Padronização das moedas."],
    correctAnswer: 1,
  },
  {
    id: 8,
    question: "Qual o termo para a parte da população que não tem acesso aos benefícios da globalização (tecnologia, consumo)?",
    options: ["Inclusão digital", "Cidadania plena", "Exclusão digital e social", "Sociedade da informação"],
    correctAnswer: 2,
  },
  {
    id: 9,
    question: "Os blocos econômicos (ex: União Europeia, Mercosul) são uma resposta à globalização que buscam:",
    options: ["Isolar economicamente seus membros.", "Fortalecer a competitividade de seus membros no cenário internacional através da integração.", "Aumentar as barreiras comerciais entre os países.", "Impedir o livre comércio."],
    correctAnswer: 1,
  },
  {
    id: 10,
    question: "O que é 'infoxicação' (information overload) no contexto da globalização informacional?",
    options: ["Falta de acesso à informação.", "Excesso de informação, dificultando a análise e compreensão.", "Informações muito precisas e concisas.", "Apenas informações falsas."],
    correctAnswer: 1,
  },
  {
    id: 11,
    question: "A 'Terceira Revolução Industrial' (ou Revolução Técnico-Científica Informacional) está ligada ao desenvolvimento de:",
    options: ["Máquina a vapor e ferro.", "Eletricidade e petróleo.", "Informática, biotecnologia e novas tecnologias de comunicação.", "Energia nuclear e carvão."],
    correctAnswer: 2,
  },
  {
    id: 12,
    question: "Qual a consequência da globalização que favorece a difusão de uma cultura global, por vezes em detrimento das culturas locais?",
    options: ["Localismo", "Hibridismo cultural", "Homogeneização cultural", "Diversidade cultural"],
    correctAnswer: 2,
  },

  // Tópico 2: Questões Ambientais Globais e Sustentabilidade
  {
    id: 13,
    question: "O efeito estufa é um fenômeno natural essencial para a vida na Terra. No entanto, o que tem causado seu agravamento e o aquecimento global?",
    options: ["Aumento da camada de ozônio.", "Diminuição das atividades vulcânicas.", "Emissão excessiva de gases de efeito estufa (GEE) por atividades humanas.", "Aumento da radiação solar que atinge a Terra."],
    correctAnswer: 2,
  },
  {
    id: 14,
    question: "O que caracteriza o conceito de 'desenvolvimento sustentável'?",
    options: ["Priorizar o crescimento econômico a qualquer custo, sem se preocupar com o meio ambiente.", "Apenas a preservação da natureza, sem considerar as necessidades humanas.", "Atender às necessidades do presente sem comprometer a capacidade das futuras gerações de atenderem às suas próprias necessidades.", "Utilizar todos os recursos naturais disponíveis para maximizar a produção industrial."],
    correctAnswer: 2,
  },
  {
    id: 15,
    question: "A desertificação é um processo de degradação ambiental que afeta principalmente áreas:",
    options: ["Tropicais úmidas com alta pluviosidade.", "De alta latitude com climas frios.", "Áridas, semiáridas e subúmidas secas, devido à combinação de fatores climáticos e atividades humanas.", "Costeiras com grande influência de marés."],
    correctAnswer: 2,
  },
  {
    id: 16,
    question: "Qual o principal objetivo das Conferências do Clima (COPs) promovidas pela ONU?",
    options: ["Negociar acordos comerciais entre países em desenvolvimento.", "Promover o intercâmbio cultural e turístico entre nações.", "Estabelecer metas e estratégias para combater as mudanças climáticas e seus impactos.", "Definir as fronteiras territoriais de novos países."],
    correctAnswer: 2,
  },
  {
    id: 17,
    question: "A 'pegada ecológica' é um indicador que mede:",
    options: ["A quantidade de lixo produzida por uma cidade.", "A área de terra e água biologicamente produtiva necessária para sustentar o estilo de vida de uma população ou indivíduo.", "O impacto de um terremoto em uma determinada região.", "A taxa de natalidade de uma espécie em um ecossistema."],
    correctAnswer: 1,
  },
  {
    id: 18,
    question: "Qual a principal causa do desmatamento na Amazônia brasileira?",
    options: ["Atividade industrial urbana.", "Crescimento da agricultura familiar.", "Expansão da pecuária e da fronteira agrícola, exploração madeireira ilegal.", "Construção de hidrelétricas apenas."],
    correctAnswer: 2,
  },
  {
    id: 19,
    question: "O fenômeno da 'chuva ácida' é causado principalmente pela emissão de:",
    options: ["Gás carbônico.", "Óxidos de nitrogênio e enxofre.", "Metano.", "Vapor d'água."],
    correctAnswer: 1,
  },
  {
    id: 20,
    question: "Qual a principal função da camada de ozônio na atmosfera terrestre?",
    options: ["Absorver o dióxido de carbono.", "Proteger a Terra da radiação ultravioleta (UV) solar nociva.", "Regular a temperatura global.", "Produzir oxigênio para a respiração."],
    correctAnswer: 1,
  },
  {
    id: 21,
    question: "A Agenda 21, documento proposto na Rio 92, é um plano de ação para:",
    options: ["Apenas a proteção da vida selvagem.", "O desenvolvimento sustentável no século XXI.", "Aumento do consumo de recursos naturais.", "Diminuição das áreas verdes urbanas."],
    correctAnswer: 1,
  },
  {
    id: 22,
    question: "O conceito de 'capital natural' refere-se a:",
    options: ["O dinheiro investido em indústrias.", "Os recursos e serviços fornecidos pela natureza (água, solo fértil, biodiversidade) que sustentam a vida e a economia.", "Apenas os minérios existentes no subsolo.", "Os produtos manufaturados de baixo impacto ambiental."],
    correctAnswer: 1,
  },
  {
    id: 23,
    question: "O que é 'biodiversidade'?",
    options: ["Apenas a variedade de espécies de plantas.", "A variedade de vida na Terra em todos os seus níveis, desde genes até ecossistemas.", "A quantidade de biomassa em uma floresta.", "O número de florestas em um continente."],
    correctAnswer: 1,
  },
  {
    id: 24,
    question: "Qual o principal impacto do uso excessivo de agrotóxicos na agricultura?",
    options: ["Aumento da fertilidade do solo.", "Redução da biodiversidade, contaminação do solo e da água, e problemas de saúde humana.", "Melhora da qualidade do ar.", "Diminuição da produção de alimentos."],
    correctAnswer: 1,
  },

  // Tópico 3: Urbanização e Redes Urbanas
  {
    id: 25,
    question: "Qual o principal fator que impulsionou o processo de urbanização no Brasil a partir da segunda metade do século XX?",
    options: ["O êxodo rural, motivado pela modernização do campo e pela industrialização das cidades.", "A criação de novas capitais estaduais no interior do país.", "O aumento da taxa de natalidade nas áreas urbanas.", "A diminuição da população total do país."],
    correctAnswer: 0,
  },
  {
    id: 26,
    question: "O que são 'megacidades' no contexto da geografia urbana?",
    options: ["Cidades com mais de 1 milhão de habitantes.", "Cidades que se destacam por sua importância cultural e histórica.", "Cidades com população superior a 10 milhões de habitantes.", "Cidades com alta qualidade de vida e baixo índice de criminalidade."],
    correctAnswer: 2,
  },
  {
    id: 27,
    question: "A hierarquia urbana refere-se à:",
    options: ["Organização das cidades em diferentes níveis de importância e influência.", "Divisão das cidades em bairros ricos e pobres.", "Criação de novas cidades planejadas pelo governo.", "Disposição das ruas e avenidas em uma cidade."],
    correctAnswer: 0,
  },
  {
    id: 28,
    question: "O que são 'redes urbanas'?",
    options: ["Conjunto de vias de transporte que ligam uma cidade a outra.", "A interligação entre cidades por fluxos de pessoas, mercadorias, informações e capitais.", "O sistema de saneamento básico de uma metrópole.", "A organização dos serviços públicos dentro de uma cidade."],
    correctAnswer: 1,
  },
  {
    id: 29,
    question: "A gentrificação é um processo urbano que envolve:",
    options: ["A criação de novos bairros de baixa renda na periferia das cidades.", "A revitalização de áreas centrais degradadas, com a valorização imobiliária e a substituição da população original por outra de maior poder aquisitivo.", "A construção de grandes condomínios fechados para a elite.", "A descentralização das atividades econômicas para cidades médias."],
    correctAnswer: 1,
  },
  {
    id: 30,
    question: "Qual o fenômeno que ocorre quando duas ou mais cidades vizinhas crescem e se unem fisicamente, formando uma grande área urbana contínua?",
    options: ["Metrópole", "Megacidade", "Conurbação", "Região metropolitana"],
    correctAnswer: 2,
  },
  {
    id: 31,
    question: "A 'segregação socioespacial' nas cidades é um problema que se manifesta por:",
    options: ["Aumento da coesão social entre diferentes grupos.", "A separação de grupos sociais em diferentes áreas da cidade, com acesso desigual a infraestrutura e serviços.", "Apenas a presença de favelas.", "A uniformidade do espaço urbano."],
    correctAnswer: 1,
  },
  {
    id: 32,
    question: "Qual o principal desafio das grandes metrópoles brasileiras?",
    options: ["Falta de crescimento populacional.", "Problemas de mobilidade urbana, moradia, saneamento básico, segurança e acesso a serviços.", "Excesso de espaços verdes.", "Baixa densidade demográfica."],
    correctAnswer: 1,
  },
  {
    id: 33,
    question: "O que são 'cidades globais'?",
    options: ["Cidades com mais de 10 milhões de habitantes.", "Cidades que exercem forte influência econômica, política e cultural em escala mundial.", "Cidades com alto índice de violência.", "Cidades com baixo desenvolvimento tecnológico."],
    correctAnswer: 1,
  },
  {
    id: 34,
    question: "A expansão urbana desordenada, com ocupação de áreas de risco e sem infraestrutura, é chamada de:",
    options: ["Planejamento urbano.", "Crescimento sustentável.", "Urbanização planejada.", "Urbanização informal ou precária."],
    correctAnswer: 3,
  },
  {
    id: 35,
    question: "O que é 'cidade inteligente' (smart city)?",
    options: ["Uma cidade com muitos parques.", "Uma cidade que utiliza tecnologia e inovação para melhorar a qualidade de vida, a sustentabilidade e a eficiência dos serviços urbanos.", "Uma cidade com muitos edifícios altos.", "Uma cidade que proíbe o uso de tecnologia."],
    correctAnswer: 1,
  },
  {
    id: 36,
    question: "A principal diferença entre 'Metrópole' e 'Região Metropolitana' é que:",
    options: ["Metrópole é um conceito exclusivamente demográfico; Região Metropolitana é político-administrativo.", "Metrópole é uma única cidade; Região Metropolitana é o conjunto da metrópole com cidades vizinhas interligadas.", "Região Metropolitana é menor que Metrópole.", "Metrópole não tem influência regional."],
    correctAnswer: 1,
  },

  // Tópico 4: Geopolítica dos Conflitos Mundiais e Blocos Econômicos
  {
    id: 37,
    question: "Qual bloco econômico é caracterizado por ser uma união aduaneira e um mercado comum, com livre circulação de pessoas, bens, serviços e capitais entre seus membros?",
    options: ["NAFTA (Acordo de Livre Comércio da América do Norte)", "APEC (Cooperação Econômica Ásia-Pacífico)", "União Europeia (UE)", "Mercosul (Mercado Comum do Sul)"],
    correctAnswer: 2,
  },
  {
    id: 38,
    question: "Os BRICS (Brasil, Rússia, Índia, China e África do Sul) representam um grupo de países emergentes que buscam:",
    options: ["Formar um bloco militar para rivalizar com a OTAN.", "Aumentar sua influência geopolítica e econômica no cenário mundial.", "Estabelecer uma moeda única para substituir o dólar.", "Restringir o livre comércio global."],
    correctAnswer: 1,
  },
  {
    id: 39,
    question: "Qual o principal fator que impulsionou o processo de globalização a partir do final do século XX?",
    options: ["O fim da Segunda Guerra Mundial.", "O avanço das tecnologias de comunicação e transporte.", "A criação da Organização das Nações Unidas (ONU).", "A descoberta de novas rotas comerciais marítimas."],
    correctAnswer: 1,
  },
  {
    id: 40,
    question: "A fragmentação de alguns Estados e o surgimento de novos conflitos étnicos e religiosos após o fim da Guerra Fria são fenômenos associados principalmente à:",
    options: ["Criação de novos blocos econômicos.", "Ascensão de regimes comunistas na Europa Oriental.", "Crise do Estado-Nação e o ressurgimento de nacionalismos.", "Expansão do capitalismo global."],
    correctAnswer: 2,
  },
  {
    id: 41,
    question: "Qual o principal objetivo da OTAN (Organização do Tratado do Atlântico Norte)?",
    options: ["Promover o livre comércio entre seus membros.", "Ser uma aliança militar de defesa mútua, inicialmente contra a URSS.", "Controlar o preço do petróleo mundial.", "Organizar eventos esportivos internacionais."],
    correctAnswer: 1,
  },
  {
    id: 42,
    question: "A disputa por recursos naturais (água, petróleo, minerais) é uma das causas de conflitos em qual região do mundo?",
    options: ["Europa Ocidental.", "América do Sul.", "Oriente Médio e algumas partes da África.", "Oceania."],
    correctAnswer: 2,
  },
  {
    id: 43,
    question: "O que caracteriza um conflito 'assimétrico' na geopolítica contemporânea?",
    options: ["Conflitos entre Estados com forças militares equivalentes.", "Conflitos entre Estados e grupos não-estatais (ex: terroristas), com grande disparidade de poder e táticas.", "Guerras civis entre facções dentro de um mesmo país.", "Conflitos puramente econômicos."],
    correctAnswer: 1,
  },
  {
    id: 44,
    question: "Qual a função da OMC (Organização Mundial do Comércio)?",
    options: ["Regulamentar as relações políticas internacionais.", "Promover e facilitar o comércio internacional, reduzindo barreiras e resolvendo disputas comerciais.", "Controlar a produção agrícola mundial.", "Impedir a globalização."],
    correctAnswer: 1,
  },
  {
    id: 45,
    question: "A Guerra Civil da Síria (iniciada em 2011) é um exemplo de conflito que envolve:",
    options: ["Apenas forças internas do país.", "Intervenção de potências estrangeiras, grupos terroristas e disputas religiosas/políticas.", "Conflito exclusivamente étnico.", "Disputas por recursos hídricos."],
    correctAnswer: 1,
  },
  {
    id: 46,
    question: "O que é 'nacionalismo' no contexto dos conflitos?",
    options: ["A defesa da cooperação internacional.", "Um sentimento de pertencimento e lealdade a uma nação, que pode levar a disputas territoriais ou étnicas.", "A busca pela paz mundial.", "A união de diferentes etnias em um só povo."],
    correctAnswer: 1,
  },
  {
    id: 47,
    question: "Qual o objetivo principal do Mercosul (Mercado Comum do Sul)?",
    options: ["Promover a cooperação militar na América do Sul.", "Facilitar a integração econômica, eliminando barreiras comerciais entre os países membros.", "Controlar a imigração entre os países sul-americanos.", "Padronizar as moedas da região."],
    correctAnswer: 1,
  },
  {
    id: 48,
    question: "O que é a 'diplomacia preventiva'?",
    options: ["Intervenção militar antes que um conflito se inicie.", "Ações diplomáticas para evitar que tensões se transformem em conflitos armados.", "Isolamento de países agressivos.", "Imposição de sanções econômicas."],
    correctAnswer: 1,
  }
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
  } = usePaginatedQuestionnaire(questions, 'GEO');

  const handleNext = async () => {
    const result = await handleNextQuestion();
    if (result.finished) {
      navigate('/questionario');
    }
  };

  const handleFinishQuestionnaireEarly = async () => {
    const result = await handleFinishEarly();
    if (result.finished) {
      navigate('/questionario');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8">
      <div className="container mx-auto px-4">
        <Card className="max-w-4xl mx-auto">
          <CardHeader>
            <CardTitle className="text-center text-2xl font-bold text-blue-800">
              Questionário de Geografia - Página {currentPage} de {totalPages}
            </CardTitle>
            <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
              <div 
                className="bg-blue-600 h-2.5 rounded-full transition-all duration-300" 
                style={{ width: `${progress}%` }}
              ></div>
            </div>
            <p className="text-center text-sm text-gray-600">
              Progresso: {Math.round(progress)}% | Respondidas: {answeredQuestions}
            </p>
          </CardHeader>
          
          <CardContent className="space-y-6">
            {currentQuestion && (
              <div>
                <h3 className="text-lg font-semibold mb-4 text-gray-800">
                  {currentQuestion.question}
                </h3>
                
                <RadioGroup value={selectedAnswer} onValueChange={handleAnswerSelect}>
                  {currentQuestion.options.map((option, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <RadioGroupItem value={index.toString()} id={`option-${index}`} />
                      <Label htmlFor={`option-${index}`} className="cursor-pointer">
                        {option}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>
            )}
            
            <div className="flex justify-between items-center pt-6">
              <Button 
                onClick={handlePrevious} 
                disabled={!canGoBack}
                variant="outline"
              >
                Anterior
              </Button>

              <div className="flex items-center gap-2">
                <QuestionnaireFinishButton
                  onFinishEarly={handleFinishQuestionnaireEarly}
                  submitting={submitting}
                  answeredQuestions={answeredQuestions}
                  disabled={submitting}
                />
                <Button 
                  onClick={handleNext}
                  disabled={submitting || !selectedAnswer}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  {submitting ? 'Enviando...' : (currentPage === totalPages ? 'Finalizar' : 'Próxima')}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default QuestionarioGeografia;