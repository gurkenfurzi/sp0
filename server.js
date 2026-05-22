const express = require("express");
const pdf = require("pdf-parse");
const fetch = require("node-fetch");

const app = express();

app.get("/", async (req, res) => {
  try {
    const url =
      "https://www.phs-lu.de/wp-content/uploads/2023/04/Stundenplan.pdf";

    const data = await fetch(url);
    const buffer = await data.buffer();

    const parsed = await pdf(buffer);

    const text = parsed.text;

    const lines = text
      .split("\n")
      .filter(x => x.includes("M U1"));

    res.json({
      ok: true,
      data: lines
    });

  } catch (e) {
    res.json({
      ok: false,
      error: e.message
    });
  }
});

app.listen(3000);
