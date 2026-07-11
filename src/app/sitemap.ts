import type { MetadataRoute } from 'next';
import privateUniversities from '@/data/universites_privees.json';
import publicSeries from '@/data/series_mali.json';
import bacSeries from '@/data/series.json';
import { slugify } from '@/lib/utils';

type PrivateUniversity = {
  ID?: string;
  Nom?: string;
  Sigle?: string;
};

type PublicUniversity = {
  nom?: string;
};

type PublicSerie = {
  nom?: string;
  universite?: PublicUniversity[];
};

type BacSerie = {
  abre?: string;
};

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.conseil-orientation-mali.com';

function absoluteUrl(path: string) {
  return `${SITE_URL}${path === '/' ? '' : path}`;
}

function staticEntry(
  path: string,
  priority: number,
  changeFrequency: MetadataRoute.Sitemap[number]['changeFrequency'] = 'weekly'
): MetadataRoute.Sitemap[number] {
  return {
    url: absoluteUrl(path),
    lastModified: new Date(),
    changeFrequency,
    priority,
  };
}

function privateUniversitySlug(university: PrivateUniversity) {
  const label = university.Sigle ? slugify(university.Sigle) : slugify(university.Nom || '');
  return `${label}-${slugify(university.ID || university.Nom || '')}`;
}

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    staticEntry('/', 1, 'daily'),
    staticEntry('/about', 0.8),
    staticEntry('/features', 0.8),
    staticEntry('/download', 0.9),
    staticEntry('/docs', 0.7),
    staticEntry('/support', 0.7),
    staticEntry('/privacy', 0.5, 'monthly'),
    staticEntry('/universites', 0.9),
    staticEntry('/universites/privees', 0.9),
    staticEntry('/universites/publiques', 0.9),
    staticEntry('/universites/series', 0.9),
  ];

  const privateRoutes = (privateUniversities as PrivateUniversity[])
    .filter((university) => university.Nom)
    .map((university) => staticEntry(`/universites/privees/${privateUniversitySlug(university)}`, 0.8, 'monthly'));

  const publicSerieRoutes = (publicSeries as PublicSerie[])
    .filter((serie) => serie.nom)
    .map((serie) => staticEntry(`/universites/publiques/${slugify(serie.nom || '')}`, 0.8, 'monthly'));

  const publicUniversityRoutes = (publicSeries as PublicSerie[]).flatMap((serie) => {
    if (!serie.nom || !Array.isArray(serie.universite)) return [];

    const serieSlug = slugify(serie.nom);
    return serie.universite
      .filter((university) => university.nom)
      .map((university) =>
        staticEntry(`/universites/publiques/${serieSlug}/${slugify(university.nom || '')}`, 0.8, 'monthly')
      );
  });

  const bacSerieRoutes = (bacSeries as BacSerie[])
    .filter((serie) => serie.abre)
    .map((serie) => staticEntry(`/universites/series/${slugify(serie.abre || '')}`, 0.8, 'monthly'));

  return [
    ...staticRoutes,
    ...privateRoutes,
    ...publicSerieRoutes,
    ...publicUniversityRoutes,
    ...bacSerieRoutes,
  ];
}
