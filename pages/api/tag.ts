import matter from "gray-matter";
import { NextApiRequest, NextApiResponse } from "next";
import fs from "fs";
import { rollups } from "d3";

const getPost = (req: NextApiRequest, res: NextApiResponse) => {
  const { tag } = req.query;
  const fileList = fs.readdirSync("/posts");

  let posts = [];

  for (let file of fileList) {
    posts.push({
      name: file.split(".")[0],
      data: matter(fs.readFileSync(`posts/${file}`)),
    });
  }

  posts = posts.map((d) => {
    return {
      ...d,
      data: { ...d.data.data, category: d.data.data.category.split(",") },

      // data: d.data.data.category.split(","),
    };
  });

  posts = posts.map((d) => {
    return { category: d.data.category, data: d };
  });

  const returnData: { category: string; data: any }[] = [];

  posts.forEach((d) => {
    d.category.forEach((a: string) => {
      returnData.push({ category: a.trim(), data: d.data });
    });
  });

  return res.json({
    posts: rollups(
      returnData,
      (g) => g,
      (d) => d.category
    )
      .map((d) => {
        return { category: d[0], data: d[1] };
      })
      .filter((d) => d.category == tag)
      .map((d) => d.data)[0]
      .sort((a, b) => b.data.data.date - a.data.data.date),
    tag,
  });

  return res.json({ tag, posts: tag });
};

export default getPost;
