'use client';

import { motion } from 'framer-motion';
import { 
  ClockIcon,
  LightBulbIcon,
  RocketLaunchIcon,
  TrophyIcon
} from '@heroicons/react/24/outline';

const milestones = [
  {
    year: '2023',
    title: 'Fondation',
    description: 'Création de l\'entreprise au Mali avec une vision claire : démocratiser l\'orientation scolaire en Afrique.',
    icon: LightBulbIcon,
    color: 'text-blue-600',
    bgColor: 'bg-blue-100 dark:bg-blue-900/30'
  },
  {
    year: 'Juin 2023',
    title: 'Première Version',
    description: 'Lancement de la première version de l\'application avec l\'assistant IA et la base de données de bourses.',
    icon: RocketLaunchIcon,
    color: 'text-green-600',
    bgColor: 'bg-green-100 dark:bg-green-900/30'
  },
  {
    year: '2023',
    title: 'Croissance Rapide',
    description: 'Expansion rapide avec plus de 50 000 utilisateurs et une base de données de plus de 1000 bourses.',
    icon: ClockIcon,
    color: 'text-purple-600',
    bgColor: 'bg-purple-100 dark:bg-purple-900/30'
  },
  {
    year: '2024',
    title: 'Innovation Continue',
    description: 'Amélioration continue de l\'IA et expansion des fonctionnalités pour servir mieux les étudiants.',
    icon: TrophyIcon,
    color: 'text-orange-600',
    bgColor: 'bg-orange-100 dark:bg-orange-900/30'
  },
  {
    year: '2025',
    title: 'IA de Nouvelle Génération',
    description: 'Lancement de l\'IA de nouvelle génération avec des capacités prédictives avancées et une personnalisation ultra-précise.',
    icon: RocketLaunchIcon,
    color: 'text-indigo-600',
    bgColor: 'bg-indigo-100 dark:bg-indigo-900/30'
  }
];

export function StorySection() {
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
            Notre{' '}
            <span className="bg-gradient-to-r from-secondary-600 via-primary-600 to-accent-500 bg-clip-text text-transparent">
              Histoire
            </span>
          </h2>
          <p className="text-xl text-neutral-600 dark:text-neutral-400 max-w-3xl mx-auto">
            Un voyage de 3 ans marqué par l'innovation, la persévérance et 
            l'engagement envers l'éducation de qualité pour tous en Afrique.
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-1/2 transform -translate-x-px h-full w-0.5 bg-gradient-to-b from-secondary-200 to-primary-200 dark:from-secondary-700 dark:to-primary-700"></div>

          {/* Milestones */}
          <div className="space-y-16">
            {milestones.map((milestone, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={`relative flex items-center ${
                  index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'
                }`}
              >
                {/* Content */}
                <div className={`w-1/2 ${index % 2 === 0 ? 'pr-8 text-right' : 'pl-8 text-left'}`}>
                  <div className="bg-white dark:bg-neutral-800 rounded-2xl p-6 shadow-soft border border-neutral-200 dark:border-neutral-700">
                    <div className={`inline-flex items-center justify-center w-12 h-12 ${milestone.bgColor} rounded-xl mb-4`}>
                      <milestone.icon className={`h-6 w-6 ${milestone.color}`} />
                    </div>
                    <div className={`text-2xl font-bold ${milestone.color} mb-2`}>
                      {milestone.year}
                    </div>
                    <h3 className="text-xl font-bold text-neutral-900 dark:text-white mb-3">
                      {milestone.title}
                    </h3>
                    <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed">
                      {milestone.description}
                    </p>
                  </div>
                </div>

                {/* Timeline Dot */}
                <div className="absolute left-1/2 transform -translate-x-1/2 w-6 h-6 bg-white dark:bg-neutral-800 border-4 border-secondary-500 rounded-full shadow-lg"></div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Story Text */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-20 text-center"
        >
          <div className="max-w-4xl mx-auto">
            <h3 className="text-2xl md:text-3xl font-bold text-neutral-900 dark:text-white mb-6">
              L'Inspiration derrière l'Innovation
            </h3>
            <p className="text-lg text-neutral-600 dark:text-neutral-400 leading-relaxed mb-8">
              Tout a commencé par une simple observation : l'orientation scolaire était souvent 
              un parcours du combattant pour les étudiants et leurs familles. Les informations 
              étaient dispersées, les conseils peu personnalisés, et l'accès aux opportunités 
              limité par la géographie et les ressources disponibles.
            </p>
            <p className="text-lg text-neutral-600 dark:text-neutral-400 leading-relaxed mb-8">
              Notre équipe de passionnés d'éducation et de technologie au Mali a décidé de changer cela. 
              Nous avons combiné l'expertise pédagogique, l'intelligence artificielle et la 
              technologie mobile pour créer une solution accessible à tous les étudiants africains.
            </p>
            <p className="text-lg text-neutral-600 dark:text-neutral-400 leading-relaxed">
              Aujourd'hui, Conseil d'Orientation n'est plus seulement une application - c'est 
              un mouvement qui transforme la façon dont les étudiants africains découvrent leur potentiel 
              et construisent leur avenir. Avec l'arrivée de l'IA de nouvelle génération en 2025, 
              nous continuons d'écrire notre histoire avec chaque étudiant que nous aidons à réaliser ses rêves.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
