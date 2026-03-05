import React, { useMemo, useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { t } from '../lib/i18n';
import { ALGERIAN_FOODS } from '../data/algerianFoods';
import type { FoodItem, FoodLogEntry, MealType } from '../types';

type Props = {
  logs: FoodLogEntry[];
  onAddLog: (entry: FoodLogEntry) => void;
  onSignOut: () => void;
};

const MEAL_ORDER: MealType[] = ['breakfast', 'lunch', 'dinner', 'snack'];

const mealLabelKey: Record<MealType, keyof typeof import('../types')['LanguageKey']> = {
  breakfast: 'tracker.meal.breakfast',
  lunch: 'tracker.meal.lunch',
  dinner: 'tracker.meal.dinner',
  snack: 'tracker.meal.snack'
} as any;

export const Dashboard: React.FC<Props> = ({ logs, onAddLog, onSignOut }) => {
  const { language } = useLanguage();
  const [query, setQuery] = useState('');
  const [selectedMeal, setSelectedMeal] = useState<MealType>('lunch');
  const [selectedFood, setSelectedFood] = useState<FoodItem | null>(null);
  const [quantity, setQuantity] = useState<number | ''>('');

  const today = useMemo(() => new Date().toISOString().slice(0, 10), []);
  const todaysLogs = logs.filter(l => l.date === today);

  const totals = todaysLogs.reduce(
    (acc, l) => {
      acc.calories += l.calories;
      acc.protein += l.protein;
      acc.carbs += l.carbs;
      acc.fat += l.fat;
      return acc;
    },
    { calories: 0, protein: 0, carbs: 0, fat: 0 }
  );

  const filteredFoods = useMemo(() => {
    const lower = query.toLowerCase();
    return ALGERIAN_FOODS.filter(food =>
      `${food.nameFr} ${food.nameAr}`.toLowerCase().includes(lower)
    ).slice(0, 20);
  }, [query]);

  const handleAdd = () => {
    if (!selectedFood || !quantity) return;
    const factor = Number(quantity);
    const entry: FoodLogEntry = {
      id: `${Date.now()}`,
      foodId: selectedFood.id,
      meal: selectedMeal,
      date: today,
      quantity: factor,
      calories: Math.round(selectedFood.calories * factor),
      protein: Math.round(selectedFood.protein * factor),
      carbs: Math.round(selectedFood.carbs * factor),
      fat: Math.round(selectedFood.fat * factor)
    };
    onAddLog(entry);
    setQuantity('');
    setSelectedFood(null);
    setQuery('');
  };

  return (
    <div className="space-y-5">
      <header className="flex items-center justify-between gap-3">
        <div className="space-y-1 text-left">
          <p className="text-xs uppercase tracking-wide text-emerald-300">{t(language, 'app.name')}</p>
          <h1 className="text-lg font-semibold text-white">{t(language, 'dashboard.today')}</h1>
        </div>
        <button
          type="button"
          onClick={onSignOut}
          className="btn-ghost border-none text-xs px-3 py-1"
        >
          Déconnexion
        </button>
      </header>

      <section className="grid grid-cols-2 gap-3 text-xs">
        <div className="card p-3 space-y-1">
          <p className="text-slate-300">{t(language, 'dashboard.calories')}</p>
          <p className="text-2xl font-semibold text-emerald-300">{totals.calories}</p>
          <p className="text-[11px] text-slate-400">kcal</p>
        </div>
        <div className="card p-3 space-y-2">
          <p className="text-slate-300">{t(language, 'dashboard.macros')}</p>
          <div className="flex justify-between text-[11px] text-slate-300">
            <span>{t(language, 'dashboard.protein')}</span>
            <span className="text-emerald-300">{totals.protein} g</span>
          </div>
          <div className="flex justify-between text-[11px] text-slate-300">
            <span>{t(language, 'dashboard.carbs')}</span>
            <span className="text-emerald-300">{totals.carbs} g</span>
          </div>
          <div className="flex justify-between text-[11px] text-slate-300">
            <span>{t(language, 'dashboard.fat')}</span>
            <span className="text-emerald-300">{totals.fat} g</span>
          </div>
        </div>
      </section>

      <section className="card p-3 space-y-3">
        <div className="flex items-center justify-between gap-2">
          <p className="text-xs font-medium text-slate-200">{t(language, 'tracker.addFood')}</p>
          <div className="flex gap-1 text-[11px]">
            {MEAL_ORDER.map(meal => (
              <button
                key={meal}
                type="button"
                onClick={() => setSelectedMeal(meal)}
                className={`rounded-full px-2 py-1 border ${
                  meal === selectedMeal
                    ? 'border-emerald-500 bg-emerald-500/10 text-emerald-200'
                    : 'border-white/10 text-slate-200 hover:border-emerald-500/60'
                }`}
              >
                {t(language, mealLabelKey[meal] as any)}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <input
            type="search"
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder={t(language, 'tracker.searchPlaceholder')}
            className="w-full rounded-xl border border-white/10 bg-slate-900/60 px-3 py-2 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/60"
          />
          {query && (
            <ul className="max-h-40 overflow-y-auto rounded-xl border border-white/10 bg-slate-900/90 text-xs">
              {filteredFoods.length === 0 && (
                <li className="px-3 py-2 text-slate-400">Aucun aliment trouvé pour cette recherche.</li>
              )}
              {filteredFoods.map(food => (
                <li
                  key={food.id}
                  className={`cursor-pointer px-3 py-2 hover:bg-white/5 ${
                    selectedFood?.id === food.id ? 'bg-emerald-500/10' : ''
                  }`}
                  onClick={() => setSelectedFood(food)}
                >
                  <div className="flex justify-between gap-2">
                    <span className="text-slate-100">
                      {language === 'fr' ? food.nameFr : food.nameAr}
                    </span>
                    <span className="text-slate-400">{food.calories} kcal</span>
                  </div>
                  <p className="text-[11px] text-slate-500">{food.serving}</p>
                </li>
              ))}
            </ul>
          )}
        </div>

        {selectedFood && (
          <div className="flex items-end gap-2 text-xs">
            <div className="flex-1 space-y-1">
              <p className="text-slate-300">
                {language === 'fr' ? selectedFood.nameFr : selectedFood.nameAr}
              </p>
              <p className="text-[11px] text-slate-500">{selectedFood.serving}</p>
            </div>
            <div className="w-24 space-y-1">
              <label className="block text-[11px] text-slate-300">x portion</label>
              <input
                type="number"
                min={0.25}
                step={0.25}
                value={quantity}
                onChange={e => setQuantity(e.target.value ? Number(e.target.value) : '')}
                className="w-full rounded-xl border border-white/10 bg-slate-900/60 px-2 py-1 text-xs text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/60"
              />
            </div>
            <button
              type="button"
              className="btn-primary text-xs px-3 py-2"
              onClick={handleAdd}
              disabled={!quantity}
            >
              +
            </button>
          </div>
        )}
      </section>

      <section className="card p-3 space-y-2 text-xs">
        {MEAL_ORDER.map(meal => {
          const mealLogs = todaysLogs.filter(l => l.meal === meal);
          if (mealLogs.length === 0) return null;
          return (
            <div key={meal} className="border-b border-white/5 last:border-0 last:pb-0 pb-2 mb-2 last:mb-0">
              <p className="mb-1 font-medium text-slate-200">
                {t(language, mealLabelKey[meal] as any)}
              </p>
              <ul className="space-y-1">
                {mealLogs.map(log => {
                  const food = ALGERIAN_FOODS.find(f => f.id === log.foodId);
                  return (
                    <li key={log.id} className="flex justify-between gap-2">
                      <span className="text-slate-100">
                        {food ? (language === 'fr' ? food.nameFr : food.nameAr) : log.foodId}
                      </span>
                      <span className="text-slate-400">
                        {log.calories} kcal · {log.quantity}×
                      </span>
                    </li>
                  );
                })}
              </ul>
            </div>
          );
        })}
        {todaysLogs.length === 0 && (
          <p className="text-[11px] text-slate-400">
            Commencez par ajouter votre premier repas de la journée.
          </p>
        )}
      </section>
    </div>
  );
};

