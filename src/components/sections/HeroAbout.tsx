'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { 
  BuildingLibraryIcon,
  SparklesIcon
} from '@heroicons/react/24/outline';

export function HeroAbout() {
  return (
    <section className="relative pt-28 pb-16 sm:pt-36 sm:pb-20 overflow-hidden bg-gradient-to-b from-slate-50 via-white to-blue-50/20 dark:from-[#071324] dark:via-[#0a192f] dark:to-[#071324]">
      {/* Subtle grid pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#13508f0a_1px,transparent_1px),linear-gradient(to_bottom,#13508f0a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] dark:bg-[linear-gradient(to_right,#3b9df810_1px,transparent_1px),linear-gradient(to_bottom,#3b9df810_1px,transparent_1px)]" />

      <div className="container-custom relative z-10">
        <div className="text-center max-w-4xl mx-auto">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center space-x-2 rounded-full px-4 py-1.5 bg-[#13508f]/10 dark:bg-[#112240] border border-[#13508f]/20 dark:border-[#3b9df8]/30 mb-6"
          >
            <SparklesIcon className="h-4 w-4 text-[#3b9df8]" />
            <span className="text-xs font-semibold text-[#13508f] dark:text-[#7cc5fb]">
              Histoire & Engagement National • Mali
            </span>
          </motion.div>

          {/* Main Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-[#13508f] dark:text-white mb-6 leading-tight text-balance"
          >
            À propos de <span className="text-[#3b9df8]">Conseil d'Orientation</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-base sm:text-lg md:text-xl text-slate-600 dark:text-slate-300 mb-8 max-w-3xl mx-auto leading-relaxed"
          >
            Première plateforme et application mobile d'orientation scolaire et universitaire au Mali.
            Notre vocation : guider chaque élève et étudiant vers les facultés publiques, instituts privés agréés
            et débouchés porteurs pour l'avenir du pays.
          </motion.p>

          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-6 flex justify-center"
          >
            <div className="relative w-40 h-40 sm:w-48 sm:h-48 md:w-56 md:h-56">
              <Image
                src="/app_icon.png"
                alt="Conseil d'Orientation Logo"
                fill
                className="object-contain drop-shadow-xl"
                priority
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
