'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { 
  ArrowDownTrayIcon, 
  DevicePhoneMobileIcon,
  ShieldCheckIcon,
  SparklesIcon
} from '@heroicons/react/24/outline';

export function HeroDownload() {
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
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Value proposition & CTAs */}
          <div className="lg:col-span-7 text-center lg:text-left">
            {/* Pill Badge */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white dark:bg-[#112240] border border-[#13508f]/20 dark:border-[#3b9df8]/30 shadow-xs mb-6"
            >
              <span className="flex h-2 w-2 rounded-full bg-[#3b9df8] animate-pulse" />
              <span className="text-xs sm:text-sm font-semibold text-[#13508f] dark:text-[#3b9df8]">
                Application Officielle • Version v1.0.2 Stable
              </span>
            </motion.div>

            {/* Main Heading */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-slate-900 dark:text-white leading-[1.15] mb-6"
            >
              Téléchargez l'application{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#13508F] to-[#3B9DF8]">
                Conseil d'Orientation
              </span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-2xl mb-8 leading-relaxed mx-auto lg:mx-0"
            >
              Accédez à toutes les filières universitaires du Mali, aux critères d'admission pour chaque série de Bac, et à notre conseiller IA interactif directement sur votre smartphone Android.
            </motion.p>

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center lg:justify-start gap-3.5 mb-8"
            >
              <a
                href="https://d.apkpure.net/b/APK/com.christophedembela.orientation?version=latest"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl bg-[#13508F] hover:bg-[#0e3a6a] text-white font-semibold shadow-md shadow-[#13508F]/20 hover:shadow-lg transition-all duration-200 min-h-[48px]"
              >
                <ArrowDownTrayIcon className="w-5 h-5 text-white" />
                <span>Télécharger l'APK Gratuit</span>
                <span className="text-xs bg-white/20 px-2 py-0.5 rounded-md font-normal">~15 Mo</span>
              </a>

              <a
                href="#installation"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-white dark:bg-[#112240] hover:bg-slate-100 dark:hover:bg-[#1b345f] text-slate-800 dark:text-slate-200 font-semibold border border-slate-200 dark:border-slate-700 transition-all duration-200 min-h-[48px]"
              >
                <DevicePhoneMobileIcon className="w-5 h-5 text-[#3B9DF8]" />
                <span>Guide d'installation</span>
              </a>
            </motion.div>

            {/* Trust Badges */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex flex-wrap items-center justify-center lg:justify-start gap-4 sm:gap-6 text-xs sm:text-sm text-slate-500 dark:text-slate-400 pt-2"
            >
              <div className="flex items-center gap-1.5">
                <ShieldCheckIcon className="w-4 h-4 text-[#13508F] dark:text-[#3B9DF8]" />
                <span>100% Vérifié & Sans Malware</span>
              </div>
              <div className="flex items-center gap-1.5">
                <SparklesIcon className="w-4 h-4 text-[#3B9DF8]" />
                <span>Mode hors ligne inclus</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                <span>Android 6.0 et ultérieur</span>
              </div>
            </motion.div>
          </div>

          {/* Right Column: App Icon & Preview card */}
          <div className="lg:col-span-5 flex justify-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="relative w-full max-w-sm"
            >
              <div className="relative p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#112240] border border-slate-200/80 dark:border-slate-700/80 shadow-card">
                {/* Glow ring */}
                <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-[#13508F]/20 to-[#3B9DF8]/20 blur-xl opacity-70 -z-10" />

                <div className="flex items-center gap-4 mb-6">
                  <div className="relative w-16 h-16 rounded-2xl overflow-hidden shadow-md bg-white border border-slate-100 flex-shrink-0">
                    <Image
                      src="/app_icon.png"
                      alt="Conseil d'Orientation Mali"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="font-bold text-base sm:text-lg text-slate-900 dark:text-white leading-tight">
                      Conseil d'Orientation
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      Orientation Scolaire & Universitaire Mali
                    </p>
                    <div className="flex items-center gap-1 mt-1 text-xs font-semibold text-[#13508F] dark:text-[#3B9DF8]">
                      <span>★★★★★</span>
                      <span className="text-slate-400 dark:text-slate-500">(4.8/5)</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-2.5 text-xs sm:text-sm text-slate-600 dark:text-slate-300 border-t border-b border-slate-100 dark:border-slate-800/80 py-4 mb-5">
                  <div className="flex justify-between items-center">
                    <span className="text-slate-500">Taille du fichier</span>
                    <span className="font-semibold text-slate-800 dark:text-slate-200">15.2 Mo</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-500">Dernière mise à jour</span>
                    <span className="font-semibold text-slate-800 dark:text-slate-200">Septembre 2026</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-500">Compatibilité</span>
                    <span className="font-semibold text-[#13508F] dark:text-[#3B9DF8]">Android 6.0+</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-500">Licence</span>
                    <span className="font-semibold text-emerald-600 dark:text-emerald-400">100% Gratuite</span>
                  </div>
                </div>

                <a
                  href="https://d.apkpure.net/b/APK/com.christophedembela.orientation?version=latest"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 py-3 rounded-xl bg-[#13508F] hover:bg-[#0e3a6a] text-white font-semibold text-sm transition-all duration-200 min-h-[44px]"
                >
                  <ArrowDownTrayIcon className="w-4 h-4" />
                  <span>Télécharger APK Direct</span>
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
