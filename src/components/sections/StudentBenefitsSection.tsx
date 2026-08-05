'use client';

import { motion } from 'framer-motion';
import {
  AcademicCapIcon,
  SparklesIcon,
  MapPinIcon,
  BriefcaseIcon,
  DevicePhoneMobileIcon,
  ArrowRightIcon,
  BookOpenIcon,
  UserGroupIcon
} from '@heroicons/react/24/outline';
import Link from 'next/link';

const elevesBenefits = [
  {
    icon: BookOpenIcon,
    title: 'Choix de série éclairé',
    description: 'Comprenez les exigences de chaque série du BAC (TSE, TSS, TAL, TLL, TSECO...) et débloquez les filières universitaires correspondantes.',
    tag: 'Lycée'
  },
  {
    icon: SparklesIcon,
    title: 'Orientation guidée par l\'IA',
    description: 'Bénéficiez de conseils personnalisés basés sur vos passions et aptitudes grâce à notre assistant virtuel spécialisé.',
    tag: 'Intelligence Artificielle'
  },
  {
    icon: AcademicCapIcon,
    title: 'Anticipation du Post-BAC',
    description: 'Projetez-vous sereinement après le baccalauréat en découvrant les diplômes et débouchés accessibles.',
    tag: 'Avenir'
  }
];

const etudiantsBenefits = [
  {
    icon: MapPinIcon,
    title: 'Annuaire vérifié & Filtre par ville',
    description: 'Accédez aux coordonnées complètes (téléphone, email, adresse, site web) de plus de 190 établissements privés et publics autorisés au Mali.',
    tag: '190+ Établissements'
  },
  {
    icon: BriefcaseIcon,
    title: 'Insertion & Métiers porteurs',
    description: 'Découvrez les licences et masters qui répondent aux besoins réels du marché de l\'emploi malien et africain.',
    tag: 'Débouchés'
  },
  {
    icon: DevicePhoneMobileIcon,
    title: 'Mode Hors-Ligne & Gratuit',
    description: 'Consultez les fiches universitaires et le guide d\'orientation à tout moment via notre application mobile, même sans connexion internet.',
    tag: 'Mobile First'
  }
];

const stats = [
  { label: 'Universités & Écoles', value: '190+' },
  { label: 'Séries du BAC covered', value: '10+' },
  { label: 'Accès application', value: '100% Gratuit' },
  { label: 'Orientation personnalisée', value: 'Propulsée par l\'IA' }
];

export function StudentBenefitsSection() {
  return (
    <section className="relative py-20 overflow-hidden bg-neutral-50 dark:bg-neutral-900/50">
      {/* Glow Effects */}
      <div className="absolute top-1/4 -left-20 h-72 w-72 rounded-full bg-primary-500/10 blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 -right-20 h-72 w-72 rounded-full bg-secondary-500/10 blur-3xl pointer-events-none" />

      <div className="container-custom relative z-10">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 rounded-full bg-primary-100 dark:bg-primary-900/40 px-4 py-1.5 text-xs font-semibold text-primary-700 dark:text-primary-300 mb-4"
          >
            <SparklesIcon className="h-4 w-4 text-primary-600 dark:text-primary-400" />
            <span>Notre Solution & Vos Avantages</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl font-extrabold tracking-tight text-neutral-900 dark:text-white"
          >
            Un accompagnement sur-mesure pour les{' '}
            <span className="bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
              élèves et étudiants
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mt-4 text-base sm:text-lg text-neutral-600 dark:text-neutral-300"
          >
            Conseil d&apos;Orientation Mali résout le manque d&apos;informations fiables en centralisant toutes les universités, séries du BAC et débouchés professionnels au même endroit.
          </motion.p>
        </div>

        {/* Benefits Dual Block */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Card Block 1: For Pupils / Lycéens */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="rounded-3xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-6 sm:p-8 shadow-soft flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="rounded-2xl p-3 bg-primary-50 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400">
                  <UserGroupIcon className="h-7 w-7" />
                </div>
                <div>
                  <span className="text-xs uppercase font-bold tracking-wider text-primary-600 dark:text-primary-400">
                    Pour les Éleves & Lycéens
                  </span>
                  <h3 className="text-xl sm:text-2xl font-bold text-neutral-900 dark:text-white">
                    Réussir son choix de série & préparer le BAC
                  </h3>
                </div>
              </div>

              <div className="space-y-5">
                {elevesBenefits.map((item, idx) => {
                  const Icon = item.icon;
                  return (
                    <div key={idx} className="flex items-start gap-4 p-3 rounded-2xl hover:bg-neutral-50 dark:hover:bg-neutral-800/50 transition">
                      <div className="rounded-xl p-2.5 bg-primary-100/60 dark:bg-primary-900/40 text-primary-700 dark:text-primary-300 shrink-0 mt-0.5">
                        <Icon className="h-5 w-5" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="font-semibold text-neutral-900 dark:text-white text-base">
                            {item.title}
                          </h4>
                          <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400">
                            {item.tag}
                          </span>
                        </div>
                        <p className="text-sm text-neutral-600 dark:text-neutral-400 mt-1 leading-relaxed">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-neutral-100 dark:border-neutral-800 flex items-center justify-between">
              <span className="text-xs text-neutral-500 dark:text-neutral-400">
                Explorez vos séries du BAC dès maintenant
              </span>
              <Link
                href="/universites/series"
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary-600 hover:text-primary-700 dark:text-primary-400 transition"
              >
                <span>Voir les séries</span>
                <ArrowRightIcon className="h-4 w-4" />
              </Link>
            </div>
          </motion.div>

          {/* Card Block 2: For University Students / Bacheliers */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="rounded-3xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-6 sm:p-8 shadow-soft flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="rounded-2xl p-3 bg-secondary-50 dark:bg-secondary-900/30 text-secondary-600 dark:text-secondary-400">
                  <AcademicCapIcon className="h-7 w-7" />
                </div>
                <div>
                  <span className="text-xs uppercase font-bold tracking-wider text-secondary-600 dark:text-secondary-400">
                    Pour les Étudiants & Bacheliers
                  </span>
                  <h3 className="text-xl sm:text-2xl font-bold text-neutral-900 dark:text-white">
                    Trouver son université & sa filière d&apos;avenir
                  </h3>
                </div>
              </div>

              <div className="space-y-5">
                {etudiantsBenefits.map((item, idx) => {
                  const Icon = item.icon;
                  return (
                    <div key={idx} className="flex items-start gap-4 p-3 rounded-2xl hover:bg-neutral-50 dark:hover:bg-neutral-800/50 transition">
                      <div className="rounded-xl p-2.5 bg-secondary-100/60 dark:bg-secondary-900/40 text-secondary-700 dark:text-secondary-300 shrink-0 mt-0.5">
                        <Icon className="h-5 w-5" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="font-semibold text-neutral-900 dark:text-white text-base">
                            {item.title}
                          </h4>
                          <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400">
                            {item.tag}
                          </span>
                        </div>
                        <p className="text-sm text-neutral-600 dark:text-neutral-400 mt-1 leading-relaxed">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-neutral-100 dark:border-neutral-800 flex items-center justify-between">
              <span className="text-xs text-neutral-500 dark:text-neutral-400">
                Trouvez votre établissement privé ou public
              </span>
              <Link
                href="/universites"
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-secondary-600 hover:text-secondary-700 dark:text-secondary-400 transition"
              >
                <span>Explorer l&apos;annuaire</span>
                <ArrowRightIcon className="h-4 w-4" />
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Key Metrics / Highlights Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-12 rounded-2xl bg-gradient-to-r from-primary-600 to-secondary-600 p-6 sm:p-8 text-white shadow-medium"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center divide-x-0 md:divide-x divide-white/10">
            {stats.map((stat, i) => (
              <div key={i} className="px-2">
                <div className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                  {stat.value}
                </div>
                <div className="text-xs sm:text-sm text-white/80 mt-1 font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
