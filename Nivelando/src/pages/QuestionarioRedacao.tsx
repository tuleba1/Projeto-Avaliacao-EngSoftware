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

const QuestionarioRedacao = () => {
  const navigate = useNavigate();

  const questions: Question[] = [
  // Tópico 1: Estrutura da Dissertação Argumentativa
  {
    id: 1,
    question: "Qual a principal função da tese em um texto dissertativo-argumentativo?",
    options: ["Apresentar dados estatísticos sobre o tema.", "Resumir o conteúdo de cada parágrafo do desenvolvimento.", "Expor o ponto de vista do autor sobre o tema, que será defendido ao longo do texto.", "Propor soluções para os problemas abordados."],
    correctAnswer: 2,
  },
  {
    id: 2,
    question: "Em qual parte do texto dissertativo-argumentativo a proposta de intervenção social deve ser apresentada, conforme o modelo ENEM?",
    options: ["Introdução", "Desenvolvimento", "Conclusão", "Em qualquer parte do texto, desde que seja clara."],
    correctAnswer: 2,
  },
  {
    id: 3,
    question: "Qual a função dos parágrafos de desenvolvimento em uma dissertação?",
    options: ["Apenas apresentar novos temas para discussão.", "Expor a tese e o problema a ser discutido.", "Apresentar e fundamentar os argumentos que sustentam a tese, com exemplos, dados e explicações.", "Concluir o texto e resumir as ideias principais."],
    correctAnswer: 2,
  },
  {
    id: 4,
    question: "Uma boa introdução em um texto dissertativo-argumentativo deve conter:",
    options: ["Apenas a solução para o problema.", "Apresentação do tema e da tese a ser defendida.", "Uma lista de todos os argumentos que serão utilizados.", "Um resumo detalhado de todo o desenvolvimento."],
    correctAnswer: 1,
  },
  {
    id: 5,
    question: "Qual a importância do projeto de texto (planejamento) antes de iniciar a escrita da redação?",
    options: ["Tornar o texto mais longo e complexo.", "Garantir a organização das ideias, a coerência e a progressão temática do texto.", "Apenas memorizar o tema da redação.", "Evitar o uso de conectivos e elementos de coesão."],
    correctAnswer: 1,
  },
  {
    id: 6,
    question: "Em quantos parágrafos é ideal estruturar uma redação dissertativo-argumentativa do tipo ENEM?",
    options: ["2 a 3 parágrafos", "4 a 5 parágrafos", "Mais de 6 parágrafos", "Apenas 1 parágrafo grande."],
    correctAnswer: 1,
  },
  {
    id: 7,
    question: "Qual o elemento obrigatório da conclusão da redação ENEM que deve detalhar a solução para o problema?",
    options: ["Retomada da tese", "Síntese dos argumentos", "Proposta de intervenção", "Nova problemática"],
    correctAnswer: 2,
  },
  {
    id: 8,
    question: "O que é 'fuga ao tema' em uma redação?",
    options: ["Apresentar uma tese diferente da esperada.", "Abordar um assunto completamente diferente do proposto.", "Utilizar muitos exemplos.", "Escrever mais do que o limite de linhas."],
    correctAnswer: 1,
  },
  {
    id: 9,
    question: "Para uma dissertação-argumentativa, o texto deve ter um caráter:",
    options: ["Puramente narrativo e descritivo.", "Objetivo e impessoal na exposição das ideias.", "Subjetivo e emotivo.", "Injuntivo, com comandos diretos."],
    correctAnswer: 1,
  },
  {
    id: 10,
    question: "Qual a relação entre o tema e a tese na introdução?",
    options: ["São a mesma coisa.", "A tese é um resumo do tema.", "A tese é o ponto de vista do autor sobre o tema.", "O tema é a conclusão da tese."],
    correctAnswer: 2,
  },
  {
    id: 11,
    question: "O desenvolvimento da redação deve ter, idealmente, quantos parágrafos?",
    options: ["Um único parágrafo extenso.", "Dois ou três parágrafos, cada um com um argumento.", "Apenas um parágrafo que resume todos os argumentos.", "Não há necessidade de parágrafos no desenvolvimento."],
    correctAnswer: 1,
  },
  {
    id: 12,
    question: "O que é 'tangenciamento ao tema' na redação?",
    options: ["Abordar o tema de forma completa e profunda.", "Discutir aspectos superficiais ou periféricos do tema, sem aprofundar na problemática central.", "Ignorar completamente o tema.", "Apresentar uma solução inovadora."],
    correctAnswer: 1,
  },

  // Tópico 2: Argumentação e Tipos de Argumento
  {
    id: 13,
    question: "Qual o principal objetivo da argumentação em uma dissertação?",
    options: ["Entreter o leitor.", "Informar sobre dados e fatos apenas.", "Persuadir o leitor a aceitar um ponto de vista.", "Descrever um cenário em detalhes."],
    correctAnswer: 2,
  },
  {
    id: 14,
    question: "Um argumento que se baseia na opinião de um especialista ou em dados de pesquisa é chamado de:",
    options: ["Argumento de senso comum.", "Argumento de autoridade.", "Argumento de exemplificação.", "Argumento de comparação."],
    correctAnswer: 1,
  },
  {
    id: 15,
    question: "Qual tipo de argumento compara duas situações ou realidades para demonstrar um ponto?",
    options: ["Argumento de causa e consequência.", "Argumento de princípio.", "Argumento de analogia (comparação).", "Argumento de fato."],
    correctAnswer: 2,
  },
  {
    id: 16,
    question: "O que é uma 'falácia' na argumentação?",
    options: ["Um argumento muito bem construído e irrefutável.", "Um tipo de citação de autoridade.", "Um erro de raciocínio que torna o argumento inválido ou enganoso, mesmo que pareça convincente.", "Uma figura de linguagem utilizada para enfatizar uma ideia."],
    correctAnswer: 2,
  },
  {
    id: 17,
    question: "Quando se apresenta uma situação específica ou um acontecimento para ilustrar e comprovar uma ideia, usa-se o argumento de:",
    options: ["Autoridade", "Causa e consequência", "Exemplificação", "Senso comum"],
    correctAnswer: 2,
  },
  {
    id: 18,
    question: "Qual a função de um argumento de causa e consequência?",
    options: ["Mostrar a opinião de um especialista.", "Estabelecer relações de origem e resultado entre fatos ou fenômenos.", "Ilustrar uma ideia com um exemplo.", "Comparar diferentes realidades."],
    correctAnswer: 1,
  },
  {
    id: 19,
    question: "Um argumento baseado em crenças populares ou ditados é um argumento de:",
    options: ["Autoridade", "Consenso", "Senso comum", "Provas concretas"],
    correctAnswer: 2,
  },
  {
    id: 20,
    question: "Qual a importância de ter um planejamento argumentativo antes de escrever a redação?",
    options: ["Limitar a criatividade.", "Garantir a coesão gramatical apenas.", "Organizar as ideias e a sequência lógica dos argumentos.", "Apenas economizar tempo."],
    correctAnswer: 2,
  },
  {
    id: 21,
    question: "A eficácia da argumentação está ligada à capacidade de:",
    options: ["Usar palavras difíceis.", "Apresentar muitos dados sem analisá-los.", "Convencer o leitor pela lógica e pela força das provas.", "Contar uma história emocionante."],
    correctAnswer: 2,
  },
  {
    id: 22,
    question: "Qual o risco de usar apenas argumentos de senso comum na redação?",
    options: ["Fortalecer a tese.", "Tornar o texto previsível e com pouca profundidade argumentativa.", "Aumentar a originalidade.", "Garantir a nota máxima."],
    correctAnswer: 1,
  },
  {
    id: 23,
    question: "Qual o papel do contra-argumento em uma dissertação?",
    options: ["Ignorar as críticas ao seu ponto de vista.", "Apresentar uma ideia totalmente oposta à sua tese.", "Reconhecer um ponto de vista contrário para refutá-lo e fortalecer sua própria tese.", "Concluir a redação."],
    correctAnswer: 2,
  },
  {
    id: 24,
    question: "Em um parágrafo argumentativo, qual a relação entre o tópico frasal e os exemplos/dados apresentados?",
    options: ["O tópico frasal resume o parágrafo; os exemplos o comprovam e desenvolvem.", "São elementos independentes.", "Os exemplos devem vir antes do tópico frasal.", "Apenas o tópico frasal é necessário."],
    correctAnswer: 0,
  },

  // Tópico 3: Coesão e Coerência Textual
  {
    id: 25,
    question: "A coerência textual refere-se à:",
    options: ["Conexão gramatical entre as partes do texto.", "Unidade de sentido do texto, à lógica e à progressão das ideias.", "Utilização de conjunções e pronomes para ligar as frases.", "Estrutura formal e à ortografia do texto."],
    correctAnswer: 1,
  },
  {
    id: 26,
    question: "Qual a importância dos conectivos (conjunções, advérbios) em um texto?",
    options: ["Apenas para aumentar o tamanho dos parágrafos.", "Garantir a coesão e a coerência textual, estabelecendo a relação lógica entre as ideias.", "Embelezar o texto com palavras difíceis.", "Substituir a necessidade de argumentos sólidos."],
    correctAnswer: 1,
  },
  {
    id: 27,
    question: "A coesão referencial em uma redação é utilizada para:",
    options: ["Repetir palavras e ideias.", "Evitar repetições desnecessárias, usando pronomes, sinônimos e elipses.", "Adicionar informações novas ao texto.", "Organizar as ideias de forma cronológica."],
    correctAnswer: 1,
  },
  {
    id: 28,
    question: "O que é 'progressão temática' em um texto?",
    options: ["Apenas a repetição do tema.", "A forma como o texto avança no tema, adicionando novas informações e desenvolvendo-o.", "O uso de figuras de linguagem.", "A correção gramatical."],
    correctAnswer: 1,
  },
  {
    id: 29,
    question: "Em 'Fui ao mercado e **lá** comprei frutas.', o termo 'lá' é um mecanismo de coesão:",
    options: ["Lexical", "Referencial (anáfora)", "Sequencial", "Gramatical por substituição."],
    correctAnswer: 1,
  },
  {
    id: 30,
    question: "A ambiguidade em um texto compromete diretamente a sua:",
    options: ["Estética", "Coerência", "Coesão", "Ortografia."],
    correctAnswer: 1,
  },
  {
    id: 31,
    question: "Qual o papel da coesão sequencial?",
    options: ["Retomar termos já mencionados.", "Estabelecer a progressão do texto, indicando relações de tempo, causa, consequência, etc.", "Garantir o sentido lógico das ideias.", "Adicionar informações irrelevantes."],
    correctAnswer: 1,
  },
  {
    id: 32,
    question: "Em 'É importante que você estude. **Além disso**, é fundamental que pratique.', o conectivo 'Além disso' estabelece uma relação de:",
    options: ["Oposição", "Conclusão", "Adição", "Causa."],
    correctAnswer: 2,
  },
  {
    id: 33,
    question: "A falta de concordância entre as ideias ou a presença de contradições em um texto indicam problemas de:",
    options: ["Coesão", "Coerência", "Ortografia", "Pontuação."],
    correctAnswer: 1,
  },
  {
    id: 34,
    question: "Quando um pronome é usado para retomar um termo que já foi mencionado no texto, é um caso de coesão por:",
    options: ["Catáfora", "Anáfora", "Elipse", "Substituição lexical."],
    correctAnswer: 1,
  },
  {
    id: 35,
    question: "Qual recurso de coesão é utilizado quando se substitui uma palavra por um sinônimo para evitar repetição?",
    options: ["Referência", "Elipse", "Substituição lexical", "Conjunção."],
    correctAnswer: 2,
  },
  {
    id: 36,
    question: "A repetição desnecessária de ideias ou palavras em um texto pode prejudicar a:",
    options: ["Coerência", "Coesão", "Apenas a estética", "Apenas a ortografia."],
    correctAnswer: 1,
  },

  // Tópico 4: Repertório Sociocultural e Proposta de Intervenção
  {
    id: 37,
    question: "O que é 'repertório sociocultural' em uma redação?",
    options: ["Apenas a opinião pessoal do autor sobre o tema.", "Conhecimentos de diversas áreas (história, filosofia, sociologia, arte, etc.) utilizados para fundamentar os argumentos.", "A capacidade de escrever sem erros de português.", "A quantidade de palavras utilizadas no texto."],
    correctAnswer: 1,
  },
  {
    id: 38,
    question: "Qual a importância de utilizar exemplos e dados em um texto argumentativo?",
    options: ["Apenas para aumentar o número de linhas da redação.", "Tornar o texto mais bonito e poético.", "Comprovar a validade dos argumentos e persuadir o leitor, tornando a argumentação mais concreta e consistente.", "Dificultar a compreensão do texto pelo leitor."],
    correctAnswer: 2,
  },
  {
    id: 39,
    question: "Em uma proposta de intervenção do ENEM, qual o elemento que responde à pergunta 'quem' fará a ação?",
    options: ["Ação", "Meio", "Agente", "Finalidade."],
    correctAnswer: 2,
  },
  {
    id: 40,
    question: "Qual a finalidade de uma alusão histórica em um texto dissertativo-argumentativo?",
    options: ["Contar uma história divertida para entreter o leitor.", "Introduzir um novo tema para a discussão.", "Contextualizar o tema, comparar situações ou fundamentar um argumento com base em eventos passados.", "Expressar a opinião pessoal do autor sobre o passado."],
    correctAnswer: 2,
  },
  {
    id: 41,
    question: "O que a Proposta de Intervenção deve, obrigatoriamente, respeitar para ser bem avaliada no ENEM?",
    options: ["Apenas as leis do país.", "Os direitos humanos.", "As crenças religiosas do autor.", "As opiniões da maioria da sociedade."],
    correctAnswer: 1,
  },
  {
    id: 42,
    question: "O que é um repertório 'legitimado' na redação do ENEM?",
    options: ["Qualquer informação que o autor conheça.", "Conhecimentos que são de domínio público e não precisam de comprovação.", "Dados, fatos ou informações que provêm de áreas do saber formal (filosofia, sociologia, história, etc.) ou de fontes confiáveis.", "Apenas citações de livros."],
    correctAnswer: 2,
  },
  {
    id: 43,
    question: "Qual o objetivo de detalhar a 'ação' na proposta de intervenção?",
    options: ["Indicar quem fará a proposta.", "Descrever o que será feito para resolver o problema.", "Explicar como a proposta será executada.", "Mostrar para que a proposta serve."],
    correctAnswer: 1,
  },
  {
    id: 44,
    question: "Em uma proposta de intervenção, o 'meio' ou 'modo' refere-se a:",
    options: ["O resultado esperado da ação.", "O local onde a ação será realizada.", "Como a ação será executada (os recursos, estratégias).", "Quem será o beneficiário da ação."],
    correctAnswer: 2,
  },
  {
    id: 45,
    question: "A utilização de um filme ou série para fundamentar um argumento é um exemplo de repertório:",
    options: ["Científico", "Artístico-cultural", "Histórico", "Político"],
    correctAnswer: 1,
  },
  {
    id: 46,
    question: "Qual a finalidade da 'finalidade' na proposta de intervenção?",
    options: ["Mostrar a quem a proposta se destina.", "Descrever os resultados esperados ou o impacto da ação.", "Detalhar o passo a passo da ação.", "Indicar as dificuldades de implementação."],
    correctAnswer: 1,
  },
  {
    id: 47,
    question: "O uso de dados estatísticos (percentuais, números) em um argumento visa:",
    options: ["Aumentar o número de palavras.", "Tornar o argumento mais subjetivo.", "Conferir veracidade e credibilidade ao que se afirma.", "Desviar o foco do tema."],
    correctAnswer: 2,
  },
  {
    id: 48,
    question: "Uma proposta de intervenção completa no ENEM deve conter pelo menos:",
    options: ["Apenas ação e finalidade.", "Agente, ação e meio.", "Agente, ação, meio e finalidade.", "Agente, ação, meio, finalidade e detalhamento."],
    correctAnswer: 3,
  },

  // Tópico 5: Aspectos Gramaticais e Estilísticos
  {
    id: 49,
    question: "O que é 'norma culta' da língua portuguesa?",
    options: ["A forma de falar de pessoas com alto nível de escolaridade.", "O conjunto de regras gramaticais e de vocabulário considerado padrão e de prestígio social, utilizado em situações formais de comunicação.", "A linguagem utilizada nas redes sociais e em conversas informais.", "A linguagem regional utilizada em áreas rurais."],
    correctAnswer: 1,
  },
  {
    id: 50,
    question: "Qual a importância da clareza na escrita de uma redação?",
    options: ["Utilizar um vocabulário muito complexo e técnico.", "Escrever frases muito longas e com muitas orações subordinadas.", "Transmitir as ideias de forma compreensível e sem ambiguidades para o leitor.", "Apenas evitar erros de ortografia e pontuação."],
    correctAnswer: 2,
  },
  {
    id: 51,
    question: "A revisão textual é fundamental para:",
    options: ["Apenas corrigir erros de digitação.", "Garantir a correção gramatical, a clareza e a coerência do texto.", "Mudar completamente o sentido do texto.", "Adicionar informações irrelevantes."],
    correctAnswer: 1,
  },
  {
    id: 52,
    question: "O que significa 'objetividade' em um texto dissertativo?",
    options: ["Expressar intensamente as emoções do autor.", "Abordar o tema de forma direta, sem juízos de valor pessoais ou rodeios.", "Utilizar um vocabulário rico em gírias.", "Contar uma história de vida."],
    correctAnswer: 1,
  },
  {
    id: 53,
    question: "Qual o principal efeito da ambiguidade em um texto?",
    options: ["Tornar o texto mais interessante.", "Aumentar a clareza da mensagem.", "Gerar múltiplas interpretações e dificultar a compreensão.", "Reduzir o tamanho do texto."],
    correctAnswer: 2,
  },
  {
    id: 54,
    question: "Em uma redação formal, qual o tipo de linguagem a ser priorizada?",
    options: ["Linguagem informal e coloquial.", "Linguagem regional.", "Linguagem técnica e específica do tema.", "Linguagem padrão (norma culta)."],
    correctAnswer: 3,
  },
  {
    id: 55,
    question: "O uso excessivo de vírgulas ou a ausência delas pode prejudicar a:",
    options: ["Coesão e clareza.", "Apenas a beleza do texto.", "Apenas o número de linhas.", "Apenas a introdução."],
    correctAnswer: 0,
  },
  {
    id: 56,
    question: "Qual a importância de um vocabulário variado em uma redação?",
    options: ["Para usar palavras difíceis.", "Demonstrar domínio da língua e evitar repetições desnecessárias.", "Aumentar o número de parágrafos.", "Tornar o texto mais informal."],
    correctAnswer: 1,
  },
  {
    id: 57,
    question: "A pontuação adequada contribui principalmente para a:",
    options: ["Subjetividade do texto.", "Fluidez da leitura e o sentido das frases.", "Complexidade da escrita.", "Introdução de novos argumentos."],
    correctAnswer: 1,
  },
  {
    id: 58,
    question: "Qual erro gramatical mais comum que deve ser evitado em uma redação formal?",
    options: ["Concordância verbal e nominal.", "Uso de conectivos.", "Utilização de exemplos.", "Criação de parágrafos."],
    correctAnswer: 0,
  },
  {
    id: 59,
    question: "A concisão na escrita significa:",
    options: ["Usar o máximo de palavras possível.", "Ser breve e preciso, usando apenas as palavras necessárias para expressar a ideia.", "Escrever frases muito longas.", "Repetir informações para enfatizar."],
    correctAnswer: 1,
  },
  {
    id: 60,
    question: "O que a 'legibilidade' de um texto se refere?",
    options: ["Apenas ao tamanho da letra.", "A capacidade do texto de ser facilmente lido e compreendido.", "Ao uso de imagens no texto.", "À criatividade do autor."],
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
  } = usePaginatedQuestionnaire(questions, 'RED');

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
          <h1 className="text-3xl font-bold mb-2">Questionário de Redação</h1>
          <p className="text-muted-foreground">Avaliação de Redação</p>
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

export default QuestionarioRedacao;
