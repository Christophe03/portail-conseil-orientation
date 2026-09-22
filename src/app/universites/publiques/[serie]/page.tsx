import Link from 'next/link';
import type { Metadata } from 'next';
import series from '@/data/series_mali.json';
import { slugify } from '@/lib/utils';
import { BackLink } from '@/components/ui/BackLink';
import { BuildingLibraryIcon, ArrowRightIcon, AcademicCapIcon } from '@heroicons/react/24/outline';

type Fac = {
  li?: boolean;
  nom: string;
  abre?: string;
  condition?: string;
  frais?: string;
  licence?: { nom: string; debouche?: string[] }[];
};

type Univ = { nom: string; fac: Fac[] };
type Serie = { nom: string; universite: Univ[] };

const data = series as unknown as Serie[];

function getSerie(serieSlug: string): Serie | undefined {
  return data.find((s) => slugify(s.nom) === serieSlug);
}

export async function generateStaticParams() {
  return (data || []).map((s) => ({ serie: slugify(s.nom) }));
}

export function generateMetadata({ params }: { params: { serie: string } }): Metadata {
  const serie = getSerie(params.serie);
  if (!serie) {
    return { title: 'Série introuvable', robots: { index: false, follow: false } };
  }

  const title = `${serie.nom} — Universités publiques au Mali`;
  const description = `Découvrez les universités publiques et les formations accessibles avec la série ${serie.nom} au Mali.`;
  const path = `/universites/publiques/${params.serie}`;

  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: { title, description, url: path, type: 'website' },
    twitter: { card: 'summary_large_image', title, description },
  };
}

export default function SerieUniversitesPage({ params }: { params: { serie: string } }) {
  const s = getSerie(params.serie);
  if (!s) {
    return (
      <div className="min-h-screen bg-slate-50/70 dark:bg-[#0a192f] pt-28 pb-16 sm:pt-36">
        <div className="container-custom max-w-4xl text-center">
          <p className="text-slate-600 dark:text-slate-300">Série introuvable.</p>
          <BackLink fallbackHref="/universites/publiques" className="mt-4 inline-flex text-sm text-[#13508F] dark:text-[#3B9DF8] hover:underline font-semibold">
            Retour aux séries
          </BackLink>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50/70 dark:bg-[#0a192f] pt-28 pb-16 sm:pt-36 sm:pb-24">
      <div className="container-custom max-w-4xl">
        {/* Breadcrumb & Back */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
          <nav className="flex items-center text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            <Link href="/" className="hover:text-[#13508F] dark:hover:text-[#3B9DF8]">Accueil</Link>
            <span className="mx-2">/</span>
            <Link href="/universites" className="hover:text-[#13508F] dark:hover:text-[#3B9DF8]">Universités</Link>
            <span className="mx-2">/</span>
            <Link href="/universites/publiques" className="hover:text-[#13508F] dark:hover:text-[#3B9DF8]">Publiques</Link>
            <span className="mx-2">/</span>
            <span className="text-slate-900 dark:text-white font-medium truncate">{s.nom}</span>
          </nav>
          <BackLink fallbackHref="/universites/publiques" className="text-xs sm:text-sm font-semibold text-[#13508F] dark:text-[#3B9DF8] hover:underline">
            ← Toutes les séries
          </BackLink>
        </div>

        {/* Header */}
        <div className="mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#13508F]/10 dark:bg-[#3B9DF8]/10 text-[#13508F] dark:text-[#3B9DF8] text-xs font-bold uppercase tracking-wider mb-3">
            Série du Baccalauréat
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-900 dark:text-white tracking-tight leading-tight">
            {s.nom}
          </h1>
          <p className="mt-2 text-sm sm:text-base text-slate-600 dark:text-slate-300">
            Voici les universités publiques du Mali qui accueillent les titulaires de ce baccalauréat.
          </p>
        </div>

        {/* University list */}
        <div className="space-y-4">
          {s.universite.map((u) => {
            const facCount = u.fac?.length || 0;
            return (
              <div
                key={u.nom}
                className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#112240] p-5 sm:p-6 shadow-card hover:border-[#13508F]/40 dark:hover:border-[#3B9DF8]/40 transition-all duration-200 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
              >
                <div className="flex items-start gap-4">
                  <div className="w-11 h-11 rounded-xl bg-[#13508F]/10 dark:bg-[#3B9DF8]/10 text-[#13508F] dark:text-[#3B9DF8] flex items-center justify-center flex-shrink-0 mt-0.5">
                    <BuildingLibraryIcon className="w-6 h-6" />
                  </div>
                  <div>
                    <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white leading-snug">
                      {u.nom}
                    </h2>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                      {facCount} {facCount > 1 ? 'facultés ou instituts accessibles' : 'faculté ou institut accessible'}
                    </p>
                  </div>
                </div>

                <Link
                  href={`/universites/publiques/${params.serie}/${slugify(u.nom)}`}
                  className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#13508F] hover:bg-[#0e3a6a] text-white text-xs sm:text-sm font-semibold transition-all shadow-sm min-h-[40px] whitespace-nowrap self-start sm:self-auto"
                >
                  <span>Voir les facultés</span>
                  <ArrowRightIcon className="w-4 h-4" />
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
