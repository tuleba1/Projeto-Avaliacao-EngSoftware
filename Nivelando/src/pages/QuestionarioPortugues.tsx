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

const QuestionarioPortugues = () => {
  const navigate = useNavigate();

  const questions: Question[] = [
  // Tópico 1: Literatura Brasileira (Modernismo - 1ª e 2ª Geração)
  {
    id: 1,
    question: "A Semana de Arte Moderna de 1922 foi um marco para o Modernismo brasileiro. Um de seus principais objetivos era:",
    options: ["Retomar os padrões estéticos do Romantismo.", "Valorizar a arte clássica europeia.", "Romper com o academicismo e buscar uma arte mais nacional.", "Restaurar o Parnasianismo."],
    correctAnswer: 2,
  },
  {
    id: 2,
    question: "Qual característica é predominante na primeira fase do Modernismo brasileiro (1922-1930)?",
    options: ["Linguagem formal e rebuscada.", "Nacionalismo ufanista e busca por uma identidade brasileira.", "Retorno ao sentimentalismo romântico.", "Temas mitológicos."],
    correctAnswer: 1,
  },
  {
    id: 3,
    question: "A obra 'Macunaíma', de Mário de Andrade, é um exemplo da 1ª fase modernista e se destaca por:",
    options: ["Sua linguagem rebuscada e complexa.", "Explorar a identidade brasileira e a diversidade linguística.", "Defender a pureza da língua portuguesa.", "Criticar o uso de neologismos."],
    correctAnswer: 1,
  },
  {
    id: 4,
    question: "Na 2ª fase do Modernismo (1930-1945), a prosa é marcada por:",
    options: ["Exclusividade do regionalismo nordestino.", "Foco em temas urbanos e cosmopolitas apenas.", "Crítica social e regionalismo universal, com autores como Graciliano Ramos.", "Apenas narrativas de aventura."],
    correctAnswer: 2,
  },
  {
    id: 5,
    question: "Cecília Meireles, poetisa da 2ª fase modernista, tem sua obra caracterizada por:",
    options: ["Engajamento político e social direto.", "Lirismo, melancolia e temas existenciais/metafísicos.", "Linguagem humorística e irônica.", "Poesia concreta e visual."],
    correctAnswer: 1,
  },
  {
    id: 6,
    question: "Qual autor da 2ª fase modernista é conhecido por sua poesia social e por abordar o homem comum, como na obra 'A Rosa do Povo'?",
    options: ["Manuel Bandeira", "Carlos Drummond de Andrade", "Vinicius de Moraes", "João Cabral de Melo Neto"],
    correctAnswer: 1,
  },
  {
    id: 7,
    question: "O movimento antropofágico, idealizado por Oswald de Andrade, propunha:",
    options: ["Rejeitar toda a cultura estrangeira.", "Assimilar criticamente a cultura estrangeira para criar algo original.", "Imitar fielmente a arte europeia.", "Retornar aos padrões clássicos da arte."],
    correctAnswer: 1,
  },
  {
    id: 8,
    question: "Manuel Bandeira, poeta da 1ª fase modernista, é conhecido por:",
    options: ["Sua poesia engajada e política.", "O uso de linguagem coloquial, humor e a temática do cotidiano.", "Sonetos e formas fixas rigorosas.", "Textos épicos sobre a história do Brasil."],
    correctAnswer: 1,
  },
  {
    id: 9,
    question: "Qual das seguintes obras NÃO pertence à 2ª fase do Modernismo brasileiro?",
    options: ["Vidas Secas (Graciliano Ramos)", "O Cortiço (Aluísio Azevedo)", "Sentimento do Mundo (Carlos Drummond de Andrade)", "Capitães da Areia (Jorge Amado)"],
    correctAnswer: 1,
  },
  {
    id: 10,
    question: "A poesia de Vinicius de Moraes (2ª fase modernista) é marcada principalmente por:",
    options: ["Abordar temas puramente sociais e políticos.", "Foco na vida urbana e na crítica social.", "Temas amorosos, beleza feminina e cotidianos, com influência do samba.", "Poesia hermética e de difícil compreensão."],
    correctAnswer: 2,
  },
  {
    id: 11,
    question: "Em que período cronológico se situa a 1ª fase do Modernismo brasileiro?",
    options: ["1900-1910", "1922-1930", "1930-1945", "1945-1960"],
    correctAnswer: 1,
  },
  {
    id: 12,
    question: "Qual o principal objetivo da revista 'Klaxon', importante veículo da 1ª fase modernista?",
    options: ["Divulgar poemas parnasianos.", "Criticar a arte moderna europeia.", "Propagar as ideias e a estética modernistas.", "Publicar contos realistas."],
    correctAnswer: 2,
  },

  // Tópico 2: Sintaxe do Período Composto (Orações Coordenadas e Subordinadas)
  {
    id: 13,
    question: "Em 'Ele estudou muito, **mas** não foi aprovado.', a oração destacada é classificada como:",
    options: ["Oração coordenada sindética aditiva.", "Oração coordenada sindética adversativa.", "Oração coordenada sindética alternativa.", "Oração coordenada sindética conclusiva."],
    correctAnswer: 1,
  },
  {
    id: 14,
    question: "Qual das alternativas apresenta uma oração subordinada substantiva subjetiva?",
    options: ["É necessário **que você se esforce**.", "Desejo **que você volte logo**.", "Tenho certeza **de que ele virá**.", "Ele é tão esperto **quanto o irmão**."],
    correctAnswer: 0,
  },
  {
    id: 15,
    question: "Na frase 'Ele não compareceu **porque estava doente**.', a oração destacada é subordinada adverbial:",
    options: ["Temporal", "Concessiva", "Causal", "Condicional."],
    correctAnswer: 2,
  },
  {
    id: 16,
    question: "Qual a função sintática da oração destacada em 'Comprei a casa **que me indicaram**.'?",
    options: ["Oração subordinada substantiva.", "Oração subordinada adjetiva restritiva.", "Oração subordinada adjetiva explicativa.", "Oração coordenada assindética."],
    correctAnswer: 1,
  },
  {
    id: 17,
    question: "Em 'Ou você estuda, **ou você trabalha**.', a conjunção 'ou' introduz uma oração coordenada sindética:",
    options: ["Aditiva", "Alternativa", "Explicativa", "Conclusiva."],
    correctAnswer: 1,
  },
  {
    id: 18,
    question: "Assinale a alternativa que contém uma oração subordinada adverbial condicional.",
    options: ["Estudou muito, **portanto foi aprovado**.", "**Caso ele venha**, avise-me.", "Viajou **apesar da chuva**.", "Falou **como se soubesse tudo**."],
    correctAnswer: 1,
  },
  {
    id: 19,
    question: "Em 'Ele esperava **que você chegasse cedo**.', a oração destacada é subordinada substantiva:",
    options: ["Subjetiva", "Objetiva direta", "Completiva nominal", "Apositiva."],
    correctAnswer: 1,
  },
  {
    id: 20,
    question: "Qual o tipo de oração subordinada que funciona como adjunto adverbial da oração principal?",
    options: ["Subordinada substantiva", "Subordinada adjetiva", "Subordinada adverbial", "Coordenada."],
    correctAnswer: 2,
  },
  {
    id: 21,
    question: "A frase 'Não sei **se ele virá**.' apresenta uma oração subordinada substantiva:",
    options: ["Subjetiva", "Objetiva direta", "Objetiva indireta", "Predicativa."],
    correctAnswer: 1,
  },
  {
    id: 22,
    question: "Em 'Trabalhe muito, **que o sucesso virá**.', a oração destacada é coordenada sindética:",
    options: ["Explicativa", "Aditiva", "Adversativa", "Alternativa."],
    correctAnswer: 0,
  },
  {
    id: 23,
    question: "Qual das frases a seguir possui uma oração subordinada adjetiva explicativa?",
    options: ["Vi o filme **que você indicou**.", "O livro, **que é interessante**, está na mesa.", "As pessoas **que vieram** gostaram.", "Quero **que você estude**."],
    correctAnswer: 1,
  },
  {
    id: 24,
    question: "A oração 'Fez tudo **conforme o professor orientou**.' é subordinada adverbial:",
    options: ["Comparativa", "Conformativa", "Proporcional", "Consecutiva."],
    correctAnswer: 1,
  },

  // Tópico 3: Regência Verbal e Nominal, e Crase
  {
    id: 25,
    question: "Em qual das frases a regência verbal está CORRETA?",
    options: ["Assisti o filme ontem à noite.", "Obedeci o sinal de trânsito.", "Aspiro um cargo de chefia.", "Ele se referiu ao seu irmão."],
    correctAnswer: 3,
  },
  {
    id: 26,
    question: "Assinale a alternativa em que o uso da crase está CORRETO.",
    options: ["Fui à pé.", "Ele chegou à tempo.", "Voltei à casa dos meus pais.", "Fomos a praia."],
    correctAnswer: 2,
  },
  {
    id: 27,
    question: "O verbo 'assistir', no sentido de 'ver', é um verbo transitivo:",
    options: ["Direto", "Indireto e exige a preposição 'a'.", "Direto e indireto.", "Intransitivo."],
    correctAnswer: 1,
  },
  {
    id: 28,
    question: "Em 'Tenho aversão **a** preconceito.', a regência nominal exige a preposição 'a'. A crase aqui seria:",
    options: ["Obrigatória", "Opcional", "Proibida", "Depende do contexto."],
    correctAnswer: 2,
  },
  {
    id: 29,
    question: "Qual a alternativa em que a crase é OBRIGATÓRIA?",
    options: ["Iremos a pé.", "Chegamos a uma hora.", "Dirigiu-se à senhora.", "A distância de cem metros."],
    correctAnswer: 2,
  },
  {
    id: 30,
    question: "A regência do verbo 'implicar', no sentido de 'acarretar', é:",
    options: ["Transitivo direto", "Transitivo indireto com 'em'", "Transitivo direto e indireto", "Intransitivo"],
    correctAnswer: 0,
  },
  {
    id: 31,
    question: "Em qual frase a regência do verbo 'agradar' está correta no sentido de 'fazer carinho'?",
    options: ["Agradou ao filho.", "Agradou o filho.", "Agradou com o filho.", "Agradou-lhe o filho."],
    correctAnswer: 1,
  },
  {
    id: 32,
    question: "O uso da crase antes de pronomes demonstrativos (aquele, aquela, aquilo) é determinado por qual fator?",
    options: ["Sempre ocorre.", "Nunca ocorre.", "Depende da regência do termo anterior e da presença da preposição 'a'.", "Depende do gênero do pronome."],
    correctAnswer: 2,
  },
  {
    id: 33,
    question: "Qual das frases está INCORRETA quanto à regência nominal?",
    options: ["Tenho necessidade de ajuda.", "Ele é apto a essa função.", "Sua opinião é passível de questionamento.", "Ele é alheio à realidade."],
    correctAnswer: 1,
  },
  {
    id: 34,
    question: "A palavra 'favorável' rege a preposição:",
    options: ["'com'", "'por'", "'a'", "'para' ou 'a'"],
    correctAnswer: 3,
  },
  {
    id: 35,
    question: "Em 'Fui **à** festa.', a crase ocorre porque:",
    options: ["O verbo 'ir' é transitivo direto.", "O substantivo 'festa' exige a preposição 'a'.", "O verbo 'ir' exige a preposição 'a' e 'festa' aceita o artigo 'a'.", "É uma exceção à regra geral."],
    correctAnswer: 2,
  },
  {
    id: 36,
    question: "Qual das opções apresenta regência nominal CORRETA?",
    options: ["Sou acessível aos alunos.", "Tenho dúvida em matemática.", "Sua atitude foi compatível com a minha.", "Ele é desatento para os detalhes."],
    correctAnswer: 0,
  },

  // Tópico 4: Variação Linguística e Níveis de Linguagem
  {
    id: 37,
    question: "Qual tipo de variação linguística se refere às diferenças na fala de grupos sociais específicos (ex: gírias de jovens)?",
    options: ["Variação regional (diatópica)", "Variação histórica (diacrônica)", "Variação social (diastrática)", "Variação estilística (diafásica)"],
    correctAnswer: 2,
  },
  {
    id: 38,
    question: "O uso de 'tu' em algumas regiões do Brasil e 'você' em outras é um exemplo de variação:",
    options: ["Social", "Histórica", "Regional", "Estilística"],
    correctAnswer: 2,
  },
  {
    id: 39,
    question: "A linguagem formal é mais adequada para qual situação comunicativa?",
    options: ["Conversas informais com amigos.", "Escrever um bilhete para a família.", "Redigir um documento oficial ou um texto acadêmico.", "Postagens em redes sociais."],
    correctAnswer: 2,
  },
  {
    id: 40,
    question: "A mudança na pronúncia de palavras ao longo do tempo (ex: 'pharmacia' para 'farmácia') é um exemplo de variação:",
    options: ["Regional", "Social", "Histórica", "Estilística"],
    correctAnswer: 2,
  },
  {
    id: 41,
    question: "Qual o conceito que se refere à adequação da linguagem à situação de comunicação, variando do formal ao informal?",
    options: ["Dialeto", "Gíria", "Nível de linguagem (ou registro)", "Sotaque"],
    correctAnswer: 2,
  },
  {
    id: 42,
    question: "O que é um 'dialeto'?",
    options: ["Um erro gramatical cometido por falantes.", "Uma forma de linguagem usada apenas por pessoas idosas.", "Uma variedade de uma língua falada em uma determinada região geográfica.", "Um idioma completamente diferente de outro."],
    correctAnswer: 2,
  },
  {
    id: 43,
    question: "O uso de jargões técnicos em um ambiente profissional (ex: medicina, direito) é um exemplo de variação:",
    options: ["Regional", "Histórica", "Social", "Estilística informal"],
    correctAnswer: 2,
  },
  {
    id: 44,
    question: "Qual a função da linguagem que tem como foco o EMISSOR e suas emoções?",
    options: ["Função referencial", "Função emotiva", "Função conativa", "Função fática"],
    correctAnswer: 1,
  },
  {
    id: 45,
    question: "Em um artigo científico, qual função da linguagem é predominante?",
    options: ["Função poética", "Função emotiva", "Função referencial", "Função metalinguística"],
    correctAnswer: 2,
  },
  {
    id: 46,
    question: "Quando o falante busca influenciar o receptor (ex: em uma propaganda), a função da linguagem predominante é:",
    options: ["Função fática", "Função conativa (ou apelativa)", "Função poética", "Função emotiva"],
    correctAnswer: 1,
  },
  {
    id: 47,
    question: "A linguagem de um poema que valoriza a sonoridade e a forma da mensagem é exemplo da função:",
    options: ["Referencial", "Emotiva", "Poética", "Metalinguística"],
    correctAnswer: 2,
  },
  {
    id: 48,
    question: "Qual função da linguagem é utilizada quando se explica o significado de uma palavra em um dicionário?",
    options: ["Função fática", "Função referencial", "Função metalinguística", "Função conativa"],
    correctAnswer: 2,
  },

  // Tópico 5: Figuras de Linguagem e Funções da Linguagem
  {
    id: 49,
    question: "Qual figura de linguagem consiste em exagerar uma ideia para dar ênfase (ex: 'Estou morrendo de fome!')?",
    options: ["Metáfora", "Ironia", "Hipérbole", "Eufemismo"],
    correctAnswer: 2,
  },
  {
    id: 50,
    question: "Em 'Meus olhos são dois rios.', qual figura de linguagem está presente?",
    options: ["Comparação", "Metáfora", "Metonímia", "Personificação"],
    correctAnswer: 1,
  },
  {
    id: 51,
    question: "Quando se diz o contrário do que se pensa, com intenção de criticar ou satirizar, usa-se a figura de linguagem:",
    options: ["Símile", "Antítese", "Paradoxo", "Ironia"],
    correctAnswer: 3,
  },
  {
    id: 52,
    question: "Em 'O sol beijava as montanhas.', qual figura de linguagem atribui características humanas a seres inanimados?",
    options: ["Onomatopeia", "Prosopopeia (Personificação)", "Sinestesia", "Hipérbato"],
    correctAnswer: 1,
  },
  {
    id: 53,
    question: "Qual figura de linguagem suaviza uma ideia desagradável ou chocante (ex: 'ele partiu desta para melhor' em vez de 'ele morreu')?",
    options: ["Hipérbole", "Eufemismo", "Gradação", "Elipse"],
    correctAnswer: 1,
  },
  {
    id: 54,
    question: "A repetição intencional de um som consonantal para criar um efeito sonoro é chamada de:",
    options: ["Aliteração", "Assonância", "Onomatopeia", "Paralelismo"],
    correctAnswer: 0,
  },
  {
    id: 55,
    question: "Qual função da linguagem foca no CANAL da comunicação, testando se a comunicação está funcionando (ex: 'Alô? Está me ouvindo?')?",
    options: ["Função emotiva", "Função conativa", "Função fática", "Função metalinguística"],
    correctAnswer: 2,
  },
  {
    id: 56,
    question: "Em 'Fome, miséria, desespero: tudo isso estava em seus olhos.', qual figura de linguagem enumera elementos de forma crescente ou decrescente?",
    options: ["Antítese", "Paradoxo", "Gradação", "Elipse"],
    correctAnswer: 2,
  },
  {
    id: 57,
    question: "Qual função da linguagem tem como foco o CONTEXTO ou REFERENTE (a informação objetiva)?",
    options: ["Função poética", "Função referencial", "Função emotiva", "Função fática"],
    correctAnswer: 1,
  },
  {
    id: 58,
    question: "A figura de linguagem que consiste na omissão de um termo que pode ser facilmente subentendido é a:",
    options: ["Pleonasmo", "Silepse", "Elipse", "Zeugma"],
    correctAnswer: 2,
  },
  {
    id: 59,
    question: "Em 'Ele comia o pão que o diabo amassou.', qual figura de linguagem expressa uma ideia pelo todo ou parte?",
    options: ["Catacrese", "Sinestesia", "Metonímia", "Antítese"],
    correctAnswer: 2,
  },
  {
    id: 60,
    question: "Qual figura de linguagem consiste no emprego de palavras com sons semelhantes, mas sentidos diferentes, para criar um jogo de palavras?",
    options: ["Aliteração", "Assonância", "Paronomásia", "Pleonasmo"],
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
  } = usePaginatedQuestionnaire(questions, 'POR');

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
          <h1 className="text-3xl font-bold mb-2">Questionário de Português</h1>
          <p className="text-muted-foreground">Avaliação de Português</p>
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

export default QuestionarioPortugues;
