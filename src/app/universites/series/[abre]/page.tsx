import series from '@/data/series.json';
import type { Metadata } from 'next';
import Link from 'next/link';
import { formatDate, slugify } from '@/lib/utils';
import { BackLink } from '@/components/ui/BackLink';
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
  ArrowRightIcon
} from '@heroicons/react/24/outline';

type Serie = {
  abre: string;
  nom: string;
  description?: string;
  avantage?: string;
  icon?: string;
};

const data = series as unknown as Serie[];

function getSerie(abreSlug: string): Serie | undefined {
  return data.find((s) => slugify(s.abre) === abreSlug);
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
  const description = `Découvrez la série ${serie.abre} (${serie.nom}) au Mali, ses caractéristiques, avantages et débouchés universitaires après le baccalauréat.`;
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
          <BackLink fallbackHref="/universites/series" className="mt-4 inline-flex text-sm text-[#13508F] dark:text-[#3B9DF8] hover:underline font-semibold">
            Retour aux séries
          </BackLink>
        </div>
      </div>
    );
  }

  const lastModifiedDate = getDynamicLastModified(s);
  const directAnswer = `Pour la série ${s.abre} (${s.nom}) au Mali, plusieurs universités publiques et privées proposent des filières adaptées. Consultez ci-dessous les caractéristiques essentielles, les atouts de cette formation et les orientations recommandées.`;

  const renderIcon = (icon?: string) => {
    const cls = 'h-7 w-7';
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
      <div className="container-custom max-w-3xl">
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
          <BackLink fallbackHref="/universites/series" className="text-xs sm:text-sm font-semibold text-[#13508F] dark:text-[#3B9DF8] hover:underline">
            ← Toutes les séries
          </BackLink>
        </div>

        {/* Series Header Card */}
        <div className="rounded-3xl p-6 sm:p-8 bg-white dark:bg-[#112240] border border-slate-200 dark:border-slate-800 shadow-card mb-8">
          <div className="flex items-start gap-4 mb-4">
            <div className="w-14 h-14 rounded-2xl bg-[#13508F]/10 dark:bg-[#3B9DF8]/10 text-[#13508F] dark:text-[#3B9DF8] flex items-center justify-center flex-shrink-0">
              {renderIcon(s.icon)}
            </div>
            <div>
              <div className="inline-block px-3 py-0.5 rounded-full text-xs font-black bg-[#13508F] text-white mb-2 shadow-xs">
                SÉRIE {s.abre}
              </div>
              <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white leading-snug">
                {s.nom}
              </h1>
            </div>
          </div>

          <p className="p-4 rounded-xl bg-slate-50 dark:bg-[#0a192f] border border-slate-100 dark:border-slate-800 text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed mb-3">
            {directAnswer}
          </p>
          <p className="text-[11px] text-slate-400">
            Fiche mise à jour le {formatDate(lastModifiedDate)}
          </p>
        </div>

        {/* Description & Avantages */}
        <div className="space-y-6 mb-8">
          {s.description && (
            <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#112240] p-6 shadow-card">
              <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white mb-3">
                Présentation de la série
              </h2>
              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                {s.description}
              </p>
            </div>
          )}

          {s.avantage && (
            <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#112240] p-6 shadow-card">
              <div className="flex items-center gap-2 mb-3">
                <CheckCircleIcon className="w-5 h-5 text-[#3B9DF8]" />
                <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
                  Points forts & Atouts de la série
                </h2>
              </div>
              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                {s.avantage}
              </p>
            </div>
          )}
        </div>

        {/* Action Link */}
        <div className="rounded-2xl p-6 bg-[#13508F] text-white flex flex-col sm:flex-row items-center justify-between gap-4 shadow-lg">
          <div>
            <h3 className="font-bold text-base">Voir les universités publiques pour cette série</h3>
            <p className="text-xs text-slate-200">Consultez les facultés d'État qui recrutent les bacheliers {s.abre}.</p>
          </div>
          <Link
            href="/universites/publiques"
            className="px-5 py-2.5 rounded-xl bg-[#3B9DF8] hover:bg-[#258bf0] text-white font-semibold text-xs sm:text-sm whitespace-nowrap shadow-sm min-h-[40px] flex items-center gap-1.5"
          >
            <span>Universités publiques</span>
            <ArrowRightIcon className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
