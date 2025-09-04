'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { 
  WrenchScrewdriverIcon,
  ExclamationTriangleIcon,
  CheckCircleIcon,
  InformationCircleIcon,
  MagnifyingGlassIcon
} from '@heroicons/react/24/outline';

const commonIssues = [
  {
    category: 'Connexion',
    issues: [
      {
        problem: 'Impossible de se connecter à l\'application',
        solution: 'Vérifiez votre connexion internet et redémarrez l\'application. Si le problème persiste, essayez de vous déconnecter et reconnecter.',
        steps: [
          'Vérifiez votre connexion internet',
          'Fermez complètement l\'application',
          'Rouvrez l\'application',
          'Essayez de vous reconnecter'
        ]
      },
      {
        problem: 'Erreur "Session expirée"',
        solution: 'Votre session a expiré. Connectez-vous à nouveau avec vos identifiants.',
        steps: [
          'Tapez votre email',
          'Tapez votre mot de passe',
          'Cliquez sur "Se connecter"'
        ]
      }
    ]
  },
  {
    category: 'Fonctionnalités',
    issues: [
      {
        problem: 'Les recommandations ne se chargent pas',
        solution: 'Assurez-vous d\'avoir complété votre profil et vos préférences. Videz le cache de l\'application si nécessaire.',
        steps: [
          'Vérifiez que votre profil est complet',
          'Vérifiez vos préférences',
          'Videz le cache de l\'application',
          'Redémarrez l\'application'
        ]
      },
      {
        problem: 'Impossible de télécharger des documents',
        solution: 'Vérifiez l\'espace de stockage de votre appareil et les permissions de l\'application.',
        steps: [
          'Vérifiez l\'espace disponible',
          'Vérifiez les permissions de stockage',
          'Essayez de télécharger à nouveau'
        ]
      }
    ]
  },
  {
    category: 'Performance',
    issues: [
      {
        problem: 'L\'application est lente',
        solution: 'Fermez les autres applications en arrière-plan et redémarrez votre appareil si nécessaire.',
        steps: [
          'Fermez les applications inutiles',
          'Videz le cache de l\'application',
          'Redémarrez votre appareil',
          'Vérifiez les mises à jour'
        ]
      },
      {
        problem: 'L\'application se ferme soudainement',
        solution: 'Ce problème peut être causé par un manque de mémoire ou une version obsolète. Mettez à jour l\'application.',
        steps: [
          'Vérifiez les mises à jour disponibles',
          'Redémarrez votre appareil',
          'Réinstallez l\'application si nécessaire'
        ]
      }
    ]
  }
];

const quickFixes = [
  {
    icon: CheckCircleIcon,
    title: 'Redémarrer l\'application',
    description: 'Fermez complètement l\'application et rouvrez-la',
    color: 'text-green-600'
  },
  {
    icon: CheckCircleIcon,
    title: 'Vider le cache',
    description: 'Supprimez les données temporaires de l\'application',
    color: 'text-blue-600'
  },
  {
    icon: CheckCircleIcon,
    title: 'Vérifier la connexion',
    description: 'Assurez-vous d\'avoir une connexion internet stable',
    color: 'text-purple-600'
  },
  {
    icon: CheckCircleIcon,
    title: 'Mettre à jour',
    description: 'Installez la dernière version de l\'application',
    color: 'text-orange-600'
  }
];

export function Troubleshooting() {
  const [selectedCategory, setSelectedCategory] = useState(0);
  const [expandedIssues, setExpandedIssues] = useState<number[]>([]);

  const toggleIssue = (issueIndex: number) => {
    setExpandedIssues(prev => 
      prev.includes(issueIndex) 
        ? prev.filter(i => i !== issueIndex)
        : [...prev, issueIndex]
    );
  };

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
          <div className="flex justify-center mb-6">
            <div className="p-4 bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl">
              <WrenchScrewdriverIcon className="h-12 w-12 text-white" />
            </div>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-neutral-900 dark:text-white mb-6">
            Résolution de{' '}
            <span className="bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
              Problèmes
            </span>
          </h2>
          <p className="text-lg text-neutral-600 dark:text-neutral-400 max-w-3xl mx-auto">
            Trouvez rapidement des solutions aux problèmes les plus courants. 
            Si vous ne trouvez pas de solution, notre équipe de support est là pour vous aider.
          </p>
        </motion.div>

        {/* Quick Fixes */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-16"
        >
          <h3 className="text-2xl font-bold text-neutral-900 dark:text-white mb-8 text-center">
            🔧 Solutions Rapides
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {quickFixes.map((fix, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center p-6 bg-neutral-50 dark:bg-neutral-800 rounded-xl border border-neutral-200 dark:border-neutral-700 hover:shadow-lg transition-all duration-200"
              >
                <fix.icon className={`h-12 w-12 mx-auto mb-4 ${fix.color}`} />
                <h4 className="font-semibold text-neutral-900 dark:text-white mb-2">
                  {fix.title}
                </h4>
                <p className="text-sm text-neutral-600 dark:text-neutral-400">
                  {fix.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mb-12"
        >
          <div className="max-w-2xl mx-auto">
            <div className="relative">
              <MagnifyingGlassIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-neutral-400" />
              <input
                type="text"
                placeholder="Rechercher un problème spécifique..."
                className="w-full pl-12 pr-4 py-4 bg-white dark:bg-neutral-800 border-2 border-neutral-200 dark:border-neutral-700 rounded-xl focus:border-primary-500 focus:outline-none transition-colors duration-200"
              />
            </div>
          </div>
        </motion.div>

        {/* Category Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mb-8"
        >
          <div className="flex flex-wrap justify-center gap-2">
            {commonIssues.map((category, index) => (
              <button
                key={index}
                onClick={() => setSelectedCategory(index)}
                className={`px-6 py-3 rounded-xl font-semibold transition-all duration-200 ${
                  selectedCategory === index
                    ? 'bg-primary-600 text-white shadow-lg'
                    : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-700'
                }`}
              >
                {category.category}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Issues List */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="max-w-4xl mx-auto"
        >
          <div className="space-y-4">
            {commonIssues[selectedCategory].issues.map((issue, issueIndex) => (
              <motion.div
                key={issueIndex}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: issueIndex * 0.1 }}
                className="bg-white dark:bg-neutral-800 rounded-xl border border-neutral-200 dark:border-neutral-700 overflow-hidden"
              >
                <button
                  onClick={() => toggleIssue(issueIndex)}
                  className="w-full p-6 text-left hover:bg-neutral-50 dark:hover:bg-neutral-700 transition-colors duration-200"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-start space-x-4">
                      <ExclamationTriangleIcon className="h-6 w-6 text-orange-500 flex-shrink-0 mt-1" />
                      <div>
                        <h4 className="font-semibold text-neutral-900 dark:text-white mb-2">
                          {issue.problem}
                        </h4>
                        <p className="text-neutral-600 dark:text-neutral-400">
                          {issue.solution}
                        </p>
                      </div>
                    </div>
                    <div className={`transform transition-transform duration-200 ${
                      expandedIssues.includes(issueIndex) ? 'rotate-180' : ''
                    }`}>
                      <svg className="h-5 w-5 text-neutral-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>
                </button>
                
                {expandedIssues.includes(issueIndex) && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="px-6 pb-6 border-t border-neutral-200 dark:border-neutral-700"
                  >
                    <div className="pt-4">
                      <h5 className="font-semibold text-neutral-900 dark:text-white mb-3 flex items-center">
                        <InformationCircleIcon className="h-5 w-5 text-blue-500 mr-2" />
                        Étapes de résolution
                      </h5>
                      <ol className="space-y-2">
                        {issue.steps.map((step, stepIndex) => (
                          <li key={stepIndex} className="flex items-start space-x-3">
                            <span className="flex-shrink-0 w-6 h-6 bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 rounded-full flex items-center justify-center text-sm font-semibold">
                              {stepIndex + 1}
                            </span>
                            <span className="text-neutral-700 dark:text-neutral-300">{step}</span>
                          </li>
                        ))}
                      </ol>
                    </div>
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Contact Support */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 1.0 }}
          className="mt-16 text-center"
        >
          <div className="bg-gradient-to-r from-primary-50 to-accent-50 dark:from-primary-900/20 dark:to-accent-900/20 rounded-2xl p-8 border border-primary-200 dark:border-primary-700">
            <h3 className="text-2xl font-bold text-neutral-900 dark:text-white mb-4">
              💬 Besoin d'aide supplémentaire ?
            </h3>
            <p className="text-lg text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto mb-6">
              Si vous n'avez pas trouvé de solution à votre problème, 
              notre équipe de support est là pour vous aider.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <button className="px-8 py-4 bg-primary-600 hover:bg-primary-700 text-white rounded-xl font-semibold transition-colors duration-200">
                Contacter le Support
              </button>
              <button className="px-8 py-4 border-2 border-primary-600 text-primary-600 hover:bg-primary-600 hover:text-white rounded-xl font-semibold transition-all duration-200">
                Ouvrir un Ticket
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
