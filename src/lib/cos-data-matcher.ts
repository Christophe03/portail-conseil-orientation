import priveesData from '@/data/universites_privees.json';
import seriesMaliData from '@/data/series_mali.json';
import { slugify } from '@/lib/utils';

export interface GroundingUniversity {
  id: string;
  nom: string;
  sigle?: string;
  type: 'privée' | 'publique';
  localisation: string;
  contact?: string;
  site?: string;
  url: string;
  descriptionFiliere?: string;
}

type PriveeJSON = {
  ID: string;
  Type?: string;
  Nom: string;
  Sigle?: string;
  Localisation?: string;
  Contact?: string;
  Mail?: string;
  Site?: string;
};

type SerieMaliJSON = {
  nom: string;
  universite?: {
    nom: string;
    fac?: {
      nom: string;
      abre?: string;
      licence?: { nom: string; debouche?: string[] }[];
    }[];
  }[];
};

const privees = priveesData as unknown as PriveeJSON[];
const seriesMali = seriesMaliData as unknown as SerieMaliJSON[];

/**
 * Normalise la requête utilisateur pour étendre les abréviations SMS et les noms complets des séries du BAC
 */
export function normalizeUserQuery(userMessage: string): string {
  let q = userMessage.toLowerCase().trim();

  // Dictionnaire d'extensions des séries et filières
  const seriesExpansions: [RegExp, string][] = [
    [/\b(terminale?\s+)?sciences?\s+exp[eé]rimentales?\b/gi, 'tse tsexp'],
    [/\b(terminale?\s+)?langues?\s+et\s+lettres?\b/gi, 'tll'],
    [/\b(terminale?\s+)?arts?\s+et\s+lettres?\b/gi, 'tal'],
    [/\b(terminale?\s+)?sciences?\s+sociales?\b/gi, 'tss'],
    [/\b(terminale?\s+)?sciences?\s+[eé]conomiques?\b/gi, 'tseco'],
    [/\b(gestion\s+et\s+comptabilit[eé]|comptabilit[eé]\s+finance)\b/gi, 'gco cf'],
    [/\bg[eé]nie\s+informatique\b/gi, 'gmi informatique'],
    [/\bg[eé]nie\s+civil\b/gi, 'gc génie civil'],
    [/\bg[eé]nie\s+m[eé]canique\b/gi, 'gm génie mécanique'],
    [/\bg[eé]nie\s+[eé]lectronique\b/gi, 'geln génie électronique'],
    [/\bg[eé]nie\s+[eé]nerg[eé]tique\b/gi, 'gen génie énergétique']
  ];

  // Dictionnaire d'abréviations SMS
  const smsMap: [RegExp, string][] = [
    [/\bslt\b/gi, 'salut'],
    [/\bbjr\b/gi, 'bonjour'],
    [/\bbsr\b/gi, 'bonsoir'],
    [/\bmrc\b/gi, 'merci'],
    [/\b(cv|sva)\b/gi, 'ça va'],
    [/\bunivs?\b/gi, 'université'],
    [/\bfacs?\b/gi, 'faculté'],
    [/\bstp\b/gi, "s'il te plaît"],
    [/\bsvp\b/gi, "s'il vous plaît"]
  ];

  seriesExpansions.forEach(([regex, val]) => {
    q = q.replace(regex, `$1${val}`);
  });

  smsMap.forEach(([regex, val]) => {
    q = q.replace(regex, val);
  });

  return q;
}

/**
 * Recherche les universités (privées et publiques) correspondant au message utilisateur.
 * Retourne entre 0 et 12 résultats pertinents avec leurs métadonnées et URL internes.
 */
export function findRelevantUniversities(userMessage: string): GroundingUniversity[] {
  const query = normalizeUserQuery(userMessage);
  if (!query) return [];

  // Mots-clés de localisation
  const cityKeywords: Record<string, string[]> = {
    bamako: ['bamako', 'aci', 'hamdallaye', 'sogoniko', 'sébénikoro', 'sebenikoro', 'djélibougou', 'quinzambougou', 'boulkassoumbougou', 'banankabougou', 'magnambougou', 'niamakoro', 'hippodrome', 'bacodjicoroni', 'kalabancoura', 'kalabancoro', 'yirimadio', 'sotuba', 'sénou', 'kabala'],
    kati: ['kati'],
    ségou: ['ségou', 'segou'],
    kayes: ['kayes'],
    sikasso: ['sikasso'],
    mopti: ['mopti'],
    gao: ['gao'],
    tombouctou: ['tombouctou'],
    koutiala: ['koutiala'],
    kita: ['kita'],
    koulikoro: ['koulikoro']
  };

  // Mots-clés de domaines/spécialités
  const domainKeywords: Record<string, string[]> = {
    santé: ['santé', 'sante', 'médecine', 'medecine', 'pharmacie', 'infirmier', 'sage-femme', 'biologie', 'médical'],
    informatique: ['informatique', 'technologie', 'génie logiciel', 'reseau', 'réseau', 'cyber', 'code', 'programmeur', 'développeur', 'data', 'ia'],
    gestion: ['gestion', 'commerce', 'finance', 'comptabilité', 'comptabilite', 'management', 'business', 'marketing', 'banque', 'entreprise'],
    droit: ['droit', 'juridique', 'justice', 'avocat'],
    journalisme: ['journalisme', 'communication', 'presse', 'média', 'media'],
    agronomie: ['agronomie', 'agriculture', 'élevage', 'environnement'],
    mines: ['mine', 'géologie', 'geologie', 'petrole', 'énergie']
  };

  // Mots-clés de séries du BAC
  const seriesKeywords = ['tse', 'tsexp', 'tss', 'tal', 'tll', 'tseco', 'gco', 'cf', 'gc', 'gm', 'gmi', 'geln', 'gen'];
  const matchedSeries = seriesKeywords.filter(s => new RegExp(`\\b${s}\\b`, 'i').test(query));

  // Détection des villes ou domaines dans la requête
  const detectedCities = Object.keys(cityKeywords).filter(city => 
    cityKeywords[city].some(kw => query.includes(kw))
  );

  const detectedDomains = Object.keys(domainKeywords).filter(dom =>
    domainKeywords[dom].some(kw => query.includes(kw))
  );

  const matches: GroundingUniversity[] = [];
  const seenIds = new Set<string>();

  // 1. Filtrer les universités privées
  for (const u of privees) {
    if (!u.Nom) continue;
    const nomLoc = `${u.Nom} ${u.Sigle || ''} ${u.Localisation || ''}`.toLowerCase();
    
    let isMatch = false;

    // Correspondance exacte ou partielle nom/sigle
    if (query.includes(u.Nom.toLowerCase()) || (u.Sigle && query.includes(u.Sigle.toLowerCase()))) {
      isMatch = true;
    }

    // Match par ville
    if (!isMatch && detectedCities.length > 0) {
      if (detectedCities.some(city => cityKeywords[city].some(kw => nomLoc.includes(kw)))) {
        isMatch = true;
      }
    }

    // Match par domaine
    if (!isMatch && detectedDomains.length > 0) {
      if (detectedDomains.some(dom => domainKeywords[dom].some(kw => nomLoc.includes(kw)))) {
        isMatch = true;
      }
    }

    if (isMatch && !seenIds.has(u.ID)) {
      seenIds.add(u.ID);
      const slug = `${u.Sigle ? slugify(u.Sigle) : slugify(u.Nom)}-${slugify(u.ID || u.Nom)}`;
      matches.push({
        id: u.ID,
        nom: u.Nom,
        sigle: u.Sigle,
        type: 'privée',
        localisation: u.Localisation || 'Bamako',
        contact: u.Contact ? String(u.Contact).trim() : undefined,
        site: u.Site ? String(u.Site).trim() : undefined,
        url: `/universites/privees/${slug}`
      });
    }

    if (matches.length >= 8) break;
  }

  // 2. Filtrer les universités publiques depuis series_mali.json
  for (const serie of seriesMali) {
    const isSerieMatch = matchedSeries.some(ms => serie.nom.toLowerCase().includes(ms));
    
    for (const univ of serie.universite || []) {
      if (!univ.nom) continue;
      const univLoc = `${univ.nom}`.toLowerCase();
      let isMatch = false;

      if (isSerieMatch || query.includes(univ.nom.toLowerCase())) {
        isMatch = true;
      }

      if (!isMatch && detectedCities.length > 0) {
        if (detectedCities.some(city => cityKeywords[city].some(kw => univLoc.includes(kw)))) {
          isMatch = true;
        }
      }

      if (!isMatch && detectedDomains.length > 0) {
        const facNames = (univ.fac || []).map(f => `${f.nom} ${f.abre || ''}`).join(' ').toLowerCase();
        if (detectedDomains.some(dom => domainKeywords[dom].some(kw => facNames.includes(kw)))) {
          isMatch = true;
        }
      }

      const publicId = `PUB-${slugify(univ.nom)}`;
      if (isMatch && !seenIds.has(publicId)) {
        seenIds.add(publicId);
        const serieSlug = slugify(serie.nom);
        const univSlug = slugify(univ.nom);
        const faculties = (univ.fac || []).slice(0, 3).map(f => f.abre || f.nom).join(', ');

        matches.push({
          id: publicId,
          nom: univ.nom,
          type: 'publique',
          localisation: 'Mali (Publique)',
          url: `/universites/publiques/${serieSlug}/${univSlug}`,
          descriptionFiliere: faculties ? `Facultés: ${faculties}` : undefined
        });
      }

      if (matches.length >= 12) break;
    }
    if (matches.length >= 12) break;
  }

  return matches.slice(0, 10);
}

/**
 * Formate la liste des universités sous forme de bloc de texte structuré pour le prompt de Gemini.
 */
export function formatGroundingContext(universities: GroundingUniversity[]): string {
  if (universities.length === 0) {
    return "Aucune université spécifique sélectionnée pour cette requête. Réponds de façon générale avec tact et invite à explorer la rubrique /universites.";
  }

  let text = "### DONNÉES REELLES DU SITE SUR LES UNIVERSITÉS PERTINENTES :\n";
  text += "RAPPEL STRICT : Ne recommande QUE des établissements de cette liste ci-dessous. Utilise EXACTEMENT leurs liens Markdown fournis.\n\n";

  universities.forEach((u, i) => {
    text += `${i + 1}. **${u.nom}**${u.sigle ? ` (${u.sigle})` : ''} — Type: ${u.type}\n`;
    text += `   - Localisation: ${u.localisation}\n`;
    if (u.contact) text += `   - Contact: ${u.contact}\n`;
    if (u.site) text += `   - Site web: ${u.site}\n`;
    if (u.descriptionFiliere) text += `   - ${u.descriptionFiliere}\n`;
    text += `   - Lien fiche du site: [${u.nom}](${u.url})\n\n`;
  });

  return text;
}
