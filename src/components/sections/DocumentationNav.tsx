'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  BookOpenIcon,
  AcademicCapIcon,
  CodeBracketIcon,
  QuestionMarkCircleIcon,
  LightBulbIcon,
  RocketLaunchIcon,
  ChevronDownIcon
} from '@heroicons/react/24/outline';

const navSections = [
  {
    title: 'Démarrage Rapide',
    icon: RocketLaunchIcon,
    items: [
      { name: 'Installation APK', href: '/download#installation', description: 'Télécharger sur Android' },
      { name: 'Premiers Pas', href: '#first-steps', description: 'Guide de démarrage rapide' },
      { name: 'Exigences Système', href: '/download#requirements', description: 'Compatibilité et stockage' }
    ]
  },
  {
    title: 'Orientation & Séries',
    icon: AcademicCapIcon,
    items: [
      { name: 'Séries du BAC', href: '/universites/series', description: 'Comprendre chaque série' },
      { name: 'Universités Publiques', href: '/universites/publiques', description: 'Filières de l\'État malien' },
      { name: 'Universités Privées', href: '/universites/privees', description: 'Instituts et grandes écoles' },
      { name: 'Toutes les filières', href: '/universites', description: 'Catalogue général' }
    ]
  },
  {
    title: 'Assistance & FAQ',
    icon: QuestionMarkCircleIcon,
    items: [
      { name: 'Foire aux Questions', href: '/support#faq', description: 'Réponses à vos interrogations' },
      { name: 'Dépannage d\'installation', href: '/download#installation', description: 'Résoudre les blocages' },
      { name: 'Nous contacter', href: '/support#contact', description: 'Assistance directe par email' }
    ]
  },
  {
    title: 'Ressources Techniques',
    icon: CodeBracketIcon,
    items: [
      { name: 'Référentiel Données', href: '#api', description: 'Structure des données publiques' },
      { name: 'Intégration & Widgets', href: '/features#integration', description: 'Pour les lycées et partenaires' }
    ]
  }
];

export function DocumentationNav() {
  const [openSection, setOpenSection] = useState<number | null>(0);

  const toggleSection = (index: number) => {
    setOpenSection(openSection === index ? null : index);
  };

  return (
    <nav className="lg:sticky lg:top-24">
      <div className="bg-white dark:bg-[#112240] rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-card">
        <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-100 dark:border-slate-800">
          <div className="w-9 h-9 rounded-lg bg-[#13508F]/10 dark:bg-[#3B9DF8]/10 text-[#13508F] dark:text-[#3B9DF8] flex items-center justify-center">
            <BookOpenIcon className="h-5 w-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white leading-tight">
              Sommaire
            </h3>
            <span className="text-xs text-slate-500 dark:text-slate-400">Documentation</span>
          </div>
        </div>

        <div className="space-y-2">
          {navSections.map((section, index) => (
            <div key={index} className="rounded-xl overflow-hidden border border-transparent">
              <button
                onClick={() => toggleSection(index)}
                className={`w-full flex items-center justify-between p-3 rounded-xl text-left transition-colors duration-200 ${
                  openSection === index
                    ? 'bg-[#13508F]/5 dark:bg-[#3B9DF8]/10 text-[#13508F] dark:text-[#3B9DF8]'
                    : 'text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800/60'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <section.icon className={`h-4 w-4 ${openSection === index ? 'text-[#13508F] dark:text-[#3B9DF8]' : 'text-slate-400'}`} />
                  <span className="text-sm font-semibold">
                    {section.title}
                  </span>
                </div>
                <ChevronDownIcon
                  className={`h-4 w-4 transition-transform duration-200 text-slate-400 ${
                    openSection === index ? 'rotate-180 text-[#13508F] dark:text-[#3B9DF8]' : ''
                  }`}
                />
              </button>

              {openSection === index && (
                <div className="pl-6 pr-2 py-2 space-y-1">
                  {section.items.map((item, itemIndex) => (
                    <a
                      key={itemIndex}
                      href={item.href}
                      className="block p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800/80 transition-colors duration-150 group"
                    >
                      <div className="text-xs font-semibold text-slate-800 dark:text-slate-200 group-hover:text-[#13508F] dark:group-hover:text-[#3B9DF8] transition-colors">
                        {item.name}
                      </div>
                      <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                        {item.description}
                      </div>
                    </a>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Quick Links Footer */}
        <div className="mt-6 pt-5 border-t border-slate-100 dark:border-slate-800 space-y-2">
          <Link
            href="/universites"
            className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 dark:bg-[#0a192f] border border-slate-200 dark:border-slate-800 hover:border-[#13508F]/40 transition-colors"
          >
            <span className="text-xs font-semibold text-slate-800 dark:text-slate-200">Catalogue des universités</span>
            <span className="text-xs text-[#13508F] dark:text-[#3B9DF8] font-bold">→</span>
          </Link>
          <Link
            href="/support"
            className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 dark:bg-[#0a192f] border border-slate-200 dark:border-slate-800 hover:border-[#13508F]/40 transition-colors"
          >
            <span className="text-xs font-semibold text-slate-800 dark:text-slate-200">Centre d'Assistance</span>
            <span className="text-xs text-[#13508F] dark:text-[#3B9DF8] font-bold">→</span>
          </Link>
        </div>
      </div>
    </nav>
  );
}
