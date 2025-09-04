'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { 
  DevicePhoneMobileIcon,
  ComputerDesktopIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
  ArrowRightIcon,
  ArrowDownTrayIcon
} from '@heroicons/react/24/outline';

const installationSteps = {
  android: [
    {
      step: 1,
      title: 'Télécharger l\'APK',
      description: 'Téléchargez le fichier APK depuis notre site officiel',
      details: 'Cliquez sur le bouton "Télécharger APK" ci-dessus. Le fichier sera téléchargé dans votre dossier "Téléchargements".'
    },
    {
      step: 2,
      title: 'Autoriser l\'installation',
      description: 'Activez l\'installation depuis des sources inconnues',
      details: 'Allez dans Paramètres > Sécurité > Sources inconnues et activez cette option pour votre navigateur.'
    },
    {
      step: 3,
      title: 'Installer l\'application',
      description: 'Ouvrez le fichier APK et suivez les instructions',
      details: 'Tapez sur le fichier APK téléchargé et suivez les instructions d\'installation à l\'écran.'
    },
    {
      step: 4,
      title: 'Lancer l\'application',
      description: 'Ouvrez l\'application depuis votre écran d\'accueil',
      details: 'Une fois installée, l\'application apparaîtra sur votre écran d\'accueil. Tapez dessus pour la lancer.'
    }
  ],
  ios: [
    {
      step: 1,
      title: 'Télécharger depuis l\'App Store',
      description: 'Recherchez l\'application dans l\'App Store',
      details: 'Ouvrez l\'App Store et recherchez "Conseil d\'Orientation" ou utilisez le lien direct ci-dessus.'
    },
    {
      step: 2,
      title: 'Installer l\'application',
      description: 'Tapez sur "Obtenir" puis "Installer"',
      details: 'Tapez sur le bouton "Obtenir", puis "Installer" et confirmez avec votre mot de passe ou Touch ID.'
    },
    {
      step: 3,
      title: 'Attendre l\'installation',
      description: 'L\'installation se fait automatiquement',
      details: 'L\'application se télécharge et s\'installe automatiquement. Vous recevrez une notification une fois terminé.'
    },
    {
      step: 4,
      title: 'Lancer l\'application',
      description: 'Ouvrez l\'application depuis votre écran d\'accueil',
      details: 'Une fois installée, l\'application apparaîtra sur votre écran d\'accueil. Tapez dessus pour la lancer.'
    }
  ]
};

const troubleshootingTips = [
  {
    icon: ExclamationTriangleIcon,
    title: 'Erreur d\'installation',
    solution: 'Vérifiez l\'espace de stockage disponible et redémarrez votre appareil si nécessaire.',
    color: 'text-orange-600'
  },
  {
    icon: ExclamationTriangleIcon,
    title: 'Application ne se lance pas',
    solution: 'Vérifiez que vous avez la dernière version et que votre appareil est compatible.',
    color: 'text-red-600'
  },
  {
    icon: ExclamationTriangleIcon,
    title: 'Problème de connexion',
    solution: 'Assurez-vous d\'avoir une connexion internet stable et vérifiez vos paramètres réseau.',
    color: 'text-blue-600'
  }
];

export function InstallationGuide() {
  const [selectedPlatform, setSelectedPlatform] = useState<'android' | 'ios'>('android');

  return (
    <section className="section-padding bg-gradient-to-br from-neutral-50 to-primary-50 dark:from-neutral-800 dark:to-neutral-900">
      <div className="container-custom">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-neutral-900 dark:text-white mb-6">
            Guide d'{' '}
            <span className="bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
              Installation
            </span>
          </h2>
          <p className="text-lg text-neutral-600 dark:text-neutral-400 max-w-3xl mx-auto">
            Suivez ces étapes simples pour installer l'application Conseil d'Orientation 
            sur votre appareil. Nous vous guidons à chaque étape.
          </p>
        </motion.div>

        {/* Platform Selection */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-12"
        >
          <div className="flex justify-center mb-8">
            <div className="bg-white dark:bg-neutral-800 rounded-2xl p-2 border border-neutral-200 dark:border-neutral-700">
              <button
                onClick={() => setSelectedPlatform('android')}
                className={`px-8 py-3 rounded-xl font-semibold transition-all duration-200 flex items-center space-x-2 ${
                  selectedPlatform === 'android'
                    ? 'bg-primary-600 text-white shadow-lg'
                    : 'text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-700'
                }`}
              >
                <ComputerDesktopIcon className="h-5 w-5" />
                <span>Android</span>
              </button>
              <button
                onClick={() => setSelectedPlatform('ios')}
                className={`px-8 py-3 rounded-xl font-semibold transition-all duration-200 flex items-center space-x-2 ${
                  selectedPlatform === 'ios'
                    ? 'bg-primary-600 text-white shadow-lg'
                    : 'text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-700'
                }`}
              >
                <DevicePhoneMobileIcon className="h-5 w-5" />
                <span>iOS</span>
              </button>
            </div>
          </div>
        </motion.div>

        {/* Installation Steps */}
        <div className="max-w-4xl mx-auto mb-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {installationSteps[selectedPlatform].map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white dark:bg-neutral-800 rounded-2xl p-6 border border-neutral-200 dark:border-neutral-700 hover:shadow-lg transition-all duration-200"
              >
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-r from-primary-500 to-secondary-500 text-white rounded-full flex items-center justify-center text-lg font-bold">
                    {step.step}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-neutral-900 dark:text-white mb-2">
                      {step.title}
                    </h3>
                    <p className="text-neutral-600 dark:text-neutral-400 mb-3">
                      {step.description}
                    </p>
                    <p className="text-sm text-neutral-500 dark:text-neutral-500 bg-neutral-50 dark:bg-neutral-700 p-3 rounded-lg">
                      {step.details}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Visual Guide */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mb-16"
        >
          <div className="bg-white dark:bg-neutral-800 rounded-2xl p-8 border border-neutral-200 dark:border-neutral-700">
            <h3 className="text-2xl font-bold text-neutral-900 dark:text-white mb-6 text-center">
              📱 Aperçu de l'Installation
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <ArrowDownTrayIcon className="h-8 w-8 text-white" />
                </div>
                <h4 className="font-semibold text-neutral-900 dark:text-white mb-2">Téléchargement</h4>
                <p className="text-sm text-neutral-600 dark:text-neutral-400">
                  Téléchargez le fichier d'installation
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <ArrowRightIcon className="h-8 w-8 text-white" />
                </div>
                <h4 className="font-semibold text-neutral-900 dark:text-white mb-2">Installation</h4>
                <p className="text-sm text-neutral-600 dark:text-neutral-400">
                  Suivez les instructions à l'écran
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-violet-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircleIcon className="h-8 w-8 text-white" />
                </div>
                <h4 className="font-semibold text-neutral-900 dark:text-white mb-2">Prêt !</h4>
                <p className="text-sm text-neutral-600 dark:text-neutral-400">
                  Lancez l'application et commencez
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Troubleshooting */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-neutral-900 dark:text-white mb-8 text-center">
            🔧 Dépannage
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {troubleshootingTips.map((tip, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white dark:bg-neutral-800 rounded-xl p-6 border border-neutral-200 dark:border-neutral-700"
              >
                <tip.icon className={`h-12 w-12 mx-auto mb-4 ${tip.color}`} />
                <h4 className="font-semibold text-neutral-900 dark:text-white mb-3 text-center">
                  {tip.title}
                </h4>
                <p className="text-sm text-neutral-600 dark:text-neutral-400 text-center">
                  {tip.solution}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Need Help */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-center"
        >
          <div className="bg-gradient-to-r from-secondary-50 to-accent-50 dark:from-secondary-900/20 dark:to-accent-900/20 rounded-2xl p-8 border border-secondary-200 dark:border-secondary-700">
            <h3 className="text-2xl font-bold text-neutral-900 dark:text-white mb-4">
              💡 Besoin d'aide pour l'installation ?
            </h3>
            <p className="text-lg text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto mb-6">
              Notre équipe de support est là pour vous aider si vous rencontrez 
              des difficultés lors de l'installation.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <button className="px-8 py-4 bg-secondary-600 hover:bg-secondary-700 text-white rounded-xl font-semibold transition-colors duration-200">
                Contacter le Support
              </button>
              <button className="px-8 py-4 border-2 border-secondary-600 text-secondary-600 hover:bg-secondary-600 hover:text-white rounded-xl font-semibold transition-all duration-200">
                Voir la FAQ
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
