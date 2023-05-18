import { Footer, Header, Navbar } from "../components/Default.tsx";

export default function Home() {
  return (
    <>
      <Header title="Lemonlio | Blog" />
      <Navbar />

      <section class="min-h-screen hero">
        <div class="">
          <h1 class="text-4xl">This page is not ready yet</h1>
          <a class="text-xl" href="/">
            <h4>Back</h4>
          </a>
        </div>
      </section>

      <Footer />
    </>
  );
}
