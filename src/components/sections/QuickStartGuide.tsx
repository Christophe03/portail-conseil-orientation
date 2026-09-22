'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  RocketLaunchIcon,
  DevicePhoneMobileIcon,
  AcademicCapIcon,
  SparklesIcon,
  CheckCircleIcon,
  LightBulbIcon,
  ArrowRightIcon
} from '@heroicons/react/24/outline';

const steps = [
  {
    icon: DevicePhoneMobileIcon,
    step: '01',
    title: 'Installer l\'application ou ouvrir le portail',
    description: 'Accédez à l\'information où que vous soyez au Mali.',
    details: [
      'Application Android légère (~15 Mo) compatible Android 6.0+',
      'Mode hors ligne pour consulter les fiches sans connexion',
      'Portail web accessible depuis n\'importe quel smartphone ou PC',
      'Données constamment synchronisées et vérifiées'
    ]
  },
  {
    icon: AcademicCapIcon,
    step: '02',
    title: 'Renseigner ou tester sa Série du Bac',
    description: 'Vérifiez instantanément les portes ouvertes par votre série.',
    details: [
      'Séries scientifiques : TSE, TSExp, STI, TSEco',
      'Séries littéraires et sciences humaines : TSS, TLL, TAL',
      'Visualisez les filières prioritaires et les filières sous conditions',
      'Vérifiez les notes ou matières éliminatoires requises'
    ]
  },
  {
    icon: SparklesIcon,
    step: '03',
    title: 'Comparer les Universités & Facultés',
    description: 'Pesez les avantages entre enseignement public et instituts privés.',
    details: [
      'Universités publiques de Bamako et de l\'intérieur du Mali',
      'Frais d\'inscription d\'État vs frais de scolarité privés',
      'Débouchés professionnels réels sur le marché de l\'emploi local',
      'Adresses, campus et contacts téléphoniques des secrétariats'
    ]
  },
  {
    icon: CheckCircleIcon,
    step: '04',
    title: 'Préparer son dossier d\'inscription',
    description: 'Anticipez les pièces administratives sans stress.',
    details: [
      'Relevé de notes du Baccalauréat légalisé',
      'Extrait d\'acte de naissance et certificat de nationalité',
      'Modalités spécifiques d\'inscription en ligne ou sur place',
      'Dates limites et sessions de préinscription'
    ]
  }
];

const practicalTips = [
  'Commencez votre prospection dès le deuxième trimestre de terminale, sans attendre les résultats définitifs du Bac.',
  'Identifiez au moins deux plans de secours : une filière de rêve et une alternative solide dans une autre faculté.',
  'Consultez les fiches métiers associées pour vous assurer que les débouchés correspondent à vos aspirations professionnelles.',
  'Utilisez la recherche par ville pour repérer les écoles proches de votre hébergement afin de réduire les coûts.'
];

export function QuickStartGuide() {
  return (
    <section id="first-steps" className="mb-16">
      {/* Title */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="mb-10"
      >
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#13508F]/10 dark:bg-[#3B9DF8]/10 text-[#13508F] dark:text-[#3B9DF8] text-xs font-bold uppercase tracking-wider mb-4">
          Guide de Démarrage
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-3">
          Votre feuille de route en 4 étapes
        </h2>
        <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base max-w-2xl leading-relaxed">
          Suivez cette méthode claire pour préparer votre transition du lycée vers l'enseignement supérieur au Mali.
        </p>
      </motion.div>

      {/* Steps Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
        {steps.map((step, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="bg-white dark:bg-[#112240] rounded-2xl p-6 sm:p-7 border border-slate-200 dark:border-slate-800 shadow-card hover:border-[#13508F]/40 dark:hover:border-[#3B9DF8]/40 transition-all duration-300 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="w-10 h-10 rounded-xl bg-[#13508F]/10 dark:bg-[#3B9DF8]/10 text-[#13508F] dark:text-[#3B9DF8] flex items-center justify-center">
                  <step.icon className="h-5 w-5" />
                </div>
                <span className="text-xs font-bold text-slate-400 dark:text-slate-500">
                  ÉTAPE {step.step}
                </span>
              </div>

              <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white mb-1.5 leading-snug">
                {step.title}
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mb-4">
                {step.description}
              </p>

              <ul className="space-y-2 border-t border-slate-100 dark:border-slate-800/80 pt-4">
                {step.details.map((detail, detailIndex) => (
                  <li key={detailIndex} className="flex items-start gap-2 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#3B9DF8] mt-2 flex-shrink-0" />
                    <span>{detail}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Practical Tips */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="rounded-2xl p-6 sm:p-8 bg-slate-50 dark:bg-[#112240] border border-slate-200 dark:border-slate-800 mb-10"
      >
        <div className="flex items-start gap-3.5 mb-6">
          <div className="w-10 h-10 rounded-xl bg-[#13508F]/10 dark:bg-[#3B9DF8]/10 text-[#13508F] dark:text-[#3B9DF8] flex items-center justify-center flex-shrink-0 mt-0.5">
            <LightBulbIcon className="h-6 w-6" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">
              Conseils d'experts pour maximiser vos chances
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300">
              Recommandations élaborées avec des conseillers d'orientation maliens.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
          {practicalTips.map((tip, index) => (
            <div key={index} className="flex items-start gap-2.5 p-3 rounded-xl bg-white dark:bg-[#0a192f] border border-slate-200/80 dark:border-slate-800">
              <CheckCircleIcon className="h-4 w-4 text-[#3B9DF8] flex-shrink-0 mt-0.5" />
              <span className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">{tip}</span>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Action links */}
      <div className="flex flex-wrap gap-3.5">
        <Link
          href="/universites/series"
          className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[#13508F] hover:bg-[#0e3a6a] text-white font-semibold text-sm shadow-md shadow-[#13508F]/20 transition-all duration-200 min-h-[44px]"
        >
          <span>Consulter les filières par série</span>
          <ArrowRightIcon className="h-4 w-4" />
        </Link>
        <Link
          href="/universites"
          className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-white dark:bg-[#112240] hover:bg-slate-100 dark:hover:bg-[#1b345f] text-slate-800 dark:text-slate-200 font-semibold text-sm border border-slate-200 dark:border-slate-700 transition-all duration-200 min-h-[44px]"
        >
          <span>Voir les universités publiques & privées</span>
        </Link>
      </div>
    </section>
  );
}
