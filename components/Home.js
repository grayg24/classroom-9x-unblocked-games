import React from 'react';
import htm from 'htm';
import GameCard from './GameCard.js';
import { Sparkles, Zap, Flame, ChevronRight, User as UserIcon, Activity } from 'lucide-react';

const html = htm.bind(React.createElement);

const Home = ({ user, games, favorites, onToggleFavorite, onPlayGame, onSwitchToLibrary }) => {
  const featuredGames = games.filter(g => g.isFeatured);
  const otherGames = games.filter(g => !g.isFeatured).slice(0, 4);

  // Profile Frame Mapping
  const frameClassMap = {
    'obsidian': 'frame-obsidian',
    'default': 'frame-default',
    'neon': 'frame-neon',
    'solar': 'frame-solar',
    'interstellar': 'frame-interstellar',
    'glitch': 'frame-glitch'
  };

  const activeFrameClass = frameClassMap[user.currentFrame || 'obsidian'] || 'frame-obsidian';

  return html`
    <div className="space-y-20 pb-20 animate-in fade-in duration-1000">
      
      <section className="relative h-[500px] md:h-[600px] rounded-[3rem] overflow-hidden border border-white/5 shadow-2xl group bg-slate-950">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=2070&auto=format&fit=crop" 
            className="w-full h-full object-cover opacity-100 group-hover:scale-105 transition-transform duration-1000"
            alt="Hero Background"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/40 to-transparent"></div>
        </div>
        
        <div className="absolute inset-y-0 left-0 flex flex-col justify-center px-10 md:px-20 w-full md:w-3/5 lg:w-1/2 space-y-8 z-10 bg-slate-950 shadow-[60px_0_100px_rgba(2,6,23,1)]">
          
          <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
            <!-- Profile Icon Integration -->
            <div className="relative shrink-0">
              <div className="w-24 h-24 md:w-32 md:h-32 bg-theme/5 rounded-[2.5rem] flex items-center justify-center text-theme border border-theme/20 shadow-[inset_0_0_40px_var(--primary-glow)] relative z-10 transition-transform duration-500 group-hover:scale-105">
                <${UserIcon} size=${48} className="md:w-16 md:h-16" />
              </div>
              
              <!-- Dynamic Frame Selection Overlay -->
              <div className=${`absolute inset-0 -m-3 ${activeFrameClass} pointer-events-none z-20`} />
              
              <div className="absolute -bottom-1 -right-1 bg-theme text-slate-950 text-[10px] font-black px-3 py-1.5 rounded-xl border-4 border-slate-950 shadow-theme z-30">
                LVL ${user.level}
              </div>
            </div>

            <div className="flex-1 space-y-4 text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start gap-2 text-theme font-bold uppercase tracking-[0.3em] text-[10px]">
                <${Zap} size=${14} className="fill-current" />
                Neural Uplink Active
              </div>
              <h1 className="font-orbitron font-black text-4xl md:text-6xl italic leading-none text-white tracking-tighter uppercase">
                WELCOME <br/>
                <span className="text-theme drop-shadow-theme">
                  ${user.username}
                </span>
              </h1>
              
              <div className="flex items-center justify-center md:justify-start gap-4 pt-2">
                 <div className="flex items-center gap-2 text-[10px] font-black text-slate-500 uppercase tracking-widest">
                   <${Activity} size=${14} className="text-emerald-500 animate-pulse" />
                   Session Verified
                 </div>
              </div>
            </div>
          </div>

          <p className="text-slate-300 text-base md:text-lg max-w-md font-medium text-center md:text-left">
            The elite unblocked library for high-performance browser gaming. Zero lag, zero blocks, pure gaming.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 pt-2">
            <button 
              onClick=${onSwitchToLibrary}
              className="bg-theme text-slate-950 px-10 py-5 rounded-2xl font-black uppercase tracking-widest text-sm transition-all hover:scale-105 hover:brightness-110 shadow-theme"
            >
              Browse Library
            </button>
          </div>
        </div>

        <div className="absolute bottom-10 right-10 hidden lg:flex flex-col items-end opacity-100 z-0">
            <span className="font-orbitron font-black text-8xl leading-none text-white drop-shadow-[0_5px_15px_rgba(0,0,0,0.8)]">9X</span>
            <span className="font-bold tracking-[0.5em] text-sm uppercase text-white drop-shadow-[0_2px_5px_rgba(0,0,0,0.8)]">Reworked</span>
        </div>
      </section>

      <section>
        <div className="flex items-center gap-4 mb-10">
          <div className="w-12 h-12 bg-theme/20 rounded-2xl flex items-center justify-center text-theme border border-theme/20">
             <${Sparkles} className="animate-pulse" />
          </div>
          <div>
            <h2 className="font-orbitron font-bold text-3xl uppercase tracking-tight">Prime <span className="text-theme">Picks</span></h2>
            <div className="h-1 w-20 bg-theme mt-1 rounded-full"></div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          ${featuredGames.map(game => html`<${GameCard} key=${game.id} game=${game} isFavorite=${favorites.includes(game.id)} onToggleFavorite=${onToggleFavorite} onPlay=${onPlayGame} />`)}
        </div>
      </section>

      <section>
        <div className="flex items-center justify-between mb-10">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-theme/20 rounded-2xl flex items-center justify-center text-theme border border-theme/20">
               <${Flame} className="animate-bounce" />
            </div>
            <div>
              <h2 className="font-orbitron font-bold text-3xl uppercase tracking-tight">Hot <span className="text-theme">Trending</span></h2>
              <div className="h-1 w-20 bg-theme mt-1 rounded-full"></div>
            </div>
          </div>
          <button 
            onClick=${onSwitchToLibrary}
            className="text-slate-500 hover:text-white transition-colors text-xs font-black uppercase tracking-widest flex items-center gap-2"
          >
            View Library
            <${ChevronRight} size=${14} />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          ${otherGames.map(game => html`<${GameCard} key=${game.id} game=${game} isFavorite=${favorites.includes(game.id)} onToggleFavorite=${onToggleFavorite} onPlay=${onPlayGame} />`)}
        </div>
      </section>

      <footer className="pt-20 border-t border-slate-900 pb-10 flex flex-col md:flex-row items-center justify-between opacity-40 hover:opacity-100 transition-opacity">
          <div className="flex items-center gap-2 mb-4 md:mb-0">
            <div className="w-2 h-2 rounded-full bg-theme"></div>
            <span className="font-orbitron font-black uppercase text-sm tracking-[0.2em]">Classroom 9x v4.0</span>
          </div>
          <div className="flex gap-8 text-[10px] font-bold uppercase tracking-widest text-slate-500">
            <button className="hover:text-theme transition-colors">Infrastructure</button>
            <button className="hover:text-theme transition-colors">Legal Disclaimers</button>
            <button className="hover:text-theme transition-colors">Dev Portal</button>
          </div>
      </footer>
    </div>
  `;
};

export default Home;