import React from "react";
import { motion } from "framer-motion";
import envelopeImg from "@/assets/envelope.png";

interface OpeningProps {
  onOpen: () => void;
}

export function Opening({ onOpen }: OpeningProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
      transition={{ duration: 1.2, ease: "easeOut" }}
      className="flex flex-col items-center justify-center cursor-pointer group"
      onClick={onOpen}
    >
      <motion.div
        animate={{ 
          y: [0, -10, 0],
        }}
        transition={{ 
          duration: 4, 
          repeat: Infinity, 
          ease: "easeInOut" 
        }}
        className="relative"
      >
        <div className="absolute inset-0 rounded-full bg-primary/20 blur-3xl scale-150 group-hover:bg-primary/30 transition-colors duration-700" />
        <img 
          src={envelopeImg} 
          alt="Surprise Envelope" 
          className="w-64 h-64 md:w-80 md:h-80 object-contain drop-shadow-2xl z-10 relative"
        />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 1 }}
        className="mt-8 text-center"
      >
        <motion.p 
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="text-primary font-serif text-xl md:text-2xl tracking-wider"
        >
          Klik untuk membuka kejutan…
        </motion.p>
      </motion.div>
    </motion.div>
  );
}
