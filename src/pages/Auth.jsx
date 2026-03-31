import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock, User, Chrome } from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';
import { useFirebase } from '../context/FirebaseContext';
import { useAuth } from '../context/AuthContext';

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);

  const { signInWithGoogle, signInWithEmail, signUpWithEmail } = useFirebase();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard', { replace: true });
    }
  }, [isAuthenticated, navigate]);

  if (isAuthenticated) return null;

  const handleGoogleSignIn = async () => {
    setLoading(true);
    const { user, error } = await signInWithGoogle();
    setLoading(false);

    if (error) {
      toast.error(error);
    } else {
      toast.success(`Bienvenue ${user.displayName || '!'}`);
      navigate('/dashboard');
    }
  };

  const handleEmailAuth = async (e) => {
    e.preventDefault();
    setLoading(true);

    let result;
    if (isLogin) {
      result = await signInWithEmail(email, password);
    } else {
      result = await signUpWithEmail(email, password);
    }

    setLoading(false);

    if (result.error) {
      toast.error(result.error);
    } else {
      toast.success(isLogin ? 'Connexion réussie !' : 'Compte créé !');
      navigate('/dashboard');
    }
  };

  return (
    <div className="min-h-screen bg-dark-950 flex items-center justify-center px-4 py-12">
      <Toaster
        position="top-center"
        toastOptions={{
          style: {
            background: '#1e293b',
            color: '#fff',
            border: '1px solid #334155',
          },
        }}
      />

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        {/* Card */}
        <div className="card-glass p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <motion.h1
              initial={{ y: -20 }}
              animate={{ y: 0 }}
              className="text-3xl font-bold gradient-text mb-2"
            >
              {isLogin ? 'Bon retour !' : 'Créer un compte'}
            </motion.h1>
            <p className="text-dark-400">
              {isLogin
                ? 'Connectez-vous pour accéder à URYA'
                : 'Rejoignez la communauté URYA'}
            </p>
          </div>

          {/* Google Sign In */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleGoogleSignIn}
            disabled={loading}
            className="w-full btn-secondary mb-6 flex items-center justify-center gap-3"
          >
            <Chrome className="w-5 h-5" />
            {isLogin ? 'Se connecter avec Google' : "S'inscrire avec Google"}
          </motion.button>

          {/* Divider */}
          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-dark-700" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-dark-900/50 text-dark-500">ou</span>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleEmailAuth} className="space-y-4">
            <AnimatePresence mode="wait">
              {!isLogin && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                >
                  <label className="input-field flex items-center gap-3">
                    <User className="w-5 h-5 text-dark-500" />
                    <input
                      type="text"
                      placeholder="Nom complet"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="bg-transparent border-none outline-none flex-1"
                    />
                  </label>
                </motion.div>
              )}
            </AnimatePresence>

            <label className="input-field flex items-center gap-3">
              <Mail className="w-5 h-5 text-dark-500" />
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="bg-transparent border-none outline-none flex-1"
              />
            </label>

            <label className="input-field flex items-center gap-3">
              <Lock className="w-5 h-5 text-dark-500" />
              <input
                type="password"
                placeholder="Mot de passe"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={6}
                className="bg-transparent border-none outline-none flex-1"
              />
            </label>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={loading}
              className="w-full btn-primary"
            >
              {loading ? 'Chargement...' : isLogin ? 'Se connecter' : "S'inscrire"}
            </motion.button>
          </form>

          {/* Toggle */}
          <p className="mt-6 text-center text-dark-400">
            {isLogin ? "Pas encore de compte ?" : "Déjà un compte ?"}{' '}
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="text-primary-400 hover:text-primary-300 font-medium"
            >
              {isLogin ? "S'inscrire" : 'Se connecter'}
            </button>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Auth;
