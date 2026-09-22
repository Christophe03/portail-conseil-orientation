import Link from 'next/link';
import type { Metadata } from 'next';
import data from '@/data/universites_privees.json';
import { PriveesList } from '@/components/sections/PriveesList';
import { BuildingOfficeIcon } from '@heroicons/react/24/outline';

type Privee = {
  ID: string;
  Type?: string;
  Nom: string;
  Désignation?: string;
  Sigle?: string;
  Localisation?: string;
  Creation?: string;
  Ouverture?: string;
  Contact?: string;
  Mail?: string;
  Site?: string;
  Adresse?: string;
  Responsable?: string;
  Facebook?: string;
  Logo?: string;
};

const universites: Privee[] = data as unknown as Privee[];

export const metadata: Metadata = {
  title: 'Universités privées au Mali - Répertoire & Contacts Officiels',
  description: 'Consultez la liste des universités privées et instituts au Mali avec leurs coordonnées, contacts, filières et adresses à Bamako et dans les régions.',
  alternates: { canonical: '/universites/privees' },
  openGraph: {
    title: 'Universités privées au Mali - Conseil d\'Orientation Mali',
    description: 'Liste des universités privées au Mali avec des fiches détaillées pour trouver leurs coordonnées.',
    url: '/universites/privees',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Universités privées au Mali',
    description: 'Liste des universités privées au Mali avec des fiches détaillées pour trouver leurs coordonnées.',
  },
};

export default function PriveesPage() {
  const items = universites
    .filter((u) => (u.Nom && u.Nom.trim().length > 0))
    .sort((a, b) => a.Nom.localeCompare(b.Nom));

  return (
    <div className="min-h-screen bg-slate-50/70 dark:bg-[#0a192f] pt-28 pb-16 sm:pt-36 sm:pb-24">
      <div className="container-custom">
        {/* Breadcrumb */}
        <nav className="mb-6 flex items-center text-xs sm:text-sm text-slate-500 dark:text-slate-400">
          <Link href="/" className="hover:text-[#13508F] dark:hover:text-[#3B9DF8]">Accueil</Link>
          <span className="mx-2">/</span>
          <Link href="/universites" className="hover:text-[#13508F] dark:hover:text-[#3B9DF8]">Universités</Link>
          <span className="mx-2">/</span>
          <span className="text-slate-900 dark:text-white font-medium">Universités Privées</span>
        </nav>

        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#13508F]/10 dark:bg-[#3B9DF8]/10 text-[#13508F] dark:text-[#3B9DF8] text-xs font-bold uppercase tracking-wider mb-4">
            Enseignement Supérieur Privé
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tight mb-4 leading-tight">
            Universités & grandes écoles{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#13508F] to-[#3B9DF8]">
              privées au Mali
            </span>
          </h1>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 mb-5">
            Explorez notre répertoire de {items.length} établissements privés autorisés au Mali, consultez leurs coordonnées et découvrez leurs filières d'excellence.
          </p>
        </div>

        {/* List component */}
        <PriveesList items={items} />
      </div>
    </div>
  );
}
