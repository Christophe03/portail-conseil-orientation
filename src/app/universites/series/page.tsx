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

export const metadata = {
  title: 'Séries du baccalauréat',
  description: 'Liste des séries avec abréviation et noms complets.',
};

export default function SeriesListPage() {
  const items = data.sort((a, b) => a.abre.localeCompare(b.abre));
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
  const renderIcon = (icon?: string) => {
    const cls = 'h-6 w-6';
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
  };
  return (
    <section className="container-custom pt-28 pb-16">
      <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-neutral-900 dark:text-white text-center">
        Séries
      </h1>
      <p className="mt-3 text-center text-neutral-600 dark:text-neutral-300">
        Cliquez sur une série pour voir sa description et ses avantages.
      </p>

      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((s) => (
          <Link
            key={s.abre}
            href={`/universites/series/${slugify(s.abre)}`}
            className="group rounded-xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 p-5 shadow-soft hover:shadow-medium transition-all"
          >
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className={`rounded-lg p-2 ${colorFor(s.icon)}`}>
                  {renderIcon(s.icon)}
                </div>
                <h2 className="text-lg font-semibold text-neutral-900 dark:text-white">{s.abre}</h2>
              </div>
              <span className="text-sm text-neutral-600 dark:text-neutral-300 group-hover:text-primary-600 transition-colors truncate">
                {s.nom}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}


