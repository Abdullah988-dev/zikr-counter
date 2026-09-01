import React, { useState, useEffect } from 'react';
import { Plus, Trash2, RotateCcw, Moon, Sun, Settings as SettingsIcon, X, ArrowLeft } from 'lucide-react';

const INITIAL_ZIKRS = [
  { id: '1', name: 'سبحان اللہ', count: 0, target: 33 },
  { id: '2', name: 'الحمدللہ', count: 0, target: 33 },
  { id: '3', name: 'اللہ اکبر', count: 0, target: 34 },
  { id: '4', name: 'استغفراللہ', count: 0, target: 100 },
];

export default function ZikrApp({ onBackToLanding }) {
  const [zikrs, setZikrs] = useState([]);
  const [darkMode, setDarkMode] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [newZikrName, setNewZikrName] = useState('');
  const [newZikrTarget, setNewZikrTarget] = useState('');
  const [animatingId, setAnimatingId] = useState(null);

  // Initialize and check for local midnight reset
  useEffect(() => {
    const todayStr = new Date().toLocaleDateString('en-CA');
    const savedDate = localStorage.getItem('zikr_last_date');
    const savedZikrs = localStorage.getItem('zikr_list');
    const savedTheme = localStorage.getItem('zikr_theme');

    if (savedTheme) {
      setDarkMode(savedTheme === 'dark');
    }

    let parsedZikrs = savedZikrs ? JSON.parse(savedZikrs) : INITIAL_ZIKRS;

    if (savedDate !== todayStr) {
      parsedZikrs = parsedZikrs.map(item => ({ ...item, count: 0 }));
      localStorage.setItem('zikr_last_date', todayStr);
    }

    setZikrs(parsedZikrs);
    localStorage.setItem('zikr_list', JSON.stringify(parsedZikrs));
  }, []);

  // Save changes to localStorage
  useEffect(() => {
    if (zikrs.length > 0) {
      localStorage.setItem('zikr_list', JSON.stringify(zikrs));
    }
  }, [zikrs]);

  const toggleTheme = () => {
    const nextTheme = !darkMode;
    setDarkMode(nextTheme);
    localStorage.setItem('zikr_theme', nextTheme ? 'dark' : 'light');
  };

  const handleIncrement = (id) => {
    setZikrs(prev =>
      prev.map(item => item.id === id ? { ...item, count: item.count + 1 } : item)
    );
    setAnimatingId(id);
    setTimeout(() => setAnimatingId(null), 150);
  };

  const handleAddZikr = (e) => {
    e.preventDefault();
    if (!newZikrName.trim()) return;

    const newItem = {
      id: Date.now().toString(),
      name: newZikrName.trim(),
      count: 0,
      target: newZikrTarget ? parseInt(newZikrTarget, 10) : null
    };

    setZikrs(prev => [...prev, newItem]);
    setNewZikrName('');
    setNewZikrTarget('');
    setIsModalOpen(false);
  };

  const handleDelete = (id) => {
    if (window.confirm('کیا آپ اس ذکر کو حذف کرنا چاہتے ہیں؟')) {
      setZikrs(prev => prev.filter(item => item.id !== id));
    }
  };

  const handleResetToday = () => {
    if (window.confirm('کیا آپ آج کے تمام اذکار کا شمار صفر کرنا چاہتے ہیں؟')) {
      setZikrs(prev => prev.map(item => ({ ...item, count: 0 })));
      setIsSettingsOpen(false);
    }
  };

  const handleClearAll = () => {
    if (window.confirm('کیا آپ تمام اذکار کی فہرست ختم کرنا چاہتے ہیں؟')) {
      setZikrs([]);
      localStorage.removeItem('zikr_list');
      setIsSettingsOpen(false);
    }
  };

  const getFormattedDate = () => {
    return new Date().toLocaleDateString('ur-PK', {
      weekday: 'long',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'bg-slate-950 text-slate-100' : 'bg-emerald-50/40 text-slate-800'}`}>
      <div className="max-w-md mx-auto px-4 py-6 pb-24 min-h-screen flex flex-col">
        
        {/* Header */}
        <header className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-3">
            <button
              onClick={onBackToLanding}
              className="p-2 rounded-full bg-white dark:bg-slate-900 shadow-sm border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:text-white transition"
              title="Home Page"
            >
              <ArrowLeft size={18} />
            </button>
            <div>
              <h1 className="text-xl font-bold tracking-tight text-emerald-800 dark:text-emerald-400">Daily Zikr</h1>
              <p className="text-xs text-slate-500 dark:text-slate-400">{getFormattedDate()}</p>
            </div>
          </div>
          <div className="flex gap-2">
            <button
              onClick={toggleTheme}
              className="p-2.5 rounded-full bg-white dark:bg-slate-900 shadow-sm border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:scale-105 active:scale-95 transition"
            >
              {darkMode ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            <button
              onClick={() => setIsSettingsOpen(true)}
              className="p-2.5 rounded-full bg-white dark:bg-slate-900 shadow-sm border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:scale-105 active:scale-95 transition"
            >
              <SettingsIcon size={18} />
            </button>
          </div>
        </header>

        {/* Zikr Cards List */}
        <main className="flex-1 space-y-4">
          {zikrs.length === 0 ? (
            <div className="text-center py-16 text-slate-400">
              <p className="text-base mb-2 dir-rtl">کوئی ذکر موجود نہیں ہے۔</p>
              <p className="text-xs dir-rtl">نیا ذکر شامل کرنے کے لیے نیچے دیے گئے بٹن پر کلک کریں۔</p>
            </div>
          ) : (
            zikrs.map(zikr => {
              const hasTarget = zikr.target && zikr.target > 0;
              const progress = hasTarget ? Math.min((zikr.count / zikr.target) * 100, 100) : 0;
              const isCompleted = hasTarget && zikr.count >= zikr.target;

              return (
                <div
                  key={zikr.id}
                  className={`relative overflow-hidden rounded-2xl p-5 border transition-all duration-200 shadow-sm ${
                    darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-100'
                  }`}
                >
                  {/* Progress Bar */}
                  {hasTarget && (
                    <div
                      className={`absolute bottom-0 right-0 left-0 h-1 transition-all duration-300 ${
                        isCompleted ? 'bg-emerald-500' : 'bg-emerald-200 dark:bg-emerald-900'
                      }`}
                      style={{ width: `${progress}%` }}
                    />
                  )}

                  <div className="flex justify-between items-start mb-3">
                    <button
                      onClick={() => handleDelete(zikr.id)}
                      className="text-slate-400 hover:text-rose-500 dark:text-slate-600 dark:hover:text-rose-400 transition p-1"
                    >
                      <Trash2 size={16} />
                    </button>
                    <h2 className="text-2xl font-semibold text-right dir-rtl text-slate-800 dark:text-slate-100">
                      {zikr.name}
                    </h2>
                  </div>

                  <div className="flex justify-between items-end mt-2">
                    {/* Incrementor Button */}
                    <button
                      onClick={() => handleIncrement(zikr.id)}
                      className={`h-16 w-16 rounded-2xl flex items-center justify-center text-white bg-emerald-600 hover:bg-emerald-500 active:bg-emerald-700 shadow-md shadow-emerald-600/20 active:scale-90 transition-transform duration-100 select-none ${
                        animatingId === zikr.id ? 'scale-90' : 'scale-100'
                      }`}
                    >
                      <Plus size={32} />
                    </button>

                    {/* Counter Display */}
                    <div className="text-left">
                      <div
                        className={`text-4xl font-extrabold tracking-tight transition-transform duration-100 ${
                          animatingId === zikr.id ? 'scale-110 text-emerald-600 dark:text-emerald-400' : ''
                        }`}
                      >
                        {zikr.count}
                      </div>
                      {hasTarget && (
                        <div className="text-xs text-slate-400 dark:text-slate-500 font-medium mt-0.5 dir-rtl">
                          ہدف: {zikr.target}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </main>

        {/* Floating Add Action */}
        <div className="fixed bottom-6 left-0 right-0 max-w-md mx-auto px-4">
          <button
            onClick={() => setIsModalOpen(true)}
            className="w-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold py-3.5 px-5 rounded-2xl shadow-lg shadow-emerald-500/20 flex items-center justify-center gap-2 transition active:scale-95 text-sm"
          >
            <Plus size={18} />
            <span>نیا ذکر شامل کریں</span>
          </button>
        </div>

        {/* Add Zikr Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-sm flex items-end sm:items-center justify-center p-4">
            <div className={`w-full max-w-sm rounded-3xl p-6 shadow-2xl transition-all ${darkMode ? 'bg-slate-900 border border-slate-800 text-white' : 'bg-white text-slate-800'}`}>
              <div className="flex justify-between items-center mb-4">
                <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                  <X size={20} />
                </button>
                <h3 className="text-base font-bold">نیا ذکر</h3>
              </div>
              <form onSubmit={handleAddZikr} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1 text-right">ذكر کا نام</label>
                  <input
                    type="text"
                    required
                    placeholder="مثلاً: سبحان اللہ"
                    value={newZikrName}
                    onChange={(e) => setNewZikrName(e.target.value)}
                    className={`w-full px-4 py-3 rounded-xl border outline-none transition text-right ${
                      darkMode ? 'bg-slate-800 border-slate-700 text-white focus:border-emerald-500' : 'bg-slate-50 border-slate-200 focus:border-emerald-600'
                    }`}
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1 text-right">ہدف (اختیاری)</label>
                  <input
                    type="number"
                    min="1"
                    placeholder="33"
                    value={newZikrTarget}
                    onChange={(e) => setNewZikrTarget(e.target.value)}
                    className={`w-full px-4 py-3 rounded-xl border outline-none transition ${
                      darkMode ? 'bg-slate-800 border-slate-700 text-white focus:border-emerald-500' : 'bg-slate-50 border-slate-200 focus:border-emerald-600'
                    }`}
                  />
                </div>
                <div className="flex gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="flex-1 py-3 rounded-xl border border-slate-700 text-slate-300 font-medium text-sm"
                  >
                    منسوخ
                  </button>
                  <button
                    type="submit"
                    className="flex-1 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-sm shadow-md"
                  >
                    محفوظ کریں
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Settings Modal */}
        {isSettingsOpen && (
          <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-sm flex items-end sm:items-center justify-center p-4">
            <div className={`w-full max-w-sm rounded-3xl p-6 shadow-2xl transition-all ${darkMode ? 'bg-slate-900 border border-slate-800 text-white' : 'bg-white text-slate-800'}`}>
              <div className="flex justify-between items-center mb-6">
                <button onClick={() => setIsSettingsOpen(false)} className="text-slate-400 hover:text-slate-600">
                  <X size={20} />
                </button>
                <h3 className="text-base font-bold">سیٹنگز</h3>
              </div>
              
              <div className="space-y-3">
                <button
                  onClick={handleResetToday}
                  className="w-full flex items-center justify-between p-4 rounded-xl bg-slate-800/50 border border-slate-800 hover:bg-slate-800 transition text-rose-400 font-medium text-sm"
                >
                  <span className="flex items-center gap-2 dir-rtl">
                    <RotateCcw size={16} />
                    آج کا شمار ری سیٹ کریں
                  </span>
                </button>

                <button
                  onClick={handleClearAll}
                  className="w-full flex items-center justify-between p-4 rounded-xl bg-slate-800/50 border border-slate-800 hover:bg-slate-800 transition text-rose-400 font-medium text-sm"
                >
                  <span className="flex items-center gap-2 dir-rtl">
                    <Trash2 size={16} />
                    تمام اذکار حذف کریں
                  </span>
                </button>
              </div>

              <div className="mt-8 pt-4 border-t border-slate-800 text-center text-xs text-slate-500">
                Daily Zikr App v1.0
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}