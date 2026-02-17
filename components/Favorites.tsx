
import React from 'react';
import { Game } from '../types';
import GameCard from './GameCard';
import { Heart, Ghost } from 'lucide-react';

interface FavoritesProps {
  games: Game[];
  favorites: string[];
  onToggleFavorite: (id: string) => void;
  onPlayGame: (game: Game) => void;
}

const Favorites: React.FC<FavoritesProps> = ({ games, favorites, onToggleFavorite, onPlayGame }) => {
  const favoriteGames = games.filter(g => favorites.includes(g.id));

  return (
    <div className="space-y-8 animate-in zoom-in-95 duration-500">
      <div className="flex items-center gap-4 mb-8">
        <div className="p-4 bg-theme/20 text-theme rounded-2xl shadow-xl border border-theme/20">
          <Heart className="fill-current" size={32} />
        </div>
        <div>
          <h1 className="font-orbitron font-black text-4xl uppercase italic tracking-tighter">
            My <span className="text-theme">Favorites</span>
          </h1>
          <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest mt-1">High-Priority Operations Only</p>
        </div>
      </div>

      {favoriteGames.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-32 bg-slate-900/30 rounded-[3rem] border-2 border-dashed border-slate-800">
          <div className="w-20 h-20 bg-slate-800 rounded-full flex items-center justify-center mb-6">
            <Ghost className="text-slate-600" size={40} />
          </div>
          <h3 className="text-xl font-bold text-slate-400 mb-2 font-orbitron uppercase">Favorites Empty</h3>
          <p className="text-slate-600 text-center max-w-xs mb-8 text-xs font-bold uppercase tracking-wide">
            Add games to your favorites by engaging the heart icon on game files.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {favoriteGames.map(game => (
            <GameCard 
              key={game.id} 
              game={game} 
              isFavorite={true} 
              onToggleFavorite={onToggleFavorite} 
              onPlay={onPlayGame}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Favorites;
