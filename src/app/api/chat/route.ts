import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenAI } from '@google/genai';
import { COS_SYSTEM_PROMPT } from '@/lib/cos-system-prompt';
import { findRelevantUniversities, formatGroundingContext } from '@/lib/cos-data-matcher';

export const runtime = 'nodejs';

export async function POST(req: NextRequest) {
  try {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey || apiKey.trim() === '') {
      return NextResponse.json(
        { error: "La clé API Gemini n'est pas configurée sur le serveur. Veuillez renseigner GEMINI_API_KEY." },
        { status: 500 }
      );
    }

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

    // Troncature des 10 derniers messages pour réduire coûts & latence
    const recentMessages = messages.slice(-10);

    // Extraction et ancrage dans les données du site
    const relevantUniversities = findRelevantUniversities(userPrompt);
    const groundingContext = formatGroundingContext(relevantUniversities);

    const fullSystemInstruction = `${COS_SYSTEM_PROMPT}\n\n${groundingContext}`;

    const contents = recentMessages.map((m: any) => ({
      role: m.role === 'user' ? 'user' : 'model',
      parts: [{ text: String(m.content || '') }]
    }));

    const ai = new GoogleGenAI({ apiKey });

    const modelsToTry = ['gemini-2.0-flash-lite', 'gemini-2.0-flash'];
    let response: any = null;
    let lastError: any = null;

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
            temperature: 0.6,
          }
        });

        response = await Promise.race([apiCallPromise, timeoutPromise]);
        if (response?.text) {
          break; // Succès !
        }
      } catch (err: any) {
        lastError = err;
        if (err?.message === 'TIMEOUT') throw err;
      }
    }

    if (!response?.text) {
      // Générer une réponse conversationnelle et conseillère basée sur les vraies données
      const lower = userPrompt.toLowerCase();
      let fallbackReply = '';

      const isGreeting = /^(bonjour|salut|bonsoir|kowé|kowe|coucou|hello|bonjour!|salut!)\b/i.test(lower) || lower.length < 15;
      const isParent = lower.includes('parent') || lower.includes('mon fils') || lower.includes('ma fille') || lower.includes('enfant');

      if (isGreeting) {
        if (isParent) {
          fallbackReply = "Bonjour et bienvenue ! 🤝 En tant que parent d'élève, vous faites le meilleur choix en vous informant tôt pour l'avenir de votre enfant.\n\nJe suis **COS**, Conseiller d'Orientation au Mali. Pour vous aider à trouver l'établissement et la formation idéale :\n\n• Dans quelle **ville** recherchez-vous une université ?\n• Quelle est la **série du BAC** de votre enfant (TSE, TSS, TAL, TSECO...) ou son domaine d'intérêt (Santé, Informatique, Gestion, Droit) ?\n\nVous pouvez aussi consulter directement le répertoire des [Universités Privées](/universites/privees) ou des [Universités Publiques](/universites/publiques).";
        } else {
          fallbackReply = "Bonjour et bienvenue ! 👋 Je suis **COS**, ton Conseiller d'Orientation Virtuel au Mali 🎓.\n\nMon rôle est de t'aider à choisir ta série du BAC, découvrir les formations universitaires et trouver les meilleures universités privées ou publiques pour ta réussite.\n\nDis-moi : **quelle est ta série du BAC** ou **quel domaine d'études t'intéresse** (ex: Santé, Informatique, Gestion, Droit, Agronomie) ?";
        }
      } else if (relevantUniversities.length > 0) {
        fallbackReply = isParent 
          ? "Voici les établissements homologués et vérifiés au Mali qui correspondent à ces critères :\n\n"
          : "Super choix ! Voici les établissements réels du site qui proposent des formations dans ce domaine :\n\n";

        relevantUniversities.forEach(u => {
          fallbackReply += `• **[${u.nom}](${u.url})** (${u.type === 'privée' ? 'Privée' : 'Publique'})\n  📍 *Localisation* : ${u.localisation}\n`;
          if (u.contact) fallbackReply += `  📞 *Contact direct* : ${u.contact}\n`;
        });

        fallbackReply += "\n💡 **Mon conseil d'orientation** : Cliquez sur les liens des établissements pour consulter l'adresse exacte et contacter directement l'administration.\n\nSouhaitez-vous des détails sur d'autres filières ou une autre ville ?";
      } else {
        fallbackReply = "Merci pour votre question ! En tant que conseiller d'orientation, je peux vous guider vers plusieurs opportunités d'études supérieures au Mali.\n\nPour affiner ma recommandation, précisez-moi :\n1. Le domaine souhaité (Santé, Informatique, Management, Droit, Technique...)\n2. La ville préférée (Bamako, Kati, Ségou, Sikasso...)\n\nVous pouvez également explorer nos rubriques :\n- [Toutes les Universités Privées](/universites/privees)\n- [Les Universités Publiques du Mali](/universites/publiques)\n- [Guide des Séries du BAC](/universites/series)";
      }

      return NextResponse.json({ reply: fallbackReply });
    }

    const replyText = response.text;
    return NextResponse.json({ reply: replyText });
  } catch (error: any) {
    console.error('[COS Chat API Error]:', error);
    
    let fallbackReply = "Bonjour ! 👋 Je suis **COS**, ton Conseiller d'Orientation au Mali 🎓.\n\nJe suis là pour t'aider, toi ou tes parents, à trouver la meilleure formation et université au Mali.\n\nExplore directement nos rubriques :\n- [Universités Privées](/universites/privees)\n- [Universités Publiques](/universites/publiques)\n- [Séries du BAC & Débouchés](/universites/series)";

    return NextResponse.json({ reply: fallbackReply });
  }
}
