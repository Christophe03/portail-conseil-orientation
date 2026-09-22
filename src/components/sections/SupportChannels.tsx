'use client';

import { motion } from 'framer-motion';
import { 
  ChatBubbleLeftRightIcon,
  EnvelopeIcon,
  PhoneIcon,
  MapPinIcon,
  ClockIcon
} from '@heroicons/react/24/outline';

const supportChannels = [
  {
    icon: ChatBubbleLeftRightIcon,
    title: 'WhatsApp Support',
    description: 'Posez vos questions et échangez rapidement avec un membre de notre équipe.',
    contact: '+223 92 72 25 64',
    badge: 'Réponse rapide',
    href: 'https://wa.me/22392722564',
    cta: 'Démarrer une conversation'
  },
  {
    icon: EnvelopeIcon,
    title: 'Support par Email',
    description: 'Pour les demandes institutionnelles, partenariats de lycées ou questions détaillées.',
    contact: 'conseilorientationinfo@gmail.com',
    badge: 'Réponse sous 24h',
    href: 'mailto:conseilorientationinfo@gmail.com?subject=Support%20Conseil%20d%27Orientation',
    cta: 'Envoyer un courriel'
  },
  {
    icon: PhoneIcon,
    title: 'Ligne Téléphonique',
    description: 'Joignable du lundi au vendredi de 9h à 18h (GMT) pour vous orienter de vive voix.',
    contact: '+223 96 85 52 82 / +223 92 72 25 64',
    badge: 'Lun - Ven : 9h-18h',
    href: 'tel:+22396855282',
    cta: 'Appeler notre équipe'
  },
  {
    icon: MapPinIcon,
    title: 'Bureau & Présentiel',
    description: 'Accompagnement d\'établissements et coordination des journées d\'orientation.',
    contact: 'Kati Koko, Région de Koulikoro / Bamako, Mali',
    badge: 'Sur rendez-vous',
    href: '#contact',
    cta: 'Demander une rencontre'
  }
];

export function SupportChannels() {
  return (
    <section id="channels" className="py-16 sm:py-24 bg-white dark:bg-[#0a192f] border-b border-slate-200 dark:border-slate-800">
      <div className="container-custom">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#13508F]/10 dark:bg-[#3B9DF8]/10 text-[#13508F] dark:text-[#3B9DF8] text-xs font-bold uppercase tracking-wider mb-4">
            Points de Contact
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-4">
            Nos canaux d'<span className="text-[#13508F] dark:text-[#3B9DF8]">assistance directe</span>
          </h2>
          <p className="text-slate-600 dark:text-slate-300 text-base sm:text-lg">
            Choisissez le moyen de contact qui correspond le mieux à votre situation et votre équipement.
          </p>
        </motion.div>

        {/* Support Channels Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 mb-16">
          {supportChannels.map((channel, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="rounded-3xl p-6 sm:p-8 bg-slate-50/70 dark:bg-[#112240] border border-slate-200 dark:border-slate-800 shadow-card hover:border-[#13508F]/40 dark:hover:border-[#3B9DF8]/40 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between mb-5">
                  <div className="w-12 h-12 rounded-2xl bg-[#13508F]/10 dark:bg-[#3B9DF8]/10 text-[#13508F] dark:text-[#3B9DF8] flex items-center justify-center">
                    <channel.icon className="h-6 w-6" />
                  </div>
                  <span className="px-3 py-1 rounded-full text-xs font-semibold bg-white dark:bg-[#0a192f] text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
                    {channel.badge}
                  </span>
                </div>

                <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white mb-2">
                  {channel.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
                  {channel.description}
                </p>
                <div className="font-semibold text-xs sm:text-sm text-[#13508F] dark:text-[#3B9DF8] mb-6">
                  {channel.contact}
                </div>
              </div>

              <a
                href={channel.href}
                target={channel.href.startsWith('http') ? '_blank' : undefined}
                rel={channel.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                className="w-full text-center py-3 px-5 rounded-xl bg-[#13508F] hover:bg-[#0e3a6a] text-white font-semibold text-xs sm:text-sm transition-all duration-200 shadow-sm min-h-[44px] flex items-center justify-center"
              >
                {channel.cta}
              </a>
            </motion.div>
          ))}
        </div>

        {/* Commitment Banner */}
        <div className="rounded-3xl p-6 sm:p-8 bg-[#13508F] text-white flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center flex-shrink-0">
              <ClockIcon className="w-6 h-6 text-white" />
            </div>
            <div>
              <h4 className="font-bold text-base sm:text-lg">Écoute bienveillante & réactivité garantie</h4>
              <p className="text-xs sm:text-sm text-slate-200">
                Échanges en français et bamanankan pour assurer une compréhension parfaite de vos besoins.
              </p>
            </div>
          </div>
          <a
            href="https://wa.me/22392722564"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 rounded-xl bg-[#3B9DF8] hover:bg-[#258bf0] text-white font-semibold text-xs sm:text-sm whitespace-nowrap shadow-sm min-h-[44px] flex items-center justify-center"
          >
            Écrire sur WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
}
