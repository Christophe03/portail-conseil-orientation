import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenAI } from '@google/genai';
import { COS_SYSTEM_PROMPT } from '@/lib/cos-system-prompt';
import { findRelevantUniversities, formatGroundingContext, normalizeUserQuery } from '@/lib/cos-data-matcher';

export const runtime = 'nodejs';

/**
 * Classificateur local de secours (utilisé quand l'API Gemini n'est pas disponible ou en quota 429)
 */
function classifyLocalIntent(
  userPrompt: string,
  historyMessages: any[] = []
): 'salutation' | 'question_orientation' | 'question_navigation' | 'hors_sujet' {
  const norm = normalizeUserQuery(userPrompt);
  const rawLower = userPrompt.toLowerCase().trim();

  // 0. Détection d'injection de prompt ou tentative de jailbreak
  const injectionPatterns = [
    /ignore (toutes )?(tes|vos) instructions/i,
    /tu es maintenant/i,
    /mode d[eé]veloppeur/i,
    /system prompt/i,
    /r[eé]v[eè]le (tes|vos) consignes/i,
    /act as a/i,
    /you are now/i,
    /jailbreak/i
  ];
  if (injectionPatterns.some(p => p.test(rawLower))) {
    return 'hors_sujet';
  }

  // 1. Navigation du site
  const navKeywords = ['télécharger', 'telecharger', 'application', 'appli', 'mobile', 'site', 'support', 'contacter', 'naviguer'];
  if (navKeywords.some(kw => norm.includes(kw))) {
    return 'question_navigation';
  }

  // 2. Hors sujet évident
  const offTopicKeywords = ['météo', 'meteo', 'temps', 'pluie', 'cuisine', 'recette', 'football', 'match', 'politique', 'président', 'president'];
  if (offTopicKeywords.some(kw => norm.includes(kw))) {
    return 'hors_sujet';
  }

  // 3. Question orientation (séries BAC, métiers, villes, universités, ou suivi de contexte)
  const orientationKeywords = [
    'université', 'universite', 'filière', 'filiere', 'bac', 'tse', 'tss', 'tll', 'tal', 'tseco', 'gco', 'cf', 'gmi', 'gc', 'gm', 'geln', 'gen',
    'santé', 'sante', 'médecin', 'medecin', 'infirmier', 'comptable', 'gestion', 'droit', 'avocat', 'informatique', 'ingénieur', 'ingenieur',
    'bamako', 'sélégou', 'segou', 'kayes', 'sikasso', 'mopti', 'koutiala', 'étudier', 'etudier', 'école', 'ecole', 'formation'
  ];

  const isContextualFollowUp = (rawLower.startsWith('et ') || rawLower.startsWith('ou ') || rawLower.length < 20) && historyMessages.length > 1;

  if (orientationKeywords.some(kw => norm.includes(kw)) || isContextualFollowUp) {
    return 'question_orientation';
  }

  // 4. Salutation ou politesse de fermeture pure
  const isPureGreeting = /^(bonjour|salut|slt|hello|hi|hey|cv|ça va|ca va|sva|bjr|bsr|cc|coucou|yo|wesh|kowé|kowe|kofé|kofe|merci|mrc|au revoir|à bientôt|a bien tot)\b/i.test(rawLower) || rawLower.length <= 15;
  if (isPureGreeting) {
    return 'salutation';
  }

  return 'question_orientation';
}

export async function POST(req: NextRequest) {
  try {
    const apiKey = process.env.GEMINI_API_KEY;

    const body = await req.json();
    const { messages } = body;

    if (!Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json(
        { error: 'Format de requête invalide.' },
        { status: 400 }
      );
    }

    // Récupérer le dernier message utilisateur
    const lastUserMessage = [...messages].reverse().find((m: any) => m.role === 'user');
    const userPrompt = (lastUserMessage?.content || '').trim();

    if (!userPrompt) {
      return NextResponse.json(
        { error: 'Le message ne peut pas être vide.' },
        { status: 400 }
      );
    }

    if (userPrompt.length > 500) {
      return NextResponse.json(
        { error: 'Votre message dépasse la limite autorisée de 500 caractères.' },
        { status: 400 }
      );
    }

    // Troncature des 10 derniers messages
    const recentMessages = messages.slice(-10);

    // Recherche d'universités ancrées avec contexte de l'historique
    const relevantUniversities = findRelevantUniversities(userPrompt, recentMessages);
    const groundingContext = formatGroundingContext(relevantUniversities);

    const fullSystemInstruction = `${COS_SYSTEM_PROMPT}\n\n${groundingContext}`;

    const contents = recentMessages.map((m: any) => ({
      role: m.role === 'user' ? 'user' : 'model',
      parts: [{ text: String(m.content || '') }]
    }));

    let jsonResponseText = '';
    let lastError: any = null;

    if (apiKey && apiKey.trim() !== '') {
      const ai = new GoogleGenAI({ apiKey });
      const modelsToTry = ['gemini-flash-lite-latest', 'gemini-3.5-flash-lite', 'gemini-flash-latest'];

      for (const modelName of modelsToTry) {
        try {
          const timeoutPromise = new Promise((_, reject) =>
            setTimeout(() => reject(new Error('TIMEOUT')), 12000)
          );

          const apiCallPromise = ai.models.generateContent({
            model: modelName,
            contents,
            config: {
              systemInstruction: fullSystemInstruction,
              temperature: 0.4,
              responseMimeType: 'application/json'
            }
          });

          const response: any = await Promise.race([apiCallPromise, timeoutPromise]);
          if (response?.text) {
            jsonResponseText = response.text;
            break; // Succès !
          }
        } catch (err: any) {
          lastError = err;
          console.warn(`[COS Gemini ${modelName} notice]:`, err?.message || err);
        }
      }
    }

    // Traitement de la réponse JSON de Gemini
    if (jsonResponseText) {
      try {
        let cleaned = jsonResponseText.trim();
        if (cleaned.startsWith('```')) {
          cleaned = cleaned.replace(/^```(json)?\n?/, '').replace(/\n?```$/, '').trim();
        }
        const parsed = JSON.parse(cleaned);
        let replyText = parsed.reponse || parsed.reply || jsonResponseText;
        
        // Nettoyage des astérisques bruts pour une rédaction fluide style Gemini/ChatGPT
        replyText = replyText
          .replace(/^(\s*)\*\s+/gm, '$1- ')
          .replace(/(^|[^*])\*([^*]+)\*([^*]|$)/g, '$1$2$3')
          .replace(/\*\*/g, '');

        const intention = parsed.intention || 'question_orientation';
        const suggestions = parsed.suggestions || getContextualSuggestions(userPrompt, intention);

        return NextResponse.json({ reply: replyText, intention, suggestions });
      } catch (e) {
        let cleanedReply = jsonResponseText
          .replace(/^(\s*)\*\s+/gm, '$1- ')
          .replace(/(^|[^*])\*([^*]+)\*([^*]|$)/g, '$1$2$3')
          .replace(/\*\*/g, '');
        const suggestions = getContextualSuggestions(userPrompt, 'question_orientation');
        return NextResponse.json({ reply: cleanedReply, intention: 'question_orientation', suggestions });
      }
    }

    // Fallback moteur local si pas de clé API Gemini ou quota 429
    const intention = classifyLocalIntent(userPrompt, recentMessages);
    let fallbackReply = '';
    const norm = normalizeUserQuery(userPrompt);
    const isParent = norm.includes('parent') || norm.includes('mon fils') || norm.includes('ma fille') || norm.includes('enfant');
    const isClosing = /^(merci|mrc|au revoir|à bientôt|a bien tot)/i.test(userPrompt.trim());
    const suggestions = getContextualSuggestions(userPrompt, intention);

    switch (intention) {
      case 'salutation':
        if (isClosing) {
          fallbackReply = "Je vous en prie ! 🎓 N'hésitez pas si vous avez d'autres questions sur votre orientation au Mali. À bientôt et bonne continuation !";
        } else if (isParent) {
          fallbackReply = "Bonjour et bienvenue ! 🤝 En tant que parent d'élève, vous faites le meilleur choix pour l'avenir de votre enfant.\n\nJe suis COS, Conseiller d'Orientation au Mali. Quelle est la série du BAC de votre enfant ou son domaine d'intérêt (Santé, Informatique, Gestion, Droit) ?";
        } else {
          const greetings = [
            "Bonjour et bienvenue ! 👋 Je suis COS, ton Conseiller d'Orientation Virtuel au Mali 🎓.\n\nQuelle est ta série du BAC ou quel domaine d'études t'intéresse le plus ?",
            "Salut ! 👋 Ravi de t'accueillir sur Conseil d'Orientation Mali. Tu cherches une université privée, publique ou des infos sur ta série ?",
            "Bonjour ! 🎓 Je suis COS, ton assistant d'orientation. Dis-moi : dans quelle ville ou quelle filière tu souhaites étudier ?"
          ];
          const hash = userPrompt.length % greetings.length;
          fallbackReply = greetings[hash];
        }
        break;

      case 'question_navigation':
        fallbackReply = "Pour utiliser le portail Conseil d'Orientation Mali, voici les liens directs vers nos rubriques principales :\n\n" +
          "📱 Application mobile : [/download](/download)\n" +
          "🏢 Universités Privées : [/universites/privees](/universites/privees)\n" +
          "🏛️ Universités Publiques : [/universites/publiques](/universites/publiques)\n" +
          "📚 Guide des Séries du BAC : [/universites/series](/universites/series)";
        break;

      case 'hors_sujet':
        const isInjection = /ignore|maintenant|d[eé]veloppeur|prompt|consigne|jailbreak/i.test(userPrompt);
        if (isInjection) {
          fallbackReply = "En tant que Conseiller d'Orientation Virtuel au Mali, je ne peux pas modifier mon rôle ni mes consignes. Comment puis-je vous aider aujourd'hui concernant votre orientation ou les universités ?";
        } else {
          fallbackReply = "Je suis COS, votre Conseiller d'Orientation Scolaire et Universitaire au Mali 🎓. Ma mission est de vous guider sur les séries du BAC, les universités réelles et les filières d'études au Mali.\n\nAvez-vous une question concernant votre orientation ou une université ?";
        }
        break;

      case 'question_orientation':
      default:
        const isIndecisive = /je (ne )?sais pas|aucune id[eé]e|pas d'id[eé]e|ind[eé]cis|quoi choisir/i.test(norm);
        const isComparison = /compar|diff[eé]ren/i.test(norm);

        if (isComparison) {
          fallbackReply = "Voici les repères essentiels pour comparer les établissements au Mali :\n\n" +
            "🏛️ Universités Publiques :\n" +
            "• Frais de scolarité très réduits et subventionnés par l'État.\n" +
            "• Orientation nationale via CampusMali et concours officiels.\n" +
            "• Diplômes d'État reconnus.\n\n" +
            "🏢 Universités Privées :\n" +
            "• Frais de scolarité payants (mensuels ou annuels).\n" +
            "• Admissions directes sur dossier et flexibilité des rentrées.\n" +
            "• Encadrement souvent plus restreint.\n\n" +
            "💡 Note : Je ne publie aucun classement subjectif de réputation entre établissements. Vous pouvez consulter directement les fiches des [Universités Privées](/universites/privees) ou [Universités Publiques](/universites/publiques).";
        } else if (isIndecisive) {
          fallbackReply = "Pas de panique ! C'est tout à fait normal d'hésiter pour son orientation 😊.\n\nPour t'aider à y voir plus clair : tu te vois plutôt dans un métier de bureau (Gestion, Droit), un métier scientifique & santé, ou un métier technique sur le terrain ?";
        } else if (relevantUniversities.length > 0) {
          fallbackReply = isParent
            ? "Voici les établissements homologués au Mali qui correspondent à vos critères :\n\n"
            : "Voici les établissements réels qui proposent des formations dans ce domaine :\n\n";

          relevantUniversities.forEach(u => {
            fallbackReply += `• [${u.nom}](${u.url}) (${u.type === 'privée' ? 'Privée' : 'Publique'})\n  📍 Localisation : ${u.localisation}\n`;
            if (u.contact) fallbackReply += `  📞 Contact direct : ${u.contact}\n`;
          });
          fallbackReply += "\n💡 Cliquez sur le nom de l'université pour voir sa fiche complète et ses coordonnées.";
        } else {
          fallbackReply = "Avec plaisir ! Pour te proposer les meilleures universités correspondant exactement à ton profil, quel domaine d'études t'intéresse en priorité (Santé, Informatique, Gestion, Droit, Agronomie) ou quelle est ta série du BAC ?";
        }
        break;
    }

    // Heuristique d'impasse : Si 2 réponses consécutives ont échoué à donner un résultat précis, proposer l'aide humaine
    const unresolvedCount = recentMessages.filter((m: any) => 
      m.role === 'model' && (String(m.content).includes('n\'ai pas trouvé') || String(m.content).includes('Pour te proposer') || String(m.content).includes('précisez'))
    ).length;

    if (unresolvedCount >= 2 && relevantUniversities.length === 0) {
      fallbackReply += "\n\n💬 Besoin d'un accompagnement personnalisé ? Si tu ne trouves pas l'information recherchée, tu peux directement [Contacter l'équipe de support](/about) de Conseil d'Orientation Mali.";
    }

    return NextResponse.json({ reply: fallbackReply, intention, suggestions });
  } catch (error: any) {
    console.error('[COS Chat API Error]:', error);
    return NextResponse.json({
      reply: "Bonjour ! 👋 Je suis **COS**, ton Conseiller d'Orientation au Mali 🎓. N'hésite pas à me poser tes questions sur les universités et séries du BAC !",
      intention: 'salutation',
      suggestions: ['Trouver ma série', 'Universités à Bamako']
    });
  }
}

function getContextualSuggestions(userPrompt: string, intention: string): string[] {
  const norm = normalizeUserQuery(userPrompt);

  const isIndecisive = /je (ne )?sais pas|aucune id[eé]e|pas d'id[eé]e|ind[eé]cis|quoi choisir/i.test(norm);
  if (isIndecisive) {
    return [
      'Métier de bureau (Gestion, Droit)',
      'Scientifique & Santé',
      'Informatique & Nouvelles Tech',
      'Guide des Séries du BAC'
    ];
  }

  if (intention === 'salutation') {
    return [
      'Trouver ma série du BAC',
      'Universités à Bamako',
      'Je ne sais pas quoi choisir',
      'Comparer Public vs Privé'
    ];
  }

  if (intention === 'question_navigation') {
    return [
      'Universités Privées',
      'Universités Publiques',
      'Télécharger l\'application'
    ];
  }

  if (norm.includes('bamako') || norm.includes('ségou') || norm.includes('kayes') || norm.includes('sikasso')) {
    return [
      'Voir les universités privées',
      'Voir les universités publiques',
      'Changer de ville',
      'Découvrir une autre filière'
    ];
  }

  if (norm.includes('tse') || norm.includes('tss') || norm.includes('tll') || norm.includes('tseco')) {
    return [
      'Débouchés de ma série',
      'Universités à Bamako',
      'Filières Santé & Médecine',
      'Filières Informatique & Tech'
    ];
  }

  return [
    'Universités à Bamako',
    'Filières Informatique & Tech',
    'Filières Santé & Médecine',
    'Guide des Séries du BAC'
  ];
}
