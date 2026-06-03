import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import ChatBot from './components/ChatBot';

// Pages
import Landing from './pages/Landing';
import Dashboard from './pages/Dashboard';
import Projects from './pages/Projects';
import NeuralCrypto from './pages/NeuralCrypto';

function App() {
  return (
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
        <Route path="/console" element={<NeuralCrypto />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/projects" element={<Projects />} />
      </Routes>
      <ChatBot />
    </Router>
  );
}

export default App;
