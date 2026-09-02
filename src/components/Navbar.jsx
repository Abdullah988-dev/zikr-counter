import React from 'react';
import { Download } from 'lucide-react';
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

        {/* Download APK Button */}
        <a 
          href="/download.apk" 
          download="DailyZikrApp.apk"
          className="flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold px-3 py-1.5 rounded-lg text-xs transition-colors"
        >
          <Download size={14} />
          <span>Download App</span>
        </a>
      </div>
    </nav>
  );
}