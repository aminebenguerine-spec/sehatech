export type MealType = 'breakfast' | 'lunch' | 'dinner' | 'snack';

export type GoalType = 'lose' | 'maintain' | 'gain';

export type LanguageKey =
  | 'app.name'
  | 'landing.tagline'
  | 'landing.cta'
  | 'landing.secondaryCta'
  | 'landing.hero.pitch'
  | 'auth.title'
  | 'auth.subtitle'
  | 'auth.email'
  | 'auth.password'
  | 'auth.signIn'
  | 'auth.signUp'
  | 'auth.haveAccount'
  | 'auth.noAccount'
  | 'onboarding.title'
  | 'onboarding.subtitle'
  | 'onboarding.height'
  | 'onboarding.weight'
  | 'onboarding.bmi'
  | 'onboarding.goal'
  | 'onboarding.goal.lose'
  | 'onboarding.goal.maintain'
  | 'onboarding.goal.gain'
  | 'onboarding.next'
  | 'onboarding.finish'
  | 'dashboard.greeting'
  | 'dashboard.today'
  | 'dashboard.calories'
  | 'dashboard.macros'
  | 'dashboard.protein'
  | 'dashboard.carbs'
  | 'dashboard.fat'
  | 'tracker.addFood'
  | 'tracker.searchPlaceholder'
  | 'tracker.meal.breakfast'
  | 'tracker.meal.lunch'
  | 'tracker.meal.dinner'
  | 'tracker.meal.snack';

export type FoodItem = {
  id: string;
  nameFr: string;
  nameAr: string;
  category: 'traditional' | 'street' | 'drink' | 'dessert' | 'staple';
  serving: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
};

export type FoodLogEntry = {
  id: string;
  foodId: string;
  meal: MealType;
  quantity: number;
  date: string; // ISO date (yyyy-mm-dd)
  // computed values at log time for simplicity
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
};

