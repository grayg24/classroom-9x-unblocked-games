import React from 'react';
import htm from 'htm';
import { CATEGORIES, getIcon } from '../constants.js';
import { Home, Library, Heart, Settings as SettingsIcon, User as UserIcon, Zap as ZapIcon, Shield, Ghost, Cat, Crown, ZapOff } from 'lucide-react';
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

  // Profile Frame Mapping (Sidebar Mini)
  const frameClassMap = {
    'obsidian': 'frame-obsidian',
    'default': 'frame-default',
    'neon': 'frame-neon',
    'solar': 'frame-solar',
    'interstellar': 'frame-interstellar',
    'glitch': 'frame-glitch'
  };

  const activeFrameClass = frameClassMap[user.currentFrame || 'obsidian'] || 'frame-obsidian';

  // Avatar Icon Mapping
  const avatarIcons = {
    'agent-x': UserIcon,
    'viper': ZapIcon,
    'ghost': Ghost,
    'cyber-neko': Cat,
    'overlord': Crown,
    'stark': Shield,
    'glitch': ZapOff
  };

  const CurrentAvatarIcon = avatarIcons[user.currentCharacter || 'agent-x'] || UserIcon;

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
            
            <!-- Sidebar Mini Profile Frame Indication -->
            <div className=${`absolute inset-0 -m-1 border border-white/5 opacity-10 ${activeFrameClass} pointer-events-none group-hover:opacity-30 transition-opacity`} />
            
            <div className="flex items-center justify-between mb-3 relative z-10">
              <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest flex items-center gap-2">
                <${CurrentAvatarIcon} size=${12} className="text-theme" />
                Profile
              </span>
              <span className="text-[10px] font-black text-theme uppercase">LVL ${user.level}</span>
            </div>
            <div className="space-y-2 relative z-10">
              <div className="flex justify-between text-[10px] font-bold text-slate-400 uppercase">
                  <span>EXP:</span>
                  <span>${user.exp} / ${user.level * 200}</span>
              </div>
              <div className="w-full bg-black h-2 rounded-full overflow-hidden border border-white/5">
                  <div 
                    className="bg-theme h-full transition-all duration-1000 shadow-theme" 
                    style=${{width: `${(user.exp / (user.level * 200)) * 100}%`}}
                  ></div>
              </div>
            </div>
          </button>
        </div>
      </div>
    </div>
  `;
};

export default Sidebar;