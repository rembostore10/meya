import React from "react";
import { motion } from "framer-motion";
import { Heart } from "lucide-react";

interface FinalMessageProps {
  onRestart: () => void;
}

export function FinalMessage({ onRestart }: FinalMessageProps) {
  return (
    <motion.div
      key="final"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 1.05, filter: "blur(8px)" }}
      transition={{ duration: 1.4, ease: "easeOut" }}
      className="flex flex-col items-center justify-center text-center px-6 max-w-3xl"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 1 }}
        className="relative"
      >
        <div className="absolute inset-0 -z-10 rounded-full bg-primary/30 blur-3xl scale-150" />
        <motion.div
          animate={{ scale: [1, 1.15, 1] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
          className="text-primary"
        >
          <Heart className="w-16 h-16" fill="currentColor" strokeWidth={0} />
        </motion.div>
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 1.2 }}
        className="font-cursive text-5xl md:text-7xl text-primary mt-8 leading-tight drop-shadow-[0_4px_20px_rgba(255,150,180,0.4)]"
      >
        Untukmu, selamanya.
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.4, duration: 1 }}
        className="mt-8 font-serif italic text-xl md:text-2xl text-foreground/80 leading-relaxed"
      >
        Semoga setiap napasmu dipenuhi cinta,
        <br />
        setiap langkahmu diterangi cahaya,
        <br />
        dan setiap mimpi yang kamu bisikkan malam ini,
        <br />
        perlahan menjelma nyata.
      </motion.p>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.7 }}
        transition={{ delay: 2.2, duration: 1 }}
        className="mt-10 font-serif tracking-[0.3em] uppercase text-xs text-secondary"
      >
        — Dengan sepenuh hati
      </motion.p>

      <motion.button
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2.8, duration: 1 }}
        onClick={onRestart}
        className="mt-14 px-10 py-3 rounded-full bg-transparent border border-primary/60 text-primary hover:bg-primary hover:text-primary-foreground transition-colors font-serif tracking-widest uppercase text-sm backdrop-blur-sm shadow-[0_0_20px_rgba(255,100,150,0.25)]"
      >
        Ulangi Kejutan
      </motion.button>
    </motion.div>
  );
}
