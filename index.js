const fs = require('fs');
const express = require("express");
const app = express();

app.get("/", (req, res) => {
  // IP adresini al
  const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;

  // IP’yi konsola yazdır (Render’da loglarda görünür)
  console.log("IP geldi:", ip);

  // IP’yi dosyaya kaydet
  const logLine = `${ip} - ${new Date().toISOString()}\n`;
  fs.appendFile("ip_log.txt", logLine, err => {
    if(err) console.error("Dosya yazma hatası:", err);
  });

  res.send("Sunucu çalışıyor!");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Sunucu ${PORT} portunda çalışıyor.`);
});const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.send("Sunucu çalışıyor!");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Sunucu ${PORT} portunda çalışıyor.`);
})