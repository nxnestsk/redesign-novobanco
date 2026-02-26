import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Plus, Minus, Target, X, TrendingUp } from 'lucide-react';
import toast from 'react-hot-toast';

export default function PoupancaDetalhes() {
  const { id } = useParams(); // Apanha o ID do URL (ex: /poupancas/1)
  const navigate = useNavigate();
  
  const [poupanca, setPoupanca] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tipoMovimento, setTipoMovimento] = useState('adicionar'); // 'adicionar' ou 'retirar'

  // Quando a página carrega, procura a poupança certa no localStorage
  useEffect(() => {
    const todasPoupancas = JSON.parse(localStorage.getItem('novoBanco_poupancas') || '[]');
    const encontrada = todasPoupancas.find(p => p.id === Number(id));
    
    if (encontrada) {
      setPoupanca(encontrada);
    } else {
      toast.error('Poupança não encontrada!');
      navigate('/poupancas');
    }
  }, [id, navigate]);

  const processarMovimento = (e) => {
    e.preventDefault();
    const valor = Number(e.target.valor.value);
    
    if (valor <= 0) return toast.error('Insere um valor válido.');
    if (tipoMovimento === 'retirar' && valor > poupanca.atual) return toast.error('Não tens saldo suficiente nesta poupança.');

    // Calcula o novo valor
    const novoValor = tipoMovimento === 'adicionar' ? poupanca.atual + valor : poupanca.atual - valor;
    
    // Atualiza o estado atual
    const poupancaAtualizada = { ...poupanca, atual: novoValor };
    setPoupanca(poupancaAtualizada);

    // Guarda no localStorage (atualizando a lista toda)
    const todasPoupancas = JSON.parse(localStorage.getItem('novoBanco_poupancas') || '[]');
    const novaLista = todasPoupancas.map(p => p.id === Number(id) ? poupancaAtualizada : p);
    localStorage.setItem('novoBanco_poupancas', JSON.stringify(novaLista));

    setIsModalOpen(false);
    toast.success(tipoMovimento === 'adicionar' ? 'Fundos adicionados!' : 'Fundos retirados!');
  };

  if (!poupanca) return null; // Previne erros enquanto carrega

  const percentagem = Math.min(100, Math.round((poupanca.atual / poupanca.objetivo) * 100));

  return (
    <div className="max-w-4xl mx-auto">
      {/* Botão de Voltar */}
      <motion.button initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} onClick={() => navigate('/poupancas')} className="flex items-center gap-2 text-gray-500 hover:text-gray-900 mb-8 transition-colors font-medium">
        <ArrowLeft size={20} /> Voltar às Poupanças
      </motion.button>

      {/* Cabeçalho */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className={`${poupanca.cor} text-white p-8 rounded-3xl shadow-lg mb-8 relative overflow-hidden`}>
        <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-10 rounded-full -mr-20 -mt-20"></div>
        <div className="flex justify-between items-start relative z-10">
          <div>
            <h1 className="text-4xl font-bold mb-2">{poupanca.nome}</h1>
            <p className="text-white/80 font-medium flex items-center gap-2"><Target size={18}/> Objetivo: € {poupanca.objetivo.toLocaleString()}</p>
          </div>
          <div className="bg-white/20 p-4 rounded-2xl backdrop-blur-sm">
            <p className="text-sm font-medium mb-1 text-white/90">Saldo Atual</p>
            <h2 className="text-3xl font-bold">€ {poupanca.atual.toLocaleString()}</h2>
          </div>
        </div>

        {/* Barra de Progresso Grande */}
        <div className="mt-8 relative z-10">
          <div className="flex justify-between text-sm font-bold mb-2">
            <span>{percentagem}% Concluído</span>
            {percentagem === 100 && <span>🎉 Objetivo Atingido!</span>}
          </div>
          <div className="w-full bg-black/20 h-3 rounded-full overflow-hidden">
            <div className="bg-white h-full rounded-full transition-all duration-1000" style={{ width: `${percentagem}%` }}></div>
          </div>
        </div>
      </motion.div>

      {/* Ações e Estatísticas */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="col-span-1 md:col-span-2 bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
          <h3 className="font-bold text-gray-900 mb-6">Ações Rápidas</h3>
          <div className="flex gap-4">
            <button onClick={() => { setTipoMovimento('adicionar'); setIsModalOpen(true); }} className="flex-1 bg-nb-green hover:bg-green-700 text-white font-bold py-4 rounded-xl flex justify-center items-center gap-2 transition-colors">
              <Plus size={20} /> Reforçar
            </button>
            <button onClick={() => { setTipoMovimento('retirar'); setIsModalOpen(true); }} className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold py-4 rounded-xl flex justify-center items-center gap-2 transition-colors">
              <Minus size={20} /> Retirar
            </button>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="col-span-1 bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex flex-col justify-center items-center text-center">
          <div className="w-16 h-16 bg-green-50 text-nb-green rounded-full flex items-center justify-center mb-4"><TrendingUp size={32} /></div>
          <h3 className="font-bold text-gray-900 mb-1">Rendimento</h3>
          <p className="text-sm text-gray-500">A render 4.2% ao ano. Os juros são pagos mensalmente.</p>
        </motion.div>
      </div>

      {/* Modal de Adicionar/Retirar */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/40 backdrop-blur-sm">
            <motion.div initial={{ opacity: 0, scale: 0.9, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9, y: 20 }} className="bg-white p-8 rounded-3xl shadow-2xl w-full max-w-md relative">
              <button onClick={() => setIsModalOpen(false)} className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 p-2"><X size={24} /></button>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">
                {tipoMovimento === 'adicionar' ? 'Reforçar Poupança' : 'Retirar Fundos'}
              </h3>
              <form onSubmit={processarMovimento} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Montante (€)</label>
                  <input name="valor" type="number" step="0.01" required className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-nb-green text-2xl font-bold" placeholder="0.00" autoFocus />
                </div>
                <button type="submit" className={`w-full text-white font-bold py-4 rounded-xl mt-4 transition-colors ${tipoMovimento === 'adicionar' ? 'bg-nb-green hover:bg-green-700' : 'bg-gray-900 hover:bg-black'}`}>
                  Confirmar {tipoMovimento === 'adicionar' ? 'Reforço' : 'Retirada'}
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}