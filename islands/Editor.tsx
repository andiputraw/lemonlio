import { useEffect, useRef, useState } from "preact/hooks";
import { editorInterface } from "../propsInterfaces.ts";
import * as rustyMarkdown from "https://deno.land/x/rusty_markdown@v0.4.1/mod.ts";
import * as ammonia from "https://deno.land/x/ammonia@0.3.1/mod.ts";
await ammonia.init();

export default function Editor(props: editorInterface) {
  const timestamp = new Date(props.created_at ?? Date.now());
  const [textAreaValue, setTextAreaValue] = useState("");
  const [category, setCategory] = useState([]);
  const [title, setTitle] = useState(props.title ?? "");
  const [time, setTime] = useState(
    `${timestamp.toLocaleDateString()}`,
  );
  const [banner, setBanner] = useState(props.banner ?? "");

  const inputRef = useRef<HTMLTextAreaElement>(null);
  const previewBtnRef = useRef<HTMLButtonElement>(null);
  const textContainer = useRef<HTMLDivElement>(null);
  const previewRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLInputElement>(null);
  const bannerInputRef = useRef<HTMLInputElement>(null);
  const bannerRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    fetch("/api/category")
      .then((res) => res)
      .then((res) => res.json())
      .then((v) => setCategory(v.data));

    textareaOnChange();
  }, []);

  const textareaOnChange = () => {
    if (inputRef && inputRef.current) {
      const token = rustyMarkdown.tokens(inputRef.current.value);
      const md = rustyMarkdown.html(token);
      ammonia.clean(md);
      setTextAreaValue(md);
    }
  };

  const titleOnChange = () => {
    if (titleRef && titleRef.current) {
      setTitle(titleRef.current.value);
    }
  };

  const bannerOnChange = () => {
    if (bannerInputRef && bannerInputRef.current) {
      setBanner(bannerInputRef.current.value);
    }
  };

  const showPreview = () => {
    if (
      previewBtnRef && previewBtnRef.current && textContainer &&
      textContainer.current && previewRef && previewRef.current && bannerRef &&
      bannerRef.current
    ) {
      // textContainer.current.children[0].classList.toggle("hidden");
      // textContainer.current.children[1].classList.toggle("w-1/2");
      textContainer.current.classList.toggle("flex");
      textContainer.current.classList.toggle("hidden");

      previewRef.current.classList.toggle("hidden");
      previewRef.current.classList.toggle("grid");

      bannerRef.current.classList.toggle("hidden");
    }
  };

  return (
    <>
      <form action="" method="post" class="form-control">
        <div class="grid grid-cols-6 my-2 gap-2">
          <div class="">
            <button
              onClick={showPreview}
              ref={previewBtnRef}
              type="button"
              class="btn btn-accent mx-3"
            >
              <img
                width="24"
                height="24"
                src="https://img.icons8.com/material-outlined/24/visible--v1.png"
                alt="visible--v1"
              />
              Preview
            </button>
            <button
              type="submit"
              class="btn btn-accent mx-3"
            >
              <img
                width="24"
                height="24"
                src="https://img.icons8.com/material-outlined/24/upload--v1.png"
                alt="upload--v1"
              />
              {!props.edit ? "Post" : "Edit"}
            </button>
          </div>
          <select
            class="select select-accent w-full max-w-xs mx-3"
            name="category"
            required
          >
            <option disabled selected>Category</option>
            {category.map((v) => <option value={v[1]}>{v[0]}</option>)}
          </select>

          <input
            type="text"
            placeholder="Sub Category"
            value={props.sub_category}
            name="sub_category"
            class="input input-bordered input-info w-full max-w-xs mx-3"
            required
          />
          <input
            type="text"
            placeholder="Slug"
            value={props.slug}
            name="slug"
            class="input input-bordered input-accent w-full max-w-xs mx-3"
            required
          />
          <input
            type="text"
            placeholder="Title"
            name="title"
            value={props.title}
            ref={titleRef}
            onInput={titleOnChange}
            class="input input-bordered input-accent w-full max-w-xs mx-3"
            required
          />
          <input
            type="text"
            placeholder="Banner-link.jpg"
            ref={bannerInputRef}
            onInput={bannerOnChange}
            value={props.banner}
            name="banner"
            class="input input-bordered input-accent w-full max-w-xs mx-3"
            required
          />

          <label className="label cursor-pointer mx-2">
            <span className="label-text text-white">Publish</span>
            <input
              type="checkbox"
              className="checkbox checkbox-accent"
              name="published"
              checked={props.isPublished}
            />
          </label>

          <input
            type="text"
            placeholder="blog-link (remember to use - as space)"
            name="link"
            class="input input-bordered input-accent w-full max-w-xs mx-3"
            required
            value={props.link}
          />
        </div>
        <div
          class="flex"
          id="text-container"
          ref={textContainer}
        >
          <textarea
            name="content"
            class="w-1/2 min-h-screen bg-black resize-y"
            ref={inputRef}
            onInput={textareaOnChange}
          >
            {props.content ?? "Ini tulisan template"}
          </textarea>

          <div
            class="markdown-body min-h-screen h-fit w-1/2"
            dangerouslySetInnerHTML={{ __html: textAreaValue }}
          >
          </div>
        </div>
        <div>
          <img
            src={banner}
            alt={banner}
            ref={bannerRef}
            class="hidden mx-auto w-full sm:mt-0 max-h-80 object-none object-top"
          />
        </div>
        <div class="hidden grid-cols-12 h-fit " ref={previewRef}>
          <div class="col-span-3 bg-markdown-body">
          </div>

          <div class="col-span-6 bg-markdown-body">
            <div class="">
              <h1 class="mt-12 mb-4 text-4xl font-bold text-white sm:text-5xl font-display">
                {title}
              </h1>
              <p class="my-2">{time}</p>
              <p>andiputraw</p>
            </div>
            <br class="my-20" />
            <div
              class="p-4 markdown-body "
              dangerouslySetInnerHTML={{ __html: textAreaValue }}
            >
            </div>
          </div>

          <div class="col-span-3 bg-markdown-body ">
          </div>
        </div>
      </form>
    </>
  );
}
