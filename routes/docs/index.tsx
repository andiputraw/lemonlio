import { Footer, Header, Navbar } from "../../components/Default.tsx";
import Soon from "../../components/Soon.tsx";

export default function index() {
  return (
    <>
      <Header title="Lemonlio | docs" />
      <Navbar />
      <Soon />
      <Footer />
    </>
  );
}
