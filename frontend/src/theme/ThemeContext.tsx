import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { ThemeProvider as MuiThemeProvider, Theme } from '@mui/material/styles';
import { themes, ThemeName } from './themes';

interface ThemeContextType {
  themeName: ThemeName;
  theme: Theme;
  setTheme: (themeName: ThemeName) => void;
  availableThemes: ThemeName[];
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

interface ThemeProviderProps {
  children: ReactNode;
  defaultTheme?: ThemeName;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({
  children,
  defaultTheme = 'lightBlue'
}) => {
  const [themeName, setThemeNameState] = useState<ThemeName>(defaultTheme);

  // Load theme from localStorage on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem('selectedTheme') as ThemeName;
    if (savedTheme && themes[savedTheme]) {
      setThemeNameState(savedTheme);
    }
  }, []);

  const setTheme = (newTheme: ThemeName) => {
    setThemeNameState(newTheme);
    localStorage.setItem('selectedTheme', newTheme);
  };

  const theme = themes[themeName];
  const availableThemes = Object.keys(themes) as ThemeName[];

  const value: ThemeContextType = {
    themeName,
    theme,
    setTheme,
    availableThemes,
  };

  return (
    <ThemeContext.Provider value={value}>
      <MuiThemeProvider theme={theme}>
        {children}
      </MuiThemeProvider>
    </ThemeContext.Provider>
  );
};

export const useThemeContext = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useThemeContext must be used within a ThemeProvider');
  }
  return context;
};