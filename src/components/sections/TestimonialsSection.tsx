'use client';

import { motion } from 'framer-motion';
import { StarIcon, ChatBubbleLeftRightIcon } from '@heroicons/react/24/solid';

const testimonials = [
  {
    name: 'Marie Dubois',
    role: 'Étudiante en Master',
    university: 'Sorbonne Université',
    rating: 5,
    content: 'Cette application a complètement transformé mon approche de l\'orientation. L\'assistant IA m\'a aidée à identifier des formations que je n\'aurais jamais découvertes autrement. Je recommande à tous les étudiants !',
    avatar: '👩‍🎓',
    delay: 0.1,
  },
  {
    name: 'Thomas Martin',
    role: 'Étudiant en Licence',
    university: 'Université de Lyon',
    rating: 5,
    content: 'Grâce aux bourses d\'études, j\'ai pu financer mes études à l\'étranger. L\'application est intuitive et les notifications m\'ont permis de ne manquer aucune opportunité.',
    avatar: '👨‍🎓',
    delay: 0.2,
  },
  {
    name: 'Sophie Bernard',
    role: 'Étudiante en BTS',
    university: 'Lycée Technique',
    rating: 5,
    content: 'Les ressources éducatives sont exceptionnelles. J\'ai pu explorer différents métiers et comprendre les débouchés de ma formation. L\'interface est moderne et agréable à utiliser.',
    avatar: '👩‍💼',
    delay: 0.3,
  },
  {
    name: 'Lucas Moreau',
    role: 'Étudiant en Doctorat',
    university: 'École Centrale',
    rating: 5,
    content: 'En tant qu\'étudiant en recherche, j\'apprécie particulièrement la qualité des conseils et la pertinence des recommandations. L\'application s\'adapte parfaitement à mon profil.',
    avatar: '👨‍🔬',
    delay: 0.4,
  },
  {
    name: 'Emma Rousseau',
    role: 'Étudiante en École de Commerce',
    university: 'HEC Paris',
    rating: 5,
    content: 'L\'assistant IA est incroyablement intelligent. Il m\'a guidée dans mes choix de spécialisation et m\'a aidée à construire un parcours cohérent avec mes objectifs.',
    avatar: '👩‍💻',
    delay: 0.5,
  },
  {
    name: 'Alexandre Petit',
    role: 'Étudiant en École d\'Ingénieur',
    university: 'Polytechnique',
    rating: 5,
    content: 'La gestion des bourses est parfaite. J\'ai pu postuler à plusieurs programmes internationaux et suivre mes candidatures facilement. Une vraie révolution !',
    avatar: '👨‍🔧',
    delay: 0.6,
  },
];

const stats = [
  { label: 'Utilisateurs Satisfaits', value: '98%', color: 'text-green-600' },
  { label: 'Note Moyenne', value: '4.8/5', color: 'text-yellow-600' },
  { label: 'Recommandations', value: '95%', color: 'text-blue-600' },
  { label: 'Temps de Réponse', value: '< 2h', color: 'text-purple-600' },
];

export function TestimonialsSection() {
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
            Ce que disent nos{' '}
            <span className="bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
              Utilisateurs
            </span>
          </h2>
          <p className="text-xl text-neutral-600 dark:text-neutral-400 max-w-3xl mx-auto">
            Découvrez les témoignages d'étudiants qui ont transformé leur parcours 
            grâce à notre application de conseil d'orientation.
          </p>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16"
        >
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className={`text-3xl md:text-4xl font-bold ${stat.color} mb-2`}>
                {stat.value}
              </div>
              <div className="text-neutral-600 dark:text-neutral-400 text-sm">
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: testimonial.delay }}
              whileHover={{ y: -8 }}
              className="card-hover p-6 h-full"
            >
              {/* Quote Icon */}
              <div className="flex justify-between items-start mb-4">
                <ChatBubbleLeftRightIcon className="h-8 w-8 text-primary-400" />
                <div className="flex space-x-1">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <StarIcon key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                  ))}
                </div>
              </div>

              {/* Content */}
              <p className="text-neutral-700 dark:text-neutral-300 mb-6 text-sm leading-relaxed">
                "{testimonial.content}"
              </p>

              {/* Author */}
              <div className="flex items-center space-x-3">
                <div className="text-2xl">{testimonial.avatar}</div>
                <div>
                  <div className="font-semibold text-neutral-900 dark:text-white">
                    {testimonial.name}
                  </div>
                  <div className="text-sm text-neutral-600 dark:text-neutral-400">
                    {testimonial.role}
                  </div>
                  <div className="text-xs text-primary-600 dark:text-primary-400">
                    {testimonial.university}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Overall Rating */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-center mb-16"
        >
          <div className="bg-gradient-to-r from-primary-50 to-secondary-50 dark:from-neutral-800 dark:to-neutral-700 rounded-2xl p-8 md:p-12">
            <div className="flex items-center justify-center space-x-2 mb-4">
              {[...Array(5)].map((_, i) => (
                <StarIcon key={i} className="h-8 w-8 text-yellow-400 fill-current" />
              ))}
            </div>
            <h3 className="text-2xl md:text-3xl font-bold text-neutral-900 dark:text-white mb-2">
              Note Moyenne de 4.8/5
            </h3>
            <p className="text-lg text-neutral-600 dark:text-neutral-400 mb-6 max-w-2xl mx-auto">
              Basée sur plus de 10,000 avis d'utilisateurs satisfaits de notre application.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="btn-primary btn-lg">
                Lire Tous les Avis
              </button>
              <button className="btn-outline btn-lg">
                Laisser un Avis
              </button>
            </div>
          </div>
        </motion.div>

        {/* Trust Indicators */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 1.0 }}
          className="text-center"
        >
          <div className="bg-white dark:bg-neutral-800 rounded-2xl p-8 shadow-soft">
            <h3 className="text-2xl font-bold text-neutral-900 dark:text-white mb-6">
              Pourquoi nous faire confiance ?
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="text-4xl mb-4">🔒</div>
                <h4 className="text-lg font-semibold text-neutral-900 dark:text-white mb-2">
                  Sécurité des Données
                </h4>
                <p className="text-neutral-600 dark:text-neutral-400 text-sm">
                  Vos informations personnelles sont protégées avec les plus hauts standards de sécurité.
                </p>
              </div>
              <div className="text-center">
                <div className="text-4xl mb-4">🎯</div>
                <h4 className="text-lg font-semibold text-neutral-900 dark:text-white mb-2">
                  Précision des Conseils
                </h4>
                <p className="text-neutral-600 dark:text-neutral-400 text-sm">
                  Notre IA analyse des milliers de données pour vous donner les meilleurs conseils.
                </p>
              </div>
              <div className="text-center">
                <div className="text-4xl mb-4">📱</div>
                <h4 className="text-lg font-semibold text-neutral-900 dark:text-white mb-2">
                  Support 24/7
                </h4>
                <p className="text-neutral-600 dark:text-neutral-400 text-sm">
                  Notre équipe est disponible pour vous accompagner à tout moment.
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
