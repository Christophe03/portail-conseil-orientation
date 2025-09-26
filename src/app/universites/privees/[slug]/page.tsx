import Image from 'next/image';
import data from '@/data/universites_privees.json';
import { slugify } from '@/lib/utils';
import Link from 'next/link';

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
      <section className="container-custom pt-28 pb-16">
        <p className="text-center text-neutral-600 dark:text-neutral-300">Université introuvable.</p>
      </section>
    );
  }

  const logoSrc = u.Logo && u.Logo.trim() !== '' ? u.Logo : '/logo_appbar.png';

  return (
    <section className="container-custom pt-28 pb-16">
      <div className="max-w-3xl mx-auto">
        <Link href="/universites/privees" className="text-sm text-primary-600 hover:underline">
          ← Retour à la liste
        </Link>
        <div className="mt-6 rounded-2xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 p-6 shadow-soft">
          <div className="flex items-center gap-4">
            <div className="relative h-16 w-16 rounded-xl overflow-hidden bg-neutral-100 dark:bg-neutral-800 flex-shrink-0">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              {logoSrc.startsWith('http') ? (
                <img src={logoSrc} alt={u.Nom} className="h-full w-full object-cover" />
              ) : (
                <Image src={logoSrc} alt={u.Nom} fill className="object-contain" />
              )}
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-neutral-900 dark:text-white">
                {u.Nom}
              </h1>
              <p className="text-neutral-600 dark:text-neutral-300">{u.Désignation}</p>
            </div>
          </div>

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
                  <a href={`https://${u.Site.replace(/^https?:\/\//, '')}`} className="text-primary-600 hover:underline" target="_blank" rel="noreferrer">
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
                  <a href={u.Facebook} className="text-primary-600 hover:underline" target="_blank" rel="noreferrer">
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


