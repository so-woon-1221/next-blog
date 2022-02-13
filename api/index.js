const app = require("express");
const path = require("path");
const fs = require("fs");

app.post("/api/write", (req, res) => {
  return res.json("asdfa");
});

module.exports = app;
