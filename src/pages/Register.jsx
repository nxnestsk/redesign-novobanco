import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

export default function Register() {
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();
    toast.success('Conta criada com sucesso! Bem-vindo.');
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-md w-full bg-white p-8 rounded-3xl shadow-lg border border-gray-100">
        <div className="text-3xl font-bold text-gray-900 tracking-tight text-center mb-8">
          novo<span className="text-nb-green">banco</span>.
        </div>
        
        <form onSubmit={handleRegister} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Nome Completo</label>
            <input type="text" required className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-nb-green transition-all" placeholder="João Silva" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input type="email" required className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-nb-green transition-all" placeholder="joao@email.com" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">NIF</label>
            <input type="text" required className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-nb-green transition-all" placeholder="123 456 789" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Criar PIN de Acesso</label>
            <input type="password" required className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-nb-green transition-all" placeholder="••••••" />
          </div>
          
          <button type="submit" className="w-full bg-nb-green hover:bg-green-700 text-white font-bold py-4 rounded-xl mt-6 transition-colors shadow-md">
            Abrir Conta
          </button>
        </form>
        
        <p className="text-center text-sm text-gray-500 mt-6">
          Já és cliente? <Link to="/login" className="text-nb-green font-medium hover:underline">Iniciar sessão</Link>
        </p>
      </motion.div>
    </div>
  );
}