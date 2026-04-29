import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import giftBoxImg from "@/assets/giftbox.png";
import confetti from "canvas-confetti";

interface GiftBoxProps {
  onComplete: () => void;
}

export function GiftBox({ onComplete }: GiftBoxProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [showButton, setShowButton] = useState(false);

  const handleOpen = () => {
    if (isOpen) return;
    setIsOpen(true);
    
    // Trigger confetti burst
    const end = Date.now() + 2 * 1000;
    const colors = ['#ff69b4', '#ffb6c1', '#ffd700', '#ffffff'];

    (function frame() {
      confetti({
        particleCount: 5,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: colors
      });
      confetti({
        particleCount: 5,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: colors
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    }());

    setTimeout(() => {
      setShowButton(true);
    }, 2000);
  };

  return (
    <motion.div 
      className="flex flex-col items-center justify-center"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, y: -50 }}
      transition={{ duration: 1 }}
    >
      <div className="relative cursor-pointer group" onClick={handleOpen}>
        <motion.div
          animate={isOpen ? { scale: 1.1, opacity: 0 } : { scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="absolute inset-0 bg-primary/20 blur-3xl rounded-full scale-150"
        />
        
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1.5 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="absolute inset-0 bg-secondary/30 blur-3xl rounded-full"
          />
        )}

        <motion.div
          animate={isOpen ? { y: 20, scale: 1.1 } : { y: [0, -10, 0] }}
          transition={isOpen ? { duration: 0.5 } : { duration: 3, repeat: Infinity, ease: "easeInOut" }}
          className="relative z-10"
        >
          <img 
            src={giftBoxImg} 
            alt="Gift Box" 
            className="w-64 h-64 md:w-80 md:h-80 object-contain drop-shadow-[0_0_30px_rgba(255,182,193,0.4)]"
            style={{ filter: isOpen ? "brightness(1.2) sepia(0.2)" : "none" }}
          />
        </motion.div>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: 50, scale: 0.8 }}
              animate={{ opacity: 1, y: -40, scale: 1 }}
              transition={{ delay: 0.5, duration: 1, type: "spring" }}
              className="absolute -top-32 left-1/2 -translate-x-1/2 w-[150%] text-center z-20"
            >
              <h3 className="font-cursive text-4xl md:text-5xl text-secondary drop-shadow-lg">
                Hadiah terindah adalah kamu di sisiku selamanya.
              </h3>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {!isOpen && (
          <motion.p
            exit={{ opacity: 0 }}
            className="mt-8 text-primary font-serif text-xl tracking-wider"
          >
            Buka hadiahmu...
          </motion.p>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showButton && (
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            onClick={(e) => { e.stopPropagation(); onComplete(); }}
            className="mt-16 px-8 py-3 rounded-full bg-primary/20 border border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-colors font-serif tracking-widest uppercase text-sm backdrop-blur-sm z-30 shadow-[0_0_20px_rgba(255,100,150,0.3)]"
          >
            Lanjut
          </motion.button>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
