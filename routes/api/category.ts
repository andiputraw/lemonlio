import { HandlerContext } from "$fresh/server.ts";
import { supabase } from "../../lib/supabase.ts";

export const handler = async (
  _req: Request,
  _ctx: HandlerContext,
): Promise<Response> => {
  const { data, error } = await supabase.from("category").select();

  const body = !error
    ? {
      data: data.map((v) => [v.category, v.id]),
      code: 200,
    }
    : {
      code: 500,
      error: error,
    };

  return new Response(JSON.stringify(body));
};
