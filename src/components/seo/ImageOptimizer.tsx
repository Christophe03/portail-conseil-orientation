import Image from 'next/image';
import { useState, useEffect } from 'react';

interface OptimizedImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  priority?: boolean;
  quality?: number;
  placeholder?: 'blur' | 'empty';
  blurDataURL?: string;
  sizes?: string;
  fill?: boolean;
  style?: React.CSSProperties;
  onClick?: () => void;
  onLoad?: () => void;
  onError?: () => void;
}

export function OptimizedImage({
  src,
  alt,
  width,
  height,
  className = '',
  priority = false,
  quality = 85,
  placeholder = 'empty',
  blurDataURL,
  sizes,
  fill = false,
  style,
  onClick,
  onLoad,
  onError
}: OptimizedImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  // Générer un placeholder blur si nécessaire
  const generateBlurDataURL = (width: number, height: number): string => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (!ctx) return '';
    
    canvas.width = width;
    canvas.height = height;
    
    // Créer un gradient simple
    const gradient = ctx.createLinearGradient(0, 0, width, height);
    gradient.addColorStop(0, '#f3f4f6');
    gradient.addColorStop(1, '#e5e7eb');
    
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);
    
    return canvas.toDataURL('image/jpeg', 0.1);
  };

  const handleLoad = () => {
    setIsLoaded(true);
    onLoad?.();
  };

  const handleError = () => {
    setHasError(true);
    onError?.();
  };

  // Optimiser les tailles d'image
  const getOptimizedSizes = (): string => {
    if (sizes) return sizes;
    
    return '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw';
  };

  // Générer les sources optimisées
  const getOptimizedSrc = (): string => {
    if (hasError) return '/placeholder-image.png';
    return src;
  };

  return (
    <div 
      className={`relative overflow-hidden ${className}`}
      style={style}
      onClick={onClick}
    >
      <Image
        src={getOptimizedSrc()}
        alt={alt}
        width={fill ? undefined : width}
        height={fill ? undefined : height}
        fill={fill}
        className={`transition-opacity duration-300 ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        }`}
        priority={priority}
        quality={quality}
        placeholder={placeholder}
        blurDataURL={blurDataURL || (width && height ? generateBlurDataURL(width, height) : undefined)}
        sizes={getOptimizedSizes()}
        onLoad={handleLoad}
        onError={handleError}
        style={{
          objectFit: 'cover',
          ...style
        }}
      />
      
      {/* Placeholder de chargement */}
      {!isLoaded && !hasError && (
        <div className="absolute inset-0 bg-gradient-to-r from-gray-200 to-gray-300 animate-pulse" />
      )}
      
      {/* Placeholder d'erreur */}
      {hasError && (
        <div className="absolute inset-0 bg-gray-100 flex items-center justify-center">
          <span className="text-gray-400 text-sm">Image non disponible</span>
        </div>
      )}
    </div>
  );
}

// Composant pour les images hero (LCP optimisé)
interface HeroImageProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
  priority?: boolean;
}

export function HeroImage({ 
  src, 
  alt, 
  width, 
  height, 
  className = '',
  priority = true 
}: HeroImageProps) {
  return (
    <OptimizedImage
      src={src}
      alt={alt}
      width={width}
      height={height}
      className={`hero-image ${className}`}
      priority={priority}
      quality={90}
      placeholder="blur"
      sizes="100vw"
    />
  );
}

// Composant pour les images de contenu
interface ContentImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  caption?: string;
}

export function ContentImage({ 
  src, 
  alt, 
  width, 
  height, 
  className = '',
  caption 
}: ContentImageProps) {
  return (
    <figure className={`content-image ${className}`}>
      <OptimizedImage
        src={src}
        alt={alt}
        width={width}
        height={height}
        quality={80}
        placeholder="blur"
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      />
      {caption && (
        <figcaption className="text-sm text-gray-600 mt-2 text-center">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}

// Composant pour les images de profil
interface ProfileImageProps {
  src: string;
  alt: string;
  size?: number;
  className?: string;
}

export function ProfileImage({ 
  src, 
  alt, 
  size = 64, 
  className = '' 
}: ProfileImageProps) {
  return (
    <OptimizedImage
      src={src}
      alt={alt}
      width={size}
      height={size}
      className={`rounded-full ${className}`}
      quality={85}
      placeholder="blur"
      sizes={`${size}px`}
    />
  );
}

// Hook pour optimiser les performances des images
export function useImageOptimization() {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const [ref, setRef] = useState<HTMLElement | null>(null);

  useEffect(() => {
    if (!ref) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsIntersecting(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(ref);

    return () => observer.disconnect();
  }, [ref]);

  return { ref: setRef, isIntersecting };
}

// Utilitaires pour l'optimisation des images
export const imageUtils = {
  // Générer des URLs d'image optimisées
  generateOptimizedUrl: (src: string, width: number, height: number, quality: number = 85): string => {
    // Si c'est une image externe, utiliser un service d'optimisation
    if (src.startsWith('http')) {
      return `https://images.weserv.nl/?url=${encodeURIComponent(src)}&w=${width}&h=${height}&q=${quality}&f=webp`;
    }
    return src;
  },

  // Vérifier si une image est en format WebP
  isWebPSupported: (): boolean => {
    if (typeof window === 'undefined') return false;
    
    const canvas = document.createElement('canvas');
    canvas.width = 1;
    canvas.height = 1;
    
    return canvas.toDataURL('image/webp').indexOf('data:image/webp') === 0;
  },

  // Générer un placeholder SVG
  generateSVGPlaceholder: (width: number, height: number, text: string = 'Image'): string => {
    const svg = `
      <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
        <rect width="100%" height="100%" fill="#f3f4f6"/>
        <text x="50%" y="50%" font-family="Arial, sans-serif" font-size="14" fill="#9ca3af" text-anchor="middle" dy=".3em">
          ${text}
        </text>
      </svg>
    `;
    
    return `data:image/svg+xml;base64,${btoa(svg)}`;
  }
};
