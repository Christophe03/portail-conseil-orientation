'use client';

import { motion } from 'framer-motion';
import { 
  CodeBracketIcon, 
  CommandLineIcon, 
  EnvelopeIcon,
  CheckCircleIcon 
} from '@heroicons/react/24/outline';

export function APIDocumentation() {
  return (
    <section id="api" className="mb-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="rounded-3xl bg-white dark:bg-[#112240] border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-card"
      >
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-[#13508F]/10 dark:bg-[#3B9DF8]/10 text-[#13508F] dark:text-[#3B9DF8] flex items-center justify-center">
            <CommandLineIcon className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">
              Référentiel Données & Intégration
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
              Pour développeurs, chercheurs et administrateurs d'établissements scolaires.
            </p>
          </div>
        </div>

        <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-6">
          Toutes les données du portail (universités publiques, privées, séries du bac et passerelles) sont organisées de manière rigoureuse et typée en TypeScript, prêtes pour vos intégrations ou vos études statistiques sur l'éducation au Mali.
        </p>

        {/* Code sample */}
        <div className="rounded-2xl bg-slate-900 text-slate-200 p-4 sm:p-5 font-mono text-xs overflow-x-auto mb-6 border border-slate-800">
          <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-800 text-slate-400">
            <span>Exemple de structure d'université publique</span>
            <span className="text-[10px] uppercase tracking-wider text-[#3B9DF8]">JSON Schema</span>
          </div>
          <pre>{`{
  "id": "usttb",
  "nom": "Université des Sciences, des Techniques et des Technologies de Bamako",
  "sigle": "USTTB",
  "ville": "Bamako",
  "statut": "publique",
  "facultes": [
    {
      "nom": "Faculté des Sciences et Techniques (FST)",
      "series_admissibles": ["TSE", "TSExp", "STI"],
      "filieres": ["Mathématiques", "Informatique", "Chimie-Biologie"]
    }
  ]
}`}</pre>
        </div>

        {/* Technical features list */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
          <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
            <CheckCircleIcon className="w-4 h-4 text-[#3B9DF8] flex-shrink-0" />
            <span>Format JSON standardisé et validé</span>
          </div>
          <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
            <CheckCircleIcon className="w-4 h-4 text-[#3B9DF8] flex-shrink-0" />
            <span>Types TypeScript exhaustifs inclus</span>
          </div>
          <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
            <CheckCircleIcon className="w-4 h-4 text-[#3B9DF8] flex-shrink-0" />
            <span>Données conformes aux arrêtés ministériels</span>
          </div>
          <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
            <CheckCircleIcon className="w-4 h-4 text-[#3B9DF8] flex-shrink-0" />
            <span>Exports CSV disponibles sur demande</span>
          </div>
        </div>

        {/* CTA */}
        <div className="pt-5 border-t border-slate-100 dark:border-slate-800 flex flex-wrap items-center justify-between gap-4">
          <span className="text-xs text-slate-500 dark:text-slate-400">
            Vous souhaitez intégrer ces données dans votre projet ?
          </span>
          <a
            href="mailto:conseilorientationinfo@gmail.com?subject=Demande%20acces%20donnees%20education"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#13508F] hover:bg-[#0e3a6a] text-white text-xs sm:text-sm font-semibold transition-colors duration-200"
          >
            <EnvelopeIcon className="w-4 h-4" />
            <span>Contacter l'équipe technique</span>
          </a>
        </div>
      </motion.div>
    </section>
  );
}
