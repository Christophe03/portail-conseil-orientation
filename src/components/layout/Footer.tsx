'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { 
  HeartIcon,
  EnvelopeIcon,
  PhoneIcon,
  MapPinIcon
} from '@heroicons/react/24/outline';

const footerLinks = {
  produit: [
    { name: 'Universités', href: '/universites' },
    { name: 'Universités Privées', href: '/universites/privees' },
    { name: 'Universités Publiques', href: '/universites/publiques' },
    { name: 'Séries', href: '/universites/series' },
    { name: 'Télécharger', href: '/download' },
  ],
  ressources: [
    { name: 'Documentation', href: '/docs' },
  ],
  entreprise: [
    { name: 'À propos', href: '/about' },
    { name: 'Politique de confidentialité', href: '/privacy' },
  ],
};

const socialLinks = [
  { name: 'WhatsApp', href: 'https://wa.me/22392722564', icon: '💬' },
  { name: 'Facebook', href: 'https://facebook.com/conseilorientation', icon: '📘' },
  { name: 'Twitter', href: 'https://twitter.com/conseilorient', icon: '🐦' },
  { name: 'Instagram', href: 'https://instagram.com/conseilorientation', icon: '📷' },
  { name: 'LinkedIn', href: 'https://linkedin.com/company/conseil-orientation', icon: '💼' },
];

export function Footer() {
  return (
    <footer className="bg-neutral-900 text-white">
      <div className="container-custom py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
          {/* Logo et Description */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center space-x-3 mb-6">
              <div className="relative w-16 h-16">
                <Image
                  src="/app_icon_blanc.png"
                  alt="Conseil d'Orientation"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
              <span className="text-2xl font-bold text-white">
                Conseil d'Orientation
              </span>
            </Link>
            <p className="text-neutral-400 mb-6 max-w-md">
              Application et site d'orientation au Mali : universités privées et publiques,
              recherche par série et parcours post-BAC.
            </p>
            
            {/* Contact Info */}
            <div className="space-y-3">
              <div className="flex items-center space-x-3 text-neutral-400">
                <EnvelopeIcon className="h-5 w-5 text-primary-400" />
                <div className="flex flex-col">
                  <a href="mailto:goldeninnovationtech@gmail.com" className="hover:text-primary-400 transition-colors">
                    goldeninnovationtech@gmail.com
                  </a>
                  <a href="mailto:conseilorientationinfo@gmail.com" className="hover:text-primary-400 transition-colors">
                    conseilorientationinfo@gmail.com
                  </a>
                </div>
              </div>
              <div className="flex items-center space-x-3 text-neutral-400">
                <PhoneIcon className="h-5 w-5 text-primary-400" />
                <div className="flex flex-col">
                  <a href="tel:+22396855282" className="hover:text-primary-400 transition-colors">
                    +223 96 85 52 82
                  </a>
                  <a href="tel:+22392722564" className="hover:text-primary-400 transition-colors">
                    +223 92 72 25 64
                  </a>
                </div>
              </div>
              <div className="flex items-center space-x-3 text-neutral-400">
                <MapPinIcon className="h-5 w-5 text-primary-400" />
                <span>Mali, Kati Koko</span>
              </div>
            </div>
          </div>

          {/* Liens Produit */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">Produit</h3>
            <ul className="space-y-3">
              {footerLinks.produit.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-neutral-400 hover:text-primary-400 transition-colors duration-200"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Liens Ressources */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">Ressources</h3>
            <ul className="space-y-3">
              {footerLinks.ressources.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-neutral-400 hover:text-primary-400 transition-colors duration-200"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Liens Entreprise */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">Entreprise</h3>
            <ul className="space-y-3">
              {footerLinks.entreprise.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-neutral-400 hover:text-primary-400 transition-colors duration-200"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Séparateur */}
        <div className="border-t border-neutral-800 my-12"></div>

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          {/* Copyright */}
          <div className="text-neutral-400 text-sm">
            © {new Date().getFullYear()} Conseil d'Orientation. Tous droits réservés.
          </div>

          {/* Réseaux Sociaux */}
          <div className="flex items-center space-x-6">
            {socialLinks.map((social) => (
              <motion.a
                key={social.name}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-neutral-400 hover:text-primary-400 transition-colors duration-200"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="text-xl">{social.icon}</span>
                <span className="sr-only">{social.name}</span>
              </motion.a>
            ))}
          </div>
        </div>

        {/* Made with Love */}
        <div className="text-center mt-8 pt-8 border-t border-neutral-800">
          <p className="text-neutral-500 text-sm">
            Fait avec{' '}
            <HeartIcon className="inline h-4 w-4 text-red-500 mx-1" />
            {' '}au Mali pour les étudiants du monde entier
          </p>
        </div>
      </div>
    </footer>
  );
}
