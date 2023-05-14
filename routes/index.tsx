import { Head } from "$fresh/runtime.ts";
import { Navbar } from "../components/IndexNavbar.tsx";
import { HeroIndex } from "../components/HeroIndex.tsx";
import { Footer } from "../components/Footer.tsx";
export default function Home() {
  return (
    <>
      <Head>
        <title>Fresh App</title>
        <link
          href="https://cdn.jsdelivr.net/npm/daisyui@2.51.6/dist/full.css"
          rel="stylesheet"
          type="text/css"
        />
        <link rel="stylesheet" href="/styles.css" />
      </Head>

      <div class="">
        <Navbar />
        <HeroIndex />
      </div>
      <Footer />
    </>
  );
}
