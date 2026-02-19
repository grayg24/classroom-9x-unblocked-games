import React, { useState } from 'react';
import htm from 'htm';
import { User as UserIcon, Zap, ChevronRight, Terminal } from 'lucide-react';

const html = htm.bind(React.createElement);

const InitialNameModal = ({ onSubmit }) => {
  const [name, setName] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.trim().length < 2) {
      setError('Username must be at least 2 characters.');
      return;
    }
    onSubmit(name.trim());
  };

  return html`
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-slate-950/95 backdrop-blur-2xl animate-in fade-in duration-700" />
      
      <div className="relative w-full max-w-lg bg-slate-900 border border-theme/20 rounded-[3rem] shadow-[0_0_100px_rgba(0,0,0,0.9)] overflow-hidden animate-in zoom-in-95 duration-500">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="scanline absolute inset-0 bg-gradient-to-b from-transparent via-white/5 to-transparent h-4 w-full animate-scan-slow" />
        </div>

        <div className="p-10 space-y-10 relative z-10">
          <div className="flex flex-col items-center text-center gap-6">
            <div className="p-5 bg-theme/10 rounded-full text-theme border border-theme/20 shadow-[0_0_40px_var(--primary-glow)] animate-bounce">
              <${UserIcon} size=${48} />
            </div>
            <div className="space-y-2">
              <h2 className="font-orbitron font-black text-3xl italic tracking-tighter uppercase text-white leading-none">
                Enter <span className="text-theme">Username</span>
              </h2>
              <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.4em]">enter a username and get to playing</p>
            </div>
          </div>

          <form onSubmit=${handleSubmit} className="space-y-6">
            <div className="relative group">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-theme to-theme/20 rounded-2xl blur opacity-20 group-focus-within:opacity-100 transition duration-1000"></div>
              <div className="relative bg-slate-950 rounded-2xl border border-white/5 flex items-center px-6">
                <${Terminal} size=${20} className="text-theme mr-4" />
                <input 
                  autoFocus
                  type="text" 
                  value=${name}
                  onChange=${(e) => {
                    setName(e.target.value);
                    if (error) setError('');
                  }}
                  placeholder="USERNAME..."
                  className="w-full bg-transparent py-5 text-white font-orbitron text-lg focus:outline-none placeholder:text-slate-800"
                />
              </div>
            </div>

            ${error && html`
              <p className="text-rose-500 text-[10px] font-black uppercase tracking-widest text-center animate-pulse">
                ${error}
              </p>
            `}

            <button 
              type="submit"
              className="w-full group bg-theme text-slate-950 py-5 rounded-2xl font-black uppercase tracking-[0.2em] text-sm transition-all hover:scale-[1.02] active:scale-95 shadow-theme flex items-center justify-center gap-3 overflow-hidden"
            >
              <span className="relative z-10">Continue</span>
              <${ChevronRight} size=${18} className="relative z-10 group-hover:translate-x-2 transition-transform" />
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
            </button>
          </form>

          <div className="flex items-center justify-center gap-3 opacity-30">
             <${Zap} size=${14} className="text-theme" />
             <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest leading-none">Secure Uplink Established</span>
          </div>
        </div>
      </div>

      <style>${`
        @keyframes scan {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(600%); }
        }
        .animate-scan-slow {
          animation: scan 10s linear infinite;
        }
      `}</style>
    </div>
  `;
};

export default InitialNameModal;