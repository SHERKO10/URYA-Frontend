import { motion } from 'framer-motion';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { Shield, Brain, Lock, Smartphone, BarChart3, BookOpen, ExternalLink, ArrowRight } from 'lucide-react';
import Hero from '../components/Hero';
import Navbar from '../components/Navbar';

const Landing = () => {
  const { isAuthenticated, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated && !loading) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, loading, navigate]);

  if (loading) {
    return null;
  }

  return (
    <div className="min-h-screen bg-dark-950">
      <Navbar />
      <Hero />

      {/* About URYA Section */}
      <section className="py-24 px-4 bg-dark-900/50">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="gradient-text">Qu'est-ce que URYA ?</span>
            </h2>
            <p className="text-dark-400 max-w-3xl mx-auto text-lg">
              URYA est un projet de stage CUBE spécialisé dans la <strong className="text-primary-400">protection des données par cryptographie et intelligence artificielle</strong>.
              Nous développons des solutions de cybersécurité avancées pour les entreprises africaines.
            </p>
          </motion.div>

          {/* Key Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
            {[
              { value: '+38%', label: 'Cyberattaques en 2024', icon: '📈' },
              { value: '3.55M', label: 'Utilisateurs Mobile Money au Togo', icon: '📱' },
              { value: '81%', label: 'Trouvent les frais trop élevés', icon: '💸' },
              { value: '50%+', label: 'Problèmes de sécurité signalés', icon: '⚠️' },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="card-glass p-6 text-center"
              >
                <div className="text-3xl mb-2">{stat.icon}</div>
                <div className="text-2xl md:text-3xl font-bold gradient-text">{stat.value}</div>
                <div className="text-dark-500 text-sm mt-1">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section className="py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="gradient-text">Nos 3 Projets Principaux</span>
            </h2>
            <p className="text-dark-400 max-w-2xl mx-auto">
              Des solutions concrètes pour la sécurité des données et des transactions
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <Brain className="w-12 h-12" />,
                title: 'MAFAHA',
                subtitle: 'Intelligence Cryptographique Comportementale',
                description: 'Système de détection de ransomwares et usurpation d\'identité par analyse comportementale avec IA. Kill-Switch pour révoquer les clés en temps réel.',
                features: ['Détection < 2s', 'Faux positifs < 5%', 'Kill-Switch', 'Zero Trust'],
                color: 'from-cyan-500 to-blue-600',
              },
              {
                icon: <Shield className="w-12 h-12" />,
                title: 'LORA',
                subtitle: 'Détective Numérique Anti-Escroqueries',
                description: 'LORA parcourt internet à la recherche d\'escroqueries. Il analyse automatiquement les informations disponibles sur une personne ou structure — réseaux sociaux, sites web, forums — et calcule un score de risque pour savoir si c\'est dangereux.',
                features: ['Score de risque', 'Analyse réseaux sociaux', 'Détection arnaques', 'Accessible à tous'],
                color: 'from-emerald-500 to-teal-600',
              },
              {
                icon: <Brain className="w-12 h-12" />,
                title: 'URYA Neural Cryptography',
                subtitle: 'Module IA de Cryptographie Neuronale',
                description: 'Module ML (Random Forest + LSTM) pour la détection d\'anomalies et la cryptographie neuronale. Réduction de 40% du temps de détection avec 100 000 logs.',
                features: ['100 000 logs', 'Random Forest + LSTM', 'API REST', '-40% temps détection'],
                color: 'from-violet-500 to-purple-600',
                internalLink: '/neural-crypto',
              },
            ].map((project, index) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15 }}
                onClick={() => project.internalLink && navigate(project.internalLink)}
                className={`card-glass card-hover p-8 relative overflow-hidden group ${
                  project.internalLink ? 'cursor-pointer' : ''
                }`}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${project.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />
                <div className="text-primary-400 mb-6">{project.icon}</div>
                <h3 className="text-2xl font-bold mb-2">{project.title}</h3>
                <p className="text-primary-400 text-sm mb-4">{project.subtitle}</p>
                <p className="text-dark-400 mb-6">{project.description}</p>
                <ul className="space-y-2 mb-6">
                  {project.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2 text-dark-300 text-sm">
                      <Lock className="w-4 h-4 text-primary-500" />
                      {feature}
                    </li>
                  ))}
                </ul>
                {project.link && (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noreferrer"
                    onClick={e => e.stopPropagation()}
                    className="inline-flex items-center gap-2 text-primary-400 hover:text-primary-300 text-sm font-medium transition-colors"
                  >
                    <ExternalLink className="w-4 h-4" />
                    Voir le projet
                  </a>
                )}
                {project.internalLink && (
                  <div className="inline-flex items-center gap-2 text-violet-400 text-sm font-medium">
                    <ArrowRight className="w-4 h-4" />
                    Accéder à la console
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-24 px-4 bg-dark-900/50">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="gradient-text">Notre Mission</span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {[
              {
                icon: <Shield className="w-8 h-8" />,
                title: 'Confidentialité',
                description: 'Garantir la protection totale des données sensibles par chiffrement AES-256 et RSA-4096',
              },
              {
                icon: <Lock className="w-8 h-8" />,
                title: 'Intégrité',
                description: 'Assurer que les données ne sont pas altérées grâce aux signatures numériques',
              },
              {
                icon: <Brain className="w-8 h-8" />,
                title: 'Authentification',
                description: 'Vérifier l\'identité des utilisateurs par des protocoles sécurisés (JWT, biométrie)',
              },
              {
                icon: <BarChart3 className="w-8 h-8" />,
                title: 'Non-répudiation',
                description: 'Garantir la traçabilité complète des transactions et opérations',
              },
            ].map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="card-glass p-6 flex gap-4 items-start"
              >
                <div className="text-primary-400 shrink-0">{item.icon}</div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                  <p className="text-dark-400">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="card-glass p-12 relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-primary-500/10 to-primary-600/10" />
            <div className="relative z-10">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                <span className="gradient-text">Rejoignez l'Aventure URYA</span>
              </h2>
              <p className="text-dark-400 mb-8 max-w-xl mx-auto">
                Découvrez nos solutions de cybersécurité et protégez vos données dès aujourd'hui.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={() => navigate('/auth')}
                  className="btn-glow"
                >
                  Commencer
                </button>
                <button
                  onClick={() => navigate('/projects')}
                  className="btn-secondary"
                >
                  Voir les projets
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 border-t border-dark-800">
        <div className="max-w-7xl mx-auto text-center text-dark-500">
          <p>© 2026 URYA × CUBE. Tous droits réservés.</p>
          <p className="text-sm mt-2">
            Projet de stage - Programme CUBE | Partenaire: D-CLIC - OIF
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
