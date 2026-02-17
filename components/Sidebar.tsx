
import React from 'react';
import { CATEGORIES, getIcon } from '../constants';
import { Home, Palette, Lock, Library, Heart } from 'lucide-react';
import { AppRoute, User } from '../types';

interface SidebarProps {
  currentView: AppRoute;
  user: User;
  onSetTheme: (theme: string) => void;
  onViewChange: (view: AppRoute, param?: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ currentView, user, onSetTheme, onViewChange }) => {
  const NavItem = ({ onClick, icon: Icon, label, active }: { onClick: () => void, icon: any, label: string, active: boolean }) => (
    <button 
      onClick={onClick}
      className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group ${
        active 
          ? 'bg-[var(--primary)]/10 text-theme' 
          : 'text-slate-400 hover:bg-slate-900 hover:text-white'
      }`}
      onMouseEnter={() => (window as any).setCursorActive(true)}
      onMouseLeave={() => (window as any).setCursorActive(false)}
    >
      <Icon className={`w-5 h-5 ${active ? 'text-theme' : 'group-hover:text-theme'}`} />
      <span className="font-bold text-sm tracking-tight">{label}</span>
      {active && <div className="ml-auto w-1.5 h-1.5 rounded-full bg-theme shadow-theme"></div>}
    </button>
  );

  const themeOptions = [
    { id: 'cyan', label: 'Default', level: 1, color: '#22d3ee' },
    { id: 'rose', label: 'Neon Rose', level: 5, color: '#fb7185' },
    { id: 'emerald', label: 'Emerald', level: 10, color: '#34d399' },
    { id: 'amber', label: 'Amber', level: 15, color: '#fbbf24' },
    { id: 'violet', label: 'Ethereal', level: 20, color: '#a78bfa' },
  ];

  return (
    <div className="p-4 flex flex-col gap-8 h-full">
      <div className="flex flex-col gap-1">
        <p className="px-4 text-[10px] font-black text-slate-600 uppercase tracking-[0.3em] mb-4">Tactical Hub</p>
        <NavItem onClick={() => onViewChange(AppRoute.HOME)} icon={Home} label="Home Page" active={currentView === AppRoute.HOME} />
        <NavItem onClick={() => onViewChange(AppRoute.SETTINGS)} icon={Library} label="Library" active={currentView === AppRoute.SETTINGS} />
        <NavItem onClick={() => onViewChange(AppRoute.FAVORITES)} icon={Heart} label="Favorites" active={currentView === AppRoute.FAVORITES} />
      </div>

      <div className="flex flex-col gap-1">
        <p className="px-4 text-[10px] font-black text-slate-600 uppercase tracking-[0.3em] mb-4">Categories</p>
        {CATEGORIES.map(cat => (
          <button 
            key={cat.id}
            onClick={() => onViewChange(AppRoute.CATEGORY, cat.id)}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group ${
              currentView === AppRoute.CATEGORY && (cat.id as any) === (cat.id)
                ? 'bg-[var(--primary)]/10 text-theme' 
                : 'text-slate-400 hover:bg-slate-900 hover:text-white'
            }`}
            onMouseEnter={() => (window as any).setCursorActive(true)}
            onMouseLeave={() => (window as any).setCursorActive(false)}
          >
            <span className="group-hover:text-theme shrink-0">
              {getIcon(cat.icon, 18)}
            </span>
            <span className="font-bold text-sm tracking-tight">{cat.name}</span>
          </button>
        ))}
      </div>

      <div className="flex flex-col gap-1">
        <p className="px-4 text-[10px] font-black text-slate-600 uppercase tracking-[0.3em] mb-4 flex items-center gap-2">
          <Palette size={12} /> Customization
        </p>
        <div className="grid grid-cols-5 gap-2 px-4">
          {themeOptions.map((t) => {
            const isLocked = user.level < t.level;
            const isActive = user.currentTheme === t.id;
            return (
              <button 
                key={t.id}
                disabled={isLocked}
                onClick={() => onSetTheme(t.id)}
                title={isLocked ? `Unlocks at LVL ${t.level}` : t.label}
                className={`aspect-square rounded-lg border-2 transition-all flex items-center justify-center overflow-hidden ${
                  isActive ? 'border-white scale-110' : 'border-slate-800'
                } ${isLocked ? 'bg-slate-900/50 cursor-not-allowed border-slate-900' : 'hover:scale-110 active:scale-95'}`}
                style={isActive && !isLocked ? { boxShadow: `0 0 15px ${t.color}66` } : {}}
              >
                 {isLocked ? (
                   <div className="flex flex-col items-center justify-center gap-0.5 text-slate-500">
                     <Lock size={10} />
                     <span className="text-[9px] font-black leading-none">{t.level}</span>
                   </div>
                 ) : (
                   <div 
                    className="w-full h-full opacity-90 hover:opacity-100 transition-opacity" 
                    style={{ backgroundColor: t.color }}
                   />
                 )}
              </button>
            );
          })}
        </div>
      </div>

      <div className="mt-auto px-4 pb-4">
        <div className="p-5 bg-slate-900/80 rounded-3xl border border-white/5 shadow-2xl relative overflow-hidden group">
          <div className="absolute inset-0 bg-theme/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
          <div className="flex items-center justify-between mb-3">
             <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Levels</span>
             <span className="text-[10px] font-black text-theme uppercase">LVL {user.level}</span>
          </div>
          <div className="space-y-2">
             <div className="flex justify-between text-[10px] font-bold text-slate-400 uppercase">
                <span>Next Level:</span>
                <span>{user.exp} / {user.level * 200} EXP</span>
             </div>
             <div className="w-full bg-black h-2 rounded-full overflow-hidden border border-white/5">
                <div 
                  className="bg-theme h-full transition-all duration-1000 shadow-theme" 
                  style={{width: `${(user.exp / (user.level * 200)) * 100}%`}}
                ></div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
