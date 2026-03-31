import { createContext, useContext, useState, useEffect } from 'react';
import { useFirebase } from './FirebaseContext';

const AuthContext = createContext(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const { user, loading: firebaseLoading } = useFirebase();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!firebaseLoading) {
      setIsAuthenticated(!!user);
      setLoading(false);
    }
  }, [user, firebaseLoading]);

  const value = {
    isAuthenticated,
    loading,
    user,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
