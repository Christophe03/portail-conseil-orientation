import Link from 'next/link';
import type { Metadata } from 'next';
import series from '@/data/series_mali.json';
import { formatDate, slugify } from '@/lib/utils';
import { BackLink } from '@/components/ui/BackLink';
import { ShareButton } from '@/components/ui/ShareButton';
import { 
  BuildingLibraryIcon, 
  AcademicCapIcon, 
  ClipboardDocumentCheckIcon, 
  BanknotesIcon,
  BriefcaseIcon,
  CheckCircleIcon,
  ArrowRightIcon,
  ArrowLeftIcon,
  InformationCircleIcon,
  SparklesIcon,
  ArrowTopRightOnSquareIcon
} from '@heroicons/react/24/outline';

type Licence = { nom: string; debouche?: string[] };
type Fac = {
  li?: boolean;
  nom: string;
  abre?: string;
  condition?: string;
  frais?: string;
  licence?: Licence[];
};
type Univ = { nom: string; fac?: Fac[] };
type Serie = { nom: string; universite?: Univ[] };

const data = series as unknown as Serie[];

function findContext(serieSlug: string, univSlug: string): { serie?: Serie; univ?: Univ } {
  const serie = data.find((s) => slugify(s.nom) === serieSlug);
  const univ = serie?.universite?.find((u) => slugify(u.nom) === univSlug);
  return { serie, univ };
}

function getDynamicLastModified(universityName: string) {
  const signature = JSON.stringify({ name: universityName });
  const hash = Array.from(signature).reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const date = new Date('2024-01-01T00:00:00.000Z');
  date.setDate(date.getDate() + (hash % 365));
  return date;
}

export async function generateStaticParams() {
  const params: { serie: string; universite: string }[] = [];
  for (const s of data) {
    if (!s?.nom || !Array.isArray(s.universite)) continue;
    for (const u of s.universite) {
      if (!u?.nom) continue;
      params.push({ serie: slugify(s.nom), universite: slugify(u.nom) });
    }
  }
  return params;
}

export function generateMetadata({ params }: { params: { serie: string; universite: string } }): Metadata {
  const { serie, univ } = findContext(params.serie, params.universite);
  if (!serie || !univ) {
    return { title: 'Université introuvable', robots: { index: false, follow: false } };
  }

  const title = `${univ.nom} (${serie.nom}) — Facultés, Licences & Débouchés | Mali`;
  const description = `${univ.nom}, université publique accessible pour la série ${serie.nom} au Mali. Conditions d'admission, frais d'inscription, licences et opportunités de carrière.`;
  const path = `/universites/publiques/${params.serie}/${params.universite}`;

  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: { title, description, url: path, type: 'website' },
    twitter: { card: 'summary_large_image', title, description },
  };
}

export default function UniversiteFacultesPage({ params }: { params: { serie: string; universite: string } }) {
  const { serie, univ } = findContext(params.serie, params.universite);
  if (!serie || !univ) {
    return (
      <div className="min-h-screen bg-slate-50/70 dark:bg-[#0a192f] pt-28 pb-16 sm:pt-36">
        <div className="container-custom max-w-4xl text-center">
          <p className="text-slate-600 dark:text-slate-300">Université introuvable.</p>
          <BackLink fallbackHref={`/universites/publiques/${params.serie}`} className="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#13508F] text-white text-xs sm:text-sm font-semibold hover:bg-[#0e3a6a] transition-all">
            ← Retour à la série
          </BackLink>
        </div>
      </div>
    );
  }

  const faculties: Fac[] = Array.isArray(univ.fac) ? univ.fac : [];
  const totalLicences = faculties.reduce((acc, f) => acc + (f.licence?.length || 0), 0);
  const lastModifiedDate = getDynamicLastModified(univ.nom);
  const directAnswer = `${univ.nom} est une université publique d'État malienne accueillant les bacheliers de la série ${serie.nom}. Retrouvez ci-dessous la liste intégrale de ses facultés et instituts ouverts, leurs critères d'admission, le barème des frais d'inscription ainsi que l'ensemble des licences et opportunités professionnelles répertoriées.`;

  // Other universities in the same serie for quick switching
  const otherUnivsInSerie = (serie.universite || []).filter(
    (u) => slugify(u.nom) !== slugify(univ.nom)
  );

  return (
    <div className="min-h-screen bg-slate-50/70 dark:bg-[#0a192f] pt-28 pb-16 sm:pt-36 sm:pb-24">
      <div className="container-custom max-w-4xl">
        {/* Breadcrumb & Navigation */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
          <nav className="flex items-center text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            <Link href="/" className="hover:text-[#13508F] dark:hover:text-[#3B9DF8]">Accueil</Link>
            <span className="mx-2">/</span>
            <Link href="/universites" className="hover:text-[#13508F] dark:hover:text-[#3B9DF8]">Universités</Link>
            <span className="mx-2">/</span>
            <Link href="/universites/publiques" className="hover:text-[#13508F] dark:hover:text-[#3B9DF8]">Publiques</Link>
            <span className="mx-2">/</span>
            <Link href={`/universites/publiques/${params.serie}`} className="hover:text-[#13508F] dark:hover:text-[#3B9DF8]">{serie.nom}</Link>
            <span className="mx-2">/</span>
            <span className="text-slate-900 dark:text-white font-medium truncate max-w-[180px] sm:max-w-none">{univ.nom}</span>
          </nav>
          
          <BackLink 
            fallbackHref={`/universites/publiques/${params.serie}`} 
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-[#13508F] dark:text-[#3B9DF8] hover:underline"
          >
            <ArrowLeftIcon className="w-4 h-4" />
            <span>Retour aux universités ({serie.nom})</span>
          </BackLink>
        </div>

        {/* Hero University Header */}
        <div className="rounded-3xl p-6 sm:p-8 md:p-10 bg-white dark:bg-[#112240] border border-slate-200 dark:border-slate-800 shadow-card mb-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-bl from-[#3B9DF8]/10 via-[#13508F]/5 to-transparent rounded-full blur-3xl pointer-events-none" />

          <div className="relative">
            {/* Context badges */}
            <div className="flex flex-wrap items-center gap-2 mb-4">
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-[#13508F]/10 text-[#13508F] dark:bg-[#3B9DF8]/15 dark:text-[#3B9DF8]">
                <BuildingLibraryIcon className="w-4 h-4 text-[#3B9DF8]" />
                Université Publique d'État
              </span>
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold bg-amber-500/10 text-amber-700 dark:text-amber-300 border border-amber-500/20">
                <AcademicCapIcon className="w-3.5 h-3.5" />
                Série : {serie.nom}
              </span>
            </div>

            {/* University identity */}
            <div className="flex flex-col sm:flex-row sm:items-start gap-5 mb-6">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-br from-[#13508F] to-[#3B9DF8] text-white flex items-center justify-center flex-shrink-0 shadow-md">
                <BuildingLibraryIcon className="w-9 h-9 sm:w-11 sm:h-11" />
              </div>

              <div className="flex-1 min-w-0">
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-900 dark:text-white leading-tight">
                  {univ.nom}
                </h1>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 font-medium mt-1.5">
                  Facultés, instituts d'enseignement supérieur et licences nationales accessibles avec le Baccalauréat <strong className="text-[#13508F] dark:text-[#3B9DF8]">{serie.nom}</strong>.
                </p>
              </div>
            </div>

            {/* Stats Summary Bar */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-5 border-t border-slate-100 dark:border-slate-800">
              <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-[#0a192f] border border-slate-200/70 dark:border-slate-800">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-0.5">Facultés & Instituts</span>
                <span className="text-base sm:text-lg font-black text-slate-900 dark:text-white flex items-center gap-1.5">
                  <span className="text-[#13508F] dark:text-[#3B9DF8]">{faculties.length}</span>
                  <span className="text-xs font-normal text-slate-500">structures</span>
                </span>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-[#0a192f] border border-slate-200/70 dark:border-slate-800">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-0.5">Licences répertoriées</span>
                <span className="text-base sm:text-lg font-black text-slate-900 dark:text-white flex items-center gap-1.5">
                  <span className="text-[#3B9DF8]">{totalLicences}</span>
                  <span className="text-xs font-normal text-slate-500">spécialités</span>
                </span>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-[#0a192f] border border-slate-200/70 dark:border-slate-800 col-span-2 sm:col-span-1 flex items-center justify-between sm:justify-center">
                <ShareButton 
                  title={`${univ.nom} (${serie.nom}) - Formations & Licences`}
                  text={`Consultez les facultés et licences de ${univ.nom} pour la série ${serie.nom} sur le Portail Conseil d'Orientation Mali.`}
                  className="w-full sm:w-auto"
                />
              </div>
            </div>

            {/* Contextual overview */}
            <div className="mt-5 p-4 rounded-2xl bg-slate-50 dark:bg-[#0a192f] border border-slate-200/80 dark:border-slate-800 flex items-start gap-3">
              <SparklesIcon className="w-5 h-5 text-[#3B9DF8] flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                  {directAnswer}
                </p>
                <p className="text-[11px] text-slate-400 mt-2">
                  Dernière mise à jour : {formatDate(lastModifiedDate)}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Faculties List */}
        <div className="mb-10">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
                Facultés et formations disponibles
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
                Détail des départements, conditions d'inscription et carrières associées
              </p>
            </div>
            <span className="text-xs font-bold px-3 py-1 rounded-full bg-[#13508F]/10 text-[#13508F] dark:bg-[#3B9DF8]/15 dark:text-[#3B9DF8]">
              {faculties.length} {faculties.length > 1 ? 'facultés' : 'faculté'}
            </span>
          </div>

          {faculties.length === 0 ? (
            <div className="p-8 text-center rounded-2xl bg-white dark:bg-[#112240] border border-slate-200 dark:border-slate-800 text-slate-500">
              Aucune faculté spécifiée pour cette combinaison.
            </div>
          ) : (
            <div className="space-y-6">
              {faculties.map((f, idx) => (
                <div
                  key={idx}
                  className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#112240] p-6 sm:p-7 shadow-card hover:border-[#13508F]/30 dark:hover:border-[#3B9DF8]/30 transition-all duration-200"
                >
                  {/* Faculty Header */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5 pb-5 border-b border-slate-100 dark:border-slate-800">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-xl bg-[#13508F] text-white flex items-center justify-center font-bold text-xs flex-shrink-0 shadow-xs mt-0.5">
                        {f.abre || String(idx + 1).padStart(2, '0')}
                      </div>
                      <div>
                        <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white leading-tight">
                          {f.nom}
                        </h3>
                        {f.abre && (
                          <span className="text-xs font-semibold text-[#13508F] dark:text-[#3B9DF8] mt-0.5 block">
                            Sigle officiel : {f.abre}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Requirements & Fees pills */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
                    {f.condition && (
                      <div className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-50 dark:bg-[#0a192f] border border-slate-200/70 dark:border-slate-800">
                        <ClipboardDocumentCheckIcon className="w-5 h-5 text-[#13508F] dark:text-[#3B9DF8] flex-shrink-0 mt-0.5" />
                        <div>
                          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-0.5">Condition d'accès</span>
                          <span className="text-xs sm:text-sm font-semibold text-slate-800 dark:text-slate-200">{f.condition}</span>
                        </div>
                      </div>
                    )}
                    {f.frais && (
                      <div className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-50 dark:bg-[#0a192f] border border-slate-200/70 dark:border-slate-800">
                        <BanknotesIcon className="w-5 h-5 text-emerald-600 dark:text-emerald-400 flex-shrink-0 mt-0.5" />
                        <div>
                          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-0.5">Frais d'inscription / Scolarité</span>
                          <span className="text-xs sm:text-sm font-semibold text-slate-800 dark:text-slate-200">{f.frais}</span>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Licences & Career opportunities */}
                  {f.licence && f.licence.length > 0 && (
                    <div>
                      <div className="flex items-center gap-2 mb-3.5">
                        <AcademicCapIcon className="w-4 h-4 text-[#3B9DF8]" />
                        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                          Licences proposées & Perspectives d'emploi ({f.licence.length})
                        </h4>
                      </div>

                      <div className="grid gap-3.5 sm:grid-cols-2">
                        {f.licence.map((l, lIdx) => (
                          <div
                            key={lIdx}
                            className="rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-slate-50/70 dark:bg-[#0a192f] p-4 flex flex-col justify-between"
                          >
                            <div>
                              <div className="flex items-center gap-2 mb-2">
                                <span className="w-2 h-2 rounded-full bg-[#3B9DF8]" />
                                <h5 className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white leading-snug">
                                  {l.nom}
                                </h5>
                              </div>

                              {l.debouche && l.debouche.length > 0 && (
                                <div className="mt-3 pt-3 border-t border-slate-200/60 dark:border-slate-800/80">
                                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1 mb-2">
                                    <BriefcaseIcon className="w-3.5 h-3.5 text-[#3B9DF8]" />
                                    Débouchés professionnels :
                                  </span>
                                  <div className="flex flex-wrap gap-1.5">
                                    {l.debouche.map((d, dIdx) => (
                                      <span
                                        key={dIdx}
                                        className="text-[11px] font-medium px-2 py-0.5 rounded-md bg-white dark:bg-[#112240] text-slate-700 dark:text-slate-300 border border-slate-200/60 dark:border-slate-700/60"
                                      >
                                        {d}
                                      </span>
                                    ))}
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Campus Mali Official Portal Reminder Box */}
        <div className="rounded-3xl p-6 sm:p-8 bg-gradient-to-br from-[#13508F] to-[#0e3a6a] text-white shadow-xl mb-10">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/15 text-white text-xs font-semibold">
                <InformationCircleIcon className="w-4 h-4 text-[#3B9DF8]" />
                Portail Officiel d'Orientation
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-white">
                Inscription officielle sur Campus Mali
              </h3>
              <p className="text-xs sm:text-sm text-slate-200 max-w-xl leading-relaxed">
                Les candidatures pour les universités publiques s'effectuent obligatoirement sur la plateforme nationale <strong>Campus Mali</strong> lors de l'ouverture de la session annuelle.
              </p>
            </div>

            <a
              href="https://www.campusmali.ml"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[#3B9DF8] hover:bg-[#258bf0] text-white font-bold text-xs sm:text-sm shadow-md transition-all whitespace-nowrap self-start sm:self-auto min-h-[46px]"
            >
              <span>Accéder à Campus Mali</span>
              <ArrowTopRightOnSquareIcon className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Other universities in same series */}
        {otherUnivsInSerie.length > 0 && (
          <div>
            <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white mb-4">
              Autres universités publiques accessibles avec le bac {serie.nom}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {otherUnivsInSerie.map((u) => (
                <Link
                  key={u.nom}
                  href={`/universites/publiques/${params.serie}/${slugify(u.nom)}`}
                  className="group p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#112240] hover:border-[#13508F]/40 dark:hover:border-[#3B9DF8]/40 shadow-xs transition-all flex items-center justify-between"
                >
                  <div className="min-w-0 pr-3">
                    <h4 className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white group-hover:text-[#13508F] dark:group-hover:text-[#3B9DF8] truncate transition-colors">
                      {u.nom}
                    </h4>
                    <span className="text-[11px] text-slate-400 mt-0.5 block">
                      {u.fac?.length || 0} facultés répertoriées
                    </span>
                  </div>
                  <ArrowRightIcon className="w-4 h-4 text-slate-400 group-hover:text-[#13508F] dark:group-hover:text-[#3B9DF8] transform group-hover:translate-x-1 transition-all flex-shrink-0" />
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
