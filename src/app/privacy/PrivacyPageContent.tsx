'use client';

import { motion } from 'framer-motion';
import { 
  ShieldCheckIcon,
  EyeIcon,
  LockClosedIcon,
  DocumentTextIcon,
  CalendarIcon,
  PhoneIcon,
  EnvelopeIcon
} from '@heroicons/react/24/outline';

const privacySections = [
  {
    icon: EyeIcon,
    title: 'Collecte des Données',
    description: 'Nous collectons uniquement les données nécessaires pour vous fournir nos services d\'orientation.',
    details: [
      'Informations de profil (nom, âge, niveau d\'études)',
      'Préférences et intérêts académiques',
      'Historique des recherches et interactions',
      'Données de performance et résultats de tests'
    ]
  },
  {
    icon: LockClosedIcon,
    title: 'Protection des Données',
    description: 'Vos données sont protégées par un chiffrement de niveau bancaire et des protocoles de sécurité avancés.',
    details: [
      'Chiffrement AES-256 pour toutes les données sensibles',
      'Authentification à deux facteurs disponible',
      'Audits de sécurité réguliers',
      'Conformité RGPD et standards internationaux'
    ]
  },
  {
    icon: DocumentTextIcon,
    title: 'Utilisation des Données',
    description: 'Nous utilisons vos données uniquement pour améliorer votre expérience d\'orientation.',
    details: [
      'Personnalisation des recommandations',
      'Amélioration de nos algorithmes d\'IA',
      'Communication de nouvelles opportunités',
      'Statistiques anonymisées pour la recherche'
    ]
  },
  {
    icon: ShieldCheckIcon,
    title: 'Partage des Données',
    description: 'Nous ne partageons jamais vos données personnelles avec des tiers sans votre consentement explicite.',
    details: [
      'Aucune vente de données à des tiers',
      'Partage uniquement avec votre autorisation',
      'Partenaires de confiance avec accords stricts',
      'Transparence totale sur l\'utilisation'
    ]
  }
];

const dataRights = [
  {
    title: 'Droit d\'Accès',
    description: 'Vous pouvez consulter toutes vos données personnelles à tout moment.'
  },
  {
    title: 'Droit de Rectification',
    description: 'Vous pouvez corriger ou mettre à jour vos informations personnelles.'
  },
  {
    title: 'Droit à l\'Effacement',
    description: 'Vous pouvez demander la suppression de vos données personnelles.'
  },
  {
    title: 'Droit à la Portabilité',
    description: 'Vous pouvez exporter vos données dans un format lisible.'
  },
  {
    title: 'Droit d\'Opposition',
    description: 'Vous pouvez vous opposer au traitement de vos données.'
  },
  {
    title: 'Droit de Limitation',
    description: 'Vous pouvez limiter l\'utilisation de vos données personnelles.'
  }
];

const dataRetention = [
  {
    period: 'Données de Profil',
    duration: '3 ans après la dernière activité',
    reason: 'Pour maintenir la continuité de votre parcours d\'orientation'
  },
  {
    period: 'Historique des Recherches',
    duration: '2 ans',
    reason: 'Pour améliorer nos recommandations personnalisées'
  },
  {
    period: 'Données de Performance',
    duration: '5 ans',
    reason: 'Pour l\'analyse des tendances et l\'amélioration des algorithmes'
  },
  {
    period: 'Communications',
    duration: '1 an',
    reason: 'Pour le suivi du support client et la résolution des problèmes'
  }
];

export function PrivacyPageContent() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-neutral-50 to-primary-50 dark:from-neutral-900 dark:to-neutral-800">
      {/* Hero Section */}
      <section className="section-padding">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-2xl mb-8">
              <ShieldCheckIcon className="h-10 w-10 text-white" />
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-neutral-900 dark:text-white mb-6">
              Politique de{' '}
              <span className="bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
                Confidentialité
              </span>
            </h1>
            
            <p className="text-xl text-neutral-600 dark:text-neutral-400 mb-8 leading-relaxed">
              Votre vie privée est notre priorité. Découvrez comment nous protégeons vos données 
              personnelles et respectons vos droits dans notre application de conseil d'orientation.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <div className="flex items-center space-x-2 bg-white/80 dark:bg-neutral-800/80 backdrop-blur-sm border border-neutral-200 dark:border-neutral-700 rounded-full px-4 py-2">
                <CalendarIcon className="h-4 w-4 text-primary-500" />
                <span className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
                  Dernière mise à jour : {new Date().toLocaleDateString('fr-FR')}
                </span>
              </div>
              <div className="flex items-center space-x-2 bg-white/80 dark:bg-neutral-800/80 backdrop-blur-sm border border-neutral-200 dark:border-neutral-700 rounded-full px-4 py-2">
                <DocumentTextIcon className="h-4 w-4 text-primary-500" />
                <span className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
                  Conforme RGPD
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Privacy Sections */}
      <section className="section-padding bg-white dark:bg-neutral-900">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 dark:text-white mb-6">
              Comment Nous Protégeons Vos Données
            </h2>
            <p className="text-lg text-neutral-600 dark:text-neutral-400 max-w-3xl mx-auto">
              Notre approche de la protection des données repose sur la transparence, 
              la sécurité et le respect de vos droits fondamentaux.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            {privacySections.map((section, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-gradient-to-br from-primary-50 to-secondary-50 dark:from-primary-900/20 dark:to-secondary-900/20 rounded-2xl p-8 border border-primary-200 dark:border-primary-700"
              >
                <div className="flex items-start space-x-4 mb-6">
                  <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-xl flex items-center justify-center">
                    <section.icon className="h-6 w-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-neutral-900 dark:text-white mb-3">
                      {section.title}
                    </h3>
                    <p className="text-neutral-600 dark:text-neutral-400 text-lg mb-4">
                      {section.description}
                    </p>
                  </div>
                </div>
                
                <ul className="space-y-2">
                  {section.details.map((detail, detailIndex) => (
                    <li key={detailIndex} className="flex items-start space-x-3">
                      <div className="flex-shrink-0 w-2 h-2 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full mt-2"></div>
                      <span className="text-neutral-700 dark:text-neutral-300">{detail}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Data Rights */}
      <section className="section-padding bg-gradient-to-br from-neutral-50 to-primary-50 dark:from-neutral-800 dark:to-neutral-900">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 dark:text-white mb-6">
              Vos Droits sur Vos Données
            </h2>
            <p className="text-lg text-neutral-600 dark:text-neutral-400 max-w-3xl mx-auto">
              Conformément au RGPD, vous disposez de droits spécifiques concernant 
              vos données personnelles que nous respectons pleinement.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {dataRights.map((right, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white dark:bg-neutral-800 rounded-xl p-6 shadow-soft border border-neutral-200 dark:border-neutral-700 hover:shadow-medium transition-all duration-200"
              >
                <h3 className="text-lg font-semibold text-neutral-900 dark:text-white mb-3">
                  {right.title}
                </h3>
                <p className="text-neutral-600 dark:text-neutral-400 text-sm">
                  {right.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Data Retention */}
      <section className="section-padding bg-white dark:bg-neutral-900">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 dark:text-white mb-6">
              Durée de Conservation des Données
            </h2>
            <p className="text-lg text-neutral-600 dark:text-neutral-400 max-w-3xl mx-auto">
              Nous conservons vos données uniquement le temps nécessaire pour vous fournir 
              nos services et respecter nos obligations légales.
            </p>
          </motion.div>

          <div className="bg-gradient-to-r from-primary-50 to-secondary-50 dark:from-primary-900/20 dark:to-secondary-900/20 rounded-2xl p-8 border border-primary-200 dark:border-primary-700">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {dataRetention.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-white dark:bg-neutral-800 rounded-xl p-6 shadow-soft"
                >
                  <h3 className="text-lg font-semibold text-neutral-900 dark:text-white mb-2">
                    {item.period}
                  </h3>
                  <div className="text-primary-600 dark:text-primary-400 font-medium mb-2">
                    {item.duration}
                  </div>
                  <p className="text-neutral-600 dark:text-neutral-400 text-sm">
                    {item.reason}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact et questions */}
      <section className="py-20 bg-gradient-to-br from-secondary-50 to-accent-50 dark:from-secondary-900/20 dark:to-accent-900/20">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 dark:text-white mb-6">
              💬 Questions sur la Confidentialité ?
            </h2>
            <p className="text-lg text-neutral-600 dark:text-neutral-400 mb-8">
              Notre équipe est là pour répondre à toutes vos questions concernant 
              la protection de vos données personnelles.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
              <div className="flex items-center justify-center space-x-3 p-4 bg-white/80 dark:bg-neutral-800/80 backdrop-blur-sm rounded-xl border border-neutral-200 dark:border-neutral-700">
                <EnvelopeIcon className="h-6 w-6 text-primary-600" />
                <a href="mailto:conseilorientationinfo@gmail.com" className="text-neutral-700 dark:text-neutral-300 hover:text-primary-600 transition-colors">
                  conseilorientationinfo@gmail.com
                </a>
              </div>
              <div className="flex items-center justify-center space-x-3 p-4 bg-white/80 dark:bg-neutral-800/80 backdrop-blur-sm rounded-xl border border-neutral-200 dark:border-neutral-700">
                <PhoneIcon className="h-6 w-6 text-primary-600" />
                <a href="tel:+22392722564" className="text-neutral-700 dark:text-neutral-300 hover:text-primary-600 transition-colors">
                  +223 92 72 25 64
                </a>
              </div>
            </div>

            <div className="mt-8 p-6 bg-white/80 dark:bg-neutral-800/80 backdrop-blur-sm rounded-xl border border-neutral-200 dark:border-neutral-700">
              <p className="text-sm text-neutral-600 dark:text-neutral-400">
                <strong>Note importante :</strong> Cette politique de confidentialité peut être mise à jour 
                périodiquement. Nous vous informerons de tout changement significatif par email ou 
                via une notification dans l'application.
              </p>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
