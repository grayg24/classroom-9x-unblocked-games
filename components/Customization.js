import React from 'react';
import htm from 'htm';
import { Palette, MousePointer2, Lock, Sparkles, Gamepad2, Zap } from 'lucide-react';

const html = htm.bind(React.createElement);

const Customization = ({ user, onSetTheme, onUpdateSettings }) => {
  const themeOptions = [
    { id: 'cyan', label: 'Default', level: 1, color: '#22d3ee' },
    { id: 'rose', label: 'Neon Rose', level: 5, color: '#fb7185' },
    { id: 'emerald', label: 'Emerald', level: 10, color: '#34d399' },
    { id: 'violet', label: 'Ethereal', level: 15, color: '#a78bfa' },
    { id: 'cobalt', label: 'Cobalt', level: 20, color: '#3b82f6' },
    { id: 'crimson', label: 'Crimson', level: 40, color: '#dc2626' },
    { id: 'gold', label: 'Shiny Gold', level: 75, color: 'var(--primary)', special: 'shine' },
    { id: 'galaxy', label: 'Galaxy', level: 100, color: '#c084fc', special: 'nebula' },
    { id: 'rainbow', label: 'Matrix RGB', level: 999, color: 'linear-gradient(45deg, #ff0000, #ff7f00, #ffff00, #00ff00, #0000ff, #4b0082, #8b00ff, #ff0000)', special: 'matrix' },
  ];

  const ProgressBar = ({ current, target, label }) => {
    const percentage = Math.min((current / target) * 100, 100);
    return html`
      <div className="space-y-1">
        <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-slate-500">
          <span>${label}</span>
          <span>${current} / ${target}</span>
        </div>
        <div className="h-1 bg-slate-800 rounded-full overflow-hidden">
          <div className="h-full bg-theme transition-all duration-1000 shadow-theme" style=${{ width: `${percentage}%` }}></div>
        </div>
      </div>
    `;
  };

  return html`
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-6 duration-700 pb-20">
      <div className="flex items-center gap-6">
        <div className="w-16 h-16 bg-theme/10 rounded-3xl flex items-center justify-center text-theme border border-theme/20 shadow-2xl">
          <${Palette} size=${32} />
        </div>
        <div>
          <h1 className="font-orbitron font-black text-4xl uppercase italic tracking-tighter text-white">
            Operative <span className="text-theme">Customs</span>
          </h1>
          <div className="flex items-center gap-3 mt-1">
             <div className="flex items-center gap-1.5 text-[10px] font-black text-slate-500 uppercase tracking-widest">
               <${Gamepad2} size=${12} className="text-theme" />
               Games Played: ${user.gamesPlayed || 0}
             </div>
             <div className="w-1 h-1 rounded-full bg-slate-800"></div>
             <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest">
               Level ${user.level} Assets Available
             </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2 space-y-10">
          <section className="space-y-6">
            <div className="flex items-center justify-between px-4">
              <p className="text-[10px] font-black text-slate-600 uppercase tracking-[0.4em] flex items-center gap-2">
                <${Sparkles} size=${12} className="text-theme" /> Themes
              </p>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-5 gap-4">
              ${themeOptions.map((t) => {
                const isUnlocked = user.level >= t.level || user.unlockedThemes.includes(t.id);
                const isActive = user.currentTheme === t.id;
                return html`
                  <button key=${t.id} disabled=${!isUnlocked} onClick=${() => onSetTheme(t.id)} className=${`group relative aspect-square rounded-[2rem] border-2 transition-all flex flex-col items-center justify-center overflow-hidden ${isActive ? 'border-white scale-105 shadow-[0_0_30px_var(--primary-glow)]' : 'border-slate-800 bg-slate-900/40 hover:border-theme/40'} ${!isUnlocked ? 'opacity-40 grayscale-[0.8] cursor-not-allowed' : 'active:scale-95'}`}>
                    <div className="absolute inset-0 w-full h-full" style=${{ background: t.color }} />
                    ${isActive && html`<div className="relative z-10 w-1.5 h-1.5 bg-white rounded-full mx-auto" />`}
                  </button>
                `;
              })}
            </div>
          </section>
        </div>

        <div className="space-y-8">
           <div className="p-8 bg-slate-900/60 rounded-[2.5rem] border border-white/5 space-y-8">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-theme/20 rounded-xl flex items-center justify-center text-theme"><${Zap} size=${20} /></div>
                <div className="font-orbitron font-bold text-sm uppercase text-white">Stats Overview</div>
              </div>
              <div className="space-y-6">
                <${ProgressBar} label="Level progression" current=${user.level} target=${100} />
                <div className="flex justify-between text-[10px] font-black uppercase text-slate-500">
                  <span>Games Launched</span>
                  <span className="text-theme">${user.gamesPlayed || 0}</span>
                </div>
              </div>
           </div>
        </div>
      </div>
    </div>
  `;
};

export default Customization;