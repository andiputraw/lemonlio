import { Head } from "$fresh/runtime.ts";
import { Progress } from "../components/Progress.tsx";
import { ProgrammingCard } from "../components/ProgrammingCard.tsx";
import { ProjectCard } from "../components/ProjectCard.tsx";
import { Footer, Header, Navbar } from "../components/Default.tsx";

export default function Home() {
  return (
    <>
      <Header title="Lemonlio | About"></Header>

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

function HeroAbout() {
  return (
    <div className="hero min-h-screen bg-black">
      <div className="hero-content flex-col lg:flex-row-reverse justify-between w-screen">
        <img
          class="rounded-lg w-64 h-64"
          src={"rahmat.png"}
          className="max-w-sm rounded-lg shadow-2xl"
        />
        <div class="">
          <h1 className="text-xl sm:text-5xl font-bold">Andi Putra Wijaya</h1>
          <div class="py-6 text-base sm:text-2xl">
            <h2 class="text-base sm:text-3xl font-sans font-semibold">
              SMKN 13 Bandung
            </h2>
            <h2 class="text-base sm:text-3xl font-sans font-semibold">
              Hobbiyist Programmer | Backend Programmer
            </h2>
            <h2 class="text-base sm:text-3xl font-sans font-semibold">
              Unemployeed
            </h2>
            <br />
            <h2 class="text-base sm:text-2xl font-sans">Link</h2>
            <ul class="menu bg-dark menu-vertical sm:menu-horizontal rounded-box">
              <li>
                <a
                  class=" hover:bordererd text-white"
                  href="https://github.com/andiputraw"
                >
                  Github
                </a>
              </li>
              <li>
                <a
                  class=" hover:bordererd text-white"
                  href="https://www.facebook.com/profile.php?id=100031311411828"
                >
                  Facebook
                </a>
              </li>
              <li>
                <a
                  class=" hover:bordererd text-white"
                  href="https://discord.gg/b6XpZRcaFh"
                >
                  Discord Server
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

function Skill() {
  return (
    <div class="max-w-screen-md mx-auto px-4 sm:px-6 md:px-8 space-y-12">
      <h2 class="text-7xl text-center py-16 font-bold text-black font-sans">
        My Skill
      </h2>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Progress
          logo={"nodejs.svg"}
          highlight={["Express", "NestJS", "Typescript"]}
        />
        <Progress logo={"go.svg"} highlight={["Gorm", "Gin", "Fiber"]} />
        <Progress logo={"php.png"} highlight={["Laravel"]} />
        <Progress logo={"rust.svg"} highlight={["Rocket"]} />
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
