import { useState, useRef } from "react";
import { motion, AnimatePresence, type PanInfo } from "framer-motion";
import { ChevronLeft, ChevronRight, Heart } from "lucide-react";
import bouquetImg from "@/assets/bouquet.png";
import cakeImg from "@/assets/cake.png";
import candlesImg from "@/assets/candles.png";
import envelopeImg from "@/assets/envelope.png";
import giftboxImg from "@/assets/giftbox.png";
import sceneryImg from "@/assets/scenery.png";

interface PhotoGalleryProps {
  onComplete: () => void;
}

const PHOTOS: Array<{ src: string; caption: string }> = [
  { src: envelopeImg, caption: "Setiap surat cinta untukmu adalah doa yang ku rapal pelan…" },
  { src: bouquetImg, caption: "Bunga ini secantik senyummu, sayang." },
  { src: candlesImg, caption: "Cahaya lilin ini hangat, tapi tak sehangat kehadiranmu." },
  { src: giftboxImg, caption: "Hadiah terbaik dalam hidupku adalah kamu." },
  { src: cakeImg, caption: "Sepotong manis untuk hari paling istimewa…" },
  { src: sceneryImg, caption: "Di bawah langit yang sama, aku selalu memikirkanmu." },
];

export function PhotoGallery({ onComplete }: PhotoGalleryProps) {
  const [index, setIndex] = useState(0);
  const [maxReached, setMaxReached] = useState(0);
  const [direction, setDirection] = useState<1 | -1>(1);
  const total = PHOTOS.length;
  const reachedEnd = maxReached >= total - 1;
  const dragStart = useRef(0);

  const goTo = (next: number) => {
    if (next < 0 || next >= total) return;
    setDirection(next > index ? 1 : -1);
    setIndex(next);
    setMaxReached((m) => Math.max(m, next));
  };

  const next = () => goTo(index + 1);
  const prev = () => goTo(index - 1);

  const handleDragEnd = (_: unknown, info: PanInfo) => {
    const swipe = info.offset.x;
    if (swipe < -50) next();
    else if (swipe > 50) prev();
  };

  const variants = {
    enter: (dir: number) => ({ x: dir > 0 ? 300 : -300, opacity: 0, scale: 0.9 }),
    center: { x: 0, opacity: 1, scale: 1 },
    exit: (dir: number) => ({ x: dir > 0 ? -300 : 300, opacity: 0, scale: 0.9 }),
  };

  return (
    <motion.div
      className="flex flex-col items-center justify-center w-full px-2"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
    >
      <motion.h2
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="font-cursive text-4xl md:text-5xl text-primary text-center mb-2 drop-shadow-[0_2px_12px_rgba(255,100,170,0.5)]"
      >
        Kenangan Manis Kita
      </motion.h2>
      <p className="text-sm md:text-base text-foreground/70 font-serif italic text-center mb-6">
        Geser semua foto sampai akhir untuk lanjut…
      </p>

      <div className="relative w-full max-w-md aspect-[4/5] select-none">
        <div className="absolute inset-0 rounded-3xl overflow-hidden border border-primary/30 shadow-[0_10px_60px_-10px_rgba(255,100,170,0.5)] bg-gradient-to-br from-pink-900/20 to-rose-900/20 backdrop-blur-sm">
          <AnimatePresence custom={direction} mode="wait" initial={false}>
            <motion.div
              key={index}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ x: { type: "spring", stiffness: 280, damping: 30 }, opacity: { duration: 0.25 } }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.2}
              onDragStart={(_, info) => { dragStart.current = info.point.x; }}
              onDragEnd={handleDragEnd}
              className="absolute inset-0 flex flex-col cursor-grab active:cursor-grabbing"
            >
              <div className="flex-1 flex items-center justify-center p-4 bg-gradient-to-b from-pink-950/40 via-transparent to-rose-950/60">
                <img
                  src={PHOTOS[index].src}
                  alt={`Kenangan ${index + 1}`}
                  draggable={false}
                  className="max-w-full max-h-full object-contain drop-shadow-[0_10px_30px_rgba(255,100,170,0.4)]"
                />
              </div>
              <div className="px-5 py-4 bg-gradient-to-t from-rose-950/90 to-rose-950/50 backdrop-blur-md">
                <p className="font-serif italic text-center text-foreground/90 text-base md:text-lg leading-snug">
                  {PHOTOS[index].caption}
                </p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <button
          onClick={prev}
          disabled={index === 0}
          aria-label="Foto sebelumnya"
          className="absolute left-[-12px] top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-background/70 backdrop-blur-md border border-primary/30 text-primary disabled:opacity-30 disabled:cursor-not-allowed hover:bg-primary/20 transition"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button
          onClick={next}
          disabled={index === total - 1}
          aria-label="Foto berikutnya"
          className="absolute right-[-12px] top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-background/70 backdrop-blur-md border border-primary/30 text-primary disabled:opacity-30 disabled:cursor-not-allowed hover:bg-primary/20 transition"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      <div className="flex items-center gap-2 mt-5">
        {PHOTOS.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            aria-label={`Ke foto ${i + 1}`}
            className={`h-2 rounded-full transition-all ${
              i === index
                ? "w-6 bg-primary"
                : i <= maxReached
                ? "w-2 bg-primary/70"
                : "w-2 bg-foreground/20"
            }`}
          />
        ))}
      </div>

      <p className="text-xs text-foreground/50 mt-3 font-serif tracking-wider">
        {index + 1} / {total}
      </p>

      <div className="mt-6 h-14 flex items-center justify-center">
        <AnimatePresence mode="wait">
          {reachedEnd ? (
            <motion.button
              key="continue"
              initial={{ opacity: 0, scale: 0.8, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ type: "spring", stiffness: 300, damping: 22 }}
              onClick={onComplete}
              className="group relative inline-flex items-center gap-2 px-7 py-3 rounded-full bg-gradient-to-r from-pink-500 via-rose-400 to-pink-500 text-white font-serif text-base shadow-[0_8px_30px_-5px_rgba(255,100,170,0.7)] hover:shadow-[0_12px_40px_-5px_rgba(255,100,170,0.9)] transition-shadow"
            >
              <Heart className="w-4 h-4 fill-white" />
              Lanjut ke kejutan berikutnya
              <Heart className="w-4 h-4 fill-white" />
              <span className="absolute inset-0 rounded-full bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
            </motion.button>
          ) : (
            <motion.p
              key="hint"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              exit={{ opacity: 0 }}
              className="text-sm text-foreground/60 font-serif italic"
            >
              Geser ke kanan untuk melihat lebih banyak…
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
