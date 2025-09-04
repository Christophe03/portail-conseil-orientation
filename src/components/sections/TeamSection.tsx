'use client';

import { motion } from 'framer-motion';
import { 
  UserGroupIcon,
  AcademicCapIcon,
  CodeBracketIcon,
  ChartBarIcon
} from '@heroicons/react/24/outline';

const teamMembers = [
  {
    name: 'Marie Dubois',
    role: 'CEO & Fondatrice',
    department: 'Direction',
    description: 'Passionnée d\'éducation et d\'innovation, Marie a plus de 15 ans d\'expérience dans l\'EdTech.',
    expertise: ['Stratégie', 'Éducation', 'Innovation'],
    icon: UserGroupIcon
  },
  {
    name: 'Thomas Martin',
    role: 'CTO',
    department: 'Technologie',
    description: 'Expert en IA et développement mobile, Thomas dirige l\'équipe technique avec passion.',
    expertise: ['Intelligence Artificielle', 'Mobile', 'Architecture'],
    icon: CodeBracketIcon
  },
  {
    name: 'Sophie Bernard',
    role: 'Directrice Pédagogique',
    department: 'Éducation',
    description: 'Spécialiste en orientation scolaire, Sophie supervise le contenu et les conseils pédagogiques.',
    expertise: ['Orientation', 'Pédagogie', 'Conseil'],
    icon: AcademicCapIcon
  },
  {
    name: 'Lucas Moreau',
    role: 'Directeur Marketing',
    department: 'Marketing',
    description: 'Expert en croissance et acquisition, Lucas développe notre présence mondiale.',
    expertise: ['Marketing Digital', 'Croissance', 'International'],
    icon: ChartBarIcon
  }
];

export function TeamSection() {
  return (
    <section className="section-padding bg-gradient-to-br from-neutral-50 to-primary-50 dark:from-neutral-800 dark:to-neutral-900">
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
            Notre{' '}
            <span className="bg-gradient-to-r from-primary-600 via-brand-600 to-accent-500 bg-clip-text text-transparent">
              Équipe
            </span>
          </h2>
          <p className="text-xl text-neutral-600 dark:text-neutral-400 max-w-3xl mx-auto">
            Une équipe passionnée et expérimentée qui combine expertise technique, 
            pédagogique et entrepreneuriale pour révolutionner l'orientation.
          </p>
        </motion.div>

        {/* Team Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {teamMembers.map((member, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-white dark:bg-neutral-800 rounded-2xl p-6 shadow-soft border border-neutral-200 dark:border-neutral-700 text-center group hover:shadow-xl transition-all duration-300"
            >
              {/* Avatar */}
              <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-primary-100 to-secondary-100 dark:from-primary-900/30 dark:to-secondary-900/30 rounded-full mb-6 group-hover:scale-110 transition-transform duration-300">
                <member.icon className="h-10 w-10 text-primary-600" />
              </div>

              {/* Member Info */}
              <h3 className="text-xl font-bold text-neutral-900 dark:text-white mb-2">
                {member.name}
              </h3>
              <p className="text-primary-600 font-semibold mb-1">
                {member.role}
              </p>
              <p className="text-sm text-neutral-500 dark:text-neutral-400 mb-4">
                {member.department}
              </p>

              {/* Description */}
              <p className="text-neutral-600 dark:text-neutral-400 text-sm leading-relaxed mb-4">
                {member.description}
              </p>

              {/* Expertise Tags */}
              <div className="flex flex-wrap justify-center gap-2">
                {member.expertise.map((skill, skillIndex) => (
                  <span
                    key={skillIndex}
                    className="px-3 py-1 bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 text-xs rounded-full"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Join Us CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-center mt-16"
        >
          <h3 className="text-2xl md:text-3xl font-bold text-neutral-900 dark:text-white mb-6">
            Rejoignez Notre Équipe
          </h3>
          <p className="text-lg text-neutral-600 dark:text-neutral-400 mb-8 max-w-2xl mx-auto">
            Vous partagez notre passion pour l'éducation et l'innovation ? 
            Découvrez nos opportunités de carrière et contribuez à transformer l'avenir de l'orientation.
          </p>
          <button className="inline-flex items-center space-x-2 bg-gradient-to-r from-primary-600 to-secondary-600 hover:from-primary-700 hover:to-secondary-700 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-200 hover:scale-105">
            <span>Voir nos offres</span>
            <UserGroupIcon className="h-5 w-5" />
          </button>
        </motion.div>
      </div>
    </section>
  );
}
