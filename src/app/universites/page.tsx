import Link from 'next/link';
import { Metadata } from 'next';
import { ArrowRightIcon, BuildingOffice2Icon, AcademicCapIcon, Squares2X2Icon } from '@heroicons/react/24/outline';
import privees from '@/data/universites_privees.json';
import seriesPub from '@/data/series_mali.json';

type Privee = { Nom: string };
type SeriePub = { universite: { nom: string }[] };

export const metadata: Metadata = {
  title: 'Universités',
  description: 'Explorez les universités au Mali : privées et publiques, avec détails complets.',
};

export default function UniversitesPage() {
  const privateCount = (privees as unknown as Privee[]).filter((u) => u.Nom && u.Nom.trim().length > 0).length;
  const publicSet = new Set<string>();
  (seriesPub as unknown as SeriePub[]).forEach((s) => s.universite?.forEach((u) => u.nom && publicSet.add(u.nom)));
  const publicCount = publicSet.size;
  return (
    <section className="container-custom pt-28 pb-16">
      <div className="max-w-3xl mx-auto text-center">
        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-neutral-900 dark:text-white">
          Universités au Mali
        </h1>
        <p className="mt-4 text-neutral-600 dark:text-neutral-300">
          Parcourez les établissements privés et publics, leurs facultés, licences et débouchés.
        </p>
      </div>

      <div className="mt-12 grid gap-6 sm:grid-cols-2">
        <Link
          href="/universites/privees"
          className="group relative rounded-2xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 p-6 shadow-soft hover:shadow-medium transition-all"
        >
          <div className="flex items-start gap-4">
            <div className="rounded-xl p-3 bg-primary-50 text-primary-700 dark:bg-primary-900/30 dark:text-primary-300">
              <BuildingOffice2Icon className="h-7 w-7" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-neutral-900 dark:text-white">Universités privées</h2>
              <p className="mt-1 text-neutral-600 dark:text-neutral-400">
                Liste des universités privées avec fiches détaillées.
              </p>
              <span className="mt-2 inline-block text-xs px-2 py-1 rounded-full bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300">
                {privateCount} au total
              </span>
            </div>
          </div>
          <ArrowRightIcon className="h-5 w-5 absolute right-6 bottom-6 text-neutral-400 group-hover:text-primary-600 transition-colors" />
        </Link>

        <Link
          href="/universites/series"
          className="group relative rounded-2xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 p-6 shadow-soft hover:shadow-medium transition-all"
        >
          <div className="flex items-start gap-4">
            <div className="rounded-xl p-3 bg-neutral-50 text-neutral-700 dark:bg-neutral-800 dark:text-neutral-300">
              <Squares2X2Icon className="h-7 w-7" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-neutral-900 dark:text-white">Séries</h2>
              <p className="mt-1 text-neutral-600 dark:text-neutral-400">
                Liste des séries avec abréviations, description et avantages.
              </p>
            </div>
          </div>
          <ArrowRightIcon className="h-5 w-5 absolute right-6 bottom-6 text-neutral-400 group-hover:text-primary-600 transition-colors" />
        </Link>

        <Link
          href="/universites/publiques"
          className="group relative rounded-2xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 p-6 shadow-soft hover:shadow-medium transition-all"
        >
          <div className="flex items-start gap-4">
            <div className="rounded-xl p-3 bg-secondary-50 text-secondary-700 dark:bg-secondary-900/30 dark:text-secondary-300">
              <AcademicCapIcon className="h-7 w-7" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-neutral-900 dark:text-white">Universités publiques</h2>
              <p className="mt-1 text-neutral-600 dark:text-neutral-400">
                Parcourez par série, puis explorez universités, facultés et licences.
              </p>
              <span className="mt-2 inline-block text-xs px-2 py-1 rounded-full bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300">
                {publicCount} au total
              </span>
            </div>
          </div>
          <ArrowRightIcon className="h-5 w-5 absolute right-6 bottom-6 text-neutral-400 group-hover:text-primary-600 transition-colors" />
        </Link>
      </div>
    </section>
  );
}


