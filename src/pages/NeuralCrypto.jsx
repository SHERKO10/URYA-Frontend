import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Lock,
  Unlock,
  FileText,
  Wifi,
  Database,
  BarChart3,
  BookOpen,
  Shield,
  Cpu,
  Upload,
  Download,
  Send,
  AlertTriangle,
  CheckCircle,
  Clock,
  Zap,
} from 'lucide-react';
import Navbar from '../components/Navbar';
import axios from 'axios';

const API = import.meta.env.VITE_NEURAL_CRYPTO_URL || 'http://localhost:5005';

const TABS = [
  { id: 'executive', label: 'Vue Executive', icon: <Shield className="w-4 h-4" /> },
  { id: 'encrypt', label: 'Chiffrement', icon: <Lock className="w-4 h-4" /> },
  { id: 'decrypt', label: 'Déchiffrement', icon: <Unlock className="w-4 h-4" /> },
  { id: 'files', label: 'Fichiers', icon: <FileText className="w-4 h-4" /> },
  { id: 'tunnel', label: 'Tunnel VPN', icon: <Wifi className="w-4 h-4" /> },
  { id: 'vault', label: 'Coffre TDE', icon: <Database className="w-4 h-4" /> },
  { id: 'benchmark', label: 'Performance', icon: <BarChart3 className="w-4 h-4" /> },
  { id: 'docs', label: 'Livre Blanc', icon: <BookOpen className="w-4 h-4" /> },
];

// ────────────────────────────────────────────────────────────────────────────────
// Sub-components
// ────────────────────────────────────────────────────────────────────────────────

const StatCard = ({ label, value, unit = '', color = 'text-primary-400' }) => (
  <div className="card-glass p-4 text-center">
    <p className="text-dark-500 text-xs mb-1">{label}</p>
    <p className={`text-2xl font-bold ${color}`}>
      {value} <span className="text-sm font-normal text-dark-400">{unit}</span>
    </p>
  </div>
);

const ResultBox = ({ label, content, variant = 'default' }) => {
  const headerColor =
    variant === 'success'
      ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
      : variant === 'danger'
      ? 'bg-red-500/10 text-red-400 border-red-500/30'
      : 'bg-dark-800 text-dark-300 border-dark-700';

  return (
    <div className="mt-4">
      <p className="text-dark-400 text-xs mb-2 font-medium">{label}</p>
      <div className="rounded-xl overflow-hidden border border-dark-700">
        <div className={`px-4 py-2 text-xs font-semibold border-b ${headerColor}`}>
          {variant === 'success' ? '✓ Données sécurisées' : variant === 'danger' ? '⚠ Flux chiffré' : 'Résultat'}
        </div>
        <div className="p-4 bg-dark-900/60 font-mono text-xs text-dark-300 break-all max-h-40 overflow-y-auto">
          {content || <span className="text-dark-600 italic">En attente...</span>}
        </div>
      </div>
    </div>
  );
};

const InputField = ({ label, id, type = 'text', value, onChange, placeholder, rows }) => (
  <div className="mb-4">
    <label htmlFor={id} className="block text-dark-300 text-sm mb-2 font-medium">
      {label}
    </label>
    {rows ? (
      <textarea
        id={id}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        rows={rows}
        className="w-full px-4 py-3 bg-dark-900/60 border border-dark-700 rounded-xl text-white text-sm placeholder-dark-600 focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500/30 resize-none transition-all"
      />
    ) : (
      <input
        id={id}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full px-4 py-3 bg-dark-900/60 border border-dark-700 rounded-xl text-white text-sm placeholder-dark-600 focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500/30 transition-all"
      />
    )}
  </div>
);

// ────────────────────────────────────────────────────────────────────────────────
// Tab: Executive Summary
// ────────────────────────────────────────────────────────────────────────────────
const TabExecutive = ({ setActiveTab }) => (
  <div className="space-y-8">
    {/* Hero */}
    <div className="relative card-glass p-10 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary-600/10 via-violet-600/5 to-transparent" />
      <div className="relative z-10 grid md:grid-cols-2 gap-8 items-center">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-primary-500/10 border border-primary-500/20 rounded-full text-primary-400 text-xs font-semibold mb-6">
            <Cpu className="w-3 h-3" /> VISION STRATÉGIQUE
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            L'évolution <span className="gradient-text">post-quantique</span> de votre sécurité.
          </h2>
          <p className="text-dark-400 mb-6 leading-relaxed">
            URYA apporte la puissance inédite des réseaux neuronaux pour tisser un bouclier adaptatif de nouvelle génération autour de vos données. Une innovation Deep Tech au service absolu de la souveraineté de vos secrets industriels et financiers.
          </p>
          <div className="flex flex-wrap gap-3">
            <button onClick={() => setActiveTab('tunnel')} className="btn-primary text-sm">
              Découvrir le Tunnel VPN
            </button>
            <button onClick={() => setActiveTab('vault')} className="btn-secondary text-sm">
              Découvrir le Coffre TDE
            </button>
          </div>
        </div>
        <div className="card-glass p-6 space-y-3">
          <p className="text-dark-400 text-xs font-semibold uppercase tracking-wider mb-4">Statut Cryptographique</p>
          {[
            { label: 'Résilience', value: 'Post-Quantique', color: 'text-emerald-400' },
            { label: 'Conformité', value: 'FIPS-140 Hybride', color: 'text-primary-400' },
            { label: 'Topologie', value: 'Réseaux Convolutifs', color: 'text-violet-400' },
            { label: 'Paramètres', value: '400 000+', color: 'text-cyan-400' },
          ].map((item) => (
            <div key={item.label} className="flex items-center justify-between p-3 bg-dark-900/50 rounded-lg border border-dark-700">
              <span className="text-dark-400 text-sm">{item.label}</span>
              <strong className={`text-sm ${item.color}`}>{item.value}</strong>
            </div>
          ))}
        </div>
      </div>
    </div>

    {/* 3 pillars */}
    <div className="grid md:grid-cols-3 gap-6">
      {[
        {
          icon: <Cpu className="w-8 h-8" />,
          title: 'Le Paradigme Neuronal',
          desc: "URYA introduit l'IA au cœur de la cryptosécurité. Via un réseau de plus de 400 000 paramètres dynamiques, le système génère un espace de brouillage en perpétuelle mutation.",
          color: 'text-primary-400',
        },
        {
          icon: <Shield className="w-8 h-8" />,
          title: 'Le Bouclier Adaptatif',
          desc: "Plutôt qu'une clé statique, URYA utilise l'IA pour générer un chaos cryptographique. Face à notre système, l'attaquant ne décèle qu'un \"Bruit Blanc\" illisible.",
          color: 'text-emerald-400',
        },
        {
          icon: <CheckCircle className="w-8 h-8" />,
          title: 'Intégration Enterprise',
          desc: "URYA a été pensé pour le déploiement en entreprise haute sécurité. Son architecture logicielle s'enroule de manière invisible autour de n'importe quel protocole existant.",
          color: 'text-violet-400',
        },
      ].map((item, i) => (
        <motion.div
          key={item.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.1 }}
          className="card-glass p-6"
        >
          <div className={`${item.color} mb-4`}>{item.icon}</div>
          <h3 className="text-lg font-semibold mb-3">{item.title}</h3>
          <p className="text-dark-400 text-sm leading-relaxed">{item.desc}</p>
        </motion.div>
      ))}
    </div>
  </div>
);

// ────────────────────────────────────────────────────────────────────────────────
// Tab: Encrypt
// ────────────────────────────────────────────────────────────────────────────────
const TabEncrypt = () => {
  const [secret, setSecret] = useState('');
  const [message, setMessage] = useState('');
  const [withIntegrity, setWithIntegrity] = useState(false);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleEncrypt = async () => {
    if (!secret || !message) { setError('Clé et message requis.'); return; }
    setError(''); setLoading(true);
    try {
      const { data } = await axios.post(`${API}/api/encrypt`, {
        message, secret, with_integrity: withIntegrity,
      });
      setResult(data);
    } catch (e) {
      setError(e.response?.data?.error || 'Erreur de connexion au serveur Neural Crypto (port 5005).');
    } finally { setLoading(false); }
  };

  return (
    <div className="grid md:grid-cols-2 gap-6">
      <div className="card-glass p-6">
        <h2 className="text-xl font-bold mb-1">Saisie des Données</h2>
        <p className="text-dark-400 text-sm mb-6">Paramétrez et chiffrez votre message texte.</p>
        <InputField label="Clé de Sécurité" id="enc-secret" type="password" value={secret} onChange={e => setSecret(e.target.value)} placeholder="Entrez la clé secrète..." />
        <InputField label="Message à Protéger" id="enc-msg" value={message} onChange={e => setMessage(e.target.value)} placeholder="Saisissez le texte confidentiel..." rows={5} />
        <label className="flex items-center gap-3 cursor-pointer mb-6">
          <input type="checkbox" checked={withIntegrity} onChange={e => setWithIntegrity(e.target.checked)} className="w-4 h-4 accent-primary-500" />
          <span className="text-dark-300 text-sm">Vérification d'intégrité CNN</span>
        </label>
        {error && <p className="text-red-400 text-sm mb-4 flex items-center gap-2"><AlertTriangle className="w-4 h-4" />{error}</p>}
        <button onClick={handleEncrypt} disabled={loading} className="btn-primary w-full flex items-center justify-center gap-2">
          <Lock className="w-4 h-4" />
          {loading ? 'Chiffrement en cours...' : 'Chiffrer le Message'}
        </button>
      </div>

      {result && (
        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="card-glass p-6">
          <h2 className="text-xl font-bold mb-1">Résultat du Chiffrement</h2>
          <p className="text-dark-400 text-sm mb-4">Données transformées par le réseau neuronal.</p>
          <div className="grid grid-cols-2 gap-3 mb-4">
            <StatCard label="Temps" value={result.stats?.encryption_time_ms?.toFixed(3) ?? '—'} unit="ms" />
            <StatCard label="Taille Clé" value={result.stats?.key_size_bits ?? '—'} unit="bits" />
          </div>
          <ResultBox label="Données Chiffrées (Base64)" content={result.ciphertext} variant="success" />
          {result.signature && <ResultBox label="Signature d'Intégrité CNN" content={result.signature} />}
        </motion.div>
      )}
    </div>
  );
};

// ────────────────────────────────────────────────────────────────────────────────
// Tab: Decrypt
// ────────────────────────────────────────────────────────────────────────────────
const TabDecrypt = () => {
  const [secret, setSecret] = useState('');
  const [ciphertext, setCiphertext] = useState('');
  const [signature, setSignature] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleDecrypt = async () => {
    if (!secret || !ciphertext) { setError('Clé et texte chiffré requis.'); return; }
    setError(''); setLoading(true);
    try {
      const { data } = await axios.post(`${API}/api/decrypt`, {
        ciphertext, secret, signature: signature || undefined,
      });
      setResult(data);
    } catch (e) {
      setError(e.response?.data?.error || 'Erreur de connexion au serveur Neural Crypto.');
    } finally { setLoading(false); }
  };

  return (
    <div className="grid md:grid-cols-2 gap-6">
      <div className="card-glass p-6">
        <h2 className="text-xl font-bold mb-1">Données Entrantes</h2>
        <p className="text-dark-400 text-sm mb-6">Restauration de message via clé symétrique.</p>
        <InputField label="Clé de Sécurité" id="dec-secret" type="password" value={secret} onChange={e => setSecret(e.target.value)} placeholder="Entrez la clé secrète..." />
        <InputField label="Message Chiffré (Base64)" id="dec-cipher" value={ciphertext} onChange={e => setCiphertext(e.target.value)} placeholder="Collez le texte chiffré ici..." rows={4} />
        <InputField label="Signature (Optionnel)" id="dec-sig" value={signature} onChange={e => setSignature(e.target.value)} placeholder="Collez la signature si disponible..." />
        {error && <p className="text-red-400 text-sm mb-4 flex items-center gap-2"><AlertTriangle className="w-4 h-4" />{error}</p>}
        <button onClick={handleDecrypt} disabled={loading} className="btn-primary w-full flex items-center justify-center gap-2">
          <Unlock className="w-4 h-4" />
          {loading ? 'Déchiffrement...' : 'Déchiffrer le Message'}
        </button>
      </div>

      {result && (
        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="card-glass p-6">
          <h2 className="text-xl font-bold mb-1">Message Restauré</h2>
          {result.verified && (
            <div className="flex items-center gap-2 text-emerald-400 text-sm mb-4 p-3 bg-emerald-500/10 rounded-lg border border-emerald-500/20">
              <CheckCircle className="w-4 h-4" /> Intégrité CNN vérifiée — CONFORME
            </div>
          )}
          <div className="p-4 bg-dark-900/60 rounded-xl border border-dark-700 font-mono text-sm text-white min-h-24 break-all">
            {result.plaintext}
          </div>
          <div className="mt-4">
            <StatCard label="Temps de déchiffrement" value={result.stats?.decryption_time_ms?.toFixed(3) ?? '—'} unit="ms" />
          </div>
        </motion.div>
      )}
    </div>
  );
};

// ────────────────────────────────────────────────────────────────────────────────
// Tab: Files
// ────────────────────────────────────────────────────────────────────────────────
const TabFiles = () => {
  const [encSecret, setEncSecret] = useState('');
  const [encFile, setEncFile] = useState(null);
  const [decSecret, setDecSecret] = useState('');
  const [decFile, setDecFile] = useState(null);
  const [loading, setLoading] = useState('');
  const [error, setError] = useState('');

  const handleFileEncrypt = async () => {
    if (!encSecret || !encFile) { setError('Clé et fichier requis.'); return; }
    setError(''); setLoading('enc');
    try {
      const formData = new FormData();
      formData.append('file', encFile);
      formData.append('secret', encSecret);
      const { data } = await axios.post(`${API}/api/file/encrypt`, formData, { responseType: 'blob' });
      const url = window.URL.createObjectURL(new Blob([data]));
      const a = document.createElement('a'); a.href = url; a.download = `${encFile.name}.urya`; a.click();
    } catch (e) { setError('Erreur chiffrement fichier.'); }
    finally { setLoading(''); }
  };

  const handleFileDecrypt = async () => {
    if (!decSecret || !decFile) { setError('Clé et fichier .urya requis.'); return; }
    setError(''); setLoading('dec');
    try {
      const formData = new FormData();
      formData.append('file', decFile);
      formData.append('secret', decSecret);
      const { data } = await axios.post(`${API}/api/file/decrypt`, formData, { responseType: 'blob' });
      const url = window.URL.createObjectURL(new Blob([data]));
      const a = document.createElement('a'); a.href = url; a.download = decFile.name.replace('.urya', ''); a.click();
    } catch (e) { setError('Erreur déchiffrement fichier.'); }
    finally { setLoading(''); }
  };

  return (
    <div className="grid md:grid-cols-2 gap-6">
      <div className="card-glass p-6">
        <div className="flex items-center gap-2 mb-1">
          <Upload className="w-5 h-5 text-primary-400" />
          <h2 className="text-xl font-bold">Protection de Fichiers</h2>
        </div>
        <p className="text-dark-400 text-sm mb-6">Génère un container <code className="text-primary-400">.urya</code> hautement sécurisé.</p>
        <InputField label="Clé de Sécurité" id="f-enc-secret" type="password" value={encSecret} onChange={e => setEncSecret(e.target.value)} placeholder="Clé de chiffrement..." />
        <div className="mb-4">
          <label className="block text-dark-300 text-sm mb-2 font-medium">Sélection du Fichier</label>
          <input type="file" onChange={e => setEncFile(e.target.files[0])} className="w-full text-dark-300 text-sm file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-primary-500/20 file:text-primary-400 file:cursor-pointer cursor-pointer" />
        </div>
        {error && <p className="text-red-400 text-sm mb-4 flex items-center gap-2"><AlertTriangle className="w-4 h-4" />{error}</p>}
        <button onClick={handleFileEncrypt} disabled={loading === 'enc'} className="btn-primary w-full flex items-center justify-center gap-2">
          <Lock className="w-4 h-4" />
          {loading === 'enc' ? 'Protection en cours...' : 'Protéger le Fichier'}
        </button>
      </div>

      <div className="card-glass p-6">
        <div className="flex items-center gap-2 mb-1">
          <Download className="w-5 h-5 text-emerald-400" />
          <h2 className="text-xl font-bold">Restauration de Fichiers</h2>
        </div>
        <p className="text-dark-400 text-sm mb-6">Extraction sécurisée depuis un container <code className="text-emerald-400">.urya</code>.</p>
        <InputField label="Clé de Sécurité" id="f-dec-secret" type="password" value={decSecret} onChange={e => setDecSecret(e.target.value)} placeholder="Même clé utilisée lors de la protection..." />
        <div className="mb-6">
          <label className="block text-dark-300 text-sm mb-2 font-medium">Container (.urya)</label>
          <input type="file" accept=".urya" onChange={e => setDecFile(e.target.files[0])} className="w-full text-dark-300 text-sm file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-emerald-500/20 file:text-emerald-400 file:cursor-pointer cursor-pointer" />
        </div>
        <button onClick={handleFileDecrypt} disabled={loading === 'dec'} className="btn-secondary w-full flex items-center justify-center gap-2">
          <Unlock className="w-4 h-4" />
          {loading === 'dec' ? 'Restauration en cours...' : 'Restaurer le Fichier'}
        </button>
      </div>
    </div>
  );
};

// ────────────────────────────────────────────────────────────────────────────────
// Tab: Tunnel
// ────────────────────────────────────────────────────────────────────────────────
const TabTunnel = () => {
  const [secret, setSecret] = useState('');
  const [message, setMessage] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleTunnel = async () => {
    if (!secret || !message) { setError('Clé et message requis.'); return; }
    setError(''); setLoading(true);
    try {
      const { data } = await axios.post(`${API}/api/tunnel/stream`, { message, secret });
      setResult(data);
    } catch (e) { setError(e.response?.data?.error || 'Erreur connexion serveur.'); }
    finally { setLoading(false); }
  };

  return (
    <div className="grid md:grid-cols-2 gap-6">
      <div className="card-glass p-6">
        <div className="flex items-center gap-2 p-3 bg-primary-500/10 border border-primary-500/20 rounded-lg mb-4">
          <Wifi className="w-4 h-4 text-primary-400" />
          <p className="text-xs text-primary-300"><b>Cas d'usage :</b> Sécuriser une liaison distante VPN sans perte de vitesse (ex: virement interbancaire).</p>
        </div>
        <h2 className="text-xl font-bold mb-1">Serveur d'Émission</h2>
        <p className="text-dark-400 text-sm mb-6">Simule l'envoi d'un paquet TCP via URYA Socket.</p>
        <InputField label="Clé de Session Partagée" id="tun-secret" type="password" value={secret} onChange={e => setSecret(e.target.value)} placeholder="Clé Diffie-Hellman..." />
        <InputField label="Trame de Données" id="tun-msg" value={message} onChange={e => setMessage(e.target.value)} placeholder="Données à envoyer sur le réseau..." rows={4} />
        {error && <p className="text-red-400 text-sm mb-4 flex items-center gap-2"><AlertTriangle className="w-4 h-4" />{error}</p>}
        <button onClick={handleTunnel} disabled={loading} className="btn-primary w-full flex items-center justify-center gap-2">
          <Send className="w-4 h-4" />
          {loading ? 'Transmission...' : 'Transmettre via le Tunnel'}
        </button>
      </div>

      {result && (
        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="card-glass p-6">
          <h2 className="text-xl font-bold mb-4">Analyse de Trafic & Réception</h2>
          <div className="grid grid-cols-2 gap-3 mb-4">
            <StatCard label="Latence Réseau" value={result.latence_totale_ms?.toFixed(2) ?? '—'} unit="ms" color="text-blue-400" />
            <StatCard label="Taille Payload" value={result.taille_payload ?? '—'} unit="B" />
          </div>
          <ResultBox label="Wire Shark (Interception du câble)" content={result.intercept_cable} variant="danger" />
          <ResultBox label="Serveur de Réception (Déchiffrement à la volée)" content={result.paquet_recu} variant="success" />
        </motion.div>
      )}
    </div>
  );
};

// ────────────────────────────────────────────────────────────────────────────────
// Tab: Vault
// ────────────────────────────────────────────────────────────────────────────────
const TabVault = () => {
  const [masterKey, setMasterKey] = useState('');
  const [fileName, setFileName] = useState('bilan_annuel.pdf');
  const [content, setContent] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleVault = async () => {
    if (!masterKey || !content) { setError('Clé maître et contenu requis.'); return; }
    setError(''); setLoading(true);
    try {
      const contentB64 = btoa(unescape(encodeURIComponent(content)));
      const { data } = await axios.post(`${API}/api/vault/sync`, {
        filename: fileName, content_b64: contentB64, master_key: masterKey,
      });
      setResult(data);
    } catch (e) { setError(e.response?.data?.error || 'Erreur connexion serveur.'); }
    finally { setLoading(false); }
  };

  return (
    <div className="grid md:grid-cols-2 gap-6">
      <div className="card-glass p-6">
        <div className="flex items-center gap-2 p-3 bg-amber-500/10 border border-amber-500/20 rounded-lg mb-4">
          <Database className="w-4 h-4 text-amber-400" />
          <p className="text-xs text-amber-300"><b>Cas d'usage :</b> Empêcher le vol de bases de données physiques (Ransomware) via chiffrement silencieux (TDE).</p>
        </div>
        <h2 className="text-xl font-bold mb-1">Zone de Dépôt TDE</h2>
        <p className="text-dark-400 text-sm mb-6">Simulez le dépôt d'un fichier dans le répertoire FUSE sécurisé.</p>
        <InputField label="Master Key (Clé Maître d'Entreprise)" id="v-key" type="password" value={masterKey} onChange={e => setMasterKey(e.target.value)} placeholder="Clé racine..." />
        <InputField label="Nom du fichier" id="v-name" value={fileName} onChange={e => setFileName(e.target.value)} placeholder="ex: rapport_financier.xlsx" />
        <InputField label="Contenu du Fichier (Simulation)" id="v-content" value={content} onChange={e => setContent(e.target.value)} placeholder="Contenu brut..." rows={4} />
        {error && <p className="text-red-400 text-sm mb-4 flex items-center gap-2"><AlertTriangle className="w-4 h-4" />{error}</p>}
        <button onClick={handleVault} disabled={loading} className="btn-secondary w-full flex items-center justify-center gap-2">
          <Database className="w-4 h-4" />
          {loading ? 'Enregistrement...' : 'Enregistrer sur le Disque Virtuel'}
        </button>
      </div>

      {result?.rapport && (
        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="card-glass p-6">
          <h2 className="text-xl font-bold mb-4">Activité Disque (Arrière-plan)</h2>
          <div className="p-3 bg-amber-500/10 border border-amber-500/20 rounded-lg mb-4 text-xs text-amber-300">
            Écriture détectée... Lancement du chiffrement asynchrone
          </div>
          <div className="grid grid-cols-2 gap-3 mb-4">
            <StatCard label="Temps TDE" value={result.rapport.temps_chiffrement_ms?.toFixed(2) ?? '—'} unit="ms" color="text-amber-400" />
            <StatCard label="Taille Secteur" value={result.rapport.taille_chiffree_octets ?? '—'} unit="B" />
          </div>
          <ResultBox label={`Fichier Réel sur le Disque (/dev/sda1) — ${result.rapport.nom_systeme ?? ''}`} content={result.rapport.apercu_hex} />
        </motion.div>
      )}
    </div>
  );
};

// ────────────────────────────────────────────────────────────────────────────────
// Tab: Benchmark
// ────────────────────────────────────────────────────────────────────────────────
const TabBenchmark = () => {
  const [size, setSize] = useState(1000);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleBenchmark = async () => {
    setError(''); setLoading(true);
    try {
      const { data } = await axios.post(`${API}/api/benchmark`, { message_size: size, iterations: 50 });
      setResult(data);
    } catch (e) { setError('Erreur connexion serveur Neural Crypto.'); }
    finally { setLoading(false); }
  };

  return (
    <div className="card-glass p-6 max-w-2xl">
      <h2 className="text-xl font-bold mb-1">Analyse de Performance Comparative</h2>
      <p className="text-dark-400 text-sm mb-6">Évaluation des temps de traitement : URYA vs AES-256-GCM.</p>

      {result && (
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="grid grid-cols-3 gap-4 mb-6">
          <StatCard label="Moyenne URYA" value={result.urya_avg_ms} unit="ms" color="text-primary-400" />
          <StatCard label="Moyenne AES" value={result.aes_avg_ms} unit="ms" color="text-dark-300" />
          <StatCard label="Facteur Gain" value={`${result.speedup}x`} unit="" color="text-emerald-400" />
        </motion.div>
      )}

      <InputField label="Taille du Message de Test (Octets)" id="bench-size" type="number" value={size} onChange={e => setSize(Number(e.target.value))} placeholder="1000" />
      <p className="text-dark-500 text-xs mb-4">⚠ Ce test charge le CPU — il peut prendre 10-30 secondes.</p>
      {error && <p className="text-red-400 text-sm mb-4 flex items-center gap-2"><AlertTriangle className="w-4 h-4" />{error}</p>}
      <button onClick={handleBenchmark} disabled={loading} className="btn-secondary flex items-center gap-2">
        <Zap className="w-4 h-4" />
        {loading ? 'Audit en cours... (~30s)' : "Démarrer l'Audit de Performance"}
      </button>
    </div>
  );
};

// ────────────────────────────────────────────────────────────────────────────────
// Tab: Docs (Livre Blanc)
// ────────────────────────────────────────────────────────────────────────────────
const TabDocs = () => (
  <div className="space-y-6">
    <div className="flex items-start justify-between gap-4 flex-wrap">
      <div>
        <h2 className="text-2xl font-bold mb-1">Livre Blanc : Pourquoi investir dans URYA ?</h2>
        <p className="text-dark-400 text-sm">Dossier de conviction stratégique pour Directoires, DSI et RSSI.</p>
      </div>
      <button onClick={() => alert('Téléchargement PDF — Simulation')} className="btn-primary flex items-center gap-2 text-sm">
        <Download className="w-4 h-4" /> Télécharger le PDF
      </button>
    </div>

    <div className="grid md:grid-cols-3 gap-6">
      {[
        {
          title: 'Imprévisibilité Radicale (Échec des Ransomwares)',
          desc: "Les Ransomwares s'infiltrent grâce aux récurrences logiques. URYA riposte : modifiez une seule virgule dans un texte de 100 pages, et l'IA altérera instantanément plus de 50% de l'intégralité du fichier crypté.",
          icon: <Zap className="w-6 h-6 text-red-400" />,
          color: 'border-red-500/20 bg-red-500/5',
        },
        {
          title: 'Furtivité Absolue (Analyse Fréquentielle)',
          desc: "La sortie neuronale d'URYA ressemble à une \"cassure radio\" sans aucune forme lisible. Sans le bloc IA URYA propriétaire, le fichier apparaît comme un \"vide informatique\" total face à l'assaillant.",
          icon: <Shield className="w-6 h-6 text-primary-400" />,
          color: 'border-primary-500/20 bg-primary-500/5',
        },
        {
          title: 'Supériorité Post-Quantique',
          desc: "Le moteur URYA génère virtuellement 2^1,600,000 cas de figures dynamiques. Une asymétrie monumentale qui déjoue par nature la cryptanalyse (y compris quantique) de demain.",
          icon: <Cpu className="w-6 h-6 text-violet-400" />,
          color: 'border-violet-500/20 bg-violet-500/5',
        },
      ].map((item, i) => (
        <motion.div
          key={item.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.1 }}
          className={`card-glass p-6 border ${item.color}`}
        >
          <div className="mb-4">{item.icon}</div>
          <h4 className="font-semibold mb-3 text-sm leading-snug">{item.title}</h4>
          <p className="text-dark-400 text-xs leading-relaxed">{item.desc}</p>
        </motion.div>
      ))}
    </div>

    <div className="card-glass p-6 border border-primary-500/20 bg-primary-500/5">
      <h3 className="font-semibold mb-3 text-primary-400">Conformité & Standards</h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {['FIPS-140 Hybride', 'AES-256-GCM', 'Post-Quantique', 'Zero Trust'].map(standard => (
          <div key={standard} className="flex items-center gap-2 text-sm">
            <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
            <span className="text-dark-300">{standard}</span>
          </div>
        ))}
      </div>
    </div>
  </div>
);

// ────────────────────────────────────────────────────────────────────────────────
// Main Component
// ────────────────────────────────────────────────────────────────────────────────
const NeuralCrypto = () => {
  const [activeTab, setActiveTab] = useState('executive');

  const renderTab = () => {
    switch (activeTab) {
      case 'executive': return <TabExecutive setActiveTab={setActiveTab} />;
      case 'encrypt':   return <TabEncrypt />;
      case 'decrypt':   return <TabDecrypt />;
      case 'files':     return <TabFiles />;
      case 'tunnel':    return <TabTunnel />;
      case 'vault':     return <TabVault />;
      case 'benchmark': return <TabBenchmark />;
      case 'docs':      return <TabDocs />;
      default:          return null;
    }
  };

  return (
    <div className="min-h-screen bg-dark-950">
      <Navbar />

      {/* Header */}
      <section className="pt-28 pb-6 px-4 border-b border-dark-800">
        <div className="max-w-7xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-8 h-8 bg-primary-500/20 rounded-lg flex items-center justify-center">
                <Shield className="w-4 h-4 text-primary-400" />
              </div>
              <p className="text-primary-400 text-sm font-semibold tracking-wide uppercase">URYA Console</p>
              <div className="flex items-center gap-1.5 px-2 py-0.5 bg-emerald-500/10 border border-emerald-500/20 rounded-full">
                <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" />
                <span className="text-emerald-400 text-xs">Système Opérationnel</span>
              </div>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold">
              <span className="gradient-text">Neural Cryptography</span>
              <span className="text-dark-500 text-lg font-normal ml-3">Enterprise Edition</span>
            </h1>
          </motion.div>
        </div>
      </section>

      {/* Tabs */}
      <div className="sticky top-16 md:top-20 z-30 bg-dark-950/80 backdrop-blur-xl border-b border-dark-800">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex gap-1 overflow-x-auto py-2 scrollbar-hide">
            {TABS.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all shrink-0 ${
                  activeTab === tab.id
                    ? 'bg-primary-500/20 text-primary-400 border border-primary-500/30'
                    : 'text-dark-400 hover:text-white hover:bg-dark-800'
                }`}
              >
                {tab.icon}
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <section className="py-8 px-4">
        <div className="max-w-7xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              {renderTab()}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 border-t border-dark-800">
        <div className="max-w-7xl mx-auto text-center text-dark-500">
          <p>© 2026 URYA × CUBE. Tous droits réservés.</p>
          <p className="text-sm mt-2">Projet de stage - Programme CUBE | Partenaire: D-CLIC - OIF</p>
        </div>
      </footer>
    </div>
  );
};

export default NeuralCrypto;
