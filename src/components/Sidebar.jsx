import { motion, AnimatePresence } from 'framer-motion';
import { Home, Send, CreditCard, PieChart, X, LogOut } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

export default function Sidebar({ isOpen, setIsOpen }) {
  const location = useLocation();

  // Função para saber se o link está ativo
  const isActive = (path) => location.pathname === path;

  const NavLinks = () => (
    <>
      <nav className="flex-1 space-y-2 mt-8">
        <Link to="/dashboard" onClick={() => setIsOpen(false)} className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-colors ${isActive('/dashboard') ? 'bg-green-50 text-nb-green' : 'text-gray-500 hover:text-gray-900 hover:bg-gray-100'}`}>
          <Home size={20} /> Dashboard
        </Link>
        <Link to="/transferencias" onClick={() => setIsOpen(false)} className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-colors ${isActive('/transferencias') ? 'bg-green-50 text-nb-green' : 'text-gray-500 hover:text-gray-900 hover:bg-gray-100'}`}>
          <Send size={20} /> Transferências
        </Link>
        <Link to="/cartoes" onClick={() => setIsOpen(false)} className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-colors ${isActive('/cartoes') ? 'bg-green-50 text-nb-green' : 'text-gray-500 hover:text-gray-900 hover:bg-gray-100'}`}>
          <CreditCard size={20} /> Cartões
        </Link>
        <Link to="/poupancas" onClick={() => setIsOpen(false)} className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-colors ${isActive('/poupancas') ? 'bg-green-50 text-nb-green' : 'text-gray-500 hover:text-gray-900 hover:bg-gray-100'}`}>
          <PieChart size={20} /> Poupanças
        </Link>
      </nav>
      <div className="mt-auto">
        <Link to="/login" className="flex items-center gap-3 w-full text-left px-4 py-3 text-red-600 hover:bg-red-50 rounded-xl transition-colors font-medium">
          <LogOut size={20} /> Terminar Sessão
        </Link>
      </div>
    </>
  );

  return (
    <>
      <AnimatePresence>
        {isOpen && <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsOpen(false)} className="fixed inset-0 bg-gray-900/50 z-30 md:hidden backdrop-blur-sm" />}
      </AnimatePresence>
      <motion.aside initial={false} animate={{ x: isOpen ? 0 : (window.innerWidth < 768 ? -300 : 0) }} className={`fixed md:relative z-40 h-full w-64 bg-white border-r border-gray-200 flex flex-col p-6 shadow-2xl md:shadow-none transition-transform duration-300 ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}`}>
        <div className="flex justify-between items-center">
          <div className="text-2xl font-bold text-gray-900 tracking-tight hidden md:block">novo<span className="text-nb-green">banco</span>.</div>
          <button onClick={() => setIsOpen(false)} className="md:hidden text-gray-500"><X size={24} /></button>
        </div>
        <NavLinks />
      </motion.aside>
    </>
  );
}