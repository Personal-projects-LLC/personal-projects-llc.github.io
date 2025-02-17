import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import Layout from '@/components/layout';
import { ThemeProvider } from '@/context/theme-provider';
import { ClerkProvider } from '@clerk/nextjs';
import '@/styles/global.css';

export const metadata: Metadata = {
  icons: [
    {
      rel: 'apple-touch-icon',
      url: '/apple-touch-icon.png',
    },
    {
      rel: 'icon',
      type: 'image/png',
      sizes: '32x32',
      url: '/favicon-32x32.png',
    },
    {
      rel: 'icon',
      type: 'image/png',
      sizes: '16x16',
      url: '/favicon-16x16.png',
    },
    {
      rel: 'icon',
      url: '/favicon.ico',
    },
  ],
};

const RootLayout = ({ children }: { children: ReactNode }) => {
  return (
    <html lang="en">
      <body suppressHydrationWarning>
        <ThemeProvider>
          <ClerkProvider>
            <Layout>
              {children}
            </Layout>
          </ClerkProvider>
        </ThemeProvider>
      </body>
    </html>
  );
};

export default RootLayout;
