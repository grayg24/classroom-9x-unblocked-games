import React from 'react';
import { User, CursorStyle } from '../types';
import { Palette, MousePointer2, Lock, Sparkles, Trophy, Zap, ShieldCheck, Stars } from 'lucide-react';

interface CustomizationProps {
  user: User;
  onSetTheme: (theme: string) => void;
  onUpdateSettings: (settings: Partial<User['settings']>) => void;
}

const Customization: React.FC<CustomizationProps> = ({ user, onSetTheme, onUpdateSettings }) => {
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

  const cursorOptions: { id: CursorStyle, label: string, level: number }[] = [
    { id: 'default', label: 'Standard Glow', level: 1 },
    { id: 'crosshair', label: 'Tactical', level: 5 },
    { id: 'sword', label: 'Plasma Sword', level: 10 },
    { id: 'neon', label: 'Polygon', level: 15 },
    { id: 'ring', label: 'Cyber Ring', level: 20 },
    { id: 'amongus', label: 'Among Us', level: 0 },
    { id: 'star', label: 'Celestial', level: 0 },
  ];

  const ProgressBar = ({ current, target, label }: { current: number, target: number, label: string }) => {
    const percentage = Math.min((current / target) * 100, 100);
    return (
      <div className="space-y-1">
        <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-slate-500">
          <span>{label}</span>
          <span>{current} / {target}</span>
        </div>
        <div className="h-1 bg-slate-800 rounded-full overflow-hidden">
          <div className="h-full bg-theme transition-all duration-1000 shadow-theme" style={{ width: `${percentage}%` }}></div>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-6 duration-700 pb-20">
      {/* Header */}
      <div className="flex items-center gap-6">
        <div className="w-16 h-16 bg-theme/10 rounded-3xl flex items-center justify-center text-theme border border-theme/20 shadow-2xl">
          <Palette size={32} />
        </div>
        <div>
          <h1 className="font-orbitron font-black text-4xl uppercase italic tracking-tighter text-white">
            Operative <span className="text-theme">Customs</span>
          </h1>
          <div className="flex items-center gap-3 mt-1">
             <div className="flex items-center gap-1.5 text-[10px] font-black text-slate-500 uppercase tracking-widest">
               <Trophy size={12} className="text-amber-500" />
               Prestige Rank: {Math.floor(user.level / 10)}
             </div>
             <div className="w-1 h-1 rounded-full bg-slate-800"></div>
             <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest">
               Level {user.level} Assets Available
             </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Left Col: Themes */}
        <div className="lg:col-span-2 space-y-10">
          <section className="space-y-6">
            <div className="flex items-center justify-between px-4">
              <p className="text-[10px] font-black text-slate-600 uppercase tracking-[0.4em] flex items-center gap-2">
                <Sparkles size={12} className="text-theme" /> Themes
              </p>
              <span className="text-[10px] font-black text-slate-500 uppercase">Unlock Themes by Leveling Up</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-5 gap-4">
              {themeOptions.map((t) => {
                const isUnlockedByCode = user.unlockedThemes.includes(t.id);
                const isLocked = user.level < t.level && !isUnlockedByCode;
                const isActive = user.currentTheme === t.id;
                
                return (
                  <button 
                    key={t.id} 
                    disabled={isLocked} 
                    onClick={() => onSetTheme(t.id)} 
                    className={`group relative aspect-square rounded-[2rem] border-2 transition-all flex flex-col items-center justify-center overflow-hidden ${
                      isActive 
                        ? 'border-white scale-105 shadow-[0_0_30px_var(--primary-glow)]' 
                        : 'border-slate-800 bg-slate-900/40 hover:border-theme/40'
                    } ${isLocked ? 'opacity-40 grayscale-[0.8] cursor-not-allowed' : 'active:scale-95'}`}
                  >
                    {/* Background Color Preview */}
                    <div 
                      className={`absolute inset-0 w-full h-full ${t.special === 'matrix' ? 'bg-[length:300%_300%] animate-[move-gradient_3s_linear_infinite]' : ''}`} 
                      style={{ 
                        background: t.id === 'gold' ? 'var(--primary)' : t.color,
                        backgroundColor: (t.id === 'rainbow') ? 'transparent' : (t.id === 'gold' ? 'var(--primary)' : t.color)
                      }} 
                    />

                    {/* Theme Effect Layer */}
                    <div 
                      className={`absolute inset-0 transition-opacity opacity-40 group-hover:opacity-60 ${t.special === 'shine' ? 'effect-shine' : ''}`} 
                    />

                    {isLocked ? (
                      <div className="relative z-10 flex flex-col items-center gap-1">
                        <Lock size={18} className="text-slate-400" />
                        <span className="text-[9px] font-black text-white bg-black/60 px-2 py-0.5 rounded-full">LVL {t.level === 999 ? '???' : t.level}</span>
                      </div>
                    ) : (
                      <div className="relative z-10 text-center px-2">
                        {t.id === 'galaxy' && <Stars size={14} className="mx-auto mb-1 text-white animate-pulse" />}
                        {t.id === 'rainbow' && <Zap size={14} className="mx-auto mb-1 text-white animate-bounce" />}
                        <span className="text-[10px] font-black text-white uppercase tracking-widest block leading-tight">{t.label}</span>
                        {isActive && <div className="mt-2 w-1.5 h-1.5 bg-white rounded-full mx-auto shadow-sm"></div>}
                        {t.id === 'gold' && <div className="mt-1 text-[8px] font-black text-white/60 uppercase tracking-tighter">Chrome Sync</div>}
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          </section>

          {/* Cursors Section */}
          <section className="space-y-6">
             <div className="flex items-center justify-between px-4">
              <p className="text-[10px] font-black text-slate-600 uppercase tracking-[0.4em] flex items-center gap-2">
                <MousePointer2 size={12} className="text-theme" /> Cursors
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {cursorOptions.map((c) => {
                const isSecret = c.id === 'amongus' || c.id === 'star';
                const isUnlocked = isSecret ? user.unlockedCursors.includes(c.id) : user.level >= c.level;
                const isActive = user.settings.cursorStyle === c.id;
                
                if (isSecret && !isUnlocked) return null;

                return (
                  <button 
                    key={c.id} 
                    disabled={!isUnlocked} 
                    onClick={() => onUpdateSettings({ cursorStyle: c.id })}
                    className={`p-6 rounded-[2rem] border-2 transition-all flex items-center gap-5 relative ${
                      isActive 
                        ? 'border-white bg-white/5 shadow-theme' 
                        : 'border-slate-800 bg-slate-900/40 hover:border-theme/40'
                    } ${!isUnlocked ? 'opacity-40 grayscale cursor-not-allowed' : 'active:scale-95'}`}
                  >
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${isActive ? 'bg-theme text-slate-950 shadow-theme' : 'bg-slate-800 text-slate-500'}`}>
                      <MousePointer2 size={24} />
                    </div>
                    <div className="text-left">
                      <div className="text-xs font-black uppercase text-white tracking-widest">{c.label}</div>
                      {!isUnlocked ? (
                        <div className="text-[10px] font-black text-theme uppercase mt-1">LOCKED: LEVEL {c.level}</div>
                      ) : (
                        <div className="text-[10px] font-black text-slate-500 uppercase mt-1">{isActive ? 'Integrated' : 'Ready for Sync'}</div>
                      )}
                    </div>
                    {!isUnlocked && <Lock size={14} className="absolute top-4 right-6 text-slate-600" />}
                  </button>
                );
              })}
            </div>
          </section>
        </div>

        {/* Right Col: Stats & Info */}
        <div className="space-y-8">
           <div className="p-8 bg-slate-900/60 rounded-[2.5rem] border border-white/5 space-y-8">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-theme/20 rounded-xl flex items-center justify-center text-theme">
                  <Zap size={20} />
                </div>
                <div className="font-orbitron font-bold text-sm uppercase text-white">Unlock Progress</div>
              </div>

              <div className="space-y-6">
                <ProgressBar label="Level progression" current={user.level} target={100} />
                <ProgressBar label="Themes Unlocked" current={user.unlockedThemes.length} target={themeOptions.length} />
                <ProgressBar label="Module Sync" current={user.unlockedCursors.length} target={cursorOptions.length} />
              </div>

              <div className="pt-6 border-t border-white/5">
                <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest leading-relaxed">
                  Earn EXP by playing games to unlock higher-tier aesthetics. Each play adds +25 EXP to your local profile database.
                </p>
              </div>
           </div>

           <div className="p-8 bg-slate-950 border border-white/5 rounded-[2.5rem] relative overflow-hidden group">
              <div className="absolute inset-0 bg-theme/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="flex items-center gap-2 text-emerald-500 mb-3">
                <ShieldCheck size={16} />
                <span className="font-orbitron font-bold text-[10px] uppercase tracking-widest">Aesthetic Integrity</span>
              </div>
              <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest leading-relaxed">
                Sync your interface with premium color modules. All unlockables are persistent in your local browser storage.
              </p>
           </div>
        </div>
      </div>
    </div>
  );
};

export default Customization;