'use client';

import { useMemo, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { slugify, truncateText } from '@/lib/utils';

type Privee = {
  ID: string;
  Type?: string;
  Nom: string;
  Désignation?: string;
  Sigle?: string;
  Localisation?: string;
  Creation?: string;
  Ouverture?: string;
  Contact?: string;
  Mail?: string;
  Site?: string;
  Adresse?: string;
  Responsable?: string;
  Facebook?: string;
  Logo?: string;
};

export function PriveesList({ items }: { items: Privee[] }) {
  const [query, setQuery] = useState('');

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return items;
    return items.filter((u) => {
      const nom = (u.Nom || '').toLowerCase();
      const sigle = (u.Sigle || '').toLowerCase();
      return nom.includes(q) || sigle.includes(q);
    });
  }, [items, query]);

  return (
    <div className="mt-8">
      <div className="max-w-xl mx-auto sm:mx-0">
        <label htmlFor="search" className="sr-only">Rechercher par sigle ou nom</label>
        <input
          id="search"
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Rechercher par sigle ou nom..."
          className="w-full rounded-xl border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 px-4 py-3 text-sm shadow-soft focus:outline-none focus:ring-2 focus:ring-primary-500"
        />
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filtered.map((u) => {
          const slug = `${u.Sigle ? slugify(u.Sigle) : slugify(u.Nom)}-${slugify(u.ID || u.Nom)}`;
          const logoSrc = u.Logo && u.Logo.trim() !== '' ? u.Logo : '/logo_appbar.png';
          const display = u.Sigle ? `${u.Sigle} — ${u.Nom}` : u.Nom;
          return (
            <Link
              key={u.ID}
              href={`/universites/privees/${slug}`}
              className="group rounded-2xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 p-3 sm:p-5 shadow-soft hover:shadow-medium transition-all flex items-center gap-3 sm:gap-4"
            >
              <div className="relative h-12 w-12 sm:h-14 sm:w-14 rounded-xl overflow-hidden bg-neutral-100 dark:bg-neutral-800 flex-shrink-0">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                {logoSrc.startsWith('http') ? (
                  <img src={logoSrc} alt={u.Nom} className="h-full w-full object-cover" />
                ) : (
                  <Image src={logoSrc} alt={u.Nom} fill className="object-contain" />
                )}
              </div>
              <div className="min-w-0">
                <h3 className="text-sm sm:text-base font-semibold text-neutral-900 dark:text-white truncate">
                  {display}
                </h3>
                <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 truncate">
                  {truncateText(u.Désignation || '', 90)}
                </p>
                <div className="mt-2 text-xs text-neutral-500 dark:text-neutral-400">
                  {u.Localisation || ''}
                </div>
              </div>
            </Link>
          );
        })}
        {filtered.length === 0 && (
          <div className="sm:col-span-2 lg:col-span-3 text-center text-neutral-600 dark:text-neutral-300">
            Aucune université trouvée.
          </div>
        )}
      </div>
    </div>
  );
}


