'use client';

import { motion } from 'framer-motion';

export function APIDocumentation() {
  return (
    <section id="api" className="mb-16">
      {/* SDK Section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="bg-gradient-to-r from-primary-50 to-accent-50 dark:from-primary-900/20 dark:to-accent-900/20 rounded-2xl p-8 border border-primary-200 dark:border-primary-700"
      >
        <div className="text-center">
          <h3 className="text-2xl font-bold text-neutral-900 dark:text-white mb-6">
            🚀 Kits de Développement (SDK)
          </h3>
          <p className="text-lg text-neutral-600 dark:text-neutral-400 max-w-3xl mx-auto mb-8">
            Simplifiez l'intégration avec nos SDK officiels pour JavaScript, Python, 
            et d'autres langages populaires.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href="mailto:conseilorientationinfo@gmail.com?subject=Demande%20SDK%20JavaScript" className="px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white rounded-xl font-semibold transition-colors duration-200">
              SDK JavaScript
            </a>
            <a href="mailto:conseilorientationinfo@gmail.com?subject=Demande%20SDK%20Python" className="px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white rounded-xl font-semibold transition-colors duration-200">
              SDK Python
            </a>
            <a href="mailto:conseilorientationinfo@gmail.com?subject=Demande%20SDK%20Conseil%20d%27Orientation" className="px-6 py-3 border-2 border-primary-600 text-primary-600 hover:bg-primary-600 hover:text-white rounded-xl font-semibold transition-all duration-200">
              Voir Tous les SDK
            </a>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
