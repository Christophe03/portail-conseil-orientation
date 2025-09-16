// Configuration Firebase pour Conseil d'Orientation Mali
import { initializeApp, getApps, FirebaseApp } from 'firebase/app';
import { getAnalytics, Analytics } from 'firebase/analytics';
import { getAuth, Auth } from 'firebase/auth';
import { getFirestore, Firestore } from 'firebase/firestore';
import { getStorage, FirebaseStorage } from 'firebase/storage';
import { getFunctions, Functions } from 'firebase/functions';

// Configuration Firebase
const firebaseConfig = {
  apiKey: "AIzaSyCttgMICGTi5ob3wlgqSw-inKynvgPg66s",
  authDomain: "conseilorientation-77b13.firebaseapp.com",
  databaseURL: "https://conseilorientation-77b13-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "conseilorientation-77b13",
  storageBucket: "conseilorientation-77b13.firebasestorage.app",
  messagingSenderId: "1064852199528",
  appId: "1:1064852199528:web:f05920eb0639f3d9a2c3dd",
  measurementId: "G-0NWE30T8GB"
};

// Initialiser Firebase
let app: FirebaseApp;
let analytics: Analytics | null = null;
let auth: Auth;
let db: Firestore;
let storage: FirebaseStorage;
let functions: Functions;

// Vérifier si Firebase est déjà initialisé
if (getApps().length === 0) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApps()[0];
}

// Initialiser les services Firebase
try {
  // Analytics (uniquement côté client)
  if (typeof window !== 'undefined') {
    analytics = getAnalytics(app);
  }
  
  // Authentication
  auth = getAuth(app);
  
  // Firestore Database
  db = getFirestore(app);
  
  // Storage
  storage = getStorage(app);
  
  // Functions
  functions = getFunctions(app);
} catch (error) {
  console.error('Erreur lors de l\'initialisation de Firebase:', error);
}

// Exporter les services
export { app, analytics, auth, db, storage, functions };
export default app;
