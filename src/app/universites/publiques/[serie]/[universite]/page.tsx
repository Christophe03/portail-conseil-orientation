import Link from 'next/link';
import series from '@/data/series_mali.json';
import { slugify } from '@/lib/utils';

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

export default function UniversiteFacultesPage({ params }: { params: { serie: string; universite: string } }) {
  const { serie, univ } = findContext(params.serie, params.universite);
  if (!serie || !univ) {
    return (
      <section className="container-custom pt-28 pb-16">
        <p className="text-center text-neutral-600 dark:text-neutral-300">Université introuvable.</p>
      </section>
    );
  }

  const faculties: Fac[] = Array.isArray(univ.fac) ? univ.fac : [];

  return (
    <section className="container-custom pt-28 pb-16">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between">
          <div className="space-x-2 text-sm">
            <Link href="/universites/publiques" className="text-primary-600 hover:underline">Séries</Link>
            <span className="text-neutral-500">/</span>
            <Link href={`/universites/publiques/${params.serie}`} className="text-primary-600 hover:underline">{serie.nom}</Link>
          </div>
          <Link href={`/universites/publiques/${params.serie}`} className="text-sm text-primary-600 hover:underline">← Retour</Link>
        </div>

        <h1 className="mt-4 text-2xl md:text-3xl font-bold text-neutral-900 dark:text-white">{univ.nom}</h1>

        {faculties.length === 0 ? (
          <p className="mt-6 text-neutral-600 dark:text-neutral-300">Aucune faculté disponible pour cette université.</p>
        ) : (
          <div className="mt-6 space-y-6">
            {faculties.map((f) => (
              <div key={f.nom} className="rounded-xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 p-5 shadow-soft">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h2 className="text-lg font-semibold text-neutral-900 dark:text-white">{f.nom} {f.abre ? `(${f.abre})` : ''}</h2>
                    {f.condition && (
                      <p className="mt-1 text-sm text-neutral-600 dark:text-neutral-300">Condition: {f.condition}</p>
                    )}
                    {f.frais && (
                      <p className="mt-1 text-sm text-neutral-600 dark:text-neutral-300">Frais: {f.frais}</p>
                    )}
                  </div>
                </div>

                {f.licence && f.licence.length > 0 && (
                  <div className="mt-4 grid gap-3 sm:grid-cols-2">
                    {f.licence.map((l) => (
                      <div key={l.nom} className="rounded-lg border border-neutral-200 dark:border-neutral-700 p-4">
                        <h3 className="font-medium text-neutral-900 dark:text-white">{l.nom}</h3>
                        {l.debouche && l.debouche.length > 0 && (
                          <ul className="mt-2 list-disc list-inside text-sm text-neutral-700 dark:text-neutral-300 space-y-1">
                            {l.debouche.map((d) => (
                              <li key={d}>{d}</li>
                            ))}
                          </ul>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}


