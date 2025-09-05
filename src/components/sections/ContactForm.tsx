'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { 
  EnvelopeIcon,
  PhoneIcon,
  MapPinIcon,
  ClockIcon,
  ChatBubbleLeftRightIcon
} from '@heroicons/react/24/outline';

export function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Ici vous pouvez ajouter la logique d'envoi du formulaire
    console.log('Form submitted:', formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <section className="section-padding bg-gradient-to-br from-neutral-50 to-primary-50 dark:from-neutral-800 dark:to-neutral-900">
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 dark:text-white mb-8">
              Contactez{' '}
              <span className="bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
                Notre Équipe
              </span>
            </h2>
            
            <p className="text-lg text-neutral-600 dark:text-neutral-400 mb-8">
              Notre équipe de support est là pour vous accompagner. 
              N'hésitez pas à nous contacter pour toute question ou assistance.
            </p>

            {/* Contact Details */}
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-12 h-12 bg-primary-100 dark:bg-primary-900/30 rounded-xl flex items-center justify-center">
                  <EnvelopeIcon className="h-6 w-6 text-primary-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-neutral-900 dark:text-white mb-1">Email</h3>
                  <div className="space-y-1">
                    <a href="mailto:goldeninnovationtech@gmail.com" className="block text-neutral-600 dark:text-neutral-400 hover:text-primary-600 transition-colors">
                      goldeninnovationtech@gmail.com
                    </a>
                    <a href="mailto:conseilorientationinfo@gmail.com" className="block text-neutral-600 dark:text-neutral-400 hover:text-primary-600 transition-colors">
                      conseilorientationinfo@gmail.com
                    </a>
                  </div>
                  <p className="text-sm text-neutral-500 dark:text-neutral-500">Réponse sous 2h</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-12 h-12 bg-primary-100 dark:bg-primary-900/30 rounded-xl flex items-center justify-center">
                  <PhoneIcon className="h-6 w-6 text-primary-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-neutral-900 dark:text-white mb-1">Téléphone</h3>
                  <div className="space-y-1">
                    <a href="tel:+22396855282" className="block text-neutral-600 dark:text-neutral-400 hover:text-primary-600 transition-colors">
                      +223 96 85 52 82
                    </a>
                    <a href="tel:+22392722564" className="block text-neutral-600 dark:text-neutral-400 hover:text-primary-600 transition-colors">
                      +223 92 72 25 64
                    </a>
                  </div>
                  <p className="text-sm text-neutral-500 dark:text-neutral-500">Lun-Ven 9h-18h</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-12 h-12 bg-primary-100 dark:bg-primary-900/30 rounded-xl flex items-center justify-center">
                  <ChatBubbleLeftRightIcon className="h-6 w-6 text-primary-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-neutral-900 dark:text-white mb-1">WhatsApp</h3>
                  <a href="https://wa.me/22392722564" target="_blank" rel="noopener noreferrer" className="text-neutral-600 dark:text-neutral-400 hover:text-primary-600 transition-colors">
                    +223 92 72 25 64
                  </a>
                  <p className="text-sm text-neutral-500 dark:text-neutral-500">Support instantané</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-12 h-12 bg-primary-100 dark:bg-primary-900/30 rounded-xl flex items-center justify-center">
                  <MapPinIcon className="h-6 w-6 text-primary-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-neutral-900 dark:text-white mb-1">Adresse</h3>
                  <p className="text-neutral-600 dark:text-neutral-400">Mali, Kati Koko</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-12 h-12 bg-primary-100 dark:bg-primary-900/30 rounded-xl flex items-center justify-center">
                  <ClockIcon className="h-6 w-6 text-primary-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-neutral-900 dark:text-white mb-1">Horaires</h3>
                  <p className="text-neutral-600 dark:text-neutral-400">Support 24/7 via l'application</p>
                  <p className="text-sm text-neutral-500 dark:text-neutral-500">Équipe humaine 9h-18h (GMT)</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-white dark:bg-neutral-800 rounded-2xl p-8 shadow-soft border border-neutral-200 dark:border-neutral-700"
          >
            <h3 className="text-2xl font-bold text-neutral-900 dark:text-white mb-6">
              Envoyez-nous un Message
            </h3>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                    Nom complet *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-neutral-300 dark:border-neutral-600 rounded-xl bg-white dark:bg-neutral-700 text-neutral-900 dark:text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors duration-200"
                    placeholder="Votre nom"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-neutral-300 dark:border-neutral-600 rounded-xl bg-white dark:bg-neutral-700 text-neutral-900 dark:text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors duration-200"
                    placeholder="votre@email.com"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                  Sujet *
                </label>
                <select
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-neutral-300 dark:border-neutral-600 rounded-xl bg-white dark:bg-neutral-700 text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors duration-200"
                >
                  <option value="">Sélectionnez un sujet</option>
                  <option value="support">Support technique</option>
                  <option value="feature">Demande de fonctionnalité</option>
                  <option value="bug">Signalement de bug</option>
                  <option value="partnership">Partenariat</option>
                  <option value="other">Autre</option>
                </select>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="w-full px-4 py-3 border border-neutral-300 dark:border-neutral-600 rounded-xl bg-white dark:bg-neutral-700 text-neutral-900 dark:text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors duration-200 resize-none"
                  placeholder="Décrivez votre question ou problème..."
                />
              </div>

              <Button
                type="submit"
                size="lg"
                className="w-full bg-gradient-to-r from-primary-600 to-secondary-600 hover:from-primary-700 hover:to-secondary-700 text-white py-4 text-lg"
              >
                Envoyer le Message
              </Button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
