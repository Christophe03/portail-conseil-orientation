'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { Button } from '@/components/ui/Button';
import { 
  DevicePhoneMobileIcon,
  PlayIcon,
  DeviceTabletIcon,
  ComputerDesktopIcon,
  ArrowDownTrayIcon,
  CheckCircleIcon,
  StarIcon
} from '@heroicons/react/24/outline';

const platforms = [
  {
    name: 'Google Play Store',
    icon: PlayIcon,
    description: 'Version officielle Android',
    buttonText: 'Télécharger sur Google Play',
    buttonVariant: 'primary' as const,
    link: 'https://play.google.com/store/apps/details?id=com.tcd.conseil_orientation',
    features: ['Mises à jour automatiques', 'Sécurité Google Play', 'Support officiel'],
    delay: 0.1,
  },
  {
    name: 'App Store',
    icon: DeviceTabletIcon,
    description: 'Version officielle iOS',
    buttonText: 'Télécharger sur App Store',
    buttonVariant: 'primary' as const,
    link: 'https://apps.apple.com/app/conseil-orientation/id1234567890',
    features: ['Optimisé pour iOS', 'iCloud Sync', 'Support Apple'],
    delay: 0.2,
  },
  {
    name: 'APKPure',
    icon: ComputerDesktopIcon,
    description: 'Installation manuelle Android via APKPure',
    buttonText: 'Télécharger via APKPure',
    buttonVariant: 'outline' as const,
    link: 'https://apkpure.com/p/com.tcd.conseil_orientation',
    features: ['Source fiable', 'Version à jour', 'Installation hors store'],
    delay: 0.3,
  },
];

const requirements = [
  { platform: 'Android', minVersion: '6.0 (API 23)', ram: '2 GB', storage: '100 MB', connection: 'Internet' },
  { platform: 'iOS', minVersion: '12.0', ram: '2 GB', storage: '100 MB', connection: 'Internet' },
  { platform: 'APK', minVersion: '6.0 (API 23)', ram: '2 GB', storage: '80 MB', connection: 'Internet' },
];

const stats = [
  { label: 'Téléchargements', value: '50K+', color: 'text-primary-600' },
  { label: 'Note Moyenne', value: '4.8★', color: 'text-accent-600' },
  { label: 'Utilisateurs Actifs', value: '25K+', color: 'text-secondary-600' },
];

export function DownloadSection() {
  return (
    <section id="download" className="section-padding bg-gradient-to-br from-neutral-50 to-primary-50 dark:from-neutral-800 dark:to-neutral-900">
      <div className="container-custom">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          {/* Logo Section */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex justify-center mb-8"
          >
            <div className="relative w-24 h-24 md:w-32 md:h-32">
              <Image
                src="/app_icon.png"
                alt="Conseil d'Orientation"
                fill
                className="object-contain drop-shadow-xl"
                priority
              />
            </div>
          </motion.div>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-neutral-900 dark:text-white mb-6">
            Téléchargez{' '}
            <span className="bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
              Maintenant
            </span>
          </h2>
          <p className="text-xl text-neutral-600 dark:text-neutral-400 max-w-3xl mx-auto">
            Disponible sur toutes les plateformes. Choisissez votre méthode de téléchargement 
            préférée et commencez votre voyage vers la réussite.
          </p>
        </motion.div>

        {/* Platform Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {platforms.map((platform, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: platform.delay }}
              whileHover={{ y: -8 }}
              className="card-hover p-8 text-center"
            >
              {/* Platform Icon */}
              <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-2xl mb-6">
                <platform.icon className="h-10 w-10 text-white" />
              </div>

              {/* Platform Info */}
              <h3 className="text-2xl font-bold text-neutral-900 dark:text-white mb-2">
                {platform.name}
              </h3>
              <p className="text-neutral-600 dark:text-neutral-400 mb-6">
                {platform.description}
              </p>

              {/* Download Button */}
              <Button
                variant={platform.buttonVariant}
                size="lg"
                className="w-full mb-6"
                asChild
              >
                <a href={platform.link} target="_blank" rel="noopener noreferrer">
                  <ArrowDownTrayIcon className="h-5 w-5 mr-2" />
                  {platform.buttonText}
                </a>
              </Button>

              {/* Features */}
              <ul className="space-y-2 text-left">
                {platform.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center space-x-2 text-sm text-neutral-600 dark:text-neutral-400">
                    <CheckCircleIcon className="h-4 w-4 text-green-500 flex-shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="text-center mb-16"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className={`text-4xl md:text-5xl font-bold ${stat.color} mb-2`}>
                  {stat.value}
                </div>
                <div className="text-neutral-600 dark:text-neutral-400 text-lg">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* System Requirements */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="mb-16"
        >
          <div className="bg-white dark:bg-neutral-800 rounded-2xl p-8 shadow-soft">
            <h3 className="text-2xl font-bold text-neutral-900 dark:text-white text-center mb-8">
              Prérequis Système
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-neutral-200 dark:border-neutral-700">
                    <th className="text-left py-4 px-4 font-semibold text-neutral-900 dark:text-white">Plateforme</th>
                    <th className="text-left py-4 px-4 font-semibold text-neutral-900 dark:text-white">Version Min.</th>
                    <th className="text-left py-4 px-4 font-semibold text-neutral-900 dark:text-white">RAM</th>
                    <th className="text-left py-4 px-4 font-semibold text-neutral-900 dark:text-white">Stockage</th>
                    <th className="text-left py-4 px-4 font-semibold text-neutral-900 dark:text-white">Connexion</th>
                  </tr>
                </thead>
                <tbody>
                  {requirements.map((req, index) => (
                    <tr key={index} className="border-b border-neutral-100 dark:border-neutral-700">
                      <td className="py-4 px-4 font-medium text-neutral-900 dark:text-white">{req.platform}</td>
                      <td className="py-4 px-4 text-neutral-600 dark:text-neutral-400">{req.minVersion}</td>
                      <td className="py-4 px-4 text-neutral-600 dark:text-neutral-400">{req.ram}</td>
                      <td className="py-4 px-4 text-neutral-600 dark:text-neutral-400">{req.storage}</td>
                      <td className="py-4 px-4 text-neutral-600 dark:text-neutral-400">{req.connection}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </motion.div>

        {/* Installation Guide */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="text-center"
        >
          <div className="bg-gradient-to-r from-primary-50 to-secondary-50 dark:from-neutral-800 dark:to-neutral-700 rounded-2xl p-8 md:p-12">
            <h3 className="text-2xl md:text-3xl font-bold text-neutral-900 dark:text-white mb-4">
              Installation Simple et Rapide
            </h3>
            <p className="text-lg text-neutral-600 dark:text-neutral-400 mb-8 max-w-2xl mx-auto">
              Suivez nos guides d'installation étape par étape pour commencer 
              à utiliser l'application en quelques minutes.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="outline" size="lg">
                Guide d'Installation
              </Button>
              <Button size="lg">
                Support Technique
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
