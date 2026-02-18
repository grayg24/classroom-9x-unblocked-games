import React from 'react';
import htm from 'htm';
import { CATEGORIES, getIcon } from '../constants.js';
import GameCard from './GameCard.js';

const html = htm.bind(React.createElement);

const CategoryPage = ({ categoryId, games, favorites, onToggleFavorite, onPlayGame }) => {
  const category = CATEGORIES.find(c => c.id === categoryId);
  const categoryGames = games.filter(g => g.category === categoryId);
  if (!category) return html`<div>Not found</div>`;
  return html`
    <div class="space-y-8">
      <h1 class="font-orbitron font-black text-4xl uppercase italic text-white">${category.name} <span class="text-theme">Tactics</span></h1>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        ${categoryGames.map(game => html`<${GameCard} key=${game.id} game=${game} isFavorite=${favorites.includes(game.id)} onToggleFavorite=${onToggleFavorite} onPlay=${onPlayGame} />`)}
      </div>
    </div>
  `;
};

export default CategoryPage;