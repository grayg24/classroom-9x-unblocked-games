import React from 'react';
import htm from 'htm';
import { CATEGORIES, getIcon } from '../constants.js';
import { Home, Library, Heart, Settings as SettingsIcon, User as UserIcon } from 'lucide-react';
import { AppRoute } from '../types.js';

const html = htm.bind(React.createElement);

const Sidebar = ({ currentView, selectedCategoryId, user, onViewChange, onProfileClick }) => {
  const NavItem = ({ onClick, icon: Icon, label, active }) => html`
    <button onClick=${onClick} class=${`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group ${active ? 'bg-[var(--primary)]/10 text-theme' : 'text-slate-400 hover:bg-slate-900 hover:text-white'}`}>
      <${Icon} class=${`w-5 h-5 ${active ? 'text-theme' : 'group-hover:text-theme'}`} />
      <span class="font-bold text-sm tracking-tight">${label}</span>
      ${active && html`<div class="ml-auto w-1.5 h-1.5 rounded-full bg-theme shadow-theme"></div>`}
    </button>
  `;

  return html`
    <div class="p-4 flex flex-col gap-8 h-full">
      <div class="flex flex-col gap-1">
        <p class="px-4 text-[10px] font-black text-slate-600 uppercase tracking-[0.3em] mb-4">Discovery</p>
        <${NavItem} onClick=${() => onViewChange(AppRoute.HOME)} icon=${Home} label="Home Page" active=${currentView === AppRoute.HOME} />
        <${NavItem} onClick=${() => onViewChange(AppRoute.LIBRARY)} icon=${Library} label="Database" active=${currentView === AppRoute.LIBRARY} />
        <${NavItem} onClick=${() => onViewChange(AppRoute.FAVORITES)} icon=${Heart} label="Watchlist" active=${currentView === AppRoute.FAVORITES} />
      </div>

      <div class="flex flex-col gap-1">
        <p class="px-4 text-[10px] font-black text-slate-600 uppercase tracking-[0.3em] mb-4">Categories</p>
        ${CATEGORIES.map(cat => {
          const isActive = currentView === AppRoute.CATEGORY && selectedCategoryId === cat.id;
          return html`
            <button key=${cat.id} onClick=${() => onViewChange(AppRoute.CATEGORY, cat.id)} 
              class=${`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group ${isActive ? 'bg-[var(--primary)]/10 text-theme' : 'text-slate-400 hover:bg-slate-900 hover:text-white'}`}>
              <span class=${`shrink-0 transition-colors ${isActive ? 'text-theme' : 'group-hover:text-theme'}`}>
                ${getIcon(cat.icon, 18)}
              </span>
              <span class="font-bold text-sm tracking-tight">${cat.name}</span>
            </button>
          `;
        })}
      </div>

      <div class="mt-auto space-y-4">
        <${NavItem} onClick=${() => onViewChange(AppRoute.SETTINGS)} icon=${SettingsIcon} label="Settings" active=${currentView === AppRoute.SETTINGS} />
        
        <div class="px-4 pb-4">
          <button onClick=${onProfileClick} class="w-full text-left p-5 bg-slate-900/80 rounded-3xl border border-white/5 shadow-2xl relative overflow-hidden group hover:border-theme/40 hover:-translate-y-1 transition-all">
            <div class="flex items-center justify-between mb-3">
              <span class="text-[10px] font-black text-slate-500 uppercase tracking-widest flex items-center gap-2">
                <${UserIcon} size=${12} class="text-theme" />
                Profile
              </span>
              <span class="text-[10px] font-black text-theme uppercase">LVL ${user.level}</span>
            </div>
            <div class="w-full bg-black h-2 rounded-full overflow-hidden border border-white/5">
              <div class="bg-theme h-full shadow-theme transition-all duration-1000" style=${{width: `${(user.exp / (user.level * 200)) * 100}%`}}></div>
            </div>
          </button>
        </div>
      </div>
    </div>
  `;
};

export default Sidebar;