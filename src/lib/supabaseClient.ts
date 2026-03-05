import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const supabaseKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY as string | undefined;

if (!supabaseUrl || !supabaseKey) {
  // eslint-disable-next-line no-console
  console.warn('Supabase environment variables are not set. Auth will be disabled until they are configured.');
}

export const supabase = createClient(supabaseUrl ?? '', supabaseKey ?? '');

