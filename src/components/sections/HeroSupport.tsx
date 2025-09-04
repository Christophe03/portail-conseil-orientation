'use client';

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { 
  QuestionMarkCircleIcon, 
  ChatBubbleLeftRightIcon,
  ExclamationTriangleIcon
} from '@heroicons/react/24/outline';

export function HeroSupport() {
  return (
    <section className="relative pt-32 pb-20 overflow-hidden bg-gradient-to-br from-accent-50 via-white to-warning-50 dark:from-neutral-900 dark:via-neutral-800 dark:to-neutral-900">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-accent-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-warning-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
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
            <ExclamationTriangleIcon className="h-4 w-4 text-accent-500" />
            <span className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
              🆘 Support 24/7
            </span>
          </motion.div>

          {/* Main Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-4xl md:text-6xl lg:text-7xl font-bold text-neutral-900 dark:text-white mb-6"
          >
            Besoin d'{' '}
            <span className="bg-gradient-to-r from-accent-600 via-warning-600 to-primary-500 bg-clip-text text-transparent">
              Aide ?
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl md:text-2xl text-neutral-600 dark:text-neutral-400 mb-8 max-w-3xl mx-auto leading-relaxed"
          >
            Notre équipe de support est là pour vous accompagner. 
            FAQ, guides de dépannage et contact direct pour résoudre tous vos problèmes.
          </motion.p>

          {/* Support Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-wrap justify-center gap-6 mb-12"
          >
            <div className="flex items-center space-x-2 bg-white/80 dark:bg-neutral-800/80 backdrop-blur-sm border border-neutral-200 dark:border-neutral-700 rounded-full px-4 py-2">
              <ChatBubbleLeftRightIcon className="h-4 w-4 text-accent-500" />
              <span className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
                Réponse &lt; 2h
              </span>
            </div>
            <div className="flex items-center space-x-2 bg-white/80 dark:bg-neutral-800/80 backdrop-blur-sm border border-neutral-200 dark:border-neutral-700 rounded-full px-4 py-2">
              <QuestionMarkCircleIcon className="h-4 w-4 text-accent-500" />
              <span className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
                95% Résolus
              </span>
            </div>
            <div className="flex items-center space-x-2 bg-white/80 dark:bg-neutral-800/80 backdrop-blur-sm border border-neutral-200 dark:border-neutral-700 rounded-full px-4 py-2">
              <ExclamationTriangleIcon className="h-4 w-4 text-accent-500" />
              <span className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
                Support 24/7
              </span>
            </div>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <Button
              size="lg"
              className="bg-gradient-to-r from-accent-600 to-warning-600 hover:from-accent-700 hover:to-warning-700 text-white px-8 py-4 text-lg"
            >
              <ChatBubbleLeftRightIcon className="h-5 w-5 mr-2" />
              Contacter le Support
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="border-2 border-accent-600 text-accent-600 hover:bg-accent-600 hover:text-white px-8 py-4 text-lg"
            >
              <QuestionMarkCircleIcon className="h-5 w-5 mr-2" />
              Voir la FAQ
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
