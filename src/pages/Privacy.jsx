import { motion } from 'framer-motion';
import { Shield } from 'lucide-react';
import { Link } from 'react-router-dom';

const Privacy = () => {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
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
          <h1 className="text-3xl md:text-4xl font-bold mb-8 text-slate-900 tracking-tight">Politique de Confidentialité</h1>
          
          <div className="space-y-8 text-slate-600 leading-relaxed text-sm md:text-base">
            <div className="bg-primary-50 border border-primary-100 rounded-xl p-4 text-primary-800">
              <p className="font-medium">En tant qu'acteur de la cybersécurité, URYA applique les principes du <em>Privacy by Design</em> (protection des données dès la conception). La confidentialité de vos données est au cœur de notre modèle.</p>
            </div>

            <section>
              <h2 className="text-xl font-semibold text-slate-800 mb-3">1. Collecte et traitement des données</h2>
              
              <h3 className="text-lg font-medium text-slate-800 mt-4 mb-2">1.1 Formulaire de contact (Site Web)</h3>
              <p>
                Nous collectons uniquement les données strictement nécessaires lorsque vous remplissez notre formulaire de contact pour planifier une démonstration :
              </p>
              <ul className="list-disc pl-5 mt-2 mb-4 space-y-1">
                <li>Nom complet</li>
                <li>Adresse e-mail professionnelle</li>
                <li>Nom de l'entreprise et fonction</li>
                <li>Nature de votre besoin</li>
              </ul>

              <h3 className="text-lg font-medium text-slate-800 mt-4 mb-2">1.2 Application Mobile Scamurai</h3>
              <ul className="list-disc pl-5 mt-2 space-y-2">
                <li>
                  <strong>Fonctionnement local (Mode Gratuit) :</strong> L'analyse des messages, liens et numéros s'effectue de manière strictement locale (on-device) sur votre appareil. Aucune donnée issue de votre messagerie n'est transmise ou stockée sur nos serveurs.
                </li>
                <li>
                  <strong>Mode Premium (Analyse IA) :</strong> Lorsque vous sollicitez l'analyse contextuelle d'une discussion, le texte est envoyé à nos serveurs Cloud de manière sécurisée et chiffrée (TLS 1.3). Ces données sont traitées de manière éphémère et anonyme, et ne sont jamais associées à votre identité personnelle.
                </li>
                <li>
                  <strong>Module de Signalement (Crowdsourcing) :</strong> Lorsque vous signalez volontairement un numéro, un lien ou une arnaque, ces informations sont stockées dans notre base de données sécurisée (Collection Reports) pour enrichir notre liste noire globale et entraîner nos algorithmes de détection.
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-slate-800 mb-3">2. Finalité et Sécurité du traitement</h2>
              <p>
                Ces données sont utilisées <strong>exclusivement</strong> pour traiter votre demande et vous recontacter. 
                <br /><br />
                En conformité avec les standards de sécurité (chiffrement AES-256 au repos, TLS 1.3 en transit), vos informations sont chiffrées de bout en bout et stockées dans des environnements isolés et sécurisés.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-slate-800 mb-3">3. Non-partage des données</h2>
              <p>
                URYA Technologies s'engage formellement à <strong>ne jamais vendre, louer ou céder</strong> vos données personnelles à des tiers. Vos informations restent strictement confidentielles et souveraines.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-slate-800 mb-3">4. Conservation des données</h2>
              <p>
                Les données de contact sont conservées pour une durée maximale de 12 mois après notre dernier échange, à l'issue desquels elles sont irrémédiablement supprimées de nos systèmes via un effacement cryptographique sécurisé.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-slate-800 mb-3">5. Vos droits</h2>
              <p>
                Vous disposez d'un droit total de contrôle sur vos données (accès, rectification, effacement, limitation). Pour exercer ces droits, vous pouvez contacter notre responsable de la sécurité des systèmes d'information (RSSI) à l'adresse suivante : <a href="mailto:teamurya@gmail.com" className="text-primary-600 hover:underline">teamurya@gmail.com</a>.
              </p>
            </section>
          </div>
        </motion.div>
      </main>
    </div>
  );
};

export default Privacy;
