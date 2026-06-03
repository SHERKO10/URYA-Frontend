import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Shield, Brain, Lock, Smartphone, BarChart3, BookOpen, ArrowRight, ExternalLink, TrendingUp, PiggyBank, AlertTriangle } from 'lucide-react';
import Hero from '../components/Hero';
import Navbar from '../components/Navbar';

const PhishingSimulator = () => {
  const [step, setStep] = useState('idle'); // 'idle' | 'sms' | 'scanning' | 'blocked'
  const [logs, setLogs] = useState([]);

  const runSimulation = () => {
    setStep('sms');
    setLogs([]);
    
    // Step 2: Start Scan
    setTimeout(() => {
      setStep('scanning');
      addLog('Démarrage de la surveillance IA locale...');
      
      setTimeout(() => {
        addLog('Analyse sémantique du texte : SMS suspect détecté.');
      }, 800);

      setTimeout(() => {
        addLog('Heuristique URL : Nom de domaine non officiel.');
      }, 1600);

      setTimeout(() => {
        addLog('Calcul de confiance : 98.4% Phishing.');
      }, 2400);

      // Step 3: Block
      setTimeout(() => {
        setStep('blocked');
      }, 3200);

    }, 2000);
  };

  const addLog = (msg) => {
    setLogs((prev) => [...prev, `> ${msg}`]);
  };

  const reset = () => {
    setStep('idle');
    setLogs([]);
  };

  return (
    <div className="grid md:grid-cols-2 gap-12 items-center max-w-5xl mx-auto">
      {/* Left Text */}
      <div className="space-y-6 text-left">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-primary-500/10 border border-primary-500/20 rounded-full text-primary-400 text-xs font-semibold">
          🛡️ SÉCURITÉ MOBILE ACTIVE
        </div>
        <h3 className="text-3xl md:text-4xl font-bold text-white leading-tight">
          Comment <span className="gradient-text">Scamurai</span> vous protège en temps réel.
        </h3>
        <p className="text-dark-400 leading-relaxed text-sm md:text-base">
          Scamurai intègre un modèle d'intelligence artificielle locale qui tourne directement sur votre smartphone. 
          Il intercepte les messages malveillants avant même qu'ils n'atteignent votre boîte de réception et neutralise les liens de phishing.
        </p>
        
        <div className="pt-4">
          {step === 'idle' ? (
            <button
              onClick={runSimulation}
              className="btn-glow flex items-center gap-2"
            >
              Lancer la simulation
              <ArrowRight className="w-5 h-5 animate-pulse" />
            </button>
          ) : (
            <button
              onClick={reset}
              className="btn-secondary"
            >
              Réinitialiser la simulation
            </button>
          )}
        </div>
      </div>

      {/* Right Phone Mockup */}
      <div className="flex justify-center">
        <div className="relative w-[280px] sm:w-[300px] h-[560px] sm:h-[600px] bg-dark-950 border-4 border-dark-800 rounded-[40px] shadow-2xl shadow-primary-500/10 overflow-hidden flex flex-col">
          {/* Speaker / Camera Notch */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-dark-800 rounded-b-2xl z-20 flex justify-center items-center">
            <div className="w-12 h-1 bg-dark-950 rounded-full" />
          </div>

          {/* Status Bar */}
          <div className="h-10 pt-2 px-6 flex justify-between items-center text-[10px] text-dark-500 font-semibold z-10">
            <span>14:02</span>
            <div className="flex items-center gap-1">
              <span>5G</span>
              <div className="w-4 h-2 border border-dark-500 rounded-[2px]" />
            </div>
          </div>

          {/* Inner Screen Content */}
          <div className="flex-1 p-4 flex flex-col justify-between relative bg-[#040812]">
            {/* Background Mesh (Inside Phone) */}
            <div className="absolute inset-0 bg-gradient-to-b from-primary-950/10 via-transparent to-dark-950 pointer-events-none" />

            {/* Step: Idle */}
            {step === 'idle' && (
              <div className="flex-1 flex flex-col items-center justify-center text-center p-4">
                <div className="w-16 h-16 bg-dark-900 border border-dark-800 rounded-2xl flex items-center justify-center mb-4">
                  <Smartphone className="w-8 h-8 text-dark-500" />
                </div>
                <p className="text-dark-400 text-xs">Prêt pour la simulation</p>
                <p className="text-dark-500 text-[10px] mt-1">Appuyez sur "Lancer la simulation" à gauche.</p>
              </div>
            )}

            {/* Step: SMS Received */}
            {(step === 'sms' || step === 'scanning' || step === 'blocked') && (
              <div className="flex-1 flex flex-col gap-4">
                {/* Mock SMS Card */}
                <motion.div
                  initial={{ y: -50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  className={`p-4 rounded-2xl border transition-all duration-300 ${
                    step === 'blocked'
                      ? 'bg-red-500/10 border-red-500/30'
                      : 'bg-dark-900 border-dark-800'
                  }`}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-6 h-6 bg-dark-800 rounded-full flex items-center justify-center text-[10px] font-bold text-dark-300">
                      S
                    </div>
                    <span className="text-[11px] font-bold text-dark-300">SMS Suspect (Inconnu)</span>
                  </div>
                  <p className="text-[10px] text-dark-400 leading-normal">
                    INFO T-MONEY : Votre compte a été temporairement restreint. Mettez à jour vos informations sur :
                    <span className="text-primary-400 block mt-1 underline">http://t-money-securite-login.com</span>
                  </p>
                </motion.div>

                {/* Step: Scanning Animation */}
                {step === 'scanning' && (
                  <div className="flex-1 flex flex-col justify-end gap-3 pb-4">
                    <div className="flex items-center justify-center gap-2 py-2">
                      <div className="w-2 h-2 bg-primary-500 rounded-full animate-ping" />
                      <span className="text-[10px] text-primary-400 font-mono">Scan IA de Scamurai...</span>
                    </div>
                    {/* Console Logs */}
                    <div className="bg-dark-950 border border-dark-800 rounded-xl p-3 font-mono text-[8px] text-dark-400 space-y-1 max-h-[160px] overflow-y-auto">
                      {logs.map((log, index) => (
                        <div key={index} className="leading-tight">{log}</div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Step: Blocked Notification */}
                {step === 'blocked' && (
                  <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="flex-1 flex flex-col items-center justify-center text-center p-4 gap-4"
                  >
                    <div className="w-14 h-14 bg-red-500/20 border border-red-500/30 rounded-full flex items-center justify-center animate-bounce">
                      <Shield className="w-7 h-7 text-red-500" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-red-400 mb-1">MENACE PHISHING BLOQUÉE</h4>
                      <p className="text-[10px] text-dark-400 leading-relaxed px-2">
                        Le moteur IA local a identifié ce message comme une tentative d'hameçonnage ciblé. Le lien a été neutralisé.
                      </p>
                    </div>
                    <div className="px-3 py-1 bg-red-500/10 border border-red-500/20 rounded-lg text-[9px] text-red-400 font-mono">
                      Confiance : 98.4% (Modèle local v1.0)
                    </div>
                  </motion.div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

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
        <PhishingSimulator />
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
