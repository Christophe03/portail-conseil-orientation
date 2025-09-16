'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/components/firebase/AuthProvider';
import { Button } from '@/components/ui/Button';

export function FirestoreTest() {
  const { user } = useAuth();
  const [testData, setTestData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  // Fonction pour ajouter des données de test
  const addTestData = async () => {
    if (!user) {
      setMessage('❌ Vous devez être connecté pour tester Firestore');
      return;
    }

    setLoading(true);
    try {
      // Importer Firestore directement
      const { addDoc, collection } = await import('firebase/firestore');
      const { db } = await import('@/lib/firebase');

      const testDoc = {
        userId: user.uid,
        message: `Test Firestore - ${new Date().toLocaleString()}`,
        timestamp: new Date(),
        userEmail: user.email,
        testData: {
          random: Math.random(),
          success: true
        }
      };

      await addDoc(collection(db, 'test_collection'), testDoc);
      setMessage('✅ Données de test ajoutées avec succès !');
      
      // Recharger les données
      loadTestData();
    } catch (error) {
      console.error('Erreur lors de l\'ajout de données:', error);
      setMessage('❌ Erreur lors de l\'ajout de données');
    } finally {
      setLoading(false);
    }
  };

  // Fonction pour charger les données de test
  const loadTestData = async () => {
    if (!user) return;

    try {
      const { getDocs, collection, query, where, orderBy, limit } = await import('firebase/firestore');
      const { db } = await import('@/lib/firebase');

      const q = query(
        collection(db, 'test_collection'),
        where('userId', '==', user.uid),
        orderBy('timestamp', 'desc'),
        limit(10)
      );

      const snapshot = await getDocs(q);
      const data = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));

      setTestData(data);
    } catch (error) {
      console.error('Erreur lors du chargement des données:', error);
    }
  };

  // Charger les données au montage du composant
  useEffect(() => {
    if (user) {
      loadTestData();
    }
  }, [user]);

  return (
    <div className="bg-white dark:bg-neutral-800 rounded-lg shadow-lg p-6">
      <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
        🗄️ Test Firestore
      </h2>
      
      {message && (
        <div className={`mb-4 p-3 rounded-lg ${
          message.includes('✅') 
            ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300' 
            : 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300'
        }`}>
          {message}
        </div>
      )}

      <div className="space-y-4">
        <Button 
          onClick={addTestData} 
          disabled={loading || !user}
          className="w-full"
        >
          {loading ? 'Ajout en cours...' : 'Ajouter des données de test'}
        </Button>

        {user && (
          <Button 
            onClick={loadTestData} 
            variant="outline"
            className="w-full"
          >
            Recharger les données
          </Button>
        )}

        {!user && (
          <p className="text-gray-500 dark:text-gray-400 text-center">
            Connectez-vous pour tester Firestore
          </p>
        )}
      </div>

      {/* Affichage des données de test */}
      {testData.length > 0 && (
        <div className="mt-6">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-3">
            Données de test ({testData.length})
          </h3>
          <div className="space-y-2 max-h-60 overflow-y-auto">
            {testData.map((item, index) => (
              <div key={item.id} className="bg-gray-50 dark:bg-neutral-700 rounded-lg p-3">
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  #{index + 1} - {item.timestamp?.toDate?.()?.toLocaleString() || 'Date inconnue'}
                </div>
                <div className="text-gray-900 dark:text-white">
                  {item.message}
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400">
                  ID: {item.id}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
