'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  CodeBracketIcon,
  PuzzlePieceIcon,
  ArrowDownTrayIcon,
  ShieldCheckIcon,
  CpuChipIcon,
  BoltIcon
} from '@heroicons/react/24/outline';

const integrationTypes = [
  {
    icon: CodeBracketIcon,
    title: 'Données & API Ouverte',
    description: 'Accédez aux référentiels universitaires et fiches d\'orientation structurés au format JSON.',
    features: [
      'Référentiel des universités publiques & privées',
      'Matrice des séries de Bac et conditions',
      'Données nettoyées, vérifiées et actualisées',
      'Intégration rapide pour projets éducatifs'
    ]
  },
  {
    icon: PuzzlePieceIcon,
    title: 'Modules & Widgets Intégrables',
    description: 'Enrichissez votre site d\'établissement avec nos composants de recherche interactive.',
    features: [
      'Module de recherche de filières par série',
      'Fiches écoles avec coordonnées directes',
      'Adapté au responsive mobile et bureau',
      'Installation sans compétences techniques avancées'
    ]
  },
  {
    icon: ArrowDownTrayIcon,
    title: 'Exports & Rapports PDF',
    description: 'Téléchargez les guides et matrices pour une utilisation hors ligne ou une impression papier.',
    features: [
      'Guide officiel des bacheliers en PDF',
      'Listes des bourses disponibles',
      'Documents d\'orientation pour les proviseurs',
      'Synthèses des dates de concours au Mali'
    ]
  }
];

const technicalSpecs = [
  {
    icon: ShieldCheckIcon,
    title: 'Données Vérifiées',
    desc: 'Contenus alignés avec les ministères de l\'Éducation et de l\'Enseignement Supérieur du Mali.'
  },
  {
    icon: CpuChipIcon,
    title: 'Haute Disponibilité',
    desc: 'Architecture Next.js statique ultra-rapide avec un temps de réponse inférieur à 100ms.'
  },
  {
    icon: BoltIcon,
    title: 'Optimisé Bas Débit',
    desc: 'Poids plume et navigation fluide même avec une connexion internet limitée à Bamako et en région.'
  }
];

export function IntegrationSection() {
  return (
    <section id="integration" className="py-16 sm:py-24 bg-white dark:bg-[#0a192f]">
      <div className="container-custom">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#13508F]/10 dark:bg-[#3B9DF8]/10 text-[#13508F] dark:text-[#3B9DF8] text-xs font-bold uppercase tracking-wider mb-4">
            Ressources Techniques & Partenaires
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-4">
            Pour les développeurs et{' '}
            <span className="text-[#13508F] dark:text-[#3B9DF8]">établissements scolaires</span>
          </h2>
          <p className="text-slate-600 dark:text-slate-300 text-base sm:text-lg">
            Découvrez nos solutions pour intégrer l’information d’orientation dans vos plateformes ou collaborer avec notre équipe.
          </p>
        </motion.div>

        {/* Integration Types */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 mb-16">
          {integrationTypes.map((type, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-slate-50/70 dark:bg-[#112240] rounded-2xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-card hover:border-[#13508F]/40 dark:hover:border-[#3B9DF8]/40 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="w-12 h-12 rounded-xl bg-[#13508F]/10 dark:bg-[#3B9DF8]/10 text-[#13508F] dark:text-[#3B9DF8] flex items-center justify-center mb-6">
                  <type.icon className="h-6 w-6" />
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white mb-2 leading-snug">
                  {type.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mb-6 leading-relaxed">
                  {type.description}
                </p>

                <ul className="space-y-2.5 text-xs sm:text-sm border-t border-slate-200 dark:border-slate-800 pt-5">
                  {type.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start gap-2.5 text-slate-700 dark:text-slate-300">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#3B9DF8] mt-2 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Tech Highlights */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {technicalSpecs.map((spec, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="p-6 rounded-2xl bg-white dark:bg-[#112240] border border-slate-200 dark:border-slate-800 text-center"
            >
              <div className="w-12 h-12 rounded-xl bg-[#13508F]/10 dark:bg-[#3B9DF8]/10 text-[#13508F] dark:text-[#3B9DF8] flex items-center justify-center mx-auto mb-4">
                <spec.icon className="w-6 h-6" />
              </div>
              <h4 className="font-bold text-slate-900 dark:text-white text-base mb-1.5">
                {spec.title}
              </h4>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                {spec.desc}
              </p>
            </motion.div>
          ))}
        </div>

        {/* CTA Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center p-8 sm:p-12 rounded-3xl bg-[#13508F] text-white shadow-xl relative overflow-hidden"
        >
          <div className="relative z-10 max-w-2xl mx-auto">
            <h3 className="text-2xl sm:text-3xl font-extrabold mb-3">
              Vous représentez un établissement ou un projet ?
            </h3>
            <p className="text-slate-200 text-sm sm:text-base mb-8 leading-relaxed">
              Contactez notre équipe pour référencer vos formations, organiser une session d'information ou explorer un partenariat technique.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/docs"
                className="px-6 py-3.5 rounded-xl bg-[#3B9DF8] hover:bg-[#258bf0] text-white font-semibold text-sm transition-all duration-200 shadow-md min-h-[44px] inline-flex items-center justify-center"
              >
                Consulter la Documentation
              </Link>
              <Link
                href="/support"
                className="px-6 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-sm border border-white/20 transition-all duration-200 min-h-[44px] inline-flex items-center justify-center"
              >
                Contacter notre équipe
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
