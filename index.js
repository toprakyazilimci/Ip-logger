const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();

app.get("/", (req, res) => {
  // IP adresini al
  const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;

  // IP’yi konsola yazdır (Render loglarında görünür)
  console.log("IP geldi:", ip);

  // Dosya yolunu ayarla (Render’da genellikle root dizine yazabilirsin)
  const logPath = path.join(__dirname, "ip_log.txt");

  // IP’yi dosyaya ekle
  fs.appendFile(logPath, `${ip} - ${new Date().toISOString()}\n`, (err) => {
    if (err) {
      console.error("Dosya yazma hatası:", err);
    }
  });

  res.send("Sunucu çalışıyor!");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Sunucu ${PORT} portunda çalışıyor.`);
});