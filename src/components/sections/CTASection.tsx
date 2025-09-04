'use client';

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { 
  RocketLaunchIcon,
  ArrowRightIcon,
  CheckCircleIcon,
  StarIcon
} from '@heroicons/react/24/outline';

const benefits = [
  'Assistant IA intelligent et personnalisé',
  'Base de données de 1000+ bourses d\'études',
  'Ressources éducatives complètes',
  'Interface moderne et intuitive',
  'Support technique 24/7',
  'Gratuit et sans publicité',
];

const socialProof = [
  { icon: '⭐', text: '4.8/5 sur les stores' },
  { icon: '👥', text: '50K+ utilisateurs actifs' },
  { icon: '🌍', text: '150+ pays couverts' },
  { icon: '🏆', text: 'Prix de l\'innovation 2024' },
];

export function CTASection() {
  return (
    <section className="section-padding bg-gradient-to-br from-primary-900 via-primary-800 to-secondary-900 text-white relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary-400/20 rounded-full mix-blend-multiply filter blur-xl animate-float"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-secondary-400/20 rounded-full mix-blend-multiply filter blur-xl animate-float animation-delay-2000"></div>
        <div className="absolute top-40 left-40 w-80 h-80 bg-accent-400/20 rounded-full mix-blend-multiply filter blur-xl animate-float animation-delay-4000"></div>
      </div>

      <div className="container-custom relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Main CTA */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mb-12"
          >
            <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-6 py-3 mb-8">
              <RocketLaunchIcon className="h-5 w-5 text-accent-400" />
              <span className="text-sm font-medium text-accent-200">
                🚀 Disponible Maintenant
              </span>
            </div>

            <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6">
              Prêt à{' '}
              <span className="bg-gradient-to-r from-accent-400 to-yellow-400 bg-clip-text text-transparent">
                Révolutionner
              </span>{' '}
              Votre Avenir ?
            </h2>

            <p className="text-xl md:text-2xl text-primary-100 mb-8 max-w-3xl mx-auto leading-relaxed">
              Rejoignez des milliers d'étudiants qui ont déjà transformé leur parcours 
              grâce à notre application innovante de conseil d'orientation.
            </p>
          </motion.div>

          {/* Benefits Grid */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12"
          >
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                className="flex items-center space-x-3 text-left"
              >
                <CheckCircleIcon className="h-6 w-6 text-accent-400 flex-shrink-0" />
                <span className="text-primary-100">{benefit}</span>
              </motion.div>
            ))}
          </motion.div>

          {/* Social Proof */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-wrap justify-center gap-6 mb-12"
          >
            {socialProof.map((proof, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2"
              >
                <span className="text-lg">{proof.icon}</span>
                <span className="text-sm font-medium text-primary-100">{proof.text}</span>
              </motion.div>
            ))}
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
          >
            <Button
              size="lg"
              className="bg-gradient-to-r from-accent-500 to-yellow-500 hover:from-accent-600 hover:to-yellow-600 text-neutral-900 font-bold text-lg px-8 py-4 shadow-glow-lg hover:shadow-glow transform hover:scale-105 transition-all duration-200"
            >
              <RocketLaunchIcon className="h-6 w-6 mr-2" />
              Télécharger Maintenant
              <ArrowRightIcon className="h-5 w-5 ml-2" />
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="border-2 border-white/30 text-white hover:bg-white hover:text-neutral-900 font-bold text-lg px-8 py-4 transform hover:scale-105 transition-all duration-200"
            >
              Voir la Démo
            </Button>
          </motion.div>

          {/* Trust Indicators */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="text-center"
          >
            <div className="bg-white/5 backdrop-blur-sm border border-white/20 rounded-2xl p-8">
              <h3 className="text-2xl font-bold mb-6">
                Pourquoi Choisir Conseil d'Orientation ?
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="text-center">
                  <div className="text-4xl mb-4">🎯</div>
                  <h4 className="text-lg font-semibold mb-2">Précision IA</h4>
                  <p className="text-primary-200 text-sm">
                    Conseils personnalisés basés sur l'intelligence artificielle
                  </p>
                </div>
                <div className="text-center">
                  <div className="text-4xl mb-4">🔒</div>
                  <h4 className="text-lg font-semibold mb-2">Sécurité Totale</h4>
                  <p className="text-primary-200 text-sm">
                    Vos données sont protégées avec les plus hauts standards
                  </p>
                </div>
                <div className="text-center">
                  <div className="text-4xl mb-4">🚀</div>
                  <h4 className="text-lg font-semibold mb-2">Innovation Continue</h4>
                  <p className="text-primary-200 text-sm">
                    Mises à jour régulières et nouvelles fonctionnalités
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Final Message */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 1.0 }}
            className="mt-12"
          >
            <p className="text-lg text-primary-200 mb-4">
              Votre avenir commence ici. Ne laissez pas le hasard décider de votre parcours.
            </p>
            <div className="flex items-center justify-center space-x-2 text-accent-300">
              <StarIcon className="h-5 w-5" />
              <span className="text-sm font-medium">
                Rejoignez la révolution de l'orientation scolaire et professionnelle
              </span>
              <StarIcon className="h-5 w-5" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
