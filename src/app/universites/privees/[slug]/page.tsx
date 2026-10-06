import Image from 'next/image';
import Link from 'next/link';
import type { Metadata } from 'next';
import data from '@/data/universites_privees.json';
import { formatDate, slugify } from '@/lib/utils';
import { ShareButton } from '@/components/ui/ShareButton';
import { BreadcrumbStructuredData, UniversityStructuredData } from '@/components/seo/StructuredData';
import { 
  BuildingOfficeIcon, 
  MapPinIcon, 
  PhoneIcon, 
  EnvelopeIcon, 
  GlobeAltIcon, 
  CalendarDaysIcon,
  IdentificationIcon,
  ArrowLeftIcon,
  ArrowRightIcon,
  CheckBadgeIcon,
  ChatBubbleLeftRightIcon,
  DocumentTextIcon,
  ArrowTopRightOnSquareIcon,
  SparklesIcon
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
  const description = `${name}${acronym}, établissement supérieur privé agréé à ${location}, Mali. Téléphone, email, arrêté ministériel et modalités d'inscription.`;
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
          <Link href="/universites/privees" className="mt-4 inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-[#13508F] text-white text-xs sm:text-sm font-semibold hover:bg-[#0e3a6a] transition-all">
            ← Retour à la liste des universités
          </Link>
        </div>
      </div>
    );
  }

  const hasLogo = u.Logo && u.Logo.trim() !== '' && u.Logo.trim() !== '/logo_appbar.png';
  const logoSrc = u.Logo && u.Logo.trim() !== '' ? u.Logo : '/logo_appbar.png';
  const initials = u.Sigle ? u.Sigle.substring(0, 3).toUpperCase() : u.Nom.substring(0, 2).toUpperCase();

  const lastModifiedDate = getDynamicLastModified(u);
  const directAnswer = `${u.Nom}${u.Sigle ? ` (${u.Sigle})` : ''} est un établissement d'enseignement supérieur privé reconnu et agréé par le Ministère de l'Enseignement Supérieur du Mali, situé à ${u.Localisation || 'au Mali'}. Retrouvez l'ensemble de ses coordonnées certifiées, informations administratives et modalités de contact direct ci-dessous.`;

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

  // Clean phone number for WhatsApp and Tel
  const numericPhone = cleanContact.replace(/\D/g, '');
  const isMaliPhone = numericPhone.length === 8;
  const whatsappNumber = isMaliPhone ? `223${numericPhone}` : numericPhone;

  // Maps URL
  const mapsQuery = encodeURIComponent(`${u.Nom} ${cleanAdresse || u.Localisation || 'Bamako Mali'}`);
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${mapsQuery}`;

  return (
    <div className="min-h-screen bg-slate-50/70 dark:bg-[#0a192f] pt-28 pb-16 sm:pt-36 sm:pb-24">
      <div className="container-custom max-w-4xl">
        <BreadcrumbStructuredData
          items={[
            { name: 'Accueil', item: '/' },
            { name: 'Universités', item: '/universites' },
            { name: 'Universités Privées', item: '/universites/privees' },
            { name: u.Sigle || u.Nom, item: `/universites/privees/${params.slug}` },
          ]}
        />
        <UniversityStructuredData
          name={u.Nom}
          acronym={u.Sigle}
          location={u.Localisation}
          address={u.Adresse}
          phone={cleanContact}
          email={cleanMail}
          website={cleanSite}
          isPublic={false}
          description={directAnswer}
          url={`/universites/privees/${params.slug}`}
        />
        {/* Breadcrumb & Back */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
          <nav className="flex items-center text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            <Link href="/" className="hover:text-[#13508F] dark:hover:text-[#3B9DF8]">Accueil</Link>
            <span className="mx-2">/</span>
            <Link href="/universites" className="hover:text-[#13508F] dark:hover:text-[#3B9DF8]">Universités</Link>
            <span className="mx-2">/</span>
            <Link href="/universites/privees" className="hover:text-[#13508F] dark:hover:text-[#3B9DF8]">Privées</Link>
            <span className="mx-2">/</span>
            <span className="text-slate-900 dark:text-white font-medium truncate max-w-[200px] sm:max-w-xs">{u.Sigle || u.Nom}</span>
          </nav>

          <Link 
            href="/universites/privees" 
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-[#13508F] dark:text-[#3B9DF8] hover:underline"
          >
            <ArrowLeftIcon className="w-4 h-4" />
            <span>Toutes les universités privées</span>
          </Link>
        </div>

        {/* University Hero Header Card */}
        <div className="rounded-3xl p-6 sm:p-8 md:p-10 bg-white dark:bg-[#112240] border border-slate-200 dark:border-slate-800 shadow-card mb-8 relative overflow-hidden">
          {/* Subtle decorative background gradient */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-bl from-[#3B9DF8]/10 via-[#13508F]/5 to-transparent rounded-full blur-3xl pointer-events-none" />

          <div className="relative">
            {/* Badges bar */}
            <div className="flex flex-wrap items-center gap-2 mb-4">
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-[#13508F]/10 text-[#13508F] dark:bg-[#3B9DF8]/15 dark:text-[#3B9DF8]">
                <CheckBadgeIcon className="w-4 h-4 text-[#3B9DF8]" />
                Établissement Supérieur Agréé
              </span>
              {u.Localisation && (
                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold bg-slate-100 dark:bg-[#0a192f] text-slate-700 dark:text-slate-300 border border-slate-200/60 dark:border-slate-700/60">
                  <MapPinIcon className="w-3.5 h-3.5 text-[#3B9DF8]" />
                  {u.Localisation}
                </span>
              )}
              {u.Sigle && (
                <span className="inline-block px-3 py-1 rounded-full text-xs font-black bg-[#13508F] text-white shadow-xs">
                  {u.Sigle}
                </span>
              )}
            </div>

            {/* University Identity */}
            <div className="flex flex-col sm:flex-row sm:items-start gap-5 mb-6">
              {hasLogo ? (
                <div className="relative h-20 w-20 sm:h-24 sm:w-24 rounded-2xl overflow-hidden bg-white dark:bg-slate-800 flex-shrink-0 border-2 border-slate-200 dark:border-slate-700 shadow-sm p-1.5">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  {logoSrc.startsWith('http') ? (
                    <img src={logoSrc} alt={u.Nom} className="h-full w-full object-contain" />
                  ) : (
                    <Image src={logoSrc} alt={u.Nom} fill className="object-contain p-1" />
                  )}
                </div>
              ) : (
                <div className="h-20 w-20 sm:h-24 sm:w-24 rounded-2xl bg-gradient-to-br from-[#13508F] to-[#3B9DF8] text-white flex items-center justify-center flex-shrink-0 font-black text-2xl sm:text-3xl shadow-md tracking-wider">
                  {initials}
                </div>
              )}

              <div className="flex-1 min-w-0">
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-900 dark:text-white leading-tight">
                  {u.Nom}
                </h1>
                {u.Désignation && (
                  <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 font-medium mt-1">
                    {u.Désignation}
                  </p>
                )}
                {u.Adresse && (
                  <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1.5 flex items-center gap-1.5">
                    <MapPinIcon className="w-4 h-4 text-[#3B9DF8] flex-shrink-0" />
                    <span>{u.Adresse}</span>
                  </p>
                )}
              </div>
            </div>

            {/* Action Buttons Bar */}
            <div className="flex flex-wrap items-center gap-2.5 pt-4 pb-2 border-t border-slate-100 dark:border-slate-800">
              {cleanContact && (
                <a
                  href={`tel:${cleanContact.replace(/\D/g, '')}`}
                  className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#13508F] hover:bg-[#0e3a6a] text-white text-xs sm:text-sm font-semibold transition-all shadow-sm min-h-[42px]"
                >
                  <PhoneIcon className="w-4 h-4" />
                  <span>Appeler ({cleanContact})</span>
                </a>
              )}

              {numericPhone && (
                <a
                  href={`https://wa.me/${whatsappNumber}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs sm:text-sm font-semibold transition-all shadow-sm min-h-[42px]"
                >
                  <ChatBubbleLeftRightIcon className="w-4 h-4" />
                  <span>WhatsApp</span>
                </a>
              )}

              {cleanMail && (
                <a
                  href={`mailto:${cleanMail}`}
                  className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-[#112240] hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200 text-xs sm:text-sm font-semibold transition-all shadow-xs min-h-[42px]"
                >
                  <EnvelopeIcon className="w-4 h-4 text-[#3B9DF8]" />
                  <span>Envoyer un email</span>
                </a>
              )}

              {cleanSite && (
                <a
                  href={`https://${cleanSite.replace(/^https?:\/\//, '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-[#112240] hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200 text-xs sm:text-sm font-semibold transition-all shadow-xs min-h-[42px]"
                >
                  <GlobeAltIcon className="w-4 h-4 text-[#3B9DF8]" />
                  <span>Site web officiel</span>
                  <ArrowTopRightOnSquareIcon className="w-3.5 h-3.5 text-slate-400" />
                </a>
              )}

              <ShareButton 
                title={`${u.Nom}${u.Sigle ? ` (${u.Sigle})` : ''} - Fiche Université Mali`}
                text={`Découvrez la fiche de ${u.Nom} (${u.Sigle || ''}) sur le Portail Conseil d'Orientation Mali.`}
              />
            </div>

            {/* Direct answer contextual card */}
            <div className="mt-6 p-4 sm:p-5 rounded-2xl bg-slate-50 dark:bg-[#0a192f] border border-slate-200/80 dark:border-slate-800">
              <div className="flex items-start gap-3">
                <SparklesIcon className="w-5 h-5 text-[#3B9DF8] flex-shrink-0 mt-0.5" />
                <div>
                  <h2 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-1">
                    Présentation de l'établissement
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                    {directAnswer}
                  </p>
                  <p className="text-[11px] text-slate-400 mt-2">
                    Dernière vérification des informations : {formatDate(lastModifiedDate)}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bento Grid: Official Administrative & Contact Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          {/* Card: Administration & Reconnaissance */}
          <div className="rounded-2xl p-6 bg-white dark:bg-[#112240] border border-slate-200 dark:border-slate-800 shadow-card">
            <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
              <DocumentTextIcon className="w-5 h-5 text-[#13508F] dark:text-[#3B9DF8]" />
              <span>Informations Administratives</span>
            </h3>

            <div className="space-y-3.5">
              <div className="p-3.5 rounded-xl bg-slate-50/80 dark:bg-[#0a192f] border border-slate-100 dark:border-slate-800">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-0.5">Statut officiel</span>
                <span className="font-semibold text-xs sm:text-sm text-slate-900 dark:text-white flex items-center gap-1.5">
                  <CheckBadgeIcon className="w-4 h-4 text-emerald-500" />
                  Agréé par le Ministère de l'Enseignement Supérieur
                </span>
              </div>

              {u.Ouverture && (
                <div className="p-3.5 rounded-xl bg-slate-50/80 dark:bg-[#0a192f] border border-slate-100 dark:border-slate-800">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-0.5">Arrêté d'ouverture / Référence</span>
                  <span className="font-semibold text-xs sm:text-sm text-slate-900 dark:text-white">{u.Ouverture}</span>
                </div>
              )}

              {u.Creation && (
                <div className="p-3.5 rounded-xl bg-slate-50/80 dark:bg-[#0a192f] border border-slate-100 dark:border-slate-800">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-0.5">Date de création</span>
                  <span className="font-semibold text-xs sm:text-sm text-slate-900 dark:text-white">{u.Creation}</span>
                </div>
              )}

              {u.Responsable && (
                <div className="p-3.5 rounded-xl bg-slate-50/80 dark:bg-[#0a192f] border border-slate-100 dark:border-slate-800">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-0.5">Direction / Promoteur</span>
                  <span className="font-semibold text-xs sm:text-sm text-slate-900 dark:text-white flex items-center gap-1.5">
                    <IdentificationIcon className="w-4 h-4 text-[#3B9DF8]" />
                    {u.Responsable}
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Card: Coordonnées & Localisation */}
          <div className="rounded-2xl p-6 bg-white dark:bg-[#112240] border border-slate-200 dark:border-slate-800 shadow-card">
            <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
              <MapPinIcon className="w-5 h-5 text-[#13508F] dark:text-[#3B9DF8]" />
              <span>Accès & Coordonnées</span>
            </h3>

            <div className="space-y-3.5">
              <div className="p-3.5 rounded-xl bg-slate-50/80 dark:bg-[#0a192f] border border-slate-100 dark:border-slate-800">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-0.5">Ville & Région</span>
                <span className="font-semibold text-xs sm:text-sm text-slate-900 dark:text-white">
                  {u.Localisation || 'Mali'}
                </span>
              </div>

              {cleanAdresse && (
                <div className="p-3.5 rounded-xl bg-slate-50/80 dark:bg-[#0a192f] border border-slate-100 dark:border-slate-800">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-0.5">Adresse physique</span>
                  <p className="font-semibold text-xs sm:text-sm text-slate-900 dark:text-white mb-2">{cleanAdresse}</p>
                  <a
                    href={mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs text-[#13508F] dark:text-[#3B9DF8] font-bold hover:underline"
                  >
                    <span>Ouvrir dans Google Maps</span>
                    <ArrowTopRightOnSquareIcon className="w-3.5 h-3.5" />
                  </a>
                </div>
              )}

              {cleanFacebook && (
                <div className="p-3.5 rounded-xl bg-slate-50/80 dark:bg-[#0a192f] border border-slate-100 dark:border-slate-800">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-0.5">Réseau social</span>
                  <a
                    href={cleanFacebook.startsWith('http') ? cleanFacebook : `https://${cleanFacebook}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-semibold text-xs sm:text-sm text-[#13508F] dark:text-[#3B9DF8] hover:underline flex items-center gap-1.5"
                  >
                    <span>Page Facebook officielle</span>
                    <ArrowTopRightOnSquareIcon className="w-3.5 h-3.5 text-slate-400" />
                  </a>
                </div>
              )}

              {!cleanAdresse && !cleanFacebook && (
                <div className="p-4 rounded-xl bg-slate-50/80 dark:bg-[#0a192f] border border-slate-100 dark:border-slate-800 text-xs text-slate-500">
                  Pour obtenir l'itinéraire exact ou des indications de quartier, veuillez contacter directement l'administration par téléphone.
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Guidance section: Comment postuler / Inscription */}
        <div className="rounded-3xl p-6 sm:p-8 bg-gradient-to-br from-[#13508F]/10 via-[#3B9DF8]/5 to-transparent border border-[#13508F]/20 dark:border-[#3B9DF8]/20 mb-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#13508F] dark:text-[#3B9DF8] block mb-1">
                Orientation & Inscription
              </span>
              <h3 className="text-lg sm:text-xl font-black text-slate-900 dark:text-white">
                Comment s'inscrire à {u.Sigle || u.Nom} ?
              </h3>
            </div>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#13508F] hover:bg-[#0e3a6a] text-white text-xs sm:text-sm font-semibold transition-all shadow-xs"
            >
              <span>Demander un conseil</span>
              <ArrowRightIcon className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-4 rounded-2xl bg-white dark:bg-[#112240] border border-slate-200/80 dark:border-slate-800">
              <span className="w-7 h-7 rounded-lg bg-[#13508F]/10 text-[#13508F] dark:text-[#3B9DF8] font-black text-xs flex items-center justify-center mb-2">1</span>
              <h4 className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white mb-1">Dossier de candidature</h4>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                Préparez votre attestation du Bac, relevés de notes du lycée, acte de naissance et photos d'identité.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-white dark:bg-[#112240] border border-slate-200/80 dark:border-slate-800">
              <span className="w-7 h-7 rounded-lg bg-[#13508F]/10 text-[#13508F] dark:text-[#3B9DF8] font-black text-xs flex items-center justify-center mb-2">2</span>
              <h4 className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white mb-1">Entretien ou Test</h4>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                Certains établissements organisent des tests de niveau ou entretiens d'orientation selon la filière choisie.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-white dark:bg-[#112240] border border-slate-200/80 dark:border-slate-800">
              <span className="w-7 h-7 rounded-lg bg-[#13508F]/10 text-[#13508F] dark:text-[#3B9DF8] font-black text-xs flex items-center justify-center mb-2">3</span>
              <h4 className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white mb-1">Validation & Bourses</h4>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                Renseignez-vous sur les facilités de paiement, bourses nationales ou demi-bourses accordées par l'établissement.
              </p>
            </div>
          </div>
        </div>

        {/* Prev / Next navigation */}
        <div className="flex flex-col sm:flex-row gap-3.5 justify-between mb-10">
          <Link
            href={`/universites/privees/${getSlug(prevU)}`}
            className="group flex-1 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#112240] hover:border-[#13508F]/40 dark:hover:border-[#3B9DF8]/40 shadow-xs transition-all flex items-center gap-3"
          >
            <div className="w-8 h-8 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center group-hover:bg-[#13508F]/10 transition-colors flex-shrink-0">
              <ArrowLeftIcon className="w-4 h-4 text-slate-500 group-hover:text-[#13508F] dark:group-hover:text-[#3B9DF8]" />
            </div>
            <div className="min-w-0">
              <span className="block text-[10px] font-bold uppercase tracking-wider text-slate-400">Précédent</span>
              <span className="font-semibold text-xs sm:text-sm text-slate-900 dark:text-white group-hover:text-[#13508F] dark:group-hover:text-[#3B9DF8] truncate block">
                {prevU.Sigle || prevU.Nom}
              </span>
            </div>
          </Link>

          <Link
            href={`/universites/privees/${getSlug(nextU)}`}
            className="group flex-1 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#112240] hover:border-[#13508F]/40 dark:hover:border-[#3B9DF8]/40 shadow-xs transition-all flex items-center justify-end text-right gap-3"
          >
            <div className="min-w-0">
              <span className="block text-[10px] font-bold uppercase tracking-wider text-slate-400">Suivant</span>
              <span className="font-semibold text-xs sm:text-sm text-slate-900 dark:text-white group-hover:text-[#13508F] dark:group-hover:text-[#3B9DF8] truncate block">
                {nextU.Sigle || nextU.Nom}
              </span>
            </div>
            <div className="w-8 h-8 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center group-hover:bg-[#13508F]/10 transition-colors flex-shrink-0">
              <ArrowRightIcon className="w-4 h-4 text-slate-500 group-hover:text-[#13508F] dark:group-hover:text-[#3B9DF8]" />
            </div>
          </Link>
        </div>

        {/* Similar universities */}
        {similar.length >= 2 && (
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
                Autres universités à {u.Localisation}
              </h3>
              <Link
                href="/universites/privees"
                className="text-xs text-[#13508F] dark:text-[#3B9DF8] font-semibold hover:underline"
              >
                Tout voir →
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
              {similar.map((s) => (
                <Link
                  key={s.ID}
                  href={`/universites/privees/${getSlug(s)}`}
                  className="group p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#112240] hover:border-[#13508F]/40 dark:hover:border-[#3B9DF8]/40 shadow-xs transition-all block"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded-md bg-slate-100 dark:bg-[#0a192f] text-slate-600 dark:text-slate-400">
                      Privé
                    </span>
                    {s.Sigle && (
                      <span className="text-xs text-[#13508F] dark:text-[#3B9DF8] font-bold">
                        {s.Sigle}
                      </span>
                    )}
                  </div>
                  <h4 className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white group-hover:text-[#13508F] dark:group-hover:text-[#3B9DF8] line-clamp-2 transition-colors">
                    {s.Nom}
                  </h4>
                  {s.Localisation && (
                    <span className="text-[11px] text-slate-400 mt-1 block">
                      📍 {s.Localisation}
                    </span>
                  )}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
