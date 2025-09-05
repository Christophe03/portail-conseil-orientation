import type { Metadata } from 'next';
import { Inter, Poppins } from 'next/font/google';
import '@/styles/globals.css';
import { ThemeProvider } from '@/components/providers/ThemeProvider';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Analytics } from '@/components/analytics/Analytics';
import { CookieBanner } from '@/components/ui/CookieBanner';
import { CookiePreferences } from '@/components/ui/CookiePreferences';
import { StructuredData } from '@/components/seo/StructuredData';
import { PerformanceOptimizer, CriticalResourcePreloader, CoreWebVitalsOptimizer } from '@/components/seo/PerformanceOptimizer';
import { PerformanceMonitor, ImagePerformanceMonitor, PerformanceMetricsDisplay } from '@/components/seo/PerformanceMonitor';

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
    default: 'Conseil d\'Orientation Mali - IA pour Orientation Scolaire & Bourses d\'Études',
    template: '%s | Conseil d\'Orientation Mali'
  },
  description: 'Application mobile d\'orientation scolaire au Mali avec IA avancée. Découvrez 1000+ bourses d\'études, conseils personnalisés et accompagnement pour votre réussite académique en Afrique.',
  keywords: [
    'orientation scolaire Mali', 'conseil orientation Afrique', 'bourses études Mali', 
    'IA orientation scolaire', 'application mobile éducation', 'orientation universitaire Mali',
    'bourses internationales', 'conseil carrière étudiant', 'orientation professionnelle Mali',
    'études supérieures Mali', 'bourses bourse Mali', 'orientation scolaire gratuite',
    'conseil orientation IA', 'application éducation Mali', 'orientation scolaire personnalisée'
  ],
  authors: [{ name: 'Conseil d\'Orientation Mali Team' }],
  creator: 'Conseil d\'Orientation Mali',
  publisher: 'Conseil d\'Orientation Mali',
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
    title: 'Conseil d\'Orientation Mali - IA pour Orientation Scolaire & Bourses d\'Études',
    description: 'Application mobile d\'orientation scolaire au Mali avec IA avancée. Découvrez 1000+ bourses d\'études, conseils personnalisés et accompagnement pour votre réussite académique en Afrique.',
    siteName: 'Conseil d\'Orientation Mali',
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
    title: 'Conseil d\'Orientation Mali - IA pour Orientation Scolaire & Bourses d\'Études',
    description: 'Application mobile d\'orientation scolaire au Mali avec IA avancée. Découvrez 1000+ bourses d\'études, conseils personnalisés et accompagnement pour votre réussite académique en Afrique.',
    images: ['/app_icon.png'],
    creator: '@conseilorient',
    site: '@conseilorient',
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
        
        {/* SEO Meta Tags */}
        <meta name="geo.region" content="ML" />
        <meta name="geo.placename" content="Mali" />
        <meta name="geo.position" content="17.570692;-3.996166" />
        <meta name="ICBM" content="17.570692, -3.996166" />
        <meta name="language" content="fr" />
        <meta name="revisit-after" content="7 days" />
        <meta name="rating" content="general" />
        <meta name="distribution" content="global" />
        <meta name="target" content="all" />
        <meta name="HandheldFriendly" content="True" />
        <meta name="MobileOptimized" content="320" />
        
        {/* Structured Data */}
        <StructuredData type="organization" />
        <StructuredData type="website" />
        <StructuredData type="mobileApplication" />
        
        {/* Performance Optimizations */}
        <CriticalResourcePreloader />
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
          <PerformanceOptimizer />
          <CoreWebVitalsOptimizer />
          <PerformanceMonitor />
          <ImagePerformanceMonitor />
          <PerformanceMetricsDisplay />
        </ThemeProvider>
      </body>
    </html>
  );
}
