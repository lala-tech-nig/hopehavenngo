
import Image from "next/image";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Needhelp from "./components/Needhelp";
import Counter from "./components/Counter";
import Contact from "./components/Contact";
import Event from "./components/Event";
import Slider from "./components/Slider";
import Footer from "./components/Footer";
import Testimonies from "./components/Testimonies";
import Team from "./components/Team";

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <Needhelp />
      <Slider />
      <Counter />
      <Event />
      <Testimonies />
      <Team />
      <Contact />
      <Footer />

    </main>
  );
}
