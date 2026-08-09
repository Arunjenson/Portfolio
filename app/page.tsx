import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import FocusAreas from "@/components/FocusAreas";
import Ticker from "@/components/Ticker";
import Work from "@/components/Work";
import Recognition from "@/components/Recognition";
import Footer from "@/components/Footer";
import TraceLine from "@/components/TraceLine";

export default function Home() {
  return (
    <main className="max-w-5xl mx-auto px-5 sm:px-8 relative">
      <TraceLine />
      <Nav />
      <Hero />
      <div className="border-t border-stone-200 dark:border-stone-800 mb-20 sm:mb-24" />
      <FocusAreas />
      <Ticker />
      <Work />
      <Recognition />
      <Footer />
    </main>
  );
}
