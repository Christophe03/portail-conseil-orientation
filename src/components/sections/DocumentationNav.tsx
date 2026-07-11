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
  RocketLaunchIcon
} from '@heroicons/react/24/outline';

const navSections = [
  {
    title: 'Démarrage Rapide',
    icon: RocketLaunchIcon,
    items: [
      { name: 'Installation', href: '/download#installation', description: 'Télécharger l\'application Android' },
      { name: 'Premiers Pas', href: '#first-steps', description: 'Guide de démarrage rapide' },
      { name: 'Prérequis', href: '/download#requirements', description: 'Compatibilité Android et APK' }
    ]
  },
  {
    title: 'Fonctionnalités',
    icon: LightBulbIcon,
    items: [
      { name: 'Universités Privées', href: '/universites/privees', description: 'Explorer les universités privées du Mali' },
      { name: 'Universités Publiques', href: '/universites/publiques', description: 'Découvrir les universités publiques par série' },
      { name: 'Séries du BAC', href: '/universites/series', description: 'Comprendre les séries du baccalauréat' },
      { name: 'Toutes les universités', href: '/universites', description: 'Vue d\'ensemble des ressources' }
    ]
  },
  {
    title: 'Tutoriels',
    icon: AcademicCapIcon,
    items: [
      { name: 'Recherche d\'Universités', href: '/universites', description: 'Comment trouver une université' },
      { name: 'Choix de Série', href: '/universites/series', description: 'Choisir la bonne série' },
      { name: 'Débouchés', href: '/universites/publiques', description: 'Comprendre les débouchés professionnels' }
    ]
  },
  {
    title: 'Dépannage',
    icon: QuestionMarkCircleIcon,
    items: [
      { name: 'FAQ', href: '/support#faq', description: 'Questions fréquentes' },
      { name: 'Problèmes Courants', href: '/support#common-issues', description: 'Solutions aux erreurs' },
      { name: 'Contact', href: '/support#contact', description: 'Contacter l\'équipe' }
    ]
  },
  {
    title: 'Développeurs',
    icon: CodeBracketIcon,
    items: [
      { name: 'API', href: '#api', description: 'Documentation de l\'API' },
      { name: 'Données', href: '/universites', description: 'Structure des données publiques' },
      { name: 'Intégration', href: '/features#integration', description: 'Guides d\'intégration' }
    ]
  }
];

export function DocumentationNav() {
  const [openSection, setOpenSection] = useState<number | null>(0);

  const toggleSection = (index: number) => {
    setOpenSection(openSection === index ? null : index);
  };

  return (
    <nav className="lg:sticky lg:top-8">
      <div className="bg-white dark:bg-neutral-800 rounded-2xl border border-neutral-200 dark:border-neutral-700 p-6 shadow-soft">
        <div className="flex items-center space-x-3 mb-6">
          <BookOpenIcon className="h-6 w-6 text-secondary-600" />
          <h3 className="text-lg font-bold text-neutral-900 dark:text-white">
            Navigation
          </h3>
        </div>

        <div className="space-y-4">
          {navSections.map((section, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
            >
              <button
                onClick={() => toggleSection(index)}
                className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-colors duration-200"
              >
                <div className="flex items-center space-x-3">
                  <section.icon className="h-5 w-5 text-secondary-600" />
                  <span className="font-medium text-neutral-900 dark:text-white text-left">
                    {section.title}
                  </span>
                </div>
                <motion.div
                  animate={{ rotate: openSection === index ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                  className="text-neutral-400"
                >
                  ▼
                </motion.div>
              </button>

              {openSection === index && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="ml-8 mt-2 space-y-2"
                >
                  {section.items.map((item, itemIndex) => (
                    <a
                      key={itemIndex}
                      href={item.href}
                      className="block p-3 rounded-lg hover:bg-secondary-50 dark:hover:bg-secondary-900/20 transition-colors duration-200 group"
                    >
                      <div className="font-medium text-neutral-700 dark:text-neutral-300 group-hover:text-secondary-600 transition-colors duration-200">
                        {item.name}
                      </div>
                      <div className="text-sm text-neutral-500 dark:text-neutral-400 mt-1">
                        {item.description}
                      </div>
                    </a>
                  ))}
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="mt-8 pt-6 border-t border-neutral-200 dark:border-neutral-700">
          <h4 className="font-semibold text-neutral-900 dark:text-white mb-4">
            Actions Rapides
          </h4>
          <div className="space-y-3">
            <Link href="/universites" className="block w-full text-left p-3 bg-secondary-50 dark:bg-secondary-900/20 rounded-lg hover:bg-secondary-100 dark:hover:bg-secondary-900/30 transition-colors duration-200">
              <div className="font-medium text-secondary-700 dark:text-secondary-300">
                🏛️ Guide des Universités
              </div>
              <div className="text-sm text-secondary-600 dark:text-secondary-400">
                Liste complète
              </div>
            </Link>
            <Link href="/universites/series" className="block w-full text-left p-3 bg-accent-50 dark:bg-accent-900/20 rounded-lg hover:bg-accent-100 dark:hover:bg-accent-900/30 transition-colors duration-200">
              <div className="font-medium text-accent-700 dark:text-accent-300">
                📊 Recherche par Série
              </div>
              <div className="text-sm text-accent-600 dark:text-accent-400">
                Trouver votre voie
              </div>
            </Link>
            <Link href="/support#contact" className="block w-full text-left p-3 bg-primary-50 dark:bg-primary-900/20 rounded-lg hover:bg-primary-100 dark:hover:bg-primary-900/30 transition-colors duration-200">
              <div className="font-medium text-primary-700 dark:text-primary-300">
                💬 Contact
              </div>
              <div className="text-sm text-primary-600 dark:text-primary-400">
                Aide et support
              </div>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
