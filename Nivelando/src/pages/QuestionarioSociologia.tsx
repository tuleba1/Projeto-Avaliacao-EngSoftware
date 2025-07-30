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

const QuestionarioSociologia = () => {
  const navigate = useNavigate();

  const questions: Question[] = [
  // Tópico 1: Cultura e Sociedade
  {
    id: 1,
    question: "O que caracteriza o conceito de 'etnocentrismo'?",
    options: ["A valorização de todas as culturas igualmente.", "A tendência de julgar outras culturas a partir dos valores e padrões da própria cultura.", "O estudo científico das diferentes culturas humanas.", "A mistura de elementos de diferentes culturas."],
    correctAnswer: 1,
  },
  {
    id: 2,
    question: "Qual o processo de transmissão de valores, normas e costumes de uma geração para outra em uma sociedade?",
    options: ["Globalização", "Aculturação", "Socialização", "Alienacão"],
    correctAnswer: 2,
  },
  {
    id: 3,
    question: "A 'indústria cultural', conceito da Escola de Frankfurt, refere-se à:",
    options: ["Produção artesanal de bens culturais em pequena escala.", "Produção em massa de bens culturais (filmes, músicas, programas de TV) com o objetivo de entretenimento e lucro, padronizando o consumo.", "Valorização da cultura popular e folclórica de uma nação.", "Criação de novas formas de arte que questionam o sistema."],
    correctAnswer: 1,
  },
  {
    id: 4,
    question: "O que é 'identidade cultural'?",
    options: ["Apenas a nacionalidade de uma pessoa.", "O conjunto de características individuais e únicas de cada ser humano.", "O sentimento de pertencimento a um grupo social ou cultural, compartilhado por meio de valores, crenças, costumes e símbolos.", "A capacidade de se adaptar a diferentes culturas."],
    correctAnswer: 2,
  },
  {
    id: 5,
    question: "Qual o papel da linguagem na construção da cultura e da sociedade?",
    options: ["Apenas um meio de comunicação entre indivíduos.", "É a principal ferramenta para a transmissão de conhecimentos, valores e para a construção da realidade social.", "Serve apenas para expressar emoções e sentimentos.", "É um fenômeno biológico, sem influência social."],
    correctAnswer: 1,
  },
  {
    id: 6,
    question: "A diversidade cultural em uma sociedade globalizada é, ao mesmo tempo, uma riqueza e um desafio. Qual o principal desafio da diversidade cultural?",
    options: ["A uniformização das culturas.", "O fortalecimento das tradições locais.", "A promoção do diálogo e o combate a preconceitos.", "A extinção de línguas e dialetos."],
    correctAnswer: 2,
  },
  {
    id: 7,
    question: "O que é 'cultura material'?",
    options: ["O conjunto de ideias e valores de uma sociedade.", "As crenças e os costumes de um povo.", "Os objetos e artefatos produzidos por uma sociedade.", "As manifestações artísticas imateriais."],
    correctAnswer: 2,
  },
  {
    id: 8,
    question: "E 'cultura imaterial'?",
    options: ["Obras de arte físicas.", "Edificações históricas.", "Tradições, saberes, modos de fazer e expressar de um grupo social.", "Ferramentas e tecnologias antigas."],
    correctAnswer: 2,
  },
  {
    id: 9,
    question: "Qual o conceito que descreve o processo de mudança cultural que ocorre quando duas culturas diferentes entram em contato, resultando em trocas e transformações?",
    options: ["Endoculturação", "Etnocentrismo", "Aculturação", "Socialização primária."],
    correctAnswer: 2,
  },
  {
    id: 10,
    question: "O que se entende por 'relativismo cultural'?",
    options: ["Julgar uma cultura pelos padrões da própria cultura.", "Aceitar que cada cultura tem seus próprios valores e deve ser compreendida em seus próprios termos.", "Acreditar que há culturas superiores e inferiores.", "Buscar a universalização de todos os valores culturais."],
    correctAnswer: 1,
  },
  {
    id: 11,
    question: "Os símbolos culturais (bandeiras, hinos, rituais) são importantes porque:",
    options: ["São meros objetos decorativos.", "Não possuem significado social.", "Representam e reforçam a identidade e os valores de um grupo ou nação.", "São criados apenas por elites."],
    correctAnswer: 2,
  },
  {
    id: 12,
    question: "A 'massificação da cultura' é um fenômeno que, segundo alguns sociólogos, leva à:",
    options: ["Aumento da diversidade cultural.", "Padronização e homogeneização dos gostos e costumes.", "Valorização das culturas tradicionais.", "Promoção do pensamento crítico individual."],
    correctAnswer: 1,
  },

  // Tópico 2: Estratificação e Desigualdade Social
  {
    id: 13,
    question: "Segundo Karl Marx, a sociedade capitalista é dividida em duas classes sociais principais. Quais são elas?",
    options: ["Nobres e camponeses.", "Burguesia (detentora dos meios de produção) e Proletariado (trabalhadores).", "Ricos e pobres.", "Governo e cidadãos."],
    correctAnswer: 1,
  },
  {
    id: 14,
    question: "O que é 'mobilidade social'?",
    options: ["A capacidade de uma pessoa se deslocar geograficamente.", "A mudança de posição de um indivíduo ou grupo na hierarquia social.", "A resistência de um grupo social a mudanças.", "A organização da sociedade em diferentes classes."],
    correctAnswer: 1,
  },
  {
    id: 15,
    question: "Max Weber propôs uma visão multidimensional da estratificação social, além da classe econômica. Quais outras dimensões ele considerou?",
    options: ["Apenas a raça e o gênero.", "Status (prestígio social) e Poder (capacidade de impor a própria vontade).", "Idade e religião.", "Nacionalidade e idioma."],
    correctAnswer: 1,
  },
  {
    id: 16,
    question: "A 'exclusão social' refere-se a um processo em que indivíduos ou grupos são impedidos de:",
    options: ["Ter acesso à internet.", "Participar plenamente da vida econômica, social, política e cultural da sociedade.", "Expressar suas opiniões livremente.", "Migrar para outros países."],
    correctAnswer: 1,
  },
  {
    id: 17,
    question: "O que é 'pobreza absoluta'?",
    options: ["A condição de ter uma renda inferior à média nacional.", "A falta de recursos básicos para a sobrevivência, como alimento, moradia e saúde.", "A desigualdade na distribuição de renda entre os membros de uma sociedade.", "A falta de acesso à educação de qualidade."],
    correctAnswer: 1,
  },
  {
    id: 18,
    question: "Qual o sistema de estratificação social caracterizado por pouca ou nenhuma mobilidade social, onde a posição é determinada pelo nascimento?",
    options: ["Classes sociais", "Castas", "Estamentos", "Sociedade meritocrática"],
    correctAnswer: 1,
  },
  {
    id: 19,
    question: "A concentração de renda e riqueza nas mãos de poucos indivíduos ou grupos é um dos indicadores de:",
    options: ["Desenvolvimento econômico.", "Igualdade social.", "Desigualdade social.", "Mobilidade ascendente."],
    correctAnswer: 2,
  },
  {
    id: 20,
    question: "O que Karl Marx chamava de 'luta de classes'?",
    options: ["A disputa por poder entre governantes.", "O conflito entre a burguesia e o proletariado pelos meios de produção e pela riqueza.", "A competição entre empresas no mercado.", "As guerras entre nações."],
    correctAnswer: 1,
  },
  {
    id: 21,
    question: "Qual o sistema de estratificação social que se baseia principalmente no poder político e no prestígio, comum na sociedade feudal?",
    options: ["Classes sociais", "Castas", "Estamentos", "Patriarcado"],
    correctAnswer: 2,
  },
  {
    id: 22,
    question: "A 'segregação socioespacial' é um fenômeno que se manifesta na organização das cidades através de:",
    options: ["Aumento da integração social.", "A separação física de grupos sociais com base em sua condição econômica ou social.", "Redução das diferenças de acesso a serviços.", "Desenvolvimento urbano igualitário."],
    correctAnswer: 1,
  },
  {
    id: 23,
    question: "Qual a diferença entre 'pobreza relativa' e 'pobreza absoluta'?",
    options: ["Pobreza relativa é a falta de bens básicos; absoluta é a renda baixa.", "Pobreza relativa é a renda abaixo da média; absoluta é a falta de recursos básicos para a sobrevivência.", "São sinônimos.", "Pobreza relativa é temporária; absoluta é permanente."],
    correctAnswer: 1,
  },
  {
    id: 24,
    question: "O que é o 'capital cultural', segundo Pierre Bourdieu?",
    options: ["A quantidade de dinheiro que uma pessoa possui.", "O conjunto de conhecimentos, habilidades, educação e gostos que um indivíduo acumula e que lhe confere vantagens sociais.", "O valor de propriedades e bens materiais.", "O poder de influência política."],
    correctAnswer: 1,
  },

  // Tópico 3: Cidadania e Direitos Humanos
  {
    id: 25,
    question: "Qual a principal diferença entre direitos civis, políticos e sociais?",
    options: ["Civis garantem liberdades individuais; políticos, participação na vida pública; sociais, acesso a bem-estar e serviços básicos.", "Civis são para homens, políticos para mulheres e sociais para crianças.", "Civis são absolutos, políticos são relativos e sociais são inexistentes.", "Civis são para ricos, políticos para a classe média e sociais para pobres."],
    correctAnswer: 0,
  },
  {
    id: 26,
    question: "O que são 'direitos humanos'?",
    options: ["Leis específicas de cada país para seus cidadãos.", "Direitos que pertencem a todos os seres humanos, independentemente de nacionalidade, etnia, gênero, religião ou qualquer outra condição.", "Privilégios concedidos a grupos sociais específicos.", "Normas éticas que não possuem força de lei."],
    correctAnswer: 1,
  },
  {
    id: 27,
    question: "Qual o papel dos 'movimentos sociais' na consolidação da cidadania?",
    options: ["Apenas defender os interesses de partidos políticos.", "Promover a desordem e a violência na sociedade.", "Lutar pela ampliação de direitos, reconhecimento de identidades e transformação social, pressionando o Estado e a sociedade.", "Garantir a manutenção do status quo e a ordem estabelecida."],
    correctAnswer: 2,
  },
  {
    id: 28,
    question: "A 'cidadania' é um conceito que evoluiu ao longo da história. Atualmente, o que ela abrange de forma mais completa?",
    options: ["Apenas o direito de votar e ser votado.", "Apenas o cumprimento dos deveres perante o Estado.", "O acesso a direitos civis, políticos e sociais, e a participação ativa na vida pública.", "A posse de bens materiais e riqueza."],
    correctAnswer: 2,
  },
  {
    id: 29,
    question: "Qual o documento internacional que, proclamado em 1948, estabeleceu um marco global para os direitos humanos?",
    options: ["A Declaração de Independência dos Estados Unidos.", "A Declaração Universal dos Direitos Humanos.", "A Constituição Federal do Brasil de 1988.", "O Tratado de Versalhes."],
    correctAnswer: 1,
  },
  {
    id: 30,
    question: "O que caracteriza os 'direitos políticos'?",
    options: ["Direito à vida e à liberdade.", "Direito de participar da vida política (votar, ser votado).", "Direito à saúde e educação.", "Direito à propriedade privada."],
    correctAnswer: 1,
  },
  {
    id: 31,
    question: "Qual a função do Estado na garantia dos direitos sociais?",
    options: ["Não possui função, pois são direitos individuais.", "Apenas criar leis, sem implementá-las.", "Prover e garantir acesso a serviços públicos essenciais (saúde, educação, moradia).", "Atuar apenas para ricos."],
    correctAnswer: 2,
  },
  {
    id: 32,
    question: "O que se entende por 'participação cidadã'?",
    options: ["Apenas obedecer às leis.", "O engajamento ativo dos cidadãos nos assuntos públicos e nas decisões que afetam a coletividade.", "A capacidade de criticar o governo.", "O direito de não se envolver em política."],
    correctAnswer: 1,
  },
  {
    id: 33,
    question: "Os 'direitos civis' incluem:",
    options: ["Direito ao voto e à participação em eleições.", "Direito à saúde e à educação pública.", "Direito à vida, liberdade, propriedade, liberdade de expressão e de ir e vir.", "Direito à moradia e ao trabalho."],
    correctAnswer: 2,
  },
  {
    id: 34,
    question: "O que é 'Estado de Direito'?",
    options: ["Um Estado onde o governo tem poder absoluto.", "Um Estado onde todos estão submetidos à lei, incluindo os governantes.", "Um Estado onde não há leis.", "Um Estado que não reconhece os direitos humanos."],
    correctAnswer: 1,
  },
  {
    id: 35,
    question: "A evolução da cidadania no Brasil, principalmente após a Constituição de 1988, é marcada por:",
    options: ["Apenas a garantia de direitos civis.", "Restrição dos direitos sociais.", "Ampliação dos direitos e da participação, com a redemocratização.", "Foco apenas nos direitos políticos."],
    correctAnswer: 2,
  },
  {
    id: 36,
    question: "Qual a importância da educação para o exercício da cidadania?",
    options: ["Não possui relação direta.", "É fundamental para o desenvolvimento do senso crítico, conhecimento dos direitos e deveres e participação consciente.", "Apenas para conseguir um emprego.", "Para memorizar as leis."],
    correctAnswer: 1,
  },

  // Tópico 4: Trabalho e Sociedade (Capitalismo, Globalização)
  {
    id: 37,
    question: "Segundo Max Weber, a ética protestante teve um papel fundamental no desenvolvimento do:",
    options: ["Feudalismo", "Socialismo", "Capitalismo", "Comunismo"],
    correctAnswer: 2,
  },
  {
    id: 38,
    question: "O que Karl Marx entendia por 'mais-valia' no sistema capitalista?",
    options: ["O lucro obtido com a venda de produtos.", "O valor excedente do trabalho do operário que não é pago a ele, mas apropriado pelo capitalista.", "O salário justo pago ao trabalhador.", "O custo de produção de uma mercadoria."],
    correctAnswer: 1,
  },
  {
    id: 39,
    question: "Qual fenômeno caracterizado pela intensa interconexão econômica, cultural e social em escala mundial?",
    options: ["Regionalização", "Nacionalismo", "Globalização", "Localismo"],
    correctAnswer: 2,
  },
  {
    id: 40,
    question: "A Revolução Industrial foi um marco que transformou as relações de trabalho, principalmente pela ascensão de qual sistema de produção?",
    options: ["Artesanato", "Manufatura", "Fordismo", "Fábrica"],
    correctAnswer: 3,
  },
  {
    id: 41,
    question: "Qual o principal objetivo do Taylorismo e do Fordismo na organização do trabalho?",
    options: ["Aumentar a autonomia dos trabalhadores.", "Descentralizar a produção.", "Aumentar a produtividade e a eficiência por meio da especialização e padronização.", "Promover o trabalho artesanal."],
    correctAnswer: 2,
  },
  {
    id: 42,
    question: "A precarização do trabalho é um fenômeno que se manifesta por:",
    options: ["Melhora das condições de trabalho.", "Aumento da segurança no emprego e dos benefícios.", "Perda de direitos trabalhistas, instabilidade e baixa remuneração.", "Crescimento da formalização do trabalho."],
    correctAnswer: 2,
  },
  {
    id: 43,
    question: "O que é 'alienação do trabalho' para Karl Marx?",
    options: ["O trabalhador se sente satisfeito com o seu trabalho.", "O trabalhador se desliga do produto de seu trabalho e do processo de produção, tornando-se uma engrenagem.", "O trabalhador participa de todas as etapas da produção.", "O trabalho é uma forma de autoconhecimento."],
    correctAnswer: 1,
  },
  {
    id: 44,
    question: "Qual a consequência da globalização que se refere à difusão de hábitos de consumo e estilos de vida em escala mundial?",
    options: ["Fragmentação cultural.", "Heterogeneidade cultural.", "Homogeneização cultural.", "Isolamento cultural."],
    correctAnswer: 2,
  },
  {
    id: 45,
    question: "O Toyotismo, modelo de produção pós-Fordista, é caracterizado por:",
    options: ["Produção em massa e estoques altos.", "Produção flexível, 'just-in-time' e multifuncionalidade do trabalhador.", "Centralização total das decisões na gerência.", "Linha de montagem rígida."],
    correctAnswer: 1,
  },
  {
    id: 46,
    question: "Qual o termo sociológico para a divisão do trabalho em tarefas cada vez mais específicas e repetitivas?",
    options: ["Especialização", "Requalificação", "Desqualificação", "Automação"],
    correctAnswer: 0,
  },
  {
    id: 47,
    question: "A expansão das empresas transnacionais (multinacionais) é uma das marcas de qual processo?",
    options: ["Nacionalização da economia.", "Globalização.", "Regionalização.", "Protecionismo econômico."],
    correctAnswer: 1,
  },
  {
    id: 48,
    question: "Segundo Émile Durkheim, a 'divisão do trabalho social' pode levar a dois tipos de solidariedade. Quais são eles?",
    options: ["Solidariedade orgânica e inorgânica.", "Solidariedade mecânica e orgânica.", "Solidariedade forte e fraca.", "Solidariedade coletiva e individual."],
    correctAnswer: 1,
  },

  // Tópico 5: Instituições Sociais (Família, Educação, Estado)
  {
    id: 49,
    question: "Qual a principal função da família como instituição social?",
    options: ["Promover a educação formal.", "Transmissão de valores, socialização primária e reprodução social.", "Exercer o poder político.", "Organizar a economia de mercado."],
    correctAnswer: 1,
  },
  {
    id: 50,
    question: "A escola, como instituição social, tem como uma de suas funções principais:",
    options: ["Apenas garantir o lazer dos jovens.", "Promover a socialização secundária, a transmissão de conhecimentos formais e a preparação para o mercado de trabalho.", "Controlar o governo.", "Substituir o papel da família."],
    correctAnswer: 1,
  },
  {
    id: 51,
    question: "O que é 'socialização primária'?",
    options: ["Processo de aprendizagem em instituições formais como a escola.", "Primeiro contato com o mercado de trabalho.", "Ocorre principalmente na família e se refere à aprendizagem das normas e valores básicos da sociedade.", "Adaptação a uma nova cultura."],
    correctAnswer: 2,
  },
  {
    id: 52,
    question: "Qual o papel do Estado como instituição social?",
    options: ["Apenas garantir a ordem social através da força.", "Organizar e regular a sociedade, garantindo a ordem, a justiça e o bem-estar social.", "Controlar a vida privada dos cidadãos.", "Promover o individualismo e a anarquia."],
    correctAnswer: 1,
  },
  {
    id: 53,
    question: "A secularização da educação refere-se a qual processo?",
    options: ["Aumento da influência religiosa nas escolas.", "Separação entre a educação e as instituições religiosas, tornando-a laica.", "A proibição de ensino de disciplinas religiosas.", "A privatização das escolas."],
    correctAnswer: 1,
  },
  {
    id: 54,
    question: "As mudanças na estrutura familiar, como o aumento de famílias monoparentais ou homoafetivas, indicam:",
    options: ["A desvalorização da família como instituição.", "A diversificação dos arranjos familiares e a flexibilização das normas sociais.", "O fim da instituição familiar.", "O retorno ao modelo de família patriarcal."],
    correctAnswer: 1,
  },
  {
    id: 55,
    question: "Qual a função do sistema jurídico como instituição social?",
    options: ["Apenas punir criminosos.", "Criar e aplicar leis para regular as relações sociais e garantir a justiça.", "Organizar a economia do país.", "Promover a educação formal."],
    correctAnswer: 1,
  },
  {
    id: 56,
    question: "A 'crise da família tradicional' é um debate sociológico que se refere a:",
    options: ["O fim da família como instituição.", "A perda de relevância dos laços familiares.", "As transformações e redefinições dos modelos familiares em relação ao padrão patriarcal.", "O aumento da natalidade."],
    correctAnswer: 2,
  },
  {
    id: 57,
    question: "O que é 'capital social'?",
    options: ["A quantidade de dinheiro que uma pessoa tem no banco.", "As redes de relações sociais e os recursos que elas podem proporcionar aos indivíduos.", "A capacidade de uma empresa gerar lucro.", "O conjunto de bens materiais de uma família."],
    correctAnswer: 1,
  },
  {
    id: 58,
    question: "A escola, além de transmitir conhecimento, também atua na transmissão de valores e normas sociais, o que é conhecido como:",
    options: ["Apenas currículo oculto.", "Função reprodutora da desigualdade.", "Função de socialização secundária.", "Função de entretenimento."],
    correctAnswer: 2,
  },
  {
    id: 59,
    question: "Qual a diferença entre 'Estado' e 'Governo'?",
    options: ["São sinônimos.", "Estado é a instituição permanente; Governo é a gestão temporária do Estado.", "Governo é a instituição permanente; Estado é a gestão temporária.", "Estado é o povo; Governo é o território."],
    correctAnswer: 1,
  },
  {
    id: 60,
    question: "A função da religião como instituição social, para Émile Durkheim, está ligada principalmente a:",
    options: ["Organizar a economia da sociedade.", "Promover a coesão social e o sentimento de pertencimento.", "Estabelecer as leis do Estado.", "Controlar a vida política."],
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
  } = usePaginatedQuestionnaire(questions, 'SOC');

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
          <h1 className="text-3xl font-bold mb-2">Questionário de Sociologia</h1>
          <p className="text-muted-foreground">Avaliação de Sociologia</p>
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

export default QuestionarioSociologia;
