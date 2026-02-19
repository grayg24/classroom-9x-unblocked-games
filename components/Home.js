import React, { useMemo, useState, useEffect } from 'react';
import htm from 'htm';
import GameCard from './GameCard.js';
import { 
  Calendar, 
  Zap, 
  Flame, 
  ChevronRight, 
  User as UserIcon, 
  Activity, 
  Zap as ZapIcon, 
  Shield, 
  Ghost, 
  Cat, 
  Crown, 
  ZapOff, 
  Bot, 
  Database,
  Clock,
  Rocket,
  Award,
  Star,
  Target,
  Heart,
  Layers,
  Binary,
  ShieldAlert
} from 'lucide-react';

const html = htm.bind(React.createElement);

const Home = ({ user, games, favorites, onToggleFavorite, onPlayGame, onSwitchToLibrary }) => {
  const [timeLeft, setTimeLeft] = useState('Calculating...');

  useEffect(() => {
    const updateTimer = () => {
      const now = new Date();
      const estStr = now.toLocaleString("en-US", { timeZone: "America/New_York" });
      const estDate = new Date(estStr);
      const midnight = new Date(estStr);
      midnight.setHours(24, 0, 0, 0);
      const diff = midnight.getTime() - estDate.getTime();
      const h = Math.floor(diff / (1000 * 60 * 60));
      const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const s = Math.floor((diff % (1000 * 60)) / 1000);
      setTimeLeft(`${h}h ${m}m ${s}s`);
    };
    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, []);

  const dailyPicks = useMemo(() => {
    if (!games || games.length === 0) return [];
    const now = new Date();
    const estDateStr = now.toLocaleDateString("en-US", { timeZone: "America/New_York" });
    const seed = estDateStr.split('/').reduce((acc, val) => acc + parseInt(val), 0);
    const picks = [];
    const numToPick = Math.min(games.length, 3);
    const indicesUsed = new Set();
    for (let i = 0; i < numToPick; i++) {
      let attempt = 0;
      let index = (seed + i * 13) % games.length;
      while (indicesUsed.has(index) && attempt < games.length) {
        index = (index + 1) % games.length;
        attempt++;
      }
      indicesUsed.add(index);
      picks.push(games[index]);
    }
    return picks;
  }, [games]);

  const otherGames = games.filter(g => !dailyPicks.find(p => p.id === g.id)).slice(0, 4);

  const frameClassMap = {
    'obsidian': 'frame-obsidian',
    'default': 'frame-default',
    'neon': 'frame-neon',
    'solar': 'frame-solar',
    'interstellar': 'frame-interstellar',
    'hologram': 'frame-hologram',
    'glitch': 'frame-glitch'
  };

  const badgeMapping = {
    'first_play': { label: 'First Contact', icon: Zap, iconColor: 'text-amber-500' },
    'veteran': { label: 'Sentinel', icon: Award, iconColor: 'text-violet-500' },
    'elite': { label: 'Elite Squad', icon: Star, iconColor: 'text-cyan-500' },
    'overlord': { label: 'Overlord', icon: Crown, iconColor: 'text-amber-400' },
    'fav_collector': { label: 'Archivist', icon: Heart, iconColor: 'text-rose-500' },
    'hoarder': { label: 'Data Hoarder', icon: Layers, iconColor: 'text-indigo-500' },
    'pro': { label: 'Warlord', icon: Target, iconColor: 'text-emerald-500' },
    'theme_master': { label: 'Chameleon', icon: Award, iconColor: 'text-pink-500' },
    'frame_collector': { label: 'Aesthetician', icon: Award, iconColor: 'text-sky-500' },
    'character_squad': { label: 'Recruiter', icon: UserIcon, iconColor: 'text-orange-500' },
    'code_breaker': { label: 'The Glitch', icon: Binary, iconColor: 'text-cyan-400' },
    'marathon': { label: 'Endurance', icon: Activity, iconColor: 'text-red-500' },
  };

  const activeFrameClass = frameClassMap[user.currentFrame || 'obsidian'] || 'frame-obsidian';

  const avatarIcons = {
    'agent-x': UserIcon,
    'viper': ZapIcon,
    'ghost': Ghost,
    'cyber-neko': Cat,
    'overlord': Crown,
    'stark': Bot,
    'glitch': ZapOff
  };

  const CurrentAvatarIcon = avatarIcons[user.currentCharacter || 'agent-x'] || UserIcon;
  const FeaturedBadge = user.featuredBadgeId ? badgeMapping[user.featuredBadgeId] : null;
  
  const expForCurrentLevel = (user.level - 1) * 200;
  const relativeExp = user.exp - expForCurrentLevel;
  const progressPercent = Math.min((relativeExp / 200) * 100, 100);

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
            <div className="relative shrink-0">
              <div className="w-24 h-24 md:w-32 md:h-32 bg-theme/5 rounded-full flex items-center justify-center text-theme border border-theme/20 shadow-[inset_0_0_40px_var(--primary-glow)] relative z-10 transition-transform duration-500 group-hover:scale-105">
                <${CurrentAvatarIcon} size=${48} className="md:w-16 md:h-16" />
              </div>
              <div className=${`absolute inset-0 -m-3 ${activeFrameClass} pointer-events-none z-20`} />
              <div className="absolute -bottom-1 -right-1 bg-theme text-slate-950 text-[10px] font-black px-3 py-1.5 rounded-xl border-4 border-slate-950 shadow-theme z-30">
                LVL ${user.level}
              </div>
            </div>

            <div className="flex-1 space-y-4 text-center md:text-left">
              ${FeaturedBadge ? html`
                <div className="flex items-center justify-center md:justify-start gap-2 text-white font-bold uppercase tracking-[0.3em] text-[10px] bg-white/5 border border-white/10 px-3 py-1.5 rounded-full w-fit mx-auto md:mx-0 shadow-lg animate-in slide-in-from-left-4 duration-500">
                  <${FeaturedBadge.icon} size=${14} className=${`${FeaturedBadge.iconColor} animate-pulse`} />
                  MERIT: ${FeaturedBadge.label}
                </div>
              ` : html`
                <div className="flex items-center justify-center md:justify-start gap-2 text-slate-500 font-black uppercase tracking-[0.3em] text-[9px] bg-black/40 border border-white/5 border-dashed px-3 py-1.5 rounded-full w-fit mx-auto md:mx-0 opacity-60">
                  <${ShieldAlert} size=${12} className="text-slate-600" />
                  MERIT: NOT EQUIPPED
                </div>
              `}
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

          <div className="space-y-4 max-w-md mx-auto md:mx-0 w-full">
             <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-[0.3em] text-slate-500 mb-1">
                <span>EXP BAR</span>
                <div className="flex items-center gap-3">
                   <span className="text-white text-xs font-orbitron">${user.level}</span>
                   <span className="text-theme opacity-60">→</span>
                   <span className="text-slate-400 text-xs font-orbitron">${user.level + 1}</span>
                </div>
             </div>
             <div className="relative h-4 bg-black/60 rounded-full border border-white/5 p-1 flex gap-1 shadow-inner overflow-hidden">
                ${[...Array(20)].map((_, i) => html`
                  <div 
                    key=${i}
                    className=${`h-full flex-1 rounded-[2px] transition-all duration-1000 ${
                      (i + 1) * 5 <= progressPercent 
                        ? 'bg-theme shadow-[0_0_12px_var(--primary-glow)]' 
                        : 'bg-slate-900/60'
                    }`}
                  />
                `)}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent animate-[shimmer_3s_infinite] pointer-events-none" />
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
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-theme/20 rounded-2xl flex items-center justify-center text-theme border border-theme/20 shadow-[0_0_15px_var(--primary-glow)]">
               <${Calendar} className="animate-pulse" />
            </div>
            <div>
              <h2 className="font-orbitron font-bold text-3xl uppercase tracking-tight">Daily <span className="text-theme">Picks</span></h2>
              <div className="h-1 w-20 bg-theme mt-1 rounded-full"></div>
            </div>
          </div>
          <div className="flex items-center gap-3 px-5 py-2.5 bg-slate-900/60 rounded-2xl border border-white/5 self-start md:self-auto shadow-xl">
             <${Clock} size=${14} className="text-theme" />
             <div className="flex flex-col">
               <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest leading-none mb-1">Next Rotation In:</span>
               <span className="text-xs font-orbitron font-bold text-white tracking-wider">${timeLeft}</span>
             </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          ${dailyPicks.length > 0 
            ? dailyPicks.map(game => html`<${GameCard} key=${game.id} game=${game} isFavorite=${favorites.includes(game.id)} onToggleFavorite=${onToggleFavorite} onPlay=${onPlayGame} />`)
            : html`
              <div className="col-span-full py-20 bg-slate-900/40 rounded-[2.5rem] border border-dashed border-white/5 flex flex-col items-center justify-center gap-4">
                <${Database} size=${40} className="text-slate-700" />
                <p className="text-[10px] font-black text-slate-600 uppercase tracking-[0.4em]">Daily Database Empty</p>
              </div>
            `
          }
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
          ${otherGames.length > 0 
            ? otherGames.map(game => html`<${GameCard} key=${game.id} game=${game} isFavorite=${favorites.includes(game.id)} onToggleFavorite=${onToggleFavorite} onPlay=${onPlayGame} />`)
            : html`
              <div className="col-span-full py-16 bg-slate-900/20 rounded-[2rem] border border-white/5 flex flex-col items-center justify-center gap-3">
                <${Ghost} size=${32} className="text-slate-800" />
                <p className="text-[9px] font-black text-slate-700 uppercase tracking-[0.3em]">No trending intel found</p>
              </div>
            `
          }
        </div>
      </section>

      <footer className="pt-20 border-t border-slate-900 pb-10 flex flex-col md:flex-row items-center justify-between gap-8 opacity-40 hover:opacity-100 transition-opacity">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-theme/10 rounded-xl flex items-center justify-center">
              <${Rocket} size=${24} className="text-theme" />
            </div>
            <div className="flex flex-col">
              <span className="font-orbitron font-black uppercase text-base tracking-[0.2em] leading-none mb-1">Classroom 9x Elite</span>
              <span className="text-[10px] font-black text-slate-600 uppercase tracking-widest">Version 4.0.9 Neural-Net</span>
            </div>
          </div>
          <div className="flex flex-wrap justify-center gap-10 text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">
            <button className="hover:text-theme transition-colors">Infrastructure</button>
            <button className="hover:text-theme transition-colors">Legal Disclaimers</button>
            <button className="hover:text-theme transition-colors">Dev Portal</button>
          </div>
      </footer>
    </div>
  `;
};

export default Home;