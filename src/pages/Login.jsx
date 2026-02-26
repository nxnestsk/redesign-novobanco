import { motion } from 'framer-motion';
// 1. Apagamos a importação do Register e adicionamos o Link aqui:
import { Link, useNavigate } from 'react-router-dom';

export default function Login() {
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    navigate('/dashboard'); // Leva o utilizador para o Dashboard após o clique
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-md w-full bg-white p-8 rounded-3xl shadow-lg border border-gray-100">
        <div className="text-3xl font-bold text-gray-900 tracking-tight text-center mb-8">
          novo<span className="text-nb-green">banco</span>.
        </div>
        
        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Número de Adesão</label>
            <input type="text" required className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-nb-green transition-all" placeholder="Ex: 1234567" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Código de Acesso (PIN)</label>
            <input type="password" required className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-nb-green transition-all" placeholder="••••••" />
          </div>
          
          <button type="submit" className="w-full bg-nb-green hover:bg-green-700 text-white font-bold py-4 rounded-xl mt-4 transition-colors shadow-md">
            Entrar de forma segura
          </button>
        </form>
        
        <p className="text-center text-sm text-gray-500 mt-6">
          {/* 2. Trocámos o <a> por <Link to="/register"> */}
          Ainda não és cliente? <Link to="/register" className="text-nb-green font-medium hover:underline">Abre conta em 5 minutos</Link>
        </p>
      </motion.div>
    </div>
  );
}