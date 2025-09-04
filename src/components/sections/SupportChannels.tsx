'use client';

import { motion } from 'framer-motion';
import { 
  ChatBubbleLeftRightIcon,
  EnvelopeIcon,
  PhoneIcon,
  VideoCameraIcon,
  ClockIcon,
  GlobeAltIcon
} from '@heroicons/react/24/outline';

const supportChannels = [
  {
    icon: ChatBubbleLeftRightIcon,
    title: 'Chat en Direct',
    description: 'Obtenez une réponse immédiate de nos experts',
    availability: '24/7',
    responseTime: '< 2 minutes',
    color: 'from-green-500 to-emerald-600',
    bgColor: 'from-green-50 to-emerald-50',
    darkBgColor: 'from-green-900/20 to-emerald-900/20'
  },
  {
    icon: EnvelopeIcon,
    title: 'Email Support',
    description: 'Support détaillé par email pour les questions complexes',
    availability: 'Lun-Ven 9h-18h',
    responseTime: '< 4 heures',
    color: 'from-blue-500 to-indigo-600',
    bgColor: 'from-blue-50 to-indigo-50',
    darkBgColor: 'from-blue-900/20 to-indigo-900/20'
  },
  {
    icon: PhoneIcon,
    title: 'Support Téléphonique',
    description: 'Assistance vocale personnalisée',
    availability: 'Lun-Ven 9h-17h',
    responseTime: 'Immédiat',
    color: 'from-purple-500 to-violet-600',
    bgColor: 'from-purple-50 to-violet-50',
    darkBgColor: 'from-purple-900/20 to-violet-900/20'
  },
  {
    icon: VideoCameraIcon,
    title: 'Visioconférence',
    description: 'Sessions de support en visioconférence',
    availability: 'Sur RDV',
    responseTime: '< 24h',
    color: 'from-orange-500 to-red-600',
    bgColor: 'from-orange-50 to-red-50',
    darkBgColor: 'from-orange-900/20 to-red-900/20'
  }
];

const languages = [
  { code: 'fr', name: 'Français', flag: '🇫🇷' },
  { code: 'en', name: 'English', flag: '🇬🇧' },
  { code: 'es', name: 'Español', flag: '🇪🇸' },
  { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
  { code: 'it', name: 'Italiano', flag: '🇮🇹' },
  { code: 'ar', name: 'العربية', flag: '🇸🇦' }
];

export function SupportChannels() {
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
            Canaux de{' '}
            <span className="bg-gradient-to-r from-secondary-600 to-primary-600 bg-clip-text text-transparent">
              Support
            </span>
          </h2>
          <p className="text-lg text-neutral-600 dark:text-neutral-400 max-w-3xl mx-auto">
            Nous sommes disponibles sur plusieurs canaux pour vous accompagner 
            dans votre parcours d'orientation. Choisissez celui qui vous convient le mieux.
          </p>
        </motion.div>

        {/* Support Channels Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {supportChannels.map((channel, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className={`bg-gradient-to-br ${channel.bgColor} dark:${channel.darkBgColor} rounded-2xl p-8 border border-neutral-200 dark:border-neutral-700 hover:shadow-xl transition-all duration-300`}
            >
              <div className="flex items-start space-x-4 mb-6">
                <div className={`p-3 rounded-xl bg-gradient-to-r ${channel.color} text-white`}>
                  <channel.icon className="h-8 w-8" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-neutral-900 dark:text-white mb-2">
                    {channel.title}
                  </h3>
                  <p className="text-neutral-600 dark:text-neutral-400">
                    {channel.description}
                  </p>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="flex items-center space-x-2">
                  <ClockIcon className="h-5 w-5 text-neutral-500" />
                  <div>
                    <p className="text-sm text-neutral-500 dark:text-neutral-400">Disponibilité</p>
                    <p className="font-semibold text-neutral-900 dark:text-white">{channel.availability}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <GlobeAltIcon className="h-5 w-5 text-neutral-500" />
                  <div>
                    <p className="text-sm text-neutral-500 dark:text-neutral-400">Temps de réponse</p>
                    <p className="font-semibold text-neutral-900 dark:text-white">{channel.responseTime}</p>
                  </div>
                </div>
              </div>

              <button className={`w-full py-3 px-6 bg-gradient-to-r ${channel.color} text-white rounded-xl font-semibold hover:shadow-lg transition-all duration-200 transform hover:scale-105`}>
                Utiliser ce canal
              </button>
            </motion.div>
          ))}
        </div>

        {/* Language Support */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="bg-white dark:bg-neutral-800 rounded-2xl p-8 border border-neutral-200 dark:border-neutral-700"
        >
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-neutral-900 dark:text-white mb-4">
              🌍 Support Multilingue
            </h3>
            <p className="text-lg text-neutral-600 dark:text-neutral-400">
              Notre équipe de support parle votre langue pour une expérience optimale
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {languages.map((language, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="text-center p-4 rounded-xl bg-neutral-50 dark:bg-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-600 transition-colors duration-200 cursor-pointer"
              >
                <div className="text-3xl mb-2">{language.flag}</div>
                <p className="font-semibold text-neutral-900 dark:text-white">{language.name}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Priority Support */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-16 bg-gradient-to-r from-primary-50 to-brand-50 dark:from-primary-900/20 dark:to-brand-900/20 rounded-2xl p-8 border border-primary-200 dark:border-primary-700 text-center"
        >
          <h3 className="text-2xl font-bold text-neutral-900 dark:text-white mb-4">
            ⭐ Support Prioritaire
          </h3>
          <p className="text-lg text-neutral-600 dark:text-neutral-400 max-w-3xl mx-auto mb-6">
            Bénéficiez d'un support prioritaire avec des temps de réponse garantis 
            et un accès direct à nos experts seniors.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button className="px-8 py-4 bg-primary-600 hover:bg-primary-700 text-white rounded-xl font-semibold transition-colors duration-200">
              Découvrir les Formules
            </button>
            <button className="px-8 py-4 border-2 border-primary-600 text-primary-600 hover:bg-primary-600 hover:text-white rounded-xl font-semibold transition-all duration-200">
              Contacter les Ventes
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
