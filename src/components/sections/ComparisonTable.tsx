'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { APP_DOWNLOAD_URL } from '@/lib/app-links';
import { 
  CheckIcon,
  XMarkIcon,
  SparklesIcon,
  AcademicCapIcon,
  BuildingLibraryIcon
} from '@heroicons/react/24/outline';

const comparisonRows = [
  {
    feature: 'Fiches détaillées des universités publiques du Mali (USTTB, ULSHB, USSGB, USJPB)',
    lyceen: true,
    etudiant: true,
    etablissement: true
  },
  {
    feature: 'Répertoire certifié des universités & instituts privés (Bamako & régions)',
    lyceen: true,
    etudiant: true,
    etablissement: true
  },
  {
    feature: 'Matrice de correspondance Série du Bac ➔ Filières accessibles',
    lyceen: true,
    etudiant: true,
    etablissement: true
  },
  {
    feature: 'Conditions d\'admission officielles, dossiers & frais de scolarité',
    lyceen: true,
    etudiant: true,
    etablissement: true
  },
  {
    feature: 'Conseiller d\'orientation virtuel par IA pour questions personnalisées',
    lyceen: true,
    etudiant: true,
    etablissement: true
  },
  {
    feature: 'Mode hors-ligne sur application mobile Android',
    lyceen: true,
    etudiant: true,
    etablissement: true
  },
  {
    feature: 'Recherche de bourses d\'études & opportunités de mobilités',
    lyceen: true,
    etudiant: true,
    etablissement: true
  },
  {
    feature: 'Ateliers et séances d\'orientation collectives dans les lycées',
    lyceen: false,
    etudiant: false,
    etablissement: true
  },
  {
    feature: 'Tableau de bord statistique pour administration scolaire',
    lyceen: false,
    etudiant: false,
    etablissement: true
  }
];

const profiles = [
  {
    name: 'Lycéens & Bacheliers',
    tag: 'Accès 100% Gratuit',
    icon: AcademicCapIcon,
    price: 'Gratuit',
    subtext: 'Pour tous les élèves du Mali',
    description: 'Trouvez la série et la faculté adaptées à vos talents et ambitions.',
    cta: 'Télécharger l\'application',
    href: APP_DOWNLOAD_URL,
    external: true,
    popular: true
  },
  {
    name: 'Étudiants Universitaires',
    tag: 'Accès 100% Gratuit',
    icon: SparklesIcon,
    price: 'Gratuit',
    subtext: 'Licence, Master & Doctorat',
    description: 'Réorientations, passerelles, débouchés professionnels et bourses.',
    cta: 'Explorer les filières',
    href: '/universites',
    external: false,
    popular: false
  },
  {
    name: 'Lycées & Universités',
    tag: 'Partenariat Éducatif',
    icon: BuildingLibraryIcon,
    price: 'Sur Mesure',
    subtext: 'Accompagnement d\'établissements',
    description: 'Sessions d\'orientation dans vos classes et promotion de vos filières.',
    cta: 'Demander un partenariat',
    href: '/support',
    external: false,
    popular: false
  }
];

export function ComparisonTable() {
  return (
    <section id="formules" className="py-16 sm:py-24 bg-slate-50/70 dark:bg-[#0a192f] border-b border-slate-200 dark:border-slate-800">
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
            Offre & Accessibilité
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-4">
            Une plateforme pensée pour chaque{' '}
            <span className="text-[#13508F] dark:text-[#3B9DF8]">acteur de l'éducation</span>
          </h2>
          <p className="text-slate-600 dark:text-slate-300 text-base sm:text-lg">
            Notre engagement est clair : l'information d'orientation est un bien public accessible gratuitement à chaque apprenant malien.
          </p>
        </motion.div>

        {/* Profile Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mb-16">
          {profiles.map((profile, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`relative rounded-3xl p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 ${
                profile.popular
                  ? 'bg-white dark:bg-[#112240] border-2 border-[#13508F] dark:border-[#3B9DF8] shadow-card'
                  : 'bg-white/80 dark:bg-[#112240]/80 border border-slate-200 dark:border-slate-800 shadow-sm'
              }`}
            >
              {profile.popular && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                  <span className="px-4 py-1 rounded-full text-xs font-bold bg-[#13508F] text-white shadow-sm">
                    Le plus recommandé
                  </span>
                </div>
              )}

              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-[#13508F]/10 dark:bg-[#3B9DF8]/10 text-[#13508F] dark:text-[#3B9DF8] flex items-center justify-center">
                    <profile.icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-base sm:text-lg text-slate-900 dark:text-white leading-tight">
                      {profile.name}
                    </h3>
                    <span className="text-xs font-medium text-[#13508F] dark:text-[#3B9DF8]">
                      {profile.tag}
                    </span>
                  </div>
                </div>

                <div className="my-5 pb-5 border-b border-slate-100 dark:border-slate-800">
                  <div className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
                    {profile.price}
                  </div>
                  <div className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                    {profile.subtext}
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-6">
                  {profile.description}
                </p>
              </div>

              {profile.external ? (
                <a
                  href={profile.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`w-full text-center py-3 px-5 rounded-xl font-semibold text-sm transition-all duration-200 min-h-[44px] flex items-center justify-center ${
                    profile.popular
                      ? 'bg-[#13508F] hover:bg-[#0e3a6a] text-white shadow-md shadow-[#13508F]/20'
                      : 'bg-slate-100 hover:bg-slate-200 text-slate-900 dark:bg-slate-800 dark:hover:bg-slate-700 dark:text-white'
                  }`}
                >
                  {profile.cta}
                </a>
              ) : (
                <Link
                  href={profile.href}
                  className={`w-full text-center py-3 px-5 rounded-xl font-semibold text-sm transition-all duration-200 min-h-[44px] flex items-center justify-center ${
                    profile.popular
                      ? 'bg-[#13508F] hover:bg-[#0e3a6a] text-white shadow-md shadow-[#13508F]/20'
                      : 'bg-slate-100 hover:bg-slate-200 text-slate-900 dark:bg-slate-800 dark:hover:bg-slate-700 dark:text-white'
                  }`}
                >
                  {profile.cta}
                </Link>
              )}
            </motion.div>
          ))}
        </div>

        {/* Feature Matrix Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="rounded-3xl bg-white dark:bg-[#112240] border border-slate-200 dark:border-slate-800 shadow-card overflow-hidden"
        >
          <div className="p-6 border-b border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-[#0a192f]/50">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">
              Tableau comparatif des fonctionnalités
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
              Détail des services accessibles selon votre profil.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-200 dark:border-slate-800 text-xs uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  <th className="py-4 px-6 font-semibold">Fonctionnalité</th>
                  <th className="py-4 px-6 text-center font-semibold">Lycéens</th>
                  <th className="py-4 px-6 text-center font-semibold">Étudiants</th>
                  <th className="py-4 px-6 text-center font-semibold">Établissements</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-xs sm:text-sm">
                {comparisonRows.map((row, idx) => (
                  <tr key={idx} className="hover:bg-slate-50/80 dark:hover:bg-slate-800/40 transition-colors">
                    <td className="py-4 px-6 font-medium text-slate-800 dark:text-slate-200">
                      {row.feature}
                    </td>
                    <td className="py-4 px-6 text-center">
                      {row.lyceen ? (
                        <CheckIcon className="w-5 h-5 text-emerald-600 dark:text-emerald-400 mx-auto" />
                      ) : (
                        <XMarkIcon className="w-5 h-5 text-slate-300 dark:text-slate-600 mx-auto" />
                      )}
                    </td>
                    <td className="py-4 px-6 text-center">
                      {row.etudiant ? (
                        <CheckIcon className="w-5 h-5 text-emerald-600 dark:text-emerald-400 mx-auto" />
                      ) : (
                        <XMarkIcon className="w-5 h-5 text-slate-300 dark:text-slate-600 mx-auto" />
                      )}
                    </td>
                    <td className="py-4 px-6 text-center">
                      {row.etablissement ? (
                        <CheckIcon className="w-5 h-5 text-emerald-600 dark:text-emerald-400 mx-auto" />
                      ) : (
                        <XMarkIcon className="w-5 h-5 text-slate-300 dark:text-slate-600 mx-auto" />
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
