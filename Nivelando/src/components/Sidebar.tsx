import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { 
  Home, 
  GraduationCap, 
  BarChart3, 
  TrendingUp, 
  Stethoscope, 
  Lightbulb, 
  HelpCircle,
  FileText,
  Users,
  PieChart
} from 'lucide-react';

const Sidebar = () => {
  const { user, logout } = useAuth();
  
  const studentMenuItems = [
    { icon: Home, label: 'Dashboard', path: '/dashboard' },
    { icon: GraduationCap, label: 'Matrícula', path: '/matricula' },
    { icon: FileText, label: 'Relatórios', path: '/relatorios' },
    { icon: TrendingUp, label: 'Desempenho', path: '/desempenho' },
    { icon: Stethoscope, label: 'Diagnósticos', path: '/diagnosticos' },
    { icon: Lightbulb, label: 'Recomendações', path: '/recomendacoes' },
    { icon: HelpCircle, label: 'Questionário', path: '/questionario' },
  ];

  const teacherMenuItems = [
    { icon: Home, label: 'Dashboard', path: '/dashboard' },
    { icon: Users, label: 'Acompanhamento', path: '/acompanhamento' },
    { icon: PieChart, label: 'Desempenho Estudantil', path: '/desempenho-estudantil' },
    { icon: Lightbulb, label: 'Recomendações de Aprendizagem', path: '/recomendacoes-aprendizagem' },
  ];

  const menuItems = user?.role === 'student' ? studentMenuItems : teacherMenuItems;
  const sidebarBg = user?.role === 'student' ? 'bg-student-sidebar' : 'bg-teacher-sidebar';
  const sidebarText = user?.role === 'student' ? 'text-student-sidebar-foreground' : 'text-teacher-sidebar-foreground';

  return (
    <aside className={`w-64 min-h-screen ${sidebarBg} ${sidebarText}`}>
      <nav className="p-4">
        <ul className="space-y-2">
          {menuItems.map((item) => (
            <li key={item.path}>
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                    isActive
                      ? user?.role === 'student' 
                        ? 'bg-student-primary text-student-primary-foreground' 
                        : 'bg-teacher-primary text-teacher-primary-foreground'
                      : 'hover:bg-white/10'
                  }`
                }
              >
                <item.icon className="h-5 w-5" />
                <span className="font-medium">{item.label}</span>
              </NavLink>
            </li>
          ))}
        </ul>
        
        {/* User info and logout */}
        <div className="mt-8 p-4 border-t border-white/20">
          <div className="mb-3">
            <p className="font-semibold">{user?.name}</p>
            <p className="text-sm opacity-80">{user?.email}</p>
            {user?.role === 'student' && user?.grade && (
              <p className="text-xs opacity-70">{user.grade}</p>
            )}
          </div>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={logout}
            className="w-full bg-white/10 border-white/20 text-white hover:bg-white/20"
          >
            Sair
          </Button>
        </div>
      </nav>
    </aside>
  );
};

export default Sidebar;