
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
  onPlayGame: (game: Game) => void;
}

const CategoryPage: React.FC<CategoryPageProps> = ({ categoryId, games, favorites, onToggleFavorite, onPlayGame }) => {
  const category = CATEGORIES.find(c => c.id === categoryId);
  const categoryGames = games.filter(g => g.category === categoryId);

  if (!category) return <div className="text-slate-500">Category not found.</div>;

  return (
    <div className="space-y-8 animate-in slide-in-from-right-4 duration-500">
      <div className="flex items-end justify-between border-b border-slate-900 pb-6">
        <div className="flex items-center gap-4">
          <div className="p-4 bg-theme text-slate-950 rounded-2xl shadow-xl shadow-theme">
            {getIcon(category.icon, 32)}
          </div>
          <div>
            <h1 className="font-orbitron font-black text-4xl uppercase italic tracking-tighter">
              {category.name} <span className="text-theme">Tactics</span>
            </h1>
            <div className="flex items-center gap-2 text-slate-500 text-xs mt-2 font-black uppercase tracking-widest">
              <span className="text-theme">Archive</span>
              <ChevronRight size={10} />
              <span>{category.name}</span>
            </div>
          </div>
        </div>
        <div className="hidden md:block text-right">
          <div className="text-2xl font-black text-white">{categoryGames.length}</div>
          <div className="text-[10px] font-bold text-slate-600 uppercase tracking-widest">Files Ready</div>
        </div>
      </div>

      {categoryGames.length === 0 ? (
        <div className="text-center py-20 bg-slate-900/30 rounded-3xl border border-dashed border-slate-800">
           <p className="text-slate-500 uppercase font-black text-xs tracking-widest">Awaiting Fresh Deployment...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {categoryGames.map(game => (
            <GameCard 
              key={game.id} 
              game={game} 
              isFavorite={favorites.includes(game.id)} 
              onToggleFavorite={onToggleFavorite} 
              onPlay={onPlayGame}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default CategoryPage;
