'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  EnvelopeIcon,
  PhoneIcon,
  MapPinIcon,
  ClockIcon,
  ChatBubbleLeftRightIcon,
  PaperAirplaneIcon
} from '@heroicons/react/24/outline';

export function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const subject = encodeURIComponent(`Contact Conseil d'Orientation - ${formData.subject}`);
    const body = encodeURIComponent(
      `Nom: ${formData.name}\nEmail: ${formData.email}\nSujet: ${formData.subject}\n\nMessage:\n${formData.message}`
    );

    window.location.href = `mailto:conseilorientationinfo@gmail.com?subject=${subject}&body=${body}`;
    setSubmitted(true);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <section id="contact" className="py-16 sm:py-24 bg-slate-50/70 dark:bg-[#0a192f]">
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Contact Information (Left: 5 cols) */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#13508F]/10 dark:bg-[#3B9DF8]/10 text-[#13508F] dark:text-[#3B9DF8] text-xs font-bold uppercase tracking-wider mb-4">
              Formulaire de Contact
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-4">
              Transmettez-nous votre{' '}
              <span className="text-[#13508F] dark:text-[#3B9DF8]">message</span>
            </h2>
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed mb-8">
              Que vous soyez élève, parent, enseignant ou proviseur de lycée, nous répondons à toutes vos questions d'orientation avec soin.
            </p>

            <div className="space-y-5">
              <div className="flex items-start gap-4 p-4 rounded-2xl bg-white dark:bg-[#112240] border border-slate-200 dark:border-slate-800 shadow-xs">
                <div className="w-10 h-10 rounded-xl bg-[#13508F]/10 dark:bg-[#3B9DF8]/10 text-[#13508F] dark:text-[#3B9DF8] flex items-center justify-center flex-shrink-0">
                  <EnvelopeIcon className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-0.5">Email direct</h4>
                  <a href="mailto:conseilorientationinfo@gmail.com" className="text-xs sm:text-sm font-semibold text-slate-800 dark:text-slate-200 hover:text-[#13508F] dark:hover:text-[#3B9DF8] transition-colors block">
                    conseilorientationinfo@gmail.com
                  </a>
                  <a href="mailto:goldeninnovationtech@gmail.com" className="text-xs text-slate-500 hover:text-[#13508F] dark:hover:text-[#3B9DF8] transition-colors block mt-0.5">
                    goldeninnovationtech@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 rounded-2xl bg-white dark:bg-[#112240] border border-slate-200 dark:border-slate-800 shadow-xs">
                <div className="w-10 h-10 rounded-xl bg-[#13508F]/10 dark:bg-[#3B9DF8]/10 text-[#13508F] dark:text-[#3B9DF8] flex items-center justify-center flex-shrink-0">
                  <PhoneIcon className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-0.5">Ligne Téléphonique & WhatsApp</h4>
                  <a href="tel:+22396855282" className="text-xs sm:text-sm font-semibold text-slate-800 dark:text-slate-200 hover:text-[#13508F] dark:hover:text-[#3B9DF8] transition-colors block">
                    +223 96 85 52 82
                  </a>
                  <a href="https://wa.me/22392722564" target="_blank" rel="noopener noreferrer" className="text-xs text-emerald-600 dark:text-emerald-400 font-medium block mt-0.5">
                    WhatsApp : +223 92 72 25 64
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 rounded-2xl bg-white dark:bg-[#112240] border border-slate-200 dark:border-slate-800 shadow-xs">
                <div className="w-10 h-10 rounded-xl bg-[#13508F]/10 dark:bg-[#3B9DF8]/10 text-[#13508F] dark:text-[#3B9DF8] flex items-center justify-center flex-shrink-0">
                  <MapPinIcon className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-0.5">Localisation</h4>
                  <p className="text-xs sm:text-sm font-semibold text-slate-800 dark:text-slate-200">
                    Kati Koko, Région de Koulikoro / Bamako, Mali
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Contact Form (Right: 7 cols) */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7 bg-white dark:bg-[#112240] rounded-3xl p-6 sm:p-10 border border-slate-200 dark:border-slate-800 shadow-card"
          >
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6">
              Écrivez-nous directement
            </h3>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="name" className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-2">
                    Nom complet <span className="text-[#3B9DF8]">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="Moussa Traoré"
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-[#0a192f] text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#3B9DF8] focus:border-transparent transition-all"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-2">
                    Adresse email <span className="text-[#3B9DF8]">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="moussa@exemple.ml"
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-[#0a192f] text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#3B9DF8] focus:border-transparent transition-all"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="subject" className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-2">
                  Motif de la demande <span className="text-[#3B9DF8]">*</span>
                </label>
                <select
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-[#0a192f] text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#3B9DF8] focus:border-transparent transition-all"
                >
                  <option value="">Sélectionnez une option</option>
                  <option value="orientation-bac">Aide orientation après le Bac</option>
                  <option value="installation-app">Difficulté d'installation de l'application</option>
                  <option value="partenariat-lycee">Partenariat établissement / lycée</option>
                  <option value="signalement-info">Correction ou ajout d'une université</option>
                  <option value="autre">Autre question</option>
                </select>
              </div>

              <div>
                <label htmlFor="message" className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-2">
                  Votre message <span className="text-[#3B9DF8]">*</span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={4}
                  placeholder="Décrivez votre situation, votre série du Bac ou votre question..."
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-[#0a192f] text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#3B9DF8] focus:border-transparent transition-all resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full inline-flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl bg-[#13508F] hover:bg-[#0e3a6a] text-white font-semibold text-sm transition-all duration-200 shadow-md shadow-[#13508F]/20 min-h-[48px]"
              >
                <PaperAirplaneIcon className="w-4 h-4" />
                <span>Envoyer le message</span>
              </button>

              {submitted && (
                <p className="text-xs text-emerald-600 dark:text-emerald-400 text-center font-medium mt-2">
                  Votre logiciel de messagerie s'ouvre avec votre message pré-rempli. Merci !
                </p>
              )}
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
