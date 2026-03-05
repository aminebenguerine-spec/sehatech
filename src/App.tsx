import React, { useEffect, useState } from 'react';
import { useLanguage } from './context/LanguageContext';
import { useAuth } from './context/AuthContext';
import { t } from './lib/i18n';
import { LanguageToggle } from './components/LanguageToggle';
import { AuthCard } from './components/AuthCard';
import { Onboarding } from './components/Onboarding';
import { Dashboard } from './components/Dashboard';
import type { FoodLogEntry, GoalType } from './types';

type View = 'landing' | 'auth' | 'onboarding' | 'dashboard';

const ONBOARDING_KEY = 'sehatech_onboarding_done';

const App: React.FC = () => {
  const { language } = useLanguage();
  const { user, loading, signOut } = useAuth();
  const [view, setView] = useState<View>('landing');
  const [foodLogs, setFoodLogs] = useState<FoodLogEntry[]>([]);

  useEffect(() => {
    if (loading) return;
    const onboardingDone = window.localStorage.getItem(ONBOARDING_KEY) === '1';
    if (!user) {
      setView('landing');
    } else if (!onboardingDone) {
      setView('onboarding');
    } else {
      setView('dashboard');
    }
  }, [user, loading]);

  const handleAuthenticated = () => {
    const onboardingDone = window.localStorage.getItem(ONBOARDING_KEY) === '1';
    setView(onboardingDone ? 'dashboard' : 'onboarding');
  };

  const handleOnboardingComplete = (_data: { heightCm: number; weightKg: number; goal: GoalType }) => {
    window.localStorage.setItem(ONBOARDING_KEY, '1');
    setView('dashboard');
  };

  const handleAddLog = (entry: FoodLogEntry) => {
    setFoodLogs(prev => [...prev, entry]);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-slate-100 flex items-center justify-center">
        <p className="text-sm text-slate-300">Chargement…</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-slate-100">
      <div className="mx-auto flex min-h-screen max-w-md flex-col px-4 py-5">
        <header className="mb-4 flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-2xl bg-emerald-500/10 ring-1 ring-emerald-500/40">
              <span className="text-lg font-semibold text-emerald-400">S</span>
            </div>
            <div className="leading-tight text-left">
              <p className="text-sm font-semibold text-white">{t(language, 'app.name')}</p>
              <p className="text-[11px] text-emerald-300">
                {view === 'landing' ? t(language, 'landing.tagline') : 'Alimentation · IMC · Suivi quotidien'}
              </p>
            </div>
          </div>
          <LanguageToggle />
        </header>

        <main className="flex-1 pb-4">
          {view === 'landing' && (
            <div className="space-y-4">
              <section className="card p-5 space-y-4">
                <div className="space-y-2 text-left">
                  <h1 className="text-2xl font-semibold text-white">{t(language, 'landing.tagline')}</h1>
                  <p className="text-sm text-slate-300">{t(language, 'landing.hero.pitch')}</p>
                </div>
                <div className="flex gap-2">
                  <button
                    type="button"
                    className="btn-primary flex-1 justify-center"
                    onClick={() => setView('auth')}
                  >
                    {t(language, 'landing.cta')}
                  </button>
                  <button
                    type="button"
                    className="btn-ghost flex-1 justify-center"
                    onClick={() => setView('auth')}
                  >
                    {t(language, 'landing.secondaryCta')}
                  </button>
                </div>
                <div className="grid grid-cols-3 gap-2 text-[11px] text-slate-300">
                  <div>
                    <p className="font-semibold text-white">+200</p>
                    <p>plats algériens</p>
                  </div>
                  <div>
                    <p className="font-semibold text-white">IMC</p>
                    <p>calcul automatique</p>
                  </div>
                  <div>
                    <p className="font-semibold text-white">Suivi</p>
                    <p>petit-déj → dîner</p>
                  </div>
                </div>
              </section>
            </div>
          )}

          {view === 'auth' && (
            <div className="flex flex-col items-center gap-4">
              <AuthCard onAuthenticated={handleAuthenticated} />
            </div>
          )}

          {view === 'onboarding' && (
            <div className="flex flex-col items-center gap-4">
              <Onboarding onComplete={handleOnboardingComplete} />
            </div>
          )}

          {view === 'dashboard' && (
            <Dashboard logs={foodLogs} onAddLog={handleAddLog} onSignOut={signOut} />
          )}
        </main>

        <footer className="mt-2 border-t border-white/5 pt-3 text-[10px] text-slate-500">
          <p>SehaTech · Fait pour le marché algérien 🇩🇿</p>
        </footer>
      </div>
    </div>
  );
};

export default App;

