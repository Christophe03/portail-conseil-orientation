import Link from 'next/link';
import series from '@/data/series.json';
import { slugify } from '@/lib/utils';
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
  QuestionMarkCircleIcon,
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

export async function generateStaticParams() {
  return data.map((s) => ({ abre: slugify(s.abre) }));
}

export const metadata = {
  title: 'Détails série',
};

export default function SerieDetailPage({ params }: { params: { abre: string } }) {
  const s = getSerie(params.abre);
  if (!s) {
    return (
      <section className="container-custom pt-28 pb-16">
        <p className="text-center text-neutral-600 dark:text-neutral-300">Série introuvable.</p>
      </section>
    );
  }

  const colorFor = (icon?: string) => {
    switch ((icon || '').toLowerCase()) {
      case 'book':
        return 'bg-indigo-50 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-300';
      case 'palette':
        return 'bg-pink-50 text-pink-700 dark:bg-pink-900/30 dark:text-pink-300';
      case 'people':
        return 'bg-teal-50 text-teal-700 dark:bg-teal-900/30 dark:text-teal-300';
      case 'science':
      case 'biotech':
        return 'bg-emerald-50 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300';
      case 'bar_chart':
        return 'bg-amber-50 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300';
      case 'account_balance':
        return 'bg-violet-50 text-violet-700 dark:bg-violet-900/30 dark:text-violet-300';
      case 'apartment':
        return 'bg-slate-50 text-slate-700 dark:bg-slate-900/30 dark:text-slate-300';
      case 'domain':
        return 'bg-stone-50 text-stone-700 dark:bg-stone-900/30 dark:text-stone-300';
      case 'build':
        return 'bg-rose-50 text-rose-700 dark:bg-rose-900/30 dark:text-rose-300';
      case 'precision_manufacturing':
        return 'bg-fuchsia-50 text-fuchsia-700 dark:bg-fuchsia-900/30 dark:text-fuchsia-300';
      case 'memory':
        return 'bg-sky-50 text-sky-700 dark:bg-sky-900/30 dark:text-sky-300';
      case 'bolt':
        return 'bg-yellow-50 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300';
      default:
        return 'bg-neutral-100 text-neutral-700 dark:bg-neutral-800 dark:text-neutral-300';
    }
  };

  return (
    <section className="container-custom pt-28 pb-16">
      <div className="max-w-3xl mx-auto">
        <Link href="/universites/series" className="text-sm text-primary-600 hover:underline">
          ← Retour aux séries
        </Link>
        <div className="mt-4 flex items-start gap-3">
          <div className={`rounded-lg p-2 ${colorFor(s.icon)}`}>
            {(function(icon?: string) {
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
                  return <QuestionMarkCircleIcon className={cls} />;
              }
            })(s.icon)}
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-neutral-900 dark:text-white">
            {s.abre} — {s.nom}
          </h1>
        </div>

        <div className="mt-6 space-y-4">
          {s.description && (
            <div className="rounded-xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 p-5">
              <h2 className="text-base font-semibold text-neutral-900 dark:text-white">Description</h2>
              <p className="mt-2 text-neutral-700 dark:text-neutral-300">{s.description}</p>
            </div>
          )}
          {s.avantage && (
            <div className="rounded-xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 p-5">
              <h2 className="text-base font-semibold text-neutral-900 dark:text-white">Avantages</h2>
              <p className="mt-2 text-neutral-700 dark:text-neutral-300">{s.avantage}</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}


