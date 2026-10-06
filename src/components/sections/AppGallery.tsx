'use client';

import React, { useRef, useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { APP_MOCKUPS, AppMockup } from '@/data/app-mockups';
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  MagnifyingGlassPlusIcon,
  XMarkIcon,
  DevicePhoneMobileIcon,
} from '@heroicons/react/24/outline';

export function AppGallery() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [selectedMockup, setSelectedMockup] = useState<AppMockup | null>(null);
  const modalCloseButtonRef = useRef<HTMLButtonElement>(null);

  // Mise à jour de l'indicateur de position lors du défilement
  const handleScroll = useCallback(() => {
    const el = scrollContainerRef.current;
    if (!el) return;

    const scrollLeft = el.scrollLeft;
    const itemWidth = el.firstElementChild ? (el.firstElementChild as HTMLElement).offsetWidth : 300;
    const gap = 16;
    const index = Math.round(scrollLeft / (itemWidth + gap));
    setActiveIndex(Math.min(Math.max(0, index), APP_MOCKUPS.length - 1));
  }, []);

  useEffect(() => {
    const el = scrollContainerRef.current;
    if (!el) return;

    el.addEventListener('scroll', handleScroll, { passive: true });
    return () => el.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  // Défilement par boutons fléchés
  const scrollToSlide = (index: number) => {
    const el = scrollContainerRef.current;
    if (!el) return;

    const clampedIndex = Math.min(Math.max(0, index), APP_MOCKUPS.length - 1);
    const itemWidth = el.firstElementChild ? (el.firstElementChild as HTMLElement).offsetWidth : 300;
    const gap = 16;

    el.scrollTo({
      left: clampedIndex * (itemWidth + gap),
      behavior: 'smooth',
    });
    setActiveIndex(clampedIndex);
  };

  const handlePrev = () => scrollToSlide(activeIndex - 1);
  const handleNext = () => scrollToSlide(activeIndex + 1);

  // Gestion de la touche Échap pour fermer la visionneuse accessible
  useEffect(() => {
    if (!selectedMockup) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelectedMockup(null);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    // Focus sur le bouton fermer à l'ouverture
    setTimeout(() => {
      modalCloseButtonRef.current?.focus();
    }, 50);

    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedMockup]);

  return (
    <section
      id="app-gallery"
      className="py-16 sm:py-20 bg-slate-50/60 dark:bg-[#071324] border-t border-b border-slate-200/60 dark:border-slate-800/80"
      aria-label="Galerie des écrans de l'application mobile"
    >
      <div className="container-custom">
        {/* En-tête de section */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#13508f]/10 dark:bg-[#3b9df8]/15 border border-[#13508f]/20 dark:border-[#3b9df8]/30 text-xs sm:text-sm font-semibold text-[#13508f] dark:text-[#7cc5fb] mb-3">
            <DevicePhoneMobileIcon className="w-4 h-4 text-[#3b9df8]" />
            <span>Aperçu de l'interface mobile</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#13508f] dark:text-white tracking-tight">
            Explorez les 7 écrans clés de l'application
          </h2>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 mt-3 leading-relaxed">
            Faites défiler pour découvrir les fonctionnalités réelles : simulation de bourse, fiches diplômes et orientation post-bac.
          </p>
        </div>

        {/* Barre de contrôles (Flèches & Indicateurs) */}
        <div className="flex items-center justify-between gap-4 mb-6">
          <div className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-medium">
            Écran <span className="font-bold text-[#13508f] dark:text-[#3b9df8]">{activeIndex + 1}</span> sur {APP_MOCKUPS.length}
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handlePrev}
              disabled={activeIndex === 0}
              aria-label="Écran précédent"
              className="min-w-[44px] min-h-[44px] flex items-center justify-center rounded-full bg-white dark:bg-[#112240] border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 shadow-sm hover:bg-slate-50 dark:hover:bg-[#1b355e] disabled:opacity-40 disabled:cursor-not-allowed transition-all focus:outline-none focus:ring-2 focus:ring-[#3b9df8]"
            >
              <ChevronLeftIcon className="w-5 h-5" />
            </button>
            <button
              type="button"
              onClick={handleNext}
              disabled={activeIndex === APP_MOCKUPS.length - 1}
              aria-label="Écran suivant"
              className="min-w-[44px] min-h-[44px] flex items-center justify-center rounded-full bg-white dark:bg-[#112240] border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 shadow-sm hover:bg-slate-50 dark:hover:bg-[#1b355e] disabled:opacity-40 disabled:cursor-not-allowed transition-all focus:outline-none focus:ring-2 focus:ring-[#3b9df8]"
            >
              <ChevronRightIcon className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Carrousel CSS pur : scroll-snap horizontal */}
        <div
          ref={scrollContainerRef}
          role="region"
          aria-label="Carrousel des captures d'écran"
          className="flex gap-4 sm:gap-6 overflow-x-auto pb-4 pt-2 px-1 scroll-smooth snap-x snap-mandatory focus:outline-none [scrollbar-width:thin] [-webkit-overflow-scrolling:touch]"
          tabIndex={0}
        >
          {APP_MOCKUPS.map((mockup, index) => {
            const isActive = index === activeIndex;

            return (
              <div
                key={mockup.id}
                className="flex-none w-[72%] sm:w-[50%] md:w-[32%] lg:w-[30.5%] snap-start group"
              >
                <div
                  className={`flex flex-col h-full bg-white dark:bg-[#112240] rounded-2xl p-4 sm:p-5 border transition-all duration-200 shadow-card hover:shadow-card-hover ${
                    isActive
                      ? 'border-[#3b9df8] ring-2 ring-[#3b9df8]/20'
                      : 'border-slate-200/80 dark:border-slate-800'
                  }`}
                >
                  {/* Visuel du téléphone */}
                  <div className="relative aspect-[16/15] w-full flex items-center justify-center overflow-hidden rounded-xl bg-slate-50/50 dark:bg-[#0a192f]/50">
                    <Image
                      src={mockup.srcDesktop}
                      alt={mockup.alt}
                      width={mockup.width}
                      height={mockup.height}
                      loading="lazy"
                      sizes="(min-width: 1024px) 30vw, (min-width: 768px) 33vw, 72vw"
                      className="w-full h-auto object-contain transition-transform duration-300 group-hover:scale-105 drop-shadow-[0_15px_25px_rgba(15,41,66,0.18)]"
                    />

                    {/* Bouton d'agrandissement accessible */}
                    <button
                      type="button"
                      onClick={() => setSelectedMockup(mockup)}
                      aria-label={`Agrandir l'écran : ${mockup.caption}`}
                      className="absolute inset-0 w-full h-full flex items-center justify-center bg-slate-900/40 opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity duration-200 rounded-xl"
                    >
                      <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white text-slate-900 text-xs font-bold shadow-md">
                        <MagnifyingGlassPlusIcon className="w-4 h-4 text-[#13508f]" />
                        <span>Agrandir</span>
                      </span>
                    </button>
                  </div>

                  {/* Légende en français (3 à 6 mots) */}
                  <div className="mt-4 pt-2 text-center border-t border-slate-100 dark:border-slate-800/80">
                    <p className="text-sm font-bold text-slate-900 dark:text-white leading-tight">
                      {mockup.caption}
                    </p>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 line-clamp-1">
                      {mockup.title}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Indicateurs de position sous le carrousel */}
        <div className="flex justify-center items-center gap-2 mt-6" aria-label="Position dans le carrousel">
          {APP_MOCKUPS.map((mockup, index) => (
            <button
              key={mockup.id}
              type="button"
              onClick={() => scrollToSlide(index)}
              aria-label={`Aller à l'écran ${index + 1} : ${mockup.caption}`}
              className={`h-2.5 rounded-full transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#3b9df8] ${
                index === activeIndex
                  ? 'w-8 bg-[#13508f] dark:bg-[#3b9df8]'
                  : 'w-2.5 bg-slate-300 dark:bg-slate-700 hover:bg-slate-400'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Visionneuse accessible (Lightbox Modal) */}
      {selectedMockup && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="mockup-modal-title"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200"
          onClick={() => setSelectedMockup(null)}
        >
          <div
            className="relative w-full max-w-xl bg-white dark:bg-[#112240] rounded-2xl p-6 sm:p-8 border border-slate-200 dark:border-slate-700 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Bouton Fermer */}
            <button
              ref={modalCloseButtonRef}
              type="button"
              onClick={() => setSelectedMockup(null)}
              aria-label="Fermer la vue agrandie"
              className="absolute top-4 right-4 min-w-[44px] min-h-[44px] flex items-center justify-center rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors focus:outline-none focus:ring-2 focus:ring-[#3b9df8]"
            >
              <XMarkIcon className="w-5 h-5" />
            </button>

            {/* Titre et détails */}
            <div className="pr-12 mb-4">
              <h3
                id="mockup-modal-title"
                className="text-lg sm:text-xl font-extrabold text-[#13508f] dark:text-white"
              >
                {selectedMockup.caption}
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
                {selectedMockup.title}
              </p>
            </div>

            {/* Image agrandie */}
            <div className="relative aspect-[16/15] w-full flex items-center justify-center py-2">
              <Image
                src={selectedMockup.srcDesktop}
                alt={selectedMockup.alt}
                width={selectedMockup.width}
                height={selectedMockup.height}
                className="w-full h-auto max-h-[60vh] object-contain drop-shadow-[0_20px_35px_rgba(15,41,66,0.3)]"
              />
            </div>

            {/* Texte descriptif complet */}
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-4 leading-relaxed text-center">
              {selectedMockup.alt}
            </p>
          </div>
        </div>
      )}
    </section>
  );
}
