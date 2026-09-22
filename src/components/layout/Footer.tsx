'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { APP_DOWNLOAD_URL } from '@/lib/app-links';
import {
  EnvelopeIcon,
  PhoneIcon,
  MapPinIcon,
  ArrowRightIcon,
  ArrowDownTrayIcon,
  AcademicCapIcon,
  SparklesIcon,
  ChatBubbleLeftRightIcon,
  ShieldCheckIcon
} from '@heroicons/react/24/outline';

const footerNav = {
  orientation: [
    { name: 'Universités Publiques', href: '/universites/publiques' },
    { name: 'Universités Privées', href: '/universites/privees' },
    { name: 'Séries du Baccalauréat', href: '/universites/series' },
    { name: 'Catalogue Général', href: '/universites' },
    { name: 'Simulateur de Séries', href: '/universites/series' },
  ],
  application: [
    { name: 'Télécharger l\'APK Android', href: '/download' },
    { name: 'Guide d\'installation', href: '/download#installation' },
    { name: 'Fonctionnalités Clés', href: '/features' },
    { name: 'Compatibilité & Prérequis', href: '/download#requirements' },
    { name: 'Formules & Accès Gratuit', href: '/features#formules' },
  ],
  ressources: [
    { name: 'Centre de Documentation', href: '/docs' },
    { name: 'Guide de Démarrage', href: '/docs#first-steps' },
    { name: 'Foire aux Questions (FAQ)', href: '/support#faq' },
    { name: 'Dépannage & Problèmes', href: '/support#common-issues' },
    { name: 'Référentiel Données & API', href: '/docs#api' },
  ],
  aPropos: [
    { name: 'Notre Mission & Histoire', href: '/about' },
    { name: 'Contact & Support', href: '/support#contact' },
    { name: 'Partenariats Établissements', href: '/features#integration' },
    { name: 'Politique de Confidentialité', href: '/privacy' },
  ],
};

const socialLinks = [
  {
    name: 'WhatsApp',
    href: 'https://wa.me/22392722564',
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4">
        <path
          fill="currentColor"
          d="M12 2a10 10 0 0 0-8.66 15L2 22l5.13-1.34A10 10 0 1 0 12 2Zm0 18a8 8 0 0 1-4.1-1.13l-.29-.17-3.05.8.82-2.98-.18-.3A8 8 0 1 1 20 12a8 8 0 0 1-8 8Zm4.35-5.04c-.24-.12-1.43-.7-1.65-.79-.22-.08-.38-.12-.54.12-.16.24-.62.79-.76.96-.14.17-.28.19-.52.07-.24-.12-1.01-.37-1.92-1.18-.71-.63-1.19-1.41-1.33-1.65-.14-.24-.01-.37.11-.49.11-.11.24-.28.36-.42.12-.14.16-.24.24-.4.08-.16.04-.3-.02-.42-.06-.12-.54-1.3-.74-1.78-.19-.46-.38-.4-.54-.41h-.46c-.16 0-.42.06-.64.3-.22.24-.84.82-.84 2 0 1.18.86 2.32.98 2.48.12.16 1.7 2.6 4.12 3.65.58.25 1.03.4 1.38.51.58.18 1.1.16 1.52.1.46-.07 1.43-.58 1.63-1.15.2-.57.2-1.06.14-1.15-.06-.09-.22-.14-.46-.26Z"
        />
      </svg>
    ),
  },
  {
    name: 'Facebook',
    href: 'https://facebook.com/conseilorientation',
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4">
        <path
          fill="currentColor"
          d="M13 9h3V6h-3c-2.21 0-4 1.79-4 4v2H7v3h2v7h3v-7h3l1-3h-4v-2c0-.55.45-1 1-1Z"
        />
      </svg>
    ),
  },
  {
    name: 'LinkedIn',
    href: 'https://www.linkedin.com/company/conseil-d-orientation-mali/?viewAsMember=true',
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4">
        <path
          fill="currentColor"
          d="M6.94 8.5H3.5V21h3.44V8.5Zm-1.72-6A2 2 0 1 0 7.2 4.5 2 2 0 0 0 5.22 2.5ZM21 21h-3.44v-6.1c0-1.46-.03-3.34-2.04-3.34-2.04 0-2.35 1.59-2.35 3.23V21H9.73V8.5h3.3v1.7h.05a3.62 3.62 0 0 1 3.26-1.8c3.48 0 4.12 2.29 4.12 5.27V21Z"
        />
      </svg>
    ),
  },
];

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-[#071324] border-t border-slate-800 text-slate-300">
      {/* Subtle brand glow textures */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-40 right-1/4 h-80 w-80 rounded-full bg-[#13508F]/15 blur-3xl" />
        <div className="absolute -bottom-40 left-1/4 h-80 w-80 rounded-full bg-[#3B9DF8]/10 blur-3xl" />
      </div>

      <div className="container-custom relative pt-16 pb-12">
        {/* Pre-footer Callout Banner */}
        <div className="mb-16 rounded-3xl border border-slate-700/80 bg-gradient-to-r from-[#0e274a] via-[#0b1c36] to-[#071324] p-8 sm:p-10 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 rounded-full bg-[#3B9DF8]/10 blur-2xl pointer-events-none" />

          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8 relative z-10">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#3B9DF8]/15 border border-[#3B9DF8]/30 text-[#3B9DF8] text-xs font-bold uppercase tracking-wider mb-3">
                <SparklesIcon className="w-3.5 h-3.5" />
                <span>Application 100% Gratuite • Android & Web</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                Prêt à construire votre avenir universitaire ?
              </h3>
              <p className="mt-2 text-sm sm:text-base text-slate-300 leading-relaxed">
                Rejoignez des milliers de lycéens et étudiants maliens. Explorez toutes les facultés d'État, les instituts privés et les séries du Bac en un clic.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 flex-shrink-0">
              <a
                href={APP_DOWNLOAD_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-[#13508F] hover:bg-[#0e3a6a] text-white font-semibold text-sm shadow-lg shadow-[#13508F]/30 hover:shadow-xl transition-all duration-200 min-h-[48px]"
              >
                <ArrowDownTrayIcon className="w-4 h-4" />
                <span>Télécharger l'APK</span>
                <span className="text-xs bg-white/20 px-2 py-0.5 rounded-md font-normal">~15 Mo</span>
              </a>

              <Link
                href="/universites"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-white/10 hover:bg-white/15 text-white font-semibold text-sm border border-white/20 hover:border-white/30 transition-all duration-200 min-h-[48px]"
              >
                <AcademicCapIcon className="w-4 h-4 text-[#3B9DF8]" />
                <span>Explorer les universités</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Main Footer Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-16">
          {/* Brand & Organization Column (5 cols) */}
          <div className="lg:col-span-4">
            <Link href="/" className="inline-flex items-center gap-3.5 mb-5 group">
              <div className="relative w-12 h-12 rounded-2xl overflow-hidden shadow-md bg-white border border-slate-700/60 p-1 flex-shrink-0">
                <Image
                  src="/app_icon.png"
                  alt="Conseil d'Orientation Mali"
                  fill
                  className="object-contain p-0.5"
                />
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-black text-white leading-tight tracking-tight">
                  Conseil d'<span className="text-[#3B9DF8]">Orientation</span>
                </span>
                <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                  Portail Officiel • Mali
                </span>
              </div>
            </Link>

            <p className="text-slate-400 text-xs sm:text-sm leading-relaxed mb-6">
              La plateforme d'orientation scolaire et universitaire de référence en République du Mali. Conçue pour aider chaque apprenant à choisir sa filière selon sa série de Baccalauréat.
            </p>

            {/* Direct Contact Cards */}
            <div className="space-y-2.5 text-xs text-slate-300">
              <div className="flex items-center gap-2.5 p-2.5 rounded-xl bg-white/5 border border-white/5">
                <PhoneIcon className="h-4 w-4 text-[#3B9DF8] flex-shrink-0" />
                <div className="flex flex-wrap gap-x-2">
                  <a href="tel:+22396855282" className="hover:text-white transition-colors">
                    +223 96 85 52 82
                  </a>
                  <span className="text-slate-600">•</span>
                  <a href="https://wa.me/22392722564" target="_blank" rel="noopener noreferrer" className="text-emerald-400 hover:text-emerald-300 transition-colors">
                    WhatsApp : +223 92 72 25 64
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-2.5 p-2.5 rounded-xl bg-white/5 border border-white/5">
                <EnvelopeIcon className="h-4 w-4 text-[#3B9DF8] flex-shrink-0" />
                <a href="mailto:conseilorientationinfo@gmail.com" className="hover:text-white transition-colors truncate">
                  conseilorientationinfo@gmail.com
                </a>
              </div>

              <div className="flex items-center gap-2.5 p-2.5 rounded-xl bg-white/5 border border-white/5">
                <MapPinIcon className="h-4 w-4 text-[#3B9DF8] flex-shrink-0" />
                <span>Kati Koko, Région de Koulikoro / Bamako, Mali</span>
              </div>
            </div>
          </div>

          {/* Links Columns (8 cols) */}
          <div className="lg:col-span-8 grid grid-cols-2 sm:grid-cols-4 gap-8">
            {/* Column 1: Orientation */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#3B9DF8]" />
                <span>Universités</span>
              </h4>
              <ul className="space-y-2.5 text-xs sm:text-sm">
                {footerNav.orientation.map((item) => (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className="text-slate-400 hover:text-white hover:text-[#3B9DF8] transition-colors block py-0.5"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 2: Application */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#3B9DF8]" />
                <span>Application</span>
              </h4>
              <ul className="space-y-2.5 text-xs sm:text-sm">
                {footerNav.application.map((item) => (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className="text-slate-400 hover:text-white hover:text-[#3B9DF8] transition-colors block py-0.5"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 3: Ressources */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#3B9DF8]" />
                <span>Ressources</span>
              </h4>
              <ul className="space-y-2.5 text-xs sm:text-sm">
                {footerNav.ressources.map((item) => (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className="text-slate-400 hover:text-white hover:text-[#3B9DF8] transition-colors block py-0.5"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 4: Organisation */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#3B9DF8]" />
                <span>À Propos</span>
              </h4>
              <ul className="space-y-2.5 text-xs sm:text-sm">
                {footerNav.aPropos.map((item) => (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className="text-slate-400 hover:text-white hover:text-[#3B9DF8] transition-colors block py-0.5"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Separator */}
        <div className="border-t border-slate-800/80 my-8" />

        {/* Bottom Bar: Copyright, Socials & Made in Mali */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
            <span>© {new Date().getFullYear()} Conseil d'Orientation Mali.</span>
            <span className="hidden sm:inline">•</span>
            <span>Tous droits réservés.</span>
            <span className="hidden sm:inline">•</span>
            <Link href="/privacy" className="hover:text-slate-300 underline underline-offset-2">
              Confidentialité
            </Link>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-2.5">
            {socialLinks.map((social) => (
              <motion.a
                key={social.name}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center h-8 w-8 rounded-lg bg-white/5 border border-white/10 text-slate-400 hover:text-white hover:border-[#3B9DF8]/50 hover:bg-[#13508F]/30 transition-all duration-200"
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.95 }}
                aria-label={social.name}
              >
                {social.icon}
              </motion.a>
            ))}
          </div>

          <div className="flex items-center gap-1.5 text-slate-400">
            <span>Fièrement conçu pour la jeunesse malienne</span>
            <span>🇲🇱</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
