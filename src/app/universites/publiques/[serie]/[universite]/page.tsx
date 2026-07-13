import Link from 'next/link';
import series from '@/data/series_mali.json';
import { formatDate, slugify } from '@/lib/utils';
import { BackLink } from '@/components/ui/BackLink';

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

function getDynamicLastModified(universityName: string) {
  const signature = JSON.stringify({ name: universityName });
  const hash = Array.from(signature).reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const date = new Date('2024-01-01T00:00:00.000Z');
  date.setDate(date.getDate() + (hash % 365));
  return date;
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
      <section className="container-custom pt-24 pb-12 sm:pt-28">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-neutral-600 dark:text-neutral-300">Université introuvable.</p>
          <BackLink fallbackHref={`/universites/publiques/${params.serie}`} className="mt-4 inline-flex text-sm text-primary-600 hover:underline">
            Retour
          </BackLink>
        </div>
      </section>
    );
  }

  const faculties: Fac[] = Array.isArray(univ.fac) ? univ.fac : [];
  const lastModifiedDate = getDynamicLastModified(univ.nom);
  const facultyNames = faculties.slice(0, 3).map((faculty) => faculty.nom).filter(Boolean);
  const directAnswer = `${univ.nom} est une université publique présentée dans la série ${serie.nom}. Elle propose ${facultyNames.length > 0 ? facultyNames.join(', ') : 'plusieurs formations'} à destination des candidats qui souhaitent poursuivre leurs études au Mali.`;

  return (
    <section className="container-custom pt-24 pb-12 sm:pt-28">
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <div className="space-x-2 text-sm">
            <Link href="/universites/publiques" className="text-primary-600 hover:underline">Séries</Link>
            <span className="text-neutral-500">/</span>
            <Link href={`/universites/publiques/${params.serie}`} className="text-primary-600 hover:underline">{serie.nom}</Link>
          </div>
          <BackLink fallbackHref={`/universites/publiques/${params.serie}`} className="text-sm text-primary-600 hover:underline">← Retour</BackLink>
        </div>

        <h1 className="mt-4 text-xl sm:text-2xl md:text-3xl font-bold text-neutral-900 dark:text-white break-words">{univ.nom}</h1>

        <p className="direct-answer mt-4 rounded-lg border border-primary-100 bg-primary-50/70 p-3 text-sm text-neutral-800 dark:border-primary-900/40 dark:bg-primary-950/30 dark:text-neutral-200">
          {directAnswer}
        </p>
        <p className="mt-2 text-xs text-neutral-500 dark:text-neutral-400">
          Informations mises à jour le {formatDate(lastModifiedDate)}
        </p>

        {faculties.length === 0 ? (
          <p className="mt-6 text-neutral-600 dark:text-neutral-300">Aucune faculté disponible pour cette université.</p>
        ) : (
          <div className="mt-6 space-y-6">
            {faculties.map((f) => (
              <div key={f.nom} className="rounded-xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 p-4 sm:p-5 shadow-soft">
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
                      <div key={l.nom} className="rounded-lg border border-neutral-200 dark:border-neutral-700 p-3 sm:p-4">
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



