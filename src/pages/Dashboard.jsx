import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AreaChart, Area, XAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { Smartphone, Zap, FileText, ArrowUpRight, ArrowDownRight, X } from 'lucide-react';
import toast from 'react-hot-toast'; // <-- Importamos o toast

const data = [ { name: '1', despesas: 120 }, { name: '8', despesas: 300 }, { name: '15', despesas: 150 }, { name: '22', despesas: 480 }, { name: 'Hoje', despesas: 840 } ];
const containerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.05 } } };
const itemVariants = { hidden: { y: 20, opacity: 0 }, visible: { y: 0, opacity: 1, transition: { type: 'spring', stiffness: 300, damping: 25 } } };

export default function Dashboard() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Função para fechar o modal e mostrar sucesso
  const handleTransfer = () => {
    setIsModalOpen(false);
    toast.success('Transferência realizada com sucesso!');
  };

  // Função para botões em construção
  const handleFeatureNotReady = (featureName) => {
    toast(`A abrir ${featureName}... (Protótipo)`, { icon: '🚧' });
  };

  return (
    <div className="max-w-6xl mx-auto">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col lg:flex-row lg:justify-between lg:items-center mb-8 gap-4">
        <div><h1 className="text-3xl font-bold text-gray-900">Olá, João.</h1><p className="text-gray-500 mt-1">Bem-vindo ao teu banco simplificado.</p></div>
        <div className="flex gap-3">
          <input type="text" placeholder="Pesquisar (ex: IBAN)" className="hidden md:block w-64 bg-white border border-gray-200 text-gray-900 px-5 py-3 rounded-full outline-none focus:ring-2 focus:ring-nb-green shadow-sm" />
          <button onClick={() => setIsModalOpen(true)} className="bg-nb-green hover:bg-green-700 text-white px-6 py-3 rounded-full font-medium shadow-md transition-colors w-full md:w-auto">+ Transferência</button>
        </div>
      </motion.div>

      <motion.div variants={containerVariants} initial="hidden" animate="visible" className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="lg:col-span-1 flex flex-col gap-6">
          <motion.div variants={itemVariants} className="bg-nb-green text-white p-6 rounded-3xl shadow-lg relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white opacity-10 rounded-full -mr-10 -mt-10"></div>
            <p className="text-green-100 font-medium opacity-90">Saldo Disponível</p><h2 className="text-4xl font-bold mt-2">€ 12.450,00</h2>
            <p className="text-sm mt-6 bg-black/20 inline-block px-3 py-1 rounded-lg">PT50 0007 0000 1234 5678 9</p>
          </motion.div>

          <motion.div variants={itemVariants} className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
            <h3 className="font-bold text-gray-900 mb-4">Ações Rápidas</h3>
            <div className="grid grid-cols-3 gap-4">
              {/* Adicionámos o onClick com os toasts */}
              <button onClick={() => handleFeatureNotReady('MB WAY')} className="flex flex-col items-center gap-2 group"><div className="w-12 h-12 bg-gray-50 group-hover:bg-green-50 rounded-2xl flex items-center justify-center text-gray-600 group-hover:text-nb-green transition-colors"><Smartphone size={24} /></div><span className="text-xs font-medium text-gray-600">MB WAY</span></button>
              <button onClick={() => handleFeatureNotReady('Pagamento de Serviços')} className="flex flex-col items-center gap-2 group"><div className="w-12 h-12 bg-gray-50 group-hover:bg-green-50 rounded-2xl flex items-center justify-center text-gray-600 group-hover:text-nb-green transition-colors"><Zap size={24} /></div><span className="text-xs font-medium text-gray-600">Serviços</span></button>
              <button onClick={() => handleFeatureNotReady('Estado da Conta')} className="flex flex-col items-center gap-2 group"><div className="w-12 h-12 bg-gray-50 group-hover:bg-green-50 rounded-2xl flex items-center justify-center text-gray-600 group-hover:text-nb-green transition-colors"><FileText size={24} /></div><span className="text-xs font-medium text-gray-600">Estado</span></button>
            </div>
          </motion.div>
        </div>

        <div className="lg:col-span-2 flex flex-col gap-6">
          <motion.div variants={itemVariants} className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
            <div className="flex justify-between items-end mb-6">
              <div><p className="text-sm text-gray-500 font-medium">Despesas este mês</p><h2 className="text-3xl font-bold text-gray-900 mt-1">€ 840,50</h2></div>
              <p className="text-sm text-red-500 font-medium flex items-center gap-1"><ArrowUpRight size={16}/> +12%</p>
            </div>
            <div className="h-48 w-full">
              <ResponsiveContainer width="100%" height="100%"><AreaChart data={data} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}><defs><linearGradient id="colorDespesas" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#009739" stopOpacity={0.3}/><stop offset="95%" stopColor="#009739" stopOpacity={0}/></linearGradient></defs><Tooltip cursor={{stroke: '#e5e7eb', strokeWidth: 2}} contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} /><Area type="monotone" dataKey="despesas" stroke="#009739" strokeWidth={3} fillOpacity={1} fill="url(#colorDespesas)" /></AreaChart></ResponsiveContainer>
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-bold text-gray-900">Últimos Movimentos</h3>
              <button onClick={() => handleFeatureNotReady('Histórico Completo')} className="text-sm text-nb-green font-medium hover:underline">Ver todos</button>
            </div>
            <div className="space-y-5">
              {[ { nome: 'Supermercado Continente', data: 'Hoje, 14:30', valor: '- 45,20', tipo: 'despesa' }, { nome: 'Empresa Lda (Salário)', data: 'Ontem, 09:00', valor: '+ 1.500,00', tipo: 'receita' }, { nome: 'Spotify AB', data: '12 Mar, 10:15', valor: '- 7,99', tipo: 'despesa' } ].map((mov, i) => (
                <div key={i} className="flex justify-between items-center group">
                  <div className="flex items-center gap-4">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${mov.tipo === 'receita' ? 'bg-green-100 text-nb-green' : 'bg-red-100 text-red-500'}`}>{mov.tipo === 'receita' ? <ArrowDownRight size={20} /> : <ArrowUpRight size={20} />}</div>
                    <div><p className="font-medium text-gray-900">{mov.nome}</p><p className="text-xs text-gray-500">{mov.data}</p></div>
                  </div>
                  <p className={`font-bold ${mov.tipo === 'receita' ? 'text-nb-green' : 'text-gray-900'}`}>€ {mov.valor}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </motion.div>

      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/40 backdrop-blur-sm">
            <motion.div initial={{ opacity: 0, scale: 0.9, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9, y: 20 }} className="bg-white p-8 rounded-3xl shadow-2xl w-full max-w-md relative">
              <button onClick={() => setIsModalOpen(false)} className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 p-2"><X size={24} /></button>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Nova Transferência</h3>
              <div className="space-y-4">
                <div><label className="block text-sm font-medium text-gray-700 mb-1">Nome ou IBAN</label><input type="text" className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-nb-green" placeholder="PT50..." /></div>
                <div><label className="block text-sm font-medium text-gray-700 mb-1">Montante (€)</label><input type="number" className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-nb-green text-2xl font-bold" placeholder="0.00" /></div>
                {/* Botão que executa a transferência */}
                <button onClick={handleTransfer} className="w-full bg-nb-green hover:bg-green-700 text-white font-bold py-4 rounded-xl mt-4 transition-colors">Confirmar</button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}