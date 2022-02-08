import matter from "gray-matter";
import { NextApiRequest, NextApiResponse } from "next";
import fs from "fs";

const getPost = (req: NextApiRequest, res: NextApiResponse) => {
  const { title } = req.query;
  const post = fs.readFileSync(`./posts/${title}.md`);

  return res.json({ data: matter(post) });
};

export default getPost;
