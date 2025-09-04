'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Bars3Icon, 
  XMarkIcon, 
  SunIcon, 
  MoonIcon, 
  ComputerDesktopIcon 
} from '@heroicons/react/24/outline';
import { useTheme } from '@/components/providers/ThemeProvider';
import { ThemeToggle } from '@/components/ui/ThemeToggle';
import { Button } from '@/components/ui/Button';
import Image from 'next/image';

const navigation = [
  { name: 'Accueil', href: '/' },
  { name: 'Fonctionnalités', href: '#features' },
  { name: 'Télécharger', href: '#download' },
  { name: 'Documentation', href: '/docs' },
  { name: 'Support', href: '/support' },
  { name: 'À propos', href: '/about' },
];

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/80 backdrop-blur-md border-b border-neutral-200 shadow-soft dark:bg-neutral-900/80 dark:border-neutral-700'
          : 'bg-transparent'
      }`}
    >
      <nav className="container-custom">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3">
            <div className="relative w-12 h-12 md:w-14 md:h-14">
              {theme === 'dark' ? (
                <Image
                  src="/app_icon_blanc.png"
                  alt="Conseil d'Orientation"
                  fill
                  className="object-contain"
                  priority
                />
              ) : (
                <Image
                  src="/app_icon.png"
                  alt="Conseil d'Orientation"
                  fill
                  className="object-contain"
                  priority
                />
              )}
            </div>
            <span className="text-xl md:text-2xl font-bold text-neutral-900 dark:text-white">
              Conseil d'Orientation
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-neutral-700 hover:text-primary-600 dark:text-neutral-300 dark:hover:text-primary-400 transition-colors duration-200 font-medium"
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <ThemeToggle />
            <Button
              asChild
              size="sm"
              className="bg-gradient-to-r from-primary-600 to-secondary-600 hover:from-primary-700 hover:to-secondary-700 text-white"
            >
              <Link href="#download">Télécharger</Link>
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-2">
            <ThemeToggle />
            <button
              type="button"
              className="p-2 text-neutral-700 hover:text-primary-600 dark:text-neutral-300 dark:hover:text-primary-400"
              onClick={() => setMobileMenuOpen(true)}
            >
              <span className="sr-only">Ouvrir le menu</span>
              <Bars3Icon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="md:hidden"
          >
            <div className="fixed inset-0 z-50">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-neutral-900/80 backdrop-blur-sm"
                onClick={() => setMobileMenuOpen(false)}
              />
              
              <motion.div
                initial={{ x: '100%' }}
                animate={{ x: 0 }}
                exit={{ x: '100%' }}
                transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                className="fixed right-0 top-0 h-full w-full max-w-sm bg-white dark:bg-neutral-900 shadow-large"
              >
                <div className="flex items-center justify-between p-6 border-b border-neutral-200 dark:border-neutral-700">
                  <span className="text-lg font-semibold text-neutral-900 dark:text-white">
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
                
                <div className="px-6 py-4 space-y-4">
                  {navigation.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className="block text-lg text-neutral-700 hover:text-primary-600 dark:text-neutral-300 dark:hover:text-primary-400 transition-colors duration-200"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {item.name}
                    </Link>
                  ))}
                  
                  <div className="pt-4 border-t border-neutral-200 dark:border-neutral-700">
                    <Button
                      asChild
                      className="w-full bg-gradient-to-r from-primary-600 to-secondary-600 hover:from-primary-700 hover:to-secondary-700 text-white"
                    >
                      <Link href="#download">Télécharger l'App</Link>
                    </Button>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
