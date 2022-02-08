import matter from "gray-matter";
import { NextApiRequest, NextApiResponse } from "next";
import fs from "fs";
// import { rollups } from "d3";

const getTagPost = (req: NextApiRequest, res: NextApiResponse) => {
  const fileList = fs.readdirSync("./posts");

  let posts = [];

  for (let file of fileList) {
    posts.push({
      name: file.split(".")[0],
      data: matter(fs.readFileSync(`./posts/${file}`)),
    });
  }

  posts = posts.map((d) => {
    return {
      ...d,
      data: {
        ...d.data,
        data: { ...d.data.data, category: d.data.data.category.split(",") },
      },
    };
  });

  console.log(posts);

  return res.json({ data: posts });
};

export default getTagPost;
