import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';
import { t } from '../lib/i18n';

type Mode = 'signin' | 'signup';

type Props = {
  onAuthenticated: () => void;
};

export const AuthCard: React.FC<Props> = ({ onAuthenticated }) => {
  const { language } = useLanguage();
  const { signIn, signUp } = useAuth();
  const [mode, setMode] = useState<Mode>('signin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const action = mode === 'signin' ? signIn : signUp;
      const { error: actionError } = await action({ email, password });
      if (actionError) {
        setError(actionError);
        return;
      }
      onAuthenticated();
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card w-full max-w-md p-6 space-y-6">
      <header className="space-y-1">
        <h2 className="text-lg font-semibold text-white">{t(language, 'auth.title')}</h2>
        <p className="text-sm text-slate-300">{t(language, 'auth.subtitle')}</p>
      </header>

      <div className="flex items-center gap-2 text-xs text-slate-300">
        <button
          type="button"
          onClick={() => setMode('signin')}
          className={`px-3 py-1 rounded-full border ${
            mode === 'signin'
              ? 'border-emerald-500 bg-emerald-500/10 text-emerald-300'
              : 'border-transparent hover:border-white/10'
          }`}
        >
          {t(language, 'auth.signIn')}
        </button>
        <button
          type="button"
          onClick={() => setMode('signup')}
          className={`px-3 py-1 rounded-full border ${
            mode === 'signup'
              ? 'border-emerald-500 bg-emerald-500/10 text-emerald-300'
              : 'border-transparent hover:border-white/10'
          }`}
        >
          {t(language, 'auth.signUp')}
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-1 text-left">
          <label htmlFor="email" className="block text-xs font-medium text-slate-200">
            {t(language, 'auth.email')}
          </label>
          <input
            id="email"
            type="email"
            autoComplete="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            className="w-full rounded-xl border border-white/10 bg-slate-900/60 px-3 py-2 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/60"
          />
        </div>

        <div className="space-y-1 text-left">
          <label htmlFor="password" className="block text-xs font-medium text-slate-200">
            {t(language, 'auth.password')}
          </label>
          <input
            id="password"
            type="password"
            autoComplete={mode === 'signin' ? 'current-password' : 'new-password'}
            value={password}
            onChange={e => setPassword(e.target.value)}
            className="w-full rounded-xl border border-white/10 bg-slate-900/60 px-3 py-2 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/60"
          />
        </div>

        {error && <p className="text-xs text-red-400">{error}</p>}

        <button type="submit" className="btn-primary w-full justify-center" disabled={loading}>
          {mode === 'signin' ? t(language, 'auth.signIn') : t(language, 'auth.signUp')}
        </button>
      </form>
    </div>
  );
};

