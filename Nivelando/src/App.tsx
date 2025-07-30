import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import Auth from "@/pages/Auth";
import Layout from "@/components/Layout";
import Sidebar from "@/components/Sidebar";
import Dashboard from "@/pages/Dashboard";
import Matricula from "@/pages/Matricula";
import Relatorios from "@/pages/Relatorios";
import Desempenho from "@/pages/Desempenho";
import Diagnosticos from "@/pages/Diagnosticos";
import Recomendacoes from "@/pages/Recomendacoes";
import Questionario from "@/pages/Questionario";
import QuestionarioMatematica from "@/pages/QuestionarioMatematica";
import Acompanhamento from "@/pages/Acompanhamento";
import DesempenhoEstudantil from "@/pages/DesempenhoEstudantil";
import RecomendacoesAprendizagem from "@/pages/RecomendacoesAprendizagem";
import NotFound from "./pages/NotFound";
import QuestionarioPortugues from "./pages/QuestionarioPortugues";
import QuestionarioHistoria from "./pages/QuestionarioHistoria";
import QuestionarioGeografia from "./pages/QuestionarioGeografia";
import QuestionarioBiologia from "./pages/QuestionarioBiologia";
import QuestionarioFisica from "./pages/QuestionarioFisica";
import QuestionarioQuimica from "./pages/QuestionarioQuimica";
import QuestionarioRedacao from "./pages/QuestionarioRedacao";
import QuestionarioIngles from "./pages/QuestionarioIngles";
import QuestionarioFilosofia from "./pages/QuestionarioFilosofia";
import QuestionarioSociologia from "./pages/QuestionarioSociologia";

const queryClient = new QueryClient();

const AppContent = () => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Auth />;
  }

  return (
    <Layout>
      <Sidebar />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/auth" element={<Auth />} />
        
        {/* Student Routes */}
        <Route path="/matricula" element={<Matricula />} />
        <Route path="/relatorios" element={<Relatorios />} />
        <Route path="/desempenho" element={<Desempenho />} />
        <Route path="/diagnosticos" element={<Diagnosticos />} />
        <Route path="/recomendacoes" element={<Recomendacoes />} />
        <Route path="/questionario" element={<Questionario />} />
        <Route path="/questionario/matematica" element={<QuestionarioMatematica />} />
        <Route path="/questionario/portugues" element={<QuestionarioPortugues />} />
        <Route path="/questionario/historia" element={<QuestionarioHistoria />} />
        <Route path="/questionario/geografia" element={<QuestionarioGeografia />} />
        <Route path="/questionario/biologia" element={<QuestionarioBiologia />} />
        <Route path="/questionario/fisica" element={<QuestionarioFisica />} />
        <Route path="/questionario/quimica" element={<QuestionarioQuimica/>} />
        <Route path="/questionario/redacao" element={<QuestionarioRedacao />} />
        <Route path="/questionario/ingles" element={<QuestionarioIngles />} />
        <Route path="/questionario/filosofia" element={<QuestionarioFilosofia/>} />
        <Route path="/questionario/sociologia" element={<QuestionarioSociologia/>} />
        
        {/* Teacher Routes */}
        <Route path="/acompanhamento" element={<Acompanhamento />} />
        <Route path="/desempenho-estudantil" element={<DesempenhoEstudantil />} />
        <Route path="/recomendacoes-aprendizagem" element={<RecomendacoesAprendizagem />} />
        
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Layout>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <AuthProvider>
        <BrowserRouter>
          <AppContent />
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
