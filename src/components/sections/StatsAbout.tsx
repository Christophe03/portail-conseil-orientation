'use client';

import { motion } from 'framer-motion';
import { 
  UsersIcon,
  GlobeAltIcon,
  AcademicCapIcon,
  HeartIcon,
  StarIcon,
  RocketLaunchIcon
} from '@heroicons/react/24/outline';

const stats = [
  {
    icon: UsersIcon,
    number: '25,000+',
    label: 'Étudiants Aidés',
    description: 'Des milliers d\'étudiants ont transformé leur parcours grâce à nos conseils.',
    color: 'text-blue-600',
    bgColor: 'bg-blue-100 dark:bg-blue-900/30'
  },
  {
    icon: GlobeAltIcon,
    number: '15+',
    label: 'Pays Couverts',
    description: 'Notre impact s\'étend sur plusieurs continents et cultures.',
    color: 'text-green-600',
    bgColor: 'bg-green-100 dark:bg-green-900/30'
  },
  {
    icon: AcademicCapIcon,
    number: '500+',
    label: 'Formations Découvertes',
    description: 'Autant d\'opportunités éducatives révélées à nos utilisateurs.',
    color: 'text-purple-600',
    bgColor: 'bg-purple-100 dark:bg-purple-900/30'
  },
  {
    icon: HeartIcon,
    number: '98%',
    label: 'Satisfaction',
    description: 'Taux de satisfaction exceptionnel de nos utilisateurs.',
    color: 'text-red-600',
    bgColor: 'bg-red-100 dark:bg-red-900/30'
  },
  {
    icon: StarIcon,
    number: '4.8/5',
    label: 'Note Moyenne',
    description: 'Évaluation moyenne de notre application par les utilisateurs.',
    color: 'text-yellow-600',
    bgColor: 'bg-yellow-100 dark:bg-yellow-900/30'
  },
  {
    icon: RocketLaunchIcon,
    number: '24/7',
    label: 'Support Disponible',
    description: 'Assistance continue pour tous nos utilisateurs.',
    color: 'text-orange-600',
    bgColor: 'bg-orange-100 dark:bg-orange-900/30'
  }
];

export function StatsAbout() {
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
            Notre{' '}
            <span className="bg-gradient-to-r from-primary-600 via-brand-600 to-accent-500 bg-clip-text text-transparent">
              Impact
            </span>
          </h2>
          <p className="text-xl text-neutral-600 dark:text-neutral-400 max-w-3xl mx-auto">
            Des chiffres qui parlent d'eux-mêmes. Découvrez l'ampleur de notre impact 
            sur l'éducation et l'orientation des étudiants à travers le monde.
          </p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-white dark:bg-neutral-800 rounded-2xl p-6 shadow-soft border border-neutral-200 dark:border-neutral-700 text-center group hover:shadow-xl transition-all duration-300"
            >
              {/* Icon */}
              <div className={`inline-flex items-center justify-center w-16 h-16 ${stat.bgColor} rounded-2xl mb-4 group-hover:scale-110 transition-transform duration-300`}>
                <stat.icon className={`h-8 w-8 ${stat.color}`} />
              </div>

              {/* Number */}
              <div className={`text-3xl md:text-4xl font-bold ${stat.color} mb-2`}>
                {stat.number}
              </div>

              {/* Label */}
              <h3 className="text-lg font-semibold text-neutral-900 dark:text-white mb-3">
                {stat.label}
              </h3>

              {/* Description */}
              <p className="text-neutral-600 dark:text-neutral-400 text-sm leading-relaxed">
                {stat.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Impact Story */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="bg-white dark:bg-neutral-800 rounded-2xl p-8 shadow-soft border border-neutral-200 dark:border-neutral-700"
        >
          <div className="text-center">
            <h3 className="text-2xl md:text-3xl font-bold text-neutral-900 dark:text-white mb-6">
              L'Impact Réel de Nos Chiffres
            </h3>
            <p className="text-lg text-neutral-600 dark:text-neutral-400 max-w-4xl mx-auto leading-relaxed mb-8">
              Derrière ces statistiques se cachent des histoires réelles d'étudiants qui ont 
              transformé leur vie grâce à nos conseils. Chaque chiffre représente des rêves 
              réalisés, des carrières lancées et des futurs brillants construits.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary-600 mb-2">🎯</div>
                <h4 className="font-semibold text-neutral-900 dark:text-white mb-2">Objectifs Atteints</h4>
                <p className="text-sm text-neutral-600 dark:text-neutral-400">
                  85% des étudiants atteignent leurs objectifs d'orientation
                </p>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary-600 mb-2">🚀</div>
                <h4 className="font-semibold text-neutral-900 dark:text-white mb-2">Carrières Lancées</h4>
                <p className="text-sm text-neutral-600 dark:text-neutral-400">
                  Plus de 10 000 carrières professionnelles lancées avec succès
                </p>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary-600 mb-2">💡</div>
                <h4 className="font-semibold text-neutral-900 dark:text-white mb-2">Découvertes</h4>
                <p className="text-sm text-neutral-600 dark:text-neutral-400">
                  Des milliers d'opportunités éducatives découvertes chaque mois
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-center mt-12"
        >
          <h3 className="text-2xl font-bold text-neutral-900 dark:text-white mb-4">
            Rejoignez Notre Communauté
          </h3>
          <p className="text-lg text-neutral-600 dark:text-neutral-400 mb-6">
            Faites partie de cette transformation éducative et découvrez votre potentiel.
          </p>
          <button className="inline-flex items-center space-x-2 bg-gradient-to-r from-primary-600 to-secondary-600 hover:from-primary-700 hover:to-secondary-700 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-200 hover:scale-105">
            <span>Commencer Maintenant</span>
            <RocketLaunchIcon className="h-5 w-5" />
          </button>
        </motion.div>
      </div>
    </section>
  );
}
