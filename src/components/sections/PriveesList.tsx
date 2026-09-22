'use client';

import { useMemo, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { slugify } from '@/lib/utils';
import { 
  MapPinIcon, 
  MagnifyingGlassIcon, 
  XMarkIcon,
  BuildingOffice2Icon,
  ArrowRightIcon 
} from '@heroicons/react/24/outline';

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

  const resetFilters = () => {
    setQuery('');
    setSelectedCity('Toutes les villes');
  };

  return (
    <div className="mt-8">
      {/* Search and Filters Toolbar */}
      <div className="glass-panel p-4 rounded-2xl shadow-sm mb-6 flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <label htmlFor="search" className="sr-only">Rechercher par sigle ou nom</label>
          <MagnifyingGlassIcon className="absolute left-3.5 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
          <input
            id="search"
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Rechercher une université, un institut ou un sigle..."
            className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-[#112240] pl-10 pr-10 py-3 text-sm text-[#13508f] dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#3b9df8] dark:focus:ring-[#3b9df8] transition-all"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-slate-600 dark:hover:text-white rounded-md"
              aria-label="Effacer la recherche"
            >
              <XMarkIcon className="h-4 w-4" />
            </button>
          )}
        </div>

        <div className="sm:w-64">
          <label htmlFor="cityFilter" className="sr-only">Filtrer par ville</label>
          <select
            id="cityFilter"
            value={selectedCity}
            onChange={(e) => setSelectedCity(e.target.value)}
            className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-[#112240] px-4 py-3 text-sm text-[#13508f] dark:text-white focus:outline-none focus:ring-2 focus:ring-[#3b9df8] dark:focus:ring-[#3b9df8] transition-all"
          >
            <option value="Toutes les villes">Toutes les villes</option>
            {cityCounts.map(([city, count]) => (
              <option key={city} value={city}>{city} ({count})</option>
            ))}
          </select>
        </div>
      </div>
      
      {/* Result Status & Clear Shortcut */}
      <div className="flex items-center justify-between text-sm text-slate-600 dark:text-slate-400 mb-6 px-1">
        <div>
          <span className="font-bold text-[#13508f] dark:text-[#3b9df8]">{filtered.length}</span> établissement(s) répertorié(s)
          {selectedCity !== 'Toutes les villes' && (
            <span className="ml-1.5 text-xs bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-full">
              Ville : {selectedCity}
            </span>
          )}
        </div>
        {(query || selectedCity !== 'Toutes les villes') && (
          <button
            onClick={resetFilters}
            className="text-xs text-[#3b9df8] hover:underline font-semibold"
          >
            Réinitialiser les filtres
          </button>
        )}
      </div>

      {/* Cards Grid */}
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filtered.map((u) => {
          const slug = `${u.Sigle ? slugify(u.Sigle) : slugify(u.Nom)}-${slugify(u.ID || u.Nom)}`;
          const hasLogo = u.Logo && u.Logo.trim() !== '';
          const logoSrc = hasLogo ? u.Logo! : '';
          
          return (
            <Link
              key={u.ID}
              href={`/universites/privees/${slug}`}
              className="group rounded-2xl border border-slate-200/80 dark:border-slate-800/80 bg-white dark:bg-[#112240] p-5 shadow-card hover:shadow-card-hover transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start gap-3.5 mb-3.5">
                  <div className="relative h-12 w-12 rounded-xl overflow-hidden bg-slate-100 dark:bg-slate-800/80 flex-shrink-0 flex items-center justify-center border border-slate-200/60 dark:border-slate-700/60">
                    {hasLogo ? (
                      logoSrc.startsWith('http') ? (
                        /* eslint-disable-next-line @next/next/no-img-element */
                        <img src={logoSrc} alt={u.Nom} className="h-full w-full object-cover" />
                      ) : (
                        <Image src={logoSrc} alt={u.Nom} fill className="object-contain p-1" />
                      )
                    ) : (
                      <div className="h-full w-full bg-[#13508f]/10 dark:bg-[#13508f]/30 text-[#13508f] dark:text-[#3b9df8] font-bold flex items-center justify-center text-sm">
                        {getInitials(u.Sigle || u.Nom)}
                      </div>
                    )}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-1.5 mb-1">
                      {u.Sigle && (
                        <span className="inline-block rounded-md bg-[#13508f]/10 text-[#13508f] dark:bg-[#13508f]/30 dark:text-[#7cc5fb] px-2 py-0.5 text-xs font-bold">
                          {u.Sigle}
                        </span>
                      )}
                      <span className="inline-block rounded-md bg-[#3b9df8]/15 text-[#0e4379] dark:bg-[#3b9df8]/25 dark:text-[#7cc5fb] px-2 py-0.5 text-[11px] font-semibold">
                        Privée Agréée
                      </span>
                    </div>
                    {u.Localisation && (
                      <div className="flex items-center gap-1 text-xs text-slate-500 dark:text-slate-400">
                        <MapPinIcon className="h-3.5 w-3.5 flex-shrink-0 text-slate-400" />
                        <span className="truncate">{normalizeCity(u.Localisation)}</span>
                      </div>
                    )}
                  </div>
                </div>

                <h3 className="text-sm font-semibold text-[#13508f] dark:text-white group-hover:text-[#3b9df8] transition-colors line-clamp-2 leading-snug">
                  {u.Nom}
                </h3>
              </div>

              <div className="pt-4 mt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 group-hover:text-[#13508f] dark:group-hover:text-white transition-colors">
                <span className="font-medium">Consulter la fiche</span>
                <ArrowRightIcon className="h-3.5 w-3.5 transform group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          );
        })}

        {filtered.length === 0 && (
          <div className="sm:col-span-2 lg:col-span-3 xl:col-span-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-[#112240]/50 p-12 text-center">
            <BuildingOffice2Icon className="h-12 w-12 text-[#3b9df8] mx-auto mb-3" />
            <h4 className="text-base font-bold text-[#13508f] dark:text-white mb-1">
              Aucun établissement ne correspond à votre recherche
            </h4>
            <p className="text-sm text-slate-500 dark:text-slate-400 mb-4 max-w-md mx-auto">
              Essayez de modifier votre mot-clé ou de réinitialiser le filtre de localisation.
            </p>
            <button
              onClick={resetFilters}
              className="inline-flex items-center px-4 py-2 rounded-xl bg-[#13508f] hover:bg-[#0e4379] text-white dark:bg-[#3b9df8] dark:hover:bg-[#2589ec] font-semibold text-xs shadow-sm transition-all"
            >
              Réinitialiser tous les filtres
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
