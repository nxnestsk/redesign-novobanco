import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Users, X } from 'lucide-react';
import toast from 'react-hot-toast';

export default function Transferencias() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const simulateTransfer = (e) => {
    e.preventDefault();
    setIsModalOpen(false);
    toast.success('Transferência processada com sucesso!');
  };

  return (
    <div className="max-w-5xl mx-auto">
      <motion.h1 initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="text-3xl font-bold text-gray-900 mb-8">
        Transferências
      </motion.h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
          <div className="flex items-center gap-4 mb-6">
            <div className="p-3 bg-green-50 text-nb-green rounded-2xl"><Send size={24} /></div>
            <h2 className="text-xl font-bold text-gray-900">Nova Operação</h2>
          </div>
          <p className="text-gray-500 mb-6">Realiza transferências nacionais imediatas ou transferências SEPA sem taxas adicionais.</p>
          <button onClick={() => setIsModalOpen(true)} className="w-full bg-nb-green hover:bg-green-700 text-white font-bold py-4 rounded-xl transition-colors shadow-md hover:shadow-lg">
            Simular Transferência
          </button>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
          <div className="flex items-center gap-4 mb-6"><div className="p-3 bg-gray-50 text-gray-600 rounded-2xl"><Users size={24} /></div><h2 className="text-xl font-bold text-gray-900">Contactos Frequentes</h2></div>
          <div className="space-y-4">
            {['Maria João', 'Senhorio', 'Conta Poupança'].map((nome, i) => (
              <div key={i} onClick={() => setIsModalOpen(true)} className="flex items-center gap-4 p-4 hover:bg-gray-50 rounded-2xl cursor-pointer transition-colors border border-transparent hover:border-gray-100 group">
                <div className="w-10 h-10 rounded-full bg-gray-200 group-hover:bg-green-100 group-hover:text-nb-green transition-colors flex items-center justify-center text-gray-600 font-bold">{nome[0]}</div>
                <span className="font-medium text-gray-700 group-hover:text-gray-900">{nome}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/40 backdrop-blur-sm">
            <motion.div initial={{ opacity: 0, scale: 0.9, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9, y: 20 }} className="bg-white p-8 rounded-3xl shadow-2xl w-full max-w-md relative">
              <button onClick={() => setIsModalOpen(false)} className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 p-2"><X size={24} /></button>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Nova Transferência</h3>
              <form onSubmit={simulateTransfer} className="space-y-4">
                <div><label className="block text-sm font-medium text-gray-700 mb-1">Nome ou IBAN</label><input required type="text" className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-nb-green" placeholder="PT50..." /></div>
                <div><label className="block text-sm font-medium text-gray-700 mb-1">Montante (€)</label><input required type="number" step="0.01" className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-nb-green text-2xl font-bold" placeholder="0.00" /></div>
                <button type="submit" className="w-full bg-nb-green hover:bg-green-700 text-white font-bold py-4 rounded-xl mt-4 transition-colors">Confirmar e Enviar</button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}