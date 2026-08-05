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

    // Timeout de 15 secondes
    const timeoutPromise = new Promise((_, reject) =>
      setTimeout(() => reject(new Error('TIMEOUT')), 15000)
    );

    const apiCallPromise = ai.models.generateContent({
      model: 'gemini-2.0-flash',
      contents,
      config: {
        systemInstruction: fullSystemInstruction,
        temperature: 0.6,
      }
    });

    let response: any = null;
    try {
      response = await Promise.race([apiCallPromise, timeoutPromise]);
    } catch (err: any) {
      if (err?.message === 'TIMEOUT') {
        return NextResponse.json(
          { error: "Le service prend trop de temps à répondre (timeout 15s). Veuillez réessayer." },
          { status: 504 }
        );
      }

      const errMsg = err?.message || String(err);
      if (err?.status === 429 || errMsg.includes('429') || errMsg.includes('Quota exceeded') || errMsg.includes('RESOURCE_EXHAUSTED')) {
        return NextResponse.json(
          { 
            error: "Quota API Gemini dépassé (Erreur 429). Votre clé API Google AI Studio n'a pas de quota gratuit actif sur le modèle gemini-2.0-flash. Veuillez créer une nouvelle clé API sur https://aistudio.google.com/." 
          },
          { status: 429 }
        );
      }

      throw err;
    }

    const replyText = response?.text || "Désolé, je n'ai pas pu obtenir une réponse d'orientation.";
    return NextResponse.json({ reply: replyText });
  } catch (error: any) {
    console.error('[COS Chat API Error]:', error);
    return NextResponse.json(
      { error: error?.message || "Un problème technique est survenu avec l'assistant COS." },
      { status: 500 }
    );
  }
}
