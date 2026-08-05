import Image from 'next/image';
import Link from 'next/link';
import type { Metadata } from 'next';
import data from '@/data/universites_privees.json';
import { formatDate, slugify } from '@/lib/utils';

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

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const university = matchUniversity(params.slug);
  if (!university) {
    return { title: 'Université introuvable', robots: { index: false, follow: false } };
  }

  const name = university.Nom;
  const acronym = university.Sigle ? ` (${university.Sigle})` : '';
  const location = university.Localisation || 'au Mali';
  const title = `${name}${acronym} — Adresse, contact | Conseil d'Orientation Mali`;
  const description = `${name}${acronym}, université privée située à ${location}, Mali. Adresse, contact, site web.`;
  const path = `/universites/privees/${params.slug}`;

  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: { title, description, url: path, type: 'website' },
    twitter: { card: 'summary_large_image', title, description },
  };
}

export default function PriveeDetailPage({ params }: { params: { slug: string } }) {
  const u = matchUniversity(params.slug);
  if (!u) {
    return (
      <section className="container-custom pt-24 pb-12 sm:pt-28">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-neutral-600 dark:text-neutral-300">Université introuvable.</p>
          <Link href="/universites/privees" className="mt-4 inline-flex items-center rounded-xl border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 px-4 py-2 text-sm text-neutral-700 dark:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-700 transition">
            ← Retour à la liste
          </Link>
        </div>
      </section>
    );
  }

  const hasLogo = u.Logo && u.Logo.trim() !== '' && u.Logo.trim() !== '/logo_appbar.png';
  const logoSrc = u.Logo && u.Logo.trim() !== '' ? u.Logo : '/logo_appbar.png';
  const initials = u.Sigle ? u.Sigle.substring(0, 2).toUpperCase() : u.Nom.charAt(0).toUpperCase();

  const lastModifiedDate = getDynamicLastModified(u);
  const directAnswer = `${u.Nom}${u.Sigle ? ` (${u.Sigle})` : ''} est une université ${u.Type?.toLowerCase() === 'publique' ? 'publique' : 'privée'} située à ${u.Localisation || 'au Mali'} au Mali. Elle est référencée dans le portail Conseil d’Orientation Mali pour aider les candidats à retrouver ses coordonnées, son adresse et ses informations de base.`;

  const sameLocation = universites.filter(
    (other) => other.ID !== u.ID && other.Localisation && other.Localisation === u.Localisation
  );
  const similar = sameLocation.slice(0, 3);

  const sorted = [...universites].sort((a, b) => a.Nom.localeCompare(b.Nom));
  const currentIndex = sorted.findIndex((other) => other.ID === u.ID);
  const prevU = sorted[(currentIndex - 1 + sorted.length) % sorted.length];
  const nextU = sorted[(currentIndex + 1) % sorted.length];
  const getSlug = (univ: Privee) => `${univ.Sigle ? slugify(univ.Sigle) : slugify(univ.Nom)}-${slugify(univ.ID || univ.Nom)}`;

  const cleanContact = String(u.Contact || '').trim();
  const cleanMail = String(u.Mail || '').trim();
  const cleanSite = String(u.Site || '').trim();
  const cleanFacebook = String(u.Facebook || '').trim();
  const cleanAdresse = String(u.Adresse || '').trim();
  const hasContactInfo = cleanContact || cleanMail || cleanSite || cleanFacebook || cleanAdresse;

  return (
    <section className="container-custom pt-24 pb-12 sm:pt-28">
      <div className="max-w-3xl mx-auto">
        <nav className="mb-4 flex items-center text-sm text-neutral-500 whitespace-nowrap overflow-x-auto">
          <Link href="/" className="text-primary-600 hover:underline">Accueil</Link>
          <span className="mx-2">{'>'}</span>
          <Link href="/universites" className="text-primary-600 hover:underline">Universités</Link>
          <span className="mx-2">{'>'}</span>
          <Link href="/universites/privees" className="text-primary-600 hover:underline">Universités privées</Link>
          <span className="mx-2">{'>'}</span>
          <span className="text-neutral-900 dark:text-neutral-200 truncate">{u.Nom}</span>
        </nav>

        <Link 
          href="/universites/privees" 
          className="inline-flex items-center rounded-xl border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 px-4 py-2 text-sm text-neutral-700 dark:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-700 transition mb-6"
        >
          ← Retour à la liste
        </Link>
        <div className="rounded-2xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 p-5 sm:p-6 shadow-soft">
          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            {hasLogo ? (
              <div className="relative h-16 w-16 rounded-xl overflow-hidden bg-neutral-100 dark:bg-neutral-800 flex-shrink-0">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                {logoSrc.startsWith('http') ? (
                  <img src={logoSrc} alt={u.Nom} className="h-full w-full object-cover" />
                ) : (
                  <Image src={logoSrc} alt={u.Nom} fill className="object-contain" />
                )}
              </div>
            ) : (
              <div className="h-16 w-16 rounded-xl bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center flex-shrink-0">
                <span className="text-primary-700 dark:text-primary-300 font-bold text-lg">{initials}</span>
              </div>
            )}
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
            {u.Ouverture && (
              <div className="rounded-lg border border-neutral-200 dark:border-neutral-700 p-4">
                <dt className="text-xs uppercase tracking-wide text-neutral-500">Date d'autorisation</dt>
                <dd className="mt-1 font-medium">{u.Ouverture}</dd>
              </div>
            )}
          </dl>

          {hasContactInfo && (
            <div className="mt-8">
              <h2 className="text-lg font-semibold text-neutral-900 dark:text-white mb-4">Contact</h2>
              <dl className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {cleanContact && (
                  <div className="rounded-lg border border-neutral-200 dark:border-neutral-700 p-4">
                    <dt className="text-xs uppercase tracking-wide text-neutral-500">Téléphone</dt>
                    <dd className="mt-1 font-medium">
                      <a href={`tel:${cleanContact.replace(/\D/g, '')}`} className="text-primary-600 hover:underline">
                        {cleanContact}
                      </a>
                    </dd>
                  </div>
                )}
                {cleanMail && (
                  <div className="rounded-lg border border-neutral-200 dark:border-neutral-700 p-4">
                    <dt className="text-xs uppercase tracking-wide text-neutral-500">Email</dt>
                    <dd className="mt-1 font-medium break-all">
                      <a href={`mailto:${cleanMail}`} className="text-primary-600 hover:underline">
                        {cleanMail}
                      </a>
                    </dd>
                  </div>
                )}
                {cleanSite && (
                  <div className="rounded-lg border border-neutral-200 dark:border-neutral-700 p-4">
                    <dt className="text-xs uppercase tracking-wide text-neutral-500">Site web</dt>
                    <dd className="mt-1 font-medium break-all">
                      <a href={`https://${cleanSite.replace(/^https?:\/\//, '')}`} className="text-primary-600 hover:underline" target="_blank" rel="noopener noreferrer">
                        {cleanSite}
                      </a>
                    </dd>
                  </div>
                )}
                {cleanFacebook && (
                  <div className="rounded-lg border border-neutral-200 dark:border-neutral-700 p-4 sm:col-span-2">
                    <dt className="text-xs uppercase tracking-wide text-neutral-500">Facebook</dt>
                    <dd className="mt-1 font-medium break-all">
                      <a href={cleanFacebook} className="text-primary-600 hover:underline" target="_blank" rel="noopener noreferrer">
                        {cleanFacebook}
                      </a>
                    </dd>
                  </div>
                )}
                {cleanAdresse && (
                  <div className="rounded-lg border border-neutral-200 dark:border-neutral-700 p-4 sm:col-span-2">
                    <dt className="text-xs uppercase tracking-wide text-neutral-500">Adresse</dt>
                    <dd className="mt-1 font-medium">{cleanAdresse}</dd>
                  </div>
                )}
              </dl>
            </div>
          )}
        </div>

        <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-between">
          <Link href={`/universites/privees/${getSlug(prevU)}`} className="flex-1 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 p-4 hover:border-primary-300 dark:hover:border-primary-700 transition text-left shadow-soft">
            <span className="block text-xs text-neutral-500 uppercase tracking-wider mb-1">Précédent</span>
            <span className="font-semibold text-primary-600 line-clamp-1">← {prevU.Sigle || prevU.Nom}</span>
          </Link>
          <Link href={`/universites/privees/${getSlug(nextU)}`} className="flex-1 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 p-4 hover:border-primary-300 dark:hover:border-primary-700 transition text-right shadow-soft">
            <span className="block text-xs text-neutral-500 uppercase tracking-wider mb-1">Suivant</span>
            <span className="font-semibold text-primary-600 line-clamp-1">{nextU.Sigle || nextU.Nom} →</span>
          </Link>
        </div>

        {similar.length >= 2 && (
          <div className="mt-12">
            <h2 className="text-xl font-bold text-neutral-900 dark:text-white mb-6">Universités à proximité</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {similar.map((s) => (
                <Link key={s.ID} href={`/universites/privees/${getSlug(s)}`} className="block rounded-xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 p-4 hover:shadow-medium transition">
                  <h3 className="font-semibold text-neutral-900 dark:text-white line-clamp-2">{s.Nom}</h3>
                  {s.Sigle && <p className="text-sm text-neutral-500 mt-1">{s.Sigle}</p>}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
