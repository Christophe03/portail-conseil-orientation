'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/Button';
import { APP_DOWNLOAD_URL } from '@/lib/app-links';
import { 
  DevicePhoneMobileIcon,
  AcademicCapIcon,
} from '@heroicons/react/24/outline';

const stats = [
  { value: '190+', label: 'Établissements au Mali' },
  { value: '100%', label: 'Séries du Bac couvertes' },
  { value: '24/7', label: 'Conseiller IA disponible' },
];

export function HeroSection() {
  return (
    <section className="relative overflow-hidden pt-28 pb-16 md:pt-36 md:pb-24 bg-gradient-to-b from-slate-50 via-white to-blue-50/20 dark:from-[#060f1d] dark:via-[#0a192f] dark:to-[#060f1d]">
      {/* Subtle background grid pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#13508f0a_1px,transparent_1px),linear-gradient(to_bottom,#13508f0a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] dark:bg-[linear-gradient(to_right,#3b9df810_1px,transparent_1px),linear-gradient(to_bottom,#3b9df810_1px,transparent_1px)]" />

      <div className="container-custom relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Heading, Value Proposition & CTAs */}
          <div className="lg:col-span-7 text-left">
            {/* National Orientation Badge in Logo Colors */}
            <motion.div
              initial={false}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="inline-flex items-center space-x-2 rounded-full px-3.5 py-1.5 bg-[#13508f]/10 dark:bg-[#112240] border border-[#13508f]/20 dark:border-[#3b9df8]/30 mb-6"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#3b9df8] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#3b9df8]"></span>
              </span>
              <span className="text-xs font-semibold text-[#13508f] dark:text-[#7cc5fb]">
                Portail Officiel & IA • Orientation Post-Bac Mali
              </span>
            </motion.div>

            {/* Main Headline */}
            <motion.h1
              initial={false}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-[#13508f] dark:text-white tracking-tight leading-[1.15] mb-6 text-balance"
            >
              Construisez votre avenir universitaire au Mali avec <span className="text-[#3b9df8]">l'aide de l'IA</span>
            </motion.h1>

            {/* Subtitle / Description */}
            <motion.p
              initial={false}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed mb-8 max-w-2xl"
            >
              Explorez l'annuaire de plus de 190 universités, facultés et instituts agréés au Mali. 
              Découvrez les débouchés de votre série du Bac et laissez le conseiller intelligent vous orienter vers votre vocation.
            </motion.p>

            {/* Action Buttons */}
            <motion.div
              initial={false}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 mb-10"
            >
              <Button
                asChild
                size="lg"
                className="rounded-xl bg-[#13508f] text-white font-semibold hover:bg-[#0e4379] shadow-md hover:shadow-lg dark:bg-[#3b9df8] dark:text-white dark:hover:bg-[#2589ec] transition-all flex items-center justify-center px-6 py-3.5 min-h-[48px]"
              >
                <a href={APP_DOWNLOAD_URL} target="_blank" rel="noopener noreferrer">
                  <DevicePhoneMobileIcon className="h-5 w-5 mr-2.5" />
                  Télécharger l'Application
                </a>
              </Button>

              <Button
                asChild
                variant="outline"
                size="lg"
                className="rounded-xl border-2 border-[#13508f]/25 dark:border-[#3b9df8]/40 bg-white/80 dark:bg-slate-800/60 text-[#13508f] dark:text-[#7cc5fb] hover:bg-[#13508f]/5 dark:hover:bg-[#3b9df8]/10 font-semibold transition-all flex items-center justify-center px-6 py-3.5 min-h-[48px]"
              >
                <Link href="/universites">
                  <AcademicCapIcon className="h-5 w-5 mr-2.5 text-[#3b9df8]" />
                  Explorer les Universités
                </Link>
              </Button>
            </motion.div>

            {/* Stats Row */}
            <motion.div
              initial={false}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="grid grid-cols-3 gap-4 pt-6 border-t border-slate-200/80 dark:border-slate-800/80 max-w-xl"
            >
              {stats.map((stat, i) => (
                <div key={i} className="text-left">
                  <div className="text-2xl sm:text-3xl font-extrabold text-[#13508f] dark:text-[#3b9df8]">
                    {stat.value}
                  </div>
                  <div className="text-xs sm:text-sm font-medium text-slate-500 dark:text-slate-400">
                    {stat.label}
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right Column: 3D Smartphone App Mockup (1.png) */}
          <motion.div
            initial={false}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5 flex justify-center"
          >
            <div className="relative w-full max-w-[360px] sm:max-w-[400px]">
              {/* Soft decorative glow behind phone using logo dual-blue */}
              <div
                className="absolute inset-4 bg-gradient-to-tr from-[#13508f]/25 via-[#3b9df8]/20 to-transparent rounded-full blur-2xl opacity-70 dark:opacity-80"
                aria-hidden="true"
              />

              {/* 3D Phone Mockup with subtle floating animation */}
              <div className="relative aspect-[16/15] w-full flex items-center justify-center motion-safe:animate-[float_6s_ease-in-out_infinite]">
                <Image
                  src="/images/app/app-mockup-1.webp"
                  alt="Aperçu 3D de l'application mobile Conseil d'Orientation Mali - Écran des domaines d'études"
                  width={800}
                  height={750}
                  priority
                  sizes="(min-width: 1024px) 400px, (min-width: 640px) 360px, 300px"
                  className="w-full h-auto object-contain drop-shadow-[0_25px_45px_rgba(15,41,66,0.30)]"
                />
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
