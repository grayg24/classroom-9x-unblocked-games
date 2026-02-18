import React from 'react';
import htm from 'htm';
import { Play, Heart, Star } from 'lucide-react';

const html = htm.bind(React.createElement);

const GameCard = ({ game, isFavorite, onToggleFavorite, onPlay }) => {
  return html`
    <div class="group relative bg-slate-900/40 backdrop-blur-md rounded-[2.5rem] overflow-hidden border border-slate-800 hover:border-theme/50 transition-all duration-500 transform hover:-translate-y-3 hover:shadow-[0_20px_60px_rgba(0,0,0,0.5)]">
      
      <div class="aspect-video overflow-hidden relative">
        <img src=${game.thumbnail} alt=${game.title} class="w-full h-full object-cover grayscale-[30%] group-hover:grayscale-0 group-hover:scale-110 transition-all duration-1000" />
        <div class="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-80"></div>
        
        <div class="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0">
          <button onClick=${() => onPlay(game)} class="bg-theme text-slate-950 p-6 rounded-full shadow-theme transform hover:scale-110 active:scale-90 transition-all z-20">
            <${Play} class="fill-current w-8 h-8" />
          </button>
        </div>

        <button onClick=${(e) => { e.preventDefault(); e.stopPropagation(); onToggleFavorite(game.id); }} 
          class="absolute top-4 right-4 p-3 rounded-2xl backdrop-blur-xl border border-white/10 transition-all z-20 hover:bg-white/10">
          <${Heart} size=${18} class=${isFavorite ? 'fill-rose-500 text-rose-500' : 'text-white'} />
        </button>
      </div>

      <div class="p-6">
        <div class="flex items-center justify-between mb-2">
          <h3 class="font-orbitron font-black text-lg text-slate-100 group-hover:text-theme transition-colors truncate">${game.title}</h3>
          <div class="flex items-center gap-1 text-yellow-500 shrink-0">
            <${Star} size=${14} class="fill-current" />
            <span class="text-xs font-black">4.9</span>
          </div>
        </div>
        <p class="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-4 truncate">${game.description}</p>
        <div class="flex items-center justify-between opacity-50 text-[10px] font-black uppercase tracking-widest">
          <span>${game.category}</span>
          <div class="w-1.5 h-1.5 rounded-full bg-theme animate-pulse"></div>
        </div>
      </div>
      
      <button onClick=${() => onPlay(game)} class="absolute inset-0 z-10 w-full h-full cursor-pointer appearance-none outline-none"></button>
    </div>
  `;
};

export default GameCard;