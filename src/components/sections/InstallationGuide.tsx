'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import Link from 'next/link';
import { 
  DevicePhoneMobileIcon,
  GlobeAltIcon,
  CheckCircleIcon,
  ExclamationCircleIcon,
  ArrowRightIcon,
  ArrowDownTrayIcon
} from '@heroicons/react/24/outline';

const installationSteps = {
  android: [
    {
      step: 1,
      title: 'Télécharger le fichier APK',
      description: 'Téléchargez l\'installeur sécurisé depuis notre lien officiel',
      details: 'Cliquez sur le bouton "Télécharger l\'APK" ci-dessus ou via APKPure. Le fichier pèse environ 15 Mo et sera enregistré dans vos Téléchargements.'
    },
    {
      step: 2,
      title: 'Autoriser la source',
      description: 'Activez temporairement l\'installation d\'applications externes',
      details: 'Lorsque votre téléphone vous le demande, appuyez sur "Paramètres" et cochez "Autoriser cette source" pour votre navigateur (Chrome, etc.).'
    },
    {
      step: 3,
      title: 'Confirmer l\'installation',
      description: 'Appuyez sur Installer et laissez le processus s\'achever',
      details: 'Ouvrez le fichier téléchargé et validez en cliquant sur "Installer". Le système vérifie automatiquement la sécurité du paquet.'
    },
    {
      step: 4,
      title: 'Démarrer votre orientation',
      description: 'Lancez l\'application depuis l\'écran d\'accueil',
      details: 'L\'icône Conseil d\'Orientation apparaît parmi vos applications. Lancez-la pour explorer instantanément les filières et tester le simulateur de séries.'
    }
  ],
  web: [
    {
      step: 1,
      title: 'Ouvrir sur votre navigateur',
      description: 'Accédez directement à la plateforme sans aucun téléchargement',
      details: 'Ouvrez le site sur Safari (iOS), Google Chrome ou Firefox sur votre smartphone ou ordinateur.'
    },
    {
      step: 2,
      title: 'Ajouter à l\'écran d\'accueil',
      description: 'Installez le raccourci comme une application native (PWA)',
      details: 'Sur iPhone (Safari) : appuyez sur le bouton Partager puis sur "Sur l\'écran d\'accueil". Sur Android (Chrome) : menu 3 points > "Installer l\'application".'
    },
    {
      step: 3,
      title: 'Accès en un clic',
      description: 'Profitez de la même vitesse et ergonomie qu\'une application native',
      details: 'L\'icône s\'affiche sur votre bureau et se lance en plein écran avec un confort visuel optimal.'
    },
    {
      step: 4,
      title: 'Mises à jour automatiques',
      description: 'Aucune maintenance manuelle nécessaire',
      details: 'Dès qu\'une nouvelle université ou une nouvelle série est ajoutée dans notre base, elle est immédiatement disponible.'
    }
  ]
};

const troubleshootingTips = [
  {
    title: 'Téléchargement bloqué ou message "Fichier dangereux"',
    solution: 'C\'est un avertissement standard d\'Android pour les fichiers APK hors Google Play. Cliquez sur "Télécharger quand même", le fichier est rigoureusement vérifié et sécurisé.'
  },
  {
    title: 'Installation bloquée : "Source inconnue"',
    solution: 'Allez dans Paramètres > Sécurité ou Applications > Accès spécial > Installer applications inconnues, et cochez l\'autorisation pour votre navigateur.'
  },
  {
    title: 'Espace insuffisant sur le téléphone',
    solution: 'Libérez au moins 50 Mo en vidant le cache de vos applications courantes, puis relancez le fichier d\'installation.'
  }
];

export function InstallationGuide() {
  const [selectedPlatform, setSelectedPlatform] = useState<'android' | 'web'>('android');

  return (
    <section id="installation" className="py-16 sm:py-24 bg-slate-50/70 dark:bg-[#0a192f]">
      <div className="container-custom">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-14"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#13508F]/10 dark:bg-[#3B9DF8]/10 text-[#13508F] dark:text-[#3B9DF8] text-xs font-bold uppercase tracking-wider mb-4">
            Tutoriel Pas à Pas
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-4">
            Guide d'<span className="text-[#13508F] dark:text-[#3B9DF8]">installation</span> simple
          </h2>
          <p className="text-slate-600 dark:text-slate-300 text-base sm:text-lg">
            Installez l'application en moins de 2 minutes en suivant ces étapes claires et détaillées.
          </p>
        </motion.div>

        {/* Platform Selection */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex justify-center mb-12"
        >
          <div className="inline-flex p-1.5 rounded-2xl bg-white dark:bg-[#112240] border border-slate-200 dark:border-slate-800 shadow-xs">
            <button
              onClick={() => setSelectedPlatform('android')}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold transition-all duration-200 min-h-[44px] ${
                selectedPlatform === 'android'
                  ? 'bg-[#13508F] text-white shadow-sm'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <DevicePhoneMobileIcon className="h-4 w-4" />
              <span>Android (Fichier APK)</span>
            </button>
            <button
              onClick={() => setSelectedPlatform('web')}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold transition-all duration-200 min-h-[44px] ${
                selectedPlatform === 'web'
                  ? 'bg-[#13508F] text-white shadow-sm'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <GlobeAltIcon className="h-4 w-4" />
              <span>iOS & Navigateur (Web PWA)</span>
            </button>
          </div>
        </motion.div>

        {/* Installation Steps */}
        <div className="max-w-4xl mx-auto mb-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {installationSteps[selectedPlatform].map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white dark:bg-[#112240] rounded-2xl p-6 sm:p-7 border border-slate-200 dark:border-slate-800 shadow-card hover:border-[#13508F]/40 dark:hover:border-[#3B9DF8]/40 transition-all duration-300"
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-11 h-11 rounded-xl bg-[#13508F] text-white flex items-center justify-center text-base font-bold shadow-sm">
                    {step.step}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white mb-1.5 leading-snug">
                      {step.title}
                    </h3>
                    <p className="text-xs sm:text-sm font-medium text-[#13508F] dark:text-[#3B9DF8] mb-2.5">
                      {step.description}
                    </p>
                    <p className="text-xs text-slate-600 dark:text-slate-300 bg-slate-50 dark:bg-[#0a192f] p-3 rounded-xl border border-slate-100 dark:border-slate-800/80 leading-relaxed">
                      {step.details}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Visual 3-step Summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto mb-16 p-8 rounded-3xl bg-white dark:bg-[#112240] border border-slate-200 dark:border-slate-800 shadow-card"
        >
          <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-8 text-center">
            Résumé visuel du parcours
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
            <div className="text-center p-4">
              <div className="w-14 h-14 rounded-2xl bg-[#13508F]/10 dark:bg-[#3B9DF8]/10 text-[#13508F] dark:text-[#3B9DF8] flex items-center justify-center mx-auto mb-3">
                <ArrowDownTrayIcon className="h-7 w-7" />
              </div>
              <h4 className="font-bold text-sm text-slate-900 dark:text-white mb-1">1. Télécharger</h4>
              <p className="text-xs text-slate-500 dark:text-slate-400">Fichier APK sécurisé (~15 Mo)</p>
            </div>

            <div className="text-center p-4">
              <div className="w-14 h-14 rounded-2xl bg-[#13508F]/10 dark:bg-[#3B9DF8]/10 text-[#13508F] dark:text-[#3B9DF8] flex items-center justify-center mx-auto mb-3">
                <ArrowRightIcon className="h-7 w-7" />
              </div>
              <h4 className="font-bold text-sm text-slate-900 dark:text-white mb-1">2. Installer</h4>
              <p className="text-xs text-slate-500 dark:text-slate-400">Autoriser l'installation en 1 clic</p>
            </div>

            <div className="text-center p-4">
              <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto mb-3">
                <CheckCircleIcon className="h-7 w-7" />
              </div>
              <h4 className="font-bold text-sm text-slate-900 dark:text-white mb-1">3. Prêt à l'emploi</h4>
              <p className="text-xs text-slate-500 dark:text-slate-400">Explorez les universités du Mali</p>
            </div>
          </div>
        </motion.div>

        {/* Troubleshooting */}
        <div className="max-w-4xl mx-auto mb-16">
          <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6 text-center">
            Questions fréquentes et dépannage
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {troubleshootingTips.map((tip, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white dark:bg-[#112240] rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-card flex flex-col justify-between"
              >
                <div>
                  <div className="w-9 h-9 rounded-lg bg-[#13508F]/10 dark:bg-[#3B9DF8]/10 text-[#13508F] dark:text-[#3B9DF8] flex items-center justify-center mb-3">
                    <ExclamationCircleIcon className="w-5 h-5" />
                  </div>
                  <h4 className="font-bold text-sm text-slate-900 dark:text-white mb-2 leading-snug">
                    {tip.title}
                  </h4>
                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                    {tip.solution}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Need Help CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto text-center p-8 sm:p-10 rounded-3xl bg-[#13508F] text-white shadow-xl relative overflow-hidden"
        >
          <div className="relative z-10">
            <h3 className="text-2xl sm:text-3xl font-extrabold mb-3">
              Besoin d'aide supplémentaire ?
            </h3>
            <p className="text-slate-200 text-sm sm:text-base max-w-xl mx-auto mb-6">
              Notre équipe d'assistance répond volontiers à vos questions pour vous aider à installer l'application ou trouver vos filières.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/support"
                className="px-6 py-3 rounded-xl bg-[#3B9DF8] hover:bg-[#258bf0] text-white font-semibold text-sm transition-all duration-200 shadow-md min-h-[44px] inline-flex items-center justify-center"
              >
                Contacter le Support
              </Link>
              <Link
                href="/docs"
                className="px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-sm border border-white/20 transition-all duration-200 min-h-[44px] inline-flex items-center justify-center"
              >
                Consulter la documentation
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
