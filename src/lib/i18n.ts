import type { LanguageKey } from '../types';
import type { SupportedLanguage } from '../context/LanguageContext';

type Dictionary = Record<LanguageKey, string>;

const fr: Dictionary = {
  'app.name': 'SehaTech',
  'landing.tagline': 'Votre coach santé & nutrition 100% algérien',
  'landing.cta': 'Commencer gratuitement',
  'landing.secondaryCta': 'Voir la démo',
  'landing.hero.pitch':
    'Suivez vos repas, comprenez vos habitudes, et atteignez vos objectifs avec une base de données adaptée à la cuisine algérienne.',
  'auth.title': 'Connexion à SehaTech',
  'auth.subtitle': 'Créez un compte ou connectez-vous pour commencer à suivre votre alimentation.',
  'auth.email': 'Email',
  'auth.password': 'Mot de passe',
  'auth.signIn': 'Se connecter',
  'auth.signUp': "Créer un compte",
  'auth.haveAccount': 'Vous avez déjà un compte ?',
  'auth.noAccount': "Pas encore de compte ?",
  'onboarding.title': 'Parlons de vos objectifs',
  'onboarding.subtitle': 'Nous utilisons votre IMC et vos objectifs pour adapter vos recommandations.',
  'onboarding.height': 'Taille (cm)',
  'onboarding.weight': 'Poids (kg)',
  'onboarding.bmi': 'Votre IMC estimé',
  'onboarding.goal': 'Votre objectif principal',
  'onboarding.goal.lose': 'Perte de poids',
  'onboarding.goal.maintain': 'Maintien du poids',
  'onboarding.goal.gain': 'Prise de masse',
  'onboarding.next': 'Continuer',
  'onboarding.finish': 'Accéder au tableau de bord',
  'dashboard.greeting': 'Bonjour',
  'dashboard.today': "Aujourd’hui",
  'dashboard.calories': 'Calories consommées',
  'dashboard.macros': 'Répartition des macros',
  'dashboard.protein': 'Protéines',
  'dashboard.carbs': 'Glucides',
  'dashboard.fat': 'Lipides',
  'tracker.addFood': 'Ajouter un aliment',
  'tracker.searchPlaceholder': 'Rechercher un aliment algérien…',
  'tracker.meal.breakfast': 'Petit-déjeuner',
  'tracker.meal.lunch': 'Déjeuner',
  'tracker.meal.dinner': 'Dîner',
  'tracker.meal.snack': 'Collation'
};

const ar: Dictionary = {
  'app.name': 'صحة تك',
  'landing.tagline': 'مدرب صحتك وتغذيتك، مخصص للجزائر',
  'landing.cta': 'ابدأ مجانًا',
  'landing.secondaryCta': 'مشاهدة العرض',
  'landing.hero.pitch':
    'تابع وجباتك، افهم عاداتك الغذائية، وحقق أهدافك الصحية مع قاعدة بيانات مهيأة للأطباق الجزائرية.',
  'auth.title': 'تسجيل الدخول إلى صحة تك',
  'auth.subtitle': 'أنشئ حسابًا أو سجّل الدخول لبدء متابعة تغذيتك.',
  'auth.email': 'البريد الإلكتروني',
  'auth.password': 'كلمة المرور',
  'auth.signIn': 'تسجيل الدخول',
  'auth.signUp': 'إنشاء حساب',
  'auth.haveAccount': 'لديك حساب؟',
  'auth.noAccount': 'ليس لديك حساب؟',
  'onboarding.title': 'دعنا نتحدث عن أهدافك',
  'onboarding.subtitle': 'نستخدم مؤشر كتلة الجسم وأهدافك لتخصيص التوصيات.',
  'onboarding.height': 'الطول (سم)',
  'onboarding.weight': 'الوزن (كلغ)',
  'onboarding.bmi': 'مؤشر كتلة الجسم التقريبي',
  'onboarding.goal': 'هدفك الرئيسي',
  'onboarding.goal.lose': 'نقصان الوزن',
  'onboarding.goal.maintain': 'الحفاظ على الوزن',
  'onboarding.goal.gain': 'زيادة الكتلة',
  'onboarding.next': 'متابعة',
  'onboarding.finish': 'الذهاب للوحة التحكم',
  'dashboard.greeting': 'مرحبًا',
  'dashboard.today': 'اليوم',
  'dashboard.calories': 'السعرات الحرارية المستهلكة',
  'dashboard.macros': 'توزيع المغذيات',
  'dashboard.protein': 'بروتينات',
  'dashboard.carbs': 'نشويات',
  'dashboard.fat': 'دهون',
  'tracker.addFood': 'إضافة طعام',
  'tracker.searchPlaceholder': 'ابحث عن طعام جزائري…',
  'tracker.meal.breakfast': 'فطور الصباح',
  'tracker.meal.lunch': 'الغداء',
  'tracker.meal.dinner': 'العشاء',
  'tracker.meal.snack': 'وجبة خفيفة'
};

const dictionaries: Record<SupportedLanguage, Dictionary> = {
  fr,
  ar
};

export const t = (lang: SupportedLanguage, key: LanguageKey) => dictionaries[lang][key] ?? key;

