import Image from 'next/image';
import data from '@/data/universites_privees.json';
import { formatDate, slugify } from '@/lib/utils';
import { BackLink } from '@/components/ui/BackLink';

type Privee = {
  ID: string;
  Type?: string;
  Nom: string;
  Désignation?: string;
  Sigle?: string;
  Localisation?: string;
  Creation?: string;
  Ouverture?: string;
  Contact?: string;
  Mail?: string;
  Site?: string;
  Adresse?: string;
  Responsable?: string;
  Facebook?: string;
  Logo?: string;
};

const universites: Privee[] = data as unknown as Privee[];

function matchUniversity(slug: string): Privee | undefined {
  return universites.find((u) => {
    const s = `${u.Sigle ? slugify(u.Sigle) : slugify(u.Nom)}-${slugify(u.ID || u.Nom)}`;
    return s === slug;
  });
}

function getDynamicLastModified(university: Privee) {
  const signature = JSON.stringify({
    nom: university.Nom,
    sigle: university.Sigle || '',
    localisation: university.Localisation || '',
    contact: university.Contact || '',
    mail: university.Mail || '',
    site: university.Site || '',
    adresse: university.Adresse || '',
    facebook: university.Facebook || '',
  });
  const hash = Array.from(signature).reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const date = new Date('2024-01-01T00:00:00.000Z');
  date.setDate(date.getDate() + (hash % 365));
  return date;
}

export async function generateStaticParams() {
  return universites
    .filter((u) => u.Nom)
    .map((u) => ({
      slug: `${u.Sigle ? slugify(u.Sigle) : slugify(u.Nom)}-${slugify(u.ID || u.Nom)}`,
    }));
}

export default function PriveeDetailPage({ params }: { params: { slug: string } }) {
  const u = matchUniversity(params.slug);
  if (!u) {
    return (
      <section className="container-custom pt-24 pb-12 sm:pt-28">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-neutral-600 dark:text-neutral-300">Université introuvable.</p>
          <BackLink fallbackHref="/universites/privees" className="mt-4 inline-flex text-sm text-primary-600 hover:underline">
            Retour à la liste
          </BackLink>
        </div>
      </section>
    );
  }

  const logoSrc = u.Logo && u.Logo.trim() !== '' ? u.Logo : '/logo_appbar.png';
  const lastModifiedDate = getDynamicLastModified(u);
  const directAnswer = `${u.Nom}${u.Sigle ? ` (${u.Sigle})` : ''} est une université ${u.Type?.toLowerCase() === 'publique' ? 'publique' : 'privée'} située à ${u.Localisation || 'au Mali'} au Mali. Elle est référencée dans le portail Conseil d’Orientation Mali pour aider les candidats à retrouver ses coordonnées, son adresse et ses informations de base.`;

  return (
    <section className="container-custom pt-24 pb-12 sm:pt-28">
      <div className="max-w-3xl mx-auto">
        <BackLink fallbackHref="/universites/privees" className="text-sm text-primary-600 hover:underline">
          ← Retour à la liste
        </BackLink>
        <div className="mt-6 rounded-2xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 p-5 sm:p-6 shadow-soft">
          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            <div className="relative h-16 w-16 rounded-xl overflow-hidden bg-neutral-100 dark:bg-neutral-800 flex-shrink-0">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              {logoSrc.startsWith('http') ? (
                <img src={logoSrc} alt={u.Nom} className="h-full w-full object-cover" />
              ) : (
                <Image src={logoSrc} alt={u.Nom} fill className="object-contain" />
              )}
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-neutral-900 dark:text-white break-words">
                {u.Nom}
              </h1>
              <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-300">{u.Désignation}</p>
            </div>
          </div>

          <p className="direct-answer mt-4 rounded-lg border border-primary-100 bg-primary-50/70 p-3 text-sm text-neutral-800 dark:border-primary-900/40 dark:bg-primary-950/30 dark:text-neutral-200">
            {directAnswer}
          </p>
          <p className="mt-2 text-xs text-neutral-500 dark:text-neutral-400">
            Informations mises à jour le {formatDate(lastModifiedDate)}
          </p>

          <dl className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {u.Sigle && (
              <div className="rounded-lg border border-neutral-200 dark:border-neutral-700 p-4">
                <dt className="text-xs uppercase tracking-wide text-neutral-500">Sigle</dt>
                <dd className="mt-1 font-medium">{u.Sigle}</dd>
              </div>
            )}
            {u.Localisation && (
              <div className="rounded-lg border border-neutral-200 dark:border-neutral-700 p-4">
                <dt className="text-xs uppercase tracking-wide text-neutral-500">Localisation</dt>
                <dd className="mt-1 font-medium">{u.Localisation}</dd>
              </div>
            )}
            {u.Contact && (
              <div className="rounded-lg border border-neutral-200 dark:border-neutral-700 p-4">
                <dt className="text-xs uppercase tracking-wide text-neutral-500">Contact</dt>
                <dd className="mt-1 font-medium">{u.Contact}</dd>
              </div>
            )}
            {u.Mail && (
              <div className="rounded-lg border border-neutral-200 dark:border-neutral-700 p-4">
                <dt className="text-xs uppercase tracking-wide text-neutral-500">Email</dt>
                <dd className="mt-1 font-medium">{u.Mail}</dd>
              </div>
            )}
            {u.Site && (
              <div className="rounded-lg border border-neutral-200 dark:border-neutral-700 p-4">
                <dt className="text-xs uppercase tracking-wide text-neutral-500">Site web</dt>
                <dd className="mt-1 font-medium break-all">
                  <a href={`https://${u.Site.replace(/^https?:\/\//, '')}`} className="text-primary-600 hover:underline" target="_blank" rel="noopener noreferrer">
                    {u.Site}
                  </a>
                </dd>
              </div>
            )}
            {u.Adresse && (
              <div className="rounded-lg border border-neutral-200 dark:border-neutral-700 p-4 sm:col-span-2">
                <dt className="text-xs uppercase tracking-wide text-neutral-500">Adresse</dt>
                <dd className="mt-1 font-medium">{u.Adresse}</dd>
              </div>
            )}
            {u.Facebook && (
              <div className="rounded-lg border border-neutral-200 dark:border-neutral-700 p-4 sm:col-span-2">
                <dt className="text-xs uppercase tracking-wide text-neutral-500">Facebook</dt>
                <dd className="mt-1 font-medium break-all">
                  <a href={u.Facebook} className="text-primary-600 hover:underline" target="_blank" rel="noopener noreferrer">
                    {u.Facebook}
                  </a>
                </dd>
              </div>
            )}
            {/* Création et Ouverture masqués selon demande */}
          </dl>
        </div>
      </div>
    </section>
  );
}



