import React, { useState } from 'react';
import htm from 'htm';
import { X, Trophy, Gamepad2, Shield, User as UserIcon, Palette, Lock, Check, Edit2 } from 'lucide-react';

const html = htm.bind(React.createElement);

const ProfileModal = ({ user, onUpdateUser, onSetTheme, onClose }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newName, setNewName] = useState(user.username);

  const themeOptions = [
    { id: 'cyan', label: 'Neon', level: 1, color: '#22d3ee' },
    { id: 'rose', label: 'Rose', level: 5, color: '#fb7185' },
    { id: 'emerald', label: 'Forest', level: 10, color: '#34d399' },
    { id: 'violet', label: 'Cyber', level: 15, color: '#a78bfa' },
    { id: 'cobalt', label: 'Ocean', level: 20, color: '#3b82f6' },
    { id: 'crimson', label: 'Fury', level: 40, color: '#dc2626' },
    { id: 'gold', label: 'Elite', level: 75, color: '#facc15' },
    { id: 'galaxy', label: 'Void', level: 100, color: '#c084fc' },
  ];

  const handleSaveName = () => {
    onUpdateUser({ username: newName });
    setIsEditing(false);
  };

  return html`
    <div class="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div class="absolute inset-0 bg-slate-950/90 backdrop-blur-xl animate-in fade-in" onClick=${onClose} />
      <div class="relative w-full max-w-2xl bg-slate-900 border border-white/10 rounded-[3rem] overflow-hidden shadow-2xl animate-in zoom-in-95 duration-300">
        
        <div class="flex items-center justify-between px-10 py-8 border-b border-white/5 bg-slate-950/50">
          <div class="flex items-center gap-4">
            <div class="p-3 bg-theme/10 rounded-2xl text-theme border border-theme/20">
              <${Shield} size=${24} />
            </div>
            <h2 class="font-orbitron font-black text-2xl uppercase tracking-tighter text-white">Identity <span class="text-theme">Intel</span></h2>
          </div>
          <button onClick=${onClose} class="p-3 bg-slate-800 hover:bg-rose-500 text-slate-400 hover:text-white rounded-2xl transition-all shadow-xl">
            <${X} size=${20} />
          </button>
        </div>
        
        <div class="p-10 space-y-12 max-h-[70vh] overflow-y-auto">
          <div class="flex items-center gap-8">
            <div class="w-24 h-24 rounded-full bg-slate-800 border-4 border-theme shadow-theme flex items-center justify-center text-slate-600 font-black text-4xl font-orbitron shrink-0">9X</div>
            <div class="flex-1 min-w-0">
              ${isEditing ? html`
                <div class="flex items-center gap-2">
                  <input type="text" value=${newName} onChange=${(e) => setNewName(e.target.value)} class="bg-black/40 border-2 border-theme rounded-xl px-4 py-2 font-orbitron text-white focus:outline-none w-full" />
                  <button onClick=${handleSaveName} class="p-3 bg-theme text-slate-950 rounded-xl"><${Check} size=${20} /></button>
                </div>
              ` : html`
                <div class="flex items-center gap-4 group">
                  <h3 class="font-orbitron font-black text-3xl text-white uppercase tracking-tighter truncate">${user.username}</h3>
                  <button onClick=${() => setIsEditing(true)} class="p-2 text-slate-500 hover:text-theme transition-colors"><${Edit2} size={18} /></button>
                </div>
              `}
              <p class="text-slate-500 text-sm font-black uppercase tracking-widest mt-1">LVL ${user.level} Status: Active</p>
            </div>
          </div>

          <div class="grid grid-cols-2 gap-6">
            <div class="p-8 bg-slate-800/40 rounded-[2.5rem] border border-white/5 text-center group hover:border-theme/40 transition-all">
              <${Trophy} class="text-amber-500 mx-auto mb-2" size=${28} />
              <div class="text-3xl font-orbitron font-black text-white">${user.exp}</div>
              <div class="text-[10px] text-slate-500 uppercase font-black tracking-widest">Accumulated XP</div>
            </div>
            <div class="p-8 bg-slate-800/40 rounded-[2.5rem] border border-white/5 text-center group hover:border-theme/40 transition-all">
              <${Gamepad2} class="text-theme mx-auto mb-2" size=${28} />
              <div class="text-3xl font-orbitron font-black text-white">${user.gamesPlayed}</div>
              <div class="text-[10px] text-slate-500 uppercase font-black tracking-widest">Deployments</div>
            </div>
          </div>

          <div class="space-y-6">
            <div class="flex items-center justify-between">
              <p class="text-[10px] font-black uppercase tracking-[0.4em] text-slate-500">Appearance Modules</p>
            </div>
            <div class="grid grid-cols-4 gap-4">
              ${themeOptions.map((t) => {
                const isUnlocked = user.level >= t.level;
                const isActive = user.currentTheme === t.id;
                return html`
                  <button key=${t.id} disabled=${!isUnlocked} onClick=${() => onSetTheme(t.id)} 
                    class=${`group relative aspect-square rounded-[2rem] border-2 transition-all flex flex-col items-center justify-center overflow-hidden 
                    ${isActive ? 'border-white scale-105 shadow-theme' : 'border-slate-800 bg-slate-900/40 hover:border-theme/40'} 
                    ${!isUnlocked ? 'opacity-40 grayscale cursor-not-allowed' : 'active:scale-95'}`}>
                    
                    <div class="absolute inset-0 w-full h-full opacity-60 group-hover:opacity-100" style=${{ background: t.color }}></div>
                    
                    <div class="relative z-10 text-center">
                       ${!isUnlocked ? html`
                         <div class="flex flex-col items-center gap-1">
                            <${Lock} size=${16} class="text-white" />
                            <span class="text-[8px] font-black text-white bg-black/40 px-2 py-0.5 rounded-full">LVL ${t.level}</span>
                         </div>
                       ` : html`
                         <span class="text-[10px] font-black text-white uppercase tracking-tighter leading-tight drop-shadow-md">${t.label}</span>
                       `}
                    </div>
                  </button>
                `;
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
};

export default ProfileModal;