
import React from 'react';
import { Game } from '../types';
import { CATEGORIES, getIcon } from '../constants';
import GameCard from './GameCard';
import { ChevronRight } from 'lucide-react';

interface CategoryPageProps {
  categoryId: string;
  games: Game[];
  favorites: string[];
  onToggleFavorite: (id: string) => void;
}

const CategoryPage: React.FC<CategoryPageProps> = ({ categoryId, games, favorites, onToggleFavorite }) => {
  const category = CATEGORIES.find(c => c.id === categoryId);
  const categoryGames = games.filter(g => g.category === categoryId);

  if (!category) return <div className="text-slate-500">Category not found.</div>;

  return (
    <div className="space-y-8 animate-in slide-in-from-right-4 duration-500">
      {/* Header */}
      <div className="flex items-end justify-between border-b border-slate-900 pb-6">
        <div className="flex items-center gap-4">
          <div className="p-4 bg-cyan-500 text-slate-950 rounded-2xl shadow-xl shadow-cyan-500/20">
            {getIcon(category.icon, 32)}
          </div>
          <div>
            <h1 className="font-orbitron font-black text-4xl uppercase italic tracking-tighter">
              {category.name} <span className="text-cyan-400">Games</span>
            </h1>
            <div className="flex items-center gap-2 text-slate-500 text-sm mt-1">
              <span>Home</span>
              <ChevronRight size={14} />
              <span className="text-slate-400 font-medium">Categories</span>
              <ChevronRight size={14} />
              <span className="text-cyan-400/70 font-bold">{category.name}</span>
            </div>
          </div>
        </div>
        <div className="hidden md:block text-right">
          <div className="text-2xl font-black text-white">{categoryGames.length}</div>
          <div className="text-[10px] font-bold text-slate-600 uppercase tracking-widest">Total Games</div>
        </div>
      </div>

      {/* Grid */}
      {categoryGames.length === 0 ? (
        <div className="text-center py-20 bg-slate-900/30 rounded-3xl border border-dashed border-slate-800">
           <p className="text-slate-500">Coming soon! More {category.name} titles are being curated.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {categoryGames.map(game => (
            <GameCard 
              key={game.id} 
              game={game} 
              isFavorite={favorites.includes(game.id)} 
              onToggleFavorite={onToggleFavorite} 
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default CategoryPage;
