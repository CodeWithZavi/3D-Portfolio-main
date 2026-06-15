import { useEffect, useState } from "react";
import dynamic from "next/dynamic";

import {
  About,
  Contact,
  Experience,
  Hero,
  Navbar,
  Tech,
  Works,
  Achievements,
  ChatBot,
} from "@/components";
import HeroBackground from "@/components/HeroBackground";
import VoiceButton from "@/components/VoiceButton";
import UpArrow from "./../public/assets/icons/up-arrow.svg";
import Services from "@/components/Services";

// Lazy load 3D canvases (they are large GLTF files — don't block initial render)
const StarsCanvas = dynamic(() => import("@/components/canvas").then((m) => m.StarsCanvas), { ssr: false });
const EarthContainer = dynamic(() => import("@/components/EarthContainer"), { ssr: false });
const PlayerContainer = dynamic(() => import("@/components/PlayerContainer"), { ssr: false });

function App({ loading }) {
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, []);

  const [isMobile, setIsMobile] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const [isTalking, setIsTalking] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 768px)");
    setIsMobile(mediaQuery.matches);
    const handler = (e) => setIsMobile(e.matches);
    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, []);

  const handleVoiceTranscript = (transcript) => {
    setChatOpen(true);
    window.dispatchEvent(new CustomEvent("voiceTranscript", { detail: transcript }));
  };

  return (
    <main className="relative z-0 w-full h-full">
      <div className=" bg-cover bg-no-repeat bg-center">
        <Navbar />
        <HeroBackground />
        <Hero loading={loading} isMobile={isMobile} />
      </div>
      <section className="relative z-0 flex md:flex-row flex-col-reverse w-full h-full overflow-hidden">
        <About />
        {!isMobile && <PlayerContainer isMobile={isMobile} isTalking={isTalking} />}
      </section>
      <Services />
      <Experience />
      <Tech />
      <Works />
      <Achievements />
      {/* <Feedbacks /> */}
      <section className="relative z-0 flex md:flex-row justify-between flex-col-reverse w-full h-full overflow-x-hidden sm:p-8 p-2 pb-8">
        <Contact />
        <EarthContainer isMobile={isMobile} />
        <StarsCanvas />
      </section>

      {/* Scroll to top */}
      <button
        onClick={() => {
          window.scrollTo({
            top: 0,
            left: 0,
            behavior: "smooth",
          });
        }}
        className="fixed md:w-10 md:h-10 h-8 w-8 p-2 bottom-8 md:right-10 right-24 text-center text-secondary backdrop-filter backdrop-blur-xl bg-opacity-20 bg-tertiary rounded-lg hover:scale-110 transition-all duration-300 z-40"
      >
        <UpArrow />
      </button>

      {/* Voice Button */}
      <VoiceButton onTranscript={handleVoiceTranscript} isChatOpen={chatOpen} />

      {/* AI ChatBot */}
      <ChatBot
        isOpen={chatOpen}
        onClose={() => setChatOpen(false)}
        onToggle={() => setChatOpen((prev) => !prev)}
        onStreamingChange={setIsTalking}
      />
    </main>
  );
}

export default App;
