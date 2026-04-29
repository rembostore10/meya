import React, { useState, useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Opening } from "./Opening";
import { RomanticMessages } from "./RomanticMessages";
import { PhotoGallery } from "./PhotoGallery";
import { GiftBox } from "./GiftBox";
import { BirthdayCake } from "./BirthdayCake";
import { PrayerForm } from "./PrayerForm";
import { FinalMessage } from "./FinalMessage";
import { ParticleBackground } from "./ParticleBackground";
import { Volume2, VolumeX } from "lucide-react";
import sceneryImg from "@/assets/scenery.png";

type Stage =
  | "opening"
  | "messages"
  | "gallery"
  | "gift"
  | "cake"
  | "prayer"
  | "final";

export function Experience() {
  const [stage, setStage] = useState<Stage>("opening");
  const [isMuted, setIsMuted] = useState(true);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // We create a silent audio element just to have the structure, 
    // user requested "soft background music or chime sounds for interactions"
    // Since we don't have a reliable free music URL, we'll just simulate the state
    // But we'll add a beautiful ambient track if we had one.
  }, []);

  const handleNextStage = (nextStage: Stage) => {
    setStage(nextStage);
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
    }
  };

  return (
    <div className="relative min-h-[100dvh] w-full overflow-hidden flex items-center justify-center">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src={sceneryImg} 
          alt="Night Sky" 
          className="w-full h-full object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/60 to-background/90" />
      </div>

      <ParticleBackground />

      <main className="relative z-10 w-full max-w-4xl mx-auto px-4 py-8 flex flex-col items-center justify-center min-h-[100dvh]">
        <AnimatePresence mode="wait">
          {stage === "opening" && (
            <Opening key="opening" onOpen={() => handleNextStage("messages")} />
          )}
          {stage === "messages" && (
            <RomanticMessages key="messages" onComplete={() => handleNextStage("gallery")} />
          )}
          {stage === "gallery" && (
            <PhotoGallery key="gallery" onComplete={() => handleNextStage("gift")} />
          )}
          {stage === "gift" && (
            <GiftBox key="gift" onComplete={() => handleNextStage("cake")} />
          )}
          {stage === "cake" && (
            <BirthdayCake key="cake" onComplete={() => handleNextStage("prayer")} />
          )}
          {stage === "prayer" && (
            <PrayerForm key="prayer" onComplete={() => handleNextStage("final")} />
          )}
          {stage === "final" && (
            <FinalMessage key="final" onRestart={() => setStage("opening")} />
          )}
        </AnimatePresence>
      </main>

      {/* Audio Control */}
      <button
        onClick={toggleMute}
        className="fixed bottom-6 right-6 z-50 p-3 rounded-full bg-background/50 backdrop-blur-md border border-primary/20 text-primary-foreground hover:bg-primary/20 transition-colors shadow-[0_0_15px_rgba(255,100,150,0.2)]"
        aria-label={isMuted ? "Unmute" : "Mute"}
      >
        {isMuted ? <VolumeX className="w-5 h-5 text-primary" /> : <Volume2 className="w-5 h-5 text-primary" />}
      </button>
    </div>
  );
}
