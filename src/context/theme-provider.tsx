'use client';

import type { ReactNode } from 'react';
import {
  useEffect,
  useState,
} from 'react';
import { ThemeContext } from './theme-context';

export function ThemeProvider({ children }: { readonly children: ReactNode }) {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    // Проверяем сохраненную тему или системные настройки
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia(
      '(prefers-color-scheme: dark)',
    ).matches;

    const shouldBeDark = savedTheme === 'dark' || (!savedTheme && prefersDark);
    setIsDark(shouldBeDark);
    document.documentElement.setAttribute(
      'data-theme',
      shouldBeDark ? 'dark' : 'light',
    );
  }, []);

  const toggleTheme = () => {
    setIsDark((prev) => {
      const newValue = !prev;
      const theme = newValue ? 'dark' : 'light';
      localStorage.setItem('theme', theme);
      document.documentElement.setAttribute('data-theme', theme);
      return newValue;
    });
  };

  const value = {
    isDark,
    toggleTheme,
  };

  return (
    <ThemeContext value={value}>{children}</ThemeContext>
  );
}
