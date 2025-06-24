
import Image from "next/image";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Needhelp from "./components/Needhelp";

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <Needhelp />

    </main>
  );
}
