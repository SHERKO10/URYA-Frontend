import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Brain,
  Smartphone,
  BarChart3,
  Target,
  Users,
  ExternalLink,
  MessageCircle,
} from 'lucide-react';
import Navbar from '../components/Navbar';
import axios from 'axios';

const categories = [
  { id: 'all', label: 'Tous', icon: null },
  { id: 'ai', label: 'IA', icon: <Brain className="w-4 h-4" /> },
  { id: 'mobile', label: 'Mobile', icon: <Smartphone className="w-4 h-4" /> },
];

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [filter, setFilter] = useState('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const { data } = await axios.get('/api/projects');
        setProjects(data);
      } catch (error) {
        console.error('Error fetching projects:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  const filteredProjects = filter === 'all'
    ? projects
    : projects.filter((p) => p.category === filter);

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

      <section className="pt-24 pb-12 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="gradient-text">Nos Projets & Services</span>
            </h1>
            <p className="text-dark-400 max-w-2xl mx-auto text-lg">
              Solutions de protection des données par cryptographie et intelligence artificielle
            </p>
          </motion.div>

          {/* Filter */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="flex flex-wrap justify-center gap-3 mb-12"
          >
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setFilter(cat.id)}
                className={`px-4 py-2 rounded-xl flex items-center gap-2 transition-all ${
                  filter === cat.id
                    ? 'bg-primary-500 text-white'
                    : 'bg-dark-800 text-dark-400 hover:bg-dark-700'
                }`}
              >
                {cat.icon}
                {cat.label}
              </button>
            ))}
          </motion.div>

          {/* Projects Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`card-glass card-hover overflow-hidden group flex flex-col ${
                  project.isFeatured ? 'ring-2 ring-primary-500/50' : ''
                }`}
              >
                {/* Featured Badge */}
                {project.isFeatured && (
                  <div className="absolute top-4 right-4 z-10">
                    <span className="px-3 py-1 bg-primary-500 text-white text-xs font-semibold rounded-full flex items-center gap-1">
                      <Brain className="w-3 h-3" />
                      Projet Phare
                    </span>
                  </div>
                )}

                {/* Image */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={project.imageUrl}
                    alt={project.title}
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-dark-950 to-transparent" />
                </div>

                {/* Content */}
                <div className="p-6 flex-1 flex flex-col">
                  <p className="text-primary-400 text-xs font-semibold mb-2">
                    {project.category?.toUpperCase()}
                  </p>

                  {/* Features */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {(project.tags || []).slice(0, 3).map((feature) => (
                      <span
                        key={feature}
                        className="px-2 py-1 bg-dark-800 text-dark-300 text-xs rounded"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-bold mb-2">{project.title}</h3>

                  {/* Description */}
                  <p className="text-dark-400 text-sm mb-4 flex-1">
                    {project.description}
                  </p>

                  {/* Members */}
                  {project.members?.length > 0 && (
                    <div className="mb-4 p-3 bg-dark-800/50 rounded-lg border border-dark-700">
                      <p className="text-dark-300 text-xs mb-1 font-semibold">
                        Membres
                      </p>
                      <p className="text-dark-400 text-xs">
                        {project.members.join(', ')}
                      </p>
                    </div>
                  )}

                  <div className="flex flex-wrap gap-2 pt-4 border-t border-dark-800">
                    {(project.tags || []).map((tech) => (
                      <span
                        key={tech}
                        className="text-dark-500 text-xs"
                      >
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

          {loading && (
            <div className="text-center py-12">
              <p className="text-dark-400">Chargement des projets...</p>
            </div>
          )}

          {!loading && filteredProjects.length === 0 && (
            <div className="text-center py-12">
              <p className="text-dark-400">Aucun projet dans cette catégorie</p>
            </div>
          )}
        </div>
      </section>

      {/* Info Section */}
      <section className="py-16 px-4 bg-dark-900/50">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              <span className="gradient-text">Période du Stage</span>
            </h2>
            <p className="text-dark-400">01 Mars 2026 - 30 Mai 2026 (3 mois)</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: <Target className="w-8 h-8" />,
                title: 'Objectif Principal',
                description: 'Produire des livrables concrets et commercialisables : notebooks cryptographiques, modules IA, dashboards SaaS, et prestations d\'audit.',
              },
              {
                icon: <Users className="w-8 h-8" />,
                title: 'Cible',
                description: 'Entreprises ayant des données confidentielles, banques, startups, et utilisateurs de Mobile Money au Togo.',
              },
              {
                icon: <BarChart3 className="w-8 h-8" />,
                title: 'Impact',
                description: 'Réduction des attaques ransomware, protection des transactions, et sensibilisation à la cybersécurité.',
              },
            ].map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="card-glass p-6"
              >
                <div className="text-primary-400 mb-4">{item.icon}</div>
                <h3 className="text-xl font-semibold mb-3">{item.title}</h3>
                <p className="text-dark-400 text-sm">{item.description}</p>
              </motion.div>
            ))}
          </div>
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

export default Projects;
