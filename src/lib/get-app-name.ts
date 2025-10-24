import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function getAppName(): Promise<string> {
  try {
    const { data, error } = await supabase
      .from('demo_system_config')
      .select('config_value')
      .eq('config_key', 'app_name')
      .single();

    if (error || !data) {
      console.warn('App name not found in database, using default');
      return process.env.NEXT_PUBLIC_APP_NAME || "TR Flashcard";
    }

    return data.config_value as string;
  } catch (error) {
    console.error('Error fetching app name:', error);
    return process.env.NEXT_PUBLIC_APP_NAME || "TR Flashcard";
  }
}
