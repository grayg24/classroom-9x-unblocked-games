import React, { useState, useEffect } from 'react';
import htm from 'htm';
import { Maximize2, RotateCcw, Heart, Share2, Info, X, Loader2, Ghost } from 'lucide-react';

const html = htm.bind(React.createElement);

const GameModal = ({ game, isFavorite, onToggleFavorite, onClose }) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => setIsLoading(false), 2000);
    return () => clearTimeout(timer);
  }, [game.id]);

  const toggleFullscreen = () => {
    const iframe = document.getElementById('game-iframe-modal');
    if (!iframe) return;

    // Robust fullscreen request logic
    const requestMethod = iframe.requestFullscreen || iframe.webkitRequestFullscreen || iframe.msRequestFullscreen || iframe.mozRequestFullScreen;
    
    if (requestMethod) {
      const promise = requestMethod.call(iframe);
      // Handling potential Permission errors (common in about:blank/restricted frames)
      if (promise && typeof promise.catch === 'function') {
        promise.catch((err) => {
          console.warn("Fullscreen on iframe failed, trying container fallback:", err);
          const container = iframe.parentElement;
          if (container && container.requestFullscreen) {
            container.requestFullscreen();
          }
        });
      }
    } else {
      // Fallback for browsers that don't support requestFullscreen on iframe directly
      const container = iframe.parentElement;
      if (container && container.requestFullscreen) container.requestFullscreen();
    }
  };

  const handleRefresh = () => {
    const iframe = document.getElementById('game-iframe-modal');
    if (iframe) iframe.src = iframe.src;
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 1000);
  };

  const cloakGame = () => {
    const win = window.open('about:blank', '_blank');
    if (!win) {
      alert('Pop-up blocked! Please allow pop-ups to use Cloak Mode.');
      return;
    }
    win.document.title = 'Classes'; // Stealth Title
    const style = win.document.createElement('style');
    style.innerHTML = `
      body, html { margin: 0; padding: 0; width: 100%; height: 100%; overflow: hidden; background: #000; }
      iframe { border: none; width: 100%; height: 100%; }
    `;
    win.document.head.appendChild(style);
    const iframe = win.document.createElement('iframe');
    iframe.src = game.iframeUrl;
    // Explicitly grant permissions for the cloaked tab
    iframe.setAttribute('allow', 'fullscreen; autoplay; gamepad; keyboard-lock; microphone; camera');
    iframe.setAttribute('allowfullscreen', 'true');
    win.document.body.appendChild(iframe);
  };

  return html`
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-10">
      <div 
        className="absolute inset-0 bg-slate-950/90 backdrop-blur-xl animate-in fade-in duration-300"
        onClick=${onClose}
      />

      <div className="relative w-full max-w-6xl max-h-[90vh] bg-slate-900 border border-white/10 rounded-[2.5rem] shadow-[0_0_100px_rgba(0,0,0,0.8)] flex flex-col overflow-hidden animate-in zoom-in-95 duration-300">
        
        <div className="flex items-center justify-between px-8 py-6 border-b border-white/5 bg-slate-950/50">
          <div className="flex items-center gap-4">
            <h2 className="font-orbitron font-black text-2xl uppercase italic tracking-tighter text-white">
              ${game.title}
            </h2>
            <span className="px-3 py-1 bg-theme/10 text-theme text-[10px] font-black uppercase rounded-lg border border-theme/20 tracking-widest">
              ${game.category}
            </span>
          </div>
          <button 
            onClick=${onClose}
            className="p-3 bg-slate-800 hover:bg-rose-500 text-slate-400 hover:text-white rounded-2xl transition-all"
            onMouseEnter=${() => window.setCursorActive && window.setCursorActive(true)}
            onMouseLeave=${() => window.setCursorActive && window.setCursorActive(false)}
          >
            <${X} size=${20} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 md:p-8 space-y-8">
          <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
            <div className="xl:col-span-3 space-y-6">
              <div className="relative aspect-video w-full bg-slate-950 rounded-[2rem] overflow-hidden border border-white/10 shadow-inner">
                ${isLoading && html`
                  <div className="absolute inset-0 z-20 bg-slate-950 flex flex-col items-center justify-center space-y-4">
                    <${Loader2} className="w-12 h-12 text-theme animate-spin" />
                    <span className="font-orbitron font-bold text-xs uppercase tracking-[0.4em] text-theme animate-pulse">Initializing Interface</span>
                    <div className="w-48 h-1 bg-slate-900 rounded-full overflow-hidden">
                        <div className="h-full bg-theme animate-[loading_1.5s_ease-in-out_infinite]"></div>
                    </div>
                  </div>
                `}
                <iframe 
                  id="game-iframe-modal"
                  src=${game.iframeUrl} 
                  className=${`w-full h-full border-none transition-opacity duration-1000 ${isLoading ? 'opacity-0' : 'opacity-100'}`}
                  title=${game.title}
                  allow="fullscreen; autoplay; gamepad; keyboard-lock"
                  allowfullscreen="true"
                  sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-pointer-lock allow-fullscreen"
                />
              </div>

              <div className="bg-slate-950/40 rounded-2xl p-4 border border-white/5 flex items-center justify-between">
                <div className="flex items-center gap-3">
                   <button 
                    onClick=${() => onToggleFavorite(game.id)}
                    className=${`flex items-center gap-2 px-6 py-3 rounded-xl font-black text-xs uppercase tracking-widest transition-all ${
                      isFavorite 
                        ? 'bg-rose-500 text-white' 
                        : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                    }`}
                    onMouseEnter=${() => window.setCursorActive && window.setCursorActive(true)}
                    onMouseLeave=${() => window.setCursorActive && window.setCursorActive(false)}
                   >
                     <${Heart} size=${16} className=${isFavorite ? 'fill-current' : ''} />
                     ${isFavorite ? 'Saved' : 'Save'}
                   </button>
                   <button 
                    onClick=${cloakGame}
                    className="flex items-center gap-2 px-4 py-3 bg-slate-800 text-cyan-400 rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-cyan-500/10 transition-all border border-cyan-500/20"
                    onMouseEnter=${() => window.setCursorActive && window.setCursorActive(true)}
                    onMouseLeave=${() => window.setCursorActive && window.setCursorActive(false)}
                   >
                     <${Ghost} size=${14} />
                     Cloak Tab
                   </button>
                   <button className="p-3 bg-slate-800 text-slate-300 rounded-xl transition-all hover:bg-slate-700">
                     <${Share2} size=${16} />
                   </button>
                </div>

                <div className="flex items-center gap-3">
                  <button 
                    onClick=${handleRefresh}
                    className="p-3 bg-slate-800 text-slate-300 rounded-xl hover:bg-slate-700 transition-all"
                  >
                    <${RotateCcw} size=${18} />
                  </button>
                  <button 
                    onClick=${toggleFullscreen}
                    className="bg-theme text-slate-950 p-3 rounded-xl shadow-theme hover:brightness-110"
                    onMouseEnter=${() => window.setCursorActive && window.setCursorActive(true)}
                    onMouseLeave=${() => window.setCursorActive && window.setCursorActive(false)}
                  >
                    <${Maximize2} size=${20} />
                  </button>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-slate-950/40 p-6 rounded-[2rem] border border-white/5 h-fit">
                <div className="flex items-center gap-3 text-theme mb-4 font-black uppercase text-[10px] tracking-[0.3em]">
                  <${Info} size=${16} />
                  Intel
                </div>
                <p className="text-sm text-slate-400 leading-relaxed font-medium mb-6">
                  ${game.description}
                </p>
                
                <div className="bg-theme/5 p-4 rounded-xl border border-theme/10 border-dashed">
                  <ul className="space-y-3 text-[10px] font-black uppercase tracking-widest">
                    <li className="flex justify-between items-center text-slate-500">
                      <span>Exp Multiplier</span>
                      <span className="text-theme">1.0X</span>
                    </li>
                    <li className="flex justify-between items-center text-slate-500">
                      <span>Server Status</span>
                      <span className="text-emerald-500 flex items-center gap-1">
                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></div>
                        Online
                      </span>
                    </li>
                    <li className="flex justify-between items-center text-slate-500">
                      <span>Cloak Support</span>
                      <span className="text-cyan-400">Ready</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <style>${`
        @keyframes loading {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(200%); }
        }
      `}</style>
    </div>
  `;
};

export default GameModal;