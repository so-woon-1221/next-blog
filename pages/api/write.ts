import { NextApiRequest, NextApiResponse } from "next";
import fs from "fs";
import matter from "gray-matter";

const writePost = (req: NextApiRequest, res: NextApiResponse) => {
  //   fs.writeFileSync("./posts/test.md", "aa");
  const file = fs.readFileSync("./posts/test.md");

  return res.json(matter(file, { excerpt: true }));
};

export default writePost;
