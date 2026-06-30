import { createClient as createSupabaseClient } from "@supabase/supabase-js";

// Used only in generateStaticParams (build-time), which runs OUTSIDE
// any HTTP request context. Calling next/headers' cookies() there throws,
// so this plain client (no cookie/session handling) is used instead.
// Safe because it only ever reads public, already-published articles.
export function createStaticClient() {
  return createSupabaseClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}
