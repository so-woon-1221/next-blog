import { NextApiRequest, NextApiResponse } from "next";
import fs from "fs";
// import matter from "gray-matter";


const writePost = (req: NextApiRequest, res: NextApiResponse) => {
  const { title, post } = req.body;
  const file = fs.writeFileSync(`./posts/${title.replace(/ /g,'')}.md`, post);

  return res.json("저장완료");
};

export default writePost;
