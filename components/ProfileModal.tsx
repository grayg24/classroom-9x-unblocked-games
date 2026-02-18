import React, { useState } from 'react';
import { User, CursorStyle } from '../types.ts';
import { X, Edit2, Shield, User as UserIcon, Trophy, Gamepad2, Zap, Palette, Lock, MousePointer2, Sparkles, Stars, Check } from 'lucide-react';

interface ProfileModalProps {
  user: User;
  onUpdateUser: (updates: Partial<User>) => void;
  onUpdateSettings: (settings: Partial<User['settings']>) => void;
  onSetTheme: (theme: string) => void;
  onClose: () => void;
}

const ProfileModal: React.FC<ProfileModalProps> = ({ user, onUpdateUser, onUpdateSettings, onSetTheme, onClose }) => {
  const [newUsername, setNewUsername] = useState(user.username);
  const [isEditing, setIsEditing] = useState(false);

  const handleSave = () => {
    if (newUsername.trim()) {
      onUpdateUser({ username: newUsername.trim() });
      setIsEditing(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleSave();
    if (e.key === 'Escape') {
      setNewUsername(user.username);
      setIsEditing(false);
    }
  };

  const themeOptions = [
    { id: 'cyan', label: 'Default', level: 1, color: '#22d3ee' },
    { id: 'rose', label: 'Rose', level: 5, color: '#fb7185' },
    { id: 'emerald', label: 'Emerald', level: 10, color: '#34d399' },
    { id: 'violet', label: 'Violet', level: 15, color: '#a78bfa' },
    { id: 'cobalt', label: 'Cobalt', level: 20, color: '#3b82f6' },
    { id: 'crimson', label: 'Crimson', level: 40, color: '#dc2626' },
    { id: 'gold', label: 'Shiny Gold', level: 75, color: 'linear-gradient(135deg, #fef08a, #facc15, #ca8a04)', special: 'shine' },
    { id: 'galaxy', label: 'Galaxy', level: 100, color: '#c084fc', special: 'nebula' },
    { id: 'rainbow', label: 'Matrix RGB', level: 999, color: 'linear-gradient(45deg, #ff0000, #ff7f00, #ffff00, #00ff00, #0000ff, #4b0082, #8b00ff, #ff0000)', special: 'matrix' },
  ];

  const cursorOptions: { id: CursorStyle, label: string, level: number }[] = [
    { id: 'default', label: 'Glow Dot', level: 1 },
    { id: 'crosshair', label: 'Tactical', level: 5 },
    { id: 'sword', label: 'Plasma', level: 10 },
    { id: 'neon', label: 'Polygon', level: 15 },
    { id: 'ring', label: 'Cyber', level: 20 },
    { id: 'amongus', label: 'Secret 1', level: 0 },
    { id: 'star', label: 'Secret 2', level: 0 },
  ];

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-slate-950/90 backdrop-blur-xl animate-in fade-in duration-300" onClick={onClose} />

      <div className="relative w-full max-w-2xl bg-slate-900 border border-white/10 rounded-[2.5rem] shadow-[0_0_80px_rgba(0,0,0,0.8)] flex flex-col overflow-hidden animate-in zoom-in-95 duration-300 max-h-[90vh]">
        
        <div className="flex items-center justify-between px-8 py-6 border-b border-white/5 bg-slate-950/50 shrink-0">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-theme/10 rounded-2xl text-theme">
              <Shield size={24} />
            </div>
            <h2 className="font-orbitron font-black text-xl uppercase italic tracking-tighter text-white">
              User <span className="text-theme">Profile</span>
            </h2>
          </div>
          <button onClick={onClose} className="p-3 bg-slate-800 hover:bg-rose-500 text-slate-400 hover:text-white rounded-2xl transition-all">
            <X size={20} />
          </button>
        </div>

        <div className="p-8 space-y-10 overflow-y-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <section className="space-y-4">
              <p className="text-[10px] font-black text-slate-600 uppercase tracking-[0.4em]">Profile</p>
              <div className="p-6 bg-black/40 border border-white/5 rounded-3xl flex items-center gap-4 min-h-[96px]">
                <div className="w-12 h-12 bg-theme/20 rounded-xl flex items-center justify-center text-theme shrink-0">
                  <UserIcon size={24} />
                </div>
                <div className="flex-1 min-w-0">
                  {isEditing ? (
                    <div className="flex items-center gap-2 animate-in slide-in-from-left-2">
                      <input 
                        autoFocus 
                        type="text" 
                        value={newUsername} 
                        onChange={(e) => setNewUsername(e.target.value)} 
                        onKeyDown={handleKeyDown}
                        className="bg-slate-800 border border-theme rounded-xl px-4 py-2 text-white font-orbitron text-sm focus:outline-none w-full shadow-theme" 
                      />
                      <button onClick={handleSave} className="p-2 bg-theme text-slate-950 rounded-xl"><Check size={18} /></button>
                    </div>
                  ) : (
                    <div className="flex items-center justify-between group">
                      <div className="min-w-0">
                        <h3 className="font-orbitron font-bold text-white text-lg truncate leading-none mb-1">{user.username}</h3>
                        <div className="text-[9px] font-black text-slate-500 uppercase tracking-widest">LVL {user.level} Operative</div>
                      </div>
                      <button onClick={() => setIsEditing(true)} className="p-2 bg-slate-800 text-slate-500 hover:text-theme hover:bg-theme/10 rounded-xl"><Edit2 size={16} /></button>
                    </div>
                  )}
                </div>
              </div>
            </section>

            <section className="space-y-4">
              <p className="text-[10px] font-black text-slate-600 uppercase tracking-[0.4em]">Stats</p>
              <div className="grid grid-cols-2 gap-3">
                <div className="p-4 bg-slate-800/40 border border-white/5 rounded-3xl">
                  <div className="flex items-center gap-2 text-amber-500 mb-1">
                    <Trophy size={12} /><span className="text-[8px] font-black uppercase tracking-widest text-slate-400">Total EXP</span>
                  </div>
                  <div className="text-xl font-orbitron font-black text-white">{user.exp}</div>
                </div>
                <div className="p-4 bg-slate-800/40 border border-white/5 rounded-3xl">
                  <div className="flex items-center gap-2 text-theme mb-1">
                    <Gamepad2 size={12} /><span className="text-[8px] font-black uppercase tracking-widest text-slate-400">Played</span>
                  </div>
                  <div className="text-xl font-orbitron font-black text-white">{user.gamesPlayed || 0}</div>
                </div>
              </div>
            </section>
          </div>

          <section className="space-y-4">
            <div className="flex items-center justify-between">
              <p className="text-[10px] font-black text-slate-600 uppercase tracking-[0.4em] flex items-center gap-2"><Palette size={12} className="text-theme" /> Themes</p>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
              {themeOptions.map((t) => {
                const isUnlocked = user.level >= t.level || user.unlockedThemes.includes(t.id);
                const isActive = user.currentTheme === t.id;
                return (
                  <button key={t.id} disabled={!isUnlocked} onClick={() => onSetTheme(t.id)} className={`group relative aspect-square rounded-2xl border-2 transition-all flex flex-col items-center justify-center overflow-hidden ${isActive ? 'border-white scale-105 shadow-theme' : 'border-slate-800 bg-slate-900/40 hover:border-theme/40'} ${!isUnlocked ? 'opacity-40 grayscale-[0.8] cursor-not-allowed' : 'active:scale-95'}`}>
                    <div className={`absolute inset-0 transition-opacity opacity-80 group-hover:opacity-100 ${t.special === 'shine' ? 'effect-shine' : ''}`} style={{ background: t.color }} />
                    {!isUnlocked ? (
                      <div className="relative z-10 flex flex-col items-center gap-1"><Lock size={14} className="text-slate-400" /><span className="text-[8px] font-black text-white bg-black/60 px-2 py-0.5 rounded-full">LVL {t.level}</span></div>
                    ) : (
                      <div className="relative z-10 text-center"><span className="text-[9px] font-black text-white uppercase tracking-widest block leading-tight">{t.label}</span></div>
                    )}
                  </button>
                );
              })}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default ProfileModal;