import React, { createContext, useContext, useEffect, useState } from 'react';

export type SupportedLanguage = 'fr' | 'ar';

type LanguageContextValue = {
  language: SupportedLanguage;
  setLanguage: (lang: SupportedLanguage) => void;
};

const LanguageContext = createContext<LanguageContextValue | undefined>(undefined);

const STORAGE_KEY = 'sehatech_language';

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<SupportedLanguage>('fr');

  useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY) as SupportedLanguage | null;
    if (stored === 'fr' || stored === 'ar') {
      setLanguageState(stored);
    }
  }, []);

  const setLanguage = (lang: SupportedLanguage) => {
    setLanguageState(lang);
    window.localStorage.setItem(STORAGE_KEY, lang);
  };

  return <LanguageContext.Provider value={{ language, setLanguage }}>{children}</LanguageContext.Provider>;
};

export const useLanguage = () => {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return ctx;
};

