const express = require("express");
const items = require("./data/items");

const app = express();

app.get("/", (req, res) => {
  res.json(items);
});

app.listen(5000, console.log("Server running on port 5000"));
