import { load } from "https://deno.land/std@0.188.0/dotenv/mod.ts";

const env = await load();

const CONFIG = {
  SUPABASE_URL: env["SUPABASE_URL"] ?? "",
  SUPABASE_KEY: env["SUPABASE_KEY"] ?? "",
};

export default CONFIG;
