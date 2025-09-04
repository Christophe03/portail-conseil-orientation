'use client';

import { motion } from 'framer-motion';
import { 
  SparklesIcon,
  AcademicCapIcon,
  ChartBarIcon,
  GlobeAltIcon,
  UserGroupIcon,
  ShieldCheckIcon,
  DevicePhoneMobileIcon,
  LightBulbIcon
} from '@heroicons/react/24/outline';

const mainFeatures = [
  {
    icon: SparklesIcon,
    title: 'Intelligence Artificielle Avancée',
    description: 'Algorithme d\'IA qui analyse votre profil et vous propose des parcours personnalisés',
    benefits: [
      'Analyse de personnalité approfondie',
      'Recommandations basées sur vos intérêts',
      'Apprentissage continu pour des suggestions plus précises',
      'Prédiction de réussite dans différents domaines'
    ],
    color: 'from-purple-500 to-indigo-600',
    bgColor: 'from-purple-50 to-indigo-50',
    darkBgColor: 'from-purple-900/20 to-indigo-900/20'
  },
  {
    icon: AcademicCapIcon,
    title: 'Base de Données Complète',
    description: 'Accès à des milliers de formations, universités et opportunités dans le monde entier',
    benefits: [
      'Plus de 50 000 formations répertoriées',
      'Universités de plus de 100 pays',
      'Informations sur les coûts et la durée',
      'Critères d\'admission détaillés'
    ],
    color: 'from-blue-500 to-cyan-600',
    bgColor: 'from-blue-50 to-cyan-50',
    darkBgColor: 'from-blue-900/20 to-cyan-900/20'
  },
  {
    icon: ChartBarIcon,
    title: 'Analyse de Marché du Travail',
    description: 'Données en temps réel sur les perspectives d\'emploi et les salaires',
    benefits: [
      'Tendances du marché du travail',
      'Salaires moyens par secteur',
      'Évolution des métiers',
      'Prévisions d\'emploi à 5 ans'
    ],
    color: 'from-green-500 to-emerald-600',
    bgColor: 'from-green-50 to-emerald-50',
    darkBgColor: 'from-green-900/20 to-emerald-900/20'
  },
  {
    icon: GlobeAltIcon,
    title: 'Recherche de Bourses',
    description: 'Système intelligent de recherche et de candidature aux bourses d\'études',
    benefits: [
      'Base de données de plus de 10 000 bourses',
      'Filtres personnalisés selon votre profil',
      'Assistant de candidature automatisé',
      'Suivi des demandes en temps réel'
    ],
    color: 'from-orange-500 to-red-600',
    bgColor: 'from-orange-50 to-red-50',
    darkBgColor: 'from-orange-900/20 to-red-900/20'
  }
];

const additionalFeatures = [
  {
    icon: UserGroupIcon,
    title: 'Communauté Étudiante',
    description: 'Connectez-vous avec d\'autres étudiants partageant vos intérêts'
  },
  {
    icon: ShieldCheckIcon,
    title: 'Sécurité des Données',
    description: 'Vos informations personnelles sont protégées et sécurisées'
  },
  {
    icon: DevicePhoneMobileIcon,
    title: 'Application Mobile',
    description: 'Accédez à toutes les fonctionnalités depuis votre smartphone'
  },
  {
    icon: LightBulbIcon,
    title: 'Conseils Personnalisés',
    description: 'Recevez des conseils adaptés à votre situation et vos objectifs'
  }
];

export function FeaturesSection() {
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
            Fonctionnalités{' '}
            <span className="bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
              Principales
            </span>
          </h2>
          <p className="text-lg text-neutral-600 dark:text-neutral-400 max-w-3xl mx-auto">
            Découvrez les outils révolutionnaires qui font de Conseil d'Orientation 
            votre compagnon indispensable pour réussir votre parcours académique et professionnel.
          </p>
        </motion.div>

        {/* Main Features Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {mainFeatures.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className={`bg-gradient-to-br ${feature.bgColor} dark:${feature.darkBgColor} rounded-2xl p-8 border border-neutral-200 dark:border-neutral-700 hover:shadow-xl transition-all duration-300`}
            >
              <div className="flex items-start space-x-4 mb-6">
                <div className={`p-4 rounded-xl bg-gradient-to-r ${feature.color} text-white`}>
                  <feature.icon className="h-8 w-8" />
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-neutral-900 dark:text-white mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-neutral-600 dark:text-neutral-400 text-lg">
                    {feature.description}
                  </p>
                </div>
              </div>
              
              <div className="space-y-3">
                <h4 className="font-semibold text-neutral-900 dark:text-white text-lg">
                  Avantages clés :
                </h4>
                <ul className="space-y-2">
                  {feature.benefits.map((benefit, benefitIndex) => (
                    <li key={benefitIndex} className="flex items-start space-x-3">
                      <div className="flex-shrink-0 w-2 h-2 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full mt-2"></div>
                      <span className="text-neutral-700 dark:text-neutral-300">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Additional Features */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mb-16"
        >
          <h3 className="text-2xl font-bold text-neutral-900 dark:text-white mb-8 text-center">
            ✨ Autres Fonctionnalités
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {additionalFeatures.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center p-6 bg-neutral-50 dark:bg-neutral-800 rounded-xl border border-neutral-200 dark:border-neutral-700 hover:shadow-lg transition-all duration-200"
              >
                <feature.icon className="h-12 w-12 mx-auto mb-4 text-primary-600" />
                <h4 className="font-semibold text-neutral-900 dark:text-white mb-2">
                  {feature.title}
                </h4>
                <p className="text-sm text-neutral-600 dark:text-neutral-400">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Feature Highlights */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="bg-gradient-to-r from-primary-50 to-brand-50 dark:from-primary-900/20 dark:to-brand-900/20 rounded-2xl p-8 border border-primary-200 dark:border-primary-700"
        >
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-neutral-900 dark:text-white mb-4">
              🚀 Pourquoi Choisir Conseil d'Orientation ?
            </h3>
            <p className="text-lg text-neutral-600 dark:text-neutral-400 max-w-3xl mx-auto">
              Notre application combine technologie de pointe et expertise humaine 
              pour vous offrir une expérience d'orientation inégalée.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-primary-500 to-primary-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-white">95%</span>
              </div>
              <h4 className="font-semibold text-neutral-900 dark:text-white mb-2">
                Taux de Satisfaction
              </h4>
              <p className="text-sm text-neutral-600 dark:text-neutral-400">
                Des utilisateurs satisfaits de nos recommandations
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-brand-500 to-brand-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-white">50k+</span>
              </div>
              <h4 className="font-semibold text-neutral-900 dark:text-white mb-2">
                Formations Répertoriées
              </h4>
              <p className="text-sm text-neutral-600 dark:text-neutral-400">
                Dans plus de 100 pays à travers le monde
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-secondary-500 to-secondary-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-white">24/7</span>
              </div>
              <h4 className="font-semibold text-neutral-900 dark:text-white mb-2">
                Support Disponible
              </h4>
              <p className="text-sm text-neutral-600 dark:text-neutral-400">
                Assistance technique et conseils personnalisés
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
