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

const QuestionarioIngles = () => {
  const navigate = useNavigate();
  const {toast} = useToast();

  const questions: Question[] = [
  // Topic 1: Grammar (Verb Tenses, Modals, Conditionals, Passive Voice)
  {
    id: 1,
    question: "Choose the correct sentence in Simple Past:",
    options: ["They go to the park yesterday.", "She didn't ate dinner last night.", "He studied for the test last week.", "We are watching a movie now."],
    correctAnswer: 2,
  },
  {
    id: 2,
    question: "Complete the sentence with the correct Future Simple form: 'I think she ______ happy with the results.'",
    options: ["is", "will be", "is going to be", "was"],
    correctAnswer: 1,
  },
  {
    id: 3,
    question: "Which modal verb expresses possibility or permission?",
    options: ["Must", "Should", "May", "Will"],
    correctAnswer: 2,
  },
  {
    id: 4,
    question: "Complete the sentence with the correct conditional form: 'If I had studied harder, I ______ the exam.'",
    options: ["would pass", "will pass", "would have passed", "pass"],
    correctAnswer: 2,
  },
  {
    id: 5,
    question: "Identify the sentence in Passive Voice:",
    options: ["The student wrote the essay.", "The essay was written by the student.", "The student is writing the essay.", "The student will write the essay."],
    correctAnswer: 1,
  },
  {
    id: 6,
    question: "Choose the correct sentence in Present Perfect Continuous:",
    options: ["She has lived here for ten years.", "They have been studying all day.", "He is working right now.", "We studied for hours."],
    correctAnswer: 1,
  },
  {
    id: 7,
    question: "The sentence 'The car was repaired yesterday.' implies that:",
    options: ["The car repaired itself.", "Someone repaired the car.", "The car is repairing now.", "The car will be repaired soon."],
    correctAnswer: 1,
  },
  {
    id: 8,
    question: "Which modal verb indicates strong obligation or necessity?",
    options: ["Can", "Might", "Must", "Could"],
    correctAnswer: 2,
  },
  {
    id: 9,
    question: "Complete the sentence: 'If it ______ tomorrow, we will stay home.'",
    options: ["rained", "rains", "will rain", "had rained"],
    correctAnswer: 1,
  },
  {
    id: 10,
    question: "Which relative pronoun should be used to refer to people?",
    options: ["Which", "Whose", "Where", "Who"],
    correctAnswer: 3,
  },
  {
    id: 11,
    question: "Choose the sentence that correctly uses the Present Continuous tense:",
    options: ["They play soccer every Sunday.", "She is reading a book at the moment.", "We watched a movie last night.", "He will visit his grandmother tomorrow."],
    correctAnswer: 1,
  },
  {
    id: 12,
    question: "The sentence 'The new bridge is being built.' is in the:",
    options: ["Present Simple Passive.", "Present Continuous Passive.", "Past Simple Passive.", "Future Simple Passive."],
    correctAnswer: 1,
  },

  // Topic 2: Vocabulary & Idioms
  {
    id: 13,
    question: "Choose the synonym for 'ancient'.",
    options: ["Modern", "New", "Old", "Recent"],
    correctAnswer: 2,
  },
  {
    id: 14,
    question: "Which of the following is a 'false friend' (falso cognato) for a Portuguese speaker?",
    options: ["Student (estudante)", "Library (biblioteca)", "Pretend (fingir)", "Music (música)"],
    correctAnswer: 2,
  },
  {
    id: 15,
    question: "What does the phrasal verb 'look up' mean in the sentence: 'I need to look up this word in the dictionary.'?",
    options: ["To search for information.", "To raise one's eyes.", "To admire someone.", "To visit someone."],
    correctAnswer: 0,
  },
  {
    id: 16,
    question: "Choose the antonym for 'optimistic'.",
    options: ["Hopeful", "Positive", "Pessimistic", "Cheerful"],
    correctAnswer: 2,
  },
  {
    id: 17,
    question: "What is the meaning of 'eventually' in English?",
    options: ["Finalmente, por fim.", "Eventualmente, ocasionalmente.", "Imediatamente.", "Raramente."],
    correctAnswer: 0,
  },
  {
    id: 18,
    question: "The idiom 'to break a leg' means:",
    options: ["To actually break a leg.", "To wish someone good luck.", "To fall down.", "To give up."],
    correctAnswer: 1,
  },
  {
    id: 19,
    question: "Which word is a synonym for 'happy'?",
    options: ["Sad", "Joyful", "Angry", "Tired"],
    correctAnswer: 1,
  },
  {
    id: 20,
    question: "What does the phrasal verb 'give up' mean?",
    options: ["To surrender or quit.", "To offer something.", "To start something new.", "To receive something."],
    correctAnswer: 0,
  },
  {
    id: 21,
    question: "Choose the antonym for 'expensive'.",
    options: ["Cheap", "Costly", "Valuable", "Luxurious"],
    correctAnswer: 0,
  },
  {
    id: 22,
    question: "What does the idiom 'hit the books' mean?",
    options: ["To literally hit books.", "To go to bed.", "To study hard.", "To go shopping."],
    correctAnswer: 2,
  },
  {
    id: 23,
    question: "Which is the correct 'false friend' for 'costume' (fantasia) in Portuguese?",
    options: ["Costume (hábito)", "Custom (costume, hábito)", "Customary (habitual)", "Customs (alfândega)"],
    correctAnswer: 1,
  },
  {
    id: 24,
    question: "What does the phrasal verb 'turn down' mean in the sentence: 'She turned down the job offer.'?",
    options: ["To accept an offer.", "To refuse an offer.", "To increase the volume.", "To decrease the volume."],
    correctAnswer: 1,
  },

  // Topic 3: Reading Comprehension & Text Types
  {
    id: 25,
    question: "Read the following sentence: 'Despite the heavy rain, the outdoor concert was a huge success.' What can be inferred from this sentence?",
    options: ["The concert was canceled due to the rain.", "The rain helped make the concert a success.", "The concert was indoors, not outdoors.", "The success of the concert was surprising given the weather conditions."],
    correctAnswer: 3,
  },
  {
    id: 26,
    question: "In a news article, what is the 'headline' primarily used for?",
    options: ["To provide a detailed summary of the entire article.", "To attract the reader's attention and briefly state the main topic.", "To list all the sources used in the article.", "To present the author's opinion on the topic."],
    correctAnswer: 1,
  },
  {
    id: 27,
    question: "What is the purpose of 'skimming' a text?",
    options: ["To read every word carefully for full comprehension.", "To get a general idea of the main topic and overall structure of the text.", "To locate specific pieces of information quickly.", "To memorize the entire content of the text."],
    correctAnswer: 1,
  },
  {
    id: 28,
    question: "Read the following excerpt: 'The new policy aims to reduce carbon emissions by 20% within five years. However, critics argue that the proposed measures are insufficient.' What is the main idea of this excerpt?",
    options: ["The new policy is guaranteed to reduce carbon emissions significantly.", "There is a debate about the effectiveness of the new policy to reduce carbon emissions.", "Critics fully support the new policy's goals.", "The policy has already achieved its carbon emission reduction goals."],
    correctAnswer: 1,
  },
  {
    id: 29,
    question: "What is the primary purpose of 'cohesion' in a written text?",
    options: ["To make the text visually appealing with good formatting.", "To ensure the logical flow of ideas and connections between sentences and paragraphs.", "To express the author's personal feelings and emotions.", "To provide a detailed bibliography of sources."],
    correctAnswer: 1,
  },
  {
    id: 30,
    question: "What is a 'biography'?",
    options: ["A fictional story about a famous person.", "A detailed account of a person's life written by someone else.", "A personal diary or journal.", "A scientific report on human life."],
    correctAnswer: 1,
  },
  {
    id: 31,
    question: "What does 'inference' mean when you read a text?",
    options: ["Stating something directly from the text.", "Drawing a conclusion based on evidence and reasoning, even if not explicitly stated.", "Copying parts of the text word-for-word.", "Only understanding the literal meaning."],
    correctAnswer: 1,
  },
  {
    id: 32,
    question: "A 'persuasive text' aims to:",
    options: ["Inform the reader about a topic.", "Describe a person or place.", "Convince the reader to adopt a certain viewpoint or take action.", "Narrate a story."],
    correctAnswer: 2,
  },
  {
    id: 33,
    question: "What is the typical structure of a formal email?",
    options: ["Greeting, informal chat, main message, casual closing.", "Greeting, introduction, body paragraphs, conclusion, formal closing.", "Only emojis and abbreviations.", "A long, rambling text without clear paragraphs."],
    correctAnswer: 1,
  },
  {
    id: 34,
    question: "When 'scanning' a text, your main goal is to:",
    options: ["Read every word slowly and carefully.", "Understand the overall meaning of the text.", "Find specific information quickly.", "Analyze the author's writing style."],
    correctAnswer: 2,
  },
  {
    id: 35,
    question: "What does 'chronological order' mean in a narrative text?",
    options: ["Events are presented randomly.", "Events are presented in the order they happened in time.", "Events are presented from least to most important.", "Events are presented based on the characters' emotions."],
    correctAnswer: 1,
  },
  {
    id: 36,
    question: "Which of the following is typically found in a formal report?",
    options: ["Personal opinions and slang.", "Subjective language and emotional appeals.", "Objective language, facts, and data.", "Fictional characters and plot twists."],
    correctAnswer: 2,
  },

  // Topic 4: Connectors & Discourse Markers
  {
    id: 37,
    question: "Complete the sentence: 'She worked hard, ______ she passed the exam.'",
    options: ["although", "however", "therefore", "unless"],
    correctAnswer: 2,
  },
  {
    id: 38,
    question: "Which connector shows contrast or opposition?",
    options: ["In addition", "Furthermore", "Nevertheless", "As a result"],
    correctAnswer: 2,
  },
  {
    id: 39,
    question: "Choose the correct connector for cause: 'He was late ______ the traffic.'",
    options: ["due to", "in spite of", "whereas", "consequently"],
    correctAnswer: 0,
  },
  {
    id: 40,
    question: "Complete the sentence: '______ it was cold, we went for a walk.'",
    options: ["Despite", "Because", "Although", "Therefore"],
    correctAnswer: 2,
  },
  {
    id: 41,
    question: "Which connector indicates a consequence or result?",
    options: ["However", "Moreover", "Consequently", "In contrast"],
    correctAnswer: 2,
  },
  {
    id: 42,
    question: "In the sentence 'First, gather the ingredients. Second, mix them.', 'First' and 'Second' are examples of:",
    options: ["Contrast connectors.", "Time connectors.", "Listing/Sequencing connectors.", "Cause and effect connectors."],
    correctAnswer: 2,
  },
  {
    id: 43,
    question: "Choose the connector that adds extra information:",
    options: ["Therefore", "However", "In addition", "Unless"],
    correctAnswer: 2,
  },
  {
    id: 44,
    question: "Complete the sentence: 'He is good at math; ______, he struggles with English.'",
    options: ["similarly", "therefore", "however", "consequently"],
    correctAnswer: 2,
  },
  {
    id: 45,
    question: "Which connector means 'because of' or 'as a result of'?",
    options: ["In spite of", "Due to", "Although", "Unless"],
    correctAnswer: 1,
  },
  {
    id: 46,
    question: "The phrase 'For example' is used to introduce:",
    options: ["A conclusion.", "A contrasting idea.", "An illustration or specific case.", "A summary."],
    correctAnswer: 2,
  },
  {
    id: 47,
    question: "Complete the sentence: 'You won't get good grades ______ you study harder.'",
    options: ["if", "unless", "although", "because"],
    correctAnswer: 1,
  },
  {
    id: 48,
    question: "Which connector is used to summarize or conclude?",
    options: ["Furthermore", "In conclusion", "Likewise", "On the other hand"],
    correctAnswer: 1,
  },

  // Topic 5: Listening & Speaking Strategies (General Knowledge)
  {
    id: 49,
    question: "When listening, what does 'active listening' primarily involve?",
    options: ["Only hearing the words spoken.", "Interrupting to share your own thoughts.", "Paying full attention, understanding, responding, and remembering what is said.", "Distracting yourself with other tasks."],
    correctAnswer: 2,
  },
  {
    id: 50,
    question: "To improve speaking fluency, it is important to:",
    options: ["Only memorize grammar rules.", "Avoid speaking unless you are perfect.", "Practice speaking regularly, even if you make mistakes.", "Only read books in English."],
    correctAnswer: 2,
  },
  {
    id: 51,
    question: "What is a 'register' in speaking?",
    options: ["The speed at which you speak.", "The volume of your voice.", "The level of formality in your language, adapted to the situation.", "Your accent."],
    correctAnswer: 2,
  },
  {
    id: 52,
    question: "When giving a presentation, maintaining eye contact with your audience helps to:",
    options: ["Make them uncomfortable.", "Show confidence and engage your listeners.", "Distract them from your message.", "Make you seem nervous."],
    correctAnswer: 1,
  },
  {
    id: 53,
    question: "Which strategy is useful for understanding unknown words while listening?",
    options: ["Stopping the speaker immediately.", "Ignoring the word completely.", "Guessing its meaning from the context.", "Only using a dictionary after the conversation."],
    correctAnswer: 2,
  },
  {
    id: 54,
    question: "What is 'intonation' in speaking?",
    options: ["The speed of your speech.", "The rhythm and melody of your voice (rise and fall in pitch).", "The choice of vocabulary.", "The volume of your voice."],
    correctAnswer: 1,
  },
  {
    id: 55,
    question: "To ask for clarification politely, you might say:",
    options: ["'Speak up!'", "'I don't understand.'", "'Could you please explain that again?'", "'You're wrong.'"],
    correctAnswer: 2,
  },
  {
    id: 56,
    question: "When preparing for a speaking test, it is helpful to:",
    options: ["Memorize long scripts word-for-word.", "Think about common topics and practice expressing your ideas clearly.", "Only study grammar books.", "Avoid practicing with others."],
    correctAnswer: 1,
  },
  {
    id: 57,
    question: "What is 'paraphrasing' in speaking?",
    options: ["Repeating exactly what someone said.", "Summarizing someone's ideas in your own words.", "Interrupting someone to correct them.", "Asking a rhetorical question."],
    correctAnswer: 1,
  },
  {
    id: 58,
    question: "Which of these is a good strategy for improving your listening skills?",
    options: ["Only listening to native speakers at full speed.", "Watching movies or TV shows with subtitles in English, then without.", "Avoiding difficult audio materials.", "Only listening to music."],
    correctAnswer: 1,
  },
  {
    id: 59,
    question: "What does 'body language' refer to in communication?",
    options: ["Only the words you use.", "The way you move your body, gestures, facial expressions, and posture.", "The tone of your voice.", "The language you learn in school."],
    correctAnswer: 1,
  },
  {
    id: 60,
    question: "When participating in a discussion, it is important to:",
    options: ["Dominate the conversation.", "Listen respectfully to others and contribute your ideas clearly.", "Only agree with everyone.", "Criticize every idea presented."],
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
   } = usePaginatedQuestionnaire(questions, 'ING');
 
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
English Quiz</h1>
           <p className="text-muted-foreground">English assessment</p>
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

export default QuestionarioIngles;