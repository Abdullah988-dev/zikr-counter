import React from 'react';
import { Download, Smartphone, ShieldCheck, CheckCircle2 } from 'lucide-react';
import logoImg from '../assets/logo.png';

export default function LandingHero({ onOpenWebApp }) {
  return (
    <section className="flex-1 flex flex-col items-center justify-center text-center px-4 py-8 max-w-md mx-auto w-full">
      {/* App Main Logo */}
      <div className="w-24 h-24 mb-6 shadow-2xl shadow-emerald-600/30 rounded-3xl overflow-hidden border border-emerald-500/30">
        <img src={logoImg} alt="Daily Zikr Logo" className="w-full h-full object-cover" />
      </div>

      {/* Main Heading */}
      <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight mb-3">
        ڈیجیٹل تسبیح اور <br />
        <span className="text-emerald-400">روزمرہ کے اذکار</span>
      </h1>

      {/* Subtitle */}
      <p className="text-slate-400 text-sm sm:text-base mb-6 max-w-xs leading-relaxed dir-rtl">
        اپنے تمام اذکار کا شمار رکھیں، خودکار مڈ نائٹ ری سیٹ اور بہترین اور پرامن ڈیزائن کے ساتھ۔
      </p>

      {/* App Features List */}
      <div className="w-full bg-slate-900/60 border border-slate-800 rounded-2xl p-4 text-right mb-6 space-y-2.5 text-xs text-slate-300 dir-rtl">
        <div className="flex items-center gap-2.5">
          <CheckCircle2 size={16} className="text-emerald-400 shrink-0" />
          <span>روزانہ رات 12 بجے خودکار کاؤنٹ ری سیٹ</span>
        </div>
        <div className="flex items-center gap-2.5">
          <CheckCircle2 size={16} className="text-emerald-400 shrink-0" />
          <span>متعدد اذکار الگ الگ شامل کرنے کی سہولت</span>
        </div>
        <div className="flex items-center gap-2.5">
          <CheckCircle2 size={16} className="text-emerald-400 shrink-0" />
          <span>100% پرائیویٹ • بغیر انٹرنیٹ اور لاگ ان کے فعال</span>
        </div>
      </div>

      {/* Buttons Container */}
      <div className="w-full space-y-3">
        <a
          href="/download.apk"
          download="DailyZikrApp.apk"
          className="w-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold py-3.5 px-5 rounded-2xl shadow-lg shadow-emerald-500/20 flex items-center justify-center gap-2.5 transition active:scale-95 text-sm"
        >
          <Download size={18} />
          <span>Android App ڈاؤن لوڈ کریں</span>
        </a>

        <button
          onClick={onOpenWebApp}
          className="w-full bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-800 font-medium py-3 px-5 rounded-2xl flex items-center justify-center gap-2 transition active:scale-95 text-sm"
        >
          <Smartphone size={18} />
          <span>براہ راست ویب پر چلائیں</span>
        </button>
      </div>

      {/* Trust Badge */}
      <div className="flex items-center gap-1.5 text-[11px] text-slate-500 mt-6">
        <ShieldCheck size={14} className="text-emerald-500" />
        <span>بدون اشتہارات • آف لائن سپورٹ</span>
      </div>
    </section>
  );
}