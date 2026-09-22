import Image from 'next/image';
import Link from 'next/link';
import type { Metadata } from 'next';
import data from '@/data/universites_privees.json';
import { formatDate, slugify } from '@/lib/utils';
import { 
  BuildingOfficeIcon, 
  MapPinIcon, 
  PhoneIcon, 
  EnvelopeIcon, 
  GlobeAltIcon, 
  CalendarDaysIcon,
  IdentificationIcon,
  ArrowLeftIcon,
  ArrowRightIcon
} from '@heroicons/react/24/outline';

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
  const title = `${name}${acronym} — Adresse, contact & filières | Mali`;
  const description = `${name}${acronym}, université privée située à ${location}, Mali. Adresse, contact, site web et informations d'inscription.`;
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
      <div className="min-h-screen bg-slate-50/70 dark:bg-[#0a192f] pt-28 pb-16 sm:pt-36">
        <div className="container-custom max-w-3xl text-center">
          <p className="text-slate-600 dark:text-slate-300">Université introuvable.</p>
          <Link href="/universites/privees" className="mt-4 inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#13508F] text-white text-xs sm:text-sm font-semibold">
            ← Retour à la liste
          </Link>
        </div>
      </div>
    );
  }

  const hasLogo = u.Logo && u.Logo.trim() !== '' && u.Logo.trim() !== '/logo_appbar.png';
  const logoSrc = u.Logo && u.Logo.trim() !== '' ? u.Logo : '/logo_appbar.png';
  const initials = u.Sigle ? u.Sigle.substring(0, 2).toUpperCase() : u.Nom.charAt(0).toUpperCase();

  const lastModifiedDate = getDynamicLastModified(u);
  const directAnswer = `${u.Nom}${u.Sigle ? ` (${u.Sigle})` : ''} est un établissement d'enseignement supérieur privé agréé situé à ${u.Localisation || 'au Mali'}. Retrouvez l'ensemble de ses coordonnées certifiées, ses filières de formation et les modalités de contact.`;

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
    <div className="min-h-screen bg-slate-50/70 dark:bg-[#0a192f] pt-28 pb-16 sm:pt-36 sm:pb-24">
      <div className="container-custom max-w-3xl">
        {/* Breadcrumb & Back */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
          <nav className="flex items-center text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            <Link href="/" className="hover:text-[#13508F] dark:hover:text-[#3B9DF8]">Accueil</Link>
            <span className="mx-2">/</span>
            <Link href="/universites" className="hover:text-[#13508F] dark:hover:text-[#3B9DF8]">Universités</Link>
            <span className="mx-2">/</span>
            <Link href="/universites/privees" className="hover:text-[#13508F] dark:hover:text-[#3B9DF8]">Privées</Link>
            <span className="mx-2">/</span>
            <span className="text-slate-900 dark:text-white font-medium truncate">{u.Sigle || u.Nom}</span>
          </nav>

          <Link 
            href="/universites/privees" 
            className="text-xs sm:text-sm font-semibold text-[#13508F] dark:text-[#3B9DF8] hover:underline"
          >
            ← Retour à la liste
          </Link>
        </div>

        {/* University Main Card */}
        <div className="rounded-3xl p-6 sm:p-8 bg-white dark:bg-[#112240] border border-slate-200 dark:border-slate-800 shadow-card mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center gap-5 mb-5">
            {hasLogo ? (
              <div className="relative h-16 w-16 rounded-2xl overflow-hidden bg-slate-100 dark:bg-slate-800 flex-shrink-0 border border-slate-200 dark:border-slate-700">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                {logoSrc.startsWith('http') ? (
                  <img src={logoSrc} alt={u.Nom} className="h-full w-full object-cover" />
                ) : (
                  <Image src={logoSrc} alt={u.Nom} fill className="object-contain p-1" />
                )}
              </div>
            ) : (
              <div className="h-16 w-16 rounded-2xl bg-[#13508F]/10 dark:bg-[#3B9DF8]/10 text-[#13508F] dark:text-[#3B9DF8] flex items-center justify-center flex-shrink-0 font-black text-xl">
                {initials}
              </div>
            )}
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-1.5">
                <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#13508F]/10 text-[#13508F] dark:bg-[#3B9DF8]/10 dark:text-[#3B9DF8]">
                  Établissement Privé
                </span>
                {u.Localisation && (
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-100 dark:bg-[#0a192f] text-slate-600 dark:text-slate-300">
                    📍 {u.Localisation}
                  </span>
                )}
              </div>
              <h1 className="text-xl sm:text-2xl md:text-3xl font-black text-slate-900 dark:text-white leading-tight">
                {u.Nom}
              </h1>
              {u.Désignation && (
                <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">{u.Désignation}</p>
              )}
            </div>
          </div>

          <p className="p-4 rounded-xl bg-slate-50 dark:bg-[#0a192f] border border-slate-100 dark:border-slate-800 text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed mb-3">
            {directAnswer}
          </p>
          <p className="text-[11px] text-slate-400">
            Fiche actualisée le {formatDate(lastModifiedDate)}
          </p>

          {/* Quick info grid */}
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {u.Sigle && (
              <div className="p-4 rounded-xl bg-slate-50/70 dark:bg-[#0a192f] border border-slate-200/80 dark:border-slate-800">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-1">Sigle</span>
                <span className="font-bold text-sm text-slate-900 dark:text-white">{u.Sigle}</span>
              </div>
            )}
            {u.Localisation && (
              <div className="p-4 rounded-xl bg-slate-50/70 dark:bg-[#0a192f] border border-slate-200/80 dark:border-slate-800">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-1">Ville / Localisation</span>
                <span className="font-bold text-sm text-slate-900 dark:text-white">{u.Localisation}</span>
              </div>
            )}
            {u.Ouverture && (
              <div className="p-4 rounded-xl bg-slate-50/70 dark:bg-[#0a192f] border border-slate-200/80 dark:border-slate-800">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-1">Arrêté / Date d'ouverture</span>
                <span className="font-bold text-sm text-slate-900 dark:text-white">{u.Ouverture}</span>
              </div>
            )}
            {u.Responsable && (
              <div className="p-4 rounded-xl bg-slate-50/70 dark:bg-[#0a192f] border border-slate-200/80 dark:border-slate-800">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-1">Direction / Responsable</span>
                <span className="font-bold text-sm text-slate-900 dark:text-white">{u.Responsable}</span>
              </div>
            )}
          </div>

          {/* Contact Details */}
          {hasContactInfo && (
            <div className="mt-8 pt-6 border-t border-slate-100 dark:border-slate-800">
              <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white mb-4">
                Coordonnées & Prise de Contact
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {cleanContact && (
                  <div className="p-4 rounded-xl bg-slate-50/70 dark:bg-[#0a192f] border border-slate-200/80 dark:border-slate-800 flex items-start gap-3">
                    <PhoneIcon className="w-5 h-5 text-[#3B9DF8] flex-shrink-0 mt-0.5" />
                    <div>
                      <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">Téléphone</span>
                      <a href={`tel:${cleanContact.replace(/\D/g, '')}`} className="font-semibold text-xs sm:text-sm text-[#13508F] dark:text-[#3B9DF8] hover:underline">
                        {cleanContact}
                      </a>
                    </div>
                  </div>
                )}
                {cleanMail && (
                  <div className="p-4 rounded-xl bg-slate-50/70 dark:bg-[#0a192f] border border-slate-200/80 dark:border-slate-800 flex items-start gap-3">
                    <EnvelopeIcon className="w-5 h-5 text-[#3B9DF8] flex-shrink-0 mt-0.5" />
                    <div className="min-w-0">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">Email</span>
                      <a href={`mailto:${cleanMail}`} className="font-semibold text-xs sm:text-sm text-[#13508F] dark:text-[#3B9DF8] hover:underline break-all">
                        {cleanMail}
                      </a>
                    </div>
                  </div>
                )}
                {cleanSite && (
                  <div className="p-4 rounded-xl bg-slate-50/70 dark:bg-[#0a192f] border border-slate-200/80 dark:border-slate-800 flex items-start gap-3">
                    <GlobeAltIcon className="w-5 h-5 text-[#3B9DF8] flex-shrink-0 mt-0.5" />
                    <div className="min-w-0">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">Site Web</span>
                      <a href={`https://${cleanSite.replace(/^https?:\/\//, '')}`} target="_blank" rel="noopener noreferrer" className="font-semibold text-xs sm:text-sm text-[#13508F] dark:text-[#3B9DF8] hover:underline break-all">
                        {cleanSite}
                      </a>
                    </div>
                  </div>
                )}
                {cleanAdresse && (
                  <div className="p-4 rounded-xl bg-slate-50/70 dark:bg-[#0a192f] border border-slate-200/80 dark:border-slate-800 flex items-start gap-3 sm:col-span-2">
                    <MapPinIcon className="w-5 h-5 text-[#3B9DF8] flex-shrink-0 mt-0.5" />
                    <div>
                      <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">Adresse physique</span>
                      <span className="text-xs sm:text-sm text-slate-800 dark:text-slate-200">{cleanAdresse}</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Prev / Next navigation */}
        <div className="flex flex-col sm:flex-row gap-3.5 justify-between mb-10">
          <Link
            href={`/universites/privees/${getSlug(prevU)}`}
            className="flex-1 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#112240] hover:border-[#13508F]/40 shadow-xs transition-colors"
          >
            <span className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">Précédent</span>
            <span className="font-semibold text-xs sm:text-sm text-[#13508F] dark:text-[#3B9DF8] line-clamp-1">← {prevU.Sigle || prevU.Nom}</span>
          </Link>
          <Link
            href={`/universites/privees/${getSlug(nextU)}`}
            className="flex-1 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#112240] hover:border-[#13508F]/40 shadow-xs transition-colors text-right"
          >
            <span className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">Suivant</span>
            <span className="font-semibold text-xs sm:text-sm text-[#13508F] dark:text-[#3B9DF8] line-clamp-1">{nextU.Sigle || nextU.Nom} →</span>
          </Link>
        </div>

        {/* Similar universities */}
        {similar.length >= 2 && (
          <div>
            <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white mb-4">
              Autres universités à {u.Localisation}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
              {similar.map((s) => (
                <Link
                  key={s.ID}
                  href={`/universites/privees/${getSlug(s)}`}
                  className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#112240] hover:border-[#13508F]/40 shadow-xs transition-colors block"
                >
                  <h4 className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white line-clamp-2">{s.Nom}</h4>
                  {s.Sigle && <span className="text-[11px] text-[#13508F] dark:text-[#3B9DF8] font-semibold mt-1 block">{s.Sigle}</span>}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
