import { Footer, Header, Navbar } from "../../../components/Default.tsx";
import {
  getAccessTokenFromSession,
  getUserFromSession,
  isLoggedUserIsAdministrator,
  supabase,
} from "../../../lib/supabase.ts";
import Editor from "../../../islands/Editor.tsx";
import logger from "../../../lib/logger.ts";
import { editorInterface } from "../../../propsInterfaces.ts";
import { Handlers, PageProps } from "$fresh/server.ts";

interface props {
  editor: editorInterface;
}

export const handler: Handlers<props> = {
  async GET(req, ctx) {
    const { link } = ctx.params;

    if (!await isLoggedUserIsAdministrator(req)) {
      return await ctx.renderNotFound();
    }

    const { data, error } = await supabase.from("blog").select(
      "title,slug,content,link,created_at,sub_category,banner,is_published",
    ).eq("link", link);

    if (error || data === null) {
      return await ctx.renderNotFound();
    }
    const props: editorInterface = data[0];
    return await ctx.render({ editor: props });
  },
  async POST(req, ctx) {
    const { link } = ctx.params;
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
    logger.info(`INFO: ${user.id} is updating a post`);

    const data = await req.formData();

    if (!await isLoggedUserIsAdministrator(req)) {
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
      is_published: data.get("published") || false,
      link: data.get("link"),
    };

    await supabase
      .from("blog")
      .update(blog)
      .eq(
        "link",
        link,
      );

    headers.set("location", `/blog/${link}`);
    return new Response("", {
      status: 303,
      headers,
    });
  },
};

export default function Home({ data }: PageProps<props>) {
  const { editor } = data;
  return (
    <>
      <Header title="Lemonlio | Create blog" css={"/blog/markdown.css"} />
      <div>
        <Navbar />
        <Editor
          banner={editor.banner}
          content={editor.content}
          created_at={editor.created_at}
          isPublished={editor.isPublished}
          link={editor.link}
          slug={editor.slug}
          sub_category={editor.sub_category}
          title={editor.title}
          edit={true}
        />
      </div>
      <Footer />
    </>
  );
}
