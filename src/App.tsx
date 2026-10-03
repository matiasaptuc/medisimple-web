import { MotionConfig } from "motion/react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import VideoSection from "./components/VideoSection";
import ProblemSection from "./components/ProblemSection";
import Process from "./components/Process";
import AcrSection from "./components/AcrSection";
import Measurement from "./components/Measurement";
import Comparison from "./components/Comparison";
import Logos from "./components/Logos";
import FinalCta from "./components/FinalCta";
import Footer from "./components/Footer";
import WhatsAppButton from "./components/WhatsAppButton";

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <div className="min-h-screen bg-white text-slate-900 font-sans selection:bg-brand-primary/30">
        <Navbar />
        <main>
          <Hero />
          <VideoSection />
          <ProblemSection />
          <AcrSection />
          <Process />
          <Measurement />
          <Comparison />
          <Logos />
          <FinalCta />
        </main>
        <Footer />
        <WhatsAppButton />
      </div>
    </MotionConfig>
  );
}
