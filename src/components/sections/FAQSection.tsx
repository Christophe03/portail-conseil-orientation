'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ChevronDownIcon,
  QuestionMarkCircleIcon
} from '@heroicons/react/24/outline';
import { FAQStructuredData } from '@/components/seo/StructuredData';

const faqs = [
  {
    question: "L'application Conseil d'Orientation est-elle 100% gratuite ?",
    answer: "Oui, l'application est entièrement gratuite pour tous les lycéens, bacheliers et étudiants du Mali. Vous pouvez télécharger l'APK, consulter les fiches des universités, simuler votre orientation par série de Bac et interagir avec l'assistant sans payer le moindre frais."
  },
  {
    question: "Comment savoir quelles facultés acceptent ma série de Baccalauréat ?",
    answer: "Rendez-vous dans la rubrique 'Par Série' de l'application ou sur la page /universites/series de ce portail. Sélectionnez votre série (ex: TSE, TSExp, TSS, TLL, STI, TSEco) : la liste de toutes les facultés publiques (FST, FSEG, FSAP, FMOS, etc.) et instituts privés compatibles s'affiche immédiatement avec les conditions d'admission."
  },
  {
    question: "L'application fonctionne-t-elle sans connexion Internet (hors ligne) ?",
    answer: "Oui ! Le répertoire des universités, la liste des séries de Bac et les critères d'admission sont stockés localement sur votre téléphone. Vous pouvez y accéder même sans forfait internet au village ou en zone à faible couverture réseau."
  },
  {
    question: "Comment installer l'application sur un smartphone Android ?",
    answer: "Téléchargez le fichier APK depuis notre page Télécharger ou via APKPure. Si Android vous demande confirmation, autorisez l'installation depuis votre navigateur, puis appuyez sur 'Installer'. Le fichier pèse environ 15 Mo et s'installe en moins d'une minute."
  },
  {
    question: "Quelles sont les universités publiques répertoriées au Mali ?",
    answer: "Nous répertorions l'ensemble des universités et grandes écoles publiques d'État : l'USTTB (Sciences et Techniques), l'ULSHB (Lettres et Sciences Humaines), l'USSGB (Sciences Sociales et Gestion), l'USJPB (Sciences Juridiques et Politiques), l'Université de Ségou, ainsi que l'ENI-ABT, l'IPR-IFRA et l'ENSup."
  },
  {
    question: "Comment contacter l'équipe pour une assistance personnalisée ?",
    answer: "Vous pouvez nous joindre instantanément sur WhatsApp au +223 92 72 25 64 ou par téléphone au +223 96 85 52 82. Vous pouvez également nous écrire par email à conseilorientationinfo@gmail.com ou remplir le formulaire ci-dessous."
  }
];

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-16 sm:py-24 bg-white dark:bg-[#0a192f] border-b border-slate-200 dark:border-slate-800">
      <FAQStructuredData faqs={faqs} />
      <div className="container-custom">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#13508F]/10 dark:bg-[#3B9DF8]/10 text-[#13508F] dark:text-[#3B9DF8] text-xs font-bold uppercase tracking-wider mb-4">
            Questions Fréquentes
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-4">
            Tout ce que vous devez{' '}
            <span className="text-[#13508F] dark:text-[#3B9DF8]">savoir</span>
          </h2>
          <p className="text-slate-600 dark:text-slate-300 text-base sm:text-lg">
            Retrouvez les réponses aux interrogations les plus courantes des bacheliers et étudiants maliens.
          </p>
        </motion.div>

        {/* FAQ Items */}
        <div className="max-w-3xl mx-auto space-y-3.5">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              className="rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden bg-white dark:bg-[#112240] shadow-xs"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full text-left p-5 sm:p-6 flex items-center justify-between gap-4 transition-colors hover:bg-slate-50 dark:hover:bg-slate-800/50"
              >
                <div className="flex items-center gap-3.5">
                  <div className="w-8 h-8 rounded-lg bg-[#13508F]/10 dark:bg-[#3B9DF8]/10 text-[#13508F] dark:text-[#3B9DF8] flex items-center justify-center flex-shrink-0">
                    <QuestionMarkCircleIcon className="h-5 w-5" />
                  </div>
                  <span className="text-sm sm:text-base font-bold text-slate-900 dark:text-white">
                    {faq.question}
                  </span>
                </div>
                <ChevronDownIcon 
                  className={`h-5 w-5 text-slate-400 flex-shrink-0 transition-transform duration-200 ${
                    openIndex === index ? 'rotate-180 text-[#13508F] dark:text-[#3B9DF8]' : ''
                  }`}
                />
              </button>
              
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.25 }}
                    className="overflow-hidden"
                  >
                    <div className="px-5 sm:px-6 pb-6 pt-2 border-t border-slate-100 dark:border-slate-800 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed pl-16">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-12">
          <p className="text-sm text-slate-500 dark:text-slate-400 mb-3">
            Vous avez une question particulière sur une faculté ou un concours ?
          </p>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#13508F] dark:text-[#3B9DF8] hover:underline"
          >
            <span>Poser une question à notre équipe</span>
            <span>→</span>
          </a>
        </div>
      </div>
    </section>
  );
}
