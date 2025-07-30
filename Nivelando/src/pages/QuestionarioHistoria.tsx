import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { useNavigate } from 'react-router-dom';
import { usePaginatedQuestionnaire } from '@/hooks/usePaginatedQuestionnaire';
import { QuestionnaireFinishButton } from '@/components/QuestionnaireFinishButton';
import { useToast } from '@/hooks/use-toast';

interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
}

const QuestionarioHistoria = () => {
  const navigate = useNavigate();
  const {toast} = useToast();

  const questions: Question[] = [
  // Tópico 1: Revolução Francesa e Era Napoleônica
  {
    id: 1,
    question: "Qual o lema da Revolução Francesa?",
    options: ["Paz, Ordem e Progresso", "Liberdade, Igualdade e Fraternidade", "Deus, Pátria e Família", "Unidade, Luta e Vitória"],
    correctAnswer: 1,
  },
  {
    id: 2,
    question: "A Tomada da Bastilha, em 14 de julho de 1789, simbolizou o início de qual fase da Revolução Francesa?",
    options: ["Monarquia Constitucional", "Convenção Nacional", "Diretório", "Império Napoleônico"],
    correctAnswer: 0,
  },
  {
    id: 3,
    question: "Qual grupo político radical, liderado por Maximilien Robespierre, assumiu o poder durante a fase do Terror na Revolução Francesa?",
    options: ["Girondinos", "Jacobinos", "Cordeliers", "Sans-culottes"],
    correctAnswer: 1,
  },
  {
    id: 4,
    question: "O golpe de 18 Brumário marcou o fim da Revolução Francesa e a ascensão de qual figura política?",
    options: ["Luís XVI", "Robespierre", "Napoleão Bonaparte", "Voltaire"],
    correctAnswer: 2,
  },
  {
    id: 5,
    question: "Qual o principal objetivo do Bloqueio Continental, decretado por Napoleão Bonaparte?",
    options: ["Expandir o comércio francês com a Inglaterra.", "Impedir que a Inglaterra comercializasse com a Europa, enfraquecendo sua economia.", "Promover a paz na Europa.", "Fortalecer a marinha britânica."],
    correctAnswer: 1,
  },
  {
    id: 6,
    question: "O Código Civil Napoleônico, promulgado em 1804, teve como uma de suas características:",
    options: ["Restaurar todos os privilégios da nobreza.", "Consolidar os princípios da Revolução Francesa, como igualdade perante a lei e direito à propriedade.", "Estabelecer a servidão feudal.", "Fortalecer o poder da Igreja Católica."],
    correctAnswer: 1,
  },
  {
    id: 7,
    question: "A Batalha de Waterloo (1815) marcou o fim definitivo do governo de qual líder?",
    options: ["Luís XVIII", "Napoleão Bonaparte", "Klemens von Metternich", "Alexandre I"],
    correctAnswer: 1,
  },
  {
    id: 8,
    question: "O Congresso de Viena (1814-1815) teve como objetivo principal:",
    options: ["Promover a expansão dos ideais revolucionários franceses.", "Restaurar as monarquias absolutistas e redefinir as fronteiras europeias após as Guerras Napoleônicas.", "Estabelecer uma república em toda a Europa.", "Apoiar os movimentos de independência nas colônias americanas."],
    correctAnswer: 1,
  },
  {
    id: 9,
    question: "Qual o papel dos 'jacobinos' na Revolução Francesa?",
    options: ["Representar os interesses da alta burguesia e da nobreza.", "Defender a monarquia absolutista.", "Serem o grupo mais radical, defendendo reformas profundas e a participação popular.", "Formar a oposição a Robespierre."],
    correctAnswer: 2,
  },
  {
    id: 10,
    question: "A Declaração dos Direitos do Homem e do Cidadão (1789) defendia, entre outros, os princípios de:",
    options: ["Privilégios para a nobreza e o clero.", "Igualdade de todos perante a lei, liberdade e direito à propriedade.", "Apenas o direito de voto para os homens ricos.", "O retorno ao Antigo Regime."],
    correctAnswer: 1,
  },
  {
    id: 11,
    question: "Qual o período da Era Napoleônica que foi marcado por uma forte expansão militar francesa pela Europa?",
    options: ["Consulado", "Império", "Governo dos Cem Dias", "Diretório"],
    correctAnswer: 1,
  },
  {
    id: 12,
    question: "O que foi a 'Revolução de 1830' na França?",
    options: ["Uma revolução que restaurou o absolutismo.", "Uma revolução liberal que depôs Carlos X e instalou Luís Filipe I (Monarquia de Julho).", "Uma revolução socialista.", "O fim da Era Napoleônica."],
    correctAnswer: 1,
  },

  // Tópico 2: Revolução Industrial e Movimentos Sociais
  {
    id: 13,
    question: "Qual o país onde a Primeira Revolução Industrial teve seu início?",
    options: ["França", "Estados Unidos", "Alemanha", "Inglaterra"],
    correctAnswer: 3,
  },
  {
    id: 14,
    question: "A principal fonte de energia da Primeira Revolução Industrial foi:",
    options: ["Eletricidade", "Petróleo", "Vapor (carvão mineral)", "Energia eólica"],
    correctAnswer: 2,
  },
  {
    id: 15,
    question: "O Ludismo foi um movimento social caracterizado por:",
    options: ["Defesa dos direitos trabalhistas por meios pacíficos.", "Destruição de máquinas pelos trabalhadores que viam nelas a causa de seu desemprego.", "Lutas por melhores salários através de greves organizadas.", "Apoio à mecanização da produção."],
    correctAnswer: 1,
  },
  {
    id: 16,
    question: "Qual foi o principal combustível e matéria-prima da Segunda Revolução Industrial?",
    options: ["Carvão e algodão", "Petróleo e eletricidade", "Gás natural e borracha", "Vapor e ferro"],
    correctAnswer: 1,
  },
  {
    id: 17,
    question: "O Cartismo, movimento trabalhista inglês, defendia principalmente:",
    options: ["A destruição das máquinas nas fábricas.", "O direito de voto e participação política para os trabalhadores.", "A volta do sistema artesanal de produção.", "A proibição de greves."],
    correctAnswer: 1,
  },
  {
    id: 18,
    question: "Qual das inovações abaixo NÃO pertence à Primeira Revolução Industrial?",
    options: ["Máquina a vapor.", "Tear mecânico.", "Locomotiva a vapor.", "Automóvel."],
    correctAnswer: 3,
  },
  {
    id: 19,
    question: "O Taylorismo, sistema de organização do trabalho, defendia a:",
    options: ["Autonomia dos trabalhadores nas fábricas.", "Aumento da produção com base na intuição dos operários.", "Máxima especialização e padronização das tarefas, com controle rígido do tempo.", "Flexibilização da produção."],
    correctAnswer: 2,
  },
  {
    id: 20,
    question: "O que é o 'socialismo utópico'?",
    options: ["Uma corrente que defende a revolução armada.", "Um ideal de sociedade mais justa, baseada na cooperação, mas sem um plano concreto de como alcançá-la.", "Uma teoria que defende a propriedade privada.", "Um movimento que defende a ditadura do proletariado."],
    correctAnswer: 1,
  },
  {
    id: 21,
    question: "Qual a principal ideia do Marxismo (socialismo científico)?",
    options: ["Defesa da propriedade privada e do livre mercado.", "A abolição das classes sociais e da propriedade privada dos meios de produção, por meio da luta de classes.", "O fortalecimento da monarquia absoluta.", "A harmonia entre capital e trabalho."],
    correctAnswer: 1,
  },
  {
    id: 22,
    question: "O Fordismo, modelo de produção industrial, introduziu qual grande inovação?",
    options: ["Apenas o trabalho artesanal.", "A linha de montagem e a produção em massa.", "A flexibilização da produção.", "A valorização da individualidade do trabalhador."],
    correctAnswer: 1,
  },
  {
    id: 23,
    question: "As greves e sindicatos surgiram como formas de luta dos trabalhadores em resposta a qual contexto histórico?",
    options: ["Revolução Gloriosa.", "Revolução Industrial.", "Guerra Fria.", "Colonização da América."],
    correctAnswer: 1,
  },
  {
    id: 24,
    question: "Qual a principal característica do Anarquismo?",
    options: ["Defesa de um Estado forte e centralizador.", "Apoio a uma sociedade sem classes e sem Estado, baseada na autogestão.", "Defesa da propriedade privada ilimitada.", "Apoio à ditadura do proletariado."],
    correctAnswer: 1,
  },

  // Tópico 3: Imperialismo e Primeira Guerra Mundial
  {
    id: 25,
    question: "O Imperialismo do século XIX foi motivado principalmente pela busca por:",
    options: ["Espaços para a monarquia absolutista.", "Novas rotas comerciais com o Oriente.", "Matérias-primas, mercados consumidores e áreas para investir capital.", "Terras para o cultivo de alimentos."],
    correctAnswer: 2,
  },
  {
    id: 26,
    question: "Qual continente foi o principal alvo da partilha imperialista entre as potências europeias no século XIX?",
    options: ["América", "Ásia", "África", "Oceania"],
    correctAnswer: 2,
  },
  {
    id: 27,
    question: "A Paz Armada (período pré-Primeira Guerra Mundial) foi caracterizada por:",
    options: ["A ausência de conflitos militares.", "Uma corrida armamentista e formação de alianças militares, apesar da ausência de guerras em larga escala.", "Desarmamento global.", "Colaboração internacional e desmilitarização."],
    correctAnswer: 1,
  },
  {
    id: 28,
    question: "Qual o evento considerado o estopim da Primeira Guerra Mundial?",
    options: ["A Crise de 1929.", "O assassinato do arquiduque Francisco Ferdinando em Sarajevo.", "O ataque japonês a Pearl Harbor.", "A invasão da Polônia pela Alemanha."],
    correctAnswer: 1,
  },
  {
    id: 29,
    question: "As alianças militares que antecederam a Primeira Guerra Mundial eram a Tríplice Aliança e a:",
    options: ["Tríplice Entente", "Eixo", "OTAN", "Pacto de Varsóvia"],
    correctAnswer: 0,
  },
  {
    id: 30,
    question: "Qual o principal tipo de combate na Frente Ocidental durante a Primeira Guerra Mundial?",
    options: ["Guerra de movimento rápido.", "Guerra de trincheiras.", "Guerra aérea.", "Guerra naval em mar aberto."],
    correctAnswer: 1,
  },
  {
    id: 31,
    question: "A saída da Rússia da Primeira Guerra Mundial (1917) foi motivada por qual evento?",
    options: ["A Crise de 1929.", "A Revolução Russa.", "A entrada dos EUA na guerra.", "O ataque a Pearl Harbor."],
    correctAnswer: 1,
  },
  {
    id: 32,
    question: "O Tratado de Versalhes (1919), que encerrou a Primeira Guerra Mundial, impôs duras condições a qual país?",
    options: ["França", "Rússia", "Alemanha", "Estados Unidos"],
    correctAnswer: 2,
  },
  {
    id: 33,
    question: "Qual o nome do nacionalismo exacerbado que defendia a união dos povos eslavos, sendo uma das causas da Primeira Guerra Mundial?",
    options: ["Pangermanismo", "Pan-eslavismo", "Revanchismo francês", "Nacionalismo italiano"],
    correctAnswer: 1,
  },
  {
    id: 34,
    question: "A corrida armamentista que antecedeu a Primeira Guerra Mundial pode ser definida como:",
    options: ["Uma disputa para ver quem tinha mais navios mercantes.", "A busca das potências por superioridade militar, acumulando armas e tecnologias de guerra.", "Uma competição para ver quem produzia mais alimentos.", "A corrida para a conquista espacial."],
    correctAnswer: 1,
  },
  {
    id: 35,
    question: "Qual o principal motivo da entrada dos Estados Unidos na Primeira Guerra Mundial?",
    options: ["Ataque japonês a Pearl Harbor.", "Invasão da Polônia pela Alemanha.", "Afundamento de navios americanos por submarinos alemães (ex: Lusitania).", "O início da Revolução Russa."],
    correctAnswer: 2,
  },
  {
    id: 36,
    question: "O que foi o 'Grande Jogo' no contexto do imperialismo?",
    options: ["Uma competição esportiva entre potências.", "A disputa imperialista por influência e território na Ásia Central entre Império Britânico e Império Russo.", "Uma tática militar usada na Primeira Guerra Mundial.", "Um jogo de tabuleiro popular na Europa."],
    correctAnswer: 1,
  },

  // Tópico 4: Período Entreguerras e Segunda Guerra Mundial
  {
    id: 37,
    question: "A Crise de 1929 ('Grande Depressão') teve início em qual país?",
    options: ["Alemanha", "Inglaterra", "Estados Unidos", "Japão"],
    correctAnswer: 2,
  },
  {
    id: 38,
    question: "Qual a principal característica dos regimes totalitários que surgiram no Período Entreguerras (ex: Fascismo, Nazismo)?",
    options: ["Defesa da democracia liberal.", "Pluripartidarismo e liberdade de expressão.", "Culto ao líder, partido único, censura e forte controle sobre a sociedade.", "Economia de livre mercado e mínima intervenção estatal."],
    correctAnswer: 2,
  },
  {
    id: 39,
    question: "Qual a ideologia política associada a Adolf Hitler na Alemanha?",
    options: ["Fascismo", "Comunismo", "Nazismo", "Democracia cristã"],
    correctAnswer: 2,
  },
  {
    id: 40,
    question: "A política de 'apaziguamento' adotada por potências como Reino Unido e França antes da Segunda Guerra Mundial tinha como objetivo:",
    options: ["Conter a expansão nazista com força militar.", "Evitar a guerra cedendo às exigências de Hitler.", "Promover uma aliança com a União Soviética.", "Incentivar a invasão da Polônia."],
    correctAnswer: 1,
  },
  {
    id: 41,
    question: "O evento que marcou o início da Segunda Guerra Mundial foi a:",
    options: ["Ataque japonês a Pearl Harbor.", "Invasão da Polônia pela Alemanha.", "Batalha de Stalingrado.", "Queda do Muro de Berlim."],
    correctAnswer: 1,
  },
  {
    id: 42,
    question: "Quais países formavam as principais potências do Eixo na Segunda Guerra Mundial?",
    options: ["EUA, Reino Unido e URSS", "Alemanha, Itália e Japão", "França, Itália e Japão", "China, Alemanha e URSS"],
    correctAnswer: 1,
  },
  {
    id: 43,
    question: "O Holocausto, genocídio de milhões de judeus e outras minorias, foi uma política sistemática implementada por qual regime?",
    options: ["Fascismo italiano.", "Militarismo japonês.", "Nazismo alemão.", "Stalinismo soviético."],
    correctAnswer: 2,
  },
  {
    id: 44,
    question: "Qual o principal motivo para a entrada dos Estados Unidos na Segunda Guerra Mundial?",
    options: ["A invasão da França pela Alemanha.", "O ataque japonês à base naval de Pearl Harbor.", "A Crise de 1929.", "A assinatura do Tratado de Versalhes."],
    correctAnswer: 1,
  },
  {
    id: 45,
    question: "A Batalha de Stalingrado (1942-1943) foi um ponto de virada na Segunda Guerra Mundial, pois marcou a:",
    options: ["Rendição da Alemanha.", "Primeira grande derrota alemã na Frente Oriental.", "Invasão aliada da Normandia.", "Queda de Berlim."],
    correctAnswer: 1,
  },
  {
    id: 46,
    question: "O Dia D (6 de junho de 1944) refere-se a qual operação militar na Segunda Guerra Mundial?",
    options: ["Bombardeios atômicos no Japão.", "Desembarque aliado na Normandia (França).", "Ataque japonês a Pearl Harbor.", "Batalha de Stalingrado."],
    correctAnswer: 1,
  },
  {
    id: 47,
    question: "Qual evento marcou o fim da Segunda Guerra Mundial no Pacífico?",
    options: ["Ataque a Pearl Harbor.", "A Batalha de Midway.", "Os bombardeios atômicos de Hiroshima e Nagasaki.", "A rendição da Alemanha."],
    correctAnswer: 2,
  },
  {
    id: 48,
    question: "O que foi o 'New Deal', implementado por Franklin D. Roosevelt nos EUA após a Crise de 1929?",
    options: ["Um programa de intervenção estatal para combater a crise econômica e o desemprego.", "Uma política de livre mercado.", "Uma estratégia militar para a Segunda Guerra Mundial.", "Um acordo de paz com a Alemanha."],
    correctAnswer: 0,
  },

  // Tópico 5: Guerra Fria e Nova Ordem Mundial
  {
    id: 49,
    question: "A Guerra Fria (1947-1991) foi um conflito entre quais duas superpotências e suas ideologias?",
    options: ["Alemanha (Nazismo) e Itália (Fascismo).", "Estados Unidos (Capitalismo) e União Soviética (Socialismo).", "China (Comunismo) e Japão (Militarismo).", "Reino Unido (Monarquia) e França (República)."],
    correctAnswer: 1,
  },
  {
    id: 50,
    question: "O que foi a Doutrina Truman?",
    options: ["Um plano de reconstrução da Europa após a Segunda Guerra Mundial.", "A política externa dos EUA para conter o avanço do comunismo.", "A criação da OTAN.", "O fim da Guerra Fria."],
    correctAnswer: 1,
  },
  {
    id: 51,
    question: "Qual o principal símbolo da divisão de Berlim durante a Guerra Fria?",
    options: ["Muro de Berlim", "Ponte Aérea de Berlim", "Portão de Brandemburgo", "Reichstag"],
    correctAnswer: 0,
  },
  {
    id: 52,
    question: "A OTAN (Organização do Tratado do Atlântico Norte) foi uma aliança militar criada durante a Guerra Fria pelos países:",
    options: ["Socialistas do Leste Europeu.", "Capitalistas do bloco ocidental.", "Da Ásia e África.", "Que não se alinharam a nenhum bloco."],
    correctAnswer: 1,
  },
  {
    id: 53,
    question: "Qual o principal evento que marcou o fim da União Soviética e o término da Guerra Fria?",
    options: ["Crise dos Mísseis em Cuba.", "Construção do Muro de Berlim.", "Queda do Muro de Berlim e desintegração da URSS.", "Guerra da Coreia."],
    correctAnswer: 2,
  },
  {
    id: 54,
    question: "A Nova Ordem Mundial (pós-Guerra Fria) é caracterizada principalmente por:",
    options: ["Bipolaridade ideológica entre EUA e URSS.", "Unipolaridade militar dos EUA e multipolaridade econômica.", "Apenas o fortalecimento do comunismo.", "O fim das relações comerciais internacionais."],
    correctAnswer: 1,
  },
  {
    id: 55,
    question: "O que foram os 'países não-alinhados' durante a Guerra Fria?",
    options: ["Nações que apoiavam a URSS.", "Nações que apoiavam os EUA.", "Países que não se alinharam a nenhum dos blocos da Guerra Fria.", "Países que não tinham exército."],
    correctAnswer: 2,
  },
  {
    id: 56,
    question: "Qual a principal característica do Plano Marshall?",
    options: ["Um plano militar de ataque à URSS.", "Um programa de ajuda econômica dos EUA para a reconstrução da Europa Ocidental.", "Um acordo de divisão da Alemanha.", "Um plano para desenvolver armas nucleares."],
    correctAnswer: 1,
  },
  {
    id: 57,
    question: "A Crise dos Mísseis em Cuba (1962) foi um dos momentos mais tensos da Guerra Fria, envolvendo:",
    options: ["EUA e China.", "EUA e Coreia do Norte.", "EUA e União Soviética.", "EUA e Alemanha."],
    correctAnswer: 2,
  },
  {
    id: 58,
    question: "O que foi a 'Perestroika' e a 'Glasnost' na União Soviética?",
    options: ["Programas de militarização da URSS.", "Reformas econômicas e políticas de abertura implementadas por Gorbachev.", "Movimentos de oposição ao governo soviético.", "Guerras civis na União Soviética."],
    correctAnswer: 1,
  },
  {
    id: 59,
    question: "Qual o papel da ONU (Organização das Nações Unidas) durante a Guerra Fria?",
    options: ["Atuar como um dos blocos em conflito.", "Promover a paz e a cooperação internacional, mediando conflitos e buscando evitar uma guerra direta entre as superpotências.", "Apoiar a corrida armamentista.", "Ser uma organização puramente econômica."],
    correctAnswer: 1,
  },
  {
    id: 60,
    question: "O termo 'Cortina de Ferro' foi utilizado para descrever a divisão ideológica e física entre:",
    options: ["América do Norte e América do Sul.", "Europa Ocidental capitalista e Europa Oriental socialista.", "Ásia e África.", "O Leste e o Oeste da Alemanha."],
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
    } = usePaginatedQuestionnaire(questions, 'HIS');
  
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
            <h1 className="text-3xl font-bold mb-2">
 Questionário de História</h1>
            <p className="text-muted-foreground">Avaliação de História</p>
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

export default QuestionarioHistoria;