'use client';

import { motion } from 'framer-motion';
import { 
  CodeBracketIcon,
  PuzzlePieceIcon,
  RocketLaunchIcon,
  CloudArrowUpIcon,
  ShieldCheckIcon,
  CpuChipIcon
} from '@heroicons/react/24/outline';

const integrationTypes = [
  {
    icon: CodeBracketIcon,
    title: 'API REST',
    description: 'Intégration simple via notre API RESTful complète',
    features: [
      'Endpoints JSON standardisés',
      'Authentification sécurisée',
      'Documentation complète',
      'SDK pour plusieurs langages'
    ],
    color: 'from-blue-500 to-indigo-600',
    bgColor: 'from-blue-50 to-indigo-50',
    darkBgColor: 'from-blue-900/20 to-indigo-900/20'
  },
  {
    icon: PuzzlePieceIcon,
    title: 'Widgets Intégrés',
    description: 'Intégrez nos fonctionnalités directement dans votre site',
    features: [
      'Widget de recherche de formations',
      'Calculateur de bourses',
      'Système de recommandations',
      'Interface personnalisable'
    ],
    color: 'from-green-500 to-emerald-600',
    bgColor: 'from-green-50 to-emerald-50',
    darkBgColor: 'from-green-900/20 to-emerald-900/20'
  },
  {
    icon: CloudArrowUpIcon,
    title: 'Import/Export',
    description: 'Synchronisez vos données avec nos systèmes',
    features: [
      'Import CSV/Excel',
      'Export des résultats',
      'Synchronisation automatique',
      'Gestion des conflits'
    ],
    color: 'from-purple-500 to-violet-600',
    bgColor: 'from-purple-50 to-violet-50',
    darkBgColor: 'from-purple-900/20 to-violet-900/20'
  }
];

const sdkLanguages = [
  { name: 'JavaScript', icon: '⚡', color: 'from-yellow-500 to-orange-500' },
  { name: 'Python', icon: '🐍', color: 'from-blue-500 to-cyan-500' },
  { name: 'Java', icon: '☕', color: 'from-orange-500 to-red-500' },
  { name: 'PHP', icon: '🐘', color: 'from-purple-500 to-indigo-500' },
  { name: 'Swift', icon: '🍎', color: 'from-orange-500 to-pink-500' },
  { name: 'Kotlin', icon: '🤖', color: 'from-purple-500 to-blue-500' }
];

const useCases = [
  {
    title: 'Sites Web Éducatifs',
    description: 'Intégrez nos outils dans votre plateforme éducative',
    examples: ['Universités', 'Écoles', 'Centres de formation']
  },
  {
    title: 'Applications Mobiles',
    description: 'Ajoutez nos fonctionnalités à votre app mobile',
    examples: ['Apps éducatives', 'Apps de carrière', 'Apps étudiantes']
  },
  {
    title: 'Systèmes CRM',
    description: 'Connectez votre CRM à nos données d\'orientation',
    examples: ['CRM éducatifs', 'CRM RH', 'CRM étudiants']
  }
];

export function IntegrationSection() {
  return (
    <section className="section-padding bg-white dark:bg-neutral-900">
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
            Intégration{' '}
            <span className="bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
              & API
            </span>
          </h2>
          <p className="text-lg text-neutral-600 dark:text-neutral-400 max-w-3xl mx-auto">
            Intégrez facilement les fonctionnalités de Conseil d'Orientation 
            dans vos propres applications et sites web grâce à nos outils de développement.
          </p>
        </motion.div>

        {/* Integration Types */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {integrationTypes.map((type, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className={`bg-gradient-to-br ${type.bgColor} dark:${type.darkBgColor} rounded-2xl p-8 border border-neutral-200 dark:border-neutral-700 hover:shadow-xl transition-all duration-300`}
            >
              <div className="flex items-start space-x-4 mb-6">
                <div className={`p-4 rounded-xl bg-gradient-to-r ${type.color} text-white`}>
                  <type.icon className="h-8 w-8" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-neutral-900 dark:text-white mb-2">
                    {type.title}
                  </h3>
                  <p className="text-neutral-600 dark:text-neutral-400">
                    {type.description}
                  </p>
                </div>
              </div>
              
              <ul className="space-y-3">
                {type.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-start space-x-3">
                    <div className="flex-shrink-0 w-2 h-2 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full mt-2"></div>
                    <span className="text-neutral-700 dark:text-neutral-300 text-sm">{feature}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* SDK Languages */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-16"
        >
          <h3 className="text-2xl font-bold text-neutral-900 dark:text-white mb-8 text-center">
            🚀 Kits de Développement (SDK)
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {sdkLanguages.map((language, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="text-center p-4 rounded-xl bg-neutral-50 dark:bg-neutral-800 hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-colors duration-200 cursor-pointer group"
              >
                <div className={`w-16 h-16 bg-gradient-to-r ${language.color} rounded-full flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform duration-200`}>
                  <span className="text-2xl">{language.icon}</span>
                </div>
                <p className="font-semibold text-neutral-900 dark:text-white">{language.name}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Use Cases */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mb-16"
        >
          <h3 className="text-2xl font-bold text-neutral-900 dark:text-white mb-8 text-center">
            💼 Cas d'Usage
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {useCases.map((useCase, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-neutral-50 dark:bg-neutral-800 rounded-xl p-6 border border-neutral-200 dark:border-neutral-700"
              >
                <h4 className="font-semibold text-neutral-900 dark:text-white mb-3 text-lg">
                  {useCase.title}
                </h4>
                <p className="text-neutral-600 dark:text-neutral-400 mb-4">
                  {useCase.description}
                </p>
                <div className="space-y-2">
                  {useCase.examples.map((example, exampleIndex) => (
                    <div key={exampleIndex} className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-primary-500 rounded-full"></div>
                      <span className="text-sm text-neutral-700 dark:text-neutral-300">{example}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Technical Features */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mb-16"
        >
          <div className="bg-gradient-to-r from-primary-50 to-accent-50 dark:from-primary-900/20 dark:to-accent-900/20 rounded-2xl p-8 border border-primary-200 dark:border-primary-700">
            <h3 className="text-2xl font-bold text-neutral-900 dark:text-white mb-6 text-center">
              ⚙️ Fonctionnalités Techniques
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <ShieldCheckIcon className="h-8 w-8 text-white" />
                </div>
                <h4 className="font-semibold text-neutral-900 dark:text-white mb-2">
                  Sécurité
                </h4>
                <p className="text-sm text-neutral-600 dark:text-neutral-400">
                  Chiffrement SSL et authentification sécurisée
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CpuChipIcon className="h-8 w-8 text-white" />
                </div>
                <h4 className="font-semibold text-neutral-900 dark:text-white mb-2">
                  Performance
                </h4>
                <p className="text-sm text-neutral-600 dark:text-neutral-400">
                  Temps de réponse &lt; 200ms garanti
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-violet-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <RocketLaunchIcon className="h-8 w-8 text-white" />
                </div>
                <h4 className="font-semibold text-neutral-900 dark:text-white mb-2">
                  Scalabilité
                </h4>
                <p className="text-sm text-neutral-600 dark:text-neutral-400">
                  Support de millions de requêtes
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CloudArrowUpIcon className="h-8 w-8 text-white" />
                </div>
                <h4 className="font-semibold text-neutral-900 dark:text-white mb-2">
                  Disponibilité
                </h4>
                <p className="text-sm text-neutral-600 dark:text-neutral-400">
                  99.9% de temps de fonctionnement
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-center"
        >
          <div className="bg-gradient-to-r from-secondary-50 to-brand-50 dark:from-secondary-900/20 dark:to-brand-900/20 rounded-2xl p-8 border border-secondary-200 dark:border-secondary-700">
            <h3 className="text-2xl font-bold text-neutral-900 dark:text-white mb-4">
              🚀 Prêt à Intégrer ?
            </h3>
            <p className="text-lg text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto mb-6">
              Commencez dès aujourd'hui avec notre documentation complète 
              et notre équipe de support technique dédiée.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <button className="px-8 py-4 bg-secondary-600 hover:bg-secondary-700 text-white rounded-xl font-semibold transition-colors duration-200">
                Voir la Documentation
              </button>
              <button className="px-8 py-4 border-2 border-secondary-600 text-secondary-600 hover:bg-secondary-600 hover:text-white rounded-xl font-semibold transition-all duration-200">
                Contacter l'Équipe Technique
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
