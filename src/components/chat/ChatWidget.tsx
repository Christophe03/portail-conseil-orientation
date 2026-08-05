'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ChatBubbleLeftRightIcon,
  XMarkIcon,
  PaperAirplaneIcon,
  SparklesIcon,
  ExclamationTriangleIcon,
  ArrowPathIcon
} from '@heroicons/react/24/outline';

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
}

const WELCOME_MESSAGE: ChatMessage = {
  id: 'welcome',
  role: 'assistant',
  content: "Salut ! Je suis **COS** 🎓, ton assistant virtuel d'orientation scolaire au Mali.\n\nJe peux t'aider à trouver une université (privée ou publique) correspondant à ta série ou ta ville, et te guider sur le site. Pose-moi ta question !",
  timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
};

export function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([WELCOME_MESSAGE]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Rate Limiting côté client : max 10 messages par minute
  const [sendTimestamps, setSendTimestamps] = useState<number[]>([]);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Déplacement auto du scroll vers le bas
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
      inputRef.current?.focus();
    }
  }, [isOpen, messages, isLoading]);

  // Fermeture par la touche Echap (Accessibilité)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  const handleSend = async () => {
    const trimmedInput = input.trim();
    if (!trimmedInput || isLoading) return;

    // 1. Limite de longueur
    if (trimmedInput.length > 500) {
      setErrorMsg('Votre message ne doit pas dépasser 500 caractères.');
      return;
    }

    // 2. Limite de fréquence (rate limiting client : 10 msgs / min)
    const now = Date.now();
    const oneMinuteAgo = now - 60000;
    const recentSends = sendTimestamps.filter(t => t > oneMinuteAgo);
    if (recentSends.length >= 10) {
      setErrorMsg('Limite atteinte : pas plus de 10 messages par minute. Patientez un instant.');
      return;
    }

    setErrorMsg(null);
    setSendTimestamps([...recentSends, now]);

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: trimmedInput,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    const newHistory = [...messages, userMsg];
    setMessages(newHistory);
    setInput('');
    setIsLoading(true);

    try {
      // Préparation de la requête serveur (historique adapté)
      const payloadMessages = newHistory.map(m => ({
        role: m.role,
        content: m.content
      }));

      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: payloadMessages })
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Erreur lors de la réponse du serveur.');
      }

      const assistantMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: data.reply || "Je n'ai pas pu générer de réponse.",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages(prev => [...prev, assistantMsg]);
    } catch (err: any) {
      console.error('[COS Widget Client Error]:', err);
      setErrorMsg(err.message || 'Désolé, je rencontre un problème technique, réessaie dans un instant.');
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Render de texte avec liens Markdown [Titre](URL) transformés en liens cliquables Next.js
   */
  const renderFormattedContent = (content: string) => {
    // Regex simple pour détecter **texte en gras** et [Titre](/url)
    const parts = [];
    const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
    let lastIndex = 0;
    let match;

    while ((match = linkRegex.exec(content)) !== null) {
      if (match.index > lastIndex) {
        parts.push(content.substring(lastIndex, match.index));
      }

      const linkText = match[1];
      const linkUrl = match[2];
      const isInternal = linkUrl.startsWith('/');

      if (isInternal) {
        parts.push(
          <Link
            key={match.index}
            href={linkUrl}
            onClick={() => {
              if (window.innerWidth < 640) setIsOpen(false);
            }}
            className="text-primary-600 dark:text-primary-400 font-semibold hover:underline inline-flex items-center gap-0.5"
          >
            {linkText}
          </Link>
        );
      } else {
        parts.push(
          <a
            key={match.index}
            href={linkUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary-600 dark:text-primary-400 font-semibold hover:underline"
          >
            {linkText}
          </a>
        );
      }

      lastIndex = linkRegex.lastIndex;
    }

    if (lastIndex < content.length) {
      parts.push(content.substring(lastIndex));
    }

    // Gestion élémentaire des sauts de ligne et du gras
    return (
      <div className="space-y-2 whitespace-pre-line text-sm leading-relaxed">
        {parts.map((part, idx) => {
          if (typeof part === 'string') {
            // Remplacer **texte** par <strong>
            const boldParts = part.split(/(\*\*[^*]+\*\*)/g);
            return (
              <span key={idx}>
                {boldParts.map((sub, i) => {
                  if (sub.startsWith('**') && sub.endsWith('**')) {
                    return <strong key={i} className="font-bold">{sub.slice(2, -2)}</strong>;
                  }
                  return sub;
                })}
              </span>
            );
          }
          return part;
        })}
      </div>
    );
  };

  return (
    <>
      {/* Floating Action Button (Bulle du chat) */}
      <div className="fixed bottom-5 right-5 z-50 no-index" aria-label="Zone du chatbot COS">
        <motion.button
          onClick={() => setIsOpen(!isOpen)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          aria-expanded={isOpen}
          aria-label={isOpen ? "Fermer l'assistant COS" : "Ouvrir l'assistant COS"}
          className="flex items-center gap-2.5 rounded-full bg-gradient-to-r from-primary-600 to-secondary-600 px-4 py-3 text-white shadow-xl hover:shadow-2xl transition-all focus:outline-none focus:ring-4 focus:ring-primary-500/30"
        >
          <div className="relative">
            <SparklesIcon className="h-6 w-6" />
            <span className="absolute -top-1 -right-1 h-2.5 w-2.5 rounded-full bg-green-400 animate-ping" />
          </div>
          <span className="font-bold text-sm tracking-wide">COS</span>
        </motion.button>
      </div>

      {/* Chat Window Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            role="dialog"
            aria-label="Fenêtre de discussion avec COS"
            className="fixed bottom-20 right-4 sm:right-6 z-50 w-[calc(100vw-2rem)] sm:w-[400px] h-[520px] max-h-[80vh] flex flex-col rounded-3xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 shadow-2xl overflow-hidden"
          >
            {/* Header Panel */}
            <div className="bg-gradient-to-r from-primary-700 via-primary-800 to-secondary-800 text-white p-4 flex items-center justify-between shadow-sm">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-white/10 flex items-center justify-center border border-white/20">
                  <SparklesIcon className="h-5 w-5 text-green-300" />
                </div>
                <div>
                  <h3 className="font-bold text-base leading-tight">COS — Assistant Orientation</h3>
                  <p className="text-xs text-primary-200">Conseil d&apos;Orientation Mali</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                aria-label="Fermer la fenêtre (Echap)"
                className="rounded-full p-1.5 hover:bg-white/10 text-white/80 hover:text-white transition"
              >
                <XMarkIcon className="h-5 w-5" />
              </button>
            </div>

            {/* Messages Scroll Area */}
            <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-neutral-50/50 dark:bg-neutral-950/40">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl p-3.5 shadow-sm ${
                      msg.role === 'user'
                        ? 'bg-primary-600 text-white rounded-br-none'
                        : 'bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white border border-neutral-200 dark:border-neutral-700/60 rounded-bl-none'
                    }`}
                  >
                    {msg.role === 'assistant' ? (
                      renderFormattedContent(msg.content)
                    ) : (
                      <p className="text-sm leading-relaxed">{msg.content}</p>
                    )}
                  </div>
                  <span className="text-[10px] text-neutral-400 mt-1 px-1">
                    {msg.timestamp}
                  </span>
                </div>
              ))}

              {isLoading && (
                <div className="flex flex-col items-start">
                  <div className="bg-white dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300 rounded-2xl rounded-bl-none p-3.5 border border-neutral-200 dark:border-neutral-700/60 shadow-sm flex items-center gap-2 text-sm">
                    <ArrowPathIcon className="h-4 w-4 animate-spin text-primary-600" />
                    <span>COS est en train d&apos;écrire...</span>
                  </div>
                </div>
              )}

              {errorMsg && (
                <div className="flex items-center gap-2 p-3 rounded-xl bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-800/40 text-red-700 dark:text-red-300 text-xs">
                  <ExclamationTriangleIcon className="h-4 w-4 shrink-0" />
                  <span>{errorMsg}</span>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input Footer */}
            <div className="p-3 border-t border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSend();
                }}
                className="flex items-center gap-2"
              >
                <div className="relative flex-1">
                  <input
                    ref={inputRef}
                    type="text"
                    value={input}
                    onChange={(e) => {
                      setInput(e.target.value);
                      if (errorMsg) setErrorMsg(null);
                    }}
                    placeholder="Pose ta question..."
                    disabled={isLoading}
                    className="w-full rounded-2xl border border-neutral-300 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 px-4 py-2.5 text-sm text-neutral-900 dark:text-white placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-primary-500 disabled:opacity-50 pr-12"
                  />
                  {input.length > 0 && (
                    <span
                      className={`absolute right-3 top-3 text-[10px] ${
                        input.length > 500 ? 'text-red-500 font-bold' : 'text-neutral-400'
                      }`}
                    >
                      {input.length}/500
                    </span>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={!input.trim() || isLoading || input.length > 500}
                  aria-label="Envoyer le message"
                  className="rounded-2xl bg-gradient-to-r from-primary-600 to-secondary-600 p-2.5 text-white disabled:opacity-40 hover:from-primary-700 hover:to-secondary-700 transition focus:outline-none focus:ring-2 focus:ring-primary-500"
                >
                  <PaperAirplaneIcon className="h-5 w-5" />
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
