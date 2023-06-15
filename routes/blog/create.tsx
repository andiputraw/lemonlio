import { Footer, Header, Navbar } from "../../components/Default.tsx";
import {
  getAccessTokenFromSession,
  getUserFromSession,
  supabase,
} from "../../lib/supabase.ts";
import Editor from "../../islands/Editor.tsx";
import logger from "../../lib/logger.ts";

import { Handlers, PageProps } from "$fresh/server.ts";

export const handler: Handlers = {
  async GET(_req, ctx) {
    return await ctx.render();
  },
  async POST(req, _ctx) {
    const user = await getUserFromSession(req);
    const token = getAccessTokenFromSession(req);
    const headers = new Headers();

    if (!user || !token) {
      headers.set("location", "/login");
      return new Response("", {
        status: 303,
        headers,
      });
    }
    logger.info(`INFO: ${user.id} is creating a post`);

    const data = await req.formData();

    const isAdmin = await supabase.from("user_role").select("*").filter(
      "user_id",
      "eq",
      user.id,
    ).filter("roles_id", "eq", "2");

    if (!isAdmin.data) {
      headers.set("location", "/unauthorized");
      return new Response("", {
        status: 303,
        headers,
      });
    }

    const blog = {
      title: data.get("title"),
      slug: data.get("slug"),
      content: data.get("content"),
      creator: user.id,
      category: data.get("category"),
      sub_category: data.get("sub_category"),
      banner: data.get("banner"),
      is_published: data.get("published"),
      link: data.get("link"),
    };

    await supabase.from("blog").insert([blog]);

    headers.set("location", "/blog");
    return new Response("", {
      status: 303,
      headers,
    });
  },
};

export default function Home({ data }: PageProps) {
  return (
    <>
      <Header title="Lemonlio | Create blog" css={"/blog/markdown.css"} />
      <div>
        <Navbar />
        <Editor />
      </div>
      <Footer />
    </>
  );
}
