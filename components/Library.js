import React from 'react';
import htm from 'htm';
import GameCard from './GameCard.js';
import { Library as LibraryIcon } from 'lucide-react';

const html = htm.bind(React.createElement);

const Library = ({ games, favorites, onToggleFavorite, onPlayGame }) => {
  return html`
    <div className="space-y-8 animate-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-end justify-between border-b border-slate-900 pb-6">
        <div className="flex items-center gap-4">
          <div className="p-4 bg-theme text-slate-950 rounded-2xl shadow-xl shadow-theme">
            <${LibraryIcon} size=${32} />
          </div>
          <div>
            <h1 className="font-orbitron font-black text-4xl uppercase italic tracking-tighter">
              Games <span className="text-theme">Library</span>
            </h1>
            <p className="text-slate-500 text-sm mt-1 uppercase font-black tracking-widest">Complete Intel Database</p>
          </div>
        </div>
        <div className="hidden md:block text-right">
          <div className="text-2xl font-black text-white">${games.length}</div>
          <div className="text-[10px] font-bold text-slate-600 uppercase tracking-widest">Active Games</div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        ${games.map(game => html`
          <${GameCard} 
            key=${game.id} 
            game=${game} 
            isFavorite=${favorites.includes(game.id)} 
            onToggleFavorite=${onToggleFavorite} 
            onPlay=${onPlayGame}
          />
        `)}
      </div>
    </div>
  `;
};

export default Library;