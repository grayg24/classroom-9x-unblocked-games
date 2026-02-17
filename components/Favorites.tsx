
import React from 'react';
import { Game } from '../types';
import GameCard from './GameCard';
import { Heart, Ghost } from 'lucide-react';

interface FavoritesProps {
  games: Game[];
  favorites: string[];
  onToggleFavorite: (id: string) => void;
}

const Favorites: React.FC<FavoritesProps> = ({ games, favorites, onToggleFavorite }) => {
  const favoriteGames = games.filter(g => favorites.includes(g.id));

  return (
    <div className="space-y-8 animate-in zoom-in-95 duration-500">
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <div className="p-4 bg-pink-500 text-white rounded-2xl shadow-xl shadow-pink-500/20">
          <Heart className="fill-current" size={32} />
        </div>
        <div>
          <h1 className="font-orbitron font-black text-4xl uppercase italic tracking-tighter">
            My <span className="text-pink-500">Collection</span>
          </h1>
          <p className="text-slate-500 text-sm">Your personally curated list of top-tier entertainment.</p>
        </div>
      </div>

      {/* Content */}
      {favoriteGames.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-32 bg-slate-900/30 rounded-[3rem] border-2 border-dashed border-slate-800">
          <div className="w-20 h-20 bg-slate-800 rounded-full flex items-center justify-center mb-6">
            <Ghost className="text-slate-600" size={40} />
          </div>
          <h3 className="text-xl font-bold text-slate-400 mb-2">Your collection is empty</h3>
          <p className="text-slate-600 text-center max-w-xs mb-8">
            Start adding games to your favorites by clicking the heart icon on any game card!
          </p>
          <a 
            href="#/" 
            className="bg-cyan-500 text-slate-950 px-8 py-3 rounded-xl font-black text-sm uppercase tracking-widest hover:bg-cyan-600 transition-all active:scale-95 shadow-lg shadow-cyan-500/20"
          >
            Go Explore
          </a>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {favoriteGames.map(game => (
            <GameCard 
              key={game.id} 
              game={game} 
              isFavorite={true} 
              onToggleFavorite={onToggleFavorite} 
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Favorites;
