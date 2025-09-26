'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import { 
  UsersIcon,
  StarIcon,
  ChartBarIcon
} from '@heroicons/react/24/outline';

const stats = [
  {
    icon: UsersIcon,
    value: 50000,
    suffix: '+',
    label: 'Utilisateurs Actifs',
    description: 'Étudiants qui utilisent notre application quotidiennement',
    color: 'from-blue-500 to-cyan-500',
    delay: 0.1,
  },
  {
    icon: StarIcon,
    value: 4.8,
    suffix: '/5',
    label: 'Note Moyenne',
    description: 'Évaluation des utilisateurs sur les stores',
    color: 'from-yellow-500 to-amber-500',
    delay: 0.2,
  },
  {
    icon: ChartBarIcon,
    value: 95,
    suffix: '%',
    label: 'Taux de Satisfaction',
    description: 'Utilisateurs satisfaits de notre service',
    color: 'from-indigo-500 to-blue-500',
    delay: 0.3,
  },
];

const achievements = [
  {
    year: '2024',
    title: 'Lancement Officiel',
    description: 'Application disponible sur Android via APKPure',
    icon: '🚀',
  },
  {
    year: '2024',
    title: '10K Utilisateurs',
    description: 'Premier objectif atteint en 3 mois',
    icon: '🎯',
  },
];

export function StatsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [counts, setCounts] = useState(stats.map(() => 0));

  useEffect(() => {
    if (isInView) {
      const duration = 2000; // 2 seconds
      const steps = 60;
      const stepDuration = duration / steps;

      const timer = setInterval(() => {
        setCounts(prevCounts => 
          prevCounts.map((count, index) => {
            const target = stats[index].value;
            const increment = target / steps;
            if (count < target) {
              return Math.min(count + increment, target);
            }
            return target;
          })
        );
      }, stepDuration);

      return () => clearInterval(timer);
    }
  }, [isInView]);

  return (
    <section className="section-padding bg-gradient-to-br from-neutral-900 to-neutral-800 text-white">
      <div className="container-custom">
        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            Chiffres{' '}
            <span className="bg-gradient-to-r from-primary-400 to-secondary-400 bg-clip-text text-transparent">
              Impressionnants
            </span>
          </h2>
          <p className="text-xl text-neutral-300 max-w-3xl mx-auto">
            Découvrez l'impact de notre application sur la communauté étudiante 
            et les résultats exceptionnels que nous avons obtenus.
          </p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: stat.delay }}
              whileHover={{ y: -8, scale: 1.02 }}
              className="text-center group"
            >
              <div className="card-hover p-8 h-full bg-white/5 backdrop-blur-sm border border-white/10">
                {/* Icon */}
                <div className={`inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br ${stat.color} mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <stat.icon className="h-10 w-10 text-white" />
                </div>

                {/* Value */}
                <div className="text-4xl md:text-5xl font-bold mb-2">
                  {stat.value % 1 === 0 ? Math.floor(counts[index]) : counts[index].toFixed(1)}
                  <span className="text-primary-400">{stat.suffix}</span>
                </div>

                {/* Label */}
                <h3 className="text-xl font-semibold mb-3 text-white">
                  {stat.label}
                </h3>

                {/* Description */}
                <p className="text-neutral-300 text-sm leading-relaxed">
                  {stat.description}
                </p>

                {/* Hover Effect */}
                <div className="mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className={`w-12 h-1 bg-gradient-to-r ${stat.color} rounded-full mx-auto`}></div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Achievements Timeline */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mb-16"
        >
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-center mb-10">
              Notre Parcours de Réussite
            </h3>

            {/* Timeline */}
            <div className="relative">
              {/* Line (vertical on mobile, horizontal on lg) */}
              <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary-400 to-secondary-400 lg:left-0 lg:top-8 lg:bottom-auto lg:h-0.5 lg:w-full lg:bg-gradient-to-r"></div>

              <div className="space-y-10 lg:space-y-0 lg:grid lg:grid-cols-2 lg:gap-10">
                {achievements.map((a, i) => (
                  <motion.div
                    key={`${a.title}-${i}`}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.1 * i }}
                    className="relative pl-12 lg:pl-0"
                  >
                    {/* Node */}
                    <div className="absolute left-4 -translate-x-1/2 top-0 lg:left-auto lg:top-auto lg:relative lg:translate-x-0 lg:mb-4">
                      <div className="h-3 w-3 rounded-full bg-primary-300 shadow-lg"></div>
                    </div>
                    <div className="card-hover bg-white/5 border border-white/10 rounded-xl p-5">
                      <div className="text-primary-300 font-semibold text-sm">{a.year}</div>
                      <h4 className="text-lg font-semibold text-white mt-1">{a.title}</h4>
                      <p className="text-neutral-300 text-sm mt-2">{a.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 1.0 }}
          className="text-center"
        >
          <div className="bg-gradient-to-r from-primary-600/20 to-secondary-600/20 backdrop-blur-sm border border-primary-500/30 rounded-2xl p-8 md:p-12">
            <h3 className="text-2xl md:text-3xl font-bold mb-4">
              Rejoignez la Révolution de l'Orientation
            </h3>
            <p className="text-lg text-neutral-300 mb-8 max-w-2xl mx-auto">
              Faites partie de cette communauté grandissante et transformez 
              votre parcours académique avec notre application innovante.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="btn-primary btn-lg bg-gradient-to-r from-primary-600 to-secondary-600 hover:from-primary-700 hover:to-secondary-700">
                Commencer Maintenant
              </button>
              <button className="btn-outline btn-lg border-white/30 text-white hover:bg-white hover:text-neutral-900">
                En Savoir Plus
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
