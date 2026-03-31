import { useEffect, useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import Navbar from '../components/Navbar';

const emptyForm = {
  title: '',
  description: '',
  imageUrl: '',
  category: 'other',
  tags: '',
  members: '',
  isFeatured: false,
  github: '',
  demo: '',
  playstore: '',
};

const Admin = () => {
  const [adminUsername, setAdminUsername] = useState('');
  const [adminPassword, setAdminPassword] = useState('');
  const [adminKey, setAdminKey] = useState('');
  const [adminToken, setAdminToken] = useState(
    localStorage.getItem('urya_admin_token') || ''
  );
  const [projects, setProjects] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [loading, setLoading] = useState(false);

  const adminHeaders = adminToken
    ? { Authorization: `Bearer ${adminToken}` }
    : undefined;

  const loadProjects = async () => {
    try {
      const { data } = await axios.get('/api/projects');
      setProjects(data);
    } catch (error) {
      toast.error("Impossible de charger les projets");
    }
  };

  useEffect(() => {
    loadProjects();
  }, []);

  const onAdminLogin = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post('/api/admin/login', {
        username: adminUsername,
        password: adminPassword,
        apiKey: adminKey,
      });
      setAdminToken(data.token);
      localStorage.setItem('urya_admin_token', data.token);
      toast.success('Acces admin autorise');
    } catch (error) {
      toast.error(error?.response?.data?.message || 'Identifiants invalides');
    }
  };

  const onAdminLogout = () => {
    setAdminToken('');
    localStorage.removeItem('urya_admin_token');
    toast('Session admin fermee');
  };

  const resetForm = () => {
    setForm(emptyForm);
    setEditingId(null);
  };

  const onSave = async (e) => {
    e.preventDefault();
    if (!adminToken) {
      toast.error('Connecte-toi en admin d abord');
      return;
    }

    const payload = {
      title: form.title,
      description: form.description,
      imageUrl: form.imageUrl,
      category: form.category,
      isFeatured: form.isFeatured,
      tags: form.tags
        .split(',')
        .map((x) => x.trim())
        .filter(Boolean),
      members: form.members
        .split(',')
        .map((x) => x.trim())
        .filter(Boolean),
      links: {
        github: form.github || null,
        demo: form.demo || null,
        playstore: form.playstore || null,
      },
    };

    setLoading(true);
    try {
      if (editingId) {
        await axios.put(`/api/projects/${editingId}`, payload, {
          headers: adminHeaders,
        });
        toast.success('Projet modifié');
      } else {
        await axios.post('/api/projects', payload, { headers: adminHeaders });
        toast.success('Projet créé');
      }
      resetForm();
      loadProjects();
    } catch (error) {
      toast.error(
        error?.response?.data?.message || 'Erreur pendant la sauvegarde'
      );
    } finally {
      setLoading(false);
    }
  };

  const onEdit = (project) => {
    setEditingId(project.id);
    setForm({
      title: project.title || '',
      description: project.description || '',
      imageUrl: project.imageUrl || '',
      category: project.category || 'other',
      tags: (project.tags || []).join(', '),
      members: (project.members || []).join(', '),
      isFeatured: !!project.isFeatured,
      github: project.links?.github || '',
      demo: project.links?.demo || '',
      playstore: project.links?.playstore || '',
    });
  };

  const onDelete = async (id) => {
    if (!adminToken) {
      toast.error('Connecte-toi en admin d abord');
      return;
    }
    if (!confirm('Supprimer ce projet ?')) return;

    try {
      await axios.delete(`/api/projects/${id}`, { headers: adminHeaders });
      toast.success('Projet supprimé');
      loadProjects();
    } catch (error) {
      toast.error(error?.response?.data?.message || 'Suppression impossible');
    }
  };

  return (
    <div className="min-h-screen bg-dark-950">
      <Navbar />
      <section className="pt-24 pb-12 px-4">
        <div className={`max-w-7xl mx-auto ${adminToken ? 'grid lg:grid-cols-2 gap-8' : ''}`}>
          <div className="card-glass p-6">
            <h1 className="text-2xl font-bold mb-4 gradient-text">Admin Projets</h1>
            <p className="text-dark-400 text-sm mb-4">
              Authentification statique requise (username, password, api key).
            </p>

            {!adminToken ? (
              <form onSubmit={onAdminLogin} className="space-y-3 mb-6">
                <input
                  className="input-field"
                  placeholder="ADMIN_USERNAME"
                  value={adminUsername}
                  onChange={(e) => setAdminUsername(e.target.value)}
                  required
                />
                <input
                  type="password"
                  className="input-field"
                  placeholder="ADMIN_PASSWORD"
                  value={adminPassword}
                  onChange={(e) => setAdminPassword(e.target.value)}
                  required
                />
                <input
                  type="password"
                  className="input-field"
                  placeholder="ADMIN_API_KEY"
                  value={adminKey}
                  onChange={(e) => setAdminKey(e.target.value)}
                  required
                />
                <button className="btn-primary" type="submit">
                  Se connecter en admin
                </button>
              </form>
            ) : (
              <div className="mb-6 flex items-center justify-between gap-3 p-3 rounded-lg border border-dark-700 bg-dark-900/50">
                <p className="text-sm text-dark-300">Session admin active</p>
                <button className="btn-secondary" onClick={onAdminLogout}>
                  Deconnexion admin
                </button>
              </div>
            )}

            {adminToken ? (
              <form onSubmit={onSave} className="space-y-3">
                <input
                  className="input-field"
                  placeholder="Titre"
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  required
                />
                <textarea
                  className="input-field"
                  placeholder="Description"
                  value={form.description}
                  onChange={(e) =>
                    setForm({ ...form, description: e.target.value })
                  }
                  rows={4}
                  required
                />
                <input
                  className="input-field"
                  placeholder="Image URL"
                  value={form.imageUrl}
                  onChange={(e) => setForm({ ...form, imageUrl: e.target.value })}
                  required
                />
                <input
                  className="input-field"
                  placeholder="Catégorie (web, mobile, ai, other)"
                  value={form.category}
                  onChange={(e) => setForm({ ...form, category: e.target.value })}
                />
                <input
                  className="input-field"
                  placeholder="Tags (séparés par virgules)"
                  value={form.tags}
                  onChange={(e) => setForm({ ...form, tags: e.target.value })}
                />
                <input
                  className="input-field"
                  placeholder="Membres (séparés par virgules)"
                  value={form.members}
                  onChange={(e) => setForm({ ...form, members: e.target.value })}
                />
                <input
                  className="input-field"
                  placeholder="GitHub URL"
                  value={form.github}
                  onChange={(e) => setForm({ ...form, github: e.target.value })}
                />
                <input
                  className="input-field"
                  placeholder="Demo URL"
                  value={form.demo}
                  onChange={(e) => setForm({ ...form, demo: e.target.value })}
                />
                <input
                  className="input-field"
                  placeholder="PlayStore URL"
                  value={form.playstore}
                  onChange={(e) => setForm({ ...form, playstore: e.target.value })}
                />
                <label className="flex items-center gap-2 text-dark-300">
                  <input
                    type="checkbox"
                    checked={form.isFeatured}
                    onChange={(e) =>
                      setForm({ ...form, isFeatured: e.target.checked })
                    }
                  />
                  Projet phare
                </label>

                <div className="flex gap-3">
                  <button className="btn-primary" disabled={loading || !adminToken}>
                    {loading ? 'Sauvegarde...' : editingId ? 'Mettre à jour' : 'Créer'}
                  </button>
                  {editingId && (
                    <button
                      type="button"
                      className="btn-secondary"
                      onClick={resetForm}
                    >
                      Annuler
                    </button>
                  )}
                </div>
              </form>
            ) : (
              <div className="p-4 rounded-lg border border-dark-700 bg-dark-900/50 text-sm text-dark-400">
                Connecte-toi en admin pour afficher la partie edition des projets.
              </div>
            )}
          </div>

          {adminToken && (
          <div className="card-glass p-6">
            <h2 className="text-xl font-semibold mb-4">Projets existants</h2>
            <div className="space-y-3 max-h-[70vh] overflow-y-auto pr-1">
              {projects.map((project) => (
                <div
                  key={project.id}
                  className="p-4 rounded-lg border border-dark-700 bg-dark-900/60"
                >
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <p className="font-semibold">{project.title}</p>
                      <p className="text-xs text-dark-500">
                        {project.category} {project.isFeatured ? '• Phare' : ''}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <button className="btn-secondary" onClick={() => onEdit(project)}>
                        Edit
                      </button>
                      <button
                        className="px-3 py-2 rounded-lg bg-red-600/20 text-red-300 hover:bg-red-600/30"
                        onClick={() => onDelete(project.id)}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Admin;
