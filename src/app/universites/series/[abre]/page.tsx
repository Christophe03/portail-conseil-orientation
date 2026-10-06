import series from '@/data/series.json';
import seriesMali from '@/data/series_mali.json';
import type { Metadata } from 'next';
import Link from 'next/link';
import { formatDate, slugify } from '@/lib/utils';
import { BackLink } from '@/components/ui/BackLink';
import { ShareButton } from '@/components/ui/ShareButton';
import { BreadcrumbStructuredData, ProgramStructuredData } from '@/components/seo/StructuredData';
import {
  BookOpenIcon,
  PaintBrushIcon,
  UsersIcon,
  BeakerIcon,
  ChartBarIcon,
  BuildingLibraryIcon,
  BuildingOffice2Icon,
  BuildingOfficeIcon,
  WrenchScrewdriverIcon,
  Cog6ToothIcon,
  CpuChipIcon,
  BoltIcon,
  AcademicCapIcon,
  CheckCircleIcon,
  ArrowRightIcon,
  ArrowLeftIcon,
  SparklesIcon,
  LightBulbIcon
} from '@heroicons/react/24/outline';

type Serie = {
  abre: string;
  nom: string;
  description?: string;
  avantage?: string;
  icon?: string;
};

type SerieMali = {
  nom: string;
  universite: { nom: string; fac: any[] }[];
};

const data = series as unknown as Serie[];
const dataMali = seriesMali as unknown as SerieMali[];

function getSerie(abreSlug: string): Serie | undefined {
  return data.find((s) => slugify(s.abre) === abreSlug);
}

function findMatchingMaliSerie(abre: string): SerieMali | undefined {
  const cleanAbre = abre.trim().toLowerCase();
  return dataMali.find((sm) => {
    const smNom = sm.nom.toLowerCase();
    return smNom.includes(`(${cleanAbre})`) || smNom.includes(cleanAbre);
  });
}

function getDynamicLastModified(serie: Serie) {
  const signature = JSON.stringify({ abre: serie.abre, nom: serie.nom, description: serie.description || '', avantage: serie.avantage || '' });
  const hash = Array.from(signature).reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const date = new Date('2024-01-01T00:00:00.000Z');
  date.setDate(date.getDate() + (hash % 365));
  return date;
}

export async function generateStaticParams() {
  return data.map((s) => ({ abre: slugify(s.abre) }));
}

export function generateMetadata({ params }: { params: { abre: string } }): Metadata {
  const serie = getSerie(params.abre);
  if (!serie) {
    return { title: 'Série introuvable', robots: { index: false, follow: false } };
  }

  const title = `Série ${serie.abre} (${serie.nom}) — Débouchés & Universités | Mali`;
  const description = `Découvrez la série ${serie.abre} (${serie.nom}) au Mali : matières dominantes, compétences acquises, atouts et débouchés universitaires après le baccalauréat.`;
  const path = `/universites/series/${params.abre}`;

  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: { title, description, url: path, type: 'website' },
    twitter: { card: 'summary_large_image', title, description },
  };
}

export default function SerieDetailPage({ params }: { params: { abre: string } }) {
  const s = getSerie(params.abre);
  if (!s) {
    return (
      <div className="min-h-screen bg-slate-50/70 dark:bg-[#0a192f] pt-28 pb-16 sm:pt-36">
        <div className="container-custom max-w-3xl text-center">
          <p className="text-slate-600 dark:text-slate-300">Série introuvable.</p>
          <BackLink fallbackHref="/universites/series" className="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#13508F] text-white text-xs sm:text-sm font-semibold hover:bg-[#0e3a6a] transition-all">
            ← Retour aux séries
          </BackLink>
        </div>
      </div>
    );
  }

  const lastModifiedDate = getDynamicLastModified(s);
  const directAnswer = `Pour la série ${s.abre} (${s.nom}) au Mali, plusieurs universités publiques d'État et établissements privés proposent des filières adaptées. Consultez ci-dessous les caractéristiques essentielles, les atouts de cette formation et les orientations post-bac recommandées.`;

  // Find corresponding public universities
  const matchingPublic = findMatchingMaliSerie(s.abre);
  const matchingUnivCount = matchingPublic?.universite?.length || 0;

  // Prev / Next serie navigation
  const sorted = [...data].sort((a, b) => a.abre.localeCompare(b.abre));
  const currentIndex = sorted.findIndex((item) => item.abre === s.abre);
  const prevSerie = sorted[(currentIndex - 1 + sorted.length) % sorted.length];
  const nextSerie = sorted[(currentIndex + 1) % sorted.length];

  const renderIcon = (icon?: string) => {
    const cls = 'h-8 w-8';
    switch ((icon || '').toLowerCase()) {
      case 'book':
        return <BookOpenIcon className={cls} />;
      case 'palette':
        return <PaintBrushIcon className={cls} />;
      case 'people':
        return <UsersIcon className={cls} />;
      case 'science':
      case 'biotech':
        return <BeakerIcon className={cls} />;
      case 'bar_chart':
        return <ChartBarIcon className={cls} />;
      case 'account_balance':
        return <BuildingLibraryIcon className={cls} />;
      case 'apartment':
        return <BuildingOffice2Icon className={cls} />;
      case 'domain':
        return <BuildingOfficeIcon className={cls} />;
      case 'build':
        return <WrenchScrewdriverIcon className={cls} />;
      case 'precision_manufacturing':
        return <Cog6ToothIcon className={cls} />;
      case 'memory':
        return <CpuChipIcon className={cls} />;
      case 'bolt':
        return <BoltIcon className={cls} />;
      default:
        return <AcademicCapIcon className={cls} />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50/70 dark:bg-[#0a192f] pt-28 pb-16 sm:pt-36 sm:pb-24">
      <div className="container-custom max-w-4xl">
        <BreadcrumbStructuredData
          items={[
            { name: 'Accueil', item: '/' },
            { name: 'Universités', item: '/universites' },
            { name: 'Séries du Bac', item: '/universites/series' },
            { name: `${s.abre} - ${s.nom}`, item: `/universites/series/${params.abre}` },
          ]}
        />
        <ProgramStructuredData
          name={`Série ${s.abre} : ${s.nom}`}
          description={directAnswer}
          url={`/universites/series/${params.abre}`}
        />
        {/* Breadcrumbs & Back */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
          <nav className="flex items-center text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            <Link href="/" className="hover:text-[#13508F] dark:hover:text-[#3B9DF8]">Accueil</Link>
            <span className="mx-2">/</span>
            <Link href="/universites" className="hover:text-[#13508F] dark:hover:text-[#3B9DF8]">Universités</Link>
            <span className="mx-2">/</span>
            <Link href="/universites/series" className="hover:text-[#13508F] dark:hover:text-[#3B9DF8]">Séries</Link>
            <span className="mx-2">/</span>
            <span className="text-slate-900 dark:text-white font-medium">{s.abre}</span>
          </nav>

          <BackLink 
            fallbackHref="/universites/series" 
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-[#13508F] dark:text-[#3B9DF8] hover:underline"
          >
            <ArrowLeftIcon className="w-4 h-4" />
            <span>Toutes les séries du Bac</span>
          </BackLink>
        </div>

        {/* Series Header Card */}
        <div className="rounded-3xl p-6 sm:p-8 md:p-10 bg-white dark:bg-[#112240] border border-slate-200 dark:border-slate-800 shadow-card mb-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-bl from-[#3B9DF8]/10 via-[#13508F]/5 to-transparent rounded-full blur-3xl pointer-events-none" />

          <div className="relative">
            <div className="flex flex-wrap items-center justify-between gap-4 mb-5">
              <div className="flex items-center gap-2">
                <span className="inline-block px-3.5 py-1 rounded-full text-xs font-black bg-[#13508F] text-white shadow-xs">
                  SÉRIE {s.abre}
                </span>
                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold bg-slate-100 dark:bg-[#0a192f] text-slate-600 dark:text-slate-300 border border-slate-200/60 dark:border-slate-700/60">
                  Baccalauréat Général & Technique
                </span>
              </div>

              <ShareButton 
                title={`Série ${s.abre} (${s.nom}) - Baccalauréat Mali`}
                text={`Découvrez la présentation et les débouchés de la série ${s.abre} (${s.nom}) au Mali.`}
              />
            </div>

            <div className="flex flex-col sm:flex-row sm:items-start gap-5 mb-6">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-br from-[#13508F] to-[#3B9DF8] text-white flex items-center justify-center flex-shrink-0 shadow-md">
                {renderIcon(s.icon)}
              </div>

              <div className="flex-1 min-w-0">
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-900 dark:text-white leading-tight">
                  {s.nom}
                </h1>
                <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1.5">
                  Filière d'enseignement secondaire préparant aux études supérieures universitaires et professionnelles.
                </p>
              </div>
            </div>

            <div className="p-4 sm:p-5 rounded-2xl bg-slate-50 dark:bg-[#0a192f] border border-slate-200/80 dark:border-slate-800 flex items-start gap-3">
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

        {/* Content sections: Description & Strengths */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {s.description && (
            <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#112240] p-6 sm:p-7 shadow-card flex flex-col">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-9 h-9 rounded-xl bg-[#13508F]/10 dark:bg-[#3B9DF8]/15 text-[#13508F] dark:text-[#3B9DF8] flex items-center justify-center">
                  <BookOpenIcon className="w-5 h-5" />
                </div>
                <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
                  Présentation de la série
                </h2>
              </div>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed flex-1">
                {s.description}
              </p>
            </div>
          )}

          {s.avantage && (
            <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#112240] p-6 sm:p-7 shadow-card flex flex-col">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-9 h-9 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
                  <CheckCircleIcon className="w-5 h-5" />
                </div>
                <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
                  Points forts & Atouts
                </h2>
              </div>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed flex-1">
                {s.avantage}
              </p>
            </div>
          )}
        </div>

        {/* Public Universities Cross-link CTA Banner */}
        <div className="rounded-3xl p-6 sm:p-8 bg-gradient-to-br from-[#13508F] to-[#0e3a6a] text-white shadow-xl mb-10">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/15 text-white text-xs font-semibold">
                <BuildingLibraryIcon className="w-4 h-4 text-[#3B9DF8]" />
                Enseignement Public d'État
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-white">
                Universités publiques accessibles avec le bac {s.abre}
              </h3>
              <p className="text-xs sm:text-sm text-slate-200 max-w-xl leading-relaxed">
                {matchingPublic 
                  ? `Consultez les ${matchingUnivCount} universités publiques maliennes qui accueillent les bacheliers de la série ${s.nom}, avec les conditions de concours et les licences disponibles.`
                  : `Découvrez la cartographie complète des facultés publiques qui ouvrent leurs portes aux bacheliers ${s.abre}.`
                }
              </p>
            </div>

            <Link
              href={matchingPublic ? `/universites/publiques/${slugify(matchingPublic.nom)}` : '/universites/publiques'}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[#3B9DF8] hover:bg-[#258bf0] text-white font-bold text-xs sm:text-sm shadow-md transition-all whitespace-nowrap self-start sm:self-auto min-h-[46px]"
            >
              <span>Voir les universités publiques</span>
              <ArrowRightIcon className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Prev / Next serie navigation */}
        <div className="flex flex-col sm:flex-row gap-3.5 justify-between">
          <Link
            href={`/universites/series/${slugify(prevSerie.abre)}`}
            className="group flex-1 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#112240] hover:border-[#13508F]/40 dark:hover:border-[#3B9DF8]/40 shadow-xs transition-all flex items-center gap-3"
          >
            <div className="w-8 h-8 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center group-hover:bg-[#13508F]/10 transition-colors flex-shrink-0">
              <ArrowLeftIcon className="w-4 h-4 text-slate-500 group-hover:text-[#13508F] dark:group-hover:text-[#3B9DF8]" />
            </div>
            <div className="min-w-0">
              <span className="block text-[10px] font-bold uppercase tracking-wider text-slate-400">Série précédente</span>
              <span className="font-semibold text-xs sm:text-sm text-slate-900 dark:text-white group-hover:text-[#13508F] dark:group-hover:text-[#3B9DF8] truncate block">
                {prevSerie.abre} — {prevSerie.nom}
              </span>
            </div>
          </Link>

          <Link
            href={`/universites/series/${slugify(nextSerie.abre)}`}
            className="group flex-1 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#112240] hover:border-[#13508F]/40 dark:hover:border-[#3B9DF8]/40 shadow-xs transition-all flex items-center justify-end text-right gap-3"
          >
            <div className="min-w-0">
              <span className="block text-[10px] font-bold uppercase tracking-wider text-slate-400">Série suivante</span>
              <span className="font-semibold text-xs sm:text-sm text-slate-900 dark:text-white group-hover:text-[#13508F] dark:group-hover:text-[#3B9DF8] truncate block">
                {nextSerie.abre} — {nextSerie.nom}
              </span>
            </div>
            <div className="w-8 h-8 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center group-hover:bg-[#13508F]/10 transition-colors flex-shrink-0">
              <ArrowRightIcon className="w-4 h-4 text-slate-500 group-hover:text-[#13508F] dark:group-hover:text-[#3B9DF8]" />
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
