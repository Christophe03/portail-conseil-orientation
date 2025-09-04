'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ChevronDownIcon,
  QuestionMarkCircleIcon
} from '@heroicons/react/24/outline';

const faqs = [
  {
    question: "Comment fonctionne l'assistant IA ?",
    answer: "Notre assistant IA analyse votre profil académique, vos intérêts et vos objectifs pour vous proposer des parcours personnalisés. Il utilise des algorithmes avancés pour identifier les meilleures formations et métiers qui correspondent à votre profil."
  },
  {
    question: "L'application est-elle vraiment gratuite ?",
    answer: "Oui, l'application Conseil d'Orientation est entièrement gratuite. Toutes les fonctionnalités principales, y compris l'assistant IA, la recherche de bourses et les ressources éducatives, sont accessibles sans aucun coût."
  },
  {
    question: "Comment puis-je trouver des bourses d'études ?",
    answer: "Utilisez notre moteur de recherche de bourses qui analyse votre profil et vous propose les opportunités les plus pertinentes. Vous pouvez filtrer par pays, domaine d'études, niveau et montant de la bourse."
  },
  {
    question: "L'application fonctionne-t-elle hors ligne ?",
    answer: "Certaines fonctionnalités comme la consultation de votre profil et l'historique des recherches fonctionnent hors ligne. Cependant, pour les mises à jour des bourses et l'assistant IA, une connexion internet est nécessaire."
  },
  {
    question: "Comment puis-je contacter le support ?",
    answer: "Notre équipe de support est disponible 24/7 via le chat intégré dans l'application, par email à support@conseil-orientation.com, ou par téléphone au +33 1 23 45 67 89."
  },
  {
    question: "Mes données sont-elles sécurisées ?",
    answer: "Absolument. Nous respectons le RGPD et utilisons un chiffrement de niveau bancaire pour protéger vos données personnelles. Vos informations ne sont jamais partagées avec des tiers sans votre consentement explicite."
  },
  {
    question: "Puis-je utiliser l'app sur plusieurs appareils ?",
    answer: "Oui, votre compte se synchronise automatiquement sur tous vos appareils. Connectez-vous avec le même compte sur votre smartphone, tablette ou ordinateur pour accéder à vos données partout."
  },
  {
    question: "Comment l'application s'adapte-t-elle à mon niveau ?",
    answer: "L'application analyse votre parcours académique actuel et s'adapte automatiquement. Que vous soyez au lycée, en études supérieures ou en reconversion, les conseils et ressources sont adaptés à votre situation."
  }
];

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="section-padding bg-white dark:bg-neutral-900">
      <div className="container-custom">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-neutral-900 dark:text-white mb-6">
            Questions{' '}
            <span className="bg-gradient-to-r from-accent-600 to-warning-600 bg-clip-text text-transparent">
              Fréquentes
            </span>
          </h2>
          <p className="text-xl text-neutral-600 dark:text-neutral-400 max-w-3xl mx-auto">
            Trouvez rapidement des réponses aux questions les plus courantes 
            sur l'application Conseil d'Orientation.
          </p>
        </motion.div>

        {/* FAQ Items */}
        <div className="max-w-4xl mx-auto">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="mb-4"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full text-left p-6 bg-neutral-50 dark:bg-neutral-800 rounded-xl border border-neutral-200 dark:border-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-colors duration-200"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <QuestionMarkCircleIcon className="h-5 w-5 text-accent-500 flex-shrink-0" />
                    <span className="text-lg font-semibold text-neutral-900 dark:text-white">
                      {faq.question}
                    </span>
                  </div>
                  <ChevronDownIcon 
                    className={`h-5 w-5 text-neutral-500 transition-transform duration-200 ${
                      openIndex === index ? 'rotate-180' : ''
                    }`}
                  />
                </div>
              </button>
              
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 py-4 bg-neutral-50 dark:bg-neutral-800 border-t border-neutral-200 dark:border-neutral-700 rounded-b-xl">
                      <p className="text-neutral-700 dark:text-neutral-300 leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-center mt-12"
        >
          <p className="text-lg text-neutral-600 dark:text-neutral-400 mb-4">
            Vous ne trouvez pas la réponse à votre question ?
          </p>
          <button className="inline-flex items-center space-x-2 text-accent-600 hover:text-accent-700 font-semibold transition-colors duration-200">
            <span>Contacter notre équipe de support</span>
            <ChevronDownIcon className="h-4 w-4 rotate-[-90deg]" />
          </button>
        </motion.div>
      </div>
    </section>
  );
}
