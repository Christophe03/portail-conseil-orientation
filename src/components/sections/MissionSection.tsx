'use client';

import { motion } from 'framer-motion';
import { 
  FlagIcon,
  LightBulbIcon,
  HeartIcon,
  GlobeAltIcon
} from '@heroicons/react/24/outline';

const missions = [
  {
    icon: FlagIcon,
    title: 'Notre Mission',
    description: 'Révolutionner l\'orientation scolaire et professionnelle en rendant l\'accès à l\'éducation accessible à tous, partout dans le monde.',
    color: 'text-primary-600'
  },
  {
    icon: LightBulbIcon,
    title: 'Notre Vision',
    description: 'Un monde où chaque étudiant peut réaliser son plein potentiel grâce à des conseils personnalisés et des opportunités éducatives adaptées.',
    color: 'text-accent-600'
  },
  {
    icon: HeartIcon,
    title: 'Nos Valeurs',
    description: 'Innovation, accessibilité, excellence et impact social. Nous croyons au pouvoir transformateur de l\'éducation pour tous.',
    color: 'text-brand-600'
  },
  {
    icon: GlobeAltIcon,
    title: 'Notre Impact',
    description: 'Plus de 25 000 étudiants aidés, 15 pays couverts et des milliers de parcours transformés grâce à notre technologie.',
    color: 'text-secondary-600'
  }
];

export function MissionSection() {
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
            Notre{' '}
            <span className="bg-gradient-to-r from-primary-600 via-brand-600 to-accent-500 bg-clip-text text-transparent">
              Mission
            </span>
          </h2>
          <p className="text-xl text-neutral-600 dark:text-neutral-400 max-w-3xl mx-auto">
            Depuis notre création en 2020, nous nous engageons à démocratiser l'accès 
            à l'orientation scolaire et professionnelle de qualité.
          </p>
        </motion.div>

        {/* Mission Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {missions.map((mission, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="text-center group"
            >
              <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-primary-100 to-secondary-100 dark:from-primary-900/30 dark:to-secondary-900/30 rounded-2xl mb-6 group-hover:scale-110 transition-transform duration-300">
                <mission.icon className={`h-10 w-10 ${mission.color}`} />
              </div>
              <h3 className="text-xl font-bold text-neutral-900 dark:text-white mb-4">
                {mission.title}
              </h3>
              <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed">
                {mission.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Story Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-20 text-center"
        >
          <div className="max-w-4xl mx-auto">
            <h3 className="text-2xl md:text-3xl font-bold text-neutral-900 dark:text-white mb-6">
              L'Histoire derrière l'Innovation
            </h3>
            <p className="text-lg text-neutral-600 dark:text-neutral-400 leading-relaxed mb-8">
              Tout a commencé en 2020, quand notre équipe de passionnés d'éducation a constaté 
              que l'orientation scolaire était souvent un parcours du combattant pour les étudiants. 
              Nous avons décidé de créer une solution qui combine l'intelligence artificielle, 
              l'expertise pédagogique et la technologie mobile pour démocratiser l'accès à 
              des conseils d'orientation de qualité.
            </p>
            <p className="text-lg text-neutral-600 dark:text-neutral-400 leading-relaxed">
              Aujourd'hui, Conseil d'Orientation aide des milliers d'étudiants à travers le monde 
              à trouver leur voie, à découvrir des opportunités qu'ils n'auraient jamais imaginées, 
              et à construire un avenir qui correspond à leurs rêves et à leur potentiel.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
