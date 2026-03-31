import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from 'react-router-dom';
import { FirebaseProvider } from './context/FirebaseContext';
import { AuthProvider } from './context/AuthContext';
import { useAuth } from './context/AuthContext';
import { Toaster } from 'react-hot-toast';
import Loader from './components/Loader';
import ChatBot from './components/ChatBot';

// Pages
import Landing from './pages/Landing';
import Auth from './pages/Auth';
import Dashboard from './pages/Dashboard';
import Projects from './pages/Projects';
import Admin from './pages/Admin';

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return <Loader />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/auth" replace />;
  }

  return children;
};

const GlobalChatBot = () => {
  const location = useLocation();
  const hideOnRoutes = ['/auth', '/admin'];

  if (hideOnRoutes.includes(location.pathname)) {
    return null;
  }

  return <ChatBot />;
};

function App() {
  return (
    <FirebaseProvider>
      <AuthProvider>
        <Router>
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
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/projects" element={<Projects />} />
            <Route
              path="/admin"
              element={(
                <ProtectedRoute>
                  <Admin />
                </ProtectedRoute>
              )}
            />
          </Routes>
          <GlobalChatBot />
        </Router>
      </AuthProvider>
    </FirebaseProvider>
  );
}

export default App;
