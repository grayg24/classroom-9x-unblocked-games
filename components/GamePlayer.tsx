
import React, { useState } from 'react';
import { Game } from '../types';
import { Maximize2, RotateCcw, Heart, Share2, Info, ChevronLeft } from 'lucide-react';

interface GamePlayerProps {
  game: Game;
  isFavorite: boolean;
  onToggleFavorite: (id: string) => void;
}

const GamePlayer: React.FC<GamePlayerProps> = ({ game, isFavorite, onToggleFavorite }) => {
  const [isFullscreen, setIsFullscreen] = useState(false);

  const toggleFullscreen = () => {
    const iframe = document.getElementById('game-iframe');
    if (iframe?.requestFullscreen) {
      iframe.requestFullscreen();
    }
  };

  const handleRefresh = () => {
    const iframe = document.getElementById('game-iframe') as HTMLIFrameElement;
    if (iframe) iframe.src = iframe.src;
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* Header / Breadcrumbs */}
      <div className="flex items-center justify-between">
        <a href="#/" className="flex items-center gap-2 text-slate-400 hover:text-cyan-400 transition-colors group">
          <ChevronLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          <span className="font-bold uppercase tracking-widest text-xs">Back to Hub</span>
        </a>
        <div className="flex items-center gap-3">
           <div className="px-3 py-1 bg-slate-900 rounded-full border border-slate-800 text-[10px] font-bold text-slate-500 uppercase">
             Status: <span className="text-emerald-400">Live</span>
           </div>
        </div>
      </div>

      {/* Main Container */}
      <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
        
        {/* Iframe Section */}
        <div className="xl:col-span-3 space-y-4">
          <div className="relative aspect-video w-full bg-black rounded-3xl overflow-hidden shadow-2xl shadow-cyan-500/10 border border-slate-800">
            <iframe 
              id="game-iframe"
              src={game.iframeUrl} 
              className="w-full h-full border-none"
              title={game.title}
              sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
            />
          </div>

          {/* Controls Panel */}
          <div className="bg-slate-900/50 backdrop-blur-md rounded-2xl p-4 border border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-4">
               <button 
                onClick={() => onToggleFavorite(game.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl font-bold text-sm transition-all ${
                  isFavorite ? 'bg-pink-500 text-white' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                }`}
               >
                 <Heart size={18} className={isFavorite ? 'fill-current' : ''} />
                 {isFavorite ? 'Saved' : 'Favorite'}
               </button>
               <button className="hidden sm:flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl font-bold text-sm transition-all">
                 <Share2 size={18} />
                 Share
               </button>
            </div>

            <div className="flex items-center gap-2">
              <button 
                onClick={handleRefresh}
                title="Reload Game"
                className="p-3 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl transition-all active:scale-95"
              >
                <RotateCcw size={20} />
              </button>
              <button 
                onClick={toggleFullscreen}
                title="Full Screen"
                className="p-3 bg-cyan-500 hover:bg-cyan-600 text-slate-950 rounded-xl transition-all active:scale-95 shadow-lg shadow-cyan-500/20"
              >
                <Maximize2 size={20} />
              </button>
            </div>
          </div>
        </div>

        {/* Info & Sidebar */}
        <div className="space-y-6">
          <div className="bg-slate-900 p-6 rounded-3xl border border-slate-800">
            <h1 className="font-orbitron font-black text-2xl uppercase tracking-tighter text-white mb-2 italic">
              {game.title}
            </h1>
            <div className="flex gap-2 mb-4">
              <span className="px-2 py-0.5 bg-cyan-500/10 text-cyan-400 text-[10px] font-bold uppercase rounded border border-cyan-500/20">
                {game.category}
              </span>
              <span className="px-2 py-0.5 bg-slate-800 text-slate-400 text-[10px] font-bold uppercase rounded">
                HTML5
              </span>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed">
              {game.description}
            </p>
          </div>

          <div className="bg-slate-900/50 p-6 rounded-3xl border border-slate-800 border-dashed">
            <div className="flex items-center gap-2 text-slate-300 mb-4 font-bold uppercase text-xs tracking-widest">
              <Info size={16} className="text-cyan-400" />
              How to play
            </div>
            <ul className="space-y-3 text-xs text-slate-500">
              <li className="flex gap-2"><span className="text-cyan-400 font-bold">•</span> Use Arrow keys or WASD to navigate.</li>
              <li className="flex gap-2"><span className="text-cyan-400 font-bold">•</span> Spacebar to perform special actions.</li>
              <li className="flex gap-2"><span className="text-cyan-400 font-bold">•</span> Escape to pause or access menus.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GamePlayer;
