'use client';

import { useRouter } from 'next/navigation';
import type { ReactNode } from 'react';

type BackLinkProps = {
  fallbackHref: string;
  children: ReactNode;
  className?: string;
};

export function BackLink({ fallbackHref, children, className }: BackLinkProps) {
  const router = useRouter();

  const handleBack = () => {
    const referrer = document.referrer;

    try {
      if (referrer && new URL(referrer).origin === window.location.origin) {
        router.back();
        return;
      }
    } catch {
      // Keep the fallback for malformed referrers.
    }

    router.push(fallbackHref);
  };

  return (
    <button type="button" onClick={handleBack} className={className}>
      {children}
    </button>
  );
}
