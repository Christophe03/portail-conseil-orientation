'use client';

import { motion } from 'framer-motion';
import { 
  HeartIcon,
  LightBulbIcon,
  ShieldCheckIcon,
  GlobeAltIcon,
  UsersIcon,
  AcademicCapIcon
} from '@heroicons/react/24/outline';

const values = [
  {
    icon: AcademicCapIcon,
    title: 'Excellence Pédagogique',
    description: 'Nous nous engageons à fournir des informations académiques rigoureuses et vérifiées pour chaque filière.',
    iconBg: 'bg-[#13508f]/10 dark:bg-[#13508f]/30 text-[#13508f] dark:text-[#3b9df8]'
  },
  {
    icon: LightBulbIcon,
    title: 'Innovation & IA',
    description: 'Nous exploitons l\'intelligence artificielle pour offrir une orientation sur-mesure et accessible à tous.',
    iconBg: 'bg-[#3b9df8]/15 dark:bg-[#3b9df8]/25 text-[#0e4379] dark:text-[#7cc5fb]'
  },
  {
    icon: GlobeAltIcon,
    title: 'Accessibilité Nationale',
    description: 'Rendre l\'information disponible partout au Mali, de Bamako aux régions, avec un mode hors-ligne sur mobile.',
    iconBg: 'bg-[#13508f]/10 dark:bg-[#13508f]/30 text-[#13508f] dark:text-[#3b9df8]'
  },
  {
    icon: ShieldCheckIcon,
    title: 'Transparence & Fiabilité',
    description: 'Seuls les établissements légalement autorisés et reconnus par l\'État malien sont mis en avant.',
    iconBg: 'bg-[#3b9df8]/15 dark:bg-[#3b9df8]/25 text-[#0e4379] dark:text-[#7cc5fb]'
  },
  {
    icon: UsersIcon,
    title: 'Écoute de la Communauté',
    description: 'Une équipe proche des lycéens, bacheliers et parents pour répondre à leurs interrogations concrètes.',
    iconBg: 'bg-[#13508f]/10 dark:bg-[#13508f]/30 text-[#13508f] dark:text-[#3b9df8]'
  },
  {
    icon: HeartIcon,
    title: 'Gratuité & Impact Social',
    description: 'L\'accès aux données d\'orientation est et restera gratuit pour tous les jeunes Maliens.',
    iconBg: 'bg-[#3b9df8]/15 dark:bg-[#3b9df8]/25 text-[#0e4379] dark:text-[#7cc5fb]'
  }
];

export function ValuesSection() {
  return (
    <section className="py-20 bg-white dark:bg-[#0a192f]">
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
              Éthique & Engagement
            </span>
          </div>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-[#13508f] dark:text-white mb-4">
            Nos <span className="text-[#3b9df8]">Valeurs</span>
          </h2>
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Les principes fondamentaux qui guident chacune de nos actions et le développement de nos outils éducatifs.
          </p>
        </motion.div>

        {/* Values Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {values.map((value, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="p-7 rounded-3xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-[#112240] shadow-card hover:shadow-card-hover transition-all duration-300"
            >
              <div className={`inline-flex items-center justify-center w-14 h-14 rounded-2xl mb-5 ${value.iconBg}`}>
                <value.icon className="h-7 w-7" />
              </div>
              <h3 className="text-lg font-bold text-[#13508f] dark:text-white mb-2">
                {value.title}
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                {value.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Commitment Banner */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="p-8 sm:p-12 rounded-3xl bg-slate-50 dark:bg-[#071324] border border-slate-200/80 dark:border-slate-800 text-center max-w-4xl mx-auto"
        >
          <h3 className="text-2xl font-bold text-[#13508f] dark:text-white mb-3">
            Au service de la jeunesse et de l'éducation au Mali
          </h3>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Chaque jour, nous continuons d'améliorer nos bases de données et notre IA pour que chaque bachelier malien puisse embrasser la carrière de son choix en toute confiance.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
