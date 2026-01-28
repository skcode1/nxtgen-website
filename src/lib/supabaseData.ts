import { getSupabaseClient } from "@/lib/supabaseClient";

export async function fetchTable<T>(table: string, orderColumn?: string) {
  const supabase = getSupabaseClient();
  if (!supabase) return null;

  const query = supabase.from(table).select("*");
  const { data, error } = orderColumn
    ? await query.order(orderColumn, { ascending: true, nullsFirst: false })
    : await query;

  if (error) {
    console.error(`Supabase fetch error for ${table}:`, error);
    return null;
  }

  return data as T[];
}
