'use client';

import { useState } from 'react';
import { ShareIcon, CheckIcon } from '@heroicons/react/24/outline';

interface ShareButtonProps {
  title: string;
  text?: string;
  url?: string;
  className?: string;
}

export function ShareButton({ title, text, url, className = '' }: ShareButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleShare = async () => {
    const shareUrl = url || (typeof window !== 'undefined' ? window.location.href : '');
    const shareData = {
      title,
      text: text || title,
      url: shareUrl,
    };

    if (typeof navigator !== 'undefined' && navigator.share && navigator.canShare && navigator.canShare(shareData)) {
      try {
        await navigator.share(shareData);
        return;
      } catch (err) {
        if ((err as Error).name !== 'AbortError') {
          console.error('Error sharing:', err);
        }
      }
    }

    // Fallback: Copy to clipboard
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      try {
        await navigator.clipboard.writeText(shareUrl);
        setCopied(true);
        setTimeout(() => setCopied(false), 2500);
      } catch (err) {
        console.error('Clipboard copy failed:', err);
      }
    }
  };

  return (
    <button
      onClick={handleShare}
      type="button"
      className={`relative inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-[#112240] hover:bg-slate-50 dark:hover:bg-slate-800/80 text-slate-700 dark:text-slate-200 text-xs sm:text-sm font-semibold transition-all duration-200 shadow-xs min-h-[42px] cursor-pointer ${className}`}
      title="Partager cette fiche"
      aria-label="Partager cette fiche"
    >
      {copied ? (
        <>
          <CheckIcon className="w-4 h-4 text-emerald-500 animate-in zoom-in" />
          <span className="text-emerald-600 dark:text-emerald-400 font-bold">Lien copié !</span>
        </>
      ) : (
        <>
          <ShareIcon className="w-4 h-4 text-[#3B9DF8]" />
          <span>Partager</span>
        </>
      )}
    </button>
  );
}
