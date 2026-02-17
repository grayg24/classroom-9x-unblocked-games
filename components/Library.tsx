
import React from 'react';
import { Game } from '../types';
import GameCard from './GameCard';
import { LayoutGrid, Library as LibraryIcon } from 'lucide-react';

interface LibraryProps {
  games: Game[];
  favorites: string[];
  onToggleFavorite: (id: string) => void;
  onPlayGame: (game: Game) => void;
}

const Library: React.FC<LibraryProps> = ({ games, favorites, onToggleFavorite, onPlayGame }) => {
  return (
    <div className="space-y-8 animate-in slide-in-from-bottom-4 duration-500">
      {/* Header */}
      <div className="flex items-end justify-between border-b border-slate-900 pb-6">
        <div className="flex items-center gap-4">
          <div className="p-4 bg-cyan-500 text-slate-950 rounded-2xl shadow-xl shadow-cyan-500/20">
            <LibraryIcon size={32} />
          </div>
          <div>
            <h1 className="font-orbitron font-black text-4xl uppercase italic tracking-tighter">
              Main <span className="text-cyan-400">Archive</span>
            </h1>
            <p className="text-slate-500 text-sm mt-1 uppercase font-black tracking-widest">Complete Intel Database</p>
          </div>
        </div>
        <div className="hidden md:block text-right">
          <div className="text-2xl font-black text-white">{games.length}</div>
          <div className="text-[10px] font-bold text-slate-600 uppercase tracking-widest">Active Units</div>
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {games.map(game => (
          <GameCard 
            key={game.id} 
            game={game} 
            isFavorite={favorites.includes(game.id)} 
            onToggleFavorite={onToggleFavorite} 
            onPlay={onPlayGame}
          />
        ))}
      </div>
    </div>
  );
};

export default Library;
