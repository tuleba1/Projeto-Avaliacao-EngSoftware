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

const QuestionarioFilosofia = () => {
  const navigate = useNavigate();

  const questions: Question[] = [
  // Tópico 1: Ética e Moral
  {
    id: 1,
    question: "Segundo Immanuel Kant, uma ação moralmente correta é aquela que se baseia no:",
    options: ["Maior prazer para o maior número de pessoas.", "Dever e na universalidade da máxima que a inspira.", "Autointeresse e na busca pela felicidade individual.", "Consenso social e nas tradições culturais."],
    correctAnswer: 1,
  },
  {
    id: 2,
    question: "Para Aristóteles, o objetivo final da vida humana é:",
    options: ["Acumular riqueza e poder.", "Alcançar a felicidade (eudaimonia) por meio da prática da virtude.", "Seguir os mandamentos divinos.", "Adaptar-se às normas sociais."],
    correctAnswer: 1,
  },
  {
    id: 3,
    question: "O utilitarismo, teoria ética de John Stuart Mill, defende que uma ação é moralmente correta se:",
    options: ["Promover o bem-estar e a felicidade para o maior número de pessoas possível.", "Seguir os princípios religiosos.", "Respeitar as tradições culturais.", "Garantir a liberdade individual acima de tudo."],
    correctAnswer: 0,
  },
  {
    id: 4,
    question: "O que é 'relativismo moral'?",
    options: ["A crença em valores morais universais e imutáveis.", "A ideia de que os valores morais são relativos a cada cultura ou indivíduo, não havendo verdades morais absolutas.", "A defesa de que a moral deve ser sempre imposta pela força.", "A busca por um código moral único para toda a humanidade."],
    correctAnswer: 1,
  },
  {
    id: 5,
    question: "Qual a diferença entre 'ética' e 'moral'?",
    options: ["Ética é o conjunto de regras; moral é a reflexão sobre elas.", "Moral é o conjunto de princípios; ética é a reflexão sobre esses princípios.", "São sinônimos.", "Ética é individual; moral é coletiva."],
    correctAnswer: 1,
  },
  {
    id: 6,
    question: "O imperativo categórico de Kant é um princípio que determina:",
    options: ["Que devemos agir sempre buscando a felicidade.", "Que devemos agir de acordo com uma regra que gostaríamos que se tornasse uma lei universal.", "Que devemos seguir os nossos instintos naturais.", "Que devemos obedecer às autoridades."],
    correctAnswer: 1,
  },
  {
    id: 7,
    question: "Para os filósofos contratualistas (Hobbes, Locke, Rousseau), a moral e as leis surgem de um:",
    options: ["Mandato divino.", "Contrato social estabelecido entre os indivíduos para garantir a ordem e a segurança.", "Processo natural de evolução da sociedade.", "Imposição da classe dominante."],
    correctAnswer: 1,
  },
  {
    id: 8,
    question: "O que é 'dilema ético'?",
    options: ["Uma situação em que há uma escolha clara entre o bem e o mal.", "Uma situação em que não há regras morais a serem seguidas.", "Uma situação em que há um conflito entre diferentes valores ou princípios morais, tornando difícil escolher a ação correta.", "Uma decisão fácil de ser tomada."],
    correctAnswer: 2,
  },
  {
    id: 9,
    question: "Qual a importância da 'empatia' na ética?",
    options: ["Não tem relevância para a ética.", "Permite compreender e considerar os sentimentos e perspectivas dos outros, auxiliando na tomada de decisões morais mais justas e compassivas.", "É importante apenas para as relações pessoais.", "Impede o pensamento racional."],
    correctAnswer: 1,
  },
  {
    id: 10,
    question: "O que é 'ética aplicada'?",
    options: ["A aplicação de princípios éticos a questões práticas e controversas em áreas como medicina, meio ambiente, tecnologia e negócios.", "A teoria ética abstrata, sem relação com a realidade.", "A imposição de valores morais por meio da lei.", "A ética restrita ao âmbito religioso."],
    correctAnswer: 0,
  },
  {
    id: 11,
    question: "Qual a relação entre 'liberdade' e 'responsabilidade' na ética?",
    options: ["São conceitos opostos.", "A liberdade implica responsabilidade, pois nossas escolhas têm consequências e devemos arcar com elas.", "A liberdade é ilimitada e não exige responsabilidade.", "A responsabilidade anula a liberdade."],
    correctAnswer: 1,
  },
  {
    id: 12,
    question: "O que é 'ética deontológica'?",
    options: ["Uma ética baseada nas consequências das ações.", "Uma ética baseada em deveres e regras morais fixas, independentemente das consequências.", "Uma ética baseada no prazer e na felicidade.", "Uma ética baseada na intuição."],
    correctAnswer: 1,
  },

  // Tópico 2: Filosofia Política (Contratualistas, Poder, Estado)
  {
    id: 13,
    question: "Para Thomas Hobbes, o estado de natureza (antes da criação do Estado) é caracterizado por:",
    options: ["Paz e harmonia entre os indivíduos.", "Uma guerra de todos contra todos, onde a vida é 'solitária, pobre, sórdida, brutal e curta'.", "Cooperação e solidariedade.", "Igualdade e justiça."],
    correctAnswer: 1,
  },
  {
    id: 14,
    question: "John Locke defendia que o Estado deveria garantir, principalmente, os direitos:",
    options: ["À propriedade privada, à liberdade e à vida.", "À igualdade social e à distribuição de renda.", "À saúde e à educação gratuitas.", "Ao poder absoluto do governante."],
    correctAnswer: 0,
  },
  {
    id: 15,
    question: "Jean-Jacques Rousseau acreditava que a 'vontade geral' deveria ser a base do:",
    options: ["Poder absoluto do rei.", "Governo democrático, onde o povo decide o que é melhor para a coletividade.", "Sistema aristocrático.", "Estado de natureza."],
    correctAnswer: 1,
  },
  {
    id: 16,
    question: "O que é 'soberania'?",
    options: ["A capacidade de um Estado de exercer poder sobre seu território e sua população, sem interferência externa.", "A divisão de poderes entre Executivo, Legislativo e Judiciário.", "A submissão de um Estado a outro mais poderoso.", "A ausência de governo."],
    correctAnswer: 0,
  },
  {
    id: 17,
    question: "Qual a principal característica do 'Estado de bem-estar social' (Welfare State)?",
    options: ["Mínima intervenção do Estado na economia.", "Ampla intervenção do Estado na economia e na garantia de direitos sociais (saúde, educação, assistência).", "Estado autoritário e controlador.", "Estado teocrático."],
    correctAnswer: 1,
  },
  {
    id: 18,
    question: "O que é 'ideologia'?",
    options: ["Um sistema de ideias, valores e crenças que sustentam e justificam um determinado sistema político, econômico ou social.", "A busca pela verdade objetiva e imparcial.", "A ausência de pensamento crítico.", "A defesa da neutralidade política."],
    correctAnswer: 0,
  },
  {
    id: 19,
    question: "Qual a diferença entre 'democracia direta' e 'democracia representativa'?",
    options: ["Na democracia direta, o povo exerce o poder diretamente; na representativa, o povo elege representantes para tomar decisões.", "São sinônimos.", "Na democracia direta, o poder é exercido por um líder; na representativa, por um grupo.", "A democracia direta é mais eficiente; a representativa é mais justa."],
    correctAnswer: 0,
  },
  {
    id: 20,
    question: "O que é 'totalitarismo'?",
    options: ["Um sistema político que garante a liberdade individual acima de tudo.", "Um sistema político que busca controlar todos os aspectos da vida pública e privada, com forte repressão à oposição.", "Um sistema político que promove a igualdade social.", "Um sistema político que valoriza a diversidade cultural."],
    correctAnswer: 1,
  },
  {
    id: 21,
    question: "Qual a função dos 'partidos políticos' em uma democracia?",
    options: ["Apenas disputar eleições.", "Representar diferentes ideologias e interesses da sociedade, buscando o poder para implementar seus programas.", "Controlar a mídia.", "Impedir a participação popular."],
    correctAnswer: 1,
  },
  {
    id: 22,
    question: "O que é 'anarquismo'?",
    options: ["A defesa de um governo forte e centralizado.", "A crença na ausência de governo e na autogestão da sociedade.", "A busca pelo poder a qualquer custo.", "A aceitação passiva da ordem estabelecida."],
    correctAnswer: 1,
  },
  {
    id: 23,
    question: "Qual a relação entre 'poder' e 'legitimidade'?",
    options: ["São conceitos opostos.", "Poder é a capacidade de impor a vontade; legitimidade é a aceitação e o reconhecimento desse poder como justo e válido.", "Poder é sempre ilegítimo.", "Legitimidade não é importante para o exercício do poder."],
    correctAnswer: 1,
  },
  {
    id: 24,
    question: "O conceito de 'Estado laico' significa que:",
    options: ["O Estado deve seguir uma religião oficial.", "O Estado é neutro em relação às religiões, garantindo a liberdade de culto e não privilegiando nenhuma crença.", "O Estado deve proibir todas as religiões.", "O Estado deve financiar todas as religiões igualmente."],
    correctAnswer: 1,
  },

  // Tópico 3: Teoria do Conhecimento (Epistemologia)
  {
    id: 25,
    question: "O que é 'epistemologia'?",
    options: ["O estudo da moral e dos valores.", "O estudo da natureza do conhecimento, suas fontes, limites e validade.", "O estudo da organização da sociedade.", "O estudo da arte e da beleza."],
    correctAnswer: 1,
  },
  {
    id: 26,
    question: "Qual a principal diferença entre 'racionalismo' e 'empirismo'?",
    options: ["Racionalismo valoriza a razão como fonte de conhecimento; empirismo valoriza a experiência sensorial.", "São sinônimos.", "Racionalismo valoriza a experiência; empirismo valoriza a razão.", "Racionalismo é mais moderno; empirismo é mais antigo."],
    correctAnswer: 0,
  },
  {
    id: 27,
    question: "René Descartes, filósofo racionalista, defendia que a principal ferramenta para alcançar o conhecimento verdadeiro é a:",
    options: ["Observação da natureza.", "Dúvida metódica e a razão.", "Experimentação científica.", "Intuição."],
    correctAnswer: 1,
  },
  {
    id: 28,
    question: "Para os empiristas (Locke, Hume), a mente humana ao nascer é como uma:",
    options: ["Tábula rasa, sem ideias inatas.", "Fonte de ideias perfeitas.", "Cópia do mundo exterior.", "Prisão do corpo."],
    correctAnswer: 0,
  },
  {
    id: 29,
    question: "O que é 'ceticismo'?",
    options: ["A crença na possibilidade de alcançar o conhecimento absoluto.", "A dúvida sistemática em relação à possibilidade de se obter conhecimento certo e seguro.", "A aceitação de todas as opiniões.", "A valorização da ignorância."],
    correctAnswer: 1,
  },
  {
    id: 30,
    question: "Immanuel Kant buscou conciliar racionalismo e empirismo, propondo que o conhecimento surge da:",
    options: ["Apenas da razão.", "Apenas da experiência.", "Interação entre a experiência sensorial e as estruturas da mente.", "Imposição de ideias inatas."],
    correctAnswer: 2,
  },
  {
    id: 31,
    question: "O que é 'senso comum'?",
    options: ["Conhecimento científico e comprovado.", "Conhecimento prático e espontâneo, baseado em experiências cotidianas e tradições.", "Conhecimento filosófico profundo.", "Conhecimento religioso."],
    correctAnswer: 1,
  },
  {
    id: 32,
    question: "Qual a diferença entre 'verdade' e 'validade'?",
    options: ["São sinônimos.", "Verdade se refere à correspondência com a realidade; validade se refere à correção lógica de um argumento.", "Verdade é subjetiva; validade é objetiva.", "Verdade é para a ciência; validade é para a filosofia."],
    correctAnswer: 1,
  },
  {
    id: 33,
    question: "O que é 'método científico'?",
    options: ["Um conjunto de regras fixas para se chegar à verdade.", "Um conjunto de procedimentos sistemáticos para investigar fenômenos, testar hipóteses e construir conhecimento.", "A opinião de um cientista famoso.", "A crença em teorias não comprovadas."],
    correctAnswer: 1,
  },
  {
    id: 34,
    question: "O que é 'falseabilidade' (ou refutabilidade), critério proposto por Karl Popper?",
    options: ["A capacidade de uma teoria ser sempre verdadeira.", "A possibilidade de uma teoria ser testada e, potencialmente, demonstrada falsa.", "A irrelevância da experimentação.", "A impossibilidade de se provar algo."],
    correctAnswer: 1,
  },
  {
    id: 35,
    question: "O que é 'conhecimento a priori'?",
    options: ["Conhecimento que depende da experiência.", "Conhecimento que é independente da experiência e pode ser obtido apenas pela razão.", "Conhecimento falso.", "Conhecimento provisório."],
    correctAnswer: 1,
  },
  {
    id: 36,
    question: "Qual a importância da 'dúvida' no processo de busca pelo conhecimento?",
    options: ["A dúvida impede o conhecimento.", "A dúvida é um ponto de partida para questionar, investigar e buscar respostas mais sólidas.", "A dúvida é sinal de ignorância.", "A dúvida é sempre negativa."],
    correctAnswer: 1,
  },

  // Tópico 4: Existencialismo e a Condição Humana
  {
    id: 37,
    question: "Qual a principal característica do existencialismo?",
    options: ["A crença em uma essência humana predefinida.", "A ênfase na liberdade individual, na responsabilidade e na busca por sentido em um mundo absurdo.", "A defesa de valores morais universais.", "A valorização da vida em sociedade acima de tudo."],
    correctAnswer: 1,
  },
  {
    id: 38,
    question: "Jean-Paul Sartre, filósofo existencialista, afirmava que 'a existência precede a essência'. O que isso significa?",
    options: ["Que nascemos com uma natureza humana predeterminada.", "Que primeiro existimos e, depois, construímos nossa própria essência por meio de nossas escolhas e ações.", "Que a essência é mais importante que a existência.", "Que não temos liberdade de escolha."],
    correctAnswer: 1,
  },
  {
    id: 39,
    question: "O que é 'angústia' para os existencialistas?",
    options: ["Um sentimento de alegria e satisfação.", "A consciência da liberdade e da responsabilidade que temos diante das escolhas que fazemos.", "Um medo irracional do futuro.", "A falta de preocupação com o sentido da vida."],
    correctAnswer: 1,
  },
  {
    id: 40,
    question: "Albert Camus, em 'O Mito de Sísifo', utiliza a imagem de Sísifo para representar:",
    options: ["A futilidade e o absurdo da existência humana, mas também a possibilidade de encontrar sentido na revolta e na consciência.", "A importância de seguir as regras.", "A necessidade de acreditar em Deus.", "A esperança em um futuro melhor."],
    correctAnswer: 0,
  },
  {
    id: 41,
    question: "O que é 'má-fé' para Sartre?",
    options: ["A crença em Deus.", "A aceitação da própria liberdade.", "A tentativa de negar a própria liberdade e responsabilidade, buscando desculpas ou se escondendo em papéis sociais predefinidos.", "A prática da honestidade acima de tudo."],
    correctAnswer: 2,
  },
  {
    id: 42,
    question: "Para os existencialistas, o 'absurdo' se refere a:",
    options: ["A falta de sentido inerente ao universo e à condição humana.", "A beleza da natureza.", "A ordem e a harmonia do mundo.", "A existência de Deus."],
    correctAnswer: 0,
  },
  {
    id: 43,
    question: "Qual a importância da 'autenticidade' no existencialismo?",
    options: ["Seguir as normas sociais.", "Ser fiel a si mesmo, assumindo a própria liberdade e responsabilidade, em vez de se deixar moldar por influências externas.", "Buscar a aprovação dos outros.", "Negar a própria individualidade."],
    correctAnswer: 1,
  },
  {
    id: 44,
    question: "O que é 'niilismo'?",
    options: ["A crença em valores absolutos.", "A negação de todos os valores, crenças e sentidos da existência.", "A busca pela felicidade.", "A aceitação da vida como ela é."],
    correctAnswer: 1,
  },
  {
    id: 45,
    question: "Para os existencialistas, a morte é:",
    options: ["O fim de tudo.", "Uma passagem para outra vida.", "Um mistério insondável.", "Um evento que dá sentido à vida, pois nos lembra da finitude e da importância de aproveitar o tempo."],
    correctAnswer: 3,
  },
  {
    id: 46,
    question: "O que significa dizer que 'estamos condenados a ser livres' (Sartre)?",
    options: ["Que não temos escolha.", "Que a liberdade é uma prisão.", "Que somos obrigados a escolher e a arcar com as consequências de nossas escolhas, sem poder escapar da responsabilidade.", "Que a liberdade é uma ilusão."],
    correctAnswer: 2,
  },
  {
    id: 47,
    question: "Qual a relação entre 'existência' e 'essência' para o existencialismo?",
    options: ["São a mesma coisa.", "A essência precede a existência.", "A existência precede a essência.", "Não há relação entre elas."],
    correctAnswer: 2,
  },
  {
    id: 48,
    question: "O que é 'alteridade'?",
    options: ["A capacidade de se colocar no lugar do outro, reconhecendo sua dignidade e singularidade.", "A busca pela igualdade.", "A negação das diferenças.", "O isolamento social."],
    correctAnswer: 0,
  },

  // Tópico 5: Filosofia da Ciência e Tecnologia
  {
    id: 49,
    question: "Qual a principal característica da 'ciência moderna'?",
    options: ["Baseia-se apenas na observação.", "Utiliza o método científico, a experimentação e a busca por leis universais para explicar os fenômenos naturais.", "Baseia-se em crenças religiosas.", "Não busca a objetividade."],
    correctAnswer: 1,
  },
  {
    id: 50,
    question: "O que é 'paradigma científico', segundo Thomas Kuhn?",
    options: ["Uma teoria científica comprovada.", "Um conjunto de crenças, valores e técnicas compartilhadas por uma comunidade científica, que orienta a pesquisa em um determinado período.", "Um erro científico.", "Uma lei universal."],
    correctAnswer: 1,
  },
  {
    id: 51,
    question: "Qual a relação entre 'ciência' e 'tecnologia'?",
    options: ["São opostas.", "A tecnologia é a aplicação prática do conhecimento científico para resolver problemas e criar novas ferramentas e processos.", "A ciência depende da tecnologia.", "Não há relação entre elas."],
    correctAnswer: 1,
  },
  {
    id: 52,
    question: "O que são 'pseudociências'?",
    options: ["Teorias científicas muito complexas.", "Práticas ou sistemas de crenças que se apresentam como científicos, mas não seguem o método científico e não possuem evidências que as sustentem.", "Ciências exatas.", "Ciências que estudam a mente humana."],
    correctAnswer: 1,
  },
  {
    id: 53,
    question: "Quais são os possíveis impactos negativos do desenvolvimento tecnológico?",
    options: ["Apenas benefícios.", "Desemprego, poluição, desigualdade social, obsolescência programada e riscos à privacidade.", "Aumento da qualidade de vida para todos.", "A solução de todos os problemas da humanidade."],
    correctAnswer: 1,
  },
  {
    id: 54,
    question: "O que é 'determinismo tecnológico'?",
    options: ["A crença de que a tecnologia é neutra.", "A ideia de que a tecnologia é o principal motor da história e que determina o desenvolvimento social, político e econômico.", "A defesa do controle da tecnologia pelo Estado.", "A rejeição de todas as tecnologias."],
    correctAnswer: 1,
  },
  {
    id: 55,
    question: "Qual a importância da 'ética na ciência'?",
    options: ["Não há necessidade de ética na ciência.", "Garantir que a pesquisa científica seja realizada de forma responsável, respeitando os direitos humanos, o meio ambiente e o bem-estar social.", "Apenas evitar fraudes.", "Acelerar o progresso científico a qualquer custo."],
    correctAnswer: 1,
  },
  {
    id: 56,
    question: "O que são 'tecnologias disruptivas'?",
    options: ["Tecnologias que não causam impacto.", "Tecnologias que transformam radicalmente mercados, indústrias e a sociedade.", "Tecnologias muito caras.", "Tecnologias que são sempre benéficas."],
    correctAnswer: 1,
  },
  {
    id: 57,
    question: "Qual o risco do 'analfabetismo científico'?",
    options: ["Não há riscos.", "Dificuldade em compreender informações científicas, tomar decisões informadas e participar de debates sobre questões científicas e tecnológicas relevantes para a sociedade.", "Aumento da capacidade de memorização.", "A valorização do conhecimento tradicional."],
    correctAnswer: 1,
  },
  {
    id: 58,
    question: "O que é 'viés tecnológico'?",
    options: ["A neutralidade da tecnologia.", "A tendência de uma tecnologia favorecer certos grupos ou valores em detrimento de outros, reproduzindo desigualdades.", "A objetividade da ciência.", "A impossibilidade de controlar a tecnologia."],
    correctAnswer: 1,
  },
  {
    id: 59,
    question: "Qual o papel da 'regulamentação' no desenvolvimento tecnológico?",
    options: ["Impedir a inovação.", "Equilibrar a inovação com a proteção dos direitos, a segurança e o bem-estar da sociedade.", "Apenas beneficiar as empresas.", "Não é necessária."],
    correctAnswer: 1,
  },
  {
    id: 60,
    question: "O que é o método cartesiano proposto por René Descartes?",
    options: ["Um método científico baseado na observação.", "Um método filosófico baseado na dúvida sistemática para alcançar certezas.", "Um método de governo democrático.", "Um método de ensino escolar."],
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
  } = usePaginatedQuestionnaire(questions, 'FIL');

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
          <h1 className="text-3xl font-bold mb-2">Questionário de Filosofia</h1>
          <p className="text-muted-foreground">Avaliação de Filosofia</p>
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

export default QuestionarioFilosofia;
