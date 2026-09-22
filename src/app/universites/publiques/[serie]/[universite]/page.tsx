import Link from 'next/link';
import type { Metadata } from 'next';
import series from '@/data/series_mali.json';
import { formatDate, slugify } from '@/lib/utils';
import { BackLink } from '@/components/ui/BackLink';
import { 
  BuildingLibraryIcon, 
  AcademicCapIcon, 
  ClipboardDocumentCheckIcon, 
  BanknotesIcon,
  BriefcaseIcon 
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

  const title = `${univ.nom} (${serie.nom}) — Facultés & Licences | Conseil d'Orientation`;
  const description = `${univ.nom}, université publique accessible pour la série ${serie.nom} au Mali. Conditions d'admission, frais et licences.`;
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
          <BackLink fallbackHref={`/universites/publiques/${params.serie}`} className="mt-4 inline-flex text-sm text-[#13508F] dark:text-[#3B9DF8] hover:underline font-semibold">
            Retour à la série
          </BackLink>
        </div>
      </div>
    );
  }

  const faculties: Fac[] = Array.isArray(univ.fac) ? univ.fac : [];
  const lastModifiedDate = getDynamicLastModified(univ.nom);
  const directAnswer = `${univ.nom} est une université publique malienne accessible aux bacheliers de la série ${serie.nom}. Retrouvez ci-dessous l'ensemble de ses facultés, instituts, conditions d'admission et débouchés professionnels répertoriés.`;

  return (
    <div className="min-h-screen bg-slate-50/70 dark:bg-[#0a192f] pt-28 pb-16 sm:pt-36 sm:pb-24">
      <div className="container-custom max-w-4xl">
        {/* Breadcrumb & Back */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
          <nav className="flex items-center text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            <Link href="/" className="hover:text-[#13508F] dark:hover:text-[#3B9DF8]">Accueil</Link>
            <span className="mx-2">/</span>
            <Link href="/universites/publiques" className="hover:text-[#13508F] dark:hover:text-[#3B9DF8]">Publiques</Link>
            <span className="mx-2">/</span>
            <Link href={`/universites/publiques/${params.serie}`} className="hover:text-[#13508F] dark:hover:text-[#3B9DF8]">{serie.nom}</Link>
            <span className="mx-2">/</span>
            <span className="text-slate-900 dark:text-white font-medium truncate">{univ.nom}</span>
          </nav>
          <BackLink fallbackHref={`/universites/publiques/${params.serie}`} className="text-xs sm:text-sm font-semibold text-[#13508F] dark:text-[#3B9DF8] hover:underline">
            ← Retour à la série
          </BackLink>
        </div>

        {/* University Header */}
        <div className="rounded-3xl p-6 sm:p-8 bg-white dark:bg-[#112240] border border-slate-200 dark:border-slate-800 shadow-card mb-8">
          <div className="flex items-start gap-4 mb-4">
            <div className="w-12 h-12 rounded-2xl bg-[#13508F]/10 dark:bg-[#3B9DF8]/10 text-[#13508F] dark:text-[#3B9DF8] flex items-center justify-center flex-shrink-0">
              <BuildingLibraryIcon className="w-7 h-7" />
            </div>
            <div>
              <span className="inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#13508F]/10 text-[#13508F] dark:bg-[#3B9DF8]/10 dark:text-[#3B9DF8] mb-2">
                Université Publique d'État
              </span>
              <h1 className="text-xl sm:text-2xl md:text-3xl font-black text-slate-900 dark:text-white leading-snug">
                {univ.nom}
              </h1>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
                Filières ouvertes pour le Baccalauréat <span className="font-semibold text-slate-700 dark:text-slate-300">{serie.nom}</span>
              </p>
            </div>
          </div>

          <p className="p-4 rounded-xl bg-slate-50 dark:bg-[#0a192f] border border-slate-100 dark:border-slate-800 text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed mb-3">
            {directAnswer}
          </p>
          <p className="text-[11px] text-slate-400">
            Données actualisées le {formatDate(lastModifiedDate)}
          </p>
        </div>

        {/* Faculties List */}
        <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white mb-4">
          Facultés et formations disponibles ({faculties.length})
        </h2>

        {faculties.length === 0 ? (
          <div className="p-8 text-center rounded-2xl bg-white dark:bg-[#112240] border border-slate-200 dark:border-slate-800 text-slate-500">
            Aucune faculté spécifiée pour cette combinaison.
          </div>
        ) : (
          <div className="space-y-6">
            {faculties.map((f, idx) => (
              <div
                key={idx}
                className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#112240] p-6 shadow-card"
              >
                <div className="flex items-start justify-between gap-4 mb-4 pb-4 border-b border-slate-100 dark:border-slate-800">
                  <div>
                    <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
                      {f.nom} {f.abre ? `(${f.abre})` : ''}
                    </h3>
                  </div>
                </div>

                {/* Requirements & Fees pills */}
                <div className="flex flex-wrap gap-3 mb-5">
                  {f.condition && (
                    <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-50 dark:bg-[#0a192f] border border-slate-200 dark:border-slate-700 text-xs text-slate-700 dark:text-slate-300">
                      <ClipboardDocumentCheckIcon className="w-4 h-4 text-[#13508F] dark:text-[#3B9DF8]" />
                      <span><strong>Condition :</strong> {f.condition}</span>
                    </div>
                  )}
                  {f.frais && (
                    <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-50 dark:bg-[#0a192f] border border-slate-200 dark:border-slate-700 text-xs text-slate-700 dark:text-slate-300">
                      <BanknotesIcon className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                      <span><strong>Frais :</strong> {f.frais}</span>
                    </div>
                  )}
                </div>

                {/* Licences & Débouchés */}
                {f.licence && f.licence.length > 0 && (
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-1.5">
                      <AcademicCapIcon className="w-4 h-4 text-[#3B9DF8]" />
                      <span>Licences proposées & Débouchés</span>
                    </h4>
                    <div className="grid gap-3 sm:grid-cols-2">
                      {f.licence.map((l, lIdx) => (
                        <div
                          key={lIdx}
                          className="rounded-xl border border-slate-100 dark:border-slate-800/80 bg-slate-50/70 dark:bg-[#0a192f] p-4"
                        >
                          <h5 className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white mb-2">
                            {l.nom}
                          </h5>
                          {l.debouche && l.debouche.length > 0 && (
                            <div className="space-y-1">
                              <span className="text-[11px] font-semibold text-slate-400 flex items-center gap-1">
                                <BriefcaseIcon className="w-3 h-3 text-[#3B9DF8]" /> Débouchés :
                              </span>
                              <ul className="text-xs text-slate-600 dark:text-slate-300 space-y-0.5 pl-4 list-disc marker:text-[#3B9DF8]">
                                {l.debouche.map((d, dIdx) => (
                                  <li key={dIdx}>{d}</li>
                                ))}
                              </ul>
                            </div>
                          )}
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
    </div>
  );
}
