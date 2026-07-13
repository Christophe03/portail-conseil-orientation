import { NextResponse } from 'next/server';
import privateUniversities from '@/data/universites_privees.json';
import publicSeries from '@/data/series_mali.json';
import { slugify } from '@/lib/utils';

export const dynamic = 'force-static';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.conseil-orientation-mali.com';

type PrivateUniversity = {
    Nom?: string;
    Sigle?: string;
    Localisation?: string;
    Type?: string;
    ID?: string;
};

type PublicSeries = {
    nom?: string;
    universite?: Array<{ nom?: string }>;
};

function buildPrivateUniversityUrl(university: PrivateUniversity) {
    const slug = `${university.Sigle ? slugify(university.Sigle) : slugify(university.Nom || '')}-${slugify(university.ID || university.Nom || '')}`;
    return `${SITE_URL}/universites/privees/${slug}`;
}

function buildPublicUniversityUrl(seriesName: string, universityName: string) {
    return `${SITE_URL}/universites/publiques/${slugify(seriesName)}/${slugify(universityName)}`;
}

export async function GET() {
    const privateEntries = (privateUniversities as PrivateUniversity[])
        .filter((university) => university.Nom)
        .map((university) => `- [${university.Nom}${university.Sigle ? ` (${university.Sigle})` : ''}](${buildPrivateUniversityUrl(university)}) — ${university.Localisation || 'Mali'}, ${university.Type === 'publique' ? 'publique' : 'privée'}`);

    const publicEntries = (publicSeries as PublicSeries[])
        .filter((serie) => serie.nom)
        .flatMap((serie) =>
            (serie.universite || [])
                .filter((university) => university.nom)
                .map((university) => `- [${university.nom} (${serie.nom})](${buildPublicUniversityUrl(serie.nom || '', university.nom || '')}) — ${serie.nom}, publique`)
        );

    const content = `# Conseil d'Orientation Mali

> Portail officiel d'orientation scolaire et universitaire au Mali.
> Aide les bacheliers maliens à choisir leur université et leur filière
> selon leur série de bac (TSE, TSS, TLL, TSECO...).

## À propos
- Application mobile Android + portail web, plus de 50 000 utilisateurs.
- Référence 192 universités privées et toutes les universités publiques du Mali, avec filières, conditions d'admission, contact.
- Édité par Golden Innovation Tech, Kati, Mali.

## Pages principales
- [Accueil](${SITE_URL}/) : présentation du service
- [Universités privées](${SITE_URL}/universites/privees) : liste complète des universités privées
- [Universités publiques](${SITE_URL}/universites/publiques) : universités publiques par filière
- [Que faire après le BAC](${SITE_URL}/universites/series) : guide par série de bac

## Universités
${[...privateEntries, ...publicEntries].join('\n')}

## Contact
Golden Innovation Tech — Kati, Mali
`;

    return new NextResponse(content, {
        headers: {
            'Content-Type': 'text/markdown; charset=utf-8',
            'Cache-Control': 'public, max-age=3600, s-maxage=3600',
        },
    });
}
