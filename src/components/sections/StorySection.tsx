'use client';

import { motion } from 'framer-motion';
import { 
  ClockIcon,
  RocketLaunchIcon,
  GlobeAltIcon
} from '@heroicons/react/24/outline';

const milestones = [
  {
    year: '2023',
    title: 'Première Version (Mobile)',
    description: "Lancement de la première version de l'application mobile au Mali.",
    icon: RocketLaunchIcon,
    color: 'text-green-600',
    bgColor: 'bg-green-100 dark:bg-green-900/30'
  },
  {
    year: '2024',
    title: 'Consolidation',
    description: "Améliorations de l'expérience, intégration des séries et des universités.",
    icon: ClockIcon,
    color: 'text-purple-600',
    bgColor: 'bg-purple-100 dark:bg-purple-900/30'
  },
  {
    year: '2025',
    title: 'Deuxième Version (Site Web)',
    description: "Lancement de la version web pour compléter l'application et offrir une expérience multiplateforme.",
    icon: GlobeAltIcon,
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
            Un chemin clair : v1 en 2023 (mobile) puis v2 en 2025 (site web).
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
      </div>
    </section>
  );
}
