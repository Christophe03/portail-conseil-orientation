// Configuration Firebase Storage pour Conseil d'Orientation Mali
import {
  ref,
  uploadBytes,
  uploadBytesResumable,
  getDownloadURL,
  deleteObject,
  listAll,
  getMetadata,
  updateMetadata,
  UploadTask,
  UploadTaskSnapshot
} from 'firebase/storage';
import { storage } from './firebase';

// Types pour le stockage
export interface UploadProgress {
  bytesTransferred: number;
  totalBytes: number;
  percentage: number;
}

export interface FileMetadata {
  name: string;
  size: number;
  type: string;
  lastModified: number;
  fullPath: string;
  downloadURL?: string;
}

export interface UploadResult {
  success: boolean;
  downloadURL?: string;
  error?: string;
  metadata?: FileMetadata;
}

// Chemins de stockage
export const STORAGE_PATHS = {
  USER_AVATARS: 'users/avatars',
  USER_DOCUMENTS: 'users/documents',
  SCHOLARSHIP_IMAGES: 'scholarships/images',
  INSTITUTION_LOGOS: 'institutions/logos',
  CAREER_IMAGES: 'careers/images',
  TEMP_FILES: 'temp',
  BACKUPS: 'backups'
} as const;

// Fonction pour uploader un fichier
export const uploadFile = async (
  file: File,
  path: string,
  onProgress?: (progress: UploadProgress) => void
): Promise<UploadResult> => {
  try {
    const storageRef = ref(storage, path);
    const uploadTask = uploadBytesResumable(storageRef, file);

    return new Promise((resolve, reject) => {
      uploadTask.on(
        'state_changed',
        (snapshot: UploadTaskSnapshot) => {
          const progress = {
            bytesTransferred: snapshot.bytesTransferred,
            totalBytes: snapshot.totalBytes,
            percentage: (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          };
          
          if (onProgress) {
            onProgress(progress);
          }
        },
        (error) => {
          console.error('Erreur lors de l\'upload:', error);
          reject({
            success: false,
            error: error.message
          });
        },
        async () => {
          try {
            const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
            const metadata = await getMetadata(uploadTask.snapshot.ref);
            
            resolve({
              success: true,
              downloadURL,
              metadata: {
                name: metadata.name,
                size: metadata.size,
                type: metadata.contentType || file.type,
                lastModified: metadata.timeCreated ? metadata.timeCreated.getTime() : Date.now(),
                fullPath: metadata.fullPath,
                downloadURL
              }
            });
          } catch (error) {
            console.error('Erreur lors de la récupération de l\'URL:', error);
            reject({
              success: false,
              error: 'Erreur lors de la récupération de l\'URL de téléchargement'
            });
          }
        }
      );
    });
  } catch (error) {
    console.error('Erreur lors de l\'upload du fichier:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Erreur inconnue'
    };
  }
};

// Fonction pour uploader un avatar utilisateur
export const uploadUserAvatar = async (
  file: File,
  userId: string,
  onProgress?: (progress: UploadProgress) => void
): Promise<UploadResult> => {
  const fileExtension = file.name.split('.').pop();
  const fileName = `avatar_${userId}_${Date.now()}.${fileExtension}`;
  const path = `${STORAGE_PATHS.USER_AVATARS}/${fileName}`;
  
  return uploadFile(file, path, onProgress);
};

// Fonction pour uploader une image de bourse
export const uploadScholarshipImage = async (
  file: File,
  scholarshipId: string,
  onProgress?: (progress: UploadProgress) => void
): Promise<UploadResult> => {
  const fileExtension = file.name.split('.').pop();
  const fileName = `scholarship_${scholarshipId}_${Date.now()}.${fileExtension}`;
  const path = `${STORAGE_PATHS.SCHOLARSHIP_IMAGES}/${fileName}`;
  
  return uploadFile(file, path, onProgress);
};

// Fonction pour uploader un logo d'institution
export const uploadInstitutionLogo = async (
  file: File,
  institutionId: string,
  onProgress?: (progress: UploadProgress) => void
): Promise<UploadResult> => {
  const fileExtension = file.name.split('.').pop();
  const fileName = `logo_${institutionId}_${Date.now()}.${fileExtension}`;
  const path = `${STORAGE_PATHS.INSTITUTION_LOGOS}/${fileName}`;
  
  return uploadFile(file, path, onProgress);
};

// Fonction pour supprimer un fichier
export const deleteFile = async (path: string): Promise<boolean> => {
  try {
    const fileRef = ref(storage, path);
    await deleteObject(fileRef);
    return true;
  } catch (error) {
    console.error('Erreur lors de la suppression du fichier:', error);
    return false;
  }
};

// Fonction pour obtenir l'URL de téléchargement
export const getFileDownloadURL = async (path: string): Promise<string | null> => {
  try {
    const fileRef = ref(storage, path);
    return await getDownloadURL(fileRef);
  } catch (error) {
    console.error('Erreur lors de la récupération de l\'URL:', error);
    return null;
  }
};

// Fonction pour lister les fichiers dans un dossier
export const listFiles = async (path: string): Promise<FileMetadata[]> => {
  try {
    const folderRef = ref(storage, path);
    const result = await listAll(folderRef);
    
    const files: FileMetadata[] = [];
    
    for (const itemRef of result.items) {
      try {
        const metadata = await getMetadata(itemRef);
        const downloadURL = await getDownloadURL(itemRef);
        
        files.push({
          name: metadata.name,
          size: metadata.size,
          type: metadata.contentType || 'unknown',
          lastModified: metadata.timeCreated ? metadata.timeCreated.getTime() : Date.now(),
          fullPath: metadata.fullPath,
          downloadURL
        });
      } catch (error) {
        console.error('Erreur lors de la récupération des métadonnées:', error);
      }
    }
    
    return files;
  } catch (error) {
    console.error('Erreur lors du listage des fichiers:', error);
    return [];
  }
};

// Fonction pour obtenir les métadonnées d'un fichier
export const getFileMetadata = async (path: string): Promise<FileMetadata | null> => {
  try {
    const fileRef = ref(storage, path);
    const metadata = await getMetadata(fileRef);
    const downloadURL = await getDownloadURL(fileRef);
    
    return {
      name: metadata.name,
      size: metadata.size,
      type: metadata.contentType || 'unknown',
      lastModified: metadata.timeCreated ? metadata.timeCreated.getTime() : Date.now(),
      fullPath: metadata.fullPath,
      downloadURL
    };
  } catch (error) {
    console.error('Erreur lors de la récupération des métadonnées:', error);
    return null;
  }
};

// Fonction pour mettre à jour les métadonnées d'un fichier
export const updateFileMetadata = async (
  path: string,
  metadata: {
    customMetadata?: { [key: string]: string };
    cacheControl?: string;
    contentDisposition?: string;
    contentEncoding?: string;
    contentLanguage?: string;
    contentType?: string;
  }
): Promise<boolean> => {
  try {
    const fileRef = ref(storage, path);
    await updateMetadata(fileRef, metadata);
    return true;
  } catch (error) {
    console.error('Erreur lors de la mise à jour des métadonnées:', error);
    return false;
  }
};

// Fonction pour valider le type de fichier
export const validateFileType = (file: File, allowedTypes: string[]): boolean => {
  return allowedTypes.includes(file.type);
};

// Fonction pour valider la taille du fichier
export const validateFileSize = (file: File, maxSizeInMB: number): boolean => {
  const maxSizeInBytes = maxSizeInMB * 1024 * 1024;
  return file.size <= maxSizeInBytes;
};

// Fonction pour compresser une image avant upload
export const compressImage = (file: File, quality: number = 0.8): Promise<File> => {
  return new Promise((resolve, reject) => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();
    
    img.onload = () => {
      // Calculer les nouvelles dimensions
      const maxWidth = 1920;
      const maxHeight = 1080;
      let { width, height } = img;
      
      if (width > height) {
        if (width > maxWidth) {
          height = (height * maxWidth) / width;
          width = maxWidth;
        }
      } else {
        if (height > maxHeight) {
          width = (width * maxHeight) / height;
          height = maxHeight;
        }
      }
      
      canvas.width = width;
      canvas.height = height;
      
      // Dessiner l'image redimensionnée
      ctx?.drawImage(img, 0, 0, width, height);
      
      // Convertir en blob
      canvas.toBlob(
        (blob) => {
          if (blob) {
            const compressedFile = new File([blob], file.name, {
              type: file.type,
              lastModified: Date.now()
            });
            resolve(compressedFile);
          } else {
            reject(new Error('Erreur lors de la compression'));
          }
        },
        file.type,
        quality
      );
    };
    
    img.onerror = () => reject(new Error('Erreur lors du chargement de l\'image'));
    img.src = URL.createObjectURL(file);
  });
};

// Fonction pour uploader avec compression automatique
export const uploadImageWithCompression = async (
  file: File,
  path: string,
  quality: number = 0.8,
  onProgress?: (progress: UploadProgress) => void
): Promise<UploadResult> => {
  try {
    // Vérifier si c'est une image
    if (!file.type.startsWith('image/')) {
      return uploadFile(file, path, onProgress);
    }
    
    // Compresser l'image
    const compressedFile = await compressImage(file, quality);
    
    // Uploader le fichier compressé
    return uploadFile(compressedFile, path, onProgress);
  } catch (error) {
    console.error('Erreur lors de l\'upload avec compression:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Erreur inconnue'
    };
  }
};
