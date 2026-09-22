import Link from 'next/link';
import type { Metadata } from 'next';
import series from '@/data/series_mali.json';
import { slugify } from '@/lib/utils';
import { AcademicCapIcon, BuildingLibraryIcon, ArrowRightIcon } from '@heroicons/react/24/outline';

type Serie = {
  nom: string;
  universite: { nom: string; fac: any[] }[];
};

const data = series as unknown as Serie[];

export const metadata: Metadata = {
  title: 'Universités publiques au Mali - Facultés & Licences par Série',
  description: 'Choisissez votre série du baccalauréat pour découvrir les universités publiques, facultés et licences disponibles au Mali (USTTB, ULSHB, USSGB, USJPB).',
  alternates: { canonical: '/universites/publiques' },
  openGraph: {
    title: 'Universités publiques au Mali - Conseil d\'Orientation Mali',
    description: 'Explorez les universités publiques et leurs formations selon votre série du baccalauréat.',
    url: '/universites/publiques',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Universités publiques au Mali',
    description: 'Explorez les universités publiques et leurs formations selon votre série du baccalauréat.',
  },
};

export default function PubliquesSeriesPage() {
  const items = data.filter((s) => s.nom && s.nom.trim().length > 0);
  const publicSet = new Set<string>();
  items.forEach((s) => s.universite?.forEach((u) => u.nom && publicSet.add(u.nom)));

  return (
    <div className="min-h-screen bg-slate-50/70 dark:bg-[#0a192f] pt-28 pb-16 sm:pt-36 sm:pb-24">
      <div className="container-custom">
        {/* Breadcrumb */}
        <nav className="mb-6 flex items-center text-xs sm:text-sm text-slate-500 dark:text-slate-400">
          <Link href="/" className="hover:text-[#13508F] dark:hover:text-[#3B9DF8]">Accueil</Link>
          <span className="mx-2">/</span>
          <Link href="/universites" className="hover:text-[#13508F] dark:hover:text-[#3B9DF8]">Universités</Link>
          <span className="mx-2">/</span>
          <span className="text-slate-900 dark:text-white font-medium">Publiques par Série</span>
        </nav>

        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#13508F]/10 dark:bg-[#3B9DF8]/10 text-[#13508F] dark:text-[#3B9DF8] text-xs font-bold uppercase tracking-wider mb-4">
            Enseignement Supérieur Public
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tight mb-4 leading-tight">
            Universités publiques par{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#13508F] to-[#3B9DF8]">
              série de Baccalauréat
            </span>
          </h1>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 mb-5">
            Sélectionnez votre série de Bac pour voir l’ensemble des universités publiques, facultés et licences nationales accessibles.
          </p>
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white dark:bg-[#112240] border border-slate-200 dark:border-slate-800 text-xs font-semibold text-slate-700 dark:text-slate-300 shadow-xs">
            <BuildingLibraryIcon className="w-4 h-4 text-[#3B9DF8]" />
            <span>{publicSet.size} universités publiques répertoriées</span>
          </div>
        </div>

        {/* Series Grid */}
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((s) => {
            const slug = slugify(s.nom);
            const univCount = s.universite?.length || 0;
            return (
              <Link
                key={slug}
                href={`/universites/publiques/${slug}`}
                className="group rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#112240] p-6 shadow-card hover:border-[#13508F]/40 dark:hover:border-[#3B9DF8]/40 hover:shadow-lg transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-10 h-10 rounded-xl bg-[#13508F]/10 dark:bg-[#3B9DF8]/10 text-[#13508F] dark:text-[#3B9DF8] flex items-center justify-center">
                      <AcademicCapIcon className="w-5 h-5" />
                    </div>
                    <span className="text-xs px-2.5 py-1 rounded-full font-semibold bg-slate-100 dark:bg-[#0a192f] text-slate-600 dark:text-slate-300">
                      {univCount} {univCount > 1 ? 'universités' : 'université'}
                    </span>
                  </div>
                  <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white group-hover:text-[#13508F] dark:group-hover:text-[#3B9DF8] transition-colors leading-snug mb-2">
                    {s.nom}
                  </h2>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Facultés publiques, critères officiels d'admission et licences disponibles.
                  </p>
                </div>

                <div className="mt-5 pt-4 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-xs font-semibold text-[#13508F] dark:text-[#3B9DF8]">
                  <span>Explorer les universités</span>
                  <ArrowRightIcon className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
