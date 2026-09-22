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
    description: "Lancement de la toute première version de l'application mobile d'orientation scolaire au Mali.",
    icon: RocketLaunchIcon,
    color: 'text-[#13508f] dark:text-[#3b9df8]',
    bgColor: 'bg-[#13508f]/10 dark:bg-[#13508f]/25',
    dotColor: 'border-[#13508f]'
  },
  {
    year: '2024',
    title: 'Consolidation & IA',
    description: "Intégration complète des séries du BAC malien et du moteur de recommandations intelligentes.",
    icon: ClockIcon,
    color: 'text-[#3b9df8]',
    bgColor: 'bg-[#3b9df8]/15 dark:bg-[#3b9df8]/25',
    dotColor: 'border-[#3b9df8]'
  },
  {
    year: '2025 - 2026',
    title: 'Portail Web & Écosystème',
    description: "Déploiement du portail web national et mise à jour de l'annuaire de plus de 190 établissements publics et privés.",
    icon: GlobeAltIcon,
    color: 'text-[#13508f] dark:text-[#7cc5fb]',
    bgColor: 'bg-[#13508f]/10 dark:bg-[#13508f]/25',
    dotColor: 'border-[#13508f]'
  }
];

export function StorySection() {
  return (
    <section className="py-20 bg-slate-50/60 dark:bg-[#071324]">
      <div className="container-custom">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center space-x-2 rounded-full px-3.5 py-1.5 bg-[#13508f]/10 dark:bg-[#112240] border border-[#13508f]/20 dark:border-[#3b9df8]/30 mb-4">
            <span className="text-xs font-semibold text-[#13508f] dark:text-[#7cc5fb]">
              Chronologie
            </span>
          </div>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-[#13508f] dark:text-white mb-4">
            Notre <span className="text-[#3b9df8]">Histoire</span>
          </h2>
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Une évolution continue dédiée à l'orientation des lycéens et étudiants au Mali.
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative max-w-5xl mx-auto">
          {/* Timeline Line in Logo Blue */}
          <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#13508f] via-[#3b9df8] to-[#13508f] sm:left-1/2 sm:-translate-x-px"></div>

          {/* Milestones */}
          <div className="space-y-12">
            {milestones.map((milestone, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`relative flex flex-col sm:flex-row items-start sm:items-center ${
                  index % 2 === 0 ? 'sm:flex-row' : 'sm:flex-row-reverse'
                }`}
              >
                {/* Content */}
                <div
                  className={`w-full pl-12 sm:pl-0 sm:w-1/2 ${
                    index % 2 === 0 ? 'sm:pr-10 sm:text-right' : 'sm:pl-10 sm:text-left'
                  }`}
                >
                  <div className="bg-white dark:bg-[#112240] rounded-3xl p-6 sm:p-7 shadow-card border border-slate-200/80 dark:border-slate-800">
                    <div className={`inline-flex items-center justify-center w-12 h-12 ${milestone.bgColor} rounded-2xl mb-4`}>
                      <milestone.icon className={`h-6 w-6 ${milestone.color}`} />
                    </div>
                    <div className={`text-2xl font-extrabold ${milestone.color} mb-1 tracking-tight`}>
                      {milestone.year}
                    </div>
                    <h3 className="text-lg font-bold text-[#13508f] dark:text-white mb-2">
                      {milestone.title}
                    </h3>
                    <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                      {milestone.description}
                    </p>
                  </div>
                </div>

                {/* Timeline Dot */}
                <div className={`absolute left-4 top-8 -translate-x-1/2 w-6 h-6 bg-white dark:bg-[#071324] border-4 ${milestone.dotColor} rounded-full shadow-md sm:left-1/2 sm:top-1/2 sm:-translate-y-1/2 z-10`}></div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
