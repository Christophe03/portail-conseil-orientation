import Link from 'next/link';
import series from '@/data/series_mali.json';
import { slugify } from '@/lib/utils';
import { BackLink } from '@/components/ui/BackLink';

type Fac = {
  li?: boolean;
  nom: string;
  abre?: string;
  condition?: string;
  frais?: string;
  licence?: { nom: string; debouche?: string[] }[];
};

type Univ = { nom: string; fac: Fac[] };
type Serie = { nom: string; universite: Univ[] };

const data = series as unknown as Serie[];

function getSerie(serieSlug: string): Serie | undefined {
  return data.find((s) => slugify(s.nom) === serieSlug);
}

export async function generateStaticParams() {
  return (data || []).map((s) => ({ serie: slugify(s.nom) }));
}

export default function SerieUniversitesPage({ params }: { params: { serie: string } }) {
  const s = getSerie(params.serie);
  if (!s) {
    return (
      <section className="container-custom pt-24 pb-12 sm:pt-28">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-neutral-600 dark:text-neutral-300">Série introuvable.</p>
          <BackLink fallbackHref="/universites/publiques" className="mt-4 inline-flex text-sm text-primary-600 hover:underline">
            Retour aux séries
          </BackLink>
        </div>
      </section>
    );
  }

  return (
    <section className="container-custom pt-24 pb-12 sm:pt-28">
      <div className="max-w-4xl mx-auto">
        <BackLink fallbackHref="/universites/publiques" className="text-sm text-primary-600 hover:underline">
          ← Retour aux séries
        </BackLink>
        <h1 className="mt-4 text-xl sm:text-2xl md:text-3xl font-bold text-neutral-900 dark:text-white break-words">
          {s.nom}
        </h1>

        <div className="mt-6 space-y-4">
          {s.universite.map((u) => (
            <div key={u.nom} className="rounded-xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 p-4 sm:p-5 shadow-soft">
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
                <div>
                  <h2 className="text-lg font-semibold text-neutral-900 dark:text-white">{u.nom}</h2>
                </div>
                <Link href={`/universites/publiques/${params.serie}/${slugify(u.nom)}`} className="text-primary-600 hover:underline text-sm sm:text-base">
                  Voir les facultés →
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}



