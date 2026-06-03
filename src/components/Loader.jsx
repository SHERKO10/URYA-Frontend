import { motion } from 'framer-motion';

const Loader = () => {
  return (
    <div className="fixed inset-0 bg-white flex items-center justify-center z-50">
      <div className="relative">
        {/* Outer ring */}
        <motion.div
          className="w-20 h-20 border-3 border-slate-200 rounded-full"
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
        />
        {/* Inner pulse */}
        <motion.div
          className="absolute inset-3 bg-gradient-to-r from-primary-500 to-primary-400 rounded-full"
          animate={{ scale: [0.8, 1, 0.8], opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
        />
        {/* URYA text */}
        <motion.p
          className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-sm font-bold text-slate-400 tracking-widest"
          animate={{ opacity: [0.3, 1, 0.3] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          URYA
        </motion.p>
      </div>
    </div>
  );
};

export default Loader;
