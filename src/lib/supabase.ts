/**
 * Supabase Database Client & Persistent Sync Service
 * Handles persistence for HubSpot records, Events, RSVPs, and Memberships.
 */

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export function isSupabaseConfigured(): boolean {
  return !!(SUPABASE_URL && SUPABASE_KEY && !SUPABASE_URL.includes("your-project"));
}

/**
 * Upsert records into a Supabase table via PostgREST API
 */
export async function supabaseUpsert<T extends Record<string, unknown>>(
  table: string,
  records: T[],
  onConflict = "id"
): Promise<{ success: boolean; count: number; error?: string }> {
  if (!isSupabaseConfigured() || !records.length) {
    return { success: true, count: records.length };
  }

  const endpoint = `${SUPABASE_URL}/rest/v1/${table}?on_conflict=${onConflict}`;

  try {
    const res = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        apikey: SUPABASE_KEY!,
        Authorization: `Bearer ${SUPABASE_KEY}`,
        Prefer: "resolution=merge-duplicates",
      },
      body: JSON.stringify(records),
    });

    if (res.ok) {
      return { success: true, count: records.length };
    }

    const errText = await res.text();
    console.warn(`Supabase upsert to ${table} failed:`, errText);
    return { success: false, count: 0, error: errText };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Network error";
    console.warn(`Supabase connection error for ${table}:`, message);
    return { success: false, count: 0, error: message };
  }
}

/**
 * Fetch records from a Supabase table
 */
export async function supabaseSelect<T>(
  table: string,
  query = "select=*&order=created_at.desc"
): Promise<T[] | null> {
  if (!isSupabaseConfigured()) {
    return null;
  }

  const endpoint = `${SUPABASE_URL}/rest/v1/${table}?${query}`;

  try {
    const res = await fetch(endpoint, {
      headers: {
        apikey: SUPABASE_KEY!,
        Authorization: `Bearer ${SUPABASE_KEY}`,
      },
      next: { revalidate: 60 },
    });

    if (res.ok) {
      return (await res.json()) as T[];
    }
    return null;
  } catch {
    return null;
  }
}
