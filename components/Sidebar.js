import React from 'react';
import htm from 'htm';
import { CATEGORIES, getIcon } from '../constants.js';
import { Home, Library, Heart, Settings as SettingsIcon, User as UserIcon, Zap as ZapIcon, Shield, Ghost, Cat, Crown, ZapOff, Bot } from 'lucide-react';
import { AppRoute } from '../types.js';

const html = htm.bind(React.createElement);

const Sidebar = ({ currentView, selectedCategoryId, user, onViewChange, onProfileClick }) => {
  const NavItem = ({ onClick, icon: Icon, label, active }) => html`
    <button 
      onClick=${onClick}
      className=${`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group ${
        active 
          ? 'bg-[var(--primary)]/10 text-theme' 
          : 'text-slate-400 hover:bg-slate-900 hover:text-white'
      }`}
    >
      <${Icon} className=${`w-5 h-5 ${active ? 'text-theme' : 'group-hover:text-theme'}`} />
      <span className="font-bold text-sm tracking-tight">${label}</span>
      ${active && html`<div className="ml-auto w-1.5 h-1.5 rounded-full bg-theme shadow-theme"></div>`}
    </button>
  `;

  const frameClassMap = {
    'obsidian': 'frame-obsidian',
    'default': 'frame-default',
    'neon': 'frame-neon',
    'solar': 'frame-solar',
    'interstellar': 'frame-interstellar',
    'hologram': 'frame-hologram',
    'glitch': 'frame-glitch'
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
  
  // XP resets every 200 points per level in App.js logic
  const expForCurrentLevel = (user.level - 1) * 200;
  const relativeExp = user.exp - expForCurrentLevel;
  const progressPercent = Math.min((relativeExp / 200) * 100, 100);

  return html`
    <div className="p-4 flex flex-col gap-8 h-full">
      <div className="flex flex-col gap-1">
        <p className="px-4 text-[10px] font-black text-slate-600 uppercase tracking-[0.3em] mb-4">Menu</p>
        <${NavItem} onClick=${() => onViewChange(AppRoute.HOME)} icon=${Home} label="Home Page" active=${currentView === AppRoute.HOME} />
        <${NavItem} onClick=${() => onViewChange(AppRoute.LIBRARY)} icon=${Library} label="Library" active=${currentView === AppRoute.LIBRARY} />
        <${NavItem} onClick=${() => onViewChange(AppRoute.FAVORITES)} icon=${Heart} label="Favorites" active=${currentView === AppRoute.FAVORITES} />
      </div>

      <div className="flex flex-col gap-1">
        <p className="px-4 text-[10px] font-black text-slate-600 uppercase tracking-[0.3em] mb-4">Categories</p>
        ${CATEGORIES.map(cat => {
          const isActive = currentView === AppRoute.CATEGORY && selectedCategoryId === cat.id;
          return html`
            <button 
              key=${cat.id}
              onClick=${() => onViewChange(AppRoute.CATEGORY, cat.id)}
              className=${`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group ${
                isActive
                  ? 'bg-[var(--primary)]/10 text-theme' 
                  : 'text-slate-400 hover:bg-slate-900 hover:text-white'
              }`}
            >
              <span className=${`${isActive ? 'text-theme' : 'group-hover:text-theme'} shrink-0 transition-colors`}>
                ${getIcon(cat.icon, 18)}
              </span>
              <span className="font-bold text-sm tracking-tight">${cat.name}</span>
              ${isActive && html`<div className="ml-auto w-1.5 h-1.5 rounded-full bg-theme shadow-theme"></div>`}
            </button>
          `;
        })}
      </div>

      <div className="mt-auto space-y-4">
        <${NavItem} 
          onClick=${() => onViewChange(AppRoute.SETTINGS)} 
          icon=${SettingsIcon} 
          label="Settings" 
          active=${currentView === AppRoute.SETTINGS} 
        />

        <div className="px-4 pb-4">
          <button 
            onClick=${onProfileClick}
            className="w-full text-left p-5 bg-slate-900/80 rounded-3xl border border-white/5 shadow-2xl relative overflow-hidden group hover:border-theme/40 hover:-translate-y-2 hover:shadow-[0_20px_40px_var(--primary-glow)] transition-all active:scale-95 duration-500"
          >
            <div className="absolute inset-0 bg-theme/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            
            <div className="flex items-center gap-4 relative z-10 mb-3">
               <div className="relative shrink-0">
                  <div className="w-10 h-10 rounded-full bg-theme/5 flex items-center justify-center text-theme border border-theme/20 shadow-[inset_0_0_10px_var(--primary-glow)] relative z-10">
                    <${CurrentAvatarIcon} size=${16} />
                  </div>
                  <div className=${`absolute inset-0 -m-1 ${activeFrameClass} pointer-events-none z-20 opacity-40 group-hover:opacity-100 transition-opacity`} />
               </div>
               <div className="flex-1">
                 <div className="flex items-center justify-between mb-0.5">
                    <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Operative</span>
                    <span className="text-[10px] font-black text-theme uppercase">LVL ${user.level}</span>
                 </div>
                 <div className="text-[11px] font-orbitron font-bold text-white uppercase truncate">${user.username}</div>
               </div>
            </div>

            <div className="space-y-2 relative z-10">
              <div className="flex justify-between text-[8px] font-bold text-slate-500 uppercase tracking-wider items-center">
                  <span>EXP BAR</span>
                  <div className="flex items-center gap-1 font-black">
                    <span className="text-white">${user.level}</span>
                    <span className="text-theme opacity-50">→</span>
                    <span className="text-slate-400">${user.level + 1}</span>
                  </div>
              </div>
              <div className="relative h-2 bg-black/60 rounded-full border border-white/5 p-0.5 flex gap-0.5 overflow-hidden">
                ${[...Array(10)].map((_, i) => html`
                  <div 
                    key=${i}
                    className=${`h-full flex-1 rounded-[1px] transition-all duration-700 ${
                      (i + 1) * 10 <= progressPercent 
                        ? 'bg-theme shadow-[0_0_8px_var(--primary-glow)]' 
                        : 'bg-slate-900/40'
                    }`}
                  />
                `)}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent animate-[shimmer_2s_infinite] pointer-events-none" />
              </div>
            </div>
          </button>
        </div>
      </div>
    </div>
  `;
};

export default Sidebar;