'use client';

import { motion } from 'framer-motion';
import { 
  CheckIcon,
  XMarkIcon,
  StarIcon
} from '@heroicons/react/24/solid';

const features = [
  'Intelligence Artificielle',
  'Base de données complète',
  'Recherche de bourses',
  'Analyse du marché du travail',
  'Support multilingue',
  'Application mobile',
  'Conseils personnalisés',
  'Communauté étudiante',
  'Sécurité des données',
  'Mises à jour régulières'
];

const plans = [
  {
    name: 'Gratuit',
    price: '0€',
    period: 'pour toujours',
    description: 'Accès aux fonctionnalités de base',
    features: [true, true, false, false, false, true, false, false, true, true],
    popular: false,
    color: 'from-neutral-500 to-neutral-600',
    bgColor: 'from-neutral-50 to-neutral-100',
    darkBgColor: 'from-neutral-800 to-neutral-700'
  },
  {
    name: 'Premium',
    price: '9.99€',
    period: 'par mois',
    description: 'Accès complet à toutes les fonctionnalités',
    features: [true, true, true, true, true, true, true, true, true, true],
    popular: true,
    color: 'from-primary-500 to-primary-600',
    bgColor: 'from-primary-50 to-primary-100',
    darkBgColor: 'from-primary-900/20 to-primary-800/20'
  },
  {
    name: 'Étudiant',
    price: '4.99€',
    period: 'par mois',
    description: 'Tarif réduit pour les étudiants',
    features: [true, true, true, true, false, true, true, false, true, true],
    popular: false,
    color: 'from-secondary-500 to-secondary-600',
    bgColor: 'from-secondary-50 to-secondary-100',
    darkBgColor: 'from-secondary-900/20 to-secondary-800/20'
  }
];

export function ComparisonTable() {
  return (
    <section className="section-padding bg-gradient-to-br from-neutral-50 to-secondary-50 dark:from-neutral-800 dark:to-neutral-900">
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
            Comparaison des{' '}
            <span className="bg-gradient-to-r from-secondary-600 to-primary-600 bg-clip-text text-transparent">
              Formules
            </span>
          </h2>
          <p className="text-lg text-neutral-600 dark:text-neutral-400 max-w-3xl mx-auto">
            Choisissez la formule qui correspond le mieux à vos besoins. 
            Toutes nos formules incluent un essai gratuit de 7 jours.
          </p>
        </motion.div>

        {/* Plans Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className={`relative bg-gradient-to-br ${plan.bgColor} dark:${plan.darkBgColor} rounded-2xl p-8 border-2 ${
                plan.popular 
                  ? 'border-primary-500 shadow-2xl scale-105' 
                  : 'border-neutral-200 dark:border-neutral-700'
              } hover:shadow-xl transition-all duration-300`}
            >
              {/* Popular Badge */}
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="bg-gradient-to-r from-primary-500 to-primary-600 text-white px-6 py-2 rounded-full text-sm font-semibold flex items-center space-x-1">
                    <StarIcon className="h-4 w-4" />
                    <span>Populaire</span>
                  </div>
                </div>
              )}

              {/* Plan Header */}
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-neutral-900 dark:text-white mb-2">
                  {plan.name}
                </h3>
                <div className="mb-4">
                  <span className="text-4xl font-bold text-neutral-900 dark:text-white">
                    {plan.price}
                  </span>
                  <span className="text-neutral-600 dark:text-neutral-400 ml-2">
                    {plan.period}
                  </span>
                </div>
                <p className="text-neutral-600 dark:text-neutral-400">
                  {plan.description}
                </p>
              </div>

              {/* Features List */}
              <div className="space-y-4 mb-8">
                {features.map((feature, featureIndex) => (
                  <div key={featureIndex} className="flex items-center space-x-3">
                    {plan.features[featureIndex] ? (
                      <CheckIcon className="h-5 w-5 text-green-500 flex-shrink-0" />
                    ) : (
                      <XMarkIcon className="h-5 w-5 text-red-500 flex-shrink-0" />
                    )}
                    <span className={`text-sm ${
                      plan.features[featureIndex] 
                        ? 'text-neutral-700 dark:text-neutral-300' 
                        : 'text-neutral-400 dark:text-neutral-500'
                    }`}>
                      {feature}
                    </span>
                  </div>
                ))}
              </div>

              {/* CTA Button */}
              <button className={`w-full py-4 px-6 bg-gradient-to-r ${plan.color} text-white rounded-xl font-semibold hover:shadow-lg transition-all duration-200 transform hover:scale-105`}>
                {plan.popular ? 'Commencer l\'essai gratuit' : 'Choisir ce plan'}
              </button>
            </motion.div>
          ))}
        </div>

        {/* Additional Info */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-center"
        >
          <div className="bg-white dark:bg-neutral-800 rounded-2xl p-8 border border-neutral-200 dark:border-neutral-700">
            <h3 className="text-2xl font-bold text-neutral-900 dark:text-white mb-6">
              💡 Questions sur nos formules ?
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🔄</span>
                </div>
                <h4 className="font-semibold text-neutral-900 dark:text-white mb-2">
                  Changement de plan
                </h4>
                <p className="text-sm text-neutral-600 dark:text-neutral-400">
                  Changez de plan à tout moment sans frais supplémentaires
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">💰</span>
                </div>
                <h4 className="font-semibold text-neutral-900 dark:text-white mb-2">
                  Remboursement
                </h4>
                <p className="text-sm text-neutral-600 dark:text-neutral-400">
                  Remboursement sous 30 jours si vous n'êtes pas satisfait
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-violet-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🎓</span>
                </div>
                <h4 className="font-semibold text-neutral-900 dark:text-white mb-2">
                  Tarif étudiant
                </h4>
                <p className="text-sm text-neutral-600 dark:text-neutral-400">
                  Réduction de 50% pour tous les étudiants avec justificatif
                </p>
              </div>
            </div>
            
            <div className="flex flex-wrap justify-center gap-4">
              <button className="px-8 py-4 bg-primary-600 hover:bg-primary-700 text-white rounded-xl font-semibold transition-colors duration-200">
                Contacter les Ventes
              </button>
              <button className="px-8 py-4 border-2 border-primary-600 text-primary-600 hover:bg-primary-600 hover:text-white rounded-xl font-semibold transition-all duration-200">
                Voir la FAQ
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
