import React, { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";

interface BirthdayCakeProps {
  onComplete: () => void;
}

const CANDLE_COUNT = 5;

export function BirthdayCake({ onComplete }: BirthdayCakeProps) {
  const [lit, setLit] = useState<boolean[]>(() =>
    Array(CANDLE_COUNT).fill(true),
  );
  const [jiggle, setJiggle] = useState(0);
  const [celebrated, setCelebrated] = useState(false);

  const allBlown = useMemo(() => lit.every((v) => !v), [lit]);

  useEffect(() => {
    if (allBlown && !celebrated) {
      setCelebrated(true);
      const colors = ["#ff8fab", "#ffb3c1", "#ffd166", "#fff1d0", "#c8a2ff"];

      const fire = (originX: number) => {
        confetti({
          particleCount: 80,
          spread: 90,
          origin: { x: originX, y: 0.6 },
          colors,
          startVelocity: 45,
          scalar: 1.1,
        });
      };

      fire(0.3);
      fire(0.7);
      setTimeout(() => fire(0.5), 250);

      const end = Date.now() + 1800;
      (function loop() {
        confetti({
          particleCount: 4,
          angle: 60,
          spread: 60,
          origin: { x: 0, y: 0.7 },
          colors,
        });
        confetti({
          particleCount: 4,
          angle: 120,
          spread: 60,
          origin: { x: 1, y: 0.7 },
          colors,
        });
        if (Date.now() < end) requestAnimationFrame(loop);
      })();
    }
  }, [allBlown, celebrated]);

  const blowCandle = (index: number) => {
    setLit((prev) => {
      if (!prev[index]) return prev;
      const next = [...prev];
      next[index] = false;
      return next;
    });
  };

  const handleCakeClick = () => {
    setJiggle((j) => j + 1);
  };

  return (
    <motion.div
      key="cake"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, y: -40 }}
      transition={{ duration: 0.9, ease: "easeOut" }}
      className="flex flex-col items-center justify-center w-full"
    >
      <motion.h2
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 0.85, y: 0 }}
        transition={{ delay: 0.4, duration: 1 }}
        className="font-cursive text-3xl md:text-5xl text-secondary mb-6 text-center px-6"
      >
        {allBlown ? "Permintaanmu pasti terkabul…" : "Tiup lilinnya, satu per satu…"}
      </motion.h2>

      <div className="relative">
        {/* Glow */}
        <motion.div
          animate={{
            opacity: allBlown ? [0.5, 1, 0.5] : 0.4,
            scale: allBlown ? [1, 1.15, 1] : 1,
          }}
          transition={{
            duration: allBlown ? 2 : 1,
            repeat: allBlown ? Infinity : 0,
            ease: "easeInOut",
          }}
          className="absolute inset-0 -z-10 rounded-full blur-3xl bg-primary/30 scale-150"
        />

        <motion.div
          key={jiggle}
          animate={{
            rotate: [0, -2, 2, -1, 1, 0],
            scale: [1, 1.02, 1],
          }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          className="cursor-pointer select-none"
          onClick={handleCakeClick}
          aria-label="Kue ulang tahun"
        >
          <Cake lit={lit} onCandleClick={blowCandle} celebrated={allBlown} />
        </motion.div>
      </div>

      <p className="mt-6 text-sm text-foreground/60 font-serif tracking-widest text-center px-6">
        Klik setiap lilin untuk meniupnya
      </p>

      <AnimatePresence>
        {allBlown && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 1 }}
            className="mt-10 flex flex-col items-center gap-6"
          >
            <h3 className="font-cursive text-5xl md:text-7xl text-primary text-center drop-shadow-[0_2px_15px_rgba(255,150,180,0.5)]">
              Selamat Ulang Tahun!
            </h3>
            <button
              onClick={onComplete}
              className="px-8 py-3 rounded-full bg-primary/20 border border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-colors font-serif tracking-widest uppercase text-sm backdrop-blur-sm shadow-[0_0_20px_rgba(255,100,150,0.3)]"
            >
              Lanjut
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

interface CakeProps {
  lit: boolean[];
  onCandleClick: (i: number) => void;
  celebrated: boolean;
}

function Cake({ lit, onCandleClick, celebrated }: CakeProps) {
  const candleSpacing = 40;
  const startX = 200 - ((lit.length - 1) * candleSpacing) / 2;

  return (
    <svg
      viewBox="0 0 400 360"
      className="w-[300px] md:w-[420px] h-auto drop-shadow-[0_15px_40px_rgba(255,120,170,0.35)]"
    >
      <defs>
        <linearGradient id="cakeBase" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="#fff1f5" />
          <stop offset="100%" stopColor="#f7c6d6" />
        </linearGradient>
        <linearGradient id="cakeMid" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="#fce6ee" />
          <stop offset="100%" stopColor="#e8a3bd" />
        </linearGradient>
        <linearGradient id="cakeTop" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="#ffe0eb" />
          <stop offset="100%" stopColor="#dd8aa6" />
        </linearGradient>
        <linearGradient id="frosting" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="#fff" />
          <stop offset="100%" stopColor="#fcd5e0" />
        </linearGradient>
        <radialGradient id="plate" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0%" stopColor="#3a2147" />
          <stop offset="100%" stopColor="#1f1130" />
        </radialGradient>
        <radialGradient id="flame" cx="0.5" cy="0.7" r="0.5">
          <stop offset="0%" stopColor="#fff8c4" />
          <stop offset="50%" stopColor="#ffb347" />
          <stop offset="100%" stopColor="#ff5b3c" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Plate */}
      <ellipse cx="200" cy="335" rx="170" ry="14" fill="url(#plate)" opacity="0.55" />
      <ellipse cx="200" cy="332" rx="155" ry="10" fill="#5a3e6e" opacity="0.6" />

      {/* Bottom tier */}
      <rect x="60" y="240" width="280" height="90" rx="12" fill="url(#cakeBase)" />
      <path
        d="M 60 250 Q 80 240 100 250 T 140 250 T 180 250 T 220 250 T 260 250 T 300 250 T 340 250 L 340 240 L 60 240 Z"
        fill="url(#frosting)"
      />
      {/* Drip */}
      <path
        d="M 60 248 Q 70 270 80 248 Q 90 280 100 248 Q 110 268 120 248 Q 130 278 140 248 Q 150 270 160 248 Q 170 280 180 248 Q 190 268 200 248 Q 210 278 220 248 Q 230 270 240 248 Q 250 280 260 248 Q 270 268 280 248 Q 290 278 300 248 Q 310 270 320 248 Q 330 280 340 248 L 340 270 L 60 270 Z"
        fill="url(#frosting)"
        opacity="0.95"
      />

      {/* Middle tier */}
      <rect x="95" y="170" width="210" height="80" rx="10" fill="url(#cakeMid)" />
      <path
        d="M 95 180 Q 115 170 135 180 T 175 180 T 215 180 T 255 180 T 295 180 L 305 180 L 305 170 L 95 170 Z"
        fill="url(#frosting)"
      />
      <path
        d="M 95 178 Q 105 200 115 178 Q 125 208 135 178 Q 145 198 155 178 Q 165 210 175 178 Q 185 198 195 178 Q 205 208 215 178 Q 225 198 235 178 Q 245 210 255 178 Q 265 198 275 178 Q 285 208 295 178 Q 305 198 305 188 L 95 188 Z"
        fill="url(#frosting)"
        opacity="0.9"
      />

      {/* Top tier */}
      <rect x="140" y="110" width="120" height="70" rx="8" fill="url(#cakeTop)" />
      <path
        d="M 140 120 Q 155 110 170 120 T 200 120 T 230 120 T 260 120 L 260 110 L 140 110 Z"
        fill="url(#frosting)"
      />

      {/* Sprinkles */}
      {Array.from({ length: 12 }).map((_, i) => {
        const x = 70 + ((i * 23) % 260);
        const y = 280 + ((i * 7) % 30);
        const colors = ["#ff7eb6", "#ffd166", "#9b6dff", "#7be0c8"];
        return (
          <rect
            key={`sp1-${i}`}
            x={x}
            y={y}
            width="6"
            height="2.5"
            rx="1"
            fill={colors[i % colors.length]}
            transform={`rotate(${(i * 37) % 180} ${x + 3} ${y + 1})`}
          />
        );
      })}
      {Array.from({ length: 8 }).map((_, i) => {
        const x = 105 + ((i * 27) % 190);
        const y = 210 + ((i * 5) % 25);
        const colors = ["#ff7eb6", "#ffd166", "#9b6dff", "#7be0c8"];
        return (
          <rect
            key={`sp2-${i}`}
            x={x}
            y={y}
            width="6"
            height="2.5"
            rx="1"
            fill={colors[i % colors.length]}
            transform={`rotate(${(i * 41) % 180} ${x + 3} ${y + 1})`}
          />
        );
      })}

      {/* Cake top center decoration */}
      <ellipse cx="200" cy="112" rx="55" ry="8" fill="#fff" opacity="0.3" />

      {/* Candles */}
      {lit.map((isLit, i) => {
        const cx = startX + i * candleSpacing;
        const candleColors = ["#ff8fab", "#a78bfa", "#fcd34d", "#86efac", "#f9a8d4"];
        const color = candleColors[i % candleColors.length];
        const candleTop = 60;
        const candleBottom = 110;

        return (
          <g
            key={i}
            onClick={(e) => {
              e.stopPropagation();
              onCandleClick(i);
            }}
            className="cursor-pointer"
            style={{ pointerEvents: "auto" }}
          >
            {/* Hover hit area */}
            <rect
              x={cx - 14}
              y={candleTop - 30}
              width="28"
              height={candleBottom - candleTop + 40}
              fill="transparent"
            />
            {/* Candle */}
            <rect
              x={cx - 5}
              y={candleTop}
              width="10"
              height={candleBottom - candleTop}
              rx="2"
              fill={color}
            />
            <rect
              x={cx - 5}
              y={candleTop}
              width="3"
              height={candleBottom - candleTop}
              rx="1"
              fill="#fff"
              opacity="0.3"
            />
            {/* Stripes */}
            <rect x={cx - 5} y={candleTop + 12} width="10" height="2" fill="#fff" opacity="0.5" />
            <rect x={cx - 5} y={candleTop + 28} width="10" height="2" fill="#fff" opacity="0.5" />

            {/* Wick */}
            <line
              x1={cx}
              y1={candleTop}
              x2={cx}
              y2={candleTop - 6}
              stroke="#3a2a1a"
              strokeWidth="1.5"
            />

            {/* Flame */}
            <AnimatedFlame x={cx} y={candleTop - 6} lit={isLit} celebrated={celebrated} />
          </g>
        );
      })}
    </svg>
  );
}

function AnimatedFlame({
  x,
  y,
  lit,
  celebrated,
}: {
  x: number;
  y: number;
  lit: boolean;
  celebrated: boolean;
}) {
  if (!lit && !celebrated) {
    // Smoke wisp would be nice but keep SVG simple
    return null;
  }
  if (!lit) return null;

  return (
    <g>
      {/* Glow */}
      <motion.circle
        cx={x}
        cy={y - 8}
        r={14}
        fill="url(#flame)"
        animate={{ opacity: [0.4, 0.7, 0.4] }}
        transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
      />
      {/* Outer flame */}
      <motion.path
        d={`M ${x} ${y} q -7 -6 0 -20 q 7 14 0 20 z`}
        fill="#ff8b3d"
        animate={{ scaleY: [1, 1.08, 0.95, 1], scaleX: [1, 0.95, 1.05, 1] }}
        style={{ transformOrigin: `${x}px ${y}px` }}
        transition={{ duration: 0.9, repeat: Infinity, ease: "easeInOut" }}
      />
      {/* Inner flame */}
      <motion.ellipse
        cx={x}
        cy={y - 9}
        rx="2.4"
        ry="6"
        fill="#fff5b8"
        animate={{ scaleY: [1, 1.15, 0.9, 1] }}
        style={{ transformOrigin: `${x}px ${y - 5}px` }}
        transition={{ duration: 0.8, repeat: Infinity, ease: "easeInOut" }}
      />
    </g>
  );
}
