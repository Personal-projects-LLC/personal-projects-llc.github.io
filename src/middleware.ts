import type { NextFetchEvent, NextRequest } from 'next/server';
import { clerkMiddleware } from '@clerk/nextjs/server';
import createMiddleware from 'next-intl/middleware';
import { routing } from './libs/i18nNavigation';

const intlMiddleware = createMiddleware(routing);

// Защищенные маршруты без учета локали
const protectedPaths = ['/dashboard', '/projects'];

const isProtectedRoute = (path: string) => {
  // Проверяем как с локалью, так и без
  return protectedPaths.some(prefix =>
    path.startsWith(prefix) // /projects
    || /^\/[^/]+\/(?:dashboard|projects)/.test(path), // /en/projects или /fr/projects
  );
};

export default function middleware(request: NextRequest, event: NextFetchEvent) {
  // Применяем intl middleware для всех запросов
  const response = intlMiddleware(request);

  // Если это защищенный маршрут, применяем Clerk
  if (isProtectedRoute(request.nextUrl.pathname)) {
    return clerkMiddleware((_req) => {
      return response;
    })(request, event);
  }

  return response;
}

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};
