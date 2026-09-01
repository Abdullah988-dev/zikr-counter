import React, { useState } from 'react';
import Navbar from './components/Navbar';
import LandingHero from './components/LandingHero';
import ZikrApp from './components/ZikrApp';

export default function App() {
  const [showZikrApp, setShowZikrApp] = useState(false);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-between selection:bg-emerald-500 selection:text-slate-950">
      {showZikrApp ? (
        <ZikrApp onBackToLanding={() => setShowZikrApp(false)} />
      ) : (
        <>
          <Navbar onHomeClick={() => setShowZikrApp(false)} />
          <LandingHero onOpenWebApp={() => setShowZikrApp(true)} />
          <footer className="py-4 text-center text-xs text-slate-600 border-t border-slate-900">
            © {new Date().getFullYear()} Daily Zikr App. All rights reserved.
          </footer>
        </>
      )}
    </div>
  );
}