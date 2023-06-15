import { Footer, Header, Navbar } from "../../components/Default.tsx";
import { BlogCard } from "../../components/BlogCard.tsx";
import { isLoggedUserIsAdministrator, supabase } from "../../lib/supabase.ts";
import { HandlerContext, Handlers, PageProps } from "$fresh/server.ts";
import { JSX } from "preact";

interface Blog {
  id: number;
  title: string;
  slug: string;
  banner: string;
  category: {
    category: string;
  };
  sub_category: string;
  link: string;
  created_at: string;
}

interface Category {
  category: string;
  id: number;
}

interface Props {
  blog: Blog[];
  category: Category[];
}

const tableSelection =
  "id,title,created_at,slug,category(category),sub_category,link,banner";

async function renderStandard(
  ctx: HandlerContext<Props, Record<string, unknown>>,
  filter_category: string,
) {
  const { data, error } = filter_category
    ? await supabase.from("blog").select(
      tableSelection,
    ).filter(
      "is_published",
      "is",
      true,
    ).filter("category", "eq", filter_category).order("created_at", {
      ascending: false,
    })
    : await supabase.from("blog").select(
      tableSelection,
    ).filter(
      "is_published",
      "is",
      true,
    ).order("created_at", { ascending: false });

  const { data: category, error: errorCategory } = await supabase.from(
    "category",
  ).select("category,id");

  if (error || errorCategory) {
    return ctx.renderNotFound();
  }

  return ctx.render({ blog: data as unknown as Blog[], category: category });
}

async function renderAdmin(
  ctx: HandlerContext<Props, Record<string, unknown>>,
  filter_category: string,
) {
  const { data, error } = filter_category
    ? await supabase.from("blog").select(
      tableSelection,
    ).filter("category", "eq", filter_category).order("created_at", {
      ascending: false,
    })
    : await supabase.from("blog").select(
      tableSelection,
    ).order("created_at", { ascending: false });

  const { data: category, error: errorCategory } = await supabase.from(
    "category",
  ).select("category,id");

  if (error || errorCategory) {
    return ctx.renderNotFound();
  }

  return ctx.render({ blog: data as unknown as Blog[], category: category });
}

export const handler: Handlers<Props> = {
  async GET(req, ctx) {
    const url = new URL(req.url);
    const category = url.searchParams.get("category") || "";

    if (await isLoggedUserIsAdministrator(req)) {
      return renderAdmin(ctx, category);
    }
    return renderStandard(ctx, category);
  },
};

export default function Home({ data }: PageProps<Props>) {
  return (
    <>
      <Header title="Lemonlio | Blog" />
      <div>
        <Navbar />
        <Hero blog={data.blog[0]} />
        <div class="flex-1  bg-slate-100">
          <Blog blogs={data.blog} category={data.category} />
        </div>
      </div>

      <Footer />
    </>
  );
}

function Hero({ blog }: { blog: Blog }) {
  return (
    <div className="hero min-h-screen bg-black">
      <div className="hero-content flex-col lg:flex-row justify-between w-screen">
        <img
          class="w-4/5 h-auto sm:w-2/5 sm:h-auto m-5"
          src={blog.banner ?? "blog/1st_blog.png"}
        />
        <div class="">
          <a href={`/blog/${blog.link}`}>
            <h1 className=" text-lg sm:text-2xl font-bold">
              {blog.title}
            </h1>
            <div class="py-6 text-xl">
              <h2 class="text-base sm:text-xl font-sans font-semibold">
                {blog.slug}
              </h2>
            </div>
          </a>
        </div>
      </div>
    </div>
  );
}

// TODO : Do better typing
function Blog({ blogs, category }: { blogs: Blog[]; category: Category[] }) {
  const blogElement: JSX.Element[] = [];

  for (let i = 0; i < blogs.length; i++) {
    const element = blogs[i];
    blogElement.push(
      <BlogCard
        created_at={element.created_at}
        creator="andiputraw"
        heading={element.title}
        link={element.link}
        logo={element.banner}
        p1={element.slug}
        tag={element.category.category}
        subtag={element.sub_category ?? ""}
      />,
    );
  }

  return (
    <div class="min-h-screen">
      <div class="max-w-screen-md md:max-w-screen-xl mx-auto px-4 sm:px-6 md:px-8 space-y-12">
        <div class="text-center py-16 font-bold text-slate-500 hover:text-slate-700 gap-2 font-sans m-4 flex flex-wrap">
          <a href="/blog">All</a>
          {category.map((v) => (
            <a href={`/blog?category=${v.id}`}>{v.category}</a>
          ))}
        </div>
        <div class="w-full">
          {blogElement}
        </div>
      </div>
    </div>
  );
}
