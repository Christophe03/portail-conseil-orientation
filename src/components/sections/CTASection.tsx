'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { APP_DOWNLOAD_URL } from '@/lib/app-links';
import { 
  RocketLaunchIcon,
  ArrowRightIcon,
  CheckCircleIcon,
  SparklesIcon,
  AcademicCapIcon,
  ShieldCheckIcon
} from '@heroicons/react/24/outline';

const benefits = [
  'Assistant IA intelligent et personnalisé 24/7',
  'Annuaire complet de 190+ universités et instituts',
  'Toutes les séries du Baccalauréat malien prises en charge',
  'Application 100% gratuite et sécurisée',
];

export function CTASection() {
  return (
    <section className="py-20 md:py-28 bg-gradient-to-br from-[#0e3a6a] via-[#13508f] to-[#0a192f] text-white relative overflow-hidden">
      {/* Subtle background glow in logo dual-blue */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-32 right-1/4 w-96 h-96 bg-[#3b9df8]/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-32 left-1/4 w-96 h-96 bg-[#13508f]/30 rounded-full blur-3xl"></div>
      </div>

      <div className="container-custom relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Main CTA Header */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-10"
          >
            <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-5 py-2 mb-6">
              <SparklesIcon className="h-4 w-4 text-[#7cc5fb]" />
              <span className="text-xs font-semibold text-white tracking-wide">
                Orientation Scolaire & Universitaire au Mali
              </span>
            </div>

            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight mb-6 text-balance">
              Prêt à construire votre avenir académique avec <span className="text-[#7cc5fb]">Conseil d'Orientation</span> ?
            </h2>

            <p className="text-base sm:text-xl text-slate-200 mb-8 max-w-2xl mx-auto leading-relaxed">
              Ne laissez plus le doute freiner votre parcours. Téléchargez l'application dès aujourd'hui et explorez les meilleures filières adaptées à votre profil.
            </p>
          </motion.div>

          {/* Benefits Grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 mb-10 max-w-2xl mx-auto"
          >
            {benefits.map((benefit, index) => (
              <div
                key={index}
                className="flex items-center space-x-3 text-left bg-white/10 backdrop-blur-sm rounded-xl px-4 py-3 border border-white/10"
              >
                <CheckCircleIcon className="h-5 w-5 text-[#7cc5fb] flex-shrink-0" />
                <span className="text-xs sm:text-sm font-medium text-white">{benefit}</span>
              </div>
            ))}
          </motion.div>

          {/* CTA Buttons in Logo Colors */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-14"
          >
            <Button
              size="lg"
              className="w-full sm:w-auto bg-[#3b9df8] hover:bg-[#2589ec] text-white font-bold text-base px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center"
              asChild
            >
              <a href={APP_DOWNLOAD_URL} target="_blank" rel="noopener noreferrer">
                <RocketLaunchIcon className="h-5 w-5 mr-2" />
                Télécharger l'Application
                <ArrowRightIcon className="h-4 w-4 ml-2" />
              </a>
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="w-full sm:w-auto border-2 border-white/30 text-white hover:bg-white hover:text-[#13508f] font-bold text-base px-8 py-4 rounded-xl transition-all duration-200 flex items-center justify-center"
              asChild
            >
              <Link href="/universites">
                <AcademicCapIcon className="h-5 w-5 mr-2" />
                Explorer les Universités
              </Link>
            </Button>
          </motion.div>

          {/* Trust Indicators */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className="bg-white/10 backdrop-blur-md border border-white/15 rounded-3xl p-6 sm:p-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                <div className="p-3">
                  <div className="inline-flex p-3 rounded-2xl bg-white/10 text-[#7cc5fb] mb-3">
                    <SparklesIcon className="h-6 w-6" />
                  </div>
                  <h4 className="text-base font-bold mb-1">Orientation Personnalisée</h4>
                  <p className="text-slate-300 text-xs leading-relaxed">
                    Conseils basés sur vos notes, vos centres d'intérêts et votre série du BAC.
                  </p>
                </div>
                <div className="p-3">
                  <div className="inline-flex p-3 rounded-2xl bg-white/10 text-[#7cc5fb] mb-3">
                    <AcademicCapIcon className="h-6 w-6" />
                  </div>
                  <h4 className="text-base font-bold mb-1">Répertoire National</h4>
                  <p className="text-slate-300 text-xs leading-relaxed">
                    Facultés publiques d'État et universités privées autorisées au Mali.
                  </p>
                </div>
                <div className="p-3">
                  <div className="inline-flex p-3 rounded-2xl bg-white/10 text-[#7cc5fb] mb-3">
                    <ShieldCheckIcon className="h-6 w-6" />
                  </div>
                  <h4 className="text-base font-bold mb-1">Accès Libre & Gratuit</h4>
                  <p className="text-slate-300 text-xs leading-relaxed">
                    Plateforme et application gratuites pour tous les élèves et étudiants maliens.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
