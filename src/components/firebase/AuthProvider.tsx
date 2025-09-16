'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { User } from 'firebase/auth';
import { 
  onAuthStateChange, 
  signInWithEmail, 
  signUpWithEmail, 
  signInWithGoogle, 
  signInWithFacebook, 
  signOutUser,
  resetPassword,
  updateUserProfile,
  sendVerificationEmail,
  getAuthErrorMessage,
  AuthUser
} from '@/lib/firebase-auth';
import { getUserProfile, upsertUserProfile } from '@/lib/firebase-firestore';
import { setAnalyticsUserId, setAnalyticsUserProperties } from '@/lib/firebase-analytics';

// Types pour le contexte d'authentification
interface AuthContextType {
  user: AuthUser | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, displayName?: string) => Promise<void>;
  signInWithGoogle: () => Promise<void>;
  signInWithFacebook: () => Promise<void>;
  signOut: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  updateProfile: (updates: { displayName?: string; photoURL?: string }) => Promise<void>;
  sendVerificationEmail: () => Promise<void>;
  error: string | null;
  clearError: () => void;
}

// Créer le contexte
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Props pour le provider
interface AuthProviderProps {
  children: ReactNode;
}

// Provider d'authentification
export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fonction pour effacer les erreurs
  const clearError = () => setError(null);

  // Fonction pour gérer les erreurs
  const handleError = (error: any) => {
    const errorMessage = getAuthErrorMessage(error);
    setError(errorMessage);
    console.error('Erreur d\'authentification:', error);
  };

  // Fonction de connexion avec email et mot de passe
  const signIn = async (email: string, password: string) => {
    try {
      setError(null);
      setLoading(true);
      
      const userCredential = await signInWithEmail({ email, password });
      const userInfo = {
        uid: userCredential.user.uid,
        email: userCredential.user.email,
        displayName: userCredential.user.displayName,
        photoURL: userCredential.user.photoURL,
        phoneNumber: userCredential.user.phoneNumber
      };
      
      // Enregistrer l'événement Analytics
      import('@/lib/firebase-analytics').then(({ trackUserLogin }) => {
        trackUserLogin('email', userInfo.uid);
      });
      
      // Définir l'ID utilisateur dans Analytics
      setAnalyticsUserId(userInfo.uid);
      
      // Charger le profil utilisateur depuis Firestore
      const userProfile = await getUserProfile(userInfo.uid);
      if (userProfile) {
        setAnalyticsUserProperties({
          user_type: 'student' as const,
          education_level: (userProfile.education?.level || 'high_school') as 'high_school' | 'university' | 'graduate' | 'professional',
          country: userProfile.location?.country || 'Mali',
          language: userProfile.preferences?.language || 'fr'
        });
      }
      
    } catch (error) {
      handleError(error);
    } finally {
      setLoading(false);
    }
  };

  // Fonction d'inscription avec email et mot de passe
  const signUp = async (email: string, password: string, displayName?: string) => {
    try {
      setError(null);
      setLoading(true);
      
      const userCredential = await signUpWithEmail({ 
        email, 
        password, 
        displayName 
      });
      const userInfo = {
        uid: userCredential.user.uid,
        email: userCredential.user.email,
        displayName: userCredential.user.displayName,
        photoURL: userCredential.user.photoURL,
        phoneNumber: userCredential.user.phoneNumber
      };
      
      // Enregistrer l'événement Analytics
      import('@/lib/firebase-analytics').then(({ trackUserSignup }) => {
        trackUserSignup('email', userInfo.uid);
      });
      
      // Définir l'ID utilisateur dans Analytics
      setAnalyticsUserId(userInfo.uid);
      
      // Créer le profil utilisateur dans Firestore
      await upsertUserProfile(userInfo.uid, {
        uid: userInfo.uid,
        email: userInfo.email || '',
        displayName: userInfo.displayName || displayName || '',
        photoURL: userInfo.photoURL || '',
        phoneNumber: userInfo.phoneNumber || '',
        interests: [],
        goals: [],
        preferences: {
          language: 'fr',
          notifications: true,
          privacy: 'public'
        }
      });
      
    } catch (error) {
      handleError(error);
    } finally {
      setLoading(false);
    }
  };

  // Fonction de connexion avec Google
  const signInWithGoogleProvider = async () => {
    try {
      setError(null);
      setLoading(true);
      
      const userCredential = await signInWithGoogle();
      const userInfo = {
        uid: userCredential.user.uid,
        email: userCredential.user.email,
        displayName: userCredential.user.displayName,
        photoURL: userCredential.user.photoURL,
        phoneNumber: userCredential.user.phoneNumber
      };
      
      // Enregistrer l'événement Analytics
      import('@/lib/firebase-analytics').then(({ trackUserLogin }) => {
        trackUserLogin('google', userInfo.uid);
      });
      
      // Définir l'ID utilisateur dans Analytics
      setAnalyticsUserId(userInfo.uid);
      
      // Vérifier si le profil existe, sinon le créer
      const userProfile = await getUserProfile(userInfo.uid);
      if (!userProfile) {
        await upsertUserProfile(userInfo.uid, {
          uid: userInfo.uid,
          email: userInfo.email || '',
          displayName: userInfo.displayName || '',
          photoURL: userInfo.photoURL || '',
          phoneNumber: userInfo.phoneNumber || '',
          interests: [],
          goals: [],
          preferences: {
            language: 'fr',
            notifications: true,
            privacy: 'public'
          }
        });
      }
      
    } catch (error) {
      handleError(error);
    } finally {
      setLoading(false);
    }
  };

  // Fonction de connexion avec Facebook
  const signInWithFacebookProvider = async () => {
    try {
      setError(null);
      setLoading(true);
      
      const userCredential = await signInWithFacebook();
      const userInfo = {
        uid: userCredential.user.uid,
        email: userCredential.user.email,
        displayName: userCredential.user.displayName,
        photoURL: userCredential.user.photoURL,
        phoneNumber: userCredential.user.phoneNumber
      };
      
      // Enregistrer l'événement Analytics
      import('@/lib/firebase-analytics').then(({ trackUserLogin }) => {
        trackUserLogin('facebook', userInfo.uid);
      });
      
      // Définir l'ID utilisateur dans Analytics
      setAnalyticsUserId(userInfo.uid);
      
      // Vérifier si le profil existe, sinon le créer
      const userProfile = await getUserProfile(userInfo.uid);
      if (!userProfile) {
        await upsertUserProfile(userInfo.uid, {
          uid: userInfo.uid,
          email: userInfo.email || '',
          displayName: userInfo.displayName || '',
          photoURL: userInfo.photoURL || '',
          phoneNumber: userInfo.phoneNumber || '',
          interests: [],
          goals: [],
          preferences: {
            language: 'fr',
            notifications: true,
            privacy: 'public'
          }
        });
      }
      
    } catch (error) {
      handleError(error);
    } finally {
      setLoading(false);
    }
  };

  // Fonction de déconnexion
  const signOut = async () => {
    try {
      setError(null);
      setLoading(true);
      
      await signOutUser();
      
      // Enregistrer l'événement Analytics
      import('@/lib/firebase-analytics').then(({ trackEvent }) => {
        trackEvent('user_logout', { timestamp: Date.now() });
      });
      
      // Réinitialiser l'ID utilisateur dans Analytics
      setAnalyticsUserId('');
      
    } catch (error) {
      handleError(error);
    } finally {
      setLoading(false);
    }
  };

  // Fonction de réinitialisation du mot de passe
  const resetUserPassword = async (email: string) => {
    try {
      setError(null);
      await resetPassword(email);
    } catch (error) {
      handleError(error);
    }
  };

  // Fonction de mise à jour du profil
  const updateUserProfileData = async (updates: { displayName?: string; photoURL?: string }) => {
    try {
      setError(null);
      await updateUserProfile(updates);
      
      // Enregistrer l'événement Analytics
      import('@/lib/firebase-analytics').then(({ trackEvent }) => {
        trackEvent('user_profile_update', { 
          fields_updated: Object.keys(updates),
          timestamp: Date.now() 
        });
      });
      
    } catch (error) {
      handleError(error);
    }
  };

  // Fonction d'envoi d'email de vérification
  const sendUserVerificationEmail = async () => {
    try {
      setError(null);
      await sendVerificationEmail();
    } catch (error) {
      handleError(error);
    }
  };

  // Écouter les changements d'état d'authentification
  useEffect(() => {
    const unsubscribe = onAuthStateChange(async (firebaseUser) => {
      if (firebaseUser) {
        const userInfo = {
          uid: firebaseUser.uid,
          email: firebaseUser.email,
          displayName: firebaseUser.displayName,
          photoURL: firebaseUser.photoURL,
          phoneNumber: firebaseUser.phoneNumber,
          emailVerified: firebaseUser.emailVerified,
          isAnonymous: firebaseUser.isAnonymous,
          metadata: firebaseUser.metadata
        };
        setUser(userInfo);
        
        // Charger le profil utilisateur depuis Firestore
        try {
          const userProfile = await getUserProfile(userInfo.uid);
          if (userProfile) {
            setAnalyticsUserProperties({
              user_type: 'student' as const,
              education_level: (userProfile.education?.level || 'high_school') as 'high_school' | 'university' | 'graduate' | 'professional',
              country: userProfile.location?.country || 'Mali',
              language: userProfile.preferences?.language || 'fr'
            });
          }
        } catch (error) {
          console.error('Erreur lors du chargement du profil utilisateur:', error);
        }
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // Valeur du contexte
  const value: AuthContextType = {
    user,
    loading,
    signIn,
    signUp,
    signInWithGoogle: signInWithGoogleProvider,
    signInWithFacebook: signInWithFacebookProvider,
    signOut,
    resetPassword: resetUserPassword,
    updateProfile: updateUserProfileData,
    sendVerificationEmail: sendUserVerificationEmail,
    error,
    clearError
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

// Hook pour utiliser le contexte d'authentification
export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth doit être utilisé dans un AuthProvider');
  }
  return context;
}

// Composant pour protéger les routes
interface ProtectedRouteProps {
  children: ReactNode;
  fallback?: ReactNode;
}

export function ProtectedRoute({ children, fallback }: ProtectedRouteProps) {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (!user) {
    return fallback || (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Connexion requise
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Vous devez être connecté pour accéder à cette page.
          </p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
