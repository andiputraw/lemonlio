import { Handlers } from "$fresh/server.ts";
import { setAuthCookie, supabase, supabaseSSR } from "../lib/supabase.ts";

export const handler: Handlers = {
  //@ts-ignore : This thing give me weird error even though its working fine
  async GET(req, ctx) {
    const res = new Response();
    const sup = supabaseSSR(req, res);
    const url = new URL(req.url);
    const code = url.searchParams.get("code");

    if (typeof code == "string") {
      const { data, error } = await sup.auth.exchangeCodeForSession(code);

      if (error) {
        return new Response("", {
          status: 303,
          headers: {
            Location: "/login",
          },
        });
      }

      const session = data?.session;
      if (session?.access_token && session.refresh_token) {
        const user = await supabase.auth.getUser(session.access_token);
        if (!user.error) {
          const response = new Response("", {
            status: 303,
            headers: {
              Location: "/",
            },
          });

          setAuthCookie(response, session.refresh_token, session.access_token);
          return response;
        }
      }

      return ctx.render({});
    }
  },
};
