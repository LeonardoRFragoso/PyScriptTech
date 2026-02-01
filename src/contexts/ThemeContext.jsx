import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext({});

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem('@pyscript:theme');
    return saved || 'dark';
  });

  useEffect(() => {
    localStorage.setItem('@pyscript:theme', theme);
    document.documentElement.setAttribute('data-theme', theme);
    
    if (theme === 'light') {
      document.documentElement.style.setProperty('--bg-primary', '#f5f5f5');
      document.documentElement.style.setProperty('--bg-secondary', '#ffffff');
      document.documentElement.style.setProperty('--text-primary', '#1a1a2e');
      document.documentElement.style.setProperty('--text-secondary', '#4a4a4a');
      document.documentElement.style.setProperty('--border-color', 'rgba(0, 0, 0, 0.1)');
    } else {
      document.documentElement.style.setProperty('--bg-primary', '#0a0a0a');
      document.documentElement.style.setProperty('--bg-secondary', '#1a1a2e');
      document.documentElement.style.setProperty('--text-primary', '#ffffff');
      document.documentElement.style.setProperty('--text-secondary', '#a0a0a0');
      document.documentElement.style.setProperty('--border-color', 'rgba(255, 255, 255, 0.1)');
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  const value = {
    theme,
    setTheme,
    toggleTheme,
    isDark: theme === 'dark',
    isLight: theme === 'light',
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
};

export default ThemeContext;
