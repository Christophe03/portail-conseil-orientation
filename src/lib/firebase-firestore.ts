// Configuration Firestore Database pour Conseil d'Orientation Mali
import {
  collection,
  doc,
  getDoc,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  limit,
  startAfter,
  onSnapshot,
  serverTimestamp,
  Timestamp,
  DocumentData,
  QueryDocumentSnapshot,
  QuerySnapshot,
  DocumentSnapshot,
  WriteBatch,
  writeBatch,
  runTransaction
} from 'firebase/firestore';
import { db } from './firebase';

// Types pour Firestore
export interface FirestoreDocument {
  id: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
  [key: string]: any;
}

export interface UserProfile extends FirestoreDocument {
  uid: string;
  email: string;
  displayName: string;
  photoURL?: string;
  phoneNumber?: string;
  dateOfBirth?: Timestamp;
  gender?: 'male' | 'female' | 'other';
  location?: {
    country: string;
    city: string;
    coordinates?: {
      latitude: number;
      longitude: number;
    };
  };
  education?: {
    level: string;
    field: string;
    institution?: string;
    graduationYear?: number;
  };
  interests: string[];
  goals: string[];
  preferences: {
    language: string;
    notifications: boolean;
    privacy: 'public' | 'private' | 'friends';
  };
}

export interface Scholarship extends FirestoreDocument {
  title: string;
  description: string;
  amount: number;
  currency: string;
  deadline: Timestamp;
  requirements: string[];
  benefits: string[];
  applicationUrl: string;
  country: string;
  institution: string;
  field: string;
  level: string;
  language: string;
  isActive: boolean;
  views: number;
  applications: number;
}

export interface CareerPath extends FirestoreDocument {
  title: string;
  description: string;
  requirements: string[];
  skills: string[];
  salary: {
    min: number;
    max: number;
    currency: string;
  };
  growth: number;
  demand: 'low' | 'medium' | 'high';
  field: string;
  level: string;
  education: string[];
  experience: string[];
}

export interface UserInteraction extends FirestoreDocument {
  userId: string;
  type: 'view' | 'like' | 'share' | 'apply' | 'save';
  targetType: 'scholarship' | 'career' | 'institution';
  targetId: string;
  metadata?: {
    source?: string;
    duration?: number;
    device?: string;
    location?: string;
  };
}

// Collections Firestore
export const COLLECTIONS = {
  USERS: 'users',
  SCHOLARSHIPS: 'scholarships',
  CAREER_PATHS: 'career_paths',
  INSTITUTIONS: 'institutions',
  USER_INTERACTIONS: 'user_interactions',
  NOTIFICATIONS: 'notifications',
  FEEDBACK: 'feedback',
  ANALYTICS: 'analytics'
} as const;

// Fonction pour créer un document avec timestamp
export const createDocument = async <T extends Partial<FirestoreDocument>>(
  collectionName: string,
  data: T
): Promise<string> => {
  try {
    const docRef = await addDoc(collection(db, collectionName), {
      ...data,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    });
    return docRef.id;
  } catch (error) {
    console.error('Erreur lors de la création du document:', error);
    throw error;
  }
};

// Fonction pour obtenir un document par ID
export const getDocument = async <T extends FirestoreDocument>(
  collectionName: string,
  docId: string
): Promise<T | null> => {
  try {
    const docRef = doc(db, collectionName, docId);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() } as T;
    }
    return null;
  } catch (error) {
    console.error('Erreur lors de la récupération du document:', error);
    throw error;
  }
};

// Fonction pour mettre à jour un document
export const updateDocument = async (
  collectionName: string,
  docId: string,
  data: Partial<FirestoreDocument>
): Promise<void> => {
  try {
    const docRef = doc(db, collectionName, docId);
    await updateDoc(docRef, {
      ...data,
      updatedAt: serverTimestamp()
    });
  } catch (error) {
    console.error('Erreur lors de la mise à jour du document:', error);
    throw error;
  }
};

// Fonction pour supprimer un document
export const deleteDocument = async (
  collectionName: string,
  docId: string
): Promise<void> => {
  try {
    const docRef = doc(db, collectionName, docId);
    await deleteDoc(docRef);
  } catch (error) {
    console.error('Erreur lors de la suppression du document:', error);
    throw error;
  }
};

// Fonction pour obtenir tous les documents d'une collection
export const getDocuments = async <T extends FirestoreDocument>(
  collectionName: string,
  constraints: any[] = []
): Promise<T[]> => {
  try {
    const q = query(collection(db, collectionName), ...constraints);
    const querySnapshot = await getDocs(q);
    
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as T[];
  } catch (error) {
    console.error('Erreur lors de la récupération des documents:', error);
    throw error;
  }
};

// Fonction pour écouter les changements en temps réel
export const listenToDocuments = <T extends FirestoreDocument>(
  collectionName: string,
  constraints: any[] = [],
  callback: (docs: T[]) => void
): (() => void) => {
  const q = query(collection(db, collectionName), ...constraints);
  
  return onSnapshot(q, (querySnapshot) => {
    const docs = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as T[];
    callback(docs);
  });
};

// Fonction pour écouter un document en temps réel
export const listenToDocument = <T extends FirestoreDocument>(
  collectionName: string,
  docId: string,
  callback: (doc: T | null) => void
): (() => void) => {
  const docRef = doc(db, collectionName, docId);
  
  return onSnapshot(docRef, (docSnap) => {
    if (docSnap.exists()) {
      callback({ id: docSnap.id, ...docSnap.data() } as T);
    } else {
      callback(null);
    }
  });
};

// Fonction pour rechercher des bourses
export const searchScholarships = async (
  filters: {
    country?: string;
    field?: string;
    level?: string;
    amount?: { min: number; max: number };
    deadline?: Timestamp;
  },
  limitCount: number = 20
): Promise<Scholarship[]> => {
  try {
    const constraints: any[] = [where('isActive', '==', true)];
    
    if (filters.country) {
      constraints.push(where('country', '==', filters.country));
    }
    
    if (filters.field) {
      constraints.push(where('field', '==', filters.field));
    }
    
    if (filters.level) {
      constraints.push(where('level', '==', filters.level));
    }
    
    if (filters.amount) {
      constraints.push(where('amount', '>=', filters.amount.min));
      constraints.push(where('amount', '<=', filters.amount.max));
    }
    
    if (filters.deadline) {
      constraints.push(where('deadline', '>=', filters.deadline));
    }
    
    constraints.push(orderBy('createdAt', 'desc'));
    constraints.push(limit(limitCount));
    
    return await getDocuments<Scholarship>(COLLECTIONS.SCHOLARSHIPS, constraints);
  } catch (error) {
    console.error('Erreur lors de la recherche de bourses:', error);
    throw error;
  }
};

// Fonction pour rechercher des parcours de carrière
export const searchCareerPaths = async (
  filters: {
    field?: string;
    level?: string;
    skills?: string[];
    demand?: string;
  },
  limitCount: number = 20
): Promise<CareerPath[]> => {
  try {
    const constraints: any[] = [];
    
    if (filters.field) {
      constraints.push(where('field', '==', filters.field));
    }
    
    if (filters.level) {
      constraints.push(where('level', '==', filters.level));
    }
    
    if (filters.demand) {
      constraints.push(where('demand', '==', filters.demand));
    }
    
    constraints.push(orderBy('growth', 'desc'));
    constraints.push(limit(limitCount));
    
    return await getDocuments<CareerPath>(COLLECTIONS.CAREER_PATHS, constraints);
  } catch (error) {
    console.error('Erreur lors de la recherche de parcours de carrière:', error);
    throw error;
  }
};

// Fonction pour enregistrer une interaction utilisateur
export const recordUserInteraction = async (
  userId: string,
  type: UserInteraction['type'],
  targetType: UserInteraction['targetType'],
  targetId: string,
  metadata?: UserInteraction['metadata']
): Promise<void> => {
  try {
    await createDocument(COLLECTIONS.USER_INTERACTIONS, {
      userId,
      type,
      targetType,
      targetId,
      metadata
    });
  } catch (error) {
    console.error('Erreur lors de l\'enregistrement de l\'interaction:', error);
    throw error;
  }
};

// Fonction pour obtenir le profil utilisateur
export const getUserProfile = async (userId: string): Promise<UserProfile | null> => {
  try {
    return await getDocument<UserProfile>(COLLECTIONS.USERS, userId);
  } catch (error) {
    console.error('Erreur lors de la récupération du profil utilisateur:', error);
    throw error;
  }
};

// Fonction pour créer ou mettre à jour le profil utilisateur
export const upsertUserProfile = async (userId: string, profileData: Partial<UserProfile>): Promise<void> => {
  try {
    const existingProfile = await getUserProfile(userId);
    
    if (existingProfile) {
      await updateDocument(COLLECTIONS.USERS, userId, profileData);
    } else {
      await createDocument(COLLECTIONS.USERS, {
        uid: userId,
        ...profileData
      });
    }
  } catch (error) {
    console.error('Erreur lors de la mise à jour du profil utilisateur:', error);
    throw error;
  }
};

// Fonction pour utiliser une transaction
export const runFirestoreTransaction = async <T>(
  updateFunction: (transaction: any) => Promise<T>
): Promise<T> => {
  try {
    return await runTransaction(db, updateFunction);
  } catch (error) {
    console.error('Erreur lors de l\'exécution de la transaction:', error);
    throw error;
  }
};

// Fonction pour utiliser un batch
export const createBatch = (): WriteBatch => {
  return writeBatch(db);
};

// Fonction pour exécuter un batch
export const commitBatch = async (batch: WriteBatch): Promise<void> => {
  try {
    await batch.commit();
  } catch (error) {
    console.error('Erreur lors de l\'exécution du batch:', error);
    throw error;
  }
};
