import { useEffect, useState } from "preact/hooks";
import * as rustyMarkdown from "rustyMarkdown";
import * as ammonia from "ammonia";
import { renderInterface } from "../propsInterfaces.ts";
await ammonia.init();

export default function BlogRender(props: renderInterface) {
  const [content, setContent] = useState("");

  const timestamp = new Date(props.time);

  if (props.error) {
    setContent("Some error happened, maybe something happened in our back?");
  } else {
    useEffect(() => {
      const token = rustyMarkdown.tokens(props.content);
      const html = rustyMarkdown.html(token);
      const safeHtml = ammonia.clean(html);
      setContent(safeHtml);
    }, []);
  }

  return (
    <>
      <div class="pt-5">
        <img
          src={props.banner}
          alt={props.banner}
          class=" mx-auto w-full sm:mt-0 max-h-80 object-none object-top"
        />
      </div>
      <div class="max-w-screen-md px-4 pt-8 pb-16 md:pt-16 mx-auto ">
        <div class=" bg-base-100">
          <div class="">
            <h1 class="mt-12 mb-4 text-4xl font-bold text-white sm:text-5xl font-display">
              {props.title}
            </h1>
            <p class="my-2">{timestamp.toLocaleDateString()}</p>
            <p>andiputraw</p>
          </div>
          <br class="my-20" />
          <div
            class="py-10 markdown-body "
            dangerouslySetInnerHTML={{ __html: content }}
          >
          </div>
        </div>
      </div>
    </>
  );
}
