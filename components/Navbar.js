import React from 'react';
import htm from 'htm';
import { Search, Rocket } from 'lucide-react';

const html = htm.bind(React.createElement);

const Navbar = ({ user, onSearch, onLogoClick }) => {
  return html`
    <nav class="fixed top-0 left-0 right-0 h-16 bg-slate-950/80 backdrop-blur-xl border-b border-slate-800 z-[60] px-4 md:px-8 flex items-center justify-between">
      <button onClick=${onLogoClick} class="flex items-center gap-2 group">
        <div class="p-2 bg-[var(--primary)]/10 rounded-lg group-hover:bg-[var(--primary)]/20 transition-colors">
          <${Rocket} class="text-theme w-6 h-6" />
        </div>
        <span class="font-orbitron font-black text-xl tracking-tighter text-white uppercase italic">Classroom<span class="text-theme not-italic">9x</span></span>
      </button>
      <div class="hidden md:flex flex-1 max-w-xl mx-8 relative">
        <${Search} class="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 w-4 h-4" />
        <input type="text" placeholder="Search for games..." class="w-full bg-slate-900 border border-slate-800 rounded-full py-2 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/40 text-sm transition-all text-slate-200" onChange=${(e) => onSearch(e.target.value)} />
      </div>
      <div class="flex items-center gap-2 p-1.5 bg-slate-900 rounded-xl border border-white/5">
        <div class="w-8 h-8 rounded-lg bg-theme flex items-center justify-center text-slate-950 font-black text-xs shadow-theme">${user.level}</div>
        <span class="hidden sm:inline text-[10px] font-black text-slate-400 uppercase tracking-widest pr-2">LVL</span>
      </div>
    </nav>
  `;
};

export default Navbar;