import { useState, type FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Send, Sparkles } from "lucide-react";
import { useSendPrayer } from "@workspace/api-client-react";

interface PrayerFormProps {
  onComplete: () => void;
}

export function PrayerForm({ onComplete }: PrayerFormProps) {
  const [prayer, setPrayer] = useState("");
  const [from, setFrom] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const mutation = useSendPrayer({
    mutation: {
      onSuccess: () => {
        setSubmitted(true);
        setErrorMsg(null);
        setTimeout(onComplete, 2200);
      },
      onError: (err: unknown) => {
        const message =
          err instanceof Error
            ? err.message
            : "Gagal mengirim doa. Coba lagi sebentar ya.";
        setErrorMsg(message);
      },
    },
  });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const trimmed = prayer.trim();
    if (trimmed.length < 1) return;
    setErrorMsg(null);
    mutation.mutate({ data: { prayer: trimmed, from: from.trim() || undefined } });
  };

  return (
    <motion.div
      className="w-full max-w-xl flex flex-col items-center px-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.6 }}
    >
      <AnimatePresence mode="wait">
        {!submitted ? (
          <motion.div
            key="form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="w-full"
          >
            <motion.h2
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="font-cursive text-4xl md:text-6xl text-primary text-center drop-shadow-[0_2px_12px_rgba(255,100,170,0.5)]"
            >
              Tulis doamu untukku…
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-center text-foreground/80 font-serif italic mt-3 mb-6 max-w-md mx-auto"
            >
              Tuliskan harapan, doa, atau pesan terbaikmu di hari ulang tahunku.
              Setiap kata akan ku simpan di hatiku.
            </motion.p>

            <form
              onSubmit={handleSubmit}
              className="w-full bg-gradient-to-br from-pink-950/40 via-rose-950/30 to-pink-950/40 backdrop-blur-md rounded-3xl border border-primary/30 p-6 shadow-[0_20px_60px_-20px_rgba(255,100,170,0.5)] space-y-4"
            >
              <div>
                <label className="block text-sm font-serif text-primary mb-2" htmlFor="prayer-from">
                  Dari (opsional)
                </label>
                <input
                  id="prayer-from"
                  type="text"
                  value={from}
                  onChange={(e) => setFrom(e.target.value)}
                  maxLength={200}
                  placeholder="Nama kamu…"
                  className="w-full px-4 py-3 rounded-xl bg-background/60 border border-primary/30 text-foreground placeholder:text-foreground/40 focus:outline-none focus:ring-2 focus:ring-primary/60 focus:border-primary/60 transition font-serif"
                />
              </div>

              <div>
                <label className="block text-sm font-serif text-primary mb-2" htmlFor="prayer-text">
                  Doa & Harapanmu
                </label>
                <textarea
                  id="prayer-text"
                  value={prayer}
                  onChange={(e) => setPrayer(e.target.value)}
                  required
                  maxLength={2000}
                  rows={6}
                  placeholder="Semoga di tahun ini…"
                  className="w-full px-4 py-3 rounded-xl bg-background/60 border border-primary/30 text-foreground placeholder:text-foreground/40 focus:outline-none focus:ring-2 focus:ring-primary/60 focus:border-primary/60 transition font-serif leading-relaxed resize-none"
                />
                <div className="flex justify-end mt-1">
                  <span className="text-xs text-foreground/50 font-serif">
                    {prayer.length} / 2000
                  </span>
                </div>
              </div>

              {errorMsg && (
                <motion.div
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="px-4 py-2 rounded-lg bg-red-900/40 border border-red-400/40 text-red-100 text-sm font-serif text-center"
                >
                  {errorMsg}
                </motion.div>
              )}

              <button
                type="submit"
                disabled={mutation.isPending || prayer.trim().length < 1}
                className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-pink-500 via-rose-400 to-pink-500 text-white font-serif text-base shadow-[0_8px_30px_-5px_rgba(255,100,170,0.7)] hover:shadow-[0_12px_40px_-5px_rgba(255,100,170,0.9)] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {mutation.isPending ? (
                  <>
                    <Sparkles className="w-4 h-4 animate-pulse" />
                    Mengirim doamu…
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    Kirim Doa
                    <Heart className="w-4 h-4 fill-white" />
                  </>
                )}
              </button>
            </form>
          </motion.div>
        ) : (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: "spring", stiffness: 220, damping: 22 }}
            className="text-center py-12"
          >
            <motion.div
              animate={{ scale: [1, 1.2, 1], rotate: [0, -10, 10, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, repeatType: "loop" }}
              className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-pink-400 to-rose-500 mb-5 shadow-[0_0_40px_rgba(255,100,170,0.7)]"
            >
              <Heart className="w-10 h-10 text-white fill-white" />
            </motion.div>
            <h3 className="font-cursive text-4xl md:text-5xl text-primary drop-shadow-[0_2px_12px_rgba(255,100,170,0.6)]">
              Doamu sudah terkirim
            </h3>
            <p className="font-serif italic text-foreground/80 mt-3">
              Terima kasih sudah menulis dengan hati. Aku akan menyimpannya selamanya.
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
