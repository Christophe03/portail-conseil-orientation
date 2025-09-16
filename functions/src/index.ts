// Firebase Functions pour Conseil d'Orientation Mali
import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import * as cors from 'cors';
import * as express from 'express';
import * as helmet from 'helmet';

// Initialiser Firebase Admin
admin.initializeApp();

// Configuration CORS
const corsHandler = cors({ origin: true });

// Middleware de sécurité
const app = express();
app.use(helmet());
app.use(corsHandler);
app.use(express.json());

// Types pour les données
interface ScholarshipData {
  title: string;
  description: string;
  amount: number;
  currency: string;
  deadline: admin.firestore.Timestamp;
  requirements: string[];
  benefits: string[];
  applicationUrl: string;
  country: string;
  institution: string;
  field: string;
  level: string;
  language: string;
  isActive: boolean;
}

interface UserProfile {
  uid: string;
  email: string;
  displayName: string;
  interests: string[];
  goals: string[];
  location?: {
    country: string;
    city: string;
  };
}

// Fonction pour envoyer des notifications push
export const sendNotification = functions.https.onCall(async (data, context) => {
  // Vérifier l'authentification
  if (!context.auth) {
    throw new functions.https.HttpsError('unauthenticated', 'Utilisateur non authentifié');
  }

  const { userId, title, body, data: notificationData } = data;

  try {
    // Envoyer la notification
    const message = {
      token: userId, // Token FCM de l'utilisateur
      notification: {
        title,
        body,
      },
      data: notificationData,
    };

    const response = await admin.messaging().send(message);
    console.log('Notification envoyée:', response);

    return { success: true, messageId: response };
  } catch (error) {
    console.error('Erreur lors de l\'envoi de la notification:', error);
    throw new functions.https.HttpsError('internal', 'Erreur lors de l\'envoi de la notification');
  }
});

// Fonction pour envoyer des emails
export const sendEmail = functions.https.onCall(async (data, context) => {
  // Vérifier l'authentification
  if (!context.auth) {
    throw new functions.https.HttpsError('unauthenticated', 'Utilisateur non authentifié');
  }

  const { to, subject, html, text } = data;

  try {
    // Configuration de l'email (vous devrez configurer un service d'email)
    const emailData = {
      to,
      subject,
      html,
      text,
    };

    // Ici vous pouvez intégrer un service d'email comme SendGrid, Mailgun, etc.
    console.log('Email à envoyer:', emailData);

    return { success: true };
  } catch (error) {
    console.error('Erreur lors de l\'envoi de l\'email:', error);
    throw new functions.https.HttpsError('internal', 'Erreur lors de l\'envoi de l\'email');
  }
});

// Fonction pour traiter les bourses
export const processScholarships = functions.https.onCall(async (data, context) => {
  // Vérifier l'authentification et les permissions admin
  if (!context.auth) {
    throw new functions.https.HttpsError('unauthenticated', 'Utilisateur non authentifié');
  }

  const userDoc = await admin.firestore().collection('users').doc(context.auth.uid).get();
  const userData = userDoc.data();

  if (!userData || userData.role !== 'admin') {
    throw new functions.https.HttpsError('permission-denied', 'Permissions insuffisantes');
  }

  const { action, scholarshipId, scholarshipData } = data;

  try {
    switch (action) {
      case 'create':
        const newScholarship = await admin.firestore().collection('scholarships').add({
          ...scholarshipData,
          createdAt: admin.firestore.FieldValue.serverTimestamp(),
          updatedAt: admin.firestore.FieldValue.serverTimestamp(),
        });
        return { success: true, id: newScholarship.id };

      case 'update':
        await admin.firestore().collection('scholarships').doc(scholarshipId).update({
          ...scholarshipData,
          updatedAt: admin.firestore.FieldValue.serverTimestamp(),
        });
        return { success: true };

      case 'delete':
        await admin.firestore().collection('scholarships').doc(scholarshipId).delete();
        return { success: true };

      default:
        throw new functions.https.HttpsError('invalid-argument', 'Action non valide');
    }
  } catch (error) {
    console.error('Erreur lors du traitement de la bourse:', error);
    throw new functions.https.HttpsError('internal', 'Erreur lors du traitement de la bourse');
  }
});

// Fonction pour analyser les interactions utilisateur
export const analyzeUserInteractions = functions.https.onCall(async (data, context) => {
  // Vérifier l'authentification et les permissions admin
  if (!context.auth) {
    throw new functions.https.HttpsError('unauthenticated', 'Utilisateur non authentifié');
  }

  const userDoc = await admin.firestore().collection('users').doc(context.auth.uid).get();
  const userData = userDoc.data();

  if (!userData || userData.role !== 'admin') {
    throw new functions.https.HttpsError('permission-denied', 'Permissions insuffisantes');
  }

  const { startDate, endDate, type } = data;

  try {
    let query = admin.firestore().collection('user_interactions');

    if (startDate) {
      query = query.where('createdAt', '>=', admin.firestore.Timestamp.fromDate(new Date(startDate)));
    }

    if (endDate) {
      query = query.where('createdAt', '<=', admin.firestore.Timestamp.fromDate(new Date(endDate)));
    }

    if (type) {
      query = query.where('type', '==', type);
    }

    const snapshot = await query.get();
    const interactions = snapshot.docs.map(doc => doc.data());

    // Analyser les données
    const analysis = {
      totalInteractions: interactions.length,
      interactionsByType: {},
      interactionsByTarget: {},
      topUsers: {},
    };

    interactions.forEach(interaction => {
      // Compter par type
      analysis.interactionsByType[interaction.type] = 
        (analysis.interactionsByType[interaction.type] || 0) + 1;

      // Compter par cible
      const target = `${interaction.targetType}_${interaction.targetId}`;
      analysis.interactionsByTarget[target] = 
        (analysis.interactionsByTarget[target] || 0) + 1;

      // Compter par utilisateur
      analysis.topUsers[interaction.userId] = 
        (analysis.topUsers[interaction.userId] || 0) + 1;
    });

    return { success: true, analysis };
  } catch (error) {
    console.error('Erreur lors de l\'analyse des interactions:', error);
    throw new functions.https.HttpsError('internal', 'Erreur lors de l\'analyse des interactions');
  }
});

// Fonction pour générer des recommandations
export const generateRecommendations = functions.https.onCall(async (data, context) => {
  // Vérifier l'authentification
  if (!context.auth) {
    throw new functions.https.HttpsError('unauthenticated', 'Utilisateur non authentifié');
  }

  const { userId } = data;

  try {
    // Récupérer le profil utilisateur
    const userDoc = await admin.firestore().collection('users').doc(userId).get();
    const userData = userDoc.data() as UserProfile;

    if (!userData) {
      throw new functions.https.HttpsError('not-found', 'Profil utilisateur non trouvé');
    }

    // Récupérer les interactions de l'utilisateur
    const interactionsSnapshot = await admin.firestore()
      .collection('user_interactions')
      .where('userId', '==', userId)
      .get();

    const interactions = interactionsSnapshot.docs.map(doc => doc.data());

    // Générer des recommandations basées sur les intérêts et interactions
    const recommendations = {
      scholarships: [],
      careers: [],
      institutions: [],
    };

    // Logique de recommandation simple (à améliorer avec de l'IA)
    if (userData.interests.length > 0) {
      const scholarshipsSnapshot = await admin.firestore()
        .collection('scholarships')
        .where('isActive', '==', true)
        .where('field', 'in', userData.interests.slice(0, 3))
        .limit(5)
        .get();

      recommendations.scholarships = scholarshipsSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
    }

    return { success: true, recommendations };
  } catch (error) {
    console.error('Erreur lors de la génération des recommandations:', error);
    throw new functions.https.HttpsError('internal', 'Erreur lors de la génération des recommandations');
  }
});

// Fonction pour nettoyer les données anciennes
export const cleanupOldData = functions.pubsub.schedule('0 2 * * *').onRun(async (context) => {
  console.log('Début du nettoyage des données anciennes');

  try {
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    // Nettoyer les interactions anciennes
    const oldInteractionsSnapshot = await admin.firestore()
      .collection('user_interactions')
      .where('createdAt', '<', admin.firestore.Timestamp.fromDate(thirtyDaysAgo))
      .get();

    const batch = admin.firestore().batch();
    oldInteractionsSnapshot.docs.forEach(doc => {
      batch.delete(doc.ref);
    });

    await batch.commit();
    console.log(`Nettoyé ${oldInteractionsSnapshot.docs.length} interactions anciennes`);

    // Nettoyer les fichiers temporaires
    const bucket = admin.storage().bucket();
    const [files] = await bucket.getFiles({
      prefix: 'temp/',
    });

    const deletePromises = files.map(file => {
      const [metadata] = file.getMetadata();
      const created = new Date(metadata.timeCreated);
      if (created < thirtyDaysAgo) {
        return file.delete();
      }
      return Promise.resolve();
    });

    await Promise.all(deletePromises);
    console.log(`Nettoyé ${files.length} fichiers temporaires`);

    return { success: true };
  } catch (error) {
    console.error('Erreur lors du nettoyage:', error);
    throw error;
  }
});

// Fonction pour synchroniser les données
export const syncData = functions.https.onCall(async (data, context) => {
  // Vérifier l'authentification et les permissions admin
  if (!context.auth) {
    throw new functions.https.HttpsError('unauthenticated', 'Utilisateur non authentifié');
  }

  const userDoc = await admin.firestore().collection('users').doc(context.auth.uid).get();
  const userData = userDoc.data();

  if (!userData || userData.role !== 'admin') {
    throw new functions.https.HttpsError('permission-denied', 'Permissions insuffisantes');
  }

  const { source, target } = data;

  try {
    // Logique de synchronisation entre différentes sources de données
    console.log(`Synchronisation de ${source} vers ${target}`);

    // Ici vous pouvez implémenter la logique de synchronisation
    // Par exemple, synchroniser avec des APIs externes, des bases de données, etc.

    return { success: true, message: 'Synchronisation terminée' };
  } catch (error) {
    console.error('Erreur lors de la synchronisation:', error);
    throw new functions.https.HttpsError('internal', 'Erreur lors de la synchronisation');
  }
});

// Export de l'application Express
export const api = functions.https.onRequest(app);
