import { Router, type IRouter } from "express";
import { SendPrayerBody, SendPrayerResponse } from "@workspace/api-zod";

const router: IRouter = Router();

const TELEGRAM_CHAT_ID = "6161828437";

router.post("/prayers", async (req, res): Promise<void> => {
  const parsed = SendPrayerBody.safeParse(req.body);
  if (!parsed.success) {
    req.log.warn({ errors: parsed.error.message }, "Invalid prayer body");
    res.status(400).json({ error: "Doa tidak valid" });
    return;
  }

  const token = process.env["TELEGRAM_BOT_TOKEN"];
  if (!token) {
    req.log.error("TELEGRAM_BOT_TOKEN is not configured");
    res.status(500).json({ error: "Konfigurasi server belum lengkap" });
    return;
  }

  const { prayer, from } = parsed.data;
  const fromLine = from && from.trim().length > 0 ? `\nDari: ${from.trim()}` : "";
  const text = `🎂 Doa Ulang Tahun untukmu:\n\n"${prayer.trim()}"${fromLine}`;

  try {
    const tgRes = await fetch(
      `https://api.telegram.org/bot${token}/sendMessage`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: TELEGRAM_CHAT_ID,
          text,
          disable_web_page_preview: true,
        }),
      },
    );

    const data = (await tgRes.json()) as {
      ok?: boolean;
      description?: string;
    };

    if (!tgRes.ok || !data.ok) {
      req.log.error(
        { status: tgRes.status, description: data.description },
        "Telegram API rejected the message",
      );
      res.status(500).json({
        error:
          "Gagal mengirim ke Telegram. Pastikan kamu sudah klik Start di bot kamu.",
      });
      return;
    }

    res.json(SendPrayerResponse.parse({ ok: true }));
  } catch (err) {
    req.log.error({ err }, "Failed to call Telegram API");
    res.status(500).json({ error: "Gagal menghubungi server Telegram" });
  }
});

export default router;
