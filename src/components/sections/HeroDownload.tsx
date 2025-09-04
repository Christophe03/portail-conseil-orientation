'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { Button } from '@/components/ui/Button';
import { 
  ArrowDownTrayIcon, 
  DevicePhoneMobileIcon,
  CheckCircleIcon
} from '@heroicons/react/24/outline';

export function HeroDownload() {
  return (
    <section className="relative pt-32 pb-20 overflow-hidden bg-gradient-to-br from-brand-50 via-white to-primary-50 dark:from-neutral-900 dark:via-neutral-800 dark:to-neutral-900">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-brand-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-primary-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
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
            <ArrowDownTrayIcon className="h-4 w-4 text-brand-500" />
            <span className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
              📱 Téléchargement Gratuit
            </span>
          </motion.div>

          {/* Main Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-4xl md:text-6xl lg:text-7xl font-bold text-neutral-900 dark:text-white mb-6"
          >
            Téléchargez{' '}
            <span className="bg-gradient-to-r from-brand-600 via-primary-600 to-accent-500 bg-clip-text text-transparent">
              Maintenant
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl md:text-2xl text-neutral-600 dark:text-neutral-400 mb-8 max-w-3xl mx-auto leading-relaxed"
          >
            Commencez votre voyage vers la réussite dès aujourd'hui. 
            Disponible sur iOS, Android et APK direct.
          </motion.p>

          {/* Quick Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-wrap justify-center gap-6 mb-12"
          >
            <div className="flex items-center space-x-2 bg-white/80 dark:bg-neutral-800/80 backdrop-blur-sm border border-neutral-200 dark:border-neutral-700 rounded-full px-4 py-2">
              <CheckCircleIcon className="h-4 w-4 text-brand-500" />
              <span className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
                50K+ Téléchargements
              </span>
            </div>
            <div className="flex items-center space-x-2 bg-white/80 dark:bg-neutral-800/80 backdrop-blur-sm border border-neutral-200 dark:border-neutral-700 rounded-full px-4 py-2">
              <CheckCircleIcon className="h-4 w-4 text-brand-500" />
              <span className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
                4.8★ Note Moyenne
              </span>
            </div>
            <div className="flex items-center space-x-2 bg-white/80 dark:bg-neutral-800/80 backdrop-blur-sm border border-neutral-200 dark:border-neutral-700 rounded-full px-4 py-2">
              <CheckCircleIcon className="h-4 w-4 text-brand-500" />
              <span className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
                Gratuit à 100%
              </span>
            </div>
          </motion.div>

          {/* App Preview */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="mt-16 flex justify-center"
          >
            <div className="relative w-64 h-64 md:w-80 md:h-80">
              <Image
                src="/app_icon.png"
                alt="Conseil d'Orientation App"
                fill
                className="object-contain drop-shadow-2xl"
                priority
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
