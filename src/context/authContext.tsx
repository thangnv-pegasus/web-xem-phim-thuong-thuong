'use client';
import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { logoutService } from '../services/auth';
import { toast } from 'sonner';

interface User {
  id: number;
  name: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  // Lấy user từ localStorage khi load app
  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) setUser(JSON.parse(savedUser));
  }, []);

  const logout = async () => {
    localStorage.removeItem('user');
    localStorage.removeItem('access_token');
    await logoutService()
    setUser(null);
    window.location.reload
    toast.success('Đăng xuất tài khoản thành công!')
  };

  return (
    <AuthContext.Provider value={{ user, setUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
