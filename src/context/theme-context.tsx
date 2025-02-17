'use client';

import type { ThemeContextType } from '@/types/Other';
import { createContext } from 'react';

export const ThemeContext = createContext<ThemeContextType | undefined>(undefined);
