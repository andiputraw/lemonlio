import { Handlers, PageProps } from "$fresh/server.ts";
import { getUserFromSession, supabaseSSR } from "../lib/supabase.ts";

import { Footer, Header, Navbar } from "../components/Default.tsx";

interface LoginPage {
  error?: string;
}

export const handler: Handlers<LoginPage> = {
  async GET(req, ctx) {
    const user = await getUserFromSession(req);
    if (user) {
      return new Response("", {
        status: 303,
        headers: {
          Location: "/",
        },
      });
    }

    return await ctx.render({});
  },
  //@ts-ignore: This thing give me weird error even though its working fine
  async POST(req, ctx) {
    const form = await req.formData();

    const url = new URL(req.url);
    const res = new Response();
    const sup = supabaseSSR(req, res);

    if (form.get("oauth") === "github") {
      const github = await sup.auth.signInWithOAuth({
        provider: "github",
        options: {
          redirectTo: `${url.origin}/callback`,
        },
      });

      const headers = res.headers;
      if (!github.error) {
        headers.append("Location", github.data.url);
        return new Response("", {
          status: 303,
          headers,
        });
      }
      return await ctx.render({ error: github?.error?.message });
    }
  },
};

export default function loginPage(props: PageProps<LoginPage>) {
  return (
    <>
      <Header title="Lemonlio | Login" />
      <Navbar />
      <div>
        <div className="hero min-h-screen bg-base-200">
          <div className="hero-content text-center">
            <div className="max-w-md">
              <h1 class="text-5xl font-bold">
                This action need more information
              </h1>
              <h2 className="text-5xl font-bold">
                Select prefered way to login
              </h2>
              <p className="py-6">
              </p>
              <form method="post">
                <input type="hidden" name="oauth" value="github" />
                <button type="input" className="btn btn-primary">
                  <img
                    src={"github.svg"}
                    alt="github logo"
                    class="w-10 h-10 mr-2"
                  />{" "}
                  Login with github
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
