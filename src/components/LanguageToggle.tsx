import React from 'react';
import { useLanguage } from '../context/LanguageContext';

export const LanguageToggle: React.FC = () => {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="inline-flex items-center rounded-full border border-white/10 bg-slate-900/60 p-1 text-xs">
      <button
        type="button"
        onClick={() => setLanguage('fr')}
        className={`px-3 py-1 rounded-full transition-colors ${
          language === 'fr' ? 'bg-emerald-500 text-slate-900' : 'text-slate-100 hover:bg-white/5'
        }`}
      >
        FR
      </button>
      <button
        type="button"
        onClick={() => setLanguage('ar')}
        className={`px-3 py-1 rounded-full transition-colors ${
          language === 'ar' ? 'bg-emerald-500 text-slate-900' : 'text-slate-100 hover:bg-white/5'
        }`}
      >
        AR
      </button>
    </div>
  );
};

