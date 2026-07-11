'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  RocketLaunchIcon,
  DevicePhoneMobileIcon,
  UserIcon,
  LightBulbIcon,
  CheckCircleIcon
} from '@heroicons/react/24/outline';

const steps = [
  {
    icon: DevicePhoneMobileIcon,
    title: '1. Téléchargement',
    description: 'Téléchargez l\'application Android depuis APKPure.',
    details: [
      'Android : APKPure (Android 6.0+)',
      'Version stable et à jour',
      'Installation hors store officiel',
      'Source fiable et sécurisée'
    ],
    color: 'text-blue-600',
    bgColor: 'bg-blue-100 dark:bg-blue-900/30'
  },
  {
    icon: UserIcon,
    title: '2. Découverte des Universités',
    description: 'Explorez les universités privées et publiques du Mali.',
    details: [
      'Liste complète des universités privées',
      'Recherche par série du baccalauréat',
      'Informations détaillées de chaque établissement',
      'Contact et localisation des universités'
    ],
    color: 'text-green-600',
    bgColor: 'bg-green-100 dark:bg-green-900/30'
  },
  {
    icon: LightBulbIcon,
    title: '3. Recherche par Série',
    description: 'Trouvez les universités qui correspondent à votre série du BAC.',
    details: [
      'Sélection de votre série (TSE, TSS, TLL, etc.)',
      'Liste des universités compatibles',
      'Facultés et licences disponibles',
      'Débouchés professionnels détaillés'
    ],
    color: 'text-purple-600',
    bgColor: 'bg-purple-100 dark:bg-purple-900/30'
  },
  {
    icon: CheckCircleIcon,
    title: '4. Orientation Post-BAC',
    description: 'Découvrez les parcours possibles après l\'obtention du baccalauréat.',
    details: [
      'Guide complet par série',
      'Conseils d\'orientation personnalisés',
      'Étapes clés pour votre réussite',
      'Ressources éducatives adaptées'
    ],
    color: 'text-orange-600',
    bgColor: 'bg-orange-100 dark:bg-orange-900/30'
  }
];

const tips = [
  'Explorez toutes les universités privées du Mali pour avoir une vue d\'ensemble complète',
  'Utilisez la recherche par série pour trouver les établissements les plus adaptés à votre profil',
  'Consultez les détails de chaque université (contact, localisation, site web) avant de postuler',
  'Découvrez les débouchés professionnels de chaque formation pour faire un choix éclairé'
];

export function QuickStartGuide() {
  return (
    <section id="first-steps" className="mb-16">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="mb-12"
      >
        <div className="flex items-center space-x-3 mb-6">
          <RocketLaunchIcon className="h-8 w-8 text-secondary-600" />
          <h2 className="text-3xl font-bold text-neutral-900 dark:text-white">
            Guide de Démarrage Rapide
          </h2>
        </div>
        <p className="text-lg text-neutral-600 dark:text-neutral-400 max-w-3xl">
          Prêt à découvrir les universités du Mali ? Suivez ce guide en 4 étapes 
          pour utiliser l'application Conseil d'Orientation et trouver votre voie.
        </p>
      </motion.div>

      {/* Steps Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        {steps.map((step, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            className="bg-white dark:bg-neutral-800 rounded-2xl p-6 border border-neutral-200 dark:border-neutral-700 shadow-soft"
          >
            {/* Step Header */}
            <div className="flex items-center space-x-4 mb-4">
              <div className={`w-12 h-12 ${step.bgColor} rounded-xl flex items-center justify-center`}>
                <step.icon className={`h-6 w-6 ${step.color}`} />
              </div>
              <div>
                <h3 className="text-xl font-bold text-neutral-900 dark:text-white">
                  {step.title}
                </h3>
                <p className="text-neutral-600 dark:text-neutral-400">
                  {step.description}
                </p>
              </div>
            </div>

            {/* Step Details */}
            <ul className="space-y-2">
              {step.details.map((detail, detailIndex) => (
                <li key={detailIndex} className="flex items-start space-x-2 text-sm text-neutral-600 dark:text-neutral-400">
                  <CheckCircleIcon className="h-4 w-4 text-green-500 flex-shrink-0 mt-0.5" />
                  <span>{detail}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>

      {/* Tips Section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="bg-gradient-to-r from-accent-50 to-warning-50 dark:from-accent-900/20 dark:to-warning-900/20 rounded-2xl p-8 border border-accent-200 dark:border-accent-700"
      >
        <h3 className="text-2xl font-bold text-neutral-900 dark:text-white mb-6">
          💡 Conseils pour un Démarrage Réussi
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {tips.map((tip, index) => (
            <div key={index} className="flex items-start space-x-3">
              <LightBulbIcon className="h-5 w-5 text-accent-500 flex-shrink-0 mt-0.5" />
              <span className="text-neutral-700 dark:text-neutral-300">{tip}</span>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Next Steps */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.6 }}
        className="mt-12 text-center"
      >
        <h3 className="text-2xl font-bold text-neutral-900 dark:text-white mb-4">
          Prêt pour la Suite ?
        </h3>
        <p className="text-lg text-neutral-600 dark:text-neutral-400 mb-6">
          Maintenant que vous connaissez les bases, explorez nos guides détaillés 
          pour découvrir toutes les fonctionnalités de l'application.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link href="/universites" className="px-6 py-3 bg-secondary-600 hover:bg-secondary-700 text-white rounded-xl font-semibold transition-colors duration-200">
            Guide des Universités
          </Link>
          <Link href="/universites/series" className="px-6 py-3 border-2 border-secondary-600 text-secondary-600 hover:bg-secondary-600 hover:text-white rounded-xl font-semibold transition-all duration-200">
            Recherche par Série
          </Link>
        </div>
      </motion.div>
    </section>
  );
}
