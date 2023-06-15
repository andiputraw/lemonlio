const CONFIG = {
  SUPABASE_URL: Deno.env.get("SUPABASE_URL") ?? "",
  SUPABASE_KEY: Deno.env.get("SUPABASE_KEY") ?? "",
};

export default CONFIG;
