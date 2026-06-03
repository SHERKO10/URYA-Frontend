import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Landing from './pages/Landing';
import Legal from './pages/Legal';
import Privacy from './pages/Privacy';

function App() {
  return (
    <Router>
      <Toaster
        position="top-center"
        toastOptions={{
          style: {
            background: '#ffffff',
            color: '#0f172a',
            border: '1px solid #e2e8f0',
            boxShadow: '0 4px 12px -2px rgb(0 0 0 / 0.06)',
            borderRadius: '12px',
            fontSize: '14px',
          },
        }}
      />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/legal" element={<Legal />} />
        <Route path="/privacy" element={<Privacy />} />
      </Routes>
    </Router>
  );
}

export default App;
