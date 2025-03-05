import { CronJob } from "cron";
import https from "https";

// 🔹 Cron Job Açıklaması:
// ┌───────── Dakika (0-59)
// │ ┌────────── Saat (0-23)
// │ │ ┌────────── Gün (1-31)
// │ │ │ ┌────────── Ay (1-12)
// │ │ │ │ ┌────────── Haftanın Günü (0-7) (Pazar: 0 veya 7, Pazartesi: 1, ...)
// │ │ │ │ │ 
// 0 3 * * * → Her gün sabah 03:00'te çalışır (UTC)

const job = new CronJob("0 3 * * *", () => {

    const url = "https://instagram-clone-ub2l.onrender.com/api/auth/ping";

    https
        .get(url, (res) => {
            console.log(`✅ Ping atıldı! Status Code: ${res.statusCode}`);
        })
        .on("error", (err) => {
            console.error("❌ Ping başarısız:", err.message);
        });
});

// Cron job'u başlat
job.start();
console.log("🔄 Günlük cron job başlatıldı...");