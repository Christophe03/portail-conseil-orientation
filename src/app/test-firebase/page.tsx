'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/components/firebase/AuthProvider';
import { LoginForm } from '@/components/auth/LoginForm';
import { FirestoreTest } from '@/components/firebase/FirestoreTest';
import { Button } from '@/components/ui/Button';

export default function TestFirebasePage() {
  const { user, loading, signOut } = useAuth();
  const [firebaseStatus, setFirebaseStatus] = useState<string>('Vérification...');

  useEffect(() => {
    // Tester la connexion Firebase
    const testFirebase = async () => {
      try {
        // Importer Firebase dynamiquement
        const { app } = await import('@/lib/firebase');
        
        if (app) {
          setFirebaseStatus('✅ Firebase connecté avec succès !');
        } else {
          setFirebaseStatus('❌ Erreur de connexion Firebase');
        }
      } catch (error) {
        console.error('Erreur Firebase:', error);
        setFirebaseStatus('❌ Erreur de connexion Firebase');
      }
    };

    testFirebase();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary-600 mx-auto mb-4"></div>
          <p className="text-lg text-gray-600 dark:text-gray-400">Chargement...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-neutral-900 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            🔥 Test Firebase
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Page de test pour vérifier la configuration Firebase
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Statut Firebase */}
          <div className="bg-white dark:bg-neutral-800 rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Statut Firebase
            </h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-gray-600 dark:text-gray-400">Connexion:</span>
                <span className="font-medium">{firebaseStatus}</span>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-gray-600 dark:text-gray-400">Projet ID:</span>
                <span className="font-medium text-sm">conseilorientation-77b13</span>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-gray-600 dark:text-gray-400">Région:</span>
                <span className="font-medium">Europe West 1</span>
              </div>
            </div>
          </div>

          {/* Statut Authentification */}
          <div className="bg-white dark:bg-neutral-800 rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Authentification
            </h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-gray-600 dark:text-gray-400">Statut:</span>
                <span className={`font-medium ${user ? 'text-green-600' : 'text-gray-500'}`}>
                  {user ? '✅ Connecté' : '❌ Non connecté'}
                </span>
              </div>
              
              {user && (
                <>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Email:</span>
                    <span className="font-medium text-sm">{user.email}</span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Nom:</span>
                    <span className="font-medium">{user.displayName || 'Non défini'}</span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600 dark:text-gray-400">UID:</span>
                    <span className="font-medium text-xs">{user.uid}</span>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Formulaire de connexion ou bouton de déconnexion */}
        <div className="mt-8">
          {user ? (
            <div className="space-y-6">
              <div className="bg-white dark:bg-neutral-800 rounded-lg shadow-lg p-6">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                  Actions
                </h2>
                <div className="flex gap-4">
                  <Button onClick={signOut} variant="outline">
                    Se déconnecter
                  </Button>
                  <Button onClick={() => window.location.href = '/'}>
                    Retour à l'accueil
                  </Button>
                </div>
              </div>
              
              {/* Test Firestore */}
              <FirestoreTest />
            </div>
          ) : (
            <div className="bg-white dark:bg-neutral-800 rounded-lg shadow-lg p-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Test de Connexion
              </h2>
              <LoginForm />
            </div>
          )}
        </div>

        {/* Informations de configuration */}
        <div className="mt-8 bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-100 mb-3">
            📋 Configuration Firebase
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <strong>Projet ID:</strong> conseilorientation-77b13
            </div>
            <div>
              <strong>Région:</strong> Europe West 1
            </div>
            <div>
              <strong>Auth Domain:</strong> conseilorientation-77b13.firebaseapp.com
            </div>
            <div>
              <strong>Storage:</strong> conseilorientation-77b13.firebasestorage.app
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
