import { useState } from 'react';
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
              Sécurité numérique de {' '}
              <span className="gradient-text">confiance</span>.
            </h2>
            <p className="text-slate-600 max-w-3xl mx-auto text-base md:text-lg leading-relaxed">
              URYA conçoit des solutions de cybersécurité simples et redoutablement efficaces, combinant{' '}
              <strong className="text-slate-800">technologies de pointe</strong> et{' '}
              <strong className="text-slate-800">intelligence artificielle</strong>.
              Notre mission : garantir que vos données professionnelles restent sous votre contrôle,
              protégées des cybermenaces, sans dépendre de serveurs étrangers.
            </p>
          </motion.div>

          {/* Key Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {[
              { value: '+38%', label: 'Hausse des cyberattaques en 2024', icon: <TrendingUp className="w-6 h-6" />, color: 'text-red-500' },
              { value: '3.55M', label: 'Utilisateurs ciblés par des fraudes', icon: <Smartphone className="w-6 h-6" />, color: 'text-primary-600' },
              { value: 'Immédiat', label: 'Blocage instantané des menaces', icon: <Cpu className="w-6 h-6" />, color: 'text-blue-500' },
              { value: '24/7', label: 'Surveillance et protection continue', icon: <Shield className="w-6 h-6" />, color: 'text-emerald-500' },
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

      {/* ═══ Featured Solutions: UryOffice & SUNSET ═══ */}
      <section id="solutions" className="py-20 md:py-28 bg-slate-900 relative overflow-hidden">
        {/* Decorative background glows */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-rose-500/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16 md:mb-20">
            <span className="inline-block px-4 py-1.5 bg-white/10 text-white text-xs font-semibold rounded-full border border-white/20 mb-4 tracking-wide uppercase">
              Productivité & Infrastructure
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight mb-5">
              La puissance collaborative et l'IA, <br className="hidden md:block" />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-amber-400 to-rose-400">réunies pour votre entreprise.</span>
            </h2>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 md:gap-12">
            {/* UryOffice Featured Card */}
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-white/5 border border-white/10 rounded-3xl p-8 md:p-12 hover:bg-white/10 transition-colors group relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-400 to-amber-600 opacity-50 group-hover:opacity-100 transition-opacity" />
              <div className="w-16 h-16 bg-amber-500/20 text-amber-400 rounded-2xl flex items-center justify-center mb-8 border border-amber-500/30 group-hover:scale-110 transition-transform duration-300">
                <Users className="w-8 h-8" />
              </div>
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-3">UryOffice</h3>
              <p className="text-amber-400 font-semibold mb-6 uppercase tracking-wider text-sm">L'Espace de Travail Souverain</p>
              <p className="text-slate-300 text-base md:text-lg leading-relaxed mb-8">
                Votre bureau virtuel privé et sécurisé. Organisez des visioconférences, échangez des messages et partagez des documents confidentiels sans craindre qu'ils ne soient interceptés.
              </p>
              <ul className="space-y-4 mb-8">
                {['Réunions vidéo privées', 'Messagerie d\'équipe sécurisée', 'Partage de documents protégé', 'Connexion facile pour vos employés'].map((f) => (
                  <li key={f} className="flex items-center gap-3 text-slate-300 font-medium">
                    <CheckCircle2 className="w-5 h-5 text-amber-400 shrink-0" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
              <button className="w-full py-3.5 px-6 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-900 font-bold transition-colors shadow-[0_0_20px_rgba(245,158,11,0.3)]">
                Découvrir UryOffice
              </button>
            </motion.div>

            {/* SUNSET Featured Card */}
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-white/5 border border-white/10 rounded-3xl p-8 md:p-12 hover:bg-white/10 transition-colors group relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-rose-400 to-rose-600 opacity-50 group-hover:opacity-100 transition-opacity" />
              <div className="w-16 h-16 bg-rose-500/20 text-rose-400 rounded-2xl flex items-center justify-center mb-8 border border-rose-500/30 group-hover:scale-110 transition-transform duration-300">
                <Cpu className="w-8 h-8" />
              </div>
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-3">SUNSET</h3>
              <p className="text-rose-400 font-semibold mb-6 uppercase tracking-wider text-sm">L'Assistant IT Intelligent</p>
              <p className="text-slate-300 text-base md:text-lg leading-relaxed mb-8">
                Un assistant virtuel qui aide vos équipes informatiques. Il gère automatiquement les tâches répétitives, répare les pannes courantes et maintient votre sécurité au plus haut niveau, toujours sous votre contrôle.
              </p>
              <ul className="space-y-4 mb-8">
                {['Gain de temps pour vos équipes', 'Résolution automatique des pannes', 'Validation humaine des actions', 'Maintenance simplifiée'].map((f) => (
                  <li key={f} className="flex items-center gap-3 text-slate-300 font-medium">
                    <CheckCircle2 className="w-5 h-5 text-rose-400 shrink-0" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
              <button className="w-full py-3.5 px-6 rounded-xl bg-rose-500 hover:bg-rose-400 text-slate-900 font-bold transition-colors shadow-[0_0_20px_rgba(244,63,94,0.3)]">
                Découvrir SUNSET
              </button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══ Security Solutions Section ═══ */}
      <section className="section-padding section-alt pt-12 md:pt-16">
        <div className="max-w-7xl mx-auto">
          <motion.div {...fadeInUp} className="text-center mb-16">
            <span className="inline-block px-4 py-1.5 bg-primary-50 text-primary-700 text-xs font-semibold rounded-full border border-primary-100 mb-4 tracking-wide uppercase">
              Nos Solutions
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-5">
              Une protection adaptée à {' '}
              <span className="gradient-text">chaque besoin</span>.
            </h2>
            <p className="text-slate-600 max-w-2xl mx-auto text-base md:text-lg leading-relaxed">
              Des solutions claires et efficaces pour chaque profil — du particulier
              aux grandes institutions.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {[
              {
                icon: <Smartphone className="w-10 h-10" />,
                title: 'Scamurai',
                subtitle: 'Protection Mobile · Grand Public / Pro',
                description: 'Application mobile intelligente qui sécurise votre téléphone. Elle bloque instantanément les SMS frauduleux, les appels indésirables et les liens dangereux. Vos données personnelles ne quittent jamais votre appareil.',
                features: ['Filtrage automatique des arnaques', 'Blocage des SMS & appels frauduleux', 'Protection totale de la vie privée', 'Analyse immédiate'],
                accent: 'from-primary-500 to-primary-600',
                accentLight: 'bg-primary-50 border-primary-100 text-primary-600',
              },
              {
                icon: <Shield className="w-10 h-10" />,
                title: 'LORA',
                subtitle: 'Sécurité Réseau · PME',
                description: 'La tranquillité d\'esprit pour vos bureaux. Une protection complète installée rapidement, qui surveille votre réseau informatique jour et nuit, adaptée au budget des petites et moyennes entreprises.',
                features: ['Mise en place simple et rapide', 'Surveillance automatique 24/7', 'Tableau de bord compréhensible', 'Tarification abordable'],
                accent: 'from-blue-500 to-blue-600',
                accentLight: 'bg-blue-50 border-blue-100 text-blue-600',
              },
              {
                icon: <Brain className="w-10 h-10" />,
                title: 'MAHAFA',
                subtitle: 'Bouclier Avancé · Grandes Entreprises',
                description: 'Solution de très haute sécurité. MAHAFA analyse les comportements de votre système et bloque les cyberattaques sophistiquées en une fraction de seconde avant qu\'elles ne fassent des dégâts.',
                features: ['Détection intelligente des menaces', 'Verrouillage d\'urgence automatique', 'Protection sans faille', 'Suivi en temps réel'],
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
                La sécurité numérique en toute simplicité.
                Protégez vos données et votre entreprise avec nos solutions de confiance.
              </p>
            </div>

            {/* Solutions */}
            <div>
              <h4 className="text-sm font-semibold text-white mb-4 uppercase tracking-wider">Solutions</h4>
              <ul className="space-y-2.5">
                {['Scamurai · Mobile', 'LORA · PME', 'MAHAFA · Entreprises', 'UryOffice · Collaboration', 'SUNSET · Agent IA', 'Analyseur d\'URL · Outil Web'].map((item) => (
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
