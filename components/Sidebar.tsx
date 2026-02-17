
import React from 'react';
import { CATEGORIES, getIcon } from '../constants';
import { Home, Palette, Lock } from 'lucide-react';
import { AppRoute, User } from '../types';

interface SidebarProps {
  currentRoute: AppRoute;
  currentParam: string | null;
  user: User | null;
  onSetTheme: (theme: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ currentRoute, currentParam, user, onSetTheme }) => {
  const NavItem = ({ href, icon: Icon, label, active }: { href: string, icon: any, label: string, active: boolean }) => (
    <a 
      href={href}
      className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group ${
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
    </a>
  );

  const themeOptions = [
    { id: 'cyan', label: 'Default', level: 1 },
    { id: 'rose', label: 'Neon Rose', level: 2 },
    { id: 'emerald', label: 'Emerald', level: 4 },
    { id: 'amber', label: 'Amber', level: 6 },
    { id: 'violet', label: 'Ethereal', level: 10 },
  ];

  return (
    <div className="p-4 flex flex-col gap-8 h-full">
      <div className="flex flex-col gap-1">
        <p className="px-4 text-[10px] font-black text-slate-600 uppercase tracking-[0.3em] mb-4">Tactical Hub</p>
        <NavItem href="#/" icon={Home} label="Home Page" active={currentRoute === AppRoute.HOME} />
      </div>

      <div className="flex flex-col gap-1">
        <p className="px-4 text-[10px] font-black text-slate-600 uppercase tracking-[0.3em] mb-4">Categories</p>
        {CATEGORIES.map(cat => (
          <a 
            key={cat.id}
            href={`#/category/${cat.id}`}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group ${
              currentRoute === AppRoute.CATEGORY && currentParam === cat.id
                ? 'bg-[var(--primary)]/10 text-theme' 
                : 'text-slate-400 hover:bg-slate-900 hover:text-white'
            }`}
            onMouseEnter={() => (window as any).setCursorActive(true)}
            onMouseLeave={() => (window as any).setCursorActive(false)}
          >
            <span className={currentRoute === AppRoute.CATEGORY && currentParam === cat.id ? 'text-theme' : 'group-hover:text-theme'}>
              {getIcon(cat.icon, 18)}
            </span>
            <span className="font-bold text-sm tracking-tight">{cat.name}</span>
          </a>
        ))}
      </div>

      {user && (
        <div className="flex flex-col gap-1">
          <p className="px-4 text-[10px] font-black text-slate-600 uppercase tracking-[0.3em] mb-4 flex items-center gap-2">
            <Palette size={12} /> Customization
          </p>
          <div className="grid grid-cols-5 gap-2 px-4">
            {themeOptions.map((t) => {
              const isLocked = user.level < t.level;
              return (
                <button 
                  key={t.id}
                  disabled={isLocked}
                  onClick={() => onSetTheme(t.id)}
                  title={isLocked ? `Unlocks at LVL ${t.level}` : t.label}
                  className={`aspect-square rounded-lg border-2 transition-all flex items-center justify-center overflow-hidden ${
                    user.currentTheme === t.id ? 'border-theme scale-110 shadow-theme' : 'border-slate-800'
                  } ${isLocked ? 'opacity-30' : 'hover:scale-110'}`}
                >
                   {isLocked ? <Lock size={10} /> : <div className={`w-full h-full theme-${t.id} bg-slate-400`} style={{background: `var(--theme-${t.id}-bg)`}}></div>}
                </button>
              );
            })}
          </div>
        </div>
      )}

      <div className="mt-auto px-4 pb-4">
        {user ? (
          <div className="p-5 bg-slate-900/80 rounded-3xl border border-white/5 shadow-2xl relative overflow-hidden group">
            <div className="absolute inset-0 bg-theme/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div className="flex items-center justify-between mb-3">
               <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Protocol Stats</span>
               <span className="text-[10px] font-black text-theme uppercase">LVL {user.level}</span>
            </div>
            <div className="space-y-2">
               <div className="flex justify-between text-[10px] font-bold text-slate-400 uppercase">
                  <span>Progress</span>
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
        ) : (
          <div className="p-5 bg-slate-900 border border-slate-800 border-dashed rounded-3xl text-center">
             <p className="text-[10px] font-bold text-slate-600 uppercase tracking-widest">Connect to Save Progress</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
