import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Star, Send } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useFirebase } from '../context/FirebaseContext';
import toast from 'react-hot-toast';
import axios from 'axios';

const Reviews = () => {
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState({ rating: 5, comment: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { isAuthenticated } = useAuth();
  const { user } = useFirebase();

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      const response = await axios.get('/api/reviews');
      setReviews(response.data);
    } catch (error) {
      console.error('Error fetching reviews:', error);
      // Demo data if API fails
      setReviews([
        {
          id: '1',
          userName: 'Alice Martin',
          userAvatar: null,
          rating: 5,
          comment: 'Projet incroyable ! L\'interface est magnifique et les fonctionnalités sont top.',
          createdAt: new Date().toISOString(),
        },
        {
          id: '2',
          userName: 'Thomas Dubois',
          userAvatar: null,
          rating: 4,
          comment: 'Très beau travail, hâte de voir les prochaines évolutions !',
          createdAt: new Date().toISOString(),
        },
      ]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isAuthenticated) {
      toast.error('Vous devez être connecté pour laisser un avis');
      return;
    }

    if (!newReview.comment.trim()) {
      toast.error('Veuillez écrire un commentaire');
      return;
    }

    setIsSubmitting(true);

    try {
      await axios.post('/api/reviews', {
        userId: user.uid,
        userName: user.displayName || user.email?.split('@')[0],
        userAvatar: user.photoURL,
        rating: newReview.rating,
        comment: newReview.comment,
      });

      toast.success('Avis publié avec succès !');
      setNewReview({ rating: 5, comment: '' });
      fetchReviews();
    } catch (error) {
      console.error('Error submitting review:', error);
      toast.error("Erreur lors de l'envoi de l'avis");
    } finally {
      setIsSubmitting(false);
    }
  };

  const StarRating = ({ rating, interactive = false, onRate }) => {
    return (
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type={interactive ? 'button' : undefined}
            disabled={!interactive}
            onClick={() => interactive && onRate?.(star)}
            className={`${interactive ? 'cursor-pointer hover:scale-110' : 'cursor-default'} transition-transform`}
          >
            <Star
              className={`w-5 h-5 ${
                star <= rating
                  ? 'fill-yellow-500 text-yellow-500'
                  : 'fill-dark-700 text-dark-700'
              }`}
            />
          </button>
        ))}
      </div>
    );
  };

  return (
    <section className="py-16 px-4 bg-dark-900/50">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-2">
            <span className="gradient-text">Avis & Feedback</span>
          </h2>
          <p className="text-dark-400">Découvrez ce que disent nos utilisateurs</p>
        </motion.div>

        {/* Review Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="card-glass p-6 mb-8"
        >
          <h3 className="text-xl font-semibold mb-4">Laisser un avis</h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm text-dark-400 mb-2">Votre note</label>
              <StarRating
                rating={newReview.rating}
                interactive
                onRate={(rating) => setNewReview({ ...newReview, rating })}
              />
            </div>
            <div>
              <label className="block text-sm text-dark-400 mb-2">Votre commentaire</label>
              <textarea
                value={newReview.comment}
                onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
                placeholder="Partagez votre expérience..."
                rows={4}
                className="input-field resize-none"
                disabled={!isAuthenticated}
              />
              {!isAuthenticated && (
                <p className="text-xs text-dark-500 mt-1">
                  Connectez-vous pour laisser un avis
                </p>
              )}
            </div>
            <button
              type="submit"
              disabled={isSubmitting || !isAuthenticated}
              className="btn-primary flex items-center gap-2"
            >
              <Send className="w-4 h-4" />
              {isSubmitting ? 'Envoi...' : 'Publier mon avis'}
            </button>
          </form>
        </motion.div>

        {/* Reviews List */}
        <div className="space-y-4">
          {reviews.map((review, index) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="card-glass p-6"
            >
              <div className="flex items-start gap-4">
                {review.userAvatar ? (
                  <img
                    src={review.userAvatar}
                    alt={review.userName}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                ) : (
                  <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-primary-700 rounded-full flex items-center justify-center text-lg font-bold">
                    {review.userName.charAt(0).toUpperCase()}
                  </div>
                )}
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold">{review.userName}</h4>
                    <span className="text-xs text-dark-500">
                      {new Date(review.createdAt).toLocaleDateString('fr-FR', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric',
                      })}
                    </span>
                  </div>
                  <StarRating rating={review.rating} />
                  <p className="text-dark-400 mt-2">{review.comment}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Reviews;
