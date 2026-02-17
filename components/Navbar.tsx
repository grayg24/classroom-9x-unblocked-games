
import React from 'react';
import { Search, Rocket, Menu, UserCircle } from 'lucide-react';

interface NavbarProps {
  onSearch: (query: string) => void;
}

const Navbar: React.FC<NavbarProps> = ({ onSearch }) => {
  return (
    <nav className="fixed top-0 left-0 right-0 h-16 bg-slate-950/80 backdrop-blur-xl border-b border-slate-800 z-50 px-4 md:px-8 flex items-center justify-between">
      {/* Logo */}
      <a href="#/" className="flex items-center gap-2 group">
        <div className="p-2 bg-cyan-500/10 rounded-lg group-hover:bg-cyan-500/20 transition-colors">
          <Rocket className="text-cyan-400 w-6 h-6" />
        </div>
        <span className="font-orbitron font-black text-xl tracking-tighter text-white uppercase italic">
          Nebula<span className="text-cyan-400 not-italic">Games</span>
        </span>
      </a>

      {/* Search Bar */}
      <div className="hidden md:flex flex-1 max-w-xl mx-8 relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 w-4 h-4" />
        <input 
          type="text" 
          placeholder="Search for games..." 
          className="w-full bg-slate-900 border border-slate-800 rounded-full py-2 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-cyan-500/40 text-sm transition-all text-slate-200"
          onChange={(e) => onSearch(e.target.value)}
        />
      </div>

      {/* Actions */}
      <div className="flex items-center gap-4">
        <button className="hidden sm:flex items-center gap-2 text-slate-400 hover:text-white transition-colors">
          <UserCircle className="w-5 h-5" />
          <span className="text-sm font-medium">Guest</span>
        </button>
        <button className="lg:hidden p-2 text-slate-400 hover:text-white transition-colors">
          <Menu className="w-6 h-6" />
        </button>
        <div className="h-8 w-[1px] bg-slate-800 hidden md:block"></div>
        <button className="bg-cyan-500 hover:bg-cyan-600 text-slate-950 px-4 py-2 rounded-lg font-bold text-sm transition-transform active:scale-95 shadow-lg shadow-cyan-500/20">
          LOGIN
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
