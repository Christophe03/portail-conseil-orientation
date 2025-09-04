'use client';

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { 
  SparklesIcon, 
  DevicePhoneMobileIcon,
  ChatBubbleLeftRightIcon,
  AcademicCapIcon,
  CurrencyDollarIcon
} from '@heroicons/react/24/outline';
import Image from 'next/image';

const features = [
  {
    icon: ChatBubbleLeftRightIcon,
    text: 'Assistant IA Intelligent',
    delay: 0.2,
  },
  {
    icon: AcademicCapIcon,
    text: '1000+ Bourses d\'Études',
    delay: 0.4,
  },
  {
    icon: CurrencyDollarIcon,
    text: 'Ressources Éducatives',
    delay: 0.6,
  },
];

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-primary-50 via-white to-secondary-50 dark:from-neutral-900 dark:via-neutral-800 dark:to-neutral-900">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-secondary-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute top-40 left-40 w-80 h-80 bg-accent-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
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
            <SparklesIcon className="h-4 w-4 text-accent-500" />
            <span className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
              🚀 Application Révolutionnaire
            </span>
          </motion.div>

          {/* Main Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-4xl md:text-6xl lg:text-7xl font-bold text-neutral-900 dark:text-white mb-6"
          >
            Votre{' '}
            <span className="bg-gradient-to-r from-primary-600 via-secondary-600 to-accent-500 bg-clip-text text-transparent">
              Compagnon
            </span>{' '}
            pour un Avenir Brillant
          </motion.h1>

          {/* Logo Principal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex justify-center mb-8"
          >
            <div className="relative w-32 h-32 md:w-40 md:h-40">
              <Image
                src="/app_icon.png"
                alt="Conseil d'Orientation"
                fill
                className="object-contain drop-shadow-2xl"
                priority
              />
            </div>
          </motion.div>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl md:text-2xl text-neutral-600 dark:text-neutral-400 mb-8 max-w-3xl mx-auto leading-relaxed"
          >
            Découvrez l'application mobile qui révolutionne l'orientation scolaire et professionnelle. 
            Intelligence artificielle, bourses d'études et ressources éducatives au service de votre réussite.
          </motion.p>

          {/* Features List */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-wrap justify-center gap-4 mb-12"
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: feature.delay }}
                className="flex items-center space-x-2 bg-white/80 dark:bg-neutral-800/80 backdrop-blur-sm border border-neutral-200 dark:border-neutral-700 rounded-full px-4 py-2"
              >
                <feature.icon className="h-4 w-4 text-primary-500" />
                <span className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
                  {feature.text}
                </span>
              </motion.div>
            ))}
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16"
          >
            <Button
              size="lg"
              className="bg-gradient-to-r from-primary-600 to-secondary-600 hover:from-primary-700 hover:to-secondary-700 text-white shadow-soft hover:shadow-medium transform hover:scale-105 transition-all duration-200"
            >
              <DevicePhoneMobileIcon className="h-5 w-5 mr-2" />
              Télécharger l'App
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="border-2 border-primary-600 text-primary-600 hover:bg-primary-600 hover:text-white transform hover:scale-105 transition-all duration-200"
            >
              Découvrir les Fonctionnalités
            </Button>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.0 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-2xl mx-auto"
          >
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-primary-600 dark:text-primary-400 mb-2">
                50K+
              </div>
              <div className="text-neutral-600 dark:text-neutral-400">
                Utilisateurs Actifs
              </div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-secondary-600 dark:text-secondary-400 mb-2">
                1000+
              </div>
              <div className="text-neutral-600 dark:text-neutral-400">
                Bourses d'Études
              </div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-accent-600 dark:text-accent-400 mb-2">
                4.8★
              </div>
              <div className="text-neutral-600 dark:text-neutral-400">
                Note Moyenne
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Floating Phone Mockup */}
      <motion.div
        initial={{ opacity: 0, x: 100, rotate: 15 }}
        animate={{ opacity: 1, x: 0, rotate: 0 }}
        transition={{ duration: 1.2, delay: 1.2, type: 'spring' }}
        className="absolute right-10 top-1/2 transform -translate-y-1/2 hidden lg:block"
      >
        <div className="relative">
          <div className="w-80 h-96 bg-gradient-to-br from-neutral-900 to-neutral-700 rounded-[3rem] p-2 shadow-2xl">
            <div className="w-full h-full bg-gradient-to-br from-primary-500 to-secondary-500 rounded-[2.5rem] flex items-center justify-center">
              <div className="text-center text-white">
                <DevicePhoneMobileIcon className="h-16 w-16 mx-auto mb-4" />
                <div className="text-lg font-semibold">Conseil d'Orientation</div>
                <div className="text-sm opacity-80">Votre avenir commence ici</div>
              </div>
            </div>
          </div>
          {/* Screen Glow */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary-400/20 to-secondary-400/20 rounded-[3rem] blur-xl"></div>
        </div>
      </motion.div>
    </section>
  );
}
