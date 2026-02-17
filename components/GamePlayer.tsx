
import React, { useState, useEffect } from 'react';
import { Game, User } from '../types';
import { Maximize2, RotateCcw, Heart, Share2, Info, ChevronLeft, Loader2, Zap, Trophy } from 'lucide-react';

interface GamePlayerProps {
  game: Game;
  isFavorite: boolean;
  onToggleFavorite: (id: string) => void;
  onPlay: () => void;
  user: User | null;
}

const GamePlayer: React.FC<GamePlayerProps> = ({ game, isFavorite, onToggleFavorite, onPlay, user }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [expNotice, setExpNotice] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
      if (user) {
        onPlay();
        setExpNotice(true);
        setTimeout(() => setExpNotice(false), 3000);
      }
    }, 1500);
    return () => clearTimeout(timer);
  }, [game.id, !!user]);

  const toggleFullscreen = () => {
    const iframe = document.getElementById('game-iframe');
    if (iframe?.requestFullscreen) iframe.requestFullscreen();
  };

  const handleRefresh = () => {
    const iframe = document.getElementById('game-iframe') as HTMLIFrameElement;
    if (iframe) iframe.src = iframe.src;
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 1000);
  };

  return (
    <div className="space-y-8 animate-in fade-in zoom-in-95 duration-700">
      <div className="flex items-center justify-between">
        <a 
          href="#/" 
          className="flex items-center gap-2 text-slate-500 hover:text-theme transition-all group px-4 py-2 bg-slate-900/50 rounded-xl border border-white/5"
          onMouseEnter={() => (window as any).setCursorActive(true)}
          onMouseLeave={() => (window as any).setCursorActive(false)}
        >
          <ChevronLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          <span className="font-black uppercase tracking-widest text-[10px]">Return to Hub</span>
        </a>

        <div className="flex items-center gap-4">
           {expNotice && (
             <div className="animate-in slide-in-from-right-4 bg-theme text-slate-950 px-4 py-1.5 rounded-full font-black text-[10px] uppercase tracking-widest flex items-center gap-2 shadow-theme">
                <Trophy size={14} /> +25 Combat EXP
             </div>
           )}
           <div className="flex items-center gap-2 px-3 py-1.5 bg-theme/10 rounded-full border border-theme/20">
             <div className="w-2 h-2 rounded-full bg-theme animate-ping"></div>
             <span className="text-[10px] font-black text-theme uppercase tracking-widest">Link Active</span>
           </div>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
        <div className="xl:col-span-3 space-y-6">
          <div className="relative aspect-video w-full bg-slate-950 rounded-[2.5rem] overflow-hidden shadow-[0_40px_100px_rgba(0,0,0,0.8)] border border-white/10 ring-1 ring-theme/20">
            {isLoading && (
              <div className="absolute inset-0 z-20 bg-slate-950 flex flex-col items-center justify-center space-y-4">
                <Loader2 className="w-12 h-12 text-theme animate-spin" />
                <span className="font-orbitron font-bold text-xs uppercase tracking-[0.4em] text-theme animate-pulse">Initializing Interface</span>
                <div className="w-48 h-1 bg-slate-900 rounded-full overflow-hidden">
                    <div className="h-full bg-theme animate-[loading_1.5s_ease-in-out_infinite]"></div>
                </div>
              </div>
            )}
            <iframe 
              id="game-iframe"
              src={game.iframeUrl} 
              className={`w-full h-full border-none transition-opacity duration-1000 ${isLoading ? 'opacity-0' : 'opacity-100'}`}
              title={game.title}
              sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
            />
          </div>

          <div className="bg-slate-900/40 backdrop-blur-2xl rounded-[2rem] p-6 border border-white/5 flex items-center justify-between shadow-2xl">
            <div className="flex items-center gap-4">
               <button 
                onClick={() => onToggleFavorite(game.id)}
                className={`flex items-center gap-3 px-6 py-3 rounded-2xl font-black text-xs uppercase tracking-widest transition-all ${
                  isFavorite 
                    ? 'bg-rose-500 text-white shadow-[0_0_20px_rgba(244,63,94,0.4)]' 
                    : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700'
                }`}
                onMouseEnter={() => (window as any).setCursorActive(true)}
                onMouseLeave={() => (window as any).setCursorActive(false)}
               >
                 <Heart size={18} className={isFavorite ? 'fill-current' : ''} />
                 {isFavorite ? 'Vaulted' : 'Store in Vault'}
               </button>
               <button className="p-4 bg-slate-800/80 hover:bg-slate-700 text-slate-300 rounded-2xl transition-all" onMouseEnter={() => (window as any).setCursorActive(true)} onMouseLeave={() => (window as any).setCursorActive(false)}>
                 <Share2 size={18} />
               </button>
            </div>

            <div className="flex items-center gap-3">
              <button 
                onClick={handleRefresh}
                className="p-4 bg-slate-800/80 hover:bg-theme/20 hover:text-theme text-slate-300 rounded-2xl transition-all active:scale-90"
              >
                <RotateCcw size={20} />
              </button>
              <button 
                onClick={toggleFullscreen}
                className="bg-theme hover:brightness-110 text-slate-950 p-4 rounded-2xl transition-all active:scale-90 shadow-theme"
                onMouseEnter={() => (window as any).setCursorActive(true)}
                onMouseLeave={() => (window as any).setCursorActive(false)}
              >
                <Maximize2 size={24} />
              </button>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-slate-900/60 p-8 rounded-[2rem] border border-white/5 shadow-xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                <Zap size={60} className="text-theme" />
            </div>
            <h1 className="font-orbitron font-black text-3xl uppercase tracking-tighter text-white mb-4 italic leading-tight">
              {game.title}
            </h1>
            <div className="flex flex-wrap gap-2 mb-6">
              <span className="px-3 py-1 bg-theme/10 text-theme text-[10px] font-black uppercase rounded-lg border border-theme/20 tracking-widest">
                {game.category}
              </span>
            </div>
            <p className="text-sm text-slate-500 leading-relaxed font-medium">
              {game.description}
            </p>
          </div>

          <div className="bg-theme/5 p-8 rounded-[2rem] border border-theme/10 border-dashed">
            <div className="flex items-center gap-3 text-theme mb-6 font-black uppercase text-[10px] tracking-[0.3em]">
              <Info size={16} />
              Tactical Analysis
            </div>
            <ul className="space-y-4 text-xs">
              <li className="flex gap-4 items-start">
                <span className="w-1.5 h-1.5 rounded-full bg-theme mt-1 shrink-0"></span>
                <span className="text-slate-500 font-bold uppercase tracking-wide">Movement: <span className="text-slate-300">ARROWS / WASD</span></span>
              </li>
              <li className="flex gap-4 items-start">
                <span className="w-1.5 h-1.5 rounded-full bg-theme mt-1 shrink-0"></span>
                <span className="text-slate-500 font-bold uppercase tracking-wide">Execute: <span className="text-slate-300">SPACEBAR</span></span>
              </li>
              <li className="flex gap-4 items-start">
                <span className="w-1.5 h-1.5 rounded-full bg-theme mt-1 shrink-0"></span>
                <span className="text-slate-500 font-bold uppercase tracking-wide">Combat EXP: <span className="text-theme">YES (+25)</span></span>
              </li>
            </ul>
          </div>
        </div>
      </div>
      
      <style>{`
        @keyframes loading {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(200%); }
        }
      `}</style>
    </div>
  );
};

export default GamePlayer;