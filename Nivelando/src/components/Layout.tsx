import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { LogOut, User } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const { user, logout } = useAuth();

  const themeClass = user?.role === 'student' ? 'student' : 'teacher';

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-white border-b border-border px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              <div className={`${user?.role === 'student' ? 'bg-student-primary' : 'bg-teacher-primary'} text-white p-2 rounded-lg mr-2`}>
                <span className="text-xl font-bold">N</span>
              </div>
              <h1 className="text-2xl font-bold">Nivelando</h1>
              <div className={`${user?.role === 'student' ? 'bg-student-primary' : 'bg-teacher-primary'} text-white p-2 rounded-lg ml-2`}>
                <span className="text-xl font-bold">A</span>
              </div>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <User className="h-5 w-5" />
              <span className="text-sm">
                Olá, {user?.name} - Bem-Vindo ao Nivelando
              </span>
              {user?.role === 'student' && user?.enrollment && (
                <span className="text-xs text-muted-foreground">
                  Matrícula: {user.enrollment}
                </span>
              )}
            </div>
            <Button variant="outline" size="sm" onClick={logout}>
              <LogOut className="h-4 w-4 mr-2" />
              Sair
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex">
        {children}
      </div>
    </div>
  );
};

export default Layout;