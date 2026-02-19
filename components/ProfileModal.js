import React, { useState } from 'react';
import htm from 'htm';
import { 
  X, Edit2, User as UserIcon, Trophy, Gamepad2, 
  Palette, Lock, Check, Zap, Award, Star, Activity, 
  ChevronRight, Brain, Target, Heart, Scan, Terminal,
  Cpu, Flame, ShieldCheck, Layout,
  Eye, Zap as ZapIcon, Shield, Ghost, Cat, Crown, ZapOff, Bot,
  MousePointer2, Layers, Binary
} from 'lucide-react';

const html = htm.bind(React.createElement);

const ProfileModal = ({ user, onUpdateUser, onSetTheme, onSetFrame, onSetCharacter, onSetFeaturedBadge, onClose }) => {
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

  const characterOptions = [
    { id: 'agent-x', label: 'Default', level: 1, icon: UserIcon, desc: 'Basic Operative', color: 'text-slate-400', themeColor: '#94a3b8' },
    { id: 'viper', label: 'Viper', level: 15, icon: ZapIcon, desc: 'Speed Demon', color: 'text-emerald-400', themeColor: '#34d399' },
    { id: 'ghost', label: 'Ghost', level: 30, icon: Ghost, desc: 'Stealth Specialist', color: 'text-violet-400', themeColor: '#a78bfa' },
    { id: 'cyber-neko', label: 'Cyber Neko', level: 50, icon: Cat, desc: 'High-Tech Feline', color: 'text-rose-400', themeColor: '#fb7185' },
    { id: 'overlord', label: 'Overlord', level: 100, icon: Crown, desc: 'Supreme Ruler', color: 'text-amber-400', themeColor: '#fbbf24' },
    { id: 'stark', label: 'Jarvis', level: 0, icon: Bot, desc: 'AI Interface', color: 'text-red-500', themeColor: '#ef4444', secret: true },
    { id: 'glitch', label: 'Protocol Zero', level: 0, icon: ZapOff, desc: 'Error: Undefined', color: 'text-cyan-400', themeColor: '#22d3ee', secret: true },
  ];

  const themeOptions = [
    { id: 'cyan', label: 'Cyan', level: 1, color: '#22d3ee', desc: 'Standard Uplink', icon: Palette },
    { id: 'rose', label: 'Rose', level: 5, color: '#fb7185', desc: 'Enhanced Visuals', icon: Palette },
    { id: 'emerald', label: 'Emerald', level: 10, color: '#34d399', desc: 'Tactical Overlay', icon: Palette },
    { id: 'violet', label: 'Violet', level: 15, color: '#a78bfa', desc: 'Psionic Buffer', icon: Palette },
    { id: 'cobalt', label: 'Cobalt', level: 20, color: '#3b82f6', desc: 'Deep Space Link', icon: Palette },
    { id: 'crimson', label: 'Crimson', level: 40, color: '#dc2626', desc: 'Overclocked Mode', icon: Palette },
    { id: 'gold', label: 'Gold', level: 75, color: 'linear-gradient(135deg, #fef3c7, #fbbf24, #d97706, #fbbf24)', desc: 'Legendary Status', special: 'shine', icon: Star },
    { id: 'galaxy', label: 'Galaxy', level: 100, color: 'linear-gradient(135deg, #c084fc, #818cf8, #ec4899)', desc: 'Celestial Nebula Flow', special: 'nebula', icon: Brain },
    { id: 'ironman', label: 'Iron Man', level: 0, color: '#ef4444', desc: 'Jarvis HUD', special: 'metallic', secret: true, icon: Shield },
    { id: 'hologram', label: 'Hologram', level: 0, color: '#00ffff', desc: 'Secret Protocol', special: 'hologram', secret: true, icon: Eye },
    { id: 'rainbow', label: 'Rainbow', level: 0, color: 'linear-gradient(45deg, #ff0000, #ff7f00, #ffff00, #00ff00, #0000ff, #4b0082, #8b00ff, #ff0000)', desc: 'Spectrum Mode', special: 'matrix', secret: true, icon: Zap },
  ];

  const frameOptions = [
    { id: 'obsidian', label: 'Standard', level: 1, class: 'frame-obsidian', desc: 'Default Armor', color: '#1e293b' },
    { id: 'default', label: 'Outline', level: 5, class: 'frame-default', desc: 'Level 5 Module', color: '#64748b' },
    { id: 'neon', label: 'Neon Pulse', level: 10, class: 'frame-neon', desc: 'Digital Glow', color: '#22d3ee' },
    { id: 'solar', label: 'Solar Flare', level: 60, class: 'frame-solar', desc: 'Atomic Core', color: '#f59e0b' },
    { id: 'interstellar', label: 'Void Drifter', level: 100, class: 'frame-interstellar', desc: 'Dark Energy Aura', color: '#a855f7' },
    { id: 'hologram', label: 'Hologram', level: 0, class: 'frame-hologram', desc: 'Digital UI', color: '#00ffff', secret: true },
    { id: 'glitch', label: 'Glitch', level: 0, class: 'frame-glitch', desc: 'Illegal Protocol', color: '#ef4444', secret: true },
  ];

  const badgesList = [
    { id: 'first_play', label: 'First Contact', sub: 'Launch 1 Game', icon: Zap, condition: user.gamesPlayed >= 1, color: 'from-amber-500/20 to-amber-500/5', iconColor: 'text-amber-500' },
    { id: 'veteran', label: 'Sentinel', sub: 'Reach Level 10', icon: Award, condition: user.level >= 10, color: 'from-violet-500/20 to-violet-500/5', iconColor: 'text-violet-500' },
    { id: 'elite', label: 'Elite Squad', sub: 'Reach Level 50', icon: Star, condition: user.level >= 50, color: 'from-cyan-500/20 to-cyan-500/5', iconColor: 'text-cyan-500' },
    { id: 'overlord', label: 'Overlord', sub: 'Reach Level 100', icon: Crown, condition: user.level >= 100, color: 'from-amber-400/30 to-amber-400/5', iconColor: 'text-amber-400' },
    { id: 'fav_collector', label: 'Archivist', sub: '5 Favorites', icon: Heart, condition: user.favorites?.length >= 5, color: 'from-rose-500/20 to-rose-500/5', iconColor: 'text-rose-500' },
    { id: 'hoarder', label: 'Data Hoarder', sub: '10 Favorites', icon: Layers, condition: user.favorites?.length >= 10, color: 'from-indigo-500/20 to-indigo-500/5', iconColor: 'text-indigo-500' },
    { id: 'pro', label: 'Warlord', sub: '50 Games Played', icon: Target, condition: user.gamesPlayed >= 50, color: 'from-emerald-500/20 to-emerald-500/5', iconColor: 'text-emerald-500' },
    { id: 'theme_master', label: 'Chameleon', sub: '8 Themes Unlocked', icon: Palette, condition: user.unlockedThemes?.length >= 8, color: 'from-pink-500/20 to-pink-500/5', iconColor: 'text-pink-500' },
    { id: 'frame_collector', label: 'Aesthetician', sub: '4 Frames Unlocked', icon: Layout, condition: user.unlockedFrames?.length >= 4, color: 'from-sky-500/20 to-sky-500/5', iconColor: 'text-sky-500' },
    { id: 'character_squad', label: 'Recruiter', sub: '4 Avatars Unlocked', icon: UserIcon, condition: user.unlockedCharacters?.length >= 4, color: 'from-orange-500/20 to-orange-500/5', iconColor: 'text-orange-500' },
    { id: 'code_breaker', label: 'The Glitch', sub: 'Secret Module Found', icon: Binary, condition: user.unlockedThemes?.some(t => ['rainbow', 'hologram', 'ironman'].includes(t)), color: 'from-cyan-400/30 to-cyan-400/5', iconColor: 'text-cyan-400' },
    { id: 'marathon', label: 'Endurance', sub: '100 Games Played', icon: Activity, condition: user.gamesPlayed >= 100, color: 'from-red-500/20 to-red-500/5', iconColor: 'text-red-500' },
  ];

  const visibleThemes = themeOptions.filter(t => !t.secret || user.unlockedThemes.includes(t.id));
  const visibleFrames = frameOptions.filter(f => !f.secret || (user.unlockedFrames && user.unlockedFrames.includes(f.id)));
  const visibleCharacters = characterOptions.filter(c => !c.secret || (user.unlockedCharacters && user.unlockedCharacters.includes(c.id)));
  
  const currentAvatar = characterOptions.find(c => c.id === (user.currentCharacter || 'agent-x')) || characterOptions[0];
  
  // XP Calculation relative to level
  const expForCurrentLevel = (user.level - 1) * 200;
  const relativeExp = user.exp - expForCurrentLevel;
  const progressPercent = Math.min((relativeExp / 200) * 100, 100);

  const SelectionItem = ({ id, label, level, isUnlocked, isActive, onClick, preview, icon: Icon, special }) => html`
    <button 
      key=${id} 
      disabled=${!isUnlocked} 
      onClick=${onClick}
      onMouseEnter=${() => isUnlocked && window.setCursorActive?.(true)}
      onMouseLeave=${() => isUnlocked && window.setCursorActive?.(false)}
      className=${`group relative flex flex-col items-center gap-3 p-5 rounded-3xl border transition-all duration-300 ${
        isActive 
          ? 'bg-slate-800 border-theme shadow-[0_0_25px_var(--primary-glow)] ring-1 ring-theme/30' 
          : 'bg-slate-900/40 border-white/5 hover:border-white/20'
      } ${!isUnlocked ? 'opacity-40 grayscale cursor-not-allowed' : 'active:scale-95'}`}
    >
      <div className=${`w-16 h-16 rounded-2xl flex items-center justify-center relative overflow-hidden ${isActive ? 'bg-theme/10 shadow-[inset_0_0_15px_var(--primary-glow)]' : 'bg-slate-800/50'}`}>
         ${preview ? preview : html`<${Icon} size=${28} className=${isActive ? 'text-theme' : 'text-slate-400'} />`}
         ${special === 'shine' && html`<div className="absolute inset-0 effect-shine opacity-30" />`}
         ${special === 'nebula' && html`<div className="absolute inset-0 bg-gradient-to-br from-purple-500/40 via-blue-500/40 to-pink-500/40 animate-pulse" />`}
      </div>
      <div className="text-center">
         <span className=${`text-[9px] font-orbitron font-bold tracking-tight block truncate w-full max-w-[80px] ${isActive ? 'text-theme' : 'text-slate-400'}`}>${label}</span>
         ${!isUnlocked ? html`
           <div className="mt-1 flex items-center justify-center gap-1">
              <${Lock} size=${8} className="text-rose-500" />
              <span className="text-[7px] font-black text-rose-500 uppercase">LVL ${level}</span>
           </div>
         ` : isActive ? html`
           <div className="mt-1 flex items-center justify-center gap-1">
              <${Check} size=${8} className="text-emerald-500" />
              <span className="text-[7px] font-black text-emerald-500 uppercase">Active</span>
           </div>
         ` : html`
           <div className="mt-1 h-2" /> 
         `}
      </div>
      ${level === 0 && isUnlocked && html`
        <div className="absolute top-1 right-1">
          <${Zap} size=${10} className="text-theme animate-pulse" />
        </div>
      `}
    </button>
  `;

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
              <${currentAvatar.icon} size=${28} />
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
          <button onClick=${onClose} className="group p-3.5 bg-slate-800/50 hover:bg-rose-500/20 text-slate-400 hover:text-rose-500 rounded-2xl transition-all border border-white/5 active:scale-90">
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
                    <div className="w-32 h-32 bg-theme/5 rounded-full flex items-center justify-center text-theme border border-theme/20 shadow-[inset_0_0_40px_var(--primary-glow)] relative z-10 transition-transform duration-500 group-hover:scale-105">
                      <${currentAvatar.icon} size=${64} />
                    </div>
                    <div className=${`absolute inset-0 -m-4 ${frameOptions.find(f => f.id === (user.currentFrame || 'obsidian'))?.class || 'frame-obsidian'} pointer-events-none z-20`} />
                    <div className="absolute -bottom-1 -right-1 bg-theme text-slate-950 text-xs font-black px-4 py-2 rounded-2xl border-4 border-slate-900 shadow-theme z-30">
                      LVL ${user.level}
                    </div>
                  </div>
                  <div className="flex-1 min-w-0 w-full text-center md:text-left space-y-4">
                    <div className="min-h-[80px] flex items-center justify-center md:justify-start">
                      ${isEditing ? html`
                        <div className="flex items-center gap-4 animate-in fade-in zoom-in-95 h-20 w-full">
                          <input 
                            autoFocus 
                            type="text" 
                            value=${newUsername} 
                            onChange=${(e) => setNewUsername(e.target.value)} 
                            onKeyDown=${handleKeyDown}
                            className="flex-1 bg-slate-800/80 border-2 border-theme rounded-2xl px-6 py-4 text-white font-orbitron text-xl focus:outline-none shadow-[0_0_40px_var(--primary-glow)]" 
                          />
                          <button onClick=${handleSave} className="p-4 bg-theme text-slate-950 rounded-2xl shadow-theme"><${Check} size=${28} strokeWidth=${3} /></button>
                        </div>
                      ` : html`
                        <div className="flex items-center justify-center md:justify-between group/edit w-full h-20">
                          <div className="min-w-0">
                            <h3 className="font-orbitron font-black text-5xl text-white truncate italic tracking-tighter uppercase leading-none drop-shadow-theme">${user.username}</h3>
                            <div className="flex items-center justify-center md:justify-start gap-5 mt-4">
                               <div className="flex items-center gap-2 text-theme">
                                 <${Activity} size=${16} className="animate-pulse" />
                                 <span className="text-[11px] font-black uppercase tracking-[0.3em]">${currentAvatar.label} Active</span>
                               </div>
                               <div className="w-1.5 h-1.5 rounded-full bg-slate-800" />
                               <span className="text-[11px] font-black text-slate-500 uppercase tracking-[0.3em]">Verified Operative</span>
                            </div>
                          </div>
                          <button onClick=${() => setIsEditing(true)} className="ml-8 p-3.5 bg-slate-800/50 text-slate-500 hover:text-theme rounded-2xl opacity-0 group-hover/edit:opacity-100 transition-all border border-white/5"><${Edit2} size=${20} /></button>
                        </div>
                      `}
                    </div>
                  </div>
                </div>
                <div className="mt-12 space-y-5">
                  <div className="flex justify-between items-center px-2">
                    <span className="text-sm font-orbitron font-bold text-slate-500 uppercase tracking-[0.3em]">EXP BAR</span>
                    <div className="flex items-center gap-3 font-black">
                       <span className="text-white text-base font-orbitron">${user.level}</span>
                       <span className="text-theme opacity-50">→</span>
                       <span className="text-slate-500 text-base font-orbitron">${user.level + 1}</span>
                    </div>
                  </div>
                  <div className="relative h-5 bg-black/60 rounded-full border border-white/10 p-1 flex gap-1 shadow-inner overflow-hidden">
                    ${[...Array(20)].map((_, i) => html`
                      <div 
                        key=${i}
                        className=${`h-full flex-1 rounded-[2px] transition-all duration-1000 ${
                          (i + 1) * 5 <= progressPercent 
                            ? 'bg-theme shadow-[0_0_15px_var(--primary-glow)]' 
                            : 'bg-slate-900/40'
                        }`}
                      />
                    `)}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent animate-[shimmer_3s_infinite] pointer-events-none" />
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-12 xl:col-span-4 grid grid-cols-1 gap-6">
              <div className="p-8 bg-slate-800/30 border border-white/5 border-l-amber-500 rounded-[2.5rem] flex flex-col justify-center gap-5 group hover:bg-slate-800/40 transition-all shadow-xl">
                  <div className="p-4 bg-amber-500/10 rounded-2xl text-amber-500 self-start"><${Trophy} size=${32} /></div>
                  <div className="text-4xl font-orbitron font-black text-white italic tracking-tighter leading-none">${user.exp}</div>
              </div>
              <div className="p-8 bg-slate-800/30 border border-white/5 border-l-theme rounded-[2.5rem] flex flex-col justify-center gap-5 group hover:bg-slate-800/40 transition-all shadow-xl">
                  <div className="p-4 bg-theme/10 rounded-2xl text-theme self-start"><${Gamepad2} size=${32} /></div>
                  <div className="text-4xl font-orbitron font-black text-white italic tracking-tighter leading-none">${user.gamesPlayed || 0}</div>
              </div>
            </div>
          </div>

          <!-- Section: Avatars -->
          <section className="space-y-8">
            <div className="flex items-center gap-8 px-2"><div className="flex items-center gap-4 text-theme"><${Eye} size=${24} /><p className="text-xs font-black uppercase tracking-[0.5em]">Avatars</p></div><div className="h-px flex-1 bg-gradient-to-r from-white/10 to-transparent" /></div>
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 xl:grid-cols-7 gap-4">
              ${visibleCharacters.map((c) => html`<${SelectionItem} id=${c.id} label=${c.label} level=${c.level} isUnlocked=${user.level >= c.level || (user.unlockedCharacters && user.unlockedCharacters.includes(c.id))} isActive=${(user.currentCharacter || 'agent-x') === c.id} onClick=${() => onSetCharacter(c.id)} icon=${c.icon} />`)}
            </div>
          </section>

          <!-- Section: Frames -->
          <section className="space-y-8">
            <div className="flex items-center gap-8 px-2"><div className="flex items-center gap-4 text-theme"><${Layout} size=${24} /><p className="text-xs font-black uppercase tracking-[0.5em]">Neural Frames</p></div><div className="h-px flex-1 bg-gradient-to-r from-white/10 to-transparent" /></div>
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 xl:grid-cols-7 gap-4">
              ${visibleFrames.map((f) => html`<${SelectionItem} id=${f.id} label=${f.label} level=${f.level} isUnlocked=${user.level >= f.level || (user.unlockedFrames && user.unlockedFrames.includes(f.id))} isActive=${(user.currentFrame || 'obsidian') === f.id} onClick=${() => onSetFrame(f.id)} preview=${html`<div className="relative w-10 h-10"><div className="absolute inset-0 bg-slate-700/50 rounded-full flex items-center justify-center text-slate-500"><${UserIcon} size=${16} /></div><div className=${`absolute inset-0 -m-1.5 ${f.class} pointer-events-none opacity-100 scale-90`} /></div>`} />`)}
            </div>
          </section>

          <!-- Section: Themes -->
          <section className="space-y-8">
            <div className="flex items-center gap-8 px-2"><div className="flex items-center gap-4 text-theme"><${Palette} size=${24} /><p className="text-xs font-black uppercase tracking-[0.5em]">Visual Modules</p></div><div className="h-px flex-1 bg-gradient-to-r from-white/10 to-transparent" /></div>
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 xl:grid-cols-7 gap-4">
              ${visibleThemes.map((t) => html`<${SelectionItem} id=${t.id} label=${t.label} level=${t.level} isUnlocked=${user.level >= t.level || user.unlockedThemes.includes(t.id)} isActive=${user.currentTheme === t.id} onClick=${() => onSetTheme(t.id)} preview=${html`<div className="w-10 h-10 rounded-lg shadow-inner flex items-center justify-center text-white/50" style=${{ background: t.color }}><${t.icon} size=${16} /></div>`} special=${t.special} icon=${t.icon} />`)}
            </div>
          </section>

          <!-- Section: Badges -->
          <section className="space-y-8">
            <div className="flex items-center justify-between px-2">
               <div className="flex items-center gap-4 text-theme"><${Award} size=${24} /><p className="text-xs font-black uppercase tracking-[0.5em]">System Badges</p></div>
               <div className="text-[10px] font-black uppercase tracking-widest text-slate-500">Click unlocked badge to showcase on home</div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
              ${badgesList.map(badge => {
                const isFeatured = user.featuredBadgeId === badge.id;
                return html`
                  <button 
                    key=${badge.id} 
                    disabled=${!badge.condition}
                    onClick=${() => onSetFeaturedBadge(badge.id)}
                    className=${`relative p-8 rounded-[2.5rem] border flex flex-col items-center text-center gap-5 transition-all duration-500 group overflow-hidden ${
                      badge.condition 
                        ? `bg-gradient-to-br ${badge.color} border-white/10 shadow-[0_10px_30px_rgba(0,0,0,0.3)] hover:scale-105 ${isFeatured ? 'ring-4 ring-theme shadow-[0_0_40px_var(--primary-glow)]' : ''}` 
                        : 'bg-black/20 border-white/5 opacity-25 grayscale cursor-not-allowed'
                    }`}
                  >
                    <div className=${`p-5 rounded-full bg-black/40 ${badge.condition ? badge.iconColor : 'text-slate-600'} group-hover:rotate-12 transition-transform`}>
                      <${badge.icon} size=${40} />
                    </div>
                    <div className="space-y-1">
                      <p className=${`text-[11px] font-black uppercase tracking-[0.1em] leading-none ${badge.condition ? 'text-white' : 'text-slate-600'}`}>${badge.label}</p>
                      <p className="text-[8px] font-bold text-slate-500 uppercase tracking-tight opacity-70">${badge.sub}</p>
                    </div>
                    ${badge.condition && html`<div className="absolute top-4 right-4 bg-emerald-500/20 p-1 rounded-full border border-emerald-500/20"><${Check} size=${12} className="text-emerald-500" /></div>`}
                    ${isFeatured && html`
                      <div className="absolute bottom-2 inset-x-0 flex justify-center">
                        <span className="text-[8px] font-black text-theme uppercase tracking-widest bg-slate-900/80 px-2 py-0.5 rounded-full">Equipped</span>
                      </div>
                    `}
                  </button>
                `;
              })}
            </div>
          </section>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6">
            <div className="p-6 bg-slate-950 border border-white/5 rounded-3xl flex items-center gap-4 opacity-50"><${Cpu} size=${18} className="text-theme" /><p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Kernel: 4.2.1-Elite</p></div>
            <div className="p-6 bg-slate-950 border border-white/5 rounded-3xl flex items-center gap-4 opacity-50"><${Flame} size=${18} className="text-theme" /><p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Latency: 0.02ms</p></div>
            <div className="p-6 bg-slate-950 border border-white/5 rounded-3xl flex items-center gap-4 opacity-50"><${ShieldCheck} size=${18} className="text-theme" /><p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Profile: Validated</p></div>
          </div>
        </div>
      </div>
    </div>
  `;
};

export default ProfileModal;