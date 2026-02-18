import React from 'react';
import htm from 'htm';
import { Settings as SettingsIcon, MousePointer2, Layers } from 'lucide-react';

const html = htm.bind(React.createElement);

const Settings = ({ user, onUpdateSettings, onSetTheme }) => {
  return html`
    <div class="space-y-12 pb-20">
      <div class="flex items-center gap-6">
        <div class="w-16 h-16 bg-theme/10 rounded-3xl flex items-center justify-center text-theme border border-theme/20"><${SettingsIcon} size=${32} /></div>
        <h1 class="font-orbitron font-black text-4xl uppercase italic text-white">System <span class="text-theme">Settings</span></h1>
      </div>
      <div class="space-y-4 max-w-2xl">
        <div class="p-6 bg-slate-900/40 rounded-[2rem] border border-white/5 flex items-center justify-between">
          <div class="flex items-start gap-5">
            <div class="p-4 rounded-2xl bg-theme/10 text-theme"><${MousePointer2} size=${24} /></div>
            <div>
              <h3 class="font-orbitron font-bold text-white uppercase text-sm">Custom Haptic Cursor</h3>
              <p class="text-xs text-slate-500">Enable high-precision glow cursor.</p>
            </div>
          </div>
          <button onClick=${() => onUpdateSettings({customCursor: !user.settings.customCursor})} class=${`relative w-14 h-8 rounded-full transition-all ${user.settings.customCursor ? 'bg-theme shadow-theme' : 'bg-slate-800'}`}>
            <div class=${`absolute top-1 left-1 w-6 h-6 bg-white rounded-full transition-transform ${user.settings.customCursor ? 'translate-x-6' : ''}`}></div>
          </button>
        </div>
      </div>
    </div>
  `;
};

export default Settings;