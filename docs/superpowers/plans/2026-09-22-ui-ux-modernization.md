# UI/UX Modernization Implementation Plan: Campus Moderne & Tech Ouest-Africaine

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Moderniser l'UI et l'UX du portail Conseil d'Orientation Mali avec un design distinctif "Campus Moderne & Tech Ouest-Africaine", un Hero à 2 colonnes avec showcase smartphone immersif, un Header en verre dépoli, et un annuaire d'universités ergonomique.

**Architecture:** Refonte modulaire et progressive basée sur Tailwind CSS, Next.js 14 (App Router) et Framer Motion. Chaque tâche isole un composant clé (Design Tokens, Header, Hero Showcase, Annuaire & Cartes) avec validation stricte de types et de build.

**Tech Stack:** Next.js 14.2.35, React 18.3.1, Tailwind CSS 3.4.17, TypeScript 5.9, Framer Motion 10.18, Heroicons / Lucide React.

**Spec:** [2026-09-22-ui-ux-modernization-design.md](file:///c:/Users/touma/Projet/portail%20conseil%20orientation/docs/superpowers/specs/2026-09-22-ui-ux-modernization-design.md)

## Global Constraints

- Respect strict de la typographie : Poppins (Headings) et Inter (Body).
- Palette chromatique : Bleu nuit académique `#0F2942`, Or/Ambre `#D97706`/`#F59E0B`, Vert émeraude `#059669`/`#10B981`.
- Suppression totale des "blobs" flous multicolores et des gradients criards sur mots isolés.
- Cibles tactiles mobiles d'au moins 48px.
- Pas de régression sur les 265 pages statiques générées lors du build.
- Compatibilité rigoureuse mode sombre et mode clair.

---

### Task 1: Design Tokens & Styles Globaux (Tailwind CSS)

**Files:**
- Modify: `c:/Users/touma/Projet/portail conseil orientation/tailwind.config.js`
- Modify: `c:/Users/touma/Projet/portail conseil orientation/src/styles/globals.css`

**Interfaces:**
- Produces: Nouvelles classes sémantiques de couleurs (`brand-navy`, `amber-gold`, etc.), ombres douces `shadow-card`, et utilitaires de surface.

- [ ] **Step 1: Mettre à jour `tailwind.config.js`**
Ajouter la palette académique enrichie (`brand-navy`, `surface`, `amber-gold`), les rayons `2xl` et les ombres adaptées au mode clair et sombre.

- [ ] **Step 2: Mettre à jour `src/styles/globals.css`**
Ajouter les classes utilitaires pour le verre dépoli (`glass-panel`), les bordures douces et le défilement tactile fluide.

- [ ] **Step 3: Vérifier la validité de la configuration**
Run: `npm.cmd run type-check`  
Expected: Succès (0 erreur)

- [ ] **Step 4: Commit**
```bash
git add tailwind.config.js src/styles/globals.css
git commit -m "style: configure modern campus design tokens and utility styles"
```

---

### Task 2: Header & Navigation Flottante en Verre Dépoli

**Files:**
- Modify: `c:/Users/touma/Projet/portail conseil orientation/src/components/layout/Header.tsx`

**Interfaces:**
- Consumes: Tokens Tailwind de Task 1, `useTheme`, `APP_DOWNLOAD_URL`.
- Produces: Header sticky avec effet `backdrop-blur-md`, indicateur de page active, bouton "Télécharger l'App" et menu mobile optimisé tactile.

- [ ] **Step 1: Réorganiser la barre de navigation Header.tsx**
Intégrer le container en verre dépoli, le logo avec sous-titre officiel, les liens avec fond actif subtil, le CTA de téléchargement accentué et le sélecteur de thème.

- [ ] **Step 2: Optimiser le tiroir de navigation mobile**
Vérifier que les éléments ont une hauteur minimale de 48px, un espacement aéré, et que le bouton de fermeture est clairement accessible.

- [ ] **Step 3: Vérifier le build et le type-check**
Run: `npm.cmd run type-check`  
Expected: Succès (0 erreur)

- [ ] **Step 4: Commit**
```bash
git add src/components/layout/Header.tsx
git commit -m "feat(header): modernize navbar with glassmorphism and mobile drawer"
```

---

### Task 3: Hero Section & Showcase Application Mobile Immersif

**Files:**
- Modify: `c:/Users/touma/Projet/portail conseil orientation/src/components/sections/HeroSection.tsx`

**Interfaces:**
- Consumes: Composants `Button`, `APP_DOWNLOAD_URL`, icônes Heroicons.
- Produces: Hero section en 2 colonnes asymétriques avec mockup smartphone CSS haute fidélité.

- [ ] **Step 1: Supprimer les blobs flous et gradients génériques**
Remplacer la structure de fond par un dégradé doux et subtil respectant la palette `brand-navy` et les neutres.

- [ ] **Step 2: Implémenter la colonne gauche (Accroche & Conversion)**
Ajouter le badge `🎓 Portail de référence d'orientation post-bac au Mali`, le titre fort et lisible, le paragraphe de valeur, les boutons d'action (Télécharger / Explorer) et la barre de statistiques (190+ établissements, 100% séries, IA 24/7).

- [ ] **Step 3: Implémenter la colonne droite (Mockup Smartphone CSS Réaliste)**
Concevoir le cadre de smartphone avec reflets d'écran, affichant un profil d'élève en Terminale TSE, la suggestion de filières à l'USTTB / ENI-ABT, et la bulle de discussion avec le Conseiller IA.

- [ ] **Step 4: Vérifier la réactivité et les types**
Run: `npm.cmd run type-check`  
Expected: Succès (0 erreur)

- [ ] **Step 5: Commit**
```bash
git add src/components/sections/HeroSection.tsx
git commit -m "feat(hero): redesign hero with 2-column layout and mobile app showcase"
```

---

### Task 4: Annuaire des Universités, Filtres & Cartes Établissements

**Files:**
- Modify: `c:/Users/touma/Projet/portail conseil orientation/src/components/sections/PriveesList.tsx`
- Modify: `c:/Users/touma/Projet/portail conseil orientation/src/app/universites/page.tsx`

**Interfaces:**
- Consumes: Données d'établissements existantes, tokens de statut.
- Produces: Composants de cartes d'universités modernisées avec badges Public / Privé Agréé, barre de recherche avec effacement rapide, et filtres défilables.

- [ ] **Step 1: Moderniser la barre d'outils et recherche dans PriveesList.tsx**
Ajouter le champ de recherche stylisé avec raccourci visuel, bouton d'effacement, et compteur de résultats dynamique.

- [ ] **Step 2: Styliser les cartes d'établissements**
Ajouter les badges de distinction clairs (Vert émeraude pour Public, Indigo pour Privé Agréé), tags de séries du bac admissibles, micro-interactions au survol et bouton de consultation directe.

- [ ] **Step 3: Ajouter l'état vide bienveillant (Empty State)**
Fournir un message clair et un bouton "Réinitialiser la recherche" lorsqu'aucun établissement ne correspond aux filtres.

- [ ] **Step 4: Vérifier les types**
Run: `npm.cmd run type-check`  
Expected: Succès (0 erreur)

- [ ] **Step 5: Commit**
```bash
git add src/components/sections/PriveesList.tsx src/app/universites/page.tsx
git commit -m "feat(universites): modernize university cards, search bar and filter badges"
```

---

### Task 5: Validation Globale du Build & Vérification Visuelle

**Files:**
- Global verification across all pages

- [ ] **Step 1: Exécuter la vérification des types TypeScript**
Run: `npm.cmd run type-check`  
Expected: 0 erreur

- [ ] **Step 2: Exécuter le build de production complet**
Run: `npm.cmd run build`  
Expected: Génération complète des 265 pages statiques avec code de sortie 0

- [ ] **Step 3: Vérifier la réponse HTTP du serveur local**
Run: Requête sur `http://localhost:3000` et `http://localhost:3000/universites`  
Expected: Réponse 200 OK

- [ ] **Step 4: Commit final et Walkthrough**
```bash
git add .
git commit -m "chore(ui): complete UI/UX modernization of portal"
```
