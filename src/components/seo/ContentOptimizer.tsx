import { ReactNode } from 'react';

interface SEOHeadingProps {
  level: 1 | 2 | 3 | 4 | 5 | 6;
  children: ReactNode;
  className?: string;
  id?: string;
}

export function SEOHeading({ level, children, className = '', id }: SEOHeadingProps) {
  const HeadingTag = `h${level}` as keyof JSX.IntrinsicElements;
  
  return (
    <HeadingTag 
      id={id}
      className={`${className} scroll-mt-20`}
      data-heading-level={level}
    >
      {children}
    </HeadingTag>
  );
}

interface SEOParagraphProps {
  children: ReactNode;
  className?: string;
  keyword?: string;
}

export function SEOParagraph({ children, className = '', keyword }: SEOParagraphProps) {
  return (
    <p 
      className={`${className}`}
      data-keyword={keyword}
    >
      {children}
    </p>
  );
}

interface SEOListProps {
  items: string[];
  type?: 'ul' | 'ol';
  className?: string;
  keyword?: string;
}

export function SEOList({ items, type = 'ul', className = '', keyword }: SEOListProps) {
  const ListTag = type;
  
  return (
    <ListTag 
      className={`${className}`}
      data-keyword={keyword}
    >
      {items.map((item, index) => (
        <li key={index} className="mb-2">
          {item}
        </li>
      ))}
    </ListTag>
  );
}

interface SEOImageProps {
  src: string;
  alt: string;
  title?: string;
  className?: string;
  width?: number;
  height?: number;
  priority?: boolean;
  keyword?: string;
}

export function SEOImage({ 
  src, 
  alt, 
  title, 
  className = '', 
  width, 
  height, 
  priority = false,
  keyword 
}: SEOImageProps) {
  return (
    <img
      src={src}
      alt={alt}
      title={title}
      className={className}
      width={width}
      height={height}
      loading={priority ? 'eager' : 'lazy'}
      fetchPriority={priority ? 'high' : 'low'}
      data-keyword={keyword}
    />
  );
}

interface SEOContainerProps {
  children: ReactNode;
  className?: string;
  semantic?: 'article' | 'section' | 'aside' | 'main' | 'header' | 'footer' | 'nav';
  keyword?: string;
}

export function SEOContainer({ 
  children, 
  className = '', 
  semantic = 'section',
  keyword 
}: SEOContainerProps) {
  const SemanticTag = semantic;
  
  return (
    <SemanticTag 
      className={className}
      data-keyword={keyword}
    >
      {children}
    </SemanticTag>
  );
}

// Utility functions for SEO content optimization
export const seoUtils = {
  // Generate meta description from content
  generateMetaDescription: (content: string, maxLength: number = 160): string => {
    const cleanContent = content
      .replace(/<[^>]*>/g, '') // Remove HTML tags
      .replace(/\s+/g, ' ') // Replace multiple spaces with single space
      .trim();
    
    if (cleanContent.length <= maxLength) {
      return cleanContent;
    }
    
    const truncated = cleanContent.substring(0, maxLength);
    const lastSpaceIndex = truncated.lastIndexOf(' ');
    
    return lastSpaceIndex > 0 
      ? truncated.substring(0, lastSpaceIndex) + '...'
      : truncated + '...';
  },

  // Extract keywords from content
  extractKeywords: (content: string, minLength: number = 3): string[] => {
    const words = content
      .toLowerCase()
      .replace(/[^\w\s]/g, ' ')
      .split(/\s+/)
      .filter(word => word.length >= minLength);
    
    const wordCount: { [key: string]: number } = {};
    words.forEach(word => {
      wordCount[word] = (wordCount[word] || 0) + 1;
    });
    
    return Object.entries(wordCount)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 10)
      .map(([word]) => word);
  },

  // Generate structured breadcrumbs
  generateBreadcrumbs: (path: string): Array<{ name: string; url: string }> => {
    const segments = path.split('/').filter(Boolean);
    const breadcrumbs = [{ name: 'Accueil', url: '/' }];
    
    let currentPath = '';
    segments.forEach(segment => {
      currentPath += `/${segment}`;
      const name = segment
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
      breadcrumbs.push({ name, url: currentPath });
    });
    
    return breadcrumbs;
  },

  // Optimize content for readability
  optimizeReadability: (content: string): string => {
    return content
      .replace(/\s+/g, ' ') // Replace multiple spaces with single space
      .replace(/\n\s*\n/g, '\n\n') // Normalize line breaks
      .trim();
  }
};

// Component for breadcrumbs
interface BreadcrumbsProps {
  path: string;
  className?: string;
}

export function Breadcrumbs({ path, className = '' }: BreadcrumbsProps) {
  const breadcrumbs = seoUtils.generateBreadcrumbs(path);
  
  const breadcrumbData = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: breadcrumbs.map((breadcrumb, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: breadcrumb.name,
      item: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://conseil-orientation-mali.com'}${breadcrumb.url}`
    }))
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbData, null, 2)
        }}
      />
      <nav 
        className={`${className}`}
        aria-label="Breadcrumb"
      >
        <ol className="flex items-center space-x-2 text-sm text-neutral-600 dark:text-neutral-400">
          {breadcrumbs.map((breadcrumb, index) => (
            <li key={breadcrumb.url} className="flex items-center">
              {index > 0 && (
                <span className="mx-2 text-neutral-400">/</span>
              )}
              {index === breadcrumbs.length - 1 ? (
                <span className="text-neutral-900 dark:text-white font-medium">
                  {breadcrumb.name}
                </span>
              ) : (
                <a 
                  href={breadcrumb.url}
                  className="hover:text-primary-600 transition-colors"
                >
                  {breadcrumb.name}
                </a>
              )}
            </li>
          ))}
        </ol>
      </nav>
    </>
  );
}
