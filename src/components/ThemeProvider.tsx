'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type Theme = 'light' | 'dark' | 'system';
type ThemeColors = {
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  card: string;
  text: string;
  border: string;
};

interface ThemeContextType {
  theme: Theme;
  isDark: boolean;
  setTheme: (theme: Theme) => void;
  colors: ThemeColors;
}

const defaultColors = {
  light: {
    primary: 'from-blue-500 to-purple-600',
    secondary: 'bg-blue-500',
    accent: 'bg-purple-500',
    background: 'bg-gray-100',
    card: 'bg-white',
    text: 'text-gray-800',
    border: 'border-gray-200',
  },
  dark: {
    primary: 'from-blue-600 to-purple-700',
    secondary: 'bg-blue-600',
    accent: 'bg-purple-700',
    background: 'bg-gray-900',
    card: 'bg-gray-800',
    text: 'text-white',
    border: 'border-gray-700',
  },
};

const ThemeContext = createContext<ThemeContextType>({
  theme: 'system',
  isDark: false,
  setTheme: () => null,
  colors: defaultColors.light,
});

export const useTheme = () => useContext(ThemeContext);

interface ThemeProviderProps {
  children: ReactNode;
}

export default function ThemeProvider({ children }: ThemeProviderProps) {
  const [theme, setThemeState] = useState<Theme>('system');
  const [isDark, setIsDark] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  // Inicializar o tema
  useEffect(() => {
    setIsMounted(true);
    
    const savedTheme = localStorage.getItem('theme') as Theme;
    if (savedTheme && ['light', 'dark', 'system'].includes(savedTheme)) {
      setThemeState(savedTheme);
    }

    // Inicializar o modo escuro baseado na preferência do sistema
    if (savedTheme === 'system' || !savedTheme) {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setIsDark(prefersDark);
    } else {
      setIsDark(savedTheme === 'dark');
    }
  }, []);

  // Monitorar mudanças no tema do sistema
  useEffect(() => {
    if (!isMounted) return;
    
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    const handleChange = (e: MediaQueryListEvent) => {
      if (theme === 'system') {
        setIsDark(e.matches);
      }
    };
    
    mediaQuery.addEventListener('change', handleChange);
    
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [isMounted, theme]);

  // Atualizar o tema
  useEffect(() => {
    if (!isMounted) return;
    
    localStorage.setItem('theme', theme);
    
    if (theme === 'dark' || (theme === 'system' && isDark)) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme, isDark, isMounted]);

  // Definir o tema
  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
    
    if (newTheme === 'system') {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setIsDark(prefersDark);
    } else {
      setIsDark(newTheme === 'dark');
    }
  };

  const colors = isDark ? defaultColors.dark : defaultColors.light;

  return (
    <ThemeContext.Provider value={{ theme, isDark, setTheme, colors }}>
      <div className={`${isDark ? 'dark' : ''}`}>
        {children}
      </div>
    </ThemeContext.Provider>
  );
} 