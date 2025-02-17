'use client';

import Button from '@/components/button';
import { MoonIcon, SunIcon } from '@/components/Icons';
import { useTheme } from './useTheme';

type ThemeToggleProps = Readonly<{
  className?: string;
}>;

const ThemeToggle = ({ className }: ThemeToggleProps) => {
  const { isDark, toggleTheme } = useTheme();

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      className={`${className} cursor-pointer`}
      aria-label={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
    >
      {isDark ? <SunIcon /> : <MoonIcon />}
    </Button>
  );
};

export default ThemeToggle;
