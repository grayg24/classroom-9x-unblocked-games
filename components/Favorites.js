import React from 'react';
import htm from 'htm';
import GameCard from './GameCard.js';
import { Heart } from 'lucide-react';

const html = htm.bind(React.createElement);

const Favorites = ({ games, favorites, onToggleFavorite, onPlayGame }) => {
  const favoriteGames = games.filter(g => favorites.includes(g.id));
  return html`
    <div class="space-y-8">
      <div class="flex items-center gap-4 mb-8">
        <div class="p-4 bg-theme/20 text-theme rounded-2xl border border-theme/20"><${Heart} class="fill-current" size=${32} /></div>
        <h1 class="font-orbitron font-black text-4xl uppercase italic text-white">My <span class="text-theme">Favorites</span></h1>
      </div>
      ${favoriteGames.length === 0 ? html`<p class="text-slate-600">No favorites yet.</p>` : html`
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          ${favoriteGames.map(game => html`<${GameCard} key=${game.id} game=${game} isFavorite=${true} onToggleFavorite=${onToggleFavorite} onPlay=${onPlayGame} />`)}
        </div>
      `}
    </div>
  `;
};

export default Favorites;