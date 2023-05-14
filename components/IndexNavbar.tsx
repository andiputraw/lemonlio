export function Navbar() {
  return (
    <div className="navbar bg-black h-40 sm:h-20 w-screen grid grid-cols-1 sm:grid-cols-2">
      <div className="flex-1 justify-center">
        <a
          className="btn btn-ghost normal-case text-4xl text-white font-bold"
          href={"/"}
        >
          Lemonlio
        </a>
      </div>
      <div className="flex justify-center">
        <ul className="menu menu-horizontal px-1  text-white">
          <li>
            <a href={"/blog"}>Blog</a>
          </li>
          <li tabIndex={0}>
            <a>
              More Stuff
              <svg
                className="fill-current"
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
              >
                <path d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z" />
              </svg>
            </a>
            <ul className="p-2 bg-slate-300 text-black">
              <li>
                <a>Soon</a>
              </li>
            </ul>
          </li>
          <li>
            <a class="mr-4" href={"/about"}>About</a>
          </li>
        </ul>
      </div>
    </div>
  );
}
