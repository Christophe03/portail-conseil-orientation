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
  CheckBadgeIcon,
  BuildingLibraryIcon,
  MapPinIcon
} from '@heroicons/react/24/outline';

const stats = [
  { value: '190+', label: 'Établissements au Mali' },
  { value: '100%', label: 'Séries du Bac couvertes' },
  { value: '24/7', label: 'Conseiller IA disponible' },
];

export function HeroSection() {
  return (
    <section className="relative overflow-hidden pt-28 pb-16 md:pt-36 md:pb-24 bg-gradient-to-b from-slate-50 via-white to-slate-50 dark:from-[#081225] dark:via-[#0b132b] dark:to-[#081225]">
      {/* Subtle background grid pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f01f_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f01f_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] dark:bg-[linear-gradient(to_right,#1e293b2a_1px,transparent_1px),linear-gradient(to_bottom,#1e293b2a_1px,transparent_1px)]" />

      <div className="container-custom relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Heading, Value Proposition & CTAs */}
          <div className="lg:col-span-7 text-left">
            {/* National Orientation Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center space-x-2 rounded-full px-3.5 py-1.5 bg-slate-100 dark:bg-[#14213d] border border-slate-200/80 dark:border-slate-700/80 mb-6"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="text-xs font-semibold text-navy-900 dark:text-slate-200">
                Portail Officiel & IA • Orientation Post-Bac Mali
              </span>
            </motion.div>

            {/* Main Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-navy-900 dark:text-white tracking-tight leading-[1.15] mb-6 text-balance"
            >
              Construisez votre avenir universitaire au Mali avec l'aide de l'IA
            </motion.h1>

            {/* Subtitle / Description */}
            <motion.p
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed mb-8 max-w-2xl"
            >
              Explorez l'annuaire de plus de 190 universités, facultés et instituts agréés au Mali. 
              Découvrez les débouchés de votre série du Bac et laissez le conseiller intelligent vous orienter vers votre vocation.
            </motion.p>

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 mb-10"
            >
              <Button
                asChild
                size="lg"
                className="rounded-xl bg-navy-900 text-white font-semibold hover:bg-navy-800 shadow-md hover:shadow-lg dark:bg-amber-500 dark:text-navy-950 dark:hover:bg-amber-400 transition-all flex items-center justify-center px-6 py-3.5"
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
                className="rounded-xl border border-slate-300 dark:border-slate-700 bg-white/80 dark:bg-slate-800/60 text-navy-900 dark:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800 font-semibold transition-all flex items-center justify-center px-6 py-3.5"
              >
                <Link href="/universites">
                  <AcademicCapIcon className="h-5 w-5 mr-2.5 text-primary-600 dark:text-amber-400" />
                  Explorer les Universités
                </Link>
              </Button>
            </motion.div>

            {/* Stats Row */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="grid grid-cols-3 gap-4 pt-6 border-t border-slate-200/80 dark:border-slate-800/80 max-w-xl"
            >
              {stats.map((stat, i) => (
                <div key={i} className="text-left">
                  <div className="text-2xl sm:text-3xl font-extrabold text-navy-900 dark:text-white">
                    {stat.value}
                  </div>
                  <div className="text-xs sm:text-sm font-medium text-slate-500 dark:text-slate-400">
                    {stat.label}
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right Column: Realistic Smartphone App Showcase */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-5 flex justify-center"
          >
            <div className="relative w-full max-w-[340px] sm:max-w-[370px]">
              {/* Soft decorative glow behind phone */}
              <div className="absolute -inset-1.5 bg-gradient-to-r from-navy-800 to-amber-500 rounded-[3rem] opacity-20 blur-xl dark:opacity-30"></div>

              {/* Smartphone Frame */}
              <div className="relative rounded-[2.8rem] bg-slate-900 p-3 shadow-phone border-4 border-slate-800">
                {/* Phone Speaker & Camera Notch */}
                <div className="absolute top-6 left-1/2 -translate-x-1/2 w-24 h-4 bg-slate-900 rounded-full z-20 flex items-center justify-center">
                  <div className="w-10 h-1 bg-slate-800 rounded-full"></div>
                  <div className="w-2.5 h-2.5 bg-slate-800 rounded-full ml-2"></div>
                </div>

                {/* Smartphone Screen Content */}
                <div className="relative rounded-[2.3rem] overflow-hidden bg-slate-50 dark:bg-[#0d172c] border border-slate-700/50 p-4 pt-10 text-left space-y-3.5">
                  
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
                      <span className="text-xs font-bold text-navy-900 dark:text-white">
                        Conseil Orientation Mali
                      </span>
                    </div>
                    <span className="text-[10px] font-semibold bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 px-2 py-0.5 rounded-full">
                      En ligne
                    </span>
                  </div>

                  {/* Student Profile Card */}
                  <div className="p-3 rounded-2xl bg-white dark:bg-[#14213d] border border-slate-200/80 dark:border-slate-700/80 shadow-xs">
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-xs font-semibold text-slate-800 dark:text-slate-200">
                        Profil Bachelier
                      </span>
                      <span className="text-[10px] font-bold text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/60 px-2 py-0.5 rounded-md">
                        Série TSE
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-snug">
                      Mali • Bamako • Intérêts : Informatique, Ingénierie, Technologies
                    </p>
                  </div>

                  {/* AI Recommendation Chat Bubble */}
                  <div className="p-3.5 rounded-2xl bg-gradient-to-br from-navy-900 to-navy-950 text-white shadow-sm space-y-2">
                    <div className="flex items-center space-x-1.5 text-amber-400">
                      <SparklesIcon className="h-4 w-4" />
                      <span className="text-xs font-bold tracking-wide">
                        Conseiller IA Orientation
                      </span>
                    </div>
                    <p className="text-xs text-slate-200 leading-relaxed">
                      « Avec ton Bac TSE, voici les formations phares idéales à Bamako :
                    </p>
                    <div className="space-y-1.5 pt-1">
                      <div className="flex items-center space-x-2 text-[11px] bg-white/10 rounded-lg p-2 text-slate-100">
                        <BuildingLibraryIcon className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
                        <span className="truncate">USTTB / FST • Génie Informatique</span>
                      </div>
                      <div className="flex items-center space-x-2 text-[11px] bg-white/10 rounded-lg p-2 text-slate-100">
                        <BuildingLibraryIcon className="h-3.5 w-3.5 text-amber-400 shrink-0" />
                        <span className="truncate">ENI-ABT • Télécommunications</span>
                      </div>
                    </div>
                  </div>

                  {/* Floating Action within the App Screen */}
                  <div className="pt-1">
                    <div className="w-full py-2.5 px-3 rounded-xl bg-amber-500 text-navy-950 text-xs font-bold flex items-center justify-center space-x-1.5 shadow-sm">
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
