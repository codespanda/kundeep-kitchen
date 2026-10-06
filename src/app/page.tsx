import Hero from "@/components/Hero";
import Specialties from "@/components/Specialties";
import About from "@/components/About";
import Gallery from "@/components/Gallery";
import Reviews from "@/components/Reviews";
import CtaBanner from "@/components/CtaBanner";

export default function Home() {
  return (
    <main className="overflow-x-hidden">
      <Hero />
      <Specialties />
      <About />
      <Gallery />
      <Reviews />
      <CtaBanner />
    </main>
  );
}
