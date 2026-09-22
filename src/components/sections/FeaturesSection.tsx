'use client';

import { motion } from 'framer-motion';
import { 
  MagnifyingGlassIcon,
  BuildingOffice2Icon,
  AcademicCapIcon,
  ShieldCheckIcon,
  DevicePhoneMobileIcon,
  LightBulbIcon,
  CheckCircleIcon
} from '@heroicons/react/24/outline';

const mainFeatures = [
  {
    icon: MagnifyingGlassIcon,
    title: 'Trouver une Université selon votre Série',
    description: 'Découvrez les universités qui correspondent parfaitement à votre série du baccalauréat.',
    benefits: [
      'Recherche par série (TSE, TSS, TLL, TAL, TSECO, etc.)',
      'Universités publiques et privées du Mali',
      'Facultés et licences disponibles',
      'Conditions d\'admission et critères d\'éligibilité'
    ],
    iconBg: 'bg-[#13508f]/10 dark:bg-[#13508f]/30 text-[#13508f] dark:text-[#3b9df8]'
  },
  {
    icon: BuildingOffice2Icon,
    title: 'Annuaire des Universités Privées du Mali',
    description: 'Explorez toutes les universités privées autorisées du Mali avec leurs informations vérifiées.',
    benefits: [
      'Plus de 190 établissements répertoriés',
      'Coordonnées officielles (téléphone, email, adresse)',
      'Sites web et pages officielles',
      'Fiches détaillées avec facultés et licences'
    ],
    iconBg: 'bg-[#3b9df8]/15 dark:bg-[#3b9df8]/25 text-[#0e4379] dark:text-[#7cc5fb]'
  },
  {
    icon: AcademicCapIcon,
    title: 'Que faire après le BAC',
    description: 'Guide complet pour orienter votre parcours après l\'obtention du baccalauréat malien.',
    benefits: [
      'Parcours adaptés à chaque série du Baccalauréat',
      'Débouchés professionnels sur le marché malien',
      'Conseils d\'orientation personnalisés par IA',
      'Étapes clés pour votre inscription'
    ],
    iconBg: 'bg-[#13508f]/10 dark:bg-[#13508f]/30 text-[#13508f] dark:text-[#3b9df8]'
  }
];

const additionalFeatures = [
  {
    icon: DevicePhoneMobileIcon,
    title: 'Application Mobile Disponible',
    description: 'Accédez à toutes les fonctionnalités et à l\'annuaire directement depuis votre smartphone Android & iOS.'
  },
  {
    icon: LightBulbIcon,
    title: 'Conseils Personnalisés par IA',
    description: 'Posez vos questions au conseiller intelligent pour recevoir des recommandations adaptées à vos objectifs.'
  },
  {
    icon: ShieldCheckIcon,
    title: 'Données Récentes & Vérifiées',
    description: 'Informations continuellement mises à jour selon les directives du Ministère de l\'Enseignement Supérieur.'
  }
];

export function FeaturesSection() {
  return (
    <section id="features" className="py-20 bg-white dark:bg-[#0a192f]">
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
              Outils & Fonctionnalités
            </span>
          </div>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-[#13508f] dark:text-white mb-4">
            Tout pour réussir votre <span className="text-[#3b9df8]">orientation post-bac</span>
          </h2>
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Des outils spécialement conçus pour les élèves, bacheliers et étudiants du Mali afin de faire le meilleur choix d'études.
          </p>
        </motion.div>

        {/* Main Features Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {mainFeatures.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="rounded-3xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-[#112240] p-7 shadow-card hover:shadow-card-hover transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className={`p-3.5 rounded-2xl w-fit ${feature.iconBg} mb-5`}>
                  <feature.icon className="h-7 w-7" />
                </div>
                
                <h3 className="text-xl font-bold text-[#13508f] dark:text-white mb-3">
                  {feature.title}
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 mb-6 leading-relaxed">
                  {feature.description}
                </p>

                <div className="space-y-2.5 pt-4 border-t border-slate-100 dark:border-slate-800">
                  <span className="block text-xs font-bold uppercase tracking-wider text-[#3b9df8] mb-3">
                    Avantages clés :
                  </span>
                  <ul className="space-y-2">
                    {feature.benefits.map((benefit, benefitIndex) => (
                      <li key={benefitIndex} className="flex items-start space-x-2.5 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
                        <CheckCircleIcon className="h-4 w-4 text-[#3b9df8] shrink-0 mt-0.5" />
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Additional Features Row */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {additionalFeatures.map((feature, index) => (
              <div
                key={index}
                className="p-6 bg-slate-50 dark:bg-[#071324] rounded-2xl border border-slate-200/80 dark:border-slate-800 text-left flex items-start space-x-4"
              >
                <div className="p-2.5 rounded-xl bg-[#13508f]/10 dark:bg-[#13508f]/25 text-[#13508f] dark:text-[#3b9df8] shrink-0">
                  <feature.icon className="h-6 w-6 text-[#3b9df8]" />
                </div>
                <div>
                  <h4 className="font-bold text-[#13508f] dark:text-white text-sm mb-1">
                    {feature.title}
                  </h4>
                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  );
}
