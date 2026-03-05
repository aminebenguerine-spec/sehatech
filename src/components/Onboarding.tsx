import React, { useEffect, useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { t } from '../lib/i18n';
import { calculateBmi } from '../lib/bmi';
import type { GoalType } from '../types';

type Props = {
  onComplete: (data: { heightCm: number; weightKg: number; goal: GoalType }) => void;
};

export const Onboarding: React.FC<Props> = ({ onComplete }) => {
  const { language } = useLanguage();
  const [heightCm, setHeightCm] = useState<number | ''>('');
  const [weightKg, setWeightKg] = useState<number | ''>('');
  const [goal, setGoal] = useState<GoalType>('maintain');
  const [bmi, setBmi] = useState<number | null>(null);

  useEffect(() => {
    if (typeof heightCm === 'number' && typeof weightKg === 'number') {
      setBmi(calculateBmi(weightKg, heightCm));
    } else {
      setBmi(null);
    }
  }, [heightCm, weightKg]);

  const canContinue = typeof heightCm === 'number' && typeof weightKg === 'number';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!canContinue) return;
    onComplete({
      heightCm: heightCm as number,
      weightKg: weightKg as number,
      goal
    });
  };

  return (
    <div className="card w-full max-w-xl p-6 space-y-6">
      <header className="space-y-1 text-center">
        <h2 className="text-lg font-semibold text-white">{t(language, 'onboarding.title')}</h2>
        <p className="text-sm text-slate-300">{t(language, 'onboarding.subtitle')}</p>
      </header>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-1 text-left">
            <label className="block text-xs font-medium text-slate-200">
              {t(language, 'onboarding.height')}
            </label>
            <input
              type="number"
              min={120}
              max={230}
              value={heightCm}
              onChange={e => setHeightCm(e.target.value ? Number(e.target.value) : '')}
              className="w-full rounded-xl border border-white/10 bg-slate-900/60 px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/60"
            />
          </div>
          <div className="space-y-1 text-left">
            <label className="block text-xs font-medium text-slate-200">
              {t(language, 'onboarding.weight')}
            </label>
            <input
              type="number"
              min={35}
              max={200}
              value={weightKg}
              onChange={e => setWeightKg(e.target.value ? Number(e.target.value) : '')}
              className="w-full rounded-xl border border-white/10 bg-slate-900/60 px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/60"
            />
          </div>
        </div>

        <div className="space-y-2">
          <p className="text-xs font-medium text-slate-200">{t(language, 'onboarding.goal')}</p>
          <div className="grid grid-cols-3 gap-2 text-xs">
            <button
              type="button"
              onClick={() => setGoal('lose')}
              className={`rounded-xl border px-3 py-2 text-left transition-colors ${
                goal === 'lose'
                  ? 'border-emerald-500 bg-emerald-500/10 text-emerald-200'
                  : 'border-white/10 text-slate-200 hover:border-emerald-500/60'
              }`}
            >
              {t(language, 'onboarding.goal.lose')}
            </button>
            <button
              type="button"
              onClick={() => setGoal('maintain')}
              className={`rounded-xl border px-3 py-2 text-left transition-colors ${
                goal === 'maintain'
                  ? 'border-emerald-500 bg-emerald-500/10 text-emerald-200'
                  : 'border-white/10 text-slate-200 hover:border-emerald-500/60'
              }`}
            >
              {t(language, 'onboarding.goal.maintain')}
            </button>
            <button
              type="button"
              onClick={() => setGoal('gain')}
              className={`rounded-xl border px-3 py-2 text-left transition-colors ${
                goal === 'gain'
                  ? 'border-emerald-500 bg-emerald-500/10 text-emerald-200'
                  : 'border-white/10 text-slate-200 hover:border-emerald-500/60'
              }`}
            >
              {t(language, 'onboarding.goal.gain')}
            </button>
          </div>
        </div>

        <div className="space-y-1 rounded-2xl bg-slate-900/80 px-3 py-2 border border-white/5">
          <p className="text-xs font-medium text-slate-200">{t(language, 'onboarding.bmi')}</p>
          <p className="text-sm text-emerald-300">
            {bmi ? bmi : '--'}
          </p>
        </div>

        <button type="submit" className="btn-primary w-full justify-center" disabled={!canContinue}>
          {t(language, 'onboarding.finish')}
        </button>
      </form>
    </div>
  );
};

