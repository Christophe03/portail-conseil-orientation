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
  ArrowRightIcon,
  PhoneIcon,
  GlobeAltIcon,
  EnvelopeIcon,
  CheckBadgeIcon,
  ChevronLeftIcon,
  ChevronRightIcon
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

const TOP_CITIES = ['Toutes les villes', 'Bamako', 'Kati', 'Ségou', 'Sikasso', 'Kayes'];

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

function getInitials(sigle?: any, nom?: string): string {
  const str = String(sigle || nom || '').trim();
  if (!str) return 'UN';
  return str.split(' ').map(w => w[0]).filter(Boolean).join('').substring(0, 2).toUpperCase();
}

const ITEMS_PER_PAGE = 18;

export function PriveesList({ items }: { items: Privee[] }) {
  const [query, setQuery] = useState('');
  const [selectedCity, setSelectedCity] = useState('Toutes les villes');
  const [currentPage, setCurrentPage] = useState(1);

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

  // Reset pagination when search or filter changes
  const handleQueryChange = (val: string) => {
    setQuery(val);
    setCurrentPage(1);
  };

  const handleCityChange = (city: string) => {
    setSelectedCity(city);
    setCurrentPage(1);
  };

  const resetFilters = () => {
    setQuery('');
    setSelectedCity('Toutes les villes');
    setCurrentPage(1);
  };

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paginatedItems = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filtered.slice(start, start + ITEMS_PER_PAGE);
  }, [filtered, currentPage]);

  return (
    <div className="mt-8">
      {/* Search and Filters Toolbar */}
      <div className="bg-white dark:bg-[#112240] p-4 sm:p-5 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-card mb-6">
        <div className="flex flex-col sm:flex-row gap-3 mb-4">
          {/* Search Bar */}
          <div className="relative flex-1">
            <label htmlFor="search" className="sr-only">Rechercher une université</label>
            <MagnifyingGlassIcon className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
            <input
              id="search"
              type="text"
              value={query}
              onChange={(e) => handleQueryChange(e.target.value)}
              placeholder="Rechercher par nom (ex: Technolab, Sup'Management...) ou sigle..."
              className="w-full rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-[#0a192f] pl-11 pr-10 py-3.5 text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#3B9DF8] transition-all"
            />
            {query && (
              <button
                onClick={() => handleQueryChange('')}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-slate-600 dark:hover:text-white rounded-md"
                aria-label="Effacer la recherche"
              >
                <XMarkIcon className="h-4 w-4" />
              </button>
            )}
          </div>

          {/* City Select Dropdown (All cities) */}
          <div className="sm:w-60">
            <label htmlFor="cityFilter" className="sr-only">Filtrer par ville</label>
            <select
              id="cityFilter"
              value={selectedCity}
              onChange={(e) => handleCityChange(e.target.value)}
              className="w-full rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-[#0a192f] px-4 py-3.5 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#3B9DF8] transition-all font-medium"
            >
              <option value="Toutes les villes">Toutes les localisations</option>
              {cityCounts.map(([city, count]) => (
                <option key={city} value={city}>{city} ({count})</option>
              ))}
            </select>
          </div>
        </div>

        {/* Quick City Pills for fast filtering */}
        <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-100 dark:border-slate-800">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400 mr-1">Villes :</span>
          {TOP_CITIES.map((city) => (
            <button
              key={city}
              onClick={() => handleCityChange(city)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                selectedCity === city
                  ? 'bg-[#13508F] text-white shadow-xs'
                  : 'bg-slate-100 dark:bg-[#0a192f] text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-800'
              }`}
            >
              {city}
            </button>
          ))}
        </div>
      </div>
      
      {/* Result Status & Clear Shortcut */}
      <div className="flex flex-wrap items-center justify-between gap-2 text-xs sm:text-sm text-slate-500 dark:text-slate-400 mb-6 px-1">
        <div>
          Affichage de <span className="font-bold text-[#13508F] dark:text-[#3B9DF8]">{filtered.length}</span> établissement(s) privé(s)
          {selectedCity !== 'Toutes les villes' && (
            <span className="ml-2 px-2.5 py-0.5 rounded-full bg-[#13508F]/10 dark:bg-[#3B9DF8]/10 text-[#13508F] dark:text-[#3B9DF8] font-semibold text-xs">
              Ville : {selectedCity}
            </span>
          )}
          {totalPages > 1 && (
            <span className="ml-2 text-slate-400">
              (Page {currentPage} sur {totalPages})
            </span>
          )}
        </div>
        {(query || selectedCity !== 'Toutes les villes') && (
          <button
            onClick={resetFilters}
            className="text-xs text-[#13508F] dark:text-[#3B9DF8] hover:underline font-bold"
          >
            Réinitialiser les filtres
          </button>
        )}
      </div>

      {/* Cards Grid */}
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {paginatedItems.map((u) => {
          const slug = `${u.Sigle ? slugify(u.Sigle) : slugify(u.Nom)}-${slugify(u.ID || u.Nom)}`;
          const hasLogo = u.Logo && u.Logo.trim() !== '' && u.Logo.trim() !== '/logo_appbar.png';
          const logoSrc = hasLogo ? u.Logo! : '';
          const initials = getInitials(u.Sigle, u.Nom);
          const cleanPhone = String(u.Contact || '').trim();

          return (
            <Link
              key={u.ID}
              href={`/universites/privees/${slug}`}
              className="group rounded-3xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-[#112240] p-6 shadow-card hover:border-[#13508F]/50 dark:hover:border-[#3B9DF8]/50 hover:shadow-lg transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Header with Logo & Badges */}
                <div className="flex items-start gap-4 mb-4">
                  <div className="relative h-14 w-14 rounded-2xl overflow-hidden bg-slate-50 dark:bg-slate-800 flex-shrink-0 flex items-center justify-center border border-slate-200 dark:border-slate-700 p-1">
                    {hasLogo ? (
                      logoSrc.startsWith('http') ? (
                        /* eslint-disable-next-line @next/next/no-img-element */
                        <img src={logoSrc} alt={u.Nom} className="h-full w-full object-contain" />
                      ) : (
                        <Image src={logoSrc} alt={u.Nom} fill className="object-contain p-1" />
                      )
                    ) : (
                      <div className="h-full w-full bg-[#13508F]/10 dark:bg-[#3B9DF8]/15 text-[#13508F] dark:text-[#3B9DF8] font-black flex items-center justify-center text-sm">
                        {initials}
                      </div>
                    )}
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-1.5 mb-1.5">
                      {u.Sigle && (
                        <span className="inline-block rounded-md bg-[#13508F] text-white px-2 py-0.5 text-xs font-black shadow-2xs">
                          {u.Sigle}
                        </span>
                      )}
                      <span className="inline-flex items-center gap-1 rounded-md bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 px-2 py-0.5 text-[11px] font-semibold border border-emerald-500/20">
                        <CheckBadgeIcon className="w-3 h-3" />
                        <span>Agréée</span>
                      </span>
                    </div>

                    {u.Localisation && (
                      <div className="flex items-center gap-1 text-xs text-slate-500 dark:text-slate-400">
                        <MapPinIcon className="h-3.5 w-3.5 flex-shrink-0 text-[#3B9DF8]" />
                        <span className="truncate">{normalizeCity(u.Localisation)}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* University Name */}
                <h3 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-[#13508F] dark:group-hover:text-[#3B9DF8] transition-colors line-clamp-2 leading-snug mb-3">
                  {u.Nom}
                </h3>

                {u.Désignation && (
                  <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-1 mb-3">
                    {u.Désignation}
                  </p>
                )}

                {/* Contact preview snippet if available */}
                {cleanPhone && (
                  <div className="flex items-center gap-1.5 text-xs text-slate-600 dark:text-slate-300 py-1.5 px-2.5 rounded-lg bg-slate-50 dark:bg-[#0a192f] border border-slate-100 dark:border-slate-800/80 mb-2">
                    <PhoneIcon className="w-3.5 h-3.5 text-[#3B9DF8] flex-shrink-0" />
                    <span className="truncate">{cleanPhone}</span>
                  </div>
                )}
              </div>

              {/* Card Footer Action */}
              <div className="pt-4 mt-2 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-xs font-semibold text-[#13508F] dark:text-[#3B9DF8] group-hover:underline">
                <span>Voir la fiche & filières</span>
                <ArrowRightIcon className="h-3.5 w-3.5 transform group-hover:translate-x-1.5 transition-transform" />
              </div>
            </Link>
          );
        })}

        {filtered.length === 0 && (
          <div className="sm:col-span-2 lg:col-span-3 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#112240] p-12 text-center shadow-card">
            <BuildingOffice2Icon className="h-12 w-12 text-[#3B9DF8] mx-auto mb-3" />
            <h4 className="text-base font-bold text-slate-900 dark:text-white mb-1">
              Aucun établissement ne correspond à votre recherche
            </h4>
            <p className="text-sm text-slate-500 dark:text-slate-400 mb-5 max-w-md mx-auto">
              Vérifiez l'orthographe du mot-clé ou sélectionnez "Toutes les villes" pour voir les {items.length} établissements disponibles.
            </p>
            <button
              onClick={resetFilters}
              className="inline-flex items-center px-5 py-2.5 rounded-xl bg-[#13508F] hover:bg-[#0e3a6a] text-white font-semibold text-xs shadow-sm transition-all"
            >
              Réinitialiser tous les filtres
            </button>
          </div>
        )}
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="mt-12 flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-2xl bg-white dark:bg-[#112240] border border-slate-200 dark:border-slate-800 shadow-xs">
          <button
            onClick={() => {
              setCurrentPage(p => Math.max(1, p - 1));
              window.scrollTo({ top: 300, behavior: 'smooth' });
            }}
            disabled={currentPage === 1}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 disabled:opacity-40 disabled:pointer-events-none transition-colors"
          >
            <ChevronLeftIcon className="w-4 h-4" />
            <span>Page précédente</span>
          </button>

          <div className="flex items-center gap-1 text-xs">
            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              // Sliding window around currentPage
              let pageNum = i + 1;
              if (totalPages > 5) {
                if (currentPage > 3) {
                  pageNum = currentPage - 2 + i;
                  if (pageNum > totalPages) pageNum = totalPages - 4 + i;
                }
              }
              return (
                <button
                  key={pageNum}
                  onClick={() => {
                    setCurrentPage(pageNum);
                    window.scrollTo({ top: 300, behavior: 'smooth' });
                  }}
                  className={`w-8 h-8 rounded-xl font-bold flex items-center justify-center transition-all ${
                    currentPage === pageNum
                      ? 'bg-[#13508F] text-white shadow-xs'
                      : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                >
                  {pageNum}
                </button>
              );
            })}
          </div>

          <button
            onClick={() => {
              setCurrentPage(p => Math.min(totalPages, p + 1));
              window.scrollTo({ top: 300, behavior: 'smooth' });
            }}
            disabled={currentPage === totalPages}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 disabled:opacity-40 disabled:pointer-events-none transition-colors"
          >
            <span>Page suivante</span>
            <ChevronRightIcon className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
}
