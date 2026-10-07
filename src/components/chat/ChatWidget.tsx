'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  XMarkIcon,
  PaperAirplaneIcon,
  ExclamationTriangleIcon,
  ArrowPathIcon,
  ArrowLeftIcon,
  TrashIcon
} from '@heroicons/react/24/outline';
import { Bot } from 'lucide-react';

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
  suggestions?: string[];
}

const INITIAL_SUGGESTIONS = [
  'Trouver les facultés pour ma série',
  'Universités publiques à Bamako',
  'Comment télécharger l\'APK ?',
  'Frais et bourses au Mali'
];

const WELCOME_MESSAGE: ChatMessage = {
  id: 'welcome',
  role: 'assistant',
  content: "Bonjour et bienvenue ! 👋 Je suis COS 🎓, votre Conseiller d'Orientation virtuel au Mali.\n\nPosez-moi vos questions sur votre série de Bac, les facultés publiques (USTTB, ULSHB, USSGB, USJPB) ou les universités privées.",
  timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
  suggestions: INITIAL_SUGGESTIONS
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

  // Blocage du scroll d'arrière-plan sur mobile lors de l'ouverture du chat
  useEffect(() => {
    if (isOpen && window.innerWidth < 640) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

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

  // Écoute de l'événement global pour ouvrir le chatbot au clic sur n'importe quel élément COS
  useEffect(() => {
    const handleOpen = () => setIsOpen(true);
    window.addEventListener('open-cos-chatbot', handleOpen);
    return () => window.removeEventListener('open-cos-chatbot', handleOpen);
  }, []);

  const handleReset = () => {
    setMessages([{
      ...WELCOME_MESSAGE,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }]);
    setErrorMsg(null);
  };

  const handleSend = async (customText?: string) => {
    const trimmedInput = (customText || input).trim();
    if (!trimmedInput || isLoading) return;

    if (trimmedInput.length > 500) {
      setErrorMsg('Votre message ne doit pas dépasser 500 caractères.');
      return;
    }

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
        content: data.reply || "Je n'ai pas pu générer une réponse. Veuillez réessayer.",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        suggestions: data.suggestions
      };

      setMessages([...newHistory, assistantMsg]);
    } catch (err: any) {
      setErrorMsg(err.message || 'Problème de connexion. Veuillez réessayer.');
    } finally {
      setIsLoading(false);
    }
  };

  const renderInlineTokens = (text: string, keyPrefix: string) => {
    const tokenRegex = /(\[[^\]]+\]\([^)]+\)|\*\*[^*]+\*\*)/g;
    let lastIndex = 0;
    const elements: React.ReactNode[] = [];
    let match;

    while ((match = tokenRegex.exec(text)) !== null) {
      if (match.index > lastIndex) {
        elements.push(
          <span key={`${keyPrefix}-t-${lastIndex}`} className="text-slate-900 dark:text-slate-100">
            {text.substring(lastIndex, match.index)}
          </span>
        );
      }

      const token = match[0];
      if (token.startsWith('**') && token.endsWith('**')) {
        const boldText = token.slice(2, -2);
        elements.push(
          <strong
            key={`${keyPrefix}-b-${match.index}`}
            className="font-bold text-slate-950 dark:text-white"
          >
            {boldText}
          </strong>
        );
      } else if (token.startsWith('[')) {
        const linkMatch = token.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
        if (linkMatch) {
          const linkText = linkMatch[1];
          const linkUrl = linkMatch[2];
          const isInternal = linkUrl.startsWith('/');

          if (isInternal) {
            elements.push(
              <Link
                key={`${keyPrefix}-l-${match.index}`}
                href={linkUrl}
                onClick={() => {
                  if (window.innerWidth < 640) setIsOpen(false);
                }}
                className="text-[#09488a] dark:text-[#60a5fa] font-bold underline decoration-[#2563eb]/70 dark:decoration-[#60a5fa]/70 decoration-2 underline-offset-2 hover:text-[#062c56] dark:hover:text-[#93c5fd] hover:decoration-[#1d4ed8] transition-colors inline"
              >
                {linkText}
              </Link>
            );
          } else {
            elements.push(
              <a
                key={`${keyPrefix}-l-${match.index}`}
                href={linkUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#09488a] dark:text-[#60a5fa] font-bold underline decoration-[#2563eb]/70 dark:decoration-[#60a5fa]/70 decoration-2 underline-offset-2 hover:text-[#062c56] dark:hover:text-[#93c5fd] hover:decoration-[#1d4ed8] transition-colors inline"
              >
                {linkText}
              </a>
            );
          }
        }
      }

      lastIndex = tokenRegex.lastIndex;
    }

    if (lastIndex < text.length) {
      elements.push(
        <span key={`${keyPrefix}-t-${lastIndex}`} className="text-slate-900 dark:text-slate-100">
          {text.substring(lastIndex)}
        </span>
      );
    }

    return elements;
  };

  const renderFormattedContent = (content: string) => {
    const normalized = content.replace(/^(\s*)\*\s+/gm, '$1- ');
    const lines = normalized.split('\n');

    return (
      <div className="space-y-2 text-[13.5px] sm:text-sm leading-relaxed text-slate-900 dark:text-slate-100 font-normal">
        {lines.map((line, lineIdx) => {
          const trimmed = line.trim();
          if (!trimmed) {
            return <div key={`l-${lineIdx}`} className="h-1" />;
          }

          const isBullet = trimmed.startsWith('- ') || trimmed.startsWith('• ');
          const lineText = isBullet ? trimmed.replace(/^[-•]\s+/, '') : line;

          return (
            <div
              key={`l-${lineIdx}`}
              className={isBullet ? 'flex items-start gap-2.5 pl-1 my-1' : ''}
            >
              {isBullet && (
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#13508F] dark:bg-[#60a5fa] mt-2 shrink-0" />
              )}
              <div className={isBullet ? 'flex-1' : ''}>
                {renderInlineTokens(lineText, `line-${lineIdx}`)}
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <>
      {/* Floating Action Button (Bouton Robot Chatbot COS - Bas Droite) */}
      {!isOpen && (
        <div className="fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-50 no-index" aria-label="Zone du chatbot COS">
          <motion.button
            onClick={() => setIsOpen(true)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.92 }}
            aria-expanded={isOpen}
            aria-label="Ouvrir le Chatbot COS Assistant IA"
            title="COS Assistant IA • Cliquez pour ouvrir le chatbot"
            className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-gradient-to-tr from-[#13508F] to-[#3B9DF8] hover:from-[#0e3a6a] hover:to-[#2589ec] text-white shadow-2xl shadow-[#13508F]/40 border-2 border-white/40 flex items-center justify-center focus:outline-none focus:ring-4 focus:ring-[#3B9DF8]/40 transition-all group"
          >
            {/* Robot Icon */}
            <Bot className="w-7 h-7 sm:w-8 sm:h-8 text-white group-hover:scale-110 transition-transform duration-200 drop-shadow-md" />

            {/* Online Indicator Badge */}
            <span className="absolute top-1 right-1 sm:top-1.5 sm:right-1.5 flex h-3.5 w-3.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-400 border-2 border-[#13508F]" />
            </span>
          </motion.button>
        </div>
      )}

      {/* Chat Window Panel - Mobile Plein Écran, Widget Desktop */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            role="dialog"
            aria-label="Fenêtre de discussion avec COS"
            className="fixed inset-0 z-50 sm:inset-auto sm:bottom-6 sm:right-6 w-full h-[100dvh] sm:w-[420px] sm:h-[600px] sm:max-h-[85vh] flex flex-col rounded-none sm:rounded-3xl border-none sm:border sm:border-slate-200 sm:dark:border-slate-800 bg-white dark:bg-[#0a192f] shadow-2xl overflow-hidden"
          >
            {/* Header Panel */}
            <div className="bg-[#13508F] text-white p-4 flex items-center justify-between shadow-md shrink-0 border-b border-white/10">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setIsOpen(false)}
                  aria-label="Fermer la discussion"
                  className="rounded-xl p-1.5 hover:bg-white/10 text-white/90 hover:text-white transition sm:hidden"
                >
                  <ArrowLeftIcon className="h-6 w-6" />
                </button>
                <div className="h-10 w-10 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center shrink-0">
                  <Bot className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h3 className="font-extrabold text-sm sm:text-base leading-tight flex items-center gap-2">
                    <span>COS • Conseiller d&apos;Orientation</span>
                    <span className="h-2 w-2 rounded-full bg-emerald-400 inline-block animate-pulse" />
                  </h3>
                  <p className="text-[11px] text-slate-200 mt-0.5">Orientation Scolaire & Universitaire Mali</p>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <button
                  onClick={handleReset}
                  title="Nouvelle conversation"
                  aria-label="Réinitialiser la discussion"
                  className="rounded-xl p-2 hover:bg-white/10 text-white/80 hover:text-white transition"
                >
                  <TrashIcon className="h-4 w-4" />
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  aria-label="Fermer la fenêtre (Echap)"
                  className="hidden sm:flex rounded-xl p-2 hover:bg-white/10 text-white/80 hover:text-white transition"
                >
                  <XMarkIcon className="h-5 w-5" />
                </button>
              </div>
            </div>

            {/* Messages Scroll Area */}
            <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-[#f8fafc] dark:bg-[#071324]">
              {messages.map((msg, index) => {
                const isLastMsg = index === messages.length - 1;
                const showSuggestions = msg.role === 'assistant' && msg.suggestions && msg.suggestions.length > 0 && (
                  msg.id === 'welcome' ? messages.length === 1 : (isLastMsg && !isLoading)
                );

                return (
                  <div
                    key={msg.id}
                    className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}
                  >
                    <div
                      className={`max-w-[88%] sm:max-w-[85%] rounded-2xl p-3.5 ${
                        msg.role === 'user'
                          ? 'bg-[#13508F] text-white rounded-br-xs shadow-md'
                          : 'bg-white dark:bg-[#0f213e] text-slate-900 dark:text-slate-100 border border-slate-200/90 dark:border-blue-900/50 rounded-bl-xs shadow-sm'
                      }`}
                    >
                      {msg.role === 'assistant' ? (
                        renderFormattedContent(msg.content)
                      ) : (
                        <p className="text-[13.5px] sm:text-sm leading-relaxed text-white font-medium">{msg.content}</p>
                      )}
                    </div>

                    {showSuggestions && (
                      <div className="mt-2.5 flex flex-wrap gap-1.5 max-w-[95%] sm:max-w-[90%]">
                        {msg.suggestions!.map((sug, i) => (
                          <button
                            key={i}
                            type="button"
                            onClick={() => handleSend(sug)}
                            disabled={isLoading}
                            className="rounded-xl border border-blue-200/90 dark:border-blue-700/60 bg-white dark:bg-[#0f213e] px-3.5 py-2 text-xs text-[#0f3d6e] dark:text-[#7dd3fc] hover:bg-[#13508F] hover:text-white dark:hover:bg-[#3B9DF8] dark:hover:text-slate-950 hover:border-[#13508F] dark:hover:border-[#3B9DF8] transition-all font-semibold text-left shadow-xs active:scale-95"
                          >
                            {sug}
                          </button>
                        ))}
                      </div>
                    )}

                    <span className="text-[11px] text-slate-500 dark:text-slate-400 font-medium mt-1 px-1">
                      {msg.timestamp}
                    </span>
                  </div>
                );
              })}

              {isLoading && (
                <div className="flex flex-col items-start">
                  <div className="bg-white dark:bg-[#0f213e] text-slate-900 dark:text-slate-200 rounded-2xl rounded-bl-xs p-3.5 border border-slate-200/90 dark:border-blue-900/50 shadow-sm flex items-center gap-2 text-xs sm:text-sm font-medium">
                    <ArrowPathIcon className="h-4 w-4 animate-spin text-[#3B9DF8]" />
                    <span>COS prépare votre réponse...</span>
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
            <div className="p-3 border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0a192f] pb-[calc(0.75rem+env(safe-area-inset-bottom,0px))] shrink-0">
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
                    placeholder="Posez votre question à COS..."
                    disabled={isLoading}
                    className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-[#0f213e] px-4 py-3 sm:py-2.5 text-xs sm:text-sm text-slate-900 dark:text-white placeholder-slate-500 dark:placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#3B9DF8] focus:border-[#13508F] dark:focus:border-[#3B9DF8] disabled:opacity-50 pr-12 transition-all font-normal"
                  />
                  {input.length > 0 && (
                    <span
                      className={`absolute right-3 top-3.5 sm:top-2.5 text-[11px] ${
                        input.length > 500 ? 'text-red-500 font-bold' : 'text-slate-500 dark:text-slate-400 font-medium'
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
                  className="rounded-xl bg-[#13508F] hover:bg-[#0e3a6a] p-3 sm:p-2.5 text-white disabled:opacity-40 transition-all focus:outline-none focus:ring-2 focus:ring-[#3B9DF8] shrink-0 min-h-[40px] flex items-center justify-center"
                >
                  <PaperAirplaneIcon className="h-4 w-4" />
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
