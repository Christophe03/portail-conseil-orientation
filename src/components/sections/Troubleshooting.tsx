'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { 
  WrenchScrewdriverIcon,
  ExclamationCircleIcon,
  CheckCircleIcon,
  ArrowPathIcon,
  MagnifyingGlassIcon,
  ChevronDownIcon
} from '@heroicons/react/24/outline';

const commonIssues = [
  {
    category: 'Installation & APK',
    issues: [
      {
        problem: 'Avertissement Android : "Fichier potentiellement dangereux"',
        solution: 'Il s\'agit du message d\'alerte standard d\'Android pour toute application installée en dehors du Play Store. Notre APK est certifié sans virus, sans publicités intrusives et sans risque pour vos données.',
        steps: [
          'Appuyez sur "Télécharger quand même" ou "Détails"',
          'Validez l\'installation du fichier',
          'L\'antivirus interne Play Protect analysera l\'application sans détecter de menace'
        ]
      },
      {
        problem: 'Installation bloquée : "Source inconnue désactivée"',
        solution: 'Android restreint par défaut les téléchargements depuis le navigateur pour votre sécurité. Vous pouvez débloquer cette option en 5 secondes.',
        steps: [
          'Appuyez sur "Paramètres" dans la boîte de dialogue qui s\'affiche',
          'Activez le curseur "Autoriser cette source" pour votre navigateur (Chrome)',
          'Revenez en arrière et appuyez sur "Installer"'
        ]
      }
    ]
  },
  {
    category: 'Application & Données',
    issues: [
      {
        problem: 'Les fiches d\'universités ne s\'affichent pas',
        solution: 'Si vous venez d\'installer l\'application, assurez-vous d\'être connecté à Internet au moins une fois pour synchroniser la base de données locale.',
        steps: [
          'Activez votre connexion de données mobiles ou le Wi-Fi',
          'Ouvrez l\'application et patientez 5 secondes pendant la synchronisation',
          'Une fois synchronisée, l\'application fonctionne entièrement hors ligne'
        ]
      },
      {
        problem: 'Erreur lors de la sélection de ma série de Bac',
        solution: 'Vérifiez que vous utilisez bien la dernière version de l\'application (v1.0.2) qui intègre toutes les séries récentes du Bac malien.',
        steps: [
          'Consultez la version installée dans les paramètres de votre téléphone',
          'Téléchargez le fichier APK à jour si votre version est antérieure',
          'Installez-le par-dessus sans désinstaller l\'ancienne version'
        ]
      }
    ]
  },
  {
    category: 'Performance & Stockage',
    issues: [
      {
        problem: 'Espace de stockage insuffisant sur mon smartphone',
        solution: 'L\'application est très légère (~15 Mo), mais nécessite un peu d\'espace temporaire pour son installation.',
        steps: [
          'Supprimez quelques fichiers inutiles ou videz le cache de vos applications',
          'Vérifiez qu\'il reste au moins 50 Mo d\'espace libre dans les paramètres de stockage',
          'Relancez le téléchargement du fichier APK'
        ]
      }
    ]
  }
];

const quickFixes = [
  {
    title: 'Redémarrer l\'application',
    description: 'Fermez l\'application depuis vos applications récentes puis relancez-la.'
  },
  {
    title: 'Vider le cache temporaire',
    description: 'Dans Paramètres > Applications > Conseil d\'Orientation > Vider le cache.'
  },
  {
    title: 'Synchroniser en ligne',
    description: 'Connectez-vous quelques secondes à Internet pour actualiser les données.'
  },
  {
    title: 'Mettre à jour l\'APK',
    description: 'Téléchargez la dernière version v1.0.2 directement sur notre portail.'
  }
];

export function Troubleshooting() {
  const [selectedCategory, setSelectedCategory] = useState(0);
  const [expandedIssues, setExpandedIssues] = useState<string[]>(['0-0']);
  const [searchQuery, setSearchQuery] = useState('');

  const toggleIssue = (issueKey: string) => {
    setExpandedIssues(prev => 
      prev.includes(issueKey)
        ? prev.filter(i => i !== issueKey)
        : [...prev, issueKey]
    );
  };

  const normalizedSearch = searchQuery.trim().toLowerCase();
  const visibleIssues = normalizedSearch
    ? commonIssues.flatMap((category, categoryIndex) =>
        category.issues
          .map((issue, issueIndex) => ({
            ...issue,
            category: category.category,
            key: `${categoryIndex}-${issueIndex}`,
          }))
          .filter((issue) =>
            `${issue.category} ${issue.problem} ${issue.solution} ${issue.steps.join(' ')}`
              .toLowerCase()
              .includes(normalizedSearch)
          )
      )
    : commonIssues[selectedCategory].issues.map((issue, issueIndex) => ({
        ...issue,
        category: commonIssues[selectedCategory].category,
        key: `${selectedCategory}-${issueIndex}`,
      }));

  return (
    <section id="common-issues" className="py-16 sm:py-24 bg-slate-50/70 dark:bg-[#0a192f] border-b border-slate-200 dark:border-slate-800">
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
            Assistance Technique
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-4">
            Résolution de <span className="text-[#13508F] dark:text-[#3B9DF8]">problèmes fréquents</span>
          </h2>
          <p className="text-slate-600 dark:text-slate-300 text-base sm:text-lg">
            Un blocage lors de l'installation ou de l'utilisation ? Trouvez la solution en un instant.
          </p>
        </motion.div>

        {/* Quick Fixes 4-grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-16">
          {quickFixes.map((fix, index) => (
            <div
              key={index}
              className="p-5 rounded-2xl bg-white dark:bg-[#112240] border border-slate-200 dark:border-slate-800 shadow-xs"
            >
              <div className="w-8 h-8 rounded-lg bg-[#13508F]/10 dark:bg-[#3B9DF8]/10 text-[#13508F] dark:text-[#3B9DF8] flex items-center justify-center mb-3">
                <CheckCircleIcon className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-sm text-slate-900 dark:text-white mb-1">
                {fix.title}
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                {fix.description}
              </p>
            </div>
          ))}
        </div>

        {/* Search Bar */}
        <div className="max-w-2xl mx-auto mb-10">
          <div className="relative">
            <MagnifyingGlassIcon className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Rechercher une erreur ou un symptôme..."
              className="w-full pl-12 pr-4 py-3.5 bg-white dark:bg-[#112240] border border-slate-200 dark:border-slate-800 rounded-xl text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#3B9DF8] focus:border-transparent transition-all shadow-xs"
            />
          </div>
        </div>

        {/* Category Tabs */}
        {!searchQuery && (
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {commonIssues.map((cat, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedCategory(idx)}
                className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 min-h-[40px] ${
                  selectedCategory === idx
                    ? 'bg-[#13508F] text-white shadow-sm'
                    : 'bg-white dark:bg-[#112240] text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-800 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                {cat.category}
              </button>
            ))}
          </div>
        )}

        {/* Issues List */}
        <div className="max-w-3xl mx-auto space-y-3.5">
          {visibleIssues.map((issue) => (
            <div
              key={issue.key}
              className="rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden bg-white dark:bg-[#112240] shadow-xs"
            >
              <button
                onClick={() => toggleIssue(issue.key)}
                className="w-full text-left p-5 sm:p-6 flex items-start justify-between gap-4 transition-colors hover:bg-slate-50 dark:hover:bg-slate-800/50"
              >
                <div className="flex items-start gap-3.5">
                  <ExclamationCircleIcon className="h-5 w-5 text-[#3B9DF8] flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white mb-1">
                      {issue.problem}
                    </h4>
                    <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                      {issue.solution}
                    </p>
                  </div>
                </div>
                <ChevronDownIcon
                  className={`h-5 w-5 text-slate-400 flex-shrink-0 transition-transform duration-200 ${
                    expandedIssues.includes(issue.key) ? 'rotate-180 text-[#13508F] dark:text-[#3B9DF8]' : ''
                  }`}
                />
              </button>

              {expandedIssues.includes(issue.key) && (
                <div className="px-5 sm:px-6 pb-6 pt-2 border-t border-slate-100 dark:border-slate-800 pl-14">
                  <h5 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
                    Étapes de résolution recommandées :
                  </h5>
                  <ol className="space-y-2">
                    {issue.steps.map((step, sIdx) => (
                      <li key={sIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
                        <span className="w-5 h-5 rounded-full bg-[#13508F]/10 dark:bg-[#3B9DF8]/10 text-[#13508F] dark:text-[#3B9DF8] text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5">
                          {sIdx + 1}
                        </span>
                        <span className="leading-relaxed">{step}</span>
                      </li>
                    ))}
                  </ol>
                </div>
              )}
            </div>
          ))}

          {visibleIssues.length === 0 && (
            <div className="text-center p-8 rounded-2xl bg-white dark:bg-[#112240] border border-slate-200 dark:border-slate-800 text-slate-500">
              Aucun résultat pour cette recherche. Écrivez-nous directement ci-dessous pour une aide personnalisée.
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
