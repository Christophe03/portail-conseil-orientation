# 🔥 Configuration Firebase pour Conseil d'Orientation Mali

Ce guide vous explique comment configurer Firebase pour votre projet Conseil d'Orientation Mali.

## 📋 Prérequis

1. Un compte Google
2. Accès à la [Console Firebase](https://console.firebase.google.com/)
3. Node.js et npm installés

## 🚀 Étapes de Configuration

### 1. Créer un Projet Firebase

1. Allez sur [Firebase Console](https://console.firebase.google.com/)
2. Cliquez sur "Créer un projet"
3. Nommez votre projet : `conseil-orientation-mali`
4. Activez Google Analytics (recommandé)
5. Choisissez votre compte Analytics

### 2. Configurer l'Authentification

1. Dans la console Firebase, allez dans "Authentication"
2. Cliquez sur "Commencer"
3. Allez dans l'onglet "Sign-in method"
4. Activez les méthodes suivantes :
   - **Email/Password** : Pour l'inscription et connexion classique
   - **Google** : Pour la connexion avec Google
   - **Facebook** : Pour la connexion avec Facebook
   - **Phone** : Pour la connexion par téléphone (optionnel)

#### Configuration Google :
- Activez "Google" dans les méthodes de connexion
- Ajoutez votre domaine autorisé : `conseil-orientation-mali.com`

#### Configuration Facebook :
- Créez une app Facebook sur [Facebook Developers](https://developers.facebook.com/)
- Ajoutez l'App ID et App Secret dans Firebase

### 3. Configurer Firestore Database

1. Allez dans "Firestore Database"
2. Cliquez sur "Créer une base de données"
3. Choisissez "Commencer en mode test" (pour le développement)
4. Sélectionnez une région proche (Europe-west3 pour l'Europe)

#### Règles de sécurité Firestore :

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Règles pour les utilisateurs
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    
    // Règles pour les bourses (lecture publique, écriture admin)
    match /scholarships/{scholarshipId} {
      allow read: if true;
      allow write: if request.auth != null && 
        get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'admin';
    }
    
    // Règles pour les parcours de carrière
    match /career_paths/{careerId} {
      allow read: if true;
      allow write: if request.auth != null && 
        get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'admin';
    }
    
    // Règles pour les interactions utilisateur
    match /user_interactions/{interactionId} {
      allow read, write: if request.auth != null && 
        resource.data.userId == request.auth.uid;
    }
  }
}
```

### 4. Configurer Firebase Storage

1. Allez dans "Storage"
2. Cliquez sur "Commencer"
3. Choisissez "Commencer en mode test"
4. Sélectionnez la même région que Firestore

#### Règles de sécurité Storage :

```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    // Règles pour les avatars utilisateur
    match /users/avatars/{userId}/{allPaths=**} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    
    // Règles pour les images de bourses (lecture publique)
    match /scholarships/images/{allPaths=**} {
      allow read: if true;
      allow write: if request.auth != null && 
        get(/databases/(default)/documents/users/$(request.auth.uid)).data.role == 'admin';
    }
    
    // Règles pour les documents utilisateur
    match /users/documents/{userId}/{allPaths=**} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
  }
}
```

### 5. Configurer Firebase Analytics

1. Allez dans "Analytics" > "Événements"
2. Les événements personnalisés seront automatiquement enregistrés
3. Configurez les conversions dans "Analytics" > "Conversions"

### 6. Configurer Firebase Functions (Optionnel)

1. Installez Firebase CLI : `npm install -g firebase-tools`
2. Connectez-vous : `firebase login`
3. Initialisez le projet : `firebase init functions`
4. Choisissez TypeScript et installez les dépendances

### 7. Configuration des Variables d'Environnement

1. Copiez `.env.local.example` vers `.env.local`
2. Remplissez les valeurs avec vos clés Firebase :

```env
# Firebase Configuration
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key_here
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=G-XXXXXXXXXX
```

### 8. Obtenir les Clés de Configuration

1. Allez dans "Paramètres du projet" (icône d'engrenage)
2. Allez dans l'onglet "Général"
3. Faites défiler jusqu'à "Vos applications"
4. Cliquez sur "Ajouter une application" > "Web"
5. Nommez votre app : "Conseil d'Orientation Web"
6. Copiez la configuration et collez-la dans `.env.local`

## 🔧 Intégration dans l'Application

### 1. Ajouter les Providers

Dans `src/app/layout.tsx`, ajoutez les providers Firebase :

```tsx
import { AuthProvider } from '@/components/firebase/AuthProvider';
import { FirebaseAnalytics } from '@/components/firebase/FirebaseAnalytics';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body>
        <AuthProvider>
          <FirebaseAnalytics>
            {children}
          </FirebaseAnalytics>
        </AuthProvider>
      </body>
    </html>
  );
}
```

### 2. Utiliser l'Authentification

```tsx
import { useAuth } from '@/components/firebase/AuthProvider';

function LoginForm() {
  const { signIn, signUp, user, loading, error } = useAuth();
  
  const handleSignIn = async (email: string, password: string) => {
    await signIn(email, password);
  };
  
  if (loading) return <div>Chargement...</div>;
  if (user) return <div>Connecté en tant que {user.displayName}</div>;
  
  return (
    <form onSubmit={handleSignIn}>
      {/* Votre formulaire de connexion */}
    </form>
  );
}
```

### 3. Utiliser Firestore

```tsx
import { searchScholarships } from '@/lib/firebase-firestore';

function ScholarshipsList() {
  const [scholarships, setScholarships] = useState([]);
  
  useEffect(() => {
    const loadScholarships = async () => {
      const results = await searchScholarships({
        country: 'Mali',
        field: 'Informatique'
      });
      setScholarships(results);
    };
    
    loadScholarships();
  }, []);
  
  return (
    <div>
      {scholarships.map(scholarship => (
        <div key={scholarship.id}>
          <h3>{scholarship.title}</h3>
          <p>{scholarship.description}</p>
        </div>
      ))}
    </div>
  );
}
```

## 📊 Monitoring et Analytics

### 1. Événements Personnalisés

L'application enregistre automatiquement :
- Connexions/déconnexions utilisateur
- Vues de pages et sections
- Recherches de bourses et carrières
- Interactions avec le contenu
- Erreurs et performances

### 2. Dashboard Firebase

Consultez vos données dans :
- **Analytics** : Comportement des utilisateurs
- **Authentication** : Utilisateurs actifs
- **Firestore** : Données en temps réel
- **Storage** : Fichiers uploadés
- **Performance** : Temps de chargement

## 🔒 Sécurité

### 1. Règles de Sécurité

- Les utilisateurs ne peuvent accéder qu'à leurs propres données
- Les bourses et carrières sont en lecture publique
- Seuls les admins peuvent modifier le contenu

### 2. Validation des Données

- Validation côté client et serveur
- Sanitisation des entrées utilisateur
- Limitation des taux de requêtes

## 🚀 Déploiement

### 1. Variables d'Environnement de Production

Configurez les mêmes variables dans votre plateforme de déploiement :
- Vercel : Variables d'environnement
- Netlify : Variables d'environnement
- Firebase Hosting : Configuration automatique

### 2. Domaines Autorisés

Ajoutez vos domaines de production dans :
- Firebase Authentication > Paramètres > Domaines autorisés
- Firebase Storage > Règles de sécurité

## 📱 Configuration Mobile

Pour l'application mobile, vous devrez :
1. Ajouter les applications Android/iOS dans Firebase
2. Télécharger les fichiers de configuration
3. Configurer les notifications push
4. Intégrer Firebase SDK dans votre app mobile

## 🆘 Support

En cas de problème :
1. Vérifiez les logs dans la console Firebase
2. Consultez la [documentation Firebase](https://firebase.google.com/docs)
3. Vérifiez les règles de sécurité
4. Testez en mode développement d'abord

## 📈 Optimisations

### 1. Performance
- Utilisez les index Firestore pour les requêtes complexes
- Implémentez la pagination pour les grandes listes
- Optimisez les images avant upload

### 2. Coûts
- Surveillez l'utilisation dans la console Firebase
- Configurez des alertes de budget
- Optimisez les requêtes Firestore

---

**Note** : Gardez vos clés de configuration secrètes et ne les commitez jamais dans votre repository.
