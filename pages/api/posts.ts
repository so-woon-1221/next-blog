import matter from "gray-matter";
import { NextApiRequest, NextApiResponse } from "next";
import fs from "fs";
import { join } from "path";

const getPosts = (req: NextApiRequest, res: NextApiResponse) => {
  const fileList = fs.readdirSync(join("/posts"));
  console.log(__dirname + "../../");

  const posts = [];

  for (let file of fileList) {
    posts.push({
      name: file.split(".")[0],
      data: matter(fs.readFileSync(`./posts/${file}`)),
    });
  }

  return res.json({
    data: posts.sort((a, b) => b.data.data.date - a.data.data.date),
  });
};

export default getPosts;
