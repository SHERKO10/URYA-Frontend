import { motion } from 'framer-motion';
import { Shield } from 'lucide-react';
import Navbar from '../components/Navbar';
import { Link } from 'react-router-dom';

const Legal = () => {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      {/* We use a simplified navbar here, or the regular one. The regular one assumes anchors, so we might want a simple link back to home */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/85 backdrop-blur-xl border-b border-slate-200/80 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            <Link to="/" className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary-50 rounded-xl flex items-center justify-center text-primary-600">
                <Shield className="w-5 h-5" />
              </div>
              <span className="text-xl font-bold tracking-tight text-slate-900">URYA</span>
            </Link>
            <Link to="/" className="text-sm font-medium text-slate-600 hover:text-slate-900">
              Retour à l'accueil
            </Link>
          </div>
        </div>
      </nav>

      <main className="pt-32 pb-24 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="card-glass p-8 md:p-12"
        >
          <h1 className="text-3xl md:text-4xl font-bold mb-8 text-slate-900 tracking-tight">Mentions Légales</h1>
          
          <div className="space-y-8 text-slate-600 leading-relaxed text-sm md:text-base">
            <section>
              <h2 className="text-xl font-semibold text-slate-800 mb-3">1. Éditeur du site</h2>
              <p>
                Le site <strong>URYA</strong> est édité par la société URYA Technologies.<br />
                Adresse de messagerie : <a href="mailto:teamurya@gmail.com" className="text-primary-600 hover:underline">teamurya@gmail.com</a>
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-slate-800 mb-3">2. Hébergement</h2>
              <p>
                Ce site est hébergé sur une infrastructure sécurisée garantissant l'intégrité et la disponibilité des données, en conformité avec les standards de l'industrie de la cybersécurité.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-slate-800 mb-3">3. Propriété intellectuelle</h2>
              <p>
                L'ensemble du contenu de ce site (textes, images, logos, interfaces, algorithmes de démonstration) est la propriété exclusive de URYA Technologies. Toute reproduction, distribution, modification, adaptation, retransmission ou publication, même partielle, de ces différents éléments est strictement interdite sans l'accord exprès par écrit de URYA Technologies.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-slate-800 mb-3">4. Limitation de responsabilité</h2>
              <p>
                URYA Technologies s'efforce d'assurer au mieux de ses possibilités, l'exactitude et la mise à jour des informations diffusées sur ce site. Cependant, URYA Technologies ne décline toute responsabilité pour toute imprécision, inexactitude ou omission portant sur des informations disponibles sur le site.
                <br /><br />
                La démonstration de sécurité (Scamurai) proposée sur le site est fournie à titre illustratif. Les performances réelles peuvent varier selon l'environnement de déploiement.
              </p>
            </section>
          </div>
        </motion.div>
      </main>
    </div>
  );
};

export default Legal;
