import React from 'react';
import htm from 'htm';
import Navbar from './Navbar.js';
import Sidebar from './Sidebar.js';
import { Home, Library, Heart, User } from 'lucide-react';

const html = htm.bind(React.createElement);

const Layout = ({ children, onSearch, onViewChange, onProfileClick, user, currentView }) => {
  return html`
    <div class="min-h-screen flex flex-col bg-slate-950">
      <${Navbar} user=${user} onSearch=${onSearch} onLogoClick=${() => onViewChange('home')} />
      
      <div class="flex flex-1 pt-16">
        <!-- Sidebar for Desktop -->
        <aside class="hidden lg:block w-72 fixed h-[calc(100vh-64px)] border-r border-slate-900 bg-slate-950/40 backdrop-blur-md z-10">
          <${Sidebar} user=${user} onViewChange=${onViewChange} onProfileClick=${onProfileClick} currentView=${currentView} />
        </aside>

        <!-- Main Content -->
        <main class="flex-1 lg:ml-72 p-4 md:p-8 pb-24 lg:pb-8">
          <div class="max-w-7xl mx-auto">${children}</div>
        </main>
      </div>

      <!-- Mobile Bottom Nav -->
      <div class="lg:hidden fixed bottom-0 left-0 right-0 h-16 bg-slate-950/90 backdrop-blur-xl border-t border-slate-900 z-50 flex items-center justify-around px-4">
        <button onClick=${() => onViewChange('home')} class=${`flex flex-col items-center gap-1 ${currentView === 'home' ? 'text-theme' : 'text-slate-500'}`}>
          <${Home} size=${20} />
          <span class="text-[8px] font-black uppercase">Home</span>
        </button>
        <button onClick=${() => onViewChange('library')} class=${`flex flex-col items-center gap-1 ${currentView === 'library' ? 'text-theme' : 'text-slate-500'}`}>
          <${Library} size=${20} />
          <span class="text-[8px] font-black uppercase">Games</span>
        </button>
        <button onClick=${() => onViewChange('favorites')} class=${`flex flex-col items-center gap-1 ${currentView === 'favorites' ? 'text-theme' : 'text-slate-500'}`}>
          <${Heart} size=${20} />
          <span class="text-[8px] font-black uppercase">Favs</span>
        </button>
        <button onClick=${onProfileClick} class="flex flex-col items-center gap-1 text-slate-500">
          <${User} size=${20} />
          <span class="text-[8px] font-black uppercase">Profile</span>
        </button>
      </div>
    </div>
  `;
};

export default Layout;