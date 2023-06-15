import { Footer, Header, Navbar } from "../components/Default.tsx";

export default function loginPage() {
  return (
    <>
      <Header title="Lemonlio | Login" />
      <Navbar />
      <div>
        <div className="hero min-h-screen bg-base-200">
          <div className="hero-content text-center">
            <div className="max-w-md">
              <h1 class="text-3xl font-bold">
                Sorry you dont have permission to do this action
              </h1>
              <a
                href="/"
                className="text-xl font-bold text-cyan-200 hover:text-cyan-300"
              >
                Go back to main page
              </a>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
