import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import uryaLogo from '../assets/urya.jpg';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Accueil', path: '/' },
    { name: 'Solutions', path: '/projects' },
    { name: 'Console Tech', path: '/console' },
  ];

  const whatsappNumberRaw = import.meta.env.VITE_WHATSAPP_NUMBER || '22890000000';
  const whatsappNumber = String(whatsappNumberRaw).replace(/\D/g, '');
  const whatsappLink = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
    "Bonjour URYA, je souhaite planifier une démonstration de vos solutions de cybersécurité."
  )}`;

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
        isScrolled
          ? 'bg-dark-950/80 backdrop-blur-xl border-b border-dark-800'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3">
            <motion.div
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.3 }}
              className="w-10 h-10 rounded-xl overflow-hidden"
            >
              <img
                src={uryaLogo}
                alt="URYA"
                className="w-full h-full object-cover"
              />
            </motion.div>
            <span className="text-xl font-bold gradient-text hidden sm:block">URYA</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-4 py-2 rounded-lg transition-all duration-300 ${
                  location.pathname === link.path
                    ? 'bg-primary-500/20 text-primary-400'
                    : 'text-dark-300 hover:text-white hover:bg-dark-800'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Action Button */}
          <div className="hidden md:flex items-center gap-3">
            <a
              href={whatsappLink}
              target="_blank"
              rel="noreferrer"
              className="btn-primary px-6 py-2.5 text-sm font-medium rounded-xl transition-all shadow-lg hover:shadow-primary-500/20"
            >
              Demander une Démo
            </a>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 text-dark-400 hover:text-white"
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-dark-950/95 backdrop-blur-xl border-b border-dark-800"
          >
            <div className="px-4 py-4 space-y-2">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`block px-4 py-3 rounded-lg transition-all ${
                    location.pathname === link.path
                      ? 'bg-primary-500/20 text-primary-400'
                      : 'text-dark-300 hover:text-white hover:bg-dark-800'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
              <a
                href={whatsappLink}
                target="_blank"
                rel="noreferrer"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block px-4 py-3 btn-primary text-center font-medium rounded-lg"
              >
                Demander une Démo
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
