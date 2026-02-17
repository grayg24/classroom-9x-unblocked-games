
import React from 'react';
import { CATEGORIES, getIcon } from '../constants';
import { Home, Heart, Compass, TrendingUp, History } from 'lucide-react';
import { AppRoute } from '../types';

interface SidebarProps {
  currentRoute: AppRoute;
  currentParam: string | null;
}

const Sidebar: React.FC<SidebarProps> = ({ currentRoute, currentParam }) => {
  const NavItem = ({ href, icon: Icon, label, active }: { href: string, icon: any, label: string, active: boolean }) => (
    <a 
      href={href}
      className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group ${
        active 
          ? 'bg-cyan-500/10 text-cyan-400' 
          : 'text-slate-400 hover:bg-slate-900 hover:text-white'
      }`}
    >
      <Icon className={`w-5 h-5 ${active ? 'text-cyan-400' : 'group-hover:text-cyan-400'}`} />
      <span className="font-medium">{label}</span>
      {active && <div className="ml-auto w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.8)]"></div>}
    </a>
  );

  return (
    <div className="p-4 flex flex-col gap-8">
      {/* Main Nav */}
      <div className="flex flex-col gap-1">
        <p className="px-4 text-[10px] font-bold text-slate-600 uppercase tracking-widest mb-2">Navigation</p>
        <NavItem 
          href="#/" 
          icon={Home} 
          label="Discover" 
          active={currentRoute === AppRoute.HOME} 
        />
        <NavItem 
          href="#/favorites" 
          icon={Heart} 
          label="My Collection" 
          active={currentRoute === AppRoute.FAVORITES} 
        />
        <NavItem 
          href="#" 
          icon={TrendingUp} 
          label="Trending" 
          active={false} 
        />
      </div>

      {/* Categories */}
      <div className="flex flex-col gap-1">
        <p className="px-4 text-[10px] font-bold text-slate-600 uppercase tracking-widest mb-2">Categories</p>
        {CATEGORIES.map(cat => (
          <a 
            key={cat.id}
            href={`#/category/${cat.id}`}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group ${
              currentRoute === AppRoute.CATEGORY && currentParam === cat.id
                ? 'bg-cyan-500/10 text-cyan-400' 
                : 'text-slate-400 hover:bg-slate-900 hover:text-white'
            }`}
          >
            <span className={currentRoute === AppRoute.CATEGORY && currentParam === cat.id ? 'text-cyan-400' : 'group-hover:text-cyan-400'}>
              {getIcon(cat.icon, 20)}
            </span>
            <span className="font-medium">{cat.name}</span>
            {currentRoute === AppRoute.CATEGORY && currentParam === cat.id && (
              <div className="ml-auto w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.8)]"></div>
            )}
          </a>
        ))}
      </div>

      {/* Recent Activity */}
      <div className="flex flex-col gap-1 mt-auto">
        <p className="px-4 text-[10px] font-bold text-slate-600 uppercase tracking-widest mb-2">Stats</p>
        <div className="px-4 py-4 bg-slate-900/50 rounded-2xl border border-slate-800">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-slate-500">Games Played</span>
            <span className="text-xs font-bold text-white">42</span>
          </div>
          <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
            <div className="bg-cyan-500 h-full w-[65%]" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
