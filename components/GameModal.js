import React, { useState, useEffect } from 'react';
import htm from 'htm';
import { Maximize2, RotateCcw, Heart, X, Loader2 } from 'lucide-react';

const html = htm.bind(React.createElement);

const GameModal = ({ game, isFavorite, onToggleFavorite, onClose }) => {
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => setIsLoading(false), 2000);
    return () => clearTimeout(timer);
  }, [game.id]);

  return html`
    <div class="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-10">
      <div class="absolute inset-0 bg-slate-950/90 backdrop-blur-xl animate-in fade-in duration-300" onClick=${onClose} />
      <div class="relative w-full max-w-6xl max-h-[90vh] bg-slate-900 border border-white/10 rounded-[2.5rem] flex flex-col overflow-hidden shadow-2xl animate-in zoom-in-95 duration-300">
        <div class="flex items-center justify-between px-8 py-6 border-b border-white/5 bg-slate-950/50">
          <h2 class="font-orbitron font-black text-2xl uppercase italic text-white">${game.title}</h2>
          <button onClick=${onClose} class="p-3 bg-slate-800 hover:bg-rose-500 text-slate-400 hover:text-white rounded-2xl transition-all"><${X} size=${20} /></button>
        </div>
        <div class="flex-1 overflow-y-auto p-6 md:p-8 space-y-8">
          <div class="relative aspect-video w-full bg-slate-950 rounded-[2rem] overflow-hidden border border-white/10">
            ${isLoading && html`<div class="absolute inset-0 z-20 bg-slate-950 flex flex-col items-center justify-center"><${Loader2} class="w-12 h-12 text-theme animate-spin" /></div>`}
            <iframe src=${game.iframeUrl} class="w-full h-full border-none" title=${game.title} sandbox="allow-scripts allow-same-origin allow-forms allow-popups" />
          </div>
          <div class="bg-slate-950/40 rounded-2xl p-4 border border-white/5 flex items-center justify-between">
            <button onClick=${() => onToggleFavorite(game.id)} class=${`flex items-center gap-2 px-6 py-3 rounded-xl font-black text-xs uppercase tracking-widest transition-all ${isFavorite ? 'bg-rose-500 text-white' : 'bg-slate-800 text-slate-300'}`}>
              <${Heart} size=${16} class=${isFavorite ? 'fill-current' : ''} /> ${isFavorite ? 'Saved' : 'Save'}
            </button>
            <div class="flex gap-2">
              <button class="p-3 bg-slate-800 text-slate-300 rounded-xl hover:bg-slate-700 transition-all" onClick=${() => {}}><${RotateCcw} size=${18} /></button>
              <button class="bg-theme text-slate-950 p-3 rounded-xl shadow-theme"><${Maximize2} size=${20} /></button>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
};

export default GameModal;