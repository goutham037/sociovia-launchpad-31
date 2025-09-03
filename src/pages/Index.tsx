import Hero from "@/components/Hero";
import About from "@/components/About";
import Features from "@/components/Features";
import Comparison from "@/components/Comparison";
import HowItWorks from "@/components/HowItWorks";
import EarlyAccess from "@/components/EarlyAccess";
import ComingSoonBanner from "@/components/ComingSoonBanner";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <main className="min-h-screen">
      <Hero />
      <About />
      <Features />
      <Comparison />
      <HowItWorks />
      <EarlyAccess />
      <ComingSoonBanner />
      <Footer />
    </main>
  );
};

export default Index;
