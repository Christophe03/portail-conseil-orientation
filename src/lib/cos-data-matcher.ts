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
 * Table de correspondance Métier -> Domaines de recherche
 */
export const CAREER_DOMAIN_MAP: Record<string, string[]> = {
  comptable: ['gestion', 'comptabilité', 'finance', 'commerce', 'management', 'entreprise', 'banque'],
  gestionnaire: ['gestion', 'commerce', 'management', 'finance', 'entreprise'],
  banquier: ['finance', 'banque', 'gestion', 'commerce'],
  marketeur: ['marketing', 'commerce', 'communication'],
  médecin: ['santé', 'médecine', 'biologie', 'pharmacie', 'médical'],
  docteur: ['santé', 'médecine', 'biologie'],
  infirmier: ['santé', 'infirmier', 'médical'],
  'sage-femme': ['santé', 'sage-femme', 'médical'],
  pharmacien: ['santé', 'pharmacie', 'biologie'],
  avocat: ['droit', 'juridique', 'justice'],
  juriste: ['droit', 'juridique'],
  magistrat: ['droit', 'justice'],
  informaticien: ['informatique', 'technologie', 'génie logiciel', 'réseau', 'cyber'],
  développeur: ['informatique', 'génie logiciel', 'code', 'programmeur'],
  programmeur: ['informatique', 'génie logiciel', 'code'],
  ingénieur: ['génie', 'technologie', 'ingénierie', 'informatique', 'mines'],
  enseignant: ['enseignement', 'éducation', 'lettres', 'sciences'],
  professeur: ['enseignement', 'éducation'],
  agronome: ['agronomie', 'agriculture', 'élevage', 'environnement']
};

/**
 * Normalise la requête utilisateur :
 * - Corrige les fautes de frappe courantes (Bamacko -> Bamako, universite -> université, etc.)
 * - Traite les séries du BAC avec numéros (tse2 -> tse, tss1 -> tss)
 * - Étend les métiers en leurs domaines d'études correspondants
 * - Décodes les abréviations SMS
 */
export function normalizeUserQuery(userMessage: string): string {
  let q = userMessage.toLowerCase().trim();

  // 1. Correction des fautes et orthographes courantes
  const typoFixes: [RegExp, string][] = [
    [/\bbamacko\b/gi, 'bamako'],
    [/\bsebou\b/gi, 'ségou'],
    [/\buniversite\b/gi, 'université'],
    [/\bcomptabilite\b/gi, 'comptabilité'],
    [/\bmedecin\b/gi, 'médecin'],
    [/\bingenieur\b/gi, 'ingénieur'],
    [/\bdeveloppeur\b/gi, 'développeur'],
    [/\bpharmacien\b/gi, 'pharmacien'],
    [/\binfirmiere?\b/gi, 'infirmier']
  ];

  typoFixes.forEach(([regex, val]) => {
    q = q.replace(regex, val);
  });

  // 2. Traitement des séries avec chiffres (ex: TSS2 -> TSS, TSE1 -> TSE, TLL2 -> TLL)
  q = q.replace(/\b(tss|tse|tll|tal|tseco|tsexp|gco|cf|gmi|gc|gm|geln|gen)\d+\b/gi, '$1');

  // 3. Extension des séries complètes
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

  seriesExpansions.forEach(([regex, val]) => {
    q = q.replace(regex, `$1${val}`);
  });

  // 4. Mapping des métiers vers les domaines
  Object.keys(CAREER_DOMAIN_MAP).forEach((career) => {
    if (new RegExp(`\\b${career}s?\\b`, 'i').test(q)) {
      const domains = CAREER_DOMAIN_MAP[career].join(' ');
      q += ` ${domains}`;
    }
  });

  // 5. Dictionnaire d'abréviations SMS et salutations
  const smsMap: [RegExp, string][] = [
    [/\bslt\b/gi, 'salut'],
    [/\bhello\b/gi, 'bonjour'],
    [/\bhi\b/gi, 'salut'],
    [/\bhey\b/gi, 'salut'],
    [/\bbjr\b/gi, 'bonjour'],
    [/\bbsr\b/gi, 'bonsoir'],
    [/\bmrc\b/gi, 'merci'],
    [/\b(cv|sva)\b/gi, 'ça va'],
    [/\bkow[eé]\b/gi, 'bonjour'],
    [/\bkof[eé]\b/gi, 'bonjour'],
    [/\bunivs?\b/gi, 'université'],
    [/\bfacs?\b/gi, 'faculté'],
    [/\bstp\b/gi, "s'il te plaît"],
    [/\bsvp\b/gi, "s'il vous plaît"]
  ];

  smsMap.forEach(([regex, val]) => {
    q = q.replace(regex, val);
  });

  return q;
}

/**
 * Recherche les universités (privées et publiques) correspondant au message utilisateur.
 * Prend en compte l'historique récent de la conversation pour le contexte (ex: "et à Kayes ?").
 */
export function findRelevantUniversities(
  userMessage: string,
  historyMessages: any[] = []
): GroundingUniversity[] {
  let combinedQuery = userMessage;

  // Si le message utilisateur est très court (ex: "et à Kayes ?"), on y ajoute le contexte des messages précédents
  if (userMessage.trim().length < 25 && historyMessages.length > 1) {
    const previousUserMessages = historyMessages
      .filter((m: any) => m.role === 'user' || m.role === 'human')
      .map((m: any) => String(m.content || ''))
      .join(' ');
    combinedQuery = `${previousUserMessages} ${userMessage}`;
  }

  const query = normalizeUserQuery(combinedQuery);
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
    gestion: ['gestion', 'commerce', 'finance', 'comptabilité', 'comptabilite', 'management', 'business', 'marketing', 'banque', 'entreprise', 'comptable'],
    droit: ['droit', 'juridique', 'justice', 'avocat'],
    journalisme: ['journalisme', 'communication', 'presse', 'média', 'media'],
    agronomie: ['agronomie', 'agriculture', 'élevage', 'environnement'],
    mines: ['mine', 'géologie', 'geologie', 'petrole', 'énergie']
  };

  // Mots-clés de séries du BAC
  const seriesKeywords = ['tse', 'tsexp', 'tss', 'tal', 'tll', 'tseco', 'gco', 'cf', 'gc', 'gm', 'gmi', 'geln', 'gen'];
  const matchedSeries = seriesKeywords.filter(s => new RegExp(`\\b${s}\\b`, 'i').test(query));

  // Détection des villes ou domaines dans la requête (on privilégie la dernière ville mentionnée si présent)
  const rawLastMessageQuery = normalizeUserQuery(userMessage);
  const citiesInLastMessage = Object.keys(cityKeywords).filter(city => 
    cityKeywords[city].some(kw => rawLastMessageQuery.includes(kw))
  );

  const detectedCities = citiesInLastMessage.length > 0 
    ? citiesInLastMessage 
    : Object.keys(cityKeywords).filter(city => cityKeywords[city].some(kw => query.includes(kw)));

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
    return "Aucune université spécifique sélectionnée pour cette requête. Si la question porte sur l'orientation, réponds de façon générale avec tact et invite à préciser la ville ou la filière.";
  }

  let text = "### DONNÉES RÉELLES DU SITE SUR LES UNIVERSITÉS PERTINENTES :\n";
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
