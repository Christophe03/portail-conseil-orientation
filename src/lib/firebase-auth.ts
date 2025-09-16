// Configuration Firebase Authentication pour Conseil d'Orientation Mali
import { 
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  User,
  UserCredential,
  sendPasswordResetEmail,
  updateProfile,
  sendEmailVerification,
  GoogleAuthProvider,
  signInWithPopup,
  FacebookAuthProvider,
  TwitterAuthProvider,
  PhoneAuthProvider,
  RecaptchaVerifier,
  signInWithPhoneNumber
} from 'firebase/auth';
import { auth } from './firebase';

// Types pour l'authentification
export interface AuthUser {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
  phoneNumber: string | null;
  emailVerified: boolean;
  isAnonymous: boolean;
  metadata: {
    creationTime?: string;
    lastSignInTime?: string;
  };
}

export interface SignUpData {
  email: string;
  password: string;
  displayName?: string;
  phoneNumber?: string;
}

export interface SignInData {
  email: string;
  password: string;
}

// Configuration des providers
const googleProvider = new GoogleAuthProvider();
const facebookProvider = new FacebookAuthProvider();
const twitterProvider = new TwitterAuthProvider();

// Configurer les scopes pour Google
googleProvider.addScope('email');
googleProvider.addScope('profile');

// Configurer les scopes pour Facebook
facebookProvider.addScope('email');
facebookProvider.addScope('public_profile');

// Fonction pour s'inscrire avec email et mot de passe
export const signUpWithEmail = async (data: SignUpData): Promise<UserCredential> => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, data.email, data.password);
    
    // Mettre à jour le profil utilisateur
    if (data.displayName) {
      await updateProfile(userCredential.user, {
        displayName: data.displayName,
        photoURL: data.photoURL
      });
    }
    
    // Envoyer l'email de vérification
    await sendEmailVerification(userCredential.user);
    
    return userCredential;
  } catch (error) {
    console.error('Erreur lors de l\'inscription:', error);
    throw error;
  }
};

// Fonction pour se connecter avec email et mot de passe
export const signInWithEmail = async (data: SignInData): Promise<UserCredential> => {
  try {
    return await signInWithEmailAndPassword(auth, data.email, data.password);
  } catch (error) {
    console.error('Erreur lors de la connexion:', error);
    throw error;
  }
};

// Fonction pour se connecter avec Google
export const signInWithGoogle = async (): Promise<UserCredential> => {
  try {
    return await signInWithPopup(auth, googleProvider);
  } catch (error) {
    console.error('Erreur lors de la connexion Google:', error);
    throw error;
  }
};

// Fonction pour se connecter avec Facebook
export const signInWithFacebook = async (): Promise<UserCredential> => {
  try {
    return await signInWithPopup(auth, facebookProvider);
  } catch (error) {
    console.error('Erreur lors de la connexion Facebook:', error);
    throw error;
  }
};

// Fonction pour se connecter avec Twitter
export const signInWithTwitter = async (): Promise<UserCredential> => {
  try {
    return await signInWithPopup(auth, twitterProvider);
  } catch (error) {
    console.error('Erreur lors de la connexion Twitter:', error);
    throw error;
  }
};

// Fonction pour se connecter avec le téléphone
export const signInWithPhone = async (phoneNumber: string, appVerifier: RecaptchaVerifier): Promise<{ verificationId: string }> => {
  try {
    const confirmationResult = await signInWithPhoneNumber(auth, phoneNumber, appVerifier);
    return { verificationId: confirmationResult.verificationId };
  } catch (error) {
    console.error('Erreur lors de la connexion par téléphone:', error);
    throw error;
  }
};

// Fonction pour se déconnecter
export const signOutUser = async (): Promise<void> => {
  try {
    await signOut(auth);
  } catch (error) {
    console.error('Erreur lors de la déconnexion:', error);
    throw error;
  }
};

// Fonction pour réinitialiser le mot de passe
export const resetPassword = async (email: string): Promise<void> => {
  try {
    await sendPasswordResetEmail(auth, email);
  } catch (error) {
    console.error('Erreur lors de la réinitialisation du mot de passe:', error);
    throw error;
  }
};

// Fonction pour mettre à jour le profil utilisateur
export const updateUserProfile = async (updates: {
  displayName?: string;
  photoURL?: string;
}): Promise<void> => {
  try {
    if (auth.currentUser) {
      await updateProfile(auth.currentUser, updates);
    }
  } catch (error) {
    console.error('Erreur lors de la mise à jour du profil:', error);
    throw error;
  }
};

// Fonction pour envoyer l'email de vérification
export const sendVerificationEmail = async (): Promise<void> => {
  try {
    if (auth.currentUser) {
      await sendEmailVerification(auth.currentUser);
    }
  } catch (error) {
    console.error('Erreur lors de l\'envoi de l\'email de vérification:', error);
    throw error;
  }
};

// Fonction pour écouter les changements d'état d'authentification
export const onAuthStateChange = (callback: (user: User | null) => void) => {
  return onAuthStateChanged(auth, callback);
};

// Fonction pour obtenir l'utilisateur actuel
export const getCurrentUser = (): User | null => {
  return auth.currentUser;
};

// Fonction pour vérifier si l'utilisateur est connecté
export const isUserSignedIn = (): boolean => {
  return !!auth.currentUser;
};

// Fonction pour obtenir les informations de l'utilisateur
export const getUserInfo = (user: User): AuthUser => {
  return {
    uid: user.uid,
    email: user.email,
    displayName: user.displayName,
    photoURL: user.photoURL,
    phoneNumber: user.phoneNumber,
    emailVerified: user.emailVerified,
    isAnonymous: user.isAnonymous,
    metadata: {
      creationTime: user.metadata.creationTime,
      lastSignInTime: user.metadata.lastSignInTime
    }
  };
};

// Fonction pour créer un RecaptchaVerifier
export const createRecaptchaVerifier = (containerId: string): RecaptchaVerifier => {
  return new RecaptchaVerifier(auth, containerId, {
    size: 'invisible',
    callback: () => {
      console.log('reCAPTCHA résolu');
    },
    'expired-callback': () => {
      console.log('reCAPTCHA expiré');
    }
  });
};

// Gestion des erreurs d'authentification
export const getAuthErrorMessage = (error: any): string => {
  switch (error.code) {
    case 'auth/user-not-found':
      return 'Aucun utilisateur trouvé avec cette adresse email.';
    case 'auth/wrong-password':
      return 'Mot de passe incorrect.';
    case 'auth/email-already-in-use':
      return 'Cette adresse email est déjà utilisée.';
    case 'auth/weak-password':
      return 'Le mot de passe doit contenir au moins 6 caractères.';
    case 'auth/invalid-email':
      return 'Adresse email invalide.';
    case 'auth/user-disabled':
      return 'Ce compte utilisateur a été désactivé.';
    case 'auth/too-many-requests':
      return 'Trop de tentatives. Veuillez réessayer plus tard.';
    case 'auth/network-request-failed':
      return 'Erreur de réseau. Vérifiez votre connexion internet.';
    case 'auth/requires-recent-login':
      return 'Cette action nécessite une connexion récente.';
    default:
      return 'Une erreur inattendue s\'est produite.';
  }
};
