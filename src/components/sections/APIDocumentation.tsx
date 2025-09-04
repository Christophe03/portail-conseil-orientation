'use client';

import { motion } from 'framer-motion';
import { 
  CodeBracketIcon,
  ServerIcon,
  KeyIcon,
  DocumentTextIcon
} from '@heroicons/react/24/outline';

const apiEndpoints = [
  {
    method: 'GET',
    endpoint: '/api/scholarships',
    description: 'Récupérer la liste des bourses d\'études',
    parameters: ['country', 'field', 'level', 'amount'],
    response: 'Array<Scholarship>'
  },
  {
    method: 'POST',
    endpoint: '/api/profile',
    description: 'Créer ou mettre à jour un profil étudiant',
    parameters: ['name', 'email', 'level', 'interests'],
    response: 'Profile'
  },
  {
    method: 'GET',
    endpoint: '/api/recommendations',
    description: 'Obtenir des recommandations personnalisées',
    parameters: ['userId', 'preferences'],
    response: 'Array<Recommendation>'
  },
  {
    method: 'POST',
    endpoint: '/api/contact',
    description: 'Envoyer un message de contact',
    parameters: ['name', 'email', 'subject', 'message'],
    response: 'ContactResponse'
  }
];

const codeExamples = [
  {
    language: 'JavaScript',
    title: 'Récupérer les bourses',
    code: `fetch('/api/scholarships?country=France&field=Computer Science')
  .then(response => response.json())
  .then(data => console.log(data));`
  },
  {
    language: 'Python',
    title: 'Créer un profil',
    code: `import requests

data = {
  'name': 'Jean Dupont',
  'email': 'jean@example.com',
  'level': 'Bachelor',
  'interests': ['AI', 'Data Science']
}

response = requests.post('/api/profile', json=data)
profile = response.json()`
  }
];

export function APIDocumentation() {
  return (
    <section className="mb-16">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="mb-12"
      >
        <div className="flex items-center space-x-3 mb-6">
          <CodeBracketIcon className="h-8 w-8 text-secondary-600" />
          <h2 className="text-3xl font-bold text-neutral-900 dark:text-white">
            Documentation API
          </h2>
        </div>
        <p className="text-lg text-neutral-600 dark:text-neutral-400 max-w-3xl">
          Intégrez l'application Conseil d'Orientation dans vos propres projets 
          grâce à notre API RESTful complète et documentée.
        </p>
      </motion.div>

      {/* API Overview */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="bg-gradient-to-r from-secondary-50 to-primary-50 dark:from-secondary-900/20 dark:to-primary-900/20 rounded-2xl p-8 border border-secondary-200 dark:border-secondary-700 mb-12"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="flex items-start space-x-3">
            <ServerIcon className="h-6 w-6 text-secondary-600 flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-semibold text-neutral-900 dark:text-white mb-1">Base URL</h3>
              <p className="text-sm text-neutral-600 dark:text-neutral-400">https://api.conseil-orientation.com</p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <KeyIcon className="h-6 w-6 text-secondary-600 flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-semibold text-neutral-900 dark:text-white mb-1">Authentification</h3>
              <p className="text-sm text-neutral-600 dark:text-neutral-400">API Key dans le header</p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <DocumentTextIcon className="h-6 w-6 text-secondary-600 flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-semibold text-neutral-900 dark:text-white mb-1">Format</h3>
              <p className="text-sm text-neutral-600 dark:text-neutral-400">JSON pour toutes les réponses</p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* API Endpoints */}
      <div className="mb-12">
        <h3 className="text-2xl font-bold text-neutral-900 dark:text-white mb-6">
          Endpoints Principaux
        </h3>
        <div className="space-y-4">
          {apiEndpoints.map((endpoint, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-white dark:bg-neutral-800 rounded-xl p-6 border border-neutral-200 dark:border-neutral-700"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                    endpoint.method === 'GET' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300' :
                    endpoint.method === 'POST' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300' :
                    'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300'
                  }`}>
                    {endpoint.method}
                  </span>
                  <code className="text-lg font-mono text-neutral-900 dark:text-white">
                    {endpoint.endpoint}
                  </code>
                </div>
              </div>
              <p className="text-neutral-600 dark:text-neutral-400 mb-4">
                {endpoint.description}
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-semibold text-neutral-900 dark:text-white mb-2">Paramètres</h4>
                  <div className="flex flex-wrap gap-2">
                    {endpoint.parameters.map((param, paramIndex) => (
                      <span key={paramIndex} className="px-2 py-1 bg-neutral-100 dark:bg-neutral-700 text-neutral-700 dark:text-neutral-300 text-sm rounded">
                        {param}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold text-neutral-900 dark:text-white mb-2">Réponse</h4>
                  <code className="px-2 py-1 bg-neutral-100 dark:bg-neutral-700 text-neutral-700 dark:text-neutral-300 text-sm rounded">
                    {endpoint.response}
                  </code>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Code Examples */}
      <div className="mb-12">
        <h3 className="text-2xl font-bold text-neutral-900 dark:text-white mb-6">
          Exemples de Code
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {codeExamples.map((example, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-white dark:bg-neutral-800 rounded-xl p-6 border border-neutral-200 dark:border-neutral-700"
            >
              <div className="flex items-center space-x-2 mb-4">
                <CodeBracketIcon className="h-5 w-5 text-secondary-600" />
                <span className="font-semibold text-neutral-900 dark:text-white">{example.language}</span>
              </div>
              <h4 className="font-semibold text-neutral-900 dark:text-white mb-3">
                {example.title}
              </h4>
              <pre className="bg-neutral-100 dark:bg-neutral-700 p-4 rounded-lg overflow-x-auto">
                <code className="text-sm text-neutral-800 dark:text-neutral-200">
                  {example.code}
                </code>
              </pre>
            </motion.div>
          ))}
        </div>
      </div>

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
            <button className="px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white rounded-xl font-semibold transition-colors duration-200">
              SDK JavaScript
            </button>
            <button className="px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white rounded-xl font-semibold transition-colors duration-200">
              SDK Python
            </button>
            <button className="px-6 py-3 border-2 border-primary-600 text-primary-600 hover:bg-primary-600 hover:text-white rounded-xl font-semibold transition-all duration-200">
              Voir Tous les SDK
            </button>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
