'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { APP_DOWNLOAD_URL } from '@/lib/app-links';
import { 
  DevicePhoneMobileIcon,
  ComputerDesktopIcon,
  ArrowDownTrayIcon,
  CheckCircleIcon
} from '@heroicons/react/24/outline';

const requirements = [
  { platform: 'Android (APK)', minVersion: '6.0 (API 23)', ram: '2 GB', storage: '80 MB', connection: 'Internet' },
];

export function DownloadSection() {
  return (
    <section id="download" className="py-20 bg-gradient-to-b from-slate-50 via-white to-blue-50/20 dark:from-[#071324] dark:via-[#0a192f] dark:to-[#071324]">
      <div className="container-custom">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          {/* Logo Section */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex justify-center mb-6"
          >
            <div className="relative w-24 h-24 md:w-28 md:h-28">
              <Image
                src="/app_icon.png"
                alt="Conseil d'Orientation"
                fill
                className="object-contain drop-shadow-lg"
                priority
              />
            </div>
          </motion.div>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight text-[#13508f] dark:text-white mb-4">
            Téléchargez l'Application <span className="text-[#3b9df8]">Maintenant</span>
          </h2>
          <div className="flex justify-center">
            <span className="inline-flex items-center space-x-2 bg-[#13508f]/10 dark:bg-[#112240] border border-[#13508f]/20 dark:border-[#3b9df8]/30 rounded-full px-5 py-2 text-xs md:text-sm text-[#13508f] dark:text-[#7cc5fb] font-semibold">
              <DevicePhoneMobileIcon className="h-4 w-4 text-[#3b9df8]" />
              <span>Disponible sur Android • Téléchargement Sécurisé</span>
            </span>
          </div>
        </motion.div>

        {/* APKPure Highlight Card */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-14"
        >
          <div className="bg-white dark:bg-[#112240] rounded-3xl p-8 md:p-12 border border-slate-200/80 dark:border-slate-800 shadow-card text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-[#13508f]/10 dark:bg-[#13508f]/30 text-[#13508f] dark:text-[#3b9df8] rounded-2xl mb-6">
              <ComputerDesktopIcon className="h-8 w-8 text-[#3b9df8]" />
            </div>
            <h3 className="text-2xl md:text-3xl font-extrabold text-[#13508f] dark:text-white mb-3">
              Installation Android Directe
            </h3>
            <p className="text-base text-slate-600 dark:text-slate-300 mb-8 max-w-xl mx-auto leading-relaxed">
              Téléchargez et installez l'application en quelques secondes sur votre smartphone pour accéder à l'annuaire complet et au conseiller IA.
            </p>
            <Button
              size="lg"
              className="bg-[#13508f] hover:bg-[#0e4379] text-white dark:bg-[#3b9df8] dark:hover:bg-[#2589ec] font-bold text-base px-8 py-4 rounded-xl shadow-md hover:shadow-lg transition-all duration-200 mb-8"
              asChild
            >
              <a href={APP_DOWNLOAD_URL} target="_blank" rel="noopener noreferrer">
                <ArrowDownTrayIcon className="h-5 w-5 mr-2" />
                Télécharger l'Application (APK)
              </a>
            </Button>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t border-slate-100 dark:border-slate-800 max-w-2xl mx-auto">
              <div className="flex items-center justify-center space-x-2 text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-300">
                <CheckCircleIcon className="h-5 w-5 text-[#3b9df8] shrink-0" />
                <span>Source 100% Officielle</span>
              </div>
              <div className="flex items-center justify-center space-x-2 text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-300">
                <CheckCircleIcon className="h-5 w-5 text-[#3b9df8] shrink-0" />
                <span>Dernière version à jour</span>
              </div>
              <div className="flex items-center justify-center space-x-2 text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-300">
                <CheckCircleIcon className="h-5 w-5 text-[#3b9df8] shrink-0" />
                <span>Installation sans compte</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* System Requirements */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="max-w-4xl mx-auto mb-14"
        >
          <div className="bg-white dark:bg-[#112240] rounded-2xl p-6 sm:p-8 border border-slate-200/80 dark:border-slate-800 shadow-card">
            <h3 className="text-xl font-bold text-[#13508f] dark:text-white mb-6">
              Prérequis Système Minimaux
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-slate-200 dark:border-slate-700/80 text-left text-xs uppercase font-bold text-slate-500 dark:text-slate-400">
                    <th className="py-3 px-4">Plateforme</th>
                    <th className="py-3 px-4">Version Min.</th>
                    <th className="py-3 px-4">RAM</th>
                    <th className="py-3 px-4">Stockage</th>
                    <th className="py-3 px-4">Connexion</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  {requirements.map((req, index) => (
                    <tr key={index} className="text-slate-700 dark:text-slate-300">
                      <td className="py-3.5 px-4 font-semibold text-[#13508f] dark:text-[#7cc5fb]">{req.platform}</td>
                      <td className="py-3.5 px-4">{req.minVersion}</td>
                      <td className="py-3.5 px-4">{req.ram}</td>
                      <td className="py-3.5 px-4">{req.storage}</td>
                      <td className="py-3.5 px-4">{req.connection}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </motion.div>

        {/* Installation Guide Callout */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center max-w-4xl mx-auto"
        >
          <div className="bg-gradient-to-r from-[#13508f] to-[#0e3760] rounded-2xl p-8 text-white shadow-card">
            <h3 className="text-2xl font-bold mb-3">
              Besoin d'aide pour l'installation ?
            </h3>
            <p className="text-sm sm:text-base text-slate-200 mb-6 max-w-xl mx-auto leading-relaxed">
              Consultez notre documentation pas à pas ou contactez notre équipe d'assistance pour vous guider.
            </p>
            <div className="flex flex-col sm:flex-row gap-3.5 justify-center">
              <Button
                variant="outline"
                size="lg"
                className="rounded-xl border border-white/30 text-white hover:bg-white/10 font-semibold"
                asChild
              >
                <Link href="/docs">
                  Consulter la Documentation
                </Link>
              </Button>
              <Button
                size="lg"
                className="rounded-xl bg-[#3b9df8] hover:bg-[#2589ec] text-white font-semibold"
                asChild
              >
                <Link href="/support">
                  Support Technique
                </Link>
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
