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
      const errMsg = lastError?.message || String(lastError);
      if (lastError?.status === 429 || errMsg.includes('429') || errMsg.includes('Quota exceeded') || errMsg.includes('RESOURCE_EXHAUSTED')) {
        return NextResponse.json(
          { 
            error: "Quota API Gemini dépassé (Erreur 429). Votre clé API Google AI Studio n'a pas de quota gratuit disponible sur gemini-2.0-flash-lite / gemini-2.0-flash. Veuillez créer une nouvelle clé gratuite sur https://aistudio.google.com/." 
          },
          { status: 429 }
        );
      }
      throw lastError || new Error("Impossible d'obtenir une réponse de Gemini.");
    }

    const replyText = response.text;
    return NextResponse.json({ reply: replyText });
  } catch (error: any) {
    console.error('[COS Chat API Error]:', error);
    return NextResponse.json(
      { error: error?.message || "Un problème technique est survenu avec l'assistant COS." },
      { status: 500 }
    );
  }
}
