export function HeroAbout() {
  return (
    <div className="hero min-h-screen bg-black">
      <div className="hero-content flex-col lg:flex-row-reverse justify-between w-screen">
        <img
          class="rounded-lg w-64 h-64"
          src={"rahmat.png"}
          className="max-w-sm rounded-lg shadow-2xl"
        />
        <div class="">
          <h1 className="text-5xl font-bold">Andi Putra Wijaya</h1>
          <div class="py-6 text-2xl">
            <h2 class="text-3xl font-sans font-semibold">
              SMKN 13 Bandung
            </h2>
            <h2 class="text-3xl font-sans font-semibold">
              Hobbiyist Programmer | Backend Programmer
            </h2>
            <h2 class="text-3xl font-sans font-semibold">
              Unemployeed
            </h2>
            <br />
            <h2 class="text-2xl font-sans">Link</h2>
            <ul class="menu bg-neutral-800 menu-vertical sm:menu-horizontal rounded-box">
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
