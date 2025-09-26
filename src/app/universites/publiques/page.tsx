import Link from 'next/link';
import series from '@/data/series_mali.json';
import { slugify } from '@/lib/utils';

type Serie = {
  nom: string;
  universite: { nom: string; fac: any[] }[];
};

const data = series as unknown as Serie[];

export const metadata = {
  title: 'Universités publiques — Séries',
  description: 'Choisissez une série pour voir les universités, facultés et licences.',
};

export default function PubliquesSeriesPage() {
  const items = data.filter((s) => s.nom && s.nom.trim().length > 0);
  const publicSet = new Set<string>();
  items.forEach((s) => s.universite?.forEach((u) => u.nom && publicSet.add(u.nom)));
  return (
    <section className="container-custom pt-28 pb-16">
      <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-neutral-900 dark:text-white text-center">
        Séries du baccalauréat
      </h1>
      <div className="mt-3 flex flex-col items-center gap-2">
        <p className="text-center text-neutral-600 dark:text-neutral-300">
          Sélectionnez une série pour afficher les universités correspondantes.
        </p>
        <span className="text-xs px-2 py-1 rounded-full bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300">
          {publicSet.size} universités publiques
        </span>
      </div>

      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((s) => {
          const slug = slugify(s.nom);
          return (
            <Link
              key={slug}
              href={`/universites/publiques/${slug}`}
              className="group rounded-xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 p-5 shadow-soft hover:shadow-medium transition-all"
            >
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-neutral-900 dark:text-white">{s.nom}</h2>
                <span className="text-xs px-2 py-1 rounded-full bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300">
                  {s.universite?.length || 0} universités
                </span>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}


