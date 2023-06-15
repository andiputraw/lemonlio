interface BlogProps {
  logo: string;
  created_at: string;
  heading: string;
  link: string;
  p1: string;
  creator: string;
  tag: string;
  subtag?: string;
}

export function BlogCard(props: BlogProps) {
  const timestamp = new Date(props.created_at);

  return (
    <div class="flex-row sm:flex-none sm:grid sm:grid-cols-8 py-10 border-t border-gray-500">
      <div class="col-span-2 flex-row text-black ">
        <div class="text-xl sm:text-3xl">
          {timestamp.toLocaleDateString().replaceAll("/", "-")}
        </div>
        <br />
        <div class="flex gap-4 text-gray-600">
          <div class="text-lg">{props.tag}</div>
          {props.subtag ? <div class="text-xl">{props.subtag}</div> : <></>}
        </div>
      </div>
      <a class="col-span-6 text-black flex-row" href={`/blog/${props.link}`}>
        <h2 class="text-2xl mb-4">
          {props.heading}
        </h2>
        <p>
          {props.p1}
        </p>
      </a>
    </div>
  );
}
