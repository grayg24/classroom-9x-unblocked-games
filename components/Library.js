import React from 'react';
import htm from 'htm';
import GameCard from './GameCard.js';
import { Library as LibraryIcon } from 'lucide-react';

const html = htm.bind(React.createElement);

const Library = ({ games, favorites, onToggleFavorite, onPlayGame }) => {
  return html`
    <div class="space-y-8">
      <div class="flex items-center gap-4 border-b border-slate-900 pb-6">
        <div class="p-4 bg-theme text-slate-950 rounded-2xl shadow-theme"><${LibraryIcon} size=${32} /></div>
        <h1 class="font-orbitron font-black text-4xl uppercase italic text-white">Games <span class="text-theme">Library</span></h1>
      </div>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        ${games.map(game => html`<${GameCard} key=${game.id} game=${game} isFavorite=${favorites.includes(game.id)} onToggleFavorite=${onToggleFavorite} onPlay=${onPlayGame} />`)}
      </div>
    </div>
  `;
};

export default Library;