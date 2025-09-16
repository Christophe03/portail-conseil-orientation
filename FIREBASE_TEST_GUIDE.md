# 🔥 Guide de Test Firebase - Conseil d'Orientation Mali

## ✅ **Firebase Configuré avec Tes Clés !**

Tes clés Firebase ont été intégrées dans le projet. Voici comment tester :

## 🚀 **1. Tester la Connexion Firebase**

### Accéder à la page de test :
```
http://localhost:3000/test-firebase
```

Cette page te permettra de :
- ✅ Vérifier la connexion Firebase
- ✅ Tester l'authentification
- ✅ Voir le statut des services

## 🔐 **2. Tester l'Authentification**

### Méthodes de connexion disponibles :
- **Email/Password** : Créer un compte ou se connecter
- **Google** : Connexion avec Google
- **Facebook** : Connexion avec Facebook

### Étapes de test :
1. Aller sur `/test-firebase`
2. Cliquer sur "Créer un compte"
3. Remplir le formulaire
4. Vérifier la connexion

## 📊 **3. Vérifier les Services Firebase**

### Dans la console Firebase :
1. Aller sur [Firebase Console](https://console.firebase.google.com/)
2. Sélectionner le projet `conseilorientation-77b13`
3. Vérifier les services :

#### Authentication :
- Aller dans "Authentication" > "Users"
- Vérifier que les utilisateurs apparaissent

#### Firestore :
- Aller dans "Firestore Database"
- Vérifier que les données sont créées

#### Analytics :
- Aller dans "Analytics" > "Événements"
- Vérifier que les événements sont enregistrés

## 🛠️ **4. Configuration des Services**

### Authentication :
1. Dans Firebase Console > Authentication
2. Aller dans "Sign-in method"
3. Activer :
   - ✅ **Email/Password**
   - ✅ **Google** (configurer avec OAuth)
   - ✅ **Facebook** (configurer avec OAuth)

### Firestore :
1. Dans Firebase Console > Firestore Database
2. Créer la base de données
3. Choisir "Commencer en mode test"

### Storage :
1. Dans Firebase Console > Storage
2. Créer le bucket
3. Choisir "Commencer en mode test"

## 📱 **5. Tester les Fonctionnalités**

### Page d'accueil :
- Vérifier que l'application se charge
- Tester la navigation
- Vérifier les animations

### Authentification :
- Créer un compte
- Se connecter
- Se déconnecter
- Vérifier la persistance de session

### Données :
- Les données utilisateur sont sauvegardées
- Les interactions sont enregistrées
- Les analytics fonctionnent

## 🔧 **6. Résolution des Problèmes**

### Erreur de connexion :
```bash
# Vérifier que le serveur fonctionne
npm run dev

# Vérifier les logs dans la console
# Vérifier la configuration Firebase
```

### Erreur d'authentification :
- Vérifier que les méthodes de connexion sont activées
- Vérifier les domaines autorisés
- Vérifier les clés OAuth

### Erreur de base de données :
- Vérifier que Firestore est activé
- Vérifier les règles de sécurité
- Vérifier les permissions

## 📋 **7. Checklist de Test**

### ✅ Connexion Firebase :
- [ ] Page de test accessible
- [ ] Statut "Firebase connecté" affiché
- [ ] Pas d'erreurs dans la console

### ✅ Authentification :
- [ ] Création de compte fonctionne
- [ ] Connexion fonctionne
- [ ] Déconnexion fonctionne
- [ ] Persistance de session

### ✅ Services :
- [ ] Firestore accessible
- [ ] Storage accessible
- [ ] Analytics fonctionne
- [ ] Notifications (si configurées)

### ✅ Données :
- [ ] Profil utilisateur créé
- [ ] Données sauvegardées
- [ ] Interactions enregistrées

## 🎯 **8. Prochaines Étapes**

Une fois les tests réussis :

1. **Configurer les règles de sécurité** :
   ```bash
   firebase deploy --only firestore:rules
   firebase deploy --only storage
   ```

2. **Déployer les fonctions** (optionnel) :
   ```bash
   cd functions
   npm install
   firebase deploy --only functions
   ```

3. **Configurer les domaines de production** :
   - Ajouter `conseil-orientation-mali.com` dans les domaines autorisés
   - Configurer les redirections OAuth

4. **Optimiser les performances** :
   - Configurer les index Firestore
   - Optimiser les requêtes
   - Configurer le cache

## 🆘 **Support**

En cas de problème :
1. Vérifier les logs dans la console
2. Vérifier la configuration Firebase
3. Tester avec la page `/test-firebase`
4. Consulter la documentation Firebase

---

**🎉 Félicitations ! Firebase est maintenant configuré et prêt à être testé !**
