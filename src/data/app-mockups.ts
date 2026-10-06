export interface AppMockup {
  id: string;
  number: number;
  title: string;
  caption: string;
  alt: string;
  srcDesktop: string;
  srcMobile: string;
  width: number;
  height: number;
  widthMobile: number;
  heightMobile: number;
  hasProvisionalElements?: boolean;
  notes?: string;
}

/**
 * Dimensions réelles après rognage uniforme et optimisation :
 * - Desktop : 800 x 750 px
 * - Mobile : 480 x 450 px
 * Ratio : 16:15
 */
export const MOCKUP_DIMENSIONS = {
  desktop: { width: 800, height: 750 },
  mobile: { width: 480, height: 450 },
} as const;

/**
 * 7 écrans officiels de l'application mobile Conseil d'Orientation Mali.
 * Ordonnés logiquement avec les écrans comportant des éléments provisoires placés en fin de galerie.
 */
export const APP_MOCKUPS: AppMockup[] = [
  {
    id: 'bourse-simulation',
    number: 3,
    title: 'Simulateur d\'éligibilité bourse',
    caption: 'Simulateur d\'éligibilité à la bourse',
    alt: 'Simulateur d\'éligibilité à la bourse nationale sur l\'application mobile Conseil d\'Orientation Mali',
    srcDesktop: '/images/app/app-mockup-3.webp',
    srcMobile: '/images/app/app-mockup-3-sm.webp',
    width: MOCKUP_DIMENSIONS.desktop.width,
    height: MOCKUP_DIMENSIONS.desktop.height,
    widthMobile: MOCKUP_DIMENSIONS.mobile.width,
    heightMobile: MOCKUP_DIMENSIONS.mobile.height,
  },
  {
    id: 'formation-fiche',
    number: 5,
    title: 'Fiche formation détaillée',
    caption: 'Fiche formation et débouchés professionnels',
    alt: 'Fiche détaillée d\'une formation universitaire et de ses débouchés métiers sur l\'application Conseil d\'Orientation',
    srcDesktop: '/images/app/app-mockup-5.webp',
    srcMobile: '/images/app/app-mockup-5-sm.webp',
    width: MOCKUP_DIMENSIONS.desktop.width,
    height: MOCKUP_DIMENSIONS.desktop.height,
    widthMobile: MOCKUP_DIMENSIONS.mobile.width,
    heightMobile: MOCKUP_DIMENSIONS.mobile.height,
  },
  {
    id: 'bourse-criteres',
    number: 6,
    title: 'Critères de la bourse nationale',
    caption: 'Critères officiels des bourses nationales',
    alt: 'Barème et critères officiels d\'attribution des bourses d\'études au Mali sur l\'application mobile',
    srcDesktop: '/images/app/app-mockup-6.webp',
    srcMobile: '/images/app/app-mockup-6-sm.webp',
    width: MOCKUP_DIMENSIONS.desktop.width,
    height: MOCKUP_DIMENSIONS.desktop.height,
    widthMobile: MOCKUP_DIMENSIONS.mobile.width,
    heightMobile: MOCKUP_DIMENSIONS.mobile.height,
  },
  {
    id: 'menu-navigation',
    number: 7,
    title: 'Services et outils intégrés',
    caption: 'Accès rapide à tous les services',
    alt: 'Menu latéral de navigation et fonctionnalités clés de l\'application Conseil d\'Orientation Mali',
    srcDesktop: '/images/app/app-mockup-7.webp',
    srcMobile: '/images/app/app-mockup-7-sm.webp',
    width: MOCKUP_DIMENSIONS.desktop.width,
    height: MOCKUP_DIMENSIONS.desktop.height,
    widthMobile: MOCKUP_DIMENSIONS.mobile.width,
    heightMobile: MOCKUP_DIMENSIONS.mobile.height,
  },
  {
    id: 'series-bac',
    number: 2,
    title: 'Orientation par série du Bac',
    caption: 'Formations classées par série du Bac',
    alt: 'Liste des séries du Baccalauréat et universités associées sur l\'application mobile',
    srcDesktop: '/images/app/app-mockup-2.webp',
    srcMobile: '/images/app/app-mockup-2-sm.webp',
    width: MOCKUP_DIMENSIONS.desktop.width,
    height: MOCKUP_DIMENSIONS.desktop.height,
    widthMobile: MOCKUP_DIMENSIONS.mobile.width,
    heightMobile: MOCKUP_DIMENSIONS.mobile.height,
    hasProvisionalElements: true,
    notes: 'Pictogrammes géométriques génériques pour les séries',
  },
  {
    id: 'sous-domaines',
    number: 4,
    title: 'Sous-domaines scientifiques',
    caption: 'Exploration des filières scientifiques spécialisées',
    alt: 'Détail des sous-domaines et licences scientifiques disponibles sur l\'application',
    srcDesktop: '/images/app/app-mockup-4.webp',
    srcMobile: '/images/app/app-mockup-4-sm.webp',
    width: MOCKUP_DIMENSIONS.desktop.width,
    height: MOCKUP_DIMENSIONS.desktop.height,
    widthMobile: MOCKUP_DIMENSIONS.mobile.width,
    heightMobile: MOCKUP_DIMENSIONS.mobile.height,
    hasProvisionalElements: true,
    notes: 'Icône générique répétée sur chaque sous-domaine',
  },
  {
    id: 'domaines-etudes',
    number: 1,
    title: 'Grands domaines d\'étude',
    caption: 'Découverte des grands domaines d\'études',
    alt: 'Écran des grands domaines d\'études universitaires de l\'application Conseil d\'Orientation Mali',
    srcDesktop: '/images/app/app-mockup-1.webp',
    srcMobile: '/images/app/app-mockup-1-sm.webp',
    width: MOCKUP_DIMENSIONS.desktop.width,
    height: MOCKUP_DIMENSIONS.desktop.height,
    widthMobile: MOCKUP_DIMENSIONS.mobile.width,
    heightMobile: MOCKUP_DIMENSIONS.mobile.height,
    hasProvisionalElements: true,
    notes: 'Icônes de remplacement ? sur Littérature et Économie',
  },
];

/**
 * Les 3 mockups sélectionnés pour la composition 3D du composant AppShowcase.
 * Gauche : Séries du Bac (app-mockup-2)
 * Centre (premier plan) : Simulateur Bourse (app-mockup-3)
 * Droite : Fiche formation et débouchés (app-mockup-5)
 */
export const SHOWCASE_MOCKUPS = {
  left: APP_MOCKUPS.find((m) => m.number === 2)!,
  center: APP_MOCKUPS.find((m) => m.number === 3)!,
  right: APP_MOCKUPS.find((m) => m.number === 5)!,
};
