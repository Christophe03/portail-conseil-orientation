'use client';

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { 
  BookOpenIcon, 
  MagnifyingGlassIcon,
  AcademicCapIcon
} from '@heroicons/react/24/outline';

export function HeroDocs() {
  return (
    <section className="relative pt-32 pb-20 overflow-hidden bg-gradient-to-br from-secondary-50 via-white to-accent-50 dark:from-neutral-900 dark:via-neutral-800 dark:to-neutral-900">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-secondary-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-accent-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
      </div>

      <div className="container-custom relative z-10">
        <div className="text-center max-w-4xl mx-auto">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center space-x-2 bg-white/80 dark:bg-neutral-800/80 backdrop-blur-sm border border-neutral-200 dark:border-neutral-700 rounded-full px-4 py-2 mb-8"
          >
            <BookOpenIcon className="h-4 w-4 text-secondary-500" />
            <span className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
              📚 Documentation Complète
            </span>
          </motion.div>

          {/* Main Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-4xl md:text-6xl lg:text-7xl font-bold text-neutral-900 dark:text-white mb-6"
          >
            Documentation{' '}
            <span className="bg-gradient-to-r from-secondary-600 via-primary-600 to-accent-500 bg-clip-text text-transparent">
              Complète
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl md:text-2xl text-neutral-600 dark:text-neutral-400 mb-8 max-w-3xl mx-auto leading-relaxed"
          >
            Guides détaillés, tutoriels pas à pas et références techniques 
            pour maîtriser l'application Conseil d'Orientation.
          </motion.p>

          {/* Search Bar */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="max-w-2xl mx-auto mb-8"
          >
            <div className="relative">
              <MagnifyingGlassIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-neutral-400" />
              <input
                type="text"
                placeholder="Rechercher dans la documentation..."
                className="w-full pl-12 pr-4 py-4 bg-white/80 dark:bg-neutral-800/80 backdrop-blur-sm border border-neutral-200 dark:border-neutral-700 rounded-xl text-neutral-900 dark:text-white placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex flex-wrap justify-center gap-4"
          >
            <Button
              variant="outline"
              size="lg"
              className="border-2 border-secondary-600 text-secondary-600 hover:bg-secondary-600 hover:text-white px-6 py-3"
            >
              <AcademicCapIcon className="h-5 w-5 mr-2" />
              Guide de Démarrage
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="border-2 border-secondary-600 text-secondary-600 hover:bg-secondary-600 hover:text-white px-6 py-3"
            >
              <BookOpenIcon className="h-5 w-5 mr-2" />
              Tutoriels Vidéo
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="border-2 border-secondary-600 text-secondary-600 hover:bg-secondary-600 hover:text-white px-6 py-3"
            >
              <MagnifyingGlassIcon className="h-5 w-5 mr-2" />
              FAQ
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
