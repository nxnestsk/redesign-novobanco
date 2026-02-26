import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import { Menu } from 'lucide-react';

export default function Layout() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden bg-gray-50">
      <Sidebar isOpen={isMobileMenuOpen} setIsOpen={setIsMobileMenuOpen} />
      
      <main className="flex-1 overflow-y-auto relative w-full">
        {/* Cabeçalho Mobile */}
        <div className="md:hidden p-4 bg-white border-b border-gray-200 flex justify-between items-center sticky top-0 z-20">
          <div className="text-xl font-bold text-gray-900 tracking-tight">
            novo<span className="text-nb-green">banco</span>.
          </div>
          <button onClick={() => setIsMobileMenuOpen(true)} className="p-2 text-gray-600">
            <Menu size={24} />
          </button>
        </div>

        {/* O Outlet é onde as páginas (Dashboard, Cartões) vão aparecer */}
        <div className="p-4 md:p-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
}