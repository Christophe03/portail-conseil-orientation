'use client';

import { motion } from 'framer-motion';
import { 
  HeartIcon,
  LightBulbIcon,
  ShieldCheckIcon,
  GlobeAltIcon,
  UsersIcon,
  StarIcon
} from '@heroicons/react/24/outline';

const values = [
  {
    icon: HeartIcon,
    title: 'Passion',
    description: 'Nous sommes passionnés par l\'éducation et l\'impact positif que nous pouvons avoir sur la vie des étudiants.',
    color: 'text-red-600',
    bgColor: 'bg-red-100 dark:bg-red-900/30'
  },
  {
    icon: LightBulbIcon,
    title: 'Innovation',
    description: 'Nous repoussons constamment les limites de la technologie pour créer des solutions éducatives révolutionnaires.',
    color: 'text-yellow-600',
    bgColor: 'bg-yellow-100 dark:bg-yellow-900/30'
  },
  {
    icon: ShieldCheckIcon,
    title: 'Qualité',
    description: 'Nous nous engageons à fournir des conseils et des ressources de la plus haute qualité possible.',
    color: 'text-green-600',
    bgColor: 'bg-green-100 dark:bg-green-900/30'
  },
  {
    icon: GlobeAltIcon,
    title: 'Accessibilité',
    description: 'Nous croyons que l\'éducation de qualité doit être accessible à tous, partout dans le monde.',
    color: 'text-blue-600',
    bgColor: 'bg-blue-100 dark:bg-blue-900/30'
  },
  {
    icon: UsersIcon,
    title: 'Collaboration',
    description: 'Nous travaillons en étroite collaboration avec les étudiants, les éducateurs et les institutions.',
    color: 'text-purple-600',
    bgColor: 'bg-purple-100 dark:bg-purple-900/30'
  },
  {
    icon: StarIcon,
    title: 'Excellence',
    description: 'Nous visons l\'excellence dans tout ce que nous faisons, de la technologie à l\'expérience utilisateur.',
    color: 'text-orange-600',
    bgColor: 'bg-orange-100 dark:bg-orange-900/30'
  }
];

export function ValuesSection() {
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
            Nos{' '}
            <span className="bg-gradient-to-r from-primary-600 via-brand-600 to-accent-500 bg-clip-text text-transparent">
              Valeurs
            </span>
          </h2>
          <p className="text-xl text-neutral-600 dark:text-neutral-400 max-w-3xl mx-auto">
            Les principes qui guident nos actions et définissent notre culture d'entreprise. 
            Ces valeurs sont au cœur de tout ce que nous faisons.
          </p>
        </motion.div>

        {/* Values Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {values.map((value, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="text-center group"
            >
              <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-neutral-100 to-neutral-200 dark:from-neutral-800 dark:to-neutral-700 rounded-2xl mb-6 group-hover:scale-110 transition-transform duration-300">
                <value.icon className={`h-10 w-10 ${value.color}`} />
              </div>
              <h3 className="text-xl font-bold text-neutral-900 dark:text-white mb-4">
                {value.title}
              </h3>
              <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed">
                {value.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Commitment Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="bg-gradient-to-r from-primary-50 to-brand-50 dark:from-primary-900/20 dark:to-brand-900/20 rounded-2xl p-8 border border-primary-200 dark:border-primary-700"
        >
          <div className="text-center">
            <h3 className="text-2xl md:text-3xl font-bold text-neutral-900 dark:text-white mb-6">
              Notre Engagement envers l'Excellence
            </h3>
            <p className="text-lg text-neutral-600 dark:text-neutral-400 max-w-3xl mx-auto leading-relaxed mb-8">
              Ces valeurs ne sont pas seulement des mots sur un mur - elles sont vécues 
              quotidiennement par chaque membre de notre équipe. Nous nous engageons à les 
              respecter dans toutes nos interactions, de la conception de nos produits à 
              notre relation avec les utilisateurs.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <div className="flex items-center space-x-2 bg-white/80 dark:bg-neutral-800/80 backdrop-blur-sm border border-neutral-200 dark:border-neutral-700 rounded-full px-4 py-2">
                <HeartIcon className="h-4 w-4 text-red-500" />
                <span className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
                  Engagement Total
                </span>
              </div>
              <div className="flex items-center space-x-2 bg-white/80 dark:bg-neutral-800/80 backdrop-blur-sm border border-neutral-200 dark:border-neutral-700 rounded-full px-4 py-2">
                <ShieldCheckIcon className="h-4 w-4 text-green-500" />
                <span className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
                  Qualité Garantie
                </span>
              </div>
              <div className="flex items-center space-x-2 bg-white/80 dark:bg-neutral-800/80 backdrop-blur-sm border border-neutral-200 dark:border-neutral-700 rounded-full px-4 py-2">
                <GlobeAltIcon className="h-4 w-4 text-blue-500" />
                <span className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
                  Impact Mondial
                </span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
