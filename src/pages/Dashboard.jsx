import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  Shield,
  Brain,
  Smartphone,
  Lock,
  BarChart3,
  Rocket,
  Target,
  Users,
  ArrowRight,
  ExternalLink,
  MessageCircle,
} from 'lucide-react';
import Navbar from '../components/Navbar';
import Reviews from '../components/Reviews';
import axios from 'axios';

const Dashboard = () => {
  const [projects, setProjects] = useState([]);
  const [featuredProject, setFeaturedProject] = useState(null);
  const [stats, setStats] = useState({ projects: 0, average: 0, reviews: 0 });

  useEffect(() => {
    const loadData = async () => {
      try {
        const [projectsRes, reviewStatsRes] = await Promise.all([
          axios.get('/api/projects'),
          axios.get('/api/reviews/stats/average'),
        ]);

        const apiProjects = projectsRes.data || [];
        setProjects(apiProjects);
        setFeaturedProject(
          apiProjects.find((p) => p.isFeatured) || apiProjects[0] || null
        );

        setStats({
          projects: apiProjects.length,
          average: Number(reviewStatsRes.data?.averageRating || 0).toFixed(1),
          reviews: reviewStatsRes.data?.totalReviews || 0,
        });
      } catch (error) {
        console.error('Error loading dashboard data:', error);
      }
    };

    loadData();
  }, []);

  const whatsappNumberRaw =
    import.meta.env.VITE_WHATSAPP_NUMBER || '22890000000';
  const whatsappNumber = String(whatsappNumberRaw).replace(/\D/g, '');

  const getLearnMoreLink = (project) =>
    project?.links?.github || project?.links?.demo || project?.links?.playstore;

  const getWhatsAppLink = (project) => {
    const message = `Bonjour URYA, je suis intéressé(e) par la solution "${project.title}". Pouvez-vous me donner plus d'informations ?`;
    return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
  };

  return (
    <div className="min-h-screen bg-dark-950">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-32 pb-16 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-primary-500/10 border border-primary-500/20 rounded-full mb-6"
            >
              <Rocket className="w-4 h-4 text-primary-400" />
              <span className="text-sm text-primary-400">Projet de Stage CUBE 2026</span>
            </motion.div>

            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              <span className="gradient-text">URYA - Protection des Données</span>
            </h1>

            <p className="text-xl text-dark-400 max-w-3xl mx-auto mb-8">
              Solutions de cybersécurité par cryptographie et intelligence artificielle.
              <br />
              Confidentialité • Intégrité • Authentification • Non-répudiation
            </p>

            {/* Mission Cards */}
            <div className="grid md:grid-cols-4 gap-4 max-w-6xl mx-auto">
              {[
                {
                  icon: <Shield className="w-6 h-6" />,
                  title: 'Confidentialité',
                  description: 'Chiffrement AES-256 et RSA-4096',
                },
                {
                  icon: <Lock className="w-6 h-6" />,
                  title: 'Intégrité',
                  description: 'Signatures numériques',
                },
                {
                  icon: <Users className="w-6 h-6" />,
                  title: 'Authentification',
                  description: 'JWT, biométrie',
                },
                {
                  icon: <BarChart3 className="w-6 h-6" />,
                  title: 'Non-répudiation',
                  description: 'Traçabilité complète',
                },
              ].map((item, index) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index }}
                  className="card-glass p-6 text-left"
                >
                  <div className="text-primary-400 mb-3">{item.icon}</div>
                  <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                  <p className="text-dark-400 text-sm">{item.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16"
          >
            {Object.entries(stats).map(([key, value], index) => (
              <div
                key={key}
                className="card-glass p-6 text-center"
              >
                <div className="text-3xl md:text-4xl font-bold gradient-text mb-1">
                  {value}
                </div>
                <div className="text-dark-500 text-sm">
                  {key === 'projects' && 'Projets'}
                  {key === 'average' && 'Note moyenne'}
                  {key === 'reviews' && 'Avis publiés'}
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Featured Project */}
      <section className="py-16 px-4 bg-dark-900/50">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-8"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-2">
              <span className="gradient-text">Projet Phare</span>
            </h2>
            <p className="text-dark-400">
              Mis en avant depuis la base de données SQLite
            </p>
          </motion.div>

          {featuredProject && (
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="card-glass overflow-hidden"
            >
            <div className="grid md:grid-cols-2 gap-0">
              <div className="relative h-64 md:h-auto">
                <img
                  src={featuredProject.imageUrl}
                  alt={featuredProject.title}
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-dark-950 to-transparent md:bg-gradient-to-r" />
              </div>
              <div className="p-8 md:p-12 flex flex-col justify-center">
                <div className="flex items-center gap-2 mb-4">
                  <Brain className="w-6 h-6 text-primary-400" />
                  <span className="text-primary-400 font-semibold">
                    {featuredProject.category?.toUpperCase()}
                  </span>
                </div>
                <h3 className="text-2xl md:text-3xl font-bold mb-4">
                  {featuredProject.title}
                </h3>
                <p className="text-dark-400 mb-6">
                  {featuredProject.description}
                </p>
                <ul className="space-y-2 mb-6">
                  {(featuredProject.tags || []).map((feature) => (
                    <li key={feature} className="flex items-center gap-2 text-dark-300 text-sm">
                      <Shield className="w-4 h-4 text-primary-500" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <div className="flex flex-wrap gap-2 mb-6">
                  {(featuredProject.members || []).map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 bg-primary-500/10 text-primary-400 text-sm rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {getLearnMoreLink(featuredProject) ? (
                    <a
                      href={getLearnMoreLink(featuredProject)}
                      target="_blank"
                      rel="noreferrer"
                      className="btn-secondary flex items-center justify-center gap-2"
                    >
                      <ExternalLink className="w-4 h-4" />
                      En savoir plus
                    </a>
                  ) : (
                    <button
                      type="button"
                      disabled
                      className="btn-secondary opacity-60 cursor-not-allowed"
                    >
                      En savoir plus
                    </button>
                  )}
                  <a
                    href={getWhatsAppLink(featuredProject)}
                    target="_blank"
                    rel="noreferrer"
                    className="btn-primary flex items-center justify-center gap-2"
                  >
                    <MessageCircle className="w-4 h-4" />
                    Obtenir la solution
                  </a>
                  <button
                    type="button"
                    disabled
                    className="btn-secondary opacity-60 cursor-not-allowed"
                  >
                    Financer le projet
                  </button>
                </div>
              </div>
            </div>
            </motion.div>
          )}
        </div>
      </section>

      {/* All Projects */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center justify-between mb-8"
          >
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-2">
                <span className="gradient-text">Tous les Projets & Services</span>
              </h2>
              <p className="text-dark-400">Solutions de cybersécurité et prestations</p>
            </div>
            <Link
              to="/projects"
              className="hidden md:flex items-center gap-2 text-primary-400 hover:text-primary-300"
            >
              Voir tout
              <ArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`card-glass card-hover overflow-hidden group ${
                  project.isFeatured ? 'ring-2 ring-primary-500/50' : ''
                }`}
              >
                {project.isFeatured && (
                  <div className="absolute top-4 right-4 z-10">
                    <span className="px-3 py-1 bg-primary-500 text-white text-xs font-semibold rounded-full">
                      Phare
                    </span>
                  </div>
                )}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={project.imageUrl}
                    alt={project.title}
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-dark-950 to-transparent" />
                </div>
                <div className="p-6">
                  <p className="text-primary-400 text-xs mb-2">
                    {project.category?.toUpperCase()}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-3">
                    {(project.tags || []).slice(0, 3).map((feature) => (
                      <span
                        key={feature}
                        className="px-2 py-1 bg-dark-800 text-dark-300 text-xs rounded"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
                  <p className="text-dark-400 text-sm mb-4">{project.description}</p>
                  <div className="flex flex-wrap gap-2 pt-4 border-t border-dark-800">
                    {(project.members || []).map((tech) => (
                      <span key={tech} className="text-dark-500 text-xs">
                        {tech}
                      </span>
                    ))}
                  </div>
                  <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-2">
                    {getLearnMoreLink(project) ? (
                      <a
                        href={getLearnMoreLink(project)}
                        target="_blank"
                        rel="noreferrer"
                        className="btn-secondary flex items-center justify-center gap-2"
                      >
                        <ExternalLink className="w-4 h-4" />
                        En savoir plus
                      </a>
                    ) : (
                      <button
                        type="button"
                        disabled
                        className="btn-secondary opacity-60 cursor-not-allowed"
                      >
                        En savoir plus
                      </button>
                    )}
                    <a
                      href={getWhatsAppLink(project)}
                      target="_blank"
                      rel="noreferrer"
                      className="btn-primary flex items-center justify-center gap-2"
                    >
                      <MessageCircle className="w-4 h-4" />
                      Obtenir la solution
                    </a>
                    <button
                      type="button"
                      disabled
                      className="btn-secondary opacity-60 cursor-not-allowed"
                    >
                      Financer le projet
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-8 md:hidden">
            <Link
              to="/projects"
              className="btn-secondary inline-flex items-center gap-2"
            >
              Voir tous les projets
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <Reviews />

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

export default Dashboard;
