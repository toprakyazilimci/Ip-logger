const express = require("express");
const fs = require("fs");
const app = express();

app.get("/", (req, res) => {
  const ip = req.headers["x-forwarded-for"] || req.connection.remoteAddress;
  const logLine = `${ip} - ${new Date().toISOString()}\n`;
  fs.appendFile("ip_log.txt", logLine, (err) => {
    if (err) console.error("Dosya yazma hatası:", err);
  });
  res.redirect("https://ornek.com"); // Yönlendirmek istediğin linki buraya yaz
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Sunucu ${PORT} portunda çalışıyor.`);
});