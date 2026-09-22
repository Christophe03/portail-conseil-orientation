import Link from 'next/link';
import { Metadata } from 'next';
import { 
  ArrowRightIcon, 
  BuildingOffice2Icon, 
  AcademicCapIcon, 
  Squares2X2Icon,
  CheckBadgeIcon
} from '@heroicons/react/24/outline';
import privees from '@/data/universites_privees.json';
import seriesPub from '@/data/series_mali.json';

type Privee = { Nom: string };
type SeriePub = { universite: { nom: string }[] };

export const metadata: Metadata = {
  title: 'Universités & Formations au Mali',
  description: 'Explorez les universités au Mali : publiques et privées agréées, avec détails complets sur les facultés, filières et débouchés.',
  alternates: { canonical: '/universites' },
  openGraph: {
    title: 'Universités au Mali - Portail Conseil d\'Orientation',
    description: 'Explorez les universités privées et publiques au Mali, avec leurs formations et débouchés.',
    url: '/universites',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Universités au Mali - Portail Conseil d\'Orientation',
    description: 'Explorez les universités privées et publiques au Mali, avec leurs formations et débouchés.',
  },
};

export default function UniversitesPage() {
  const privateCount = (privees as unknown as Privee[]).filter((u) => u.Nom && u.Nom.trim().length > 0).length;
  const publicSet = new Set<string>();
  (seriesPub as unknown as SeriePub[]).forEach((s) => s.universite?.forEach((u) => u.nom && publicSet.add(u.nom)));
  const publicCount = publicSet.size;

  return (
    <section className="container-custom pt-28 pb-16 sm:pt-36 sm:pb-24">
      {/* Header section */}
      <div className="max-w-3xl mx-auto text-center mb-12">
        <div className="inline-flex items-center space-x-2 rounded-full px-3.5 py-1.5 bg-[#13508f]/10 dark:bg-[#112240] border border-[#13508f]/20 dark:border-[#3b9df8]/30 mb-4">
          <CheckBadgeIcon className="h-4 w-4 text-[#3b9df8]" />
          <span className="text-xs font-semibold text-[#13508f] dark:text-[#7cc5fb]">
            Annuaire National d'Orientation • Mali
          </span>
        </div>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-[#13508f] dark:text-white text-balance mb-4">
          Universités & Grandes Écoles au Mali
        </h1>
        <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed">
          Accédez au répertoire officiel des établissements publics et privés d'enseignement supérieur au Mali, 
          leurs facultés, licences professionnelles et critères d'admission par série.
        </p>
      </div>

      {/* Grid of Navigation Categories in Logo Palette */}
      <div className="grid gap-6 md:grid-cols-3 max-w-6xl mx-auto">
        
        {/* Universités Publiques */}
        <Link
          href="/universites/publiques"
          className="group relative rounded-2xl border border-slate-200/80 dark:border-slate-800/80 bg-white dark:bg-[#112240] p-6 shadow-card hover:shadow-card-hover transition-all duration-300 flex flex-col justify-between"
        >
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="rounded-xl p-3 bg-[#13508f]/10 text-[#13508f] dark:bg-[#13508f]/30 dark:text-[#7cc5fb]">
                <AcademicCapIcon className="h-7 w-7" />
              </div>
              <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-[#13508f]/10 dark:bg-[#13508f]/30 text-[#13508f] dark:text-[#7cc5fb] border border-[#13508f]/20 dark:border-[#13508f]/40">
                {publicCount} universités & facultés
              </span>
            </div>
            <h2 className="text-xl font-bold text-[#13508f] dark:text-white group-hover:text-[#3b9df8] transition-colors mb-2">
              Universités Publiques
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              Explorez les universités d'État (USTTB, ULSHB, USJPB, USSGB, U-Ségou, ENI-ABT, IPR/IFRA) classées par série du Baccalauréat.
            </p>
          </div>
          <div className="pt-6 mt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-sm font-semibold text-[#13508f] dark:text-[#3b9df8]">
            <span>Explorer le secteur public</span>
            <ArrowRightIcon className="h-4 w-4 transform group-hover:translate-x-1.5 transition-transform" />
          </div>
        </Link>

        {/* Universités Privées */}
        <Link
          href="/universites/privees"
          className="group relative rounded-2xl border border-slate-200/80 dark:border-slate-800/80 bg-white dark:bg-[#112240] p-6 shadow-card hover:shadow-card-hover transition-all duration-300 flex flex-col justify-between"
        >
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="rounded-xl p-3 bg-[#3b9df8]/15 text-[#0e4379] dark:bg-[#3b9df8]/25 dark:text-[#7cc5fb]">
                <BuildingOffice2Icon className="h-7 w-7 text-[#3b9df8]" />
              </div>
              <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-[#3b9df8]/15 dark:bg-[#3b9df8]/25 text-[#0e4379] dark:text-[#7cc5fb] border border-[#3b9df8]/30">
                {privateCount} établissements agréés
              </span>
            </div>
            <h2 className="text-xl font-bold text-[#13508f] dark:text-white group-hover:text-[#3b9df8] transition-colors mb-2">
              Universités Privées
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              Consultez l'annuaire des universités et instituts privés autorisés par le Ministère de l'Enseignement Supérieur du Mali avec fiches complètes.
            </p>
          </div>
          <div className="pt-6 mt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-sm font-semibold text-[#3b9df8]">
            <span>Explorer le secteur privé</span>
            <ArrowRightIcon className="h-4 w-4 transform group-hover:translate-x-1.5 transition-transform" />
          </div>
        </Link>

        {/* Séries du Baccalauréat */}
        <Link
          href="/universites/series"
          className="group relative rounded-2xl border border-slate-200/80 dark:border-slate-800/80 bg-white dark:bg-[#112240] p-6 shadow-card hover:shadow-card-hover transition-all duration-300 flex flex-col justify-between"
        >
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="rounded-xl p-3 bg-slate-100 text-[#13508f] dark:bg-slate-800 dark:text-[#7cc5fb]">
                <Squares2X2Icon className="h-7 w-7" />
              </div>
              <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
                Toutes séries
              </span>
            </div>
            <h2 className="text-xl font-bold text-[#13508f] dark:text-white group-hover:text-[#3b9df8] transition-colors mb-2">
              Séries du Baccalauréat
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              Consultez pour chaque série (TSE, TAL, TSS, TSECO, STI...) les matières déterminantes et les filières universitaires accessibles.
            </p>
          </div>
          <div className="pt-6 mt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-sm font-semibold text-[#13508f] dark:text-[#3b9df8]">
            <span>Découvrir les séries & débouchés</span>
            <ArrowRightIcon className="h-4 w-4 transform group-hover:translate-x-1.5 transition-transform" />
          </div>
        </Link>

      </div>
    </section>
  );
}
