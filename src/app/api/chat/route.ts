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
  const isPureGreeting = /^(bonjour|salut|slt|bjr|bsr|cc|yo|wesh|kowé|kowe|merci|mrc|au revoir|à bientôt|a bien tot|ça va|ca va)\b/i.test(rawLower) || rawLower.length <= 15;
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
      const modelsToTry = ['gemini-2.0-flash-lite', 'gemini-2.0-flash'];

      for (const modelName of modelsToTry) {
        try {
          const timeoutPromise = new Promise((_, reject) =>
            setTimeout(() => reject(new Error('TIMEOUT')), 15000)
          );

          const apiCallPromise = ai.models.generateContent({
            model: modelName,
            contents,
            config: {
              systemInstruction: fullSystemInstruction,
              temperature: 0.2, // Température basse pour une classification fiable
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
          if (err?.message === 'TIMEOUT') throw err;
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
        const replyText = parsed.reponse || parsed.reply || jsonResponseText;
        const intention = parsed.intention || 'question_orientation';

        return NextResponse.json({ reply: replyText, intention });
      } catch (e) {
        return NextResponse.json({ reply: jsonResponseText, intention: 'question_orientation' });
      }
    }

    // Fallback moteur local si pas de clé API Gemini ou quota 429
    const intention = classifyLocalIntent(userPrompt, recentMessages);
    let fallbackReply = '';
    const norm = normalizeUserQuery(userPrompt);
    const isParent = norm.includes('parent') || norm.includes('mon fils') || norm.includes('ma fille') || norm.includes('enfant');
    const isClosing = /^(merci|mrc|au revoir|à bientôt|a bien tot)/i.test(userPrompt.trim());

    switch (intention) {
      case 'salutation':
        if (isClosing) {
          fallbackReply = "Je vous en prie ! 🎓 N'hésitez pas si vous avez d'autres questions sur votre orientation au Mali. À bientôt et bonne continuation !";
        } else if (isParent) {
          fallbackReply = "Bonjour et bienvenue ! 🤝 En tant que parent d'élève, vous faites le meilleur choix pour l'avenir de votre enfant.\n\nJe suis **COS**, Conseiller d'Orientation au Mali. Quelle est la série du BAC de votre enfant ou son domaine d'intérêt (Santé, Informatique, Gestion, Droit) ?";
        } else {
          fallbackReply = "Bonjour et bienvenue ! 👋 Je suis **COS**, ton Conseiller d'Orientation Virtuel au Mali 🎓.\n\nQuelle est ta série du BAC ou quel domaine d'études t'intéresse (Santé, Informatique, Gestion, Droit, Agronomie) ?";
        }
        break;

      case 'question_navigation':
        fallbackReply = "Pour utiliser le portail **Conseil d'Orientation Mali**, voici les liens directs vers nos rubriques principales :\n\n" +
          "📱 **Télécharger l'application mobile** : [/download](/download)\n" +
          "🏢 **Universités Privées** : [/universites/privees](/universites/privees)\n" +
          "🏛️ **Universités Publiques** : [/universites/publiques](/universites/publiques)\n" +
          "📚 **Guide des Séries du BAC** : [/universites/series](/universites/series)";
        break;

      case 'hors_sujet':
        fallbackReply = "Je suis **COS**, votre Conseiller d'Orientation Scolaire et Universitaire au Mali 🎓. Ma mission est de vous guider sur les séries du BAC, les universités réelles et les filières d'études au Mali.\n\nAvez-vous une question concernant votre orientation ou une université ?";
        break;

      case 'question_orientation':
      default:
        if (relevantUniversities.length > 0) {
          fallbackReply = isParent
            ? "Voici les établissements homologués au Mali qui correspondent à vos critères :\n\n"
            : "Voici les établissements réels qui proposent des formations dans ce domaine :\n\n";

          relevantUniversities.forEach(u => {
            fallbackReply += `• **[${u.nom}](${u.url})** (${u.type === 'privée' ? 'Privée' : 'Publique'})\n  📍 *Localisation* : ${u.localisation}\n`;
            if (u.contact) fallbackReply += `  📞 *Contact direct* : ${u.contact}\n`;
          });
          fallbackReply += "\n💡 Cliquez sur le nom de l'université pour voir sa fiche complète et ses coordonnées.";
        } else {
          fallbackReply = "En tant que conseiller d'orientation, je n'ai pas trouvé d'établissement correspondant exactement à ce mot-clé précis.\n\nPour m'aider à vous guider, précisez :\n1. Le domaine (Santé, Informatique, Gestion, Droit...)\n2. La ville (Bamako, Ségou, Sikasso, Kayes...)\n\nVous pouvez aussi parcourir les [Universités Privées](/universites/privees) ou les [Universités Publiques](/universites/publiques).";
        }
        break;
    }

    return NextResponse.json({ reply: fallbackReply, intention });
  } catch (error: any) {
    console.error('[COS Chat API Error]:', error);
    return NextResponse.json({
      reply: "Bonjour ! 👋 Je suis **COS**, ton Conseiller d'Orientation au Mali 🎓. N'hésite pas à me poser tes questions sur les universités et séries du BAC !",
      intention: 'salutation'
    });
  }
}
