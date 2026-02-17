
import React, { useState } from 'react';
import { Search, Rocket, Menu, UserCircle, LogOut, ChevronDown, Lock, User as UserIcon, ShieldCheck } from 'lucide-react';
import { User } from '../types';

interface NavbarProps {
  user: User | null;
  onSearch: (query: string) => void;
  onLogin: (name: string, pass: string) => { success: boolean, message?: string };
  onSignUp: (name: string, pass: string) => { success: boolean, message?: string };
  onLogout: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ user, onSearch, onLogin, onSignUp, onLogout }) => {
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');
  const [usernameInput, setUsernameInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [error, setError] = useState('');

  const handleAuthSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!usernameInput.trim() || !passwordInput.trim()) {
      setError('All fields are required');
      return;
    }

    const result = authMode === 'login' 
      ? onLogin(usernameInput, passwordInput) 
      : onSignUp(usernameInput, passwordInput);

    if (result.success) {
      setShowAuthModal(false);
      setUsernameInput('');
      setPasswordInput('');
    } else {
      setError(result.message || 'Authentication failed');
    }
  };

  const handleMouseEnter = () => (window as any).setCursorActive(true);
  const handleMouseLeave = () => (window as any).setCursorActive(false);

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 h-16 bg-slate-950/80 backdrop-blur-xl border-b border-slate-800 z-[60] px-4 md:px-8 flex items-center justify-between">
        <a href="#/" className="flex items-center gap-2 group" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
          <div className="p-2 bg-[var(--primary)]/10 rounded-lg group-hover:bg-[var(--primary)]/20 transition-colors">
            <Rocket className="text-theme w-6 h-6" />
          </div>
          <span className="font-orbitron font-black text-xl tracking-tighter text-white uppercase italic">
            Classroom<span className="text-theme not-italic">9x</span>
          </span>
        </a>

        <div className="hidden md:flex flex-1 max-w-xl mx-8 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 w-4 h-4" />
          <input 
            type="text" 
            placeholder="Search for games..." 
            className="w-full bg-slate-900 border border-slate-800 rounded-full py-2 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/40 text-sm transition-all text-slate-200"
            onChange={(e) => onSearch(e.target.value)}
          />
        </div>

        <div className="flex items-center gap-4">
          {user ? (
            <div className="flex items-center gap-3">
              <div className="hidden sm:flex flex-col items-end">
                <span className="text-xs font-black text-white uppercase tracking-wider">{user.username}</span>
                <span className="text-[10px] font-bold text-theme uppercase">Elite Operative</span>
              </div>
              <div className="relative group">
                <button 
                  className="flex items-center gap-2 p-1.5 bg-slate-900 rounded-xl border border-white/5 hover:border-[var(--primary)]/40 transition-all"
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                >
                  <div className="w-8 h-8 rounded-lg bg-theme flex items-center justify-center text-slate-950 font-black text-xs">
                    {user.level}
                  </div>
                  <ChevronDown size={14} className="text-slate-500" />
                </button>
                <div className="absolute right-0 mt-2 w-48 bg-slate-900 border border-slate-800 rounded-2xl p-2 opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto transition-all translate-y-2 group-hover:translate-y-0 shadow-2xl">
                    <button 
                      onClick={onLogout}
                      className="w-full flex items-center gap-3 px-4 py-2 hover:bg-rose-500/10 hover:text-rose-500 text-slate-400 rounded-xl transition-colors text-sm font-bold"
                    >
                      <LogOut size={16} />
                      Logout
                    </button>
                </div>
              </div>
            </div>
          ) : (
            <button 
              onClick={() => {
                setShowAuthModal(true);
                setAuthMode('login');
              }}
              className="bg-theme hover:brightness-110 text-slate-950 px-6 py-2 rounded-xl font-black text-xs uppercase tracking-[0.2em] transition-all shadow-theme active:scale-95"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              LOGIN
            </button>
          )}
        </div>
      </nav>

      {showAuthModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/80 backdrop-blur-md" onClick={() => setShowAuthModal(false)}></div>
          <div className="relative w-full max-w-md bg-slate-900 border border-white/10 rounded-[2.5rem] overflow-hidden shadow-2xl animate-in zoom-in-95 duration-300">
             
             {/* Header Tabs */}
             <div className="flex border-b border-slate-800">
                <button 
                  onClick={() => { setAuthMode('login'); setError(''); }}
                  className={`flex-1 py-6 font-orbitron font-bold text-xs uppercase tracking-widest transition-all ${authMode === 'login' ? 'bg-theme text-slate-950' : 'text-slate-500 hover:text-slate-300'}`}
                >
                  Login
                </button>
                <button 
                  onClick={() => { setAuthMode('signup'); setError(''); }}
                  className={`flex-1 py-6 font-orbitron font-bold text-xs uppercase tracking-widest transition-all ${authMode === 'signup' ? 'bg-theme text-slate-950' : 'text-slate-500 hover:text-slate-300'}`}
                >
                  Sign Up
                </button>
             </div>

             <div className="p-10 pt-8">
               <div className="flex justify-center mb-6">
                 <div className="w-16 h-16 rounded-3xl bg-theme/10 flex items-center justify-center text-theme">
                   {authMode === 'login' ? <Lock size={32} /> : <ShieldCheck size={32} />}
                 </div>
               </div>

               <h2 className="font-orbitron font-black text-2xl text-center uppercase tracking-tight text-white mb-2">
                 {authMode === 'login' ? 'Initialize' : 'Register'} <span className="text-theme">Protocol</span>
               </h2>
               <p className="text-slate-500 text-xs text-center mb-8 uppercase tracking-widest">Secure terminal connection</p>

               {error && (
                 <div className="mb-6 p-4 bg-rose-500/10 border border-rose-500/20 text-rose-500 text-xs font-bold rounded-xl text-center">
                   {error}
                 </div>
               )}

               <form onSubmit={handleAuthSubmit} className="space-y-4">
                  <div className="relative">
                    <UserIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600" size={18} />
                    <input 
                      autoFocus
                      type="text" 
                      value={usernameInput}
                      onChange={(e) => setUsernameInput(e.target.value)}
                      placeholder="USERNAME" 
                      className="w-full bg-black border border-slate-800 rounded-2xl py-4 pl-12 pr-6 text-white focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/40 font-orbitron font-bold uppercase tracking-widest text-sm"
                    />
                  </div>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600" size={18} />
                    <input 
                      type="password" 
                      value={passwordInput}
                      onChange={(e) => setPasswordInput(e.target.value)}
                      placeholder="PASSWORD" 
                      className="w-full bg-black border border-slate-800 rounded-2xl py-4 pl-12 pr-6 text-white focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/40 font-orbitron font-bold uppercase tracking-widest text-sm"
                    />
                  </div>
                  <button 
                    type="submit"
                    className="w-full bg-theme text-slate-950 py-4 rounded-2xl font-black uppercase tracking-[0.3em] shadow-theme active:scale-95 transition-all text-sm mt-4"
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                  >
                    {authMode === 'login' ? 'START SESSION' : 'CREATE ACCOUNT'}
                  </button>
               </form>

               <div className="mt-8 text-center">
                 <p className="text-[10px] text-slate-600 font-bold uppercase tracking-[0.2em]">
                   {authMode === 'login' ? "Don't have an account?" : "Already a member?"}
                   <button 
                    onClick={() => { setAuthMode(authMode === 'login' ? 'signup' : 'login'); setError(''); }}
                    className="ml-2 text-theme hover:underline"
                   >
                    {authMode === 'login' ? 'SIGN UP' : 'LOGIN'}
                   </button>
                 </p>
               </div>
             </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
