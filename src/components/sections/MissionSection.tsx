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
    description: 'Faciliter l\'orientation scolaire et post-bac des élèves et étudiants sur l\'ensemble du territoire malien.',
    iconBg: 'bg-[#13508f]/10 dark:bg-[#13508f]/25 text-[#13508f] dark:text-[#3b9df8]'
  },
  {
    icon: LightBulbIcon,
    title: 'Notre Vision',
    description: 'Permettre à chaque jeune au Mali de bâtir un parcours académique aligné avec ses talents et les besoins du pays.',
    iconBg: 'bg-[#3b9df8]/15 dark:bg-[#3b9df8]/25 text-[#0e4379] dark:text-[#7cc5fb]'
  },
  {
    icon: HeartIcon,
    title: 'Nos Valeurs',
    description: 'Accessibilité universelle, rigueur des données éducatives, gratuité et impact social positif pour les familles.',
    iconBg: 'bg-[#13508f]/10 dark:bg-[#13508f]/25 text-[#13508f] dark:text-[#3b9df8]'
  },
  {
    icon: GlobeAltIcon,
    title: 'Notre Engagement',
    description: 'Actualiser sans cesse les fiches des facultés, licences et débouchés en partenariat avec les acteurs académiques.',
    iconBg: 'bg-[#3b9df8]/15 dark:bg-[#3b9df8]/25 text-[#0e4379] dark:text-[#7cc5fb]'
  }
];

export function MissionSection() {
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
              Piliers Fondateurs
            </span>
          </div>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-[#13508f] dark:text-white mb-4">
            Notre Mission & <span className="text-[#3b9df8]">Notre Vision</span>
          </h2>
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Depuis notre lancement, nous centralisons l'information pédagogique pour que la distance géographique ou le manque de documentation ne soient plus un obstacle à la réussite au Mali.
          </p>
        </motion.div>

        {/* Mission Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {missions.map((mission, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="text-center p-7 rounded-3xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-[#112240] shadow-card hover:shadow-card-hover transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-5 ${mission.iconBg}`}>
                  <mission.icon className="h-8 w-8" />
                </div>
                <h3 className="text-lg font-bold text-[#13508f] dark:text-white mb-3">
                  {mission.title}
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  {mission.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Story Section Callout */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-16 p-8 sm:p-12 rounded-3xl bg-slate-50 dark:bg-[#071324] border border-slate-200/80 dark:border-slate-800 max-w-4xl mx-auto text-center"
        >
          <h3 className="text-2xl font-extrabold text-[#13508f] dark:text-white mb-4">
            L'Origine du Projet
          </h3>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
            Tout est parti d'un constat en 2023 : chaque année, des dizaines de milliers de bacheliers maliens se retrouvent désemparés devant la complexité des inscriptions universitaires et le manque de visibilité sur les débouchés réels.
          </p>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
            Nous avons donc allié la technologie mobile et l'intelligence artificielle pour concevoir un guide interactif complet, gratuit et adapté aux réalités du Mali, permettant à chacun de trouver sa filière d'excellence.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
