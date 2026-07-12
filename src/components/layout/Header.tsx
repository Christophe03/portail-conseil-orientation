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
            className="fixed inset-0 bg-neutral-900/80 backdrop-blur-sm"
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
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-y-0 right-0 h-screen w-full max-w-sm overflow-y-auto bg-white shadow-large dark:bg-neutral-900"
          >
            <div className="flex items-center justify-between border-b border-neutral-200 p-6 dark:border-neutral-700">
              <span id="mobile-menu-title" className="text-lg font-semibold text-neutral-900 dark:text-white">
                Menu
              </span>
              <button
                type="button"
                className="p-2 text-neutral-700 hover:text-primary-600 dark:text-neutral-300 dark:hover:text-primary-400"
                onClick={() => setMobileMenuOpen(false)}
              >
                <span className="sr-only">Fermer le menu</span>
                <XMarkIcon className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>

            <div className="space-y-2 px-6 py-4">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="block rounded-lg px-2 py-2 text-lg text-neutral-700 transition-colors duration-200 hover:bg-neutral-50 hover:text-primary-600 dark:text-neutral-300 dark:hover:bg-neutral-800 dark:hover:text-primary-400"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}

              <div className="border-t border-neutral-200 pt-4 dark:border-neutral-700">
                <Button
                  asChild
                  className="w-full bg-gradient-to-r from-primary-600 to-secondary-600 text-white hover:from-primary-700 hover:to-secondary-700"
                >
                  <a
                    href={APP_DOWNLOAD_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Télécharger l'App
                  </a>
                </Button>
              </div>
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
            ? 'border-b border-neutral-200 bg-white/90 shadow-soft backdrop-blur-md dark:border-neutral-700 dark:bg-neutral-900/90'
            : 'bg-transparent'
        }`}
      >
        <nav className="container-custom">
          <div className="flex h-16 items-center justify-between md:h-20">
            <Link href="/" className="flex min-w-0 items-center space-x-3">
              <div className="relative h-12 w-12 md:h-14 md:w-14">
                <Image
                  src={theme === 'dark' ? '/app_icon_blanc.png' : '/app_icon.png'}
                  alt="Conseil d'Orientation"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
              <span className="max-w-[170px] truncate text-base font-bold text-neutral-900 dark:text-white sm:max-w-none sm:text-lg md:text-2xl">
                Conseil d'Orientation
              </span>
            </Link>

            <div className="hidden items-center space-x-8 md:flex">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="font-medium text-neutral-700 transition-colors duration-200 hover:text-primary-600 dark:text-neutral-300 dark:hover:text-primary-400"
                >
                  {item.name}
                </Link>
              ))}
            </div>

            <div className="hidden items-center space-x-4 md:flex">
              <ThemeToggle />
              <Button
                asChild
                size="sm"
                className="bg-gradient-to-r from-primary-600 to-secondary-600 text-white hover:from-primary-700 hover:to-secondary-700"
              >
                <a href={APP_DOWNLOAD_URL} target="_blank" rel="noopener noreferrer">
                  Télécharger
                </a>
              </Button>
            </div>

            <div className="flex items-center space-x-2 md:hidden">
              <ThemeToggle />
              <button
                type="button"
                className="p-2.5 text-neutral-700 hover:text-primary-600 dark:text-neutral-300 dark:hover:text-primary-400"
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
