import React from 'react';
import htm from 'htm';
import GameCard from './GameCard.js';
import { Zap, Sparkles } from 'lucide-react';

const html = htm.bind(React.createElement);

const Home = ({ user, games, favorites, onToggleFavorite, onPlayGame, onSwitchToLibrary }) => {
  const featuredGames = games.filter(g => g.isFeatured);

  return html`
    <div class="space-y-16 pb-20 animate-in fade-in duration-700">
      
      <section class="relative h-[450px] rounded-[3.5rem] overflow-hidden border border-white/5 shadow-2xl group bg-slate-900">
        <div class="absolute inset-0">
          <img src="https://images.unsplash.com/photo-1552820728-8b83bb6b773f?q=80&w=2070" class="w-full h-full object-cover opacity-60" alt="Hero" />
          <div class="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/80 to-transparent"></div>
        </div>
        
        <div class="absolute inset-y-0 left-0 flex flex-col justify-center px-10 md:px-20 w-full md:w-3/4 lg:w-3/5 space-y-8 z-10">
          <div class="flex items-center gap-3">
             <div class="px-3 py-1 bg-theme/10 rounded-full border border-theme/20 flex items-center gap-2">
                <span class="text-theme font-black uppercase tracking-[0.2em] text-[10px]">Active Interface V5.2</span>
             </div>
          </div>
          <h1 class="font-orbitron font-black text-5xl md:text-7xl text-white uppercase leading-none tracking-tighter italic">
            WELCOME <br /><span class="text-theme">${user.username}</span>
          </h1>
          <p class="text-slate-400 text-lg max-w-lg leading-relaxed font-medium">Explore high-fidelity unblocked gaming modules. Zero lag, verified access only.</p>
          <button onClick=${onSwitchToLibrary} class="bg-theme text-slate-950 w-fit px-10 py-5 rounded-2xl font-black uppercase tracking-widest text-sm shadow-theme hover:scale-105 transition-all">Launch Library</button>
        </div>
      </section>

      <section>
        <div class="flex items-center gap-4 mb-10">
          <div class="p-3 bg-theme/20 rounded-2xl text-theme border border-theme/20">
            <${Sparkles} size=${24} />
          </div>
          <h2 class="font-orbitron font-bold text-3xl uppercase tracking-wider text-white">Elite <span class="text-theme">Deployments</span></h2>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          ${featuredGames.map(game => html`<${GameCard} key=${game.id} game=${game} isFavorite=${favorites.includes(game.id)} onToggleFavorite=${onToggleFavorite} onPlay=${onPlayGame} />`)}
        </div>
      </section>
    </div>
  `;
};

export default Home;