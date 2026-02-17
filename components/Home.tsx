
import React from 'react';
import { Game } from '../types';
import GameCard from './GameCard';
import { Sparkles, Trophy, FireExtinguisher as Fire } from 'lucide-react';

interface HomeProps {
  games: Game[];
  favorites: string[];
  onToggleFavorite: (id: string) => void;
}

const Home: React.FC<HomeProps> = ({ games, favorites, onToggleFavorite }) => {
  const featuredGames = games.filter(g => g.isFeatured);
  const otherGames = games.filter(g => !g.isFeatured);

  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Hero / Featured Slider (Simple list for this version) */}
      <section>
        <div className="flex items-center gap-3 mb-6">
          <Sparkles className="text-yellow-400 w-5 h-5" />
          <h2 className="font-orbitron font-bold text-2xl uppercase tracking-tight">Top <span className="text-cyan-400">Featured</span></h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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

      {/* Statistics Banner */}
      <section className="bg-gradient-to-r from-cyan-600 to-blue-700 rounded-3xl p-8 flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl shadow-cyan-500/10 border border-white/10">
        <div className="text-center md:text-left">
          <h2 className="font-orbitron font-black text-3xl text-white mb-2 italic">GAMING REDEFINED</h2>
          <p className="text-cyan-100/80 max-w-md">Access the best curated collection of unblocked web games with ultra-low latency and zero interruptions.</p>
        </div>
        <div className="flex gap-4 sm:gap-12">
          <div className="text-center">
            <div className="text-2xl font-black text-white">500k+</div>
            <div className="text-xs font-bold text-cyan-200 uppercase tracking-widest">Active Gamers</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-black text-white">1,200+</div>
            <div className="text-xs font-bold text-cyan-200 uppercase tracking-widest">Games Library</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-black text-white">99.9%</div>
            <div className="text-xs font-bold text-cyan-200 uppercase tracking-widest">Uptime</div>
          </div>
        </div>
      </section>

      {/* Main Grid */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <Fire className="text-orange-500 w-5 h-5" />
            <h2 className="font-orbitron font-bold text-2xl uppercase tracking-tight">Global <span className="text-cyan-400">Picks</span></h2>
          </div>
          <a href="#/" className="text-sm font-bold text-slate-500 hover:text-cyan-400 transition-colors uppercase tracking-widest">View All</a>
        </div>
        
        {games.length === 0 ? (
          <div className="text-center py-20 bg-slate-900/30 rounded-3xl border border-dashed border-slate-800">
            <p className="text-slate-500 font-medium">No games match your current filter...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {otherGames.map(game => (
              <GameCard 
                key={game.id} 
                game={game} 
                isFavorite={favorites.includes(game.id)} 
                onToggleFavorite={onToggleFavorite} 
              />
            ))}
          </div>
        )}
      </section>

      {/* Footer Info */}
      <footer className="pt-12 border-t border-slate-900 flex flex-col md:flex-row justify-between items-center gap-6 pb-8">
        <div className="text-slate-600 text-sm">
          &copy; 2024 Nebula Games. Built for speed and fun.
        </div>
        <div className="flex gap-6">
          <a href="#" className="text-slate-600 hover:text-cyan-400 text-sm transition-colors">Privacy</a>
          <a href="#" className="text-slate-600 hover:text-cyan-400 text-sm transition-colors">Terms</a>
          <a href="#" className="text-slate-600 hover:text-cyan-400 text-sm transition-colors">Contact</a>
        </div>
      </footer>
    </div>
  );
};

export default Home;
