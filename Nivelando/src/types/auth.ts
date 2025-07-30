export interface User {
  id: string;
  name: string;
  email: string;
  role: 'student' | 'teacher';
  enrollment?: string;
  grade?: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
}