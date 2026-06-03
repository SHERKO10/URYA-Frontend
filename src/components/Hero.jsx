import { motion } from 'framer-motion';
import { ArrowRight, ChevronDown } from 'lucide-react';
import uryaLogo from '../assets/urya.jpg';
import heroBg from '../assets/hero_bg.png';

const Hero = () => {
  const scrollTo = (href) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{
        backgroundImage: `url(${heroBg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950/80 via-slate-950/70 to-slate-950/85 z-0" />

      {/* Subtle animated grid pattern */}
      <div className="absolute inset-0 z-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
        }}
      />

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-20 pb-16">
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="flex justify-center mb-10"
        >
          <div className="relative">
            <div className="absolute inset-0 bg-primary-500/30 rounded-2xl blur-2xl scale-150" />
            <img
              src={uryaLogo}
              alt="URYA"
              className="relative w-20 h-20 md:w-24 md:h-24 object-cover rounded-2xl shadow-2xl border border-white/10"
            />
          </div>
        </motion.div>

        {/* Overline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-6"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/10 backdrop-blur-sm border border-white/10 rounded-full text-primary-300 text-xs font-semibold tracking-wider uppercase">
            Cybersécurité & Intelligence Artificielle
          </span>
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold mb-6 text-white leading-[1.1] tracking-tight"
        >
          Souveraineté Numérique.
          <br />
          <span className="bg-gradient-to-r from-primary-300 via-primary-400 to-primary-300 bg-clip-text text-transparent">
            Protection Intelligente.
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="text-base sm:text-lg md:text-xl text-slate-300 mb-10 max-w-2xl mx-auto leading-relaxed font-light"
        >
          Cryptographie avancée et IA comportementale pour la protection
          de vos actifs numériques. Vos données restent sous votre contrôle.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <button
            onClick={() => scrollTo('#solutions')}
            className="group bg-white text-slate-900 px-8 py-4 rounded-xl font-semibold text-sm sm:text-base hover:bg-slate-100 transition-all duration-300 hover:scale-[1.03] shadow-xl flex items-center gap-2"
          >
            Découvrir nos solutions
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
          <button
            onClick={() => scrollTo('#contact')}
            className="group bg-white/10 backdrop-blur-sm text-white border border-white/20 px-8 py-4 rounded-xl font-semibold text-sm sm:text-base hover:bg-white/20 hover:border-white/30 transition-all duration-300 hover:scale-[1.03] flex items-center gap-2"
          >
            Planifier un échange
          </button>
        </motion.div>

        {/* Trust line */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="mt-12 text-slate-500 text-xs font-medium tracking-wide uppercase"
        >
          Partenaires : CUBE · OIF · D-CLIC
        </motion.p>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ChevronDown className="w-6 h-6 text-slate-500" />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
