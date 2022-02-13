import matter from "gray-matter";
import { NextApiRequest, NextApiResponse } from "next";
import fs from "fs";
import { join } from "path";

const getPost = (req: NextApiRequest, res: NextApiResponse) => {
  const { title } = req.query;
  const post = fs.readFileSync(join(__dirname + `/posts/${title}.md`));

  return res.json({ data: matter(post) });
};

export default getPost;
