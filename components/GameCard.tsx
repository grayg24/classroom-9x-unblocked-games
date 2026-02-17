
import React from 'react';
import { Game } from '../types';
import { Play, Heart, Star, Zap } from 'lucide-react';

interface GameCardProps {
  game: Game;
  isFavorite: boolean;
  onToggleFavorite: (id: string) => void;
  onPlay: (game: Game) => void;
}

const GameCard: React.FC<GameCardProps> = ({ game, isFavorite, onToggleFavorite, onPlay }) => {
  const handleMouseEnter = () => (window as any).setCursorActive(true);
  const handleMouseLeave = () => (window as any).setCursorActive(false);

  return (
    <div 
      className="card-perspective group"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="relative bg-slate-900/40 backdrop-blur-md rounded-2xl overflow-hidden border border-slate-800 group-hover:border-cyan-500/50 transition-all duration-500 transform group-hover:-translate-y-3 group-hover:shadow-[0_20px_50px_rgba(34,211,238,0.15)]">
        
        <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-cyan-500/0 group-hover:border-cyan-500/60 transition-all duration-500 rounded-tr-2xl"></div>
        <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-cyan-500/0 group-hover:border-cyan-500/60 transition-all duration-500 rounded-bl-2xl"></div>

        <div className="aspect-video overflow-hidden relative">
          <img 
            src={game.thumbnail} 
            alt={game.title} 
            className="w-full h-full object-cover grayscale-[30%] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
          />
          
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity"></div>

          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0">
            <button 
              onClick={() => onPlay(game)}
              className="bg-cyan-500 text-slate-950 p-5 rounded-full shadow-[0_0_30px_rgba(34,211,238,0.6)] transform hover:scale-110 active:scale-90 transition-all z-20"
            >
              <Play className="fill-current w-8 h-8 translate-x-0.5" />
            </button>
          </div>

          <button 
            onClick={(e) => {
              e.preventDefault();
              onToggleFavorite(game.id);
            }}
            className="absolute top-3 right-3 p-2.5 rounded-xl backdrop-blur-xl border border-white/10 transition-all z-20"
          >
            <Heart size={18} className={isFavorite ? 'fill-rose-500 text-rose-500' : 'text-white hover:text-rose-500'} />
          </button>

          {game.isFeatured && (
            <div className="absolute top-3 left-3 px-2 py-0.5 bg-yellow-500 text-slate-950 text-[10px] font-black uppercase rounded shadow-lg flex items-center gap-1">
              <Zap size={10} className="fill-current" />
              Featured
            </div>
          )}
        </div>

        <div className="p-5">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-orbitron font-bold text-slate-100 group-hover:text-cyan-400 transition-colors truncate">
              {game.title}
            </h3>
            <div className="flex items-center gap-1 text-yellow-500 shrink-0">
              <Star size={12} className="fill-current" />
              <span className="text-[11px] font-black">4.9</span>
            </div>
          </div>
          <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed h-8 group-hover:text-slate-400 transition-colors">
            {game.description}
          </p>
          
          <div className="mt-4 pt-4 border-t border-slate-800 flex items-center justify-between opacity-50 group-hover:opacity-100 transition-opacity">
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{game.category}</span>
            <div className="w-1.5 h-1.5 rounded-full bg-cyan-500 animate-pulse"></div>
          </div>
        </div>

        <button onClick={() => onPlay(game)} className="absolute inset-0 z-10 w-full h-full text-left bg-transparent border-none appearance-none"></button>
      </div>
    </div>
  );
};

export default GameCard;
