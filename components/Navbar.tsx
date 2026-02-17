
import React from 'react';
import { Search, Rocket } from 'lucide-react';
import { User } from '../types';

interface NavbarProps {
  user: User;
  onSearch: (query: string) => void;
  onLogoClick: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ user, onSearch, onLogoClick }) => {
  const handleMouseEnter = () => (window as any).setCursorActive(true);
  const handleMouseLeave = () => (window as any).setCursorActive(false);

  return (
    <nav className="fixed top-0 left-0 right-0 h-16 bg-slate-950/80 backdrop-blur-xl border-b border-slate-800 z-[60] px-4 md:px-8 flex items-center justify-between">
      <button onClick={onLogoClick} className="flex items-center gap-2 group" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
        <div className="p-2 bg-[var(--primary)]/10 rounded-lg group-hover:bg-[var(--primary)]/20 transition-colors">
          <Rocket className="text-theme w-6 h-6" />
        </div>
        <span className="font-orbitron font-black text-xl tracking-tighter text-white uppercase italic">
          Classroom<span className="text-theme not-italic">9x</span>
        </span>
      </button>

      <div className="hidden md:flex flex-1 max-w-xl mx-8 relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 w-4 h-4" />
        <input 
          type="text" 
          placeholder="Search for games..." 
          className="w-full bg-slate-900 border border-slate-800 rounded-full py-2 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/40 text-sm transition-all text-slate-200"
          onChange={(e) => onSearch(e.target.value)}
        />
      </div>

      <div className="flex items-center gap-4">
        <div className="flex items-center gap-3">
          <div className="hidden sm:flex flex-col items-end text-right">
            <span className="text-xs font-black text-white uppercase tracking-wider">Local Profile</span>
            <span className="text-[10px] font-bold text-theme uppercase">Status: Active</span>
          </div>
          <div className="flex items-center gap-2 p-1.5 bg-slate-900 rounded-xl border border-white/5">
            <div className="w-8 h-8 rounded-lg bg-theme flex items-center justify-center text-slate-950 font-black text-xs shadow-theme">
              {user.level}
            </div>
            <span className="hidden sm:inline text-[10px] font-black text-slate-400 uppercase tracking-widest pr-2">LVL</span>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
