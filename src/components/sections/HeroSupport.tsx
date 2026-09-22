'use client';

import { motion } from 'framer-motion';
import { 
  ChatBubbleLeftRightIcon,
  QuestionMarkCircleIcon,
  PhoneIcon,
  ShieldCheckIcon
} from '@heroicons/react/24/outline';

export function HeroSupport() {
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
            <ChatBubbleLeftRightIcon className="h-4 w-4 text-[#3B9DF8]" />
            <span className="text-xs sm:text-sm font-semibold text-[#13508f] dark:text-[#3b9df8]">
              Assistance & Support Étudiant
            </span>
          </motion.div>

          {/* Main Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-slate-900 dark:text-white mb-6 leading-[1.15]"
          >
            Comment pouvons-nous{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#13508F] to-[#3B9DF8]">
              vous aider ?
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-base sm:text-lg md:text-xl text-slate-600 dark:text-slate-300 mb-8 max-w-3xl mx-auto leading-relaxed"
          >
            Notre équipe est à votre écoute pour vous guider dans l'utilisation de l'application, l'installation sur votre téléphone, ou répondre à vos questions d'orientation au Mali.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-3.5 justify-center items-center mb-8"
          >
            <a
              href="#contact"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-[#13508F] hover:bg-[#0e3a6a] text-white font-semibold text-sm shadow-md shadow-[#13508F]/20 transition-all duration-200 min-h-[48px] w-full sm:w-auto"
            >
              <ChatBubbleLeftRightIcon className="h-4 w-4" />
              <span>Écrire à l'assistance</span>
            </a>
            <a
              href="https://wa.me/22392722564"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-white dark:bg-[#112240] hover:bg-slate-100 dark:hover:bg-[#1b345f] text-slate-800 dark:text-slate-200 font-semibold text-sm border border-slate-200 dark:border-slate-700 transition-all duration-200 min-h-[48px] w-full sm:w-auto"
            >
              <PhoneIcon className="h-4 w-4 text-[#3B9DF8]" />
              <span>Assistance WhatsApp (+223 92 72 25 64)</span>
            </a>
          </motion.div>

          {/* Highlights */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-wrap items-center justify-center gap-6 text-xs sm:text-sm text-slate-500 dark:text-slate-400"
          >
            <div className="flex items-center gap-1.5">
              <ShieldCheckIcon className="w-4 h-4 text-[#13508F] dark:text-[#3B9DF8]" />
              <span>Support 100% Gratuit</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              <span>Réponse moyenne sous 2h</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#3B9DF8]" />
              <span>Équipe basée au Mali (Bamako / Kati)</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
