'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { APP_DOWNLOAD_URL } from '@/lib/app-links';
import { 
  SparklesIcon, 
  ArrowDownTrayIcon,
  AcademicCapIcon,
  CheckBadgeIcon
} from '@heroicons/react/24/outline';

export function HeroFeatures() {
  return (
    <section className="relative pt-28 pb-16 sm:pt-36 sm:pb-20 overflow-hidden bg-slate-50/70 dark:bg-[#0a192f] border-b border-slate-200 dark:border-slate-800">
      {/* Background Accent Grid */}
      <div 
        className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05] pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, #13508f 1px, transparent 0)',
          backgroundSize: '28px 28px'
        }}
      />

      <div className="container-custom relative z-10">
        <div className="text-center max-w-4xl mx-auto">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white dark:bg-[#112240] border border-[#13508f]/20 dark:border-[#3b9df8]/30 shadow-xs mb-6"
          >
            <SparklesIcon className="h-4 w-4 text-[#3B9DF8]" />
            <span className="text-xs sm:text-sm font-semibold text-[#13508f] dark:text-[#3b9df8]">
              Fonctionnalités Clés & Outils Intelligents
            </span>
          </motion.div>

          {/* Main Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-slate-900 dark:text-white mb-6 leading-[1.15]"
          >
            Tous les outils pour choisir votre{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#13508F] to-[#3B9DF8]">
              avenir universitaire au Mali
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-base sm:text-lg md:text-xl text-slate-600 dark:text-slate-300 mb-8 max-w-3xl mx-auto leading-relaxed"
          >
            Du choix de votre série de Baccalauréat jusqu’à votre inscription universitaire, explorez une suite d'outils digitaux conçus pour les élèves, bacheliers et étudiants maliens.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-3.5 justify-center items-center mb-10"
          >
            <a
              href={APP_DOWNLOAD_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl bg-[#13508F] hover:bg-[#0e3a6a] text-white font-semibold shadow-md shadow-[#13508F]/20 hover:shadow-lg transition-all duration-200 min-h-[48px] w-full sm:w-auto"
            >
              <ArrowDownTrayIcon className="h-5 w-5" />
              <span>Télécharger l'Application</span>
            </a>
            <Link
              href="/universites"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-white dark:bg-[#112240] hover:bg-slate-100 dark:hover:bg-[#1b345f] text-slate-800 dark:text-slate-200 font-semibold border border-slate-200 dark:border-slate-700 transition-all duration-200 min-h-[48px] w-full sm:w-auto"
            >
              <AcademicCapIcon className="h-5 w-5 text-[#3B9DF8]" />
              <span>Explorer les universités</span>
            </Link>
          </motion.div>

          {/* Trust stats pill */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="inline-flex flex-wrap items-center justify-center gap-6 text-xs sm:text-sm text-slate-500 dark:text-slate-400 py-2 px-6 rounded-full bg-slate-100/80 dark:bg-[#112240]/60 border border-slate-200/60 dark:border-slate-700/60"
          >
            <span className="flex items-center gap-1.5 font-medium">
              <CheckBadgeIcon className="w-4 h-4 text-[#3B9DF8]" /> 100% Données Officielles
            </span>
            <span className="flex items-center gap-1.5 font-medium">
              <CheckBadgeIcon className="w-4 h-4 text-[#3B9DF8]" /> Universités Publiques & Privées
            </span>
            <span className="flex items-center gap-1.5 font-medium">
              <CheckBadgeIcon className="w-4 h-4 text-[#3B9DF8]" /> Toutes Séries de Bac
            </span>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
