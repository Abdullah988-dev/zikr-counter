import React from 'react';
import { Sparkles } from 'lucide-react';
import logoImg from '../assets/logo.png';

export default function Navbar({ onHomeClick }) {
  return (
    <nav className="w-full py-4 px-6 border-b border-slate-800 bg-slate-950/80 backdrop-blur sticky top-0 z-50">
      <div className="max-w-md mx-auto flex justify-between items-center">
        <button 
          onClick={onHomeClick}
          className="flex items-center gap-3 text-left focus:outline-none"
        >
          <img src={logoImg} alt="Daily Zikr Logo" className="w-9 h-9 rounded-xl object-contain" />
          <div>
            <span className="font-bold text-lg text-white tracking-wide block leading-tight">Daily Zikr</span>
            <span className="text-[10px] text-emerald-400 font-medium dir-rtl">ڈیجیٹل تسبیح</span>
          </div>
        </button>
        <div className="flex items-center gap-1 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 px-3 py-1 rounded-full text-xs font-medium">
          <Sparkles size={12} />
          <span>v1.0 Ready</span>
        </div>
      </div>
    </nav>
  );
}