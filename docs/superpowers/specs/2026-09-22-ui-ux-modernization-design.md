# Spécification de Design UI & UX : Modernisation "Campus Moderne & Tech Ouest-Africaine"

**Projet** : Conseil d'Orientation Mali (Portail Web & Application Mobile)  
**Date** : 22 Septembre 2026  
**Statut** : Validé par le client  
**Auteur** : Antigravity Design Lead  

---

## 1. Contexte & Objectifs

### 1.1 Contexte
Le portail web *Conseil d'Orientation Mali* est la vitrine officielle et la plateforme numérique d'orientation scolaire et universitaire au Mali. Il référence l'ensemble des universités publiques (facultés, grandes écoles, instituts), les universités et instituts privés agréés, les séries du Baccalauréat malien (TSE, TAL, TSS, TSECO, STI, etc.), et propose une assistance intelligente par IA pour orienter les élèves et étudiants vers les meilleures filières d'avenir.

### 1.2 Problématiques constatées
- Présence d'éléments visuels génériques d'IA ("blobs" flous multicolores, gradients criards sur des mots isolés).
- Hero section centrée manquant d'impact produit (icône d'application isolée sans contexte d'usage).
- Manque de mise en valeur visuelle de l'application mobile et de l'expérience concrète sur smartphone.
- Navigation et filtres de recherche perfectibles pour les bacheliers cherchant des informations précises par série ou type d'établissement.

### 1.3 Objectifs de la refonte
1. **Autorité & Confiance** : Établir une image académique moderne, rigoureuse et prestigieuse adaptée au contexte de l'éducation nationale au Mali.
2. **Impact & Conversion** : Mettre en scène l'application mobile à travers un mockup de smartphone immersif et réaliste dès le Hero, avec des boutons de téléchargement directs (APK, Play Store).
3. **Ergonomie & Accessibilité** : Offrir une navigation fluide, responsive (mobile-first), un système de recherche instantané, et des fiches d'établissements lisibles avec des badges distincts.
4. **Cohérence du Design System** : Unifier les tokens (couleurs, typographie, ombres, espacements, mode sombre/clair).

---

## 2. Système de Design (Tokens & Principes)

### 2.1 Palette Chromatique
- **Bleu Nuit Académique (`brand-navy`)** :
  - `primary-900` / `#0F2942` : Couleur maîtresse des titres, de la marque et des composants institutionnels.
  - `primary-800` / `#16395B` : Hover et états actifs.
  - `primary-50` / `#F0F6FA` : Arrière-plans doux et badges neutres.
- **Or / Ambre Sahélien (`amber-gold`)** :
  - `accent-500` / `#D97706` : Éléments d'attention, badges "Nouveau / Populaire", notes d'évaluation.
  - `accent-400` / `#F59E0B` : Micro-accents et boutons d'appel à l'action spécifiques.
- **Vert Succès & Orientation (`emerald`)** :
  - `success-600` / `#059669` : Taux de réussite, statut des établissements publics agréés, filières ouvertes.
- **Surfaces & Mode Sombre** :
  - Mode Clair : Fond `#F8FAFC` (Slate subtil), cartes `#FFFFFF`, bordures `#E2E8F0`.
  - Mode Sombre : Fond `#0B132B` (bleu nuit spatial élégant), cartes `#14213D`, bordures `#1F2E4D`.

### 2.2 Typographie
- **Titres (Headings)** : `Poppins` (600 SemiBold, 700 Bold). Équilibrée, chaleureuse et structurée.
- **Corps de texte (Body)** : `Inter` (400 Regular, 500 Medium). Lisibilité irréprochable sur écrans mobiles de toutes résolutions.
- **Règles typographiques** :
  - Longueur maximale de ligne : 72 caractères.
  - Suppression des titres tout en majuscules non justifiés.
  - Contrastes conformes à la norme WCAG AA minimum.

### 2.3 Composants d'Interface
- **Rayons de courbure** : `rounded-2xl` (16px) pour les cartes et panneaux, `rounded-xl` (12px) pour les boutons, `rounded-full` pour les pilules de statut/filtres.
- **Élévations & Ombres** : Remplacement des ombres lourdes par des ombres portées douces teintées de bleu nuit (`shadow-sm`, `shadow-md` avec faible opacité).

---

## 3. Spécifications Détaillées des Composants & Pages

### 3.1 Header (Barre de navigation)
- **Position & Comportement** : Fixe en haut (`sticky top-0 z-50`), avec flou d'arrière-plan (`backdrop-blur-md bg-white/85 dark:bg-[#0B132B]/85`).
- **Logo & Titre** : Association du blason/icône officiel avec typographie nette "Conseil d'Orientation" et label contextuel "Mali".
- **Navigation** : Liens directs (Accueil, Universités, Séries du Bac, Documentation, À propos) avec indicateur actif.
- **Actions** : Bouton d'action principal "Télécharger l'App" et basculeur de thème sombre/clair.
- **Mobile** : Menu tiroir avec boutons tactiles d'au moins 48px de hauteur.

### 3.2 Hero Section (Vitrine Application Mobile)
- **Disposition** : Grille 2 colonnes asymétrique sur desktop, empilée logiquement sur mobile (texte et CTA d'abord, suivi du mockup).
- **Colonne Gauche** :
  - Badge pilule : `🎓 Portail de référence d'orientation post-bac au Mali` avec indicateur vert d'activité.
  - Titre principal : `"Construisez votre avenir universitaire au Mali avec l'aide de l'IA"`.
  - Paragraphe d'explication : Clair, orienté valeur étudiante et débouchés concrets.
  - Groupe de boutons CTA :
    - Principal : Télécharger l'application (avec icône smartphone).
    - Secondaire : Explorer l'annuaire des universités (avec icône boussole).
  - Bandeau de statistiques : 190+ Établissements, 100% Séries du Bac, Conseiller IA 24/7.
- **Colonne Droite (Showcase Mobile)** :
  - Mockup CSS haute fidélité d'un smartphone moderne.
  - Écran intérieur représentant la vue principale de l'application :
    - Profil d'élève de terminale malien.
    - Suggestion personnalisée de facultés et d'instituts.
    - Bulle d'échange interactive avec le conseiller IA.
    - Badge dynamique de mise à jour pour la rentrée 2026/2027.

### 3.3 Annuaire des Universités & Séries
- **Barre d'outils interactive** :
  - Champ de recherche instantané (par nom, sigle, ville ou discipline).
  - Filtres par onglets pilules défilables (Tous, Publiques, Privées, Séries).
  - Compteur dynamique de résultats en temps réel.
- **Cartes d'établissements** :
  - Badge de catégorie distinct (Vert émeraude pour Public, Indigo pour Privé Agréé).
  - Sigle en exergue et intitulé complet.
  - Localisation (ville/quartier) avec icône dédiée.
  - Tags des séries du Bac admissibles.
  - Bouton d'accès direct à la fiche détaillée.
- **États d'attente et erreurs** :
  - Squelettes de chargement (skeletons) fluides.
  - Écran d'état vide explicatif avec bouton de réinitialisation des filtres.

---

## 4. Plan de Tests & Vérification UI/UX

1. **Vérification responsive multi-résolutions** :
   - Mobile étroit (360px - 414px) : Lisibilité du Hero, fluidité du menu, clarté des cartes.
   - Tablette (768px - 1024px) : Grille 2 colonnes équilibrée.
   - Desktop (1280px+) : Alignement du Hero à 2 colonnes avec mockup immersif.
2. **Contrôle du mode Sombre / Clair** :
   - Vérification des contrastes textuels et de la netteté des bordures dans les deux modes.
3. **Validation technique** :
   - `npm run type-check` : 0 erreur TypeScript.
   - `npm run build` : Compilation Next.js 14 réussie sans avertissement bloquant.
   - Test de navigation interactif sur le serveur local `http://localhost:3000`.
