import React, {createContext, useState, useEffect} from 'react';
import {storage} from '@/storage';

export const themeOptions = {
  dark: 'dark',
  light: 'light',
};
export type ThemeType = keyof typeof themeOptions;

type ThemeContextType = {
  toggleTheme: (theme: ThemeType) => void;
  theme: ThemeType;
};

export const ThemeContext = createContext({} as ThemeContextType);

const ThemeContextProvider = ({children}: {children: React.ReactNode}) => {
  const [theme, setTheme] = useState<ThemeType>('dark');

  useEffect(() => {
    getTheme();
  }, []);

  const toggleTheme = async (theme: ThemeType) => {
    if (theme == 'dark') {
      setTheme('dark');
      await storage.setKeyValueItem('theme', 'dark');
      return;
    }

    setTheme('light');
    await storage.setKeyValueItem('theme', 'light');
  };

  const getTheme = async () => {
    const asyncTheme = await storage.getKeyValueItem<ThemeType>('theme');

    if (!asyncTheme) {
      await storage.setKeyValueItem('theme', theme);
      return;
    }
    setTheme(asyncTheme as ThemeType);
  };

  return (
    <ThemeContext.Provider value={{theme, toggleTheme}}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeContextProvider;
