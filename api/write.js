const express = require("express");
const path = require("path");
const fs = require("fs");

const app = express();

app.post("/", (req, res) => {
  const { title, post } = req.body;
  // const path = join(process.cwd(), "posts");
  const file = fs.writeFileSync(
    path.join(__dirname, "posts", `${title.replace(/ /g, "")}.md`),
    post
  );

  return res.json("저장완료");
});

module.exports = app;
