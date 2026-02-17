
import React, { useState } from 'react';
import { User, UserSettings } from '../types';
import { 
  Settings as SettingsIcon, 
  MousePointer2, 
  Layers, 
  Cpu, 
  ShieldCheck, 
  RefreshCw,
  Eye,
  Activity,
  Lock,
  Terminal,
  Key,
  Wind
} from 'lucide-react';

interface SettingsProps {
  user: User;
  onUpdateSettings: (settings: Partial<UserSettings>) => void;
  onSetTheme: (theme: string) => void;
  onRedeemCode: (code: string) => { success: boolean, message: string };
}

const Settings: React.FC<SettingsProps> = ({ user, onUpdateSettings, onSetTheme, onRedeemCode }) => {
  const [code, setCode] = useState('');
  const [feedback, setFeedback] = useState<{ success: boolean, message: string } | null>(null);

  const handleRedeem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!code.trim()) return;
    const result = onRedeemCode(code);
    setFeedback(result);
    if (result.success) setCode('');
    setTimeout(() => setFeedback(null), 3000);
  };

  const Toggle = ({ active, onToggle, icon: Icon, title, description, disabled = false, lockedLevel = 0 }: { 
    active: boolean, 
    onToggle: () => void, 
    icon: any, 
    title: string, 
    description: string,
    disabled?: boolean,
    lockedLevel?: number
  }) => (
    <div 
      className={`p-6 bg-slate-900/40 rounded-[2rem] border border-white/5 flex items-center justify-between group transition-all duration-500 relative overflow-hidden ${
        disabled ? 'opacity-50 grayscale' : 'hover:border-theme/30'
      }`}
      onMouseEnter={() => !disabled && (window as any).setCursorActive?.(true)}
      onMouseLeave={() => !disabled && (window as any).setCursorActive?.(false)}
    >
      <div className="flex items-start gap-5">
        <div className={`p-4 rounded-2xl ${active && !disabled ? 'bg-theme/10 text-theme' : 'bg-slate-800 text-slate-500'} transition-colors`}>
          <Icon size={24} />
        </div>
        <div>
          <h3 className="font-orbitron font-bold text-white uppercase text-sm tracking-widest mb-1">
            {title}
            {disabled && <span className="ml-2 text-theme text-[10px] bg-theme/10 px-2 py-0.5 rounded">LVL {lockedLevel}</span>}
          </h3>
          <p className="text-xs text-slate-500 leading-relaxed max-w-sm">{description}</p>
        </div>
      </div>
      
      {disabled ? (
        <div className="mr-4 text-slate-600">
           <Lock size={20} />
        </div>
      ) : (
        <button 
          onClick={onToggle}
          className={`relative w-14 h-8 rounded-full transition-all duration-300 ${active ? 'bg-theme shadow-theme' : 'bg-slate-800'}`}
        >
          <div className={`absolute top-1 left-1 w-6 h-6 bg-white rounded-full transition-transform duration-300 shadow-md ${active ? 'translate-x-6' : 'translate-x-0'}`}></div>
        </button>
      )}
    </div>
  );

  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-6 duration-700 pb-20">
      {/* Header */}
      <div className="flex items-center gap-6">
        <div className="w-16 h-16 bg-theme/10 rounded-3xl flex items-center justify-center text-theme border border-theme/20 shadow-2xl">
          <SettingsIcon size={32} className="animate-[spin_4s_linear_infinite]" />
        </div>
        <div>
          <h1 className="font-orbitron font-black text-4xl uppercase italic tracking-tighter text-white">
            System <span className="text-theme">Settings</span>
          </h1>
          <div className="flex items-center gap-3 mt-1">
             <div className="flex items-center gap-1.5 text-[10px] font-black text-slate-500 uppercase tracking-widest">
               <ShieldCheck size={12} className="text-emerald-500" />
               Identity: Verified
             </div>
             <div className="w-1 h-1 rounded-full bg-slate-800"></div>
             <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest">
               v4.0.5 Optimized
             </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Toggles & Codes */}
        <div className="lg:col-span-2 space-y-8">
          <section className="space-y-4">
            <p className="text-[10px] font-black text-slate-600 uppercase tracking-[0.4em] px-4 mb-2">Visual Core Systems</p>
            
            <Toggle 
              title="Custom Haptic Cursor"
              description="Enable the high-precision glow cursor with reactive movement and scaling. Optimized for desktop interfaces."
              active={user.settings.customCursor}
              onToggle={() => onUpdateSettings({ customCursor: !user.settings.customCursor })}
              icon={MousePointer2}
            />

            <Toggle 
              title="Warp Grid Animation"
              description="Activate the perspective grid background with linear motion. May impact performance on lower-tier hardware."
              active={user.settings.animatedBg}
              onToggle={() => onUpdateSettings({ animatedBg: !user.settings.animatedBg })}
              icon={Layers}
            />

            <Toggle 
              title="Volumetric Fog"
              description="Simulate particle depth using volumetric fog layers. Enhances atmosphere and immersion. Heavy GPU usage."
              active={user.settings.volumetricFog}
              onToggle={() => onUpdateSettings({ volumetricFog: !user.settings.volumetricFog })}
              icon={Wind}
              disabled={user.level < 25}
              lockedLevel={25}
            />
          </section>

          {/* Codes Section */}
          <section className="space-y-4">
             <p className="text-[10px] font-black text-slate-600 uppercase tracking-[0.4em] px-4 mb-2">Decryption Terminal</p>
             <div className="p-8 bg-slate-900/60 rounded-[2.5rem] border border-white/5 relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                  <Terminal size={64} className="text-theme" />
                </div>
                
                <h3 className="font-orbitron font-bold text-white uppercase text-sm tracking-widest mb-2 flex items-center gap-2">
                   <Key size={16} className="text-theme" />
                   Access Codes
                </h3>
                <p className="text-xs text-slate-500 mb-6 max-w-sm uppercase font-bold tracking-wider">
                   Enter secure decryption keys to unlock restricted hardware and profile boosts.
                </p>

                <form onSubmit={handleRedeem} className="flex gap-2">
                   <input 
                    type="text" 
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    placeholder="ENTER CODE..."
                    className="flex-1 bg-black/40 border border-white/10 rounded-xl px-4 py-3 font-orbitron text-xs text-theme focus:outline-none focus-shadow-theme transition-all placeholder:text-slate-700"
                   />
                   <button 
                    type="submit"
                    className="bg-theme text-slate-950 px-6 py-3 rounded-xl font-black uppercase text-xs tracking-widest hover:scale-105 active:scale-95 transition-all shadow-theme"
                   >
                     Redeem
                   </button>
                </form>

                {feedback && (
                  <div className={`mt-4 text-[10px] font-black uppercase tracking-[0.2em] animate-in fade-in slide-in-from-top-2 ${feedback.success ? 'text-emerald-500' : 'text-rose-500'}`}>
                    {feedback.message}
                  </div>
                )}
             </div>
          </section>
        </div>

        {/* Sidebar Status Info */}
        <div className="space-y-6">
          <div className="p-8 bg-slate-900/60 rounded-[2.5rem] border border-white/5 space-y-6">
            <div className="flex items-center justify-between">
               <div className="flex items-center gap-2 font-orbitron font-bold text-xs uppercase text-slate-400">
                  <Cpu size={14} className="text-theme" />
                  Hardware Status
               </div>
               <span className="text-[10px] font-black text-emerald-500 uppercase">Online</span>
            </div>

            <div className="space-y-4">
               <div className="space-y-2">
                 <div className="flex justify-between text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                   <span>Interface Buffer</span>
                   <span>Optimized</span>
                 </div>
                 <div className="h-1 bg-slate-800 rounded-full overflow-hidden">
                   <div className="h-full bg-theme w-1/3 shadow-theme"></div>
                 </div>
               </div>
               
               <div className="space-y-2">
                 <div className="flex justify-between text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                   <span>Render Scale</span>
                   <span>Native</span>
                 </div>
                 <div className="h-1 bg-slate-800 rounded-full overflow-hidden">
                   <div className="h-full bg-theme w-full shadow-theme"></div>
                 </div>
               </div>
            </div>
          </div>

          <div className="p-8 bg-slate-950 border border-white/5 rounded-[2.5rem] relative overflow-hidden group">
             <div className="absolute inset-0 bg-theme/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
             <div className="flex items-center gap-2 text-theme mb-3">
                <ShieldCheck size={16} />
                <span className="font-orbitron font-bold text-[10px] uppercase tracking-widest">Profile Integrity</span>
             </div>
             <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest leading-relaxed">
               All local profile data is stored on-device. Leveling up grants access to restricted visual modules like Volumetric Fog.
             </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
