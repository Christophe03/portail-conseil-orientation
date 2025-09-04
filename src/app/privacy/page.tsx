import { Metadata } from 'next';
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

export const metadata: Metadata = {
  title: 'Politique de Confidentialité',
  description: 'Découvrez comment nous protégeons vos données personnelles et respectons votre vie privée sur Conseil d\'Orientation.',
};

const privacySections = [
  {
    icon: EyeIcon,
    title: 'Collecte des Données',
    content: [
      'Nous collectons uniquement les informations nécessaires au bon fonctionnement de l\'application :',
      '• Informations de profil (nom, email, niveau d\'études)',
      '• Données d\'utilisation de l\'application',
      '• Préférences et centres d\'intérêt éducatifs',
      '• Cookies techniques pour la session utilisateur'
    ]
  },
  {
    icon: LockClosedIcon,
    title: 'Protection des Données',
    content: [
      'Vos données sont protégées par des mesures de sécurité strictes :',
      '• Chiffrement SSL/TLS pour toutes les transmissions',
      '• Accès restreint aux données personnelles',
      '• Sauvegarde sécurisée et régulière',
      '• Conformité RGPD et réglementations locales'
    ]
  },
  {
    icon: DocumentTextIcon,
    title: 'Utilisation des Données',
    content: [
      'Vos données sont utilisées exclusivement pour :',
      '• Personnaliser vos recommandations d\'orientation',
      '• Améliorer l\'expérience utilisateur',
      '• Fournir un support technique',
      '• Analyser les tendances d\'utilisation (anonymisées)'
    ]
  },
  {
    icon: CalendarIcon,
    title: 'Conservation des Données',
    content: [
      'Nous conservons vos données uniquement le temps nécessaire :',
      '• Données de compte : tant que votre compte est actif',
      '• Données d\'utilisation : 2 ans maximum',
      '• Cookies : selon vos préférences',
      '• Suppression automatique après inactivité prolongée'
    ]
  }
];

const cookieTypes = [
  {
    name: 'Cookies Nécessaires',
    description: 'Essentiels au fonctionnement du site',
    examples: ['Session utilisateur', 'Préférences de langue', 'Sécurité'],
    duration: 'Session ou 1 an',
    required: true
  },
  {
    name: 'Cookies Analytiques',
    description: 'Nous aident à comprendre l\'utilisation du site',
    examples: ['Google Analytics', 'Statistiques de visite', 'Performance'],
    duration: '2 ans maximum',
    required: false
  },
  {
    name: 'Cookies Marketing',
    description: 'Utilisés pour la publicité ciblée',
    examples: ['Publicités personnalisées', 'Réseaux sociaux', 'Suivi publicitaire'],
    duration: '1 an maximum',
    required: false
  }
];

const userRights = [
  {
    title: 'Droit d\'Accès',
    description: 'Consulter toutes vos données personnelles stockées'
  },
  {
    title: 'Droit de Rectification',
    description: 'Corriger ou mettre à jour vos informations'
  },
  {
    title: 'Droit à l\'Effacement',
    description: 'Demander la suppression de vos données'
  },
  {
    title: 'Droit à la Portabilité',
    description: 'Récupérer vos données dans un format standard'
  },
  {
    title: 'Droit d\'Opposition',
    description: 'Refuser le traitement de vos données'
  },
  {
    title: 'Droit de Retrait',
    description: 'Retirer votre consentement à tout moment'
  }
];

export default function PrivacyPage() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden bg-gradient-to-br from-primary-50 via-white to-secondary-50 dark:from-neutral-900 dark:via-neutral-800 dark:to-neutral-900">
        <div className="container-custom relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <div className="inline-flex items-center space-x-2 bg-white/80 dark:bg-neutral-800/80 backdrop-blur-sm border border-neutral-200 dark:border-neutral-700 rounded-full px-4 py-2 mb-8">
              <ShieldCheckIcon className="h-5 w-5 text-primary-600" />
              <span className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
                🔒 Protection des Données
              </span>
            </div>
            
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-neutral-900 dark:text-white mb-6">
              Politique de{' '}
              <span className="bg-gradient-to-r from-primary-600 via-secondary-600 to-accent-500 bg-clip-text text-transparent">
                Confidentialité
              </span>
            </h1>
            
            <p className="text-xl text-neutral-600 dark:text-neutral-400 max-w-3xl mx-auto leading-relaxed">
              Votre vie privée est importante pour nous. Découvrez comment nous protégeons 
              vos données personnelles et respectons vos droits.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Dernière mise à jour */}
      <section className="py-8 bg-white dark:bg-neutral-900 border-b border-neutral-200 dark:border-neutral-700">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <p className="text-neutral-600 dark:text-neutral-400">
              <strong>Dernière mise à jour :</strong> {new Date().toLocaleDateString('fr-FR', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Sections principales */}
      <section className="py-20 bg-white dark:bg-neutral-900">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {privacySections.map((section, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-neutral-50 dark:bg-neutral-800 rounded-2xl p-8 border border-neutral-200 dark:border-neutral-700"
              >
                <div className="flex items-start gap-4 mb-6">
                  <div className="p-3 bg-primary-100 dark:bg-primary-900/30 rounded-xl">
                    <section.icon className="h-8 w-8 text-primary-600" />
                  </div>
                  <h2 className="text-2xl font-bold text-neutral-900 dark:text-white">
                    {section.title}
                  </h2>
                </div>
                <ul className="space-y-3">
                  {section.content.map((item, itemIndex) => (
                    <li key={itemIndex} className="flex items-start space-x-3">
                      <div className="flex-shrink-0 w-2 h-2 bg-primary-500 rounded-full mt-2"></div>
                      <span className="text-neutral-700 dark:text-neutral-300">{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Types de cookies */}
      <section className="py-20 bg-gradient-to-br from-neutral-50 to-primary-50 dark:from-neutral-800 dark:to-primary-900/20">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 dark:text-white mb-6">
              🍪 Types de Cookies Utilisés
            </h2>
            <p className="text-lg text-neutral-600 dark:text-neutral-400 max-w-3xl mx-auto">
              Nous utilisons différents types de cookies pour améliorer votre expérience. 
              Vous pouvez contrôler lesquels sont activés.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {cookieTypes.map((cookie, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white dark:bg-neutral-800 rounded-2xl p-6 border border-neutral-200 dark:border-neutral-700"
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold text-neutral-900 dark:text-white">
                    {cookie.name}
                  </h3>
                  {cookie.required && (
                    <span className="px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 text-xs font-medium rounded-full">
                      Requis
                    </span>
                  )}
                </div>
                <p className="text-neutral-600 dark:text-neutral-400 mb-4">
                  {cookie.description}
                </p>
                <div className="mb-4">
                  <h4 className="font-semibold text-neutral-900 dark:text-white mb-2">Exemples :</h4>
                  <ul className="space-y-1">
                    {cookie.examples.map((example, exampleIndex) => (
                      <li key={exampleIndex} className="text-sm text-neutral-600 dark:text-neutral-400">
                        • {example}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="text-sm text-neutral-500 dark:text-neutral-500">
                  <strong>Durée :</strong> {cookie.duration}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Droits des utilisateurs */}
      <section className="py-20 bg-white dark:bg-neutral-900">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 dark:text-white mb-6">
              🛡️ Vos Droits
            </h2>
            <p className="text-lg text-neutral-600 dark:text-neutral-400 max-w-3xl mx-auto">
              Conformément au RGPD et aux réglementations locales, vous disposez de plusieurs droits 
              concernant vos données personnelles.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {userRights.map((right, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                className="bg-neutral-50 dark:bg-neutral-800 rounded-xl p-6 border border-neutral-200 dark:border-neutral-700"
              >
                <h3 className="font-semibold text-neutral-900 dark:text-white mb-3">
                  {right.title}
                </h3>
                <p className="text-sm text-neutral-600 dark:text-neutral-400">
                  {right.description}
                </p>
              </motion.div>
            ))}
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
                <span className="text-neutral-700 dark:text-neutral-300">
                  privacy@conseil-orientation.com
                </span>
              </div>
              <div className="flex items-center justify-center space-x-3 p-4 bg-white/80 dark:bg-neutral-800/80 backdrop-blur-sm rounded-xl border border-neutral-200 dark:border-neutral-700">
                <PhoneIcon className="h-6 w-6 text-primary-600" />
                <span className="text-neutral-700 dark:text-neutral-300">
                  +33 1 23 45 67 89
                </span>
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
