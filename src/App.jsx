import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast'; // <-- Importamos aqui
import Layout from './components/Layout.jsx';
import Login from './pages/Login.jsx';
import Dashboard from './pages/Dashboard.jsx';
import Cartoes from './pages/Cartoes.jsx';
import Transferencias from './pages/Transferencias.jsx';
import Poupancas from './pages/Poupancas.jsx';
import PoupancaDetalhes from './pages/PoupancaDetalhes.jsx';

function App() {
  return (
    <BrowserRouter>
      {/* Colocamos o Toaster aqui para aparecer em qualquer página */}
      <Toaster position="bottom-right" toastOptions={{ duration: 3000, style: { borderRadius: '12px', background: '#1f2937', color: '#fff' } }} />
      
      <Routes>
        <Route path="/login" element={<Login />} />
        
        <Route path="/" element={<Layout />}>
          <Route index element={<Navigate to="/dashboard" replace />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="cartoes" element={<Cartoes />} />
          <Route path="transferencias" element={<Transferencias />} />
          <Route path="poupancas" element={<Poupancas />} />
          <Route path="poupancas/:id" element={<PoupancaDetalhes />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;