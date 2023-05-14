import { Head } from "$fresh/runtime.ts";
import { Navbar } from "../components/Navbar.tsx";
import { HeroAbout } from "../components/HeroAbout.tsx";
import { Progress } from "../components/Progress.tsx";
import { ProgrammingCard } from "../components/ProgrammingCard.tsx";
import { ProjectCard } from "../components/ProjectCard.tsx";
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
        <HeroAbout />
        <div class="flex-1 bg-slate-100">
          <Skill />
          <Learning />
          <Project />
        </div>
      </div>
      <Footer />
    </>
  );
}

function Skill() {
  return (
    <div class="max-w-screen-md mx-auto px-4 sm:px-6 md:px-8 space-y-12">
      <h2 class="text-7xl text-center py-16 font-bold text-black font-sans">
        My Skill
      </h2>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Progress logo={"nodejs.svg"} value={75} />
        <Progress logo={"go.svg"} value={50} />
        <Progress logo={"php.png"} value={60} />
        <Progress logo={"rust.svg"} value={35} />
      </div>
    </div>
  );
}

function Learning() {
  return (
    <div class="max-w-screen-md mx-auto px-4 sm:px-6 md:px-8 space-y-12">
      <h2 class="text-7xl text-center py-16 font-bold text-black font-sans">
        Want to learn
      </h2>
      <div class="">
        <ProgrammingCard
          logo="haskell.svg"
          heading="Haskell"
          p1="Expanding my mind to functional programming"
          p2="Good for CP (i guess)"
        />
        <ProgrammingCard
          logo="c.svg"
          heading="C Programming Language"
          p1="Imperative low level language"
          p2="used to handle low level issues"
        />
      </div>
    </div>
  );
}

function Project() {
  return (
    <div class="max-w-screen-md md:max-w-screen-xl mx-auto px-4 sm:px-6 md:px-8 space-y-12">
      <h2 class="text-7xl text-center py-16 font-bold text-black font-sans">
        My Project
      </h2>
      <div class="grid grid-cols-1 md:grid-cols-2">
        <ProjectCard
          logo="github.svg"
          heading="lemonlio (This Website)"
          p1="Portofolio | Blog | Documentation | Lab"
          p2=""
          link=""
          completed={false}
        />
        <ProjectCard
          logo="tandichat.png"
          heading="Tandichat"
          p1="Realtime Chat App using React and Golang"
          p2="Im doing the backend works"
          link="https://github.com/Taufik1310/Tandichat"
          completed={false}
        />
        <ProjectCard
          logo="github.svg"
          heading="Bahat"
          p1="File search engine based on sublime text fuzzy search"
          link="https://github.com/andiputraw/Bahat"
          completed={true}
        />
        <ProjectCard
          logo="github.svg"
          heading="Typescript Rest Api"
          p1="RestfulAPI project for training purpose"
          link="https://github.com/andiputraw/Rest-Api-Typescript-latihan"
          completed={true}
        />
      </div>
    </div>
  );
}
