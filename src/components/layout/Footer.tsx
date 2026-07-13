'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { APP_DOWNLOAD_URL } from '@/lib/app-links';
import {
  HeartIcon,
  EnvelopeIcon,
  PhoneIcon,
  MapPinIcon,
  ArrowRightIcon
} from '@heroicons/react/24/outline';

const footerLinks = {
  produit: [
    { name: 'Universites', href: '/universites' },
    { name: 'Universites Privees', href: '/universites/privees' },
    { name: 'Universites Publiques', href: '/universites/publiques' },
    { name: 'Series', href: '/universites/series' },
    { name: 'Telecharger', href: '/download' },
  ],
  ressources: [
    { name: 'Documentation', href: '/docs' },
  ],
  entreprise: [
    { name: 'A propos', href: '/about' },
    { name: 'Politique de confidentialite', href: '/privacy' },
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
    <footer className="relative overflow-hidden bg-neutral-950 text-white">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-32 right-0 h-64 w-64 rounded-full bg-primary-500/10 blur-3xl"></div>
        <div className="absolute -bottom-32 left-0 h-64 w-64 rounded-full bg-secondary-500/10 blur-3xl"></div>
      </div>

      <div className="container-custom py-16 relative">
        <div className="mb-14 rounded-2xl border border-white/10 bg-gradient-to-r from-white/5 to-white/0 p-6 sm:p-8">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div>
              <h3 className="text-2xl font-bold text-white">Pret a demarrer ?</h3>
              <p className="mt-2 text-sm sm:text-base text-neutral-300">
                Explorez les universites, les series et les parcours post-BAC en quelques minutes.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href={APP_DOWNLOAD_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-primary-600 to-secondary-600 px-5 py-3 text-sm font-semibold text-white shadow-soft hover:from-primary-700 hover:to-secondary-700 transition-colors"
              >
                Telecharger l'app
              </a>
              <Link
                href="/universites"
                className="inline-flex items-center justify-center rounded-xl border border-white/20 px-5 py-3 text-sm font-semibold text-white/90 hover:bg-white/10 transition-colors"
              >
                Explorer les universites
              </Link>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-5">
            <Link href="/" className="flex items-center space-x-3 mb-5">
              <div className="relative w-14 h-14">
                <Image
                  src="/app_icon_blanc.png"
                  alt="Conseil d'Orientation"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
              <span className="text-xl sm:text-2xl font-bold text-white">
                Conseil d'Orientation
              </span>
            </Link>
            <p className="text-neutral-300 mb-6 max-w-md text-sm sm:text-base">
              Application et site d'orientation au Mali : universites privees et publiques,
              recherche par serie et parcours post-BAC.
            </p>

            <div className="space-y-3 text-sm sm:text-base">
              <div className="flex items-start space-x-3 text-neutral-300">
                <EnvelopeIcon className="h-5 w-5 text-primary-400 mt-0.5" />
                <div className="flex flex-col">
                  <a href="mailto:goldeninnovationtech@gmail.com" className="hover:text-primary-300 transition-colors">
                    goldeninnovationtech@gmail.com
                  </a>
                  <a href="mailto:conseilorientationinfo@gmail.com" className="hover:text-primary-300 transition-colors">
                    conseilorientationinfo@gmail.com
                  </a>
                </div>
              </div>
              <div className="flex items-start space-x-3 text-neutral-300">
                <PhoneIcon className="h-5 w-5 text-primary-400 mt-0.5" />
                <div className="flex flex-col">
                  <a href="tel:+22396855282" className="hover:text-primary-300 transition-colors">
                    +223 96 85 52 82
                  </a>
                  <a href="tel:+22392722564" className="hover:text-primary-300 transition-colors">
                    +223 92 72 25 64
                  </a>
                </div>
              </div>
              <div className="flex items-start space-x-3 text-neutral-300">
                <MapPinIcon className="h-5 w-5 text-primary-400 mt-0.5" />
                <span>Mali, Kati Koko</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 grid grid-cols-2 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-sm font-semibold tracking-wide text-white/80 uppercase mb-4">Produit</h3>
              <ul className="space-y-3">
                {footerLinks.produit.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="group inline-flex items-center gap-2 text-neutral-300 hover:text-white transition-colors"
                    >
                      <span>{link.name}</span>
                      <ArrowRightIcon className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-semibold tracking-wide text-white/80 uppercase mb-4">Ressources</h3>
              <ul className="space-y-3">
                {footerLinks.ressources.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="group inline-flex items-center gap-2 text-neutral-300 hover:text-white transition-colors"
                    >
                      <span>{link.name}</span>
                      <ArrowRightIcon className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-semibold tracking-wide text-white/80 uppercase mb-4">Entreprise</h3>
              <ul className="space-y-3">
                {footerLinks.entreprise.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="group inline-flex items-center gap-2 text-neutral-300 hover:text-white transition-colors"
                    >
                      <span>{link.name}</span>
                      <ArrowRightIcon className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 my-10"></div>

        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-neutral-400 text-xs sm:text-sm">
            © {new Date().getFullYear()} Conseil d'Orientation. Tous droits reserves.
          </div>

          <div className="flex items-center gap-3">
            {socialLinks.map((social) => (
              <motion.a
                key={social.name}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center h-9 w-9 rounded-full border border-white/10 bg-white/5 text-white/80 hover:text-white hover:border-white/30 transition-colors"
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.95 }}
              >
                {social.icon}
                <span className="sr-only">{social.name}</span>
              </motion.a>
            ))}
          </div>
        </div>

        <div className="text-center mt-8 pt-6 border-t border-white/10">
          <p className="text-neutral-500 text-xs sm:text-sm">
            Fait avec{' '}
            <HeartIcon className="inline h-4 w-4 text-red-500 mx-1" />
            {' '}au Mali pour les etudiants du monde entier
          </p>
        </div>
      </div>
    </footer>
  );
}
