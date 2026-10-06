'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { APP_DOWNLOAD_URL } from '@/lib/app-links';
import { SHOWCASE_MOCKUPS } from '@/data/app-mockups';
import {
  ArrowDownTrayIcon,
  CheckCircleIcon,
  AcademicCapIcon,
  CalculatorIcon,
  BriefcaseIcon,
  ShieldCheckIcon,
} from '@heroicons/react/24/outline';

interface AppShowcaseProps {
  variant?: 'full' | 'compact';
  className?: string;
}

export function AppShowcase({ variant = 'full', className = '' }: AppShowcaseProps) {
  const isCompact = variant === 'compact';

  const keyArguments = [
    {
      icon: AcademicCapIcon,
      title: 'Orientation par série du Bac',
      description: 'Accédez aux filières universitaires et facultés publiques adaptées à votre série (TSE, TAL, TSS, TSECO...).',
    },
    {
      icon: CalculatorIcon,
      title: 'Simulateur d\'éligibilité bourse',
      description: 'Estimez vos chances selon le barème officiel du CENOU (moyenne, scolarité, situation sociale).',
    },
    {
      icon: BriefcaseIcon,
      title: 'Débouchés professionnels réels',
      description: 'Consultez les fiches détaillées des formations et leurs perspectives concrètes d\'emploi au Mali.',
    },
  ];

  return (
    <section
      id="app-showcase"
      className={`relative overflow-hidden py-16 sm:py-20 lg:py-24 bg-gradient-to-b from-white via-sky-50/30 to-slate-50 dark:from-[#0a192f] dark:via-[#112240]/40 dark:to-[#0a192f] ${className}`}
      aria-label="Présentation de l'application mobile"
    >
      {/* Halo lumineux d'arrière-plan aux couleurs de marque */}
      <div
        className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 w-[700px] h-[450px] bg-gradient-to-tr from-[#3b9df8]/15 via-[#13508f]/10 to-transparent blur-3xl rounded-full"
        aria-hidden="true"
      />

      <div className="container-custom relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Colonne Gauche : Texte de présentation & arguments */}
          <div className={`${isCompact ? 'lg:col-span-7' : 'lg:col-span-6'} space-y-6 sm:space-y-8`}>
            {/* Badge de catégorie */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#13508f]/10 dark:bg-[#3b9df8]/15 border border-[#13508f]/20 dark:border-[#3b9df8]/30 text-xs sm:text-sm font-semibold text-[#13508f] dark:text-[#7cc5fb]">
              <span className="w-2 h-2 rounded-full bg-[#3b9df8] animate-pulse" />
              <span>Application mobile Android officielle</span>
            </div>

            {/* Titre principal */}
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-[#13508f] dark:text-white leading-[1.15]">
              Votre avenir universitaire <br className="hidden sm:inline" />
              <span className="text-[#3b9df8]">au creux de la main</span>
            </h2>

            {/* Description claire et rassurante */}
            <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed max-w-xl">
              Conçue pour les élèves, bacheliers et parents au Mali, l'application réunit toutes les informations fiables pour choisir sa filière, simuler sa bourse d'études et préparer son insertion professionnelle.
            </p>

            {/* 3 arguments clés basés sur les écrans réels */}
            <div className="space-y-4 pt-2">
              {keyArguments.map((arg, idx) => {
                const IconComponent = arg.icon;
                return (
                  <div key={idx} className="flex items-start gap-3.5">
                    <div className="shrink-0 w-10 h-10 rounded-xl bg-[#ebf5ff] dark:bg-[#112240] border border-[#3b9df8]/30 flex items-center justify-center text-[#13508f] dark:text-[#3b9df8]">
                      <IconComponent className="w-5 h-5 text-[#3b9df8]" />
                    </div>
                    <div>
                      <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white">
                        {arg.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-snug mt-0.5">
                        {arg.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Actions : Bouton de téléchargement APKPure */}
            <div className="pt-4 flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <Button
                size="lg"
                className="w-full sm:w-auto bg-[#13508f] hover:bg-[#0e4379] text-white dark:bg-[#3b9df8] dark:hover:bg-[#2589ec] font-bold text-base px-7 py-3.5 rounded-xl shadow-md hover:shadow-lg transition-all duration-200"
                asChild
              >
                <a
                  href={APP_DOWNLOAD_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2"
                >
                  <ArrowDownTrayIcon className="w-5 h-5 text-white shrink-0" />
                  <span>Télécharger l'application</span>
                </a>
              </Button>

              <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-500 dark:text-slate-400">
                <ShieldCheckIcon className="w-5 h-5 text-emerald-500 shrink-0" />
                <span>Format APK sécurisé • Gratuit & sans compte</span>
              </div>
            </div>
          </div>

          {/* Colonne Droite : Composition 3D des mockups */}
          <div className={`${isCompact ? 'lg:col-span-5' : 'lg:col-span-6'} flex justify-center`}>
            {isCompact ? (
              /* Version compacte (pour la page /about) : 1 seul téléphone bien cadré */
              <div className="relative w-full max-w-[340px] sm:max-w-[400px]">
                <div className="relative aspect-[16/15] w-full motion-safe:animate-[float_6s_ease-in-out_infinite]">
                  <Image
                    src={SHOWCASE_MOCKUPS.center.srcDesktop}
                    alt={SHOWCASE_MOCKUPS.center.alt}
                    width={SHOWCASE_MOCKUPS.center.width}
                    height={SHOWCASE_MOCKUPS.center.height}
                    sizes="(min-width: 1024px) 400px, 320px"
                    priority
                    className="w-full h-auto object-contain drop-shadow-[0_25px_40px_rgba(15,41,66,0.28)]"
                  />
                </div>
              </div>
            ) : (
              /* Version complète (page d'accueil) : Composition 3 téléphones (desktop) / 1 téléphone (mobile) */
              <div className="relative w-full max-w-[580px] lg:max-w-[620px] h-[340px] sm:h-[420px] md:h-[460px] lg:h-[480px] flex items-center justify-center">
                {/* Conteneur avec léger flottement CSS respectant prefers-reduced-motion */}
                <div className="relative w-full h-full flex items-center justify-center motion-safe:animate-[float_6s_ease-in-out_infinite]">
                  {/* Téléphone Gauche (Desktop uniquement) : Séries du Bac */}
                  <div
                    className="hidden lg:block absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 w-[52%] z-10 opacity-90 transition-transform duration-300 hover:scale-95 hover:opacity-100"
                    aria-hidden="true"
                  >
                    <Image
                      src={SHOWCASE_MOCKUPS.left.srcDesktop}
                      alt={SHOWCASE_MOCKUPS.left.alt}
                      width={SHOWCASE_MOCKUPS.left.width}
                      height={SHOWCASE_MOCKUPS.left.height}
                      sizes="(min-width: 1024px) 300px, 0px"
                      className="w-full h-auto object-contain drop-shadow-[0_20px_30px_rgba(15,41,66,0.22)]"
                    />
                  </div>

                  {/* Téléphone Centre (Visible sur mobile et desktop) : Pièce maîtresse (Simulateur Bourse) */}
                  <div className="relative w-[78%] sm:w-[68%] lg:w-[62%] z-20 scale-105 sm:scale-110">
                    <Image
                      src={SHOWCASE_MOCKUPS.center.srcDesktop}
                      alt={SHOWCASE_MOCKUPS.center.alt}
                      width={SHOWCASE_MOCKUPS.center.width}
                      height={SHOWCASE_MOCKUPS.center.height}
                      priority
                      sizes="(min-width: 1024px) 380px, (min-width: 640px) 340px, 280px"
                      className="w-full h-auto object-contain drop-shadow-[0_30px_50px_rgba(15,41,66,0.32)]"
                    />
                  </div>

                  {/* Téléphone Droit (Desktop uniquement) : Fiche formation et débouchés */}
                  <div
                    className="hidden lg:block absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 w-[52%] z-10 opacity-90 transition-transform duration-300 hover:scale-95 hover:opacity-100"
                    aria-hidden="true"
                  >
                    <Image
                      src={SHOWCASE_MOCKUPS.right.srcDesktop}
                      alt={SHOWCASE_MOCKUPS.right.alt}
                      width={SHOWCASE_MOCKUPS.right.width}
                      height={SHOWCASE_MOCKUPS.right.height}
                      sizes="(min-width: 1024px) 300px, 0px"
                      className="w-full h-auto object-contain drop-shadow-[0_20px_30px_rgba(15,41,66,0.22)]"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
