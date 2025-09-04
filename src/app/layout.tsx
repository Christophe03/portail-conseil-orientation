import type { Metadata } from 'next';
import { Inter, Poppins } from 'next/font/google';
import '@/styles/globals.css';
import { ThemeProvider } from '@/components/providers/ThemeProvider';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Analytics } from '@/components/analytics/Analytics';
import { CookieBanner } from '@/components/ui/CookieBanner';
import { CookiePreferences } from '@/components/ui/CookiePreferences';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  variable: '--font-poppins',
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: 'Conseil d\'Orientation - Votre Compagnon pour un Avenir Brillant',
    template: '%s | Conseil d\'Orientation'
  },
  description: 'Application mobile révolutionnaire de conseil d\'orientation scolaire et professionnelle. Intelligence artificielle, bourses d\'études et ressources éducatives au service de votre réussite.',
  keywords: ['orientation scolaire', 'conseil orientation', 'bourses études', 'IA orientation', 'application mobile', 'éducation', 'carrière'],
  authors: [{ name: 'Conseil d\'Orientation Team' }],
  creator: 'Conseil d\'Orientation',
  publisher: 'Conseil d\'Orientation',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'fr_FR',
    url: '/',
    title: 'Conseil d\'Orientation - Votre Compagnon pour un Avenir Brillant',
    description: 'Application mobile révolutionnaire de conseil d\'orientation scolaire et professionnelle.',
    siteName: 'Conseil d\'Orientation',
    images: [
      {
        url: '/app_icon.png',
        width: 512,
        height: 512,
        alt: 'Conseil d\'Orientation App Icon',
      },
      {
        url: '/logo_full.png',
        width: 1200,
        height: 630,
        alt: 'Conseil d\'Orientation Logo',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Conseil d\'Orientation - Votre Compagnon pour un Avenir Brillant',
    description: 'Application mobile révolutionnaire de conseil d\'orientation scolaire et professionnelle.',
    images: ['/app_icon.png'],
    creator: '@conseilorient',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/app_icon.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: [
      { url: '/app_icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
  manifest: '/site.webmanifest',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="theme-color" content="#0ea5e9" />
        <meta name="msapplication-TileColor" content="#0ea5e9" />
        <meta name="msapplication-config" content="/browserconfig.xml" />
      </head>
      <body className={`${inter.variable} ${poppins.variable} font-sans antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="flex min-h-screen flex-col">
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
          <Analytics />
          <CookieBanner />
          <CookiePreferences />
        </ThemeProvider>
      </body>
    </html>
  );
}
