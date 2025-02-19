import withBundleAnalyzer from '@next/bundle-analyzer';
import { withSentryConfig } from '@sentry/nextjs';
import './src/libs/Env';

const bundleAnalyzer = withBundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
});

/** @type {import('next').NextConfig} */
const nextConfig: import('next').NextConfig = {
  eslint: {
    dirs: ['.'],
  },
  poweredByHeader: false,
  reactStrictMode: true,
  serverExternalPackages: ['@electric-sql/pglite'],
  output: 'export', // Добавлено для статического экспорта
  images: {
    unoptimized: true, // Отключение оптимизации изображений для статического экспорта
  },
  basePath: process.env.NODE_ENV === 'production' ? '/pbs' : '', // Замените 'your-repo-name' на имя вашего репозитория
};

const sentryWebpackPluginOptions = {
  org: 'your-sentry-org', // Замените на вашу организацию в Sentry
  project: 'your-sentry-project', // Замените на ваш проект в Sentry
  authToken: process.env.SENTRY_AUTH_TOKEN, // Токен аутентификации Sentry
  silent: true, // Подавление логов во время загрузки sourcemap
};

export default withSentryConfig(withSentryConfig(bundleAnalyzer(nextConfig), sentryWebpackPluginOptions), {
// For all available options, see:
// https://github.com/getsentry/sentry-webpack-plugin#options

  org: 'personal-projects-llc',
  project: 'javascript-nextjs',

  // Only print logs for uploading source maps in CI
  silent: !process.env.CI,

  // For all available options, see:
  // https://docs.sentry.io/platforms/javascript/guides/nextjs/manual-setup/

  // Upload a larger set of source maps for prettier stack traces (increases build time)
  widenClientFileUpload: true,

  // Automatically annotate React components to show their full name in breadcrumbs and session replay
  reactComponentAnnotation: {
    enabled: true,
  },

  // Uncomment to route browser requests to Sentry through a Next.js rewrite to circumvent ad-blockers.
  // This can increase your server load as well as your hosting bill.
  // Note: Check that the configured route will not match with your Next.js middleware, otherwise reporting of client-
  // side errors will fail.
  // tunnelRoute: "/monitoring",

  // Hides source maps from generated client bundles
  // hideSourceMaps: true,

  // Automatically tree-shake Sentry logger statements to reduce bundle size
  disableLogger: true,

  // Enables automatic instrumentation of Vercel Cron Monitors. (Does not yet work with App Router route handlers.)
  // See the following for more information:
  // https://docs.sentry.io/product/crons/
  // https://vercel.com/docs/cron-jobs
  automaticVercelMonitors: true,
});
