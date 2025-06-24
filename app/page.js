
import Image from "next/image";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Needhelp from "./components/Needhelp";
import Counter from "./components/Counter";

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <Needhelp />
      <Counter />

    </main>
  );
}
