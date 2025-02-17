import type { buttonVariants } from '@/components/button/buttonVariants';
import type { VariantProps } from 'class-variance-authority';
import type { ButtonHTMLAttributes, HTMLAttributes, ReactNode } from 'react';

export type ModalProps = {
  isOpen: boolean;
  onCloseAction: () => void;
  children: ReactNode;
  title: string;
};

export type ContainerProps = {
  as?: 'div' | 'section' | 'main';
} & HTMLAttributes<HTMLDivElement>;

export type LayoutProps = {
  readonly children: ReactNode;
};

export type ThemeContextType = {
  isDark: boolean;
  toggleTheme: () => void;
};

export type ButtonProps = {
  asChild?: boolean;
} & ButtonHTMLAttributes<HTMLButtonElement> & VariantProps<typeof buttonVariants>;
