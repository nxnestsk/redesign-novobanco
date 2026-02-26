import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CreditCard, Lock, Eye, EyeOff, Settings, Unlock, X } from 'lucide-react';
import toast from 'react-hot-toast';

export default function Cartoes() {
  const [isLocked, setIsLocked] = useState(false);
  const [showData, setShowData] = useState(false);
  const [isLimitsOpen, setIsLimitsOpen] = useState(false); // Novo estado

  // Valores simulados dos limites
  const [limitATM, setLimitATM] = useState(400);
  const [limitOnline, setLimitOnline] = useState(1000);

  const saveLimits = () => {
    setIsLimitsOpen(false);
    toast.success('Limites do cartão atualizados com sucesso!');
  };

  return (
    <div className="max-w-5xl mx-auto">
      <motion.h1 initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="text-3xl font-bold text-gray-900 mb-8">
        Os teus Cartões
      </motion.h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* O Cartão Visual continua exatamente igual */}
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ type: 'spring', stiffness: 400, damping: 30 }} className="perspective-1000 relative">
          {isLocked && <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-red-900/80 rounded-3xl backdrop-blur-sm text-white transition-all"><Lock size={48} className="mb-2" /><p className="font-bold text-lg">Cartão Bloqueado</p></div>}
          <motion.div whileHover={!isLocked ? { rotateY: 5, rotateX: 5 } : {}} className={`w-full h-56 bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl p-6 shadow-2xl relative text-white flex flex-col justify-between border border-gray-700 transition-opacity ${isLocked ? 'opacity-50' : ''}`}>
            <div className="flex justify-between items-start"><span className="font-bold tracking-widest text-lg">novo<span className="text-nb-green">banco</span>.</span><CreditCard size={32} className="opacity-50" /></div>
            <div>
              <p className="font-mono text-2xl tracking-[0.2em] mb-2 opacity-90 transition-all">{showData ? "4092 1102 3345 9012" : "**** **** **** 4092"}</p>
              <div className="flex justify-between items-end">
                <div><p className="text-xs uppercase opacity-60">Titular</p><p className="font-medium">JOAO SILVA</p></div>
                <div><p className="text-xs uppercase opacity-60">CVV</p><p className="font-medium font-mono">{showData ? "421" : "***"}</p></div>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Controlos */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
          <h3 className="font-bold text-gray-900 mb-6">Definições do Cartão</h3>
          <div className="space-y-2">
            <button onClick={() => setShowData(!showData)} disabled={isLocked} className={`w-full flex items-center justify-between p-4 rounded-2xl transition-colors border ${isLocked ? 'opacity-50 cursor-not-allowed border-transparent' : 'hover:bg-gray-50 border-transparent hover:border-gray-100'}`}><div className="flex items-center gap-4 text-gray-700"><div className="p-2 bg-blue-50 text-blue-600 rounded-xl">{showData ? <EyeOff size={20} /> : <Eye size={20} />}</div><span className="font-medium">{showData ? 'Ocultar PIN e Dados' : 'Ver PIN e Dados'}</span></div></button>
            
            {/* NOVO: Abre a modal de limites */}
            <button onClick={() => setIsLimitsOpen(true)} disabled={isLocked} className={`w-full flex items-center justify-between p-4 rounded-2xl transition-colors border ${isLocked ? 'opacity-50 cursor-not-allowed border-transparent' : 'hover:bg-gray-50 border-transparent hover:border-gray-100'}`}><div className="flex items-center gap-4 text-gray-700"><div className="p-2 bg-gray-100 text-gray-600 rounded-xl"><Settings size={20} /></div><span className="font-medium">Limites de Utilização</span></div></button>
            
            <button onClick={() => { setIsLocked(!isLocked); setShowData(false); toast(isLocked ? 'Cartão Desbloqueado' : 'Cartão Bloqueado', { icon: isLocked ? '✅' : '🔒' }); }} className={`w-full flex items-center justify-between p-4 rounded-2xl transition-colors border group ${isLocked ? 'bg-green-50 hover:bg-green-100 border-green-200 text-green-700' : 'hover:bg-red-50 border-transparent hover:border-red-100 text-red-600'}`}><div className="flex items-center gap-4"><div className={`p-2 rounded-xl transition-colors ${isLocked ? 'bg-green-200' : 'bg-red-100 group-hover:bg-red-200'}`}>{isLocked ? <Unlock size={20} /> : <Lock size={20} />}</div><span className="font-medium">{isLocked ? 'Desbloquear Cartão' : 'Bloquear Cartão'}</span></div></button>
          </div>
        </motion.div>
      </div>

      {/* NOVO: Modal de Limites */}
      <AnimatePresence>
        {isLimitsOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/40 backdrop-blur-sm">
            <motion.div initial={{ opacity: 0, scale: 0.9, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9, y: 20 }} className="bg-white p-8 rounded-3xl shadow-2xl w-full max-w-md relative">
              <button onClick={() => setIsLimitsOpen(false)} className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 p-2"><X size={24} /></button>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Limites do Cartão</h3>
              
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between mb-2"><label className="text-sm font-medium text-gray-700">Levantamentos ATM (Diário)</label><span className="font-bold text-nb-green">€ {limitATM}</span></div>
                  <input type="range" min="100" max="1000" step="50" value={limitATM} onChange={(e) => setLimitATM(e.target.value)} className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-nb-green" />
                </div>
                <div>
                  <div className="flex justify-between mb-2"><label className="text-sm font-medium text-gray-700">Compras Online (Mensal)</label><span className="font-bold text-nb-green">€ {limitOnline}</span></div>
                  <input type="range" min="0" max="5000" step="100" value={limitOnline} onChange={(e) => setLimitOnline(e.target.value)} className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-nb-green" />
                </div>
                
                <button onClick={saveLimits} className="w-full bg-gray-900 hover:bg-black text-white font-bold py-4 rounded-xl mt-4 transition-colors">Guardar Alterações</button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}