
import React from 'react';
import { Game } from '../types';
import GameCard from './GameCard';
import { Sparkles, Zap, Trophy, Flame } from 'lucide-react';

interface HomeProps {
  games: Game[];
  favorites: string[];
  onToggleFavorite: (id: string) => void;
}

const Home: React.FC<HomeProps> = ({ games, favorites, onToggleFavorite }) => {
  const featuredGames = games.filter(g => g.isFeatured);
  const otherGames = games.filter(g => !g.isFeatured);

  return (
    <div className="space-y-20 pb-20 animate-in fade-in duration-1000">
      
      {/* Hero Section */}
      <section className="relative h-[400px] md:h-[500px] rounded-[3rem] overflow-hidden border border-white/5 shadow-2xl group">
        <div className="absolute inset-0 bg-slate-900">
          <img 
            src="https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=2070&auto=format&fit=crop" 
            className="w-full h-full object-cover opacity-30 group-hover:scale-105 transition-transform duration-1000"
            alt="Hero Background"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/80 to-transparent"></div>
        </div>
        
        <div className="absolute inset-0 flex flex-col justify-center px-10 md:px-20 max-w-3xl space-y-6">
          <div className="flex items-center gap-2 text-cyan-400 font-bold uppercase tracking-[0.3em] text-xs">
            <Zap size={14} className="fill-current" />
            Unblocked Games
          </div>
          <h1 className="font-orbitron font-black text-5xl md:text-7xl italic leading-none text-white tracking-tighter">
            NEXT GEN <br/><span className="text-cyan-400 drop-shadow-[0_0_15px_rgba(34,211,238,0.5)]">GAMING</span>
          </h1>
          <p className="text-slate-400 text-lg max-w-md">
            The fastest unblocked library on the web. Experience lag-free browser gaming with Classroom 9x Reworked.
          </p>
          <div className="flex gap-4">
            <button className="border border-white/10 bg-white/5 backdrop-blur-md hover:bg-white/10 px-8 py-4 rounded-2xl font-black uppercase tracking-widest text-sm transition-all">
              Library
            </button>
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute bottom-10 right-10 hidden lg:flex flex-col items-end opacity-20">
            <span className="font-orbitron font-black text-8xl leading-none">9X</span>
            <span className="font-bold tracking-[0.5em] text-sm">REWORKED</span>
        </div>
      </section>

      {/* Featured Section */}
      <section>
        <div className="flex items-center gap-4 mb-10">
          <div className="w-12 h-12 bg-cyan-500/20 rounded-2xl flex items-center justify-center text-cyan-400 border border-cyan-500/20">
             <Sparkles className="animate-pulse" />
          </div>
          <div>
            <h2 className="font-orbitron font-bold text-3xl uppercase tracking-tight">Prime <span className="text-cyan-400">Picks</span></h2>
            <div className="h-1 w-20 bg-cyan-500 mt-1 rounded-full"></div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredGames.map(game => (
            <GameCard 
              key={game.id} 
              game={game} 
              isFavorite={favorites.includes(game.id)} 
              onToggleFavorite={onToggleFavorite} 
            />
          ))}
        </div>
      </section>

      {/* Trending Row */}
      <section>
        <div className="flex items-center justify-between mb-10">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-rose-500/20 rounded-2xl flex items-center justify-center text-rose-400 border border-rose-500/20">
               <Flame className="animate-bounce" />
            </div>
            <div>
              <h2 className="font-orbitron font-bold text-3xl uppercase tracking-tight">Hot <span className="text-rose-500">Trending</span></h2>
              <div className="h-1 w-20 bg-rose-500 mt-1 rounded-full"></div>
            </div>
          </div>
          <button className="text-slate-500 hover:text-white transition-colors text-xs font-black uppercase tracking-widest flex items-center gap-2">
            View Market
            <Trophy size={14} />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {otherGames.map(game => (
            <GameCard 
              key={game.id} 
              game={game} 
              isFavorite={favorites.includes(game.id)} 
              onToggleFavorite={onToggleFavorite} 
            />
          ))}
        </div>
      </section>

      {/* Footer Branding */}
      <footer className="pt-20 border-t border-slate-900 pb-10 flex flex-col md:flex-row items-center justify-between opacity-40 hover:opacity-100 transition-opacity">
          <div className="flex items-center gap-2 mb-4 md:mb-0">
            <div className="w-2 h-2 rounded-full bg-cyan-500"></div>
            <span className="font-orbitron font-black uppercase text-sm tracking-[0.2em]">Classroom 9x v4.0</span>
          </div>
          <div className="flex gap-8 text-[10px] font-bold uppercase tracking-widest text-slate-500">
            <a href="#" className="hover:text-cyan-400 transition-colors">Infrastructure</a>
            <a href="#" className="hover:text-cyan-400 transition-colors">Legal Disclaimers</a>
            <a href="#" className="hover:text-cyan-400 transition-colors">Dev Portal</a>
          </div>
      </footer>
    </div>
  );
};

export default Home;
