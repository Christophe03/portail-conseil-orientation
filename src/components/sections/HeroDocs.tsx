'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { 
  BookOpenIcon, 
  MagnifyingGlassIcon,
  AcademicCapIcon,
  QuestionMarkCircleIcon,
  ArrowDownTrayIcon
} from '@heroicons/react/24/outline';

export function HeroDocs() {
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
            <BookOpenIcon className="h-4 w-4 text-[#3B9DF8]" />
            <span className="text-xs sm:text-sm font-semibold text-[#13508f] dark:text-[#3b9df8]">
              Centre d'Aide & Documentation Officielle
            </span>
          </motion.div>

          {/* Main Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-slate-900 dark:text-white mb-6 leading-[1.15]"
          >
            Guides, tutoriels &{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#13508F] to-[#3B9DF8]">
              documentation
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-base sm:text-lg md:text-xl text-slate-600 dark:text-slate-300 mb-8 max-w-3xl mx-auto leading-relaxed"
          >
            Retrouvez tous les guides pas à pas pour installer l'application, comprendre les séries du Bac malien, et explorer les débouchés de chaque faculté.
          </motion.p>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-wrap justify-center gap-3.5"
          >
            <a
              href="#first-steps"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[#13508F] hover:bg-[#0e3a6a] text-white font-semibold text-sm shadow-md shadow-[#13508F]/20 transition-all duration-200 min-h-[44px]"
            >
              <AcademicCapIcon className="h-4 w-4" />
              <span>Guide de Démarrage</span>
            </a>
            <Link
              href="/download#installation"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-white dark:bg-[#112240] hover:bg-slate-100 dark:hover:bg-[#1b345f] text-slate-800 dark:text-slate-200 font-semibold text-sm border border-slate-200 dark:border-slate-700 transition-all duration-200 min-h-[44px]"
            >
              <ArrowDownTrayIcon className="h-4 w-4 text-[#3B9DF8]" />
              <span>Installation APK</span>
            </Link>
            <Link
              href="/support#faq"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-white dark:bg-[#112240] hover:bg-slate-100 dark:hover:bg-[#1b345f] text-slate-800 dark:text-slate-200 font-semibold text-sm border border-slate-200 dark:border-slate-700 transition-all duration-200 min-h-[44px]"
            >
              <QuestionMarkCircleIcon className="h-4 w-4 text-[#3B9DF8]" />
              <span>Foire aux Questions</span>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
