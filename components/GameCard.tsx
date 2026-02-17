
import React from 'react';
import { Game } from '../types';
import { Play, Heart, Star } from 'lucide-react';

interface GameCardProps {
  game: Game;
  isFavorite: boolean;
  onToggleFavorite: (id: string) => void;
}

const GameCard: React.FC<GameCardProps> = ({ game, isFavorite, onToggleFavorite }) => {
  return (
    <div className="group relative bg-slate-900 rounded-2xl overflow-hidden border border-slate-800 hover:border-cyan-500/50 transition-all duration-300 transform hover:-translate-y-2 hover:shadow-2xl hover:shadow-cyan-500/10">
      {/* Thumbnail Container */}
      <div className="aspect-video overflow-hidden relative">
        <img 
          src={game.thumbnail} 
          alt={game.title} 
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 opacity-80 group-hover:opacity-100"
        />
        
        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <a 
            href={`#/game/${game.id}`}
            className="bg-cyan-500 text-slate-950 p-4 rounded-full shadow-xl shadow-cyan-500/40 transform scale-0 group-hover:scale-100 transition-transform duration-300 delay-75 active:scale-90"
          >
            <Play className="fill-current w-6 h-6" />
          </a>
        </div>

        {/* Favorite Button */}
        <button 
          onClick={(e) => {
            e.preventDefault();
            onToggleFavorite(game.id);
          }}
          className={`absolute top-3 right-3 p-2 rounded-xl backdrop-blur-md border border-white/10 transition-colors z-20 ${
            isFavorite ? 'bg-pink-500 text-white' : 'bg-black/40 text-white hover:bg-black/60'
          }`}
        >
          <Heart size={16} className={isFavorite ? 'fill-current' : ''} />
        </button>

        {/* Category Badge */}
        <div className="absolute bottom-3 left-3 px-2 py-1 bg-black/60 backdrop-blur-sm rounded-md border border-white/5 text-[10px] font-bold text-cyan-400 uppercase tracking-wider group-hover:bg-cyan-500 group-hover:text-slate-950 transition-colors duration-300">
          {game.category}
        </div>
      </div>

      {/* Info */}
      <div className="p-4">
        <div className="flex items-start justify-between mb-1">
          <h3 className="font-bold text-slate-100 group-hover:text-cyan-400 transition-colors line-clamp-1">{game.title}</h3>
          <div className="flex items-center gap-1 text-yellow-500">
            <Star size={12} className="fill-current" />
            <span className="text-xs font-bold">4.8</span>
          </div>
        </div>
        <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
          {game.description}
        </p>
      </div>

      {/* Action Links (Invisible for Layout logic, but good for SEO/A11y) */}
      <a href={`#/game/${game.id}`} className="absolute inset-0 z-10"></a>
    </div>
  );
};

export default GameCard;
