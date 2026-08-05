# Documentation — Chatbot COS (Conseil d'Orientation Mali)

## 1. Présentation
**COS** est l'assistant virtuel IA du site Conseil d'Orientation Mali. Il est propulsé par l'API **Google Gemini 2.0 Flash** via le SDK officiel `@google/genai`.

Son rôle est d'orienter les élèves, lycéens et étudiants maliens, de recommander des universités privées ou publiques réelles d'après la base de données du site, et de faciliter la navigation sur le portail web.

---

## 2. Configuration de la Clé API Gemini

### En Développement Local :
1. Créez un fichier `.env.local` à la racine du projet (ignoré par Git).
2. Ajoutez votre clé API obtenue sur [Google AI Studio](https://aistudio.google.com/) :
   ```env
   GEMINI_API_KEY=AIzaSy...
   ```
3. Redémarrez le serveur dev avec `npm run dev`.

### En Production (Vercel ou autre hébergeur) :
1. Rendez-vous dans les paramètres du projet (*Settings > Environment Variables* sur Vercel).
2. Ajoutez la clé :
   - **Key** : `GEMINI_API_KEY`
   - **Value** : *(Votre clé API Gemini)*
   - **Environments** : Production, Preview, Development.
3. Déployez votre application.

> ⚠️ **Sécurité** : La clé est lue exclusivement dans la route serveur `src/app/api/chat/route.ts`. Elle ne possède aucun préfixe `NEXT_PUBLIC_` et n'est jamais exposée au navigateur.

---

## 3. Personnalisation & Prompting

### System Prompt
Le comportement, le ton et les règles anti-hallucination de COS sont définis dans :
`src/lib/cos-system-prompt.ts`

Pour modifier l'identité de COS, sa façon de s'exprimer ou ajouter des consignes :
- Éditez la constante `COS_SYSTEM_PROMPT`.

### Ancrage dans les Vraies Données
Pour éviter les hallucinations et garantir l'exactitude des établissements recommandés :
- Le module `src/lib/cos-data-matcher.ts` analyse le dernier message utilisateur.
- Il filtre les universités réelles dans `src/data/universites_privees.json` et `src/data/series_mali.json` par ville/localisation, série du BAC, et domaine d'études.
- Il injecte une sélection restreinte (5 à 10 établissements avec leurs fiches `/universites/privees/{slug}`) dans le contexte du prompt Gemini.

---

## 4. Garde-fous & Limites Techniques

- **Volume de l'historique** : Limité aux 10 derniers messages par appel API.
- **Longueur maximale des messages** : 500 caractères par envoi.
- **Rate limiting client** : Maximum 10 messages par minute.
- **Timeout API** : 15 secondes max par requête (avec réponse d'erreur 504 élégante).
- **Persistance** : Conversation en mémoire React state (réinitialisée au rechargement de page pour cette v1).
