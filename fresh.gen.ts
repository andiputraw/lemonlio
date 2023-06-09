// DO NOT EDIT. This file is generated by fresh.
// This file SHOULD be checked into source version control.
// This file is automatically updated during development when running `dev.ts`.

import config from "./deno.json" assert { type: "json" };
import * as $0 from "./routes/_404.tsx";
import * as $1 from "./routes/about.tsx";
import * as $2 from "./routes/api/category.ts";
import * as $3 from "./routes/api/joke.ts";
import * as $4 from "./routes/blog/[link].tsx";
import * as $5 from "./routes/blog/create.tsx";
import * as $6 from "./routes/blog/edit/[link].tsx";
import * as $7 from "./routes/blog/index.tsx";
import * as $8 from "./routes/callback.tsx";
import * as $9 from "./routes/docs/index.tsx";
import * as $10 from "./routes/index.tsx";
import * as $11 from "./routes/labs/index.tsx";
import * as $12 from "./routes/login.tsx";
import * as $13 from "./routes/unauthorized.tsx";
import * as $$0 from "./islands/BlogRender.tsx";
import * as $$1 from "./islands/Counter.tsx";
import * as $$2 from "./islands/Editor.tsx";

const manifest = {
  routes: {
    "./routes/_404.tsx": $0,
    "./routes/about.tsx": $1,
    "./routes/api/category.ts": $2,
    "./routes/api/joke.ts": $3,
    "./routes/blog/[link].tsx": $4,
    "./routes/blog/create.tsx": $5,
    "./routes/blog/edit/[link].tsx": $6,
    "./routes/blog/index.tsx": $7,
    "./routes/callback.tsx": $8,
    "./routes/docs/index.tsx": $9,
    "./routes/index.tsx": $10,
    "./routes/labs/index.tsx": $11,
    "./routes/login.tsx": $12,
    "./routes/unauthorized.tsx": $13,
  },
  islands: {
    "./islands/BlogRender.tsx": $$0,
    "./islands/Counter.tsx": $$1,
    "./islands/Editor.tsx": $$2,
  },
  baseUrl: import.meta.url,
  config,
};

export default manifest;
