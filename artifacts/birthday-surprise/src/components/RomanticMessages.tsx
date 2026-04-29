import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import bouquetImg from "@/assets/bouquet.png";
import candlesImg from "@/assets/candles.png";

interface RomanticMessagesProps {
  onComplete: () => void;
}

const MESSAGES = [
  "Selamat ulang tahun, sayangku…",
  "Setiap detik bersamamu adalah anugerah terindah.",
  "Kamu adalah alasan senyumku setiap hari…",
  "Duniaku jauh lebih berwarna sejak ada kamu.",
  "Aku selalu bersyukur memilikimu di hidupku.",
  "Semoga kebahagiaan selalu menyertaimu,",
  "Karena kamu pantas mendapatkan segala yang terbaik.",
];

export function RomanticMessages({ onComplete }: RomanticMessagesProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    if (currentIndex < MESSAGES.length - 1) {
      setCurrentIndex(prev => prev + 1);
    } else {
      onComplete();
    }
  };

  return (
    <motion.div 
      className="flex flex-col items-center justify-center min-h-[60vh] w-full cursor-pointer"
      onClick={handleNext}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="relative w-full max-w-2xl aspect-video flex items-center justify-center">
        {/* Decorative background elements based on index */}
        <AnimatePresence mode="popLayout">
          {currentIndex === 2 && (
            <motion.img
              key="bouquet"
              src={bouquetImg}
              initial={{ opacity: 0, scale: 0.8, x: -50, rotate: -10 }}
              animate={{ opacity: 0.4, scale: 1, x: -100, rotate: -5 }}
              exit={{ opacity: 0, transition: { duration: 1 } }}
              transition={{ duration: 2, ease: "easeOut" }}
              className="absolute left-0 bottom-0 w-64 h-64 object-contain pointer-events-none"
              alt="Rose Bouquet"
            />
          )}
          {currentIndex === 4 && (
            <motion.img
              key="candles"
              src={candlesImg}
              initial={{ opacity: 0, scale: 0.8, x: 50, rotate: 10 }}
              animate={{ opacity: 0.4, scale: 1, x: 100, rotate: 5 }}
              exit={{ opacity: 0, transition: { duration: 1 } }}
              transition={{ duration: 2, ease: "easeOut" }}
              className="absolute right-0 bottom-0 w-64 h-64 object-contain pointer-events-none"
              alt="Glowing Candles"
            />
          )}
        </AnimatePresence>

        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, y: 20, filter: "blur(5px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -20, filter: "blur(5px)" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-center z-10 px-6"
          >
            <h2 className="font-cursive text-4xl md:text-6xl lg:text-7xl text-primary drop-shadow-[0_2px_10px_rgba(255,100,150,0.3)] leading-relaxed">
              {MESSAGES[currentIndex]}
            </h2>
          </motion.div>
        </AnimatePresence>
      </div>
      
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.5 }}
        transition={{ delay: 2 }}
        className="absolute bottom-12 text-sm text-foreground/50 font-serif tracking-widest"
      >
        Klik untuk melanjutkan
      </motion.div>
    </motion.div>
  );
}
