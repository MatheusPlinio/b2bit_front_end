import Footer from "@/components/landingPage/Footer";
import Header from "@/components/landingPage/Header";
import Hero from "@/components/landingPage/Hero";
import HowItWorks from "@/components/landingPage/HowItWorks";
import Pricing from "@/components/landingPage/Pricing";
import ProblemSection from "@/components/landingPage/ProblemSection";
import SolutionSection from "@/components/landingPage/SolutionSection";

export default function Home() {
  return (
    <main className="flex flex-col items-center w-full">
      <Header />
      <Hero />
      <ProblemSection />
      <SolutionSection />
      <HowItWorks />
      <Pricing />
      <Footer />
    </main>
  );
}
