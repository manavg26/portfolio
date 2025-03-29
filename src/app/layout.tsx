import './globals.css';
// Remove Google Fonts import
// import { Inter } from 'next/font/google';
import localFont from 'next/font/local';
import { siteConfig } from '@/config/siteConfig';
import { cn } from '@/utils/cn';
import RootLayout from '@/components/layout/RootLayout';
import Script from 'next/script';

// Use local Inter font as primary font - more reliable than Google Fonts
const localInter = localFont({
  src: [
    {
      path: '../fonts/Inter-Regular.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../fonts/Inter-Medium.woff2',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../fonts/Inter-SemiBold.woff2',
      weight: '600',
      style: 'normal',
    },
    {
      path: '../fonts/Inter-Bold.woff2',
      weight: '700',
      style: 'normal',
    },
  ],
  display: 'swap',
  variable: '--font-inter',
});

// Use local fonts as fallbacks for Geist fonts
const geistSans = localFont({
  src: [
    {
      path: '../../public/fonts/geist-sans-regular.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../../public/fonts/geist-sans-medium.woff2',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../../public/fonts/geist-sans-bold.woff2',
      weight: '700',
      style: 'normal',
    },
  ],
  variable: '--font-geist-sans',
  display: 'swap',
});

const geistMono = localFont({
  src: [
    {
      path: '../../public/fonts/geist-mono-regular.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../../public/fonts/geist-mono-medium.woff2',
      weight: '500',
      style: 'normal',
    },
  ],
  variable: '--font-geist-mono',
  display: 'swap',
});

export const metadata = {
  title: {
    default: siteConfig.title,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [
    'Portfolio',
    'Next.js',
    'React',
    'TypeScript',
    'Tailwind CSS',
    'Developer',
    'Frontend Developer',
  ],
  authors: [
    {
      name: siteConfig.name,
    },
  ],
  creator: siteConfig.name,
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: '/',
    title: siteConfig.title,
    description: siteConfig.description,
    siteName: siteConfig.name,
  },
  twitter: {
    card: 'summary_large_image',
    title: siteConfig.title,
    description: siteConfig.description,
    creator: '@nextjs',
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
  },
};

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={cn('scroll-smooth', localInter.variable, geistSans.variable, geistMono.variable)}>
      <head>
        {/* Suppress hydration errors */}
        <Script id="suppress-hydration" strategy="beforeInteractive">
          {`window.__SUPPRESS_HYDRATION_WARNING = true;`}
        </Script>
      </head>
      <body className={cn('min-h-screen font-sans antialiased')} suppressHydrationWarning={true}>
        <RootLayout>{children}</RootLayout>
      </body>
    </html>
  );
}
