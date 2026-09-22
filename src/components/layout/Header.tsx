'use client';

import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { useTheme } from '@/components/providers/ThemeProvider';
import { ThemeToggle } from '@/components/ui/ThemeToggle';
import { Button } from '@/components/ui/Button';
import { APP_DOWNLOAD_URL } from '@/lib/app-links';

const navigation = [
  { name: 'Accueil', href: '/' },
  { name: 'Télécharger', href: '/download' },
  { name: 'Universités', href: '/universites' },
  { name: 'Documentation', href: '/docs' },
  { name: 'À propos', href: '/about' },
];

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();
  const { theme } = useTheme();

  useEffect(() => {
    setMounted(true);

    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!mobileMenuOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [mobileMenuOpen]);

  const isHome = pathname === '/';
  const solidHeader = scrolled || !isHome;

  const mobileMenu = (
    <AnimatePresence>
      {mobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] md:hidden"
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm dark:bg-black/80"
            onClick={() => setMobileMenuOpen(false)}
          />

          <motion.div
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-labelledby="mobile-menu-title"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 26, stiffness: 220 }}
            className="fixed inset-y-0 right-0 h-screen w-full max-w-xs overflow-y-auto bg-white/95 shadow-2xl backdrop-blur-lg dark:bg-[#0a192f]/95 border-l border-slate-200/80 dark:border-slate-800/80 p-6 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between border-b border-slate-200/70 pb-4 dark:border-slate-800/70">
                <div className="flex items-center space-x-2.5">
                  <div className="relative h-10 w-10">
                    <Image
                      src={theme === 'dark' ? '/app_icon_blanc.png' : '/app_icon.png'}
                      alt="Conseil d'Orientation"
                      fill
                      className="object-contain"
                    />
                  </div>
                  <div>
                    <span id="mobile-menu-title" className="block text-base font-bold text-[#13508f] dark:text-white">
                      Conseil d'Orientation
                    </span>
                    <span className="block text-xs font-semibold text-[#3b9df8]">
                      Portail Officiel • Mali
                    </span>
                  </div>
                </div>
                <button
                  type="button"
                  className="rounded-xl p-2.5 text-slate-500 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-white transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <span className="sr-only">Fermer le menu</span>
                  <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                </button>
              </div>

              <div className="mt-6 space-y-1.5">
                {navigation.map((item) => {
                  const isActive = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href));
                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      className={`flex min-h-[48px] items-center rounded-xl px-4 text-base font-medium transition-all ${
                        isActive
                          ? 'bg-[#13508f]/10 text-[#13508f] font-bold dark:bg-[#112240] dark:text-[#3b9df8]'
                          : 'text-slate-700 hover:bg-slate-50 hover:text-[#13508f] dark:text-slate-300 dark:hover:bg-slate-800/50 dark:hover:text-white'
                      }`}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {item.name}
                    </Link>
                  );
                })}
              </div>
            </div>

            <div className="border-t border-slate-200/70 pt-6 dark:border-slate-800/70 space-y-3">
              <div className="flex items-center justify-between px-2">
                <span className="text-sm font-medium text-slate-600 dark:text-slate-400">Thème d'affichage</span>
                <ThemeToggle />
              </div>
              <Button
                asChild
                className="w-full min-h-[48px] rounded-xl bg-[#13508f] text-white font-semibold hover:bg-[#0e4379] shadow-md dark:bg-[#3b9df8] dark:text-white dark:hover:bg-[#2589ec] transition-all text-center flex items-center justify-center"
              >
                <a
                  href={APP_DOWNLOAD_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Télécharger l'Application
                </a>
              </Button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  return (
    <>
      <header
        className={`fixed left-0 right-0 top-0 z-50 transition-all duration-300 ${
          solidHeader
            ? 'glass-panel shadow-sm'
            : 'bg-transparent'
        }`}
      >
        <nav className="container-custom">
          <div className="flex h-16 items-center justify-between md:h-20">
            <Link href="/" className="flex min-w-0 items-center space-x-3 group">
              <div className="relative h-11 w-11 md:h-12 md:w-12 transition-transform duration-200 group-hover:scale-105">
                <Image
                  src={theme === 'dark' ? '/app_icon_blanc.png' : '/app_icon.png'}
                  alt="Conseil d'Orientation"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
              <div className="min-w-0">
                <span className="block max-w-[170px] truncate text-base font-bold text-[#13508f] dark:text-white sm:max-w-none sm:text-lg md:text-xl tracking-tight">
                  Conseil d'Orientation
                </span>
                <span className="hidden sm:inline-block text-[11px] font-bold uppercase tracking-wider text-[#3b9df8]">
                  Mali • Portail & IA
                </span>
              </div>
            </Link>

            <div className="hidden items-center space-x-1 lg:space-x-2 md:flex bg-slate-100/70 dark:bg-slate-800/40 p-1.5 rounded-full border border-slate-200/50 dark:border-slate-700/50">
              {navigation.map((item) => {
                const isActive = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href));
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`px-3.5 py-1.5 text-sm rounded-full transition-all duration-200 font-medium ${
                      isActive
                        ? 'bg-white text-[#13508f] font-bold shadow-xs dark:bg-[#112240] dark:text-[#3b9df8] dark:shadow-none'
                        : 'text-slate-600 hover:text-[#13508f] dark:text-slate-300 dark:hover:text-white'
                    }`}
                  >
                    {item.name}
                  </Link>
                );
              })}
            </div>

            <div className="hidden items-center space-x-3 md:flex">
              <ThemeToggle />
              <Button
                asChild
                size="sm"
                className="rounded-xl bg-[#13508f] text-white font-semibold hover:bg-[#0e4379] dark:bg-[#3b9df8] dark:text-white dark:hover:bg-[#2589ec] shadow-sm transition-all px-4 py-2 hover:shadow-md"
              >
                <a href={APP_DOWNLOAD_URL} target="_blank" rel="noopener noreferrer">
                  Télécharger l'App
                </a>
              </Button>
            </div>

            <div className="flex items-center space-x-2 md:hidden">
              <ThemeToggle />
              <button
                type="button"
                className="p-2.5 rounded-xl text-slate-700 hover:bg-slate-100 hover:text-navy-900 dark:text-slate-300 dark:hover:bg-slate-800 transition-colors"
                onClick={() => setMobileMenuOpen(true)}
                aria-expanded={mobileMenuOpen}
                aria-controls="mobile-menu"
              >
                <span className="sr-only">Ouvrir le menu</span>
                <Bars3Icon className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>
          </div>
        </nav>
      </header>

      {mounted ? createPortal(mobileMenu, document.body) : null}
    </>
  );
}
