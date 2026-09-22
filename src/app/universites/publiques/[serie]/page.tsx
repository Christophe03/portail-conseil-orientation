import Link from 'next/link';
import type { Metadata } from 'next';
import series from '@/data/series_mali.json';
import { slugify } from '@/lib/utils';
import { BackLink } from '@/components/ui/BackLink';
import { ShareButton } from '@/components/ui/ShareButton';
import { 
  BuildingLibraryIcon, 
  ArrowRightIcon, 
  AcademicCapIcon,
  CheckCircleIcon,
  SparklesIcon,
  BookOpenIcon,
  ArrowLeftIcon
} from '@heroicons/react/24/outline';

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

  const title = `${serie.nom} — Universités publiques & Facultés | Mali`;
  const description = `Découvrez la liste complète des universités publiques et facultés maliennes ouvertes aux bacheliers de la série ${serie.nom}.`;
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
          <BackLink fallbackHref="/universites/publiques" className="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#13508F] text-white text-xs sm:text-sm font-semibold hover:bg-[#0e3a6a] transition-all">
            ← Retour aux séries
          </BackLink>
        </div>
      </div>
    );
  }

  // Calculate totals
  const totalUniversities = s.universite?.length || 0;
  const totalFaculties = s.universite?.reduce((acc, u) => acc + (u.fac?.length || 0), 0) || 0;

  // Extract acronym if present (e.g., TSE from "Sciences Exactes (TSE)")
  const acronymMatch = s.nom.match(/\(([^)]+)\)/);
  const acronym = acronymMatch ? acronymMatch[1] : '';

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
          
          <BackLink 
            fallbackHref="/universites/publiques" 
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-[#13508F] dark:text-[#3B9DF8] hover:underline"
          >
            <ArrowLeftIcon className="w-4 h-4" />
            <span>Toutes les séries</span>
          </BackLink>
        </div>

        {/* Hero Section */}
        <div className="rounded-3xl p-6 sm:p-8 md:p-10 bg-white dark:bg-[#112240] border border-slate-200 dark:border-slate-800 shadow-card mb-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-bl from-[#3B9DF8]/10 via-[#13508F]/5 to-transparent rounded-full blur-3xl pointer-events-none" />

          <div className="relative">
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#13508F]/10 dark:bg-[#3B9DF8]/15 text-[#13508F] dark:text-[#3B9DF8] text-xs font-bold uppercase tracking-wider">
                <AcademicCapIcon className="w-4 h-4" />
                Série du Baccalauréat
              </span>
              {acronym && (
                <span className="inline-block px-3 py-1 rounded-full text-xs font-black bg-[#13508F] text-white">
                  {acronym}
                </span>
              )}
            </div>

            <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-900 dark:text-white tracking-tight leading-tight mb-3">
              Universités publiques pour la série{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#13508F] to-[#3B9DF8]">
                {s.nom}
              </span>
            </h1>

            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl">
              Consultez l'ensemble des universités publiques maliennes accueillant les bacheliers de cette filière, ainsi que les facultés et licences correspondantes.
            </p>

            {/* Quick Metrics Bar */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-6 mt-6 border-t border-slate-100 dark:border-slate-800">
              <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-[#0a192f] border border-slate-200/70 dark:border-slate-800">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-0.5">Universités éligibles</span>
                <span className="text-lg font-black text-slate-900 dark:text-white">
                  <span className="text-[#13508F] dark:text-[#3B9DF8]">{totalUniversities}</span> établissements
                </span>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-[#0a192f] border border-slate-200/70 dark:border-slate-800">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-0.5">Facultés & Instituts</span>
                <span className="text-lg font-black text-slate-900 dark:text-white">
                  <span className="text-[#3B9DF8]">{totalFaculties}</span> structures
                </span>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-[#0a192f] border border-slate-200/70 dark:border-slate-800 col-span-2 sm:col-span-1 flex items-center justify-between sm:justify-center">
                <ShareButton 
                  title={`Universités publiques Mali - Série ${s.nom}`}
                  text={`Consultez les universités publiques pour les bacheliers ${s.nom} sur le Portail Conseil d'Orientation Mali.`}
                  className="w-full sm:w-auto"
                />
              </div>
            </div>

            {/* Link to Serie Detail if acronym exists */}
            {acronym && (
              <div className="mt-4 pt-3 flex items-center gap-2">
                <BookOpenIcon className="w-4 h-4 text-[#3B9DF8]" />
                <span className="text-xs text-slate-500 dark:text-slate-400">
                  En savoir plus sur le profil de cette série :
                </span>
                <Link
                  href={`/universites/series/${slugify(acronym)}`}
                  className="text-xs font-bold text-[#13508F] dark:text-[#3B9DF8] hover:underline inline-flex items-center gap-1"
                >
                  <span>Fiche détaillée {acronym}</span>
                  <ArrowRightIcon className="w-3 h-3" />
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* University List */}
        <div className="space-y-5">
          {s.universite.map((u) => {
            const facCount = u.fac?.length || 0;
            const facList = u.fac || [];
            const previewFacs = facList.slice(0, 4);

            return (
              <div
                key={u.nom}
                className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#112240] p-6 sm:p-7 shadow-card hover:border-[#13508F]/40 dark:hover:border-[#3B9DF8]/40 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#13508F] to-[#3B9DF8] text-white flex items-center justify-center flex-shrink-0 shadow-xs">
                        <BuildingLibraryIcon className="w-6 h-6" />
                      </div>
                      <div>
                        <span className="text-[10px] font-bold uppercase tracking-wider text-[#3B9DF8] block mb-0.5">
                          Enseignement Supérieur Public
                        </span>
                        <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white leading-tight">
                          {u.nom}
                        </h2>
                      </div>
                    </div>

                    <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#13508F]/10 text-[#13508F] dark:bg-[#3B9DF8]/15 dark:text-[#3B9DF8] self-start sm:self-center">
                      {facCount} {facCount > 1 ? 'facultés & instituts' : 'faculté'}
                    </span>
                  </div>

                  {/* Faculties preview badges */}
                  {facList.length > 0 && (
                    <div className="my-4 p-3.5 rounded-2xl bg-slate-50/80 dark:bg-[#0a192f] border border-slate-200/70 dark:border-slate-800">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-2">
                        Facultés accessibles :
                      </span>
                      <div className="flex flex-wrap gap-2">
                        {previewFacs.map((f, fIdx) => (
                          <span
                            key={fIdx}
                            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white dark:bg-[#112240] border border-slate-200/80 dark:border-slate-700/80 text-xs font-semibold text-slate-800 dark:text-slate-200 shadow-2xs"
                          >
                            <span className="w-1.5 h-1.5 rounded-full bg-[#3B9DF8]" />
                            {f.abre ? <strong>{f.abre} :</strong> : null}
                            <span className="truncate max-w-[200px]">{f.nom}</span>
                          </span>
                        ))}
                        {facList.length > 4 && (
                          <span className="px-2.5 py-1 rounded-lg bg-[#13508F]/5 text-[#13508F] dark:text-[#3B9DF8] text-xs font-bold">
                            +{facList.length - 4} autres
                          </span>
                        )}
                      </div>
                    </div>
                  )}
                </div>

                <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                  <span className="text-xs text-slate-500 dark:text-slate-400">
                    Conditions d'accès, frais d'inscription et détail des licences disponibles.
                  </span>

                  <Link
                    href={`/universites/publiques/${params.serie}/${slugify(u.nom)}`}
                    className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-[#13508F] hover:bg-[#0e3a6a] text-white text-xs sm:text-sm font-semibold transition-all shadow-sm min-h-[42px] whitespace-nowrap self-stretch sm:self-auto"
                  >
                    <span>Consulter les facultés & filières</span>
                    <ArrowRightIcon className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
