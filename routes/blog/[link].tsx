import { Footer, Header, Navbar } from "../../components/Default.tsx";
import { isLoggedUserIsAdministrator, supabase } from "../../lib/supabase.ts";

import { Handlers, PageProps } from "$fresh/server.ts";
import { renderInterface } from "../../propsInterfaces.ts";
import BlogRender from "../../islands/BlogRender.tsx";

interface blog {
  render: renderInterface;
  isAdmin: boolean;
}

export const handler: Handlers<blog> = {
  async GET(req, ctx) {
    const blog: renderInterface = {
      content: "",
      error: false,
      time: "",
      title: "",
      banner: "",
    };

    const { link } = ctx.params;
    const { data, error } = await supabase.from("blog").select(
      "content,title,created_at,banner",
    ).filter("link", "eq", link);

    if (error || data === null) {
      blog.error = true;
    }

    if (data !== null) {
      const singleBlog = data[0];
      blog.content = singleBlog.content;
      blog.time = singleBlog.created_at;
      blog.title = singleBlog.title;
      blog.banner = singleBlog.banner;
    }

    const isAdmin = await isLoggedUserIsAdministrator(req);

    return await ctx.render({ render: blog, isAdmin });
  },
};

export default function Main({ data, params }: PageProps<blog>) {
  return (
    <>
      <Header title={`Lemonlio | ${params.link}`} css="markdown.css" />
      <Navbar />
      <BlogRender
        content={data.render.content}
        error={data.render.error}
        time={data.render.time}
        title={data.render.title}
        banner={data.render.banner}
      />
      {data.isAdmin
        ? (
          <div class="bg-base-100 grid grid-cols-12 py-6">
            <div class="col-span-3"></div>
            <div class="col-span-6">
              <a href={`/blog/edit/${params.link}`}>Edit this page</a>
            </div>
          </div>
        )
        : <></>}

      <Footer />
    </>
  );
}
