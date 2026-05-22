const express = require("express");
const pdf = require("pdf-parse");
const fetch = require("node-fetch");

const app = express();

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  next();
});

app.get("/", async (req, res) => {
  try {
    const url = "https://www.phs-lu.de/wp-content/uploads/2023/04/Stundenplan.pdf";
    const data = await fetch(url);
    const buffer = await data.buffer();
    const parsed = await pdf(buffer);

    const text = parsed.text;

    res.json({
      ok: true,
      text: text
    });
  } catch (e) {
    res.json({
      ok: false,
      error: e.message
    });
  }
});

app.listen(process.env.PORT || 3000);
