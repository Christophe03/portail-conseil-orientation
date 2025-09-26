import data from '@/data/universites_privees.json';
import { PriveesList } from '@/components/sections/PriveesList';

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

const universites: Privee[] = data as unknown as Privee[];

export const metadata = {
  title: 'Universités privées',
  description: 'Liste des universités privées au Mali avec sigle et nom.',
};

export default function PriveesPage() {
  const items = universites
    .filter((u) => (u.Nom && u.Nom.trim().length > 0))
    .sort((a, b) => a.Nom.localeCompare(b.Nom));

  return (
    <section className="container-custom pt-28 pb-16">
      <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-neutral-900 dark:text-white text-center">
        Universités privées
      </h1>
      <div className="mt-3 flex flex-col items-center gap-2">
        <p className="text-neutral-600 dark:text-neutral-300 text-center">
          Recherchez par sigle ou nom, puis cliquez pour voir les détails.
        </p>
        <span className="text-xs px-2 py-1 rounded-full bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300">
          {items.length} universités privées
        </span>
      </div>
      <PriveesList items={items} />
    </section>
  );
}


