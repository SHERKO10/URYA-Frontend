import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Shield, Brain, Lock, Smartphone, BarChart3, BookOpen, ArrowRight, ExternalLink, TrendingUp, PiggyBank, AlertTriangle } from 'lucide-react';
import Hero from '../components/Hero';
import Navbar from '../components/Navbar';

const Landing = () => {
  const navigate = useNavigate();

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
              URYA est une entreprise spécialisée dans la <strong className="text-primary-400">protection des données par cryptographie et intelligence artificielle</strong>.
              Nous développons des solutions de cybersécurité avancées pour les entreprises africaines.
            </p>
          </motion.div>

          {/* Key Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
            {[
              { value: '+38%', label: 'Cyberattaques en 2024', icon: <TrendingUp className="w-8 h-8 text-red-500 mx-auto" /> },
              { value: '3.55M', label: 'Utilisateurs Mobile Money au Togo', icon: <Smartphone className="w-8 h-8 text-primary-400 mx-auto" /> },
              { value: '81%', label: 'Trouvent les frais trop élevés', icon: <PiggyBank className="w-8 h-8 text-emerald-500 mx-auto" /> },
              { value: '50%+', label: 'Problèmes de sécurité signalés', icon: <AlertTriangle className="w-8 h-8 text-amber-500 mx-auto" /> },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="card-glass p-6 text-center"
              >
                <div className="text-3xl mb-3 flex justify-center">{stat.icon}</div>
                <div className="text-2xl md:text-3xl font-bold gradient-text">{stat.value}</div>
                <div className="text-dark-500 text-sm mt-1">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Solutions Section */}
      <section className="py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="gradient-text">Nos Solutions de Cybersécurité</span>
            </h2>
            <p className="text-dark-400 max-w-2xl mx-auto">
              Une stratégie à 3 niveaux pour protéger du particulier jusqu'à la grande entreprise.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <Smartphone className="w-12 h-12" />,
                title: 'Scamurai',
                subtitle: 'Freemium Mobile B2C/B2B',
                description: 'Application mobile de sécurité avec IA locale pour filtrer le phishing et les menaces en temps réel.',
                features: ['Filtrage SMS/Appels IA', 'VPN Local Anti-Phishing', 'Mode Gratuit & Premium'],
                color: 'from-accent-500 to-primary-600',
              },
              {
                icon: <Shield className="w-12 h-12" />,
                title: 'LORA',
                subtitle: 'Sécurité Automatisée pour PME',
                description: 'La solution abordable pour sécuriser les réseaux et les terminaux des petites et moyennes entreprises.',
                features: ['Déploiement Rapide', 'Sécurité Réseau', 'Gestion Centralisée'],
                color: 'from-cyan-500 to-blue-600',
              },
              {
                icon: <Brain className="w-12 h-12" />,
                title: 'MAHAFA',
                subtitle: 'Intelligence Cryptographique',
                description: 'Notre offre phare pour grandes entreprises. Analyse comportementale avancée avec Kill-Switch et réseaux de neurones.',
                features: ['Réseaux LSTM', 'Kill-Switch Cryptographique', 'API Entreprise'],
                color: 'from-violet-500 to-purple-600',
              },
            ].map((project, index) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15 }}
                className="card-glass card-hover p-8 relative overflow-hidden group"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${project.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />
                <div className="text-primary-400 mb-6 group-hover:scale-110 transition-transform duration-300">{project.icon}</div>
                <h3 className="text-2xl font-bold mb-2">{project.title}</h3>
                <p className="text-accent-400 text-sm mb-4">{project.subtitle}</p>
                <p className="text-dark-400 mb-6">{project.description}</p>
                <ul className="space-y-2 relative z-10">
                  {project.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2 text-dark-300 text-sm">
                      <Lock className="w-4 h-4 text-accent-500" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Demo Section */}
      <section className="py-24 px-4 bg-dark-900/50">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="gradient-text">Scamurai en Action</span>
            </h2>
            <p className="text-dark-400 max-w-2xl mx-auto">
              Découvrez comment Scamurai bloque instantanément une tentative de phishing ciblé.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative aspect-video rounded-2xl overflow-hidden border border-white/10 shadow-2xl shadow-accent-500/20 group cursor-pointer"
          >
            <div className="absolute inset-0 bg-dark-950/60 flex items-center justify-center group-hover:bg-dark-950/40 transition-colors">
              <div className="w-20 h-20 bg-accent-500/80 backdrop-blur-md rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                <div className="w-0 h-0 border-t-[12px] border-t-transparent border-l-[20px] border-l-white border-b-[12px] border-b-transparent ml-2" />
              </div>
            </div>
            <img src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=1200" alt="Scamurai Demo" className="w-full h-full object-cover" />
          </motion.div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="gradient-text">Packages Scamurai</span>
            </h2>
            <p className="text-dark-400 max-w-2xl mx-auto">
              Testez notre protection IA gratuitement, puis passez au niveau supérieur pour une sécurité totale.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Freemium */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="card-glass p-8 relative overflow-hidden"
            >
              <h3 className="text-2xl font-bold mb-2">Gratuit</h3>
              <div className="text-4xl font-bold text-white mb-6">0 CFA<span className="text-lg text-dark-400 font-normal">/mois</span></div>
              <ul className="space-y-4 mb-8">
                <li className="flex items-center gap-3 text-dark-300">
                  <Shield className="w-5 h-5 text-primary-500" />
                  Surveillance IA Locale de base
                </li>
                <li className="flex items-center gap-3 text-dark-300">
                  <Shield className="w-5 h-5 text-primary-500" />
                  Alerte sur les numéros suspects
                </li>
                <li className="flex items-center gap-3 text-dark-500 opacity-50">
                  <Lock className="w-5 h-5" />
                  Pas de VPN DNS Anti-Phishing
                </li>
                <li className="flex items-center gap-3 text-dark-500 opacity-50">
                  <Lock className="w-5 h-5" />
                  Pas d'analyse heuristique Gemini
                </li>
              </ul>
              <button className="w-full btn-secondary">Télécharger l'App</button>
            </motion.div>

            {/* Premium */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="card-glass p-8 relative overflow-hidden gradient-border"
            >
              <div className="absolute top-4 right-4 bg-accent-500 text-white text-xs font-bold px-3 py-1 rounded-full">Recommandé</div>
              <h3 className="text-2xl font-bold mb-2 text-accent-400">Premium</h3>
              <div className="text-4xl font-bold text-white mb-6">Abonnement<span className="text-lg text-dark-400 font-normal">/mois</span></div>
              <ul className="space-y-4 mb-8">
                <li className="flex items-center gap-3 text-white font-medium">
                  <Shield className="w-5 h-5 text-accent-500" />
                  Tout le plan Gratuit inclus
                </li>
                <li className="flex items-center gap-3 text-white font-medium">
                  <Shield className="w-5 h-5 text-accent-500" />
                  VPN Local Anti-Phishing Actif
                </li>
                <li className="flex items-center gap-3 text-white font-medium">
                  <Shield className="w-5 h-5 text-accent-500" />
                  Analyse Heuristique (Gemini IA)
                </li>
                <li className="flex items-center gap-3 text-white font-medium">
                  <Shield className="w-5 h-5 text-accent-500" />
                  Clavier Sécurisé Intégré
                </li>
              </ul>
              <button className="w-full btn-glow">Passer au Premium</button>
            </motion.div>
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
                  onClick={() => navigate('/console')}
                  className="btn-glow"
                >
                  Tester la Console
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
          <p>© 2026 URYA. Tous droits réservés.</p>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
