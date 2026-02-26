import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PieChart, TrendingUp, Plus, X } from 'lucide-react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

export default function Poupancas() {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const [poupancas, setPoupancas] = useState(() => {
    const poupancasGuardadas = localStorage.getItem('novoBanco_poupancas');
    if (poupancasGuardadas) {
      return JSON.parse(poupancasGuardadas);
    }
    return [
      { id: 1, nome: 'Viagem Japão', atual: 5000, objetivo: 5000, cor: 'bg-nb-green' },
      { id: 2, nome: 'Fundo de Emergência', atual: 3450, objetivo: 5000, cor: 'bg-yellow-400' }
    ];
  });

  useEffect(() => {
    localStorage.setItem('novoBanco_poupancas', JSON.stringify(poupancas));
  }, [poupancas]);

  const criarNovaPoupanca = (e) => {
    e.preventDefault();
    const nome = e.target.nome.value;
    const objetivo = Number(e.target.objetivo.value);
    
    setPoupancas([...poupancas, { id: Date.now(), nome, atual: 0, objetivo, cor: 'bg-blue-500' }]);
    
    setIsModalOpen(false);
    toast.success('Novo objetivo de poupança criado e guardado!');
  };

  const apagarPoupanca = (id, e) => {
    e.stopPropagation();
    const novasPoupancas = poupancas.filter(p => p.id !== id);
    setPoupancas(novasPoupancas);
    toast('Poupança eliminada.', { icon: '🗑️' });
  };

  return (
    <div className="max-w-5xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <motion.h1 initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="text-3xl font-bold text-gray-900">
          As tuas Poupanças
        </motion.h1>
        <button onClick={() => setIsModalOpen(true)} className="flex items-center gap-2 bg-gray-900 hover:bg-black text-white px-4 py-2 rounded-xl transition-colors text-sm font-medium shadow-md">
          <Plus size={18} /> Novo Objetivo
        </button>
      </div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 mb-8">
        <div className="flex justify-between items-start mb-8">
          <div><p className="text-sm text-gray-500 font-medium mb-1">Total Poupado</p><h2 className="text-4xl font-bold text-gray-900">€ 8.450,00</h2></div>
          <div className="p-3 bg-green-50 text-nb-green rounded-2xl flex items-center gap-2 font-medium"><TrendingUp size={20} /> +4.2% TAEG</div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <AnimatePresence>
            {poupancas.map((p) => {
              const percentagem = Math.min(100, Math.round((p.atual / p.objetivo) * 100));
              return (
                <motion.div 
                  key={p.id} 
                  initial={{ opacity: 0, scale: 0.9 }} 
                  animate={{ opacity: 1, scale: 1 }} 
                  exit={{ opacity: 0, scale: 0.9 }} 
                  onClick={() => navigate(`/poupancas/${p.id}`)} 
                  className="p-6 border border-gray-100 rounded-2xl hover:border-nb-green transition-colors cursor-pointer group relative"
                >
                  
                  {/* Botão de apagar (Aparece ao passar o rato) */}
                  <button onClick={(e) => apagarPoupanca(p.id, e)} className="absolute top-4 right-4 text-gray-300 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity">
                    <X size={20} />
                  </button>

                  <div className="flex justify-between items-center mb-4 pr-6"><h3 className="font-bold text-gray-900">{p.nome}</h3><PieChart size={20} className="text-gray-400 group-hover:text-nb-green transition-colors" /></div>
                  <p className="text-2xl font-bold text-gray-900 mb-2">€ {p.atual.toLocaleString()}</p>
                  <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                    <div className={`${p.cor} h-full rounded-full transition-all duration-1000`} style={{ width: `${percentagem}%` }}></div>
                  </div>
                  <p className="text-xs text-gray-500 mt-2 text-right">{percentagem === 100 ? '100% atingido' : `Objetivo: € ${p.objetivo.toLocaleString()}`}</p>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      </motion.div>

      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/40 backdrop-blur-sm">
            <motion.div initial={{ opacity: 0, scale: 0.9, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9, y: 20 }} className="bg-white p-8 rounded-3xl shadow-2xl w-full max-w-md relative">
              <button onClick={() => setIsModalOpen(false)} className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 p-2"><X size={24} /></button>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Novo Objetivo</h3>
              <form onSubmit={criarNovaPoupanca} className="space-y-4">
                <div><label className="block text-sm font-medium text-gray-700 mb-1">Nome do objetivo</label><input name="nome" type="text" required className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-nb-green" placeholder="Ex: Computador Novo" /></div>
                <div><label className="block text-sm font-medium text-gray-700 mb-1">Montante a atingir (€)</label><input name="objetivo" type="number" required className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-nb-green" placeholder="1500" /></div>
                <button type="submit" className="w-full bg-gray-900 hover:bg-black text-white font-bold py-4 rounded-xl mt-4 transition-colors">Criar Poupança</button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}