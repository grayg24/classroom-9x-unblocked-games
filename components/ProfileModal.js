import React, { useState } from 'react';
import htm from 'htm';
import { 
  X, Edit2, User as UserIcon, Trophy, Gamepad2, 
  Palette, Lock, Check, Zap, Award, Star, Activity, 
  ChevronRight, Brain, Target, Heart, Scan, Terminal,
  Cpu, Flame, ShieldCheck, Cpu as ModuleIcon, Layout
} from 'lucide-react';

const html = htm.bind(React.createElement);

const ProfileModal = ({ user, onUpdateUser, onSetTheme, onSetFrame, onClose }) => {
  const [newUsername, setNewUsername] = useState(user.username);
  const [isEditing, setIsEditing] = useState(false);

  const handleSave = () => {
    if (newUsername.trim()) {
      onUpdateUser({ username: newUsername.trim() });
      setIsEditing(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleSave();
    if (e.key === 'Escape') {
      setNewUsername(user.username);
      setIsEditing(false);
    }
  };

  const themeOptions = [
    { id: 'cyan', label: 'Cyan', level: 1, color: '#22d3ee', desc: 'Standard Uplink' },
    { id: 'rose', label: 'Rose', level: 5, color: '#fb7185', desc: 'Enhanced Visuals' },
    { id: 'emerald', label: 'Emerald', level: 10, color: '#34d399', desc: 'Tactical Overlay' },
    { id: 'violet', label: 'Violet', level: 15, color: '#a78bfa', desc: 'Psionic Buffer' },
    { id: 'cobalt', label: 'Cobalt', level: 20, color: '#3b82f6', desc: 'Deep Space Link' },
    { id: 'crimson', label: 'Crimson', level: 40, color: '#dc2626', desc: 'Overclocked Mode' },
    { id: 'gold', label: 'Gold', level: 75, color: '#facc15', desc: 'Legendary Status', special: 'shine' },
    { id: 'galaxy', label: 'Galaxy', level: 100, color: '#c084fc', desc: 'Reality Warper', special: 'nebula' },
    { id: 'hologram', label: 'Hologram', level: 0, color: '#00ffff', desc: 'Secret Protocol', special: 'hologram', secret: true },
    { id: 'rainbow', label: 'Rainbow', level: 0, color: 'linear-gradient(45deg, #ff0000, #ff7f00, #ffff00, #00ff00, #0000ff, #4b0082, #8b00ff, #ff0000)', desc: 'Exclusive Rewards', special: 'matrix', secret: true },
  ];

  const frameOptions = [
    { id: 'obsidian', label: 'Obsidian', level: 1, class: 'frame-obsidian', desc: 'Default Armor' },
    { id: 'default', label: 'Standard', level: 5, class: 'frame-default', desc: 'Level 5 Module' },
    { id: 'neon', label: 'Neon Pulse', level: 10, class: 'frame-neon', desc: 'Digital Glow' },
    { id: 'solar', label: 'Solar Flare', level: 60, class: 'frame-solar', desc: 'Atomic Core' },
    { id: 'interstellar', label: 'Void Drifter', level: 100, class: 'frame-interstellar', desc: 'Null Space' },
    { id: 'glitch', label: 'Glitch', level: 0, class: 'frame-glitch', desc: 'Illegal Protocol', secret: true },
  ];

  const badgesList = [
    { id: 'first_play', label: 'First of Many', sub: 'Play 1 Game', icon: Zap, condition: user.gamesPlayed >= 1, color: 'from-amber-500/20 to-amber-500/5', iconColor: 'text-amber-500' },
    { id: 'fav_collector', label: 'Stasher', sub: '5 Favorites', icon: Heart, condition: user.favorites?.length >= 5, color: 'from-rose-500/20 to-rose-500/5', iconColor: 'text-rose-500' },
    { id: 'veteran', label: 'Sentinel', sub: 'Level 10', icon: Award, condition: user.level >= 10, color: 'from-violet-500/20 to-violet-500/5', iconColor: 'text-violet-500' },
    { id: 'elite', label: 'Overseer', sub: 'Level 50', icon: Star, condition: user.level >= 50, color: 'from-cyan-500/20 to-cyan-500/5', iconColor: 'text-cyan-500' },
    { id: 'pro', label: 'Warlord', sub: 'Play 50 Games', icon: Target, condition: user.gamesPlayed >= 50, color: 'from-emerald-500/20 to-emerald-500/5', iconColor: 'text-emerald-500' },
    { id: 'hacker', label: 'Collector', sub: 'Collect 5 Themes', icon: Brain, condition: user.unlockedThemes?.length >= 5, color: 'from-blue-500/20 to-blue-500/5', iconColor: 'text-blue-500' },
  ];

  const visibleThemes = themeOptions.filter(t => !t.secret || user.unlockedThemes.includes(t.id));
  const visibleFrames = frameOptions.filter(f => !f.secret || (user.unlockedFrames && user.unlockedFrames.includes(f.id)));
  
  const expToNextLevel = user.level * 200;
  const progressPercent = Math.min((user.exp / expToNextLevel) * 100, 100);

  return html`
    <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4">
      <div 
        className="absolute inset-0 bg-slate-950/98 backdrop-blur-2xl animate-in fade-in duration-500" 
        onClick=${onClose} 
      />

      <div className="relative w-full max-w-5xl bg-slate-900 border border-white/10 rounded-[3rem] shadow-[0_0_150px_rgba(0,0,0,0.8)] flex flex-col overflow-hidden animate-in zoom-in-95 duration-500 max-h-[92vh]">
        
        <div className="absolute inset-0 opacity-10 pointer-events-none overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_-20%,var(--primary),transparent)]" />
          <div className="scanline absolute inset-0 bg-gradient-to-b from-transparent via-white/5 to-transparent h-4 w-full animate-scan-slow" />
        </div>

        <div className="relative z-10 flex items-center justify-between px-10 py-6 bg-slate-950/60 border-b border-white/5">
          <div className="flex items-center gap-6">
            <div className="p-3.5 bg-theme/10 rounded-2xl text-theme border border-theme/20 shadow-[0_0_25px_var(--primary-glow)]">
              <${UserIcon} size=${28} />
            </div>
            <div>
              <h2 className="font-orbitron font-black text-2xl uppercase italic tracking-tighter text-white leading-none">
                <span className="text-theme">Profile</span>
              </h2>
              <div className="flex items-center gap-2 mt-2">
                <div className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] leading-none">Status: Neural Link Active</p>
              </div>
            </div>
          </div>
          <button 
            onClick=${onClose} 
            onMouseEnter=${() => window.setCursorActive?.(true)}
            onMouseLeave=${() => window.setCursorActive?.(false)}
            className="group p-3.5 bg-slate-800/50 hover:bg-rose-500/20 text-slate-400 hover:text-rose-500 rounded-2xl transition-all border border-white/5 active:scale-90"
          >
            <${X} size=${22} className="group-hover:rotate-90 transition-transform" />
          </button>
        </div>

        <div className="relative z-10 flex-1 overflow-y-auto p-10 space-y-12 custom-scrollbar">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-12 xl:col-span-8 space-y-8">
              
              <div className="bg-black/40 border border-white/5 rounded-[3rem] p-10 relative overflow-hidden group shadow-2xl">
                <div className="absolute top-0 right-0 p-10 opacity-5 pointer-events-none group-hover:opacity-10 transition-opacity">
                  <${Scan} size=${160} className="text-theme" />
                </div>
                
                <div className="relative flex flex-col md:flex-row items-center gap-10">
                  <div className="relative shrink-0">
                    <div className="w-32 h-32 bg-theme/5 rounded-[2.5rem] flex items-center justify-center text-theme border border-theme/20 shadow-[inset_0_0_40px_var(--primary-glow)] relative z-10 transition-transform duration-500 group-hover:scale-105">
                      <${UserIcon} size=${64} />
                    </div>
                    <!-- The dynamic frame preview -->
                    <div className=${`absolute inset-0 -m-4 ${frameOptions.find(f => f.id === (user.currentFrame || 'obsidian'))?.class || 'frame-obsidian'} pointer-events-none z-20`} />
                    
                    <div className="absolute -bottom-1 -right-1 bg-theme text-slate-950 text-xs font-black px-4 py-2 rounded-2xl border-4 border-slate-900 shadow-theme z-30">
                      LVL ${user.level}
                    </div>
                  </div>

                  <div className="flex-1 min-w-0 w-full text-center md:text-left space-y-4">
                    <div className="min-h-[80px] flex items-center justify-center md:justify-start">
                      ${isEditing ? html`
                        <div className="flex items-center gap-4 animate-in fade-in zoom-in-95 h-20 w-full">
                          <div className="relative flex-1">
                            <input 
                              autoFocus 
                              type="text" 
                              value=${newUsername} 
                              onChange=${(e) => setNewUsername(e.target.value)} 
                              onKeyDown=${handleKeyDown}
                              className="w-full bg-slate-800/80 border-2 border-theme rounded-2xl px-6 py-4 text-white font-orbitron text-xl focus:outline-none shadow-[0_0_40px_var(--primary-glow)]" 
                            />
                            <div className="absolute right-4 top-1/2 -translate-y-1/2 text-theme/30"><${Terminal} size=${20} /></div>
                          </div>
                          <button onClick=${handleSave} className="p-4 bg-theme text-slate-950 rounded-2xl hover:brightness-110 active:scale-95 transition-all shadow-theme">
                            <${Check} size=${28} strokeWidth=${3} />
                          </button>
                        </div>
                      ` : html`
                        <div className="flex items-center justify-center md:justify-between group/edit w-full h-20">
                          <div className="min-w-0">
                            <h3 className="font-orbitron font-black text-5xl text-white truncate italic tracking-tighter uppercase leading-none drop-shadow-theme">${user.username}</h3>
                            <div className="flex items-center justify-center md:justify-start gap-5 mt-4">
                               <div className="flex items-center gap-2 text-theme">
                                 <${Activity} size=${16} className="animate-pulse" />
                                 <span className="text-[11px] font-black uppercase tracking-[0.3em]">Signal Optimized</span>
                               </div>
                               <div className="w-1.5 h-1.5 rounded-full bg-slate-800" />
                               <span className="text-[11px] font-black text-slate-500 uppercase tracking-[0.3em]">Verified Operative</span>
                            </div>
                          </div>
                          <button 
                            onClick=${() => setIsEditing(true)}
                            onMouseEnter=${() => window.setCursorActive?.(true)}
                            onMouseLeave=${() => window.setCursorActive?.(false)}
                            className="ml-8 p-3.5 bg-slate-800/50 text-slate-500 hover:text-theme rounded-2xl opacity-0 group-hover/edit:opacity-100 transition-all active:scale-95 border border-white/5"
                          >
                            <${Edit2} size=${20} />
                          </button>
                        </div>
                      `}
                    </div>
                  </div>
                </div>

                <div className="mt-12 space-y-5">
                  <div className="flex justify-between items-end px-2">
                    <div className="space-y-2">
                      <p className="text-[10px] font-black text-slate-600 uppercase tracking-[0.5em]">Level Progression</p>
                      <div className="flex items-center gap-3">
                         <span className="text-sm font-orbitron font-bold text-white uppercase tracking-tighter">LVL ${user.level + 1}</span>
                         <${ChevronRight} size=${14} className="text-theme" />
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-[10px] font-black text-theme uppercase tracking-[0.4em] mb-2">XP Status</p>
                      <span className="text-lg font-orbitron font-black text-white">${user.exp} <span className="text-slate-700">/</span> ${expToNextLevel}</span>
                    </div>
                  </div>
                  <div className="h-4 bg-black/60 rounded-full border border-white/5 overflow-hidden p-1 shadow-inner">
                    <div 
                      className="h-full bg-theme shadow-[0_0_25px_var(--primary)] rounded-full transition-all duration-1000 ease-out relative overflow-hidden"
                      style=${{ width: `${progressPercent}%` }}
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-[shimmer_2s_infinite]" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-12 xl:col-span-4 grid grid-cols-1 gap-6">
              <div className="p-8 bg-slate-800/30 border border-white/5 rounded-[2.5rem] flex flex-col justify-center gap-5 group hover:bg-slate-800/40 transition-all border-l-4 border-l-amber-500 shadow-xl">
                  <div className="p-4 bg-amber-500/10 rounded-2xl text-amber-500 self-start">
                    <${Trophy} size=${32} />
                  </div>
                  <div>
                    <div className="text-4xl font-orbitron font-black text-white italic tracking-tighter leading-none">${user.exp}</div>
                    <div className="text-[11px] font-black uppercase text-slate-500 tracking-[0.4em] mt-2">Total EXP Collected</div>
                  </div>
              </div>
              <div className="p-8 bg-slate-800/30 border border-white/5 rounded-[2.5rem] flex flex-col justify-center gap-5 group hover:bg-slate-800/40 transition-all border-l-4 border-l-theme shadow-xl">
                  <div className="p-4 bg-theme/10 rounded-2xl text-theme self-start">
                    <${Gamepad2} size=${32} />
                  </div>
                  <div>
                    <div className="text-4xl font-orbitron font-black text-white italic tracking-tighter leading-none">${user.gamesPlayed || 0}</div>
                    <div className="text-[11px] font-black uppercase text-slate-500 tracking-[0.4em] mt-2">Games Played</div>
                  </div>
              </div>
            </div>
          </div>

          <!-- Neural Frames Section -->
          <section className="space-y-8">
            <div className="flex items-center gap-8 px-2">
               <div className="flex items-center gap-4 text-theme">
                  <${Layout} size=${24} />
                  <p className="text-xs font-black uppercase tracking-[0.5em]">Neural Frames</p>
               </div>
              <div className="h-px flex-1 bg-gradient-to-r from-white/10 to-transparent" />
            </div>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
              ${visibleFrames.map((f) => {
                const isUnlocked = user.level >= f.level || (user.unlockedFrames && user.unlockedFrames.includes(f.id));
                const isActive = (user.currentFrame || 'obsidian') === f.id;
                
                return html`
                  <button 
                    key=${f.id} 
                    disabled=${!isUnlocked} 
                    onClick=${() => onSetFrame(f.id)}
                    onMouseEnter=${() => isUnlocked && window.setCursorActive?.(true)}
                    onMouseLeave=${() => isUnlocked && window.setCursorActive?.(false)}
                    className=${`group relative flex flex-col items-center gap-4 p-5 rounded-2xl border transition-all duration-300 ${
                      isActive 
                        ? 'bg-slate-800 border-white shadow-[0_0_20px_rgba(255,255,255,0.1)] ring-1 ring-white/10' 
                        : 'bg-slate-900/40 border-white/5 hover:border-white/20'
                    } ${!isUnlocked ? 'opacity-40 grayscale cursor-not-allowed' : 'active:scale-95'}`}
                  >
                    <div className="relative w-14 h-14 shrink-0">
                       <div className="absolute inset-0 bg-slate-800 rounded-xl flex items-center justify-center text-slate-500">
                          <${UserIcon} size=${24} />
                       </div>
                       <!-- Frame Overlay Preview -->
                       <div className=${`absolute inset-0 -m-2 ${f.class} pointer-events-none opacity-100 scale-90 group-hover:scale-100 transition-transform`} />
                    </div>
                    
                    <div className="text-center">
                       <span className=${`text-[9px] font-orbitron font-bold tracking-tight block ${isActive ? 'text-theme' : 'text-slate-400'}`}>${f.label}</span>
                       ${!isUnlocked && html`
                         <div className="mt-1 flex items-center justify-center gap-1">
                            <${Lock} size=${8} className="text-rose-500" />
                            <span className="text-[7px] font-black text-rose-500 uppercase">LVL ${f.level}</span>
                         </div>
                       `}
                       ${isActive && html`
                         <div className="mt-1 flex items-center justify-center gap-1">
                            <${Check} size=${8} className="text-emerald-500" />
                            <span className="text-[7px] font-black text-emerald-500 uppercase">Active</span>
                         </div>
                       `}
                    </div>
                  </button>
                `;
              })}
            </div>
          </section>

          <section className="space-y-8">
            <div className="flex items-center gap-8 px-2">
               <div className="flex items-center gap-4 text-theme">
                  <${Palette} size=${24} />
                  <p className="text-xs font-black uppercase tracking-[0.5em]">Visual Core Modules</p>
               </div>
              <div className="h-px flex-1 bg-gradient-to-r from-white/10 to-transparent" />
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              ${visibleThemes.map((t) => {
                const isUnlocked = user.level >= t.level || user.unlockedThemes.includes(t.id);
                const isActive = user.currentTheme === t.id;
                
                return html`
                  <button 
                    key=${t.id} 
                    disabled=${!isUnlocked} 
                    onClick=${() => onSetTheme(t.id)}
                    onMouseEnter=${() => isUnlocked && window.setCursorActive?.(true)}
                    onMouseLeave=${() => isUnlocked && window.setCursorActive?.(false)}
                    className=${`group relative flex h-24 rounded-2xl border transition-all duration-300 overflow-hidden ${
                      isActive 
                        ? 'bg-slate-800 border-white shadow-[0_0_35px_var(--primary-glow)] ring-2 ring-white/20' 
                        : 'bg-slate-900/40 border-white/10 hover:border-theme/40 hover:bg-slate-800/60'
                    } ${!isUnlocked ? 'opacity-40 grayscale cursor-not-allowed' : 'active:scale-95'}`}
                  >
                    <div className="w-2.5 h-full shrink-0 relative overflow-hidden">
                       <div className=${`absolute inset-0 ${t.special === 'shine' ? 'effect-shine' : ''}`} style=${{ background: t.color }} />
                    </div>
                    
                    <div className="flex-1 flex flex-col justify-center px-4 py-3 text-left relative">
                       <div className="flex items-center justify-between mb-1">
                          <span className=${`text-[10px] font-orbitron font-bold tracking-tight ${isActive ? 'text-theme' : 'text-slate-400'}`}>${t.label}</span>
                          ${isActive && html`<div className="flex items-center gap-1.5"><span className="text-[8px] font-black text-emerald-500 uppercase tracking-widest">Synced</span><div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" /></div>`}
                          ${!isUnlocked && html`<${Lock} size=${12} className="text-rose-500" />`}
                       </div>
                       <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest truncate">${t.desc}</p>
                       
                       ${!isUnlocked && html`
                         <div className="mt-2 flex items-center gap-2">
                           <span className="text-[8px] font-black text-white bg-rose-500/20 px-2 py-0.5 rounded-md border border-rose-500/20 uppercase tracking-tighter">Auth Required: LVL ${t.level}</span>
                         </div>
                       `}
                       
                       ${isActive && html`
                         <div className="absolute top-1/2 right-4 -translate-y-1/2 opacity-20">
                            <${Check} size=${40} strokeWidth=${3} className="text-theme" />
                         </div>
                       `}
                    </div>

                    ${t.special && html`
                      <div className="absolute -bottom-1 -right-1 opacity-20 group-hover:opacity-40 transition-opacity">
                         <${ModuleIcon} size=${48} className="text-theme" />
                      </div>
                    `}
                  </button>
                `;
              })}
            </div>
          </section>

          <section className="space-y-8">
            <div className="flex items-center gap-8 px-2">
               <div className="flex items-center gap-4 text-theme">
                  <${Award} size=${24} />
                  <p className="text-xs font-black uppercase tracking-[0.5em]">System Badges</p>
               </div>
              <div className="h-px flex-1 bg-gradient-to-r from-white/10 to-transparent" />
              <div className="flex items-center gap-4 text-slate-600">
                <span className="text-[11px] font-black uppercase tracking-widest">${badgesList.filter(b => b.condition).length} / ${badgesList.length} Secured</span>
              </div>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
              ${badgesList.map(badge => html`
                <div 
                  key=${badge.id}
                  className=${`relative p-8 rounded-[2.5rem] border flex flex-col items-center text-center gap-5 transition-all duration-500 group overflow-hidden ${
                    badge.condition 
                      ? `bg-gradient-to-br ${badge.color} border-white/10 opacity-100 hover:scale-105 hover:shadow-2xl shadow-[0_10px_30px_rgba(0,0,0,0.3)]` 
                      : 'bg-black/20 border-white/5 opacity-25 grayscale hover:opacity-40'
                  }`}
                >
                  ${badge.condition && html`
                     <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-scan-slow" />
                  `}
                  
                  <div className=${`p-5 rounded-3xl bg-black/40 ${badge.condition ? badge.iconColor : 'text-slate-600'} transition-transform duration-500 group-hover:rotate-12`}>
                    <${badge.icon} size=${40} />
                  </div>
                  <div className="space-y-2">
                    <p className=${`text-xs font-black uppercase tracking-[0.2em] leading-none ${badge.condition ? 'text-white' : 'text-slate-600'}`}>${badge.label}</p>
                    <p className="text-[9px] font-bold text-slate-500 uppercase tracking-tight opacity-70">${badge.sub}</p>
                  </div>
                  ${badge.condition && html`
                    <div className="absolute top-4 right-4 bg-emerald-500/20 p-1.5 rounded-full border border-emerald-500/20">
                       <${Check} size=${14} className="text-emerald-500" />
                    </div>
                  `}
                </div>
              `)}
            </div>
          </section>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6">
            <div className="p-6 bg-slate-950 border border-white/5 rounded-3xl flex items-center gap-4 opacity-50 hover:opacity-100 transition-opacity">
              <${Cpu} size=${18} className="text-theme" />
              <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest leading-none">Kernel Version: 4.2.1-Elite</p>
            </div>
            <div className="p-6 bg-slate-950 border border-white/5 rounded-3xl flex items-center gap-4 opacity-50 hover:opacity-100 transition-opacity">
              <${Flame} size=${18} className="text-theme" />
              <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest leading-none">Latency: 0.02ms Real-Time</p>
            </div>
            <div className="p-6 bg-slate-950 border border-white/5 rounded-3xl flex items-center gap-4 opacity-50 hover:opacity-100 transition-opacity">
              <${ShieldCheck} size=${18} className="text-theme" />
              <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest leading-none">Profile Integrity: Validated</p>
            </div>
          </div>
        </div>
      </div>
      
      <style>${`
        .custom-scrollbar::-webkit-scrollbar { width: 6px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.08); border-radius: 20px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: var(--primary); }
        
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(300%); }
        }
        @keyframes scan {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(600%); }
        }
        .animate-scan-slow {
          animation: scan 12s linear infinite;
        }
      `}</style>
    </div>
  `;
};

export default ProfileModal;