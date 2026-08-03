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
    description: 'Faciliter l\'orientation scolaire et post-bac des élèves et étudiants au Mali.',
    color: 'text-primary-600'
  },
  {
    icon: LightBulbIcon,
    title: 'Notre Vision',
    description: 'Permettre à chaque élève au Mali de préparer son avenir grâce à des informations utiles et accessibles.',
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
    title: 'Notre Engagement',
    description: 'Mettre à disposition des informations utiles pour préparer l’orientation post-bac au Mali.',
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
            Depuis le lancement de l'application en 2023, nous facilitons l'accès 
            à l'information pour l'orientation scolaire et post-bac au Mali.
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
              Tout a commencé en 2023, quand notre équipe de passionnés d'éducation au Mali a constaté 
              que l'orientation scolaire était souvent un parcours du combattant pour les élèves et étudiants. 
              Nous avons décidé de créer une solution qui combine l'intelligence artificielle, 
              l'expertise pédagogique et la technologie mobile pour démocratiser l'accès à 
              des conseils d'orientation utiles au Mali.
            </p>
            <p className="text-lg text-neutral-600 dark:text-neutral-400 leading-relaxed">
              Aujourd'hui, Conseil d'Orientation rassemble des informations sur les universités, les séries 
              du baccalauréat et les parcours post-bac afin d'aider les candidats à préparer leur avenir.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
