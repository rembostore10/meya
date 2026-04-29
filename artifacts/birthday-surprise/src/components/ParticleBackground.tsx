import React, { useMemo } from "react";
import { motion } from "framer-motion";
import { Heart, Sparkles, Star } from "lucide-react";

type Particle = {
  id: number;
  type: "heart" | "sparkle" | "star";
  left: number;
  size: number;
  duration: number;
  delay: number;
  drift: number;
  opacity: number;
};

const TYPES: Particle["type"][] = ["heart", "sparkle", "star"];

function makeParticles(count: number): Particle[] {
  return Array.from({ length: count }).map((_, i) => ({
    id: i,
    type: TYPES[i % TYPES.length],
    left: Math.random() * 100,
    size: 10 + Math.random() * 18,
    duration: 14 + Math.random() * 16,
    delay: Math.random() * 18,
    drift: (Math.random() - 0.5) * 120,
    opacity: 0.18 + Math.random() * 0.35,
  }));
}

function Twinkle({ count = 40 }: { count?: number }) {
  const stars = useMemo(
    () =>
      Array.from({ length: count }).map((_, i) => ({
        id: i,
        left: Math.random() * 100,
        top: Math.random() * 100,
        size: 1 + Math.random() * 2.5,
        duration: 2 + Math.random() * 4,
        delay: Math.random() * 5,
      })),
    [count],
  );

  return (
    <div className="pointer-events-none absolute inset-0 z-0">
      {stars.map((s) => (
        <motion.span
          key={s.id}
          className="absolute rounded-full bg-white"
          style={{
            left: `${s.left}%`,
            top: `${s.top}%`,
            width: s.size,
            height: s.size,
            boxShadow: `0 0 ${s.size * 2}px rgba(255,255,255,0.8)`,
          }}
          animate={{ opacity: [0.2, 1, 0.2] }}
          transition={{
            duration: s.duration,
            repeat: Infinity,
            ease: "easeInOut",
            delay: s.delay,
          }}
        />
      ))}
    </div>
  );
}

export function ParticleBackground() {
  const particles = useMemo(() => makeParticles(28), []);

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      <Twinkle count={45} />
      {particles.map((p) => {
        const Icon =
          p.type === "heart" ? Heart : p.type === "sparkle" ? Sparkles : Star;
        const color =
          p.type === "heart"
            ? "text-pink-300"
            : p.type === "sparkle"
              ? "text-amber-200"
              : "text-rose-200";

        return (
          <motion.div
            key={p.id}
            className={`absolute ${color}`}
            style={{
              left: `${p.left}%`,
              bottom: -40,
              opacity: p.opacity,
            }}
            initial={{ y: 0, x: 0, rotate: 0 }}
            animate={{
              y: -window.innerHeight - 80,
              x: p.drift,
              rotate: 360,
            }}
            transition={{
              duration: p.duration,
              repeat: Infinity,
              ease: "linear",
              delay: p.delay,
            }}
          >
            <Icon
              style={{ width: p.size, height: p.size }}
              fill={p.type === "heart" ? "currentColor" : "none"}
              strokeWidth={p.type === "heart" ? 0 : 1.5}
            />
          </motion.div>
        );
      })}
    </div>
  );
}
