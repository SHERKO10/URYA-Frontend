import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import emailjs from '@emailjs/browser';
import toast from 'react-hot-toast';
import {
  Shield, Brain, Lock, Smartphone, BarChart3,
  ArrowRight, TrendingUp, AlertTriangle,
  Mail, Linkedin, Send,
  CheckCircle2, Users, Globe, Cpu,
  ChevronRight, ExternalLink,
} from 'lucide-react';
import Hero from '../components/Hero';
import Navbar from '../components/Navbar';
import cubelogo from '../assets/cubelogo.png';
import partner1 from '../assets/partner1.png';
import partner2 from '../assets/partner2.png';

/* ═══════════════════════════════════════════ */
/*  Phishing Simulator (Interactive Demo)     */
/* ═══════════════════════════════════════════ */
const PhishingSimulator = () => {
  const [step, setStep] = useState('idle');
  const [logs, setLogs] = useState([]);

  const runSimulation = () => {
    setStep('sms');
    setLogs([]);

    setTimeout(() => {
      setStep('scanning');
      addLog('Initialisation du moteur IA local…');

      setTimeout(() => addLog('Analyse sémantique NLP : contenu suspect identifié.'), 800);
      setTimeout(() => addLog('Vérification heuristique URL : domaine non authentifié.'), 1600);
      setTimeout(() => addLog('Score de confiance : 98.4% → Classification : Phishing.'), 2400);
      setTimeout(() => setStep('blocked'), 3200);
    }, 2000);
  };

  const addLog = (msg) => setLogs((prev) => [...prev, `> ${msg}`]);
  const reset = () => { setStep('idle'); setLogs([]); };

  return (
    <div className="grid md:grid-cols-2 gap-12 lg:gap-16 items-center max-w-6xl mx-auto">
      {/* Left — Text */}
      <div className="space-y-6 text-left">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-primary-50 border border-primary-200 rounded-full text-primary-700 text-xs font-semibold tracking-wide">
          <Shield className="w-3.5 h-3.5" />
          PROTECTION MOBILE EN TEMPS RÉEL
        </div>
        <h3 className="text-3xl md:text-4xl font-bold text-slate-900 leading-tight tracking-tight">
          Comment{' '}
          <span className="gradient-text">Scamurai</span>{' '}
          neutralise les menaces.
        </h3>
        <p className="text-slate-600 leading-relaxed text-sm md:text-base max-w-lg">
          Notre moteur d'IA locale s'exécute directement sur l'appareil.
          Il analyse en temps réel chaque SMS et lien entrant, identifie les
          tentatives d'hameçonnage et neutralise les menaces — sans envoyer
          vos données à un serveur externe.
        </p>

        <div className="pt-2">
          {step === 'idle' ? (
            <button onClick={runSimulation} className="btn-glow flex items-center gap-2 text-sm">
              Lancer la simulation
              <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <button onClick={reset} className="btn-secondary text-sm">
              Réinitialiser
            </button>
          )}
        </div>
      </div>

      {/* Right — Phone Mockup */}
      <div className="flex justify-center">
        <div className="relative w-[270px] sm:w-[290px] h-[540px] sm:h-[580px] bg-slate-950 border-4 border-slate-800 rounded-[40px] shadow-2xl shadow-slate-900/20 overflow-hidden flex flex-col">
          {/* Notch */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-28 h-5 bg-slate-800 rounded-b-2xl z-20 flex justify-center items-center">
            <div className="w-10 h-0.5 bg-slate-950 rounded-full" />
          </div>

          {/* Status bar */}
          <div className="h-9 pt-2 px-5 flex justify-between items-center text-[9px] text-slate-500 font-semibold z-10">
            <span>14:02</span>
            <div className="flex items-center gap-1">
              <span>5G</span>
              <div className="w-3.5 h-1.5 border border-slate-500 rounded-sm" />
            </div>
          </div>

          {/* Screen */}
          <div className="flex-1 p-3.5 flex flex-col justify-between relative bg-slate-50">
            <div className="absolute inset-0 bg-gradient-to-b from-primary-500/5 via-transparent to-slate-100 pointer-events-none" />

            {/* Idle */}
            {step === 'idle' && (
              <div className="flex-1 flex flex-col items-center justify-center text-center p-4">
                <div className="w-14 h-14 bg-white border border-slate-200 rounded-2xl flex items-center justify-center mb-4 shadow-sm">
                  <Smartphone className="w-7 h-7 text-primary-500" />
                </div>
                <p className="text-slate-700 font-semibold text-xs">Prêt pour la simulation</p>
                <p className="text-slate-400 text-[10px] mt-1">Cliquez sur « Lancer la simulation ».</p>
              </div>
            )}

            {/* SMS + Scanning + Blocked */}
            {(step === 'sms' || step === 'scanning' || step === 'blocked') && (
              <div className="flex-1 flex flex-col gap-3">
                {/* SMS Card */}
                <motion.div
                  initial={{ y: -40, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  className={`p-3.5 rounded-2xl border transition-all duration-300 ${
                    step === 'blocked'
                      ? 'bg-red-50/80 border-red-200 text-red-900'
                      : 'bg-white border-slate-200 text-slate-800'
                  }`}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-5 h-5 bg-slate-100 rounded-full flex items-center justify-center text-[9px] font-bold text-slate-600">S</div>
                    <span className="text-[10px] font-bold text-slate-700">SMS Suspect</span>
                  </div>
                  <p className="text-[9px] text-slate-600 leading-normal">
                    INFO T-MONEY : Votre compte a été restreint. Mettez à jour vos informations :
                    <span className="text-primary-600 block mt-1 underline">http://t-money-securite-login.com</span>
                  </p>
                </motion.div>

                {/* Scanning */}
                {step === 'scanning' && (
                  <div className="flex-1 flex flex-col justify-end gap-2 pb-2">
                    <div className="flex items-center justify-center gap-2 py-1.5">
                      <div className="w-1.5 h-1.5 bg-primary-500 rounded-full animate-ping" />
                      <span className="text-[9px] text-primary-600 font-mono">Analyse IA en cours…</span>
                    </div>
                    <div className="bg-slate-900 border border-slate-700 rounded-xl p-2.5 font-mono text-[7px] text-slate-300 space-y-0.5 max-h-[140px] overflow-y-auto">
                      {logs.map((log, i) => (
                        <div key={i} className="leading-tight">{log}</div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Blocked */}
                {step === 'blocked' && (
                  <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="flex-1 flex flex-col items-center justify-center text-center p-3 gap-3"
                  >
                    <div className="w-12 h-12 bg-red-50 border border-red-200 rounded-full flex items-center justify-center animate-bounce">
                      <Shield className="w-6 h-6 text-red-600" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-red-600 mb-1">MENACE NEUTRALISÉE</h4>
                      <p className="text-[9px] text-slate-600 leading-relaxed px-1">
                        Le moteur IA local a identifié une tentative d'hameçonnage. Le lien a été bloqué.
                      </p>
                    </div>
                    <div className="px-2.5 py-1 bg-red-50 border border-red-200 rounded-lg text-[8px] text-red-700 font-mono font-semibold">
                      Confiance : 98.4% · Modèle local v1.0
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

/* ═══════════════════════════════════════════ */
/*  Contact Form                              */
/* ═══════════════════════════════════════════ */
const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '', email: '', company: '', role: '', message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Configuration EmailJS à remplacer par tes identifiants
      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID || 'YOUR_SERVICE_ID',
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID || 'YOUR_TEMPLATE_ID',
        {
          from_name: formData.name,
          reply_to: formData.email,
          company: formData.company,
          role: formData.role,
          message: formData.message,
          to_email: 'teamurya@gmail.com',
        },
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY || 'YOUR_PUBLIC_KEY'
      );

      setSubmitted(true);
      setFormData({ name: '', email: '', company: '', role: '', message: '' });
      toast.success('Message envoyé avec succès !');
      
      setTimeout(() => setSubmitted(false), 5000);
    } catch (error) {
      console.error('Erreur EmailJS:', error);
      toast.error('Erreur lors de l\'envoi du message. Veuillez réessayer plus tard.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="grid md:grid-cols-2 gap-12 lg:gap-16 max-w-6xl mx-auto">
      {/* Left — Info */}
      <div className="space-y-8">
        <div>
          <h3 className="text-3xl md:text-4xl font-bold text-slate-900 tracking-tight mb-4">
            Planifions un{' '}
            <span className="gradient-text">échange</span>.
          </h3>
          <p className="text-slate-600 leading-relaxed text-sm md:text-base">
            Vous souhaitez évaluer nos solutions pour votre organisation ?
            Remplissez le formulaire et notre équipe vous recontactera sous 24h
            pour organiser une démonstration personnalisée.
          </p>
        </div>

        <div className="space-y-5">
          {[
            { icon: <Mail className="w-5 h-5" />, label: 'Email', value: 'teamurya@gmail.com', href: 'mailto:teamurya@gmail.com' },
            { icon: <Linkedin className="w-5 h-5" />, label: 'LinkedIn', value: 'URYA Projet', href: 'https://www.linkedin.com/company/urya-projet/?lipi=urn%3Ali%3Apage%3Ad_flagship3_search_srp_all%3B%2FRvsLFyhRtSuJTzEP6nt7w%3D%3D' },
          ].map((item) => (
            <a key={item.label} href={item.href} target={item.label === 'LinkedIn' ? '_blank' : '_self'} rel="noreferrer" className="flex items-center gap-4 group">
              <div className="w-10 h-10 bg-primary-50 border border-primary-100 rounded-xl flex items-center justify-center text-primary-600 shrink-0 group-hover:bg-primary-100 transition-colors">
                {item.icon}
              </div>
              <div>
                <p className="text-xs text-slate-400 font-medium">{item.label}</p>
                <p className="text-sm text-slate-800 font-semibold group-hover:text-primary-600 transition-colors">{item.value}</p>
              </div>
            </a>
          ))}
        </div>
      </div>

      {/* Right — Form */}
      <div>
        {submitted ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="card-glass p-10 text-center h-full flex flex-col items-center justify-center"
          >
            <div className="w-16 h-16 bg-primary-50 border border-primary-200 rounded-full flex items-center justify-center mb-4">
              <CheckCircle2 className="w-8 h-8 text-primary-600" />
            </div>
            <h4 className="text-xl font-bold text-slate-900 mb-2">Message envoyé avec succès</h4>
            <p className="text-slate-500 text-sm">Notre équipe vous recontactera très prochainement.</p>
          </motion.div>
        ) : (
          <form onSubmit={handleSubmit} className="card-glass p-6 md:p-8 space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-500 mb-1.5 uppercase tracking-wider">Nom complet</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="Jean Dupont"
                  className="input-field"
                  disabled={isSubmitting}
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-500 mb-1.5 uppercase tracking-wider">Email professionnel</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="j.dupont@entreprise.com"
                  className="input-field"
                  disabled={isSubmitting}
                />
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-500 mb-1.5 uppercase tracking-wider">Entreprise</label>
                <input
                  type="text"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  required
                  placeholder="Nom de l'entreprise"
                  className="input-field"
                  disabled={isSubmitting}
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-500 mb-1.5 uppercase tracking-wider">Fonction</label>
                <input
                  type="text"
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  placeholder="DSI, RSSI, CTO…"
                  className="input-field"
                  disabled={isSubmitting}
                />
              </div>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-500 mb-1.5 uppercase tracking-wider">Votre besoin</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={4}
                placeholder="Décrivez brièvement votre besoin en cybersécurité…"
                className="input-field resize-none"
                disabled={isSubmitting}
              />
            </div>

            <button 
              type="submit" 
              disabled={isSubmitting}
              className="w-full btn-glow flex items-center justify-center gap-2 text-sm disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Envoi en cours...' : 'Envoyer la demande'}
              {!isSubmitting && <Send className="w-4 h-4" />}
            </button>
            <p className="text-[11px] text-slate-400 text-center">
              Vos informations restent confidentielles et ne sont jamais partagées.
            </p>
          </form>
        )}
      </div>
    </div>
  );
};

/* ═══════════════════════════════════════════ */
/*  Landing Page                              */
/* ═══════════════════════════════════════════ */
const Landing = () => {
  const fadeInUp = {
    initial: { opacity: 0, y: 40 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: '-50px' },
    transition: { duration: 0.7 },
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 overflow-x-hidden">
      <Navbar />
      <Hero />

      {/* ═══ About Section ═══ */}
      <section id="about" className="section-padding">
        <div className="max-w-7xl mx-auto">
          <motion.div {...fadeInUp} className="text-center mb-16">
            <span className="inline-block px-4 py-1.5 bg-primary-50 text-primary-700 text-xs font-semibold rounded-full border border-primary-100 mb-4 tracking-wide uppercase">
              Qui sommes-nous
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-5">
              Technologies de protection{' '}
              <span className="gradient-text">souveraines</span>.
            </h2>
            <p className="text-slate-600 max-w-3xl mx-auto text-base md:text-lg leading-relaxed">
              URYA conçoit des solutions de cybersécurité combinant{' '}
              <strong className="text-slate-800">cryptographie post-quantique</strong> et{' '}
              <strong className="text-slate-800">intelligence artificielle comportementale</strong>.
              Notre mission : garantir que vos données restent sous votre contrôle,
              sur votre infrastructure, sans dépendance à des serveurs étrangers.
            </p>
          </motion.div>

          {/* Key Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {[
              { value: '+38%', label: 'Hausse des cyberattaques en 2024', icon: <TrendingUp className="w-6 h-6" />, color: 'text-red-500' },
              { value: '3.55M', label: 'Utilisateurs Mobile Money ciblés', icon: <Smartphone className="w-6 h-6" />, color: 'text-primary-600' },
              { value: '<3ms', label: 'Latence de détection IA locale', icon: <Cpu className="w-6 h-6" />, color: 'text-blue-500' },
              { value: '24/7', label: 'Monitoring comportemental actif', icon: <Shield className="w-6 h-6" />, color: 'text-emerald-500' },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="card-glass p-5 md:p-6 text-center"
              >
                <div className={`${stat.color} mb-3 flex justify-center`}>{stat.icon}</div>
                <div className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">{stat.value}</div>
                <div className="text-slate-500 text-[11px] md:text-xs mt-1.5 font-medium leading-tight">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ Solutions Section ═══ */}
      <section id="solutions" className="section-padding section-alt">
        <div className="max-w-7xl mx-auto">
          <motion.div {...fadeInUp} className="text-center mb-16">
            <span className="inline-block px-4 py-1.5 bg-primary-50 text-primary-700 text-xs font-semibold rounded-full border border-primary-100 mb-4 tracking-wide uppercase">
              Nos Solutions
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-5">
              Architecture de sécurité{' '}
              <span className="gradient-text">multi-couches</span>.
            </h2>
            <p className="text-slate-600 max-w-2xl mx-auto text-base md:text-lg leading-relaxed">
              Trois niveaux de protection adaptés à chaque profil — du particulier
              aux grandes institutions.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6 md:gap-8">
            {[
              {
                icon: <Smartphone className="w-10 h-10" />,
                title: 'Scamurai',
                subtitle: 'Protection Mobile · B2C/B2B',
                description: 'Application mobile avec moteur IA embarqué. Filtrage en temps réel des SMS, appels et liens malveillants. Aucune donnée exportée.',
                features: ['IA locale on-device', 'Filtrage SMS/Appels', 'VPN Anti-Phishing DNS', 'Mode Gratuit & Premium'],
                accent: 'from-primary-500 to-primary-600',
                accentLight: 'bg-primary-50 border-primary-100 text-primary-600',
              },
              {
                icon: <Shield className="w-10 h-10" />,
                title: 'LORA',
                subtitle: 'Sécurité Automatisée · PME',
                description: 'Suite de sécurité réseau déployable en 48h. Surveillance automatisée, gestion centralisée, conçue pour les budgets PME.',
                features: ['Déploiement rapide', 'Sécurité périmétrique', 'Gestion centralisée', 'Tarification accessible'],
                accent: 'from-blue-500 to-blue-600',
                accentLight: 'bg-blue-50 border-blue-100 text-blue-600',
              },
              {
                icon: <Brain className="w-10 h-10" />,
                title: 'MAHAFA',
                subtitle: 'Intelligence Cryptographique · Entreprises',
                description: 'Solution phare pour grandes organisations. Analyse comportementale LSTM, détection d\'anomalies en temps réel et Kill-Switch cryptographique.',
                features: ['Réseaux LSTM + Random Forest', 'Kill-Switch cryptographique', 'API REST sécurisée', 'Détection temps réel'],
                accent: 'from-purple-500 to-purple-600',
                accentLight: 'bg-purple-50 border-purple-100 text-purple-600',
              },
            ].map((solution, i) => (
              <motion.div
                key={solution.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="card-glass card-hover p-7 md:p-8 relative overflow-hidden group"
              >
                {/* Gradient top bar */}
                <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${solution.accent} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

                <div className={`w-14 h-14 ${solution.accentLight} border rounded-2xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300`}>
                  {solution.icon}
                </div>
                <h3 className="text-xl font-bold mb-1 text-slate-900">{solution.title}</h3>
                <p className="text-xs font-semibold text-slate-400 mb-4 uppercase tracking-wider">{solution.subtitle}</p>
                <p className="text-slate-600 mb-6 text-sm leading-relaxed">{solution.description}</p>
                <ul className="space-y-2.5 border-t border-slate-100 pt-5">
                  {solution.features.map((f) => (
                    <li key={f} className="flex items-center gap-2.5 text-slate-700 text-sm">
                      <CheckCircle2 className="w-4 h-4 text-primary-500 shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ Demo Section ═══ */}
      <section id="demo" className="section-padding">
        <div className="max-w-7xl mx-auto">
          <motion.div {...fadeInUp} className="text-center mb-16">
            <span className="inline-block px-4 py-1.5 bg-primary-50 text-primary-700 text-xs font-semibold rounded-full border border-primary-100 mb-4 tracking-wide uppercase">
              Démonstration
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-5">
              Voyez la protection{' '}
              <span className="gradient-text">en action</span>.
            </h2>
            <p className="text-slate-600 max-w-2xl mx-auto text-base md:text-lg leading-relaxed">
              Testez notre simulation de détection de phishing en temps réel.
              Le moteur IA analyse, identifie et neutralise la menace en moins de 3 secondes.
            </p>
          </motion.div>

          <PhishingSimulator />
        </div>
      </section>

      {/* ═══ Partners Section ═══ */}
      <section className="section-padding section-alt">
        <div className="max-w-7xl mx-auto">
          <motion.div {...fadeInUp} className="text-center mb-12">
            <span className="inline-block px-4 py-1.5 bg-primary-50 text-primary-700 text-xs font-semibold rounded-full border border-primary-100 mb-4 tracking-wide uppercase">
              Écosystème
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-5">
              Ils nous font{' '}
              <span className="gradient-text">confiance</span>.
            </h2>
            <p className="text-slate-600 max-w-2xl mx-auto text-base md:text-lg leading-relaxed">
              URYA s'inscrit dans un écosystème d'innovation reconnu.
              Nos partenaires stratégiques valident notre approche technologique.
            </p>
          </motion.div>

          {/* Partner logos */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 max-w-4xl mx-auto items-center">
            {[
              {
                name: 'CUBE',
                description: 'Incubateur & Accélérateur Technologique',
                logo: partner1,
                isImage: true,
              },
              {
                name: 'OIF & D-CLIC',
                description: 'Organisation Internationale de la Francophonie',
                logo: partner2,
                isImage: true,
              },
            ].map((partner, i) => (
              <motion.div
                key={partner.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="card-glass p-8 text-center flex flex-col items-center"
              >
                {partner.isImage ? (
                  <img src={partner.logo} alt={partner.name} className="h-20 w-auto object-contain mb-4 hover:scale-105 transition-all duration-500" />
                ) : (
                  <div className="w-16 h-16 bg-primary-50 border border-primary-100 rounded-2xl flex items-center justify-center mb-4">
                    {partner.icon}
                  </div>
                )}
                <h4 className="text-lg font-bold text-slate-800 mb-1">{partner.name}</h4>
                <p className="text-xs text-slate-500 leading-relaxed">{partner.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ Contact Section ═══ */}
      <section id="contact" className="section-padding">
        <div className="max-w-7xl mx-auto">
          <motion.div {...fadeInUp} className="text-center mb-16">
            <span className="inline-block px-4 py-1.5 bg-primary-50 text-primary-700 text-xs font-semibold rounded-full border border-primary-100 mb-4 tracking-wide uppercase">
              Contact
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-5">
              Protégez vos actifs{' '}
              <span className="gradient-text">dès maintenant</span>.
            </h2>
          </motion.div>

          <ContactForm />
        </div>
      </section>

      {/* ═══ Footer ═══ */}
      <footer className="bg-slate-900 text-slate-300">
        {/* Main footer */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">
            {/* Brand */}
            <div className="sm:col-span-2 lg:col-span-1">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-9 h-9 bg-white/10 rounded-xl flex items-center justify-center">
                  <Shield className="w-5 h-5 text-primary-400" />
                </div>
                <span className="text-xl font-bold text-white tracking-tight">URYA</span>
              </div>
              <p className="text-sm text-slate-400 leading-relaxed max-w-xs">
                Souveraineté numérique et protection intelligente.
                Cryptographie avancée et IA comportementale.
              </p>
            </div>

            {/* Solutions */}
            <div>
              <h4 className="text-sm font-semibold text-white mb-4 uppercase tracking-wider">Solutions</h4>
              <ul className="space-y-2.5">
                {['Scamurai · Mobile', 'LORA · PME', 'MAHAFA · Entreprises'].map((item) => (
                  <li key={item}>
                    <span className="text-sm text-slate-400 hover:text-white transition-colors cursor-default">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Entreprise */}
            <div>
              <h4 className="text-sm font-semibold text-white mb-4 uppercase tracking-wider">Entreprise</h4>
              <ul className="space-y-2.5">
                {[
                  { label: 'À propos', href: '#about' },
                  { label: 'Démonstration', href: '#demo' },
                  { label: 'Contact', href: '#contact' },
                ].map((item) => (
                  <li key={item.label}>
                    <a
                      href={item.href}
                      className="text-sm text-slate-400 hover:text-white transition-colors"
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="text-sm font-semibold text-white mb-4 uppercase tracking-wider">Contact</h4>
              <ul className="space-y-2.5">
                <li>
                  <a href="mailto:teamurya@gmail.com" className="flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors">
                    <Mail className="w-4 h-4 text-slate-500" /> teamurya@gmail.com
                  </a>
                </li>
                <li>
                  <a href="https://www.linkedin.com/company/urya-projet/?lipi=urn%3Ali%3Apage%3Ad_flagship3_search_srp_all%3B%2FRvsLFyhRtSuJTzEP6nt7w%3D%3D" target="_blank" rel="noreferrer" className="flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors">
                    <Linkedin className="w-4 h-4 text-slate-500" /> LinkedIn
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-slate-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="text-xs text-slate-500">
              © {new Date().getFullYear()} URYA Technologies. Tous droits réservés.
            </p>
            <div className="flex items-center gap-4">
              <Link to="/legal" className="text-xs text-slate-500 hover:text-slate-300 transition-colors">Mentions légales</Link>
              <Link to="/privacy" className="text-xs text-slate-500 hover:text-slate-300 transition-colors">Politique de confidentialité</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
