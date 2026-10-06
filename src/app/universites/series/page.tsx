import Link from 'next/link';
import type { Metadata } from 'next';
import series from '@/data/series.json';
import { slugify } from '@/lib/utils';
import { BreadcrumbStructuredData } from '@/components/seo/StructuredData';
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
  ArrowRightIcon,
  AcademicCapIcon
} from '@heroicons/react/24/outline';

type Serie = {
  abre: string;
  nom: string;
  description?: string;
  avantage?: string;
  icon?: string;
};

const data = series as unknown as Serie[];

export const metadata: Metadata = {
  title: 'Séries du Baccalauréat au Mali — Guides & Débouchés',
  description: 'Découvrez toutes les séries officielles du baccalauréat au Mali (TSE, TSExp, TSS, TLL, STI, TSEco, etc.), leurs matières clés, leurs coefficients et les débouchés universitaires associés.',
  keywords: [
    'séries du bac Mali',
    'baccalauréat malien',
    'TSE Mali',
    'TSExp Mali',
    'TSS Mali',
    'TLL Mali',
    'TSEco Mali',
    'débouchés bac Mali',
  ],
  alternates: { canonical: '/universites/series' },
  openGraph: {
    title: 'Séries du Baccalauréat au Mali — Guides & Débouchés',
    description: 'Liste des séries du baccalauréat et formations supérieures associées au Mali.',
    url: '/universites/series',
    type: 'website',
    images: [{ url: '/app_icon.png', width: 512, height: 512, alt: 'Séries du Baccalauréat Mali' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Séries du Baccalauréat au Mali',
    description: 'Liste des séries du baccalauréat et formations supérieures associées au Mali.',
    images: ['/app_icon.png'],
  },
};

export default function SeriesListPage() {
  const items = data.sort((a, b) => a.abre.localeCompare(b.abre));

  const renderIcon = (icon?: string) => {
    const cls = 'h-5 w-5';
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
      <BreadcrumbStructuredData
        items={[
          { name: 'Accueil', item: '/' },
          { name: 'Universités', item: '/universites' },
          { name: 'Séries du Bac', item: '/universites/series' },
        ]}
      />
      <div className="container-custom">
        {/* Breadcrumb */}
        <nav className="mb-6 flex items-center text-xs sm:text-sm text-slate-500 dark:text-slate-400">
          <Link href="/" className="hover:text-[#13508F] dark:hover:text-[#3B9DF8]">Accueil</Link>
          <span className="mx-2">/</span>
          <Link href="/universites" className="hover:text-[#13508F] dark:hover:text-[#3B9DF8]">Universités</Link>
          <span className="mx-2">/</span>
          <span className="text-slate-900 dark:text-white font-medium">Séries du Bac</span>
        </nav>

        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#13508F]/10 dark:bg-[#3B9DF8]/10 text-[#13508F] dark:text-[#3B9DF8] text-xs font-bold uppercase tracking-wider mb-4">
            Guide des Lycéens
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tight mb-4 leading-tight">
            Les séries du{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#13508F] to-[#3B9DF8]">
              Baccalauréat malien
            </span>
          </h1>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300">
            Cliquez sur une série pour découvrir sa description, les matières dominantes, ses points forts et les filières conseillées à l'université.
          </p>
        </div>

        {/* Series Grid */}
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((s) => (
            <Link
              key={s.abre}
              href={`/universites/series/${slugify(s.abre)}`}
              className="group rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#112240] p-6 shadow-card hover:border-[#13508F]/40 dark:hover:border-[#3B9DF8]/40 hover:shadow-lg transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-xl bg-[#13508F]/10 dark:bg-[#3B9DF8]/10 text-[#13508F] dark:text-[#3B9DF8] flex items-center justify-center">
                    {renderIcon(s.icon)}
                  </div>
                  <span className="text-xs font-black px-3 py-1 rounded-full bg-[#13508F] text-white shadow-xs">
                    {s.abre}
                  </span>
                </div>

                <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white group-hover:text-[#13508F] dark:group-hover:text-[#3B9DF8] transition-colors leading-snug mb-2">
                  {s.nom}
                </h2>

                {s.description && (
                  <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed">
                    {s.description}
                  </p>
                )}
              </div>

              <div className="mt-5 pt-4 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-xs font-semibold text-[#13508F] dark:text-[#3B9DF8]">
                <span>Voir la fiche détaillée</span>
                <ArrowRightIcon className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
