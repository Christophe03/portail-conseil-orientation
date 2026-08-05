'use client';

import { useMemo, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { slugify, truncateText } from '@/lib/utils';
import { MapPinIcon } from '@heroicons/react/24/outline';

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

const bamakoRegex = /(bamako|hamdallaye|aci|sogoniko|sébénikoro|djélibougou|quinzambougou|boulkassoumbougou|banankabougou|magnambougou|niamakoro|hippodrome|bacodjicoroni|kalabancoura|kalabancoro|yirimadio|sotuba|sénou|kabala)/i;

function normalizeCity(loc?: any): string {
  const str = String(loc || '').trim();
  if (!str) return 'Non renseignée';
  const l = str.toLowerCase();
  if (bamakoRegex.test(l)) return 'Bamako';
  if (l.includes('kati')) return 'Kati';
  if (l.includes('ségou') || l.includes('segou')) return 'Ségou';
  if (l.includes('kayes')) return 'Kayes';
  if (l.includes('sikasso')) return 'Sikasso';
  if (l.includes('mopti')) return 'Mopti';
  if (l.includes('gao')) return 'Gao';
  if (l.includes('tombouctou')) return 'Tombouctou';
  if (l.includes('koutiala')) return 'Koutiala';
  if (l.includes('kita')) return 'Kita';
  if (l.includes('koulikoro')) return 'Koulikoro';
  return str;
}

function getInitials(sigle?: any): string {
  const str = String(sigle || '').trim();
  if (!str) return 'UN';
  return str.split(' ').map(w => w[0]).join('').substring(0, 2).toUpperCase();
}

export function PriveesList({ items }: { items: Privee[] }) {
  const [query, setQuery] = useState('');
  const [selectedCity, setSelectedCity] = useState('Toutes les villes');

  const cityCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    items.forEach(item => {
      const city = normalizeCity(item.Localisation);
      counts[city] = (counts[city] || 0) + 1;
    });
    return Object.entries(counts).sort((a, b) => a[0].localeCompare(b[0]));
  }, [items]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return items.filter((u) => {
      const nom = (u.Nom || '').toLowerCase();
      const sigle = (u.Sigle || '').toLowerCase();
      const matchSearch = !q || nom.includes(q) || sigle.includes(q);
      const matchCity = selectedCity === 'Toutes les villes' || normalizeCity(u.Localisation) === selectedCity;
      return matchSearch && matchCity;
    });
  }, [items, query, selectedCity]);

  return (
    <div className="mt-8">
      <div className="flex flex-col sm:flex-row gap-4 mb-4">
        <div className="flex-1">
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
        <div className="sm:w-64">
          <label htmlFor="cityFilter" className="sr-only">Filtrer par ville</label>
          <select
            id="cityFilter"
            value={selectedCity}
            onChange={(e) => setSelectedCity(e.target.value)}
            className="w-full rounded-xl border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 px-4 py-3 text-sm shadow-soft focus:outline-none focus:ring-2 focus:ring-primary-500"
          >
            <option value="Toutes les villes">Toutes les villes</option>
            {cityCounts.map(([city, count]) => (
              <option key={city} value={city}>{city} ({count})</option>
            ))}
          </select>
        </div>
      </div>
      
      <div className="text-sm text-neutral-600 dark:text-neutral-400 mb-6">
        {filtered.length} résultat(s)
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filtered.map((u) => {
          const slug = `${u.Sigle ? slugify(u.Sigle) : slugify(u.Nom)}-${slugify(u.ID || u.Nom)}`;
          const hasLogo = u.Logo && u.Logo.trim() !== '';
          const logoSrc = hasLogo ? u.Logo! : '';
          
          return (
            <Link
              key={u.ID}
              href={`/universites/privees/${slug}`}
              className="group w-full rounded-2xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 p-3 sm:p-5 shadow-soft hover:shadow-medium transition-all flex items-start gap-3 sm:gap-4 flex-col sm:flex-row"
            >
              <div className="flex gap-3 sm:gap-4 w-full items-start">
                <div className="relative h-12 w-12 sm:h-14 sm:w-14 rounded-xl overflow-hidden bg-neutral-100 dark:bg-neutral-800 flex-shrink-0 flex items-center justify-center">
                  {hasLogo ? (
                    logoSrc.startsWith('http') ? (
                      /* eslint-disable-next-line @next/next/no-img-element */
                      <img src={logoSrc} alt={u.Nom} className="h-full w-full object-cover" />
                    ) : (
                      <Image src={logoSrc} alt={u.Nom} fill className="object-contain" />
                    )
                  ) : (
                    <div className="h-full w-full bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 font-bold flex items-center justify-center text-lg">
                      {getInitials(u.Sigle || u.Nom)}
                    </div>
                  )}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    {u.Sigle && (
                      <span className="inline-block rounded-full bg-primary-100 px-2 py-0.5 text-xs text-primary-700 dark:bg-primary-900/30 dark:text-primary-300">
                        {u.Sigle}
                      </span>
                    )}
                    <span className="inline-block rounded-full bg-amber-50 px-2 py-0.5 text-xs text-amber-700 dark:bg-amber-900/30 dark:text-amber-300">
                      Privée
                    </span>
                  </div>
                  <h3 className="text-sm sm:text-base font-semibold text-neutral-900 dark:text-white break-words sm:line-clamp-2">
                    {u.Nom}
                  </h3>
                  {u.Localisation && (
                    <div className="mt-1.5 flex items-center gap-1 text-xs text-neutral-500 dark:text-neutral-400">
                      <MapPinIcon className="h-3.5 w-3.5 flex-shrink-0" />
                      <span className="truncate">{u.Localisation}</span>
                    </div>
                  )}
                </div>
              </div>
            </Link>
          );
        })}
        {filtered.length === 0 && (
          <div className="sm:col-span-2 lg:col-span-3 xl:col-span-4 text-center text-neutral-600 dark:text-neutral-300 py-8">
            Aucune université trouvée.
          </div>
        )}
      </div>
    </div>
  );
}
