import matter from "gray-matter";
import { NextApiRequest, NextApiResponse } from "next";
import fs from "fs";

const getPosts = (req: NextApiRequest, res: NextApiResponse) => {
  const fileList = fs.readdirSync("./posts");

  const posts = [];

  for (let file of fileList) {
    posts.push(matter(fs.readFileSync(`./posts/${file}`)));
  }

  return res.json({ data: posts });
};

export default getPosts;
