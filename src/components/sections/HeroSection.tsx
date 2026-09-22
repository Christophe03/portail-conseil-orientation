'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/Button';
import { APP_DOWNLOAD_URL } from '@/lib/app-links';
import { 
  SparklesIcon,
  DevicePhoneMobileIcon,
  AcademicCapIcon,
  ArrowRightIcon,
  BuildingLibraryIcon,
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

          {/* Right Column: Realistic Smartphone App Showcase in Logo Colors */}
          <motion.div
            initial={false}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5 flex justify-center"
          >
            <div className="relative w-full max-w-[340px] sm:max-w-[370px]">
              {/* Soft decorative glow behind phone using logo dual-blue */}
              <div className="absolute -inset-1.5 bg-gradient-to-r from-[#13508f] to-[#3b9df8] rounded-[3rem] opacity-25 blur-xl dark:opacity-35"></div>

              {/* Smartphone Frame */}
              <div className="relative rounded-[2.8rem] bg-slate-900 p-3 shadow-phone border-4 border-slate-800">
                {/* Phone Speaker & Camera Notch */}
                <div className="absolute top-6 left-1/2 -translate-x-1/2 w-24 h-4 bg-slate-900 rounded-full z-20 flex items-center justify-center">
                  <div className="w-10 h-1 bg-slate-800 rounded-full"></div>
                  <div className="w-2.5 h-2.5 bg-slate-800 rounded-full ml-2"></div>
                </div>

                {/* Smartphone Screen Content */}
                <div className="relative rounded-[2.3rem] overflow-hidden bg-slate-50 dark:bg-[#071324] border border-slate-700/50 p-4 pt-10 text-left space-y-3.5">
                  
                  {/* Top Bar of the App */}
                  <div className="flex items-center justify-between pb-2 border-b border-slate-200 dark:border-slate-800">
                    <div className="flex items-center space-x-2">
                      <div className="relative w-7 h-7 rounded-lg overflow-hidden">
                        <Image
                          src="/app_icon.png"
                          alt="Conseil d'Orientation"
                          fill
                          className="object-cover"
                        />
                      </div>
                      <span className="text-xs font-bold text-[#13508f] dark:text-white">
                        Conseil Orientation Mali
                      </span>
                    </div>
                    <span className="text-[10px] font-semibold bg-[#3b9df8]/15 text-[#13508f] dark:bg-[#3b9df8]/20 dark:text-[#7cc5fb] px-2 py-0.5 rounded-full">
                      En ligne
                    </span>
                  </div>

                  {/* Student Profile Card */}
                  <div className="p-3 rounded-2xl bg-white dark:bg-[#112240] border border-slate-200/80 dark:border-slate-700/80 shadow-xs">
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-xs font-semibold text-slate-800 dark:text-slate-200">
                        Profil Bachelier
                      </span>
                      <span className="text-[10px] font-bold text-[#13508f] dark:text-[#7cc5fb] bg-[#13508f]/10 dark:bg-[#13508f]/30 px-2 py-0.5 rounded-md">
                        Série TSE
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-snug">
                      Mali • Bamako • Intérêts : Informatique, Ingénierie, Technologies
                    </p>
                  </div>

                  {/* AI Recommendation Chat Bubble */}
                  <div className="p-3.5 rounded-2xl bg-gradient-to-br from-[#13508f] to-[#0e3760] text-white shadow-sm space-y-2">
                    <div className="flex items-center space-x-1.5 text-[#7cc5fb]">
                      <SparklesIcon className="h-4 w-4 text-[#3b9df8]" />
                      <span className="text-xs font-bold tracking-wide text-white">
                        Conseiller IA Orientation
                      </span>
                    </div>
                    <p className="text-xs text-slate-100 leading-relaxed">
                      « Avec ton Bac TSE, voici les formations phares idéales à Bamako :
                    </p>
                    <div className="space-y-1.5 pt-1">
                      <div className="flex items-center space-x-2 text-[11px] bg-white/10 rounded-lg p-2 text-white">
                        <BuildingLibraryIcon className="h-3.5 w-3.5 text-[#3b9df8] shrink-0" />
                        <span className="truncate">USTTB / FST • Génie Informatique</span>
                      </div>
                      <div className="flex items-center space-x-2 text-[11px] bg-white/10 rounded-lg p-2 text-white">
                        <BuildingLibraryIcon className="h-3.5 w-3.5 text-[#7cc5fb] shrink-0" />
                        <span className="truncate">ENI-ABT • Télécommunications</span>
                      </div>
                    </div>
                  </div>

                  {/* Floating Action within the App Screen in Logo Sky Blue */}
                  <div className="pt-1">
                    <div className="w-full py-2.5 px-3 rounded-xl bg-[#3b9df8] hover:bg-[#2589ec] text-white text-xs font-bold flex items-center justify-center space-x-1.5 shadow-sm transition-colors cursor-pointer">
                      <span>Poser une question à l'IA</span>
                      <ArrowRightIcon className="h-3.5 w-3.5" />
                    </div>
                  </div>

                  {/* Status Indicator */}
                  <div className="text-center pt-1">
                    <span className="text-[10px] text-slate-500 dark:text-slate-400 font-medium">
                      ✓ Données vérifiées • Rentrée académique 2026/2027
                    </span>
                  </div>

                </div>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
